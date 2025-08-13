import { Languages } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu' },
    { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa' },
    { code: 'nso', name: 'Sepedi', nativeName: 'Sepedi (Northern Sotho)' },
    { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
    { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  ];

  return (
    <div className="flex flex-col items-end space-y-1">
      <span className="text-xs font-medium text-black">Language</span>
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32 md:w-48 focus:ring-2 focus:ring-green-600 focus:border-transparent text-black bg-white/90 backdrop-blur-sm border border-white/20 shadow-sm">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="hover:bg-green-50 focus:bg-green-50 cursor-pointer">
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}