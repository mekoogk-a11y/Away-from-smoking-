import React, { useState, useEffect } from 'react';
import { Language, MagazineArticle } from '../types';
import { magazineArticles } from '../data/magazineArticlesData';
import {
  BookOpen,
  Volume2,
  Share2,
  Clock,
  User,
  Search,
  CheckCircle2,
  Phone,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  X,
  Bookmark,
  BookmarkCheck,
  Play,
  Square,
  Pause,
  Type,
  Copy,
  Check
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
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('beyond_smoking_magazine_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reading preferences
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);

  // Read Aloud speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('beyond_smoking_magazine_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {}
  }, [bookmarkedIds]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { key: 'All', labelEn: 'All Articles', labelAr: 'جميع المقالات' },
    { key: 'Bookmarks', labelEn: `Bookmarks (${bookmarkedIds.length})`, labelAr: `المحفوظات (${bookmarkedIds.length})` },
    { key: 'Awareness', labelEn: 'Awareness', labelAr: 'التوعية العامة' },
    { key: 'Smoking Risks', labelEn: 'Smoking Risks', labelAr: 'مخاطر التدخين' },
    { key: 'Health & Wellness', labelEn: 'Health & Wellness', labelAr: 'الصحة والعافية' },
    { key: 'Quit Smoking', labelEn: 'Quit Smoking', labelAr: 'خطط الإقلاع' },
    { key: 'Daily Motivation', labelEn: 'Daily Motivation', labelAr: 'التحفيز اليومي' },
    { key: 'Success Stories', labelEn: 'Success Stories', labelAr: 'قصص النجاح' }
  ];

  // Article data retrieval helpers with robust fallbacks
  const getArticleTitle = (art: MagazineArticle) =>
    art.title[lang] || art.title.en || Object.values(art.title)[0] || '';

  const getArticleSubtitle = (art: MagazineArticle) =>
    (art.subtitle && (art.subtitle[lang] || art.subtitle.en)) ||
    (art.excerpt && (art.excerpt[lang] || art.excerpt.en)) ||
    '';

  const getArticleCategory = (art: MagazineArticle) =>
    (art.categoryLabel && (art.categoryLabel[lang] || art.categoryLabel.en)) || art.category;

  const getArticleReadTime = (art: MagazineArticle) =>
    art.readTime || `${art.readTimeMinutes || 5} ${isAr ? 'دقائق قراءة' : 'min read'}`;

  const getArticleDate = (art: MagazineArticle) =>
    art.datePublished || '2026-09-01';

  const getArticleParagraphs = (art: MagazineArticle): string[] => {
    if (art.paragraphs && (art.paragraphs[lang] || art.paragraphs.en)) {
      return art.paragraphs[lang] || art.paragraphs.en || [];
    }
    if (art.content && (art.content[lang] || art.content.en)) {
      return [(art.content[lang] || art.content.en)!];
    }
    return [];
  };

  const getArticleTakeaways = (art: MagazineArticle): string[] => {
    if (!art.keyTakeaways) return [];
    if (Array.isArray(art.keyTakeaways)) return art.keyTakeaways;
    const localized = art.keyTakeaways[lang] || art.keyTakeaways.en;
    if (Array.isArray(localized)) return localized;
    return [];
  };

  const filteredArticles = magazineArticles.filter(art => {
    if (selectedCategory === 'Bookmarks') {
      if (!bookmarkedIds.includes(art.id)) return false;
    } else if (selectedCategory !== 'All' && art.category !== selectedCategory) {
      return false;
    }

    const title = getArticleTitle(art).toLowerCase();
    const subtitle = getArticleSubtitle(art).toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return title.includes(query) || subtitle.includes(query);
  });

  // Read Aloud functionality with Arabic voice matching
  const handleStartReadAloud = (article: MagazineArticle) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert(isAr ? 'خاصية القراءة الصوتية غير مدعومة في هذا المتصفح.' : 'Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const title = getArticleTitle(article);
    const subtitle = getArticleSubtitle(article);
    const paragraphs = getArticleParagraphs(article).join('. ');
    const fullText = `${title}. ${subtitle}. ${paragraphs}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = speechRate;

    // Detect language code
    if (lang === 'ar') {
      utterance.lang = 'ar-SA';
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find(v => v.lang.startsWith('ar'));
      if (arVoice) utterance.voice = arVoice;
    } else {
      utterance.lang = lang;
    }

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
    const title = getArticleTitle(article);
    const shareText = `BEYOND SMOKING Magazine: ${title}\nWhatsApp Helpline: 00249919980435`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(`${title}\n${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 rounded-3xl">
      {/* Magazine Masthead & Hero */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <BookOpen className="w-4 h-4" />
          <span>{isAr ? 'المجلة التوعوية الرقمية الشاملة' : 'BEYOND SMOKING Digital Magazine'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          BEYOND SMOKING
        </h1>

        <p className="mt-2 text-base sm:text-xl font-bold text-orange-400">
          {isAr ? 'أنت وصحتك أولاً.. حريتك ومستقبلك' : 'Quit Smoking. Reclaim Your Health.'}
        </p>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'المجلة الصحية المحكمة للتوعية بمخاطر التبغ وتقديم أحدث الأبحاث الطبية، خطط الإقلاع السلوكية، وميزة القراءة الصوتية الذكية.'
            : 'The official peer-reviewed anti-smoking digital magazine. Delivering actionable pulmonary research, behavioral recovery frameworks, and smart audio narration.'}
        </p>
      </div>

      {/* Magazine Quick Navigation Sections Bar */}
      <div className="max-w-7xl mx-auto mb-8 bg-slate-800/90 rounded-2xl border border-slate-700 p-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          <span className="text-slate-400 px-2 uppercase tracking-wider text-[11px] font-black shrink-0">
            {isAr ? 'أقسام المجلة:' : 'Sections:'}
          </span>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat.key
                  ? 'bg-orange-500 text-white border-orange-400 shadow-md font-black'
                  : 'bg-slate-700/60 text-slate-300 border-slate-600/50 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          ))}

          {/* Quick links to sister modules */}
          {onNavigateToTab && (
            <>
              <div className="w-px h-5 bg-slate-700 mx-1 shrink-0" />
              <button
                onClick={() => onNavigateToTab('gallery')}
                className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-purple-950/70 text-purple-300 border border-purple-600/40 hover:bg-purple-900/80 transition cursor-pointer"
              >
                {isAr ? 'معرض اللوحات (9)' : 'Awareness Gallery (9)'}
              </button>
              <button
                onClick={() => onNavigateToTab('videoCenter')}
                className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-cyan-950/70 text-cyan-300 border border-cyan-600/40 hover:bg-cyan-900/80 transition cursor-pointer"
              >
                {isAr ? 'مركز السينما' : 'Video Cinema'}
              </button>
              <button
                onClick={() => onNavigateToTab('challenge')}
                className="px-3 py-1.5 rounded-xl whitespace-nowrap bg-emerald-950/70 text-emerald-300 border border-emerald-600/40 hover:bg-emerald-900/80 transition cursor-pointer"
              >
                {isAr ? 'تحدي الـ 30 يوماً' : '30-Day Challenge'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search Bar & Counter */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'ابحث في مواضيع ومقالات المجلة...' : 'Search magazine articles...'}
            className="w-full ps-10 pe-9 py-2.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
          <span>
            {isAr
              ? `عرض ${filteredArticles.length} من أصل ${magazineArticles.length} مقالاً معتمداً`
              : `Showing ${filteredArticles.length} of ${magazineArticles.length} peer-reviewed articles`}
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-bold text-base">
              {isAr ? 'لم يتم العثور على مقالات تطابق بحثك.' : 'No articles match your criteria.'}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {isAr ? 'جرب البحث بكلمات أخرى أو اختر قسماً مختلفاً من الأعلى.' : 'Try different search keywords or choose another category above.'}
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition cursor-pointer"
            >
              {isAr ? 'عرض جميع المقالات' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map(article => {
              const title = getArticleTitle(article);
              const subtitle = getArticleSubtitle(article);
              const categoryName = getArticleCategory(article);
              const readTime = getArticleReadTime(article);
              const isBookmarked = bookmarkedIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="bg-slate-800/95 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl flex flex-col justify-between hover:border-orange-500/50 hover:shadow-2xl transition-all hover:-translate-y-1 group cursor-pointer"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Category & Controls */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-black uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2.5 py-1 rounded-full border border-orange-500/25">
                          {categoryName}
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{readTime}</span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(article.id, e)}
                            className={`p-1.5 rounded-lg border transition ${
                              isBookmarked
                                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                                : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:text-white'
                            }`}
                            title={isAr ? (isBookmarked ? 'إزالة من المحفوظات' : 'حفظ المقال') : (isBookmarked ? 'Remove bookmark' : 'Bookmark')}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-orange-300 transition-colors leading-snug line-clamp-2 mt-1">
                        {title}
                      </h2>

                      {/* Subtitle / Excerpt */}
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-normal">
                        {subtitle}
                      </p>
                    </div>

                    {/* Metadata & Read CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700/90 flex items-center justify-center text-xs font-bold text-orange-400 border border-slate-600">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 truncate max-w-[130px]">
                          {article.author}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 text-xs font-black text-orange-400 group-hover:text-orange-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        <span>{isAr ? 'قراءة المقال' : 'Read Article'}</span>
                        {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </div>
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8">
            
            {/* Close Button */}
            <button
              onClick={() => {
                handleStopReadAloud();
                setActiveArticle(null);
              }}
              className="absolute top-4 end-4 z-30 p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition border border-slate-600 cursor-pointer shadow"
              aria-label="Close article reader"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Masthead */}
            <div className="mb-6 pe-12">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {getArticleCategory(activeArticle)}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{getArticleReadTime(activeArticle)}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {getArticleTitle(activeArticle)}
              </h2>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800 gap-2">
                <span className="font-bold text-slate-300">
                  {activeArticle.author}
                </span>
                <span className="text-slate-400">{getArticleDate(activeArticle)}</span>
              </div>
            </div>

            {/* Read Aloud Audio & Font Size Control Panel */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-850 to-slate-800 border border-slate-700/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-orange-400 animate-pulse" />
                <span className="text-xs font-black text-white">
                  {isAr ? 'القراءة الصوتية الذكية للمقال' : 'Smart Read Aloud Audio'}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
                {/* Font Size Adjuster */}
                <div className="flex items-center bg-slate-700/60 rounded-xl p-0.5 border border-slate-600">
                  <button
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                      fontSize === 'normal' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                    title={isAr ? 'حجم خط عادي' : 'Standard font'}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                      fontSize === 'large' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                    title={isAr ? 'حجم خط كبير' : 'Large font'}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                      fontSize === 'xlarge' ? 'bg-orange-500 text-white' : 'text-slate-300 hover:text-white'
                    }`}
                    title={isAr ? 'حجم خط كبير جداً' : 'Extra large font'}
                  >
                    A++
                  </button>
                </div>

                {/* Bookmark Toggle */}
                <button
                  type="button"
                  onClick={() => toggleBookmark(activeArticle.id)}
                  className={`p-2 rounded-xl border transition ${
                    bookmarkedIds.includes(activeArticle.id)
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:text-white'
                  }`}
                  title="Bookmark"
                >
                  {bookmarkedIds.includes(activeArticle.id) ? (
                    <BookmarkCheck className="w-4 h-4 fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>

                {/* Audio Play/Pause/Stop */}
                {!isSpeaking ? (
                  <button
                    onClick={() => handleStartReadAloud(activeArticle)}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 transition shadow cursor-pointer active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isAr ? 'استماع صوتي' : 'Listen'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePauseResume}
                      className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
                      <span>{isPaused ? (isAr ? 'متابعة' : 'Resume') : (isAr ? 'إيقاف مؤقت' : 'Pause')}</span>
                    </button>
                    <button
                      onClick={handleStopReadAloud}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-white" />
                      <span>{isAr ? 'إيقاف' : 'Stop'}</span>
                    </button>
                  </>
                )}

                {/* Share Button */}
                <button
                  onClick={() => handleShareArticle(activeArticle)}
                  className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-sky-400 transition cursor-pointer"
                  title="Share Article"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Subtitle / Excerpt Lead */}
            {getArticleSubtitle(activeArticle) && (
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-200 text-sm sm:text-base font-medium leading-relaxed mb-6">
                {getArticleSubtitle(activeArticle)}
              </div>
            )}

            {/* Article Main Body (Formatted by paragraphs) */}
            <div
              className={`text-slate-200 leading-relaxed space-y-4 mb-8 ${
                fontSize === 'normal'
                  ? 'text-sm sm:text-base'
                  : fontSize === 'large'
                  ? 'text-base sm:text-lg'
                  : 'text-lg sm:text-xl'
              }`}
            >
              {getArticleParagraphs(activeArticle).map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Clinical Takeaways */}
            {getArticleTakeaways(activeArticle).length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-slate-800/90 border border-slate-700 shadow-md">
                <h4 className="text-sm font-black text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'أهم النقاط المستفادة والحقائق الطبية:' : 'Key Takeaways & Clinical Facts:'}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-200 font-medium">
                  {getArticleTakeaways(activeArticle).map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Direct Medical Help & WhatsApp */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isAr
                    ? 'هذا المقال للتوعية والتثقيف الصحي ولا يغني عن الاستشارة الطبية المتخصصة.'
                    : 'This publication provides health education and does not substitute professional medical care.'}
                </span>
              </div>
              <a
                href="https://wa.me/249919980435?text=Hello%20Kamal%20Gaffer%20Initiative,%20I%20am%20reading%20BEYOND%20SMOKING%20Magazine"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black flex items-center gap-1.5 transition whitespace-nowrap shadow-md cursor-pointer"
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
