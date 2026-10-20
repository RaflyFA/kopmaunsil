export type EventDoc = {
  id: string
  title: string
  category: 'Pendidikan' | 'RAT' | 'Dies Natalis' | 'Sosial & Wirausaha'
  date: string
  location: string
  summary: string
  photosCount: number
  coverImage: string
  gallery: {
    url: string
    caption: string
  }[]
  likes: number
}

export const documentationEvents: EventDoc[] = [
  {
    id: 'doc-diksarkop-2026',
    title: 'DIKSARKOP Angkatan 2026: Generasi Baru Koperasi',
    category: 'Pendidikan',
    date: '15 Februari 2026',
    location: 'Gedung Rektorat Lt. 2 Universitas Siliwangi',
    summary: 'Pendidikan Dasar Koperasi menyambut 120+ kader baru dengan pemaparan jati diri koperasi, simulasi bisnis kelompok, dan team building.',
    photosCount: 6,
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    likes: 87,
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
        caption: 'Penyampaian materi nilai dan prinsip koperasi oleh alumni pengurus KOPMA.',
      },
      {
        url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
        caption: 'Diskusi kelompok studi kasus simulasi penyusunan model bisnis koperasi.',
      },
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sesi ice breaking dan pembagian atribut kelengkapan kader anggota baru.',
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Foto bersama seluruh panitia PSDA dan peserta DIKSARKOP 2026.',
      },
    ],
  },
  {
    id: 'doc-rat-2025',
    title: 'Rapat Anggota Tahunan (RAT) Tahun Buku 2025',
    category: 'RAT',
    date: '20 Januari 2026',
    location: 'Auditorium Utama UNSIL',
    summary: 'Musyawarah tertinggi anggota untuk evaluasi laporan pertanggungjawaban pengurus, pengawas, dan pengesahan pembagian SHU.',
    photosCount: 8,
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    likes: 104,
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sidang pleno pembahasan tata tertib dan laporan pertanggungjawaban.',
      },
      {
        url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemberian apresiasi anggota teraktif dan transaksi terbanyak tahun 2025.',
      },
      {
        url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
        caption: 'Penyampaian pandangan umum dan tanya jawab dari perwakilan anggota.',
      },
    ],
  },
  {
    id: 'doc-dies-natalis-42',
    title: 'Dies Natalis KOPMA UNSIL ke-42: Bersatu Menuju Mandiri',
    category: 'Dies Natalis',
    date: '23 April 2025',
    location: 'Halaman Gedung Student Center UNSIL',
    summary: 'Peringatan hari lahir koperasi mahasiswa dengan expo wirausaha anggota, potong tumpeng kebersamaan, dan donor darah sosial.',
    photosCount: 12,
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    likes: 126,
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
        caption: 'Malam keakraban Dies Natalis bersama alumni dan pembina KOPMA.',
      },
      {
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
        caption: 'Stand bazaar produk kuliner dan merchandise karya anggota binaan PSDA.',
      },
      {
        url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pemotongan tumpeng peringatan hari ulang tahun ke-42 KOPMA UNSIL.',
      },
    ],
  },
  {
    id: 'doc-bazaar-wirausaha',
    title: 'KOPMA Youth Entrepreneur Fair & Pitching Day',
    category: 'Sosial & Wirausaha',
    date: '12 November 2025',
    location: 'Plaza Kampus 1 Siliwangi',
    summary: 'Ajang unjuk gigi ide bisnis anggota Kopma Incubation Class dengan pendampingan langsung praktisi UMKM Tasikmalaya.',
    photosCount: 5,
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    likes: 62,
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sesi pitching rencana bisnis di hadapan dewan kurator dan perbankan syariah.',
      },
      {
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
        caption: 'Konsultasi kemasan dan legalitas produk bersama dinas koperasi daerah.',
      },
    ],
  },
]
