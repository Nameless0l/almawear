import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/collections", label: "Collections" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Image
              src="/logo.png"
              alt="Alma Wear"
              width={50}
              height={50}
              className="brightness-0 invert"
            />
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-widest text-white">
              ALMA WEAR
            </h2>
          </div>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-white/50 mt-2 tracking-wide">
            L&apos;élégance à l&apos;africaine
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
            href="https://instagram.com/almawear"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://facebook.com/almawear"
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
            Basée à Douala, Cameroun
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-xs text-white/30 mt-2">
            © {new Date().getFullYear()} Alma Wear. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
