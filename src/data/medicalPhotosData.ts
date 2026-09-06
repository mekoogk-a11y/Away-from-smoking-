import { MedicalDamagePhoto } from '../types';

export const medicalDamagePhotos: MedicalDamagePhoto[] = [
  {
    id: 'photo-lungs',
    organKey: 'lungs',
    organName: {
      ar: 'الرئتان والشعب الهوائية',
      en: 'Lungs & Bronchial Pathways',
      fr: 'Poumons & Voies Bronchiques',
      ha: 'Huhu da Hanyoyin Numfashi',
      zh: '肺部与支气管通道'
    },
    damageName: {
      ar: 'ترسب القطران والانسداد الرئوي المزمن (COPD)',
      en: 'Tar Accumulation & Chronic Obstructive Pulmonary Disease (COPD)',
      fr: 'Accumulation de Goudron & Bronchopneumopathie Chronique Obstructive (BPCO)',
      ha: 'Tarawar Qazanta (Tar) da Matsalar Toshewar Numfashi (COPD)',
      zh: '焦油深层沉积与慢性阻塞性肺疾病 (COPD)'
    },
    explanation: {
      ar: 'تتسبب نواتج احتراق التبغ في شل الأهداب التنفسية وتراكم القطران السام داخل الحويصلات الهوائية، مما يؤدي إلى تدمير مرونة الرئة ونقص حاد في تبادل الأكسجين.',
      en: 'Inhaled tobacco combustion paralyzes respiratory cilia and coats alveolar air sacs in toxic tar residue, progressively destroying lung elasticity and impairing vital oxygen exchange.',
      fr: 'La combustion du tabac paralyse les cils vibratiles et tapisse les alvéoles de dépôts goudronneux toxiques, détruisant l’élasticité pulmonaire.',
      ha: 'Hayamakin taba na kashe kwayoyin tsaftace huhu da tara kwayoyin guba a cikin huhu, yana hana numfashi yadda ya kamata.',
      zh: '烟草燃烧产生的焦油与有毒颗粒麻痹支气管纤毛，淤积于肺泡深处，破坏肺弹性组织并严重削弱氧气弥散能力。'
    },
    clinicalDetails: {
      ar: 'تظهر الأشعة المقطعية تضخماً وتكلسات مع انخفاض سعة الزفير بنسبة تفوق 45%. فور الإقلاع، تبدأ الأهداب بالتجدد خلال أسبوعين.',
      en: 'CT scans exhibit alveolar hyperinflation and tissue scarring. Within 1 to 9 months of cessation, cilia regenerate, significantly decreasing cough and shortness of breath.',
      fr: 'Le scanner montre une distension alvéolaire et des cicatrices. Dès l’arrêt, les cils repoussent en 2 semaines, restaurant l’expectoration naturelle.',
      ha: 'Hoton asibiti na nuna lalacewar kwayoyin huhu. Cikin makonni biyu bayan dainawa, huhu na fara wankewa da murmurewa.',
      zh: 'CT影像清晰显示肺泡壁破坏与纤维化。戒烟2周至3个月内，肺功能逐渐增强，气道纤毛开始重新生长。'
    },
    // High-resolution realistic clinical lung CT / pathology photograph
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'منظمة الصحة العالمية (WHO) & American Thoracic Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/chronic-obstructive-pulmonary-disease-(copd)'
  },
  {
    id: 'photo-cardiovascular',
    organKey: 'cardiovascular',
    organName: {
      ar: 'القلب والشرايين التاجية',
      en: 'Heart & Coronary Arteries',
      fr: 'Cœur & Artères Coronaires',
      ha: 'Zuciya da Jijiyoyin Jini',
      zh: '心脏与冠状动脉血管'
    },
    damageName: {
      ar: 'تصلب الشرايين والتخثر التاجي الحاد',
      en: 'Atherosclerosis & Acute Coronary Thrombosis',
      fr: 'Athérosclérose & Thrombose Coronaire Aiguë',
      ha: 'Toshuwar Jijiyoyin Jini da Bugun Zuciya',
      zh: '动脉粥样硬化斑块与急性冠脉血栓'
    },
    explanation: {
      ar: 'يؤدي النيكوتين وأول أكسيد الكربون إلى تدمير بطانة الأوعية الدموية وتراكم اللويحات الدهنية القاتلة، مما يرفع ضغط الدم ويزيد خطر السكتات القلبية بأربعة أضعاف.',
      en: 'Nicotine and carbon monoxide erode the vascular endothelial lining, accelerating fatty plaque accretion, raising systemic blood pressure, and quadrupling myocardial infarction risk.',
      fr: 'Le monoxyde de carbone et la nicotine endommagent l’endothélium vasculaire, favorisant la formation de plaques d’athérome obstructives.',
      ha: 'Nicotine na kona bangon jijiyoyin jini da toshe hanyoyin tafiyar jini zuwa zuciya, wanda ke jawo bugun zuciya kwatsam.',
      zh: '烟草中的一氧化碳抢夺血红蛋白结合位点，尼古丁使血管持续痉挛并损伤血管内皮，加速脂质斑块沉着与血栓形成。'
    },
    clinicalDetails: {
      ar: 'تظهر قسطرة الشرايين تضيقاً حاداً في مجرى الدم. خلال 24 ساعة فقط من الإقلاع، ينخفض خطر الإصابة بنوبة قلبية حادة بشكل ملحوظ.',
      en: 'Coronary angiograms reveal critical vascular narrowing. Remarkably, 24 hours post-cessation, myocardial infarction risk begins its measurable decline.',
      fr: 'La coronarographie démontre un rétrécissement luminal critique. En 24h après la dernière cigarette, le risque d’infarctus amorce déjà sa baisse.',
      ha: 'Bayan sa\'o\'i 24 kacal da daina shan taba, hadarin bugun zuciya na fara raguwa sosai.',
      zh: '冠状动脉造影可见血管管腔狭窄。戒烟仅24小时后，急性心肌梗死发病风险即呈断崖式显著回落。'
    },
    // High-resolution clinical angiogram / cardiac medicine photograph
    imageUrl: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'Centers for Disease Control and Prevention (CDC) & American Heart Association',
    sourceUrl: 'https://www.cdc.gov/tobacco/basic_information/health_effects/heart_disease/index.htm'
  },
  {
    id: 'photo-brain',
    organKey: 'brain',
    organName: {
      ar: 'الدماغ والجهاز العصبي المركزي',
      en: 'Brain & Central Nervous System',
      fr: 'Cerveau & Système Nerveux Central',
      ha: 'Kwakwalwa da Hanyoyin Jin Dadi',
      zh: '大脑中枢神经与脑血管'
    },
    damageName: {
      ar: 'نقص التروية الدماغية والجلطات الإقفارية',
      en: 'Cerebral Ischemia & Ischemic Stroke',
      fr: 'Ischémie Cérébrale & Accident Vasculaire Cérébral (AVC)',
      ha: 'Shanyewar Bangaren Jiki da Rashin Isar Jini Kwakwalwa',
      zh: '脑缺血、微动脉瘤与缺血性脑卒中（中风）'
    },
    explanation: {
      ar: 'يسبب التدخين تضيق الشرايين السباتية وتجلط الدم الدماغي واختلال مستقبلات الدوبامين، مما يزيد خطر السكتة الدماغية بنسبة 200% ويسبب ضمور القشرة المخية المبكر.',
      en: 'Chronic smoking constricts carotid and cerebral arteries while altering neural dopamine receptors, doubling stroke risk and hastening premature cortical thinning.',
      fr: 'Le tabagisme entraîne une sténose carotidienne, augmente la viscosité sanguine et multiplie par deux le risque d’AVC ischémique.',
      ha: 'Shan taba na rage isar jini mai tsafta zuwa kwakwalwa, yana ninka hadarin shanyewar jiki (stroke) sau biyu.',
      zh: '烟碱使脑微血管内皮增厚硬化，血小板异常聚集，导致脑供血不足，中风风险提高至常人的2至4倍。'
    },
    clinicalDetails: {
      ar: 'يُظهر الرنين المغناطيسي تراجع التروية في الفصوص الجبهية. بعد 5 سنوات من الإقلاع، ينخفض خطر الجلطة الدماغية ليعادل غير المدخن.',
      en: 'Brain MRI reveals hypoperfusion in frontoparietal territories. Five years after quitting, the risk of stroke drops to that of a non-smoker.',
      fr: 'L’IRM cérébrale montre une perfusion compromise. 5 ans après le sevrage, le risque d’AVC rejoint celui d’un non-fumeur.',
      ha: 'Bayan shekaru 5 da daina shan taba, hadarin shanyewar jiki na daidaita kamar mutumin da bai taba sha ba.',
      zh: '脑部核磁共振成像显示皮层灌注量显著降低。戒烟5年后，脑卒中发生概率可回落至非吸烟者基准水平。'
    },
    // High-resolution clinical neuro-imaging / MRI brain scan photo
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'National Institutes of Health (NIH) & World Stroke Organization',
    sourceUrl: 'https://www.stroke.org/en/about-stroke/stroke-risk-factors/smoking-and-stroke'
  },
  {
    id: 'photo-teeth',
    organKey: 'teeth',
    organName: {
      ar: 'الأسنان واللثة وتجويف الفم',
      en: 'Teeth, Gums & Oral Cavity',
      fr: 'Dents, Gencives & Cavité Buccale',
      ha: 'Hakora, Dasashi da Baki',
      zh: '牙齿、牙周与口腔黏膜'
    },
    damageName: {
      ar: 'التهاب دواعم السن الحاد وتراجع اللثة وتلون المينا',
      en: 'Severe Periodontitis, Bone Loss & Enamel Pigmentation',
      fr: 'Parodontite Sévère, Déchaussement & Colorations',
      ha: 'Lalacewar Dasashi, Zubar Hakora da Batar Launin Hakori',
      zh: '重度牙周炎、齿槽骨吸收与不可逆色素沉淀'
    },
    explanation: {
      ar: 'تحرم السموم الفموية أنسجة اللثة من الأكسجين، مما يؤدي إلى تعفن بكتيري عميق، تخلخل الأسنان وتساقطها، ورائحة فم كريهة دائمة مع تشكل بقع صفراء وسوداء.',
      en: 'Oral toxic exposure starves gingival microcapillaries of oxygen, enabling destructive anaerobic bacterial growth, alveolar bone destruction, and widespread tooth loss.',
      fr: 'Le tabac altère la vascularisation gingivale, favorise la prolifération de bactéries anaérobies agressives et conduit à la perte prématurée des dents.',
      ha: 'Gubar taba na hana jini shiga dasashi, yana sa kwayoyin cuta cinye dasashin har hakora su fara zubewa.',
      zh: '高温烟雾直击口腔黏膜，破坏牙周微循环防御屏障，加剧厌氧菌深部侵袭，引发牙槽骨吸收、牙齿松动脱落与顽固口臭。'
    },
    clinicalDetails: {
      ar: 'المدخنون أكثر عرضة لخلع الأسنان بـ 6 أضعاف. فور التوقف، تتحسن الدورة الدموية في اللثة ويتوقف نزيف الأنسجة ويبدأ الفم باستعادة نظافته.',
      en: 'Smokers are 6 times more likely to lose teeth to periodontitis. Stopping smoking immediately halts accelerated bone resorption and restores oral mucosal defenses.',
      fr: 'Les fumeurs ont 6 fois plus de risques d’édentation parodontale. L’arrêt stoppe net l’ostéolyse alvéolaire.',
      ha: 'Masu shan taba sun fi fuskantar zubar hakora sau 6. Barin taba na sa dasashi ya dawo da kariyarsa.',
      zh: '临床统计显示重度吸烟者牙周破坏发生率比非吸烟者高出6倍。戒烟后口腔局部免疫即刻启动自愈修复。'
    },
    // High-resolution realistic clinical dentistry photograph
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'World Health Organization (WHO) & American Dental Association',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/oral-health'
  },
  {
    id: 'photo-throat',
    organKey: 'throat',
    organName: {
      ar: 'الحلق والحنجرة والأحبال الصوتية',
      en: 'Throat, Larynx & Vocal Cords',
      fr: 'Gorge, Larynx & Cordes Vocales',
      ha: 'Makoqoro da Hanyar Magana',
      zh: '喉部、声带与咽腔黏膜'
    },
    damageName: {
      ar: 'التهاب الحنجرة المزمن، الطلاوة، وخشونة الصوت',
      en: 'Chronic Laryngitis, Leukoplakia & Dysphonia',
      fr: 'Laryngite Chronique, Leucoplasie & Dysphonie',
      ha: 'Ciwon Makoqoro na Dindindin da Canzawon Murya',
      zh: '慢性喉炎、声带水肿充血与黏膜白斑病变'
    },
    explanation: {
      ar: 'يتعرض الغشاء المخاطي للحنجرة لحرارة تتجاوز 60 درجة مئوية مع مركبات كيميائية مسرطنة، مما يسبب التهاباً مزمناً وتورم الأحبال الصوتية وظهور تقرحات ما قبل السرطان (Leukoplakia).',
      en: 'Direct thermal shock combined with carcinogenic volatile compounds induces severe mucosal metaplasia, chronic laryngeal edema, and premalignant leukoplakia lesions.',
      fr: 'L’agression thermique répétée et les carcinogènes entraînent un œdème permanent des cordes vocales et des plaques leucoplasiques précancéreuses.',
      ha: 'Zafin hayakin taba na kona fatar makoqoro da canza murya, kuma yana iya haifar da ciwon daji a makoqoro.',
      zh: '烟气瞬时高温夹带多环芳烃反复灼伤喉黏膜，导致声带黏膜充血、肥厚、变脆，极易诱发癌前病变（喉白斑）。'
    },
    clinicalDetails: {
      ar: 'يُظهر تنظير الحنجرة احمراراً حاداً وزوائد ليفية. بعد شهر من الإقلاع، يختفي تورم الأحبال وتستعيد نبرة صوتك نقاءها الطبيعي.',
      en: 'Laryngoscopy highlights vocal fold swelling and mucosal hyperkeratosis. Within 1 month of tobacco abstinence, vocal pitch clears and chronic throat clearing subsides.',
      fr: 'La laryngoscopie met en évidence un érythème et des exsudats. Le sevrage permet une régression notable de l’œdème en quelques semaines.',
      ha: 'Bayan wata daya da barin taba, kumburin makoqoro na sauka sannan muryar mutum na dawo da tsabtarta.',
      zh: '电子喉镜下可见声带充血肿胀及黏膜角化增生。戒烟1个月后充血水肿逐渐消退，声带闭合恢复平稳。'
    },
    // High-resolution clinical ENT medical examination photo
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'International Agency for Research on Cancer (IARC / WHO)',
    sourceUrl: 'https://monographs.iarc.who.int/list-of-classifications'
  },
  {
    id: 'photo-respiratory',
    organKey: 'respiratory',
    organName: {
      ar: 'المجاري التنفسية العلوية والسفلية',
      en: 'Trachea & Upper Airway Tract',
      fr: 'Trachée & Voies Aériennes Supérieures',
      ha: 'Hanyoyin Numfashi na Sama da Qasa',
      zh: '气管与上下呼吸道气道'
    },
    damageName: {
      ar: 'التهاب القصبات الهوائية والبلغم المزمن والربو المتفاقم',
      en: 'Chronic Bronchitis, Mucus Hypersecretion & Airway Reactivity',
      fr: 'Bronchite Chronique & Hypersécrétion Muqueuse',
      ha: 'Mura mai Tsanani da Tari mai Majina a Kirji',
      zh: '慢性支气管黏膜炎与高反应性黏液高分泌'
    },
    explanation: {
      ar: 'يؤدي التدخين إلى تضخم الغدد المفرزة للمخاط وانسداد القصبات، مما يسبب السعال الصباحي المزمن وضيق التنفس عند أدنى مجهود بدني.',
      en: 'Mucous gland hypertrophy triggered by cigarette smoke causes excessive airway phlegm, chronic morning cough, and exercise-limiting bronchial constriction.',
      fr: 'L’hypertrophie des glandes sous-muqueuses provoque un encombrement bronchique chronique, une toux matinale invalidante et un essoufflement rapide.',
      ha: 'Taba na sa taruwar majina mai yawa a hanyar numfashi, yana haifar da tari da wahalar numfashi yayin tafiya ko aiki.',
      zh: '气道杯状细胞在有毒烟雾刺激下代偿性增生肥大，产生大量黏稠痰液，形成长期晨起咳嗽、咳痰及气道狭窄。'
    },
    clinicalDetails: {
      ar: 'اختبار وظائف الرئة (Spirometry) يثبت هبوطاً حاداً في FEV1. الإقلاع يعيد تدفق الهواء الطبيعي ويقلل نوبات الربو والعدوى الصدرية.',
      en: 'Spirometry demonstrably records sharp drops in FEV1 air volumes. Cessation halts accelerated FEV1 loss and dramatically reduces secondary chest infections.',
      fr: 'La spirométrie confirme une baisse sévère du VEMS. L’arrêt stabilise la fonction respiratoire et prévient les surinfections pulmonaires.',
      ha: 'Gwajin numfashi na nuna raguwar karfin shakar iska. Barin taba na kare jiki daga kamuwa da ciwon kirji.',
      zh: '肺功能通气测试（Spirometry）显示第一秒用力呼气容积（FEV1）加速衰减。戒烟能迅速遏制肺功能的进行性恶化。'
    },
    // High-resolution realistic pulmonology clinical examination photograph
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD)',
    sourceUrl: 'https://goldcopd.org/'
  },
  {
    id: 'photo-skin',
    organKey: 'skin',
    organName: {
      ar: 'الجلد والبشرة والشعيرات الدقيقة',
      en: 'Skin, Dermal Capillaries & Microcirculation',
      fr: 'Peau, Capillaires & Microcirculation',
      ha: 'Fata da Jini a Karkashin Fata',
      zh: '皮肤微循环与真皮层胶原蛋白'
    },
    damageName: {
      ar: 'شيخوخة الجلد المبكرة وتكسر الكولاجين وشحوب الوجه',
      en: 'Premature Cutaneous Aging, Collagen Degradation & Smoker’s Face',
      fr: 'Vieillissement Cutané Prématuré & Dégradation du Collagène',
      ha: 'Tsufan Fata Kafin Lokaci da Qullewar Fuska',
      zh: '真皮胶原交联断裂、过早光老化与烟草面容'
    },
    explanation: {
      ar: 'يحرم النيكوتين الجلد من المغذيات والأكسجين عبر تضييق الشعيرات الدموية، وتدمر الجذور الحرة ألياف الكولاجين والإيلاستين، مما يسرع ظهور التجاعيد العميقة وجفاف البشرة وترهلها.',
      en: 'Nicotine causes intense microvascular vasoconstriction, depriving skin cells of oxygen and micronutrients while matrix metalloproteinases destroy youthful collagen and elastin fibers.',
      fr: 'La vasoconstriction cutanée chronique prive la peau d’oxygène et de nutriments essentiels, accélérant la perte de collagène et le creusement des rides.',
      ha: 'Shan taba na hana jini shiga fatar jiki yadda ya kamata, yana sa fata bushewa da tsufa da sauri kafin shekaru su ja.',
      zh: '尼古丁促使真皮毛细血管强烈收缩，局部血氧饱和度骤降，基质金属蛋白酶过表达加速胶原原纤维断裂，面部提前出现深度皱纹与暗沉。'
    },
    clinicalDetails: {
      ar: 'تُظهر التحليلات الجلدية انخفاض ترطيب البشرة بنسبة 40%. بعد الإقلاع ببضعة أسابيع، تعود التروية الوردية وتستعيد خلايا البشرة نضارتها الطبيعية.',
      en: 'Dermatological imaging demonstrates profound microcirculation deficits. Within weeks of quitting, cutaneous perfusion rebounds, restoring healthy skin tone and vitality.',
      fr: 'L’analyse cutanée montre une baisse d’élasticité de 40%. Après le sevrage, le teint s’éclaircit et retrouve son éclat en quelques semaines.',
      ha: "Bayan 'yan makonni da daina taba, jini na fara shiga fatar fuska kuma fuskarka na sake yin haske da lafiya.",
      zh: '皮肤微循环成像显示真皮毛细血管充盈不良。戒烟仅数周后，面部血液微循环明显回暖，肌肤色泽与弹性逐步重现。'
    },
    // High-resolution dermatology clinical photograph
    imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f5076eb43df?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'British Association of Dermatologists & Mayo Clinic Dermatology',
    sourceUrl: 'https://www.bad.org.uk/'
  },
  {
    id: 'photo-cancer',
    organKey: 'cancer',
    organName: {
      ar: 'أعضاء الجسم المعرضة لخطر السرطان',
      en: 'Organs Affected by Tobacco-Induced Malignancies',
      fr: 'Organes Vulnérables aux Cancers Induits par le Tabac',
      ha: 'Gabobin da Ciwon Daji ke Shafa Saboda Taba',
      zh: '烟草诱发恶性肿瘤受累多器官'
    },
    damageName: {
      ar: 'طفرات الحمض النووي (DNA) وتسرطن الخلايا المتعددة',
      en: 'DNA Carcinogen Adducts & Multi-Organ Oncogenesis',
      fr: 'Mutations de l’ADN & Cancérogenèse Multi-Organes',
      ha: 'Sauyin Kwayoyin Halitta da Ciwon Daji',
      zh: '致癌物DNA加合物与全身多器官恶性转化'
    },
    explanation: {
      ar: 'يحتوي دخان التبغ على أكثر من 70 مادة مسرطنة مؤكدة (كالنيتروزامين والبنزوبيرين) التي تحدث طفرات غير قابلة للإصلاح في جينات الجسم، مسببة سرطانات الرئة والمثانة والبنكرياس والمريء.',
      en: 'Tobacco smoke contains over 70 established group-1 carcinogens (such as nitrosamines and polycyclic aromatic hydrocarbons) that bind directly to cellular DNA, initiating malignant mutations.',
      fr: 'La fumée de cigarette contient plus de 70 substances cancérigènes avérées causant des mutations irréversibles de l’ADN dans les poumons, la vessie et le pancréas.',
      ha: 'Hayakin taba na dauke da sinadarai sama da 70 da ke jawo ciwon daji a sassa daban-daban na jiki kamar huhu, mafitsara da ciki.',
      zh: '烟草烟雾中富含70余种明确的1类致癌物（如特异性亚硝胺NNK与苯并芘），直接诱导DNA加合物形成及抑癌基因突变，涉及肺、膀胱、胰腺等十余种恶性肿瘤。'
    },
    clinicalDetails: {
      ar: 'تُظهر دراسات منظمة الصحة العالمية أن التدخين مسؤول عن 85% من سرطانات الرئة و50% من سرطانات المثانة. الإقلاع المبكر يمنع 90% من خطر الطفرات السرطانية مستقبلاً.',
      en: 'WHO and IARC data confirm tobacco causes 85% of all lung cancers and 50% of urothelial carcinomas. Early cessation cuts cumulative lifetime cancer incidence by over 80%.',
      fr: 'L’OMS confirme que le tabac est responsable de 85% des cancers du poumon. L’arrêt précoce réduit considérablement la survenue de nouvelles mutations malignes.',
      ha: 'Binciken WHO ya nuna taba ce ke jawo kashi 85 cikin dari na ciwon dajin huhu. Daina taba da wuri na kare rayuwarka.',
      zh: '世卫组织与国际癌症研究机构明确指出，85%的肺癌及50%的膀胱癌与烟草直接相关。及早戒烟可显著逆转癌前微环境恶化。'
    },
    // High-resolution clinical oncology histology / medical laboratory microscope photography
    imageUrl: 'https://images.unsplash.com/photo-1579165466791-788226ab77b6?auto=format&fit=crop&w=1200&q=80',
    sourceName: 'International Agency for Research on Cancer (IARC) & WHO Monographs',
    sourceUrl: 'https://monographs.iarc.who.int/'
  }
];
