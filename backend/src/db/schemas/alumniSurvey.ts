import {pgTable, integer, timestamp, varchar, json} from "drizzle-orm/pg-core";

export const alumniSurveyTable = pgTable("alumniSurvey", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    timestamp: timestamp().defaultNow(),
    namaLengkap: varchar({ length: 255 }).notNull(),
    angkatan: varchar({ length: 255 }).notNull(),
    nomorKontak: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    formValues: json()
})