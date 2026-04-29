import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { BrandStory } from "@/components/home/BrandStory";
import { Lookbook } from "@/components/home/Lookbook";
import { WhatsAppBanner } from "@/components/home/WhatsAppBanner";
import { getProducts } from "@/lib/products-data";
import { getSettings } from "@/lib/settings-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <HeroSection hero={settings.hero} />
      <FeaturedProducts products={featured} />
      <CollectionsSection images={settings.collectionImages} />
      <BrandStory content={settings.brandStory} />
      <Lookbook images={settings.lookbook} />
      <WhatsAppBanner />
    </>
  );
}
