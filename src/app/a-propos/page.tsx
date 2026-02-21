import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez l'histoire d'Alma Wear, marque de mode africaine contemporaine basée à Douala, Cameroun. Authenticité, élégance et modernité.",
};

export default function AProposPage() {
  return <AboutContent />;
}
