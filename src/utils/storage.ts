import { CalculatedStats, Language, UserProfile, VideoItem, Achievement, DoctorExpert, QuitCenter, ChallengeDay, DailyCheckIn, JournalEntry, MagazineArticle } from '../types';
import { initialVideos } from '../data/videoData';
import { initialAchievements } from '../data/milestones';
import { initialDoctorsDirectory } from '../data/doctorsData';
import { initialQuitCenters } from '../data/centersData';
import { thirtyDayChallenge } from '../data/challengeData';
import { magazineArticles } from '../data/magazineArticlesData';
import { soundFx } from './audio';

const PROFILE_KEY = 'quit_smoking_user_profile_v2';
const LANG_KEY = 'quit_smoking_app_language_v2';
const VIDEOS_KEY = 'quit_smoking_custom_videos_v2';
const ACHIEVEMENTS_KEY = 'quit_smoking_achievements_v2';
const DOCTORS_KEY = 'quit_smoking_custom_doctors_v2';
const CENTERS_KEY = 'quit_smoking_custom_centers_v2';
const CHALLENGE_KEY = 'quit_smoking_challenge_days_v2';
const CHECKINS_KEY = 'quit_smoking_daily_checkins_v2';
const JOURNAL_KEY = 'quit_smoking_journal_entries_v2';
const ARTICLES_KEY = 'quit_smoking_magazine_articles_v2';

