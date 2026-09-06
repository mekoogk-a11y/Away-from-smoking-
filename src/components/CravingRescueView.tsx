import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { soundFx } from '../utils/audio';
import { 
  Wind, 
  Timer, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Play, 
  Square, 
  RotateCcw, 
  Smile, 
  Droplet, 
  Activity, 
  Coffee, 
  Footprints,
  Eye,
  Hand,
  Volume2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface CravingRescueViewProps {
  lang: Language;
  onBack?: () => void;
}

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const CravingRescueView: React.FC<CravingRescueViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  // 1: 4-7-8 Breathing state
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('idle');
  const [breathCountdown, setBreathCountdown] = useState<number>(4);
  const [breathCycleCount, setBreathCycleCount] = useState<number>(0);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 2: 3-Minute Craving Shield Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(180); // 3 minutes

  // 3: 5-4-3-2-1 Grounding current step
  const [groundingStep, setGroundingStep] = useState(5);

  // 4: Bubble Pop Mini distraction
  const [bubbles, setBubbles] = useState([
    { id: 1, textAr: 'تنفس بعمق', textEn: 'Breathe deep', popped: false },
    { id: 2, textAr: 'اشرب ماء بارد', textEn: 'Drink cold water', popped: false },
    { id: 3, textAr: 'أنت أقوى من النيكوتين', textEn: 'Stronger than nicotine', popped: false },
    { id: 4, textAr: 'الرغبة مجرد دقائق', textEn: 'Urge lasts minutes', popped: false },
    { id: 5, textAr: 'صحتك كنز ثمين', textEn: 'Health is wealth', popped: false },
    { id: 6, textAr: 'وفرت أموالك', textEn: 'Saved your money', popped: false },
    { id: 7, textAr: 'عائلتك فخورة بك', textEn: 'Family is proud', popped: false },
    { id: 8, textAr: 'نصر جديد اليوم', textEn: 'New victory today', popped: false },
  ]);

  // Handle Breathing State Machine
  useEffect(() => {
    if (breathPhase === 'idle') return;

    if (breathCountdown > 1) {
      breathTimerRef.current = setTimeout(() => {
        setBreathCountdown(prev => prev - 1);
      }, 1000);
      return;
    }

    // Countdown reached 1 -> transition to next phase
    if (breathPhase === 'inhale') {
      soundFx.playBreathChime('hold');
      setBreathPhase('hold');
      setBreathCountdown(7);
    } else if (breathPhase === 'hold') {
      soundFx.playBreathChime('out');
      setBreathPhase('exhale');
      setBreathCountdown(8);
    } else if (breathPhase === 'exhale') {
      soundFx.playBreathChime('in');
      setBreathPhase('inhale');
      setBreathCountdown(4);
      setBreathCycleCount(prev => prev + 1);
    }

    return () => {
      if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
    };
  }, [breathPhase, breathCountdown]);

  const handleToggleBreathing = () => {
    if (breathPhase !== 'idle') {
      setBreathPhase('idle');
      setBreathCountdown(4);
      if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
    } else {
      soundFx.playBreathChime('in');
      setBreathPhase('inhale');
      setBreathCountdown(4);
      setBreathCycleCount(0);
    }
  };

  // Craving 3-Minute Timer effect
  useEffect(() => {
    if (!timerActive || timerSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setTimerSecondsLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          soundFx.playFanfare();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, timerSecondsLeft]);

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimerSecondsLeft(180);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePopBubble = (id: number) => {
    soundFx.playRhythmPulse();
    setBubbles(bubbles.map(b => b.id === id ? { ...b, popped: true } : b));
  };

  const handleResetBubbles = () => {
    setBubbles(bubbles.map(b => ({ ...b, popped: false })));
  };

  const emergencyTips = [
    {
      icon: Droplet,
      titleAr: 'اشرب كأساً كبيراً من الماء البارد',
      titleEn: 'Drink a large glass of ice-cold water',
      descAr: 'الماء يبرد مستقبلات الفم واللسان ويساعد الكليتين على تنقية النيكوتين أسرع.',
      descEn: 'Ice water cools oral receptors and speeds up kidney toxin filtration.'
    },
    {
      icon: Footprints,
      titleAr: 'غيّر مكانك واخرج في نزهة قصيرة',
      titleEn: 'Change your environment & walk outside',
      descAr: 'المشي لمدة 5 دقائق في الهواء الطلق يعيد توجيه التركيز ويكسر العادة المكانية.',
      descEn: 'A 5-minute walk in fresh air disrupts spatial cigarette associations.'
    },
    {
      icon: Coffee,
      titleAr: 'تناول علكة نعناع قوية أو عود سواك',
      titleEn: 'Chew strong mint gum or use miswak',
      descAr: 'يشغل الفم بحركة طبيعية ويعطي شعوراً بالانتعاش والنظافة بدلاً من طعم التبغ الكريه.',
      descEn: 'Keeps mouth pleasantly occupied and leaves fresh mint sensations.'
    },
    {
      icon: Activity,
      titleAr: 'مارس 15 ضغطة أو تمارين تمدد',
      titleEn: 'Do 15 pushups or brisk stretches',
      descAr: 'المجهود البدني السريع يفرز هرمون الإندورفين الطبيعي الذي يقضي على التوتر فوراً.',
      descEn: 'Quick burst of physical exercise releases natural stress-busting endorphins.'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-red-400/30">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/25">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
            <span>{lang === 'ar' ? 'غرفة الطوارئ والإنقاذ السريع' : 'Rapid Urge Rescue & Craving Shield'}</span>
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
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          {t.cravingHeader}
        </h2>
        <p className="text-sm sm:text-base text-red-100 leading-relaxed max-w-2xl font-medium">
          {t.cravingSubtitle}
        </p>
      </div>

      {/* Grid: 4-7-8 Breathing & 3-Min Craving Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Tool 1: 4-7-8 Interactive Calming Breathing Exercise */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 flex flex-col justify-between items-center text-center">
          <div className="w-full text-start mb-4">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider block">
              {lang === 'ar' ? 'تمرين فسيولوجي مثبت' : 'Clinically Proven Technique'}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {t.breathingExerciseTitle}
            </h3>
          </div>

          {/* Animated Breath Visual Circle */}
          <div className="my-6 relative w-52 h-52 flex items-center justify-center">
            {/* Outer pulsating glow rings */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale'
                  ? 'scale-110 bg-orange-400/20'
                  : breathPhase === 'hold'
                  ? 'scale-110 bg-amber-400/30'
                  : breathPhase === 'exhale'
                  ? 'scale-85 bg-teal-400/20'
                  : 'scale-90 bg-slate-100'
              }`}
            />

            {/* Main Interactive Core Circle */}
            <div
              className={`w-40 h-40 rounded-full flex flex-col items-center justify-center text-white shadow-xl transition-all duration-700 ${
                breathPhase === 'inhale'
                  ? 'scale-110 bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-500/40'
                  : breathPhase === 'hold'
                  ? 'scale-110 bg-gradient-to-br from-amber-500 to-yellow-500 shadow-amber-500/40'
                  : breathPhase === 'exhale'
                  ? 'scale-85 bg-gradient-to-br from-teal-500 to-emerald-600 shadow-teal-500/40'
                  : 'scale-90 bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-400/20'
              }`}
            >
              {breathPhase === 'idle' ? (
                <>
                  <Wind className="w-10 h-10 mb-1 opacity-90" />
                  <span className="text-xs font-black px-2">{lang === 'ar' ? 'اضغط للبدء' : 'Tap to start'}</span>
                </>
              ) : (
                <>
                  <span className="text-4xl font-black tracking-tight">{breathCountdown}</span>
                  <span className="text-xs font-extrabold mt-1 uppercase tracking-wide">
                    {breathPhase === 'inhale' && (lang === 'ar' ? 'شهيق عميق' : 'Inhale')}
                    {breathPhase === 'hold' && (lang === 'ar' ? 'احبس النفس' : 'Hold')}
                    {breathPhase === 'exhale' && (lang === 'ar' ? 'زفير بطيء' : 'Exhale')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Cycle counter and button */}
          <div className="w-full">
            <p className="text-xs text-slate-500 font-bold mb-4">
              {breathPhase !== 'idle'
                ? (lang === 'ar' ? `عدد الدورات المكتملة: ${breathCycleCount}` : `Completed cycles: ${breathCycleCount}`)
                : (lang === 'ar' ? 'شهيق 4 ثوانٍ - حبس 7 ثوانٍ - زفير بطيء 8 ثوانٍ' : 'Inhale 4s - Hold 7s - Exhale 8s')}
            </p>

            <button
              onClick={handleToggleBreathing}
              id="breathing-toggle-btn"
              className={`w-full py-3.5 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                breathPhase !== 'idle'
                  ? 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {breathPhase !== 'idle' ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>{t.stopBreathing}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.startBreathing}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tool 2: 3-Minute Craving Shield Timer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 flex flex-col justify-between items-center text-center">
          <div className="w-full text-start mb-4">
            <span className="text-xs font-black text-red-600 uppercase tracking-wider block">
              {lang === 'ar' ? 'موجة الرغبة تستمر 3 دقائق فقط' : 'Craving Wave Peaks in 3 Mins'}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {t.cravingTimerTitle}
            </h3>
          </div>

          {/* Timer Display */}
          <div className="my-6 text-center">
            <div className="inline-block p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-inner">
              <span className={`text-5xl sm:text-6xl font-black tracking-tight ${timerActive ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
                {formatTimer(timerSecondsLeft)}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-3 max-w-xs mx-auto">
              {timerSecondsLeft === 0
                ? (lang === 'ar' ? 'أحسنت يا بطل! انكسرت موجة الرغبة بنجاح!' : 'Bravo Champion! The craving wave has broken!')
                : t.cravingTimerDesc}
            </p>

            {/* Progress Bar */}
            <div className="w-64 max-w-full bg-slate-200 h-2.5 rounded-full mt-4 overflow-hidden mx-auto">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-500"
                style={{ width: `${((180 - timerSecondsLeft) / 180) * 100}%` }}
              />
            </div>
          </div>

          {/* Timer Action Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={() => setTimerActive(!timerActive)}
              id="craving-timer-toggle-btn"
              className={`flex-1 py-3.5 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                timerActive
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {timerActive ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>{lang === 'ar' ? 'إيقاف مؤقت' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.startTimer}</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetTimer}
              className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all cursor-pointer"
              title={t.resetTimer}
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Tool 3: Distraction Activity - 5-4-3-2-1 Sensory Grounding Tool */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-slate-900">
              {t.distractionGameTitle}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              {lang === 'ar' ? 'تقنية معتمدة عالمياً لإعادة توجيه الدماغ وتفريغ القلق' : 'Grounding technique to redirect attention from cravings'}
            </p>
          </div>
        </div>

        {/* 5 Prompts Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { step: 5, icon: Eye, prompt: t.groundingPrompt5, color: 'border-indigo-300 bg-indigo-50/60' },
            { step: 4, icon: Hand, prompt: t.groundingPrompt4, color: 'border-blue-300 bg-blue-50/60' },
            { step: 3, icon: Volume2, prompt: t.groundingPrompt3, color: 'border-teal-300 bg-teal-50/60' },
            { step: 2, icon: Wind, prompt: t.groundingPrompt2, color: 'border-amber-300 bg-amber-50/60' },
            { step: 1, icon: Smile, prompt: t.groundingPrompt1, color: 'border-rose-300 bg-rose-50/60' },
          ].map((item) => {
            const Icon = item.icon;
            const isCurrent = groundingStep === item.step;
            const isDone = groundingStep < item.step;
            return (
              <div
                key={item.step}
                onClick={() => setGroundingStep(item.step)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'ring-2 ring-orange-500 shadow-md bg-white border-orange-500'
                    : isDone
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : item.color
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center">
                      {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-600" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {item.prompt}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>{isDone ? '✓ ' + (lang === 'ar' ? 'تم' : 'Done') : (lang === 'ar' ? 'انقر للتركيز' : 'Focus')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tool 4: Stress-Relief Motivational Bubble Pop Game */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-current" />
            <h3 className="font-extrabold text-lg text-slate-900">
              {lang === 'ar' ? 'فرقعة فقاعات التوتر وتثبيت الإرادة' : 'Stress Bubble Pop & Willpower Booster'}
            </h3>
          </div>
          <button
            onClick={handleResetBubbles}
            className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            {lang === 'ar' ? 'إعادة الملء' : 'Refill Bubbles'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {bubbles.map((b) => (
            <button
              key={b.id}
              onClick={() => handlePopBubble(b.id)}
              disabled={b.popped}
              className={`p-4 rounded-2xl text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center min-h-[90px] cursor-pointer ${
                b.popped
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 line-through scale-95 shadow-inner'
                  : 'bg-gradient-to-br from-orange-50 to-amber-100 text-orange-950 border-2 border-orange-300 shadow-sm hover:scale-105 hover:border-orange-500 active:scale-90'
              }`}
            >
              <span>{b.popped ? '💥 ' + (lang === 'ar' ? 'قهرت الرغبة' : 'Defeated') : (lang === 'ar' ? b.textAr : b.textEn)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tool 5: Instant Actionable Emergency Tips */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100">
        <h3 className="font-extrabold text-xl text-slate-900 mb-6">
          {t.emergencyTipsTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyTips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200/80 flex items-start gap-3.5"
              >
                <div className="p-3 bg-orange-500 text-white rounded-xl shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1">
                    {lang === 'ar' ? tip.titleAr : tip.titleEn}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {lang === 'ar' ? tip.descAr : tip.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
