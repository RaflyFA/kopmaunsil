'use client'

import { useEffect, useState } from 'react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Image as ImageIcon,
  MapPin,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { documentationEvents, EventDoc } from '@/data/dokumentasi'
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage'

const categories = ['Semua', 'Pendidikan', 'RAT', 'Dies Natalis', 'Sosial & Wirausaha']

export function DokumentasiGallery() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventDoc | null>(null)
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0)

  useEffect(() => {
    const list = getStoredData<string[]>(STORAGE_KEYS.LIKED_EVENTS, [])
    setLikedIds(list)
  }, [])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedEvent) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null)
      if (e.key === 'ArrowRight') {
        setCurrentPhotoIdx((prev) => (prev + 1) % selectedEvent.gallery.length)
      }
      if (e.key === 'ArrowLeft') {
        setCurrentPhotoIdx((prev) => (prev - 1 + selectedEvent.gallery.length) % selectedEvent.gallery.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedEvent])

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const isLiked = likedIds.includes(id)
    const updated = isLiked ? likedIds.filter((item) => item !== id) : [...likedIds, id]
    setLikedIds(updated)
    setStoredData(STORAGE_KEYS.LIKED_EVENTS, updated)
  }

  const openLightbox = (event: EventDoc, photoIdx = 0) => {
    setSelectedEvent(event)
    setCurrentPhotoIdx(photoIdx)
  }

  const filtered = documentationEvents.filter((event) => {
    const matchCat = activeCategory === 'Semua' || event.category === activeCategory
    const matchQuery =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <div className="mt-8">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Chips */}
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

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dokumentasi kegiatan..."
            className="min-h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-xs outline-none focus:border-[#0133C6] focus:ring-4 focus:ring-[#0133C6]/10"
          />
        </div>
      </div>

      {/* Grid of Events */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.map((event) => {
          const isLiked = likedIds.includes(event.id)
          const totalLikes = event.likes + (isLiked ? 1 : 0)

          return (
            <article
              key={event.id}
              onClick={() => openLightbox(event, 0)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0133C6]/40 hover:shadow-lg"
            >
              {/* Image Preview with Hover Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#0133C6] backdrop-blur shadow-sm">
                    {event.category}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, event.id)}
                  className={`absolute right-4 top-4 flex size-9 items-center justify-center rounded-full backdrop-blur transition ${
                    isLiked
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-black/30 text-white hover:bg-black/50'
                  }`}
                  aria-label="Sukai dokumentasi"
                >
                  <Heart className={`size-4 ${isLiked ? 'fill-white' : ''}`} />
                </button>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                  <div>
                    <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
                      <Calendar className="size-3.5 text-white/70" />
                      {event.date}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 rounded-lg bg-black/40 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                    <ImageIcon className="size-3.5" />
                    {event.photosCount} Foto
                  </span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0133C6] transition">
                  {event.title}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="size-3.5 text-slate-400" />
                  {event.location}
                </p>
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-600">{event.summary}</p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span className="font-semibold text-[#0133C6] flex items-center gap-1 group-hover:underline">
                    
                  </span>
                  <span>{totalLikes} menyukai</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
          <ImageIcon className="mx-auto size-8 text-slate-300" />
          <p className="mt-3 text-sm font-semibold">Tidak ada kegiatan yang cocok dengan pencarian.</p>
        </div>
      )}

      {/* Lightbox Modal (Light Theme) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0133C6]">
                  {selectedEvent.category} · {selectedEvent.date}
                </span>
                <h3 className="mt-0.5 text-lg font-bold text-slate-900">{selectedEvent.title}</h3>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                aria-label="Tutup galeri"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Main Active Photo View */}
            <div className="relative flex min-h-[300px] flex-1 items-center justify-center bg-slate-100/70 p-4 md:min-h-[420px]">
              <img
                src={selectedEvent.gallery[currentPhotoIdx]?.url || selectedEvent.coverImage}
                alt="Foto Kegiatan"
                className="max-h-[58vh] w-full rounded-2xl object-contain shadow-sm"
              />

              {/* Prev / Next Arrows */}
              {selectedEvent.gallery.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentPhotoIdx(
                        (prev) => (prev - 1 + selectedEvent.gallery.length) % selectedEvent.gallery.length
                      )
                    }
                    className="absolute left-6 flex size-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:bg-white hover:text-[#0133C6] hover:scale-105"
                    aria-label="Foto sebelumnya"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPhotoIdx((prev) => (prev + 1) % selectedEvent.gallery.length)
                    }
                    className="absolute right-6 flex size-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:bg-white hover:text-[#0133C6] hover:scale-105"
                    aria-label="Foto berikutnya"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Metadata */}
            <div className="border-t border-slate-100 bg-white px-6 py-4">
              <p className="text-sm leading-relaxed text-slate-700">
                {selectedEvent.gallery[currentPhotoIdx]?.caption || selectedEvent.summary}
              </p>

              {/* Thumbnails strip */}
              {selectedEvent.gallery.length > 1 && (
                <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
                  {selectedEvent.gallery.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIdx(idx)}
                      className={`relative aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                        currentPhotoIdx === idx
                          ? 'border-[#0133C6] ring-2 ring-[#0133C6]/20 shadow-sm opacity-100'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={photo.url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
