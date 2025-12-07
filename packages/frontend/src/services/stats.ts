import {IStatisticsService} from "./types";
import {ApiClient, backend} from "./apiClient";

export class StatisticsService implements IStatisticsService {
    constructor(private readonly apiClient: ApiClient = backend) {}

    getSummaryStats = async () => {
        return {
            totalAlumni: 0,
            activeThisMonth: 0,
            newArticles: 0
        }
    }
}