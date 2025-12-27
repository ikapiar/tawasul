import {AuthorizedUser} from "backend/src/services/UserService";
import type { StatisticsService } from "backend/src/services/StatisticsService";
import {Angkatan} from "backend/src/db/schemas";

export interface IAuthService {
    getCurrentUser(): Promise<AuthorizedUser | null>
    logout(): Promise<void>
}

export interface IStatisticsService {
    getSummaryStats(): Promise<SummaryStats>
    uploadSurveyData(csvFile: File): Promise<void>
    getAlumniSurvey(): Promise<AlumniSurvey[]>
    getAngkatanData(): Promise<Angkatan[]>
}

export type SummaryStats = {
    totalAlumni: number,
    activeThisMonth: number,
    newArticles: number
}

export type AlumniSurvey = Awaited<ReturnType<StatisticsService['getAllSurveyData']>>[number]