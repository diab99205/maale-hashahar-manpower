import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<Props> = ({ currentLang, setLang }) => {
  const nextLang = currentLang === 'he' ? 'ar' : currentLang === 'ar' ? 'en' : 'he';
  const label = nextLang === 'he' ? 'עברית' : nextLang === 'ar' ? 'العربية' : 'English';

  return (
    <button
      onClick={() => setLang(nextLang)}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-bold backdrop-blur-sm border border-white/20"
    >
      <Globe size={16} />
      <span>{label}</span>
    </button>
  );
};

export default LanguageSwitcher;
