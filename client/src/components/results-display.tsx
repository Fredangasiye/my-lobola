import { TrendingUp, Beef } from "lucide-react";
import type { CalculationResult } from "@shared/schema";
import { getSimpleTranslation } from "@/lib/simple-translations";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const t = getSimpleTranslation('en'); // Use English for now

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="text-forest-green mr-3" />
        {t.culturalGuidanceResults}
      </h2>
      
      {/* Main Result */}
      <div className="bg-gradient-to-r from-forest-green to-green-600 text-white rounded-lg p-6 mb-6 text-center">
        <div className="text-sm font-medium mb-2">Suggested Range</div>
        <div className="text-4xl font-bold mb-2">{results.amount}</div>
        <div className="text-sm opacity-90">Based on cultural traditions and modern considerations</div>
        
        {/* Cow Equivalent - now under the price */}
        <div className="mt-4 pt-4 border-t border-white/30">
          <div className="flex items-center justify-center mb-2">
            <Beef className="mr-2 h-4 w-4" />
            <div className="text-xs font-medium">Traditional Cattle Equivalent</div>
          </div>
          <div className="text-lg font-semibold">{results.cowEquivalent.displayText}</div>
          <div className="text-xs opacity-80">
            Market price: R{results.cowEquivalent.pricePerCow.toLocaleString()} per cow
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 mt-4">
        <h3 className="font-semibold text-gray-800">Calculation Breakdown:</h3>
        <div className="space-y-2">
          <div className="flex justify-between p-3 bg-forest-green/10 rounded-lg">
            <span className="text-gray-700 font-medium">Base Amount:</span>
            <span className="font-bold text-lg text-forest-green">R{results.breakdown.base.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Education Bonus:</span>
              <span className="font-medium">R{results.breakdown.education.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Career Consideration:</span>
              <span className="font-medium">R{results.breakdown.career.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location Factor:</span>
              <span className="font-medium">R{results.breakdown.location.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
