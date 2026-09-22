"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { Bell, Gift, Mail, MapPin, ArrowRight } from "lucide-react";
import FormAlert from "@/components/FormAlert";
import FieldError from "@/components/FieldError";
import { subscribeNewsletter } from "@/services/newsletter";
import { newsletterFeedbackMessage } from "@/lib/newsletterFeedback";
import { isValidEmail } from "@/lib/contactValidation";
import { useClearOnRouteChange } from "@/lib/useClearOnRouteChange";
import "./NewsletterSection.css";

/** Original full artwork — rings, airplane, clouds, dots, mailbox */
const SCENE = "/images/footer/stay-in-the-loop/bg-desktop-lg.png";

const AVATARS = [
  "/images/footer/stay-in-the-loop/avatar-1.png",
  "/images/footer/stay-in-the-loop/avatar-2.png",
  "/images/footer/stay-in-the-loop/avatar-3.png",
] as const;

const FEATURES = [
  {
    title: "Exclusive Offers",
    subtitle: "Special deals & discounts",
    Icon: Gift,
  },
  {
    title: "Safety Updates",
    subtitle: "Important alerts & news",
    Icon: Bell,
  },
  {
    title: "Travel Tips",
    subtitle: "Expert guides & more",
    Icon: MapPin,
  },
] as const;

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useClearOnRouteChange(() => {
    setAlertVisible(false);
    setStatus({ type: null, message: "" });
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || loading) return;
    if (!isValidEmail(trimmed)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      setAlertVisible(true);
      return;
    }

    setLoading(true);
    try {
      await subscribeNewsletter(trimmed);
      setStatus({
        type: "success",
        message: "You’re subscribed! Watch your inbox for travel tips and offers.",
      });
      setAlertVisible(true);
      setEmail("");
    } catch (err: unknown) {
      setStatus({
        type: "error",
        message: newsletterFeedbackMessage(err),
      });
      setAlertVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!alertVisible) return;
    const timer = window.setTimeout(() => {
      setAlertVisible(false);
      setStatus({ type: null, message: "" });
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [alertVisible]);

  return (
    <section className="sil" aria-labelledby="sil-heading">
      <div className="sil__inner">
        {/* Full original scene layers (not zoomed) */}
        <Image
          src={SCENE}
          alt=""
          width={2048}
          height={1024}
          className="sil__scene"
          sizes="(max-width: 900px) 100vw, 1200px"
        />
        <div className="sil__veil" aria-hidden="true" />

        <div className="sil__content">
          <div className="sil__left">
            <div className="sil__badge">
              <Mail
                className="sil__badge-icon"
                aria-hidden="true"
                strokeWidth={2.4}
              />
              <span>Stay Connected</span>
            </div>

            <h2 id="sil-heading" className="sil__heading">
              Stay in the loop
            </h2>

            <p className="sil__desc">
              Get travel tips, safety updates, and exclusive offers straight to
              your inbox.
            </p>

            <ul className="sil__features">
              {FEATURES.map(({ title, subtitle, Icon }) => (
                <li key={title} className="sil__feature">
                  <span className="sil__feature-icon" aria-hidden="true">
                    <Icon size={14} strokeWidth={2.2} />
                  </span>
                  <span className="sil__feature-copy">
                    <span className="sil__feature-title">{title}</span>
                    <span className="sil__feature-sub">{subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sil__right">
            <form className="sil__form" method="post" onSubmit={handleSubmit}>
              <label htmlFor="sil-email" className="sil__sr-only">
                Email address
              </label>
              <Mail
                className="sil__form-mail"
                aria-hidden="true"
                strokeWidth={1.8}
              />
              <input
                id="sil-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.type) setStatus({ type: null, message: "" });
                }}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="sil__input"
                autoComplete="email"
              />
              <button type="submit" className="sil__submit" disabled={loading}>
                {loading ? "Subscribing…" : "Subscribe"}
                {!loading ? (
                  <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                ) : null}
              </button>
            </form>
            {status.type === "error" ? (
              <FieldError message={status.message} />
            ) : status.type === "success" && status.message ? (
              <p
                className="mt-1.5 rounded-[10px] bg-[#FFF6D0] px-2.5 py-1.5 font-poppins text-[11px] font-medium text-[#0b0b0b]"
                role="status"
              >
                {status.message}
              </p>
            ) : null}

            <div className="sil__social">
              <div className="sil__avatars" aria-hidden="true">
                {AVATARS.map((src, index) => (
                  <span
                    key={src}
                    className="sil__avatar"
                    style={{ zIndex: AVATARS.length - index }}
                  >
                    <Image
                      src={src}
                      alt=""
                      width={44}
                      height={44}
                      className="sil__avatar-img"
                    />
                  </span>
                ))}
              </div>
              <p className="sil__social-text">
                Join <strong>10,000+</strong> travelers already subscribed
              </p>
            </div>
          </div>
        </div>
      </div>

      {alertVisible ? (
        <FormAlert status={status.type} message={status.message} />
      ) : null}
    </section>
  );
}
