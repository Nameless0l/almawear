"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Erreur");

      sessionStorage.setItem("alma_admin_token", data.token);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-cormorant)] text-4xl font-light text-[var(--color-text)] tracking-widest">
            Alma Wear
          </p>
          <p className="font-[family-name:var(--font-dm-sans)] text-sm text-[var(--color-text-muted)] tracking-widest uppercase mt-2">
            Espace administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[var(--color-border)] p-8 space-y-5">
          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-[var(--color-text-muted)] font-[family-name:var(--font-dm-sans)] mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                required
                className="w-full px-4 py-3 pr-12 border border-[var(--color-border)] text-[var(--color-text)] text-sm font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-[family-name:var(--font-dm-sans)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-dark)] text-white py-3 text-sm tracking-widest uppercase font-[family-name:var(--font-dm-sans)] hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
