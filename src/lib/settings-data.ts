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
    const url = `${baseUrl}/${SETTINGS_FILE}?_t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    console.log(`[Settings] GET ${url} → ${res.status}`);
    if (res.ok) {
      const data = await res.json() as Partial<SiteSettings>;
      return {
        lookbook:         data.lookbook          ?? defaultSettings.lookbook,
        collectionImages: { ...defaultSettings.collectionImages, ...data.collectionImages },
      };
    }
  } catch (e) {
    console.error("[Settings] Fetch error:", e);
  }

  return defaultSettings;
}

export async function saveSettings(
  settings: SiteSettings,
): Promise<{ ok: boolean; error?: string; url?: string }> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { ok: false, error: "BLOB_READ_WRITE_TOKEN manquant" };

  try {
    const json = JSON.stringify(settings, null, 2);
    const result = await put(SETTINGS_FILE, json, {
      access: "public",
      token,
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });

    console.log(`[Settings] Saved → ${result.url}`);
    return { ok: true, url: result.url };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[Settings] Save failed:", msg);
    return { ok: false, error: msg };
  }
}
