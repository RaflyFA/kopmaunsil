'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileText,
  Lightbulb,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { modules } from '@/data/baperku'
import { documentationEvents } from '@/data/dokumentasi'

export function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  // Listen to keyboard Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredModules = query.trim()
    ? modules.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.description.toLowerCase().includes(query.toLowerCase())
      )
    : modules.slice(0, 4)

  const filteredEvents = query.trim()
    ? documentationEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.category.toLowerCase().includes(query.toLowerCase())
      )
    : documentationEvents.slice(0, 2)

  const handleSelect = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <>
      {/* Search trigger button for TopNav */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 text-xs font-medium text-slate-500 transition hover:border-[#0133C6]/30 hover:bg-white hover:text-slate-900"
      >
        <Search className="size-3.5 text-slate-400" />
        <span className="hidden sm:inline">Cari materi, agenda, aspirasi...</span>
        <span className="inline sm:hidden">Cari...</span>
        <kbd className="hidden rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-600 md:inline-block">
          Ctrl K
        </kbd>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 p-4 pt-16 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Input Bar */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
              <Search className="size-5 text-[#0133C6]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik kata kunci (misal: SHU, DIKSARKOP, Aspirasi, RAT)..."
                className="w-full text-sm outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                  Aksi Cepat
                </p>
                <div className="mt-1.5 space-y-1">

                  <button
                    onClick={() => handleSelect('/aspirasi')}
                    className="flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50/70 hover:text-[#0133C6] transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Lightbulb className="size-4" />
                      </span>
                      Kirim Ide & Usulan di Kotak Aspirasi
                    </span>
                    <ChevronRight className="size-3.5 text-slate-300" />
                  </button>
                </div>
              </div>

              {/* Modules Results */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                  Materi BAPERKU ({filteredModules.length})
                </p>
                <div className="mt-1.5 space-y-1">
                  {filteredModules.map((m) => (
                    <button
                      key={m.slug}
                      onClick={() => handleSelect(`/baperku/${m.slug}`)}
                      className="flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs text-slate-700 hover:bg-blue-50/70 hover:text-[#0133C6] transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-[#0133C6]">
                          <BookOpen className="size-4" />
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{m.title}</p>
                          <p className="line-clamp-1 text-[11px] text-slate-500">{m.description}</p>
                        </div>
                      </span>
                      <ChevronRight className="size-3.5 text-slate-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Events Results */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                  Dokumentasi Event
                </p>
                <div className="mt-1.5 space-y-1">
                  {filteredEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => handleSelect('/dokumentasi')}
                      className="flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs text-slate-700 hover:bg-blue-50/70 hover:text-[#0133C6] transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-[#0133C6]">
                          <Calendar className="size-4" />
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{ev.title}</p>
                          <p className="text-[11px] text-slate-500">{ev.category} · {ev.date}</p>
                        </div>
                      </span>
                      <ChevronRight className="size-3.5 text-slate-300 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-400">
              <span>Navigasi instan Portal Anggota KOPMA UNSIL</span>
              <span>Tekan ESC untuk menutup</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
