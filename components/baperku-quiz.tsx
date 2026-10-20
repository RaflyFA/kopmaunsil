'use client'

import { useEffect, useState } from 'react'
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react'
import { moduleQuizzes, QuizQuestion } from '@/data/quizzes'
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage'

export function BaperkuQuiz({ moduleSlug, moduleTitle }: { moduleSlug: string; moduleTitle: string }) {
  const questions: QuizQuestion[] = moduleQuizzes[moduleSlug] || []

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [storedScore, setStoredScore] = useState<{ score: number; maxScore: number } | null>(null)

  useEffect(() => {
    const results = getStoredData<Record<string, { score: number; maxScore: number }>>(
      STORAGE_KEYS.QUIZ_RESULTS,
      {}
    )
    if (results[moduleSlug]) {
      setStoredScore(results[moduleSlug])
    }
  }, [moduleSlug])

  if (!questions || questions.length === 0) {
    return null
  }

  const currentQ = questions[currentIndex]

  const handleSelect = (idx: number) => {
    if (isSubmitted) return
    setSelectedOption(idx)
  }

  const handleCheckAnswer = () => {
    if (selectedOption === null) return
    setIsSubmitted(true)
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsSubmitted(false)
    } else {
      // Quiz completed!
      const finalScore = selectedOption === currentQ.correctIndex ? score : score
      setIsCompleted(true)

      // Save to localStorage
      const results = getStoredData<Record<string, { score: number; maxScore: number }>>(
        STORAGE_KEYS.QUIZ_RESULTS,
        {}
      )
      results[moduleSlug] = { score: finalScore, maxScore: questions.length }
      setStoredData(STORAGE_KEYS.QUIZ_RESULTS, results)
      setStoredScore(results[moduleSlug])

      // Automatically mark module as completed in learning progress!
      const completed = getStoredData<string[]>(STORAGE_KEYS.COMPLETED_MODULES, [])
      if (!completed.includes(moduleSlug)) {
        completed.push(moduleSlug)
        setStoredData(STORAGE_KEYS.COMPLETED_MODULES, completed)
      }
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsSubmitted(false)
    setScore(0)
    setIsCompleted(false)
  }

  const handleStartQuiz = () => {
    handleRestart()
    setIsOpen(true)
  }

  return (
    <div className="mt-10 rounded-3xl border border-[#0133C6]/20 bg-gradient-to-b from-blue-50/50 via-white to-white p-6 shadow-sm transition-all md:p-8">
      {/* State 1: Collapsed / CTA Trigger Card */}
      {!isOpen ? (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Uji Pemahaman Materi</h3>
                {storedScore && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                    <Award className="size-3.5" />
                    Skor: {storedScore.score}/{storedScore.maxScore}
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                Uji ingatan dan pemahamanmu setelah membaca modul <strong>{moduleTitle}</strong>.
              </p>

              
            </div>
          </div>

          <div className="sm:self-center shrink-0">
            <button
              onClick={handleStartQuiz}
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#0133C6] px-6 text-sm font-bold text-white shadow-md shadow-[#0133C6]/20 transition-all hover:bg-[#0952B6] hover:shadow-lg hover:-translate-y-0.5"
            >
              <Play className="size-4 fill-white" />
              {storedScore ? 'Ulangi Kuis' : 'Coba Kuis'}
            </button>
          </div>
        </div>
      ) : (
        /* State 2: Expanded Quiz Section */
        <div className="animate-in fade-in slide-in-from-top-3 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#0133C6] text-white">
                <HelpCircle className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Uji Pemahaman: {moduleTitle}</h3>
                <p className="text-xs text-slate-500">
                  {questions.length} Pertanyaan Pilihan Ganda
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              title="Tutup Kuis"
            >
              <ChevronUp className="size-4" />
              <span className="hidden sm:inline">Tutup</span>
            </button>
          </div>

          {isCompleted ? (
            /* Quiz Completed State */
            <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#0133C6]/10 text-[#0133C6] ring-8 ring-[#0133C6]/5">
                <Sparkles className="size-10 text-[#0133C6]" />
              </div>
              <h4 className="mt-5 text-2xl font-black text-slate-900">
                {score === questions.length ? 'Luar Biasa! Pemahaman Sempurna 🎉' : 'Bagus! Kuis Selesai! 👍'}
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Kamu menjawab dengan benar <strong className="text-[#0133C6] font-bold">{score}</strong> dari{' '}
                <strong>{questions.length}</strong> pertanyaan. Modul ini telah tercatat selesai di rapor belajarmu!
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <RotateCcw className="size-4" /> Ulangi Kuis
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0133C6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0952B6]"
                >
                  Selesai & Tutup Kuis
                </button>
              </div>
            </div>
          ) : (
            /* Active Question State */
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>
                  Pertanyaan <span className="text-[#0133C6] font-bold">{currentIndex + 1}</span> dari {questions.length}
                </span>
                <span>Skor Sementara: {score}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-[#0133C6] transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <p className="text-base font-bold leading-relaxed text-slate-900 md:text-lg">
                {currentQ.question}
              </p>

              {/* Options */}
              <div className="mt-5 space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx
                  const isCorrect = isSubmitted && idx === currentQ.correctIndex
                  const isWrong = isSubmitted && isSelected && idx !== currentQ.correctIndex

                  let btnClass = 'border-slate-200 bg-white text-slate-700 hover:border-[#0133C6]/40 hover:bg-blue-50/30'
                  if (isSelected && !isSubmitted) {
                    btnClass = 'border-[#0133C6] bg-blue-50/80 text-[#0133C6] ring-2 ring-[#0133C6]/20 font-semibold'
                  } else if (isCorrect) {
                    btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold ring-2 ring-emerald-400/30'
                  } else if (isWrong) {
                    btnClass = 'border-rose-400 bg-rose-50 text-rose-800 font-semibold'
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(idx)}
                      className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition-all ${btnClass}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isSelected && !isSubmitted
                              ? 'bg-[#0133C6] text-white'
                              : isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isWrong
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {isCorrect && <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />}
                      {isWrong && <XCircle className="size-5 shrink-0 text-rose-500" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanation Banner */}
              {isSubmitted && (
                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/80 p-4 text-sm leading-6 text-slate-700 animate-in fade-in duration-200">
                  <p className="font-bold text-[#0133C6] flex items-center gap-1.5">
                     Penjelasan:
                  </p>
                  <p className="mt-1">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-between">
                

                {!isSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleCheckAnswer}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0133C6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0952B6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0133C6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0952B6]"
                  >
                    {currentIndex + 1 < questions.length ? 'Lanjut ke Pertanyaan Berikutnya' : 'Selesaikan Kuis'}
                    <ChevronRight className="size-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
