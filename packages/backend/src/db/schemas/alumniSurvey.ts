import {pgTable, timestamp, varchar, json, serial} from "drizzle-orm/pg-core";

export const alumniSurveyTable = pgTable("alumniSurvey", {
    id: serial().primaryKey(),
    timestamp: timestamp('timestamp', {withTimezone: true, mode: "date"}).notNull().defaultNow(),
    namaLengkap: varchar({ length: 255 }).notNull(),
    angkatan: varchar({ length: 255 }).notNull(),
    nomorKontak: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    formValues: json()
})