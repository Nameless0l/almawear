"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Link as LinkIcon, Copy, Check } from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const PRESETS = [
  { label: "Page d'accueil", path: "/" },
  { label: "Toutes les collections", path: "/collections" },
  { label: "À propos", path: "/a-propos" },
  { label: "Contact", path: "/contact" },
];

export default function QRCodePage() {
  const [origin, setOrigin] = useState("https://almawear.vercel.app");
  const [path, setPath] = useState("/collections");
  const [size, setSize] = useState(512);
  const [copied, setCopied] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Détecte automatiquement l'URL du site dès que la page est rendue côté client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const fullUrl = `${origin.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  function downloadPNG() {
    const canvas = canvasContainerRef.current?.querySelector("canvas");
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName = `alma-wear-qr-${path.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "") || "home"}.png`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <AdminGuard>
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-28 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-[var(--color-text)]">
              QR Code
            </h1>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] mt-1">
              Générez un QR Code pour rediriger vers une page du site. À imprimer sur les flyers, cartes de visite ou affiches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Aperçu QR */}
            <section className="bg-white border border-[var(--color-border)] p-6 flex flex-col items-center">
              <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
                Aperçu
              </p>
              <div
                ref={canvasContainerRef}
                className="bg-white p-4 border border-[var(--color-border)]"
              >
                <QRCodeCanvas
                  value={fullUrl}
                  size={size}
                  level="H"
                  marginSize={2}
                  fgColor="#1a1714"
                  bgColor="#ffffff"
                />
              </div>

              <button
                type="button"
                onClick={downloadPNG}
                className="mt-6 flex items-center gap-2 bg-[var(--color-dark)] text-white px-6 py-3 text-xs tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-accent)] transition-colors"
              >
                <Download size={14} />
                Télécharger en PNG ({size}×{size})
              </button>

              <p className="font-[family-name:var(--font-dm-sans)] text-[11px] text-[var(--color-text-muted)] mt-3 text-center max-w-xs">
                Le PNG est généré en haute résolution avec correction d&apos;erreur niveau H (30%) — fonctionne même partiellement abîmé.
              </p>
            </section>

            {/* Configuration */}
            <section className="bg-white border border-[var(--color-border)] p-6 space-y-6">
              <div>
                <p className="font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Page de destination
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setPath(preset.path)}
                      className={`px-3 py-2 text-xs font-[family-name:var(--font-dm-sans)] border transition-all ${
                        path === preset.path
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-text)]"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Domaine
                </label>
                <input
                  type="url"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="https://almawear.vercel.app"
                  className="w-full px-3 py-2 border border-[var(--color-border)] bg-white text-sm font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Chemin (path)
                </label>
                <input
                  type="text"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="/collections"
                  className="w-full px-3 py-2 border border-[var(--color-border)] bg-white text-sm font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-dm-sans)] text-xs uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  Taille du PNG : {size} px
                </label>
                <input
                  type="range"
                  min={256}
                  max={2048}
                  step={128}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-[var(--color-accent)]"
                />
                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] mt-1">
                  <span>256 px (web)</span>
                  <span>2048 px (impression)</span>
                </div>
              </div>

              {/* URL complète */}
              <div className="border-t border-[var(--color-border)] pt-4">
                <p className="font-[family-name:var(--font-dm-sans)] text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-2 flex items-center gap-1">
                  <LinkIcon size={11} />
                  URL générée
                </p>
                <div className="flex items-center gap-2 bg-[var(--color-surface)] px-3 py-2 border border-[var(--color-border)]">
                  <code className="flex-1 text-xs text-[var(--color-text)] font-[family-name:var(--font-dm-sans)] break-all">
                    {fullUrl}
                  </code>
                  <button
                    type="button"
                    onClick={copyUrl}
                    className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                    aria-label="Copier"
                  >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Conseils impression */}
          <section className="mt-8 bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
            <h2 className="font-[family-name:var(--font-dm-sans)] font-medium text-[var(--color-text)] mb-3">
              Conseils d&apos;impression
            </h2>
            <ul className="space-y-2 font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)]">
              <li>• <strong>Taille minimum d&apos;impression</strong> : 2 × 2 cm (le QR doit rester scannable)</li>
              <li>• <strong>Carte de visite</strong> : 2.5 × 2.5 cm, choisir 1024 px</li>
              <li>• <strong>Flyer / packaging</strong> : 4 × 4 cm, choisir 1024–2048 px</li>
              <li>• <strong>Affiche</strong> : 8 × 8 cm minimum, choisir 2048 px</li>
              <li>• <strong>Contraste</strong> : toujours sur fond clair (le code reste lisible même imprimé sur kraft beige)</li>
              <li>• <strong>Tester</strong> avant la grosse commande : scanner depuis 2 téléphones différents (iOS + Android)</li>
            </ul>
          </section>
        </div>
      </main>
    </AdminGuard>
  );
}
