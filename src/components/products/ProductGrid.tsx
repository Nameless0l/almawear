"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category filters */}
      <div className="flex justify-center gap-6 mb-16 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase pb-2 transition-all duration-200 ${
              activeCategory === cat.value
                ? "text-[var(--color-text)] border-b border-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
            aria-label={`Filtrer par ${cat.label}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-center font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] py-16">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}
