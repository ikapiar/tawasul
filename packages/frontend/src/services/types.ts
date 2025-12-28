import {AuthorizedUser} from "backend/src/services/UserService";
import type { StatisticsService } from "backend/src/services/StatisticsService";
import {Angkatan} from "backend/src/db/schemas";
import {UploadProgress} from "backend/src/services/AlumniService";

export interface IAuthService {
    getCurrentUser(): Promise<AuthorizedUser | null>
    logout(): Promise<void>
}

export interface IStatisticsService {
    getSummaryStats(): Promise<SummaryStats>
    uploadSurveyData(csvFile: File): Promise<{data: AsyncGenerator<{event: 'message', data: UploadProgress} | {event: 'done'}> | null, error: {status: number, value: unknown} | null}>
    getAlumniSurvey(): Promise<AlumniSurvey[]>
    getAngkatanData(): Promise<Angkatan[]>
}

export type SummaryStats = {
    totalAlumni: number,
    activeThisMonth: number,
    newArticles: number
}

export type AlumniSurvey = Awaited<ReturnType<StatisticsService['getAllSurveyData']>>[number]