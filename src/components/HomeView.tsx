import React, { useState, useEffect } from 'react';
import { Language, UserProfile, CalculatedStats } from '../types';
import { translations } from '../data/translations';
import { motivationalQuotes } from '../data/quotes';
import { CURRENCIES, calculateStats } from '../utils/storage';
import { MedicalDisclaimerBanner } from './MedicalDisclaimerBanner';
import { PWAInstallButton } from './PWAInstallButton';
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
  Building2,
  Film
} from 'lucide-react';

interface HomeViewProps {
  lang: Language;
  profile: UserProfile;
  stats: CalculatedStats;
  onNavigate: (tabId: string) => void;
  onOpenProfileModal: () => void;
  onOpenNeedHelpNow: () => void;
  onOpenIntro?: () => void;
  onOpenSudaneseAdVoice?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  profile,
  stats,
  onNavigate,
  onOpenProfileModal,
  onOpenNeedHelpNow,
  onOpenIntro,
  onOpenSudaneseAdVoice
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

  const getHeroTitle = () => {
    if (lang === 'fr') return 'Le tabagisme est dangereux pour la santé';
    if (lang === 'en') return 'Smoking Is Harmful to Health';
    return 'التدخين ضار بالصحة';
  };

  const getHeroSubtitle = () => {
    if (lang === 'ar') return 'أقلع عن التدخين. استعد صحتك وحريتك وعافيتك.';
    if (lang === 'fr') return 'Arrêtez de fumer. Retrouvez votre santé et votre liberté.';
    return 'Quit Smoking. Reclaim Your Health, Vitality, and Freedom.';
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Hero Card - Pure White with Subtle Sky Atmosphere */}
      <section className="relative rounded-3xl bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-950 p-6 sm:p-8 shadow-sm overflow-hidden border border-sky-100">
        <div className="absolute top-0 end-0 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-60 h-60 bg-sky-100/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white rounded-full text-xs font-black text-sky-950 border border-sky-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-700" />
              <span>
                {lang === 'ar'
                  ? 'التدخين ضار بالصحة — المنصة والمجلة الطبية المعتمدة'
                  : 'Smoking Is Harmful to Health — Official Medical Platform'}
              </span>
            </div>

            <button
              onClick={onOpenNeedHelpNow}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-black shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-white" />
              <span>{t.needHelpNow}</span>
            </button>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-snug mb-1">
            {getHeroTitle()}
          </h2>
          <p className="text-sm sm:text-base text-sky-900 font-extrabold mb-3">
            {getHeroSubtitle()}
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 max-w-3xl font-medium">
            {lang === 'ar'
              ? 'المنصة الطبية والتوعوية الشاملة للتعافي والإقلاع النهائي عن التدخين، مع أدوات الطوارئ النفسية، معرض اللوحات التشكيلية، مركز سينما الفيديو، وتحدي الـ 30 يوماً لاستعادة كفاءة الرئة وتوفير أموالك.'
              : lang === 'fr'
              ? 'Plateforme médicale mondiale de référence pour le sevrage tabagique, avec galerie artistique, cinéma vidéo officiel, défi de 30 jours et suivi en temps réel de votre santé.'
              : 'A comprehensive medical and clinical awareness platform for tobacco cessation, featuring high-impact visual galleries, video cinema, a 30-day cessation challenge, and live health analytics.'}
          </p>

