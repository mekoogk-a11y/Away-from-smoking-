import { Achievement, HealthMilestone } from '../types';

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-first-day',
    titleAr: 'اليوم الأول (24 ساعة)',
    titleEn: 'First 24 Hours',
    descAr: 'اجتزت أول وأصعب 24 ساعة بدون أي سيجارة!',
    descEn: 'Conquered the first and most challenging 24 hours smoke-free!',
    icon: 'FlameKindling',
    type: 'time',
    targetValue: 24,
    unlocked: false
  },
  {
    id: 'ach-three-days',
    titleAr: '3 أيام ذهبية',
    titleEn: '3 Golden Days',
    descAr: 'النيكوتين تم طرده بنسبة 100% من مجرى دمك!',
    descEn: 'Nicotine is now 100% cleansed from your bloodstream!',
    icon: 'Sparkles',
    type: 'time',
    targetValue: 72,
    unlocked: false
  },
  {
    id: 'ach-one-week',
    titleAr: 'أسبوع الإرادة الحديدية',
    titleEn: 'Iron Will (1 Week)',
    descAr: 'أسبوع كامل بدون تدخين، استعدت حاسة التذوق والشم!',
    descEn: 'One full smoke-free week; senses of taste and smell are sharpened!',
    icon: 'ShieldCheck',
    type: 'time',
    targetValue: 168,
    unlocked: false
  },
  {
    id: 'ach-two-weeks',
    titleAr: 'أسبوعان من النقاء',
    titleEn: '2 Weeks of Purity',
    descAr: 'سعة الرئة بدأت بالارتفاع وتحسنت الدورة الدموية بشكل ملحوظ.',
    descEn: 'Lung capacity is surging and blood circulation is notably restored.',
    icon: 'HeartHandshake',
    type: 'time',
    targetValue: 336,
    unlocked: false
  },
  {
    id: 'ach-one-month',
    titleAr: 'شهر كامل من الحرية',
    titleEn: '1 Month of Freedom',
    descAr: 'وداعاً لسعال المدخن وضيق النفس؛ تنفست الحرية!',
    descEn: 'Farewell to smoker cough; your bronchi are regenerating!',
    icon: 'Award',
    type: 'time',
    targetValue: 720,
    unlocked: false
  },
  {
    id: 'ach-three-months',
    titleAr: '3 أشهر - صمود الأبطال',
    titleEn: '3 Months Champion',
    descAr: 'وظائف الرئة تحسنت بنسبة تصل إلى 30%!',
    descEn: 'Pulmonary function has increased by up to 30%!',
    icon: 'Medal',
    type: 'time',
    targetValue: 2160,
    unlocked: false
  },
  {
    id: 'ach-six-months',
    titleAr: 'نصف عام من النصر',
    titleEn: 'Half-Year Victory',
    descAr: 'مستويات الطاقة والنشاط في ذروتها وانخفض التوتر النفسي.',
    descEn: 'Energy levels are at peak and baseline stress has plummeted.',
    icon: 'Trophy',
    type: 'time',
    targetValue: 4320,
    unlocked: false
  },
  {
    id: 'ach-one-year',
    titleAr: 'سنة كاملة - ولادة جديدة',
    titleEn: 'One Year Reborn',
    descAr: 'انخفض خطر الإصابة بأمراض القلب التاجية إلى النصف تماماً!',
    descEn: 'Coronary heart disease risk is slashed by exactly 50%!',
    icon: 'Crown',
    type: 'time',
    targetValue: 8760,
    unlocked: false
  },
  {
    id: 'ach-100-cigs',
    titleAr: 'تجنب 100 سيجارة',
    titleEn: '100 Cigarettes Avoided',
    descAr: 'حميت رئتيك من سموم 100 سيجارة سامة!',
    descEn: 'Protected your lungs from toxins of 100 cigarettes!',
    icon: 'Zap',
    type: 'cigarettes',
    targetValue: 100,
    unlocked: false
  },
  {
    id: 'ach-money-100',
    titleAr: 'محفظة ممتلئة (100+)',
    titleEn: 'Full Wallet (100+)',
    descAr: 'وفرت أموالاً حقيقية كانت ستحترق في الهواء!',
    descEn: 'Saved genuine wealth that was previously burning away!',
    icon: 'PiggyBank',
    type: 'money',
    targetValue: 100,
    unlocked: false
  }
];

