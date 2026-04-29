"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getGeneralContactLink } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n";
import type { HeroContent } from "@/lib/settings-data";

export function HeroSection({ hero }: { hero?: HeroContent }) {
  const { t, locale } = useLanguage();

  // Fallback i18n si pas d'override admin
  const location = hero?.location?.[locale]?.trim() || t("hero.location");
  const title = hero?.title?.[locale]?.trim() || t("hero.title");
  const subtitle = hero?.subtitle?.[locale]?.trim() || t("hero.subtitle");
  const image = hero?.image || "/images/hero/_alma_wear_1771498601526.jpeg";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[var(--color-dark)]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/60 via-[#1a1714]/30 to-[#1a1714]/70" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-dm-sans)] tracking-[0.3em] uppercase text-sm mb-4 opacity-80"
        >
          {location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-cormorant)] text-5xl md:text-7xl lg:text-8xl font-light italic mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-[family-name:var(--font-dm-sans)] text-lg font-light mb-10 max-w-md opacity-90"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/collections"
            className="font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase border border-white px-8 py-3 hover:bg-white hover:text-[var(--color-dark)] transition-all duration-300"
          >
            {t("hero.cta")}
          </Link>
          <a
            href={getGeneralContactLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase bg-[#25D366] text-white px-8 py-3 hover:bg-[#20BD5C] transition-all duration-300"
          >
            {t("hero.contact")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-white/40"
        />
      </motion.div>
    </section>
  );
}
