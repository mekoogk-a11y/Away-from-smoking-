import React, { useState, useMemo } from 'react';
import { Language, VideoItem } from '../types';
import { saveVideos } from '../utils/storage';
import { 
  Play, 
  Plus, 
  X, 
  Film, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Stethoscope,
  Brain,
  Lightbulb,
  Trophy,
  Layers,
  Sparkles,
  Info,
  Check
} from 'lucide-react';

interface VideosViewProps {
  lang: Language;
  videos: VideoItem[];
  onUpdateVideos: (newVideos: VideoItem[]) => void;
  onBack?: () => void;
}

type VideoCategoryKey = 'all' | 'medical' | 'psychology' | 'tips' | 'motivation';

// Multilingual labels for 100% coverage across Arabic, English, French, Hausa, and Chinese
const labels: Record<Language, {
  headerBadge: string;
  headerTitle: string;
  headerDesc: string;
  backBtn: string;
  addBtn: string;
  searchPlaceholder: string;
  allThemes: string;
  catMedical: string;
  catMedicalDesc: string;
  catPsychology: string;
  catPsychologyDesc: string;
  catTips: string;
  catTipsDesc: string;
  catMotivation: string;
  catMotivationDesc: string;
  watchBtn: string;
  durationLabel: string;
  noVideosFound: string;
  noVideosDesc: string;
  resetFilter: string;
  modalClose: string;
  modalVideoDesc: string;
  noAutoplayNotice: string;
  addModalTitle: string;
  addTitleLabel: string;
  addTitlePlaceholder: string;
  addUrlLabel: string;
  addUrlPlaceholder: string;
  addCatLabel: string;
  addThumbLabel: string;
  addDescLabel: string;
  addDescPlaceholder: string;
  cancelBtn: string;
  saveBtn: string;
  streamUnavailable: string;
}> = {
  ar: {
    headerBadge: 'مكتبة الفيديو التوعوية والعلمية',
    headerTitle: 'فيديوهات توعوية للإقلاع عن التدخين',
    headerDesc: 'مكتبة مرئية مصنفة تضم شروحات طبية موثقة، تحليلات نفسية لسلوك الإدمان، استراتيجيات للتغلب على الرغبة الملحة، وقصص نجاح ملهمة.',
    backBtn: 'رجوع',
    addBtn: 'إضافة فيديو جديد',
    searchPlaceholder: 'ابحث في الفيديوهات بالعنوان أو الموضوع...',
    allThemes: 'جميع الأقسام',
    catMedical: 'طب وفسيولوجيا التعافي',
    catMedicalDesc: 'شروحات طبية دقيقة لآثار التبغ على الرئتين والقلب ومراحل التعافي العضوية.',
    catPsychology: 'علم النفس وسلوك الإدمان',
    catPsychologyDesc: 'كيف يخدع النيكوتين مسارات الدوبامين، وكيف تكسر الرابط النفسي والعادات.',
    catTips: 'نصائح عملية وإدارة الرغبة',
    catTipsDesc: 'تكتيكات مجربة للتعامل مع أعراض الانسحاب، سيجارة الصباح، ومحفزات التدخين.',
    catMotivation: 'قصص ملهمة وتحفيز',
    catMotivationDesc: 'تجارب واقعية لأشخاص نجحوا في التعافي واستعادوا صحتهم وأموالهم.',
    watchBtn: 'مشاهدة الفيديو',
    durationLabel: 'المدة:',
    noVideosFound: 'لم يتم العثور على فيديوهات مطابقة',
    noVideosDesc: 'جرّب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً من القائمة أعلاه.',
    resetFilter: 'عرض جميع الفيديوهات',
    modalClose: 'إغلاق',
    modalVideoDesc: 'تفاصيل الفيديو والمحتوى العلمي:',
    noAutoplayNotice: 'انقر على زر التشغيل لبدء المشاهدة (التشغيل التلقائي معطل احتراماً لتجربة المستخدم والأجهزة)',
    addModalTitle: 'إضافة فيديو توعوي جديد',
    addTitleLabel: 'عنوان الفيديو *',
    addTitlePlaceholder: 'مثال: كيف تقاوم الرغبة الملحة في أول 48 ساعة',
    addUrlLabel: 'رابط الفيديو (YouTube أو رابط مباشر) *',
    addUrlPlaceholder: 'https://www.youtube.com/watch?v=... أو معرف الفيديو',
    addCatLabel: 'التصنيف والموضوع *',
    addThumbLabel: 'رابط الصورة المصغرة (اختياري)',
    addDescLabel: 'وصف مختصر للمحتوى *',
    addDescPlaceholder: 'اكتب تلخيصاً موجزاً للنقاط الأساسية في الفيديو...',
    cancelBtn: 'إلغاء',
    saveBtn: 'حفظ الفيديو في المكتبة',
    streamUnavailable: 'رابط الفيديو غير متاح حالياً'
  },
  en: {
    headerBadge: 'Clinical & Awareness Video Hub',
    headerTitle: 'Quit Smoking Educational Videos',
    headerDesc: 'Categorized video library featuring verified medical explanations, behavioral psychology insights, urge management tactics, and inspiring recovery stories.',
    backBtn: 'Back',
    addBtn: 'Add New Video',
    searchPlaceholder: 'Search videos by title or topic...',
    allThemes: 'All Categories',
    catMedical: 'Medical & Physiology',
    catMedicalDesc: 'Accurate clinical insights into respiratory and cardiovascular damage and recovery.',
    catPsychology: 'Psychology & Addiction',
    catPsychologyDesc: 'Understanding nicotine deception, dopamine circuits, and mental habit loops.',
    catTips: 'Actionable Tips & Urges',
    catTipsDesc: 'Tested daily techniques to surf cravings, handle withdrawal, and break morning habits.',
    catMotivation: 'Inspiration & Stories',
    catMotivationDesc: 'Heartfelt real journeys of individuals who reclaimed their endurance and wealth.',
    watchBtn: 'Watch Video',
    durationLabel: 'Duration:',
    noVideosFound: 'No matching videos found',
    noVideosDesc: 'Try searching with different keywords or select another theme category above.',
    resetFilter: 'Show all videos',
    modalClose: 'Close',
    modalVideoDesc: 'Video Details & Clinical Context:',
    noAutoplayNotice: 'Click play to start video (Autoplay disabled for performance and user control)',
    addModalTitle: 'Add New Awareness Video',
    addTitleLabel: 'Video Title *',
    addTitlePlaceholder: 'e.g. Conquering the 72-Hour Cravings Peak',
    addUrlLabel: 'Video URL (YouTube or Direct Link) *',
    addUrlPlaceholder: 'https://www.youtube.com/watch?v=... or Video ID',
    addCatLabel: 'Theme & Category *',
    addThumbLabel: 'Thumbnail Image URL (Optional)',
    addDescLabel: 'Brief Description *',
    addDescPlaceholder: 'Summarize the core takeaways of this educational video...',
    cancelBtn: 'Cancel',
    saveBtn: 'Save to Library',
    streamUnavailable: 'Video stream is currently unavailable'
  },
  fr: {
    headerBadge: 'Vidéothèque Éducative & Médicale',
    headerTitle: 'Vidéos Éducatives pour Arrêter de Fumer',
    headerDesc: 'Vidéothèque thématique comprenant des explications médicales fiables, des analyses psychologiques, des astuces anti-envies et des témoignages.',
    backBtn: 'Retour',
    addBtn: 'Ajouter une Vidéo',
    searchPlaceholder: 'Rechercher des vidéos par titre ou sujet...',
    allThemes: 'Toutes les Catégories',
    catMedical: 'Médecine & Physiologie',
    catMedicalDesc: 'Explications cliniques sur la régénération pulmonaire et cardiovasculaire.',
    catPsychology: 'Psychologie & Dépendance',
    catPsychologyDesc: 'Comprendre les circuits de dopamine et briser l\'emprise psychologique de la nicotine.',
    catTips: 'Conseils Pratiques & Envies',
    catTipsDesc: 'Techniques quotidiennes pour surmonter le sevrage et les déclencheurs matinaux.',
    catMotivation: 'Inspiration & Témoignages',
    catMotivationDesc: 'Récits authentiques de personnes ayant retrouvé santé et liberté financière.',
    watchBtn: 'Regarder la Vidéo',
    durationLabel: 'Durée :',
    noVideosFound: 'Aucune vidéo correspondante trouvée',
    noVideosDesc: 'Essayez d\'autres mots-clés ou choisissez une autre catégorie ci-dessus.',
    resetFilter: 'Afficher toutes les vidéos',
    modalClose: 'Fermer',
    modalVideoDesc: 'Détails de la vidéo et contexte éducatif :',
    noAutoplayNotice: 'Cliquez sur lecture pour démarrer (Lecture automatique désactivée)',
    addModalTitle: 'Ajouter une Nouvelle Vidéo',
    addTitleLabel: 'Titre de la vidéo *',
    addTitlePlaceholder: 'Ex: Maîtriser le pic de sevrage des 72 heures',
    addUrlLabel: 'Lien vidéo (YouTube ou direct) *',
    addUrlPlaceholder: 'https://www.youtube.com/watch?v=...',
    addCatLabel: 'Catégorie thématique *',
    addThumbLabel: 'URL de la miniature (optionnel)',
    addDescLabel: 'Description courte *',
    addDescPlaceholder: 'Résumez les points clés de la vidéo...',
    cancelBtn: 'Annuler',
    saveBtn: 'Enregistrer dans la bibliothèque',
    streamUnavailable: 'Flux vidéo actuellement indisponible'
  },
  ha: {
    headerBadge: 'Laburaren Bidiyon Lafiya da Ilimi',
    headerTitle: 'Bidiyon Wayar da Kai kan Barin Shan Taba',
    headerDesc: 'Tarin bidiyoyi da suka shafi bayanan likitanci, ilimin halayyar dan adam game da nicotine, dabarun cin nasara da labaran nasara.',
    backBtn: 'Koma Baya',
    addBtn: 'Ƙara Sabon Bidiyo',
    searchPlaceholder: 'Bincika bidiyo ta taken ko jigo...',
    allThemes: 'Duk Rukunoni',
    catMedical: 'Lafiyar Jiki & Magunguna',
    catMedicalDesc: 'Ilimin likitanci kan yadda huhu da zuciya ke murmurewa bayan daina shan taba.',
    catPsychology: 'Ilimin Halayyar Dan Adam & Jaraba',
    catPsychologyDesc: 'Fahimtar yadda taba ke sarrafa tunani da hanyoyin karya al\'ada.',
    catTips: 'Shawarwari Masu Amfani & Jure Sha\'awa',
    catTipsDesc: 'Dabarun yau da kullun don yakar sha\'awar shan taba da rage damuwa.',
    catMotivation: 'Labaran Nasara & Ƙarfafawa',
    catMotivationDesc: 'Labaran gaskiya na mutanen da suka daina shan taba suka dawo da lafiyarsu.',
    watchBtn: 'Kalli Bidiyo',
    durationLabel: 'Lokaci:',
    noVideosFound: 'Ba a sami bidiyon da ya dace ba',
    noVideosDesc: 'Gwada bincike da wasu kalmomi daban ko zabi wani rukuni a sama.',
    resetFilter: 'Nuna duk bidiyoyi',
    modalClose: 'Rufe',
    modalVideoDesc: 'Bayanin bidiyo da mahimmancin lafiya:',
    noAutoplayNotice: 'Danna don farawa (An kashe kunna kai-tsaye domin inganta aiki)',
    addModalTitle: 'Ƙara Sabon Bidiyon Wayar da Kai',
    addTitleLabel: 'Taken Bidiyo *',
    addTitlePlaceholder: 'Misali: Yadda zaka shawo kan sha\'awar taba',
    addUrlLabel: 'Adireshin Bidiyo (YouTube ko kai-tsaye) *',
    addUrlPlaceholder: 'https://www.youtube.com/watch?v=...',
    addCatLabel: 'Rukuni *',
    addThumbLabel: 'Hoton Farko (Na Zabi ne)',
    addDescLabel: 'Takaitaccen Bayani *',
    addDescPlaceholder: 'Rubuta takaitaccen bayanin abin da bidiyon ya kunsa...',
    cancelBtn: 'Soke',
    saveBtn: 'Ajiye Bidiyo',
    streamUnavailable: 'Ba a iya samun bidiyon a halin yanzu ba'
  },
  zh: {
    headerBadge: '科学戒烟健康视频库',
    headerTitle: '戒烟宣教与健康恢复视频',
    headerDesc: '分类整理的戒烟视频库，涵盖临床医学讲解、戒断心理分析、烟瘾应对技巧与真实戒烟成功故事。',
    backBtn: '返回',
    addBtn: '添加新视频',
    searchPlaceholder: '按标题或主题搜索视频...',
    allThemes: '所有分类',
    catMedical: '医学与生理恢复',
    catMedicalDesc: '肺部与心血管系统受损及戒烟后器官逐步恢复的严谨医学解析。',
    catPsychology: '成瘾心理与行为机制',
    catPsychologyDesc: '剖析尼古丁与多巴胺奖赏回路，破除吸烟缓解压力的心理幻觉。',
    catTips: '实用技巧与克制烟瘾',
    catTipsDesc: '应对戒断反应、晨起第一支烟及高诱惑场景的经过验证的应对策略。',
    catMotivation: '励志启发与成功经历',
    catMotivationDesc: '成功戒烟者重获活力、耐力与节省财富的真实经历分享。',
    watchBtn: '观看视频',
    durationLabel: '时长：',
    noVideosFound: '未找到匹配的视频',
    noVideosDesc: '请尝试其他搜索词或在上方选择不同的主题分类。',
    resetFilter: '显示所有视频',
    modalClose: '关闭',
    modalVideoDesc: '视频详情与医学背景：',
    noAutoplayNotice: '请点击播放按钮开始播放（为保护移动端流量及性能已禁用自动播放）',
    addModalTitle: '添加新宣教视频',
    addTitleLabel: '视频标题 *',
    addTitlePlaceholder: '例如：如何度过最初72小时的强烈烟瘾高峰',
    addUrlLabel: '视频链接 (YouTube 或直链) *',
    addUrlPlaceholder: 'https://www.youtube.com/watch?v=... 或 视频ID',
    addCatLabel: '主题分类 *',
    addThumbLabel: '缩略图链接 (可选)',
    addDescLabel: '内容简述 *',
    addDescPlaceholder: '简要概述本视频的核心健康要点...',
    cancelBtn: '取消',
    saveBtn: '保存至视频库',
    streamUnavailable: '当前视频源暂不可用'
  }
};

