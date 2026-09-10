import React, { useState } from 'react';
import { Language } from '../types';
import { translations, languagesConfig } from '../data/translations';
import { AppLogo } from './AppLogo';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  Home, 
  Camera, 
  HeartHandshake, 
  Stethoscope, 
  Building2, 
  Flame, 
  PlaySquare, 
  BookOpen, 
  ShieldCheck, 
  Zap,
  Globe2,
  ChevronDown,
  Sparkles,
  CalendarCheck2,
  Film
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  lang: Language;
  onToggleLanguage: (newLang: Language) => void;
  onOpenNeedHelpNow: () => void;
  onOpenIntro?: () => void;
  onOpenSudaneseAdVoice?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLanguage,
  onOpenNeedHelpNow,
  onOpenIntro,
  onOpenSudaneseAdVoice
}) => {
  const t = translations[lang] || translations.en;
  const isAr = lang === 'ar' || lang === 'ur';
  const [showLangMenu, setShowLangMenu] = useState(false);

  const getAppName = () => {
    if (lang === 'fr') return 'Le tabagisme est dangereux pour la santé';
    if (lang === 'en') return 'Smoking Is Harmful to Health';
    return 'التدخين ضار بالصحة';
  };

  const getAppSubtitle = () => {
    if (lang === 'ar') return 'Smoking Is Harmful to Health';
    return 'التدخين ضار بالصحة';
  };

  const navItems = [
    { id: 'home', label: t.home || 'Home', icon: Home },
    { id: 'magazine', label: isAr ? 'المجلة الرقمية' : 'Digital Magazine', icon: BookOpen },
    { id: 'gallery', label: isAr ? 'معرض اللوحات (9)' : 'Awareness Gallery', icon: Sparkles },
    { id: 'videoCenter', label: isAr ? 'مركز الفيديو' : 'Video Center', icon: PlaySquare },
    { id: 'challenge', label: isAr ? 'تحدي الـ 30 يوماً' : '30-Day Challenge', icon: CalendarCheck2 },
    { id: 'medical-photos', label: t.medicalPhotos || 'Medical Photos', icon: Camera },
    { id: 'expert', label: t.expertHelp || 'Expert Help', icon: HeartHandshake },
    { id: 'doctors', label: t.doctors || 'Doctors', icon: Stethoscope },
    { id: 'centers', label: t.globalCenters || 'Centers', icon: Building2 },
    { id: 'cravings', label: t.cravingRescue || 'Craving Relief', icon: Flame },
    { id: 'sources', label: t.medicalSources || 'Medical Sources', icon: ShieldCheck }
  ];

  const currentLangObj = languagesConfig.find(l => l.code === lang) || languagesConfig[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs text-slate-950 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2">
          
          {/* Logo & App Name */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-start group cursor-pointer focus:outline-none shrink-0"
            id="nav-logo-btn"
          >
            <AppLogo size="md" lang={lang} />
            <div>
              <h1 className="font-black text-base sm:text-lg text-slate-950 tracking-tight leading-tight group-hover:text-sky-900 transition-colors">
                {getAppName()}
              </h1>
              <p className="text-[11px] sm:text-xs font-bold text-slate-500">
                {getAppSubtitle()}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-sky-50/70 p-1.5 rounded-2xl border border-sky-100/80 overflow-x-auto max-w-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Sudanese Ad Voice + Intro Video + SOS Help + Language Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Sudanese Ad Voice Button: صوت إعلاني سوداني حماسي */}
            {onOpenSudaneseAdVoice && (
              <button
                onClick={onOpenSudaneseAdVoice}
                id="sudanese-ad-voice-btn"
                className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-sky-50 via-white to-sky-100/80 hover:from-sky-100 hover:to-sky-200 text-slate-950 rounded-xl text-xs font-black shadow-xs border border-sky-200 active:scale-95 transition-all cursor-pointer"
                title="استمع إلى الصوت الإعلاني الحماسي بالعامية السودانية (صوت رجل)"
              >
                <span className="text-base">🎙️</span>
                <span className="hidden lg:inline font-bold">
                  {lang === 'ar' ? 'إعلان حماسي (سوداني)' : 'Sudanese Ad Voice'}
                </span>
                <span className="lg:hidden text-[11px] font-bold">🇸🇩</span>
              </button>
            )}

            {/* Intro Video Button */}
            {onOpenIntro && (
              <button
                onClick={onOpenIntro}
                id="play-intro-btn"
                className="flex items-center gap-1 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-extrabold border border-slate-200 active:scale-95 transition-all cursor-pointer"
                title={isAr ? 'فيديو الانترو التوعوي' : 'Official Campaign Intro Video'}
              >
                <Film className="w-3.5 h-3.5 text-slate-800" />
                <span className="hidden sm:inline">{isAr ? 'الانترو' : 'Intro'}</span>
              </button>
            )}

            {/* PWA Install Button: 📱 تثبيت على الجهاز */}
            <PWAInstallButton lang={lang} variant="navbar" />

            {/* Urgent "أحتاج مساعدة الآن" Button */}
            <button
              onClick={onOpenNeedHelpNow}
              id="emergency-need-help-btn"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md shadow-rose-950/15 active:scale-95 transition-all border border-rose-500 cursor-pointer"
              title={t.needHelpNow}
            >
              <Zap className="w-4 h-4 fill-current text-white shrink-0" />
              <span className="whitespace-nowrap font-black">
                {t.needHelpNow}
              </span>
            </button>

            {/* Multilingual Dropdown Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-sky-50 text-slate-900 rounded-xl text-xs font-extrabold border border-sky-200 shadow-xs cursor-pointer"
                id="lang-dropdown-btn"
              >
                <span className="text-base" role="img" aria-label="Flag">
                  {currentLangObj.flag}
                </span>
                <span className="hidden md:inline font-bold">
                  {currentLangObj.label}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {showLangMenu && (
                <div 
                  className="absolute end-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-sky-100 py-1.5 z-50 text-slate-800 animate-fadeIn"
                  onClick={() => setShowLangMenu(false)}
                >
                  <div className="px-3.5 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    {t.switchLanguage}
                  </div>
                  {languagesConfig.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => onToggleLanguage(item.code)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-bold text-start hover:bg-sky-50 transition-colors cursor-pointer ${
                        lang === item.code ? 'text-sky-950 bg-sky-50/80 font-black' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.flag}</span>
                        <span>{item.label}</span>
                      </div>
                      {lang === item.code && (
                        <span className="w-2 h-2 rounded-full bg-slate-950"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile & Tablet Horizontal Scrollable Navigation */}
      <div className="2xl:hidden border-t border-sky-100 bg-sky-50/40 px-2 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                id={`mobile-nav-${item.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-xs font-black'
                    : 'text-slate-700 hover:bg-white hover:text-slate-950'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
