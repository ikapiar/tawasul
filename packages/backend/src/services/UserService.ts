import {Elysia} from "elysia";
import {UserData} from "../plugins/security";
import {db} from "../db";
import {eq, ilike} from "drizzle-orm";
import {CanLoginUserStatus, CanLoginUserStatuses} from "../constants";
import {IKAPIAR_ADMIN_EMAIL} from "../config";
import {userTable, alumniTable, alumniSurveyTable, angkatanTable} from "../db/schemas";

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
                        userData,
                        canLogin: false,
                        message: `Data anda (${userData.email}) tidak ditemukan dalam database alumni IKAPIAR. Harap hubungi ketua angkatan atau admin IKAPIAR (${IKAPIAR_ADMIN_EMAIL})`
                    }
                }
                // if found in survey, fill data into alumni table and user table, auto approve, status active
                const surveyData = foundAlumniSurvey[0]
                const foundAngkatan = await db.select().from(angkatanTable).where(ilike(angkatanTable.name, surveyData.angkatan)).limit(1).execute()
                if (foundAngkatan.length !== 1) {
                    return {
                        userData,
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
                    userData,
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
            return {
                userData,
                canLogin: true,
                message: 'ok'
            }
        }
        // if found in users, check if user can log in (CanLoginUserStatus)
        // if user can not log in, reject the login, tell the user status and user should reach out to admins
        if (!CanLoginUserStatuses.includes(foundUser[0].status as CanLoginUserStatus)) {
            return {
                userData,
                canLogin: false,
                message: `Akun anda ditemukan, namun dalam status ${foundUser[0].status}. Harap hubungi admin ikapiar ${IKAPIAR_ADMIN_EMAIL}`,
            }
        }
        // if user can log in, accept the login
        return {
            userData,
            canLogin: true,
            message: 'ok'
        }
    }
}

export type ProcessedLogin = {
    userData: UserData,
    canLogin: boolean,
    message: string
}

export type AuthorizedUser = {
    userData: UserData,
    roles: string[],
}