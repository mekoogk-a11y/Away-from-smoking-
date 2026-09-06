import React, { useState } from 'react';
import { Language, VideoItem } from '../types';
import { translations } from '../data/translations';
import { saveVideos } from '../utils/storage';
import { 
  Play, 
  Plus, 
  X, 
  Film, 
  ExternalLink, 
  Sparkles, 
  Tag,
  Clock,
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface VideosViewProps {
  lang: Language;
  videos: VideoItem[];
  onUpdateVideos: (newVideos: VideoItem[]) => void;
  onBack?: () => void;
}

export const VideosView: React.FC<VideosViewProps> = ({
  lang,
  videos,
  onUpdateVideos,
  onBack
}) => {
  const t = translations[lang];
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add video form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'medical' | 'motivation' | 'psychology' | 'tips'>('medical');
  const [newThumbnail, setNewThumbnail] = useState('');

  const categories = [
    { id: 'all', label: t.allVideos },
    { id: 'medical', label: t.categoryMedical },
    { id: 'motivation', label: t.categoryMotivation },
    { id: 'psychology', label: t.categoryPsychology },
    { id: 'tips', label: t.categoryTips },
  ];

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category === selectedCategory);

  const extractYoutubeId = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedYtId = extractYoutubeId(newUrl.trim());
    const isYt = parsedYtId && parsedYtId.length === 11;

    const newVideoItem: VideoItem = {
      id: `vid-${Date.now()}`,
      titleAr: newTitle,
      titleEn: newTitle,
      descriptionAr: newDesc || (lang === 'ar' ? 'فيديو توعوي مميز' : 'Awareness video'),
      descriptionEn: newDesc || 'Awareness video',
      category: newCategory,
      youtubeId: isYt ? parsedYtId : undefined,
      videoUrl: !isYt && newUrl.trim() ? newUrl.trim() : undefined,
      thumbnailUrl: newThumbnail.trim() || (isYt 
        ? `https://img.youtube.com/vi/${parsedYtId}/hqdefault.jpg`
        : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'),
      duration: '05:00'
    };

    const updated = [newVideoItem, ...videos];
    onUpdateVideos(updated);
    saveVideos(updated);

    // Reset and close
    setNewTitle('');
    setNewUrl('');
    setNewDesc('');
    setNewThumbnail('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header & Add Video Button */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-black border border-orange-200">
              <Film className="w-3.5 h-3.5 text-orange-600" />
              <span>{lang === 'ar' ? 'محتوى مرئي توعوي ملهم' : 'Inspiring Awareness Video Hub'}</span>
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-full text-xs font-bold border border-orange-200 transition-all cursor-pointer active:scale-95 group"
                title={lang === 'ar' ? 'رجوع إلى الصفحة السابقة' : 'Back to previous page'}
              >
                <ArrowIcon className="w-3.5 h-3.5 text-orange-600 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                <span>{lang === 'ar' ? 'سهم رجوع' : 'Back'}</span>
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {t.videosHeader}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {t.videosSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="add-video-modal-btn"
          className="flex items-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>{t.addNewVideo}</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white hover:bg-orange-50 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          return (
            <div
              key={video.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-xl hover:border-orange-300 transition-all flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div 
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={lang === 'ar' ? video.titleAr : video.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/15 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ms-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 end-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white rounded-lg text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 rounded-full text-[11px] font-bold">
                      {video.category === 'medical' && (lang === 'ar' ? 'طبي' : 'Medical')}
                      {video.category === 'motivation' && (lang === 'ar' ? 'تحفيز' : 'Motivation')}
                      {video.category === 'psychology' && (lang === 'ar' ? 'سلوكي' : 'Psychology')}
                      {video.category === 'tips' && (lang === 'ar' ? 'نصائح' : 'Tips')}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-2 leading-snug line-clamp-2">
                    {lang === 'ar' ? video.titleAr : video.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {lang === 'ar' ? video.descriptionAr : video.descriptionEn}
                  </p>
                </div>

                <button
                  onClick={() => setActiveVideo(video)}
                  className="w-full py-2.5 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.watchVideo}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 animate-fadeIn">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-base sm:text-lg text-slate-900 line-clamp-1">
                {lang === 'ar' ? activeVideo.titleAr : activeVideo.titleEn}
              </h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container (Responsive 16:9) */}
            <div className="relative aspect-video bg-black">
              {activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={lang === 'ar' ? activeVideo.titleAr : activeVideo.titleEn}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-center p-6">
                  <p>{lang === 'ar' ? 'رابط الفيديو غير متاح حالياً' : 'Video stream is currently unavailable'}</p>
                </div>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 bg-slate-50 border-t border-slate-100">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {lang === 'ar' ? activeVideo.descriptionAr : activeVideo.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add New Video Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-orange-600" />
                <h3 className="font-extrabold text-lg text-slate-900">
                  {t.addNewVideo}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.videoTitleLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: كيف تقاوم سيجارة الصباح' : 'e.g. Defeating the Morning Craving'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.videoUrlLabel}
                </label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... أو معرف الفيديو"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.videoCategoryLabel}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  >
                    <option value="medical">{t.categoryMedical}</option>
                    <option value="motivation">{t.categoryMotivation}</option>
                    <option value="psychology">{t.categoryPsychology}</option>
                    <option value="tips">{t.categoryTips}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'رابط الصورة المصغرة (اختياري)' : 'Thumbnail URL (Optional)'}
                  </label>
                  <input
                    type="url"
                    value={newThumbnail}
                    onChange={(e) => setNewThumbnail(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.videoDescLabel}
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={lang === 'ar' ? 'وصف مختصر للفيديو...' : 'Brief summary of the video...'}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
                >
                  {t.closeModal}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  {t.saveVideoBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
