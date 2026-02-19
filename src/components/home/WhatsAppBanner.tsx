"use client";

import { MessageCircle } from "lucide-react";
import { getGeneralContactLink } from "@/lib/whatsapp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function WhatsAppBanner() {
  return (
    <section className="py-20 bg-[var(--color-accent)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-white mb-4">
            Une question ? Une commande ?
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-white/80 mb-10 max-w-lg mx-auto">
            Commandez directement via WhatsApp ou posez-nous vos questions.
            Nous vous répondons dans les 24h.
          </p>
          <a
            href={getGeneralContactLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-sm font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase hover:bg-[#20BD5C] transition-all duration-300 hover:scale-105 shadow-lg"
            aria-label="Commander sur WhatsApp"
          >
            <MessageCircle size={22} />
            Nous écrire sur WhatsApp
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
