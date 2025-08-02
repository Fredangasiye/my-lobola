// Test 2: Adding back the CulturalDisclaimer component.

import CulturalDisclaimer from "@/components/cultural-disclaimer";

export default function Calculator() {
  return (
    <div>
      <CulturalDisclaimer />

      <div className="p-8 bg-green-100 border border-green-300 rounded-lg mt-8">
        <h1 className="text-2xl font-bold text-center">Test 2: Disclaimer Loaded</h1>
        <p className="text-center text-gray-600 mt-2">
          If you can see this, it means the CulturalDisclaimer component is also working correctly.
          The crash is in one of the other two components.
        </p>
      </div>
    </div>
  );
}