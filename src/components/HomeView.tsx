import React, { useState, useEffect } from 'react';
import { Language, UserProfile, CalculatedStats } from '../types';
import { translations } from '../data/translations';
import { motivationalQuotes } from '../data/quotes';
import { CURRENCIES, calculateStats } from '../utils/storage';
import { MedicalDisclaimerBanner } from './MedicalDisclaimerBanner';
import { 
  Clock, 
  Coins, 
  ShieldAlert, 
  PlaySquare, 
  Flame, 
  TrendingUp, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Zap,
  Camera,
  HeartHandshake,
  Stethoscope,
  Building2
} from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  profile: UserProfile;
  stats: CalculatedStats;
  onNavigate: (tabId: string) => void;
  onOpenProfileModal: () => void;
  onOpenNeedHelpNow: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  profile,
  stats,
  onNavigate,
  onOpenProfileModal,
  onOpenNeedHelpNow
}) => {
  const t = translations[lang];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const currencyObj = CURRENCIES.find(c => c.code === profile.currency) || CURRENCIES[0];

  // Auto cycle quotes every 14 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 14000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const currentQuote = motivationalQuotes[currentQuoteIndex];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Hero Card */}
      <section className="relative rounded-3xl bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white p-6 sm:p-8 shadow-xl overflow-hidden border border-orange-400/30">
        <div className="absolute top-0 end-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-60 h-60 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-orange-100 border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{lang === 'ar' ? 'المنصة العالمية لمكافحة التدخين والتعافي' : 'Global Tobacco Cessation & Recovery Platform'}</span>
            </div>

            <button
              onClick={onOpenNeedHelpNow}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer animate-pulse"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-yellow-300" />
              <span>{t.needHelpNow}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-3">
            {t.tagline}
          </h2>

          <p className="text-sm sm:text-base text-orange-100 leading-relaxed mb-6 max-w-3xl font-medium">
            {lang === 'ar'
              ? 'مرحباً بك في منصتك الطبية العالمية لإنهاء إدمان التبغ، استعادة صحة الرئتين والقلب، توفير أموالك، والتواصل مع خطوط المساعدة الرسمية والمراكز المعتمدة.'
              : 'Welcome to your global clinical platform to end nicotine addiction, regenerate vital organs, save money, and connect with accredited national helplines and specialists.'}
          </p>

          {/* Primary Quick Access Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* 1: أضرار التدخين المصورة */}
            <button
              onClick={() => onNavigate('medical-photos')}
              className="flex items-center justify-between p-3.5 bg-white text-orange-700 hover:bg-orange-50 font-black rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-orange-100 text-orange-700 rounded-xl group-hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-900">{t.medicalPhotos}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'صور طبية واقعية' : 'Clinical Photography'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-orange-600 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 2: استشارات ومساعدة الإقلاع */}
            <button
              onClick={() => onNavigate('expert')}
              className="flex items-center justify-between p-3.5 bg-orange-800/40 hover:bg-orange-800/60 backdrop-blur-md text-white font-bold rounded-2xl border border-orange-400/30 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-200 rounded-xl group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">{t.expertHelp}</span>
                  <span className="block text-xs text-orange-200">{lang === 'ar' ? 'خطوط رسمية ومنظمات' : 'WHO/CDC Helplines'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-orange-200 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 3: الأطباء والخبراء */}
            <button
              onClick={() => onNavigate('doctors')}
              className="flex items-center justify-between p-3.5 bg-orange-800/40 hover:bg-orange-800/60 backdrop-blur-md text-white font-bold rounded-2xl border border-orange-400/30 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/20 text-blue-200 rounded-xl group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">{t.doctors}</span>
                  <span className="block text-xs text-orange-200">{lang === 'ar' ? 'أطباء صدر وإدمان' : 'Clinical Specialists'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-orange-200 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 4: المراكز العالمية */}
            <button
              onClick={() => onNavigate('centers')}
              className="flex items-center justify-between p-3.5 bg-orange-800/40 hover:bg-orange-800/60 backdrop-blur-md text-white font-bold rounded-2xl border border-orange-400/30 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-500/20 text-teal-200 rounded-xl group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">{t.globalCenters}</span>
                  <span className="block text-xs text-orange-200">{lang === 'ar' ? 'عيادات معتمدة وخريطة' : 'Accredited Clinics'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-orange-200 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 5: نصائح الرغبة والإنقاذ */}
            <button
              onClick={() => onNavigate('cravings')}
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-start group border border-red-300/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/20 text-white rounded-xl group-hover:scale-105 transition-transform">
                  <Flame className="w-5 h-5 fill-current text-amber-300" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">{t.cravingRescue}</span>
                  <span className="block text-xs text-red-100">{lang === 'ar' ? 'تمارين 4-7-8 وتشتيت الرغبة' : 'Craving Wave Tools'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 6: مكتبة الفيديو التوعوية */}
            <button
              onClick={() => onNavigate('videos')}
              className="flex items-center justify-between p-3.5 bg-orange-800/40 hover:bg-orange-800/60 backdrop-blur-md text-white font-bold rounded-2xl border border-orange-400/30 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-400/20 text-amber-200 rounded-xl group-hover:scale-105 transition-transform">
                  <PlaySquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-white">{t.videoLibrary}</span>
                  <span className="block text-xs text-orange-200">{lang === 'ar' ? 'فيديوهات تثقيفية' : 'Curated Videos'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-orange-200 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

          </div>
        </div>
      </section>

      {/* Live Smoke-Free Stats & Money Saved Counter */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-orange-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-orange-100 text-orange-700 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                {t.smokeFreeTimer}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {lang === 'ar' ? 'العداد الحي منذ إطفاء آخر سيجارة' : 'Live ticker since extinguishing your last cigarette'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenProfileModal}
            className="text-xs font-black text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
          >
            {t.editProfile}
          </button>
        </div>

        {/* 4 Time Boxes (Days, Hours, Minutes, Seconds) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl text-center border border-orange-200/80 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-orange-700 tracking-tight">
              {stats.days}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.days}
            </span>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl text-center border border-orange-200/80 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-orange-700 tracking-tight">
              {stats.hours}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.hours}
            </span>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl text-center border border-orange-200/80 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-orange-700 tracking-tight">
              {stats.minutes}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.minutes}
            </span>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-2xl text-center border border-orange-200/80 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-orange-700 tracking-tight animate-pulse">
              {stats.seconds}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.seconds}
            </span>
          </div>
        </div>

        {/* Financial & Biological Gains Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Money Saved */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500 text-white rounded-xl shrink-0 shadow-sm">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                {t.moneySaved}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                  {stats.moneySaved.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-emerald-900">
                  {currencyObj.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* Cigarettes Avoided */}
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 flex items-center gap-3.5">
            <div className="p-3 bg-rose-500 text-white rounded-xl shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                {t.cigarettesAvoided}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-rose-700">
                  {stats.cigarettesAvoided.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-rose-900">
                  {lang === 'ar' ? 'سيجارة تم تفاديها' : 'avoided'}
                </span>
              </div>
            </div>
          </div>

          {/* Life Regained */}
          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 flex items-center gap-3.5">
            <div className="p-3 bg-sky-500 text-white rounded-xl shrink-0 shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                {t.lifeRegained}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-sky-700">
                  {stats.lifeRegainedHours.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-sky-900">
                  {lang === 'ar' ? 'ساعة حياة مستردة' : 'clean hours'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Motivational Quotes Carousel */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-100">
              {t.dailyMotivation}
            </span>
          </div>

          <button
            onClick={handleNextQuote}
            id="next-quote-btn"
            className="flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{t.nextQuote}</span>
          </button>
        </div>

        <blockquote className="text-base sm:text-xl font-bold text-white leading-relaxed mb-3">
          "{lang === 'ar' ? currentQuote.textAr : currentQuote.textEn}"
        </blockquote>

        <p className="text-xs text-amber-100 font-semibold">
          — {lang === 'ar' ? currentQuote.authorAr : currentQuote.authorEn}
        </p>
      </section>

      {/* Medical Disclaimer Notice */}
      <MedicalDisclaimerBanner lang={lang} />

    </div>
  );
};
