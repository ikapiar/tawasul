#!/usr/bin/env bun

import { writeFile } from 'fs/promises';
import { join } from 'path';

interface AlumniRecord {
    timestamp: string;
    namaLengkap: string;
    angkatan: string;
    statusAlumni: string;
    domisili: string;
    detailDomisili: string;
    nomorKontak: string;
    email: string;
    namaKampus: string;
    fakultas: string;
    jurusan: string;
    tahunKuliah: string;
    pendidikanS2: string;
    statusPendidikanS2?: string;
    sumberPembiayaanS2?: string;
    namaKampusS2?: string;
    fakultasS2?: string;
    jurusanS2?: string;
    tahunKuliahS2?: string;
    pendidikanS3?: string;
    statusPendidikanS3?: string;
    sumberPembiayaanS3?: string;
    namaKampusS3?: string;
    fakultasJurusanS3?: string;
    tahunKuliahS3?: string;
    spesialisasi?: string;
    statusPekerjaan: string;
    bidangKerjaMinat?: string;
    bidangPekerjaanSaatIni?: string;
    namaLembaga?: string;
    lokasiLembaga?: string;
    posisiJabatan?: string;
    targetJangkaPendek?: string;
    sumberInformasi: string;
    komunitasDidirikan: string;
    bidangKomunitas?: string;
    namaKomunitas?: string;
    lokasiAktivitasKomunitas?: string;
    sertifikasi?: string;
    linkedin?: string;
    pendidikanLanjutan?: string;
}

// Data arrays for generating fake data
const NAMES = [
    'Ahmad Rizki Pratama', 'Siti Nurhaliza Putri', 'Muhammad Budi Santoso', 'Dewi Lestari Wulandari',
    'Abdul Rahman Hakim', 'Aisyah Nur Fadilah', 'Rahmat Hidayat Gunawan', 'Fatimah Zahra Sari',
    'Indra Wijaya Kusuma', 'Nur Aminah Rosita', 'Ali Ibrahim Syahrul', 'Khadijah Maryam Ulfah',
    'Yusuf Ismail Prakoso', 'Zainab Ruqayyah Dewi', 'Usman Fajar Ramadhan', 'Halimah Sa\'diyah Fitri',
    'Omar Khalid Mansur', 'Aishah Safiyyah Noor', 'Hamzah Akbar Wijaya', 'Sumayah Laila Sari',
    'Bilal Ahmad Fauzi', 'Maimunah Hasna Aulia', 'Salman Rashid Hakim', 'Asma Nadia Rahmawati',
    'Tariq Irfan Maulana', 'Sakinah Izza Maharani', 'Khalil Zidan Pratama', 'Mariam Syifa Cahyani',
    'Naufal Rafif Alfarizi', 'Najwa Syahira Azzahra', 'Rayan Akmal Firdaus', 'Hanan Kayla Andini'
];

const ANGKATAN = ['1. Shafar', '2. Radar', '3. Qomar', '4. Syamsi', '5. Najmi', '6. Badri'];

const STATUS_ALUMNI = [
    'Tamat 3 MA Ar Risalah',
    'Tamat 2 MA Ar Risalah',
    'Tamat 1 MA Ar Risalah',
    'Pindah',
    'DO'
];

const PROVINCES = [
    'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatera Barat',
    'Sumatera Utara', 'Sumatera Selatan', 'Lampung', 'Banten', 'Yogyakarta',
    'Bali', 'Kalimantan Timur', 'Sulawesi Selatan', 'Riau', 'Aceh', 'Kalimantan Selatan',
    'Sulawesi Tengah', 'Papua', 'Maluku', 'Nusa Tenggara Timur'
];

