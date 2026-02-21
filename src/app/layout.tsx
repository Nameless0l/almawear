import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Providers } from "@/components/Providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almawear.vercel.app"),
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
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma Wear — Mode africaine contemporaine",
    description:
      "Des créations uniques, confectionnées avec soin à Douala, Cameroun.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
