"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/i18n";
import type { BrandStoryContent } from "@/lib/settings-data";

export function BrandStory({ content }: { content?: BrandStoryContent }) {
  const { t, locale } = useLanguage();

  // Helper : prend l'override admin si présent, sinon fallback i18n
  const pick = (
    field: keyof Omit<BrandStoryContent, "image">,
    fallbackKey: string,
  ) => content?.[field]?.[locale]?.trim() || t(fallbackKey);

  const image = content?.image || "/images/hero/lookbook-image.png";
  const subtitle = pick("subtitle", "brand.subtitle");
  const title1 = pick("title1", "brand.title1");
  const title2 = pick("title2", "brand.title2");
  const p1 = pick("p1", "brand.p1");
  const p2 = pick("p2", "brand.p2");
  const quote = pick("quote", "brand.quote");
  const author = pick("author", "brand.author");

  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-border)] mx-auto max-w-[420px] lg:max-w-none">
              <Image
                src={image}
                alt={title1}
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
                {subtitle}
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)] mb-8">
                {title1}
                <br />
                <em className="font-light">{title2}</em>
              </h2>

              <div className="space-y-6 font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                <p>{p1}</p>
                <p>{p2}</p>
              </div>

              <blockquote className="mt-10 pl-6 border-l-2 border-[var(--color-accent)]">
                <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[var(--color-text)]">
                  &ldquo;{quote}&rdquo;
                </p>
                <cite className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-3 block not-italic">
                  {author}
                </cite>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
