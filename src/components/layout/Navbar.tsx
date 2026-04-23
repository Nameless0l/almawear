"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();

  // La navbar est transparente (texte blanc) uniquement sur l'accueil en haut de page
  const isHome = pathname === "/";
  const useWhiteText = isHome && !scrolled;

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/collections", label: t("nav.collections") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      // Cache la navbar quand on scroll vers le bas (après 100px), montre quand on scroll vers le haut
      if (currentY > 100 && currentY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsAdmin(!!sessionStorage.getItem("alma_admin_token"));
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled || !isHome
          ? "bg-[var(--color-bg)]/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-12 w-32">
          {/* Logo noir — visible au scroll (fond clair) */}
          <Image
            src="/LOGO-ALMA-WEAR-NOIR.png"
            alt="Alma Wear"
            width={130}
            height={48}
            className={`absolute inset-0 object-contain transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
            priority
          />
          {/* Logo blanc — visible sur le hero (fond sombre) */}
          <Image
            src="/LOGO-ALMA-WEAR.png"
            alt="Alma Wear"
            width={130}
            height={48}
            className={`absolute inset-0 object-contain transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
            priority
          />
        </Link>

        {/* Navigation desktop */}
        <ul className="hidden md:flex items-center gap-8 font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-[var(--color-accent)] ${
                  useWhiteText ? "text-white" : "text-[var(--color-text)]"
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
                useWhiteText ? "text-white" : "text-[var(--color-text)]"
              }`}
              aria-label="Switch language"
            >
              <Globe size={14} />
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </li>
          {isAdmin && (
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 bg-[var(--color-accent)] text-white px-3 py-1.5 text-xs tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-dark)] transition-colors"
                title="Espace administration"
              >
                <LayoutDashboard size={13} />
                Admin
              </Link>
            </li>
          )}
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
              className={useWhiteText ? "text-white" : "text-[var(--color-text)]"}
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
            {isAdmin && (
              <li>
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-6 py-3 text-sm tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-dark)] transition-colors mx-auto"
                >
                  <LayoutDashboard size={16} />
                  Administration
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
