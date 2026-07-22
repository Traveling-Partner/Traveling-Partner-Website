"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Bell, Gift, Mail, MapPin, ArrowRight } from "lucide-react";
import "./NewsletterSection.css";

const ILLUSTRATION = "/images/footer/stay-in-the-loop/mailbox-cover.png";
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <section className="sil" aria-labelledby="sil-heading">
      <div className="sil__inner">
        <div className="sil__glow" aria-hidden="true" />

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
            <form className="sil__form" onSubmit={handleSubmit}>
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="sil__input"
                autoComplete="email"
              />
              <button type="submit" className="sil__submit">
                Subscribe
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            </form>

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

        <div className="sil__art" aria-hidden="true">
          <Image
            src={ILLUSTRATION}
            alt=""
            width={707}
            height={353}
            className="sil__illustration"
            sizes="(max-width: 900px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
