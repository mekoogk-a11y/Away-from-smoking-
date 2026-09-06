import React from 'react';
import { Language, CalculatedStats, Achievement } from '../types';
import { translations } from '../data/translations';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Trophy, 
  Crown, 
  Medal, 
  FlameKindling, 
  ShieldCheck, 
  HeartHandshake,
  Zap,
  PiggyBank,
  PartyPopper,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface AchievementsViewProps {
  lang: Language;
  stats: CalculatedStats;
  achievements: Achievement[];
  onBack?: () => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  lang,
  stats,
  achievements,
  onBack
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const elapsedHours = stats.elapsedSeconds / 3600;

  const triggerConfetti = () => {
    soundFx.playFanfare();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f59e0b', '#10b981', '#ffffff']
    });
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlameKindling': return FlameKindling;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      case 'HeartHandshake': return HeartHandshake;
      case 'Award': return Award;
      case 'Medal': return Medal;
      case 'Trophy': return Trophy;
      case 'Crown': return Crown;
      case 'Zap': return Zap;
      case 'PiggyBank': return PiggyBank;
      default: return Award;
    }
  };

  // Determine unlock state based on stats
  const checkUnlocked = (ach: Achievement): boolean => {
    if (ach.type === 'time') {
      return elapsedHours >= ach.targetValue;
    } else if (ach.type === 'cigarettes') {
      return stats.cigarettesAvoided >= ach.targetValue;
    } else if (ach.type === 'money') {
      return stats.moneySaved >= ach.targetValue;
    }
    return false;
  };

  const unlockedCount = achievements.filter(checkUnlocked).length;
  const totalCount = achievements.length;
  const unlockPercent = Math.floor((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner with Overall Progress */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/25">
                <Trophy className="w-3.5 h-3.5 text-amber-200" />
                <span>{lang === 'ar' ? 'لوحة الشرف والبطولة' : 'Hall of Fame & Trophies'}</span>
              </div>

              {onBack && (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-black text-white transition-all cursor-pointer active:scale-95 group"
                  title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
                >
                  <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
                </button>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {t.achievementsHeader}
            </h2>
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed max-w-xl font-medium">
              {t.achievementsSubtitle}
            </p>
          </div>

          {/* Celebration Button */}
          <button
            onClick={triggerConfetti}
            id="celebrate-confetti-btn"
            className="flex items-center gap-2 px-6 py-3.5 bg-white text-orange-700 hover:bg-orange-50 font-black rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer self-start md:self-auto shrink-0"
          >
            <PartyPopper className="w-5 h-5 text-orange-600" />
            <span>{lang === 'ar' ? 'احتفل بإنجازاتك!' : 'Celebrate Victories!'}</span>
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold mb-2">
            <span>{lang === 'ar' ? `فتح ${unlockedCount} من ${totalCount} وساماً` : `Unlocked ${unlockedCount} of ${totalCount} badges`}</span>
            <span>{unlockPercent}%</span>
          </div>
          <div className="w-full bg-orange-950/40 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-white rounded-full transition-all duration-700"
              style={{ width: `${unlockPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Achievement Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((ach) => {
          const isUnlocked = checkUnlocked(ach);
          const Icon = getBadgeIcon(ach.icon);

          return (
            <div
              key={ach.id}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-amber-400 shadow-lg shadow-orange-950/5 hover:-translate-y-1'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.unlockedStatus}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t.lockedStatus}</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="font-black text-lg text-slate-900 mb-1.5">
                  {lang === 'ar' ? ach.titleAr : ach.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {lang === 'ar' ? ach.descAr : ach.descEn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                <span>
                  {ach.type === 'time' && (lang === 'ar' ? `المطلوب: ${ach.targetValue} ساعة` : `Target: ${ach.targetValue}h`)}
                  {ach.type === 'cigarettes' && (lang === 'ar' ? `المطلوب: ${ach.targetValue} سيجارة` : `Target: ${ach.targetValue} cigs`)}
                  {ach.type === 'money' && (lang === 'ar' ? `المطلوب: توفير ${ach.targetValue}+` : `Target: Save ${ach.targetValue}+`)}
                </span>
                {isUnlocked && (
                  <span className="text-amber-600 font-extrabold">🏆 {lang === 'ar' ? 'تم الإنجاز' : 'Achieved!'}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
