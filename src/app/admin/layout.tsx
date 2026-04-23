import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration — Alma Wear",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--color-surface)]">{children}</div>
  );
}
