import {integer, pgEnum, pgTable, serial, text, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {angkatanTable} from "./angkatan";
import {Genders, UserStatuses} from "../../constants";

export const genderEnum = pgEnum('gender_enum', Genders)

export const alumniTable = pgTable('alumni', {
    id: serial('id').primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
    gender: genderEnum().notNull(),
    angkatanId: integer().notNull(),
})

export const alumniRelations = relations(alumniTable, ({ one }) => ({
    angkatan: one(angkatanTable, {
        fields: [alumniTable.angkatanId],
        references: [angkatanTable.id]
    }),
}))