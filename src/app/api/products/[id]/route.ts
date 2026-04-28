import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/products-data";
import { type Product } from "@/data/products";

export const maxDuration = 30;

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer alma-admin-${process.env.ADMIN_PASSWORD}`;
}

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const updated: Product = await req.json();
  const products = await getProducts();

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  const newList = [...products];
  newList[index] = { ...updated, id };
  const result = await saveProducts(newList);

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Erreur de sauvegarde" }, { status: 500 });
  }

  return NextResponse.json(newList[index]);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === products.length) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  const result = await saveProducts(filtered);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Erreur de sauvegarde" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
