"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Plus, LogOut, ExternalLink, Images } from "lucide-react";

const navLinks = [
  { href: "/admin",              label: "Tableau de bord",   icon: LayoutDashboard, exact: true },
  { href: "/admin/produits",     label: "Produits",          icon: ShoppingBag,     exact: false },
  { href: "/admin/produits/nouveau", label: "Ajouter un produit", icon: Plus,       exact: true },
  { href: "/admin/contenu",      label: "Contenu du site",   icon: Images,          exact: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("alma_admin_token");
    router.push("/admin/login");
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href) && href !== "/admin";
  }

  return (
    <aside className="w-64 min-h-screen bg-[var(--color-dark)] text-white flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-white/10">
        <p className="font-[family-name:var(--font-cormorant)] text-2xl font-light tracking-widest text-[var(--color-accent)]">
          Alma Wear
        </p>
        <p className="text-white/40 text-xs font-[family-name:var(--font-dm-sans)] tracking-widest uppercase mt-1">
          Administration
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
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

      {/* Footer */}
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
  );
}
