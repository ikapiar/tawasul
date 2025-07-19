export type UserRole = 'alumni' | 'student' | 'teacher' | 'admin' | 'superadmin';

export type UserStatus = 'KULIAH' | 'BEKERJA' | 'KURSUS/DIKLAT' | 'SEDANG MENCARI KERJA' | 'LAINNYA';

export interface Education {
  level: 'S1' | 'S2' | 'S3' | 'Spesialis' | 'Diploma';
  university?: string;
  faculty?: string;
  major?: string;
  status: 'TAMAT' | 'AKTIF' | 'CUTI' | 'DO';
  fundingSource?: string;
  graduationYear?: number;
}

export interface Community {
  field: string;
  name: string;
  location: string;
}

export interface UserProfile {
  id: string; // Firebase Auth UID
  email: string; // Firebase Auth Email
  fullName: string;
  generation: string; // e.g., "8. Elegant"
  alumniStatus: 'Alumni SMP' | 'Alumni MA' | 'Lainnya';
  domicileProvince: string;
  domicileCity: string;
  contactNumber?: string;
  
  status: UserStatus;
  workField?: string;
  company?: string;
  companyLocation?: string;
  jobTitle?: string;

  educationHistory: Education[];
  
  shortTermGoals?: string;
  referralSource?: string; // Darimana antum mendapatkan pertama kali jarkom
  
  community?: Community;
  certifications?: string[];
  linkedinUrl?: string;

  roles: UserRole[];
  isApproved: boolean;
  approvedBy?: string; // UID of admin who approved
  createdAt: Date;
  updatedAt: Date;
}
