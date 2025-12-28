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

    uploadSurveyData = async (csvFile: File) => {
        return this.apiClient.authorized.sadmin.alumniSurvey.post({file: csvFile})
    }

    getAlumniSurvey = async () => {
        return (await this.apiClient.authorized.statistics.survey.get()).data!
    }

    getAngkatanData = async () => {
        return (await this.apiClient.authorized.statistics.angkatan.get()).data!
    }
}