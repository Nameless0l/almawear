"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Sparkles, ShieldCheck } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Product } from "@/data/products";
import { getProductOrderLink } from "@/lib/whatsapp";
import { ProductCard } from "./ProductCard";
import { useLanguage } from "@/lib/i18n";

interface ProductDetailProps {
  product: Product;
  similarProducts: Product[];
}

export function ProductDetail({ product, similarProducts }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0] || ""
  );
  const { t } = useLanguage();

  const orderLink = getProductOrderLink(
    product.name,
    selectedSize || undefined,
    selectedColor || undefined
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowLeft size={16} />
          Retour aux collections
        </Link>
      </div>

      {/* Product section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Image — 60% */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-[var(--color-dark)] text-white text-xs tracking-widest uppercase px-4 py-1.5 font-[family-name:var(--font-dm-sans)]">
                  {t("product.new")}
                </span>
              )}
            </div>
          </motion.div>

          {/* Info — 40% */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-3">
              {product.category}
            </p>

            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)] mb-4">
              {product.name}
            </h1>

            <p className="font-[family-name:var(--font-dm-sans)] text-2xl font-medium text-[var(--color-text)] mb-6">
              {product.price.toLocaleString("fr-FR")} {product.currency}
            </p>

            <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--color-text)] mb-3">
                  {t("product.color")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`font-[family-name:var(--font-dm-sans)] text-sm px-4 py-2 border transition-all duration-200 ${
                        selectedColor === color
                          ? "border-[var(--color-text)] bg-[var(--color-text)] text-white"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)]"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mb-8">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--color-text)] mb-3">
                {t("product.sizes")}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`font-[family-name:var(--font-dm-sans)] text-sm px-4 py-2 border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-[var(--color-text)] bg-[var(--color-text)] text-white"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Order button */}
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-sm font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase hover:bg-[#20BD5C] transition-all duration-300 hover:scale-[1.02] shadow-md mb-8"
              aria-label={`Commander ${product.name} sur WhatsApp`}
            >
              <MessageCircle size={20} />
              {t("product.orderWhatsApp")}
            </a>

            {/* Product details */}
            <div className="border-t border-[var(--color-border)] pt-6 space-y-4">
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Sparkles size={16} />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm">
                  {t("product.material")} : {product.material}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <ShieldCheck size={16} />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm">
                  {product.careInstructions}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
                <Ruler size={16} />
                <span className="font-[family-name:var(--font-dm-sans)] text-sm">
                  {t("product.customSize")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <section className="bg-[var(--color-surface)] py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
                Suggestions
              </p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-light text-[var(--color-text)]">
                {t("product.alsoLike")}
              </h2>
              <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
