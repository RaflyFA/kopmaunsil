'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export interface BaperkuProgressData {
  completedModules: string[]
  quizScores: Record<string, { score: number; maxScore: number }>
  userId: string | null
}

/**
 * Mengambil progres membaca dan hasil kuis anggota yang sedang login dari Supabase.
 */
export async function getMemberBaperkuProgress(): Promise<BaperkuProgressData> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        completedModules: [],
        quizScores: {},
        userId: null,
      }
    }

    const admin = createAdminClient()

    // 1. Ambil daftar modul yang telah selesai dibaca
    const { data: progressRows, error: progErr } = await admin
      .from('member_progress')
      .select('module_slug')
      .eq('user_id', user.id)

    if (progErr) {
      console.error('Error fetching member_progress:', progErr)
    }

    const completedModules = progressRows ? progressRows.map((r) => r.module_slug) : []

    // 2. Ambil nilai kuis yang telah dikerjakan
    const { data: quizRows, error: quizErr } = await admin
      .from('member_quiz_results')
      .select('module_slug, score, max_score')
      .eq('user_id', user.id)

    if (quizErr) {
      console.error('Error fetching member_quiz_results:', quizErr)
    }

    const quizScores: Record<string, { score: number; maxScore: number }> = {}
    if (quizRows) {
      for (const row of quizRows) {
        quizScores[row.module_slug] = {
          score: row.score,
          maxScore: row.max_score,
        }
      }
    }

    return {
      completedModules,
      quizScores,
      userId: user.id,
    }
  } catch (error) {
    console.error('getMemberBaperkuProgress exception:', error)
    return {
      completedModules: [],
      quizScores: {},
      userId: null,
    }
  }
}

/**
 * Toggle status selesai membaca suatu materi BAPERKU di Supabase
 */
export async function toggleModuleProgress(moduleSlug: string): Promise<{
  success: boolean
  isCompleted?: boolean
  completedModules?: string[]
  error?: string
}> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'Silakan masuk ke akun anggota untuk menyimpan progres belajar.',
      }
    }

    const admin = createAdminClient()

    // Cek apakah sudah tercatat
    const { data: existing } = await admin
      .from('member_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('module_slug', moduleSlug)
      .maybeSingle()

    let isCompleted = false
    if (existing) {
      // Hapus (batalkan selesai)
      await admin.from('member_progress').delete().eq('id', existing.id)
      isCompleted = false
    } else {
      // Tambahkan selesai
      await admin.from('member_progress').insert({
        user_id: user.id,
        module_slug: moduleSlug,
      })
      isCompleted = true
    }

    // Ambil daftar terbaru
    const { data: allProgress } = await admin
      .from('member_progress')
      .select('module_slug')
      .eq('user_id', user.id)

    const completedModules = allProgress ? allProgress.map((r) => r.module_slug) : []

    revalidatePath('/')
    revalidatePath('/baperku')
    revalidatePath(`/baperku/${moduleSlug}`)

    return {
      success: true,
      isCompleted,
      completedModules,
    }
  } catch (err: any) {
    console.error('toggleModuleProgress exception:', err)
    return { success: false, error: err.message || 'Gagal memperbarui progres.' }
  }
}

/**
 * Menyimpan hasil kuis BAPERKU ke database dan otomatis menandai modul selesai.
 */
export async function saveQuizResult(
  moduleSlug: string,
  score: number,
  maxScore: number
): Promise<{
  success: boolean
  completedModules?: string[]
  error?: string
}> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: 'Silakan masuk ke akun anggota untuk menyimpan hasil kuis.',
      }
    }

    const admin = createAdminClient()

    // 1. Upsert hasil kuis
    await admin.from('member_quiz_results').upsert(
      {
        user_id: user.id,
        module_slug: moduleSlug,
        score,
        max_score: maxScore,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,module_slug' }
    )

    // 2. Tandai modul selesai dibaca jika belum
    const { data: existingProg } = await admin
      .from('member_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('module_slug', moduleSlug)
      .maybeSingle()

    if (!existingProg) {
      await admin.from('member_progress').insert({
        user_id: user.id,
        module_slug: moduleSlug,
      })
    }

    // Ambil daftar terbaru
    const { data: allProgress } = await admin
      .from('member_progress')
      .select('module_slug')
      .eq('user_id', user.id)

    const completedModules = allProgress ? allProgress.map((r) => r.module_slug) : []

    revalidatePath('/')
    revalidatePath('/baperku')
    revalidatePath(`/baperku/${moduleSlug}`)

    return {
      success: true,
      completedModules,
    }
  } catch (err: any) {
    console.error('saveQuizResult exception:', err)
    return { success: false, error: err.message || 'Gagal menyimpan hasil kuis.' }
  }
}
