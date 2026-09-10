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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-white via-sky-50/80 to-white text-slate-950 transition-opacity duration-500 select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onClick={handleSkip}
    >
      {/* Top subtle badge */}
      <div className="pt-4 text-center">
        <span className="inline-block px-3.5 py-1 rounded-full bg-white text-[11px] font-black tracking-wider border border-sky-200 text-sky-900 shadow-sm">
          {lang === 'ar' ? 'المنصة الطبية المعتمدة' : lang === 'fr' ? 'Plateforme Médicale Officielle' : 'Official Medical Platform'}
        </span>
      </div>

      {/* Center Branding & Icon */}
      <div className="flex flex-col items-center text-center max-w-sm">
        
        {/* Animated App Icon Container */}
        <div className="relative mb-6 transform transition-transform animate-bounce">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white shadow-xl shadow-sky-950/10 p-3 flex items-center justify-center border-2 border-sky-100 overflow-hidden">
            <img 
              src="/pwa-192x192.png" 
              alt="Smoking Is Harmful to Health Icon" 
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-sky-300/30 blur-xl -z-10 animate-pulse" />
        </div>

        {/* App Title */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 mb-1 leading-tight">
          {lang === 'fr' 
            ? 'Le tabagisme est dangereux pour la santé' 
            : lang === 'en' 
            ? 'Smoking Is Harmful to Health' 
            : 'التدخين ضار بالصحة'}
        </h1>
        <h2 className="text-base sm:text-lg font-bold text-sky-900 mb-3">
          {lang === 'ar' ? 'Smoking Is Harmful to Health' : 'التدخين ضار بالصحة'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed px-4">
          {lang === 'ar'
            ? 'منصة طبية وتوعوية متكاملة للتعافي والإقلاع النهائي عن التدخين واستعادة عافيتك'
            : lang === 'fr'
            ? 'Plateforme médicale mondiale de sensibilisation aux méfaits du tabac et d’aide au sevrage'
            : 'Comprehensive clinical and evidence-based platform to quit smoking and reclaim your health'}
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-56 sm:w-64 mt-8 bg-sky-100 rounded-full h-2 overflow-hidden p-0.5 border border-sky-200">
          <div 
            className="bg-slate-950 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] font-bold text-slate-500 mt-2">
          {progress < 100 
            ? (lang === 'ar' ? 'جاري تهيئة الأدوات الطبية...' : lang === 'fr' ? 'Chargement des outils médicaux...' : 'Loading medical tools...') 
            : (lang === 'ar' ? 'جاهز للبدء!' : lang === 'fr' ? 'Prêt !' : 'Ready!')}
        </p>
      </div>

      {/* Bottom Credits & Tap to Skip */}
      <div className="pb-4 text-center">
        <p className="text-[10px] text-slate-400 mb-1 font-semibold cursor-pointer">
          {lang === 'ar' ? 'المس الشاشة للمتابعة فوراً' : lang === 'fr' ? 'Touchez pour continuer' : 'Tap anywhere to continue'}
        </p>
        <p className="text-[11px] font-bold text-slate-700">
          منصة الهدي والنور للتطبيقات والمواقع الإسلامية
        </p>
      </div>
    </div>
  );
};
