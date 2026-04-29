"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Loader2, Info } from "lucide-react";
import { uploadImageToBlob } from "@/lib/image-compression";
import { getAuthHeader } from "./AdminGuard";

interface ContentImageUploadProps {
  value: string;
  onChange: (url: string) => Promise<void> | void;
  label: string;
  /** Aspect ratio CSS (ex: "16/9", "3/4", "4/5"). Détermine la forme de l'aperçu. */
  aspectRatio?: string;
  /** Dimensions recommandées affichées sous l'aperçu (ex: "1920 × 1080 px"). */
  recommendedSize?: string;
  /** Description courte du rôle de l'image. */
  hint?: string;
}

export function ContentImageUpload({
  value,
  onChange,
  label,
  aspectRatio = "16/9",
  recommendedSize,
  hint,
}: ContentImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Seules les images sont acceptées.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 20 Mo).");
      return;
    }

    setError("");
    setUploading(true);
    setProgress("Compression…");

    try {
      const url = await uploadImageToBlob(file, getAuthHeader());
      setProgress("Sauvegarde…");
      await onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
      setProgress("");
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
          {label}
        </p>
        {recommendedSize && (
          <p className="font-[family-name:var(--font-dm-sans)] text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
            <Info size={10} />
            {recommendedSize}
          </p>
        )}
      </div>

      <div
        className="relative bg-[var(--color-surface)] overflow-hidden border border-[var(--color-border)] group"
        style={{ aspectRatio }}
      >
        {value ? (
          <Image
            src={value}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] text-xs font-[family-name:var(--font-dm-sans)]">
            Aucune image
          </div>
        )}

        {/* Overlay avec bouton */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-white text-[var(--color-text)] px-4 py-2 text-xs font-[family-name:var(--font-dm-sans)] uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-white transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                {progress || "…"}
              </>
            ) : (
              <>
                <Upload size={12} />
                Changer l&apos;image
              </>
            )}
          </button>
        </div>
      </div>

      {hint && (
        <p className="font-[family-name:var(--font-dm-sans)] text-xs text-[var(--color-text-muted)] flex items-start gap-1">
          <Info size={11} className="shrink-0 mt-0.5" />
          {hint}
        </p>
      )}

      {error && (
        <p className="text-red-500 text-xs font-[family-name:var(--font-dm-sans)]">{error}</p>
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
    </div>
  );
}
