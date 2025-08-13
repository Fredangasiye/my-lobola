import Calculator from "./calculator";
import { Heart } from "lucide-react";
import LanguageSelector from "@/components/language-selector";
import { useTranslationContext } from "@/lib/translation-context";
import GradientTitle from "@/components/GradientTitle";

export default function AppLayout() {
  const { language, setLanguage, t } = useTranslationContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-x-hidden">
      <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-4 md:py-6 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="text-xl md:text-2xl animate-pulse">🇿🇦</div>
            <div className="flex items-center gap-2 md:gap-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                {t.appTitle}
              </h1>
              <div className="flex items-center gap-1">
                <span className="text-xs text-white/70">by</span>
                <GradientTitle />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-4">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />

          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 overflow-x-hidden">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Cultural Wisdom Calculator
          </h2>
          <p className="text-gray-600 text-lg">
            Discover your lobola journey with respect and tradition
          </p>
        </div>
        <Calculator currentLanguage={language} />
      </main>
      
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 mt-16 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-4">
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full mb-4"></div>
          </div>
          <p className="text-sm text-gray-300 mb-2 font-medium">A vAIb innovation</p>
          <p className="text-xs text-gray-400">© 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}