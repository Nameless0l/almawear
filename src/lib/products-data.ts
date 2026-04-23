import { put } from "@vercel/blob";
import { products as staticProducts, type Product } from "@/data/products";

const PRODUCTS_FILE = "alma-products-data.json";

function getBlobBaseUrl(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  // Token format: vercel_blob_rw_STOREID_RANDOM
  const storeId = token.split("_")[3]?.toLowerCase();
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com`;
}

export async function getProducts(): Promise<Product[]> {
  const baseUrl = getBlobBaseUrl();
  if (!baseUrl) return staticProducts;

  try {
    const res = await fetch(`${baseUrl}/${PRODUCTS_FILE}`, {
      cache: "no-store",
    });
    if (res.ok) return (await res.json()) as Product[];
  } catch { /* fall through */ }

  return staticProducts;
}

export async function saveProducts(products: Product[]): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;

  try {
    await put(PRODUCTS_FILE, JSON.stringify(products), {
      access: "public",
      token,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return true;
  } catch {
    return false;
  }
}

export type { Product };
