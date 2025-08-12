import Calculator from "./calculator";
import { Heart } from "lucide-react";
import LanguageSelector from "@/components/language-selector";
import { useTranslationContext } from "@/lib/translation-context";

export default function AppLayout() {
  const { language, setLanguage, t } = useTranslationContext();

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary-green text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🇿🇦</div>
            <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">{t.appTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            <span className="text-white text-sm">{t.demoMode}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Calculator />
      </main>
      
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
            {/* ... your footer content ... */}
        </div>
      </footer>
    </div>
  );
}