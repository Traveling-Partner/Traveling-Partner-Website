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

export function phoneFieldError(value: string): string {
  if (!value.trim()) return "Phone number is required";
  if (!isValidPhone(value)) return "Enter a valid phone number.";
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

export function contactValidationBanner(errors: ContactFieldErrors): string {
  if (errors.phone) return errors.phone;
  if (errors.message) return errors.message;
  return "Please fix the highlighted fields and try again.";
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
