import React, { useState } from 'react';
import { Language, MedicalDamagePhoto } from '../types';
import { translations } from '../data/translations';
import { medicalDamagePhotos } from '../data/medicalPhotosData';
import { 
  Camera, 
  ExternalLink, 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ZoomIn,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface MedicalDamageViewProps {
  lang: Language;
  onBack?: () => void;
}

export const MedicalDamageView: React.FC<MedicalDamageViewProps> = ({ lang, onBack }) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [selectedOrganKey, setSelectedOrganKey] = useState<string>('all');
  const [modalPhoto, setModalPhoto] = useState<MedicalDamagePhoto | null>(null);

  const filterKeys = [
    { key: 'all', labelAr: 'جميع الأعضاء', labelEn: 'All Organs', labelFr: 'Tous les organes', labelHa: 'Dukkan Gabobi', labelZh: '全部器官' },
    { key: 'lungs', labelAr: 'الرئتان', labelEn: 'Lungs', labelFr: 'Poumons', labelHa: 'Huhu', labelZh: '肺部' },
    { key: 'cardiovascular', labelAr: 'القلب والأوعية', labelEn: 'Heart & Vessels', labelFr: 'Cœur & Vaisseaux', labelHa: 'Zuciya', labelZh: '心脏与血管' },
    { key: 'brain', labelAr: 'الدماغ', labelEn: 'Brain', labelFr: 'Cerveau', labelHa: 'Kwakwalwa', labelZh: '大脑中枢' },
    { key: 'teeth', labelAr: 'الأسنان واللثة', labelEn: 'Teeth & Gums', labelFr: 'Dents & Gencives', labelHa: 'Hakora', labelZh: '口腔牙周' },
    { key: 'throat', labelAr: 'الحلق والحنجرة', labelEn: 'Throat & Larynx', labelFr: 'Gorge & Larynx', labelHa: 'Makoqoro', labelZh: '咽喉声带' },
    { key: 'respiratory', labelAr: 'المجاري التنفسية', labelEn: 'Airways', labelFr: 'Voies Aériennes', labelHa: 'Hanyoyin Numfashi', labelZh: '呼吸气道' },
    { key: 'skin', labelAr: 'الجلد والبشرة', labelEn: 'Skin & Aging', labelFr: 'Peau & Teint', labelHa: 'Fata', labelZh: '皮肤微循环' },
    { key: 'cancer', labelAr: 'السرطان والأورام', labelEn: 'Carcinogenesis', labelFr: 'Cancers Induits', labelHa: 'Ciwon Daji', labelZh: '恶性肿瘤风险' },
  ];

  const getFilterLabel = (item: typeof filterKeys[0]) => {
    switch (lang) {
      case 'ar': return item.labelAr;
      case 'fr': return item.labelFr;
      case 'ha': return item.labelHa;
      case 'zh': return item.labelZh;
      default: return item.labelEn;
    }
  };

  const filteredPhotos = selectedOrganKey === 'all'
    ? medicalDamagePhotos
    : medicalDamagePhotos.filter(p => p.organKey === selectedOrganKey);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/30">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black border border-white/25">
            <Camera className="w-3.5 h-3.5 text-amber-200" />
            <span>{t.medicalPhotos}</span>
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
        
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          {t.medicalPhotosHeader}
        </h2>
        
        <p className="text-sm sm:text-base text-orange-100 leading-relaxed max-w-3xl font-medium">
          {t.medicalPhotosSubtitle}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filterKeys.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedOrganKey(item.key)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedOrganKey === item.key
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300'
            }`}
          >
            {getFilterLabel(item)}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPhotos.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-orange-100/80 hover:border-orange-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo View with Image zoom button */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 group">
                <img
                  src={item.imageUrl}
                  alt={item.organName[lang] || item.organName.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                {/* Badges on image */}
                <div className="absolute top-3 start-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-600/90 text-white backdrop-blur-md shadow-md">
                    {item.organName[lang] || item.organName.en}
                  </span>
                </div>

                <button
                  onClick={() => setModalPhoto(item)}
                  className="absolute bottom-3 end-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-xl backdrop-blur-md transition-all cursor-pointer"
                  title="تكبير الصورة / Full view"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 start-3 end-12">
                  <h3 className="text-white font-black text-base sm:text-lg leading-snug drop-shadow-md">
                    {item.damageName[lang] || item.damageName.en}
                  </h3>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                {/* Clinical Explanation */}
                <div>
                  <h4 className="text-xs font-black text-orange-600 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t.clinicalSignificance}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {item.explanation[lang] || item.explanation.en}
                  </p>
                </div>

                {/* Quitting Benefit */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                  <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.quittingBenefit}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-semibold">
                    {item.clinicalDetails[lang] || item.clinicalDetails.en}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer: Verified Source Link */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="truncate max-w-[240px]">
                {item.sourceName}
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-extrabold hover:underline"
              >
                <span>{t.viewSource}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal */}
      {modalPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalPhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-700 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-black">
              <img
                src={modalPhoto.imageUrl}
                alt={modalPhoto.organName[lang] || modalPhoto.organName.en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 end-3 flex items-center gap-2">
                <button
                  onClick={() => setModalPhoto(null)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-black/75 hover:bg-black text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
                >
                  <ArrowIcon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'رجوع للمعرض' : 'Back to Gallery'}</span>
                </button>
                <button
                  onClick={() => setModalPhoto(null)}
                  className="p-1.5 bg-black/75 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 mb-2 inline-block">
                {modalPhoto.organName[lang] || modalPhoto.organName.en}
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                {modalPhoto.damageName[lang] || modalPhoto.damageName.en}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-4">
                {modalPhoto.explanation[lang] || modalPhoto.explanation.en}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>{modalPhoto.sourceName}</span>
                <a
                  href={modalPhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline flex items-center gap-1"
                >
                  <span>{t.viewSource}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
