import { useState } from "react";
import { Heart } from "lucide-react";
import CulturalDisclaimer from "@/components/cultural-disclaimer";
import CalculatorForm from "@/components/calculator-form";
import ResultsDisplay from "@/components/results-display";
import CulturalInsights from "@/components/cultural-insights";
import ShareSection from "@/components/share-section";
import LanguageSelector from "@/components/language-selector";
import { getTranslation, type Language } from "@/lib/translations";
import type { CalculationResult } from "@shared/schema";

export default function Calculator() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zu');

  const handleCalculationComplete = (calculationResults: CalculationResult) => {
    setResults(calculationResults);
    setShowResults(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const t = getTranslation(currentLanguage);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-warm-orange text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🇿🇦</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                My Lobola
              </h1>
              <Heart className="h-6 w-6 text-white" />
            </div>
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={(lang) => setCurrentLanguage(lang as Language)} 
            />
          </div>
          <p className="text-center text-white text-sm md:text-base font-light drop-shadow-md">
            {t.appSubtitle}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <CulturalDisclaimer />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <CalculatorForm onCalculationComplete={handleCalculationComplete} />
          </div>

          {/* Results Section */}
          <div className="space-y-6" id="results-section">
            {showResults && results && (
              <>
                <ResultsDisplay results={results} />
                <CulturalInsights insights={results.insights} />
                <ShareSection results={results} />
              </>
            )}

            {/* Educational Content */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-book text-warm-orange mr-3"></i>
                Learn More
              </h2>
              <div className="space-y-3">
                <div className="block p-3 border border-gray-200 rounded-lg hover:bg-cream transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Understanding Lobola Traditions</h4>
                      <p className="text-sm text-gray-600">Cultural significance across SA groups</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
                <div className="block p-3 border border-gray-200 rounded-lg hover:bg-cream transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Modern Considerations</h4>
                      <p className="text-sm text-gray-600">Balancing tradition with contemporary values</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
                <div className="block p-3 border border-gray-200 rounded-lg hover:bg-cream transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Family Mediation Resources</h4>
                      <p className="text-sm text-gray-600">Professional guidance and support</p>
                    </div>
                    <i className="fas fa-chevron-right text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Ubuntu Lobola Guide</h3>
            <p className="text-gray-300 text-sm">
              Respecting traditions, embracing modern values
            </p>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-xs">
              This tool is for educational and guidance purposes only. 
              Always consult with family elders and cultural advisors for important decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
