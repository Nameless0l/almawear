import type { Metadata } from "next";
import { MessageCircle, Mail, Clock, MapPin, Phone } from "lucide-react";
import { getGeneralContactLink } from "@/lib/whatsapp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Alma Wear via WhatsApp pour commander vos kaftans, boubous et tenues africaines. Basée à Douala, Cameroun.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-[var(--color-dark)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/80 to-[#1a1714]/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
            Parlons ensemble
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-light italic">
            Contact
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)] mb-6">
              Comment nous joindre
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] max-w-lg mx-auto leading-relaxed">
              Pour passer commande ou poser une question, contactez-nous
              directement sur WhatsApp. Nous vous répondons généralement dans
              les 24h.
            </p>
          </AnimatedSection>

          {/* WhatsApp CTA */}
          <AnimatedSection delay={0.1} className="mb-20">
            <div className="relative overflow-hidden p-10 md:p-14 text-center">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/products/kaftan-blanc-gris-1.png')" }}
              />
              <div className="absolute inset-0 bg-[var(--color-bg)]/85 backdrop-blur-sm" />
              {/* Content */}
              <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] mb-6">
                <MessageCircle size={28} className="text-white" />
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-light text-[var(--color-text)] mb-4">
                Écrivez-nous sur WhatsApp
              </h3>
              <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
                C&apos;est le moyen le plus rapide de nous contacter. Envoyez-nous
                un message et nous vous répondrons dans les plus brefs délais.
              </p>
              <a
                href={getGeneralContactLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-sm font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase hover:bg-[#20BD5C] transition-all duration-300 hover:scale-105 shadow-lg"
                aria-label="Nous contacter sur WhatsApp"
              >
                <MessageCircle size={20} />
                Ouvrir WhatsApp
              </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.2}>
              <div className="border border-[var(--color-border)] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Phone size={20} className="text-[var(--color-accent)]" />
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                    Téléphone / WhatsApp
                  </h3>
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                    {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+33759523398"}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="border border-[var(--color-border)] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail size={20} className="text-[var(--color-accent)]" />
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                    Email
                  </h3>
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                  contact@almawear.cm
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="border border-[var(--color-border)] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-[var(--color-accent)]" />
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                    Horaires
                  </h3>
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                  Lundi — Samedi
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                  9h00 — 18h00
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="border border-[var(--color-border)] p-8">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={20} className="text-[var(--color-accent)]" />
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                    Localisation
                  </h3>
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                  Douala, Cameroun
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
