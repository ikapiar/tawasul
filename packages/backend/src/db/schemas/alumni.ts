import {integer, pgEnum, pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {angkatanTable} from "./angkatan";
import {Genders} from "../../constants";

export const genderEnum = pgEnum('gender_enum', Genders)

export const alumniTable = pgTable('alumni', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
    gender: genderEnum().notNull(),
    angkatanId: integer().notNull(),
})

export type Alumni = typeof alumniTable.$inferSelect

export const alumniRelations = relations(alumniTable, ({ one }) => ({
    angkatan: one(angkatanTable, {
        fields: [alumniTable.angkatanId],
        references: [angkatanTable.id]
    }),
}))