import React, { useState } from 'react';
import { Language, UserProfile, CalculatedStats } from '../types';
import { translations } from '../data/translations';
import { AppLogo } from './AppLogo';
import { MedicalDisclaimerBanner } from './MedicalDisclaimerBanner';
import { resetAllData } from '../utils/storage';
import { 
  Info, 
  Shield, 
  Heart, 
  Phone, 
  MessageCircle, 
  Share2, 
  RefreshCcw, 
  CheckCircle,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface AboutViewProps {
  lang: Language;
  profile: UserProfile;
  stats: CalculatedStats;
  onResetData: () => void;
  onBack?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  lang,
  profile,
  stats,
  onResetData,
  onBack
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: lang === 'ar' ? 'كيف تترك التدخين | Quit Smoking' : 'Quit Smoking App',
        text: lang === 'ar' ? 'تطبيق رائع لمساعدتك على الإقلاع عن التدخين والتعافي الصحي والمالي.' : 'Empowering app to help you quit smoking and reclaim your vitality.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetConfirm = () => {
    if (window.confirm(t.resetConfirm)) {
      resetAllData();
      onResetData();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* App Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 text-center flex flex-col items-center relative">
        {onBack && (
          <div className="w-full flex justify-start mb-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-xl text-xs font-bold border border-orange-200 transition-all cursor-pointer active:scale-95 group"
              title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
            >
              <ArrowIcon className="w-4 h-4 text-orange-600 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
            </button>
          </div>
        )}

        <AppLogo size="xl" className="mb-4" />
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
          BEYOND SMOKING
        </h2>
        <p className="text-sm font-bold text-orange-600 mb-1">
          Quit Smoking. Reclaim Your Health.
        </p>
        <p className="text-xs text-slate-500 font-semibold mb-3">
          Your Health. Your Freedom. Your Future. — The Digital Anti-Smoking Awareness Magazine
        </p>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-6 font-medium">
          {lang === 'ar'
            ? 'منصة ومجلة رقمية عالمية متخصصة تهدف للتوعية الطبية بمخاطر التبغ ومساعدة الأفراد في كل مكان على التحرر من الإدمان، مع تتبع دقيق للصحة والمدخرات المالية وأدوات تفاعلية لإخماد الرغبة الملحة وتحدي الـ 30 يوماً.'
            : 'A premier global digital awareness magazine and cessation platform engineered to empower individuals worldwide to overcome nicotine addiction through verified medical data, financial tracking, awareness art, video cinema, and a 30-day challenge.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleShare}
            id="share-app-btn"
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? (lang === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!') : t.shareApp}</span>
          </button>

          <a
            href="https://wa.me/249919980435"
            target="_blank"
            rel="noopener noreferrer"
            id="whatsapp-contact-link"
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.whatsappContact}</span>
          </a>
        </div>
      </div>

      {/* Privacy and Local Storage Notice */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 flex items-start gap-4">
        <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl shrink-0">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-lg text-slate-900 mb-1">
            {lang === 'ar' ? 'الخصوصية والأمان التام' : 'Privacy & Local Data Protection'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {lang === 'ar'
              ? 'نحن نحترم خصوصيتك بالكامل. جميع بيانات رحلتك، تاريخ إقلاعك، ومعدل استهلاكك تُحفظ محلياً على جهازك فقط ولا يتم إرسالها إلى أي خوادم خارجية أو طلب بيانات شخصية غير ضرورية.'
              : 'Your privacy is paramount. All your quit journey data, dates, and currency preferences are stored securely on your local browser only, with zero unnecessary data collection.'}
          </p>
        </div>
      </div>

      {/* Official Medical Disclaimer */}
      <MedicalDisclaimerBanner lang={lang} />

      {/* Required Exact Intellectual Property & Credits Screen */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-100/70 p-6 sm:p-8 border-2 border-orange-300 shadow-md text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-600 text-white rounded-full text-xs font-black mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>{t.rightsTitle}</span>
        </div>

        {/* Verbatim Credits Requirement */}
        <div className="space-y-3 py-2 text-slate-900 font-extrabold text-base sm:text-lg leading-relaxed">
          <p className="tracking-wide">
            تصميم كمال جعفر زكريا
          </p>
          <p className="dir-ltr text-orange-800 font-black">
            واتساب: <a href="https://wa.me/249919980435" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-950">00249919980435</a>
          </p>
          <div className="w-16 h-0.5 bg-orange-300 mx-auto my-2" />
          <p className="text-sm sm:text-base font-bold text-slate-700 max-w-xl mx-auto">
            جميع الحقوق محفوظة لصالح منصة الهدي والنور للتطبيقات والمواقع الإسلامية Sudan
          </p>
        </div>
      </div>

      {/* Data Management & Reset Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-slate-800">
            {lang === 'ar' ? 'إدارة البيانات المحلية' : 'Local Data Management'}
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            {lang === 'ar' ? 'يمكنك إعادة ضبط رحلة الإقلاع للبدء من جديد في أي وقت' : 'You can reset all quit progress and start fresh anytime'}
          </p>
        </div>

        <button
          onClick={handleResetConfirm}
          id="reset-all-data-btn"
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer self-start sm:self-auto border border-rose-200"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>{t.resetDataWarning}</span>
        </button>
      </div>

    </div>
  );
};
