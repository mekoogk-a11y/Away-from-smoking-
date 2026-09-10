import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  X,
  Share2,
  Copy,
  Check,
  Sparkles,
  Radio,
  HeartPulse,
  Flame,
  ShieldCheck,
  Award
} from 'lucide-react';

interface SudaneseAdVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SUDANESE_AD_SCRIPT = {
  title: 'الإعلان الصوتي الحماسي (العامية السودانية)',
  tagline: 'رسالة رجولية حماسية تهز القلوب وتوقظ العزيمة',
  segments: [
    {
      time: '0:00',
      label: 'النداء والافتتاحية',
      text: 'يا زول! اسمعني هنا وركز معاي دقيقة واحدة بس.. صحتك وعافيتك دي ما بتتعوض بأي قروش في الدنيا!',
      emphasis: 'صوت قوي جهوري، يخاطب الرجولة والعزيمة'
    },
    {
      time: '0:08',
      label: 'مواجهة الحقيقة',
      text: 'التدخين ضار بالصحة! وكل سيجارة بتولعها بتاكل من عمرك، ومن صحة صدرك ورئتك، ومن قروش بيتك وعيالك!',
      emphasis: 'نبرة تصاعدية جادة وحازمة'
    },
    {
      time: '0:18',
      label: 'القرار الشجاع',
      text: 'الليلة.. أيوة الليلة دي ومش بكرة! قرر تكون بطل نفسك، وتفرح أهلك وأولادك الراجينك بعافيتك وقوتك.',
      emphasis: 'حماس متدفق وشحذ للهمة'
    },
    {
      time: '0:28',
      label: 'خطوة التحدي',
      text: 'ارمي علبة السجاير دي في أقرب زبالة وقول خلاص.. كفاية دخان.. وقفنا وراجعين للحياة!',
      emphasis: 'نبرة حاسمة ومظفرة'
    },
    {
      time: '0:37',
      label: 'الرفيق والسند',
      text: 'تطبيق "التدخين ضار بالصحة" واقف معاك خطوة بخطوة؛ بيحسب ليك كل قرش وفرته، وكل ساعة نقية رجعت لرئتك، ومعاك تمارين التغلب على الرغبة والدعم الطبي المعتمد.',
      emphasis: 'ثقة واطمئنان واحترافية'
    },
    {
      time: '0:50',
      label: 'الخاتمة الحماسية',
      text: 'يلا يا بطل.. ارفع راسك واسترد عافيتك.. إنت أقدَر من كدة بمراحل، وعزيمتك أقوى من أي سيجارة.. ابدأ الليلة والله معاك!',
      emphasis: 'ذروة الحماس، تشجيع أخوي سوداني أصيل'
    }
  ],
  fullText: `يا زول! اسمعني هنا وركز معاي دقيقة واحدة بس.. صحتك وعافيتك دي ما بتتعوض بأي قروش في الدنيا! التدخين ضار بالصحة! وكل سيجارة بتولعها بتاكل من عمرك، ومن صحة صدرك ورئتك، ومن قروش بيتك وعيالك! الليلة.. أيوة الليلة دي ومش بكرة! قرر تكون بطل نفسك، وتفرح أهلك وأولادك الراجينك بعافيتك وقوتك. ارمی علبة السجاير دي في أقرب زبالة وقول خلاص.. كفاية دخان.. وقفنا وراجعين للحياة! تطبيق "التدخين ضار بالصحة" واقف معاك خطوة بخطوة؛ بيحسب ليك كل قرش وفرته، وكل ساعة نقية رجعت لرئتك، ومعاك تمارين التغلب على الرغبة والدعم الطبي المعتمد. يلا يا بطل.. ارفع راسك واسترد عافيتك.. إنت أقدَر من كدة بمراحل، وعزيمتك أقوى من أي سيجارة.. ابدأ الليلة والله معاك!`
};

