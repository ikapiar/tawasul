import { pgTable, timestamp, varchar, json, serial } from "drizzle-orm/pg-core";
import {AngkatanName} from "../../constants";

export const alumniSurveyTable = pgTable("alumniSurvey", {
    id: serial().primaryKey(),
    timestamp: timestamp('timestamp', { withTimezone: true, mode: "date" }).notNull().defaultNow(),
    namaLengkap: varchar({ length: 255 }).notNull(),
    angkatan: varchar({ length: 255 }).notNull().$type<AngkatanName>(),
    nomorKontak: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    formValues: json().$type<AlumniFormValue>().notNull()
})

export type AlumniSurvey = typeof alumniSurveyTable.$inferSelect

export const AlumniStatuses = ['Tamat 3 MA Ar Risalah', 'Kelas 1 - 3 SMP / 1 - 2 MA Ar Risalah'] as const
export type AlumniStatus = typeof AlumniStatuses[number];

export const TahunKuliahs = ['Pra-Kuliah/I\'dad/Persiapan Bahasa', 'TAMAT', 'Semester 1-2', 'Semester 3-4', 'Semester 5-6', 'Semester 7-8', 'Semester >8'] as const
export type TahunKuliah = typeof TahunKuliahs[number]

export const AngkatanOptions = [
    "1. Rais",
    "2. Radar",
    "3. Sahabat",
    "4. Fortgas",
    "5. Brave",
    "6. Jaisyu",
    "7. Aizen",
    "8. Elegant",
    "9. Renaissance",
    "10. Nesil On",
    "11. Vollmound",
    "12. Xaviour",
    "13. Alter",
    "14. Verwalten",
    "15. Endeavor"
] as const
export type AngkatanOption = typeof AngkatanOptions[number]

export const Domisilis = [
    "Luar Negeri",
    "Nanggroe Aceh Darussalam",
    "Sumatera Utara",
    "Sumatera Selatan",
    "Sumatera Barat",
    "Bengkulu",
    "Riau",
    "Kepulauan Riau",
    "Jambi",
    "Lampung",
    "Bangka Belitung",
    "Kalimantan Barat",
    "Kalimantan Timur",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Utara",
    "Banten",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "Daerah Istimewa Yogyakarta",
    "Jawa Timur",
    "Bali",
    "Nusa Tenggara Timur",
    "Nusa Tenggara Barat",
    "Gorontalo",
    "Sulawesi Barat",
    "Sulawesi Tengah",
    "Sulawesi Utara",
    "Sulawesi Tenggara",
    "Sulawesi Selatan",
    "Maluku Utara",
    "Maluku",
    "Papua Barat",
    "Papua",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Selatan",
    "Papua Barat Daya"
] as const
export type Domisili = typeof Domisilis[number]

export const ProfessionalStatuses = [
    'S2', 'Pendidikan Profesi', // Pendidikan Lanjutan
    'S3', 'Spesialis', // Pendidikan Lanjutan (Khusus S3)
    'KULIAH', 'BEKERJA', 'KURSUS/DIKLAT', 'SEDANG MENCARI KERJA' // Aktifitas Terkini
] as const
export type ProfessionalStatus = typeof ProfessionalStatuses[number]

export const PostgradFundings = [
    'Biaya Sendiri (Self Funding)',
    'LPDP',
    'Beasiswa Pemerintah Lainnya',
    'Chevening',
    'Fullbright',
    'Australian Award',
    'Monbugakusho',
    'Beasiswa dari Kampus',
    'Beasiswa dari Lembaga'
] as const
export type PostgradFunding = (typeof PostgradFundings[number])

export const DoctoralFundings = [
    'Biaya Sendiri (Self Funding)',
    'LPDP',
    'Beasiswa Pemerintah Lainnya',
    'Chevening',
    'Fullbright',
    'Australian Award',
    'Beasiswa dari Kampus'
] as const
export type DoctoralFunding = typeof DoctoralFundings[number]

