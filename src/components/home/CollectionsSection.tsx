"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface CollectionsSectionProps {
  images: { femme: string; homme: string; accessoire: string };
}

export function CollectionsSection({ images }: CollectionsSectionProps) {
  const collections = [
    {
      label: "Collection Femme",
      sublabel: "Kaftans & Boubous",
      href: "/collections?category=femme",
      image: images.femme,
      span: "lg:col-span-2 lg:row-span-2",
      aspect: "aspect-[4/5] lg:aspect-auto lg:min-h-[520px]",
    },
    {
      label: "Collection Homme",
      sublabel: "Ensembles & Tenues",
      href: "/collections?category=homme",
      image: images.homme,
      span: "lg:col-span-1 lg:row-span-1",
      aspect: "aspect-[4/3] lg:aspect-auto",
    },
    {
      label: "Accessoires",
      sublabel: "Sacs & Bijoux",
      href: "/collections?category=accessoire",
      image: images.accessoire,
      span: "lg:col-span-1 lg:row-span-1",
      aspect: "aspect-[4/3] lg:aspect-auto",
    },
  ];
  return (
    <section className="py-24 px-6 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
            Alma Wear
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)]">
            Nos Collections
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
        </AnimatedSection>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-4">
          {collections.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={col.span}
            >
              <Link
                href={col.href}
                className={`group relative overflow-hidden block w-full ${col.aspect} bg-[var(--color-dark)]`}
              >
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-70"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-[family-name:var(--font-dm-sans)] text-xs tracking-[0.25em] uppercase text-[var(--color-accent)] mb-1">
                    {col.sublabel}
                  </p>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-3xl font-light text-white">
                    {col.label}
                  </h3>
                  <span className="inline-block mt-3 font-[family-name:var(--font-dm-sans)] text-xs tracking-widest uppercase text-white/70 border-b border-white/40 pb-0.5 transition-all duration-300 group-hover:text-white group-hover:border-white">
                    Découvrir →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