const CITIES = [
    'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Utara', 'Bandung', 'Bekasi', 'Bogor',
    'Depok', 'Tangerang', 'Semarang', 'Solo', 'Yogyakarta', 'Surabaya', 'Malang',
    'Padang', 'Bukittinggi', 'Payakumbuh', 'Medan', 'Pekanbaru', 'Palembang',
    'Bandar Lampung', 'Denpasar', 'Balikpapan', 'Makassar', 'Banda Aceh', 'Banjarmasin'
];

const UNIVERSITIES = [
    'Universitas Indonesia', 'Institut Teknologi Bandung', 'Universitas Gadjah Mada',
    'Institut Pertanian Bogor', 'Universitas Brawijaya', 'Universitas Airlangga',
    'Universitas Padjadjaran', 'Universitas Diponegoro', 'Universitas Andalas',
    'Universitas Sumatera Utara', 'UIN Syarif Hidayatullah', 'UIN Sunan Kalijaga',
    'UIN Sunan Gunung Djati', 'IAIN Batusangkar', 'STAIN Curup', 'Al-azhar University',
    'Universitas Islam Indonesia', 'Universitas Muhammadiyah Jakarta', 'Institut Teknologi Sepuluh Nopember',
    'Universitas Hasanuddin', 'Universitas Riau', 'Universitas Lampung'
];

const FACULTIES = [
    'Teknik', 'Ekonomi dan Bisnis', 'Hukum', 'Kedokteran', 'Pertanian', 'MIPA',
    'Ilmu Sosial dan Politik', 'Psikologi', 'Farmasi', 'Kehutanan', 'Perikanan',
    'Ushuluddin', 'Syariah', 'Tarbiyah dan Keguruan', 'Dakwah dan Komunikasi',
    'Adab dan Humaniora', 'Sains dan Teknologi', 'Ilmu Keperawatan'
];

const MAJORS = [
    'Teknik Informatika', 'Teknik Sipil', 'Teknik Elektro', 'Teknik Mesin', 'Manajemen',
    'Akuntansi', 'Ekonomi Pembanguangan', 'Ilmu Hukum', 'Pendidikan Dokter', 'Kedokteran Gigi',
    'Agroteknologi', 'Agribisnis', 'Matematika', 'Fisika', 'Kimia', 'Biologi',
    'Hubungan Internasional', 'Ilmu Komunikasi', 'Administrasi Negara', 'Sosiologi',
    'Psikologi', 'Farmasi', 'Keperawatan', 'Hadits dan Ilmu Hadits', 'Tafsir Hadits',
    'Pendidikan Agama Islam', 'Bimbingan Konseling Islam', 'Ekonomi Syariah', 'Perbankan Syariah'
];

const JOB_FIELDS = [
    'Teknologi Informasi', 'Pendidikan', 'Kesehatan', 'Keuangan dan Perbankan',
    'Konsultan', 'Pemerintahan', 'Swasta', 'Wirausaha', 'NGO dan Sosial',
    'Media dan Komunikasi', 'Pertanian', 'Industri Manufaktur', 'Perdagangan',
    'Jasa Profesional', 'Konstruksi', 'Transportasi dan Logistik'
];

const COMPANIES = [
    'PT Telkom Indonesia', 'PT Bank Mandiri', 'PT Gojek Indonesia', 'PT Tokopedia',
    'PT Shopee International', 'Kementerian Pendidikan dan Kebudayaan', 'Kementerian Agama',
    'Rumah Sakit Fatmawati', 'RSUD Dr. Soetomo', 'SMP IT Al-Azhar', 'MA Ar Risalah',
    'Universitas Indonesia', 'Institut Teknologi Bandung', 'Yayasan Tzu Chi Indonesia',
    'Human Initiative', 'Dompet Dhuafa', 'Lazismu', 'Aksi Cepat Tanggap',
    'PT Pertamina', 'PT PLN', 'PT Astra International', 'PT Unilever Indonesia'
];

