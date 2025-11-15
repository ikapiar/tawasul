import {Elysia, t} from "elysia";
import {isCSRFTokenValid, securityPlugin} from "./plugins/security";
import {JWT_MAX_AGE_SECONDS, OAUTH_CSRF_PARAM_NAME} from "./config";
import {GoogleClient} from "./clients/GoogleClient";
import {UserService} from "./services/UserService";
import {USER_JWT_COOKIE_NAME} from "./constants";
import {db} from "./db";

const prefix = '/api/v1'

const app = new Elysia({prefix})
	.use(securityPlugin)
	.use(GoogleClient.googleClientPlugin())
	.use(UserService.userServicePlugin())
    .group('/users', (userRoutes) => userRoutes
        .get('/me', async ({cookie, verifyJWT, decodeJWT, status}) => {
            const jwt = cookie[USER_JWT_COOKIE_NAME].value
            if (typeof jwt !== "string") {
                return status("Unauthorized", `Cookie ${USER_JWT_COOKIE_NAME} required`)
            }
            return verifyJWT(jwt)
                .then(async ({payload}) => {
                    const {email} = decodeJWT(payload)
                    const user = await db.query.userTable.findFirst({
                        where: (userTable, {eq}) => eq(userTable.email, email),
                        with: {
                            roles: true
                        }
                    })
                    if (!user) {
                        return status("Not Found", "User not found")
                    }
                    const {roles} = user
                    const realRoles = await Promise.all(roles.map(async role => await db.query.roleTable.findFirst({where: (roleTable, {eq}) => eq(roleTable.id, role.roleId)})))
                    const authorizedUser: AuthorizedUser = {
                        email,
                        roles: realRoles.filter(role => role !== undefined).map(role => role.name)
                    }
                    return authorizedUser
                })
                .catch(e => status("Unauthorized", e))
        }))
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
            cookie[USER_JWT_COOKIE_NAME].value = await signJWT(processedLogin.userData)
            cookie[USER_JWT_COOKIE_NAME].maxAge = JWT_MAX_AGE_SECONDS
            cookie[USER_JWT_COOKIE_NAME].httpOnly = true
            return redirect('/dashboard')
		}, {
			query: t.Object({
				state: t.String({ pattern: `^${OAUTH_CSRF_PARAM_NAME}=.+` }),
				code: t.String({minLength: 10})
			})
		})
	)
	.get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

type AuthorizedUser = {
    email: string;
    roles: string[];
}