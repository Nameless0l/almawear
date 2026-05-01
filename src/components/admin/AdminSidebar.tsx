"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Plus, LogOut, ExternalLink, Images, Menu, X, QrCode } from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/produits", label: "Produits", icon: ShoppingBag },
  { href: "/admin/produits/nouveau", label: "Ajouter un produit", icon: Plus },
  { href: "/admin/contenu", label: "Contenu du site", icon: Images },
  { href: "/admin/qr-code", label: "QR Code", icon: QrCode },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function handleLogout() {
    sessionStorage.removeItem("alma_admin_token");
    router.push("/admin/login");
  }

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === href;
    }

    if (href === "/admin/produits") {
      return pathname.startsWith(href);
    }

    return pathname === href;
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[var(--color-dark)] text-white border-b border-white/10 flex items-center justify-between px-4">
        <p className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-wider text-[var(--color-accent)]">
          Alma Wear
        </p>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Ouvrir le menu admin"
          className="p-1"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40">
          <button
            type="button"
            aria-label="Fermer le menu admin"
            className="absolute inset-0"
            onClick={() => setMenuOpen(false)}
          />
          <aside
            className="relative h-full w-72 max-w-[82vw] bg-[var(--color-dark)] text-white flex flex-col"
          >
            <div className="px-6 py-6 border-b border-white/10 mt-16">
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-widest text-[var(--color-accent)]">
                Administration
              </p>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-[family-name:var(--font-dm-sans)] transition-all duration-150 ${
                      active
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 pb-6 space-y-1 border-t border-white/10 pt-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white font-[family-name:var(--font-dm-sans)] transition-colors"
              >
                <ExternalLink size={18} />
                Voir le site
              </a>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-red-400 font-[family-name:var(--font-dm-sans)] transition-colors"
              >
                <LogOut size={18} />
                Se déconnecter
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen bg-[var(--color-dark)] text-white flex-col shrink-0">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-widest text-[var(--color-accent)]">
            Alma Wear
          </p>
          <p className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)] tracking-widest uppercase mt-1">
            Administration
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-[family-name:var(--font-dm-sans)] transition-all duration-150 ${
                  active
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 space-y-1 border-t border-white/10 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white font-[family-name:var(--font-dm-sans)] transition-colors"
          >
            <ExternalLink size={18} />
            Voir le site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-red-400 font-[family-name:var(--font-dm-sans)] transition-colors"
          >
            <LogOut size={18} />
            Se déconnecter
          </button>
        </div>
      </aside>
    </>
  );
}
