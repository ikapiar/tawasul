import {integer, pgEnum, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {alumniTable} from "./alumni";

export const AngkatanCategories = ['putra', 'putri'] as const
export type AngkatanCategory = typeof AngkatanCategories[number];
export const AngkatanCategoryEnum = pgEnum('angkatan_category_enum', AngkatanCategories)

export const angkatanTable = pgTable('angkatan', {
    id: serial('id').primaryKey(),
    name: text().notNull(),
    order: integer().notNull(),
    category: AngkatanCategoryEnum(),
})

export const angkatanRelations = relations(angkatanTable, ({ many }) => ({
    alumnis: many(alumniTable)
}))