export const healthMilestonesList: {
  hours: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  icon: string;
}[] = [
  {
    hours: 0.33, // 20 mins
    titleAr: 'بعد 20 دقيقة',
    titleEn: 'After 20 Minutes',
    descAr: 'يعود ضغط الدم ونبض القلب إلى المعدل الطبيعي، وتدفأ اليدان والقدمان.',
    descEn: 'Blood pressure and pulse rate drop back to normal baseline; hands and feet warm up.',
    icon: 'HeartPulse'
  },
  {
    hours: 8,
    titleAr: 'بعد 8 ساعات',
    titleEn: 'After 8 Hours',
    descAr: 'ينخفض مستوى أول أكسيد الكربون في الدم للنصف، ويرتفع مستوى الأكسجين للوضع المثالي.',
    descEn: 'Carbon monoxide blood levels drop by half, and blood oxygen levels return to optimal state.',
    icon: 'Activity'
  },
  {
    hours: 24,
    titleAr: 'بعد 24 ساعة',
    titleEn: 'After 24 Hours',
    descAr: 'تتخلص الرئتان من بقايا المخاط والسموم، ويبدأ خطر النوبة القلبية بالانخفاض.',
    descEn: 'Lungs begin expelling accumulated mucus, and initial heart attack risk begins falling.',
    icon: 'ShieldCheck'
  },
  {
    hours: 48,
    titleAr: 'بعد 48 ساعة',
    titleEn: 'After 48 Hours',
    descAr: 'تتجدد النهايات العصبية وتبدأ حاستا الشم والتذوق بالعودة بقوة متزايدة.',
    descEn: 'Nerve endings start regenerating, sharpening senses of taste and smell remarkably.',
    icon: 'Sparkles'
  },
  {
    hours: 72,
    titleAr: 'بعد 72 ساعة',
    titleEn: 'After 72 Hours',
    descAr: 'يرتخي الجهاز التنفسي وتتسع الشعب الهوائية، ويصبح التنفس أسهل بكثير.',
    descEn: 'Bronchial tubes relax, breathing becomes noticeably effortless, and energy spikes.',
    icon: 'Wind'
  },
  {
    hours: 336, // 2 weeks
    titleAr: 'بعد أسبوعين',
    titleEn: 'After 2 Weeks',
    descAr: 'تتحسن الدورة الدموية بنسبة كبيرة وتزداد كفاءة الرئتين بنسبة تصل إلى 30%.',
    descEn: 'Systemic circulation improves and overall lung function surges by up to 30%.',
    icon: 'Flame'
  },
  {
    hours: 720, // 1 month
    titleAr: 'بعد شهر كامل',
    titleEn: 'After 1 Month',
    descAr: 'تنخفض نوبات السعال الصباحي وضيق التنفس، وتنمو أهداب الرئة لتنظيف المجاري الهوائية.',
    descEn: 'Smoker cough and wheezing decrease significantly; bronchial cilia regrow to sweep clean.',
    icon: 'Award'
  },
  {
    hours: 8760, // 1 year
    titleAr: 'بعد سنة كاملة',
    titleEn: 'After 1 Year',
    descAr: 'ينخفض خطر الإصابة بأمراض الشرايين التاجية والنوبات القلبية بمقدار 50%!',
    descEn: 'Your excess risk of coronary heart disease drops by 50% compared to a continuing smoker.',
    icon: 'Trophy'
  }
];
