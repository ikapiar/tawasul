import {pgEnum, pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {UserStatuses} from "../../constants";
import {relations} from "drizzle-orm";
import {userToRole} from "./role";

export const userStatusEnum = pgEnum('user_status_enum', UserStatuses)

export const userTable = pgTable('users', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    status: userStatusEnum().notNull()
})

export const userRelations = relations(userTable, ({many}) => ({
    roles: many(userToRole)
}))