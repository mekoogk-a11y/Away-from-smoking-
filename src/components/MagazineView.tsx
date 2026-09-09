import React, { useState } from 'react';
import { Language, MagazineArticle } from '../types';
import { magazineArticles } from '../data/magazineArticlesData';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Clock,
  User,
  Tag,
  Search,
  CheckCircle2,
  ExternalLink,
  Phone,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  X,
  Bookmark,
  Sparkles,
  Play,
  Square,
  Pause
} from 'lucide-react';

interface MagazineViewProps {
  lang: Language;
  onNavigateToTab?: (tab: string) => void;
}

export const MagazineView: React.FC<MagazineViewProps> = ({ lang, onNavigateToTab }) => {
  const isAr = lang === 'ar' || lang === 'ur';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<MagazineArticle | null>(null);

  // Read Aloud speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  const categories = [
    { key: 'All', labelEn: 'All Articles', labelAr: 'جميع المقالات' },
    { key: 'Awareness', labelEn: 'Awareness', labelAr: 'التوعية العامة' },
    { key: 'Smoking Risks', labelEn: 'Smoking Risks', labelAr: 'مخاطر التدخين' },
    { key: 'Health & Wellness', labelEn: 'Health & Wellness', labelAr: 'الصحة والعافية' },
    { key: 'Quit Smoking', labelEn: 'Quit Smoking', labelAr: 'خطط الإقلاع' },
    { key: 'Daily Motivation', labelEn: 'Daily Motivation', labelAr: 'التحفيز اليومي' },
    { key: 'Success Stories', labelEn: 'Success Stories', labelAr: 'قصص النجاح' }
  ];

  const filteredArticles = magazineArticles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const title = (art.title[lang] || art.title.en).toLowerCase();
    const excerpt = (art.excerpt[lang] || art.excerpt.en).toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || title.includes(query) || excerpt.includes(query);
    return matchesCategory && matchesSearch;
  });

  // Read Aloud functionality
  const handleStartReadAloud = (article: MagazineArticle) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const title = article.title[lang] || article.title.en;
    const content = article.content[lang] || article.content.en;
    const fullText = `${title}. ${content}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = lang;
    utterance.rate = speechRate;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStopReadAloud = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleShareArticle = async (article: MagazineArticle) => {
    const title = article.title[lang] || article.title.en;
    const text = `BEYOND SMOKING Magazine: ${title}\nRead evidence-based public health insights. WhatsApp Support: 00249919980435`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href
        });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${title} - ${window.location.href}`);
      alert(isAr ? 'تم نسخ رابط المقال!' : 'Article link copied!');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Magazine Masthead & Hero */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4" />
          <span>{isAr ? 'المجلة التوعوية الرقمية' : 'Digital Awareness Magazine'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          BEYOND SMOKING
        </h1>

        <p className="mt-2 text-base sm:text-lg font-bold text-orange-400">
          {isAr ? 'أنت وصحتك أولاً.. حريتك ومستقبلك' : 'Quit Smoking. Reclaim Your Health.'}
        </p>

        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          {isAr
            ? 'المجلة الصحية المحكمة للتوعية بمخاطر التبغ وتقديم أحدث الأبحاث الطبية وخطط الإقلاع السلوكية والدوائية.'
            : 'The Digital Anti-Smoking Awareness Magazine. Evidence-based pulmonary research, behavioral recovery frameworks, and community resilience.'}
        </p>
      </div>

      {/* Magazine Quick Navigation Sections Bar */}
      <div className="max-w-7xl mx-auto mb-8 bg-slate-800/80 rounded-2xl border border-slate-700/80 p-3 shadow-lg">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          <span className="text-slate-400 px-2 uppercase tracking-wider text-[11px] font-bold">
            {isAr ? 'أقسام المجلة:' : 'Sections:'}
          </span>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition border ${
                selectedCategory === cat.key
                  ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                  : 'bg-slate-700/60 text-slate-300 border-slate-600/50 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}
          {onNavigateToTab && (
            <>
              <button
                onClick={() => onNavigateToTab('gallery')}
                className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-purple-950/60 text-purple-300 border border-purple-600/40 hover:bg-purple-900/80 transition"
              >
                {isAr ? 'معرض اللوحات (9)' : 'Awareness Gallery (9)'}
              </button>
              <button
                onClick={() => onNavigateToTab('videoCenter')}
                className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-cyan-950/60 text-cyan-300 border border-cyan-600/40 hover:bg-cyan-900/80 transition"
              >
                {isAr ? 'مركز الفيديو' : 'Video Center'}
              </button>
              <button
                onClick={() => onNavigateToTab('challenge')}
                className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-emerald-950/60 text-emerald-300 border border-emerald-600/40 hover:bg-emerald-900/80 transition"
              >
                {isAr ? 'تحدي الـ 30 يوماً' : '30-Day Challenge'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في مقالات المجلة...' : 'Search magazine articles...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              {isAr ? 'لم يتم العثور على مقالات تطابق بحثك.' : 'No articles match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map(article => {
              const title = article.title[lang] || article.title.en;
              const excerpt = article.excerpt[lang] || article.excerpt.en;

              return (
                <div
                  key={article.id}
                  className="bg-slate-800/90 rounded-3xl border border-slate-700/70 overflow-hidden shadow-xl flex flex-col justify-between hover:border-orange-500/40 hover:shadow-2xl transition group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Read Time */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2
                        onClick={() => setActiveArticle(article)}
                        className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors cursor-pointer leading-snug line-clamp-2"
                      >
                        {title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>

                    {/* Metadata & Read CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs text-slate-400 truncate max-w-[120px]">
                          {article.author}
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveArticle(article)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 group-hover:translate-x-1 transition-transform"
                      >
                        <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                        {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => {
                handleStopReadAloud();
                setActiveArticle(null);
              }}
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-600"
              aria-label="Close article reader"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Masthead */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeArticle.readTime}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {activeArticle.title[lang] || activeArticle.title.en}
              </h2>

              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
                <span className="font-semibold text-slate-300">
                  {activeArticle.author}
                </span>
                <span>{activeArticle.date}</span>
              </div>
            </div>

            {/* Read Aloud Audio Control Panel */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-850 to-slate-800 border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-orange-400" />
                <span className="text-xs font-bold text-white">
                  {isAr ? 'خاصية القراءة الصوتية الذكية' : 'Smart Read Aloud Audio'}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!isSpeaking ? (
                  <button
                    onClick={() => handleStartReadAloud(activeArticle)}
                    className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isAr ? 'استماع للمقال' : 'Listen'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePauseResume}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
                      <span>{isPaused ? (isAr ? 'متابعة' : 'Resume') : (isAr ? 'إيقاف مؤقت' : 'Pause')}</span>
                    </button>
                    <button
                      onClick={handleStopReadAloud}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <Square className="w-3.5 h-3.5 fill-white" />
                      <span>{isAr ? 'إيقاف' : 'Stop'}</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleShareArticle(activeArticle)}
                  className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-sky-400 transition"
                  title="Share Article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Excerpt Lead */}
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-200 text-sm font-medium leading-relaxed mb-6">
              {activeArticle.excerpt[lang] || activeArticle.excerpt.en}
            </div>

            {/* Article Main Body */}
            <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line mb-8">
              {activeArticle.content[lang] || activeArticle.content.en}
            </div>

            {/* Key Takeaways */}
            {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-slate-800/80 border border-slate-700">
                <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? 'أهم النقاط المستفادة:' : 'Key Clinical Takeaways:'}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medical References */}
            {activeArticle.references && activeArticle.references.length > 0 && (
              <div className="mb-8 p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 block mb-1">
                  {isAr ? 'المراجع والمصادر العلمية:' : 'Scientific References & Guidelines:'}
                </span>
                <ul className="list-disc list-inside space-y-1">
                  {activeArticle.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medical Disclaimer & WhatsApp Help */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isAr
                    ? 'هذا المقال للتوعية والتثقيف العام ولا يغني عن الاستشارة الطبية المتخصصة.'
                    : 'This publication provides general health education and does not replace medical advice.'}
                </span>
              </div>
              <a
                href="https://wa.me/249919980435?text=Hello%20Kamal%20Gaffer%20Initiative,%20I%20am%20reading%20BEYOND%20SMOKING%20Magazine"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition whitespace-nowrap shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: 00249919980435</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
