import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function TranslationWidget() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all border border-transparent hover:border-zinc-800"
        aria-label="Select language"
      >
        <Globe size={18} />
        <span className="hidden sm:inline font-bold uppercase tracking-wider text-[11px]">{currentLang.code}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-3 w-48 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-zinc-800 flex items-center gap-3 transition-colors ${currentLang.code === lang.code ? 'text-blue-400 font-bold bg-blue-500/5' : 'text-zinc-400 font-medium'
                  }`}
              >
                <span className="text-lg">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

