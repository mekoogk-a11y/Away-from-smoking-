import React from 'react';
import { Language } from '../types';
import { AppLogo } from './AppLogo';
import { 
  X, 
  Download, 
  Share2, 
  PlusSquare, 
  Smartphone, 
  Laptop, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  isIOS: boolean;
  isAndroid: boolean;
  browserName: string;
  canPromptDirectly: boolean;
  onDirectInstall: () => Promise<'accepted' | 'dismissed' | 'manual'>;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  lang,
  isIOS,
  isAndroid,
  browserName,
  canPromptDirectly,
  onDirectInstall
}) => {
  if (!isOpen) return null;

  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-orange-200 text-slate-900 overflow-hidden relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-5">
          <AppLogo size="lg" />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded-full text-[11px] font-black border border-orange-200 mb-1">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>{lang === 'ar' ? 'تطبيق ويب تقدمي PWA' : 'Progressive Web App'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {lang === 'ar' ? 'تثبيت Quit Smoking على الجهاز' : 'Install Quit Smoking on Device'}
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              {lang === 'ar' ? 'تثبيت على الجهاز للعمل بدون شريط متصفح وبدون اتصال' : 'Install on device to run offline without browser address bar'}
            </p>
          </div>
        </div>

        {/* Direct Install Button if browser supports beforeinstallprompt */}
        {canPromptDirectly ? (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md text-center">
            <p className="text-xs font-bold text-orange-100 mb-3">
              {lang === 'ar' ? 'متصفحك يدعم التثبيت المباشر على الجهاز بنقرة واحدة:' : 'Your browser supports one-click instant install on device:'}
            </p>
            <button
              onClick={async () => {
                const res = await onDirectInstall();
                if (res === 'accepted') {
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-white hover:bg-orange-50 text-orange-700 font-black rounded-xl shadow transition-all active:scale-95 cursor-pointer text-sm"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'ar' ? '📱 تثبيت على الجهاز الآن' : '📱 Install on Device Now'}</span>
            </button>
          </div>
        ) : null}

        {/* Guided Step Instructions depending on device */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 border-b border-slate-100 pb-2">
            <Info className="w-4 h-4 text-orange-600" />
            <span>
              {isIOS 
                ? (lang === 'ar' ? 'طريقة التثبيت على أجهزة iPhone و iPad (سفاري):' : 'Installation for iPhone & iPad (Safari):')
                : (lang === 'ar' ? 'خطوات التثبيت على الجهاز وإضافته للشاشة الرئيسية:' : 'Steps to install on your device and add to Home Screen:')}
            </span>
          </div>

          {isIOS ? (
            /* iOS Safari Instructions */
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block mb-0.5">
                    {lang === 'ar' ? 'زر المشاركة في متصفح سفاري' : 'Tap the Share Button'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' 
                      ? 'اضغط على أيقونة المشاركة (مربع بسهم للأعلى ⬆) في شريط سفاري السفلي أو العلوي.' 
                      : 'Tap the Share icon (square with upward arrow ⬆) in Safari.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block mb-0.5">
                    {lang === 'ar' ? 'إضافة إلى الشاشة الرئيسية' : 'Add to Home Screen'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' 
                      ? 'مرّر للأسفل واختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).' 
                      : 'Scroll down and select "Add to Home Screen".'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block mb-0.5">
                    {lang === 'ar' ? 'تأكيد الإضافة' : 'Confirm & Launch'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' 
                      ? 'اضغط على "إضافة" (Add) أعلى اليمين. ستظهر أيقونة التطبيق بشعار مكافحة التدخين على شاشتك فوراً!' 
                      : 'Tap "Add" at the top right. The Quit Smoking icon will appear on your Home Screen!'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Android / Chrome / Edge / Other Instructions */
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  1
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block mb-0.5">
                    {lang === 'ar' ? 'قائمة خيارات المتصفح (⋮)' : 'Open Browser Menu (⋮)'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' 
                      ? 'اضغط على النقاط الثلاث (⋮) في زاوية المتصفح أعلى أو أسفل الشاشة.' 
                      : 'Tap the three dots (⋮) in your browser toolbar.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  2
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block mb-0.5">
                    {lang === 'ar' ? 'اختيار "تثبيت التطبيق" أو "إضافة للشاشة الرئيسية"' : 'Select "Install App" or "Add to Home Screen"'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' 
                      ? 'اختر "تثبيت التطبيق" (Install app) أو "إضافة إلى الشاشة الرئيسية" (Add to Home screen).' 
                      : 'Tap "Install App" or "Add to Home Screen" from the menu.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center shrink-0 text-sm">
                  3
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 block mb-0.5">
                    {lang === 'ar' ? 'تأكيد التثبيت' : 'Confirm Installation'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'ar' 
                      ? 'اضغط على "تثبيت" (Install). سيتم تثبيت التطبيق وسيعمل بدون شريط المتصفح وتظهر الأيقونة فوراً على شاشة هاتفك.' 
                      : 'Tap "Install". The app will be installed and launch full screen like an Android native app.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits bullets */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-around gap-2 text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'شاشة كاملة Standalone' : 'Full Screen Standalone'}
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'يعمل بدون اتصال Offline' : 'Works Offline'}
            </span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'بدون متجر وبدون استهلاك ذاكرة' : 'Lightweight & Fast'}
            </span>
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl transition-all text-xs cursor-pointer"
          >
            {lang === 'ar' ? 'إغلاق ومتابعة التصفح' : 'Close & Continue Browsing'}
          </button>
        </div>

      </div>
    </div>
  );
};
