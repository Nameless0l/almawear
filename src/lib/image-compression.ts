import imageCompression from "browser-image-compression";

/**
 * Compresse une image côté client pour les uploads.
 * - Cible 1 Mo max, 1600px max
 * - Convertit en WebP (-30% vs JPEG)
 * - Tourne dans un Web Worker (UI non bloquée)
 *
 * @param file fichier image source
 * @param opts options de compression (taille cible, dimension max)
 */
export async function compressImage(
  file: File,
  opts?: { maxSizeMB?: number; maxWidthOrHeight?: number },
): Promise<File> {
  // Pas la peine de compresser un tout petit fichier
  if (file.size < 200 * 1024) return file;

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: opts?.maxSizeMB ?? 1,
      maxWidthOrHeight: opts?.maxWidthOrHeight ?? 1600,
      useWebWorker: true,
      fileType: "image/webp",
      initialQuality: 0.85,
      preserveExif: false,
    });

    // Si la compression a grossi le fichier, on garde l'original
    if (compressed.size >= file.size) return file;

    // Renomme avec l'extension qui correspond au vrai type
    return new File(
      [compressed],
      file.name.replace(/\.[^.]+$/, "") + ".webp",
      { type: "image/webp", lastModified: Date.now() },
    );
  } catch (e) {
    console.warn("[compressImage] Échec, envoi de l'original :", e);
    return file;
  }
}

/**
 * Upload une image (compressée) vers /api/upload.
 * Renvoie l'URL Vercel Blob ou throw une erreur lisible.
 */
export async function uploadImageToBlob(
  file: File,
  authHeader: string,
  opts?: { maxSizeMB?: number; maxWidthOrHeight?: number },
): Promise<string> {
  const compressed = await compressImage(file, opts);

  const formData = new FormData();
  formData.append("file", compressed);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { authorization: authHeader },
    body: formData,
  });

  // Lecture sécurisée : Vercel peut renvoyer du HTML (504, 502…)
  const text = await res.text();
  let data: { url?: string; error?: string } = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      res.status === 504
        ? "Upload trop long — vérifiez votre connexion"
        : `Erreur serveur (${res.status})`,
    );
  }

  if (!res.ok) throw new Error(data.error ?? `Erreur ${res.status}`);
  if (!data.url) throw new Error("URL d'image manquante");
  return data.url;
}
