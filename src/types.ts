export type Language = 'ar' | 'en' | 'fr' | 'ha' | 'zh';

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
  organName: Record<Language, string>;
  damageName: Record<Language, string>;
  explanation: Record<Language, string>;
  clinicalDetails: Record<Language, string>;
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
  category: 'medical' | 'motivation' | 'psychology' | 'tips';
  youtubeId?: string;
  videoUrl?: string;
  thumbnailUrl: string;
  duration: string;
}

export interface ConsultationEntity {
  id: string;
  name: Record<Language, string>;
  country: Record<Language, string>;
  countryCode: string;
  description: Record<Language, string>;
  officialWebsite: string;
  contactMethod: string;
  quitServiceUrl: string;
  helpType: Record<Language, string>;
  isGlobal?: boolean;
}

export interface DoctorExpert {
  id: string;
  name: Record<Language, string>;
  specialty: Record<Language, string>;
  country: Record<Language, string>;
  institution: Record<Language, string>;
  languages: string[];
  officialConsultationUrl: string;
  verifiedStatus: boolean;
}

export interface QuitCenter {
  id: string;
  name: Record<Language, string>;
  country: Record<Language, string>;
  countryCode: string;
  city: Record<Language, string>;
  serviceType: 'hospital' | 'clinic' | 'virtual' | 'quitline';
  serviceTypeLabel: Record<Language, string>;
  languagesSupported: string[];
  accreditation: string;
  phone: string;
  address: string;
  website: string;
  mapQuery?: string;
}

export interface MedicalSource {
  id: string;
  title: Record<Language, string>;
  organization: string;
  description: Record<Language, string>;
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
  title: Record<Language, string>;
  desc: Record<Language, string>;
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
