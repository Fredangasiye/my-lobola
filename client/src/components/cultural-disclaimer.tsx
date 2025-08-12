import { Info } from "lucide-react";
import { Language } from "../lib/simple-translations";
import { getSimpleTranslation } from "../lib/simple-translations";

interface CulturalDisclaimerProps {
  currentLanguage: Language;
}

export default function CulturalDisclaimer({ currentLanguage }: CulturalDisclaimerProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-warm-orange p-6 mb-8">
      <div className="flex items-start space-x-3">
        <Info className="text-warm-orange text-xl mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            {getSimpleTranslation('culturalSensitivityNotice', currentLanguage)}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {getSimpleTranslation('culturalSensitivityDescription', currentLanguage)}
          </p>
        </div>
      </div>
    </div>
  );
}
