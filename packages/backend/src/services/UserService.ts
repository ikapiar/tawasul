import {Elysia} from "elysia";
import {UserData} from "../plugins/security";
import {db} from "../db";
import {eq} from "drizzle-orm";
import {AlumniRole, CanLoginUserStatus, CanLoginUserStatuses} from "../constants";
import {IKAPIAR_ADMIN_EMAIL} from "../config";
import {
    userTable,
    alumniTable,
    alumniSurveyTable,
    angkatanTable,
    roleTable,
    userToRole,
    User,
    Alumni, AlumniSurvey
} from "../db/schemas";

export class UserService {

	private static PLUGIN_NAME = 'userService' as const

	public static userServicePlugin = () => {
		return new Elysia().decorate(this.PLUGIN_NAME, new UserService())
	}

    public processLogin = async (userData: UserData): Promise<ProcessedLogin> => {
        // check if logged-in user already exists
        const foundUser = await this.getUserByEmail(userData.email)
        // if user not exist, check email in alumni table
        if (!foundUser) {
            const foundAlumni = await this.getAlumniByEmail(userData.email)
            // if not found in alumni, check if alumni data is in survey form
            if (!foundAlumni) {
                const foundAlumniSurvey = await this.getAlumniSurveyByEmail(userData.email)
                if (!foundAlumniSurvey) {
                    return {
                        user: { email: '', roles: [], name: ''},
                        canLogin: false,
                        message: `Data anda (${userData.email}) tidak ditemukan dalam database alumni IKAPIAR. Harap hubungi ketua angkatan atau admin IKAPIAR (${IKAPIAR_ADMIN_EMAIL})`
                    }
                }
                // make sure angkatan name is valid from the survey data
                const foundAngkatan = await db.query.angkatanTable.findFirst({where: eq(angkatanTable.name, foundAlumniSurvey.angkatan)}).execute()
                if (!foundAngkatan) {
                    return {
                        user: { email: '', roles: [], name: ''},
                        canLogin: false,
                        message: `Data anda (${userData.email}) ditemukan dalam database alumni, namun nama angkatan invalid (${foundAlumniSurvey.angkatan}). Harap pastikan kembali data yang anda isi di survey alumni dan kontak admin ikapiar (${IKAPIAR_ADMIN_EMAIL})`
                    }
                }
                // if found in survey, fill data into alumni table and user table, auto approve, status active
                const gender = foundAngkatan.category === 'putra' ? 'Laki-laki' : 'Perempuan'
                await db.insert(alumniTable).values({
                    name: foundAlumniSurvey.namaLengkap,
                    email: foundAlumniSurvey.email,
                    phone: foundAlumniSurvey.nomorKontak,
                    gender,
                    angkatanId: foundAngkatan.id,
                }).execute()
                const [{id: userId}] = await db.insert(userTable).values({
                    name: foundAlumniSurvey.namaLengkap,
                    email: foundAlumniSurvey.email,
                    status: 'Active'
                }).returning()
                const roles = await this.linkUserRole(userId, AlumniRole)
                return {
                    user: { email: foundAlumniSurvey.email, roles, name: foundAlumniSurvey.namaLengkap},
                    canLogin: true,
                    message: 'ok'
                }
            }
            // if user found in alumni, populate user data from alumni table and accept the login
            const [{id: userId}] = await db.insert(userTable).values({
                name: foundAlumni.name,
                email: foundAlumni.email,
                status: 'Approved'
            }).returning()
            // link user to alumni role
            const roles = await this.linkUserRole(userId, AlumniRole)
            return {
                user: { email: foundAlumni.email, roles, name: foundAlumni.name},
                canLogin: true,
                message: 'ok'
            }
        }
        // if found in users, check if user can log in (CanLoginUserStatus)
        // if user can not log in, reject the login, tell the user status and user should reach out to admins
        if (!CanLoginUserStatuses.includes(foundUser.status as CanLoginUserStatus)) {
            return {
                user: { email: userData.email, roles: [], name: ''},
                canLogin: false,
                message: `Akun anda ditemukan, namun dalam status ${foundUser.status}. Harap hubungi admin ikapiar ${IKAPIAR_ADMIN_EMAIL}`,
            }
        }
        // if user can log in, accept the login
        // get user roles
        const roleRelations = await db.select().from(userToRole).where(eq(userToRole.userId, foundUser.id)).execute()
        const maybeRoles = roleRelations.map(
            async ({roleId}) => await db.query.roleTable.findFirst({where: eq(roleTable.id, roleId)}).execute()
        )
        const roles = await Promise.all(maybeRoles).then(roles => roles.filter(role => role !== undefined).map(({name}) => name))
        return {
            user: { email: userData.email, roles, name: foundUser.name },
            canLogin: true,
            message: 'ok'
        }
    }

    private getUserByEmail = async (email: string): Promise<User | undefined> => {
        return await db.query.userTable.findFirst({where: eq(userTable.email, email)}).execute()
    }

    private getAlumniByEmail = async (email: string): Promise<Alumni | undefined> => {
        return await db.query.alumniTable.findFirst({where: eq(alumniTable.email, email)}).execute()
    }

    private getAlumniSurveyByEmail = async (email: string): Promise<AlumniSurvey | undefined> => {
        return await db.query.alumniSurveyTable.findFirst({where: eq(alumniSurveyTable.email, email)}).execute()
    }

    private linkUserRole = async <T extends string>(userId: number, ...roleNames: T[]) => {
        for (const roleName of roleNames) {
            // check if the role exists
            let foundRole = await db.query.roleTable.findFirst({where: eq(roleTable.name, roleName)})
            // insert if not
            if (!foundRole) {
                await db.insert(roleTable).values({name: roleName}).execute()
                foundRole = await db.query.roleTable.findFirst({where: eq(roleTable.name, roleName)})
            }
            // insert many-to-many relationship between user and role
            await db.insert(userToRole).values({userId, roleId: foundRole!.id}).execute()
        }
        return roleNames
    }
}

export type ProcessedLogin = {
    user: AuthorizedUser,
    canLogin: boolean,
    message: string
}

export type AuthorizedUser = {
    email: string,
    roles: string[],
    name: string
}