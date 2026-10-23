'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Award,
  CheckCircle2,
  Copy,
  CreditCard,
  QrCode,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Wifi,
} from 'lucide-react'
import type { CurrentMember } from '@/lib/auth/types'

interface KtaCardProps {
  member?: CurrentMember | null
}

export function KtaCard({ member }: KtaCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [copied, setCopied] = useState(false)

  const memberData = {
    name: member?.nama_lengkap || 'Osy Werdia Pramesthi',
    nra: member?.nra || '2602001',
    memberId: member?.nra ? `KOPMA-UNSIL-${member.nra}` : 'KOPMA-UNSIL-2602001',
    faculty: member?.prodi
      ? `${member.prodi}${member.fakultas ? ` • ${member.fakultas}` : ''}`
      : 'Pendidikan Biologi • FKIP',
    joinDate: member?.created_at
      ? new Date(member.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '2026',
    status: member ? (member.is_active ? 'Anggota Aktif' : 'Non-Aktif') : 'Anggota Aktif',
    points: 12,
  }

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard?.writeText(memberData.nra)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id="kta-section" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm scroll-mt-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#0133C6]/10 text-[#0133C6]">
            <CreditCard className="size-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Kartu Anggota Virtual</h3>
            <p className="text-xs text-slate-500">KTA resmi anggota KOPMA Universitas Siliwangi</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCw className="size-3.5 text-[#0133C6]" />
          {isFlipped ? 'Lihat Sisi Depan' : 'Lihat Sisi Belakang'}
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div className="perspective-1000 mt-6 flex justify-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative h-[225px] w-full max-w-[390px] cursor-pointer transition-transform duration-700 preserve-3d sm:h-[240px] ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0133C6] via-[#0952B6] to-[#041E62] p-5 text-white shadow-xl ring-1 ring-white/20 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Holographic Watermark Circle */}
            <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border-[20px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 size-48 rounded-full border-[16px] border-white/5" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative size-8 flex items-center justify-center">
                  <Image
                    src="/LOGO KOPMA.PNG"
                    alt="Logo KOPMA"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs font-black tracking-wide leading-none">KOPMA UNSIL</p>
                  <p className="text-[9px] text-white/70 tracking-wider">KARTU TANDA ANGGOTA</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Wifi className="size-4 rotate-90 text-white/70" />
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 ring-1 ring-emerald-400/40">
                  {memberData.status}
                </span>
              </div>
            </div>

            {/* EMV Chip & ID */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="h-7 w-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 shadow-inner ring-1 ring-amber-600/40" />
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-wider text-white/60">Nomor Registrasi Anggota</p>
                <p className="font-mono text-xs font-bold tracking-wider">{memberData.nra}</p>
              </div>
            </div>

            {/* Card Bottom / Member Info */}
            <div className="relative z-10 flex items-end justify-between">
              <div className="min-w-0 pr-2">
                
                <p className="text-sm font-bold tracking-tight truncate max-w-[220px]">{memberData.name}</p>
                <p className="text-[11px] text-white/80 font-mono">NRA: {memberData.nra}</p>
                <p className="text-[10px] text-white/60 truncate max-w-[220px]">{memberData.faculty}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[9px] text-white/50 block">Tap untuk balik</span>
                
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-5 text-white shadow-xl ring-1 ring-white/10"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Black Magnetic Strip */}
            <div className="pointer-events-none absolute inset-x-0 top-5 h-7 bg-black/80" />

            <div className="relative z-10 pt-8 flex items-center justify-between">
              {/* QR Code Simulation */}
              <div className="flex items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-xl bg-white p-1 text-slate-900 shadow-md shrink-0">
                  <QrCode className="size-12" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{memberData.name}</p>
                  <p className="font-mono text-[11px] text-[#4d86ff] font-semibold">NRA: {memberData.nra}</p>
                </div>
              </div>
            </div>

            {/* Footer Back */}
            <div className="relative z-10 flex items-end justify-between border-t border-slate-700/60 pt-2.5 text-[10px] text-slate-400">
              <div>
                <p>Terdaftar: {memberData.joinDate}</p>
                <p>Koperasi Mahasiswa Universitas Siliwangi</p>
              </div>

              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white hover:bg-white/20 transition"
              >
                {copied ? <CheckCircle2 className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                {copied ? 'Tersalin' : 'Salin NRA'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
