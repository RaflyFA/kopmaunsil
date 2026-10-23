'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, IdCard, Loader2 } from 'lucide-react'
import { PasswordInput } from '@/components/auth/password-input'
import { loginAction } from '@/lib/auth/actions'

export default function LoginPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [nra, setNra] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const formData = new FormData()
    formData.append('nra', nra)
    formData.append('password', password)

    startTransition(async () => {
      const res = await loginAction(null, formData)
      if (res.success) {
        router.push('/')
        router.refresh()
      } else {
        setError(res.error || 'NRA atau kata sandi tidak sesuai.')
      }
    })
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      {/* Background Image dengan efek putih transparan 50% (Fixed tidak ikut scroll) */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/Temu%20Anggota%202/IMG_9038.webp')` }}
      />
      <div className="fixed inset-0 bg-white/50 backdrop-blur-[1px]" />

      {/* Kartu Form Login */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/80 bg-white/95 p-6 shadow-2xl backdrop-blur-md md:p-9">
        <div className="mb-7 flex flex-col items-center text-center">
          <img
            src="/LOGO KOPMA.PNG"
            alt="Logo KOPMA UNSIL"
            className="h-16 w-auto object-contain"
          />
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Masuk Anggota</h1>
          <p className="mt-1 text-xs text-slate-500">
            Masuk dengan NRA untuk mengakses BAPERKU
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-700">
            <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-500" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
            Nomor Registrasi Anggota (NRA)
            <div className="relative">
              <IdCard className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                required
                type="text"
                inputMode="numeric"
                value={nra}
                onChange={(e) => setNra(e.target.value)}
                placeholder="Masukkan NRA Anda"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 transition-all outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10"
              />
            </div>
          </label>

          <div className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
            <span>Kata Sandi</span>
            <PasswordInput
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || !nra || !password}
            className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0133C6] font-bold text-white shadow-md shadow-[#0133C6]/20 transition-all hover:bg-[#0952B6] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Memeriksa Akses...</span>
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-center text-xs">
          <p className="text-slate-600">
            Belum memiliki akun?{' '}
            <Link href="/register" className="font-bold text-[#0133C6] hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
          Khusus anggota KOPMA UNSIL. Lupa kata sandi? Hubungi pengurus KOPMA UNSIL.
        </p>

        <Link
          href="/"
          className="mt-4 block text-center text-xs font-semibold text-slate-500 hover:text-[#0133C6]"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  )
}
