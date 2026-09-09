import React from 'react';
import { AwarenessArtwork, Language } from '../types';

interface ArtworkGraphicProps {
  artwork: AwarenessArtwork;
  lang: Language;
  className?: string;
  showOverlay?: boolean;
}

export const AwarenessArtworkGraphic: React.FC<ArtworkGraphicProps> = ({
  artwork,
  lang,
  className = '',
  showOverlay = true
}) => {
  const title = artwork.title[lang] || artwork.title.en;
  const isAr = lang === 'ar' || lang === 'ur';

  // Different artistic compositions for each of the 9 campaign artworks
  const renderVisualContent = () => {
    switch (artwork.id) {
      case 'artwork-global-threat':
        // Image 1: Hand breaking cigarette over Earth with global threat warning
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#0a192f] via-[#0f2d4a] to-[#051124] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            {/* Background Earth Glow */}
            <div className="absolute -bottom-24 -left-12 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-600/30 via-blue-500/40 to-cyan-400/20 blur-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-red-600/90 text-white border border-red-400/30 shadow-sm">
                GLOBAL WARNING
              </span>
              <span className="text-xs font-mono text-emerald-400/90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                INITIATIVE #1
              </span>
            </div>

            {/* Central Graphic: Earth & Breaking Cigarette */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-4 flex items-center justify-center">
                {/* Earth Sphere SVG */}
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_25px_rgba(16,185,129,0.25)]">
                  <circle cx="80" cy="80" r="70" fill="#0f3b5f" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M40 70 Q 55 50, 75 60 T 110 50 Q 125 70, 110 90 T 70 110 Q 50 100, 40 70 Z" fill="#10b981" opacity="0.85" />
                  <path d="M85 30 Q 100 20, 115 35 T 100 55 Z" fill="#059669" opacity="0.85" />
                  <path d="M60 120 Q 80 135, 95 125 T 85 110 Z" fill="#10b981" opacity="0.85" />
                  {/* Grid latitude lines */}
                  <ellipse cx="80" cy="80" rx="70" ry="30" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="80" y1="10" x2="80" y2="150" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                </svg>

                {/* Broken Cigarette across center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center gap-2 transform -rotate-12">
                    {/* Left half of cigarette */}
                    <div className="w-16 sm:w-20 h-5 bg-stone-100 rounded-l border border-stone-300 shadow-lg flex items-center justify-start pl-1">
                      <div className="w-4 h-full bg-amber-400/80 rounded-l-sm -ml-1 border-r border-amber-500" />
                    </div>
                    {/* Snap & Sparks */}
                    <div className="flex flex-col items-center">
                      <span className="text-amber-400 font-extrabold text-xl animate-bounce">⚡</span>
                      <div className="w-1 h-6 bg-red-500/80 rounded-full" />
                    </div>
                    {/* Right half of cigarette with ash & smoke */}
                    <div className="w-16 sm:w-20 h-5 bg-stone-100 rounded-r border border-stone-300 shadow-lg flex items-center justify-end pr-1 transform rotate-12">
                      <div className="w-3 h-full bg-gradient-to-r from-stone-500 to-red-600 rounded-r-sm shadow-inner" />
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight max-w-md mx-auto leading-tight drop-shadow-md">
                {title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-sky-200/90 max-w-sm mx-auto font-medium">
                {artwork.callToAction}
              </p>
            </div>

            {/* Footer with key statistics banner */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span className="font-semibold text-amber-300">Quit Today</span>
              <span className="font-mono text-emerald-400">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-living-lungs':
        // Image 2: Living lung vs diseased smoker lung
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#0b1320] via-[#1c2536] to-[#080d17] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PULMONARY ANATOMY
              </span>
              <span className="text-xs text-rose-400 font-semibold uppercase">
                CHOOSE LIFE
              </span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              {/* Dual Lungs Anatomical Comparison SVG */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 my-4">
                {/* Healthy Pink Lung */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-[45%_55%_65%_35%/50%_45%_55%_50%] bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center p-3 relative border-2 border-pink-300/40 transform -rotate-6 transition hover:scale-105">
                    <svg viewBox="0 0 60 80" className="w-full h-full stroke-pink-200 fill-none stroke-2 opacity-70">
                      <path d="M 30 10 L 30 40 M 30 25 L 15 35 M 30 35 L 45 45 M 30 45 L 20 60 M 30 55 L 40 68" />
                    </svg>
                    <span className="absolute bottom-2 text-[10px] font-bold tracking-widest text-white/90 bg-black/40 px-2 py-0.5 rounded-full">
                      HEALTHY
                    </span>
                  </div>
                  <span className="mt-2 text-xs font-bold text-emerald-400">100% Capacity</span>
                </div>

                {/* VS Divider */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-black text-xs text-amber-400 shadow">
                    VS
                  </div>
                  <div className="w-0.5 h-12 bg-gradient-to-b from-white/20 via-white/40 to-transparent my-1" />
                </div>

                {/* Smoker Tar-Stained Diseased Lung */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-[55%_45%_35%_65%/45%_50%_50%_55%] bg-gradient-to-br from-stone-800 via-stone-900 to-black shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center p-3 relative border-2 border-stone-700/60 transform rotate-6 transition hover:scale-105">
                    <svg viewBox="0 0 60 80" className="w-full h-full stroke-stone-500 fill-none stroke-2 opacity-50">
                      <path d="M 30 10 L 30 40 M 30 25 L 45 35 M 30 35 L 15 45 M 30 45 L 40 60 M 30 55 L 20 68" />
                    </svg>
                    {/* Tar spots */}
                    <div className="absolute top-5 left-4 w-3 h-3 rounded-full bg-black/90 border border-stone-800" />
                    <div className="absolute top-12 right-4 w-4 h-4 rounded-full bg-black/90 border border-stone-800" />
                    <div className="absolute bottom-6 left-6 w-5 h-3 rounded-full bg-black/90 border border-stone-800" />
                    <span className="absolute bottom-2 text-[10px] font-bold tracking-widest text-rose-400 bg-black/60 px-2 py-0.5 rounded-full">
                      TAR DAMAGED
                    </span>
                  </div>
                  <span className="mt-2 text-xs font-bold text-rose-400">Severe Decay</span>
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                {title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto">
                Quitting restores cilia & lung regeneration. Choose life, not ash.
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-emerald-400 font-medium">Breathe Free</span>
              <span className="font-mono">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-shattered-man':
        // Image 3: Lost dreams, poor health, early death vs bright sunrise future
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#180e29] via-[#24133b] to-[#0c0817] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                LIFE CHOICE
              </span>
              <span className="text-xs text-amber-400 font-semibold">YOUR FUTURE</span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-3 flex items-center justify-center">
                {/* Silhouette of man weighed down by toxic fog */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-purple-950/80 to-slate-900 border border-purple-500/30 p-4 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
                  {/* Rays of sunrise on top */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-amber-400/20 via-rose-500/10 to-transparent" />
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-purple-300 fill-current opacity-85 drop-shadow">
                    {/* Head in hands seated posture */}
                    <circle cx="50" cy="30" r="12" />
                    <path d="M 30 75 Q 35 48 50 48 Q 65 48 70 75 Z" />
                    <path d="M 25 75 L 75 75 L 70 85 L 30 85 Z" />
                  </svg>
                  <span className="mt-2 text-xs font-semibold text-amber-300 tracking-wide">
                    Lost Dreams... Or A New Dawn?
                  </span>
                </div>
              </div>

              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-purple-200/90 max-w-sm mx-auto">
                {artwork.callToAction}
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-purple-300">
              <span>Reclaim Your Life</span>
              <span className="font-mono">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-arabic-campaign':
        // Image 4: Official Arabic public health poster
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#1c130c] via-[#2d1b0f] to-[#120a05] text-white flex flex-col justify-between p-6 overflow-hidden select-none" dir="rtl">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-600 text-white shadow-sm">
                تحذير صحي رسمي
              </span>
              <span className="text-xs text-amber-400 font-bold font-mono">
                سجائر اليوم ... أمراض الغد
              </span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-red-600/20 border-2 border-red-500/60 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🚭</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-amber-300 leading-tight">
                خطر يهدد حياتك
              </h4>
              <p className="text-sm font-bold text-white mt-1">
                سجائر اليوم ... أمراض الغد
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-right text-[11px] text-slate-200 max-w-xs mx-auto">
                <div className="bg-white/5 p-2 rounded border border-white/10 flex items-center gap-1.5">
                  <span className="text-red-400 font-bold text-base">⚠️</span>
                  <span>سرطان الرئة والحنجرة</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/10 flex items-center gap-1.5">
                  <span className="text-red-400 font-bold text-base">⚠️</span>
                  <span>أمراض القلب والشرايين</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/10 flex items-center gap-1.5">
                  <span className="text-red-400 font-bold text-base">⚠️</span>
                  <span>تلف الجهاز التنفسي</span>
                </div>
                <div className="bg-white/5 p-2 rounded border border-white/10 flex items-center gap-1.5">
                  <span className="text-red-400 font-bold text-base">⚠️</span>
                  <span>أضرار التدخين السلبي</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-200">
              <span className="font-bold">اختر حياتك .. ابتعد عن التدخين</span>
              <span className="font-mono" dir="ltr">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-before-it-stops-you':
        // Image 5: Heart attack, stroke, vascular blockage
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#1f0f14] via-[#2f141c] to-[#12080b] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-600 text-white shadow">
                CARDIOVASCULAR ALERT
              </span>
              <span className="text-xs text-rose-300 font-mono font-semibold">
                INFARCTION & STROKE
              </span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-3 flex items-center justify-center">
                {/* Heart & ECG Rhythm with cigarette strike */}
                <div className="w-full h-full rounded-full bg-rose-950/40 border-2 border-rose-500/40 flex flex-col items-center justify-center p-3 relative shadow-[0_0_30px_rgba(225,29,72,0.2)]">
                  <svg viewBox="0 0 100 100" className="w-20 h-20 text-rose-500 fill-current animate-pulse">
                    <path d="M 50 85 Q 20 60 15 40 A 18 18 0 0 1 50 25 A 18 18 0 0 1 85 40 Q 80 60 50 85 Z" />
                  </svg>
                  <svg viewBox="0 0 120 40" className="w-28 h-8 stroke-amber-400 fill-none stroke-2 mt-1">
                    <path d="M 0 20 L 30 20 L 40 5 L 50 35 L 60 15 L 70 25 L 80 20 L 120 20" />
                  </svg>
                </div>
              </div>

              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-rose-200/90 max-w-sm mx-auto">
                Arterial clots, elevated stroke risks, and heart strain. Stop before it stops you.
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300">
              <span className="font-semibold">Protect Your Heart</span>
              <span className="font-mono">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-healthy-lifestyle':
        // Image 6: Protect yourself, your family and air
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#06201a] via-[#0e362e] to-[#041410] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500 text-white shadow">
                SMOKE-FREE HOME
              </span>
              <span className="text-xs text-emerald-300 font-semibold">
                FAMILY HEALTH
              </span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-emerald-900/60 to-teal-800/40 border border-emerald-400/30 flex flex-col items-center justify-center p-3 shadow-lg">
                <span className="text-4xl mb-1">🏡✨</span>
                <span className="text-xs font-bold text-emerald-200">Zero Secondhand Smoke</span>
                <span className="text-[11px] text-emerald-300/80 mt-1">Clean Oxygen for Children</span>
              </div>

              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-emerald-200/90 max-w-sm mx-auto">
                Every extinguished cigarette is pure air gifted to your loved ones.
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300">
              <span>Breathe Pure... Live Strong</span>
              <span className="font-mono">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-organ-breakdown':
        // Image 7: Brain, teeth, voice, stomach, DNA damage map
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#131b2e] via-[#1b2540] to-[#0c1221] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                SYSTEMIC PATHOLOGY
              </span>
              <span className="text-xs text-cyan-300 font-mono">7,000 CHEMICALS</span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-3 text-[11px]">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="block text-base">🧠</span>
                  <span className="font-bold text-cyan-300">Brain & Mood</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="block text-base">🦷</span>
                  <span className="font-bold text-amber-300">Teeth & Gums</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="block text-base">🗣️</span>
                  <span className="font-bold text-rose-300">Vocal Cords</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="block text-base">🫀</span>
                  <span className="font-bold text-red-400">Heart & Veins</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="block text-base">🫁</span>
                  <span className="font-bold text-emerald-300">Airway Cilia</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="block text-base">🧬</span>
                  <span className="font-bold text-purple-300">Cellular DNA</span>
                </div>
              </div>

              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                Tobacco toxins circulate to every organ. Quitting halts cellular DNA damage.
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-cyan-300">
              <span>Halt Systemic Damage</span>
              <span className="font-mono">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-environment-clean-world':
        // Image 8: Healthy people build strong nations - cleaner world
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#0b2238] via-[#103b60] to-[#081829] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-500 text-white shadow">
                CLEAN PLANET
              </span>
              <span className="text-xs text-teal-300 font-semibold">
                COMMUNITY & EARTH
              </span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto mb-3 rounded-full bg-gradient-to-tr from-teal-800 to-sky-700 border-2 border-teal-400/40 flex flex-col items-center justify-center p-3 shadow-xl">
                <span className="text-4xl mb-1">🌍🌱</span>
                <span className="text-xs font-black text-white">SMOKE-FREE WORLD</span>
                <span className="text-[10px] text-sky-200 mt-0.5">Cleaner Oceans & Soil</span>
              </div>

              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-sky-200 max-w-sm mx-auto">
                Healthy people build strong nations. Stop the 4.5 trillion plastic filters poisoning nature.
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-teal-200">
              <span>Together for Health</span>
              <span className="font-mono">WhatsApp: 00249919980435</span>
            </div>
          </div>
        );

      case 'artwork-initiative-support':
      default:
        // Image 9: Kamal Gaffer initiative banner & WhatsApp
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#091a32] via-[#0f2d57] to-[#061224] text-white flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="flex items-center justify-between relative z-10">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500 text-slate-950 shadow font-mono">
                OFFICIAL INITIATIVE
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                ACTIVE SUPPORT
              </span>
            </div>

            <div className="my-auto py-3 text-center relative z-10">
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg">
                <span className="text-2xl">🤝</span>
                <span className="text-[10px] font-mono tracking-wider uppercase">INITIATIVE</span>
              </div>

              <h4 className="text-lg sm:text-2xl font-black text-white leading-tight">
                {title}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm text-amber-200 max-w-sm mx-auto font-medium">
                {artwork.callToAction}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition border border-emerald-400/30">
                <span className="text-base">💬</span>
                <span>WhatsApp: 00249919980435</span>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span>Humanitarian Support</span>
              <span className="font-mono text-amber-300">Sudan & Global</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-lg border border-slate-700/40 aspect-square group ${className}`}>
      {renderVisualContent()}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white/90 text-slate-900 text-xs font-bold shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
            {isAr ? 'عرض اللوحة بدقة كاملة' : 'View Full Artwork'}
          </span>
        </div>
      )}
    </div>
  );
};
