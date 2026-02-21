"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/i18n";

export function BrandStory() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Vidéo Facebook Reel — chargé au scroll */}
          <AnimatedSection>
            <div
              ref={videoRef}
              className="relative aspect-[267/476] overflow-hidden bg-[var(--color-border)] mx-auto max-w-[320px] lg:max-w-none"
            >
              {isVisible ? (
                <iframe
                  src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F896264929932502%2F&show_text=false&width=267&t=0"
                  className="w-full h-full border-none"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Alma Wear — Reel Facebook"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection delay={0.2}>
            <div className="lg:pl-8">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
                {t("brand.subtitle")}
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)] mb-8">
                {t("brand.title1")}
                <br />
                <em className="font-light">{t("brand.title2")}</em>
              </h2>

              <div className="space-y-6 font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed">
                <p>{t("brand.p1")}</p>
                <p>{t("brand.p2")}</p>
              </div>

              {/* Citation */}
              <blockquote className="mt-10 pl-6 border-l-2 border-[var(--color-accent)]">
                <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light italic text-[var(--color-text)]">
                  &ldquo;{t("brand.quote")}&rdquo;
                </p>
                <cite className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-3 block not-italic">
                  {t("brand.author")}
                </cite>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
