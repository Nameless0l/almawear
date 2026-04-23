"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, ImageIcon, Check, AlertCircle, Loader2, Info } from "lucide-react";
import { AdminGuard, getAuthHeader } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { type SiteSettings, defaultSettings } from "@/lib/settings-data";

type Feedback = { type: "success" | "error"; msg: string };

export default function AdminContent() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [uploading, setUploading] = useState(false);
  const lookbookInputRef = useRef<HTMLInputElement>(null);
  const femmeInputRef    = useRef<HTMLInputElement>(null);
  const hommeInputRef    = useRef<HTMLInputElement>(null);
  const accessoireInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  async function uploadImage(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { authorization: getAuthHeader() },
      body: formData,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  }

  async function save(next: SiteSettings) {
    setSaving(true);
    setFeedback(null);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: getAuthHeader() },
      body: JSON.stringify(next),
    });
    setSaving(false);
    if (res.ok) {
      setFeedback({ type: "success", msg: "Modifications enregistrées !" });
      setTimeout(() => setFeedback(null), 3000);
    } else {
      const d = await res.json();
      setFeedback({ type: "error", msg: d.error ?? "Erreur de sauvegarde" });
    }
  }

  // ── LOOKBOOK ──────────────────────────────────────────────────────────────

  async function handleAddLookbook(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file);
      if (url) urls.push(url);
    }
    setUploading(false);
    if (urls.length === 0) {
      setFeedback({ type: "error", msg: "Échec de l'upload. Vérifiez la connexion." });
      return;
    }
    const next: SiteSettings = {
      ...settings,
      lookbook: [
        ...settings.lookbook,
        ...urls.map((url, i) => ({
          url,
          alt: `Lookbook ${settings.lookbook.length + i + 1}`,
          span: "",
        })),
      ],
    };
    setSettings(next);
    await save(next);
  }

  function removeLookbook(index: number) {
    const next: SiteSettings = {
      ...settings,
      lookbook: settings.lookbook.filter((_, i) => i !== index),
    };
    setSettings(next);
    save(next);
  }

  // ── COLLECTION IMAGES ────────────────────────────────────────────────────

  async function handleCollectionImage(key: keyof SiteSettings["collectionImages"], file: File) {
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (!url) {
      setFeedback({ type: "error", msg: "Échec de l'upload." });
      return;
    }
    const next: SiteSettings = {
      ...settings,
      collectionImages: { ...settings.collectionImages, [key]: url },
    };
    setSettings(next);
    await save(next);
  }

  const collectionCards = [
    { key: "femme" as const,      label: "Femme",       ref: femmeInputRef },
    { key: "homme" as const,      label: "Homme",       ref: hommeInputRef },
    { key: "accessoire" as const, label: "Accessoires", ref: accessoireInputRef },
  ];

  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
              Gestion du contenu
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
              Lookbook et images des collections visibles sur la page d&apos;accueil.
            </p>
          </div>

          {/* Feedback global */}
          {feedback && (
            <div className={`flex items-center gap-2 px-4 py-3 text-sm font-[family-name:var(--font-dm-sans)] ${
              feedback.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {feedback.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
              {feedback.msg}
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] text-sm">
              <div className="w-4 h-4 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
              Chargement…
            </div>
          ) : (
            <>
              {/* ── LOOKBOOK ─────────────────────────────────────── */}
              <section className="bg-white border border-[var(--color-border)] p-6">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                    Photos du Lookbook
                  </h2>
                  {saving && <Loader2 size={16} className="text-[var(--color-accent)] animate-spin" />}
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-5 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  La 1ère photo s&apos;affiche en grand, les autres en format standard.
                  Cliquez la croix pour supprimer une photo.
                </p>

                {/* Grid of current images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                  {settings.lookbook.map((img, i) => (
                    <div key={i} className="relative group aspect-[3/4] bg-[var(--color-surface)] overflow-hidden">
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 bg-[var(--color-accent)] text-white text-[10px] px-1.5 py-0.5 font-[family-name:var(--font-dm-sans)] uppercase tracking-wider">
                          Grande
                        </span>
                      )}
                      <button
                        onClick={() => removeLookbook(i)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Supprimer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  {/* Upload zone */}
                  <button
                    type="button"
                    onClick={() => lookbookInputRef.current?.click()}
                    disabled={uploading}
                    className="aspect-[3/4] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <ImageIcon size={20} />
                        <span className="text-xs font-[family-name:var(--font-dm-sans)] text-center px-2">
                          Ajouter une photo
                        </span>
                      </>
                    )}
                  </button>
                </div>

                <input
                  ref={lookbookInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleAddLookbook(e.target.files)}
                />
              </section>

              {/* ── COLLECTION IMAGES ───────────────────────────── */}
              <section className="bg-white border border-[var(--color-border)] p-6">
                <div className="flex items-start justify-between mb-1">
                  <h2 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)]">
                    Images des collections
                  </h2>
                  {saving && <Loader2 size={16} className="text-[var(--color-accent)] animate-spin" />}
                </div>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-6 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Ces images illustrent les 3 tuiles de la section &quot;Nos Collections&quot; sur l&apos;accueil.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {collectionCards.map(({ key, label, ref }) => (
                    <div key={key} className="space-y-3">
                      <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
                        {label}
                      </p>
                      <div className="relative aspect-[4/3] bg-[var(--color-surface)] overflow-hidden">
                        <Image
                          src={settings.collectionImages[key]}
                          alt={label}
                          fill
                          className="object-cover"
                          sizes="250px"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => ref.current?.click()}
                            disabled={uploading}
                            className="flex items-center gap-2 bg-white text-[var(--color-text)] px-3 py-2 text-xs font-[family-name:var(--font-dm-sans)] uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                          >
                            <Upload size={12} />
                            Changer
                          </button>
                        </div>
                      </div>
                      <input
                        ref={ref}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleCollectionImage(key, file);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}
