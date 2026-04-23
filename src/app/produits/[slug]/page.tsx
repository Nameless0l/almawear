import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products as staticProducts } from "@/data/products";
import { getProducts } from "@/lib/products-data";
import { ProductDetail } from "@/components/products/ProductDetail";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) return { title: "Produit introuvable" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Alma Wear`,
      description: product.description,
      images: product.images,
    },
  };
}

export function generateStaticParams() {
  return staticProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetail product={product} similarProducts={similarProducts} />;
}
