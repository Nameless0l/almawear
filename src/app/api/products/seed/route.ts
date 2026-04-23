import { NextRequest, NextResponse } from "next/server";
import { products as staticProducts } from "@/data/products";
import { saveProducts } from "@/lib/products-data";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("authorization") === `Bearer alma-admin-${process.env.ADMIN_PASSWORD}`;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const ok = await saveProducts(staticProducts);
  if (!ok) return NextResponse.json({ error: "Blob non configuré ou erreur réseau" }, { status: 500 });
  return NextResponse.json({ success: true, count: staticProducts.length });
}
