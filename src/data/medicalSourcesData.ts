import { MedicalSource } from '../types';

export const officialMedicalSources: MedicalSource[] = [
  {
    id: 'src-who-report',
    title: {
      ar: 'تقرير منظمة الصحة العالمية عن الوباء العالمي للتبغ وإرشادات الإقلاع',
      en: 'WHO Report on the Global Tobacco Epidemic & Cessation Guidelines',
      fr: 'Rapport de l’OMS sur l’épidémie mondiale de tabagisme',
      ha: 'Rahoton Hukumar Lafiya ta Duniya (WHO) kan Cutar Taba ta Duniya',
      zh: '世界卫生组织全球烟草流行报告及临床戒烟服务指南'
    },
    organization: 'World Health Organization (WHO)',
    description: {
      ar: 'المرجع العالمي الأساسي لسياسات مكافحة التبغ وتدابير MPOWER والإرشادات السريرية للمساعدة على الإقلاع.',
      en: 'Primary global reference outlining tobacco control policies, MPOWER framework, and evidence-based cessation clinical interventions.',
      fr: 'Référence mondiale majeure définissant les interventions cliniques éprouvées et les politiques MPOWER.',
      ha: 'Babban binciken da ke bayyana hanyoyin daina shan taba da ka\'idojin kiwon lafiya.',
      zh: '全球控烟与临床戒烟干预最高权威指南，系统阐述MPOWER综合控烟政策与药物/行为干预措施。'
    },
    url: 'https://www.who.int/teams/health-promotion/tobacco-control',
    category: 'global_health'
  },
  {
    id: 'src-cdc-surgeon-general',
    title: {
      ar: 'تقرير الجراح العام الأمريكي: الإقلاع عن التدخين والفوائد البيولوجية المباشرة',
      en: 'US Surgeon General’s Report on Smoking Cessation & Health Benefits',
      fr: 'Rapport du Surgeon General des États-Unis sur le sevrage tabagique',
      ha: 'Binciken Babban Likitan Amurka kan Amfanin Barin Taba ga Lafiya',
      zh: '美国卫生总监报告：戒烟与健康获益的全面循证医学评估'
    },
    organization: 'Centers for Disease Control and Prevention (CDC)',
    description: {
      ar: 'توثيق سريري شامل لما يزيد عن 50 عاماً من الأبحاث حول استعادة وظائف القلب والرئتين والأوعية بعد الإقلاع.',
      en: 'Exhaustive clinical review synthesizing over 50 years of clinical trials examining physiological organ recovery following cessation.',
      fr: 'Synthèse clinique de plus de 50 ans de recherches sur la récupération des fonctions cardiorespiratoires après l’arrêt.',
      ha: 'Binciken asibiti da ke nuna yadda jikin dan adam ke komawa daidai idan ya daina shan taba.',
      zh: '系统梳理戒烟后人体各系统功能（心血管、呼吸系统、生殖健康）恢复轨迹的权威临床综述。'
    },
    url: 'https://www.cdc.gov/tobacco/sgr/2020-smoking-cessation/index.html',
    category: 'guidelines'
  },
  {
    id: 'src-iarc-monographs',
    title: {
      ar: 'دراسات الوكالة الدولية لبحوث السرطان (IARC) - المسرطنات التبغية',
      en: 'IARC Monographs on the Evaluation of Carcinogenic Risks: Tobacco Smoke',
      fr: 'Monographies du CIRC sur l’évaluation des risques cancérogènes du tabac',
      ha: 'Binciken Hukumar Binciken Ciwon Daji ta Duniya (IARC) kan Taba',
      zh: '国际癌症研究机构 (IARC) 专著：烟草烟雾与致癌物分类鉴定'
    },
    organization: 'International Agency for Research on Cancer (IARC / WHO)',
    description: {
      ar: 'التصنيف العلمي للمواد الكيميائية المسرطنة (المجموعة 1) في التبغ وطفرات الحمض النووي المسببة للأورام الخبيثة.',
      en: 'Definitive scientific classification of Group-1 human carcinogens in tobacco smoke and their molecular mutagenic mechanisms.',
      fr: 'Classification officielle des carcinogènes humains du groupe 1 et leurs mécanismes oncogènes.',
      ha: 'Gano sinadaran da ke haddasa ciwon daji a cikin hayakin taba da yadda suke lalata kwayoyin halitta.',
      zh: '对烟草烟雾中70余种1类人类确定致癌物的致癌机理、DNA损伤途径的系统性生物医学评估。'
    },
    url: 'https://monographs.iarc.who.int/list-of-classifications',
    category: 'research'
  },
  {
    id: 'src-cochrane-cessation',
    title: {
      ar: 'مكتبة كوكرين للتحليلات التلوية لتدخلات الإقلاع عن التدخين',
      en: 'Cochrane Tobacco Addiction Group Systematic Reviews & Meta-Analyses',
      fr: 'Revues Systématiques du Groupe Cochrane sur l’Addiction au Tabac',
      ha: 'Binciken Cochrane kan Hanyoyin da suka fi Aiki wajen Daina Taba',
      zh: '考克兰协作网 (Cochrane) 烟草成瘾系统评价与荟萃分析'
    },
    organization: 'Cochrane Collaboration',
    description: {
      ar: 'أعلى درجات الأدلة الطبية المسندة في مقارنة فعالية العلاجات الدوائية (NRT) والدعم السلوكي وتطبيقات الهواتف المحمولة.',
      en: 'Gold-standard systematic reviews evaluating relative efficacy of pharmacotherapies, behavioral strategies, and digital health tools.',
      fr: 'Niveau de preuve maximal comparant l’efficacité des substituts nicotiniques et des approches comportementales.',
      ha: 'Bincike mafi inganci da ke nuna magunguna da dabarun da suka fi taimaka wa mutum ya daina taba.',
      zh: '循证医学金标准，综合评估尼古丁替代疗法、行为矫正疗法及数字化干预工具的临床有效率。'
    },
    url: 'https://www.cochranelibrary.com/topic/tobacco-addiction',
    category: 'research'
  },
  {
    id: 'src-nice-uk-guideline',
    title: {
      ar: 'إرشادات المعهد الوطني للتميز في الرعاية الصحية (NICE NG209)',
      en: 'NICE Guideline [NG209]: Tobacco - Preventing uptake, promoting quitting and treating dependence',
      fr: 'Recommandations cliniques du NICE [NG209] sur le traitement de la dépendance',
      ha: 'Ka\'idojin Hukumar NICE ta Birtaniya kan Maganin Dogaro da Taba',
      zh: '英国国家卫生与临床优化研究所 (NICE) 指南 [NG209]：烟草成瘾预防与临床治疗'
    },
    organization: 'National Institute for Health and Care Excellence (NICE)',
    description: {
      ar: 'المعايير السريرية الشاملة لخدمات الرعاية الصحية الأولية والمستشفيات للتعامل مع أعراض الانسحاب وخطط الدعم طويل المدى.',
      en: 'Comprehensive clinical criteria for primary and secondary care providers to assess nicotine dependence and manage withdrawal.',
      fr: 'Critères cliniques complets pour les soignants évaluant la dépendance et le sevrage.',
      ha: 'Shawarwarin asibiti kan yadda likitoci za su taimaka wa masu son daina shan taba.',
      zh: '指导各级全科医生、专科医生及社区药师开展戒断症状干预和全程随访管理的临床诊疗规范。'
    },
    url: 'https://www.nice.org.uk/guidance/ng209',
    category: 'guidelines'
  }
];
