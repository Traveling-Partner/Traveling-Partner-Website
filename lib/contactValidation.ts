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

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** 0000000, 1111111111, and the same digit repeated through a longer number. */
function hasRepeatedDigitRun(digits: string): boolean {
  return /(\d)\1{6,}/.test(digits);
}

/** 12345678, 1234567890, or 87654321 as the whole number. */
function isStraightSequence(digits: string): boolean {
  if (digits.length < 7) return false;
  return "01234567890".includes(digits) || "09876543210".includes(digits);
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || !PHONE_RE.test(trimmed)) return false;
  const digits = phoneDigits(trimmed);
  if (digits.length < 7) return false;
  if (hasRepeatedDigitRun(digits) || isStraightSequence(digits)) return false;
  return true;
}

/** Names stay letters only. Spaces, hyphens, and apostrophes are kept. */
export function sanitizePersonName(value: string): string {
  return value.replace(/[^\p{L}\s'-]/gu, "");
}

/** Phone box stays numbers and the usual phone symbols. Letters are dropped. */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^0-9+\s()-]/g, "");
}

export type ContactFieldErrors = Record<string, string>;

export function requiredError(label: string, value: string): string {
  return value.trim() ? "" : `${label} is required.`;
}

export function phoneFieldError(value: string): string {
  if (!value.trim()) return "Phone number is required";
  if (!isValidPhone(value)) return "Please enter a valid phone number.";
  return "";
}

export function messageFieldError(value: string): string {
  if (!value.trim()) return "Message is required";
  if (value.trim().length < CONTACT_LIMITS.messageMin) {
    return `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  }
  return "";
}

export const CONTACT_SUCCESS = {
  title: "Query submitted",
  message: "Thank you. Our team will contact you within 24 hours.",
} as const;

function isRequiredMessage(message: string): boolean {
  return /is required\.?$/i.test(message);
}

/**
 * Toast copy for a failed submit.
 * Every required field empty → ask them to fill the form.
 * More than one required field wrong → ask them to complete it.
 * One field wrong → that field's own message.
 */
export function contactValidationBanner(
  errors: ContactFieldErrors,
  requiredCount: number
): string {
  const messages = Object.values(errors).filter(Boolean);
  if (messages.length === 1) return messages[0];

  const everyRequiredFieldEmpty =
    requiredCount > 0 &&
    messages.length === requiredCount &&
    messages.every(isRequiredMessage);

  if (everyRequiredFieldEmpty) {
    return "Please fill in the form, then submit it.";
  }

  return "Please complete all required fields before submitting.";
}

export const CONTACT_FILE = {
  maxBytes: 10 * 1024 * 1024,
  accept: ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg",
} as const;

const CONTACT_FILE_EXT = [".pdf", ".png", ".jpg", ".jpeg"];
const CONTACT_FILE_TYPE = ["application/pdf", "image/png", "image/jpeg"];

export function contactFileError(file: File): string {
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  if (file.size > CONTACT_FILE.maxBytes) return "File must be under 10MB.";
  if (!CONTACT_FILE_EXT.includes(ext) && !CONTACT_FILE_TYPE.includes(file.type)) {
    return "Please attach a PDF, PNG, or JPG.";
  }
  return "";
}

export function isContactImageFile(file: File): boolean {
  return file.type.startsWith("image/") || /\.(png|jpe?g)$/i.test(file.name);
}
