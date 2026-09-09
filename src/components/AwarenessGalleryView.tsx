import React, { useState } from 'react';
import { AwarenessArtwork, Language } from '../types';
import { awarenessArtworks } from '../data/awarenessArtworksData';
import { AwarenessArtworkGraphic } from './AwarenessArtworkGraphic';
import {
  Share2,
  Maximize2,
  X,
  Download,
  Filter,
  Check,
  Phone,
  Sparkles,
  Heart,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface AwarenessGalleryViewProps {
  lang: Language;
}

type CategoryFilter =
  | 'All'
  | 'Smoking Risks'
  | 'Lung Health'
  | 'Heart Health'
  | 'Quit Smoking'
  | 'Healthy Lifestyle'
  | 'Environmental Awareness';

export const AwarenessGalleryView: React.FC<AwarenessGalleryViewProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeModalArtwork, setActiveModalArtwork] = useState<AwarenessArtwork | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const isAr = lang === 'ar' || lang === 'ur';

  const categories: { key: CategoryFilter; label: Record<string, string> }[] = [
    {
      key: 'All',
      label: {
        en: 'All Artworks (9)',
        ar: 'جميع اللوحات (9)',
        fr: 'Toutes les œuvres (9)',
        es: 'Todas las obras (9)',
        pt: 'Todas as obras (9)',
        de: 'Alle Kunstwerke (9)',
        zh: '全部画作 (9)',
        ja: '全アートワーク (9)',
        ru: 'Все плакаты (9)',
        tr: 'Tüm Eserler (9)',
        hi: 'सभी पोस्टर (9)',
        ur: 'تمام پوسٹرز (9)'
      }
    },
    {
      key: 'Smoking Risks',
      label: {
        en: 'Smoking Risks',
        ar: 'مخاطر التدخين',
        fr: 'Risques du Tabac',
        es: 'Riesgos del Tabaco',
        pt: 'Riscos do Tabaco',
        de: 'Raucherrisiken',
        zh: '吸烟风险',
        ja: '喫煙リスク',
        ru: 'Риски курения',
        tr: 'Sigara Riskleri',
        hi: 'धूम्रपान के खतरे',
        ur: 'تمباکو کے خطرات'
      }
    },
    {
      key: 'Lung Health',
      label: {
        en: 'Lung Health',
        ar: 'صحة الرئتين',
        fr: 'Santé Pulmonaire',
        es: 'Salud Pulmonar',
        pt: 'Saúde Pulmonar',
        de: 'Lungengesundheit',
        zh: '肺部健康',
        ja: '肺の健康',
        ru: 'Здоровье легких',
        tr: 'Akciğer Sağlığı',
        hi: 'फेफड़ों का स्वास्थ्य',
        ur: 'پھیپھڑوں کی صحت'
      }
    },
    {
      key: 'Heart Health',
      label: {
        en: 'Heart Health',
        ar: 'صحة القلب',
        fr: 'Santé Cardiaque',
        es: 'Salud Cardíaca',
        pt: 'Saúde Cardíaca',
        de: 'Herzgesundheit',
        zh: '心血管健康',
        ja: '心臓の健康',
        ru: 'Здоровье сердца',
        tr: 'Kalp Sağlığı',
        hi: 'हृदय स्वास्थ्य',
        ur: 'دل کی صحت'
      }
    },
    {
      key: 'Quit Smoking',
      label: {
        en: 'Quit Smoking',
        ar: 'الإقلاع عن التدخين',
        fr: 'Arrêt du Tabac',
        es: 'Dejar de Fumar',
        pt: 'Parar de Fumar',
        de: 'Rauchstopp',
        zh: '戒除烟瘾',
        ja: '禁煙',
        ru: 'Отказ от курения',
        tr: 'Sigarayı Bırakma',
        hi: 'धूम्रपान छोड़ना',
        ur: 'تمباکو نوشی چھوڑنا'
      }
    },
    {
      key: 'Healthy Lifestyle',
      label: {
        en: 'Healthy Lifestyle',
        ar: 'نمط حياة صحي',
        fr: 'Mode de Vie Sain',
        es: 'Estilo de Vida',
        pt: 'Vida Saudável',
        de: 'Gesunder Lebensstil',
        zh: '健康生活',
        ja: '健康的な生活',
        ru: 'Здоровый образ жизни',
        tr: 'Sağlıklı Yaşam',
        hi: 'स्वस्थ जीवनशैली',
        ur: 'صحت مند زندگی'
      }
    },
    {
      key: 'Environmental Awareness',
      label: {
        en: 'Environmental Awareness',
        ar: 'الوعي البيئي',
        fr: 'Environnement',
        es: 'Medio Ambiente',
        pt: 'Meio Ambiente',
        de: 'Umweltschutz',
        zh: '生态环境',
        ja: '環境への配慮',
        ru: 'Экология',
        tr: 'Çevre Bilinci',
        hi: 'पर्यावरण',
        ur: 'ماحولیات'
      }
    }
  ];

  const filteredArtworks = awarenessArtworks.filter(
    art => selectedCategory === 'All' || art.category === selectedCategory
  );

  const handleShare = async (artwork: AwarenessArtwork) => {
    const title = artwork.title[lang] || artwork.title.en;
    const desc = artwork.description[lang] || artwork.description.en;
    const textToShare = `BEYOND SMOKING - ${title}\n\n${desc}\n\nJoin the Smoke-Free movement: WhatsApp 00249919980435`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `BEYOND SMOKING: ${title}`,
          text: textToShare,
          url: window.location.href
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(textToShare);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      alert(textToShare);
    }
  };

  const handleDownload = (artwork: AwarenessArtwork) => {
    // Generates a clean text file summary and opens print/save
    const title = artwork.title[lang] || artwork.title.en;
    const desc = artwork.description[lang] || artwork.description.en;
    const details = artwork.details[lang] || artwork.details.en;

    const content = `BEYOND SMOKING: THE DIGITAL ANTI-SMOKING AWARENESS MAGAZINE\nArtwork #${artwork.order}: ${title}\n\nCategory: ${artwork.category}\n\nDescription:\n${desc}\n\nClinical & Awareness Details:\n${details}\n\nCall To Action: ${artwork.callToAction}\nOfficial Initiative Support WhatsApp: ${artwork.whatsappContact}\n\nAll rights reserved - Kamal Gaffer Anti-Smoking Initiative.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BeyondSmoking_Artwork_${artwork.order}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/40 animate-in fade-in slide-in-from-bottom duration-300">
          <Check className="w-5 h-5" />
          <span className="text-sm font-semibold">
            {isAr ? 'تم نسخ بيانات اللوحة بنجاح!' : 'Artwork information copied to clipboard!'}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4" />
          <span>{isAr ? 'معرض اللوحات التوعوية الرقمي' : 'Official Awareness Gallery'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          {isAr ? 'لوحات التوعية بمخاطر التبغ' : 'Tobacco Awareness Artworks'}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {isAr
            ? 'مجموعة متكاملة من 9 لوحات بصرية وتوعوية صادمة توضح أضرار التدخين على الرئتين والقلب وأعضاء الجسم، وتدعم قرارك التاريخي بالإقلاع.'
            : 'A curated public health campaign of 9 visual awareness posters illustrating tobacco damage to the lungs, cardiovascular system, and human biology.'}
        </p>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none sm:flex-wrap sm:justify-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold px-2">
            <Filter className="w-3.5 h-3.5 text-orange-400" />
            <span>{isAr ? 'التصنيف:' : 'Filter:'}</span>
          </div>
          {categories.map(cat => {
            const label = cat.label[lang] || cat.label.en;
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/20'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Artworks */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map(artwork => {
            const title = artwork.title[lang] || artwork.title.en;
            const desc = artwork.description[lang] || artwork.description.en;
            const catLabel = artwork.categoryLabel[lang] || artwork.categoryLabel.en;
            const alt = artwork.altText[lang] || artwork.altText.en;

            return (
              <div
                key={artwork.id}
                className="bg-slate-800/90 rounded-3xl border border-slate-700/70 overflow-hidden shadow-xl flex flex-col transition-all duration-200 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 group"
              >
                {/* Large Graphic Container */}
                <div
                  className="cursor-pointer relative overflow-hidden bg-slate-950"
                  onClick={() => setActiveModalArtwork(artwork)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setActiveModalArtwork(artwork)}
                  aria-label={alt}
                >
                  <AwarenessArtworkGraphic artwork={artwork} lang={lang} />
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-slate-900/80 backdrop-blur-md text-orange-400 border border-orange-500/30">
                      {artwork.badge}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                        {catLabel}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        #{artwork.order}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-2 leading-snug">
                      {title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalArtwork(artwork)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition"
                      title={isAr ? 'تكبير اللوحة' : 'View Fullscreen'}
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>{isAr ? 'عرض وتكبير' : 'Fullscreen'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleShare(artwork)}
                        className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition"
                        title={isAr ? 'مشاركة اللوحة' : 'Share Artwork'}
                      >
                        <Share2 className="w-4 h-4 text-sky-400" />
                      </button>
                      <button
                        onClick={() => handleDownload(artwork)}
                        className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition"
                        title={isAr ? 'حفظ ملخص اللوحة' : 'Save Details'}
                      >
                        <Download className="w-4 h-4 text-emerald-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Artwork Modal */}
      {activeModalArtwork && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalArtwork(null)}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition border border-white/20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Graphic Preview */}
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800">
              <div className="w-full max-w-sm aspect-square">
                <AwarenessArtworkGraphic
                  artwork={activeModalArtwork}
                  lang={lang}
                  showOverlay={false}
                />
              </div>
            </div>

            {/* Right Detailed Information */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    {activeModalArtwork.categoryLabel[lang] || activeModalArtwork.categoryLabel.en}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Artwork #{activeModalArtwork.order}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {activeModalArtwork.title[lang] || activeModalArtwork.title.en}
                </h2>

                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {activeModalArtwork.description[lang] || activeModalArtwork.description.en}
                </p>

                {/* Key Statistics / Highlights */}
                {activeModalArtwork.keyStats && activeModalArtwork.keyStats.length > 0 && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      {isAr ? 'أهم المؤشرات والحقائق:' : 'Key Clinical Impact:'}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {activeModalArtwork.keyStats.map((stat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Clinical Notes */}
                <div className="mt-3 text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">
                    {isAr ? 'تفاصيل المبادرة:' : 'Initiative Notes: '}
                  </span>
                  {activeModalArtwork.details[lang] || activeModalArtwork.details.en}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/249919980435?text=${encodeURIComponent(
                    `Hello Kamal Gaffer Initiative, I am reaching out from BEYOND SMOKING application regarding Artwork #${activeModalArtwork.order}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp: 00249919980435</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleShare(activeModalArtwork)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{isAr ? 'مشاركة' : 'Share'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(activeModalArtwork)}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? 'تحميل' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