export const BidangPekerjaans = [
    'Pendidikan',
    'ASN',
    'Seni/Desain/Penggiat Seni',
    'BUMN',
    'Hukum',
    'IT',
    'Kesehatan',
    'Bisnis',
    'TNI/Polri',
    'Politik',
    'Konsultan',
    'Fintech',
    'Content Creator/Influencer/Youtuber'
]
export type BidangPekerjaan = typeof BidangPekerjaans[number]

export const JarkomSources = ['Grup Whatsapp Angkatan', 'Grup Whatsapp Ikapiar Wilayah', 'Telegram', 'Instagram', 'Email'] as const
export type JarkomSource = typeof JarkomSources[number]

export const MacamKomunitas = ['Olahraga', 'Sosial Kemasyarakatan', 'Dakwah', 'Penggiat seni', 'Pecinta Alam/Satwa/Flora', 'Pendidikan', 'Komunitas Hobi', 'Paguyuban Kedaerahan'] as const
export type Komunitas = typeof MacamKomunitas[number]

export type AlumniFormValue = {
    "Status Alumni": AlumniStatus,
    "Domisili": Domisili,
    "Detail Domisili": string,
    "Nama Kampus/Institusi": string,
    "Fakultas": [
        string | "", // Pendidikan pasca SMA/MA sederajat
        string | ""  // Pendidikan Lanjutan
    ],
    "Jurusan": [
        string | "", // Pendidikan pasca SMA/MA sederajat
        string | ""  // Pendidikan Lanjutan
    ],
    "Tahun Kuliah": [
        TahunKuliah | "", // Pendidikan pasca SMA/MA sederajat
        TahunKuliah | "", // Pendidikan Lanjutan
        TahunKuliah | ""  // Pendidikan Lanjutan (Khusus S3)
    ],
    "Apakah sudah/sedang menempuh pendidikan S2/profesi?": "Ya" | "Tidak",
    "Status": [
        ProfessionalStatus | "", // Pendidikan Lanjutan
        ProfessionalStatus | "", // Pendidikan Lanjutan (Khusus S3)
        ProfessionalStatus | ""  // Aktifitas Terkini
    ],
    "Sumber pembiayaan studi": [
        PostgradFunding | string | "", // Pendidikan Lanjutan
        DoctoralFunding | "" // Pendidikan Lanjutan (Khusus S3)
    ],
    "Nama Kampus": [
        string | "", // Pendidikan Lanjutan
        string | ""  // Pendidikan Lanjutan (Khusus S3)
    ],
    "Apakah sudah/on going pendidikan S3/Spesialis?": "Ya" | "Tidak" | "",
    "Fakultas dan Jurusan": string | "",                                            // Pendidikan Lanjutan (Khusus S3)
    "Spesialisasi/bidang kepakaran": string | "",                                   // Pendidikan Lanjutan (Khusus S3)
    "Jika Sedang Mencari Kerja, antum berminat untuk bekerja di bidang?": string,   // Aktifitas Terkini
    "Bidang pekerjaan saat ini": BidangPekerjaan | string,                          // Aktifitas Terkini
    "Nama lembaga/institusi/perusahaan tempat antum bekerja": string,               // Aktifitas Terkini
    "Lokasi lembaga/institusi/perusahaan": string,                                  // Aktifitas Terkini
    "Posisi/Jabatan": string,                                                       // Aktifitas Terkini
    "Apa target jangka pendek yang sedang antum usahakan?": string,                 // Aktifitas Terkini
    "Darimana antum mendapatkan pertama kali jarkom survei pendataan ini?": string, // Survei Keefektifan Informasi
    "Apakah ada komunitas yang didirikan/dibina/dikelola?": string,                 // Aktifitas Terkini
    "Bidang Komunitas": Komunitas | string, // comma can separate multiple // Aktifitas Terkini
    "Nama Komunitas": string,                                                       // Aktifitas Terkini
    "Lokasi Aktivitas Komunitas": string,                                           // Aktifitas Terkini
    "Bila ada sertifikasi keahlian/profesional, silahkan tuliskan": string,         // Aktifitas Terkini
    "Bila berkenan, sertakan tautan akun LinkedIn": string,                         // Aktifitas Terkini
    "Apakah sudah/sedang menempuh pendidikan lanjutan (Diploma/sarjana, dll)?": "Ya" | "Tidak"
}