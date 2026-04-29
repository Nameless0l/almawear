"use client";

import type { Bilingual } from "@/lib/settings-data";

interface BilingualFieldProps {
  label: string;
  value: Bilingual;
  onChange: (next: Bilingual) => void;
  placeholderFr?: string;
  placeholderEn?: string;
  /** Nombre de lignes (1 = input, 2+ = textarea). */
  rows?: number;
  hint?: string;
}

const inputCls =
  "w-full px-3 py-2 border border-[var(--color-border)] bg-white text-[var(--color-text)] text-sm font-[family-name:var(--font-dm-sans)] focus:outline-none focus:border-[var(--color-accent)] transition-colors";

export function BilingualField({
  label,
  value,
  onChange,
  placeholderFr,
  placeholderEn,
  rows = 1,
  hint,
}: BilingualFieldProps) {
  const isTextarea = rows > 1;

  return (
    <div>
      <p className="font-[family-name:var(--font-dm-sans)] text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
        {label}
      </p>
      {hint && (
        <p className="font-[family-name:var(--font-dm-sans)] text-[11px] text-[var(--color-text-muted)] mb-2 italic">
          {hint}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1 font-[family-name:var(--font-dm-sans)]">
            Français
          </span>
          {isTextarea ? (
            <textarea
              rows={rows}
              value={value.fr}
              onChange={(e) => onChange({ ...value, fr: e.target.value })}
              placeholder={placeholderFr}
              className={inputCls}
            />
          ) : (
            <input
              type="text"
              value={value.fr}
              onChange={(e) => onChange({ ...value, fr: e.target.value })}
              placeholder={placeholderFr}
              className={inputCls}
            />
          )}
        </div>
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1 font-[family-name:var(--font-dm-sans)]">
            English
          </span>
          {isTextarea ? (
            <textarea
              rows={rows}
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              placeholder={placeholderEn}
              className={inputCls}
            />
          ) : (
            <input
              type="text"
              value={value.en}
              onChange={(e) => onChange({ ...value, en: e.target.value })}
              placeholder={placeholderEn}
              className={inputCls}
            />
          )}
        </div>
      </div>
    </div>
  );
}
