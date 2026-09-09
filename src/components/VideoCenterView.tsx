import React, { useState, useRef, useEffect } from 'react';
import { Language, VideoItem } from '../types';
import { initialVideos } from '../data/videoData';
import { AwarenessArtworkGraphic } from './AwarenessArtworkGraphic';
import { awarenessArtworks } from '../data/awarenessArtworksData';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Share2,
  Phone,
  Film,
  Check,
  Subtitles,
  Volume,
  Clock,
  ExternalLink
} from 'lucide-react';

interface VideoCenterViewProps {
  lang: Language;
}

interface VideoScene {
  timeStart: number;
  timeEnd: number;
  title: Record<string, string>;
  caption: Record<string, string>;
}

export const VideoCenterView: React.FC<VideoCenterViewProps> = ({ lang }) => {
  const isAr = lang === 'ar' || lang === 'ur';

  // Video Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(66); // 1 minute 6 seconds
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<number | null>(null);

  // Scenes of the 1:06 min campaign video
  const videoScenes: VideoScene[] = [
    {
      timeStart: 0,
      timeEnd: 6,
      title: {
        en: 'Scene 1: A Global Threat to Humanity',
        ar: 'المشهد 1: تهديد عالمي للبشرية',
        fr: 'Scène 1 : Une menace mondiale pour l’humanité',
        es: 'Escena 1: Una amenaza global para la humanidad',
        pt: 'Cena 1: Uma ameaça global à humanidade',
        de: 'Szene 1: Eine globale Bedrohung der Menschheit',
        zh: '场景一：全人类面临的重大健康威胁',
        ja: 'シーン1：人類に対する地球規模の脅威',
        ru: 'Сцена 1: Глобальная угроза человечеству',
        tr: '1. Sahne: İnsanlığa Yönelik Küresel Tehdit',
        hi: 'दृश्य 1: मानवता के लिए एक वैश्विक खतरा',
        ur: 'منظر 1: انسانیت کے لیے ایک عالمی خطرہ'
      },
      caption: {
        en: 'A hand firmly crushes a burning cigarette against planet Earth. Smoking is not just a habit—it is a global threat destroying vitality.',
        ar: 'يد قوية تسحق سيجارة مشتعلة أمام كوكب الأرض. التدخين ليس مجرد عادة بل خطر عالمي يلتهم الصحة والشباب.',
        fr: 'Une main écrase une cigarette allumée sur la Terre. Fumer n’est pas qu’une habitude, c’est une menace mondiale.',
        es: 'Una mano rompe un cigarrillo encendido sobre la Tierra. El tabaco es una amenaza mundial.',
        pt: 'Uma mão quebra um cigarro aceso sobre a Terra. Fumar é uma ameaça global.',
        de: 'Eine Hand zerbricht eine brennende Zigarette vor der Erde. Rauchen ist eine globale Gefahr.',
        zh: '大手在地球仪前果断折断燃烧的香烟：吸烟不仅是个人习惯，更是席卷全球的健康灾难。',
        ja: '地球の前でタバコを折る手：喫煙は単なる習慣ではなく、地球規模の危機です。',
        ru: 'Рука ломает сигарету на фоне Земли: курение — это глобальная угроза жизни.',
        tr: 'Dünya önünde sigarayı kıran bir el: Sigara sadece bir alışkanlık değil, küresel bir tehdittir.',
        hi: 'पृथ्वी के सामने सिगरेट तोड़ता हाथ: धूम्रपान सिर्फ आदत नहीं, बल्कि वैश्विक खतरा है।',
        ur: 'زمین کے سامنے سگریٹ توڑتا ہوا ہاتھ: تمباکو نوشی صرف ایک عادت نہیں بلکہ عالمی خطرہ ہے۔'
      }
    },
    {
      timeStart: 6,
      timeEnd: 17,
      title: {
        en: 'Scene 2: Toxic Chemicals & Fatal Diseases',
        ar: 'المشهد 2: السموم الكيميائية والأمراض القاتلة',
        fr: 'Scène 2 : Produits chimiques toxiques et maladies mortelles',
        es: 'Escena 2: Químicos tóxicos y enfermedades mortales',
        pt: 'Cena 2: Químicos tóxicos e doenças fatais',
        de: 'Szene 2: Giftige Chemikalien und tödliche Krankheiten',
        zh: '场景二：剧毒化学物质与致命疾病链',
        ja: 'シーン2：有毒化学物質と致死的な病気',
        ru: 'Сцена 2: Токсичные яды и смертельные заболевания',
        tr: '2. Sahne: Zehirli Kimyasallar ve Ölümcül Hastalıklar',
        hi: 'दृश्य 2: जहरीले रसायन और घातक बीमारियां',
        ur: 'منظر 2: زہریلے کیمیکلز اور جان لیوا بیماریاں'
      },
      caption: {
        en: 'Over 7,000 toxic chemicals attack blood vessels, trigger lung and throat cancer, multiply heart attack risks, and cause irreversible bronchitis.',
        ar: 'أكثر من 7000 مادة كيميائية تهاجم الأوعية الدموية، تسبب سرطان الرئة والحنجرة، وتضاعف أخطار النوبات القلبية والتهاب الشعب المزمن.',
        fr: 'Plus de 7 000 substances toxiques provoquent cancers pulmonaires, infarctus et bronchites chroniques.',
        es: 'Más de 7.000 sustancias tóxicas provocan cáncer, infartos y bronquitis crónica.',
        pt: 'Mais de 7.000 substâncias tóxicas causam câncer, infartos e bronquite crônica.',
        de: 'Über 7.000 Chemikalien verursachen Lungenkrebs, Herzinfarkte und chronische Bronchitis.',
        zh: '超过7000种有害化学毒素狂暴攻击血管内皮，直接诱发肺癌与喉癌，心肌梗死与慢阻肺几率成倍暴涨。',
        ja: '7,000種以上の有害物質が肺がん、心筋梗塞、慢性気管支炎を引き起こします。',
        ru: 'Свыше 7000 токсинов провоцируют рак легких, инфаркты и хронический бронхит.',
        tr: '7.000\'den fazla toksik kimyasal akciğer kanseri, kalp krizi ve kronik bronşite yol açar.',
        hi: '7,000 से अधिक जहरीले रसायन फेफड़ों के कैंसर, दिल के दौरे और ब्रोंकाइटिस का कारण बनते हैं।',
        ur: '7000 سے زائد زہریلے کیمیکلز پھیپھڑوں کے کینسر، ہارٹ اٹیک اور دائمی بیماریوں کا سبب بنتے ہیں۔'
      }
    },
    {
      timeStart: 17,
      timeEnd: 25,
      title: {
        en: 'Scene 3: Living Lung vs. Diseased Smoker Lung',
        ar: 'المشهد 3: الرئة الحية السليمة مقابل الرئة المصابة',
        fr: 'Scène 3 : Poumon sain vs Poumon malade',
        es: 'Escena 3: Pulmón sano vs Pulmón enfermo',
        pt: 'Cena 3: Pulmão saudável vs Pulmão doente',
        de: 'Szene 3: Gesunde Lunge vs. Teerlunge',
        zh: '场景三：红润健康肺与焦油病变黑肺的惨痛对照',
        ja: 'シーン3：健康な肺とタールに侵された肺の対比',
        ru: 'Сцена 3: Здоровые легкие против черных легких курильщика',
        tr: '3. Sahne: Sağlıklı Akciğer vs Hastalıklı Akciğer',
        hi: 'दृश्य 3: स्वस्थ फेफड़ा बनाम रोगग्रस्त काला फेفड़ा',
        ur: 'منظر 3: صحت مند پھیپھڑا بمقابلہ متاثرہ پھیپھڑا'
      },
      caption: {
        en: 'Look at the stark contrast: a pink lung breathing clean oxygen versus a blackened lung decaying under heavy tobacco tar deposits.',
        ar: 'انظر إلى الفارق الصادم: رئة وردية تنبض بالحياة مقابل رئة متفحمة بالسواد والقطران المتراكم.',
        fr: 'Regardez le contraste : un poumon rose plein de vie face à un poumon noirci par le goudron.',
        es: 'Observa el contraste: un pulmón rosado sano frente a uno negro destruido por el alquitrán.',
        pt: 'Veja o contraste: um pulmão rosado e vivo contra um pulmão enegrecido pelo alcatrão.',
        de: 'Sieh den Kontrast: Eine gesunde rosa Lunge im Vergleich zu einer von Teer zerstörten Lunge.',
        zh: '触目惊心的解剖对照：粉红饱满、通畅摄氧的生命之肺，与被厚重有毒焦油层层黑化蚕食的吸烟者之肺。',
        ja: '鮮明な対比：生命力あふれるピンク色の肺と、黒いタールで朽ちゆく喫煙者の肺。',
        ru: 'Взгляните на контраст: розовые дышащие легкие и черные легкие, пораженные смолой.',
        tr: 'Çarpıcı karşılaştırma: Hayat dolu pembe bir akciğer ve katranla kararmış bir akciğer.',
        hi: 'स्पष्ट अंतर देखें: शुद्ध सांस लेता गुलाबी फेफड़ा बनाम तारकोल से काला पड़ा फेफड़ा।',
        ur: 'واضح موازنہ دیکھیں: صاف ہوا لیتا گلابی پھیپھڑا بمقابلہ تارکول سے سیاہ پھیپھڑا۔'
      }
    },
    {
      timeStart: 25,
      timeEnd: 36,
      title: {
        en: 'Scene 4: Quitting Restores Health at Any Age',
        ar: 'المشهد 4: الإقلاع يعيد العافية في أي عمر',
        fr: 'Scène 4 : Arrêter restaure la santé à tout âge',
        es: 'Escena 4: Dejarlo restaura la salud a cualquier edad',
        pt: 'Cena 4: Parar devolve a saúde em qualquer idade',
        de: 'Szene 4: Aufhören lohnt sich in jedem Alter',
        zh: '场景四：无论何时戒烟，健康即刻破茧重生',
        ja: 'シーン4：何歳からでも禁煙は健康を取り戻す',
        ru: 'Сцена 4: Отказ возвращает здоровье в любом возрасте',
        tr: '4. Sahne: Bırakmak Her Yaşta Sağlığı Geri Getirir',
        hi: 'दृश्य 4: किसी भी उम्र में छोड़ने से स्वास्थ्य वापस आता है',
        ur: 'منظر 4: کسی بھی عمر میں سگریٹ چھوڑنا صحت بحال کرتا ہے'
      },
      caption: {
        en: 'The human body has incredible regenerative power. Quitting restores heart health, eases breathing, boosts physical energy, and extends your lifespan.',
        ar: 'يمتلك الجسد البشري قدرة مذهلة على الشفاء. الإقلاع يجدد صحة القلب، يسهل التنفس، يرفع الطاقة، ويمنحك عمراً أطول بإذن الله.',
        fr: 'Le corps a un pouvoir de régénération incroyable : meilleur cœur, respiration aisée et énergie décuplée.',
        es: 'El cuerpo se regenera: corazón más sano, respiración más fácil y más energía.',
        pt: 'O corpo tem poder de cura: coração mais saudável, respiração livre e mais anos de vida.',
        de: 'Der Körper regeneriert sich erstaunlich schnell: Ein gesünderes Herz und mehr Lebensenergie.',
        zh: '人类机体拥有神奇的自我修复潜能。戒烟即刻让心脏复苏、呼吸畅快、精力充沛并大幅延长寿命。',
        ja: '体には再生力があります。禁煙は心臓を保護し、呼吸を楽にし、寿命を延ばします。',
        ru: 'Тело способно к обновлению: здоровое сердце, легкое дыхание и прилив энергии.',
        tr: 'Vücudun inanılmaz bir yenilenme gücü vardır: Daha sağlıklı bir kalp ve rahat bir nefes.',
        hi: 'शरीर में ठीक होने की अद्भुत शक्ति है: स्वस्थ हृदय, आसान सांस और लंबी उम्र।',
        ur: 'انسانی جسم میں بحالی کی زبردست طاقت ہے: صحت مند دل، آسان سانس اور لمبی عمر۔'
      }
    },
    {
      timeStart: 36,
      timeEnd: 43,
      title: {
        en: 'Scene 5: Start Your Journey Today',
        ar: 'المشهد 5: ابدأ رحلتك نحو الحرية اليوم',
        fr: 'Scène 5 : Commencez votre voyage aujourd’hui',
        es: 'Escena 5: Inicia tu viaje hoy',
        pt: 'Cena 5: Comece sua jornada hoje',
        de: 'Szene 5: Starte deine Reise heute',
        zh: '场景五：把握当下，今天就开启无烟旅程',
        ja: 'シーン5：今日から自由への旅を始めよう',
        ru: 'Сцена 5: Начните свой путь к свободе сегодня',
        tr: '5. Sahne: Yolculuğunuza Bugün Başlayın',
        hi: 'दृश्य 5: आज ही अपनी यात्रा शुरू करें',
        ur: 'منظر 5: آج ہی آزادی کے سفر کا آغاز کریں'
      },
      caption: {
        en: 'Say NO to tobacco! Choose clean air, protect your family, and step into a bright, smoke-free future.',
        ar: 'قل لا للتبغ! اختر الهواء النقي، احمِ عائلتك، وتقدم بثقة نحو مستقبل مشرق خالٍ من التدخين.',
        fr: 'Dites NON au tabac ! Choisissez l’air pur et protégez vos proches dès maintenant.',
        es: '¡Dile NO al tabaco! Elige aire limpio y protege a tu familia hoy mismo.',
        pt: 'Diga NÃO ao tabaco! Escolha ar puro e proteja sua família a partir de hoje.',
        de: 'Sag NEIN zum Tabak! Wähle frische Luft und schütze deine Familie noch heute.',
        zh: '对烟草果断说“不”！选择纯净氧气，守护挚爱家庭，大步迈入明媚的无烟新生。',
        ja: 'タバコにNOを！きれいな空気を選び、家族を守り、明るい未来へ踏み出しましょう。',
        ru: 'Скажите НЕТ табаку! Выбирайте чистый воздух и защитите свою семью уже сегодня.',
        tr: 'Tütüne HAYIR deyin! Temiz havayı seçin ve ailenizi bugünden koruyun.',
        hi: 'तंबाकू को ना कहें! शुद्ध हवा चुनें और अपने परिवार की रक्षा करें।',
        ur: 'تمباکو کو نہ کہیں! صاف ہوا کا انتخاب کریں اور اپنے خاندان کی حفاظت کریں۔'
      }
    },
    {
      timeStart: 43,
      timeEnd: 66,
      title: {
        en: 'Scene 6: The Kamal Gaffer Initiative & Direct Support',
        ar: 'المشهد 6: مبادرة كمال جعفر والدعم المباشر',
        fr: 'Scène 6 : Initiative Kamal Gaffer & Soutien direct',
        es: 'Escena 6: Iniciativa Kamal Gaffer y Soporte Directo',
        pt: 'Cena 6: Iniciativa Kamal Gaffer & Apoio Direto',
        de: 'Szene 6: Kamal Gaffer Initiative & Direkte Hilfe',
        zh: '场景六：卡迈勒·贾法尔控烟倡议与官方直连服务',
        ja: 'シーン6：カマル・ガッファル イニシアティブと直接サポート',
        ru: 'Сцена 6: Инициатива Камала Гаффара и прямая помощь',
        tr: '6. Sahne: Kamal Gaffer İnisiyatifi ve Doğrudan Destek',
        hi: 'दृश्य 6: कमल गफ़्फ़र पहल और सीधा सहयोग',
        ur: 'منظر 6: کمال جعفر مہم اور براہ راست تعاون'
      },
      caption: {
        en: 'Together toward health and wellness. For counseling, program guidance, and application support: Contact WhatsApp 00249919980435.',
        ar: 'معاً نحو الصحة والعافية وبيئة أنقى. للتواصل والدعم والمساعدة وتطوير البرامج التوعوية: واتساب 00249919980435.',
        fr: 'Ensemble vers la santé et le bien-être. Contact direct WhatsApp : 00249919980435.',
        es: 'Juntos hacia la salud y el bienestar. Contacto directo WhatsApp: 00249919980435.',
        pt: 'Juntos rumo à saúde e bem-estar. Contato direto WhatsApp: 00249919980435.',
        de: 'Gemeinsam für Gesundheit und Wohlbefinden. Direkter WhatsApp-Kontakt: 00249919980435.',
        zh: '携手并肩迈向健康与洁净家园。戒烟心理辅导与公益项目支持：WhatsApp 00249919980435。',
        ja: '共により良い健康と環境へ。公式直接サポート WhatsApp: 00249919980435。',
        ru: 'Вместе к здоровью и чистой жизни. Прямой контакт WhatsApp: 00249919980435.',
        tr: 'Sağlık ve esenlik için birlikte. Doğrudan WhatsApp Destek: 00249919980435.',
        hi: 'स्वास्थ्य और कल्याण के लिए एक साथ। सीधा व्हाट्सएप संपर्क: 00249919980435।',
        ur: 'صحت، تندرستی اور صاف ماحول کے لیے ایک ساتھ۔ براہ راست واٹس ایپ رابطہ: 00249919980435۔'
      }
    }
  ];

  // Active scene based on currentTime
  const currentScene =
    videoScenes.find(s => currentTime >= s.timeStart && currentTime < s.timeEnd) ||
    videoScenes[videoScenes.length - 1];

  // Progress simulation ticker when playing
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration]);

  // Voice Narration synthesis
  const toggleVoiceNarration = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isVoiceNarrating) {
      window.speechSynthesis.cancel();
      setIsVoiceNarrating(false);
      return;
    }

    window.speechSynthesis.cancel();
    const sceneCaption = currentScene.caption[lang] || currentScene.caption.en;
    const utterance = new SpeechSynthesisUtterance(sceneCaption);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.onend = () => setIsVoiceNarrating(false);
    utterance.onerror = () => setIsVoiceNarrating(false);

    window.speechSynthesis.speak(utterance);
    setIsVoiceNarrating(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.min(duration, Math.max(0, newTime)));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleShare = async () => {
    const title = isAr
      ? 'فيديو التوعية: التدخين ليس مجرد عادة.. بل تهديد عالمي'
      : "Awareness Video: Smoking: It's Not Just a Habit... It's a Global Threat";
    const text = `${title}\n\nWatch this public health video on BEYOND SMOKING Magazine.\nFor support: WhatsApp 00249919980435`;

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
      await navigator.clipboard.writeText(text);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch {
      alert(text);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // The primary artwork for the video poster
  const posterArtwork = awarenessArtworks[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400/40 animate-in fade-in slide-in-from-bottom">
          <Check className="w-5 h-5" />
          <span className="text-sm font-semibold">
            {isAr ? 'تم نسخ رابط ومعلومات الفيديو!' : 'Video link copied to clipboard!'}
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Film className="w-4 h-4" />
          <span>{isAr ? 'مركز الفيديو التوعوي' : 'Official Video Center'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          {isAr
            ? 'التدخين ليس مجرد عادة... بل تهديد عالمي لحياتك'
            : "Smoking: It's Not Just a Habit... It's a Global Threat"}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          {isAr
            ? 'فيلم توعوي علمي وإنساني من إعداد الأستاذ كمال جعفر يسلط الضوء على تدمير التبغ لأعضاء الجسم وأهمية قرار الإقلاع الفوري.'
            : 'A comprehensive health-awareness film by Kamal Gaffer illustrating the catastrophic physiological harm of smoking and the life-saving decision to quit today.'}
        </p>
      </div>

      {/* Main Video Cinema Container */}
      <div className="max-w-5xl mx-auto mb-12">
        <div
          ref={containerRef}
          className="relative bg-slate-950 rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col group"
        >
          {/* Main Visual Screen */}
          <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
            {/* Dynamic Visual Content depending on scene */}
            {currentTime < 17 && (
              <AwarenessArtworkGraphic
                artwork={awarenessArtworks[0]}
                lang={lang}
                showOverlay={false}
                className="w-full h-full object-cover rounded-none border-0"
              />
            )}
            {currentTime >= 17 && currentTime < 25 && (
              <AwarenessArtworkGraphic
                artwork={awarenessArtworks[1]}
                lang={lang}
                showOverlay={false}
                className="w-full h-full object-cover rounded-none border-0"
              />
            )}
            {currentTime >= 25 && currentTime < 36 && (
              <AwarenessArtworkGraphic
                artwork={awarenessArtworks[4]}
                lang={lang}
                showOverlay={false}
                className="w-full h-full object-cover rounded-none border-0"
              />
            )}
            {currentTime >= 36 && currentTime < 43 && (
              <AwarenessArtworkGraphic
                artwork={awarenessArtworks[5]}
                lang={lang}
                showOverlay={false}
                className="w-full h-full object-cover rounded-none border-0"
              />
            )}
            {currentTime >= 43 && (
              <AwarenessArtworkGraphic
                artwork={awarenessArtworks[8]}
                lang={lang}
                showOverlay={false}
                className="w-full h-full object-cover rounded-none border-0"
              />
            )}

            {/* Play/Pause Center Overlay Button when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-all">
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-500/90 hover:bg-orange-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-white/20"
                  aria-label="Play video"
                >
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-white" />
                </button>
              </div>
            )}

            {/* Active Scene Subtitles / Captions Banner */}
            {showCaptions && (
              <div className="absolute bottom-16 inset-x-4 sm:inset-x-8 z-20 pointer-events-none text-center">
                <div className="inline-block max-w-2xl px-4 py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {currentScene.caption[lang] || currentScene.caption.en}
                  </span>
                </div>
              </div>
            )}

            {/* Initiative Watermark */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-bold text-orange-400 border border-orange-500/30">
                BEYOND SMOKING • FILM
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 sm:p-5 bg-slate-950/95 border-t border-slate-800 flex flex-col gap-3">
            {/* Scrubber Progress Bar */}
            <div className="relative w-full">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={e => handleSeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500 transition"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>{formatSeconds(currentTime)}</span>
                <span className="text-orange-400 font-semibold truncate max-w-xs sm:max-w-md">
                  {currentScene.title[lang] || currentScene.title.en}
                </span>
                <span>{formatSeconds(duration)}</span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Play / Pause */}
                <button
                  onClick={handlePlayPause}
                  className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition shadow-md"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                {/* Restart */}
                <button
                  onClick={() => handleSeek(0)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title={isAr ? 'إعادة من البداية' : 'Restart Video'}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  aria-label="Toggle mute"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Voice Narration in Selected Language */}
                <button
                  onClick={toggleVoiceNarration}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                    isVoiceNarrating
                      ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                  title={isAr ? 'قراءة التعليق الصوتي باللغة المختارة' : 'Voice narration in selected language'}
                >
                  <Volume className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">
                    {isVoiceNarrating
                      ? isAr
                        ? 'التعليق الصوتي نشط'
                        : 'Narrating...'
                      : isAr
                      ? 'صوت الراوي'
                      : 'Voice Narrator'}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle Captions */}
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`p-2.5 rounded-xl text-xs font-semibold transition border ${
                    showCaptions
                      ? 'bg-sky-600/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title={isAr ? 'إظهار / إخفاء الترجمة' : 'Toggle Subtitles'}
                >
                  <Subtitles className="w-4 h-4" />
                </button>

                {/* Share Video */}
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                  title={isAr ? 'مشاركة الفيديو' : 'Share Video'}
                >
                  <Share2 className="w-4 h-4 text-sky-400" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={handleFullscreen}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
                  title={isAr ? 'ملء الشاشة' : 'Toggle Fullscreen'}
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Scene Timeline Scrubber */}
      <div className="max-w-5xl mx-auto mb-14">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>{isAr ? 'فصول ومشاهد الفيلم التوعوي:' : 'Video Chapters & Scrubber:'}</span>
          </h3>
          <span className="text-xs text-slate-400">
            {isAr ? 'اضغط على أي مشهد للانتقال إليه مباشرة' : 'Click any chapter to jump directly'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {videoScenes.map((scene, idx) => {
            const isActive = currentTime >= scene.timeStart && currentTime < scene.timeEnd;
            const title = scene.title[lang] || scene.title.en;

            return (
              <button
                key={idx}
                onClick={() => handleSeek(scene.timeStart)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-orange-500/15 border-orange-500 text-white shadow-lg'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[11px] font-mono text-orange-400 font-bold">
                    {formatSeconds(scene.timeStart)} - {formatSeconds(scene.timeEnd)}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                  )}
                </div>
                <span className="text-xs font-bold line-clamp-1">{title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Direct WhatsApp Initiative Card */}
      <div className="max-w-5xl mx-auto mb-16 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/70 p-6 rounded-3xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
            <Phone className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              {isAr ? 'مبادرة كمال جعفر لمكافحة التدخين' : 'The Kamal Gaffer Anti-Smoking Initiative'}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {isAr
                ? 'للتواصل، والمشورة الطبية، والدعم المستمر عبر واتساب:'
                : 'Direct public health counseling and WhatsApp communication:'}
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/249919980435?text=Hello%20Kamal%20Gaffer%20Initiative,%20I%20am%20watching%20the%20awareness%20video%20on%20BEYOND%20SMOKING"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition whitespace-nowrap"
        >
          <span>WhatsApp: 00249919980435</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Related Scientific Videos Section (from initialVideos) */}
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? 'مكتبة الفيديوهات العلمية الموثقة' : 'Related Scientific Video Library'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isAr
                ? 'شروحات طبية مرئية معتمدة من منظمة الصحة العالمية والجهات الطبية الموثوقة'
                : 'Evidence-based visual explanations curated from international health authorities'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialVideos.map(vid => (
            <div
              key={vid.id}
              className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg flex flex-col justify-between hover:border-orange-500/50 transition"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  src={vid.embedUrl}
                  title={vid.titleEn}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                    {vid.category}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-white line-clamp-2">
                    {isAr ? vid.titleAr : vid.titleEn}
                  </h4>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                    {isAr ? vid.descriptionAr : vid.descriptionEn}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{vid.sourceName}</span>
                  <span className="font-mono">{vid.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
