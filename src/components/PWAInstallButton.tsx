import React, { useState } from 'react';
import { Language } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';
import { Check, Smartphone, Download, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  lang: Language;
  variant?: 'navbar' | 'hero' | 'floating' | 'banner';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  lang,
  variant = 'navbar',
  className = ''
}) => {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    isAndroid,
    browserName,
    install,
    canPromptDirectly
  } = usePWAInstall();

  const [showModal, setShowModal] = useState(false);

  // Localization labels
  const getInstallLabel = () => {
    switch (lang) {
      case 'ar':
        return '📱 ثبّت التطبيق';
      case 'en':
        return '📱 Install App';
      case 'fr':
        return '📱 Installer l\'app';
      case 'ha':
        return '📱 Sanya Manhajar';
      case 'zh':
        return '📱 安装应用';
      default:
        return '📱 ثبّت التطبيق';
    }
  };

  const getInstalledLabel = () => {
    switch (lang) {
      case 'ar':
        return '✓ التطبيق مثبت على جهازك';
      case 'en':
        return '✓ App installed on your device';
      case 'fr':
        return '✓ App installée sur votre appareil';
      case 'ha':
        return '✓ An riga an sanya manhajar';
      case 'zh':
        return '✓ 应用已安装在您的设备上';
      default:
        return '✓ التطبيق مثبت على جهازك';
    }
  };

  const handleClick = async () => {
    if (isInstalled) return;

    if (canPromptDirectly) {
      const outcome = await install();
      if (outcome === 'manual' || outcome === 'dismissed') {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  // If already installed: display "✓ التطبيق مثبت على جهازك"
  if (isInstalled) {
    if (variant === 'navbar') {
      return (
        <div 
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700/80 text-emerald-100 rounded-xl text-xs font-black border border-emerald-400/40 shadow-xs ${className}`}
          title={getInstalledLabel()}
        >
          <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
          <span className="truncate">{getInstalledLabel()}</span>
        </div>
      );
    }

    if (variant === 'hero') {
      return (
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600/90 text-white rounded-2xl text-xs sm:text-sm font-black border border-emerald-400/50 shadow-md ${className}`}
        >
          <div className="w-5 h-5 rounded-full bg-white text-emerald-700 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{getInstalledLabel()}</span>
        </div>
      );
    }

    if (variant === 'banner') {
      return (
        <div className={`p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <p className="text-sm font-black">{getInstalledLabel()}</p>
              <p className="text-xs text-emerald-700">يعمل التطبيق الآن بكامل ميزاته وبدون اتصال</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  // Not installed yet: render "📱 ثبّت التطبيق"
  return (
    <>
      {variant === 'navbar' && (
        <button
          onClick={handleClick}
          id="pwa-install-nav-btn"
          className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-amber-200/60 ${className}`}
          title={getInstallLabel()}
        >
          <Smartphone className="w-4 h-4 text-orange-950" />
          <span className="whitespace-nowrap font-black">{getInstallLabel()}</span>
        </button>
      )}

      {variant === 'hero' && (
        <button
          onClick={handleClick}
          id="pwa-install-hero-btn"
          className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 rounded-2xl text-sm sm:text-base font-black shadow-lg shadow-amber-950/20 hover:shadow-xl transition-all active:scale-95 cursor-pointer border-2 border-white/50 group ${className}`}
        >
          <Smartphone className="w-5 h-5 text-slate-900 transition-transform group-hover:scale-110" />
          <span className="font-black">{getInstallLabel()}</span>
        </button>
      )}

      {variant === 'banner' && (
        <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-xl border border-orange-300/40 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
              <Smartphone className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                {lang === 'ar' ? 'استخدم الموقع كتطبيق هاتف متكامل (PWA)' : 'Use this site as a full smartphone app (PWA)'}
              </h4>
              <p className="text-xs text-orange-100 font-medium">
                {lang === 'ar' 
                  ? 'يعمل بكامل الشاشة وبدون شريط المتصفح وبدون اتصال مع أيقونة مكافحة التدخين على شاشتك' 
                  : 'Runs in full standalone mode, offline capable with home screen anti-smoking icon'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClick}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-orange-50 text-orange-800 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            {getInstallLabel()}
          </button>
        </div>
      )}

      {variant === 'floating' && (
        <div className="fixed bottom-4 end-4 z-40 animate-slideUp">
          <button
            onClick={handleClick}
            id="pwa-install-float-btn"
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black rounded-2xl shadow-2xl border-2 border-white/60 active:scale-95 transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Smartphone className="w-4 h-4 text-slate-900" />
            <span>{getInstallLabel()}</span>
          </button>
        </div>
      )}

      {/* Installation Instructions & Prompt Modal */}
      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        lang={lang}
        isIOS={isIOS}
        isAndroid={isAndroid}
        browserName={browserName}
        canPromptDirectly={canPromptDirectly}
        onDirectInstall={install}
      />
    </>
  );
};