const POSITIONS = [
    'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
    'Product Manager', 'Business Analyst', 'Data Analyst', 'Data Scientist',
    'Guru', 'Dosen', 'Peneliti', 'Dokter', 'Perawat', 'Apoteker',
    'Manager', 'Supervisor', 'Team Leader', 'Staff', 'Asisten', 'Koordinator',
    'Direktur', 'Wakil Direktur', 'Kepala Bagian', 'Sekretaris', 'Admin',
    'Pembina Asrama', 'Guru Tahfidz', 'Konselor', 'Wali Kelas', 'Kepala Sekolah'
];

const COMMUNITY_TYPES = [
    'Olahraga', 'Pendidikan', 'Sosial', 'Keagamaan', 'Teknologi',
    'Seni dan Budaya', 'Lingkungan', 'Ekonomi', 'Politik', 'Kesehatan',
    'Entrepreneur', 'Volunteering', 'Alumni', 'Profesional'
];

const COMMUNITY_NAMES = [
    'Ahad Sehat', 'Tahfidz Community', 'Tech Meetup Jakarta', 'Green Earth Movement',
    'Peduli Sesama', 'Islamic Study Circle', 'Coding Bootcamp Indonesia', 'Young Entrepreneur Club',
    'Photography Enthusiast', 'Volunteer Network Indonesia', 'Alumni Care Foundation',
    'Digital Marketing Community', 'Startup Weekend', 'Islamic Finance Forum'
];

const CERTIFICATIONS = [
    'Google Cloud Professional Cloud Architect', 'AWS Solutions Architect', 'PMP (Project Management Professional)',
    'Cisco CCNA', 'Oracle Database Administrator', 'Microsoft Azure Solutions Architect',
    'Certified Scrum Master', 'Six Sigma Green Belt', 'CPA (Certified Public Accountant)',
    'Chartered Accountant', 'Google Analytics Certified', 'HubSpot Content Marketing',
    'Facebook Blueprint Certification', 'Certified Ethical Hacker', 'ITIL Foundation'
];

const INFORMATION_SOURCES = [
    'WhatsApp', 'Telegram', 'Instagram', 'Facebook', 'Email',
    'Teman Alumni', 'Website Resmi', 'Group Alumni', 'Guru/Ustadz',
    'Media Sosial', 'Broadcast Message', 'Direct Message'
];

function getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomPhone(): string {
    return `08${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`;
}

function getRandomEmail(name: string): string {
    const cleanName = name.toLowerCase().replace(/\s+/g, '.');
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    return `${cleanName}@${getRandomItem(domains)}`;
}

function getRandomTimestamp(): string {
    const year = 2022 + Math.floor(Math.random() * 2); // 2022-2023
    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);

    const date = new Date(year, month, day, hour, minute, second);
    return date.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

