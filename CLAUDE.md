## 🎯 Vue d'ensemble du projet

Tu construis le site officiel de **Alma Wear**, une marque de mode féminine haut de gamme basée à **Douala, Cameroun**. La marque propose des **boubous, kaftans et tenues africaines contemporaines** confectionnés à la main, avec un style épuré, élégant et moderne.

Le site est à la fois un **site vitrine** (présentation de la marque, lookbook) et un **catalogue e-commerce** (présentation des produits avec possibilité de commander via WhatsApp).

---

## 🛠️ Stack technique

- **Framework** : Next.js 14+ (App Router)
- **Styling** : Tailwind CSS v3
- **Fonts** : Google Fonts — `Cormorant Garamond` (titres élégants) + `DM Sans` (corps de texte)
- **Images** : `next/image` avec optimisation automatique
- **Animations** : Framer Motion pour les transitions et reveals
- **Icônes** : `lucide-react`
- **Formulaire / Contact** : Lien WhatsApp direct (pas de backend nécessaire)
- **Déploiement** : Vercel (configuration incluse)

### Installation initiale

```bash
npx create-next-app@latest alma-wear --typescript --tailwind --eslint --app --src-dir
cd alma-wear
npm install framer-motion lucide-react
```

---

## 🎨 Design System & Identité visuelle

### Palette de couleurs (CSS Variables dans `globals.css`)

```css
:root {
  --color-bg: #fafaf8; /* Fond principal : blanc cassé chaud */
  --color-surface: #f2f0ec; /* Fond sections alternées : crème */
  --color-text: #1a1714; /* Texte principal : noir profond */
  --color-text-muted: #7a7570; /* Texte secondaire : gris chaud */
  --color-accent: #c4a882; /* Accent doré sable */
  --color-border: #e5e1da; /* Bordures légères */
  --color-white: #ffffff;
  --color-dark: #0f0d0c; /* Sections sombres */
}
```

### Typographie (dans `tailwind.config.ts`)

```ts
fontFamily: {
  display: ['Cormorant Garamond', 'serif'],   // Pour H1, H2, citations
  body: ['DM Sans', 'sans-serif'],             // Pour le texte courant
}
```

Dans `layout.tsx`, importer depuis Google Fonts :

```tsx
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});
```

### Règles de design

- **Espacement** : Généreux. Beaucoup d'air blanc. Ne jamais surcharger.
- **Titres** : Toujours en `font-display`, légers (font-weight 300 ou 400), souvent en italique pour les sous-titres.
- **Pas de couleurs vives**. La marque vit dans le beige, le blanc, le gris perle, et l'or sable.
- **Images** : toujours en grand format, plein écran ou demi-écran.
- **Boutons** : sobres, bords fins, jamais de coins très arrondis (max `rounded-sm`).

---

## 📁 Structure des fichiers

```
src/
├── app/
│   ├── layout.tsx              # Layout global (Navbar + Footer + fonts)
│   ├── page.tsx                # Page d'accueil
│   ├── collections/
│   │   └── page.tsx            # Toutes les collections
│   ├── produits/
│   │   └── [slug]/
│   │       └── page.tsx        # Page détail produit
│   ├── a-propos/
│   │   └── page.tsx            # Page À propos
│   └── contact/
│       └── page.tsx            # Page Contact
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── BrandStory.tsx
│   │   ├── Lookbook.tsx
│   │   └── WhatsAppBanner.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductDetail.tsx
│   └── ui/
│       ├── WhatsAppButton.tsx  # Bouton flottant WhatsApp
│       ├── AnimatedSection.tsx # Wrapper Framer Motion
│       └── ImageGallery.tsx
├── data/
│   └── products.ts             # Données des produits (JSON statique)
├── lib/
│   └── whatsapp.ts             # Helper pour liens WhatsApp
└── public/
    └── images/
        ├── logo.png
        ├── hero/
        └── products/
```

---

## 📦 Données produits (`src/data/products.ts`)

Créer ce fichier avec la structure suivante. Les données sont **statiques** (pas de base de données) :

