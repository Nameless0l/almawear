import { put } from "@vercel/blob";
import { products as staticProducts, type Product } from "@/data/products";

const PRODUCTS_FILE = "alma-products-data.json";

function getBlobBaseUrl(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  const storeId = token.split("_")[3]?.toLowerCase();
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com`;
}

export async function getProducts(): Promise<Product[]> {
  const baseUrl = getBlobBaseUrl();
  if (!baseUrl) {
    console.log("[Products] No Blob base URL — returning static");
    return staticProducts;
  }

  try {
    const url = `${baseUrl}/${PRODUCTS_FILE}?_t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    console.log(`[Products] GET ${url} → ${res.status}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as Product[];
      console.warn("[Products] Blob returned empty/invalid — using static");
    }
  } catch (e) {
    console.error("[Products] Fetch error:", e);
  }

  return staticProducts;
}

export async function saveProducts(
  products: Product[],
): Promise<{ ok: boolean; error?: string; url?: string }> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { ok: false, error: "BLOB_READ_WRITE_TOKEN manquant" };

  try {
    const json = JSON.stringify(products, null, 2);
    console.log(
      `[Products] Saving ${products.length} products (${json.length} chars)`,
    );

    const result = await put(PRODUCTS_FILE, json, {
      access: "public",
      token,
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });

    console.log(`[Products] Saved → ${result.url}`);
    return { ok: true, url: result.url };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[Products] Save failed:", msg);
    return { ok: false, error: msg };
  }
}

export type { Product };
