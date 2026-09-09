/** Client-only contact form limits and checks. Submit payload shape is unchanged. */

export const CONTACT_LIMITS = {
  name: 80,
  email: 120,
  phone: 24,
  subject: 80,
  company: 80,
  city: 60,
  businessType: 80,
  message: 2000,
  messageMin: 10,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9][0-9\s()-]{6,22}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return PHONE_RE.test(trimmed);
}

export type ContactFieldErrors = Record<string, string>;

export function requiredError(label: string, value: string): string {
  return value.trim() ? "" : `${label} is required.`;
}