          {/* Prominent Action Buttons: Sudanese Ad Voice + Intro Video + PWA */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            
            {/* Sudanese Ad Voice Button: صوت إعلاني حماسي */}
            {onOpenSudaneseAdVoice && (
              <button
                onClick={onOpenSudaneseAdVoice}
                id="hero-sudanese-voice-btn"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-black shadow-md border border-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm"
              >
                <span className="text-base">🎙️</span>
                <span>{lang === 'ar' ? 'تشغيل الإعلان الصوتي الحماسي (سوداني)' : 'Play Sudanese Ad Voice'}</span>
                <span className="text-[10px] bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded-full font-bold">
                  صوت رجل 🇸🇩
                </span>
              </button>
            )}

            {onOpenIntro && (
              <button
                onClick={onOpenIntro}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-sky-50 text-slate-950 font-black shadow-sm border border-sky-200 transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs sm:text-sm"
              >
                <Film className="w-4 h-4 text-slate-800" />
                <span>{lang === 'ar' ? 'فيديو الانترو (1:06 د)' : 'Video Intro (1:06)'}</span>
              </button>
            )}

            <PWAInstallButton lang={lang} variant="hero" />
          </div>

          {/* 4 Pillars of Awareness Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {/* 1: Digital Magazine */}
            <button
              onClick={() => onNavigate('magazine')}
              className="flex items-center justify-between p-4 bg-white hover:bg-sky-50/70 text-slate-950 rounded-2xl border border-sky-100 shadow-xs transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold group-hover:scale-105 transition-transform text-lg">
                  📖
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">
                    {lang === 'ar' ? 'المجلة الرقمية' : 'Digital Magazine'}
                  </span>
                  <span className="block text-xs text-slate-500 font-bold">
                    {lang === 'ar' ? 'مقالات وقراءة صوتية' : 'Articles & Audio'}
                  </span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            {/* 2: Awareness Artwork Gallery */}
            <button
              onClick={() => onNavigate('gallery')}
              className="flex items-center justify-between p-4 bg-white hover:bg-sky-50/70 text-slate-950 rounded-2xl border border-sky-100 shadow-xs transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold group-hover:scale-105 transition-transform text-lg">
                  🎨
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">
                    {lang === 'ar' ? 'معرض اللوحات (9)' : 'Awareness Art (9)'}
                  </span>
                  <span className="block text-xs text-slate-500 font-bold">
                    {lang === 'ar' ? 'رسائل مرئية مؤثرة' : 'Vector Art & Audio'}
                  </span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            {/* 3: Video Center */}
            <button
              onClick={() => onNavigate('videoCenter')}
              className="flex items-center justify-between p-4 bg-white hover:bg-sky-50/70 text-slate-950 rounded-2xl border border-sky-100 shadow-xs transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-900 flex items-center justify-center font-bold group-hover:scale-105 transition-transform text-lg">
                  🎬
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">
                    {lang === 'ar' ? 'مركز الفيديو' : 'Video Cinema'}
                  </span>
                  <span className="block text-xs text-slate-500 font-bold">
                    {lang === 'ar' ? 'الفيلم مع الفصول' : 'Film & Chapters'}
                  </span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>

            {/* 4: 30-Day Challenge */}
            <button
              onClick={() => onNavigate('challenge')}
              className="flex items-center justify-between p-4 bg-white hover:bg-sky-50/70 text-slate-950 rounded-2xl border border-sky-100 shadow-xs transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold group-hover:scale-105 transition-transform text-lg">
                  🔥
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">
                    {lang === 'ar' ? 'تحدي الـ 30 يوماً' : '30-Day Challenge'}
                  </span>
                  <span className="block text-xs text-slate-500 font-bold">
                    {lang === 'ar' ? 'متابعة يومية ومذكرات' : 'Daily Check-In'}
                  </span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </button>
          </div>

          {/* Primary Quick Access Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* 1: أضرار التدخين المصورة */}
            <button
              onClick={() => onNavigate('medical-photos')}
              className="flex items-center justify-between p-3.5 bg-white text-slate-950 hover:bg-sky-50/70 font-black rounded-2xl shadow-xs border border-sky-100 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-100 text-sky-900 rounded-xl group-hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">{t.medicalPhotos}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'صور طبية واقعية' : 'Clinical Photography'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 2: استشارات ومساعدة الإقلاع */}
            <button
              onClick={() => onNavigate('expert')}
              className="flex items-center justify-between p-3.5 bg-white text-slate-950 hover:bg-sky-50/70 font-black rounded-2xl shadow-xs border border-sky-100 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-900 rounded-xl group-hover:scale-105 transition-transform">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">{t.expertHelp}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'خطوط رسمية ومنظمات' : 'WHO/CDC Helplines'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 3: الأطباء والخبراء */}
            <button
              onClick={() => onNavigate('doctors')}
              className="flex items-center justify-between p-3.5 bg-white text-slate-950 hover:bg-sky-50/70 font-black rounded-2xl shadow-xs border border-sky-100 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-100 text-blue-900 rounded-xl group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">{t.doctors}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'أطباء صدر وإدمان' : 'Clinical Specialists'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 4: المراكز العالمية */}
            <button
              onClick={() => onNavigate('centers')}
              className="flex items-center justify-between p-3.5 bg-white text-slate-950 hover:bg-sky-50/70 font-black rounded-2xl shadow-xs border border-sky-100 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-100 text-teal-900 rounded-xl group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">{t.globalCenters}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'عيادات معتمدة وخريطة' : 'Accredited Clinics'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 5: نصائح الرغبة والإنقاذ */}
            <button
              onClick={() => onNavigate('cravings')}
              className="flex items-center justify-between p-3.5 bg-white text-slate-950 hover:bg-sky-50/70 font-black rounded-2xl shadow-xs border border-sky-100 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-100 text-rose-900 rounded-xl group-hover:scale-105 transition-transform">
                  <Flame className="w-5 h-5 fill-current text-rose-600" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">{t.cravingRescue}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'تمارين 4-7-8 وتشتيت الرغبة' : 'Craving Wave Tools'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

            {/* 6: مكتبة الفيديو التوعوية */}
            <button
              onClick={() => onNavigate('videos')}
              className="flex items-center justify-between p-3.5 bg-white text-slate-950 hover:bg-sky-50/70 font-black rounded-2xl shadow-xs border border-sky-100 transition-all active:scale-95 cursor-pointer text-start group"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-100 text-sky-900 rounded-xl group-hover:scale-105 transition-transform">
                  <PlaySquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm font-black text-slate-950">{t.videoLibrary}</span>
                  <span className="block text-xs text-slate-500 font-semibold">{lang === 'ar' ? 'فيديوهات تثقيفية' : 'Curated Videos'}</span>
                </div>
              </div>
              <ArrowIcon className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </button>

          </div>
        </div>
      </section>

      {/* PWA App Install Banner */}
      <PWAInstallButton lang={lang} variant="banner" />

      {/* Live Smoke-Free Stats & Money Saved Counter */}
      <section className="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-sky-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-sky-100 text-sky-950 rounded-2xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-950">
                {t.smokeFreeTimer}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {lang === 'ar' ? 'العداد الحي منذ إطفاء آخر سيجارة' : 'Live ticker since extinguishing your last cigarette'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenProfileModal}
            className="text-xs font-black text-slate-950 hover:text-sky-950 bg-sky-50 hover:bg-sky-100 px-3.5 py-1.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer border border-sky-200"
          >
            {t.editProfile}
          </button>
        </div>

        {/* 4 Time Boxes (Days, Hours, Minutes, Seconds) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-sky-50/60 p-4 rounded-2xl text-center border border-sky-100 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
              {stats.days}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.days}
            </span>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-2xl text-center border border-sky-100 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
              {stats.hours}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.hours}
            </span>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-2xl text-center border border-sky-100 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
              {stats.minutes}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-600">
              {t.minutes}
            </span>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-2xl text-center border border-sky-100 shadow-xs">
            <span className="block font-black text-3xl sm:text-4xl text-slate-950 tracking-tight animate-pulse">
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
            <div className="p-3 bg-emerald-600 text-white rounded-xl shrink-0 shadow-sm">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                {t.moneySaved}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-emerald-800">
                  {stats.moneySaved.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-emerald-950">
                  {currencyObj.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* Cigarettes Avoided */}
          <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 flex items-center gap-3.5">
            <div className="p-3 bg-rose-600 text-white rounded-xl shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider block">
                {t.cigarettesAvoided}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-rose-800">
                  {stats.cigarettesAvoided.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-rose-950">
                  {lang === 'ar' ? 'سيجارة تم تفاديها' : 'avoided'}
                </span>
              </div>
            </div>
          </div>

          {/* Life Regained */}
          <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 flex items-center gap-3.5">
            <div className="p-3 bg-sky-600 text-white rounded-xl shrink-0 shadow-sm">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
                {t.lifeRegained}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-sky-800">
                  {stats.lifeRegainedHours.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-sky-950">
                  {lang === 'ar' ? 'ساعة حياة مستردة' : 'clean hours'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Motivational Quotes Carousel */}
      <section className="bg-gradient-to-r from-sky-50/70 via-white to-sky-50/70 rounded-3xl p-5 sm:p-6 text-slate-950 shadow-xs border border-sky-100 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-700" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
              {t.dailyMotivation}
            </span>
          </div>

          <button
            onClick={handleNextQuote}
            id="next-quote-btn"
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-sky-100 text-slate-800 border border-sky-200 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{t.nextQuote}</span>
          </button>
        </div>

        <blockquote className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed mb-3">
          "{lang === 'ar' ? currentQuote.textAr : currentQuote.textEn}"
        </blockquote>

        <p className="text-xs text-slate-500 font-semibold">
          — {lang === 'ar' ? currentQuote.authorAr : currentQuote.authorEn}
        </p>
      </section>

      {/* Medical Disclaimer Notice */}
      <MedicalDisclaimerBanner lang={lang} />

    </div>
  );
};
