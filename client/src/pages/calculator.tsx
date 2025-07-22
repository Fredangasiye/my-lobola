// client/src/pages/calculator.tsx
import { useState } from "react";
import CulturalDisclaimer from "../components/cultural-disclaimer";
import CalculatorForm from "../components/calculator-form";
import ResultsDisplay from "../components/results-display";
import ShareSection from "../components/share-section";
import UncleWisdom from "../components/uncle-wisdom";

// Simple placeholder for now
function NonBlackGuidance() { return null; }

export default function Calculator() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedCulturalGroup, setSelectedCulturalGroup] = useState('');

  const handleCalculationComplete = (calculationResults) => {
    setResults(calculationResults);
    setShowResults(true);
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <CulturalDisclaimer />

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CalculatorForm 
            onCalculationComplete={handleCalculationComplete}
            onCulturalGroupChange={setSelectedCulturalGroup}
          />
        </div>
        <UncleWisdom />
      </div>
      
      <div className="space-y-6 mt-8" id="results-section">
        {showResults && results && (
          <>
            <ResultsDisplay results={results} culturalGroup={selectedCulturalGroup} />
            <ShareSection results={results} />
          </>
        )}
      </div>

      <div className="mt-12 space-y-8">
        <NonBlackGuidance />
        {/* The "Learn More" section can be added back here if you wish */}
      </div>
    </>
  );
}