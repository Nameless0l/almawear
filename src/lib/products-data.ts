import { put, list } from "@vercel/blob";
import { products as staticProducts, type Product } from "@/data/products";

const PRODUCTS_FILE = "alma-products-data.json";

function getToken() {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

export async function getProducts(): Promise<Product[]> {
  const token = getToken();
  if (!token) return staticProducts;

  try {
    const { blobs } = await list({ token });
    const blob = blobs.find((b) => b.pathname === PRODUCTS_FILE);
    if (blob) {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (res.ok) return (await res.json()) as Product[];
    }
  } catch {
    // fallback to static
  }
  return staticProducts;
}

export async function saveProducts(products: Product[]): Promise<boolean> {
  const token = getToken();
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
