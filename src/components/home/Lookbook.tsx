"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/i18n";
import { type LookbookImage } from "@/lib/settings-data";

interface LookbookProps {
  images: LookbookImage[];
}

export function Lookbook({ images }: LookbookProps) {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
            {t("lookbook.subtitle")}
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)]">
            {t("lookbook.title")}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.08}
              className={`${img.span} relative overflow-hidden group`}
            >
              <div className="relative aspect-[3/4] w-full h-full min-h-[250px] bg-[var(--color-surface)]">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
