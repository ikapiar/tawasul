export const SuperAdminRole = 'Super Admin' as const;
export const AdminAngkatanRole = 'Admin Angkatan' as const;
export const AlumniRole = 'Alumni' as const;
export const ApproverRoles = [SuperAdminRole, AdminAngkatanRole] as const
export type ApproverRole = typeof ApproverRoles[number];

export const Angkatans = ['Rais', 'Radar', 'Sahabat', 'Fortgas', 'Brave', 'Jaisyu', 'Aizen', 'Elegant', 'Renaissance', 'Nesil On', 'Vollmound'] as const
export type Angkatan = typeof Angkatans[number];

export const AlumniStatuses = ['Tamat 3 MA Ar Risalah', 'Kelas 1 - 3 SMP / 1 - 2 MA Ar Risalah'] as const
export type AlumniStatus = typeof AlumniStatuses[number];

export const TahunKuliahs = ['Pra-Kuliah/I\'dad/Persiapan Bahasa', 'TAMAT', 'Semester 1-2', 'Semester 3-4', 'Semester 5-6', 'Semester 7-8', 'Semester >8'] as const

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