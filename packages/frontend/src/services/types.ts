import {User} from "../types";

export interface IAuthService {
    getCurrentUser(): Promise<User | null>
    logout(): Promise<void>
}

export interface IStatisticsService {
    getSummaryStats(): Promise<SummaryStats>
}

export type SummaryStats = {
    totalAlumni: number,
    activeThisMonth: number,
    newArticles: number
}