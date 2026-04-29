import { put } from "@vercel/blob";

export type LookbookImage = {
  url: string;
  alt: string;
  span: string;
};

/**
 * Bloc de texte FR/EN. Si vide, le composant utilise la traduction i18n par défaut.
 */
export type Bilingual = { fr: string; en: string };

export type HeroContent = {
  image: string;
  // Si laissés vides → fallback sur les traductions i18n (hero.location/title/subtitle)
  location: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
};

export type BrandStoryContent = {
  image: string;
  subtitle: Bilingual;
  title1: Bilingual;
  title2: Bilingual;
  p1: Bilingual;
  p2: Bilingual;
  quote: Bilingual;
  author: Bilingual;
};

export type AboutPageContent = {
  heroImage: string;
  storyImage: string;
  subtitle: Bilingual;
  title: Bilingual;
  storyTitle1: Bilingual;
  storyTitle2: Bilingual;
  p1: Bilingual;
  p2: Bilingual;
  quote: Bilingual;
  author: Bilingual;
};

export type SiteSettings = {
  lookbook: LookbookImage[];
  collectionImages: {
    femme: string;
    homme: string;
    accessoire: string;
  };
  hero: HeroContent;
  brandStory: BrandStoryContent;
  aboutPage: AboutPageContent;
};

const SETTINGS_FILE = "alma-settings.json";

const empty: Bilingual = { fr: "", en: "" };

export const defaultSettings: SiteSettings = {
  lookbook: [
    {
      url: "/images/hero/_alma_wear_1771498601526.jpeg",
      alt: "Lookbook 1",
      span: "col-span-2 row-span-2",
    },
    {
      url: "/images/hero/lookbook-2.jpeg",
      alt: "Lookbook 2",
      span: "col-span-2",
    },
    { url: "/images/hero/lookbook-image.png", alt: "Lookbook 3", span: "" },
    { url: "/images/hero/lookbook-3.png", alt: "Lookbook 4", span: "" },
    { url: "/images/hero/lookbook-4.png", alt: "Lookbook 5", span: "" },
    {
      url: "/images/hero/lookbook-5.png",
      alt: "Lookbook 6",
      span: "col-span-2",
    },
  ],
  collectionImages: {
    femme: "/images/products/kaftan-blanc-gris-1.png",
    homme: "/images/products/_alma_wear_1771499218303.jpeg",
    accessoire: "/images/products/kaftan-rose-bleu-1.png",
  },
  hero: {
    image: "/images/hero/_alma_wear_1771498601526.jpeg",
    location: empty,
    title: empty,
    subtitle: empty,
  },
  brandStory: {
    image: "/images/hero/lookbook-image.png",
    subtitle: empty,
    title1: empty,
    title2: empty,
    p1: empty,
    p2: empty,
    quote: empty,
    author: empty,
  },
  aboutPage: {
    heroImage: "/images/hero/lookbook-image.png",
    storyImage: "/images/hero/christ.png",
    subtitle: empty,
    title: empty,
    storyTitle1: empty,
    storyTitle2: empty,
    p1: empty,
    p2: empty,
    quote: empty,
    author: empty,
  },
};

function getBlobBaseUrl(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  const storeId = token.split("_")[3]?.toLowerCase();
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com`;
}

/**
 * Merge defensif : pour chaque champ neuf (hero, brandStory, aboutPage),
 * complète avec les defaults si la prop manque dans le Blob existant.
 */
function mergeWithDefaults(data: Partial<SiteSettings>): SiteSettings {
  return {
    lookbook: data.lookbook ?? defaultSettings.lookbook,
    collectionImages: {
      ...defaultSettings.collectionImages,
      ...data.collectionImages,
    },
    hero: { ...defaultSettings.hero, ...data.hero },
    brandStory: { ...defaultSettings.brandStory, ...data.brandStory },
    aboutPage: { ...defaultSettings.aboutPage, ...data.aboutPage },
  };
}

export async function getSettings(): Promise<SiteSettings> {
  const baseUrl = getBlobBaseUrl();
  if (!baseUrl) return defaultSettings;

  try {
    const url = `${baseUrl}/${SETTINGS_FILE}?_t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    console.log(`[Settings] GET ${url} → ${res.status}`);
    if (res.ok) {
      const data = (await res.json()) as Partial<SiteSettings>;
      return mergeWithDefaults(data);
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
      cacheControlMaxAge: 1,
    });

    console.log(`[Settings] Saved → ${result.url}`);
    return { ok: true, url: result.url };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[Settings] Save failed:", msg);
    return { ok: false, error: msg };
  }
}