export const VideosView: React.FC<VideosViewProps> = ({
  lang,
  videos,
  onUpdateVideos,
  onBack
}) => {
  const t = labels[lang] || labels.ar;
  const ArrowIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  const [selectedCategory, setSelectedCategory] = useState<VideoCategoryKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add video form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'medical' | 'motivation' | 'psychology' | 'tips'>('medical');
  const [newThumbnail, setNewThumbnail] = useState('');

  // Category metadata definition
  const categoryConfigs: {
    id: VideoCategoryKey;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgPill: string;
  }[] = [
    {
      id: 'all',
      label: t.allThemes,
      description: t.headerDesc,
      icon: Layers,
      accentColor: 'text-orange-600',
      bgPill: 'bg-orange-100 text-orange-900 border-orange-200'
    },
    {
      id: 'medical',
      label: t.catMedical,
      description: t.catMedicalDesc,
      icon: Stethoscope,
      accentColor: 'text-rose-600',
      bgPill: 'bg-rose-50 text-rose-800 border-rose-200'
    },
    {
      id: 'psychology',
      label: t.catPsychology,
      description: t.catPsychologyDesc,
      icon: Brain,
      accentColor: 'text-indigo-600',
      bgPill: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    },
    {
      id: 'tips',
      label: t.catTips,
      description: t.catTipsDesc,
      icon: Lightbulb,
      accentColor: 'text-amber-600',
      bgPill: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'motivation',
      label: t.catMotivation,
      description: t.catMotivationDesc,
      icon: Trophy,
      accentColor: 'text-emerald-600',
      bgPill: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ];

  // Get localized title and description
  const getVideoTitle = (video: VideoItem): string => {
    if (lang === 'ar') return video.titleAr;
    if (lang === 'fr') return video.titleFr || video.titleEn;
    if (lang === 'ha') return video.titleHa || video.titleEn;
    if (lang === 'zh') return video.titleZh || video.titleEn;
    return video.titleEn || video.titleAr;
  };

  const getVideoDesc = (video: VideoItem): string => {
    if (lang === 'ar') return video.descriptionAr;
    if (lang === 'fr') return video.descriptionFr || video.descriptionEn;
    if (lang === 'ha') return video.descriptionHa || video.descriptionEn;
    if (lang === 'zh') return video.descriptionZh || video.descriptionEn;
    return video.descriptionEn || video.descriptionAr;
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: videos.length,
      medical: 0,
      psychology: 0,
      tips: 0,
      motivation: 0
    };
    videos.forEach((v) => {
      if (counts[v.category] !== undefined) {
        counts[v.category]++;
      }
    });
    return counts;
  }, [videos]);

  // Filter videos by category and search query
  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const title = getVideoTitle(video).toLowerCase();
      const desc = getVideoDesc(video).toLowerCase();

      return title.includes(q) || desc.includes(q);
    });
  }, [videos, selectedCategory, searchQuery, lang]);

  // Grouped videos by category for comprehensive overview
  const groupedVideos = useMemo(() => {
    const categories: ('medical' | 'psychology' | 'tips' | 'motivation')[] = [
      'medical',
      'psychology',
      'tips',
      'motivation'
    ];
    return categories.map((catKey) => {
      const vids = filteredVideos.filter((v) => v.category === catKey);
      const conf = categoryConfigs.find((c) => c.id === catKey);
      return {
        categoryKey: catKey,
        config: conf!,
        videos: vids
      };
    }).filter((group) => group.videos.length > 0);
  }, [filteredVideos, categoryConfigs]);

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
      titleFr: newTitle,
      titleHa: newTitle,
      titleZh: newTitle,
      descriptionAr: newDesc || (lang === 'ar' ? 'فيديو توعوي مميز' : 'Educational awareness video'),
      descriptionEn: newDesc || 'Educational awareness video',
      descriptionFr: newDesc || 'Vidéo éducative',
      descriptionHa: newDesc || 'Bidiyon wayar da kai',
      descriptionZh: newDesc || '健康宣教视频',
      category: newCategory,
      youtubeId: isYt ? parsedYtId : undefined,
      videoUrl: !isYt && newUrl.trim() ? newUrl.trim() : undefined,
      thumbnailUrl: newThumbnail.trim() || (isYt 
        ? `https://img.youtube.com/vi/${parsedYtId}/hqdefault.jpg`
        : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'),
      duration: '06:00'
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

  // Render individual video card with aspect-ratio container
  const renderVideoCard = (video: VideoItem) => {
    const videoTitle = getVideoTitle(video);
    const videoDesc = getVideoDesc(video);
    const catConfig = categoryConfigs.find((c) => c.id === video.category);
    const CatIcon = catConfig ? catConfig.icon : Film;

    return (
      <div
        key={video.id}
        className="bg-white rounded-3xl overflow-hidden shadow-md border border-orange-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col group/card"
      >
        {/* Aspect Ratio Container for Thumbnail (16:9 aspect-video) */}
        <div 
          onClick={() => setActiveVideo(video)}
          className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer group/thumb select-none"
        >
          <img
            src={video.thumbnailUrl}
            alt={videoTitle}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80';
            }}
          />

          {/* Orange-tinted Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-70 group-hover/thumb:opacity-45 transition-opacity" />

          {/* Theme Category Chip in Thumbnail */}
          <div className="absolute top-3 start-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black border backdrop-blur-md shadow-xs ${
              video.category === 'medical' ? 'bg-rose-950/80 text-rose-200 border-rose-500/40' :
              video.category === 'psychology' ? 'bg-indigo-950/80 text-indigo-200 border-indigo-500/40' :
              video.category === 'tips' ? 'bg-amber-950/80 text-amber-200 border-amber-500/40' :
              'bg-emerald-950/80 text-emerald-200 border-emerald-500/40'
            }`}>
              <CatIcon className="w-3 h-3" />
              <span>
                {video.category === 'medical' && t.catMedical}
                {video.category === 'psychology' && t.catPsychology}
                {video.category === 'tips' && t.catTips}
                {video.category === 'motivation' && t.catMotivation}
              </span>
            </span>
          </div>

          {/* Center Play Button Overlay with Orange Aesthetic */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center shadow-xl shadow-orange-950/50 backdrop-blur-xs transition-transform duration-300 group-hover/thumb:scale-110 border-2 border-white/40">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ms-0.5" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2.5 end-2.5 px-2.5 py-1 bg-black/85 backdrop-blur-xs text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-white/15">
            <Clock className="w-3 h-3 text-orange-400" />
            <span>{video.duration}</span>
          </div>
        </div>

        {/* Card Details & Action */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 mb-2 leading-snug line-clamp-2 group-hover/card:text-orange-600 transition-colors">
              {videoTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
              {videoDesc}
            </p>
          </div>

          <button
            onClick={() => setActiveVideo(video)}
            className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-600 text-orange-800 hover:text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 border border-orange-200/70"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.watchBtn}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-orange-100 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-black border border-orange-200">
              <Film className="w-3.5 h-3.5 text-orange-600" />
              <span>{t.headerBadge}</span>
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-full text-xs font-bold border border-orange-200 transition-all cursor-pointer active:scale-95 group"
                title={t.backBtn}
              >
                <ArrowIcon className="w-3.5 h-3.5 text-orange-600 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                <span>{t.backBtn}</span>
              </button>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            {t.headerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            {t.headerDesc}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          id="add-video-modal-btn"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer self-start md:self-auto shrink-0 text-xs sm:text-sm border border-orange-400/30"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>{t.addBtn}</span>
        </button>
      </div>

      {/* Interactive Category Filter Bar & Search Input */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-orange-100 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full ps-10 pe-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Theme Filter Pills with Dynamic Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categoryConfigs.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const CatIcon = cat.icon;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600 shadow-md scale-102'
                    : 'bg-slate-50 hover:bg-orange-50 text-slate-700 border-slate-200 hover:border-orange-200'
                }`}
              >
                <CatIcon className={`w-4 h-4 ${isSelected ? 'text-white' : cat.accentColor}`} />
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isSelected 
                    ? 'bg-white/25 text-white' 
                    : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Grouped Categories vs Filtered Grid */}
      {filteredVideos.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-orange-100 shadow-md">
          <div className="w-16 h-16 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4 border border-orange-100">
            <Film className="w-8 h-8 opacity-75" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2">
            {t.noVideosFound}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
            {t.noVideosDesc}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition-all cursor-pointer"
          >
            {t.resetFilter}
          </button>
        </div>
      ) : selectedCategory === 'all' && !searchQuery.trim() ? (
        /* Categorized Group Sections (Theme by Theme) */
        <div className="space-y-10">
          {groupedVideos.map(({ categoryKey, config, videos: groupList }) => {
            const GroupIcon = config.icon;
            return (
              <section key={categoryKey} className="space-y-4">
                
                {/* Theme Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-orange-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center border border-orange-200 shrink-0">
                      <GroupIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                          {config.label}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-xs font-black">
                          {groupList.length}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {config.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCategory(categoryKey)}
                    className="text-xs font-extrabold text-orange-600 hover:text-orange-700 hover:underline cursor-pointer self-start sm:self-auto"
                  >
                    {lang === 'ar' ? 'عرض هذا القسم كاملاً ←' : 'View all in this category →'}
                  </button>
                </div>

                {/* Grid of Videos in this Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupList.map((video) => renderVideoCard(video))}
                </div>

              </section>
            );
          })}
        </div>
      ) : (
        /* Flat Grid View when filtered */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-600 font-bold px-1">
            <span>
              {lang === 'ar' 
                ? `عرض ${filteredVideos.length} فيديو مطابقة:` 
                : `Showing ${filteredVideos.length} matching video(s):`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => renderVideoCard(video))}
          </div>
        </div>
      )}

      {/* Video Player Modal (Strictly NO AUTOPLAY) */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 animate-scaleUp text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-black text-sm sm:text-base text-slate-900 truncate">
                    {getVideoTitle(activeVideo)}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-2">
                    <span>{t.durationLabel} {activeVideo.duration}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer shrink-0"
                aria-label={t.modalClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container (Strictly 16:9 Aspect Ratio with NO autoplay) */}
            <div className="relative aspect-video w-full bg-black">
              {activeVideo.youtubeId ? (
                /* YouTube Iframe - NO autoplay parameter */
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0`}
                  title={getVideoTitle(activeVideo)}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : activeVideo.videoUrl ? (
                /* HTML5 Video Tag - NO autoPlay attribute */
                <video
                  src={activeVideo.videoUrl}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-center p-6">
                  <p className="text-sm font-bold text-slate-300">
                    {t.streamUnavailable}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer Description and Context */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-black text-orange-800 mb-1.5">
                <Info className="w-4 h-4 text-orange-600" />
                <span>{t.modalVideoDesc}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {getVideoDesc(activeVideo)}
              </p>

              {/* No Autoplay Performance Notice */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Check className="w-3.5 h-3.5" />
                  {t.noAutoplayNotice}
                </span>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors cursor-pointer text-xs"
                >
                  {t.modalClose}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add New Awareness Video Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-scaleUp text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  {t.addModalTitle}
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
                  {t.addTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.addTitlePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.addUrlLabel}
                </label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder={t.addUrlPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.addCatLabel}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm bg-white"
                  >
                    <option value="medical">{t.catMedical}</option>
                    <option value="psychology">{t.catPsychology}</option>
                    <option value="tips">{t.catTips}</option>
                    <option value="motivation">{t.catMotivation}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.addThumbLabel}
                  </label>
                  <input
                    type="url"
                    value={newThumbnail}
                    onChange={(e) => setNewThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.addDescLabel}
                </label>
                <textarea
                  rows={2}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={t.addDescPlaceholder}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                >
                  {t.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
