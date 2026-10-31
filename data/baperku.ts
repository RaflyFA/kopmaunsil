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
    slug: 'mengenal-kopma-unsil',
    title: 'Mengenal KOPMA UNSIL: Profil, Sejarah, & Visi Misi',
    description: 'Mengenal identitas koperasi, tonggak sejarah gerakan sejak 1983, serta arah visi dan misi 2026.',
    readTime: 7,
    intro:
      'KOPMA UNSIL adalah koperasi mahasiswa yang menitikberatkan pengembangan anggota sebagai core identity dan laboratorium kewirausahaan kolektif mahasiswa di lingkungan kampus.',
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
      {
        heading: 'Tonggak Sejarah Gerakan',
        paragraphs: [
          'KOPMA UNSIL tumbuh dari semangat mahasiswa untuk membangun kemandirian ekonomi di lingkungan kampus. KOPMA UNSIL berdiri pada 23 April 1983. Pada tahun 1997, pengelolaan koperasi sepenuhnya dilakukan oleh mahasiswa.',
        ],
        bullets: [
          'Petisi 12 pada 29 Oktober 1997 (Pengelolaan penuh oleh mahasiswa)',
          'Penguatan unit usaha dan pendidikan anggota',
        ],
      },
      {
        heading: 'Visi dan Misi 2026',
        paragraphs: [
          'Visi KOPMA UNSIL adalah menjadi laboratorium kewirausahaan kolektif mahasiswa. KOPMA hadir sebagai tempat belajar yang terbuka, kolaboratif, dan relevan dengan kebutuhan anggota.',
        ],
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
    slug: 'keanggotaan-dan-simpanan',
    title: 'Keanggotaan & Permodalan Koperasi',
    description: 'Panduan hak, kewajiban, serta pemahaman simpanan pokok dan simpanan wajib anggota KOPMA UNSIL.',
    readTime: 6,
    intro:
      'Keanggotaan KOPMA UNSIL membawa hak kesetaraan, tanggung jawab partisipasi aktif, serta kontribusi permodalan bersama untuk menjaga keberlanjutan koperasi.',
    sections: [
      {
        heading: 'Hak Anggota',
        paragraphs: [
          'Setiap anggota memiliki kesempatan yang setara untuk belajar, menyampaikan pendapat, dan berkontribusi.',
        ],
        bullets: [
          'Menerima SHU sesuai ketentuan',
          'Memilih dan dipilih dalam forum musyawarah',
          'Menyampaikan pendapat dalam forum anggota',
        ],
      },
      {
        heading: 'Kewajiban Anggota',
        paragraphs: [
          'Anggota berperan menjaga keberlanjutan koperasi melalui simpanan dan partisipasi aktif.',
        ],
        bullets: [
          'Membayar simpanan pokok dan wajib',
          'Bertransaksi minimal Rp5.000 per bulan',
          'Mengikuti kegiatan pendidikan anggota',
        ],
      },
      {
        heading: 'Jenis Simpanan Anggota',
        paragraphs: [
          'Simpanan anggota menjadi salah satu fondasi modal bersama KOPMA UNSIL. Simpanan pokok dibayarkan satu kali sebesar Rp20.000. Simpanan wajib sebesar Rp3.500 per bulan dan diakumulasi setiap periode.',
        ],
        bullets: [
          'Simpanan Pokok: Rp20.000 (dibayarkan 1 kali saat awal mendaftar)',
          'Simpanan Wajib: Rp3.500 per bulan (diakumulasi sebagai modal bersama)',
        ],
      },
    ],
  },
  {
    slug: 'diksarkop',
    title: 'DIKSARKOP (Pendidikan Dasar Koperasi)',
    description: 'Pendidikan Dasar Koperasi untuk membangun fondasi, landasan, nilai-nilai, dan prinsip dasar anggota.',
    readTime: 8,
    intro:
      'DIKSARKOP mengenalkan definisi, landasan, asas, tujuan, nilai, dan prinsip koperasi bagi calon kader baru.',
    sections: [
      {
        heading: 'Mengapa Belajar Koperasi?',
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
        heading: 'Nilai dan Prinsip Koperasi',
        paragraphs: [
          'Keanggotaan sukarela, pengelolaan demokratis, partisipasi ekonomi anggota, otonomi, pendidikan, kerja sama antarkoperasi, dan kepedulian terhadap komunitas menjadi prinsip yang perlu dipahami.',
        ],
        bullets: [
          'Keanggotaan bersifat sukarela dan terbuka',
          'Pengelolaan dilakukan secara demokratis (1 orang 1 suara)',
          'Partisipasi ekonomi anggota yang adil',
          'Otonomi dan kemandirian',
          'Pendidikan, pelatihan, dan informasi perkoperasian',
          'Kerja sama antarkoperasi',
          'Kepedulian terhadap komunitas lingkungan sekitar',
        ],
      },
    ],
  },
  {
    slug: 'dikmenkop',
    title: 'DIKMENKOP (Pendidikan Menengah Koperasi)',
    description: 'Pengantar manajemen koperasi, keorganisasian & alat kelengkapan, tata kelola SHU, serta reward point keaktifan anggota.',
    readTime: 9,
    intro:
      'DIKMENKOP membantu anggota memahami bagaimana koperasi dikelola secara profesional, berpihak pada anggota, memiliki keorganisasian solid, dan mendistribusikan SHU secara transparan.',
    sections: [
      {
        heading: 'Pengantar Manajemen Koperasi',
        paragraphs: [
          'Pengelolaan koperasi mencakup perencanaan, pengorganisasian, pelaksanaan, dan evaluasi. Materi lengkap akan disediakan oleh pengelola.',
        ],
        bullets: [
          'Planning (Perencanaan strategi dan program kerja)',
          'Organizing (Pengorganisasian struktur dan unit usaha)',
          'Actuating (Pelaksanaan operasional dan pelayanan anggota)',
          'Controlling (Evaluasi performa dan pengawasan)',
        ],
      },
      {
        heading: 'Keorganisasian & Rapat Anggota',
        paragraphs: [
          'Organisasi koperasi berjalan melalui peran anggota dan alat kelengkapan yang saling menguatkan. Anggota perlu mengenal alat kelengkapan organisasi, tiga jenis rapat anggota, serta fungsi Rapat Anggota Tahunan (RAT). Materi lengkap akan disediakan oleh pengelola.',
        ],
        bullets: [
          'Alat kelengkapan: Rapat Anggota, Pengurus, dan Pengawas',
          'Rapat Anggota Tahunan (RAT) sebagai forum kekuasaan tertinggi',
          'Fungsi evaluasi dan pertanggungjawaban kepengurusan',
        ],
      },
      {
        heading: 'Komponen Sisa Hasil Usaha (SHU)',
        paragraphs: [
          'SHU adalah pendapatan koperasi dalam satu tahun buku setelah dikurangi biaya, penyusutan, dan kewajiban lainnya. Pembagian SHU memperhatikan jasa transaksi dan jasa simpanan anggota sesuai keputusan Rapat Anggota.',
        ],
        bullets: [
          'Jasa transaksi anggota',
          'Jasa simpanan anggota',
          'Reward point keaktifan anggota dari kegiatan KOPMA',
        ],
      },
      {
        heading: 'Reward Point Keaktifan Anggota',
        paragraphs: [
          'Poin kegiatan menjadi bentuk apresiasi partisipasi anggota: rapat kepanitiaan bernilai 1 poin, panitia bernilai 2 poin, dan peserta bernilai 1 poin.',
        ],
        bullets: [
          'Panitia Acara: 2 Poin',
          'Peserta Kegiatan / Peserta Pendidikan: 1 Poin',
          'Hadir Rapat Kepanitiaan: 1 Poin',
        ],
      },
    ],
  },
]

export const getModule = (slug: string) => modules.find((module) => module.slug === slug)
export const latestModules = modules.slice(0, 4)

