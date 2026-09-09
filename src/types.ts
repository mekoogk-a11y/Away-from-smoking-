export type Language = 'en' | 'ar' | 'fr' | 'es' | 'pt' | 'de' | 'zh' | 'ja' | 'ru' | 'tr' | 'hi' | 'ur';

export type ArtworkCategory = 
  | 'Smoking Risks' 
  | 'Lung Health' 
  | 'Heart Health' 
  | 'Quit Smoking' 
  | 'Healthy Lifestyle' 
  | 'Environmental Awareness';

export interface AwarenessArtwork {
  id: string;
  order: number;
  title: Record<string, string>;
  description: Record<string, string>;
  category: ArtworkCategory;
  categoryLabel: Record<string, string>;
  altText: Record<string, string>;
  details: Record<string, string>;
  aspectRatio: string;
  keyStats: string[];
  callToAction: string;
  whatsappContact?: string;
  badge?: string;
}

export interface ChallengeDay {
  day: number;
  dayNumber?: number;
  title: Record<string, string>;
  motivationalMessage?: Record<string, string>;
  practicalActivity?: Record<string, string>;
  educationalFact?: Record<string, string>;
  reflectionPrompt?: Record<string, string>;
  action?: Record<string, string>;
  motivation?: Record<string, string>;
  completed: boolean;
  userReflection?: string;
}

export interface DailyCheckIn {
  date: string; // YYYY-MM-DD
  stayedSmokeFree?: boolean;
  smokeFree?: boolean;
  cravingLevel?: number;
  cravingIntensity?: number;
  cravingsLevel?: string;
  mood?: 'great' | 'good' | 'neutral' | 'struggling' | string;
  notes?: string;
  note?: string;
  timestamp?: number;
}

export interface JournalEntry {
  id: string;
  date?: string;
  timestamp?: string | number;
  title?: string;
  content: string;
  mood?: string;
  tag?: string;
}

export interface MagazineArticle {
  id: string;
  slug: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
  excerpt?: Record<string, string>;
  content?: Record<string, string>;
  category: 'Awareness' | 'Smoking Risks' | 'Health & Wellness' | 'Quit Smoking' | 'Daily Motivation' | 'Success Stories' | string;
  categoryLabel: Record<string, string>;
  readTimeMinutes: number;
  readTime?: string;
  author: string;
  datePublished: string;
  paragraphs: Record<string, string[]>;
  keyTakeaways: Record<string, string[]>;
  featured?: boolean;
}

export interface UserProfile {
  cigarettesPerDay: number;
  packPrice: number;
  cigarettesPerPack: number;
  quitDate: string; // ISO string
  currency: string;
  isConfigured: boolean;
  soundEnabled: boolean;
}

export interface OrganHarm {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr?: string;
  nameHa?: string;
  nameZh?: string;
  iconName: string;
  severity: 'high' | 'critical';
  summaryAr: string;
  summaryEn: string;
  summaryFr?: string;
  summaryHa?: string;
  summaryZh?: string;
  harmsAr: string[];
  harmsEn: string[];
  harmsFr?: string[];
  harmsHa?: string[];
  harmsZh?: string[];
  recoveryTimelineAr: string;
  recoveryTimelineEn: string;
  recoveryTimelineFr?: string;
  recoveryTimelineHa?: string;
  recoveryTimelineZh?: string;
  statsAr: string;
  statsEn: string;
  statsFr?: string;
  statsHa?: string;
  statsZh?: string;
}

export interface MedicalDamagePhoto {
  id: string;
  organKey: 'lungs' | 'cardiovascular' | 'brain' | 'teeth' | 'throat' | 'respiratory' | 'skin' | 'cancer';
  organName: Record<string, string>;
  damageName: Record<string, string>;
  explanation: Record<string, string>;
  clinicalDetails: Record<string, string>;
  imageUrl: string;
  sourceName: string;
  sourceUrl: string;
}

export interface VideoItem {
  id: string;
  titleAr: string;
  titleEn: string;
  titleFr?: string;
  titleHa?: string;
  titleZh?: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr?: string;
  descriptionHa?: string;
  descriptionZh?: string;
  category: 'medical' | 'motivation' | 'psychology' | 'tips' | string;
  youtubeId?: string;
  videoUrl?: string;
  embedUrl?: string;
  sourceName?: string;
  thumbnailUrl: string;
  duration: string;
}

export interface ConsultationEntity {
  id: string;
  name: Record<string, string>;
  country: Record<string, string>;
  countryCode: string;
  description: Record<string, string>;
  officialWebsite: string;
  contactMethod: string;
  quitServiceUrl: string;
  helpType: Record<string, string>;
  isGlobal?: boolean;
}

export interface DoctorExpert {
  id: string;
  name: Record<string, string>;
  specialty: Record<string, string>;
  country: Record<string, string>;
  institution: Record<string, string>;
  languages: string[];
  officialConsultationUrl: string;
  verifiedStatus: boolean;
}

export interface QuitCenter {
  id: string;
  name: Record<string, string>;
  country: Record<string, string>;
  countryCode: string;
  city: Record<string, string>;
  serviceType: 'hospital' | 'clinic' | 'virtual' | 'quitline';
  serviceTypeLabel: Record<string, string>;
  languagesSupported: string[];
  accreditation: string;
  phone: string;
  address: string;
  website: string;
  mapQuery?: string;
}

export interface MedicalSource {
  id: string;
  title: Record<string, string>;
  organization: string;
  description: Record<string, string>;
  url: string;
  category: 'global_health' | 'guidelines' | 'research' | 'cessation_service';
}

export interface Achievement {
  id: string;
  titleAr: string;
  titleEn: string;
  titleFr?: string;
  titleHa?: string;
  titleZh?: string;
  descAr: string;
  descEn: string;
  descFr?: string;
  descHa?: string;
  descZh?: string;
  icon: string;
  type: 'time' | 'money' | 'cigarettes';
  targetValue: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface HealthMilestone {
  timeHours: number;
  title: Record<string, string>;
  desc: Record<string, string>;
  progressPercent: number;
  reached: boolean;
  icon: string;
}

export interface CalculatedStats {
  elapsedSeconds: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  cigarettesAvoided: number;
  moneySaved: number;
  lifeRegainedHours: number;
}
