// Test 3: Adding back the UncleWisdom component.

import CulturalDisclaimer from "@/components/cultural-disclaimer";
import UncleWisdom from "@/components/uncle-wisdom"; // The component we are testing

export default function Calculator() {
  return (
    <div>
      <CulturalDisclaimer />
      <UncleWisdom />

      <div className="p-8 bg-purple-100 border border-purple-300 rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center">Test 3: AI Uncle Loaded</h1>
        <p className="text-center text-gray-600 mt-2">
          If you can see this, it means the UncleWisdom component is also working correctly.
          This would prove the crash is happening inside the CalculatorForm.
        </p>
      </div>
    </div>
  );
}