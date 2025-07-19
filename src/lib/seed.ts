import 'dotenv/config';
import { adminDb } from './firebase/admin';
import type { UserProfile } from './user';

const sampleData = [
  {
    "Timestamp": "02/01/2023 18:24:08",
    "Nama Lengkap": "Avei Sample",
    "Angkatan": "8. Elegant",
    "Status Alumni": "Tamat 3 MA Ar Risalah",
    "Domisili": "Sumatera Barat",
    "Detail Domisili": "Padang",
    "Nomor Kontak": "08000000",
    "Email": "avei@local.com",
    "Nama Kampus/Institusi": "Universitas Sample",
    "Fakultas": "Syari'ah",
    "Jurusan": "",
    "Tahun Kuliah S1": "TAMAT",
    "Apakah sudah/sedang menempuh pendidikan S2/profesi?": "Ya",
    "Status S2": "S2",
    "Sumber pembiayaan studi S2": "Biaya Sendiri (Self Funding)",
    "Nama Kampus S2": "UNiv S2",
    "Fakultas S2": "Hukum Kristen",
    "Jurusan S2": "",
    "Tahun Kuliah S2": "TAMAT",
    "Apakah sudah/on going pendidikan S3/Spesialis?": "Ya",
    "Status S3": "S3",
    "Sumber pembiayaan studi S3": "Beasiswa Pemerintah Lainnya",
    "Nama Kampus S3": "UIN Imam Bonjol",
    "Fakultas dan Jurusan S3": "Hukum Buddha",
    "Tahun Kuliah S3": "Semester 3-4",
    "Spesialisasi/bidang kepakaran": "Hukum Islam",
    "Status": "KULIAH",
    "Jika Sedang Mencari Kerja, antum berminat untuk bekerja di bidang?": "",
    "Bidang pekerjaan saat ini": "Pendidikan",
    "Nama lembaga/institusi/perusahaan tempat antum bekerja": "Yayasan Amalan",
    "Lokasi lembaga/institusi/perusahaan": "Balai Ketek",
    "Posisi/Jabatan": "Ketua Kelas",
    "Apa target jangka pendek yang sedang antum usahakan?": "Selesai S3",
    "Darimana antum mendapatkan pertama kali jarkom survei pendataan ini?": "Grup Whatsapp Ikapiar Wilayah",
    "Apakah ada komunitas yang didirikan/dibina/dikelola?": "Ya",
    "Bidang Komunitas": "Sosial Kemasyarakatan, Dakwah",
    "Nama Komunitas": "Makna",
    "Lokasi Aktivitas Komunitas": "Padang",
    "Bila ada sertifikasi keahlian/profesional, silahkan tuliskan": "Sertifikasi wakaf",
    "Bila berkenan, sertakan tautan akun LinkedIn": "",
    "Apakah sudah/sedang menempuh pendidikan lanjutan (Diploma/sarjana, dll)?": "Ya"
  }
];

async function seedDatabase() {
  console.log('Starting to seed database...');
  const usersCollection = adminDb.collection('users');

  for (const data of sampleData) {
    const userProfile: Omit<UserProfile, 'id' | 'roles' | 'isApproved' | 'createdAt' | 'updatedAt'> & { email: string } = {
      email: data.Email,
      fullName: data['Nama Lengkap'],
      generation: data.Angkatan,
      alumniStatus: 'Alumni MA', // Simplified for seeding
      domicileProvince: data.Domisili,
      domicileCity: data['Detail Domisili'],
      contactNumber: data['Nomor Kontak'],
      status: 'KULIAH', // Simplified
      workField: data['Bidang pekerjaan saat ini'],
      company: data['Nama lembaga/institusi/perusahaan tempat antum bekerja'],
      companyLocation: data['Lokasi lembaga/institusi/perusahaan'],
      jobTitle: data['Posisi/Jabatan'],
      educationHistory: [], // Can be populated more accurately
      shortTermGoals: data['Apa target jangka pendek yang sedang antum usahakan?'],
      referralSource: data['Darimana antum mendapatkan pertama kali jarkom survei pendataan ini?'],
      linkedinUrl: data['Bila berkenan, sertakan tautan akun LinkedIn'],
    };

    try {
      // Use email as the document ID for simplicity in this seeder
      await usersCollection.doc(data.Email).set({
        ...userProfile,
        id: data.Email, // In real app, this would be Firebase UID
        roles: ['alumni'],
        isApproved: true, // Pre-approve seeded data
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`Successfully seeded user: ${data['Nama Lengkap']}`);
    } catch (error) {
      console.error(`Error seeding user ${data['Nama Lengkap']}:`, error);
    }
  }

  console.log('Database seeding finished.');
}

seedDatabase().catch(console.error);
