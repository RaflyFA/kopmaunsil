import Link from 'next/link'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata = {
  title: 'Registrasi Anggota | KOPMA UNSIL',
  description: 'Aktivasi akun anggota resmi KOPMA UNSIL menggunakan NRA',
}

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      {/* Background Image dengan efek putih transparan 50% (Fixed tidak ikut scroll) */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/Temu%20Anggota%202/IMG_9038.webp')` }}
      />
      <div className="fixed inset-0 bg-white/50 backdrop-blur-[1px]" />

      {/* Kartu Form Registrasi */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-md md:p-9">
        <div className="mb-7 flex flex-col items-center text-center">
          <img
            src="/LOGO KOPMA.PNG"
            alt="Logo KOPMA UNSIL"
            className="h-16 w-auto object-contain"
          />
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Registrasi Anggota</h1>
          <p className="mt-1 text-xs text-slate-500">
            Khusus anggota aktif KOPMA UNSIL yang telah memiliki NRA resmi
          </p>
        </div>

        <RegisterForm />

        <div className="mt-8 border-t border-slate-100 pt-5 text-center">
          <p className="text-[11px] leading-5 text-slate-400">
            Belum memiliki NRA atau data tidak ditemukan? Silakan konfirmasi ke pengurus KOPMA UNSIL.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-xs font-semibold text-[#0133C6] hover:underline"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  )
}
