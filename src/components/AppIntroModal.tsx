import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { awarenessArtworks } from '../data/awarenessArtworksData';
import { AwarenessArtworkGraphic } from './AwarenessArtworkGraphic';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Phone,
  Film,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Globe
} from 'lucide-react';

interface AppIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface VideoSegment {
  start: number;
  end: number;
  artworkIndex: number;
  englishText: string;
  arabicText: string;
  zoomEffect: 'zoom-in' | 'pan-left' | 'pan-right' | 'zoom-out';
}

export const AppIntroModal: React.FC<AppIntroModalProps> = ({ isOpen, onClose, lang }) => {
  const isAr = lang === 'ar' || lang === 'ur';

  // Total duration of the official campaign video is 66 seconds (01:06)
  const TOTAL_DURATION = 66;

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [hasStartedInteracting, setHasStartedInteracting] = useState(false);
  const [audioVoiceLang, setAudioVoiceLang] = useState<'en' | 'ar'>('en');

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastSpokenSegmentIndexRef = useRef<number>(-1);

  // Exact 8 visual & narration segments of the uploaded campaign video
  const segments: VideoSegment[] = [
    {
      start: 0,
      end: 6,
      artworkIndex: 0, // Global Threat: Hand breaking cigarette over Earth
      englishText: "Smoking is not just a habit... It is a serious threat to your health.",
      arabicText: "التدخين ليس مجرد عادة... بل هو تهديد خطير لصحتك وحياتك.",
      zoomEffect: 'zoom-in'
    },
    {
      start: 6,
      end: 17,
      artworkIndex: 4, // Before It Stops You: Shattered man with ash & disease stats
      englishText: "Every cigarette exposes your body to thousands of harmful chemicals, and increases the risk of lung cancer, heart disease, stroke, and other dangerous illnesses.",
      arabicText: "كل سيجارة تعرض جسدك لآلاف المواد الكيميائية السامة، وتزيد من خطر الإصابة بسرطان الرئة، أمراض القلب، السكتة الدماغية، وغيرها من الأمراض القاتلة.",
      zoomEffect: 'pan-left'
    },
    {
      start: 17,
      end: 25,
      artworkIndex: 1, // Living Lung vs Diseased Smoker Lung
      englishText: "Smoking can damage your lungs, weaken your body, affect your breathing, and reduce your quality of life.",
      arabicText: "التدخين يدمر الرئتين، ويضعف مناعة الجسد، ويسلبك القدرة على التنفس الطبيعي ويقلل من جودة حياتك.",
      zoomEffect: 'zoom-out'
    },
    {
      start: 25,
      end: 31,
      artworkIndex: 2, // Shattered Man looking towards hope & recovery
      englishText: "But there is good news. Quitting smoking can improve your health at any age.",
      arabicText: "ولكن هناك بشرى وأمل كبير: التوقف عن التدخين يعيد لجسمك عافيته في أي عمر.",
      zoomEffect: 'zoom-in'
    },
    {
      start: 31,
      end: 36,
      artworkIndex: 0, // Hand breaking cigarette with city of future
      englishText: "Protect yourself. Protect your family. Protect the air you breathe.",
      arabicText: "احمِ نفسك. احمِ عائلتك. احمِ نقاء الهواء الذي تتنفسه أنت ومن تحب.",
      zoomEffect: 'pan-right'
    },
    {
      start: 36,
      end: 43,
      artworkIndex: 5, // Healthy Lifestyle: Better breathing, immunity, longevity
      englishText: "If you smoke, make today the day you start your journey toward a healthier life.",
      arabicText: "إذا كنت مدخناً، اجعل من هذا اليوم نقطة انطلاق لرحلتك المباركة نحو حياة نقية وصحية.",
      zoomEffect: 'zoom-in'
    },
    {
      start: 43,
      end: 51,
      artworkIndex: 4, // Kamal Gaffer initiative dedication banner
      englishText: "With regards, Kamal Gaffer. Together, toward health and wellness, and a cleaner, safer environment.",
      arabicText: "مع خالص تحيات: كمال جعفر. معاً نصنع مجتمعاً ينبض بالصحة والعافية، في بيئة أنقى وأكثر أماناً.",
      zoomEffect: 'pan-left'
    },
    {
      start: 51,
      end: 66,
      artworkIndex: 8, // Official WhatsApp Support 00249919980435
      englishText: "For communication and support for our applications, WhatsApp: 00249919980435.",
      arabicText: "للتواصل والدعم الفني والإرشادي لتطبيقاتنا، يسعدنا تواصلكم عبر واتساب: 00249919980435.",
      zoomEffect: 'zoom-out'
    }
  ];

  // Determine current active segment
  const currentSegmentIndex = segments.findIndex(
    s => currentTime >= s.start && currentTime < s.end
  );
  const activeSegment = currentSegmentIndex !== -1 ? segments[currentSegmentIndex] : segments[segments.length - 1];

  // Ambient sound synthesizer using Web Audio API for rich cinematic tone
  const playCinematicBeats = () => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Heartbeat pulse sub-bass
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, audioCtxRef.current.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.4);
    } catch {}
  };

  // Voice narration synthesizer
  const speakCurrentSegment = (segmentIdx: number) => {
    if (isMuted) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const segment = segments[segmentIdx];
    if (!segment) return;

    window.speechSynthesis.cancel();

    const textToSpeak = audioVoiceLang === 'en' ? segment.englishText : segment.arabicText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    if (audioVoiceLang === 'en') {
      utterance.lang = 'en-US';
      utterance.rate = 0.92;
      utterance.pitch = 0.88; // Deep authoritative male tone
      const voices = window.speechSynthesis.getVoices();
      const maleEn = voices.find(
        v =>
          v.lang.startsWith('en') &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('daniel') ||
            v.name.toLowerCase().includes('guy') ||
            v.name.toLowerCase().includes('natural'))
      ) || voices.find(v => v.lang.startsWith('en'));
      if (maleEn) utterance.voice = maleEn;
    } else {
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;
      utterance.pitch = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find(v => v.lang.startsWith('ar'));
      if (arVoice) utterance.voice = arVoice;
    }

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger speech when segment changes
  useEffect(() => {
    if (!isPlaying) return;

    if (currentSegmentIndex !== -1 && currentSegmentIndex !== lastSpokenSegmentIndexRef.current) {
      lastSpokenSegmentIndexRef.current = currentSegmentIndex;
      speakCurrentSegment(currentSegmentIndex);
      playCinematicBeats();
    }
  }, [currentSegmentIndex, isPlaying, isMuted, audioVoiceLang]);

  // Main playback timer loop (1-second tick)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return TOTAL_DURATION;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Initial Auto-start handling when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentTime(0);
      lastSpokenSegmentIndexRef.current = -1;
      setIsPlaying(true);
      setHasStartedInteracting(true);
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      if (currentTime >= TOTAL_DURATION) {
        setCurrentTime(0);
        lastSpokenSegmentIndexRef.current = -1;
      }
      setIsPlaying(true);
      setHasStartedInteracting(true);
      if (currentSegmentIndex !== -1) {
        speakCurrentSegment(currentSegmentIndex);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    lastSpokenSegmentIndexRef.current = -1;
    setIsPlaying(true);
    speakCurrentSegment(0);
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      setIsMuted(true);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      setIsMuted(false);
      if (currentSegmentIndex !== -1) {
        speakCurrentSegment(currentSegmentIndex);
      }
    }
  };

  const handleSeek = (newSec: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_DURATION, newSec));
    setCurrentTime(clamped);
    const newIdx = segments.findIndex(s => clamped >= s.start && clamped < s.end);
    lastSpokenSegmentIndexRef.current = newIdx;
    if (isPlaying && newIdx !== -1) {
      speakCurrentSegment(newIdx);
    }
  };

  const handleCloseIntro = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('beyond_smoking_skip_intro_auto', 'true');
      } catch {}
    }
    setIsPlaying(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    onClose();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Official Anti-Smoking Campaign Intro"
    >
      {/* Top Controls Bar */}
      <header className="w-full max-w-5xl flex items-center justify-between gap-3 text-white z-20 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="px-3 py-1 rounded-full bg-orange-600/90 text-white text-xs font-black flex items-center gap-1.5 shadow-md">
            <Film className="w-3.5 h-3.5 animate-pulse" />
            <span>{isAr ? 'فيديو الانترو التوعوي الرسمي' : 'Official Campaign Intro'}</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-block font-mono">
            {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Voice Language Toggle */}
          <button
            onClick={() => {
              const next = audioVoiceLang === 'en' ? 'ar' : 'en';
              setAudioVoiceLang(next);
              if (isPlaying && currentSegmentIndex !== -1) {
                setTimeout(() => speakCurrentSegment(currentSegmentIndex), 50);
              }
            }}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-orange-300 border border-slate-700 flex items-center gap-1 transition cursor-pointer"
            title="Toggle Voice Narration Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{audioVoiceLang === 'en' ? 'Voice: English' : 'الصوت: عربي'}</span>
          </button>

          {/* Mute / Unmute Button */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl transition cursor-pointer border ${
              isMuted
                ? 'bg-rose-900/60 text-rose-300 border-rose-700'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Skip & Enter App Button */}
          <button
            onClick={handleCloseIntro}
            className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 transition shadow-lg cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>{isAr ? 'تخطي والدخول للتطبيق' : 'Skip & Enter App'}</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Cinema Screen Area */}
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center my-3 relative overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-950 via-black to-slate-950 shadow-2xl">
        
        {/* Dynamic Scene Visual Presentation */}
        <div className="relative w-full h-full aspect-video max-h-[68vh] flex items-center justify-center overflow-hidden">
          {awarenessArtworks[activeSegment.artworkIndex] && (
            <div className="w-full h-full relative transition-all duration-1000 ease-out transform">
              <AwarenessArtworkGraphic
                artwork={awarenessArtworks[activeSegment.artworkIndex]}
                lang={lang}
                showOverlay={false}
                className="w-full h-full object-contain rounded-none border-0"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-transparent to-black/60" />
            </div>
          )}

          {/* Center Play/Pause Clickable Overlay */}
          {!isPlaying && (
            <div
              onClick={handleTogglePlay}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-all z-20"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-4 border-white/30">
                <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Subtitles & Narration Box (Dual: English Original + Arabic Translation) */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-3 sm:inset-x-8 z-20 pointer-events-none">
            <div className="max-w-3xl mx-auto bg-black/85 backdrop-blur-md rounded-2xl border border-orange-500/40 p-3 sm:p-4 text-center shadow-2xl transition-all">
              
              {/* Primary English Narration matching uploaded video audio */}
              <p className="text-sm sm:text-lg font-black text-amber-200 tracking-wide leading-snug drop-shadow-md">
                "{activeSegment.englishText}"
              </p>

              {/* Arabic Translation */}
              <p className="text-xs sm:text-sm font-bold text-slate-200 mt-1.5 leading-relaxed drop-shadow-sm">
                {activeSegment.arabicText}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Timeline, Playback Controls & Settings */}
      <footer className="w-full max-w-5xl bg-slate-900/90 rounded-2xl border border-slate-700/80 p-3 sm:p-4 text-white z-20 shrink-0 backdrop-blur-md shadow-xl">
        {/* Scrubber Bar */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-slate-400 shrink-0">
            {formatTime(currentTime)}
          </span>

          <div
            className="flex-1 h-3 bg-slate-800 hover:h-4 transition-all rounded-full overflow-hidden cursor-pointer relative"
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              handleSeek(clickPos * TOTAL_DURATION);
            }}
          >
            {/* Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 transition-all duration-200"
              style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
            />

            {/* Chapter scene markers */}
            {segments.map((seg, idx) => (
              <div
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-slate-950/60"
                style={{ left: `${(seg.start / TOTAL_DURATION) * 100}%` }}
                title={seg.englishText}
              />
            ))}
          </div>

          <span className="text-xs font-mono text-slate-400 shrink-0">
            {formatTime(TOTAL_DURATION)}
          </span>
        </div>

        {/* Action Controls & Checkbox */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black flex items-center gap-1.5 transition shadow cursor-pointer active:scale-95"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>{isAr ? 'إيقاف مؤقت' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isAr ? 'تشغيل' : 'Play'}</span>
                </>
              )}
            </button>

            {/* Replay */}
            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title={isAr ? 'إعادة التشغيل من البداية' : 'Replay from start'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* WhatsApp Contact Badge */}
            <a
              href="https://wa.me/249919980435?text=Hello%20Kamal%20Gaffer,%20I%20am%20watching%20the%20official%20BEYOND%20SMOKING%20intro%20video"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: 00249919980435</span>
            </a>
          </div>

          {/* Dismissal Settings */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-slate-400 hover:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={e => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded-sm bg-slate-800 border-slate-700 text-orange-500 focus:ring-orange-500/30"
              />
              <span className="text-[11px]">
                {isAr ? 'عدم الإظهار تلقائياً في المرات القادمة' : "Don't show automatically next time"}
              </span>
            </label>

            <button
              onClick={handleCloseIntro}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition border border-slate-600 cursor-pointer"
            >
              {isAr ? 'إغلاق الانترو' : 'Close'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
