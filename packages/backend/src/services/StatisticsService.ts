import {Elysia} from "elysia";
import { db } from "../db";

export class StatisticsService {
    constructor(private readonly dbClient: typeof db = db) {}

    private static readonly PLUGIN_NAME = 'statisticsService' as const;

    public static statisticsServicePlugin = () => new Elysia().decorate(this.PLUGIN_NAME, new StatisticsService())

    public getAllSurveyData = async () => {
        const data = await this.dbClient.query.alumniSurveyTable.findMany().execute()
        return data.map(alumniData => ({
            ...alumniData,
            namaLengkap: 'redacted',
            nomorKontak: 'redacted',
            email: 'redacted',
            formValues: {
                ...alumniData.formValues,
                "Detail Domisili": 'redacted',
                "Lokasi Aktivitas Komunitas": 'redacted',
                "Lokasi lembaga/institusi/perusahaan": 'redacted'
            }
        }))
    }

    public getAngkatanData = async () => this.dbClient.query.angkatanTable.findMany().execute()
}