import {Elysia, t} from "elysia";
import {createSecurityPlugin, isCSRFTokenValid} from "./plugins/security";
import {FRONTEND_BASE_URL, JWT_MAX_AGE_SECONDS, OAUTH_CSRF_PARAM_NAME} from "./config";
import {GoogleClient} from "./clients/GoogleClient";
import {UserService} from "./services/UserService";
import {USER_JWT_COOKIE_DELETED_VALUE, USER_JWT_COOKIE_NAME, UserStatuses} from "./constants";
import {db} from "./db";
import {logger} from "./logger";
import {roleTable, SuperAdminRole, userTable, userToRole} from "./db/schemas";
import {AlumniService} from "./services/AlumniService";
import cors from "@elysiajs/cors";
import {wrap} from "@bogeychan/elysia-logger";

const prefix = '/api/v1'

const app = new Elysia({prefix})
    .use(wrap(logger))
    .use(cors({
        origin: ['http://localhost:5173']
    }))
    .use(createSecurityPlugin())
    .use(GoogleClient.googleClientPlugin())
    .use(UserService.userServicePlugin())
    .use(AlumniService.alumniServicePlugin())
    .group('/authorized', (authorizedRoutes) => authorizedRoutes
        .derive(async ({cookie, verifyJWT, decodeJWT}) => {
            const jwt = cookie[USER_JWT_COOKIE_NAME].value
            if (typeof jwt !== "string" || jwt === USER_JWT_COOKIE_DELETED_VALUE) {
                return Promise.resolve({
                    user: null
                })
                //return status("Unauthorized", `Cookie ${USER_JWT_COOKIE_NAME} required`)
            }
            return await verifyJWT(jwt)
                .then(async ({payload}) => {
                    const {email} = decodeJWT(payload)
                    const user = await db.query.userTable.findFirst({
                        where: (userTable, {eq}) => eq(userTable.email, email),
                        with: {
                            roles: true
                        }
                    })
                    if (!user) {
                        return {
                            user: null
                        }
                        //return status("Not Found", "User not found")
                    }
                    const {roles, name} = user
                    const realRoles = await Promise.all(roles.map(async role => await db.query.roleTable.findFirst({where: (roleTable, {eq}) => eq(roleTable.id, role.roleId)})))
                    const authorizedUser: AuthorizedUser = {
                        name,
                        email,
                        roles: realRoles.filter(role => role !== undefined).map(role => role.name)
                    }
                    return {
                        user: authorizedUser
                    }
                })
                .catch((e) => {
                    logger.error(e)
                    return {user: null}
                })
        })
        .onBeforeHandle(({user, status}) => {
            if (!user) {
                return status(401, 'You have to be logged in to access')
            }
        })
        .derive(({user}) => ({user: user as AuthorizedUser}))
        .group('/users', (userRoutes) => userRoutes
            .get('/me', async ({user}) => {
                return user
            })
        )
        .group('/sadmin', (superAdminRoutes) => superAdminRoutes
            .onBeforeHandle(({user, status}) => {
                const {roles} = user
                if (!roles.includes(SuperAdminRole)) {
                    return status("Unauthorized")
                }
            })
            .post('/alumniSurvey', async ({body, alumniService}) => {
                const fileContent = new TextDecoder().decode((await body.arrayBuffer()))
                const parsed = await alumniService.parseSurveyCSV(fileContent)
                await alumniService.replaceAllSurveyData(parsed)
            }, {
                body: t.File({ format: 'text/csv' })
            })
            .post('/users', async ({body}) => {
                const {roles, ...userData} = body

                await db.insert(userTable).values(userData).execute()
                const newUser = await db.query.userTable.findFirst({
                    where: (userTable, {eq}) => eq(userTable.email, userData.email)
                })

                for (const role of roles) {
                    let foundRole = await db.query.roleTable.findFirst({
                        where: (roleTable, {eq}) => eq(roleTable.name, role)
                    })
                    if (!foundRole) {
                        await db.insert(roleTable).values({name: role}).execute()
                        foundRole = await db.query.roleTable.findFirst({
                            where: (roleTable, {eq}) => eq(roleTable.name, role)
                        })
                    }
                    await db.insert(userToRole).values({
                        userId: newUser!.id,
                        roleId: foundRole!.id
                    })
                }
            }, {
                body: t.Object({
                    name: t.String(),
                    email: t.String({ format: 'email' }),
                    status: t.Union(toTypeboxLiteral(UserStatuses)),
                    roles: t.Array(t.String())
                })
            })
        )
    )
    .group('/auth', (authRoutes) => authRoutes
        .get(('/login/google'), ({googleClient, redirect}) => {
            return redirect(googleClient.generateGoogleLoginURL())
        })
        .get('/callback/google', async ({googleClient, userService, signJWT, query, status, cookie, redirect}) => {
            // verify csrf token
            // name=value url encoded
            const csrfValue = decodeURIComponent(query.state).split("=")[1]
            const isCsrfValid = isCSRFTokenValid(csrfValue)
            if (!isCsrfValid) {
                return status("Forbidden", "CSRF Validation Failed")
            }
            const userData = {
                email: await googleClient.getUserEmail(query.code)
            }
            const processedLogin = await userService.processLogin(userData)
            if (!processedLogin.canLogin) {
                return status("Unauthorized", processedLogin.message)
            }
            cookie[USER_JWT_COOKIE_NAME].set({
                value: await signJWT(processedLogin.userData),
                maxAge: JWT_MAX_AGE_SECONDS,
                httpOnly: true,
            })
            return redirect(`${FRONTEND_BASE_URL}/dashboard`)
        }, {
            query: t.Object({
                state: t.String({pattern: `^${OAUTH_CSRF_PARAM_NAME}=.+`}),
                code: t.String({minLength: 10})
            })
        })
        .post('/logout', ({set}) => {
            set.headers['Set-Cookie'] = `${USER_JWT_COOKIE_NAME}=${USER_JWT_COOKIE_DELETED_VALUE}; Max-Age=0; Path=/; HttpOnly`
            return 'cookie cleared'
        })
    )
    .get("/", () => "Hello Tawasul API")
    .listen(3000);

// for frontend client
export type Backend = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

function toTypeboxLiteral(strings: Readonly<string[]>) {
    const schemas = [];
    for (const str of strings) {
        schemas.push(t.Literal(str));
    }
    return schemas;
}

type AuthorizedUser = {
    name: string;
    email: string;
    roles: string[];
}