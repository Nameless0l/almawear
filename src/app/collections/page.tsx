import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/products-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Découvrez toutes les collections Alma Wear : kaftans, boubous, ensembles et accessoires confectionnés à la main à Douala.",
};

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <section className="min-h-screen pt-28 pb-24 px-6 bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-[family-name:var(--font-dm-sans)] text-sm tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4">
            Nos créations
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl font-light text-[var(--color-text)]">
            Collections
          </h1>
          <div className="w-12 h-[1px] bg-[var(--color-accent)] mx-auto mt-6" />
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
