"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Star, Sparkles, Users, Plus, ArrowRight } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { type Product } from "@/data/products";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: products.length,
    featured: products.filter((p) => p.featured).length,
    isNew: products.filter((p) => p.isNew).length,
    femme: products.filter((p) => p.category === "femme").length,
    homme: products.filter((p) => p.category === "homme").length,
    accessoire: products.filter((p) => p.category === "accessoire").length,
  };

  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
              Tableau de bord
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
              Bienvenue dans l'administration d'Alma Wear
            </p>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] text-sm">
              <div className="w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              Chargement…
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <StatCard icon={ShoppingBag} label="Total produits" value={stats.total} />
                <StatCard icon={Star} label="Mis en avant" value={stats.featured} accent />
                <StatCard icon={Sparkles} label="Nouveautés" value={stats.isNew} />
                <StatCard icon={Users} label="Catégories" value={3} />
              </div>

              {/* Category breakdown */}
              <div className="bg-white border border-[var(--color-border)] p-6 mb-8">
                <h2 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)] mb-5">
                  Répartition par catégorie
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Femme", count: stats.femme },
                    { label: "Homme", count: stats.homme },
                    { label: "Accessoires", count: stats.accessoire },
                  ].map(({ label, count }) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] w-24">
                        {label}
                      </span>
                      <div className="flex-1 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500"
                          style={{ width: stats.total ? `${(count / stats.total) * 100}%` : "0%" }}
                        />
                      </div>
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--color-text)] w-6 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/admin/produits/nouveau"
                  className="flex items-center justify-between bg-[var(--color-dark)] text-white px-6 py-5 hover:bg-[var(--color-accent)] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Plus size={20} />
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase">
                      Ajouter un produit
                    </span>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <Link
                  href="/admin/produits"
                  className="flex items-center justify-between bg-white border border-[var(--color-border)] text-[var(--color-text)] px-6 py-5 hover:border-[var(--color-accent)] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} className="text-[var(--color-accent)]" />
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase">
                      Gérer les produits
                    </span>
                  </div>
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: Readonly<{
  icon: React.ElementType;
  label: string;
  value: number;
  accent?: boolean;
}>) {
  return (
    <div className={`bg-white border p-5 ${accent ? "border-[var(--color-accent)]" : "border-[var(--color-border)]"}`}>
      <div className="flex items-center justify-between mb-3">
        <Icon size={20} className={accent ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"} />
      </div>
      <p className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[var(--color-text)]">
        {value}
      </p>
      <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
        {label}
      </p>
    </div>
  );
}
