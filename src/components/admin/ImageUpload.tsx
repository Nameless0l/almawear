"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import imageCompression from "browser-image-compression";
import { getAuthHeader } from "./AdminGuard";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

// Compresse l'image côté client (Web Worker, WebP) pour éviter les timeouts Vercel Hobby
async function compressImage(file: File): Promise<File> {
  // Pas de compression pour les très petits fichiers (< 200 Ko)
  if (file.size < 200 * 1024) return file;

  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,              // cible : 1 Mo max
      maxWidthOrHeight: 1600,    // dimension max (préserve le ratio)
      useWebWorker: true,        // ne bloque pas l'UI
      fileType: "image/webp",    // ~30% plus léger que JPEG à qualité égale
      initialQuality: 0.85,      // qualité visuelle haute
      preserveExif: false,       // supprime EXIF (poids + vie privée)
    });

    // Si la compression a grossi le fichier, on garde l'original
    if (compressed.size >= file.size) return file;

    // Renomme avec l'extension qui correspond au vrai type (webp)
    const renamed = new File(
      [compressed],
      file.name.replace(/\.[^.]+$/, "") + ".webp",
      { type: "image/webp", lastModified: Date.now() },
    );
    return renamed;
  } catch (e) {
    console.warn("[ImageUpload] Compression échouée, envoi de l'original :", e);
    return file;
  }
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(rawFile: File) {
    if (!rawFile.type.startsWith("image/")) {
      setError("Seules les images sont acceptées.");
      return;
    }
    if (rawFile.size > 20 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 20 Mo).");
      return;
    }

    setError("");
    setUploading(true);
    setProgress("Compression de l'image…");

    try {
      const file = await compressImage(rawFile);
      setProgress("Envoi…");

      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { authorization: getAuthHeader() },
        body: formData,
      });

      // Lecture sécurisée : si Vercel renvoie du HTML (504…), on évite le crash JSON
      const text = await res.text();
      let data: { url?: string; error?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(
          res.status === 504
            ? "Upload trop long — réduisez la taille de l'image"
            : `Erreur serveur (${res.status})`,
        );
      }
      if (!res.ok) throw new Error(data.error ?? `Erreur ${res.status}`);
      if (!data.url) throw new Error("URL d'image manquante");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
      setProgress("");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative aspect-[3/4] w-full max-w-[240px] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
          <Image src={value} alt="Aperçu" fill className="object-cover" sizes="240px" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[var(--color-border)] rounded-sm p-10 text-center cursor-pointer hover:border-[var(--color-accent)] transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
              <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-[family-name:var(--font-dm-sans)]">{progress || "Upload en cours…"}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]">
              <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] flex items-center justify-center">
                {uploading ? <Upload size={20} /> : <ImageIcon size={20} />}
              </div>
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm font-medium text-[var(--color-text)]">
                  Glissez une image ici
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs mt-1">
                  ou cliquez pour sélectionner · JPG, PNG · max 20 Mo
                </p>
                <p className="font-[family-name:var(--font-dm-sans)] text-[10px] mt-1 text-[var(--color-text-muted)]">
                  L'image sera automatiquement optimisée
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {error && (
        <p className="text-red-500 text-sm font-[family-name:var(--font-dm-sans)]">{error}</p>
      )}
    </div>
  );
}