export const SudaneseAdVoiceModal: React.FC<SudaneseAdVoiceModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.05);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const beatTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopAudio();
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play energetic rhythmic percussion backdrop to give an authentic commercial feel
  const playEnergeticBeat = () => {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      // Warm motivational kick heartbeat
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Audio context restricted
    }
  };

  const playChimeHarmonic = (freq: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // ignore
    }
  };

  const startAudio = () => {
    if (!synthRef.current) return;

    stopAudio();

    const utterance = new SpeechSynthesisUtterance(SUDANESE_AD_SCRIPT.fullText);
    utteranceRef.current = utterance;

    // Pick best Arabic male voice or standard Arabic voice
    const voices = synthRef.current.getVoices();
    const arVoice = voices.find(v => v.lang.startsWith('ar') && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('maged') || v.name.toLowerCase().includes('tariq') || v.name.toLowerCase().includes('naif')))
      || voices.find(v => v.lang.startsWith('ar'))
      || null;

    if (arVoice) {
      utterance.voice = arVoice;
    }

    utterance.lang = 'ar-SD';
    // Tune for masculine, determined, assertive tone: slightly deeper pitch, energetic commercial rate
    utterance.pitch = 0.88;
    utterance.rate = audioSpeed;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentSegmentIndex(0);

      // Start periodic motivational acoustic beat
      let beatCount = 0;
      beatTimerRef.current = window.setInterval(() => {
        playEnergeticBeat();
        beatCount++;
        if (beatCount % 4 === 0) {
          playChimeHarmonic(523.25); // C5 accent
        }
      }, 750);
    };

    // Track boundary to advance text segments dynamically
    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.name === 'sentence') {
        const charIdx = event.charIndex;
        const fullLen = SUDANESE_AD_SCRIPT.fullText.length;
        const progressRatio = charIdx / Math.max(1, fullLen);
        const nextSeg = Math.min(
          SUDANESE_AD_SCRIPT.segments.length - 1,
          Math.floor(progressRatio * SUDANESE_AD_SCRIPT.segments.length)
        );
        setCurrentSegmentIndex(nextSeg);
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentSegmentIndex(SUDANESE_AD_SCRIPT.segments.length - 1);
      if (beatTimerRef.current) {
        clearInterval(beatTimerRef.current);
        beatTimerRef.current = null;
      }
      playChimeHarmonic(659.25); // triumphant completion tone
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (beatTimerRef.current) {
        clearInterval(beatTimerRef.current);
        beatTimerRef.current = null;
      }
    };

    synthRef.current.speak(utterance);
  };

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (beatTimerRef.current) {
      clearInterval(beatTimerRef.current);
      beatTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(SUDANESE_AD_SCRIPT.fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    const text = `🎙️ إعلان حماسي (عامية سودانية) - التدخين ضار بالصحة:\n\n"${SUDANESE_AD_SCRIPT.fullText}"\n\nتطبيق التدخين ضار بالصحة Sudan 🇸🇩`;
    if (navigator.share) {
      navigator.share({
        title: 'التدخين ضار بالصحة - إعلان حماسي بالعامية السودانية',
        text
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-sky-100 overflow-hidden text-slate-950">
        
        {/* Modal Top Header - Pristine Medical Sky/White */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-sky-50/80 via-white to-sky-50/80 border-b border-sky-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-950 text-sky-300 flex items-center justify-center shadow-md shrink-0">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-100 text-sky-900 border border-sky-200">
                  صوت رجل 🇸🇩 عامية سودانية
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  إعلاني حماسي
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-1">
                {SUDANESE_AD_SCRIPT.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Player Control Center */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-sky-50/40 via-white to-white border-b border-sky-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Primary Big Play Button */}
            <button
              onClick={togglePlay}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                  : 'bg-slate-950 hover:bg-slate-800 text-white shadow-slate-950/20'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>تشغيل الصوت الإعلاني الحماسي</span>
                </>
              )}
            </button>

            {/* Secondary Controls: Speed, Restart, Copy */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  stopAudio();
                  setTimeout(startAudio, 100);
                }}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 transition-all cursor-pointer"
                title="إعادة التشغيل من البداية"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const speeds = [0.95, 1.05, 1.15];
                  const nextIdx = (speeds.indexOf(audioSpeed) + 1) % speeds.length;
                  setAudioSpeed(speeds[nextIdx]);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-800 font-bold text-xs transition-all cursor-pointer"
                title="سرعة الإلقاء"
              >
                {audioSpeed}x
              </button>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-800 font-bold text-xs transition-all cursor-pointer"
                title="نسخ النص كاملاً"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 transition-all cursor-pointer"
                title="مشاركة"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated Audio Equalizer Waveform */}
          <div className="mt-4 flex items-center justify-center gap-1 sm:gap-1.5 h-8 px-4 bg-sky-50/60 rounded-xl border border-sky-100">
            {[40, 70, 90, 60, 100, 85, 45, 95, 65, 80, 50, 90, 75, 100, 60, 40, 85, 55, 95, 70].map((h, i) => (
              <div
                key={i}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-200 ${
                  isPlaying
                    ? 'bg-sky-600'
                    : 'bg-slate-300'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(15, (h * ((i % 3) + 1)) % 100)}%` : '20%',
                  opacity: isPlaying ? 0.9 : 0.4
                }}
              />
            ))}
          </div>
        </div>

        {/* Script Content - Scrollable Text with Visual Segment Tracking */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-['Cairo',sans-serif]">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>نص الإعلان مع التوجيه الإخراجي ونبرة الصوت:</span>
            <span>المدة التقديرية: 1:00 دقيقة</span>
          </div>

          <div className="space-y-3">
            {SUDANESE_AD_SCRIPT.segments.map((seg, idx) => {
              const isActive = currentSegmentIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-50/80 border-sky-300 shadow-sm ring-2 ring-sky-200'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                        isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {seg.time}
                      </span>
                      <span className="text-xs font-black text-slate-900">
                        {seg.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-sky-800 bg-sky-100/60 px-2 py-0.5 rounded-md">
                      {seg.emphasis}
                    </span>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed font-extrabold ${
                    isActive ? 'text-slate-950' : 'text-slate-700'
                  }`}>
                    {seg.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Additional Sudanese Motivational Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-white border border-sky-200 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-slate-950 text-sky-300 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-950 mb-0.5">
                رسالة المبادرة الوطنية من السودان 🇸🇩
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                تم صياغة هذا الصوت الإعلاني باللهجة السودانية الحبيبة لرفع معنويات كل أخ وأخت يواجهون تحدي الإقلاع، تأكيداً على أن الصحة والحرية تبدأ بقرار شجاع اليوم.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>تصميم كمال جعفر زكريا • Sudan 🇸🇩</span>
          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all font-bold cursor-pointer"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
