'use client'

import { useState } from 'react'
import { Check, Eye, EyeOff, LockKeyhole, X } from 'lucide-react'
import { evaluatePasswordRules } from '@/lib/auth/validation'

interface PasswordInputProps {
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showStrengthChecklist?: boolean
  error?: string
}

export function PasswordInput({
  id = 'password',
  name = 'password',
  placeholder = 'Masukkan kata sandi',
  required = true,
  value,
  onChange,
  showStrengthChecklist = false,
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const rules = evaluatePasswordRules(value)
  const isAllMet = rules.every((r) => r.met)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={`min-h-12 w-full rounded-xl border bg-white pl-10 pr-12 text-sm text-slate-900 transition-all outline-none ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
              : 'border-slate-200 focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10'
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}

      {/* Real-time Password Rules Checklist (Hanya tampil di registrasi saat fokus atau sudah mulai mengetik) */}
      {showStrengthChecklist && (isFocused || value.length > 0) && (
        <div className="mt-2 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-xs">
          <p className="font-normal text-slate-600">Persyaratan Keamanan Sandi:</p>
          <div className="mt-2 space-y-1.5">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`flex items-center gap-2 transition-colors ${
                  rule.met ? 'font-normal text-emerald-600' : 'font-normal text-slate-500'
                }`}
              >
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                    rule.met
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {rule.met ? <Check className="size-3 stroke-[3]" /> : <X className="size-2.5" />}
                </span>
                <span>{rule.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
