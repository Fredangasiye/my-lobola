import { useState } from "react";
import CulturalDisclaimer from "@/components/cultural-disclaimer";
import CalculatorForm from "@/components/calculator-form";
import ResultsDisplay from "@/components/results-display";
import ShareSection from "@/components/share-section";
import UncleWisdom from "@/components/uncle-wisdom";

import { Toaster } from "@/components/ui/toaster";


export default function Calculator({ currentLanguage }: { currentLanguage: string }) {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedCulturalGroup, setSelectedCulturalGroup] = useState('');

  const handleCalculationComplete = (calculationResults: any) => {
    setResults(calculationResults);
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div>
      <CulturalDisclaimer />
      <CalculatorForm 
        onCalculationComplete={handleCalculationComplete}
        onCulturalGroupChange={setSelectedCulturalGroup}
      />
      <div className="space-y-6 mt-8" id="results-section">
        {showResults && results && (
          <>
            <ResultsDisplay results={results} culturalGroup={selectedCulturalGroup} />
            <ShareSection results={results} />
          </>
        )}
      </div>

      <Toaster />
    </div>
  );
}