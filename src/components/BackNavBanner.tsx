import React from 'react';
import { Language } from '../types';
import { ArrowLeft, ArrowRight, Home, History } from 'lucide-react';

interface BackNavBannerProps {
  lang: Language;
  currentTab: string;
  prevTab: string;
  onBack: () => void;
  onGoHome: () => void;
}

export const getTabName = (tabId: string, lang: Language): string => {
  const names: Record<string, Record<Language, string>> = {
    'home': {
      ar: 'الصفحة الرئيسية',
      en: 'Home Page',
      fr: 'Page d’accueil',
      ha: 'Babban Shafi',
      zh: '首页'
    },
    'medical-photos': {
      ar: 'أضرار التدخين (الصور الطبية)',
      en: 'Smoking Damage (Photos)',
      fr: 'Dégâts du Tabac (Photos)',
      ha: 'Hotunan Illolin Shan Taba',
      zh: '吸烟器官危害图库'
    },
    'expert': {
      ar: 'استشارات ومساعدة للإقلاع',
      en: 'Expert Help & Helplines',
      fr: 'Aide & Consultations',
      ha: 'Shawarwari da Taimako',
      zh: '官方戒烟热线与咨询'
    },
    'doctors': {
      ar: 'الأطباء والخبراء المعتمدون',
      en: 'Doctors & Specialists',
      fr: 'Médecins & Spécialistes',
      ha: 'Likitoci da Masana',
      zh: '呼吸与戒烟专家库'
    },
    'centers': {
      ar: 'المراكز العالمية المعتمدة',
      en: 'Global Cessation Centers',
      fr: 'Centres Mondiaux de Sevrage',
      ha: 'Cibiyoyin Daina Taba',
      zh: '全球戒烟诊所与中心'
    },
    'harms': {
      ar: 'أضرار التدخين الفسيولوجية',
      en: 'Physiological Harms',
      fr: 'Effets Nocifs sur le Corps',
      ha: 'Illolin Shan Taba a Jiki',
      zh: '生理系统危害分析'
    },
    'videos': {
      ar: 'فيديوهات توعوية',
      en: 'Educational Videos',
      fr: 'Vidéos Éducatives',
      ha: 'Bidiyoyin Fadakarwa',
      zh: '戒烟科普视频库'
    },
    'journey': {
      ar: 'رحلتي بدون تدخين وحساب التوفير',
      en: 'My Journey & Savings Tracker',
      fr: 'Mon Parcours & Économies',
      ha: 'Tafiyata & Ajiyar Kudi',
      zh: '戒烟历程与健康储蓄'
    },
    'cravings': {
      ar: 'التغلب على الرغبة والإنقاذ العاجل',
      en: 'Craving Rescue & Breathing Tools',
      fr: 'Gérer les Envies Pressantes',
      ha: 'Dabarun Yaki da Sha’awar Taba',
      zh: '克制吸烟冲动与呼吸法'
    },
    'achievements': {
      ar: 'لوحة الأوسمة والإنجازات',
      en: 'Badges & Achievements',
      fr: 'Badges & Succès',
      ha: 'Lambar Yabo & Nasarori',
      zh: '戒烟勋章与成就榜'
    },
    'sources': {
      ar: 'المصادر والمراجع الطبية',
      en: 'Medical Sources & References',
      fr: 'Sources Médicales Officielles',
      ha: 'Majiya Na Likitanci',
      zh: '权威医学文献与数据源'
    },
    'legal': {
      ar: 'سياسة الخصوصية وشروط الاستخدام',
      en: 'Privacy Policy & Terms',
      fr: 'Politique de Confidentialité & Conditions',
      ha: 'Ka’idojin Tsare Sirri',
      zh: '隐私政策与使用条款'
    },
    'about': {
      ar: 'حول التطبيق والمطور',
      en: 'About App & Credits',
      fr: 'À Propos de l’Application',
      ha: 'Game da Manhajar',
      zh: '关于本平台与制作信息'
    }
  };

  return names[tabId]?.[lang] || names[tabId]?.en || tabId;
};

export const BackNavBanner: React.FC<BackNavBannerProps> = ({
  lang,
  currentTab,
  prevTab,
  onBack,
  onGoHome
}) => {
  // If we are on home, do not show the back banner
  if (currentTab === 'home') return null;

  const prevName = getTabName(prevTab || 'home', lang);
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const labels = {
    back: {
      ar: 'رجوع إلى الصفحة السابقة',
      en: 'Back to previous page',
      fr: 'Retour à la page précédente',
      ha: 'Koma shafin baya',
      zh: '返回上一页'
    },
    startedFrom: {
      ar: 'بدأت من',
      en: 'Came from',
      fr: 'Venu de',
      ha: 'Daga',
      zh: '上一页'
    },
    home: {
      ar: 'الرئيسية',
      en: 'Home',
      fr: 'Accueil',
      ha: 'Gida',
      zh: '首页'
    }
  };

  return (
    <div className="mb-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 bg-white rounded-2xl border-2 border-orange-200 shadow-sm">
        
        {/* Main Prominent Back Button */}
        <button
          onClick={onBack}
          id="section-back-button"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-sm rounded-xl shadow-md active:scale-95 transition-all cursor-pointer group"
          title={`${labels.back[lang]}: ${prevName}`}
        >
          <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
            <ArrowIcon className="w-4 h-4 text-white transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span>{labels.back[lang]}</span>
            <span className="hidden sm:inline-block font-normal text-orange-100 text-xs">
              ({prevName})
            </span>
          </div>
        </button>

        {/* Previous page source badge & Quick Home button */}
        <div className="flex items-center gap-2">
          {/* Breadcrumb info pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
            <History className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-slate-500 font-medium">{labels.startedFrom[lang]}:</span>
            <span className="text-slate-900 font-extrabold truncate max-w-[200px]">{prevName}</span>
          </div>

          {/* Quick Home Button (if prev wasn't already home) */}
          {prevTab !== 'home' && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 rounded-xl text-xs font-bold border border-slate-200 hover:border-orange-300 transition-all cursor-pointer active:scale-95"
              title={labels.home[lang]}
            >
              <Home className="w-3.5 h-3.5 text-orange-600" />
              <span>{labels.home[lang]}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
