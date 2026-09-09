import React, { useState, useEffect } from 'react';
import { ChallengeDay, DailyCheckIn, JournalEntry, Language } from '../types';
import {
  loadChallengeDays,
  saveChallengeDays,
  loadDailyCheckIns,
  recordTodayCheckIn,
  loadJournalEntries,
  saveJournalEntries
} from '../utils/storage';
import { soundFx } from '../utils/audio';
import {
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  Send,
  Trash2,
  Heart,
  Smile,
  Meh,
  Frown,
  Zap,
  Phone,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';

interface ChallengeViewProps {
  lang: Language;
  onNavigateToTab?: (tab: string) => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({ lang, onNavigateToTab }) => {
  const isAr = lang === 'ar' || lang === 'ur';

  const [days, setDays] = useState<ChallengeDay[]>([]);
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Daily Check-In Form State
  const [smokeFreeToday, setSmokeFreeToday] = useState<boolean>(true);
  const [cravingIntensity, setCravingIntensity] = useState<number>(3);
  const [currentMood, setCurrentMood] = useState<'great' | 'good' | 'neutral' | 'struggling'>('good');
  const [checkInNotes, setCheckInNotes] = useState('');
  const [savedCheckInToast, setSavedCheckInToast] = useState(false);

  // Journal form state
  const [newJournalText, setNewJournalText] = useState('');
  const [newJournalTag, setNewJournalTag] = useState<'milestone' | 'craving' | 'gratitude' | 'challenge'>('gratitude');

  // Load persisted data
  useEffect(() => {
    setDays(loadChallengeDays());
    setCheckIns(loadDailyCheckIns());
    setJournalEntries(loadJournalEntries());
  }, []);

  // Calculate streak: consecutive smoke-free days
  const completedDaysCount = days.filter(d => d.completed).length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCheckIn = checkIns.find(c => c.date === todayStr);

  const handleToggleDay = (dayNum: number) => {
    soundFx.playClick();
    const updated = days.map(d => {
      const currentNum = d.dayNumber ?? d.day;
      if (currentNum === dayNum) {
        return { ...d, completed: !d.completed };
      }
      return d;
    });
    setDays(updated);
    saveChallengeDays(updated);

    // If day was completed, trigger success chime
    const target = updated.find(d => (d.dayNumber ?? d.day) === dayNum);
    if (target?.completed) {
      soundFx.playSuccess();
    }
  };

  const handleSaveCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    const updated = recordTodayCheckIn(smokeFreeToday, cravingIntensity, currentMood, checkInNotes);
    setCheckIns(updated);
    setSavedCheckInToast(true);
    setTimeout(() => setSavedCheckInToast(false), 3000);
  };

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalText.trim()) return;

    soundFx.playSuccess();
    const newEntry: JournalEntry = {
      id: `journal-${Date.now()}`,
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      content: newJournalText.trim(),
      mood: currentMood,
      tag: newJournalTag
    };

    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    saveJournalEntries(updated);
    setNewJournalText('');
  };

  const handleDeleteJournal = (id: string) => {
    const updated = journalEntries.filter(j => j.id !== id);
    setJournalEntries(updated);
    saveJournalEntries(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {savedCheckInToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/40 animate-in fade-in slide-in-from-bottom">
          <Check className="w-5 h-5" />
          <span className="text-sm font-semibold">
            {isAr ? 'تم تسجيل متابعتك اليومية بنجاح!' : 'Daily check-in recorded successfully!'}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>{isAr ? 'تحدي الإقلاع في 30 يوماً' : '30-Day Smoke-Free Challenge'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          {isAr ? 'رحلتك نحو الحرية خطوة بخطوة' : 'Your 30-Day Freedom Journey'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {isAr
            ? 'خطة عملية مصممة لمرافقتك يومياً، مع أهداف دقيقة، وتمارين تنفس، ومتابعة فورية للرغبة والانتكاسات.'
            : 'A clinical, day-by-day blueprint engineered to rewire habits, calm cravings, and build unbreakable nicotine freedom.'}
        </p>
      </div>

      {/* Streak & Progress Metrics Hero */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-orange-500/20 via-slate-800 to-slate-850 p-5 rounded-3xl border border-orange-500/30 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <Flame className="w-7 h-7 fill-orange-400" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block uppercase">
                {isAr ? 'الأيام المكتملة' : 'Completed Days'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {completedDaysCount} / 30
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 via-slate-800 to-slate-850 p-5 rounded-3xl border border-emerald-500/30 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block uppercase">
                {isAr ? 'نسبة التقدم الكلي' : 'Challenge Progress'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {Math.round((completedDaysCount / 30) * 100)}%
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-500/20 via-slate-800 to-slate-850 p-5 rounded-3xl border border-sky-500/30 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold block uppercase">
                {isAr ? 'تسجيلات اليومية' : 'Check-Ins Logged'}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {checkIns.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Check-In Form Card */}
      <div className="max-w-5xl mx-auto mb-12 bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                {isAr ? 'تسجيل المتابعة اليومية' : 'Daily Smoke-Free Check-In'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'سجّل حالتك لليوم لتثبيت إنجازك ومراقبة مستويات الاشتياق'
                  : 'Track today’s status, craving intensity, and mood to maintain momentum.'}
              </p>
            </div>
          </div>
          {todayCheckIn && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {isAr ? 'تم تسجيل اليوم' : 'Logged Today'}
            </span>
          )}
        </div>

        <form onSubmit={handleSaveCheckIn} className="space-y-6">
          {/* Question: Smoke-Free today? */}
          <div>
            <label className="text-sm font-bold text-slate-200 block mb-3">
              {isAr ? 'هل حافظت على يومك خالياً من التدخين اليوم؟' : 'Did you stay smoke-free today?'}
            </label>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button
                type="button"
                onClick={() => setSmokeFreeToday(true)}
                className={`p-3.5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition ${
                  smokeFreeToday
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/20'
                    : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isAr ? 'نعم، لم أدخن إطلاقاً' : 'Yes, Smoke-Free!'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSmokeFreeToday(false)}
                className={`p-3.5 rounded-2xl border font-bold text-sm flex items-center justify-center gap-2 transition ${
                  !smokeFreeToday
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/20'
                    : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{isAr ? 'حدثت هفوة أو تدخين' : 'Had a Slip'}</span>
              </button>
            </div>
          </div>

          {/* Craving Intensity Slider */}
          <div>
            <div className="flex items-center justify-between text-sm font-bold text-slate-200 mb-2">
              <span>{isAr ? 'شدة الرغبة في التدخين اليوم (1 - 10):' : 'Craving Intensity (1 - 10):'}</span>
              <span className="text-orange-400 font-mono text-base">{cravingIntensity} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={cravingIntensity}
              onChange={e => setCravingIntensity(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>{isAr ? 'هادئ جداً' : 'Minimal'}</span>
              <span>{isAr ? 'متوسط' : 'Moderate'}</span>
              <span>{isAr ? 'شديدة جداً' : 'Intense'}</span>
            </div>
          </div>

          {/* Mood Selector */}
          <div>
            <label className="text-sm font-bold text-slate-200 block mb-3">
              {isAr ? 'كيف كان مزاجك وطاقتك اليوم؟' : 'How was your mood and energy today?'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
              {[
                { key: 'great', labelEn: 'Great', labelAr: 'ممتاز ورائع', icon: Sparkles, color: 'text-emerald-400' },
                { key: 'good', labelEn: 'Good', labelAr: 'جيد ومستقر', icon: Smile, color: 'text-sky-400' },
                { key: 'neutral', labelEn: 'Neutral', labelAr: 'عادي / متأرجح', icon: Meh, color: 'text-amber-400' },
                { key: 'struggling', labelEn: 'Struggling', labelAr: 'أعاني من توتر', icon: Frown, color: 'text-rose-400' }
              ].map(m => {
                const IconComp = m.icon;
                const isSelected = currentMood === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setCurrentMood(m.key as any)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                        : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${isSelected ? 'text-white' : m.color}`} />
                    <span>{isAr ? m.labelAr : m.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Notes */}
          <div>
            <label className="text-sm font-bold text-slate-200 block mb-2">
              {isAr ? 'ملاحظات وتأملات اليوم (اختياري):' : 'Today’s Reflection & Notes (Optional):'}
            </label>
            <textarea
              rows={2}
              value={checkInNotes}
              onChange={e => setCheckInNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'كيف تغلبت على الموقف المحفز؟ ما الذي ساعدك اليوم؟'
                  : 'What triggered cravings today? What helped you overcome them?'
              }
              className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm flex items-center gap-2 transition shadow-lg shadow-orange-500/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isAr ? 'حفظ تسجيل اليوم' : 'Save Daily Check-In'}</span>
          </button>
        </form>
      </div>

      {/* 30 Days Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? 'مخطط الـ 30 يوماً خطوة بخطوة' : '30-Day Step-by-Step Blueprint'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {isAr
                ? 'اضغط على الدائرة لتحديد اليوم كمكتمل والاستماع لنغمة الإنجاز'
                : 'Click the check circle on each day as you conquer it.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {days.map(day => {
            const dayNum = day.dayNumber ?? day.day;
            const title = (day.title && (day.title[lang] || day.title.en)) || `Day ${dayNum}`;
            const action = (day.action && (day.action[lang] || day.action.en)) || 
                           (day.practicalActivity && (day.practicalActivity[lang] || day.practicalActivity.en)) || 
                           '';
            const motivation = (day.motivation && (day.motivation[lang] || day.motivation.en)) || 
                               (day.motivationalMessage && (day.motivationalMessage[lang] || day.motivationalMessage.en)) || 
                               '';

            return (
              <div
                key={dayNum}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                  day.completed
                    ? 'bg-slate-850 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                    : 'bg-slate-800/90 border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full font-mono uppercase tracking-wider ${
                        day.completed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}
                    >
                      {isAr ? `اليوم ${dayNum}` : `DAY ${dayNum}`}
                    </span>

                    <button
                      onClick={() => handleToggleDay(dayNum)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                        day.completed
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                          : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                      }`}
                      aria-label={`Mark Day ${dayNum} complete`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {title}
                  </h4>

                  {action && (
                    <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 leading-relaxed mb-3">
                      <span className="text-orange-400 font-bold block mb-1">
                        {isAr ? 'الهدف والمهمة:' : 'Daily Action:'}
                      </span>
                      {action}
                    </div>
                  )}

                  {motivation && (
                    <p className="text-[11px] text-slate-400 italic">
                      "{motivation}"
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{day.completed ? (isAr ? 'مكتمل بنجاح' : 'Completed') : (isAr ? 'قيد الإنجاز' : 'Pending')}</span>
                  <span className="font-mono text-orange-400 font-semibold">
                    {dayNum <= 7 ? (isAr ? 'الأسبوع 1' : 'Week 1') : dayNum <= 14 ? (isAr ? 'الأسبوع 2' : 'Week 2') : (isAr ? 'الأسبوع 3-4' : 'Week 3-4')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal Reflection Journal Section */}
      <div className="max-w-5xl mx-auto mb-16 bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              {isAr ? 'مذكرات الحرية الشخصية' : 'Personal Freedom Journal'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr
                ? 'دوّن أفكارك، مشاعرك، وكيف تغلب على رغباتك اليومية لتشهد نموك'
                : 'Write private reflections, victories, and craving strategies.'}
            </p>
          </div>
        </div>

        {/* New Entry Form */}
        <form onSubmit={handleAddJournal} className="space-y-4 mb-8">
          <textarea
            rows={3}
            value={newJournalText}
            onChange={e => setNewJournalText(e.target.value)}
            placeholder={
              isAr
                ? 'اكتب تأملاتك أو انتصارك لليوم...'
                : 'Write your thoughts, triggers conquered, or things you are grateful for today...'
            }
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{isAr ? 'التصنيف:' : 'Category:'}</span>
              <select
                value={newJournalTag}
                onChange={e => setNewJournalTag(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none"
              >
                <option value="gratitude">{isAr ? 'امتنان وتقدير' : 'Gratitude'}</option>
                <option value="milestone">{isAr ? 'إنجاز تاريخي' : 'Milestone'}</option>
                <option value="craving">{isAr ? 'تغلب على رغبة' : 'Craving Conquered'}</option>
                <option value="challenge">{isAr ? 'تحدي وصمود' : 'Challenge'}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isAr ? 'إضافة إلى المذكرات' : 'Add to Journal'}</span>
            </button>
          </div>
        </form>

        {/* Journal Entries List */}
        {journalEntries.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            {isAr ? 'لا توجد تدوينات بعد. ابدأ بكتابة أول سطر اليوم!' : 'No journal entries yet. Start writing today!'}
          </div>
        ) : (
          <div className="space-y-3">
            {journalEntries.map(entry => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-purple-400 uppercase tracking-wide">
                      {entry.tag}
                    </span>
                    <span>•</span>
                    <span>{entry.date}</span>
                  </div>
                  <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                    {entry.content}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteJournal(entry.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5 transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Craving & Direct WhatsApp Banner */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-950/70 via-slate-900 to-orange-950/70 p-6 rounded-3xl border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isAr ? 'هل تواجه رغبة ملحة أو تحتاج لمساندة عاجلة؟' : 'Experiencing an intense craving right now?'}
          </h4>
          <p className="text-xs text-slate-300 mt-1">
            {isAr
              ? 'مبادرة كمال جعفر تقدم لك المشورة والدعم الإنساني المباشر عبر واتساب.'
              : 'Kamal Gaffer Initiative is here with immediate counseling and direct WhatsApp support.'}
          </p>
        </div>

        <a
          href="https://wa.me/249919980435?text=Hello%20Kamal%20Gaffer%20Initiative,%20I%20am%20participating%20in%20the%2030-Day%20Quit%20Smoking%20Challenge"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition whitespace-nowrap"
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp: 00249919980435</span>
        </a>
      </div>
    </div>
  );
};
