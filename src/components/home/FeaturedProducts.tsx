"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { getProductOrderLink } from "@/lib/whatsapp";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/i18n";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <AnimatedSection className="text-center mb-16">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
            {t("featured.subtitle")}
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-light text-[var(--color-text)]">
            {t("featured.title")}
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
        </AnimatedSection>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.1}>
              <article className="group relative overflow-hidden">
                {/* Badge */}
                {product.isNew && (
                  <span className="absolute top-3 left-3 z-10 bg-[var(--color-dark)] text-white text-xs tracking-widest uppercase px-3 py-1 font-[family-name:var(--font-dm-sans)]">
                    {t("product.new")}
                  </span>
                )}

                {/* Image */}
                <Link
                  href={`/produits/${product.slug}`}
                  className="block relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>

                {/* Info */}
                <div className="pt-4 pb-6">
                  <Link href={`/produits/${product.slug}`}>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] text-sm mt-1">
                    {product.material}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                      {product.price.toLocaleString("fr-FR")} {product.currency}
                    </span>
                    <a
                      href={getProductOrderLink(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-dm-sans)] text-xs tracking-widest uppercase border border-[var(--color-text)] px-4 py-2 hover:bg-[var(--color-text)] hover:text-white transition-all duration-200"
                      aria-label={`Commander ${product.name}`}
                    >
                      {t("featured.order")}
                    </a>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

        {/* View all link */}
        <AnimatedSection className="text-center mt-16">
          <Link
            href="/collections"
            className="font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase border-b border-[var(--color-text)] pb-1 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
          >
            Voir toute la collection
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
