"use client";

import { forwardRef, useEffect, useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import FormAlert from "@/components/FormAlert";
import { submitContactForm } from "@/services/contact";

export type TocItem = {
  id: string;
  text: string;
};

type BlogDetailSidebarProps = {
  tocItems: TocItem[];
};

const BlogDetailSidebar = forwardRef<HTMLElement, BlogDetailSidebarProps>(
  function BlogDetailSidebar({ tocItems }, ref) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [status, setStatus] = useState<{
      type: "success" | "error" | null;
      message: string;
    }>({ type: null, message: "" });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmed = email.trim();
      if (!trimmed || loading) return;

      setLoading(true);
      try {
        await submitContactForm({
          name: "Newsletter Subscriber",
          email: trimmed,
          subject: "Newsletter",
          message: `Please subscribe me to the Traveling Partner newsletter.\n\nEmail: ${trimmed}`,
          phoneNumber: "",
        });
        setStatus({
          type: "success",
          message: "You’re subscribed! Watch your inbox for travel tips and offers.",
        });
        setAlertVisible(true);
        setEmail("");
      } catch (err: unknown) {
        setStatus({
          type: "error",
          message:
            err instanceof Error
              ? err.message
              : "Couldn’t subscribe right now. Please try again.",
        });
        setAlertVisible(true);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (!alertVisible) return;
      const timer = window.setTimeout(() => setAlertVisible(false), 3200);
      return () => window.clearTimeout(timer);
    }, [alertVisible]);

    return (
      <aside ref={ref} className="space-y-5">
        <div className="overflow-hidden rounded-[28px] border border-[#eceae4] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:rounded-[32px]">
          <div className="bg-gradient-to-br from-[#FCE001] to-[#FDB813] px-5 py-5 sm:px-6 sm:py-6">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0b0b0b] text-[#FCE001]">
              <Mail size={20} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b]/60 sm:text-[11px]">
              Newsletter
            </p>
            <h2 className="mt-1 text-[20px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] sm:text-[22px]">
              Stay in the loop
            </h2>
          </div>

          <div className="p-5 sm:p-6">
            <p className="mb-5 text-[13px] leading-[1.65] text-[#4a4a45] sm:text-[14px]">
              Get travel tips, route updates, and exclusive offers from Traveling
              Partner — straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="blog-sidebar-email" className="sr-only">
                Email address
              </label>
              <input
                id="blog-sidebar-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading}
                autoComplete="email"
                className="w-full rounded-full border border-[#e8e4da] bg-[#faf8f3] px-4 py-3.5 text-[14px] text-[#0b0b0b] outline-none transition-colors placeholder:text-[#9a968c] focus:border-[#FDB813] focus:bg-white disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b0b0b] px-4 py-3.5 text-[14px] font-bold text-[#FCE001] transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Subscribing…" : "Subscribe"}
                {!loading ? <span aria-hidden="true">→</span> : null}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-snug text-[#8a867c]">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {tocItems.length > 0 ? (
          <div className="rounded-[28px] border border-[#eceae4] bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:rounded-[32px] sm:p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[11px]">
              In This Story
            </p>
            <ul className="space-y-3.5">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-start gap-2.5 text-[13px] font-medium leading-snug text-[#0b0b0b] transition-colors hover:text-[#FDB813] sm:text-[14px]"
                  >
                    <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#fce001] to-[#fdb813]" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {alertVisible ? (
          <FormAlert status={status.type} message={status.message} />
        ) : null}
      </aside>
    );
  }
);

export default BlogDetailSidebar;
