import {Elysia} from "elysia";
import { parse } from "csv-parse";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {AlumniFormValue, alumniSurveyTable} from "../db/schemas";
import {AngkatanNames} from "../constants";
import {db} from "../db";

// Enable parsing with custom format strings (e.g., DD/MM/YYYY H:mm:ss)
dayjs.extend(customParseFormat);

export class AlumniService {
    constructor(
        private readonly dbClient: typeof db = db
    ) {
    }
    private static readonly PLUGIN_NAME = 'alumniService' as const

    public static alumniServicePlugin = () => new Elysia().decorate(this.PLUGIN_NAME, new AlumniService())

    public parseSurveyCSV = async (csv: string): Promise<CSVValue[]> => new Promise((resolve, reject) => {
        const records: CSVValue[] = []
        const parsing = parse(csv, {columns: true , group_columns_by_name: true});
        parsing.on('readable', () => {
            let record: CSVValue = {};
            while ((record = parsing.read()) !== null) {
                if (!RequiredAlumniSurveyCSVHeaders.every((h) => Object.keys(record).includes(h))) {
                    return reject(
                        new InvalidAlumniSurveyCSVHeaders(`All required fields should exist: ${RequiredAlumniSurveyCSVHeaders.join(', ')}`)
                    );
                }
                records.push(record);
            }
        })
        parsing.on('end', () => resolve(records));
        parsing.on('error', err => reject(err));
    })

    public async *replaceAllSurveyData(parsedCSV: CSVValue[]): AsyncGenerator<UploadProgress> {
        let current = 0
        yield {current, total: parsedCSV.length, percentage: 0, message: 'Deleting old data...'}
        await this.dbClient.delete(alumniSurveyTable)
        yield {current, total: parsedCSV.length, percentage: 0, message: 'Inserting new data...'}
        for (const csvValue of parsedCSV) {
            const {Timestamp, 'Nama Lengkap': namaLengkap, Angkatan: rawAngaktan, 'Nomor Kontak': nomorKontak, Email: email, ...formValues} = csvValue
            const timestamp = dayjs(Timestamp as string, 'DD/MM/YYYY H:mm:ss').toDate()
            const angkatan = AngkatanNames.find(agkt => rawAngaktan.toString().toLowerCase().includes(agkt.toLowerCase()))!
            await this.dbClient.insert(alumniSurveyTable).values({
                timestamp,
                namaLengkap: namaLengkap as string,
                angkatan: angkatan,
                nomorKontak: nomorKontak as string,
                email: email as string,
                formValues: formValues as AlumniFormValue
            }).execute()
            current++
            yield {current, total: parsedCSV.length, percentage: Math.round((current / parsedCSV.length) * 100), message: 'Inserting new data...'}
        }
        yield {current, total: parsedCSV.length, percentage: 100, message: 'Done'}
    }
}

export type UploadProgress = {
    current: number,
    total: number,
    percentage: number,
    message: string
}

export const RequiredAlumniSurveyCSVHeaders = [
    'Timestamp',
    'Nama Lengkap',
    'Angkatan',
    'Nomor Kontak',
    'Email'
] as const
export type RequiredAlumniSurveyCSVHeader = typeof RequiredAlumniSurveyCSVHeaders[number];

export type CSVValue = Record<string | RequiredAlumniSurveyCSVHeader, string | string[]>

export class InvalidAlumniSurveyCSVHeaders extends Error {
    constructor(message: string) {
        super(message);
    }
}