'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  isPasswordValid,
  nraToEmail,
  sanitizeNRA,
  sanitizeName,
} from '@/lib/auth/validation'


export interface AuthActionResponse {
  success: boolean
  error?: string
  fieldErrors?: {
    nra?: string
    name?: string
    password?: string
    confirmPassword?: string
  }
}

/**
 * Server Action: Registrasi Anggota Baru
 * Memvalidasi whitelist NRA dari database master, password policy, dan membuat akun Supabase.
 */
export async function registerAction(
  prevState: AuthActionResponse | null,
  formData: FormData
): Promise<AuthActionResponse> {
  const rawNra = formData.get('nra') as string
  const rawName = formData.get('nama') as string
  const rawPassword = formData.get('password') as string
  const rawConfirmPassword = formData.get('confirmPassword') as string

  const nra = sanitizeNRA(rawNra || '')
  const name = sanitizeName(rawName || '')
  const password = rawPassword || ''
  const confirmPassword = rawConfirmPassword || ''

  const fieldErrors: AuthActionResponse['fieldErrors'] = {}

  // 1. Validasi NRA
  if (!nra || nra.length < 5) {
    fieldErrors.nra = 'Masukkan NRA yang valid'
  }

  // 2. Validasi Nama
  if (!name || name.length < 3) {
    fieldErrors.name = 'Masukkan nama lengkap minimal 3 karakter'
  }

  // 3. Validasi Password
  const passwordCheck = isPasswordValid(password)
  if (!passwordCheck.valid) {
    fieldErrors.password = passwordCheck.error
  }

  // 4. Konfirmasi Password
  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors }
  }

  try {
    const adminClient = createAdminClient()

    // 5. Verifikasi NRA di Master Whitelist
    const { data: whitelistData, error: whitelistError } = await adminClient
      .from('nra_whitelist')
      .select('nra, nama_lengkap, is_claimed')
      .eq('nra', nra)
      .maybeSingle()

    if (whitelistError) {
      console.error('Whitelist lookup error:', whitelistError)
      return {
        success: false,
        error: 'Terjadi kendala pada server saat memeriksa keanggotaan. Silakan coba sesaat lagi.',
      }
    }

    if (!whitelistData) {
      return {
        success: false,
        fieldErrors: {
          nra: 'NRA belum terdaftar di data resmi KOPMA UNSIL. Silakan hubungi pengurus KOPMA UNSIL.',
        },
      }
    }

    if (whitelistData.is_claimed) {
      return {
        success: false,
        fieldErrors: {
          nra: 'NRA ini sudah memiliki akun terdaftar. Silakan langsung masuk di halaman login.',
        },
      }
    }

    // 6. Buat Akun Pengguna di Supabase Auth (dengan email berbasis NRA)
    const email = nraToEmail(nra)

    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        nra,
        nama_lengkap: name || whitelistData.nama_lengkap,
      },
    })

    if (authError || !authData.user) {
      console.error('Supabase createUser error:', authError)
      if (authError?.message?.toLowerCase().includes('already registered')) {
        return {
          success: false,
          fieldErrors: {
            nra: 'Akun dengan NRA ini sudah ada. Silakan langsung login.',
          },
        }
      }
      return {
        success: false,
        error: 'Gagal membuat akun. Silakan coba kembali atau gunakan kata sandi lain.',
      }
    }

    const userId = authData.user.id

    // 7. Simpan profil ke tabel members
    const { error: memberInsertError } = await adminClient.from('members').insert({
      id: userId,
      nra,
      nama_lengkap: name || whitelistData.nama_lengkap,
      role: 'anggota',
      is_active: true,
    })

    if (memberInsertError) {
      console.error('Members insert error:', memberInsertError)
      // Rollback auth user jika insert member gagal
      await adminClient.auth.admin.deleteUser(userId)
      return {
        success: false,
        error: 'Gagal menyimpan profil anggota. Silakan coba kembali.',
      }
    }

    // 8. Tandai NRA sebagai sudah diklaim (claimed)
    await adminClient
      .from('nra_whitelist')
      .update({
        is_claimed: true,
        claimed_by: userId,
        claimed_at: new Date().toISOString(),
      })
      .eq('nra', nra)

    // 9. Login otomatis setelah registrasi berhasil
    const supabase = await createClient()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err) {
    console.error('Unexpected register error:', err)
    return {
      success: false,
      error: 'Terjadi kesalahan sistem yang tidak terduga. Silakan coba beberapa saat lagi.',
    }
  }
}

/**
 * Server Action: Login Anggota
 * Menggunakan pesan error generik untuk mencegah enumeration attack.
 */
export async function loginAction(
  prevState: AuthActionResponse | null,
  formData: FormData
): Promise<AuthActionResponse> {
  const rawNra = formData.get('nra') as string
  const rawPassword = formData.get('password') as string

  const nra = sanitizeNRA(rawNra || '')
  const password = rawPassword || ''

  if (!nra || !password) {
    return {
      success: false,
      error: 'NRA dan kata sandi wajib diisi.',
    }
  }

  try {
    const supabase = await createClient()
    const email = nraToEmail(nra)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Keamanan: selalu tampilkan pesan error generik agar penyerang tidak tahu apakah NRA ada atau tidak
      return {
        success: false,
        error: 'NRA atau kata sandi yang Anda masukkan tidak sesuai.',
      }
    }

    revalidatePath('/', 'layout')
    return { success: true }
  } catch (err) {
    console.error('Login action error:', err)
    return {
      success: false,
      error: 'Gagal memproses masuk. Silakan coba lagi.',
    }
  }
}

/**
 * Server Action: Logout
 */
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

import { CurrentMember, getInitials } from './types'
export type { CurrentMember }

/**
 * Ambil data anggota yang sedang login
 */
export async function getCurrentMember(): Promise<CurrentMember | null> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: member } = await supabase
      .from('members')
      .select('id, nra, nama_lengkap, role, is_active, created_at')
      .eq('id', user.id)
      .maybeSingle()

    const rawName =
      member?.nama_lengkap ||
      user.user_metadata?.nama_lengkap ||
      user.email?.split('@')[0] ||
      'Anggota'
    const rawNra = member?.nra || user.user_metadata?.nra || ''

    let prodi: string | null = null
    let fakultas: string | null = null

    if (rawNra) {
      const { data: wl } = await supabase
        .from('nra_whitelist')
        .select('prodi, fakultas')
        .eq('nra', rawNra)
        .maybeSingle()

      if (wl) {
        prodi = wl.prodi
        fakultas = wl.fakultas
      }
    }

    return {
      id: user.id,
      nra: rawNra,
      nama_lengkap: rawName,
      role: member?.role || 'anggota',
      is_active: member?.is_active ?? true,
      created_at: member?.created_at || user.created_at,
      prodi,
      fakultas,
      initials: getInitials(rawName),
    }
  } catch (err) {
    console.error('Error fetching current member:', err)
    return null
  }
}
