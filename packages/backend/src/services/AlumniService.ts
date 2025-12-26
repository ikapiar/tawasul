import {Elysia} from "elysia";
import { parse } from "csv-parse";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {AlumniFormValue} from "../db/schemas";
import {Angkatans} from "../constants";

// Enable parsing with custom format strings (e.g., DD/MM/YYYY H:mm:ss)
dayjs.extend(customParseFormat);

export class AlumniService {
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

    public replaceAllSurveyData = async (parsedCSV: CSVValue[]) => {
        const { db } = await import('../db');
        const { alumniSurveyTable } = await import('../db/schemas');
        await db.delete(alumniSurveyTable)
        for (const csvValue of parsedCSV) {
            const {Timestamp, 'Nama Lengkap': namaLengkap, Angkatan: rawAngaktan, 'Nomor Kontak': nomorKontak, Email: email, ...formValues} = csvValue
            const timestamp = dayjs(Timestamp as string, 'DD/MM/YYYY H:mm:ss').toDate()
            const angkatan = Angkatans.find(agkt => rawAngaktan.toString().toLowerCase().includes(agkt.toLowerCase()))!
            await db.insert(alumniSurveyTable).values({
                timestamp,
                namaLengkap: namaLengkap as string,
                angkatan: angkatan,
                nomorKontak: nomorKontak as string,
                email: email as string,
                formValues: formValues as AlumniFormValue
            }).execute()
        }
    }
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