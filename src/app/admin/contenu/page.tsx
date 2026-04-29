"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, Check, AlertCircle, Loader2, Info, ImageIcon, Save } from "lucide-react";
import { AdminGuard, getAuthHeader } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ContentImageUpload } from "@/components/admin/ContentImageUpload";
import { BilingualField } from "@/components/admin/BilingualField";
import { uploadImageToBlob } from "@/lib/image-compression";
import {
  type SiteSettings,
  defaultSettings,
} from "@/lib/settings-data";

type Feedback = { type: "success" | "error"; msg: string };

export default function AdminContent() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [uploading, setUploading] = useState(false);
  const lookbookInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setSettings(data))
      .finally(() => setLoading(false));
  }, []);

  async function save(next: SiteSettings) {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", authorization: getAuthHeader() },
        body: JSON.stringify(next),
      });
      const text = await res.text();
      let data: { error?: string } = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Erreur serveur (${res.status})`);
      }
      if (!res.ok) throw new Error(data.error ?? "Erreur de sauvegarde");
      setFeedback({ type: "success", msg: "Modifications enregistrées !" });
      setTimeout(() => setFeedback(null), 3000);
    } catch (e) {
      setFeedback({
        type: "error",
        msg: e instanceof Error ? e.message : "Erreur",
      });
    } finally {
      setSaving(false);
    }
  }

  // ── LOOKBOOK ──────────────────────────────────────────────────────────────

  async function handleAddLookbook(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    const urls: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const url = await uploadImageToBlob(file, getAuthHeader());
        urls.push(url);
      }
    } catch (e) {
      setFeedback({
        type: "error",
        msg: e instanceof Error ? e.message : "Échec de l'upload",
      });
      setUploading(false);
      return;
    }
    setUploading(false);
    if (urls.length === 0) return;

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

  // ── HELPERS POUR MAJ + SAUVEGARDE ────────────────────────────────────────

  function updateAndSave(next: SiteSettings) {
    setSettings(next);
    return save(next);
  }

  // Pour les champs texte : on attend que l'user clique "Enregistrer la section"
  // pour limiter les writes Blob (1 par modification serait excessif)
  function updateLocal(next: SiteSettings) {
    setSettings(next);
  }

  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-28 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
              Gestion du contenu
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
              Modifiez les images et textes affichés sur le site public.
            </p>
          </div>

          {/* Feedback global */}
          {feedback && (
            <div
              className={`flex items-center gap-2 px-4 py-3 text-sm font-[family-name:var(--font-dm-sans)] sticky top-4 z-10 ${
                feedback.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
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
              {/* ──── HERO (PAGE D'ACCUEIL) ──────────────────────────── */}
              <Section title="Hero — Page d'accueil" saving={saving}>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-5 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Image en plein écran sur la page d&apos;accueil. Format paysage 16:9 recommandé.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ContentImageUpload
                    label="Image de fond"
                    value={settings.hero.image}
                    aspectRatio="16/9"
                    recommendedSize="1920 × 1080 px"
                    hint="Photo lifestyle pleine largeur. Le texte sera affiché par-dessus."
                    onChange={async (url) => {
                      await updateAndSave({
                        ...settings,
                        hero: { ...settings.hero, image: url },
                      });
                    }}
                  />

                  <div className="space-y-4">
                    <BilingualField
                      label="Petite ligne (au-dessus du titre)"
                      value={settings.hero.location}
                      onChange={(v) =>
                        updateLocal({
                          ...settings,
                          hero: { ...settings.hero, location: v },
                        })
                      }
                      placeholderFr="Douala, Cameroun"
                      placeholderEn="Douala, Cameroon"
                      hint="Laissez vide pour utiliser la valeur par défaut"
                    />
                    <BilingualField
                      label="Titre principal (en italique)"
                      value={settings.hero.title}
                      onChange={(v) =>
                        updateLocal({
                          ...settings,
                          hero: { ...settings.hero, title: v },
                        })
                      }
                      placeholderFr="L'élégance à l'africaine"
                      placeholderEn="African elegance"
                    />
                    <BilingualField
                      label="Sous-titre"
                      value={settings.hero.subtitle}
                      onChange={(v) =>
                        updateLocal({
                          ...settings,
                          hero: { ...settings.hero, subtitle: v },
                        })
                      }
                      rows={2}
                      placeholderFr="Des créations uniques…"
                      placeholderEn="Unique creations…"
                    />
                    <SaveButton onClick={() => save(settings)} disabled={saving} />
                  </div>
                </div>
              </Section>

              {/* ──── SECTION HISTOIRE (HOME) ──────────────────────────── */}
              <Section title="Notre Histoire — Page d'accueil" saving={saving}>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-5 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Section qui présente la marque sur la page d&apos;accueil (image + texte).
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ContentImageUpload
                    label="Image de la section"
                    value={settings.brandStory.image}
                    aspectRatio="4/5"
                    recommendedSize="1200 × 1500 px"
                    hint="Format portrait. Photo lifestyle, atelier ou détail textile."
                    onChange={async (url) => {
                      await updateAndSave({
                        ...settings,
                        brandStory: { ...settings.brandStory, image: url },
                      });
                    }}
                  />

                  <div className="space-y-4">
                    <BilingualField
                      label="Sous-titre (au-dessus du titre)"
                      value={settings.brandStory.subtitle}
                      onChange={(v) =>
                        updateLocal({
                          ...settings,
                          brandStory: { ...settings.brandStory, subtitle: v },
                        })
                      }
                      placeholderFr="Notre Histoire"
                      placeholderEn="Our Story"
                    />
                    <BilingualField
                      label="Titre — partie 1"
                      value={settings.brandStory.title1}
                      onChange={(v) =>
                        updateLocal({
                          ...settings,
                          brandStory: { ...settings.brandStory, title1: v },
                        })
                      }
                      placeholderFr="La puissance de la mode"
                    />
                    <BilingualField
                      label="Titre — partie 2 (en italique)"
                      value={settings.brandStory.title2}
                      onChange={(v) =>
                        updateLocal({
                          ...settings,
                          brandStory: { ...settings.brandStory, title2: v },
                        })
                      }
                      placeholderFr="africaine"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <BilingualField
                    label="Paragraphe 1"
                    value={settings.brandStory.p1}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        brandStory: { ...settings.brandStory, p1: v },
                      })
                    }
                    rows={4}
                  />
                  <BilingualField
                    label="Paragraphe 2"
                    value={settings.brandStory.p2}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        brandStory: { ...settings.brandStory, p2: v },
                      })
                    }
                    rows={4}
                  />
                  <BilingualField
                    label="Citation"
                    value={settings.brandStory.quote}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        brandStory: { ...settings.brandStory, quote: v },
                      })
                    }
                    rows={2}
                  />
                  <BilingualField
                    label="Auteur de la citation"
                    value={settings.brandStory.author}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        brandStory: { ...settings.brandStory, author: v },
                      })
                    }
                    placeholderFr="— Fondatrice, Alma Wear"
                  />
                  <SaveButton onClick={() => save(settings)} disabled={saving} />
                </div>
              </Section>

              {/* ──── PAGE À PROPOS ──────────────────────────────────── */}
              <Section title="Page À Propos" saving={saving}>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-5 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Contenu de la page <code className="bg-[var(--color-surface)] px-1 text-xs">/a-propos</code>.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <ContentImageUpload
                    label="Image de la bannière (haut de page)"
                    value={settings.aboutPage.heroImage}
                    aspectRatio="16/9"
                    recommendedSize="1920 × 1080 px"
                    hint="Bannière en haut de la page À Propos. Format paysage."
                    onChange={async (url) => {
                      await updateAndSave({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, heroImage: url },
                      });
                    }}
                  />
                  <ContentImageUpload
                    label="Image de la fondatrice / atelier"
                    value={settings.aboutPage.storyImage}
                    aspectRatio="4/5"
                    recommendedSize="1200 × 1500 px"
                    hint="Format portrait. Photo de la fondatrice ou de l'atelier."
                    onChange={async (url) => {
                      await updateAndSave({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, storyImage: url },
                      });
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <BilingualField
                    label="Sous-titre de la bannière"
                    value={settings.aboutPage.subtitle}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, subtitle: v },
                      })
                    }
                    placeholderFr="Notre Histoire"
                  />
                  <BilingualField
                    label="Titre de la bannière (en italique)"
                    value={settings.aboutPage.title}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, title: v },
                      })
                    }
                    placeholderFr="L'âme d'Alma"
                  />
                  <BilingualField
                    label="Titre histoire — partie 1"
                    value={settings.aboutPage.storyTitle1}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, storyTitle1: v },
                      })
                    }
                  />
                  <BilingualField
                    label="Titre histoire — partie 2 (en italique)"
                    value={settings.aboutPage.storyTitle2}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, storyTitle2: v },
                      })
                    }
                  />
                  <BilingualField
                    label="Paragraphe 1"
                    value={settings.aboutPage.p1}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, p1: v },
                      })
                    }
                    rows={4}
                  />
                  <BilingualField
                    label="Paragraphe 2"
                    value={settings.aboutPage.p2}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, p2: v },
                      })
                    }
                    rows={4}
                  />
                  <BilingualField
                    label="Citation"
                    value={settings.aboutPage.quote}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, quote: v },
                      })
                    }
                    rows={2}
                  />
                  <BilingualField
                    label="Auteur de la citation"
                    value={settings.aboutPage.author}
                    onChange={(v) =>
                      updateLocal({
                        ...settings,
                        aboutPage: { ...settings.aboutPage, author: v },
                      })
                    }
                  />
                  <SaveButton onClick={() => save(settings)} disabled={saving} />
                </div>
              </Section>

              {/* ──── COLLECTION IMAGES ────────────────────────────── */}
              <Section title="Tuiles Collections — Page d'accueil" saving={saving}>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-5 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Les 3 tuiles de la section &quot;Nos Collections&quot;. Format paysage.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["femme", "homme", "accessoire"] as const).map((key) => (
                    <ContentImageUpload
                      key={key}
                      label={key === "accessoire" ? "Accessoires" : key.charAt(0).toUpperCase() + key.slice(1)}
                      value={settings.collectionImages[key]}
                      aspectRatio="4/3"
                      recommendedSize="1200 × 900 px"
                      onChange={async (url) => {
                        await updateAndSave({
                          ...settings,
                          collectionImages: { ...settings.collectionImages, [key]: url },
                        });
                      }}
                    />
                  ))}
                </div>
              </Section>

              {/* ──── LOOKBOOK ──────────────────────────────────────── */}
              <Section title="Lookbook — Page d'accueil" saving={saving}>
                <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mb-5 flex items-start gap-1.5">
                  <Info size={14} className="shrink-0 mt-0.5" />
                  Galerie en mosaïque. Format portrait 3:4 (1200 × 1600 px).
                  La 1ère photo s&apos;affiche en grand.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                  {settings.lookbook.map((img, i) => (
                    <div
                      key={i}
                      className="relative group aspect-[3/4] bg-[var(--color-surface)] overflow-hidden border border-[var(--color-border)]"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="200px"
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
                          Ajouter
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
              </Section>
            </>
          )}
        </div>
      </main>
    </AdminGuard>
  );
}

// ── COMPOSANTS UI INTERNES ────────────────────────────────────────────────

function Section({
  title,
  saving,
  children,
}: {
  title: string;
  saving: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-[var(--color-border)] p-6">
      <div className="flex items-start justify-between mb-3">
        <h2 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)] text-lg">
          {title}
        </h2>
        {saving && <Loader2 size={16} className="text-[var(--color-accent)] animate-spin" />}
      </div>
      {children}
    </section>
  );
}

function SaveButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-[var(--color-dark)] text-white px-5 py-2.5 text-xs tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50 mt-2"
    >
      {disabled ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
      Enregistrer la section
    </button>
  );
}

