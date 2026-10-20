export type AspirationCategory = 'Pelatihan & Skill' | 'Event & Gathering' | 'Usaha & Fasilitas' | 'Kritik & Saran'

export type AspirationStatus = 'Ditinjau PSDA' | 'Disetujui' | 'Sedang Berjalan' | 'Diagendakan'

export type Aspiration = {
  id: string
  title: string
  description: string
  category: AspirationCategory
  authorName: string
  authorRole: string
  createdAt: string
  upvotes: number
  status: AspirationStatus
  tags: string[]
  adminResponse?: string
}

export const initialAspirations: Aspiration[] = [
  {
    id: 'asp-1',
    title: 'Pelatihan Barista & Manajemen Coffee Corner KOPMA',
    description: 'Mohon diadakan Kopma Incubation Class tentang barista dan pengelolaan warung kopi. Mengingat banyak anggota yang ingin belajar usaha F&B.',
    category: 'Pelatihan & Skill',
    authorName: 'Anggota Aktif',
    authorRole: 'Fakultas Ekonomi',
    createdAt: '18 Okt 2026',
    upvotes: 42,
    status: 'Disetujui',
    tags: ['Kewirausahaan', 'KIC', 'F&B'],
    adminResponse: 'Terima kasih usulannya! PSDA sedang menyusun silabus bersama divisi usaha untuk batch November.',
  },
  {
    id: 'asp-2',
    title: 'Penyediaan Sistem Pembayaran QRIS Dinamis di Kantin KOPMA',
    description: 'Sering antre panjang saat jam istirahat. Jika ada display QRIS otomatis di kasir kantin, transaksi anggota bisa lebih cepat.',
    category: 'Usaha & Fasilitas',
    authorName: 'Anggota KOPMA',
    authorRole: 'Fakultas Teknik',
    createdAt: '15 Okt 2026',
    upvotes: 38,
    status: 'Sedang Berjalan',
    tags: ['Digitalisasi', 'Fasilitas', 'Kantin'],
    adminResponse: 'Saat ini mesin EDC dan display QRIS sedang diintegrasikan bersama mitra perbankan.',
  },
  {
    id: 'asp-3',
    title: 'KOPMA Fun Run & Gathering Dies Natalis ke-43',
    description: 'Untuk Dies Natalis mendatang, bagaimana kalau diadakan lari santai 5K keliling kampus UNSIL plus bazaar produk wirausaha anggota?',
    category: 'Event & Gathering',
    authorName: 'Anggota Angkatan 2025',
    authorRole: 'Fakultas Keguruan & Ilmu Pendidikan',
    createdAt: '10 Okt 2026',
    upvotes: 29,
    status: 'Diagendakan',
    tags: ['Dies Natalis', 'Olahraga', 'Solidaritas'],
  },
  {
    id: 'asp-4',
    title: 'Workshop Desain Grafis Canva & AI untuk Promosi Bisnis Anggota',
    description: 'Banyak anggota punya usaha sampingan tapi bingung buat konten feed Instagram. Mohon PSDA adakan mentoring desain visual praktis.',
    category: 'Pelatihan & Skill',
    authorName: 'Anggota Baru',
    authorRole: 'Fakultas Pertanian',
    createdAt: '08 Okt 2026',
    upvotes: 24,
    status: 'Ditinjau PSDA',
    tags: ['Desain', 'Marketing', 'Skill'],
  },
  {
    id: 'asp-5',
    title: 'Pengadaan Ruang Diskusi dan Co-Working Khusus Anggota',
    description: 'Bagus jika di sekretariat disediakan corner meja kerja dengan colokan dan Wi-Fi cepat untuk belajar bareng atau nugas.',
    category: 'Usaha & Fasilitas',
    authorName: 'Anggota KOPMA',
    authorRole: 'Fakultas Ilmu Kesehatan',
    createdAt: '02 Okt 2026',
    upvotes: 19,
    status: 'Ditinjau PSDA',
    tags: ['Sekretariat', 'Fasilitas', 'Kenyamanan'],
  },
]
