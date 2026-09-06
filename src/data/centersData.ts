import { QuitCenter } from '../types';

export const initialQuitCenters: QuitCenter[] = [
  {
    id: 'center-riyadh-1',
    name: {
      ar: 'عيادة مكافحة التدخين - مجمع الملك سعود الطبي',
      en: 'Smoking Cessation Clinic - King Saud Medical City',
      fr: 'Clinique de Sevrage Tabagique - Cité Médicale Roi Saoud',
      ha: 'Asibitin Daina Taba na King Saud Medical City',
      zh: '沙特利雅得国王萨欧德医疗城 - 戒烟专科门诊'
    },
    country: {
      ar: 'المملكة العربية السعودية',
      en: 'Saudi Arabia',
      fr: 'Arabie Saoudite',
      ha: 'Kasar Saudiya',
      zh: '沙特阿拉伯'
    },
    countryCode: 'SA',
    city: {
      ar: 'الرياض',
      en: 'Riyadh',
      fr: 'Riyad',
      ha: 'Riyadh',
      zh: '利雅得'
    },
    serviceType: 'hospital',
    serviceTypeLabel: {
      ar: 'عيادة مستشفى تخصصي حكومي',
      en: 'Government Specialized Hospital Clinic',
      fr: 'Clinique Hospitalière Publique Spécialisée',
      ha: 'Babban Asibitin Kwararru na Gwamnati',
      zh: '公立专科医院门诊'
    },
    languagesSupported: ['العربية', 'English'],
    accreditation: 'برنامج مكافحة التدخين - وزارة الصحة السعودية (MOH Saudi)',
    phone: '937 / 011 435 5555',
    address: 'شارع الإمام عبد العزيز بن محمد بن سعود، صياح، الرياض 12746',
    website: 'https://www.ksmc.med.sa/',
    mapQuery: 'King Saud Medical City Riyadh'
  },
  {
    id: 'center-jeddah-1',
    name: {
      ar: 'عيادة الإقلاع عن التدخين - مستشفى الملك فهد العام',
      en: 'Smoking Cessation Center - King Fahad General Hospital',
      fr: 'Centre de Sevrage - Hôpital Général Roi Fahd',
      ha: 'Cibiyar Daina Taba ta King Fahad General Hospital',
      zh: '吉达法赫德国王综合医院 - 戒烟指导中心'
    },
    country: {
      ar: 'المملكة العربية السعودية',
      en: 'Saudi Arabia',
      fr: 'Arabie Saoudite',
      ha: 'Kasar Saudiya',
      zh: '沙特阿拉伯'
    },
    countryCode: 'SA',
    city: {
      ar: 'جدة',
      en: 'Jeddah',
      fr: 'Djeddah',
      ha: 'Jeddah',
      zh: '吉达'
    },
    serviceType: 'clinic',
    serviceTypeLabel: {
      ar: 'عيادة رعاية صحية حكومية',
      en: 'Primary Healthcare Cessation Unit',
      fr: 'Unité de Soins Primaires de Sevrage',
      ha: 'Cibiyar Kula da Lafiya ta Farko',
      zh: '公立初级卫生医疗门诊'
    },
    languagesSupported: ['العربية', 'English'],
    accreditation: 'المركز السعودي لاعتماد المنشآت الصحية (CBAHI)',
    phone: '937 / 012 660 6111',
    address: 'حي الأندلس، طريق مكة القديم، جدة',
    website: 'https://www.moh.gov.sa/',
    mapQuery: 'King Fahad Hospital Jeddah'
  },
  {
    id: 'center-london-1',
    name: {
      ar: 'مركز لندن لخدمات الإقلاع التابع لهيئة NHS',
      en: 'Guy’s and St Thomas’ NHS Stop Smoking Service',
      fr: 'Service de Sevrage Tabagique NHS - Guy’s and St Thomas’',
      ha: 'Sabis din Daina Taba na Guy\'s and St Thomas\' NHS a London',
      zh: '伦敦盖伊与圣托马斯国家医疗服务体系 (NHS) 戒烟服务中心'
    },
    country: {
      ar: 'المملكة المتحدة',
      en: 'United Kingdom',
      fr: 'Royaume-Uni',
      ha: 'Kasar Birtaniya',
      zh: '英国'
    },
    countryCode: 'GB',
    city: {
      ar: 'لندن',
      en: 'London',
      fr: 'Londres',
      ha: 'London',
      zh: '伦敦'
    },
    serviceType: 'hospital',
    serviceTypeLabel: {
      ar: 'مستشفى جامعي معتمد من NHS',
      en: 'NHS Foundation Trust University Hospital',
      fr: 'Hôpital Universitaire Agréé NHS',
      ha: 'Babban Asibitin Jami\'a na NHS',
      zh: 'NHS公立大学附属医院戒烟专科'
    },
    languagesSupported: ['English', 'Français', 'العربية'],
    accreditation: 'National Health Service (NHS) & National Institute for Health and Care Excellence (NICE)',
    phone: '020 7188 0995 / 0800 169 5901',
    address: 'Westminster Bridge Road, London SE1 7EH',
    website: 'https://www.guysandstthomas.nhs.uk/',
    mapQuery: 'St Thomas Hospital London Westminster Bridge Road'
  },
  {
    id: 'center-paris-1',
    name: {
      ar: 'وحدة طب التبغ والإقلاع - مستشفى كوشين الجامعي',
      en: 'Tabacology & Cessation Unit - Cochin Hospital Paris',
      fr: 'Unité de Tabacologie Médicale - Hôpital Cochin (AP-HP)',
      ha: 'Sashen Daina Taba na Asibitin Cochin a Paris',
      zh: '巴黎科钦医院 (AP-HP) - 戒烟与烟草病学医疗中心'
    },
    country: {
      ar: 'فرنسا',
      en: 'France',
      fr: 'France',
      ha: 'Kasar Faransa',
      zh: '法国'
    },
    countryCode: 'FR',
    city: {
      ar: 'باريس',
      en: 'Paris',
      fr: 'Paris',
      ha: 'Paris',
      zh: '巴黎'
    },
    serviceType: 'hospital',
    serviceTypeLabel: {
      ar: 'مستشفى جامعي - استشارات سريرية وسلوكية',
      en: 'University Hospital Clinical Consultation',
      fr: 'Consultation Hospitalière Spécialisée (AP-HP)',
      ha: 'Asibitin Kula da Marasa Lafiya na Jami\'a',
      zh: '公立大学医院专科临床中心'
    },
    languagesSupported: ['Français', 'English'],
    accreditation: 'Haute Autorité de Santé (HAS) & Assistance Publique - Hôpitaux de Paris (AP-HP)',
    phone: '01 58 41 41 41 / 39 89',
    address: '27 Rue du Faubourg Saint-Jacques, 75014 Paris',
    website: 'https://hopital-cochin.aphp.fr/',
    mapQuery: 'Hopital Cochin Paris'
  },
  {
    id: 'center-cairo-1',
    name: {
      ar: 'عيادة الإقلاع عن التدخين - مستشفى القصر العيني',
      en: 'Tobacco Cessation Clinic - Kasr Al-Ainy Hospital',
      fr: 'Clinique de Sevrage Tabagique - Hôpital Kasr Al-Ainy',
      ha: 'Asibitin Daina Taba na Kasr Al-Ainy a Alkahira',
      zh: '开罗大学卡斯尔·艾尼医院 - 戒烟专病门诊'
    },
    country: {
      ar: 'جمهورية مصر العربية',
      en: 'Egypt',
      fr: 'Égypte',
      ha: 'Kasar Masar (Egypt)',
      zh: '埃及'
    },
    countryCode: 'EG',
    city: {
      ar: 'القاهرة',
      en: 'Cairo',
      fr: 'Le Caire',
      ha: 'Cairo',
      zh: '开罗'
    },
    serviceType: 'hospital',
    serviceTypeLabel: {
      ar: 'مستشفى جامعي حكومي تخصصي',
      en: 'Government University Specialized Hospital',
      fr: 'Hôpital Universitaire Public Spécialisé',
      ha: 'Babban Asibitin Jami\'a na Gwamnati',
      zh: '公立大学附属医院'
    },
    languagesSupported: ['العربية', 'English'],
    accreditation: 'وزارة الصحة والسكان المصرية وجامعة القاهرة',
    phone: '16805 / 02 2365 4060',
    address: 'شارع قصر العيني، المنيل، القاهرة',
    website: 'https://medicine.cu.edu.eg/',
    mapQuery: 'Kasr Al Ainy Hospital Cairo'
  },
  {
    id: 'center-dubai-1',
    name: {
      ar: 'عيادة التحرر من التبغ - مستشفى راشد بهيئة صحة دبي',
      en: 'Tobacco Free Clinic - Rashid Hospital (DHA)',
      fr: 'Clinique Sans Tabac - Hôpital Rashid (DHA)',
      ha: 'Asibitin Rashid na Hukumar Lafiya ta Dubai',
      zh: '迪拜卫生局 (DHA) 拉希德医院 - 无烟康复门诊'
    },
    country: {
      ar: 'الإمارات العربية المتحدة',
      en: 'United Arab Emirates',
      fr: 'Émirats Arabes Unis',
      ha: 'Hadaddiyar Daular Larabawa (UAE)',
      zh: '阿联酋'
    },
    countryCode: 'AE',
    city: {
      ar: 'دبي',
      en: 'Dubai',
      fr: 'Dubaï',
      ha: 'Dubai',
      zh: '迪拜'
    },
    serviceType: 'clinic',
    serviceTypeLabel: {
      ar: 'مركز رعاية تخصصي حكومي',
      en: 'Government Specialized Care Center',
      fr: 'Centre Spécialisé Public (DHA)',
      ha: 'Cibiyar Lafiya ta Musamman ta Gwamnati',
      zh: '官方卫生局直属专科医疗机构'
    },
    languagesSupported: ['العربية', 'English'],
    accreditation: 'Joint Commission International (JCI) & Dubai Health Authority (DHA)',
    phone: '800 342 (DHA)',
    address: 'حي أم هرير 2، بر دبي، دبي',
    website: 'https://www.dha.gov.ae/',
    mapQuery: 'Rashid Hospital Dubai'
  },
  {
    id: 'center-beijing-1',
    name: {
      ar: 'عيادة الإقلاع عن التدخين - مستشفى الصداقة الصينية اليابانية',
      en: 'Smoking Cessation Clinic - China-Japan Friendship Hospital',
      fr: 'Clinique de Sevrage Tabagique - Hôpital de l’Amitié Sino-Japonaise',
      ha: 'Cibiyar Daina Taba a Asibitin Abota na Beijing',
      zh: '中日友好医院 - 呼吸中心戒烟门诊 (国家呼吸医学中心)'
    },
    country: {
      ar: 'الصين',
      en: 'China',
      fr: 'Chine',
      ha: 'Kasar Sin (China)',
      zh: '中国'
    },
    countryCode: 'CN',
    city: {
      ar: 'بكين',
      en: 'Beijing',
      fr: 'Pékin',
      ha: 'Beijing',
      zh: '北京'
    },
    serviceType: 'hospital',
    serviceTypeLabel: {
      ar: 'المركز الوطني لطب الجهاز التنفسي والعيادات التخصصية',
      en: 'National Center for Respiratory Medicine Tier-A',
      fr: 'Centre National de Référence en Pneumologie',
      ha: 'Babban Asibitin Kasa na Beijing',
      zh: '国家三甲公立医院 / 国家呼吸医学中心依托单位'
    },
    languagesSupported: ['中文', 'English'],
    accreditation: '国家卫生健康委员会 (National Health Commission of China) & WHO Collaborating Center',
    phone: '010-84205288 / 400-888-5531',
    address: '北京市朝阳区樱花东街2号',
    website: 'https://www.zryhyy.com.cn/',
    mapQuery: 'China Japan Friendship Hospital Beijing'
  },
  {
    id: 'center-abuja-1',
    name: {
      ar: 'مركز الإقلاع وطب الصدر - المستشفى الوطني في أبوجا',
      en: 'Pulmonology & Cessation Unit - National Hospital Abuja',
      fr: 'Unité de Pneumologie & Sevrage - Hôpital National d’Abuja',
      ha: 'Asibitin Kasa na Abuja (National Hospital Abuja)',
      zh: '尼日利亚阿布贾国家医院 - 呼吸内科与戒烟服务中心'
    },
    country: {
      ar: 'نيجيريا / غرب أفريقيا',
      en: 'Nigeria / West Africa',
      fr: 'Nigéria / Afrique de l’Ouest',
      ha: 'Kasar Najeriya / Yammacin Afirka',
      zh: '尼日利亚'
    },
    countryCode: 'NG',
    city: {
      ar: 'أبوجا',
      en: 'Abuja',
      fr: 'Abuja',
      ha: 'Abuja',
      zh: '阿布贾'
    },
    serviceType: 'hospital',
    serviceTypeLabel: {
      ar: 'المستشفى الوطني الفيدرالي للرعاية الثالثية',
      en: 'Federal Tertiary Care Hospital',
      fr: 'Hôpital National Fédéral de Référence',
      ha: 'Babban Asibitin Kasa na Tarayya',
      zh: '联邦三级甲等国家医院'
    },
    languagesSupported: ['English', 'Hausa'],
    accreditation: 'Federal Ministry of Health Nigeria (FMH)',
    phone: '+234 9 290 3242',
    address: 'Plot 132 Central District (Phase II), Garki, Abuja',
    website: 'https://nationalhospital.gov.ng/',
    mapQuery: 'National Hospital Abuja Nigeria'
  }
];
