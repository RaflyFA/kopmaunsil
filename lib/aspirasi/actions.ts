'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { Aspiration, AspirationCategory, AspirationStatus } from '@/data/aspirasi'

export interface AspirationsResponse {
  aspirations: Aspiration[]
  upvotedIds: string[]
  currentUserId: string | null
}

/**
 * Mengambil seluruh daftar aspirasi dari tabel Supabase beserta status upvote pengguna.
 */
export async function getAspirationsAction(): Promise<AspirationsResponse> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const admin = createAdminClient()

    // 1. Ambil daftar aspirasi
    const { data: rows, error: aspErr } = await admin
      .from('aspirations')
      .select('*')
      .order('created_at', { ascending: false })

    if (aspErr) {
      console.error('Error fetching aspirations:', aspErr)
      return { aspirations: [], upvotedIds: [], currentUserId: user?.id || null }
    }

    const aspirations: Aspiration[] = (rows || []).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category as AspirationCategory,
      authorName: row.author_name,
      authorRole: row.author_role,
      createdAt: new Date(row.created_at).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      upvotes: row.upvotes || 0,
      status: (row.status as AspirationStatus) || 'Sedang Ditinjau',
      tags: row.tags || [],
      adminResponse: row.admin_response || undefined,
    }))

    // 2. Ambil upvotes milik pengguna saat ini jika login
    let upvotedIds: string[] = []
    if (user) {
      const { data: upvoteRows } = await admin
        .from('aspiration_upvotes')
        .select('aspiration_id')
        .eq('user_id', user.id)

      if (upvoteRows) {
        upvotedIds = upvoteRows.map((r) => r.aspiration_id)
      }
    }

    return {
      aspirations,
      upvotedIds,
      currentUserId: user?.id || null,
    }
  } catch (error) {
    console.error('getAspirationsAction exception:', error)
    return { aspirations: [], upvotedIds: [], currentUserId: null }
  }
}

/**
 * Menyimpan aspirasi baru ke tabel Supabase.
 */
export async function createAspirationAction(payload: {
  title: string
  description: string
  category: AspirationCategory
  isAnonymous: boolean
  authorName?: string
  faculty?: string
}): Promise<{
  success: boolean
  aspiration?: Aspiration
  error?: string
}> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const admin = createAdminClient()
    const id = `asp-${Date.now()}`

    let authorName = 'Anggota KOPMA'
    let authorRole = 'Suara Anonim'

    if (!payload.isAnonymous) {
      if (payload.authorName?.trim()) {
        authorName = payload.authorName.trim()
      } else if (user) {
        const { data: member } = await admin
          .from('members')
          .select('nama_lengkap')
          .eq('id', user.id)
          .maybeSingle()
        if (member?.nama_lengkap) authorName = member.nama_lengkap
      }

      if (payload.faculty?.trim()) {
        authorRole = payload.faculty.trim()
      }
    }

    const { error: insertErr } = await admin.from('aspirations').insert({
      id,
      user_id: user?.id || null,
      title: payload.title.trim(),
      description: payload.description.trim(),
      category: payload.category,
      author_name: authorName,
      author_role: authorRole,
      is_anonymous: payload.isAnonymous,
      status: 'Sedang Ditinjau',
      upvotes: 1,
      tags: [payload.category.split(' ')[0], 'Aspirasi 2026'],
      created_at: new Date().toISOString(),
    })

    if (insertErr) {
      console.error('Failed to insert aspiration:', insertErr)
      return { success: false, error: 'Gagal mengirim aspirasi ke database.' }
    }

    // Jika pengguna login, otomatis catat upvote miliknya
    if (user) {
      await admin.from('aspiration_upvotes').insert({
        aspiration_id: id,
        user_id: user.id,
      })
    }

    revalidatePath('/aspirasi')

    const newAspiration: Aspiration = {
      id,
      title: payload.title.trim(),
      description: payload.description.trim(),
      category: payload.category,
      authorName,
      authorRole,
      createdAt: 'Baru saja',
      upvotes: 1,
      status: 'Sedang Ditinjau',
      tags: [payload.category.split(' ')[0], 'Aspirasi 2026'],
    }

    return {
      success: true,
      aspiration: newAspiration,
    }
  } catch (err: any) {
    console.error('createAspirationAction exception:', err)
    return { success: false, error: err.message || 'Terjadi kesalahan sistem.' }
  }
}

/**
 * Toggle upvote aspirasi di Supabase.
 */
export async function toggleAspirationUpvoteAction(aspirationId: string): Promise<{
  success: boolean
  isUpvoted?: boolean
  upvotes?: number
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
        error: 'Silakan masuk ke akun terlebih dahulu untuk mendukung aspirasi ini.',
      }
    }

    const admin = createAdminClient()

    // Cek apakah sudah upvote
    const { data: existing } = await admin
      .from('aspiration_upvotes')
      .select('id')
      .eq('aspiration_id', aspirationId)
      .eq('user_id', user.id)
      .maybeSingle()

    // Ambil upvotes terkini
    const { data: asp } = await admin
      .from('aspirations')
      .select('upvotes')
      .eq('id', aspirationId)
      .maybeSingle()

    let currentUpvotes = asp?.upvotes || 0
    let isUpvoted = false

    if (existing) {
      // Batalkan upvote
      await admin.from('aspiration_upvotes').delete().eq('id', existing.id)
      currentUpvotes = Math.max(0, currentUpvotes - 1)
      isUpvoted = false
    } else {
      // Tambahkan upvote
      await admin.from('aspiration_upvotes').insert({
        aspiration_id: aspirationId,
        user_id: user.id,
      })
      currentUpvotes += 1
      isUpvoted = true
    }

    // Update count di tabel aspirations
    await admin
      .from('aspirations')
      .update({ upvotes: currentUpvotes })
      .eq('id', aspirationId)

    revalidatePath('/aspirasi')

    return {
      success: true,
      isUpvoted,
      upvotes: currentUpvotes,
    }
  } catch (err: any) {
    console.error('toggleAspirationUpvoteAction exception:', err)
    return { success: false, error: err.message || 'Gagal mengubah status upvote.' }
  }
}
