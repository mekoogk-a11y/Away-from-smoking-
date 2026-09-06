import { DoctorExpert } from '../types';

export const initialDoctorsDirectory: DoctorExpert[] = [
  {
    id: 'dr-1',
    name: {
      ar: 'د. طارق عبد الرحمن الهاشمي',
      en: 'Dr. Tariq Al-Hashimi, MD, FCCP',
      fr: 'Dr. Tariq Al-Hashimi, MD',
      ha: 'Dr. Tariq Al-Hashimi',
      zh: '塔里克·哈希米 博士 (医学博士/美国胸科医师学会会士)'
    },
    specialty: {
      ar: 'استشاري أمراض الصدر والرئة واضطرابات التنفس',
      en: 'Consultant Pulmonologist & Respiratory Specialist',
      fr: 'Pneumologue & Spécialiste des Voies Respiratoires',
      ha: 'Kwararren Likitan Huhu da Matsalolin Numfashi',
      zh: '呼吸内科主任医师 / 肺部疾病专家'
    },
    country: {
      ar: 'المملكة العربية السعودية',
      en: 'Saudi Arabia',
      fr: 'Arabie Saoudite',
      ha: 'Kasar Saudiya',
      zh: '沙特阿拉伯'
    },
    institution: {
      ar: 'مدينة الملك فهد الطبية - قسم الأمراض الصدرية',
      en: 'King Fahad Medical City - Department of Pulmonary Medicine',
      fr: 'Cité Médicale Roi Fahd - Département de Pneumologie',
      ha: 'Babban Asibitin King Fahad Medical City',
      zh: '法赫德国王医疗城 - 呼吸医学中心'
    },
    languages: ['العربية', 'English'],
    officialConsultationUrl: 'https://www.kfmc.med.sa/',
    verifiedStatus: true
  },
  {
    id: 'dr-2',
    name: {
      ar: 'بروفيسور روبرت إي. ويست',
      en: 'Prof. Robert E. West, PhD',
      fr: 'Pr. Robert E. West, PhD',
      ha: 'Prof. Robert E. West',
      zh: '罗伯特·韦斯特 教授 (行为医学与成瘾学首席研究员)'
    },
    specialty: {
      ar: 'أستاذ علم نفس الصحة وعلاج إدمان التبغ والتدخلات السلوكية',
      en: 'Professor of Health Psychology & Tobacco Addiction Science',
      fr: 'Professeur en Psychologie de la Santé & Addictologie Tabagique',
      ha: 'Farfesa a Fannin Halayyar Dan Adam da Maganin Jarabar Taba',
      zh: '健康心理学教授 / 烟草成瘾与行为戒断科学专家'
    },
    country: {
      ar: 'المملكة المتحدة',
      en: 'United Kingdom',
      fr: 'Royaume-Uni',
      ha: 'Kasar Birtaniya',
      zh: '英国'
    },
    institution: {
      ar: 'كلية لندن الجامعية (UCL) - وحدة أبحاث التبغ',
      en: 'University College London (UCL) - Tobacco & Alcohol Research Group',
      fr: 'University College London (UCL) - Groupe de Recherche',
      ha: 'Jami\'ar University College London (UCL)',
      zh: '伦敦大学学院 (UCL) - 烟草与成瘾科学研究中心'
    },
    languages: ['English'],
    officialConsultationUrl: 'https://www.ucl.ac.uk/epidemiology-health-care/research/behavioural-science-and-health',
    verifiedStatus: true
  },
  {
    id: 'dr-3',
    name: {
      ar: 'د. ليلى بنت محمد الشريف',
      en: 'Dr. Layla M. Al-Sharif, MD',
      fr: 'Dr. Layla M. Al-Sharif, MD',
      ha: 'Dr. Layla M. Al-Sharif',
      zh: '莱拉·谢里夫 博士 (家庭医学与慢性病预防顾问)'
    },
    specialty: {
      ar: 'استشارية طب الأسرة والإقلاع عن التدخين التداخلي',
      en: 'Consultant in Family Medicine & Preventive Cessation Care',
      fr: 'Médecin de Famille & Consultante en Sevrage Tabagique',
      ha: 'Likitar Iyali da Kula da Daina Shan Taba a Asibiti',
      zh: '全科家庭医学主任顾问医师 / 临床戒烟干预专科'
    },
    country: {
      ar: 'الإمارات العربية المتحدة',
      en: 'United Arab Emirates',
      fr: 'Émirats Arabes Unis',
      ha: 'Hadaddiyar Daular Larabawa (UAE)',
      zh: '阿联酋'
    },
    institution: {
      ar: 'شركة أبوظبي للخدمات الصحية (صحة) - المراكز العلاجية',
      en: 'Abu Dhabi Health Services Company (SEHA)',
      fr: 'Services de Santé d’Abou Dhabi (SEHA)',
      ha: 'Hukumar Lafiya ta Abu Dhabi (SEHA)',
      zh: '阿布扎比卫生服务集团 (SEHA) - 基层医疗中心'
    },
    languages: ['العربية', 'English', 'Français'],
    officialConsultationUrl: 'https://www.seha.ae/',
    verifiedStatus: true
  },
  {
    id: 'dr-4',
    name: {
      ar: 'د. برتراند دوتزنبرغ',
      en: 'Prof. Bertrand Dautzenberg, MD',
      fr: 'Pr. Bertrand Dautzenberg, MD',
      ha: 'Prof. Bertrand Dautzenberg',
      zh: '贝尔特朗·多岑伯格 教授 (欧洲知名呼吸科与戒烟学专家)'
    },
    specialty: {
      ar: 'أخصائي أمراض الرئة وطب التبغ (Tabacologie)',
      en: 'Pulmonary Specialist & Academic Tabacologue',
      fr: 'Pneumologue & Tabacologue Hospitalier',
      ha: 'Babban Likitan Huhu da Daina Shan Taba a Faransa',
      zh: '呼吸科主任医师 / 资深戒烟学临床专家'
    },
    country: {
      ar: 'فرنسا',
      en: 'France',
      fr: 'France',
      ha: 'Kasar Faransa',
      zh: '法国'
    },
    institution: {
      ar: 'مستشفى بيتي سالبترير الجامعي - باريس (AP-HP)',
      en: 'Pitié-Salpêtrière University Hospital - Paris (AP-HP)',
      fr: 'Hôpital Universitaire Pitié-Salpêtrière (AP-HP)',
      ha: 'Asibitin Jami\'a na Pitié-Salpêtrière a Paris',
      zh: '巴黎皮提耶-萨尔佩特里埃大学医院 (AP-HP)'
    },
    languages: ['Français', 'English'],
    officialConsultationUrl: 'https://www.aphp.fr/',
    verifiedStatus: true
  },
  {
    id: 'dr-5',
    name: {
      ar: 'بروفيسور وانغ تشن',
      en: 'Prof. Chen Wang, MD, PhD',
      fr: 'Pr. Chen Wang, MD, PhD',
      ha: 'Prof. Chen Wang',
      zh: '王辰 院士 / 教授 (呼吸与危重症医学国家专家)'
    },
    specialty: {
      ar: 'طب الجهاز التنفسي والسيطرة على التبغ ورعاية الرئة المتقدمة',
      en: 'Respiratory & Critical Care Medicine / Tobacco Control Leader',
      fr: 'Médecine Respiratoire & Soins Intensifs',
      ha: 'Babban Likitan Numfashi da Kula da Cututtukan Kirji',
      zh: '中国工程院院士 / 呼吸病学与危重症医学专家 / 全国控烟领航专家'
    },
    country: {
      ar: 'الصين',
      en: 'China',
      fr: 'Chine',
      ha: 'Kasar Sin (China)',
      zh: '中国'
    },
    institution: {
      ar: 'المركز الصيني الوطني للأبحاث السريرية لطب الجهاز التنفسي',
      en: 'National Clinical Research Center for Respiratory Diseases',
      fr: 'Centre National Chinois de Recherche Clinique Respiratoire',
      ha: 'Babbar Cibiyar Binciken Likitanci ta Kasa a Kasar Sin',
      zh: '国家呼吸医学中心 / 中国医学科学院北京协和医学院'
    },
    languages: ['中文', 'English'],
    officialConsultationUrl: 'http://www.pumch.cn/',
    verifiedStatus: true
  }
];
