//
// CHANGE 1: We are REMOVING the `Cow` icon from this import list. We don't need it.
//
import { TrendingUp } from "lucide-react"; 
import type { CalculationResult } from "@shared/schema";
import { getSimpleTranslation, type Language } from "../lib/simple-translations";

interface ResultsDisplayProps {
  results: CalculationResult;
  currentLanguage?: Language;
}

export default function ResultsDisplay({ results, currentLanguage = 'en' }: ResultsDisplayProps) {
  if (!results) return null;
  
  const t = getSimpleTranslation(currentLanguage);

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-lg p-6 mt-8 animate-in fade-in-50">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="text-primary mr-3" />
        {t.culturalGuidanceResults}
      </h2>
      
      {/* Main Result */}
      <div className="text-center mb-6">
        <div className="text-sm font-medium text-muted-foreground">{t.suggestedRange}</div>
        <div className="text-4xl font-bold text-primary my-1">{results.amount}</div>
        <div className="text-sm text-muted-foreground">{t.basedOnTraditions}</div>
      </div>

      {/* Traditional Cattle Equivalent Section */}
      <div className="mt-4 pt-4 border-t-2 text-center mb-6">
        <div className="flex items-center justify-center font-semibold text-muted-foreground">
          {/*
            CHANGE 2: Here is your beautiful, working COW EMOJI!
            We wrap it in a `span` for good styling practice.
          */}
          <span role="img" aria-label="cow" className="mr-2">🐄</span>
          <span>{t.cattleEquivalent}</span>
        </div>
        <div className="text-2xl font-bold mt-1">{results.cowEquivalent.displayText}</div>
        <div className="text-xs text-muted-foreground">
          {t.marketPrice} R{results.cowEquivalent.pricePerCow.toLocaleString()} {t.perCow}
        </div>
      </div>
      
      {/* Breakdown Section */}
      <div className="space-y-4 border-t-2 pt-6">
        <h3 className="font-semibold text-lg pb-2 text-center">{t.calculationBreakdown}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t.baseAmount}</span>
            <span className="font-medium">R{results.breakdown.base.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.educationBonus}</span>
            <span className="font-medium">R{results.breakdown.education.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.careerConsideration}</span>
            <span className="font-medium">R{results.breakdown.career.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>{t.locationFactor}</span>
            <span className="font-medium">R{results.breakdown.location.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}