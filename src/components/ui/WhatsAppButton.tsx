"use client";

import { MessageCircle } from "lucide-react";
import { getGeneralContactLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={getGeneralContactLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BD5C] transition-all duration-300 hover:scale-105 font-[family-name:var(--font-dm-sans)] font-medium text-sm"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
