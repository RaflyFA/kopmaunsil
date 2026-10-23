import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { latestModules } from '@/data/baperku'
import { documentationEvents } from '@/data/dokumentasi'
import { PortalShell, SectionTitle } from '@/components/portal-shell'
import { KtaCard } from '@/components/kta-card'
import { LearningProgressCard } from '@/components/progress-tracker'
import { getCurrentMember } from '@/lib/auth/actions'
import { getMemberBaperkuProgress } from '@/lib/baperku/actions'

export const dynamic = 'force-dynamic'

const quickLinks = [
  {
    href: '/baperku',
    label: 'BAPERKU',
    description: 'Modul belajar & kuis',
    icon: BookOpen,
    
    color: 'bg-blue-500/10 text-[#0133C6]',
  },
  {
    href: '/aspirasi',
    label: 'Kotak Aspirasi',
    description: 'Kirim ide & dukung usulan',
    icon: Lightbulb,
    
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    href: '/dokumentasi',
    label: 'Dokumentasi',
    description: 'Galeri momen kegiatan',
    icon: FileText,
    
    color: 'bg-purple-500/10 text-purple-600',
  },
]

export default async function HomePage() {
  const member = await getCurrentMember()
  const progress = await getMemberBaperkuProgress()
  const latestEvent = documentationEvents[0]

  return (
    <PortalShell member={member}>
      {/* Hero Welcome Banner */}
      <section className="relative -mx-4 overflow-hidden bg-gradient-to-br from-[#0133C6] via-[#0952B6] to-[#041E62] px-6 pb-12 pt-10 text-white shadow-xl md:mx-0 md:mt-8 md:rounded-3xl md:px-10">
        {/* Decorative Circles */}
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border-[28px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full border-[22px] border-white/10" />

        <div className="relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="size-3 text-amber-300" />
                KOPMA UNSIL 2026
              </span>
              <p className="mt-2 text-xl font-black md:text-2xl">BAPERKU Digital</p>
            </div>

            {member ? (
              <div
                title={`Masuk sebagai ${member.nama_lengkap}`}
                className="flex size-11 items-center justify-center rounded-2xl bg-white/20 text-sm font-black shadow-inner ring-2 ring-white/30 backdrop-blur transition hover:scale-105"
              >
                {member.initials}
              </div>
            ) : (
              <Link
                href="/login"
                title="Masuk ke Akun"
                className="flex h-10 items-center justify-center rounded-xl bg-white/20 px-4 text-xs font-bold text-white shadow-inner ring-1 ring-white/30 backdrop-blur transition hover:bg-white/30"
              >
                Masuk
              </Link>
            )}
          </div>

          <p className="text-sm font-medium text-white/80">
            {member ? `Halo, ${member.nama_lengkap}` : 'Halo, Anggota Koperasi Mahasiswa'}
          </p>
          <h1 className="mt-2 max-w-xl text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
            Belajar, bertumbuh, dan berdaya bersama KOPMA UNSIL.
          </h1>
          <p className="mt-3.5 max-w-lg text-sm leading-6 text-white/80">
            Akses materi silabus perkoperasian, sampaikan ide kegiatan, dan pantau rekam jejak belajarmu.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/baperku"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-xs font-bold text-[#0133C6] shadow-lg shadow-black/10 transition hover:bg-slate-100"
            >
              Mulai Belajar BAPERKU <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Grid: Interactive Member KTA Card + Learning Progress Card */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <KtaCard member={member} />
        <div className="flex flex-col justify-between gap-4">
          <LearningProgressCard initialCompletedList={progress.completedModules} />

          {/* Quick Info Box: DIKMENKOP Next Event */}
          <div className="rounded-3xl border border-[#0133C6]/20 bg-gradient-to-br from-blue-50/80 to-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="mt-2.5 text-base font-bold text-slate-900">
                  DIKMENKOP: Manajemen & Keorganisasian Koperasi
                </h3>
                <p className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays className="size-3.5 text-[#0133C6]" />
                  Jadwal pendaftaran akan diumumkan pengurus KOPMA UNSIL
                </p>
              </div>
              <Sparkles className="size-8 text-[#0133C6]/20 shrink-0" />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3 text-xs">
              <span className="text-slate-500">Dapatkan +2 Poin Keaktifan</span>
              <Link
                href="/baperku/dikmenkop-manajemen-koperasi"
                className="font-bold text-[#0133C6] hover:underline flex items-center gap-1"
              >
                Pelajari Silabus <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="mt-10">
        <SectionTitle title="Akses Cepat" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {quickLinks.map(({ href, label, description, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0133C6]/30 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className={`flex size-11 items-center justify-center rounded-2xl ${color}`}>
                  <Icon className="size-5" />
                </span>
              </div>

              <div className="mt-4">
                <span className="block text-sm font-bold text-slate-900 group-hover:text-[#0133C6] transition">
                  {label}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">{description}</span>
              </div>

              <div className="mt-3 flex items-center justify-end text-xs font-semibold text-[#0133C6]">
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Documentation & Latest Modules */}
      <section className="mt-10 grid gap-6 md:grid-cols-12 md:items-stretch">
        {/* Latest Documentation Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:col-span-7 flex flex-col justify-between group">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
            <img
              src={latestEvent.coverImage}
              alt={latestEvent.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="rounded-full bg-[#0133C6] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                {latestEvent.category}
              </span>
              <p className="mt-2 text-base font-bold leading-tight">{latestEvent.title}</p>
              <p className="mt-0.5 text-xs text-white/80">{latestEvent.date} · {latestEvent.location}</p>
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs leading-5 text-slate-600">{latestEvent.summary}</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs font-bold text-slate-500">{latestEvent.photosCount} Foto Dokumentasi</span>
              <Link
                href="/dokumentasi"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0133C6] hover:underline"
              >
                Buka Galeri Foto <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Latest BAPERKU Modules */}
        <div className="flex flex-col justify-between rounded-3xl border border-[#0133C6]/15 bg-gradient-to-b from-[#0133C6]/5 to-white p-5 md:col-span-5 md:p-6">
          <div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">Materi Edukasi Pilihan</h2>
            <p className="mt-1 text-xs text-slate-500">Dilengkapi kuis pemahaman dan pencatatan rapor belajar.</p>

            <div className="mt-5 space-y-3">
              {latestModules.map((module) => (
                <Link
                  key={module.slug}
                  href={`/baperku/${module.slug}`}
                  className="group block rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition hover:border-[#0133C6]/40 hover:shadow"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#0133C6] transition">
                    {module.title}
                  </span>
                  <span className="mt-1 block line-clamp-1 text-[11px] text-slate-500">
                    {module.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/baperku"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0133C6] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#0952B6]"
          >
            Lihat Semua 9 Modul BAPERKU <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </PortalShell>
  )
}

export async function generateMetadata() {
  return {
    title: 'Beranda | KOPMA UNSIL',
    description: 'BAPERKU Digital dan ruang interaksi resmi anggota Koperasi Mahasiswa Universitas Siliwangi',
  }
}
