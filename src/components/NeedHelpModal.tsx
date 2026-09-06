import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  AlertTriangle, 
  X, 
  Wind, 
  PhoneCall, 
  Building2, 
  BookOpen, 
  HelpCircle, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  Droplet,
  Coffee,
  Footprints
} from 'lucide-react';

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const NeedHelpModal: React.FC<NeedHelpModalProps> = ({
  isOpen,
  onClose,
  lang,
  onNavigate
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const [showWithdrawalTips, setShowWithdrawalTips] = useState(false);

  const handleSelectOption = (tab: string) => {
    onClose();
    onNavigate(tab);
  };

  const withdrawalTipsList = [
    {
      symptomAr: 'الصداع والدوار الخفيف',
      symptomEn: 'Headaches & Mild Dizziness',
      tipAr: 'نتيجة عودة تدفق الأكسجين الطبيعي للدماغ. اشرب كميات وافرة من الماء وتنفس بهدوء في مكان مريح.',
      tipEn: 'Due to restored cerebral oxygenation. Drink plenty of water and rest in a well-ventilated quiet space.'
    },
    {
      symptomAr: 'العصبية وسرعة الانفعال',
      symptomEn: 'Irritability & Anxiety Spikes',
      tipAr: 'إعادة ضبط كيمياء الدوبامين تستغرق أياماً قليلة. خذ حماماً دافئاً أو مارس المشي السريع لمدة 10 دقائق.',
      tipEn: 'Dopamine receptors are recalibrating. A warm shower or 10-minute brisk walk immediately alleviates restlessness.'
    },
    {
      symptomAr: 'الرغبة في تناول وجبات خفيفة',
      symptomEn: 'Increased Appetite & Oral Fixation',
      tipAr: 'تناول خضروات مقرمشة كالجزر والخيار وعلكة نعناع خالية من السكر لملء الفراغ الحركي.',
      tipEn: 'Keep crisp vegetables (carrots/celery) and sugar-free mint gum handy to satisfy oral motor cravings.'
    },
    {
      symptomAr: 'صعوبة النوم واليقظة الليلية',
      symptomEn: 'Insomnia & Sleep Disturbances',
      tipAr: 'تجنب المنبهات والكافيين بعد الساعة 4 مساءً، واقرأ كتاباً أو استمع لتلاوة هادئة قبل النوم.',
      tipEn: 'Eliminate caffeine past 4 PM and engage in screen-free relaxing reading before bedtime.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-red-500 animate-fadeIn relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t.needHelpNowTitle}
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                {t.needHelpNowSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content View: 5 Direct Choices or Withdrawal Detail */}
        {!showWithdrawalTips ? (
          <div className="space-y-3">
            
            {/* 1: Intense Craving -> Craving Rescue */}
            <button
              onClick={() => handleSelectOption('cravings')}
              className="w-full text-start p-4 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 hover:border-red-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-red-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-red-700 transition-colors">
                    {t.optCraving}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {t.optCravingDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors rtl:rotate-180" />
            </button>

            {/* 2: Talk to Specialist / Quitline */}
            <button
              onClick={() => handleSelectOption('expert')}
              className="w-full text-start p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-emerald-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {t.optTalkSpecialist}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {t.optTalkSpecialistDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors rtl:rotate-180" />
            </button>

            {/* 3: Find Quit Smoking Center */}
            <button
              onClick={() => handleSelectOption('centers')}
              className="w-full text-start p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 hover:border-teal-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-teal-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-teal-700 transition-colors">
                    {t.optFindCenter}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {t.optFindCenterDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors rtl:rotate-180" />
            </button>

            {/* 4: Proven Quit Methods */}
            <button
              onClick={() => handleSelectOption('expert')}
              className="w-full text-start p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 hover:border-amber-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-amber-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                    {t.optQuitMethods}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {t.optQuitMethodsDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors rtl:rotate-180" />
            </button>

            {/* 5: Withdrawal Symptoms Tips */}
            <button
              onClick={() => setShowWithdrawalTips(true)}
              className="w-full text-start p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 hover:border-indigo-500 hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-indigo-600 text-white rounded-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {t.optWithdrawal}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {t.optWithdrawalDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors rtl:rotate-180" />
            </button>

          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-base">
                {lang === 'ar' ? 'أعراض الانسحاب الشائعة وكيفية التغلب عليها' : 'Common Withdrawal Symptoms & Immediate Relief'}
              </h4>
              <button
                onClick={() => setShowWithdrawalTips(false)}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                {lang === 'ar' ? '← العودة للخيارات' : '← Back'}
              </button>
            </div>

            <div className="space-y-3">
              {withdrawalTipsList.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-black text-xs text-orange-600 block mb-1">
                    {lang === 'ar' ? item.symptomAr : item.symptomEn}
                  </span>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {lang === 'ar' ? item.tipAr : item.tipEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleSelectOption('cravings')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-xs shadow-md cursor-pointer"
              >
                {lang === 'ar' ? 'الانتقال لتمارين التنفس ومؤقت الصمود' : 'Open 4-7-8 Breathing & Craving Wave Timer'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
