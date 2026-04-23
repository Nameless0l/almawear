"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/collections", label: t("nav.collections") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];
  return (
    <footer className="bg-[var(--color-dark)] text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <Image
              src="/LOGO-ALMA-WEAR.png"
              alt="Alma Wear"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/50 mt-2 tracking-wide">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Links */}
        <nav className="flex justify-center gap-8 mb-12">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://www.instagram.com/_alma_wear"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/AlMaDeals"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/40 tracking-wide">
            {t("footer.location")}
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/30 mt-2">
            © {new Date().getFullYear()} Alma Wear. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
