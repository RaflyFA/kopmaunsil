export interface PasswordRuleStatus {
  id: string
  label: string
  met: boolean
}

export function evaluatePasswordRules(password: string): PasswordRuleStatus[] {
  return [
    {
      id: 'length',
      label: 'Minimal 8 karakter',
      met: password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'Minimal 1 huruf kapital (A-Z)',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'number',
      label: 'Minimal 1 angka (0-9)',
      met: /[0-9]/.test(password),
    },
    {
      id: 'symbol',
      label: 'Minimal 1 simbol unik (!@#$%^&* dll)',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    },
  ]
}

export function isPasswordValid(password: string): { valid: boolean; error?: string } {
  const rules = evaluatePasswordRules(password)
  const unmet = rules.find((r) => !r.met)
  if (unmet) {
    return { valid: false, error: unmet.label }
  }

  const commonPatterns = ['12345678', 'password', 'qwerty123', 'admin123', 'kopma123']
  if (commonPatterns.some((pattern) => password.toLowerCase().includes(pattern))) {
    return { valid: false, error: 'Password terlalu mudah ditebak. Hindari kata sandi umum.' }
  }

  return { valid: true }
}

export function sanitizeNRA(input: string): string {
  // Hanya izinkan karakter alfanumerik dan tanda hubung
  return input.replace(/[^a-zA-Z0-9\-]/g, '').trim()
}

export function sanitizeName(input: string): string {
  // Hanya izinkan huruf, spasi, titik, koma, kutip
  return input.replace(/[^a-zA-Z\s'.,-]/g, '').trim()
}

export function nraToEmail(nra: string): string {
  const cleanNra = sanitizeNRA(nra).toLowerCase()
  return `${cleanNra}@member.kopmaunsil.id`
}

