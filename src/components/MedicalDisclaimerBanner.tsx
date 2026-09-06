import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Stethoscope, AlertCircle } from 'lucide-react';

interface MedicalDisclaimerBannerProps {
  lang: Language;
}

export const MedicalDisclaimerBanner: React.FC<MedicalDisclaimerBannerProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-amber-50/95 border border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-sm text-slate-800 flex items-start gap-3.5 my-4">
      <div className="p-2.5 bg-amber-500/15 text-amber-800 rounded-xl shrink-0 mt-0.5">
        <Stethoscope className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-sm sm:text-base text-amber-950 flex items-center gap-2 mb-1">
          <span>{t.medicalDisclaimerTitle}</span>
          <AlertCircle className="w-4 h-4 text-amber-600 inline" />
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {t.medicalDisclaimerText}
        </p>
      </div>
    </div>
  );
};
