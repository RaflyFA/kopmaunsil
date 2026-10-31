export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const mengenalKopmaQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Kapan KOPMA UNSIL secara resmi didirikan?',
    options: ['23 April 1983', '17 Agustus 1945', '12 Juli 1960', '29 Oktober 1997'],
    correctIndex: 0,
    explanation: 'KOPMA UNSIL didirikan pada 23 April 1983 dan berkedudukan di Jl. Siliwangi No. 24, Tasikmalaya.',
  },
  {
    id: 'q2',
    question: 'Apa peristiwa bersejarah pada 29 Oktober 1997 di KOPMA UNSIL?',
    options: ['Pendirian gedung baru', 'Petisi 12 (Pengelolaan penuh oleh mahasiswa)', 'Penggabungan dengan koperasi luar', 'Pemberian SHU pertama'],
    correctIndex: 1,
    explanation: 'Petisi 12 pada 29 Oktober 1997 menjadi tonggak di mana pengelolaan koperasi dipercayakan sepenuhnya kepada mahasiswa.',
  },
  {
    id: 'q3',
    question: 'Apa visi strategis KOPMA UNSIL untuk periode 2026?',
    options: ['Menjadi bank komersial terbesar di Tasikmalaya', 'Menjadi laboratorium kewirausahaan kolektif mahasiswa', 'Membubarkan unit usaha non-kampus', 'Fokus pada bisnis daring pasif semata'],
    correctIndex: 1,
    explanation: 'Visi 2026 berfokus menjadi laboratorium kewirausahaan kolektif mahasiswa yang berdaya saing dan inklusif.',
  },
  {
    id: 'q4',
    question: 'Falsafah Sunda apa yang menjadi fondasi solidaritas antar-anggota KOPMA UNSIL?',
    options: ['Silih asah, silih asih, silih asuh', 'Bhinneka Tunggal Ika', 'Jer basuki mawa beya', 'Tut Wuri Handayani'],
    correctIndex: 0,
    explanation: 'Silih asah, silih asih, dan silih asuh menjadi landasan kebersamaan dan saling mendukung di KOPMA UNSIL.',
  },
]

const keanggotaanSimpananQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Manakah yang merupakan kewajiban rutin seorang anggota KOPMA UNSIL?',
    options: ['Membayar simpanan pokok setiap bulan', 'Membayar simpanan wajib dan bertransaksi minimal Rp5.000/bulan', 'Hanya hadir saat pembagian SHU', 'Mengambil barang tanpa dicatat'],
    correctIndex: 1,
    explanation: 'Kewajiban anggota meliputi simpanan wajib per bulan dan transaksi aktif minimal Rp5.000 setiap bulan di unit usaha KOPMA.',
  },
  {
    id: 'q2',
    question: 'Apa hak anggota dalam forum tertinggi organisasi (Rapat Anggota)?',
    options: ['Hanya boleh mendengarkan', 'Memiliki hak suara, hak bicara, serta memilih dan dipilih', 'Hanya pengurus yang berhak bicara', 'Mendapatkan uang saku khusus'],
    correctIndex: 1,
    explanation: 'Prinsip one member one vote menjamin kesetaraan hak suara, hak berpendapat, serta hak memilih dan dipilih bagi tiap anggota.',
  },
  {
    id: 'q3',
    question: 'Berapa besaran Simpanan Pokok di KOPMA UNSIL yang dibayar sekali saat mendaftar?',
    options: ['Rp10.000', 'Rp20.000', 'Rp50.000', 'Rp100.000'],
    correctIndex: 1,
    explanation: 'Simpanan pokok KOPMA UNSIL sebesar Rp20.000 dan dibayarkan 1 kali di awal keanggotaan.',
  },
  {
    id: 'q4',
    question: 'Berapakah iuran Simpanan Wajib per bulan bagi anggota KOPMA UNSIL?',
    options: ['Rp1.000', 'Rp3.500', 'Rp15.000', 'Rp25.000'],
    correctIndex: 1,
    explanation: 'Simpanan wajib sebesar Rp3.500 setiap bulannya yang diakumulasikan dan menjadi modal koperasi.',
  },
]

const diksarkopQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Apa kepanjangan dari DIKSARKOP dalam jenjang pendidikan anggota KOPMA?',
    options: ['Pendidikan Sarjana Koperasi', 'Pendidikan Dasar Koperasi', 'Diskusi Sinergi Koperasi', 'Diklat Administrasi Koperasi'],
    correctIndex: 1,
    explanation: 'DIKSARKOP adalah Pendidikan Dasar Koperasi yang menjadi gerbang utama bagi seluruh calon anggota KOPMA UNSIL.',
  },
  {
    id: 'q2',
    question: 'Prinsip koperasi mana yang menegaskan bahwa koperasi dikendalikan secara demokratis?',
    options: ['Pengelolaan secara demokratis (1 orang 1 suara)', 'Pengendalian oleh pemodal terbesar', 'Ditentukan sepihak oleh rektorat', 'Pengundian acak tahunan'],
    correctIndex: 0,
    explanation: 'Koperasi menganut prinsip pengelolaan demokratis, di mana satu anggota memiliki satu hak suara tanpa memandang besaran modal.',
  },
]

const dikmenkopQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Apa saja 4 fungsi fundamental manajemen dalam pengelolaan koperasi?',
    options: ['Planning, Organizing, Actuating, Controlling (POAC)', 'Buying, Selling, Marketing, Profit', 'Hiring, Firing, Auditing, Reporting', 'Meeting, Talking, Voting, Dividing'],
    correctIndex: 0,
    explanation: 'Fungsi POAC (Perencanaan, Pengorganisasian, Pelaksanaan, Pengawasan) adalah pilar manajemen organisasi dan usaha koperasi.',
  },
  {
    id: 'q2',
    question: 'Apa pemegang kekuasaan tertinggi dalam struktur organisasi koperasi?',
    options: ['Ketua Umum', 'Rapat Anggota (RAT)', 'Badan Pengawas', 'Manajer Toko'],
    correctIndex: 1,
    explanation: 'Rapat Anggota (RAT) memegang kekuasaan tertinggi dalam koperasi sesuai amanat UU No. 25 Tahun 1992.',
  },
  {
    id: 'q3',
    question: 'Berapa poin keaktifan yang didapatkan seorang anggota jika bertugas sebagai panitia acara?',
    options: ['0.5 poin', '1 poin', '2 poin', '5 poin'],
    correctIndex: 2,
    explanation: 'Kepanitiaan bernilai 2 poin keaktifan, sedangkan hadir rapat/peserta bernilai 1 poin.',
  },
  {
    id: 'q4',
    question: 'Apa dua komponen utama yang menentukan besaran SHU yang diterima anggota perorangan?',
    options: ['Jasa Modal (Simpanan) & Jasa Usaha/Transaksi (Belanja)', 'IPK kuliah & semester', 'Uang pangkal & uang gedung', 'Kehadiran di media sosial'],
    correctIndex: 0,
    explanation: 'SHU dibagikan berdasarkan kontribusi nyata: Jasa Modal (simpanan) dan Jasa Anggota (transaksi belanja di KOPMA).',
  },
]

export const moduleQuizzes: Record<string, QuizQuestion[]> = {
  // 4 Modul Baru
  'mengenal-kopma-unsil': mengenalKopmaQuiz,
  'keanggotaan-dan-simpanan': keanggotaanSimpananQuiz,
  'diksarkop': diksarkopQuiz,
  'dikmenkop': dikmenkopQuiz,

  // Alias untuk kompatibilitas data historis
  'profil-kopma-unsil': mengenalKopmaQuiz,
  'sejarah-kopma-unsil': mengenalKopmaQuiz,
  'visi-misi-2026': mengenalKopmaQuiz,
  'hak-dan-kewajiban': keanggotaanSimpananQuiz,
  'simpanan-anggota': keanggotaanSimpananQuiz,
  'dikmenkop-manajemen-koperasi': dikmenkopQuiz,
  'dikmenkop-keorganisasian': dikmenkopQuiz,
  'dikmenkop-shu': dikmenkopQuiz,
}
