"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang = "en" | "pa";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: <T>(content: { en: T; pa: T }) => T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (content) => content.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("desirig-lang") as Lang | null;
    if (saved === "pa") setLangState("pa");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("desirig-lang", l);
  };

  const t = <T,>(content: { en: T; pa: T }): T => content[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
