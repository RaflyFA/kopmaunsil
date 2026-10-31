export type EventDoc = {
  id: string
  title: string
  category: 'Pendidikan' | 'LPJS & Musyawarah' | 'Temu Anggota'
  date: string
  location: string
  summary: string
  description?: string
  highlights?: string[]
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
    id: 'doc-dikmenkop-2026',
    title: 'DIKMENKOP (Pendidikan Menengah Koperasi) 2026',
    category: 'Pendidikan',
    date: '24 Oktober 2026',
    location: 'Ruang Rapat Rektorat Kampus 2 Universitas Siliwangi',
    summary:
      'Pendidikan Menengah Koperasi (DIKMENKOP) 2026 sebagai jenjang kaderisasi lanjutan bagi anggota baru KOPMA UNSIL pasca DIKSARKOP, menghadirkan seminar kewirausahaan, talkshow penguatan ekosistem bisnis koperasi, serta grand final pemilihan Duta KOPMA UNSIL 2026.',
    description:
      'Pendidikan Menengah Koperasi (DIKMENKOP) 2026 merupakan program kaderisasi tingkat lanjutan yang strategis bagi anggota baru KOPMA UNSIL setelah menuntaskan tahapan Pendidikan Dasar Koperasi (DIKSARKOP). Mengusung tema "Kolaborasi, Keuangan, dan Kepemimpinan: Membangun Ekosistem Bisnis Koperasi yang Tangguh Lewat Semangat Kekeluargaan", kegiatan ini dirancang untuk mempertajam kapasitas intelektual, literasi manajerial, dan kapabilitas kepemimpinan anggota muda. Rangkaian agenda dibuka secara resmi dengan seremoni pemukulan angklung, dilanjutkan seminar tata kelola finansial koperasi, talkshow interaktif ekosistem bisnis bersama para praktisi dan demisioner, serta ditutup dengan penganugerahan dan Grand Final Pemilihan Duta KOPMA UNSIL 2026 sebagai representasi ikonik kader yang berkarakter, berprestasi, dan inspiratif.',
    highlights: [
      'Kaderisasi Jenjang Lanjutan Pasca DIKSARKOP Angkatan 2026',
      'Seminar & Talkshow',
      'Grand Final & Penganugerahan Duta KOPMA UNSIL 2026',
      
    ],
    photosCount: 29,
    coverImage: '/DIKMENKOP/IMG_0049.webp',
    likes: 136,
    gallery: [
      {
        url: '/DIKMENKOP/IMG_1194.webp',
        caption: 'Foto bersama akbar seluruh peserta, panitia pelaksana, pemateri, dan Duta KOPMA UNSIL terpilih.',
      },
      {
        url: '/DIKMENKOP/IMG_0049.webp',
        caption: 'Jajaran panitia dan pengurus KOPMA UNSIL berfoto bersama di panggung utama DIKMENKOP 2026.',
      },
      {
        url: '/DIKMENKOP/IMG_9623.webp',
        caption: 'Pembukaan khidmat dengan menyanyikan lagu kebangsaan Indonesia Raya dan Mars Koperasi.',
      },
      {
        url: '/DIKMENKOP/IMG_9993.webp',
        caption: 'Laporan dan sambutan hangat ketua pelaksana membuka rangkaian kegiatan DIKMENKOP 2026.',
      },
      {
        url: '/DIKMENKOP/IMG_9650.webp',
        caption: 'Peresmian pembukaan DIKMENKOP 2026 secara simbolis melalui pemukulan alat musik angklung.',
      },
      {
        url: '/DIKMENKOP/IMG_9655.webp',
        caption: 'Master of Ceremony (MC) memandu alur kegiatan dengan penuh semangat dan antusias.',
      },
      {
        url: '/DIKMENKOP/IMG_9654.webp',
        caption: 'Para peserta kader baru KOPMA UNSIL menyimak pembekalan materi dengan fokus dan antusiasme tinggi.',
      },
      {
        url: '/DIKMENKOP/IMG_9682.webp',
        caption: 'Sesi talkshow dan seminar inspiratif bertajuk penguatan kolaborasi serta ekosistem bisnis koperasi.',
      },
      {
        url: '/DIKMENKOP/IMG_9789.webp',
        caption: 'Pemaparan komprehensif mengenai tata kelola keuangan, inovasi unit usaha, dan kepemimpinan koperasi.',
      },
      {
        url: '/DIKMENKOP/IMG_9702.webp',
        caption: 'Sesi interaktif tanya jawab antara peserta kader baru dengan narasumber seminar.',
      },
      {
        url: '/DIKMENKOP/IMG_9705.webp',
        caption: 'Peserta menyampaikan pandangan dan tanggapan kritis dalam diskusi pembedahan studi kasus bisnis.',
      },
      {
        url: '/DIKMENKOP/IMG_9774.webp',
        caption: 'Penyerahan cinderamata dan sertifikat penghargaan kepada moderator seminar DIKMENKOP 2026.',
      },
      {
        url: '/DIKMENKOP/IMG_9771.webp',
        caption: 'Foto bersama narasumber seminar, moderator, dan seluruh kader di tengah sesi pelatihan.',
      },
      {
        url: '/DIKMENKOP/IMG_9875.webp',
        caption: 'Para finalis Duta KOPMA UNSIL 2026 duduk di panggung utama bersiap menghadapi sesi uji kompetensi.',
      },
      {
        url: '/DIKMENKOP/IMG_0009.webp',
        caption: 'Penyerahan sertifikat penghargaan kepada dewan juri seleksi Duta KOPMA UNSIL 2026.',
      },
      {
        url: '/DIKMENKOP/IMG_0012.webp',
        caption: 'Apresiasi dari jajaran pengurus kepada dewan juri atas bimbingan dan penilaian objektif.',
      },
      {
        url: '/DIKMENKOP/IMG_9946.webp',
        caption: 'Momen bersejarah penganugerahan dan penyematan selempang kehormatan Duta KOPMA UNSIL 2026.',
      },
      {
        url: '/DIKMENKOP/IMG_0056.webp',
        caption: 'Potret kebersamaan Duta KOPMA UNSIL 2025 bersama Duta KOPMA UNSIL 2026 terpilih.',
      },
      {
        url: '/DIKMENKOP/IMG_0018.webp',
        caption: 'Pengukuhan Ketua Angkatan KOPMA UNSIL dan Duta KOPMA dalam seremoni puncak acara.',
      },
      {
        url: '/DIKMENKOP/IMG_0074.webp',
        caption: 'Keluarga besar peserta DIKMENKOP 2026 dan finalis duta berfoto bersama di atas panggung.',
      },
      {
        url: '/DIKMENKOP/IMG_9753.webp',
        caption: 'Keceriaan panitia pelaksana dari pengurus KOPMA UNSIL mengawal kelancaran seluruh rangkaian acara.',
      },
      {
        url: '/DIKMENKOP/IMG_9826.webp',
        caption: 'Suasana hangat dan keakraban para panitia dan peserta di sela rehat sesi pelatihan.',
      },
      {
        url: '/DIKMENKOP/IMG_9827.webp',
        caption: 'Momen canda tawa dan kebersamaan yang mempererat ikatan kekeluargaan antar anggota.',
      },
      {
        url: '/DIKMENKOP/IMG_9842.webp',
        caption: 'Pose ceria narasumber, juri, dan panitia pelaksana di depan latar panggung digital.',
      },
      {
        url: '/DIKMENKOP/IMG_2277.webp',
        caption: 'Kekompakan panitia pelaksana KOPMA UNSIL mengenakan seragam biru kebanggaan Kabinet Arunika.',
      },
      {
        url: '/DIKMENKOP/WhatsApp%20Image%202026-10-24%20at%2015.43.34.webp',
        caption: 'Potret jajaran Badan Pengurus Harian KOPMA UNSIL di lobi Ruang Rapat Rektorat Kampus 2.',
      },
      {
        url: '/DIKMENKOP/WhatsApp%20Image%202026-10-24%20at%2016.00.42.webp',
        caption: 'Pose salam komando seluruh panitia menunjukkan komitmen tinggi memajukan perkoperasian kampus.',
      },
      {
        url: '/DIKMENKOP/WhatsApp%20Image%202026-10-24%20at%2016.00.45.webp',
        caption: 'Formasi lengkap seluruh panitia pelaksana DIKMENKOP 2026 di panggung aula rektorat.',
      },
      {
        url: '/DIKMENKOP/WhatsApp%20Image%202026-10-24%20at%2016.52.35%20(1).webp',
        caption: 'Solidaritas dan dedikasi pengurus KOPMA UNSIL menyukseskan agenda kaderisasi menengah.',
      },
    ],
  },
  {
    id: 'doc-diksarkop-1',
    title: 'DIKSARKOP II (Pendidikan Dasar Koperasi)',
    category: 'Pendidikan',
    date: '15 Februari 2026',
    location: 'Gedung Rektorat Lt. 2 Universitas Siliwangi',
    summary:
      'Pendidikan Dasar Koperasi (DIKSARKOP) II untuk menyambut dan membina kader baru KOPMA UNSIL dengan pengenalan jati diri, nilai-nilai perkoperasian, dan simulasi kepengurusan.',
    description:
      'Pendidikan Dasar Koperasi (DIKSARKOP) II merupakan tahapan kaderisasi awal yang wajib diikuti oleh seluruh calon anggota baru Koperasi Mahasiswa Universitas Siliwangi. Melalui kegiatan ini, peserta diberikan pembekalan intensif seputar sejarah gerakan koperasi, prinsip-prinsip dasar koperasi, struktur kelembagaan, hak dan kewajiban anggota, hingga etika berorganisasi. Kegiatan ini juga terdapat sesi interaktif bersama pemateri berpengalaman guna menumbuhkan jiwa wirausaha kolektif dan loyalitas sejak dini.',
    highlights: [
      'Pengenalan Jati Diri & 7 Prinsip Koperasi Mahasiswa',
      'Sesi Pembinaan Karakter & Keakraban Kader Angkatan 2026',
    ],
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
        caption: 'Suasana pembukaan DIKSARKOP II bersama jajaran pengurus KOPMA UNSIL.',
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
    date: '30 - 31 Juli 2026',
    location: 'hybrid (Zoom Meeting dan Gedung K.D.2.6 dan K.D.2.7 FKIP)',
    summary:
      'Forum evaluasi kinerja paruh waktu kepengurusan KOPMA UNSIL periode 2026, memaparkan capaian program kerja bidang, evaluasi unit usaha, serta keuangan semester berjalan.',
    description:
      'Laporan Pertanggungjawaban Semester (LPJS) 2026 merupakan forum musyawarah formal paruh periode kepengurusan KOPMA UNSIL. Agenda ini menjadi panggung transparansi di mana Pengurus memaparkan realisasi program kerja, sirkulasi keuangan organisasi, serta performa unit usaha kepada Badan Pengawas dan Anggota. Berbagai masukan kritis, rekomendasi strategis sidang komisi, serta resolusi operasional disepakati demi mematangkan langkah organisasi menyongsong persiapan Rapat Anggota Tahunan (RAT).',
    highlights: [
      'Pemaparan Transparansi Keuangan & Profit Unit Usaha',
      'Evaluasi Capaian Program Kerja KOPMA UNSIL',
    ],
    photosCount: 12,
    coverImage: '/LPJS%202026/MVIMG_20260730_094158.webp',
    likes: 96,
    gallery: [
      {
        url: '/LPJS%202026/MVIMG_20260730_094158.webp',
        caption: 'Pemaparan laporan pertanggungjawaban oleh pegawas dan pengurus',
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
    date: '19 April 2026',
    location: 'Gedung Trigatra, Universitas Siliwangi',
    summary:
      'Ajang temu dan silaturahmi seluruh anggota KOPMA UNSIL untuk mempererat persaudaraan, berbagi aspirasi, games interaktif, dan sosialisasi program kerja KOPMA.',
    description:
      'Temu Anggota I diselenggarakan sebagai sarana silaturahmi terbuka antara pengurus dan anggota KOPMA UNSIL. Mengusung tema "Membangun Harmoni Organisasi dalam Mewujudkan KOPMA yang Adaptif, Inovatif, dan Berkelanjutan", agenda ini diisi dengan ice-breaking , team building games, penyampaian RAPBK, sistem reward keaktifan anggota oleh pengurus KOPMA UNSIL. Suasana hangat ini bertujuan memperkuat rasa kepemilikan (sense of belonging) anggota terhadap KOPMA UNSIL',
    highlights: [
      'Pengenalana Kepengurusan Baru',
      'Pemaparan RAPBK',
      'Forum Dengar Aspirasi & Masukan Pengelolaan',
    ],
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
        caption: 'Sosialisasi agenda dan program pengembangan anggota KOPMA UNSIL.',
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
    title: 'Temu Anggota II: Kebersamaan',
    category: 'Temu Anggota',
    date: '10 Oktober 2026',
    location: 'Gedung FKIP',
    summary:
      'Lanjutan pertemuan anggota kedua untuk evaluasi keterlibatan anggota dalam kepanitiaan, pengumuman reward point keaktifan semester, serta penguatan solidaritas organisasi.',
    description:
      'Temu Anggota merupakan acara yang menjadi wadah silaturahmi untuk menjalin tali persaudaraan antar seluruh elemen KOPMA UNSIL. Mengusung tema: "Membangun Harmoni Organisasi dalam Mewujudkan KOPMA yang Adaptif, Inovatif, dan Berkelanjutan."' ,
    highlights: [
      'Sharing Inspiratif Bersama Alumni & Demisioner Pengurus',
    ],
    photosCount: 16,
    coverImage: '/Temu%20Anggota%202/IMG_8794.webp',
    likes: 128,
    gallery: [
      {
        url: '/Temu%20Anggota%202/IMG_8794.webp',
        caption: 'Temu Anggota II oleh pengurus KOPMA UNSIL.',
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
        caption: 'Foto bersama panitia Temu Anggota II.',
      },
      {
        url: '/Temu%20Anggota%202/IMG_9111.webp',
        caption: 'Foto bersama seluruh anggota KOPMA UNSIL pada Temu Anggota II.',
      },
    ],
  },
]
