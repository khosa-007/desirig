"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border bg-muted/50 p-0.5 text-sm">
      <button
        onClick={() => setLang("en")}
        className={`rounded-full px-3 py-1 font-medium transition-all ${
          lang === "en"
            ? "bg-[#FF6E40] text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLang("pa")}
        className={`rounded-full px-3 py-1 font-medium transition-all ${
          lang === "pa"
            ? "bg-[#FF6E40] text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ਪੰਜਾਬੀ
      </button>
    </div>
  );
}
