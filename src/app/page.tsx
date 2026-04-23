import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { BrandStory } from "@/components/home/BrandStory";
import { Lookbook } from "@/components/home/Lookbook";
import { WhatsAppBanner } from "@/components/home/WhatsAppBanner";
import { getProducts } from "@/lib/products-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featured} />
      <CollectionsSection />
      <BrandStory />
      <Lookbook />
      <WhatsAppBanner />
    </>
  );
}
