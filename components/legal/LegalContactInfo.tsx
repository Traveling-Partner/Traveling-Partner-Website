import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, HelpCircle } from "lucide-react";

const items = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:info@traveling-partner.com",
    value: "info@traveling-partner.com",
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    href: "tel:+923252801261",
    value: "+92 325 2801261",
    external: false,
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Islamabad, Pakistan",
    external: false,
  },
  {
    icon: HelpCircle,
    label: "Help Center",
    href: "/help",
    value: "Get support on the website or in the app",
    external: false,
  },
] as const;

export default function LegalContactInfo(): React.ReactElement {
  return (
    <address className="not-italic mt-4 p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100/80 space-y-3">
      {items.map(({ icon: Icon, label, href, value, external }) => (
        <div key={label}>
          {href ? (
            <Link
              href={href}
              className="flex items-start gap-3 group rounded-lg -mx-1 px-1 py-0.5 hover:bg-[#fce001]/10 transition-colors"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon
                className="w-5 h-5 text-[#fdb813] flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#fdb813]">
                  {label}
                </span>
                <span className="block text-sm sm:text-base text-[#1a1a1a] font-medium group-hover:text-[#fdb813] transition-colors">
                  {value}
                </span>
              </div>
            </Link>
          ) : (
            <div className="flex items-start gap-3">
              <Icon
                className="w-5 h-5 text-[#fdb813] flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#fdb813]">
                  {label}
                </span>
                <span className="block text-sm sm:text-base text-gray-600">{value}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </address>
  );
}
