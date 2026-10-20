export type EventDoc = {
  id: string
  title: string
  category: 'Pendidikan' | 'LPJS & Musyawarah' | 'Temu Anggota'
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
    id: 'doc-diksarkop-1',
    title: 'DIKSARKOP I (Pendidikan Dasar Koperasi)',
    category: 'Pendidikan',
    date: '15 Februari 2026',
    location: 'Gedung Rektorat Lt. 2 Universitas Siliwangi',
    summary:
      'Pendidikan Dasar Koperasi (DIKSARKOP) I untuk menyambut dan membina kader baru KOPMA UNSIL dengan pengenalan jati diri, nilai-nilai perkoperasian, dan simulasi kepengurusan.',
    photosCount: 7,
    coverImage: '/DIKSARKOP%201/IMG_4722.webp',
    likes: 84,
    gallery: [
      {
        url: '/DIKSARKOP%201/IMG_4722.webp',
        caption: 'Penyampaian materi perkoperasian dan nilai dasar gerakan mahasiswa.',
      },
      {
        url: '/DIKSARKOP%201/IMG_0459.webp',
        caption: 'Suasana pembukaan DIKSARKOP I bersama jajaran pengurus PSDA.',
      },
      {
        url: '/DIKSARKOP%201/IMG_4750.webp',
        caption: 'Peserta menyimak pemaparan materi dari pemateri tamu.',
      },
      {
        url: '/DIKSARKOP%201/IMG_4766.webp',
        caption: 'Sesi interaktif tanya jawab dan diskusi bersama peserta kader baru.',
      },
      {
        url: '/DIKSARKOP%201/IMG_4796.webp',
        caption: 'Simulasi kepemimpinan dan studi kasus pengelolaan koperasi mahasiswa.',
      },
      {
        url: '/DIKSARKOP%201/IMG_4809%20(1).webp',
        caption: 'Momen kebersamaan panitia dan peserta di sela-sela kegiatan pelatihan.',
      },
      {
        url: '/DIKSARKOP%201/IMG_4811.webp',
        caption: 'Foto bersama penutupan DIKSARKOP I KOPMA UNSIL.',
      },
    ],
  },
  {
    id: 'doc-lpjs-2026',
    title: 'Laporan Pertanggungjawaban Semester (LPJS) 2026',
    category: 'LPJS & Musyawarah',
    date: '30 Juli 2026',
    location: 'Ruang Sidang Utama KOPMA UNSIL',
    summary:
      'Forum evaluasi kinerja paruh waktu kepengurusan KOPMA UNSIL periode 2026, memaparkan capaian program kerja bidang, evaluasi unit usaha, serta keuangan semester berjalan.',
    photosCount: 12,
    coverImage: '/LPJS%202026/MVIMG_20260730_094158.webp',
    likes: 96,
    gallery: [
      {
        url: '/LPJS%202026/MVIMG_20260730_094158.webp',
        caption: 'Pemaparan laporan pertanggungjawaban oleh pengurus harian.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_093855.webp',
        caption: 'Pembukaan sidang pleno LPJS 2026 oleh pimpinan sidang.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_093936.webp',
        caption: 'Pembacaan tata tertib dan agenda musyawarah semester.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_094525.webp',
        caption: 'Sesi evaluasi program kerja dan tanggapan dari dewan pengawas.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_095234.webp',
        caption: 'Penyampaian pandangan umum dari perwakilan anggota aktif.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_095437.webp',
        caption: 'Diskusi panel perkembangan unit usaha dan layanan anggota.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_104119.webp',
        caption: 'Tanya jawab transparan seputar keuangan dan realisasi anggaran.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_140454.webp',
        caption: 'Sidang komisi perumusan rekomendasi perbaikan semester berikutnya.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_140811.webp',
        caption: 'Presentasi hasil rekomendasi komisi organisasi dan kaderisasi.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_170839.webp',
        caption: 'Pengesahan dan penandatanganan berita acara LPJS 2026.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_174803.webp',
        caption: 'Pemberian apresiasi kepada pengurus dan staf berprestasi.',
      },
      {
        url: '/LPJS%202026/MVIMG_20260730_175245.webp',
        caption: 'Foto bersama seluruh jajaran pengurus dan pengawas LPJS 2026.',
      },
    ],
  },
  {
    id: 'doc-temu-anggota-1',
    title: 'Temu Anggota I: Sinergi & Silaturahmi',
    category: 'Temu Anggota',
    date: '18 April 2026',
    location: 'Student Center & Area Terbuka Kampus 1 Siliwangi',
    summary:
      'Ajang temu dan silaturahmi seluruh anggota KOPMA UNSIL untuk mempererat persaudaraan, berbagi aspirasi, games interaktif, dan sosialisasi program kerja PSDA.',
    photosCount: 18,
    coverImage: '/Temu%20Anggota%201/IMG_9463.webp',
    likes: 112,
    gallery: [
      {
        url: '/Temu%20Anggota%201/IMG_9463.webp',
        caption: 'Momen kebersamaan dan antusiasme peserta Temu Anggota I.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9484.webp',
        caption: 'Sesi ice breaking dan games keakraban antar angkatan.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9495.webp',
        caption: 'Diskusi santai seputar pengalaman berkoperasi di kampus.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9507.webp',
        caption: 'Sosialisasi agenda dan program pengembangan anggota bidang PSDA.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9511.webp',
        caption: 'Penyampaian masukan dan sharing session bersama pengurus.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9516.webp',
        caption: 'Keceriaan anggota dalam sesi dinamika kelompok.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9519.webp',
        caption: 'Pembagian doorprize dan cinderamata bagi anggota aktif.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9522.webp',
        caption: 'Antusiasme anggota baru dalam mengenal kultur organisasi.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9527.webp',
        caption: 'Sesi foto bersama kelompok kecil dan panitia acara.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9536.webp',
        caption: 'Suasana santai dan akrab di pelataran student center.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9560.webp',
        caption: 'Interaksi hangat pengurus dengan para anggota binaan.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9605.webp',
        caption: 'Rangkaian games kekompakan dan kepemimpinan tim.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9641.webp',
        caption: 'Momen refleksi dan apresiasi kebersamaan anggota.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9659.webp',
        caption: 'Pembagian konsumsi dan ramah tamah antar kader.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9676.webp',
        caption: 'Yel-yel semangat KOPMA UNSIL bersama seluruh peserta.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9689.webp',
        caption: 'Penyerahan penghargaan bagi kelompok paling kompak.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9768.webp',
        caption: 'Foto bersama panitia pelaksana Temu Anggota I.',
      },
      {
        url: '/Temu%20Anggota%201/IMG_9784.webp',
        caption: 'Foto keluarga besar seluruh anggota hadir Temu Anggota I.',
      },
    ],
  },
  {
    id: 'doc-temu-anggota-2',
    title: 'Temu Anggota II: Evaluasi & Kebersamaan',
    category: 'Temu Anggota',
    date: '12 September 2026',
    location: 'Student Center & Ruang Pertemuan UNSIL',
    summary:
      'Lanjutan pertemuan anggota kedua untuk evaluasi keterlibatan anggota dalam kepanitiaan, pengumuman reward point PSDA semester, serta penguatan solidaritas organisasi.',
    photosCount: 16,
    coverImage: '/Temu%20Anggota%202/IMG_8794.webp',
    likes: 128,
    gallery: [
      {
        url: '/Temu%20Anggota%202/IMG_8794.webp',
        caption: 'Pembukaan Temu Anggota II oleh pengurus PSDA KOPMA.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8798.webp',
        caption: 'Pemaparan rekapitulasi keaktifan dan perolehan poin anggota.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8817.webp',
        caption: 'Sesi diskusi evaluasi keterlibatan anggota di kegiatan kampus.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8879.webp',
        caption: 'Tanya jawab seputar persiapan RAT dan pendidikan lanjutan.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8889.webp',
        caption: 'Sharing session bersama alumni dan demisioner pengurus.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8904.webp',
        caption: 'Games interaktif pengasah pengetahuan perkoperasian.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8922.webp',
        caption: 'Pemberian sertifikat apresiasi bagi panitia dan peserta aktif.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_8958.webp',
        caption: 'Momen keakraban santai antar pengurus dan anggota baru.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9008.webp',
        caption: 'Suasana ruang pertemuan saat penyampaian refleksi organisasi.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9025.webp',
        caption: 'Keceriaan saat pengumuman pemenang kuis keakraban.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9038.webp',
        caption: 'Penyerahan hadiah apresiasi kader berdedikasi.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9047.webp',
        caption: 'Momen hangat berbincang santai di penghujung acara.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9062.webp',
        caption: 'Sesi candid panitia yang telah bekerja keras mempersiapkan acara.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9073.webp',
        caption: 'Ramah tamah dan makan bersama seluruh peserta.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9097.webp',
        caption: 'Foto bersama panitia bidang PSDA Temu Anggota II.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9111.webp',
        caption: 'Foto bersama seluruh anggota KOPMA UNSIL pada Temu Anggota II.',
      },
    ],
  },
]
