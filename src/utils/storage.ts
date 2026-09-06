import { CalculatedStats, Language, UserProfile, VideoItem, Achievement, DoctorExpert, QuitCenter } from '../types';
import { initialVideos } from '../data/videoData';
import { initialAchievements } from '../data/milestones';
import { initialDoctorsDirectory } from '../data/doctorsData';
import { initialQuitCenters } from '../data/centersData';
import { soundFx } from './audio';

const PROFILE_KEY = 'quit_smoking_user_profile_v2';
const LANG_KEY = 'quit_smoking_app_language_v2';
const VIDEOS_KEY = 'quit_smoking_custom_videos_v2';
const ACHIEVEMENTS_KEY = 'quit_smoking_achievements_v2';
const DOCTORS_KEY = 'quit_smoking_custom_doctors_v2';
const CENTERS_KEY = 'quit_smoking_custom_centers_v2';

export const CURRENCIES = [
  { code: 'SAR', symbol: '﷼', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  { code: 'USD', symbol: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  { code: 'EUR', symbol: '€', nameAr: 'يورو', nameEn: 'Euro' },
  { code: 'GBP', symbol: '£', nameAr: 'جنيه إسترليني', nameEn: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham' },
  { code: 'CNY', symbol: '¥', nameAr: 'يوان صيني', nameEn: 'Chinese Yuan (RMB)' },
  { code: 'NGN', symbol: '₦', nameAr: 'نايرا نيجيرية', nameEn: 'Nigerian Naira' },
  { code: 'EGP', symbol: 'ج.م', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  { code: 'KWD', symbol: 'د.ك', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar' },
  { code: 'QAR', symbol: 'ر.ق', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal' }
];

export function getDefaultProfile(): UserProfile {
  // Default to 48 hours ago so user can immediately observe the live ticker & progress bars
  const pastTime = new Date(Date.now() - 48 * 3600 * 1000).toISOString();
  return {
    cigarettesPerDay: 20,
    packPrice: 28,
    cigarettesPerPack: 20,
    quitDate: pastTime,
    currency: 'SAR',
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

export function loadLanguage(): Language {
  if (typeof window === 'undefined') return 'ar';
  try {
    const raw = localStorage.getItem(LANG_KEY);
    if (raw === 'ar' || raw === 'en' || raw === 'fr' || raw === 'ha' || raw === 'zh') {
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
  const costPerCigarette = (profile.packPrice || 25) / packCount;
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
}
