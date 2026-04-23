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
  const result = await saveProducts(staticProducts);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "Blob non configuré ou erreur réseau" }, { status: 500 });
  }

  // Verify: immediately re-read what was saved
  let verifySize = 0;
  let verifyOk = false;
  try {
    const verifyRes = await fetch(`${result.url}?_v=${Date.now()}`, { cache: "no-store" });
    const verifyText = await verifyRes.text();
    verifySize = verifyText.length;
    verifyOk = verifyText.startsWith("[");
  } catch { /* ignore */ }

  return NextResponse.json({
    success: true,
    count: staticProducts.length,
    url: result.url,
    verifySize,
    verifyOk,
  });
}