```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // Prix en FCFA
  currency: string; // "FCFA"
  category: "boubou" | "kaftan" | "ensemble" | "accessoire";
  colors: string[]; // Ex: ["Blanc/Gris", "Rose/Bleu"]
  sizes: string[]; // ["S", "M", "L", "XL", "Sur mesure"]
  images: string[]; // Chemins dans /public/images/products/
  featured: boolean;
  isNew: boolean;
  material: string; // Ex: "Satin de luxe"
  careInstructions: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "kaftan-blanc-gris",
    name: "Kaftan Bicolore Blanc & Gris",
    description:
      "Un kaftan élégant en satin de luxe, à découpe géométrique moderne. Parfait pour les cérémonies et les sorties sophistiquées.",
    price: 45000,
    currency: "FCFA",
    category: "kaftan",
    colors: ["Blanc/Gris"],
    sizes: ["S", "M", "L", "XL", "Sur mesure"],
    images: ["/images/products/kaftan-blanc-gris-1.jpg"],
    featured: true,
    isNew: true,
    material: "Satin de luxe",
    careInstructions: "Lavage à la main recommandé",
  },
  {
    id: "2",
    slug: "kaftan-rose-bleu",
    name: "Kaftan Tricolore Rose & Bleu",
    description:
      "Un kaftan fluide aux teintes pastel délicates, idéal pour les journées ensoleillées et les événements estivaux.",
    price: 48000,
    currency: "FCFA",
    category: "kaftan",
    colors: ["Rose/Bleu/Blanc"],
    sizes: ["S", "M", "L", "XL", "Sur mesure"],
    images: ["/images/products/kaftan-rose-bleu-1.jpg"],
    featured: true,
    isNew: true,
    material: "Satin de luxe",
    careInstructions: "Lavage à la main recommandé",
  },
  // Ajouter d'autres produits ici...
];

export const categories = [
  { label: "Tous", value: "all" },
  { label: "Kaftans", value: "kaftan" },
  { label: "Boubous", value: "boubou" },
  { label: "Ensembles", value: "ensemble" },
  { label: "Accessoires", value: "accessoire" },
];
```

---

## 📱 Intégration WhatsApp (`src/lib/whatsapp.ts`)

```ts
const WHATSAPP_NUMBER = "+237XXXXXXXXX"; // Remplacer par le vrai numéro

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encoded}`;
}

export function getProductOrderLink(
  productName: string,
  size?: string,
  color?: string,
): string {
  const message = `Bonjour Alma Wear ! 👋\n\nJe suis intéressé(e) par :\n*${productName}*${size ? `\nTaille : ${size}` : ""}${color ? `\nCouleur : ${color}` : ""}\n\nPourriez-vous me donner plus d'informations ? Merci 🌸`;
  return getWhatsAppLink(message);
}

