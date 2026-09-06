import { OrganHarm } from '../types';

export const organHarmsData: OrganHarm[] = [
  {
    id: 'lungs',
    nameAr: 'الرئتان',
    nameEn: 'Lungs',
    iconName: 'Activity',
    severity: 'critical',
    summaryAr: 'تراكم القطران، شلل الأهداب التنفسية، وانسداد الشعب الهوائية وتدمير الحويصلات الهوائية.',
    summaryEn: 'Tar accumulation, paralyzed airway cilia, chronic obstructive pulmonary disease (COPD), and lung cancer risk.',
    harmsAr: [
      'تدمير الحويصلات الهوائية المسؤولة عن تبادل الأكسجين مما يسبب انتفاخ الرئة (Emphysema).',
      'زيادة خطر الإصابة بسرطان الرئة بأكثر من 25 ضعفاً مقارنة بغير المدخنين.',
      'تراكم القطران السام بمعدل كوب كامل من القطران سنوياً في رئة المدخن المعتاد.',
      'شلل الأهداب الخلوية، مما يمنع الرئتين من تنظيف الغبار والبكتيريا والمخاط.'
    ],
    harmsEn: [
      'Destruction of lung alveoli responsible for oxygen exchange leading to emphysema.',
      'Increases lung cancer risk by more than 25 times compared to non-smokers.',
      'Accumulates toxic tar at an average rate of one full cup of tar per year.',
      'Paralyzes bronchial cilia, preventing lungs from clearing dust, bacteria, and phlegm.'
    ],
    recoveryTimelineAr: 'خلال أسبوعين يبدأ تنشيط الأهداب، وخلال شهر تخف السعال، وبعد 10 سنوات ينخفض خطر سرطان الرئة للنصف.',
    recoveryTimelineEn: 'Within 2 weeks cilia regrow, within 1 month coughing drops, after 10 years lung cancer risk drops by 50%.',
    statsAr: '85% من حالات سرطان الرئة والانسداد الرئوي المزمن ناتجة مباشرة عن التدخين.',
    statsEn: '85% of all lung cancer and COPD cases are directly attributed to tobacco smoking.'
  },
  {
    id: 'heart',
    nameAr: 'القلب',
    nameEn: 'Heart',
    iconName: 'HeartPulse',
    severity: 'critical',
    summaryAr: 'تسارع ضربات القلب، رفع ضغط الدم، وتضاعف خطر النوبات القلبية والسكتات المفاجئة.',
    summaryEn: 'Elevated resting heart rate, high blood pressure, and doubling the risk of heart attacks and coronary disease.',
    harmsAr: [
      'النيكوتين يزيد إفراز الأدرينالين مما يجهد عضلة القلب ويرفع النبض وضغط الدم باستمرار.',
      'أول أكسيد الكربون يطرد الأكسجين من الهيموجلوبين، فيعاني القلب من نقص التروية.',
      'تضيق الشرايين التاجية المغذية لعضلة القلب وتكون الخثرات الدموية القاتلة.',
      'رفع نسبة الكوليسترول الضار (LDL) وتخفيض الكوليسترول النافع الحامي للشرايين.'
    ],
    harmsEn: [
      'Nicotine triggers adrenaline spikes, overworking heart muscle and raising blood pressure.',
      'Carbon monoxide displaces oxygen from hemoglobin, starving heart tissue of vital oxygen.',
      'Constriction of coronary arteries and elevated risk of fatal blood clot formation.',
      'Raises harmful LDL cholesterol while suppressing beneficial protective HDL cholesterol.'
    ],
    recoveryTimelineAr: 'بعد 20 دقيقة يعود النبض لطبيعته، وبعد 24 ساعة ينخفض خطر النوبة القلبية، وبعد سنة يقل الخطر للنصف.',
    recoveryTimelineEn: 'After 20 mins heart rate normalizes, after 24 hours heart attack risk drops, after 1 year risk is cut in half.',
    statsAr: 'المدخن معرض للجلطة القلبية أكثر بمرتين إلى أربع مرات من غير المدخن.',
    statsEn: 'Smokers are 2 to 4 times more likely to develop coronary heart disease than non-smokers.'
  },
  {
    id: 'brain',
    nameAr: 'الدماغ والجهاز العصبي',
    nameEn: 'Brain & Nervous System',
    iconName: 'Brain',
    severity: 'high',
    summaryAr: 'إدمان كيميائي قسري، تقلبات مزاجية وقلق مزمن، وارتفاع خطر السكتة الدماغية وتلف الذاكرة.',
    summaryEn: 'Severe chemical addiction, chronic anxiety cycles, double stroke risk, and accelerated cognitive decline.',
    harmsAr: [
      'إعادة برمجة مستقبلات الدوبامين، مما يخلق اعتماداً كيميائياً وقلقاً متكرراً عند تأخر الجرعة.',
      'تصلب الشرايين الدماغية الدقيقة مما يضاعف احتمالية حدوث السكتة الدماغية المميتة.',
      'انخفاض تدفق الدم المحمّل بالأكسجين إلى خلايا القشرة المخية مما يضعف التركيز والذاكرة.',
      'زيادة معدلات القلق والتوتر المزمن على عكس الوهم الشائع بأن التدخين يهدئ الأعصاب.'
    ],
    harmsEn: [
      'Rewires dopamine receptors in reward pathways, inducing chemical dependence and irritability.',
      'Doubles the risk of ischemic and hemorrhagic strokes due to weakened cerebral vessels.',
      'Reduces oxygen-rich blood flow to brain cortex, impairing cognitive sharpness and memory.',
      'Actually increases baseline anxiety and chronic stress, shattering the myth that smoking calms nerves.'
    ],
    recoveryTimelineAr: 'بعد 72 ساعة يخرج النيكوتين تماماً، وبعد أسبوعين تعود المستقبلات العصبية للتوازن الطبيعي.',
    recoveryTimelineEn: 'After 72 hours nicotine is 100% eliminated; within 2 weeks dopamine receptors restore natural balance.',
    statsAr: 'التدخين يضاعف خطر السكتة الدماغية ويسرع شيخوخة خلايا الدماغ بما يعادل 10 سنوات إضافية.',
    statsEn: 'Smoking doubles stroke risk and accelerates brain cell aging by roughly 10 extra biological years.'
  },
  {
    id: 'teeth',
    nameAr: 'الأسنان والفم واللثة',
    nameEn: 'Teeth, Mouth & Gums',
    iconName: 'Smile',
    severity: 'high',
    summaryAr: 'تصبغات صفراء وسوداء عميقة، رائحة فم كريهة مستمرة، انحسار اللثة، وفقدان الأسنان وسرطان الفم.',
    summaryEn: 'Deep yellow/brown staining, persistent halitosis, periodontal disease, tooth loss, and oral cavity cancers.',
    harmsAr: [
      'تصبغ مينا الأسنان بمركبات القطران والنيكوتين مما يجعل تنظيفها مستحيلاً بالطرق العادية.',
      'التهاب اللثة المزمن وانحسارها وتآكل العظام الفكية المحيطة بجذور الأسنان وسقوطها.',
      'رائحة فم كريهة وثابتة بسبب جفاف اللعاب وتكاثر البكتيريا اللاهوائية الضارة.',
      'زيادة خطر الإصابة بسرطان الفم واللسان والشفاه والبلعوم بأكثر من 6 أضعاف.'
    ],
    harmsEn: [
      'Deep chemical discoloration of dental enamel from tar and nicotine compounds.',
      'Chronic periodontitis, severe gum recession, and premature bone loss leading to tooth loss.',
      'Persistent halitosis (bad breath) caused by reduced saliva flow and anaerobic bacteria.',
      'More than 6-fold increase in oral cancers affecting the tongue, lips, gums, and pharynx.'
    ],
    recoveryTimelineAr: 'خلال 48 ساعة تتحسن حاسة التذوق والشم، وتتوقف التهابات اللثة عن التدهور وتبدأ بالشفاء.',
    recoveryTimelineEn: 'Within 48 hours taste buds and smell sharpen, oral inflammation subsides and gum tissues heal.',
    statsAr: 'المدخنون معرضون لفقدان أسنانهم بضعف معدل غير المدخنين، و75% من سرطانات الفم مرتبطة بالتبغ.',
    statsEn: 'Smokers are twice as likely to lose teeth, and 75% of oral cancers are linked directly to tobacco use.'
  },
  {
    id: 'vessels',
    nameAr: 'الأوعية الدموية والدورة الدموية',
    nameEn: 'Blood Vessels & Circulation',
    iconName: 'Gauge',
    severity: 'critical',
    summaryAr: 'تصلب الشرايين، ترسب الدهون، ضعف التروية في الأطراف، وزيادة خطر الجلطات والغرغرينا.',
    summaryEn: 'Arteriosclerosis, plaque accumulation, reduced peripheral circulation, clots, and vascular damage.',
    harmsAr: [
      'تلف البطانة الداخلية للأوعية الدموية (Endothelium)، مما يسهل التصاق صفائح الدم وتكون الجلطات.',
      'مرض الشرايين المحيطية (PAD) الذي يسبب برودة الأطراف وألماً حاداً عند المشي وقد ينتهي بالبتر.',
      'تضييق الشعيرات الدموية الدقيقة بنسبة تصل إلى 40% مباشرة بعد تدخين سيجارة واحدة.',
      'ضعف الانتصاب والعجز الجنسي لدى الرجال بسبب انسداد الأوعية الدموية المغذية للأعضاء الحيوية.'
    ],
    harmsEn: [
      'Damages vascular endothelial lining, accelerating fatty plaque deposits and arterial hardening.',
      'Peripheral Artery Disease (PAD) causing cold limbs, severe claudication, and amputation risk.',
      'Micro-capillaries constrict by up to 40% immediately after smoking a single cigarette.',
      'Major cause of erectile dysfunction and reduced fertility due to compromised pelvic blood supply.'
    ],
    recoveryTimelineAr: 'خلال 2 إلى 12 أسبوعاً تتحسن الدورة الدموية بشكل ملحوظ وتدفأ الأطراف وتختفي آلام المشي.',
    recoveryTimelineEn: 'Within 2 to 12 weeks circulation improves significantly, limbs warm up, and exercise stamina returns.',
    statsAr: 'التدخين هو السبب الأول للإصابة بمرض بورغر (Buerger Disease) الذي يؤدي لبتر أصابع اليدين والقدمين.',
    statsEn: 'Smoking is the primary causative factor of Buerger disease, frequently culminating in limb amputation.'
  },
  {
    id: 'respiratory',
    nameAr: 'الجهاز التنفسي والقصبات',
    nameEn: 'Respiratory System & Airways',
    iconName: 'Wind',
    severity: 'high',
    summaryAr: 'سعال المدخن المزمن، ضيق التنفس عند أدنى مجهود، التهابات الشعب المتكررة، ونوبات الربو.',
    summaryEn: 'Chronic smoker cough, breathlessness on minor exertion, recurring bronchitis, and asthma exacerbations.',
    harmsAr: [
      'التهاب الشعب الهوائية المزمن المصحوب بإفراز مفرط للمخاط وسعال صباحي مستمر.',
      'فقدان مرونة القفص الصدري وصعوبة أخذ نفس عميق ومريح حتى أثناء الراحة.',
      'زيادة شدة وحساسية نوبات الربو والحساسية الموسمية والعدوى الفيروسية مثل الإنفلونزا.',
      'تراكم السموم في الحنجرة والأحبال الصوتية مسبباً بحة دائمة وزيادة خطر أورام الحنجرة.'
    ],
    harmsEn: [
      'Chronic bronchitis with excessive phlegm production and agonizing morning smoker cough.',
      'Loss of thoracic elasticity, causing noticeable breathlessness even when climbing a few stairs.',
      'Heightened susceptibility to acute pneumonia, viral chest infections, and severe asthma attacks.',
      'Permanent damage to vocal cords and larynx, frequently causing raspiness and throat cancer.'
    ],
    recoveryTimelineAr: 'خلال 1 إلى 9 أشهر تنمو أهداب جديدة في القصبات الهوائية لتنقية الرئة وتنتهي نوبات السعال المزعجة.',
    recoveryTimelineEn: 'Within 1 to 9 months bronchi cilia fully regenerate, self-cleaning airways and eliminating chronic cough.',
    statsAr: 'سعة الرئة تتراجع لدى المدخنين بمعدل أسرع بثلاثة أضعاف مقارنة بالمعدل الطبيعي للشيخوخة.',
    statsEn: 'Smokers experience lung function decline at triple the natural rate seen in non-smoking aging.'
  },
  {
    id: 'general',
    nameAr: 'الصحة العامة والمناعة والجلد',
    nameEn: 'General Health, Immunity & Skin',
    iconName: 'ShieldAlert',
    severity: 'high',
    summaryAr: 'ضعف المناعة، تسارع تجاعيد وشيخوخة البشرة، ضعف الخصوبة، وهشاشة العظام واضطراب النوم.',
    summaryEn: 'Suppressed immune response, premature facial wrinkling, compromised fertility, and chronic insomnia.',
    harmsAr: [
      'تدمير الكولاجين والإيلاستين في الجلد، مما يؤدي إلى تجاعيد عميقة مبكرة وشحوب لون الوجه.',
      'تثبيط خلايا الدم البيضاء، مما يطيل مدة شفاء الجروح ويزيد من وتيرة الإصابة بالأمراض المعدية.',
      'تراجع الخصوبة لدى الرجال والنساء وزيادة مخاطر الإجهاض والتشوهات الجنينية أثناء الحمل.',
      'اضطراب مراحل النوم العميق بسبب أعراض انسحاب النيكوتين الليلية مما يسبب الإرهاق الدائم.'
    ],
    harmsEn: [
      'Destroys facial skin collagen and elastin, causing deep premature wrinkles and dull complexion.',
      'Suppresses immune white blood cells, drastically slowing wound healing and fighting infections.',
      'Reduces male and female fertility and elevates risks of complications and birth defects during pregnancy.',
      'Severely disrupts deep sleep cycles due to nocturnal micro-withdrawals, causing daytime fatigue.'
    ],
    recoveryTimelineAr: 'خلال أشهر يستعيد الجلد نضارته وتدفقه الدموي، وتستعيد المناعة قوتها لمكافحة الأمراض والعدوى.',
    recoveryTimelineEn: 'Within months, facial skin regains hydration and healthy tone, and immune defenses rebound vigorously.',
    statsAr: 'كل سيجارة تدخنها تقصر متوسط العمر المتوقع بمقدار 11 دقيقة من الحياة الصحية.',
    statsEn: 'Every single cigarette smoked is clinically estimated to subtract approximately 11 minutes of life.'
  }
];
