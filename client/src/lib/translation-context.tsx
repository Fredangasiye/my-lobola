import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation, type Translation } from './translations';

interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translation;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');
  const t = useTranslation(language);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
} 