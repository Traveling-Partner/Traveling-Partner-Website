"use client";

import { useState } from "react";
import type { BlogFaq } from "@/lib/blogTypes";

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 7 17 17M17 7 7 17" />
    </svg>
  );
}

export default function BlogFaqAccordion({ faqs }: { faqs: BlogFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section className="mt-10 border-t border-dashed border-[#e8e4da] pt-8" aria-labelledby="blog-faq-heading">
      <h2
        id="blog-faq-heading"
        className="mb-5 font-poppins text-[22px] font-extrabold leading-tight text-[#0b0b0b] sm:mb-6 sm:text-[26px]"
      >
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">
          Questions.
        </span>
      </h2>
      <div className="space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.id ?? `${item.sortOrder}-${index}`}
              className={`overflow-hidden rounded-[22px] border bg-white transition-all duration-300 sm:rounded-[24px] ${
                isOpen
                  ? "border-[#FDE68A] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                  : "border-[#eceae4] shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 ${
                  isOpen ? "bg-[#FFFDF0]" : "bg-white"
                }`}
                aria-expanded={isOpen}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold sm:h-10 sm:w-10 sm:text-[14px] ${
                    isOpen
                      ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_4px_12px_rgba(252,224,1,0.35)]"
                      : "bg-[#fff8e1] text-[#0b0b0b]"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`min-w-0 flex-1 text-[15px] font-bold leading-snug sm:text-[16px] ${
                    isOpen ? "text-[#0b0b0b]" : "text-[#3d3d38]"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
                    isOpen
                      ? "bg-[#0b0b0b] text-[#FCE001]"
                      : "bg-[#f3f2ee] text-[#6b6960]"
                  }`}
                >
                  {isOpen ? (
                    <CloseIcon className="h-4 w-4" />
                  ) : (
                    <PlusIcon className="h-4 w-4" />
                  )}
                </span>
              </button>
              <div
                className={`grid bg-white transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#eceae4] bg-white px-5 pb-5 pt-5 text-[14px] leading-[1.75] text-[#5c5b55] sm:px-6 sm:pb-6 sm:pt-6 sm:text-[15px]">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
