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
  const [isAdmin] = useState(
    () =>
      globalThis.window !== undefined &&
      !!globalThis.window.sessionStorage.getItem("alma_admin_token"),
  );
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

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

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
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [menuOpen]);

  let headerStateClass = "h-20 bg-[var(--color-bg)] border-b border-[var(--color-border)]";
  if (scrolled) {
    headerStateClass = "h-16 bg-[var(--color-bg)]/95 backdrop-blur-sm shadow-sm";
  } else if (isHome) {
    headerStateClass = "h-24 bg-transparent";
  }
  const shouldHideHeader = hidden && menuOpen === false;
  let headerVisibilityClass = "";
  if (shouldHideHeader) {
    headerVisibilityClass = "-translate-y-full";
  }
  let mobileActionTextClass = "text-[var(--color-text)]";
  if (useWhiteText && menuOpen === false) {
    mobileActionTextClass = "text-white";
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex items-center transition-all duration-300 ${headerVisibilityClass} ${headerStateClass}`}
    >
      <nav className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-28 h-20">
            <Image
              src="/LOGO-ALMA-WEAR-NOIR.png"
              alt="Alma Wear"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
              priority
            />
            <Image
              src="/LOGO-ALMA-WEAR.png"
              alt="Alma Wear"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
              priority
            />
          </div>
        </Link>

        {/* Navigation desktop */}
        <ul className="hidden md:flex items-center gap-8 font-[family-name:var(--font-dm-sans)] text-sm tracking-widest uppercase">
          {links.map((link) => {
            const isActive = isLinkActive(link.href);
            let linkClass = "text-[var(--color-text)]";
            if (isActive) {
              linkClass = "border-b border-[var(--color-accent)] text-[var(--color-accent)]";
            } else if (useWhiteText) {
              linkClass = "text-white";
            }
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-[var(--color-accent)] pb-0.5 ${linkClass}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
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

        {/* Actions mobile */}
        <div className="md:hidden relative z-50 flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className={`flex items-center gap-1 text-sm tracking-widest uppercase transition-colors hover:text-[var(--color-accent)] ${mobileActionTextClass}`}
            aria-label="Changer la langue"
          >
            <Globe size={14} />
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu de navigation"
          >
            {menuOpen ? (
              <X size={24} className="text-[var(--color-text)]" />
            ) : (
              <Menu size={24} className={mobileActionTextClass} />
            )}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-0 z-40 bg-[var(--color-bg)]/100 pt-24 pb-8 px-6 overflow-y-auto">
          <ul className="flex flex-col gap-8 font-[family-name:var(--font-dm-sans)] text-lg tracking-widest uppercase text-center min-h-full justify-start">
            {links.map((link) => {
                const isActive = isLinkActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`transition-colors ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text)] hover:text-[var(--color-accent)]"}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
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
