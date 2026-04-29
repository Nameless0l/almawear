"use client";

import Image from "next/image";
import {
  Fingerprint,
  Gem,
  Sparkles,
  Heart,
  Lightbulb,
  Leaf,
  MapPin,
  Eye,
  Rocket,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/i18n";
import type { AboutPageContent } from "@/lib/settings-data";

const valueIcons = [Fingerprint, Gem, Sparkles, Heart, Lightbulb, Leaf];
const valueKeys = [
  "authenticity",
  "elegance",
  "modernity",
  "respect",
  "innovation",
  "sustainability",
] as const;

export function AboutContent({ content }: { content?: AboutPageContent }) {
  const { t, locale } = useLanguage();

  const pick = (
    field: keyof Omit<AboutPageContent, "heroImage" | "storyImage">,
    fallbackKey: string,
  ) => content?.[field]?.[locale]?.trim() || t(fallbackKey);

  const heroImage = content?.heroImage || "/images/hero/lookbook-image.png";
  const storyImage = content?.storyImage || "/images/hero/christ.png";
  const subtitle = pick("subtitle", "about.subtitle");
  const title = pick("title", "about.title");
  const storyTitle1 = pick("storyTitle1", "about.storyTitle1");
  const storyTitle2 = pick("storyTitle2", "about.storyTitle2");
  const p1 = pick("p1", "about.p1");
  const p2 = pick("p2", "about.p2");
  const quote = pick("quote", "about.quote");
  const author = pick("author", "about.author");

  const values = valueKeys.map((key, i) => ({
    icon: valueIcons[i],
    title: t(`about.values.${key}`),
    description: t(`about.values.${key}Desc`),
  }));

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-[var(--color-dark)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/50 via-[#1a1714]/30 to-[#1a1714]/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase mb-4 opacity-80">
            {subtitle}
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl font-light italic">
            {title}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface)]">
                <Image
                  src={storyImage}
                  alt="Fondatrice Alma Wear"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)] mb-8">
                  {storyTitle1}
                  <br />
                  <em>{storyTitle2}</em>
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
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision & Ambition */}
      <section className="py-24 px-6 bg-[var(--color-dark)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <AnimatedSection>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent)] mb-6">
                  <Eye size={24} className="text-[var(--color-accent)]" />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-white mb-6">
                  {t("about.visionTitle")}
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-white/70 leading-relaxed">
                  {t("about.visionText")}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent)] mb-6">
                  <Rocket size={24} className="text-[var(--color-accent)]" />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-white mb-6">
                  {t("about.ambitionTitle")}
                </h3>
                <p className="font-[family-name:var(--font-dm-sans)] text-white/70 leading-relaxed">
                  {t("about.ambitionText")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
              {t("about.valuesSubtitle")}
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)]">
              {t("about.valuesTitle")}
            </h2>
            <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent)] mb-6">
                    <value.icon
                      size={24}
                      className="text-[var(--color-accent)]"
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--color-text)] mb-4">
                    {value.title}
                  </h3>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-[var(--color-accent)] mb-6">
              <MapPin size={24} className="text-[var(--color-accent)]" />
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)] mb-6">
              {t("about.locationTitle")}
            </h2>
            <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto">
              {t("about.locationText")}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
