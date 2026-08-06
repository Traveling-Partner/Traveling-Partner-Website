"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import FormAlert from "@/components/FormAlert";
import FormStatusOverlay from "@/components/FormStatusOverlay";
import { submitContactForm } from "@/services/contact";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

const SUBJECTS = [
  "General Inquiry",
  "Drivers",
  "Business",
  "Partnership",
  "Support",
] as const;

type FormFields = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  companyName: string;
  businessType: string;
  city: string;
};

const initialForm: FormFields = {
  fullName: "",
  email: "",
  phone: "",
  subject: "General Inquiry",
  message: "",
  companyName: "",
  businessType: "",
  city: "",
};

function PinIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
      <defs>
        <linearGradient id="pinY" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="55%" stopColor="#FCE001" />
          <stop offset="100%" stopColor="#FDB813" />
        </linearGradient>
      </defs>
      <path
        fill="url(#pinY)"
        d="M20 4c-6.1 0-11 4.9-11 11 0 8.2 11 21 11 21s11-12.8 11-21c0-6.1-4.9-11-11-11zm0 15.2a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z"
      />
    </svg>
  );
}

function EnvelopeIcon3D() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
      <defs>
        <linearGradient id="envY" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="100%" stopColor="#FDB813" />
        </linearGradient>
      </defs>
      <rect x="6" y="10" width="28" height="20" rx="3" fill="url(#envY)" />
      <path
        d="M6 13l14 10L34 13"
        fill="none"
        stroke="#0b0b0b"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
    </svg>
  );
}

function PhoneIcon3D() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
      <defs>
        <linearGradient id="phY" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF59D" />
          <stop offset="100%" stopColor="#FDB813" />
        </linearGradient>
      </defs>
      <path
        fill="url(#phY)"
        d="M14 7h12a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3zm6 23a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      />
    </svg>
  );
}

function ArrowOutIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" aria-hidden="true">
      <path
        d="M15.5 7.5 8.2 14.8a3 3 0 0 0 4.2 4.2l8.1-8.1a5 5 0 0 0-7.1-7.1L5.2 12a1.5 1.5 0 0 0 2.1 2.1l7.2-7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Brand-styled subject picker — avoids native blue option highlight */
function SubjectDropdown({
  value,
  options,
  disabled,
  onChange,
  fieldClass,
}: {
  value: string;
  options: readonly string[];
  disabled?: boolean;
  onChange: (value: string) => void;
  fieldClass: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id="subject"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${fieldClass} flex w-full items-center justify-between gap-2 text-left ${
          open ? "border-[#FCE001] bg-[#faf8f2]" : ""
        }`}
      >
        <span className="truncate text-[#0b0b0b]">{value}</span>
        <svg
          viewBox="0 0 16 16"
          className={`h-4 w-4 shrink-0 text-[#0b0b0b] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-labelledby="subject"
          className="absolute left-0 right-0 z-30 mt-1.5 overflow-hidden rounded-[12px] border border-[#ebe6da] bg-[#F7F4EC] py-1 shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={`flex w-full px-3.5 py-2.5 text-left text-[13px] transition-colors ${
                    selected
                      ? "bg-[#FCE001] font-semibold text-[#0b0b0b]"
                      : "text-[#0b0b0b] hover:bg-[#FCE001]/35"
                  }`}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function ContactInfoCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}) {
  const isMail = href.startsWith("mailto:");
  const isHttp = href.startsWith("http");
  const email = isMail ? href.replace(/^mailto:/i, "").split("?")[0] : "";
  const mailHref = isMail
    ? `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Inquiry from Traveling Partner website")}`
    : href;

  return (
    <a
      href={mailHref}
      target={isMail || isHttp ? "_blank" : undefined}
      rel={isMail || isHttp ? "noopener noreferrer" : undefined}
      className="group relative z-10 flex cursor-pointer items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07] sm:gap-3.5 sm:px-3.5 sm:py-3"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#141414] shadow-[inset_0_0_0_1px_rgba(252,224,1,0.15),0_0_20px_rgba(252,224,1,0.12)] sm:h-12 sm:w-12">
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#FCE001]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[13px] font-semibold text-white sm:text-[14px]">
          {value}
        </span>
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b] transition-transform duration-300 group-hover:scale-105">
        <ArrowOutIcon />
      </span>
    </a>
  );
}