export const CURRENCIES = [
  { code: 'SDG', symbol: 'ج.س', nameAr: 'جنيه سوداني', nameEn: 'Sudanese Pound' },
  { code: 'USD', symbol: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  { code: 'SAR', symbol: '﷼', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  { code: 'EUR', symbol: '€', nameAr: 'يورو', nameEn: 'Euro' },
  { code: 'GBP', symbol: '£', nameAr: 'جنيه إسترليني', nameEn: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham' },
  { code: 'CNY', symbol: '¥', nameAr: 'يوان صيني', nameEn: 'Chinese Yuan (RMB)' },
  { code: 'JPY', symbol: '¥', nameAr: 'ين ياباني', nameEn: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', nameAr: 'روبية هندية', nameEn: 'Indian Rupee' },
  { code: 'TRY', symbol: '₺', nameAr: 'ليرة تركية', nameEn: 'Turkish Lira' },
  { code: 'BRL', symbol: 'R$', nameAr: 'ريال برازيلي', nameEn: 'Brazilian Real' },
  { code: 'RUB', symbol: '₽', nameAr: 'روبل روسي', nameEn: 'Russian Ruble' },
  { code: 'EGP', symbol: 'ج.م', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  { code: 'KWD', symbol: 'د.ك', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar' },
  { code: 'QAR', symbol: 'ر.ق', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal' }
];

export function getDefaultProfile(): UserProfile {
  // Default to 48 hours ago so user can immediately observe the live ticker & progress bars
  const pastTime = new Date(Date.now() - 48 * 3600 * 1000).toISOString();
  return {
    cigarettesPerDay: 20,
    packPrice: 10,
    cigarettesPerPack: 20,
    quitDate: pastTime,
    currency: 'USD',
    isConfigured: true,
    soundEnabled: true
  };
}

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return getDefaultProfile();
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.soundEnabled === 'boolean') {
        soundFx.enabled = parsed.soundEnabled;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load profile', e);
  }
  const def = getDefaultProfile();
  saveUserProfile(def);
  return def;
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    soundFx.enabled = profile.soundEnabled;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

const VALID_LANGUAGES: Language[] = ['en', 'ar', 'fr', 'es', 'pt', 'de', 'zh', 'ja', 'ru', 'tr', 'hi', 'ur'];

export function loadLanguage(): Language {
  if (typeof window === 'undefined') return 'ar';
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw && VALID_LANGUAGES.includes(raw as Language)) {
      return raw as Language;
    }
  } catch (e) {
    console.error(e);
  }
  return 'ar';
}

export function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.error(e);
  }
}

export function loadVideos(): VideoItem[] {
  if (typeof window === 'undefined') return initialVideos;
  try {
    const raw = localStorage.getItem(VIDEOS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return initialVideos;
}

export function saveVideos(videos: VideoItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
  } catch (e) {
    console.error(e);
  }
}

export function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') return initialAchievements;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return initialAchievements;
}

export function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch (e) {
    console.error(e);
  }
}

export function loadDoctors(): DoctorExpert[] {
  if (typeof window === 'undefined') return initialDoctorsDirectory;
  try {
    const raw = localStorage.getItem(DOCTORS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return initialDoctorsDirectory;
}

export function saveDoctors(doctors: DoctorExpert[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DOCTORS_KEY, JSON.stringify(doctors));
  } catch (e) {
    console.error(e);
  }
}

export function loadCenters(): QuitCenter[] {
  if (typeof window === 'undefined') return initialQuitCenters;
  try {
    const raw = localStorage.getItem(CENTERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return initialQuitCenters;
}

export function saveCenters(centers: QuitCenter[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CENTERS_KEY, JSON.stringify(centers));
  } catch (e) {
    console.error(e);
  }
}

// 30-Day Challenge Storage
export function loadChallengeDays(): ChallengeDay[] {
  if (typeof window === 'undefined') return thirtyDayChallenge;
  try {
    const raw = localStorage.getItem(CHALLENGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return thirtyDayChallenge;
}

export function saveChallengeDays(days: ChallengeDay[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHALLENGE_KEY, JSON.stringify(days));
  } catch (e) {
    console.error(e);
  }
}

// Daily Check-Ins Storage
export function loadDailyCheckIns(): DailyCheckIn[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHECKINS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveDailyCheckIns(checkIns: DailyCheckIn[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkIns));
  } catch (e) {
    console.error(e);
  }
}

export function recordTodayCheckIn(smokeFree: boolean, cravingLevel: number, mood: 'great' | 'good' | 'neutral' | 'struggling', notes?: string): DailyCheckIn[] {
  const current = loadDailyCheckIns();
  const today = new Date().toISOString().split('T')[0];
  const existingIdx = current.findIndex(c => c.date === today);
  const newEntry: DailyCheckIn = {
    date: today,
    smokeFree,
    cravingLevel,
    mood,
    notes,
    timestamp: Date.now()
  };
  let updated: DailyCheckIn[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = newEntry;
  } else {
    updated = [newEntry, ...current];
  }
  saveDailyCheckIns(updated);
  return updated;
}

// Journal Storage
export function loadJournalEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveJournalEntries(entries: JournalEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error(e);
  }
}

// Magazine Articles Storage (Allows Admin/CMS additions while preserving defaults)
export function loadArticles(): MagazineArticle[] {
  if (typeof window === 'undefined') return magazineArticles;
  try {
    const raw = localStorage.getItem(ARTICLES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge with defaults to ensure all built-in articles exist
        const customSlugs = new Set(parsed.map((a: MagazineArticle) => a.slug));
        const missingDefaults = magazineArticles.filter(a => !customSlugs.has(a.slug));
        return [...missingDefaults, ...parsed];
      }
    }
  } catch (e) {
    console.error(e);
  }
  return magazineArticles;
}

export function saveArticles(articles: MagazineArticle[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error(e);
  }
}

export function calculateStats(profile: UserProfile): CalculatedStats {
  const quitTime = new Date(profile.quitDate).getTime();
  const now = Date.now();
  const elapsedSeconds = Math.max(0, Math.floor((now - quitTime) / 1000));

  const days = Math.floor(elapsedSeconds / 86400);
  const hours = Math.floor((elapsedSeconds % 86400) / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  // Cigarettes avoided
  const cigsPerSecond = (profile.cigarettesPerDay || 20) / 86400;
  const cigarettesAvoided = Math.floor(elapsedSeconds * cigsPerSecond);

  // Money saved
  const packCount = profile.cigarettesPerPack > 0 ? profile.cigarettesPerPack : 20;
  const costPerCigarette = (profile.packPrice || 10) / packCount;
  const moneySaved = Number((cigarettesAvoided * costPerCigarette).toFixed(1));

  // Life regained: ~11 minutes per avoided cigarette
  const lifeRegainedHours = Number(((cigarettesAvoided * 11) / 60).toFixed(1));

  return {
    elapsedSeconds,
    days,
    hours,
    minutes,
    seconds,
    cigarettesAvoided,
    moneySaved,
    lifeRegainedHours
  };
}

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(VIDEOS_KEY);
  localStorage.removeItem(ACHIEVEMENTS_KEY);
  localStorage.removeItem(DOCTORS_KEY);
  localStorage.removeItem(CENTERS_KEY);
  localStorage.removeItem(CHALLENGE_KEY);
  localStorage.removeItem(CHECKINS_KEY);
  localStorage.removeItem(JOURNAL_KEY);
  localStorage.removeItem(ARTICLES_KEY);
}