function generateAlumni(): AlumniRecord {
    const name = getRandomItem(NAMES);

    // Determine status probabilities
    const hasJob = Math.random() > 0.3; // 70% have jobs
    const hasS2 = Math.random() > 0.7;  // 30% have S2
    const hasS3 = Math.random() > 0.9;  // 10% have S3
    const hasCommunity = Math.random() > 0.6; // 40% have community
    const hasCertification = Math.random() > 0.5; // 50% have certification
    const hasLinkedIn = Math.random() > 0.4; // 60% have LinkedIn
    const hasAdvancedEducation = Math.random() > 0.7; // 30% have advanced education

    const alumni: AlumniRecord = {
        timestamp: getRandomTimestamp(),
        namaLengkap: name,
        angkatan: getRandomItem(ANGKATAN),
        statusAlumni: getRandomItem(STATUS_ALUMNI),
        domisili: getRandomItem(PROVINCES),
        detailDomisili: getRandomItem(CITIES),
        nomorKontak: getRandomPhone(),
        email: getRandomEmail(name),
        namaKampus: getRandomItem(UNIVERSITIES),
        fakultas: getRandomItem(FACULTIES),
        jurusan: getRandomItem(MAJORS),
        tahunKuliah: Math.random() > 0.2 ? 'TAMAT' : 'SEDANG KULIAH',

        // S2 Education
        pendidikanS2: hasS2 ? (Math.random() > 0.3 ? 'Ya' : 'Sedang') : 'Tidak',
        statusPendidikanS2: hasS2 ? (Math.random() > 0.6 ? 'TAMAT' : 'SEDANG KULIAH') : '',
        sumberPembiayaanS2: hasS2 ? (Math.random() > 0.4 ? 'Mandiri' : 'Beasiswa') : '',
        namaKampusS2: hasS2 ? getRandomItem(UNIVERSITIES) : '',
        fakultasS2: hasS2 ? getRandomItem(FACULTIES) : '',
        jurusanS2: hasS2 ? getRandomItem(MAJORS) : '',
        tahunKuliahS2: hasS2 ? `${2018 + Math.floor(Math.random() * 6)}` : '',

        // S3 Education
        pendidikanS3: hasS3 ? 'Ya' : 'Tidak',
        statusPendidikanS3: hasS3 ? (Math.random() > 0.7 ? 'TAMAT' : 'SEDANG KULIAH') : '',
        sumberPembiayaanS3: hasS3 ? (Math.random() > 0.2 ? 'Beasiswa' : 'Mandiri') : '',
        namaKampusS3: hasS3 ? getRandomItem(UNIVERSITIES) : '',
        fakultasJurusanS3: hasS3 ? `${getRandomItem(FACULTIES)} - ${getRandomItem(MAJORS)}` : '',
        tahunKuliahS3: hasS3 ? `${2020 + Math.floor(Math.random() * 4)}` : '',
        spesialisasi: hasS3 ? getRandomItem(MAJORS) : '',

        // Employment
        statusPekerjaan: hasJob ? 'BEKERJA' : (Math.random() > 0.5 ? 'MENCARI KERJA' : 'KULIAH'),
        bidangKerjaMinat: !hasJob && Math.random() > 0.3 ? getRandomItem(JOB_FIELDS) : '',
        bidangPekerjaanSaatIni: hasJob ? getRandomItem(JOB_FIELDS) : '',
        namaLembaga: hasJob ? getRandomItem(COMPANIES) : '',
        lokasiLembaga: hasJob ? getRandomItem(CITIES) : '',
        posisiJabatan: hasJob ? getRandomItem(POSITIONS) : '',
        targetJangkaPendek: Math.random() > 0.2 ? 'Meningkatkan skill profesional dan karir' : '',

        // Other info
        sumberInformasi: getRandomItem(INFORMATION_SOURCES),
        komunitasDidirikan: hasCommunity ? 'Ya' : 'Tidak',
        bidangKomunitas: hasCommunity ? getRandomItem(COMMUNITY_TYPES) : '',
        namaKomunitas: hasCommunity ? getRandomItem(COMMUNITY_NAMES) : '',
        lokasiAktivitasKomunitas: hasCommunity ? getRandomItem(CITIES) : '',
        sertifikasi: hasCertification ? getRandomItem(CERTIFICATIONS) : '',
        linkedin: hasLinkedIn ? `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '-')}` : '',
        pendidikanLanjutan: hasAdvancedEducation ? 'Ya' : 'Tidak'
    };

    return alumni;
}