/**
 * Contact Us Form Section — 1:1 Figma split (dark left + white form).
 */
export default function ContactFormSection() {
  const [form, setForm] = useState<FormFields>(initialForm);
  const [loading, setLoading] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<
    "loading" | "success" | "error" | null
  >(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const overlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus({ type: "error", message: "File must be under 10MB." });
      setAlertVisible(true);
      e.target.value = "";
      return;
    }
    setFileName(file.name);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
    setLoading(true);
    setOverlayPhase("loading");
    try {
      const isBusiness = form.subject === "Business";
      const message = isBusiness
        ? [
            `Company: ${form.companyName}`,
            `Business type: ${form.businessType}`,
            `Phone: ${form.phone}`,
            `City: ${form.city}`,
            "",
            form.message.trim(),
          ].join("\n")
        : form.message.trim();

      await submitContactForm({
        name: form.fullName.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message,
        phoneNumber: form.phone.trim(),
      });
      const successMsg = "Message sent successfully!";
      setStatus({ type: "success", message: successMsg });
      setOverlayPhase("success");
      setAlertVisible(true);
      setForm(initialForm);
      setFileName(null);
      if (fileRef.current) fileRef.current.value = "";
      overlayTimer.current = setTimeout(() => setOverlayPhase(null), 1600);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Failed to submit form. Please try again.";
      setStatus({ type: "error", message: errorMsg });
      setOverlayPhase("error");
      setAlertVisible(true);
      overlayTimer.current = setTimeout(() => setOverlayPhase(null), 1800);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!alertVisible) return;
    const t = window.setTimeout(() => setAlertVisible(false), 3200);
    return () => window.clearTimeout(t);
  }, [alertVisible]);

  useEffect(
    () => () => {
      if (overlayTimer.current) clearTimeout(overlayTimer.current);
    },
    [],
  );

  const fieldClass =
    "w-full rounded-[12px] border border-[#ebe6da] bg-[#F7F4EC] px-3 py-2 font-poppins text-[12.5px] text-[#0b0b0b] outline-none transition-colors placeholder:text-[#9a968c] focus:border-[#FCE001]/70 focus:bg-[#faf8f2] sm:px-3.5 sm:py-2.5 sm:text-[13px]";

  const labelClass =
    "mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b]";

  const isBusiness = form.subject === "Business";

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] py-12 sm:py-14 lg:py-16">
      {/* Background asset + glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image
          src="/images/contact/form-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/55" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 50% 45% at 8% 12%, rgba(252,224,1,0.18), transparent 60%),
              radial-gradient(ellipse 45% 40% at 92% 78%, rgba(253,184,19,0.14), transparent 65%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:gap-7 xl:gap-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:pt-1"
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-[#FCE001] px-3.5 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
                Contact Us
              </span>
            </div>

            <h2 className="mb-3 font-poppins text-[clamp(30px,4.2vw,44px)] font-extrabold leading-[1.05] tracking-tight text-white">
              Send Us a{" "}
              <span className="font-medium italic text-[#FCE001]">
                Message.
              </span>
            </h2>

            <div className="mb-6 max-w-md space-y-2 text-[13px] leading-relaxed text-white/65 sm:mb-7 sm:text-[14px] sm:leading-[1.65]">
              <p>
                Have a question? Need assistance? Want to learn more about
                Traveling Partner?
              </p>
              <p>
                Send us a message and our team will get back to you as soon as
                possible.
              </p>
            </div>

            <div className="flex max-w-md flex-col gap-2.5 sm:gap-3">
              <ContactInfoCard
                label="Address"
                value="Eagle Plaza, Blue Area, Islamabad"
                href="https://www.google.com/maps/search/?api=1&query=Eagle%20Plaza%2C%20G%207%2F3%20Blue%20Area%2C%20Islamabad%2C%2046000%2C%20Pakistan"
                icon={<PinIcon />}
              />
              <ContactInfoCard
                label="Email"
                value="hello@traveling-partner.com"
                href="mailto:hello@traveling-partner.com"
                icon={<EnvelopeIcon3D />}
              />
              <ContactInfoCard
                label="Phone"
                value="+92 325 2801261"
                href="tel:+923252801261"
                icon={<PhoneIcon3D />}
              />
            </div>

            <div className="mt-6 max-w-md border-t border-white/10 pt-5 sm:mt-7">
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FCE001]">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.05] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-transparent hover:shadow-[0_6px_18px_rgba(253,184,19,0.4)]"
                    style={{ ["--social-color" as string]: s.color }}
                  >
                    <span
                      className="absolute inset-0 bg-gradient-to-b from-[#FCE001] to-[#FDB813] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                    <s.icon className="relative z-[1] h-5 w-5 text-[var(--social-color)] transition-colors duration-300 group-hover:text-[#0b0b0b]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative mx-auto w-full max-w-[560px] lg:ml-auto lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-[24px] bg-white p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:rounded-[28px] sm:p-4 lg:rounded-[32px] lg:p-5">
              <FormStatusOverlay
                phase={overlayPhase}
                message={status.message}
              />

              <div className="relative z-10 mb-4 flex items-start gap-2.5 sm:mb-4">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[10px] sm:h-11 sm:w-11 sm:rounded-[12px]">
                  <Image
                    src="/images/contact/icon-message.png"
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover object-center"
                  />
                </span>
                <div>
                  <h3 className="font-poppins text-[17px] font-extrabold leading-tight text-[#0b0b0b] sm:text-[18px]">
                    Send us a message
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#6f6e68] sm:text-[12px]">
                    Our team will get back to you as soon as possible.
                  </p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="relative z-10 space-y-3 sm:space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={onChange}
                      placeholder="Your full name"
                      className={fieldClass}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@example.com"
                      className={fieldClass}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      {isBusiness ? "Business Phone" : "Phone Number"}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required={isBusiness}
                      value={form.phone}
                      onChange={onChange}
                      placeholder={
                        isBusiness ? "Business phone" : "+92 3XX XXXXXXX"
                      }
                      className={fieldClass}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Subject
                    </label>
                    <SubjectDropdown
                      value={form.subject}
                      options={SUBJECTS}
                      disabled={loading}
                      fieldClass={fieldClass}
                      onChange={(subject) =>
                        setForm((prev) => ({
                          ...prev,
                          subject,
                          ...(subject !== "Business"
                            ? {
                                companyName: "",
                                businessType: "",
                                city: "",
                              }
                            : {}),
                        }))
                      }
                    />
                  </div>
                </div>

                {isBusiness ? (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3">
                    <div className="sm:col-span-2">
                      <label htmlFor="companyName" className={labelClass}>
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        required
                        value={form.companyName}
                        onChange={onChange}
                        placeholder="Company name"
                        className={fieldClass}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="businessType" className={labelClass}>
                        Business Type
                      </label>
                      <input
                        id="businessType"
                        name="businessType"
                        type="text"
                        required
                        value={form.businessType}
                        onChange={onChange}
                        placeholder="Business type"
                        className={fieldClass}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className={labelClass}>
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={onChange}
                        placeholder="City"
                        className={fieldClass}
                        disabled={loading}
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell us how we can help..."
                    className={`${fieldClass} min-h-[72px] resize-y`}
                    disabled={loading}
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-[12px] border border-dashed border-[#d4d0c6] bg-[#F7F4EC] px-3 py-2 transition-colors hover:border-[#FCE001]/50 sm:px-3.5 sm:py-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#0b0b0b]">
                    <PaperclipIcon />
                  </span>
                  <span className="min-w-0 text-left text-[11px] text-[#6f6e68] sm:text-[12px]">
                    {fileName ? (
                      <span className="font-semibold text-[#0b0b0b]">
                        {fileName}
                      </span>
                    ) : (
                      <>
                        Attach a file — optional{" "}
                        <span className="text-[#9a968c]">
                          (PDF, PNG, JPG, up to 10MB)
                        </span>
                      </>
                    )}
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="sr-only"
                    onChange={onFile}
                    disabled={loading}
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-[#0b0b0b] px-5 py-2.5 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 sm:py-3"
                >
                  <span className="font-poppins text-[14px] font-bold text-[#FCE001] sm:text-[15px]">
                    Send Message
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b] transition-transform duration-300 group-hover:translate-x-0.5">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <p className="text-center text-[10px] leading-relaxed text-[#8a8983] sm:text-[11px]">
                  By sending this message you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-[#FCE001] hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/terms-conditions"
                    className="font-semibold text-[#FCE001] hover:underline"
                  >
                    Terms &amp; Conditions
                  </Link>
                  .
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {alertVisible ? (
        <FormAlert status={status.type} message={status.message} />
      ) : null}
    </section>
  );
}
