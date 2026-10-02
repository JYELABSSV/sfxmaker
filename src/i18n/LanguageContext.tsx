import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLanguage,
  TranslationDict,
  TRANSLATIONS,
  detectBrowserLanguage,
  LANGUAGES,
} from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  effectiveLanguage: Exclude<SupportedLanguage, 'auto'>;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'retro_sfx_language_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
      if (saved && (saved === 'auto' || saved in TRANSLATIONS)) {
        return saved;
      }
    } catch {}
    return 'auto';
  });

  const [effectiveLanguage, setEffectiveLanguage] = useState<Exclude<SupportedLanguage, 'auto'>>(() => {
    return detectBrowserLanguage();
  });

  useEffect(() => {
    if (language === 'auto') {
      const detected = detectBrowserLanguage();
      setEffectiveLanguage(detected);
    } else {
      setEffectiveLanguage(language as Exclude<SupportedLanguage, 'auto'>);
    }
  }, [language]);

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {}
  };

  const t = TRANSLATIONS[effectiveLanguage] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        effectiveLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export { LANGUAGES };
