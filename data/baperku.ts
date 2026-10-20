export type Module = {
  slug: string
  title: string
  description: string
  readTime: number
  intro: string
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
}

export const modules: Module[] = [
  {
    slug: 'profil-kopma-unsil',
    title: 'Profil KOPMA UNSIL',
    description: 'Mengenal identitas dan peran KOPMA UNSIL.',
    readTime: 4,
    intro: 'KOPMA UNSIL adalah koperasi mahasiswa yang menitikberatkan pengembangan anggota sebagai core identity.',
    sections: [
      {
        heading: 'Sekilas tentang KOPMA UNSIL',
        paragraphs: [
          'Koperasi Mahasiswa Universitas Siliwangi menjadi ruang belajar bersama bagi mahasiswa untuk bertumbuh dalam kepemimpinan, kewirausahaan, dan nilai-nilai koperasi.',
        ],
        bullets: [
          'Berdiri pada 23 April 1983',
          'Berlokasi di Jl. Siliwangi No. 24, Tasikmalaya',
          'Mengembangkan anggota sebagai inti gerakan',
        ],
      },
    ],
  },
  {
    slug: 'sejarah-kopma-unsil',
    title: 'Sejarah KOPMA UNSIL',
    description: 'Perjalanan gerakan koperasi mahasiswa sejak 1983.',
    readTime: 5,
    intro: 'KOPMA UNSIL tumbuh dari semangat mahasiswa untuk membangun kemandirian ekonomi di lingkungan kampus.',
    sections: [
      {
        heading: 'Tonggak sejarah',
        paragraphs: [
          'KOPMA UNSIL berdiri pada 23 April 1983. Pada tahun 1997, pengelolaan koperasi sepenuhnya dilakukan oleh mahasiswa.',
        ],
        bullets: ['Petisi 12 pada 29 Oktober 1997', 'Penguatan unit usaha dan pendidikan anggota'],
      },
    ],
  },
  {
    slug: 'visi-misi-2026',
    title: 'Visi dan Misi 2026',
    description: 'Arah gerak KOPMA UNSIL untuk periode 2026.',
    readTime: 4,
    intro: 'Visi KOPMA UNSIL adalah menjadi laboratorium kewirausahaan kolektif mahasiswa.',
    sections: [
      {
        heading: 'Misi organisasi',
        paragraphs: ['KOPMA hadir sebagai tempat belajar yang terbuka, kolaboratif, dan relevan dengan kebutuhan anggota.'],
        bullets: [
          'Membangun solidaritas silih asah, silih asih, silih asuh',
          'Menyelenggarakan Kopma Incubation Class',
          'Memperkuat kemitraan dan unit usaha',
          'Merevitalisasi bisnis melalui digitalisasi',
        ],
      },
    ],
  },
  {
    slug: 'hak-dan-kewajiban',
    title: 'Hak dan Kewajiban Anggota',
    description: 'Panduan dasar menjadi anggota yang aktif.',
    readTime: 5,
    intro: 'Keanggotaan KOPMA UNSIL membawa hak sekaligus tanggung jawab untuk berpartisipasi.',
    sections: [
      {
        heading: 'Hak anggota',
        paragraphs: ['Setiap anggota memiliki kesempatan yang setara untuk belajar, menyampaikan pendapat, dan berkontribusi.'],
        bullets: ['Menerima SHU sesuai ketentuan', 'Memilih dan dipilih', 'Menyampaikan pendapat dalam forum anggota'],
      },
      {
        heading: 'Kewajiban anggota',
        paragraphs: ['Anggota berperan menjaga keberlanjutan koperasi melalui simpanan dan partisipasi aktif.'],
        bullets: ['Membayar simpanan pokok dan wajib', 'Bertransaksi minimal Rp5.000 per bulan', 'Mengikuti kegiatan pendidikan anggota'],
      },
    ],
  },
  {
    slug: 'simpanan-anggota',
    title: 'Simpanan Anggota',
    description: 'Memahami simpanan pokok dan simpanan wajib.',
    readTime: 3,
    intro: 'Simpanan anggota menjadi salah satu fondasi modal bersama KOPMA UNSIL.',
    sections: [
      {
        heading: 'Jenis simpanan',
        paragraphs: [
          'Simpanan pokok dibayarkan satu kali sebesar Rp20.000. Simpanan wajib sebesar Rp3.500 per bulan dan diakumulasi setiap periode.',
        ],
      },
    ],
  },
  {
    slug: 'diksarkop',
    title: 'DIKSARKOP',
    description: 'Pendidikan Dasar Koperasi untuk membangun fondasi anggota.',
    readTime: 8,
    intro: 'DIKSARKOP mengenalkan definisi, landasan, asas, tujuan, nilai, dan prinsip koperasi.',
    sections: [
      {
        heading: 'Mengapa belajar koperasi?',
        paragraphs: [
          'Koperasi adalah badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi.',
        ],
        bullets: [
          'Membangun ekonomi berdasarkan asas kekeluargaan',
          'Mengutamakan manfaat bagi anggota',
          'Mengembangkan tanggung jawab dan demokrasi ekonomi',
        ],
      },
      {
        heading: 'Nilai dan prinsip',
        paragraphs: [
          'Keanggotaan sukarela, pengelolaan demokratis, partisipasi ekonomi anggota, otonomi, pendidikan, kerja sama antarkoperasi, dan kepedulian terhadap komunitas menjadi prinsip yang perlu dipahami.',
        ],
      },
    ],
  },
  {
    slug: 'dikmenkop-manajemen-koperasi',
    title: 'DIKMENKOP: Manajemen Koperasi',
    description: 'Pengantar pengelolaan koperasi yang efektif dan berkelanjutan.',
    readTime: 7,
    intro: 'Materi ini membantu anggota memahami bagaimana koperasi dikelola secara profesional dan tetap berpihak pada anggota.',
    sections: [
      {
        heading: 'Materi pengantar',
        paragraphs: [
          'Pengelolaan koperasi mencakup perencanaan, pengorganisasian, pelaksanaan, dan evaluasi. Materi lengkap akan disediakan oleh pengelola.',
        ],
      },
    ],
  },
  {
    slug: 'dikmenkop-keorganisasian',
    title: 'DIKMENKOP: Keorganisasian Koperasi',
    description: 'Mengenal alat kelengkapan dan rapat anggota.',
    readTime: 6,
    intro: 'Organisasi koperasi berjalan melalui peran anggota dan alat kelengkapan yang saling menguatkan.',
    sections: [
      {
        heading: 'Rujukan awal',
        paragraphs: [
          'Anggota perlu mengenal alat kelengkapan organisasi, tiga jenis rapat anggota, serta fungsi Rapat Anggota Tahunan (RAT). Materi lengkap akan disediakan oleh pengelola.',
        ],
      },
    ],
  },
  {
    slug: 'dikmenkop-shu',
    title: 'DIKMENKOP: Sisa Hasil Usaha (SHU)',
    description: 'Memahami SHU, jasa transaksi, dan reward point PSDA.',
    readTime: 6,
    intro: 'SHU adalah pendapatan koperasi dalam satu tahun buku setelah dikurangi biaya, penyusutan, dan kewajiban lainnya.',
    sections: [
      {
        heading: 'Komponen SHU',
        paragraphs: [
          'Pembagian SHU memperhatikan jasa transaksi dan jasa simpanan anggota sesuai keputusan Rapat Anggota.',
        ],
        bullets: ['Jasa transaksi', 'Jasa simpanan', 'Reward point PSDA dari kegiatan anggota'],
      },
      {
        heading: 'Reward point PSDA',
        paragraphs: [
          'Poin kegiatan menjadi bentuk apresiasi partisipasi anggota: rapat kepanitiaan bernilai 1 poin, panitia bernilai 2 poin, dan peserta bernilai 1 poin.',
        ],
      },
    ],
  },
]

export const getModule = (slug: string) => modules.find((module) => module.slug === slug)
export const latestModules = modules.slice(0, 3)

export const events = [
  { title: 'DIKSARKOP Angkatan 2026', date: '15 Februari 2026', category: 'Pendidikan', photos: 12 },
  { title: 'Rapat Anggota Tahunan 2025', date: '20 Januari 2026', category: 'RAT', photos: 24 },
  { title: 'Dies Natalis KOPMA UNSIL', date: '23 April 2025', category: 'Dies Natalis', photos: 18 },
]
