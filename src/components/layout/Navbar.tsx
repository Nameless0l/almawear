"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/collections", label: t("nav.collections") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo + texte */}
        <Link
          href="/"
          className={`flex items-center gap-3 font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-wide transition-colors ${
            scrolled ? "text-[var(--color-text)]" : "text-white"
          }`}
        >
          <Image
            src="/logo.png"
            alt="Alma Wear"
            width={40}
            height={40}
            className={`transition-all duration-300 ${scrolled ? "" : "invert"}`}
          />
          ALMA WEAR
        </Link>

        {/* Navigation desktop */}
        <ul className="hidden md:flex items-center gap-8 font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-[var(--color-accent)] ${
                  scrolled ? "text-[var(--color-text)]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
              className={`flex items-center gap-1.5 transition-colors hover:text-[var(--color-accent)] ${
                scrolled ? "text-[var(--color-text)]" : "text-white"
              }`}
              aria-label="Switch language"
            >
              <Globe size={14} />
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </li>
        </ul>

        {/* Menu burger mobile */}
        <button
          className="md:hidden relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu de navigation"
        >
          {menuOpen ? (
            <X size={24} className="text-[var(--color-text)]" />
          ) : (
            <Menu
              size={24}
              className={scrolled ? "text-[var(--color-text)]" : "text-white"}
            />
          )}
        </button>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-[var(--color-bg)] z-40 flex items-center justify-center">
          <ul className="flex flex-col gap-8 font-[family-name:var(--font-dm-sans)] text-lg tracking-widest uppercase text-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setLocale(locale === "fr" ? "en" : "fr");
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors mx-auto"
                aria-label="Switch language"
              >
                <Globe size={18} />
                {locale === "fr" ? "English" : "Français"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
