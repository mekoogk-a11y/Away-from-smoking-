import { ConsultationEntity } from '../types';

export const officialConsultationEntities: ConsultationEntity[] = [
  {
    id: 'who-global',
    name: {
      ar: 'منظمة الصحة العالمية - مبادرة التحرر من التبغ (WHO)',
      en: 'World Health Organization (WHO) - Tobacco Free Initiative',
      fr: 'Organisation Mondiale de la Santé (OMS) - Initiative pour un monde sans tabac',
      ha: 'Hukumar Lafiya ta Duniya (WHO) - Shirin Yaki da Shan Taba',
      zh: '世界卫生组织 (WHO) - 无烟倡议与戒烟全球计划'
    },
    country: {
      ar: 'عالمي / سويسرا',
      en: 'Global / Switzerland',
      fr: 'Mondial / Suisse',
      ha: 'Duniya / Switzerland',
      zh: '全球 / 瑞士日内瓦'
    },
    countryCode: 'GLOBAL',
    description: {
      ar: 'الهيئة الصحية العالمية الرائدة المسؤولة عن معايير الإقلاع وإرشادات MPOWER والذكاء الاصطناعي التوعوي ومكافحة الأوبئة التبغية حول العالم.',
      en: 'The leading global public health agency directing clinical cessation guidelines, MPOWER policies, and digital health initiatives worldwide.',
      fr: 'L’agence sanitaire mondiale de référence définissant les directives cliniques de sevrage et la stratégie MPOWER.',
      ha: 'Babbar hukumar lafiya ta duniya mai kula da ka\'idojin daina shan taba da ba da shawarwari a dukkan kasashe.',
      zh: '联合国主管全球卫生事务的专门机构，制定MPOWER全球控烟战略与循证临床戒烟指南。'
    },
    officialWebsite: 'https://www.who.int/health-topics/tobacco',
    contactMethod: 'whoquittobacco@who.int / WhatsApp Chatbot official',
    quitServiceUrl: 'https://www.who.int/campaigns/world-no-tobacco-day',
    helpType: {
      ar: 'إرشادات سريرية دولية، مبادرات رقمية، واستشارات سياسات صحية',
      en: 'International clinical guidelines, digital cessation AI, and public health support',
      fr: 'Directives cliniques internationales, interventions numériques et politiques de santé',
      ha: 'Shawarwarin asibiti na kasa da kasa da manhajojin taimakon kai da kai',
      zh: '全球循证戒烟指南、数字化AI戒烟顾问与控烟政策技术支持'
    },
    isGlobal: true
  },
  {
    id: 'cdc-usa',
    name: {
      ar: 'مراكز السيطرة على الأمراض والوقاية منها (CDC) - Smokefree.gov',
      en: 'Centers for Disease Control and Prevention (CDC) & Smokefree.gov',
      fr: 'Centres pour le Contrôle et la Prévention des Maladies (CDC) - USA',
      ha: 'Cibiyar Yaki da Cututtuka ta Amurka (CDC) & Smokefree.gov',
      zh: '美国疾病控制与预防中心 (CDC) & Smokefree.gov 官方戒烟平台'
    },
    country: {
      ar: 'الولايات المتحدة الأمريكية',
      en: 'United States',
      fr: 'États-Unis',
      ha: 'Kasar Amurka',
      zh: '美国'
    },
    countryCode: 'US',
    description: {
      ar: 'الجهة الفيدرالية الأمريكية الرسمية التي تشرف على منصة Smokefree.gov وتقدم دعماً هاتفياً وإلكترونياً مجانياً على مدار الساعة لجميع المدخنين.',
      en: 'The premier US federal health agency running Smokefree.gov and coordinating the nationwide 1-800-QUIT-NOW helpline network.',
      fr: 'L’agence fédérale américaine gérant la plateforme Smokefree.gov et le réseau national d’assistance téléphonique.',
      ha: 'Hukumar gwamnatin Amurka da ke ba da layin taimako da dabarun daina taba kyauta.',
      zh: '美国联邦公共卫生机构，主管国家级戒烟平台Smokefree.gov并统筹全美戒烟援助网络。'
    },
    officialWebsite: 'https://www.cdc.gov/tobacco',
    contactMethod: 'Toll-Free Helpline: 1-800-QUIT-NOW (1-800-784-8669)',
    quitServiceUrl: 'https://smokefree.gov/',
    helpType: {
      ar: 'استشارات هاتفية مباشرة، خطط إقلاع مخصصة، ورسائل نصية داعمة',
      en: 'Live phone counseling, individualized quit plans, and 24/7 text support',
      fr: 'Conseils téléphoniques personnalisés, plans de sevrage et SMS de motivation',
      ha: 'Shawara ta wayar tarho, tsarin daina taba da sakonnin karfafa gwiwa',
      zh: '一对一免费电话咨询、个性化戒烟方案制定与全天候短信督导支持'
    }
  },
  {
    id: 'ksa-moh',
    name: {
      ar: 'برنامج مكافحة التدخين - وزارة الصحة السعودية',
      en: 'Tobacco Control Program - Saudi Ministry of Health',
      fr: 'Programme de Lutte Antitabac - Ministère de la Santé (Arabie Saoudite)',
      ha: 'Shirin Yaki da Shan Taba na Ma\'aikatar Lafiyar Saudiyya',
      zh: '沙特阿拉伯卫生部 - 国家戒烟计划与937服务热线'
    },
    country: {
      ar: 'المملكة العربية السعودية',
      en: 'Saudi Arabia',
      fr: 'Arabie Saoudite',
      ha: 'Kasar Saudiya',
      zh: '沙特阿拉伯'
    },
    countryCode: 'SA',
    description: {
      ar: 'برنامج وطني رائد يقدم عيادات متخصصة للإقلاع عن التدخين حضورياً وافتراضياً في جميع مناطق المملكة، بالإضافة لمركز الاتصال الصحي الموحد 937.',
      en: 'Official national program delivering in-person and virtual cessation clinics across the Kingdom via the unified 937 healthcare helpline.',
      fr: 'Programme national fournissant des consultations cliniques physiques et virtuelles via la ligne unifiée 937.',
      ha: 'Shirin hukuma na asibitocin daina shan taba kyauta a Saudiyya ta hanyar lambar 937.',
      zh: '沙特官方国家级控烟项目，通过全国统一937就医服务热线提供正规免费戒烟门诊与随访。'
    },
    officialWebsite: 'https://www.moh.gov.sa/HealthAwareness/Campaigns/Smoking',
    contactMethod: 'مركز الاتصال الموحد: 937 (مجاني على مدار 24 ساعة)',
    quitServiceUrl: 'https://www.moh.gov.sa/Services/Pages/CessationClinics.aspx',
    helpType: {
      ar: 'عيادات إقلاع حكومية مجانية، علاج دوائي وسلوكي، واستشارات هاتفية 24/7',
      en: 'Free specialized government clinics, pharmacological therapy, and 24/7 counseling',
      fr: 'Consultations gratuites, prise en charge médicale et assistance téléphonique 24/7',
      ha: 'Asibitocin daina taba kyauta, magunguna da shawarwari ta waya',
      zh: '公立免费戒烟门诊、药物辅助替代治疗与全天候937热线医学咨询'
    }
  },
  {
    id: 'nhs-uk',
    name: {
      ar: 'هيئة الخدمات الصحية الوطنية البريطانية (NHS Smokefree)',
      en: 'National Health Service (NHS) - Better Health Smoke Free',
      fr: 'Service National de Santé Britannique (NHS Smokefree)',
      ha: 'Hukumar Kiwon Lafiya ta Birtaniya (NHS Smokefree)',
      zh: '英国国家医疗服务体系 (NHS) - Better Health 戒烟服务'
    },
    country: {
      ar: 'المملكة المتحدة',
      en: 'United Kingdom',
      fr: 'Royaume-Uni',
      ha: 'Kasar Birtaniya',
      zh: '英国'
    },
    countryCode: 'GB',
    description: {
      ar: 'أحد أكثر برامج الإقلاع كفاءة في العالم، يقدم دعماً مجانياً شاملاً من خلال الصيدليات والعيادات المحلية والخط الساخن وتطبيق NHS Quit Smoking.',
      en: 'World-renowned evidence-based cessation service providing local Stop Smoking Services, free adviser support, and the Smokefree National Helpline.',
      fr: 'Service de santé britannique proposant des conseillers spécialisés, des traitements adaptés et une assistance gratuite.',
      ha: 'Shirin NHS mai ba da shawara a cibiyoyin magunguna da asibitoci a Birtaniya kyauta.',
      zh: '英国国家级循证医学戒烟服务平台，提供经过认证的社区戒烟顾问指导与免费国家戒烟专线。'
    },
    officialWebsite: 'https://www.nhs.uk/better-health/quit-smoking/',
    contactMethod: 'NHS Smokefree Helpline: 0300 123 1044',
    quitServiceUrl: 'https://www.nhs.uk/live-well/quit-smoking/nhs-stop-smoking-services-help-you-quit/',
    helpType: {
      ar: 'مستشارون معتمدون، بدائل نيكوتين معتمدة، وتوجيه مجتمعي محلي',
      en: 'Certified cessation advisers, behavioral counseling, and local NHS clinics',
      fr: 'Conseillers certifiés, thérapies substitutives et cliniques locales NHS',
      ha: 'Masu ba da shawara da asibitocin kusa da gida a Birtaniya',
      zh: '专业认证戒烟顾问面对面指导、科学处方评估及属地化门诊网络'
    }
  },
  {
    id: 'tabac-info-fr',
    name: {
      ar: 'خدمة معلومات التدخين الفرنسية (Tabac Info Service)',
      en: 'Tabac Info Service - Santé publique France',
      fr: 'Tabac Info Service - Santé publique France',
      ha: 'Sabis din Bayanin Taba na Kasar Faransa',
      zh: '法国国家公共卫生署 - Tabac Info Service 戒烟热线'
    },
    country: {
      ar: 'فرنسا',
      en: 'France',
      fr: 'France',
      ha: 'Kasar Faransa',
      zh: '法国'
    },
    countryCode: 'FR',
    description: {
      ar: 'المنصة الوطنية الرسمية في فرنسا لمساعدة المدخنين على التخلص من الإدمان بإشراف أخصائيي تبغ وأطباء معتمدين عبر الرقم الموحد 39 89.',
      en: 'France’s official national public health cessation service offering one-on-one tabacologue consultations via telephone 39 89.',
      fr: 'Service public français d’information et d’aide à l’arrêt du tabac avec suivi gratuit par des tabacologues au 39 89.',
      ha: 'Sabis din gwamnatin Faransa mai kwararrun likitocin daina taba ta lambar 39 89.',
      zh: '法国官方控烟与戒烟支持机构，由专业戒烟医生与心理学家通过39 89专线提供随访。'
    },
    officialWebsite: 'https://www.tabac-info-service.fr/',
    contactMethod: 'Ligne directe Tabac Info Service: 39 89',
    quitServiceUrl: 'https://www.tabac-info-service.fr/je-trouve-un-professionnel',
    helpType: {
      ar: 'متابعة شخصية من أخصائي تبغ (Tabacologue) مجاناً عبر الهاتف والويب',
      en: 'Free tailored telephone support from qualified tabacologues and coaching app',
      fr: 'Suivi personnalisé gratuit par un tabacologue et annuaire de spécialistes',
      ha: 'Bayanai da ganawa da kwararrun likitocin Faransa kyauta',
      zh: '专职戒烟医学专家定制化多轮电话回访与专业转介服务'
    }
  },
  {
    id: 'china-quitline',
    name: {
      ar: 'الخط الساخن الوطني لمكافحة التدخين في الصين (China CDC Quitline)',
      en: 'National Tobacco Control Helpline - China CDC',
      fr: 'Ligne Nationale Antitabac - Centre Chinois de Contrôle des Maladies (China CDC)',
      ha: 'Layin Taimakon Daina Shan Taba na Kasar Sin (China CDC)',
      zh: '中国疾病预防控制中心控烟办公室 & 全国戒烟热线'
    },
    country: {
      ar: 'الصين',
      en: 'China',
      fr: 'Chine',
      ha: 'Kasar Sin (China)',
      zh: '中国'
    },
    countryCode: 'CN',
    description: {
      ar: 'الخدمة الرسمية المعتمدة من المركز الصيني للسيطرة على الأمراض والوقاية منها واللجنة الوطنية للصحة لتوفير إرشادات الإقلاع عبر الرقمين 400-888-5531 و12320.',
      en: 'Official national cessation service under the Chinese Center for Disease Control and Prevention offering free counseling via 400-888-5531 and 12320.',
      fr: 'Service national officiel du CDC chinois pour l’assistance téléphonique au sevrage tabagique.',
      ha: 'Sabis na hukuma a kasar Sin mai ba da shawarwari ta lambar 400-888-5531.',
      zh: '国家卫生健康委员会指导、中国疾病预防控制中心统筹管理的权威免费戒烟电话咨询与门诊指引体系。'
    },
    officialWebsite: 'http://tobacco.chinacdc.cn/',
    contactMethod: '全国统一戒烟热线: 400-888-5531 / 卫生热线: 12320',
    quitServiceUrl: 'http://www.catcpr.org.cn/',
    helpType: {
      ar: 'استشارات هاتفية مباشرة، خرائط لعيادات الإقلاع في المستشفيات، ودليل علاجي',
      en: 'Live phone counseling, hospital cessation clinic referrals, and evidence guides',
      fr: 'Conseils téléphoniques en direct, orientation vers les hôpitaux et guides',
      ha: 'Kira ta waya da tura mutane zuwa asibitocin da ke kusa a kasar Sin',
      zh: '全国戒烟热线标准化干预服务、正规医院戒烟门诊转介与戒烟科普'
    }
  },
  {
    id: 'nigeria-fmh',
    name: {
      ar: 'وحدة مكافحة التبغ - وزارة الصحة الفيدرالية في نيجيريا',
      en: 'Federal Ministry of Health Nigeria - Tobacco Control Division',
      fr: 'Ministère Fédéral de la Santé (Nigéria) - Division de Lutte Antitabac',
      ha: 'Ma\'aikatar Lafiya ta Tarayyar Najeriya - Sashen Kula da Taba',
      zh: '尼日利亚联邦卫生部 - 国家控烟事务部'
    },
    country: {
      ar: 'نيجيريا / غرب أفريقيا',
      en: 'Nigeria / West Africa',
      fr: 'Nigéria / Afrique de l’Ouest',
      ha: 'Kasar Najeriya / Yammacin Afirka',
      zh: '尼日利亚 / 西非'
    },
    countryCode: 'NG',
    description: {
      ar: 'الإدارة الحكومية المختصة بتطبيق قانون مكافحة التبغ الوطني وتوفير التوعية والإرشاد بالتعاون مع منظمة الصحة العالمية والعيادات العامة في نيجيريا.',
      en: 'The federal division coordinating national tobacco control regulations, public cessation awareness, and WHO-backed clinical support in Nigeria.',
      fr: 'Direction gouvernementale coordonnant la lutte antitabac et les directives de sevrage au Nigéria.',
      ha: 'Sashen gwamnatin tarayya mai kula da dokokin taba da wayar da kan jama\'a kan daina shan taba a Najeriya.',
      zh: '尼日利亚联邦卫生部统筹全国控烟立法实施、健康教育与公立戒烟医疗资源协调部门。'
    },
    officialWebsite: 'https://health.gov.ng/',
    contactMethod: 'info@health.gov.ng / National NCD Division',
    quitServiceUrl: 'https://health.gov.ng/programs/tobacco-control',
    helpType: {
      ar: 'توجيهات صحية، عيادات المستشفيات التعليمية الفيدرالية، ومواد تثقيفية',
      en: 'Public hospital clinics, cessation guidance, and community outreach',
      fr: 'Orientation vers les centres hospitaliers universitaires et éducation',
      ha: 'Shawarwari da tura mutane zuwa manyan asibitocin gwamnatin tarayya a Najeriya',
      zh: '国家公共医疗机构转介、联邦教学医院戒烟指导与社区卫生支持'
    }
  },
  {
    id: 'uae-mohap',
    name: {
      ar: 'عيادات الإقلاع عن التدخين - وزارة الصحة ووقاية المجتمع (الإمارات)',
      en: 'Smoking Cessation Clinics - UAE Ministry of Health and Prevention (MOHAP)',
      fr: 'Cliniques de Sevrage Tabagique - Ministère de la Santé (Émirats Arabes Unis)',
      ha: 'Asibitocin Daina Taba na Ma\'aikatar Lafiyar Hadaddiyar Daular Larabawa',
      zh: '阿拉伯联合酋长国卫生与预防部 (MOHAP) - 戒烟专科门诊'
    },
    country: {
      ar: 'الإمارات العربية المتحدة',
      en: 'United Arab Emirates',
      fr: 'Émirats Arabes Unis',
      ha: 'Hadaddiyar Daular Larabawa (UAE)',
      zh: '阿拉伯联合酋长国 (阿联酋)'
    },
    countryCode: 'AE',
    description: {
      ar: 'شبكة متكاملة من عيادات الإقلاع المنتشرة في مراكز الرعاية الصحية الأولية في الإمارات لتقديم خطط علاجية شاملة.',
      en: 'Comprehensive network of specialized smoking cessation clinics located within primary healthcare centers across the Emirates.',
      fr: 'Réseau de cliniques de sevrage réparties dans les centres de santé primaires aux EAU.',
      ha: 'Asibitoci da ke kula da daina shan taba a cibiyoyin kiwon lafiya a UAE.',
      zh: '阿联酋卫生与预防部在各主要基层医疗保健中心设立的规范化戒烟门诊网络。'
    },
    officialWebsite: 'https://mohap.gov.ae/',
    contactMethod: 'مركز الاتصال: 800-11111 (مجاني)',
    quitServiceUrl: 'https://mohap.gov.ae/en/services/smoking-cessation',
    helpType: {
      ar: 'استشارات فردية، تقييم نسبة أول أكسيد الكربون، وتوفير بدائل النيكوتين',
      en: 'Clinical assessments, carbon monoxide monitoring, and pharmacological therapy',
      fr: 'Évaluation clinique, mesure du monoxyde de carbone et substituts nicotiniques',
      ha: 'Gwajin numfashi da ba da magungunan daina taba a UAE',
      zh: '呼出气一氧化碳浓度检测、尼古丁成瘾严重程度评估及药物综合处方'
    }
  },
  {
    id: 'egypt-hotline',
    name: {
      ar: 'الخط الساخن لوزارة الصحة المصرية وعلاج الإدمان (16805)',
      en: 'Egyptian Ministry of Health & Addiction Treatment Helpline (16805)',
      fr: 'Ligne d’Écoute du Ministère de la Santé Égyptien (16805)',
      ha: 'Layin Taimako na Ma\'aikatar Lafiyar Masar (16805)',
      zh: '埃及卫生部 - 国家成瘾治疗与戒烟咨询热线 (16805)'
    },
    country: {
      ar: 'جمهورية مصر العربية',
      en: 'Egypt',
      fr: 'Égypte',
      ha: 'Kasar Masar (Egypt)',
      zh: '埃及'
    },
    countryCode: 'EG',
    description: {
      ar: 'خدمة حكومية رسمية مجانية تابعة لصندوق مكافحة الإدمان ووزارة الصحة المصرية لتقديم الدعم والمشورة وتوجيه الراغبين في الإقلاع للمستشفيات العامة مجاناً وبسرية تامة.',
      en: 'Official toll-free governmental helpline providing confidential consultations and direct referrals to public hospital cessation clinics in Egypt.',
      fr: 'Ligne gratuite gouvernementale offrant écoute, conseils et orientation vers les centres hospitaliers publics.',
      ha: 'Layin taimako kyauta a kasar Masar mai ba da shawara a asirce da tura mutane asibiti.',
      zh: '埃及官方卫生部门设立的全国免费保密咨询专线及公立医院戒烟门诊转诊通道。'
    },
    officialWebsite: 'https://www.mohp.gov.eg/',
    contactMethod: 'الخط الساخن المجاني: 16805',
    quitServiceUrl: 'https://www.mohp.gov.eg/',
    helpType: {
      ar: 'استشارات هاتفية مجانية سرية، توجيه للمستشفيات الجامعية، ودعم نفسي',
      en: 'Confidential phone support, university hospital referrals, and psychological aid',
      fr: 'Assistance téléphonique confidentielle et orientation hospitalière',
      ha: 'Wayar tarho a asirce da tura mutum babban asibiti kyauta',
      zh: '全流程保密电话咨询、大学附属教学医院戒烟门诊精准转介'
    }
  }
];
