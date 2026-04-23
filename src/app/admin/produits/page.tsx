"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, Sparkles, Loader2 } from "lucide-react";
import { AdminGuard, getAuthHeader } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { type Product } from "@/data/products";

const CATEGORY_LABELS: Record<string, string> = {
  femme: "Femme",
  homme: "Homme",
  accessoire: "Accessoire",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    setDeleting(id);
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { authorization: getAuthHeader() },
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleting(null);
    setConfirmDelete(null);
  }

  const productCountLabel = products.length === 1 ? "produit" : "produits";

  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-28 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
                Produits
              </h1>
              <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
                {products.length} {productCountLabel} au catalogue
              </p>
            </div>
            <Link
              href="/admin/produits/nouveau"
              className="flex items-center gap-2 bg-[var(--color-dark)] text-white px-5 py-3 text-sm tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-accent)] transition-colors"
            >
              <Plus size={16} />
              Ajouter
            </Link>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] text-sm">
              <div className="w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              Chargement…
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="bg-white border border-[var(--color-border)] p-16 text-center">
              <p className="font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)]">
                Aucun produit. Commencez par en ajouter un !
              </p>
              <Link
                href="/admin/produits/nouveau"
                className="inline-flex items-center gap-2 mt-4 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-accent)] hover:underline"
              >
                <Plus size={14} /> Ajouter un produit
              </Link>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="bg-white border border-[var(--color-border)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                    <th className={th}>Produit</th>
                    <th className={th}>Catégorie</th>
                    <th className={th}>Prix</th>
                    <th className={th}>Statut</th>
                    <th className={th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/40 transition-colors"
                    >
                      {/* Product */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-14 relative shrink-0 bg-[var(--color-surface)] overflow-hidden">
                            {product.images[0] && (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--color-text)]">
                              {product.name}
                            </p>
                            <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--color-text-muted)] mt-0.5">
                              {product.material}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs tracking-widest uppercase text-[var(--color-text-muted)] border border-[var(--color-border)] px-2 py-1">
                          {CATEGORY_LABELS[product.category] ?? product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--color-text)]">
                          {product.price.toLocaleString("fr-FR")} FCFA
                        </span>
                      </td>

                      {/* Status badges */}
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {product.featured && (
                            <span className="inline-flex items-center gap-1 bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-xs px-2 py-0.5 font-[family-name:var(--font-dm-sans)]">
                              <Star size={11} />
                              Vedette
                            </span>
                          )}
                          {product.isNew && (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 font-[family-name:var(--font-dm-sans)]">
                              <Sparkles size={11} />
                              Nouveau
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        {confirmDelete === product.id ? (
                          <div className="flex items-center gap-2">
                            <span className="font-[family-name:var(--font-dm-sans)] text-xs text-red-600">
                              Confirmer ?
                            </span>
                            <button
                              onClick={() => handleDelete(product.id)}
                              disabled={deleting === product.id}
                              className="text-xs font-[family-name:var(--font-dm-sans)] text-red-600 hover:underline"
                            >
                              {deleting === product.id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                "Oui"
                              )}
                            </button>
                            <button
                              onClick={() => setConfirmDelete(null)}
                              className="text-xs font-[family-name:var(--font-dm-sans)] text-[var(--color-text-muted)] hover:underline"
                            >
                              Non
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/produits/${product.id}`}
                              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                              title="Modifier"
                            >
                              <Pencil size={16} />
                            </Link>
                            <button
                              onClick={() => setConfirmDelete(product.id)}
                              className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}

const th = "text-left px-5 py-3 text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)]";
