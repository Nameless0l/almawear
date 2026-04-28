"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "fr" | "en";

type TranslationValue = string | string[];

// Nested translation structure
type TranslationMap = {
  [key: string]: TranslationValue | TranslationMap;
};

const translations: Record<Locale, TranslationMap> = {
  fr: {
    nav: {
      home: "Accueil",
      collections: "Collections",
      about: "À Propos",
      contact: "Contact",
    },
    hero: {
      location: "Douala, Cameroun",
      title: "L'élégance à l'africaine",
      subtitle:
        "Des créations uniques, confectionnées avec soin pour la personne africaine moderne",
      cta: "Découvrir la collection",
      contact: "Nous contacter",
    },
    featured: {
      subtitle: "Sélection",
      title: "Nos Créations",
      order: "Commander",
    },
    brand: {
      subtitle: "Notre Histoire",
      title1: "La puissance de la mode",
      title2: "africaine",
      p1: "Alma Wear est née d'un rêve : révéler la puissance, l'élégance et la modernité de la personne africaine. Fondée à Douala, au cœur du Cameroun, notre maison de création puise son inspiration dans la richesse des cultures africaines pour les réinventer avec audace et sophistication.",
      p2: "Chaque création Alma Wear est pensée pour marquer les esprits. Nos coupes structurées, nos silhouettes contemporaines et nos matières nobles célèbrent l'authenticité et le charisme de celles et ceux qui portent nos pièces.",
      quote:
        "Alma Wear n'est pas seulement une marque. C'est une célébration de l'Afrique et de ceux qui la portent avec fierté.",
      author: "— Fondatrice, Alma Wear",
    },
    lookbook: {
      subtitle: "Inspiration",
      title: "Lookbook",
    },
    whatsappBanner: {
      title: "Commandez directement",
      subtitle: "sur WhatsApp",
      description:
        "Commandez directement via WhatsApp ou posez-nous vos questions. Nous répondons dans les 24h.",
      cta: "Commander sur WhatsApp",
    },
    footer: {
      tagline: "Mode africaine contemporaine",
      location: "Basée à Douala, Cameroun",
      navigation: "Navigation",
      followUs: "Suivez-nous",
      rights: "Tous droits réservés.",
    },
    product: {
      new: "Nouveau",
      material: "Matière",
      sizes: "Tailles disponibles",
      customSize: "Sur mesure",
      color: "Couleurs",
      care: "Entretien",
      orderWhatsApp: "Commander sur WhatsApp",
      alsoLike: "Vous aimerez aussi",
      order: "Commander",
    },
    orderInfo: {
      delivery: "Livraison",
      deliveryValueInCameroun: "Au cameroun : immédiat",
      deliveryValueH: "Hors du territoire : en fonction du transitaire",
      deliveryCustom: "Sur mesure : 1 semaine maximum",
      payment: "Paiement",
      paymentValue: "Orange Money · MTN Mobile Money",
      availability: "Disponibilité",
      availabilityValue: "Disponible à la commande",
    },
    collections: {
      title: "Collections",
      subtitle: "Nos créations",
      metaDesc:
        "Explorez nos collections de kaftans, boubous et tenues africaines élégantes confectionnés à la main à Douala.",
    },
    categories: {
      all: "Tous",
      homme: "Homme",
      femme: "Femme",
      accessoire: "Accessoires",
    },
    about: {
      subtitle: "Notre histoire",
      title: "À Propos",
      storyTitle1: "L'histoire",
      storyTitle2: "d'Alma Wear",
      p1: "Alma Wear est née d'un rêve : révéler la puissance, l'élégance et la modernité de la personne africaine. Fondée à Douala, au cœur du Cameroun, notre maison de création puise son inspiration dans la richesse des cultures africaines pour les réinventer avec audace et sophistication.",
      p2: "Chaque création Alma Wear est pensée pour marquer les esprits. Nos coupes structurées, nos silhouettes contemporaines et nos matières nobles célèbrent l'authenticité et le charisme de celles et ceux qui portent nos pièces. Chaque vêtement raconte une histoire : celle d'une personne africaine fière de ses racines et ouverte sur le monde.",
      quote:
        "Alma Wear n'est pas seulement une marque. C'est une célébration de l'Afrique et de ceux qui la portent avec fierté.",
      author: "— Fondatrice, Alma Wear",
      visionTitle: "Notre vision",
      visionText:
        "Positionner Alma Wear comme une référence internationale de la mode afro-premium, où chaque création raconte l'histoire de l'Afrique et de celles et ceux qui la portent avec fierté.",
      ambitionTitle: "Notre ambition",
      ambitionText:
        "Faire rayonner la mode africaine contemporaine sur le plan mondial, tout en restant fidèle à nos racines et à notre engagement pour une mode consciente et durable.",
      valuesSubtitle: "Ce qui nous anime",
      valuesTitle: "Nos Valeurs",
      values: {
        authenticity: "Authenticité",
        authenticityDesc:
          "Sublimer les traditions africaines avec une vision contemporaine, pour une mode qui a du sens.",
        elegance: "Élégance",
        eleganceDesc:
          "Mettre en valeur la personne africaine moderne, avec des lignes raffinées et des matières d'exception.",
        modernity: "Modernité",
        modernityDesc:
          "Réinventer les codes traditionnels pour proposer une mode africaine résolument actuelle et internationale.",
        respect: "Respect",
        respectDesc:
          "Pour nos clients, nos artisans et notre héritage culturel. Chaque relation est tissée avec soin.",
        innovation: "Innovation",
        innovationDesc:
          "Réinventer les codes africains pour le monde moderne, avec audace et créativité.",
        sustainability: "Durabilité",
        sustainabilityDesc:
          "Créer des pièces qui traversent le temps avec conscience, dans une démarche responsable.",
      },
      locationTitle: "Basée au cœur de Douala, Cameroun",
      locationText:
        "Notre atelier se trouve à Douala, la capitale économique du Cameroun. C'est ici que nous donnons vie à chaque création, avec passion et savoir-faire.",
    },
    contact: {
      subtitle: "Parlons ensemble",
      title: "Contactez-nous",
      ctaTitle: "Commandez directement",
      ctaTitle2: "via WhatsApp",
      ctaText:
        "La façon la plus simple de nous contacter et de passer commande. Nous répondons généralement dans les 24h.",
      ctaCta: "Démarrer une conversation",
      phone: "Téléphone",
      email: "Email",
      location: "Localisation",
      hours: "Horaires",
      hoursValue: "Lun - Sam : 9h - 18h",
      infoTitle: "Informations de contact",
      infoText:
        "Vous pouvez nous joindre directement par WhatsApp, par téléphone ou par email. Nous sommes à votre disposition pour toute question.",
    },
  },
  en: {
    nav: {
      home: "Home",
      collections: "Collections",
      about: "About",
      contact: "Contact",
    },
    hero: {
      location: "Douala, Cameroon",
      title: "African Elegance",
      subtitle:
        "Unique creations, carefully crafted for the modern African person",
      cta: "Discover the collection",
      contact: "Contact us",
    },
    featured: {
      subtitle: "Selection",
      title: "Our Creations",
      order: "Order",
    },
    brand: {
      subtitle: "Our Story",
      title1: "The power of African",
      title2: "fashion",
      p1: "Alma Wear was born from a dream: to reveal the power, elegance and modernity of the African person. Founded in Douala, in the heart of Cameroon, our design house draws inspiration from the richness of African cultures to reinvent them with boldness and sophistication.",
      p2: "Each Alma Wear creation is designed to leave a lasting impression. Our structured cuts, contemporary silhouettes and noble materials celebrate the authenticity and charisma of those who wear our pieces.",
      quote:
        "Alma Wear is not just a brand. It's a celebration of Africa and those who wear it with pride.",
      author: "— Founder, Alma Wear",
    },
    lookbook: {
      subtitle: "Inspiration",
      title: "Lookbook",
    },
    whatsappBanner: {
      title: "Order directly",
      subtitle: "on WhatsApp",
      description:
        "Order directly via WhatsApp or ask us your questions. We respond within 24 hours.",
      cta: "Order on WhatsApp",
    },
    footer: {
      tagline: "Contemporary African fashion",
      location: "Based in Douala, Cameroon",
      navigation: "Navigation",
      followUs: "Follow us",
      rights: "All rights reserved.",
    },
    product: {
      new: "New",
      material: "Material",
      sizes: "Available sizes",
      customSize: "Custom size",
      color: "Colors",
      care: "Care",
      orderWhatsApp: "Order on WhatsApp",
      alsoLike: "You may also like",
      order: "Order",
    },
    orderInfo: {
      delivery: "Delivery",
      deliveryValueInCameroun: "In Cameroun: immediate",
      deliveryValueH: "Outside Cameroun: depending on the freight forwarder",
      deliveryCustom: "Custom made: 1 week maximum",
      payment: "Payment",
      paymentValue: "Orange Money · MTN Mobile Money",
      availability: "Availability",
      availabilityValue: "Available to order",
    },
    collections: {
      title: "Collections",
      subtitle: "Our creations",
      metaDesc:
        "Explore our collections of kaftans, boubous and elegant African outfits, handcrafted in Douala.",
    },
    categories: {
      all: "All",
      homme: "Men",
      femme: "Women",
      accessoire: "Accessories",
    },
    about: {
      subtitle: "Our story",
      title: "About Us",
      storyTitle1: "The story",
      storyTitle2: "of Alma Wear",
      p1: "Alma Wear was born from a dream: to reveal the power, elegance and modernity of the African person. Founded in Douala, in the heart of Cameroon, our design house draws inspiration from the richness of African cultures to reinvent them with boldness and sophistication.",
      p2: "Each Alma Wear creation is designed to leave a lasting impression. Our structured cuts, contemporary silhouettes and noble materials celebrate the authenticity and charisma of those who wear our pieces. Each garment tells a story: that of an African person proud of their roots and open to the world.",
      quote:
        "Alma Wear is not just a brand. It's a celebration of Africa and those who wear it with pride.",
      author: "— Founder, Alma Wear",
      visionTitle: "Our vision",
      visionText:
        "Position Alma Wear as an international reference in afro-premium fashion, where each creation tells the story of Africa and those who wear it with pride.",
      ambitionTitle: "Our ambition",
      ambitionText:
        "Shine contemporary African fashion on the world stage, while staying true to our roots and our commitment to conscious and sustainable fashion.",
      valuesSubtitle: "What drives us",
      valuesTitle: "Our Values",
      values: {
        authenticity: "Authenticity",
        authenticityDesc:
          "Elevating African traditions with a contemporary vision, for fashion that has meaning.",
        elegance: "Elegance",
        eleganceDesc:
          "Highlighting the modern African person, with refined lines and exceptional materials.",
        modernity: "Modernity",
        modernityDesc:
          "Reinventing traditional codes to offer resolutely current and international African fashion.",
        respect: "Respect",
        respectDesc:
          "For our clients, our artisans and our cultural heritage. Every relationship is woven with care.",
        innovation: "Innovation",
        innovationDesc:
          "Reinventing African codes for the modern world, with boldness and creativity.",
        sustainability: "Sustainability",
        sustainabilityDesc:
          "Creating pieces that stand the test of time with conscience, in a responsible approach.",
      },
      locationTitle: "Based in the heart of Douala, Cameroon",
      locationText:
        "Our workshop is located in Douala, the economic capital of Cameroon. This is where we bring each creation to life, with passion and expertise.",
    },
    contact: {
      subtitle: "Let's talk",
      title: "Contact Us",
      ctaTitle: "Order directly",
      ctaTitle2: "via WhatsApp",
      ctaText:
        "The easiest way to reach us and place an order. We usually respond within 24 hours.",
      ctaCta: "Start a conversation",
      phone: "Phone",
      email: "Email",
      location: "Location",
      hours: "Hours",
      hoursValue: "Mon - Sat: 9am - 6pm",
      infoTitle: "Contact information",
      infoText:
        "You can reach us directly via WhatsApp, phone or email. We are at your disposal for any questions.",
    },
  },
};

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("alma-locale", newLocale);
    }
  }, []);

  // Hydrate from localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("alma-locale") as Locale | null;
      if (saved === "fr" || saved === "en") {
        setLocaleState(saved);
      }
    }
  });

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let result: TranslationValue | TranslationMap | undefined =
        translations[locale];

      for (const k of keys) {
        if (result && typeof result === "object" && !Array.isArray(result)) {
          result = result[k];
        } else {
          return key; // fallback to key
        }
      }

      if (typeof result === "string") return result;
      return key; // fallback
    },
    [locale],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
