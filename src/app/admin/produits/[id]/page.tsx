"use client";

import { use, useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProductForm } from "@/components/admin/ProductForm";
import { type Product } from "@/data/products";

export default function EditProductPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((products: Product[]) => {
        const found = products.find((p) => p.id === id);
        if (found) setProduct(found);
        else setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
              Modifier le produit
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
              {product?.name ?? "Chargement…"}
            </p>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] text-sm">
              <div className="w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              Chargement…
            </div>
          )}

          {notFound && (
            <p className="font-[family-name:var(--font-dm-sans)] text-red-500">
              Produit introuvable.
            </p>
          )}

          {product && <ProductForm mode="edit" initial={product} />}
        </div>
      </main>
    </AdminGuard>
  );
}
