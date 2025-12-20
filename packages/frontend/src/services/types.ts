import {AuthorizedUser} from "backend/src/services/UserService";

export interface IAuthService {
    getCurrentUser(): Promise<AuthorizedUser | null>
    logout(): Promise<void>
}

export interface IStatisticsService {
    getSummaryStats(): Promise<SummaryStats>
    uploadSurveyData(csvFile: File): Promise<void>
}

export type SummaryStats = {
    totalAlumni: number,
    activeThisMonth: number,
    newArticles: number
}