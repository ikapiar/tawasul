import {integer, pgEnum, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {alumniTable} from "./alumni";

export const AngkatanCategories = ['putra', 'putri'] as const
export type AngkatanCategory = typeof AngkatanCategories[number];
export const AngkatanCategoryEnum = pgEnum('angkatan_category_enum', AngkatanCategories)

export const angkatanTable = pgTable('angkatan', {
    id: serial().primaryKey(),
    name: text().notNull(),
    order: integer().notNull(),
    memberCount: integer().notNull().default(0),
    category: AngkatanCategoryEnum(),
})

export const angkatanRelations = relations(angkatanTable, ({ many }) => ({
    alumnis: many(alumniTable)
}))