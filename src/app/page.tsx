import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { Lookbook } from "@/components/home/Lookbook";
import { WhatsAppBanner } from "@/components/home/WhatsAppBanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <Lookbook />
      <WhatsAppBanner />
    </>
  );
}
