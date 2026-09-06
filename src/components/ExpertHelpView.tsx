import React, { useState } from 'react';
import { Language, ConsultationEntity } from '../types';
import { translations } from '../data/translations';
import { officialConsultationEntities } from '../data/expertHelpData';
import { 
  HeartHandshake, 
  Search, 
  ExternalLink, 
  PhoneCall, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle,
  HelpCircle,
  Stethoscope,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ExpertHelpViewProps {
  lang: Language;
  onBack?: () => void;
}

export const ExpertHelpView: React.FC<ExpertHelpViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('ALL');

  const countries = [
    { code: 'ALL', labelAr: 'جميع الدول والمصادر', labelEn: 'All Countries & Global' },
    { code: 'GLOBAL', labelAr: '🌐 منظمة الصحة العالمية', labelEn: '🌐 WHO (Global)' },
    { code: 'SA', labelAr: '🇸🇦 المملكة العربية السعودية', labelEn: '🇸🇦 Saudi Arabia' },
    { code: 'US', labelAr: '🇺🇸 الولايات المتحدة الأمريكية', labelEn: '🇺🇸 United States' },
    { code: 'GB', labelAr: '🇬🇧 المملكة المتحدة', labelEn: '🇬🇧 United Kingdom' },
    { code: 'FR', labelAr: '🇫🇷 فرنسا', labelEn: '🇫🇷 France' },
    { code: 'CN', labelAr: '🇨🇳 الصين', labelEn: '🇨🇳 China' },
    { code: 'AE', labelAr: '🇦🇪 الإمارات العربية المتحدة', labelEn: '🇦🇪 United Arab Emirates' },
    { code: 'EG', labelAr: '🇪🇬 جمهورية مصر العربية', labelEn: '🇪🇬 Egypt' },
    { code: 'NG', labelAr: '🇳🇬 نيجيريا', labelEn: '🇳🇬 Nigeria' },
  ];

  const filteredEntities = officialConsultationEntities.filter((entity) => {
    const matchesCountry = selectedCountryCode === 'ALL' || entity.countryCode === selectedCountryCode;
    const nameStr = (entity.name[lang] || entity.name.en).toLowerCase();
    const descStr = (entity.description[lang] || entity.description.en).toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || nameStr.includes(q) || descStr.includes(q);
    return matchesCountry && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-400/30">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/25">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-200" />
            <span>{lang === 'ar' ? 'الخدمات والخطوط الرسمية المعتمدة' : 'Official Accredited Quitlines'}</span>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-black text-white transition-all cursor-pointer active:scale-95 group"
              title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
            >
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
            </button>
          )}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          {t.expertHelpHeader}
        </h2>
        
        <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-3xl font-medium">
          {t.expertHelpSubtitle}
        </p>
      </div>

      {/* Scientifically Proven Cessation Approaches (WHO compliant) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
              {t.provenMethodsTitle}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              {lang === 'ar' ? 'استراتيجيات معتمدة من منظمة الصحة العالمية ترفع فرص النجاح بنسبة 300%' : 'WHO-recommended comprehensive cessation pillars'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              {t.methodBehavioral}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              {t.methodDigital}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              {t.methodNRT}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              {t.methodSocial}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 flex flex-col md:flex-row items-center gap-4">
        {/* Country Filter */}
        <div className="w-full md:w-auto overflow-x-auto pb-1 flex items-center gap-2 no-scrollbar">
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => setSelectedCountryCode(c.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedCountryCode === c.code
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {lang === 'ar' ? c.labelAr : c.labelEn}
            </button>
          ))}
        </div>

        {/* Text Search */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          <input
            type="text"
            placeholder={t.searchCountry}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Entities Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntities.map((entity) => (
          <div
            key={entity.id}
            className="bg-white rounded-3xl p-6 shadow-lg border border-emerald-100/90 hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {entity.country[lang] || entity.country.en}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ar' ? 'جهة حكومية/رسمية' : 'Verified Entity'}</span>
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {entity.name[lang] || entity.name.en}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {entity.description[lang] || entity.description.en}
              </p>

              {/* Assistance Type */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-black text-emerald-700 block mb-1">
                  {t.serviceTypeLabel}
                </span>
                <p className="text-xs font-bold text-slate-700">
                  {entity.helpType[lang] || entity.helpType.en}
                </p>
              </div>

              {/* Contact Method */}
              {entity.contactMethod && (
                <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                  <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{entity.contactMethod}</span>
                </div>
              )}
            </div>

            {/* Action Links */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={entity.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 hover:underline"
              >
                <Globe className="w-4 h-4" />
                <span>{t.visitOfficialSite}</span>
              </a>

              <a
                href={entity.quitServiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
              >
                <span>{t.accessService}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
