import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { officialMedicalSources } from '../data/medicalSourcesData';
import { 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Building, 
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface MedicalSourcesViewProps {
  lang: Language;
  onBack?: () => void;
}

export const MedicalSourcesView: React.FC<MedicalSourcesViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black border border-white/15">
            <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
            <span>{t.medicalSources}</span>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black text-white transition-all cursor-pointer active:scale-95 group"
              title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
            >
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
            </button>
          )}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          {t.sourcesHeader}
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl font-medium">
          {t.sourcesSubtitle}
        </p>
      </div>

      {/* Trust & Scientific Evidence Pledge */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex items-start gap-4">
        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-1">
            {lang === 'ar' ? 'الالتزام بمعايير الطب المسند بالدليل (Evidence-Based Medicine)' : 'Evidence-Based Medical Commitment'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {lang === 'ar'
              ? 'تعتمد جميع المعلومات الطبية والحسابات الفسيولوجية المنشورة في هذا التطبيق حصراً على الدراسات السريرية المراجعة من الأقران والإرشادات الرسمية الصادرة عن منظمة الصحة العالمية والمراكز الدولية للسيطرة على الأمراض.'
              : 'All physiological recovery timelines, pharmacological warnings, and statistics displayed across this platform are strictly derived from peer-reviewed publications and official WHO/CDC clinical guidelines.'}
          </p>
        </div>
      </div>

      {/* Sources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {officialMedicalSources.map((source) => (
          <div
            key={source.id}
            className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200/90 hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 text-indigo-800 border border-indigo-200">
                  {source.organization}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ar' ? 'مرجع موثق' : 'Verified Reference'}</span>
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {source.title[lang] || source.title.en}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {source.description[lang] || source.description.en}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">
                {source.category.toUpperCase()}
              </span>

              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
              >
                <span>{t.visitSourceSite}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
