"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useLanguage } from "@/lib/i18n";

export function ProductCard({ product }: Readonly<{ product: Product }>) {
  const { t } = useLanguage();
  return (
    <article className="group relative">
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
      <div className="pt-3 pb-4">
        <Link href={`/produits/${product.slug}`}>
          <h3 className="font-[family-name:var(--font-cormorant)] text-base sm:text-lg font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors leading-5 sm:leading-tight h-10 sm:h-auto overflow-hidden">
            {product.name}
          </h3>
        </Link>
        <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] text-xs mt-1 hidden sm:block">
          {product.material}
        </p>
        <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)] text-sm mt-2">
          {product.price.toLocaleString("fr-FR")} {product.currency}
        </p>
        <Link
          href={`/produits/${product.slug}`}
          className="mt-2 block w-full text-center font-[family-name:var(--font-dm-sans)] text-xs tracking-widest uppercase border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-dark)] py-2 hover:bg-[var(--color-dark)] hover:border-[var(--color-dark)] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
          aria-label={`Voir ${product.name}`}
        >
          {t("product.order")}
        </Link>
      </div>
    </article>
  );
}
