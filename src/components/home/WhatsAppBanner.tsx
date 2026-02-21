"use client";

import { MessageCircle } from "lucide-react";
import { getGeneralContactLink } from "@/lib/whatsapp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/i18n";

export function WhatsAppBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/lookbook-image.png')" }}
      />
      <div className="absolute inset-0 bg-[var(--color-accent)]/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-white mb-4">
            {t("whatsappBanner.title")}
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/80 mb-10 max-w-lg mx-auto">
            {t("whatsappBanner.description")}
          </p>
          <a
            href={getGeneralContactLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-sm font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase hover:bg-[#20BD5C] transition-all duration-300 hover:scale-105 shadow-lg"
            aria-label="Commander sur WhatsApp"
          >
            <MessageCircle size={22} />
            {t("whatsappBanner.cta")}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
