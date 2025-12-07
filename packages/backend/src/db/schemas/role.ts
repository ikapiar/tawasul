import {integer, pgTable, primaryKey, serial, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {userTable} from "./user";

export const SuperAdminRole = 'Super Admin' as const;
export const AdminAngkatanRole = 'Admin Angkatan' as const;
export const AlumniRole = 'Alumni' as const;
export const ApproverRoles = [SuperAdminRole, AdminAngkatanRole] as const
export type ApproverRole = typeof ApproverRoles[number];

export const roleTable = pgTable('roles', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
})

export const userToRole = pgTable("userToRole", {
    userId: integer().notNull().references(() => userTable.id),
    roleId: integer().notNull().references(() => roleTable.id),
}, (t) => [primaryKey({ columns: [t.userId, t.roleId] })]);

export const roleRelations = relations(roleTable, ({many}) => ({
    users: many(userToRole),
}))

export const userToRoleRelations = relations(userToRole, ({ one }) => ({
    user: one(userTable, {
        fields: [userToRole.roleId],
        references: [userTable.id]
    }),
    role: one(roleTable, {
        fields: [userToRole.userId],
        references: [roleTable.id]
    }),
}))