export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: "boubou" | "kaftan" | "ensemble" | "accessoire";
  colors: string[];
  sizes: string[];
  images: string[];
  featured: boolean;
  isNew: boolean;
  material: string;
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
  {
    id: "3",
    slug: "boubou-ivoire-dore",
    name: "Boubou Ivoire & Doré",
    description:
      "Un boubou majestueux aux broderies dorées, incarnant l'élégance traditionnelle revisitée avec une touche contemporaine.",
    price: 65000,
    currency: "FCFA",
    category: "boubou",
    colors: ["Ivoire/Doré"],
    sizes: ["S", "M", "L", "XL", "Sur mesure"],
    images: ["/images/products/boubou-ivoire-dore-1.jpg"],
    featured: true,
    isNew: false,
    material: "Bazin riche brodé",
    careInstructions: "Nettoyage à sec recommandé",
  },
  {
    id: "4",
    slug: "ensemble-terre-de-sienne",
    name: "Ensemble Terre de Sienne",
    description:
      "Un ensemble deux pièces aux tons chauds, alliant confort et sophistication. Idéal pour les occasions semi-formelles.",
    price: 55000,
    currency: "FCFA",
    category: "ensemble",
    colors: ["Terre de Sienne"],
    sizes: ["S", "M", "L", "XL", "Sur mesure"],
    images: ["/images/products/ensemble-terre-sienne-1.jpg"],
    featured: true,
    isNew: true,
    material: "Coton premium",
    careInstructions: "Lavage à 30°C",
  },
  {
    id: "5",
    slug: "kaftan-noir-argent",
    name: "Kaftan Noir & Argent",
    description:
      "Un kaftan noir élégant rehaussé de détails argentés. Une pièce incontournable pour les soirées et événements prestigieux.",
    price: 52000,
    currency: "FCFA",
    category: "kaftan",
    colors: ["Noir/Argent"],
    sizes: ["S", "M", "L", "XL", "Sur mesure"],
    images: ["/images/products/kaftan-noir-argent-1.jpg"],
    featured: false,
    isNew: false,
    material: "Satin de luxe",
    careInstructions: "Nettoyage à sec recommandé",
  },
  {
    id: "6",
    slug: "boubou-bleu-nuit",
    name: "Boubou Bleu Nuit",
    description:
      "Un boubou somptueux dans un bleu profond, avec des finitions artisanales qui témoignent d'un savoir-faire exceptionnel.",
    price: 70000,
    currency: "FCFA",
    category: "boubou",
    colors: ["Bleu Nuit"],
    sizes: ["S", "M", "L", "XL", "Sur mesure"],
    images: ["/images/products/boubou-bleu-nuit-1.jpg"],
    featured: false,
    isNew: true,
    material: "Bazin riche brodé",
    careInstructions: "Nettoyage à sec recommandé",
  },
];

export const categories = [
  { label: "Tous", value: "all" },
  { label: "Kaftans", value: "kaftan" },
  { label: "Boubous", value: "boubou" },
  { label: "Ensembles", value: "ensemble" },
  { label: "Accessoires", value: "accessoire" },
];
