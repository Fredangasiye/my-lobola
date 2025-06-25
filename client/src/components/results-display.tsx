import { TrendingUp, Beef } from "lucide-react";
import type { CalculationResult } from "@shared/schema";

interface ResultsDisplayProps {
  results: CalculationResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <TrendingUp className="text-forest-green mr-3" />
        Cultural Guidance Results
      </h2>
      
      {/* Main Result */}
      <div className="bg-gradient-to-r from-forest-green to-green-600 text-white rounded-lg p-6 mb-6 text-center">
        <div className="text-sm font-medium mb-2">Suggested Range</div>
        <div className="text-3xl font-bold mb-2">{results.amount}</div>
        <div className="text-sm opacity-90">Based on cultural traditions and modern considerations</div>
      </div>

      {/* Cow Equivalent */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg p-6 mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <Beef className="mr-2 h-5 w-5" />
          <div className="text-sm font-medium">Traditional Cattle Equivalent</div>
        </div>
        <div className="text-2xl font-bold mb-2">{results.cowEquivalent.displayText}</div>
        <div className="text-sm opacity-90">
          Based on current market price of R{results.cowEquivalent.pricePerCow.toLocaleString()} per cow
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Calculation Breakdown:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Amount:</span>
            <span className="font-medium">R{results.breakdown.base.toLocaleString()}</span>
          </div>
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
  );
}
