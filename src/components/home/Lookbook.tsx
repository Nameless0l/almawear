"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const lookbookImages = [
  { src: "/images/hero/_alma_wear_1771498601526.jpeg", alt: "Lookbook Alma Wear 1", span: "col-span-2 row-span-2" },
  { src: "/images/hero/lookbook-2.jpeg", alt: "Lookbook Alma Wear 2", span: "col-span-2" },
  { src: "/images/hero/lookbook-image.png", alt: "Lookbook Alma Wear 2", span: "" },
  { src: "/images/hero/lookbook-3.png", alt: "Lookbook Alma Wear 3", span: "" },
  { src: "/images/hero/lookbook-4.png", alt: "Lookbook Alma Wear 4", span: "" },
  { src: "/images/hero/lookbook-5.png", alt: "Lookbook Alma Wear 5", span: "col-span-2" },
];

export function Lookbook() {
  return (
    <section className="py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
            Inspiration
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)]">
            Lookbook
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {lookbookImages.map((img, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.08}
              className={`${img.span} relative overflow-hidden group`}
            >
              <div className="relative aspect-[3/4] w-full h-full min-h-[250px] bg-[var(--color-surface)]">
                <Image
                  src={img.src}
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
