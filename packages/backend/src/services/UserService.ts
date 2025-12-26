import {Elysia} from "elysia";
import {UserData} from "../plugins/security";
import {db} from "../db";
import {eq, ilike} from "drizzle-orm";
import {AlumniRole, CanLoginUserStatus, CanLoginUserStatuses} from "../constants";
import {IKAPIAR_ADMIN_EMAIL} from "../config";
import {userTable, alumniTable, alumniSurveyTable, angkatanTable, roleTable, userToRole} from "../db/schemas";

export class UserService {

	private static PLUGIN_NAME = 'userService' as const

	public static userServicePlugin = () => {
		return new Elysia().decorate(this.PLUGIN_NAME, new UserService())
	}

    public processLogin = async (userData: UserData): Promise<ProcessedLogin> => {
        // check if logged-in user already exists
        const foundUser = await db.select()
            .from(userTable)
            .where(eq(userTable.email, userData.email))
            .limit(1)
            .execute()
        // if user not exist, check email in alumni table
        if (foundUser.length !== 1) {
            const foundAlumni = await db.select()
                .from(alumniTable)
                .where(eq(alumniTable.email, userData.email))
                .limit(1).execute()
            // if not found in alumni, check if alumni data is in survey form
            if (foundAlumni.length !== 1) {
                // if not found, onboard alumni, at the end alumni is to be told to wait for approval
                const foundAlumniSurvey = await db.select()
                    .from(alumniSurveyTable)
                    .where(eq(alumniSurveyTable.email, userData.email))
                    .limit(1)
                    .execute()
                if (foundAlumniSurvey.length !== 1) {
                    return {
                        user: { email: '', roles: []},
                        canLogin: false,
                        message: `Data anda (${userData.email}) tidak ditemukan dalam database alumni IKAPIAR. Harap hubungi ketua angkatan atau admin IKAPIAR (${IKAPIAR_ADMIN_EMAIL})`
                    }
                }
                // if found in survey, fill data into alumni table and user table, auto approve, status active
                const surveyData = foundAlumniSurvey[0]
                const foundAngkatan = await db.select().from(angkatanTable).where(ilike(angkatanTable.name, surveyData.angkatan)).limit(1).execute()
                if (foundAngkatan.length !== 1) {
                    return {
                        user: { email: '', roles: []},
                        canLogin: false,
                        message: `Data anda (${userData.email}) ditemukan dalam database alumni, namun nama angakatan invalid (${surveyData.angkatan}). Harap pastikan kembali data yang anda isi di survey alumni dan kontak admin ikapiar (${IKAPIAR_ADMIN_EMAIL})`
                    }
                }
                const gender = foundAngkatan[0].category === 'putra' ? 'Laki-laki' : 'Perempuan'
                await db.insert(alumniTable).values({
                    name: surveyData.namaLengkap,
                    email: surveyData.email,
                    phone: surveyData.nomorKontak,
                    gender,
                    angkatanId: foundAngkatan[0].id,
                }).execute()
                await db.insert(userTable).values({
                    name: surveyData.namaLengkap,
                    email: surveyData.email,
                    status: 'Active'
                }).execute()
                return {
                    user: { email: '', roles: []},
                    canLogin: true,
                    message: 'ok'
                }
            }
            // if user found in alumni, populate user data from alumni table and accept the login
            const alumniData = foundAlumni[0]
            await db.insert(userTable).values({
                name: alumniData.name,
                email: alumniData.email,
                status: 'Approved'
            }).execute()
            // check if the role "Alumni" exists
            let foundAlumniRole = await db.query.roleTable.findFirst({where: eq(roleTable.name, AlumniRole)})
            // insert if not
            if (!foundAlumniRole) {
                await db.insert(roleTable).values({name: AlumniRole}).execute()
                foundAlumniRole = await db.query.roleTable.findFirst({where: eq(roleTable.name, AlumniRole)})
            }
            // insert many-to-many relationship between user and role
            await db.insert(userToRole).values({userId: foundUser[0].id, roleId: foundAlumniRole!.id}).execute()
            return {
                user: { email: alumniData.email, roles: [foundAlumniRole!.name]},
                canLogin: true,
                message: 'ok'
            }
        }
        // if found in users, check if user can log in (CanLoginUserStatus)
        // if user can not log in, reject the login, tell the user status and user should reach out to admins
        if (!CanLoginUserStatuses.includes(foundUser[0].status as CanLoginUserStatus)) {
            return {
                user: { email: userData.email, roles: []},
                canLogin: false,
                message: `Akun anda ditemukan, namun dalam status ${foundUser[0].status}. Harap hubungi admin ikapiar ${IKAPIAR_ADMIN_EMAIL}`,
            }
        }
        // if user can log in, accept the login
        // get user roles
        const roleRelations = await db.select().from(userToRole).where(eq(userToRole.userId, foundUser[0].id)).execute()
        const maybeRoles = roleRelations.map(
            async ({roleId}) => await db.query.roleTable.findFirst({where: eq(roleTable.id, roleId)}).execute()
        )
        const roles = await Promise.all(maybeRoles).then(roles => roles.filter(role => role !== undefined).map(({name}) => name))
        return {
            user: { email: userData.email, roles},
            canLogin: true,
            message: 'ok'
        }
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
}