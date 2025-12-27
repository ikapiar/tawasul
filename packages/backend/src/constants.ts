export const SuperAdminRole = 'Super Admin' as const;
export const AdminAngkatanRole = 'Admin Angkatan' as const;
export const AlumniRole = 'Alumni' as const;
export const ApproverRoles = [SuperAdminRole, AdminAngkatanRole] as const
export type ApproverRole = typeof ApproverRoles[number];

export const AngkatanNames = ['Rais', 'Radar', 'Sahabat', 'Fortgas', 'Brave', 'Jaisyu', 'Aizen', 'Elegant', 'Renaissance', 'Nesil On', 'Vollmound'] as const
export type AngkatanName = typeof AngkatanNames[number];

export const Genders = ['Laki-laki', 'Perempuan'] as const
export type Gender = typeof Genders[number];


export const CanLoginUserStatuses = ['Approved', 'Active'] as const
export type CanLoginUserStatus = typeof CanLoginUserStatuses[number];
export const UserStatuses = ['PendingApproval', ...CanLoginUserStatuses, 'Blocked', 'Deleted'] as const
export type UserStatus = typeof UserStatuses[number];

export const USER_JWT_COOKIE_NAME = 'user_token'
export const USER_JWT_COOKIE_DELETED_VALUE = 'deleted'

export const ROOT_USER = {
    name: 'root',
    email: 'root@tawasul',
    roles: [SuperAdminRole]
}