export function getGeneralContactLink(): string {
  const message = `Bonjour Alma Wear ! 👋\n\nJe souhaite en savoir plus sur vos créations. Merci !`;
  return getWhatsAppLink(message);
}
```

---

## 🏠 Page d'accueil (`src/app/page.tsx`)

La page d'accueil doit contenir ces sections dans cet ordre :

### 1. HeroSection

- Image plein écran en fond (photo de la collection principale)
- Titre centré en grand `font-display` : _"L'élégance à l'africaine"_
- Sous-titre léger en italique
- Deux boutons : `Découvrir la collection` + `Nous contacter sur WhatsApp`
- Animation : fade-in avec Framer Motion au chargement

```tsx
// Exemple de structure HeroSection
export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/hero/hero-main.jpg"
        fill
        alt="Alma Wear"
        className="object-cover object-top"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <motion.p className="font-body tracking-[0.3em] uppercase text-sm mb-4 opacity-80">
          Douala, Cameroun
        </motion.p>
        <motion.h1 className="font-display text-6xl md:text-8xl font-light italic mb-6">
          L'élégance à l'africaine
        </motion.h1>
        <motion.p className="font-body text-lg font-light mb-10 max-w-md">
          Des créations uniques, confectionnées avec soin pour la femme moderne
        </motion.p>
        {/* Boutons */}
      </div>
    </section>
  );
}
```

### 2. FeaturedProducts

- Titre de section : _"Nos Créations"_
- Grille 2 colonnes sur mobile, 3 sur desktop
- Afficher uniquement les produits avec `featured: true`
- Chaque carte : image, nom, prix en FCFA, bouton Commander

### 3. BrandStory

- Section fond sombre (`var(--color-dark)`) ou crème
- Photo de la créatrice à gauche, texte à droite (layout 50/50)
- Texte : histoire de la marque, valeurs, artisanat camerounais
- Citation en italique : _"Chaque pièce raconte une histoire..."_

### 4. Lookbook / Galerie

- Grille de photos en mosaïque asymétrique (Masonry-like avec CSS grid)
- 6 à 8 photos de la collection
- Effet hover avec légère mise à l'échelle

### 5. WhatsAppBanner

- Bandeau pleine largeur fond sable/accent
- Texte : _"Commandez directement via WhatsApp ou posez-nous vos questions"_
- Gros bouton vert WhatsApp

### 6. Footer

- Logo centré
- Liens : Accueil, Collections, À propos, Contact
- Réseaux sociaux : Instagram, Facebook
- Mentions : _"Basée à Douala, Cameroun"_
- Copyright

---

## 🧩 Composants clés à générer

### `WhatsAppButton.tsx` — Bouton flottant persistant

```tsx
"use client";
import { MessageCircle } from "lucide-react";
import { getGeneralContactLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  return (
    <a
      href={getGeneralContactLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BD5C] transition-all duration-300 hover:scale-105 font-body font-medium text-sm"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
```

### `ProductCard.tsx`

```tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { getProductOrderLink } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative overflow-hidden">
      {/* Badge Nouveau */}
      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 bg-[var(--color-dark)] text-white text-xs tracking-widest uppercase px-3 py-1 font-body">
          Nouveau
        </span>
      )}

      {/* Image avec hover effect */}
      <Link
        href={`/produits/${product.slug}`}
        className="block relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Infos produit */}
      <div className="pt-4 pb-6">
        <Link href={`/produits/${product.slug}`}>
          <h3 className="font-display text-lg font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-[var(--color-text-muted)] text-sm mt-1">
          {product.material}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-body font-medium text-[var(--color-text)]">
            {product.price.toLocaleString("fr-FR")} {product.currency}
          </span>
          <a
            href={getProductOrderLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs tracking-widest uppercase border border-[var(--color-text)] px-4 py-2 hover:bg-[var(--color-text)] hover:text-white transition-all duration-200"
          >
            Commander
          </a>
        </div>
      </div>
    </article>
  );
}
```

### `Navbar.tsx`

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/collections", label: "Collections" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative w-24 h-12">
          <Image
            src="/images/logo.png"
            alt="Alma Wear"
            fill
            className="object-contain"
          />
        </Link>

        {/* Navigation desktop */}
        <ul className="hidden md:flex gap-8 font-body text-sm tracking-widest uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-[var(--color-accent)] ${scrolled ? "text-[var(--color-text)]" : "text-white"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menu burger mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu
              size={24}
              className={scrolled ? "text-[var(--color-text)]" : "text-white"}
            />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] px-6 py-6">
          <ul className="flex flex-col gap-6 font-body text-sm tracking-widest uppercase">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--color-text)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
```

---

## 📄 Pages à créer

### `/collections` — Catalogue complet

- Filtres par catégorie (Tous / Kaftans / Boubous / Ensembles)
- Grille de produits avec `ProductCard`
- Filtre actif souligné, pas de boutons massifs
- Animation de transition lors du filtrage (Framer Motion `AnimatePresence`)

### `/produits/[slug]` — Détail produit

