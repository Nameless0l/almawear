"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { getProductOrderLink } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLanguage();
  return (
    <article className="group relative overflow-hidden">
      {/* Badge Nouveau */}
      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 bg-[var(--color-dark)] text-white text-xs tracking-widest uppercase px-3 py-1 font-[family-name:var(--font-dm-sans)]">
          {t("product.new")}
        </span>
      )}

      {/* Image avec hover effect */}
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

      {/* Infos produit */}
      <div className="pt-4 pb-6">
        <Link href={`/produits/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] text-sm mt-1">
          {product.material}
        </p>
        <div className="flex flex-col gap-2 mt-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)] text-sm sm:text-base">
            {product.price.toLocaleString("fr-FR")} {product.currency}
          </span>
          <a
            href={getProductOrderLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-dm-sans)] text-xs tracking-widest uppercase border border-[var(--color-text)] px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-[var(--color-text)] hover:text-white transition-all duration-200 text-center"
            aria-label={`Commander ${product.name}`}
          >
            {t("product.order")}
          </a>
        </div>
      </div>
    </article>
  );
}
