import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Language } from "@/lib/simple-translations";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'zu' as Language, name: 'isiZulu', nativeName: 'isiZulu' },
    { code: 'xh' as Language, name: 'isiXhosa', nativeName: 'isiXhosa' },
    { code: 'nso' as Language, name: 'Sepedi', nativeName: 'Sepedi (Northern Sotho)' },
    { code: 'tn' as Language, name: 'Setswana', nativeName: 'Setswana' },
    { code: 'st' as Language, name: 'Sesotho', nativeName: 'Sesotho' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-black" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-48 focus:ring-2 focus:ring-green-600 focus:border-transparent text-black">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}