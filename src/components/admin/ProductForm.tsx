"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, Loader2 } from "lucide-react";
import { type Product } from "@/data/products";
import { ImageUpload } from "./ImageUpload";
import { getAuthHeader } from "./AdminGuard";
import { sortProductSizes } from "@/lib/sizes";

const PRESET_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Sur mesure"];
const CATEGORIES = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "accessoire", label: "Accessoire" },
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

interface ProductFormProps {
  initial?: Product;
  mode: "create" | "edit";
}

export function ProductForm({
  initial,
  mode,
}: Readonly<ProductFormProps>) {
  const router = useRouter();

  const [form, setForm] = useState<Omit<Product, "id" | "slug">>({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    price: initial?.price ?? 0,
    currency: "FCFA",
    category: initial?.category ?? "femme",
    colors: initial?.colors ?? [],
    sizes: sortProductSizes(initial?.sizes ?? []),
    images: initial?.images ?? [],
    featured: initial?.featured ?? false,
    isNew: initial?.isNew ?? true,
    material: initial?.material ?? "",
    careInstructions: initial?.careInstructions ?? "",
  });

  const [colorInput, setColorInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addColor() {
    const c = colorInput.trim();
    if (c && !form.colors.includes(c)) {
      set("colors", [...form.colors, c]);
      setColorInput("");
    }
  }

  function toggleSize(size: string) {
    const nextSizes = form.sizes.includes(size)
      ? form.sizes.filter((s) => s !== size)
      : [...form.sizes, size];

    set(
      "sizes",
      sortProductSizes(nextSizes)
    );
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    if (!form.name.trim()) {
      setFeedback({ type: "error", msg: "Le nom du produit est obligatoire." });
      return;
    }
    if (!form.images[0]) {
      setFeedback({ type: "error", msg: "Veuillez ajouter une image." });
      return;
    }

    setSaving(true);

    const product: Product = {
      ...form,
      sizes: sortProductSizes(form.sizes),
      id: initial?.id ?? `${Date.now()}`,
      slug: initial?.slug ?? slugify(form.name),
    };

    try {
      const url = mode === "edit" ? `/api/products/${product.id}` : "/api/products";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: getAuthHeader(),
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");

      setFeedback({ type: "success", msg: mode === "edit" ? "Produit mis à jour !" : "Produit créé !" });
      setTimeout(() => router.push("/admin/produits"), 1200);
    } catch (err) {
      setFeedback({
        type: "error",
        msg: err instanceof Error ? err.message : "Erreur inattendue",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left — text fields */}
      <div className="lg:col-span-2 space-y-6">
        {/* Name */}
        <Field label="Nom du produit *">
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Ex : Kaftan Ivoire & Or"
            className={inputCls}
          />
        </Field>

        {/* Description */}
        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            placeholder="Décrivez le produit, ses détails, l'occasion idéale…"
            className={inputCls}
          />
        </Field>

        {/* Price + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Prix (FCFA) *">
            <input
              type="number"
              min={0}
              value={form.price || ""}
              onChange={(e) => set("price", Number(e.target.value))}
              placeholder="45000"
              className={inputCls}
            />
          </Field>
          <Field label="Catégorie *">
            <select
              title="Catégorie du produit"
              value={form.category}
              onChange={(e) =>
                set("category", e.target.value as Product["category"])
              }
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Material + Care */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Matière">
            <input
              type="text"
              value={form.material}
              onChange={(e) => set("material", e.target.value)}
              placeholder="Ex : Satin de luxe"
              className={inputCls}
            />
          </Field>
          <Field label="Instructions d'entretien">
            <input
              type="text"
              value={form.careInstructions}
              onChange={(e) => set("careInstructions", e.target.value)}
              placeholder="Ex : Lavage à la main"
              className={inputCls}
            />
          </Field>
        </div>

        {/* Colors */}
        <Field label="Couleurs disponibles">
          <div className="flex gap-2 mb-2 flex-wrap">
            {form.colors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 bg-[var(--color-surface)] border border-[var(--color-border)] px-3 py-1 text-sm font-[family-name:var(--font-dm-sans)]"
              >
                {c}
                <button
                  type="button"
                  onClick={() => set("colors", form.colors.filter((x) => x !== c))}
                  aria-label={`Retirer la couleur ${c}`}
                  title={`Retirer la couleur ${c}`}
                  className="text-[var(--color-text-muted)] hover:text-red-500 ml-1"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addColor();
                }
              }}
              placeholder="Ex : Ivoire/Or — appuyer Entrée"
              className={`${inputCls} flex-1`}
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 border border-[var(--color-border)] text-sm font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-surface)] transition-colors"
            >
              Ajouter
            </button>
          </div>
        </Field>

        {/* Sizes */}
        <Field label="Tailles disponibles">
          <div className="flex flex-wrap gap-2">
            {PRESET_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 border text-sm font-[family-name:var(--font-dm-sans)] transition-all duration-150 ${
                  form.sizes.includes(size)
                    ? "bg-[var(--color-dark)] text-white border-[var(--color-dark)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </Field>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Toggle
            label="Mis en avant"
            sublabel="Affiché sur la page d'accueil"
            checked={form.featured}
            onChange={(v) => set("featured", v)}
          />
          <Toggle
            label="Nouveauté"
            sublabel="Badge « Nouveau » sur la carte"
            checked={form.isNew}
            onChange={(v) => set("isNew", v)}
          />
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`flex items-center gap-2 px-4 py-3 text-sm font-[family-name:var(--font-dm-sans)] ${
              feedback.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {feedback.type === "success" ? <Check size={16} /> : <X size={16} />}
            {feedback.msg}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-[var(--color-dark)] text-white px-6 sm:px-8 py-3 text-sm tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {mode === "edit" ? "Mettre à jour" : "Créer le produit"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/produits")}
            className="px-6 sm:px-8 py-3 text-sm tracking-widest uppercase font-[family-name:var(--font-dm-sans)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Right — image */}
      <div>
        <Field label="Photo du produit *">
          <ImageUpload
            value={form.images[0] ?? ""}
            onChange={(url) => set("images", url ? [url] : [])}
          />
        </Field>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <div>
      <label className="block text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  sublabel,
  checked,
  onChange,
}: Readonly<{
  label: string;
  sublabel: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}>) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex-1 border px-5 py-4 text-left transition-all duration-150 ${
        checked
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/8"
          : "border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium font-[family-name:var(--font-dm-sans)] text-[var(--color-text)]">
          {label}
        </span>
        <div
          className={`w-10 h-5 rounded-full transition-colors relative ${
            checked ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"
          }`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </div>
      </div>
      <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)]">
        {sublabel}
      </p>
    </button>
  );
}

const inputCls =
  "w-full px-4 py-3 border border-[var(--color-border)] bg-white text-[var(--color-text)] text-sm font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";
