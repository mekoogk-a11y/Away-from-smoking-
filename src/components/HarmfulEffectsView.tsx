import React, { useState } from 'react';
import { Language, OrganHarm } from '../types';
import { translations } from '../data/translations';
import { organHarmsData } from '../data/harmData';
import { 
  Activity, 
  HeartPulse, 
  Brain, 
  Smile, 
  Gauge, 
  Wind, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertOctagon,
  Sparkles,
  Info,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface HarmfulEffectsViewProps {
  lang: Language;
  onBack?: () => void;
}

export const HarmfulEffectsView: React.FC<HarmfulEffectsViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [selectedOrganId, setSelectedOrganId] = useState<string>('lungs');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'HeartPulse': return HeartPulse;
      case 'Brain': return Brain;
      case 'Smile': return Smile;
      case 'Gauge': return Gauge;
      case 'Wind': return Wind;
      case 'ShieldAlert': return ShieldAlert;
      default: return Activity;
    }
  };

  const selectedOrgan = organHarmsData.find(o => o.id === selectedOrganId) || organHarmsData[0];
  const ActiveIcon = getIcon(selectedOrgan.iconName);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-black border border-red-200">
            <AlertOctagon className="w-3.5 h-3.5 text-red-600" />
            <span>{lang === 'ar' ? 'أطلس أضرار التبغ الموثق علمياً' : 'Scientifically Documented Tobacco Harm Atlas'}</span>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 group"
              title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
            >
              <ArrowIcon className="w-4 h-4 text-orange-700 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
            </button>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          {t.harmsHeader}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {t.harmsSubtitle}
        </p>

        {/* 7 Organ Quick Switcher Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {organHarmsData.map((organ) => {
            const Icon = getIcon(organ.iconName);
            const isSelected = organ.id === selectedOrganId;
            return (
              <button
                key={organ.id}
                onClick={() => setSelectedOrganId(organ.id)}
                id={`organ-tab-${organ.id}`}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-950/20 scale-102'
                    : 'bg-orange-50 hover:bg-orange-100 text-slate-700 hover:text-orange-900 border border-orange-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-600'}`} />
                <span>{lang === 'ar' ? organ.nameAr : organ.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Selected Organ Deep Dive Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-300 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
              <ActiveIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900">
                  {lang === 'ar' ? selectedOrgan.nameAr : selectedOrgan.nameEn}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-700 border border-rose-200">
                  {lang === 'ar' ? 'مستوى الخطر: حرج' : 'Severity: Critical'}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1 max-w-xl font-medium">
                {lang === 'ar' ? selectedOrgan.summaryAr : selectedOrgan.summaryEn}
              </p>
            </div>
          </div>

          {/* Quick Statistic Pill */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 max-w-sm">
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 mb-1">
              <Info className="w-4 h-4 text-amber-600" />
              <span>{t.medicalStat}</span>
            </div>
            <p className="text-xs text-amber-950 font-bold leading-relaxed">
              {lang === 'ar' ? selectedOrgan.statsAr : selectedOrgan.statsEn}
            </p>
          </div>
        </div>

        {/* 2-Column Content: Detailed Medical Harms vs What Happens When You Quit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Medical Harms */}
          <div className="bg-rose-50/70 rounded-2xl p-5 border border-rose-200">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold text-base mb-3">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <h4>{t.medicalHarms}</h4>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {(lang === 'ar' ? selectedOrgan.harmsAr : selectedOrgan.harmsEn).map((harm, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span className="leading-relaxed font-medium">{harm}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recovery Gains When Quitting */}
          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base mb-3">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h4>{t.recoveryGains}</h4>
              </div>
              <div className="p-4 bg-white/80 rounded-xl border border-emerald-200/80 mb-3 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'الجدول الزمني للشفاء' : 'Recovery Timeline'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                  {lang === 'ar' ? selectedOrgan.recoveryTimelineAr : selectedOrgan.recoveryTimelineEn}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mt-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{lang === 'ar' ? 'جسمك مبرمج بيولوجياً على الشفاء بمجرد التوقف!' : 'Your body is biologically designed to heal the moment you stop!'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Grid of All 7 Organs for Visual Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {organHarmsData.map((organ) => {
          const Icon = getIcon(organ.iconName);
          const isSelected = organ.id === selectedOrganId;
          return (
            <div
              key={organ.id}
              onClick={() => setSelectedOrganId(organ.id)}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-orange-500 ring-2 ring-orange-200'
                  : 'border-slate-200 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-orange-100 text-orange-700 rounded-xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {lang === 'ar' ? 'تأثير حاد' : 'High Impact'}
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 mb-1.5">
                  {lang === 'ar' ? organ.nameAr : organ.nameEn}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4 font-medium">
                  {lang === 'ar' ? organ.summaryAr : organ.summaryEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                <span>{lang === 'ar' ? 'عرض التفاصيل والتعافي' : 'View Details & Recovery'}</span>
                <span>{isSelected ? '●' : '→'}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
