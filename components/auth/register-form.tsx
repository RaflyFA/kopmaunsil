'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, IdCard, Loader2, User } from 'lucide-react'
import { PasswordInput } from '@/components/auth/password-input'
import { registerAction, type AuthActionResponse } from '@/lib/auth/actions'
import { evaluatePasswordRules } from '@/lib/auth/validation'

export function RegisterForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [nra, setNra] = useState('')
  const [nama, setNama] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<AuthActionResponse['fieldErrors']>({})
  const [isSuccess, setIsSuccess] = useState(false)

  const passwordRules = evaluatePasswordRules(password)
  const isPasswordStrong = passwordRules.every((r) => r.met)
  const isMatching = password.length > 0 && password === confirmPassword

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setGeneralError(null)
    setFieldErrors({})

    const formData = new FormData()
    formData.append('nra', nra)
    formData.append('nama', nama)
    formData.append('password', password)
    formData.append('confirmPassword', confirmPassword)

    startTransition(async () => {
      const res = await registerAction(null, formData)
      if (res.success) {
        setIsSuccess(true)
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 1200)
      } else {
        if (res.error) setGeneralError(res.error)
        if (res.fieldErrors) setFieldErrors(res.fieldErrors)
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">Registrasi Berhasil!</h3>
        <p className="mt-2 text-sm text-slate-600">
          Akun anggota KOPMA Anda telah aktif. Mengalihkan ke halaman utama...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {generalError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-700">
          <AlertCircle className="size-4 shrink-0 mt-0.5 text-red-500" />
          <span className="leading-relaxed">{generalError}</span>
        </div>
      )}

      {/* Input NRA */}
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
            placeholder="Contoh: 237006012"
            className={`min-h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 transition-all outline-none ${
              fieldErrors?.nra
                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-slate-200 focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10'
            }`}
          />
        </div>
        {fieldErrors?.nra && (
          <p className="text-[11px] font-medium text-red-600">{fieldErrors.nra}</p>
        )}
      </label>

      {/* Input Nama Lengkap */}
      <label className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
        Nama Lengkap
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            required
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className={`min-h-12 w-full rounded-xl border bg-white pl-10 pr-4 text-sm text-slate-900 transition-all outline-none ${
              fieldErrors?.name
                ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-slate-200 focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10'
            }`}
          />
        </div>
        {fieldErrors?.name && (
          <p className="text-[11px] font-medium text-red-600">{fieldErrors.name}</p>
        )}
      </label>

      {/* Input Kata Sandi */}
      <div className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
        <span>Buat Kata Sandi</span>
        <PasswordInput
          id="register-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showStrengthChecklist={true}
          error={fieldErrors?.password}
        />
      </div>

      {/* Konfirmasi Kata Sandi */}
      <div className="flex flex-col gap-1.5 text-xs font-normal text-slate-700">
        <span>Konfirmasi Kata Sandi</span>
        <PasswordInput
          id="confirm-password"
          name="confirmPassword"
          placeholder="Ulangi kata sandi"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors?.confirmPassword}
        />
        {confirmPassword.length > 0 && (
          <p
            className={`text-[11px] font-medium ${
              isMatching ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {isMatching ? '✓ Kata sandi cocok' : 'Konfirmasi kata sandi belum sama'}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || !isPasswordStrong || !isMatching || !nra || !nama}
        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0133C6] font-bold text-white shadow-md shadow-[#0133C6]/20 transition-all hover:bg-[#0952B6] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Mendaftarkan Akun...</span>
          </>
        ) : (
          'Daftar Akun Anggota'
        )}
      </button>

      <div className="mt-2 text-center text-xs text-slate-600">
        Sudah memiliki akun?{' '}
        <Link href="/login" className="font-bold text-[#0133C6] hover:underline">
          Masuk di sini
        </Link>
      </div>
    </form>
  )
}
