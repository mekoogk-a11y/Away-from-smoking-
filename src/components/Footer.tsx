import React from 'react';
import { Language } from '../types';
import { translations, languagesConfig } from '../data/translations';
import { AppLogo } from './AppLogo';
import { MessageCircle, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onSelectTab: (tabId: string) => void;
  onToggleLanguage: (newLang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onSelectTab,
  onToggleLanguage
}) => {
  const t = translations[lang];

  return (
    <footer className="mt-16 bg-slate-950 text-slate-200 border-t border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <AppLogo size="md" withText={true} lang={lang} textColor="text-white" />
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {lang === 'ar'
                ? 'منصة طبية وتوعوية متقدمة للتوعية بمخاطر التدخين وتقديم استشارات ومراكز معتمدة لمساعدة الملايين حول العالم على الإقلاع النهائي واستعادة عافيتهم.'
                : 'A global evidence-based platform for smoking cessation, medical risk awareness, verified clinical hotlines, and recovery tracking.'}
            </p>
          </div>

          {/* Col 2: Clinical & Awareness Sections */}
          <div>
            <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
              {lang === 'ar' ? 'الأقسام والمجلة الرقمية' : 'Digital Magazine & Hub'}
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-300">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.home || 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('magazine')} className="hover:text-sky-300 transition-colors cursor-pointer text-sky-300">
                  {lang === 'ar' ? 'المجلة الرقمية التوعوية' : 'Awareness Digital Magazine'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('gallery')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {lang === 'ar' ? 'معرض اللوحات التوعوية (9)' : 'Awareness Art Gallery'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('videoCenter')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {lang === 'ar' ? 'مركز الفيديو (فيلم المبادرة)' : 'Video Cinema Center'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('challenge')} className="hover:text-emerald-300 transition-colors cursor-pointer text-emerald-400">
                  {lang === 'ar' ? 'تحدي الـ 30 يوماً ومتابعة اليوم' : '30-Day Quit Challenge'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('medical-photos')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.medicalPhotos}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Recovery */}
          <div>
            <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
              {lang === 'ar' ? 'أدوات التعافي والمصادر' : 'Tools & Compliance'}
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-300">
              <li>
                <button onClick={() => onSelectTab('cravings')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.cravingRescue}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('videos')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.videoLibrary}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('journey')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.myJourney}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('sources')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.medicalSources}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('legal')} className="hover:text-sky-300 transition-colors cursor-pointer">
                  {t.privacyPolicy} & {t.termsOfUse}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Multilingual & Direct Contact */}
          <div>
            <h4 className="font-extrabold text-sm text-white mb-3 tracking-wide">
              {t.switchLanguage}
            </h4>
            
            <div className="flex flex-wrap gap-1.5 mb-4">
              {languagesConfig.map((item) => (
                <button
                  key={item.code}
                  onClick={() => onToggleLanguage(item.code)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    lang === item.code
                      ? 'bg-sky-600 text-white font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <a
              href="https://wa.me/249919980435"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-emerald-500/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب: 00249919980435</span>
            </a>
          </div>

        </div>

        {/* Bottom Exact Verbatim Credits Section */}
        <div className="pt-8 text-center space-y-2">
          <p className="font-black text-sm sm:text-base text-sky-400">
            تصميم كمال جعفر زكريا
          </p>
          <p className="dir-ltr text-xs sm:text-sm font-bold text-sky-300">
            واتساب: <a href="https://wa.me/249919980435" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">00249919980435</a>
          </p>
          <p className="text-xs sm:text-sm text-slate-400 font-medium pt-1 max-w-xl mx-auto">
            جميع الحقوق محفوظة لصالح منصة الهدي والنور للتطبيقات والمواقع الإسلامية Sudan
          </p>
        </div>

      </div>
    </footer>
  );
};
