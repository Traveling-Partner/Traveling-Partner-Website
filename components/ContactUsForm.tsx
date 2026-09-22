"use client";

import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FormAlert from "./FormAlert";
import FieldError from "@/components/FieldError";
import FormStatusOverlay from "@/components/FormStatusOverlay";
import { submitContactForm } from "@/services/contact";
import ContactFileAttach from "@/components/ContactFileAttach";
import {
  CONTACT_LIMITS,
  CONTACT_SUCCESS,
  contactValidationBanner,
  isValidEmail,
  messageFieldError,
  phoneFieldError,
  requiredError,
  type ContactFieldErrors,
} from "@/lib/contactValidation";
import { useClearOnRouteChange } from "@/lib/useClearOnRouteChange";

/** Figma Contact — node 124:3877 */
const PHONE_DISPLAY = "+92 325 2801261";
const PHONE_HREF = "tel:+923252801261";

const accentItalicClass =
  "font-poppins font-normal italic bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent";

/** Matches Blog section View More CTA — Figma Component 1 / 124:3695 */
const STORY_CTA_FIGMA = {
  padLeft: 22,
  padRight: 12,
  padY: 10,
  gap: 8,
  labelSize: 16,
  arrowSize: 36,
};
const STORY_CTA_SCALE = 0.85;

function scaleStoryCta(value: number, extraScale = 1): number {
  return value * STORY_CTA_SCALE * extraScale;
}

const storyCtaClass =
  "group relative inline-flex w-fit max-w-full shrink-0 items-center justify-start overflow-hidden rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins shadow-[0_5px_16px_rgba(252,224,1,0.2)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(252,224,1,0.28)]";

function PhoneIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 3.8h2.2l1.4 3.3-1.7 1.2a11.5 11.5 0 005.6 5.6l1.2-1.7 3.3 1.4v2.2c0 .9-.7 1.6-1.6 1.7C10.9 18.1 5.9 13.1 5.1 5.6 5 4.7 5.7 3.9 6.6 3.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneCtaButton(): React.ReactElement {
  const s = STORY_CTA_FIGMA;
  const mobileScale = 0.72;

  return (
    <>
      <a
        href={PHONE_HREF}
        className={`${storyCtaClass} mt-8 hidden sm:mt-10 lg:inline-flex`}
        style={{
          paddingLeft: scaleStoryCta(s.padLeft),
          paddingRight: scaleStoryCta(s.padRight),
          paddingTop: scaleStoryCta(s.padY),
          paddingBottom: scaleStoryCta(s.padY),
          gap: scaleStoryCta(s.gap),
        }}
      >
        <span
          className="flex min-w-0 items-center truncate font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: scaleStoryCta(s.labelSize) }}
        >
          {PHONE_DISPLAY}
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors duration-300 group-hover:bg-[#1a1a1a]"
          style={{
            width: scaleStoryCta(s.arrowSize),
            height: scaleStoryCta(s.arrowSize),
          }}
        >
          <PhoneIcon size={scaleStoryCta(15)} />
        </span>
      </a>

      <a
        href={PHONE_HREF}
        className={`${storyCtaClass} mt-8 sm:mt-10 lg:hidden`}
        style={{
          paddingLeft: scaleStoryCta(s.padLeft, mobileScale),
          paddingRight: scaleStoryCta(s.padRight, mobileScale),
          paddingTop: scaleStoryCta(s.padY, mobileScale),
          paddingBottom: scaleStoryCta(s.padY, mobileScale),
          gap: scaleStoryCta(s.gap, mobileScale),
        }}
      >
        <span
          className="flex min-w-0 items-center truncate font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: scaleStoryCta(s.labelSize, mobileScale) }}
        >
          {PHONE_DISPLAY}
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors duration-300 group-hover:bg-[#1a1a1a]"
          style={{
            width: scaleStoryCta(s.arrowSize, mobileScale),
            height: scaleStoryCta(s.arrowSize, mobileScale),
          }}
        >
          <PhoneIcon size={scaleStoryCta(15, mobileScale)} />
        </span>
      </a>
    </>
  );
}

const TABS = ["General", "Drivers", "Business", "Partnership"] as const;
type ContactTab = (typeof TABS)[number];

const SOCIAL_AVATARS = [
  { initials: "AM", className: "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b]" },
  { initials: "UA", className: "bg-[#4f8cff] text-white" },
  { initials: "FS", className: "bg-[#22c55e] text-white" },
];

interface SubmissionStatus {
  type: "success" | "error" | null;
  message: string;
}

interface ContactFormFields {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  companyName: string;
  businessType: string;
  phone: string;
  city: string;
}

const initialFormData: ContactFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
  companyName: "",
  businessType: "",
  phone: "",
  city: "",
};

const fieldClass =
  "w-full rounded-[12px] border border-transparent bg-[#f5f0e6] px-3.5 py-2.5 font-poppins text-[13px] text-[#0b0b0b] placeholder:text-[#8a877f] outline-none transition-colors focus:border-[#fdb813]/40 focus:bg-[#faf6ee] disabled:opacity-50 aria-invalid:border-[#FDB813] aria-invalid:bg-[#fff9e6] sm:px-4 sm:py-3 sm:text-[14px]";

function PencilIcon(): React.ReactElement {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 10-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function ContactUsForm(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<ContactTab>("General");
  const [formData, setFormData] = useState<ContactFormFields>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<
    "loading" | "success" | "error" | null
  >(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    type: null,
    message: "",
  });
  const overlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [attachFile, setAttachFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const isBusiness = activeTab === "Business";
  const labelClass =
    "mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b]";
  const counterClass = "mt-1 text-right text-[10px] text-[#5c5b55]";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): ContactFieldErrors => {
    const next: ContactFieldErrors = {};
    const firstNameErr = requiredError("First name", formData.firstName);
    if (firstNameErr) next.firstName = firstNameErr;
    const lastNameErr = requiredError("Last name", formData.lastName);
    if (lastNameErr) next.lastName = lastNameErr;
    const emailErr = requiredError("Email address", formData.email);
    if (emailErr) next.email = emailErr;
    else if (!isValidEmail(formData.email)) {
      next.email = "Enter a valid email address.";
    }
    const phoneErr = phoneFieldError(formData.phone);
    if (phoneErr) next.phone = phoneErr;
    if (isBusiness) {
      const company = requiredError("Company name", formData.companyName);
      if (company) next.companyName = company;
      const type = requiredError("Business type", formData.businessType);
      if (type) next.businessType = type;
      const city = requiredError("City", formData.city);
      if (city) next.city = city;
    }
    const messageErr = messageFieldError(formData.message);
    if (messageErr) next.message = messageErr;
    return next;
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const nextErrors = validate();
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setSubmissionStatus({
        type: "error",
        message: contactValidationBanner(nextErrors),
      });
      setAlertVisible(true);
      return;
    }
    if (overlayTimer.current) clearTimeout(overlayTimer.current);
    setLoading(true);
    setOverlayPhase("loading");

    try {
      const isBusiness = activeTab === "Business";
      const businessDetails = isBusiness
        ? [
            `Company: ${formData.companyName}`,
            `Business type: ${formData.businessType}`,
            `Phone: ${formData.phone}`,
            `City: ${formData.city}`,
            "",
            formData.message,
          ].join("\n")
        : formData.message;

      await submitContactForm({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        subject: activeTab,
        message: businessDetails,
        phoneNumber: formData.phone.trim(),
        photo: "",
        photoFile: attachFile,
      });
      setSubmissionStatus({
        type: "success",
        message: CONTACT_SUCCESS.message,
      });
      setOverlayPhase("success");
      setAlertVisible(true);
      setFormData(initialFormData);
      setAttachFile(null);
      setFileError("");
      setFieldErrors({});
      overlayTimer.current = setTimeout(() => setOverlayPhase(null), 2800);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again.";
      setSubmissionStatus({ type: "error", message: errorMessage });
      setOverlayPhase("error");
      setAlertVisible(true);
      overlayTimer.current = setTimeout(() => setOverlayPhase(null), 1800);
    } finally {
      setLoading(false);
    }
  };

  useClearOnRouteChange(() => {
    setAlertVisible(false);
    setFieldErrors({});
    setSubmissionStatus({ type: null, message: "" });
  });

  useEffect(() => {
    if (!alertVisible) return;
    const timer = window.setTimeout(() => {
      setAlertVisible(false);
      setSubmissionStatus({ type: null, message: "" });
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [alertVisible]);

  useEffect(
    () => () => {
      if (overlayTimer.current) clearTimeout(overlayTimer.current);
    },
    [],
  );

  return (
    <section
      className="relative w-full overflow-hidden py-14 sm:py-20 lg:py-24"
      aria-labelledby="contact-section-heading"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/images/contact-section-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[#0b0b0b]/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b]/55 via-[#0b0b0b]/35 to-[#0b0b0b]/65" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-6 xl:gap-8">
          {/* Left — headline + phone */}
          <motion.div
            className="max-w-[560px] lg:py-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              id="contact-section-heading"
              className="font-poppins text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white"
            >
              <span className="block">Smart, safe</span>
              <span className="block">
                and{" "}
                <span className={accentItalicClass}>always on call.</span>
              </span>
            </h2>

            <p className="mt-5 max-w-[500px] font-poppins text-[14px] font-normal leading-[1.65] text-white sm:mt-6 sm:text-[15px] lg:text-[16px]">
              Need a ride to work? Heading to the airport? Sending a parcel
              across town? Open the app, choose where you&apos;re going, and
              we&apos;ll take care of the rest. Book a ride online, see your
              fare before the trip starts, and ride with verified drivers from
              pickup to drop-off. From city rides and airport transfer service
              to deliveries and business travel, everything is managed in one
              simple app.
            </p>

            <PhoneCtaButton />
          </motion.div>

          {/* Right — form card */}
          <motion.div
            className="mx-auto w-full max-w-[460px] lg:ml-auto lg:max-w-[440px] xl:max-w-[460px]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[22px] bg-white p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.32)] sm:rounded-[24px] sm:p-4">
              <FormStatusOverlay
                phase={overlayPhase}
                message={submissionStatus.message}
              />

              {/* Tabs */}
              <div className="rounded-full bg-[#f5f0e6] p-1">
                <div className="grid grid-cols-4 gap-0.5">
                  {TABS.map((tab) => {
                    const active = tab === activeTab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`flex min-h-[40px] min-w-0 items-center justify-center truncate rounded-full px-1 py-2 font-poppins text-[9px] font-semibold transition-all sm:min-h-[44px] sm:px-2 sm:py-2.5 sm:text-[12px] ${
                          active
                            ? "bg-white text-[#0b0b0b] shadow-sm"
                            : "text-[#6f6e68] hover:text-[#0b0b0b]"
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-3 flex items-center gap-2.5 rounded-[12px] bg-[#f5f0e6] px-3 py-2.5 sm:mt-3.5 sm:gap-3 sm:px-3.5 sm:py-3">
                <div className="flex shrink-0 items-center">
                  {SOCIAL_AVATARS.map((avatar, index) => (
                    <span
                      key={avatar.initials}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f5f0e6] font-poppins text-[9px] font-bold sm:h-8 sm:w-8 sm:text-[10px] ${avatar.className} ${index > 0 ? "-ml-2" : ""}`}
                    >
                      {avatar.initials}
                    </span>
                  ))}
                </div>
                <p className="font-poppins text-[11px] leading-snug text-[#0b0b0b] sm:text-[12px]">
                  <span className="font-bold">+10K people</span> have already reached out to us
                </p>
              </div>

              <form
                method="post"
                noValidate
                onSubmit={submitHandler}
                className="relative mt-3.5 space-y-2.5 sm:mt-4 sm:space-y-3"
              >
                <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  <div>
                    <label htmlFor="home-firstName" className={labelClass}>
                      First Name
                    </label>
                    <input
                      id="home-firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      autoComplete="given-name"
                      required
                      maxLength={CONTACT_LIMITS.name}
                      disabled={loading}
                      className={fieldClass}
                      aria-invalid={Boolean(fieldErrors.firstName)}
                    />
                    {fieldErrors.firstName ? (
                      <FieldError message={fieldErrors.firstName} />
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="home-lastName" className={labelClass}>
                      Last Name
                    </label>
                    <input
                      id="home-lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      autoComplete="family-name"
                      required
                      maxLength={CONTACT_LIMITS.name}
                      disabled={loading}
                      className={fieldClass}
                      aria-invalid={Boolean(fieldErrors.lastName)}
                    />
                    {fieldErrors.lastName ? (
                      <FieldError message={fieldErrors.lastName} />
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="home-email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="home-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    maxLength={CONTACT_LIMITS.email}
                    disabled={loading}
                    className={fieldClass}
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  {fieldErrors.email ? (
                    <FieldError message={fieldErrors.email} />
                  ) : null}
                </div>

                <div>
                  <label htmlFor="home-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="home-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 3XX XXXXXXX"
                    autoComplete="tel"
                    required
                    maxLength={CONTACT_LIMITS.phone}
                    disabled={loading}
                    className={fieldClass}
                    aria-invalid={Boolean(fieldErrors.phone)}
                  />
                  {fieldErrors.phone ? (
                    <FieldError message={fieldErrors.phone} />
                  ) : null}
                </div>

                {activeTab === "Business" ? (
                  <>
                    <div>
                      <label htmlFor="home-companyName" className={labelClass}>
                        Company Name
                      </label>
                      <input
                        id="home-companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company name"
                        autoComplete="organization"
                        required
                        maxLength={CONTACT_LIMITS.company}
                        disabled={loading}
                        className={fieldClass}
                        aria-invalid={Boolean(fieldErrors.companyName)}
                      />
                      {fieldErrors.companyName ? (
                        <FieldError message={fieldErrors.companyName} />
                      ) : null}
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                      <div>
                        <label htmlFor="home-businessType" className={labelClass}>
                          Business Type
                        </label>
                        <input
                          id="home-businessType"
                          type="text"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          placeholder="Business type"
                          required
                          maxLength={CONTACT_LIMITS.businessType}
                          disabled={loading}
                          className={fieldClass}
                          aria-invalid={Boolean(fieldErrors.businessType)}
                        />
                        {fieldErrors.businessType ? (
                          <FieldError message={fieldErrors.businessType} />
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="home-city" className={labelClass}>
                          City
                        </label>
                        <input
                          id="home-city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          required
                          maxLength={CONTACT_LIMITS.city}
                          disabled={loading}
                          className={fieldClass}
                          aria-invalid={Boolean(fieldErrors.city)}
                        />
                        {fieldErrors.city ? (
                          <FieldError message={fieldErrors.city} />
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : null}

                <div>
                  <label htmlFor="home-message" className={labelClass}>
                    Your Message
                  </label>
                  <textarea
                    id="home-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    rows={3}
                    maxLength={CONTACT_LIMITS.message}
                    disabled={loading}
                    className={`${fieldClass} min-h-[88px] resize-none sm:min-h-[96px]`}
                    aria-invalid={Boolean(fieldErrors.message)}
                  />
                  {fieldErrors.message ? (
                    <FieldError message={fieldErrors.message} />
                  ) : (
                    <p className={counterClass}>
                      {formData.message.length}/{CONTACT_LIMITS.message}
                    </p>
                  )}
                </div>

                <ContactFileAttach
                  id="home-attachment"
                  file={attachFile}
                  error={fileError}
                  disabled={loading}
                  tone="home"
                  onChange={(next, nextError) => {
                    setAttachFile(next);
                    setFileError(nextError);
                  }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-between rounded-full bg-[#0b0b0b] px-4 py-2.5 font-poppins text-[13px] font-semibold text-[#fce001] transition-colors hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-3 sm:text-[14px]"
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] text-[#0b0b0b] transition-transform group-hover:scale-105 sm:h-9 sm:w-9">
                    <PencilIcon />
                  </span>
                </button>
              </form>

              {alertVisible ? (
                <div className="mt-4">
                  <FormAlert
                    status={submissionStatus.type}
                    title={
                      submissionStatus.type === "success"
                        ? CONTACT_SUCCESS.title
                        : undefined
                    }
                    message={submissionStatus.message}
                  />
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