function generateCSV(count: number): string {
    const headers = [
        'Timestamp', 'Nama Lengkap', 'Angkatan', 'Status Alumni', 'Domisili', 'Detail Domisili',
        'Nomor Kontak', 'Email', 'Nama Kampus/Institusi', 'Fakultas', 'Jurusan', 'Tahun Kuliah',
        'Apakah sudah/sedang menempuh pendidikan S2/profesi?', 'Status', 'Sumber pembiayaan studi',
        'Nama Kampus', 'Fakultas', 'Jurusan', 'Tahun Kuliah', 'Apakah sudah/on going pendidikan S3/Spesialis?',
        'Status', 'Sumber pembiayaan studi', 'Nama Kampus', 'Fakultas dan Jurusan', 'Tahun Kuliah',
        'Spesialisasi/bidang kepakaran', 'Status', 'Jika Sedang Mencari Kerja, antum berminat untuk bekerja di bidang?',
        'Bidang pekerjaan saat ini', 'Nama lembaga/institusi/perusahaan tempat antum bekerja',
        'Lokasi lembaga/institusi/perusahaan', 'Posisi/Jabatan', 'Apa target jangka pendek yang sedang antum usahakan?',
        'Darimana antum mendapatkan pertama kali jarkom survei pendataan ini?',
        'Apakah ada komunitas yang didirikan/dibina/dikelola?', 'Bidang Komunitas', 'Nama Komunitas',
        'Lokasi Aktivitas Komunitas', 'Bila ada sertifikasi keahlian/profesional, silahkan tuliskan',
        'Bila berkenan, sertakan tautan akun LinkedIn', 'Apakah sudah/sedang menempuh pendidikan lanjutan (Diploma/sarjana, dll)?'
    ];

    const csvRows = [headers.join(',')];

    for (let i = 0; i < count; i++) {
        const alumni = generateAlumni();

        const row = [
            alumni.timestamp,
            alumni.namaLengkap,
            alumni.angkatan,
            alumni.statusAlumni,
            alumni.domisili,
            alumni.detailDomisili,
            alumni.nomorKontak,
            alumni.email,
            alumni.namaKampus,
            alumni.fakultas,
            alumni.jurusan,
            alumni.tahunKuliah,
            alumni.pendidikanS2,
            alumni.statusPendidikanS2 || '',
            alumni.sumberPembiayaanS2 || '',
            alumni.namaKampusS2 || '',
            alumni.fakultasS2 || '',
            alumni.jurusanS2 || '',
            alumni.tahunKuliahS2 || '',
            alumni.pendidikanS3 || '',
            alumni.statusPendidikanS3 || '',
            alumni.sumberPembiayaanS3 || '',
            alumni.namaKampusS3 || '',
            alumni.fakultasJurusanS3 || '',
            alumni.tahunKuliahS3 || '',
            alumni.spesialisasi || '',
            alumni.statusPekerjaan,
            alumni.bidangKerjaMinat || '',
            alumni.bidangPekerjaanSaatIni || '',
            alumni.namaLembaga || '',
            alumni.lokasiLembaga || '',
            alumni.posisiJabatan || '',
            alumni.targetJangkaPendek || '',
            alumni.sumberInformasi,
            alumni.komunitasDidirikan,
            alumni.bidangKomunitas || '',
            alumni.namaKomunitas || '',
            alumni.lokasiAktivitasKomunitas || '',
            alumni.sertifikasi || '',
            alumni.linkedin || '',
            alumni.pendidikanLanjutan || ''
        ];

        // Escape quotes and wrap fields in quotes
        const escapedRow = row.map(field => `"${field.toString().replace(/"/g, '""')}"`);
        csvRows.push(escapedRow.join(','));
    }

    return csvRows.join('\n');
}

async function main() {
    const args = process.argv.slice(2);
    const count = args[0] ? parseInt(args[0]) : 100;

    console.log(`🚀 Generating ${count} fake alumni records...`);

    const csvContent = generateCSV(count);
    const filename = 'alumni.csv';
    const filepath = join(__dirname, filename);

    try {
        await writeFile(filepath, csvContent, 'utf-8');
        console.log(`✅ Successfully generated ${filename}`);
        console.log(`📁 File saved to: ${filepath}`);
        console.log(`📊 Total records: ${count}`);
    } catch (error) {
        console.error('❌ Error writing file:', error);
        process.exit(1);
    }
}

// Run the generator
main().catch(console.error);