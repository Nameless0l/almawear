"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("alma_admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setOk(true);
    }
  }, [router]);

  if (!ok) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg)]">
        <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

export function getAuthHeader(): string {
  const token = sessionStorage.getItem("alma_admin_token") ?? "";
  return `Bearer ${token}`;
}
