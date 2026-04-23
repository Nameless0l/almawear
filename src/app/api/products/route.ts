import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products-data";
import { type Product } from "@/data/products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  const expected = `Bearer alma-admin-${process.env.ADMIN_PASSWORD}`;
  return auth === expected;
}

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const newProduct: Product = await req.json();
  const products = await getProducts();

  if (products.some((p) => p.id === newProduct.id || p.slug === newProduct.slug)) {
    return NextResponse.json({ error: "Produit déjà existant" }, { status: 409 });
  }

  const updated = [...products, newProduct];
  const result = await saveProducts(updated);

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Erreur de sauvegarde" }, { status: 500 });
  }

  return NextResponse.json(newProduct, { status: 201 });
}
