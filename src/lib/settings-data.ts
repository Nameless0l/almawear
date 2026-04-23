import { put } from "@vercel/blob";

export type LookbookImage = {
  url: string;
  alt: string;
  span: string;
};

export type SiteSettings = {
  lookbook: LookbookImage[];
  collectionImages: {
    femme: string;
    homme: string;
    accessoire: string;
  };
};

const SETTINGS_FILE = "alma-settings.json";

export const defaultSettings: SiteSettings = {
  lookbook: [
    { url: "/images/hero/_alma_wear_1771498601526.jpeg", alt: "Lookbook 1", span: "col-span-2 row-span-2" },
    { url: "/images/hero/lookbook-2.jpeg",               alt: "Lookbook 2", span: "col-span-2" },
    { url: "/images/hero/lookbook-image.png",            alt: "Lookbook 3", span: "" },
    { url: "/images/hero/lookbook-3.png",                alt: "Lookbook 4", span: "" },
    { url: "/images/hero/lookbook-4.png",                alt: "Lookbook 5", span: "" },
    { url: "/images/hero/lookbook-5.png",                alt: "Lookbook 6", span: "col-span-2" },
  ],
  collectionImages: {
    femme:      "/images/products/kaftan-blanc-gris-1.png",
    homme:      "/images/products/_alma_wear_1771499218303.jpeg",
    accessoire: "/images/products/kaftan-rose-bleu-1.png",
  },
};

function getBlobBaseUrl(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  const storeId = token.split("_")[3]?.toLowerCase();
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com`;
}

export async function getSettings(): Promise<SiteSettings> {
  const baseUrl = getBlobBaseUrl();
  if (!baseUrl) return defaultSettings;

  try {
    const res = await fetch(`${baseUrl}/${SETTINGS_FILE}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json() as Partial<SiteSettings>;
      return {
        lookbook:         data.lookbook          ?? defaultSettings.lookbook,
        collectionImages: { ...defaultSettings.collectionImages, ...data.collectionImages },
      };
    }
  } catch { /* fall through */ }

  return defaultSettings;
}

export async function saveSettings(settings: SiteSettings): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;

  try {
    await put(SETTINGS_FILE, JSON.stringify(settings), {
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
