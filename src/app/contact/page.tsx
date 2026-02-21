import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Alma Wear via WhatsApp pour commander vos kaftans, boubous et tenues africaines. Basée à Douala, Cameroun.",
};

export default function ContactPage() {
  return <ContactContent />;
}
