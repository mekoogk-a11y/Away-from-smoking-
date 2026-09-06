import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface PWASplashScreenProps {
  lang: Language;
  onFinish?: () => void;
}

export const PWASplashScreen: React.FC<PWASplashScreenProps> = ({ lang, onFinish }) => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Check session storage to show once per session or reload
    const hasShown = sessionStorage.getItem('pwa_splash_shown');
    if (hasShown) {
      setVisible(false);
      onFinish?.();
      return;
    }

    const t1 = setTimeout(() => setProgress(55), 300);
    const t2 = setTimeout(() => setProgress(90), 750);
    const t3 = setTimeout(() => setProgress(100), 1100);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1300);

    const endTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('pwa_splash_shown', 'true');
      onFinish?.();
    }, 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  if (!visible) return null;

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('pwa_splash_shown', 'true');
      onFinish?.();
    }, 250);
  };

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white transition-opacity duration-500 select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={handleSkip}
    >
      {/* Top subtle badge */}
      <div className="pt-4 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wider uppercase border border-white/20 text-orange-100">
          Official Cessation App
        </span>
      </div>

      {/* Center Branding & Icon */}
      <div className="flex flex-col items-center text-center max-w-sm">
        
        {/* Animated App Icon Container */}
        <div className="relative mb-6 transform transition-transform animate-bounce">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white shadow-2xl p-2.5 flex items-center justify-center border-2 border-white/40 overflow-hidden">
            <img 
              src="/pwa-192x192.png" 
              alt="Quit Smoking Icon" 
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-orange-400/30 blur-lg -z-10 animate-pulse" />
        </div>

        {/* App Title */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
          Quit Smoking
        </h1>
        <h2 className="text-lg sm:text-xl font-bold text-orange-100 mb-3">
          كيف تترك التدخين
        </h2>
        <p className="text-xs sm:text-sm text-orange-100/90 font-medium leading-relaxed px-4">
          {lang === 'ar'
            ? 'منصة عالمية متكاملة للتعافي والإقلاع النهائي عن التدخين'
            : 'A global evidence-based platform to quit smoking and recover health'}
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-56 sm:w-64 mt-8 bg-black/20 rounded-full h-2 overflow-hidden p-0.5 border border-white/20">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] font-semibold text-orange-200 mt-2">
          {progress < 100 
            ? (lang === 'ar' ? 'جاري تهيئة الأدوات الطبية...' : 'Loading medical tools...') 
            : (lang === 'ar' ? 'جاهز للبدء!' : 'Ready!')}
        </p>
      </div>

      {/* Bottom Credits & Tap to Skip */}
      <div className="pb-4 text-center">
        <p className="text-[10px] text-orange-200 opacity-80 mb-1">
          {lang === 'ar' ? 'المس الشاشة للمتابعة فوراً' : 'Tap anywhere to continue'}
        </p>
        <p className="text-[11px] font-bold text-white/90">
          منصة الهدي والنور للتطبيقات والمواقع الإسلامية
        </p>
      </div>
    </div>
  );
};
