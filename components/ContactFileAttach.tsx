"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import {
  CONTACT_FILE,
  contactFileError,
  isContactImageFile,
} from "@/lib/contactValidation";
import FieldError from "@/components/FieldError";

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

export default function ContactFileAttach({
  id,
  file,
  error,
  disabled,
  tone = "home",
  onChange,
}: {
  id: string;
  file: File | null;
  error: string;
  disabled?: boolean;
  tone?: "home" | "page";
  onChange: (file: File | null, error: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file && inputRef.current) inputRef.current.value = "";
  }, [file]);

  useEffect(() => {
    if (!file || !isContactImageFile(file)) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0];
    if (!next) {
      onChange(null, "");
      return;
    }
    const nextError = contactFileError(next);
    if (nextError) {
      onChange(null, nextError);
      e.target.value = "";
      return;
    }
    onChange(next, "");
  };

  const onClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange(null, "");
  };

  const shellClass =
    tone === "page"
      ? "flex cursor-pointer items-center gap-2.5 rounded-[12px] border border-dashed border-[#d4d0c6] bg-[#F7F4EC] px-3 py-2 transition-colors hover:border-[#FCE001]/50 sm:px-3.5 sm:py-2.5"
      : "flex cursor-pointer items-center gap-2.5 rounded-[12px] bg-[#f5f0e6] px-3.5 py-2.5 sm:px-4 sm:py-3";

  return (
    <div>
      <label htmlFor={id} className={shellClass}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="h-9 w-9 shrink-0 rounded-[8px] object-cover"
          />
        ) : file ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#0b0b0b] font-poppins text-[9px] font-bold text-[#FCE001]">
            PDF
          </span>
        ) : (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#0b0b0b]">
            <PaperclipIcon />
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-left font-poppins text-[11px] text-[#6f6e68] sm:text-[12px]">
          {file ? (
            <span className="font-semibold text-[#0b0b0b]">{file.name}</span>
          ) : (
            <>
              Attach a file — optional{" "}
              <span className="text-[#9a968c]">(PDF, PNG, JPG, up to 10MB)</span>
            </>
          )}
        </span>
        {file ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[16px] leading-none text-[#6f6e68] hover:bg-black/5"
            aria-label="Remove file"
          >
            ×
          </button>
        ) : null}
        <input
          ref={inputRef}
          id={id}
          name="attachment"
          type="file"
          accept={CONTACT_FILE.accept}
          className="sr-only"
          onChange={onFile}
          disabled={disabled}
        />
      </label>
      <FieldError message={error} />
    </div>
  );
}
