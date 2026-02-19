"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function BrandStory() {
  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-border)]">
              <Image
                src="/images/hero/atelier.jpg"
                alt="Atelier Alma Wear à Douala"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <div className="lg:pl-8">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
                Notre Histoire
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)] mb-8">
                L&apos;art de la couture
                <br />
                <em className="font-light">camerounaise</em>
              </h2>

              <div className="space-y-6 font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                <p>
                  Née au cœur de Douala, Alma Wear est le fruit d&apos;une passion
                  profonde pour l&apos;artisanat textile africain. Chaque pièce est
                  pensée comme une œuvre, mêlant savoir-faire ancestral et vision
                  contemporaine de la mode.
                </p>
                <p>
                  Nos créations s&apos;adressent à la femme moderne qui souhaite
                  affirmer son identité avec élégance. Du choix des tissus à la
                  dernière couture, chaque étape est réalisée à la main dans
                  notre atelier de Douala.
                </p>
              </div>

              {/* Citation */}
              <blockquote className="mt-10 pl-6 border-l-2 border-[var(--color-accent)]">
                <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[var(--color-text)]">
                  &ldquo;Chaque pièce raconte une histoire, celle de la femme qui
                  la porte.&rdquo;
                </p>
                <cite className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-3 block not-italic">
                  — Fondatrice, Alma Wear
                </cite>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
