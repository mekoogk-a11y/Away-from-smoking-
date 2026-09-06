import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Globe2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface LegalViewsProps {
  lang: Language;
  onBack?: () => void;
}

export const LegalViews: React.FC<LegalViewsProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [activeSubTab, setActiveSubTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-black border border-white/15">
            <Lock className="w-3.5 h-3.5 text-slate-300" />
            <span>{lang === 'ar' ? 'الشفافية والمسؤولية القانونية' : 'Legal Transparency & Compliance'}</span>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black text-white transition-all cursor-pointer active:scale-95 group"
              title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
            >
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
            </button>
          )}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          {activeSubTab === 'privacy' ? t.privacyPolicy : t.termsOfUse}
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl font-medium">
          {lang === 'ar'
            ? 'نحن ملتزمون بحماية خصوصيتك الكاملة وتوفير أداة صحية رقمية موثوقة وآمنة بنسبة 100% دون جمع أي بيانات حساسة.'
            : 'Committed to complete user privacy, local client-side data safety, and verifiable evidence-based health guidance.'}
        </p>

        {/* Sub-tabs toggle */}
        <div className="flex items-center gap-2 mt-5">
          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSubTab === 'privacy'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            {t.privacyPolicy}
          </button>
          <button
            onClick={() => setActiveSubTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeSubTab === 'terms'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            {t.termsOfUse}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 space-y-6">
        
        {activeSubTab === 'privacy' ? (
          <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-emerald-950 font-bold">
                {t.privacyCommitment}
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                1. {lang === 'ar' ? 'تخزين البيانات محلياً (Zero Cloud Tracking)' : '1. Local Storage Only (No Cloud Tracking)'}
              </h3>
              <p className="text-xs sm:text-sm">
                {lang === 'ar'
                  ? 'جميع البيانات التي تدخلها (تاريخ الإقلاع، عدد السجائر، سعر العلبة، العملة المختارة، والمفضلات) تُحفظ حصرياً داخل متصفح جهازك باستخدام تقنية التخزين المحلي (LocalStorage). لا نملك خوادم خارجية لجمع ملفاتك أو بيع بياناتك أو تتبع نشاطك.'
                  : 'All preferences, quit dates, pack prices, and progress trackers are kept strictly within your local browser storage (LocalStorage). No personal files or behavioral tracking data are transmitted to external surveillance or advertising servers.'}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                2. {lang === 'ar' ? 'عدم طلب أي معلومات تعريف شخصية' : '2. No Sensitive Identifiers Requested'}
              </h3>
              <p className="text-xs sm:text-sm">
                {lang === 'ar'
                  ? 'لا يتطلب هذا التطبيق تسجيل الدخول باسمك الحقيقي، أو عنوان بريدك الإلكتروني، أو رقم هاتفك، أو موقعك الجغرافي الدقيق. يمكنك الاستفادة من جميع الميزات والتمارين بحرية وسرية تامة.'
                  : 'This application never asks for your legal name, email address, phone number, or precise GPS coordinates. Full functionality is accessible completely anonymously.'}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                3. {lang === 'ar' ? 'الأذونات وحذف البيانات' : '3. Permissions & Data Deletion'}
              </h3>
              <p className="text-xs sm:text-sm">
                {lang === 'ar'
                  ? 'يمكنك في أي لحظة مسح كافة البيانات المسجلة بنقرة واحدة عبر زر "إعادة ضبط الحساب" في صفحة الإعدادات، مما يعيد التطبيق إلى حالته الأولية على الفور.'
                  : 'You retain continuous control over your session data. Clicking "Reset All Data" in the Settings tab instantly clears all records from your browser.'}
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-6 text-slate-700 leading-relaxed font-medium">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-950 font-bold">
                {t.termsCommitment}
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                1. {lang === 'ar' ? 'الطبيعة التوعوية والتعليمية' : '1. Educational and Support Nature'}
              </h3>
              <p className="text-xs sm:text-sm">
                {lang === 'ar'
                  ? 'المعلومات والنصائح وتمارين التنفس وحسابات الاسترداد المالي والبيولوجي المتوفرة في المنصة تهدف إلى الدعم التوعوي والمعرفي. هذا التطبيق ليس بديلاً عن الاستشارة الطبية المباشرة أو التشخيص السريري من طبيب معتمد.'
                  : 'The content, breathing exercises, milestone trackers, and financial calculations provided are intended solely for health awareness and habit cessation support. They do not constitute binding medical diagnoses or individual clinical treatment protocols.'}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                2. {lang === 'ar' ? 'استشارة مقدم الرعاية الصحية' : '2. Consultation with Healthcare Professionals'}
              </h3>
              <p className="text-xs sm:text-sm">
                {lang === 'ar'
                  ? 'يُنصح بشدة باستشارة طبيب أو صيدلي معتمد قبل بدء أي برنامج دوائي كبدائل النيكوتين (العلكة، اللصقات) أو أدوية الإقلاع الموصوفة، خاصة لمن يعانون من أمراض القلب أو الحوامل أو المرضعات.'
                  : 'Users are strongly encouraged to consult a licensed physician or pharmacist before commencing any pharmacological therapy (such as NRT patches, gums, or prescription cessation medication), particularly individuals with preexisting cardiac conditions or pregnant individuals.'}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                3. {lang === 'ar' ? 'الروابط الخارجية والجهات الحكومية' : '3. External Health Links'}
              </h3>
              <p className="text-xs sm:text-sm">
                {lang === 'ar'
                  ? 'يحتوي التطبيق على روابط مباشرة لمواقع حكومية ومنظمات دولية (مثل منظمة الصحة العالمية وهيئة NHS ووزارات الصحة). هذه الروابط مقدمة لتسهيل وصول المستخدم، والمنصة غير مسؤولة عن التغييرات التي قد تطرأ على تلك المواقع المستقلة.'
                  : 'Direct hyperlinks to external governmental health ministries and WHO services are provided for informational convenience. We do not control independent third-party portals.'}
              </p>
            </section>
          </div>
        )}

        {/* Global Copyright Card */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-1">
            <p className="text-xs font-black text-slate-800">
              تصميم كمال جعفر زكريا, واتساب: 00249919980435
            </p>
            <p className="text-[11px] font-bold text-slate-500">
              جميع الحقوق محفوظة لصالح منصة الهدي والنور للتطبيقات والمواقع الإسلامية Sudan
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