- Grande image principale à gauche (60% de la page sur desktop)
- Infos à droite : nom, prix, description, matière, tailles disponibles
- Sélecteur de taille (boutons texte simples)
- Bouton **Commander sur WhatsApp** (gros, pleine largeur)
- Message WhatsApp pré-rempli avec le nom du produit et la taille choisie
- Section "Vous aimerez aussi" avec 3-4 produits similaires

### `/a-propos` — À propos

- Hero : grande photo de la créatrice ou de l'atelier
- Histoire de la marque (paragraphes, pas de listes)
- Valeurs : Artisanat / Élégance / Modernité (3 colonnes simples avec icônes fines)
- Localisation : _"Basée au cœur de Douala, Cameroun"_
- Galerie de l'atelier (petite mosaïque)

### `/contact` — Contact

- Pas de formulaire complexe
- Afficher clairement le numéro WhatsApp avec un gros bouton vert
- Email de contact (si disponible)
- Texte : _"Nous répondons généralement dans les 24h"_
- Horaires d'ouverture
- Carte ou mention de la ville

---

## ⚙️ Configuration Tailwind (`tailwind.config.ts`)

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        "alma-bg": "#FAFAF8",
        "alma-surface": "#F2F0EC",
        "alma-text": "#1A1714",
        "alma-muted": "#7A7570",
        "alma-accent": "#C4A882",
        "alma-border": "#E5E1DA",
        "alma-dark": "#0F0D0C",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 🌐 SEO & Metadata (`src/app/layout.tsx`)

```tsx
export const metadata = {
  title: {
    default: "Alma Wear — Mode africaine contemporaine | Douala, Cameroun",
    template: "%s | Alma Wear",
  },
  description:
    "Alma Wear crée des kaftans, boubous et tenues africaines élégantes confectionnés à la main à Douala, Cameroun. Commandez sur WhatsApp.",
  keywords: [
    "alma wear",
    "mode africaine",
    "kaftan douala",
    "boubou cameroun",
    "tenue africaine élégante",
  ],
  openGraph: {
    title: "Alma Wear — Mode africaine contemporaine",
    description:
      "Des créations uniques, confectionnées avec soin à Douala, Cameroun.",
    images: ["/images/og-image.jpg"],
    locale: "fr_FR",
  },
};
```

---

## 🚀 Déploiement Vercel

Créer `vercel.json` à la racine :

```json
{
  "framework": "nextjs",
  "regions": ["cdg1"],
  "env": {
    "NEXT_PUBLIC_WHATSAPP_NUMBER": "@whatsapp_number"
  }
}
```

Créer `.env.local` :

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+237XXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://almawear.cm
```

Puis modifier `whatsapp.ts` pour lire depuis l'env :

```ts
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+237XXXXXXXXX";
```

---

## 📋 Checklist finale avant mise en ligne

- [ ] Remplacer le numéro WhatsApp dans `.env.local`
- [ ] Ajouter toutes les images dans `/public/images/`
- [ ] Remplir `products.ts` avec les vrais produits et prix
- [ ] Mettre à jour le texte "À propos" avec la vraie histoire de la marque
- [ ] Tester sur mobile (iPhone SE, Galaxy S21)
- [ ] Vérifier que les liens WhatsApp s'ouvrent correctement
- [ ] Ajouter les liens Instagram et Facebook dans le Footer
- [ ] Optimiser les images (WebP, max 1MB par image)
- [ ] Tester la vitesse sur PageSpeed Insights
- [ ] Connecter le domaine personnalisé sur Vercel

---

## 💡 Notes pour Copilot

- **Langue du site** : Français uniquement
- **Devise** : FCFA (Franc CFA)
- **Pas de panier** : La commande se fait 100% via WhatsApp
- **Mobile first** : La majorité des clients commanderont depuis un smartphone
- **Images** : Toujours utiliser `next/image` avec `fill` + `object-cover` pour les images de mode
- **Animations** : Sobres et élégantes, jamais clinquantes. Fade-in, légère translation Y.
- **Accessibilité** : Attributs `aria-label` sur tous les liens et boutons d'action
- **Performance** : Lazy loading des images hors écran, `priority` uniquement pour le hero
