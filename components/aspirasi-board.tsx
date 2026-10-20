'use client'

import { useEffect, useState } from 'react'
import {
  Check,
  ChevronDown,
  Filter,
  Flame,
  Heart,
  Lightbulb,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react'
import { Aspiration, AspirationCategory, initialAspirations } from '@/data/aspirasi'
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage'

const categories: ('Semua' | AspirationCategory)[] = [
  'Semua',
  'Pelatihan & Skill',
  'Event & Gathering',
  'Usaha & Fasilitas',
  'Kritik & Saran',
]

export function AspirasiBoard() {
  const [aspirations, setAspirations] = useState<Aspiration[]>([])
  const [upvotedIds, setUpvotedIds] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<'Semua' | AspirationCategory>('Semua')
  const [sortBy, setSortBy] = useState<'popular' | 'latest'>('popular')
  const [showModal, setShowModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<AspirationCategory>('Pelatihan & Skill')
  const [description, setDescription] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [authorName, setAuthorName] = useState('')
  const [faculty, setFaculty] = useState('Fakultas Ekonomi & Bisnis')

  // Load from localStorage or initial data
  useEffect(() => {
    const storedList = getStoredData<Aspiration[]>(STORAGE_KEYS.ASPIRATIONS, initialAspirations)
    setAspirations(storedList)

    const storedUpvotes = getStoredData<string[]>(STORAGE_KEYS.UPVOTED_ASPIRATIONS, [])
    setUpvotedIds(storedUpvotes)
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Handle upvoting
  const handleToggleUpvote = (id: string) => {
    const isUpvoted = upvotedIds.includes(id)
    let updatedUpvotedIds: string[]
    let updatedList: Aspiration[]

    if (isUpvoted) {
      updatedUpvotedIds = upvotedIds.filter((item) => item !== id)
      updatedList = aspirations.map((item) =>
        item.id === id ? { ...item, upvotes: Math.max(0, item.upvotes - 1) } : item
      )
    } else {
      updatedUpvotedIds = [...upvotedIds, id]
      updatedList = aspirations.map((item) =>
        item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
      )
      triggerToast('Aspirasi berhasil kamu dukung! 👍')
    }

    setUpvotedIds(updatedUpvotedIds)
    setAspirations(updatedList)
    setStoredData(STORAGE_KEYS.UPVOTED_ASPIRATIONS, updatedUpvotedIds)
    setStoredData(STORAGE_KEYS.ASPIRATIONS, updatedList)
  }

  // Handle submit new aspiration
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    const newAspiration: Aspiration = {
      id: `asp-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category: category,
      authorName: isAnonymous ? 'Anggota KOPMA' : authorName.trim() || 'Anggota KOPMA',
      authorRole: isAnonymous ? 'Suara Anonim' : faculty,
      createdAt: 'Baru saja',
      upvotes: 1,
      status: 'Ditinjau PSDA',
      tags: [category.split(' ')[0], 'Aspirasi 2026'],
    }

    const updatedList = [newAspiration, ...aspirations]
    const updatedUpvotes = [...upvotedIds, newAspiration.id]

    setAspirations(updatedList)
    setUpvotedIds(updatedUpvotes)
    setStoredData(STORAGE_KEYS.ASPIRATIONS, updatedList)
    setStoredData(STORAGE_KEYS.UPVOTED_ASPIRATIONS, updatedUpvotes)

    // Reset Form
    setTitle('')
    setDescription('')
    setShowModal(false)
    triggerToast('Aspirasi kamu berhasil dikirimkan ke PSDA KOPMA UNSIL! 🎉')
  }

  // Filter & Sort
  const filtered = aspirations.filter((item) => {
    if (activeCategory === 'Semua') return true
    return item.category === activeCategory
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return b.upvotes - a.upvotes
    return 0 // Keep order
  })

  return (
    <div className="relative mt-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 transform rounded-2xl bg-slate-900/95 px-5 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur transition-all animate-in fade-in slide-in-from-bottom-3 md:bottom-8">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Suara & Usulan Anggota</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Dukung ide kegiatan favoritmu atau sampaikan aspirasimu langsung ke bidang PSDA.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0133C6] px-5 text-sm font-bold text-white shadow-md shadow-[#0133C6]/20 transition-all hover:bg-[#0952B6] hover:shadow-lg"
        >
          <Plus className="size-4" />
          Kirim Usulan Baru
        </button>
      </div>

      {/* Filter and Sorting Row */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0133C6] text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Urutkan:</span>
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold">
            <button
              onClick={() => setSortBy('popular')}
              className={`rounded-lg px-3 py-1.5 transition ${
                sortBy === 'popular' ? 'bg-[#0133C6]/10 text-[#0133C6]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🔥 Terbanyak Didukung
            </button>
            <button
              onClick={() => setSortBy('latest')}
              className={`rounded-lg px-3 py-1.5 transition ${
                sortBy === 'latest' ? 'bg-[#0133C6]/10 text-[#0133C6]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              🕒 Terbaru
            </button>
          </div>
        </div>
      </div>

      {/* Aspirations Grid / Feed */}
      <div className="mt-6 space-y-4">
        {sorted.map((item) => {
          const isUpvoted = upvotedIds.includes(item.id)

          // Status Badge Color
          let badgeClass = 'bg-amber-50 text-amber-700 border-amber-200'
          if (item.status === 'Disetujui') badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200'
          if (item.status === 'Sedang Berjalan') badgeClass = 'bg-blue-50 text-blue-700 border-blue-200'
          if (item.status === 'Diagendakan') badgeClass = 'bg-purple-50 text-purple-700 border-purple-200'

          return (
            <article
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#0133C6]/30 hover:shadow-md md:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-bold text-slate-600">
                      {item.category}
                    </span>
                    <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${badgeClass}`}>
                      ● {item.status}
                    </span>
                    <span className="text-xs text-slate-400">· {item.createdAt}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-lg font-bold text-slate-900 transition group-hover:text-[#0133C6]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>

                  {/* Author / Metadata */}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <UserCheck className="size-3.5 text-slate-400" />
                      {item.authorName} ({item.authorRole})
                    </span>
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Admin Response Box (if available) */}
                  {item.adminResponse && (
                    <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-3.5 text-xs text-slate-700">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <Sparkles className="size-3.5 text-emerald-600" />
                        Tanggapan Bidang PSDA:
                      </div>
                      <p className="mt-1 leading-5 text-emerald-950">{item.adminResponse}</p>
                    </div>
                  )}
                </div>

                {/* Upvote Button */}
                <div className="sm:self-center">
                  <button
                    onClick={() => handleToggleUpvote(item.id)}
                    className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold transition-all ${
                      isUpvoted
                        ? 'border-[#0133C6] bg-[#0133C6] text-white shadow-md shadow-[#0133C6]/25'
                        : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:border-[#0133C6]/40 hover:bg-white'
                    }`}
                  >
                    <Heart className={`size-4 ${isUpvoted ? 'fill-white text-white' : 'text-slate-400'}`} />
                    <span>{item.upvotes}</span>
                    <span className="hidden sm:inline font-normal text-xs opacity-80">Dukung</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}

        {sorted.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
            <Lightbulb className="mx-auto size-8 text-slate-300" />
            <p className="mt-3 text-sm font-semibold">Belum ada aspirasi di kategori ini.</p>
            <p className="mt-1 text-xs">Jadilah yang pertama menyampaikan ide kegiatan!</p>
          </div>
        )}
      </div>

      {/* Modal Kirim Aspirasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#0133C6]/10 text-[#0133C6]">
                  <Send className="size-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Sampaikan Aspirasi Baru</h3>
                  <p className="text-xs text-slate-500">Usulan kamu akan langsung ditinjau oleh pengurus PSDA.</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700">Kategori Usulan</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AspirationCategory)}
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10"
                >
                  <option value="Pelatihan & Skill">Pelatihan & Skill</option>
                  <option value="Event & Gathering">Event & Gathering</option>
                  <option value="Usaha & Fasilitas">Usaha & Fasilitas</option>
                  <option value="Kritik & Saran">Kritik & Saran</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700">Judul Ide / Usulan</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Workshop Copywriting untuk Wirausaha Anggota"
                  className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700">Penjelasan & Harapan</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan mengapa kegiatan ini bermanfaat bagi anggota dan apa saja yang ingin dipelajari..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 p-3.5 text-sm outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10"
                />
              </div>

              {/* Anonymous Toggle */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                <label className="flex cursor-pointer items-center justify-between text-xs font-bold text-slate-800">
                  <span>Kirim Sebagai Suara Anonim</span>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="size-4 rounded text-[#0133C6] focus:ring-[#0133C6]"
                  />
                </label>
                <p className="mt-1 text-[11px] text-slate-500 leading-4">
                  {isAnonymous
                    ? 'Identitas dan NPM kamu disembunyikan. Cocok untuk usulan bebas tanpa ragu.'
                    : 'Nama dan fakultas kamu akan ditampilkan di kartu aspirasi.'}
                </p>

                {!isAnonymous && (
                  <div className="mt-3 grid gap-2 pt-2 border-t border-slate-200/60 sm:grid-cols-2">
                    <input
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Nama Lengkap / Panggilan"
                      className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#0133C6]"
                    />
                    <input
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      placeholder="Fakultas / Prodi"
                      className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#0133C6]"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="min-h-11 rounded-xl px-4 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0133C6] px-6 text-xs font-bold text-white shadow-md shadow-[#0133C6]/20 transition hover:bg-[#0952B6]"
                >
                  <Send className="size-3.5" />
                  Kirimkan Aspirasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
