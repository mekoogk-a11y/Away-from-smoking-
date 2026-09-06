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
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  lang: Language;
  onToggleLanguage: (newLang: Language) => void;
  onOpenNeedHelpNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLanguage,
  onOpenNeedHelpNow
}) => {
  const t = translations[lang];
  const [showLangMenu, setShowLangMenu] = useState(false);

  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'medical-photos', label: t.medicalPhotos, icon: Camera },
    { id: 'expert', label: t.expertHelp, icon: HeartHandshake },
    { id: 'doctors', label: t.doctors, icon: Stethoscope },
    { id: 'centers', label: t.globalCenters, icon: Building2 },
    { id: 'cravings', label: t.cravingRescue, icon: Flame },
    { id: 'videos', label: t.videoLibrary, icon: PlaySquare },
    { id: 'sources', label: t.medicalSources, icon: BookOpen },
    { id: 'legal', label: t.privacyPolicy, icon: ShieldCheck }
  ];

  const currentLangObj = languagesConfig.find(l => l.code === lang) || languagesConfig[0];

  return (
    <header className="sticky top-0 z-40 bg-orange-600/95 backdrop-blur-md border-b border-orange-500/60 shadow-md text-white transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-2">
          
          {/* Logo & App Name */}
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-start group cursor-pointer focus:outline-none shrink-0"
            id="nav-logo-btn"
          >
            <AppLogo size="md" />
            <div>
              <h1 className="font-black text-base sm:text-lg text-white tracking-tight leading-tight group-hover:text-orange-100 transition-colors">
                {t.appName}
              </h1>
              <p className="text-[11px] sm:text-xs font-semibold text-orange-200">
                {t.appSubname}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center gap-1 bg-orange-700/40 p-1 rounded-2xl border border-orange-400/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  id={`nav-link-${item.id}`}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-orange-700 shadow-sm'
                      : 'text-orange-100 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: PWA Install + SOS Need Help Now + 5-Language Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* PWA Install Button: 📱 ثبّت التطبيق or ✓ التطبيق مثبت على جهازك */}
            <PWAInstallButton lang={lang} variant="navbar" />

            {/* Urgent "أحتاج مساعدة الآن" Button */}
            <button
              onClick={onOpenNeedHelpNow}
              id="emergency-need-help-btn"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-red-950/25 active:scale-95 transition-all border border-red-400/40 cursor-pointer animate-pulse"
              title={t.needHelpNow}
            >
              <Zap className="w-4 h-4 fill-current text-amber-200 shrink-0" />
              <span className="whitespace-nowrap font-black">
                {t.needHelpNow}
              </span>
            </button>

            {/* 5-Language Dropdown Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-2 bg-orange-700/60 hover:bg-orange-700 text-white rounded-xl text-xs font-extrabold border border-orange-400/40 shadow-xs cursor-pointer"
                id="lang-dropdown-btn"
              >
                <span className="text-base" role="img" aria-label="Flag">
                  {currentLangObj.flag}
                </span>
                <span className="hidden md:inline font-bold">
                  {currentLangObj.label}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-orange-200" />
              </button>

              {showLangMenu && (
                <div 
                  className="absolute end-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800 animate-fadeIn"
                  onClick={() => setShowLangMenu(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    {t.switchLanguage}
                  </div>
                  {languagesConfig.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => onToggleLanguage(item.code)}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-extrabold text-start hover:bg-orange-50 transition-colors cursor-pointer ${
                        lang === item.code ? 'text-orange-600 bg-orange-50/70 font-black' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.flag}</span>
                        <span>{item.label}</span>
                      </div>
                      {lang === item.code && (
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
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
      <div className="2xl:hidden border-t border-orange-500/50 bg-orange-700/60 px-2 py-2 overflow-x-auto no-scrollbar">
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
                    ? 'bg-white text-orange-700 shadow-xs font-black'
                    : 'text-orange-100 hover:bg-white/10 hover:text-white'
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
