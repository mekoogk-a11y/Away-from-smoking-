import React, { useState } from 'react';
import { Language, UserProfile, CalculatedStats } from '../types';
import { translations } from '../data/translations';
import { CURRENCIES, saveUserProfile } from '../utils/storage';
import { healthMilestonesList } from '../data/milestones';
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Heart, 
  Settings, 
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface JourneyTrackerViewProps {
  lang: Language;
  profile: UserProfile;
  stats: CalculatedStats;
  onUpdateProfile: (newProfile: UserProfile) => void;
  onBack?: () => void;
}

export const JourneyTrackerView: React.FC<JourneyTrackerViewProps> = ({
  lang,
  profile,
  stats,
  onUpdateProfile,
  onBack
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [isEditing, setIsEditing] = useState(false);

  // Form local state
  const [cigsPerDay, setCigsPerDay] = useState(profile.cigarettesPerDay);
  const [packPrice, setPackPrice] = useState(profile.packPrice);
  const [cigsPerPack, setCigsPerPack] = useState(profile.cigarettesPerPack);
  const [quitDate, setQuitDate] = useState(
    new Date(profile.quitDate).toISOString().slice(0, 16)
  );
  const [currency, setCurrency] = useState(profile.currency);

  const currencyObj = CURRENCIES.find(c => c.code === profile.currency) || CURRENCIES[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      cigarettesPerDay: Math.max(1, Number(cigsPerDay) || 20),
      packPrice: Math.max(0.1, Number(packPrice) || 25),
      cigarettesPerPack: Math.max(1, Number(cigsPerPack) || 20),
      quitDate: new Date(quitDate).toISOString(),
      currency,
      isConfigured: true,
      soundEnabled: profile.soundEnabled ?? true
    };
    onUpdateProfile(updated);
    saveUserProfile(updated);
    setIsEditing(false);
  };

  const totalElapsedHours = stats.elapsedSeconds / 3600;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ar' ? 'سجل التعافي الحي والبيانات الدقيقة' : 'Live Biological Recovery & Data Hub'}</span>
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold border border-emerald-200 transition-all cursor-pointer active:scale-95 group"
                title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
              >
                <ArrowIcon className="w-3.5 h-3.5 text-emerald-700 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {t.trackerHeader}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {t.trackerSubtitle}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          id="toggle-edit-profile-btn"
          className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Settings className="w-5 h-5" />
          <span>{isEditing ? (lang === 'ar' ? 'إلغاء التعديل' : 'Cancel') : t.editProfile}</span>
        </button>
      </div>

      {/* Edit Form Drawer / Card */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-400 space-y-6 animate-fadeIn"
        >
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Settings className="w-6 h-6 text-orange-600" />
            <h3 className="font-extrabold text-lg text-slate-900">
              {t.setupProfile}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1: Cigs per day */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.cigsPerDay}
              </label>
              <input
                type="number"
                min="1"
                max="200"
                required
                value={cigsPerDay}
                onChange={(e) => setCigsPerDay(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-900"
              />
            </div>

            {/* 2: Pack Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.packPrice}
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={packPrice}
                onChange={(e) => setPackPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-900"
              />
            </div>

            {/* 3: Cigs per pack */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.cigsPerPack}
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={cigsPerPack}
                onChange={(e) => setCigsPerPack(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-900"
              />
            </div>

            {/* 4: Date & time of last cig */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.lastCigDate}
              </label>
              <input
                type="datetime-local"
                required
                value={quitDate}
                onChange={(e) => setQuitDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-900"
              />
            </div>

            {/* 5: Currency */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.currency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-900 bg-white"
              >
                {CURRENCIES.map((cur) => (
                  <option key={cur.code} value={cur.code}>
                    {cur.code} - {lang === 'ar' ? cur.nameAr : cur.nameEn} ({cur.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-3 rounded-2xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-7 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-sm shadow-md"
            >
              {t.saveData}
            </button>
          </div>
        </form>
      )}

      {/* Main Calculated Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Smoke-free duration */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-orange-100 text-orange-700 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
              {lang === 'ar' ? 'عداد حي' : 'Live'}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            {t.smokeFreeTimer}
          </span>
          <p className="text-xl sm:text-2xl font-black text-slate-900">
            {stats.days} {t.days} {stats.hours} {t.hours}
          </p>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            {stats.minutes} {t.minutes} : {stats.seconds} {t.seconds}
          </p>
        </div>

        {/* Money Saved */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {currencyObj.code}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            {t.moneySaved}
          </span>
          <p className="text-xl sm:text-2xl font-black text-emerald-700">
            {stats.moneySaved.toLocaleString()} {currencyObj.symbol}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            {lang === 'ar' ? 'محفوظة في حسابك وجيبك' : 'Safely kept in your wallet'}
          </p>
        </div>

        {/* Cigarettes Avoided */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              {lang === 'ar' ? 'سموم محجوبة' : 'Toxins Blocked'}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            {t.cigarettesAvoided}
          </span>
          <p className="text-xl sm:text-2xl font-black text-rose-700">
            {stats.cigarettesAvoided.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            {lang === 'ar' ? 'سيجارة لم تدخل رئتيك' : 'Cigarettes kept out of your lungs'}
          </p>
        </div>

        {/* Life Regained */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-sky-100 text-sky-700 rounded-xl">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              +11 min / cig
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 block mb-1">
            {t.lifeRegained}
          </span>
          <p className="text-xl sm:text-2xl font-black text-sky-700">
            {stats.lifeRegainedHours.toLocaleString()} {t.hours}
          </p>
          <p className="text-xs text-sky-600 font-semibold mt-1">
            {lang === 'ar' ? 'عمر إضافي بصحة ونشاط' : 'Added healthy lifespan'}
          </p>
        </div>

      </div>

      {/* Health Recovery Milestones Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 text-orange-700 rounded-2xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-slate-900">
                {t.healthRecoveryTimeline}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {lang === 'ar' ? 'نسبة استعادة أجهزة جسمك لكامل وظائفها الطبيعية' : 'Percentage restoration of your vital organs and biological functions'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {healthMilestonesList.map((m, idx) => {
            const isReached = totalElapsedHours >= m.hours;
            const progress = Math.min(100, Math.floor((totalElapsedHours / m.hours) * 100));

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isReached
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-xl ${isReached ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      {lang === 'ar' ? m.titleAr : m.titleEn}
                    </span>
                  </div>

                  <span className={`text-xs font-black px-3 py-1 rounded-full self-start sm:self-auto ${
                    isReached
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {isReached ? t.reachedBadge : `${progress}% ${t.inProgressBadge}`}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {lang === 'ar' ? m.descAr : m.descEn}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isReached ? 'bg-emerald-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
