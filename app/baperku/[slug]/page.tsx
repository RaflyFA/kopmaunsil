import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Clock3,
  Share2,
  Sparkles,
} from 'lucide-react'
import { getModule, modules } from '@/data/baperku'
import { PortalShell } from '@/components/portal-shell'
import { BaperkuQuiz } from '@/components/baperku-quiz'
import { ModuleCompletionToggle, ReadingProgressBar } from '@/components/progress-tracker'

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const module = getModule(slug)
  if (!module) return { title: 'Materi Tidak Ditemukan' }
  return {
    title: `${module.title} | BAPERKU KOPMA UNSIL`,
    description: module.intro,
  }
}

export default async function ModuleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const module = getModule(slug)
  if (!module) notFound()

  const index = modules.findIndex((m) => m.slug === slug)
  const previous = modules[index - 1]
  const next = modules[index + 1]

  return (
    <PortalShell>
      {/* Dynamic Reading Progress Bar at the top of the browser window */}
      <ReadingProgressBar />

      <div className="pt-6 md:pt-10">
        <div className="flex items-center justify-between">
          <Link
            href="/baperku"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-bold text-[#0133C6] transition hover:bg-[#0133C6]/5"
          >
            <ArrowLeft className="size-4" /> Kembali ke Semua Materi
          </Link>

          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Clock3 className="size-3.5 text-slate-400" />
            {module.readTime} menit membaca
          </span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_250px]">
          <article className="max-w-2xl">

            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
              {module.title}
            </h1>

            {/* Intro Lead */}
            <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              {module.intro}
            </p>


            {/* Mobile Collapsible TOC */}
            <div className="mt-8 rounded-2xl border border-[#0133C6]/15 bg-[#0133C6]/5 p-4 text-xs text-slate-700 lg:hidden">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-[#0133C6]">
                  <span>Daftar Bagian Pembahasan</span>
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mt-3 space-y-2 border-t border-[#0133C6]/10 pt-3 pl-2">
                  {module.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${encodeURIComponent(s.heading)}`} className="text-slate-700 hover:text-[#0133C6]">
                        • {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Article Sections */}
            <div className="mt-10 space-y-10">
              {module.sections.map((section) => (
                <section key={section.heading} id={encodeURIComponent(section.heading)} className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 md:text-base md:leading-8">
                    {section.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-2 rounded-2xl bg-slate-50/70 p-4 pl-8 border border-slate-100 text-sm">
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="list-disc marker:text-[#0133C6]">
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Interactive Module Completion Tracker */}
            <ModuleCompletionToggle slug={module.slug} title={module.title} />

            {/* Interactive Mini Quiz */}
            <BaperkuQuiz moduleSlug={module.slug} moduleTitle={module.title} />

            {/* Prev / Next Navigation Footer */}
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-2">
              {previous ? (
                <Link
                  href={`/baperku/${previous.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0133C6]/40 hover:shadow-md"
                >
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors group-hover:text-[#0133C6]">
                    <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                    Sebelumnya
                  </span>
                  <span className="mt-2 block text-sm font-extrabold text-slate-900 transition-colors group-hover:text-[#0133C6] sm:text-base line-clamp-1">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {next ? (
                <Link
                  href={`/baperku/${next.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[#0133C6] bg-gradient-to-br from-[#0133C6] via-[#0848CA] to-[#0952B6] p-5 text-right text-white shadow-lg shadow-[#0133C6]/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0133C6]/30"
                >
                  <span className="flex items-center justify-end gap-1.5 text-xs font-bold text-white/80 transition-colors group-hover:text-white">
                    Berikutnya
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 block text-sm font-black text-white sm:text-base line-clamp-1">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          </article>

          {/* Desktop Sticky Table of Contents */}
          <aside className="sticky top-28 hidden h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0133C6]">
              <Sparkles className="size-3.5" />
              Daftar Isi
            </p>
            <ul className="mt-4 space-y-3 text-xs leading-5">
              {module.sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${encodeURIComponent(s.heading)}`}
                    className="block font-medium text-slate-600 transition hover:text-[#0133C6]"
                  >
                    • {s.heading}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <span className="text-[11px] text-slate-400 block mb-2">Punya pertanyaan seputar materi?</span>
              <Link
                href="/aspirasi"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-[#0133C6] hover:text-white transition"
              >
                Tanya di Aspirasi
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </PortalShell>
  )
}
