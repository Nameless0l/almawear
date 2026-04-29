import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { getSettings } from "@/lib/settings-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez l'histoire d'Alma Wear, marque de mode africaine contemporaine basée à Douala, Cameroun. Authenticité, élégance et modernité.",
};

export default async function AProposPage() {
  const settings = await getSettings();
  return <AboutContent content={settings.aboutPage} />;
}
