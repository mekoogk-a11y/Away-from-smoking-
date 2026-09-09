import { MagazineArticle } from '../types';

export const magazineArticles: MagazineArticle[] = [
  {
    id: 'art-why-harmful',
    slug: 'why-smoking-is-harmful-the-chemistry-of-destruction',
    title: {
      en: 'The Chemistry of Combustion: Why Inhaled Smoke is Uniquely Destructive',
      ar: 'كيمياء الاحتراق القاتل: لماذا يعتبر استنشاق دخان التبغ مدمراً لخلايا الجسم؟',
      fr: 'La chimie de la combustion : pourquoi la fumée inhalée est si destructrice',
      es: 'La química de la combustión: Por qué el humo inhalado es tan destructivo',
      pt: 'A química da combustão: Por que a fumaça inalada é tão destrutiva',
      de: 'Die Chemie der Verbrennung: Warum inhalierter Rauch so zerstörerisch ist',
      zh: '燃烧的致命化学：为何吸入烟草烟雾对机体具有毁灭性打击',
      ja: '燃焼の致死化学：なぜ吸い込む煙はこれほど破壊的なのか',
      ru: 'Химия горения: почему вдыхаемый табачный дым разрушает организм',
      tr: 'Yanmanın Ölümcül Kimyası: Solunan duman neden bu kadar yıkıcıdır?',
      hi: 'दहन का घातक रसायन: सांस में लिया गया धुआं इतना विनाशकारी क्यों है?',
      ur: 'جلنے کا جان لیوا عمل: سگریٹ کا دھواں انسانی خلیوں کو کیسے تباہ کرتا ہے؟'
    },
    subtitle: {
      en: 'An in-depth medical examination into the 7,000 chemicals, volatile organic compounds, and heavy metals unleashed in every puff.',
      ar: 'تحليل طبي دقيق لأكثر من 7000 مادة كيميائية ومركبات عضوية ومعادن ثقيلة يطلقها كل احتراق للتبغ في الشرايين والرئتين.',
      fr: 'Examen médical approfondi des 7 000 substances chimiques libérées à chaque bouffée.',
      es: 'Examen médico de las 7.000 sustancias químicas liberadas en cada inhalación.',
      pt: 'Exame médico das 7.000 substâncias químicas liberadas a cada tragada.',
      de: 'Tiefgehende Untersuchung der 7.000 Chemikalien bei jedem Zug.',
      zh: '深度医学解析：每一口烟雾中所释放的7000余种化学复合物、挥发性有机毒物与剧毒重金属。',
      ja: '一服ごとに解き放たれる7,000種以上の化学物質、揮発性化合物、重金属の医学的検証。',
      ru: 'Медицинский анализ 7000 химических соединений, попадающих в организм с каждой затяжкой.',
      tr: 'Her nefeste açığa çıkan 7.000 kimyasal ve ağır metalin derinlemesine tıbbi incelemesi.',
      hi: 'हर कश में निकलने वाले 7,000 रसायनों और भारी धातुओं की विस्तृत चिकित्सकीय जांच।',
      ur: 'ہر کش سے خارج ہونے والے 7000 زہریلے کیمیکلز کا ایک جامع طبی تجزیہ۔'
    },
    category: 'Smoking Risks',
    categoryLabel: {
      en: 'Smoking Risks',
      ar: 'مخاطر التدخين',
      fr: 'Risques du Tabagisme',
      es: 'Riesgos del Tabaquismo',
      pt: 'Riscos do Tabagismo',
      de: 'Raucherrisiken',
      zh: '吸烟风险',
      ja: '喫煙リスク',
      ru: 'Риски курения',
      tr: 'Sigara Riskleri',
      hi: 'धूम्रपान के जोखिम',
      ur: 'تمباکو کے خطرات'
    },
    readTimeMinutes: 5,
    author: 'Medical Editorial Board | BEYOND SMOKING',
    datePublished: '2026-09-01',
    featured: true,
    paragraphs: {
      en: [
        'When a cigarette is ignited, the tip burns at temperatures surpassing 800 degrees Celsius. This thermochemical furnace converts cured tobacco leaves and additive chemicals into a dense aerosol containing over 7,000 compounds, including at least 69 established human carcinogens.',
        'Among the most immediately toxic gases is carbon monoxide. Because carbon monoxide binds to blood hemoglobin roughly 200 times more strongly than oxygen, it forms carboxyhemoglobin, effectively suffocating cells and forcing the heart to pump at an exhausting overload simply to sustain basal metabolism.',
        'Simultaneously, microscopic particulate matter (tar) condenses along the delicate epithelial lining of the bronchi and alveoli. This sticky dark residue paralyzes the cilia—the cellular hair-like sweepers responsible for purging dirt and bacteria—leaving the lungs open to infection, mutation, and irreversible structural damage.',
        'Quitting smoking extinguishes this constant chemical bombardment. Within hours, hemoglobin freed from carbon monoxide regains its full oxygen capacity, and cellular repair genes reactivate.'
      ],
      ar: [
        'عند إشعال السيجارة، تحترق مقدمتها عند درجات حرارة تتجاوز 800 درجة مئوية. هذا الفرن الكيميائي الحراري يحول أوراق التبغ المعالجة والمواد المضافة إلى رذاذ كثيف يضم أكثر من 7000 مركب كيميائي، منها ما لا يقل عن 69 مادة مسرطنة مؤكدة علمياً للبشر.',
        'من أخطر الغازات الفورية أول أكسيد الكربون، الذي يرتبط بهيموغلوبين الدم بقوة تفوق الأكسجين بمقدار 200 ضعف تقريباً. هذا الارتباط يكوّن الكربوكسي هيموغلوبين، حارماً الأنسجة الحيوية من الأكسجين، ومجبراً عضلة القلب على النبض بمجهود مضاعف ومرهق لمجرد تسيير العمليات الأساسية.',
        'في الوقت ذاته، تتكثف الجسيمات الدقيقة اللزجة المعروفة بالقطران على البطانة الحساسة للشعب الهوائية والحويصلات الرئوية. هذا القطران الأسود يشل حركة الأهداب التنفسية المسؤولة عن طرد الشوائب والميكروبات، مما يترك الرئة عرضة للالتهابات والطفرات الجينية المستمرة.',
        'قرار الإقلاع يوقف هذا القصف الكيميائي العنيف فوراً. وفي غضون ساعات قليلة، يتحرر الهيموغلوبين ليستعيد قدرته التامة على حمل الأكسجين، وتبدأ جينات الترميم الخلوي عملها الدؤوب.'
      ],
      fr: [
        'Lorsqu’une cigarette est allumée, le foyer dépasse les 800 degrés Celsius. Cette combustion transforme le tabac en un aérosol toxique de 7 000 composés, dont 69 cancérogènes avérés.',
        'Le monoxyde de carbone inhalé se lie à l’hémoglobine 200 fois plus vite que l’oxygène, privant les organes d’oxygène et surchargeant le cœur.',
        'Le goudron paralyse les cils respiratoires, laissant les poumons sans défense face aux infections et aux mutations cellulaires.',
        'Arrêter de fumer stoppe ce bombardement chimique et permet une régénération cellulaire rapide.'
      ],
      es: [
        'Al encender un cigarrillo, la temperatura supera los 800 grados, generando más de 7.000 compuestos químicos y 69 carcinógenos comprobados.',
        'El monóxido de carbono asfixia las células al unirse a la hemoglobina con 200 veces más afinidad que el oxígeno, sobrecargando el corazón.',
        'El alquitrán paraliza los cilios protectores de las vías respiratorias, facilitando inflamaciones y mutaciones graves.',
        'Dejar de fumar detiene esta agresión y devuelve de inmediato el oxígeno vital a cada célula.'
      ],
      pt: [
        'A queima do cigarro atinge mais de 800 graus Celsius, liberando 7.000 substâncias químicas tóxicas e dezenas de cancerígenos comprovados.',
        'O monóxido de carbono rouba o lugar do oxigênio na hemoglobina, sobrecarregando o coração e privando tecidos nobres.',
        'O alcatrão paralisa os cílios protetores dos pulmões, acumulando resíduos tóxicos e destruindo alvéolos.',
        'Parar de fumar interrompe essa destruição e reativa a regeneração celular em poucas horas.'
      ],
      de: [
        'Bei einer brennenden Zigarette entstehen bei über 800 °C mehr als 7.000 Chemikalien, darunter mindestens 69 bekannte Krebserreger.',
        'Kohlenmonoxid bindet 200-mal stärker an Hämoglobin als Sauerstoff und zwingt das Herz zu gefährlicher Dauerüberlastung.',
        'Teer lähmt die Flimmerhärchen in den Bronchien, wodurch Bakterien und Schadstoffe ungehindert ins Gewebe eindringen.',
        'Mit dem Aufhören endet dieser Dauerangriff sofort, und die Sauerstoffversorgung normalisiert sich rasch.'
      ],
      zh: [
        '点燃香烟时，燃烧中心温度高达800摄氏度以上。剧烈热解反应将烟叶与添加剂化为含有7000余种化合物的浓烈气溶胶，其中含至少69种明确人类致癌物。',
        '高浓度一氧化碳与血红蛋白的结合能力比氧气高约200倍，剥夺组织供氧，强迫心脏以超负荷剧烈泵血来维持基本生存运转。',
        '黑色粘稠焦油微粒大量沉积在支气管与肺泡壁，彻底麻痹上皮纤毛清除系统，使肺部完全丧失自洁防线。',
        '戒烟的坚决指令能瞬间掐断这场化学狂轰滥炸。数小时内，血红蛋白重获携氧生机，细胞修复机制全面重启。'
      ],
      ja: [
        'タバコが点火されると800度を超える高温で燃焼し、7,000種以上の化合物と69種以上の発がん物質を発生させます。',
        '一酸化炭素は酸素の約200倍の強さでヘモグロビンと結合し、全身の細胞を酸欠に追い込み心臓を酷使します。',
        'タールが気道の線毛運動を麻痺させ、細菌や有害物質が肺の奥深くに直接蓄積してしまいます。',
        '禁煙によってこの化学的攻撃は即座に停止し、わずか数時間で細胞の修復プロセスが始まります。'
      ],
      ru: [
        'При курении температура сигареты превышает 800 °C, выделяя более 7000 химикатов и не менее 69 подтвержденных канцерогенов.',
        'Угарный газ связывается с гемоглобином в 200 раз сильнее кислорода, вызывая кислородное голодание органов и перегрузку сердца.',
        'Смолы парализуют реснички дыхательных путей, лишая легкие природной способности к самоочищению.',
        'Отказ от курения останавливает токсический стресс, возвращая органам нормальный уровень кислорода уже через несколько часов.'
      ],
      tr: [
        'Yanan bir sigaranın ucu 800 derecenin üzerine çıkar ve 7.000 kimyasal bileşik ile 69 kanserojen madde açığa çıkarır.',
        'Karbonmonoksit, oksijenden 200 kat daha güçlü şekilde hemoglobine bağlanarak dokuları oksijensiz bırakır ve kalbi yorar.',
        'Katran, solunum yollarındaki temizleyici tüycükleri felç ederek akciğerleri savunmasız bırakır.',
        'Sigarayı bırakmak bu kimyasal bombardımanı hemen durdurur ve vücut saatler içinde iyileşmeye başlar.'
      ],
      hi: [
        'सिगरेट जलने पर 800 डिग्री से अधिक तापमान होता है, जिससे 7,000 रसायन और 69 कैंसरकारी तत्व निकलते हैं।',
        'कार्बन मोनोऑक्साइड ऑक्सीजन की तुलना में 200 गुना अधिक मजबूती से हीमोग्लोबिन से बंधती है, जिससे हृदय पर अत्यधिक दबाव पड़ता है।',
        'तारकोल फेफड़ों की सफाई करने वाली सिलिया को पंगु बना देता है, जिससे फेफड़े संक्रमण और क्षति के शिकार हो जाते हैं।',
        'धूम्रपान छोड़ना इस विनाश को तुरंत रोकता है और कोशिकाओं को पुनर्जीवित होने का अवसर देता है।'
      ],
      ur: [
        'سگریٹ سلگنے پر 800 ڈگری سینٹی گریڈ سے زیادہ درجہ حرارت پر 7000 سے زائد خطرناک کیمیکلز اور 69 کینسر پیدا کرنے والے مادے پیدا ہوتے ہیں۔',
        'کاربن مونو آکسائیڈ آکسیجن سے 200 گنا تیزی سے خون میں شامل ہو کر خلیوں کا دم گھوٹتی ہے اور دل پر ناقابل برداشت بوجھ ڈالتی ہے۔',
        'سیاہ تارکول پھیپھڑوں کی صفائی کے قدرتی نظام کو ناکارہ بنا کر انہیں بیماریوں کے رحم و کرم پر چھوڑ دیتا ہے۔',
        'سگریٹ چھوڑنے کا فیصلہ اس کیمیائی حملے کو فوری روکتا ہے اور چند گھنٹوں میں خلیات کا علاج شروع ہو جاتا ہے۔'
      ]
    },
    keyTakeaways: {
      en: [
        'Over 7,000 chemical compounds are inhaled in every puff.',
        'Carbon monoxide severely cuts arterial oxygen delivery by binding to hemoglobin.',
        'Ciliary paralysis caused by tar leaves airways defenseless against chronic disease.'
      ],
      ar: [
        'أكثر من 7000 مركب كيميائي سام يستنشقها المدخن مع كل سحبة.',
        'أول أكسيد الكربون يقلص تدفق الأكسجين للأنسجة بارتباطه الشره بالهيموغلوبين.',
        'شل الأهداب التنفسية بسبب القطران يترك الرئة مكشوفة أمام العدوى والسرطان.'
      ],
      fr: [
        'Plus de 7 000 composés toxiques sont inhalés à chaque bouffée.',
        'Le monoxyde de carbone réduit l’apport en oxygène aux organes vitaux.',
        'La paralysie des cils par le goudron empêche le nettoyage des poumons.'
      ],
      es: [
        'Más de 7.000 sustancias químicas son inhaladas en cada calada.',
        'El monóxido de carbono asfixia los tejidos al bloquear la hemoglobina.',
        'El alquitrán destruye la limpieza natural de las vías respiratorias.'
      ],
      pt: [
        'Mais de 7.000 compostos químicos são inalados a cada tragada.',
        'O monóxido de carbono bloqueia gravemente o oxigênio celular.',
        'O alcatrão destrói os mecanismos de autolimpeza dos pulmões.'
      ],
      de: [
        'Über 7.000 chemische Stoffe werden mit jedem Zug eingeatmet.',
        'Kohlenmonoxid blockiert den lebenswichtigen Sauerstofftransport im Blut.',
        'Teerablagerungen zerstören das natürliche Selbstreinigungssystem der Lunge.'
      ],
      zh: [
        '每一口烟雾直接释放超过7000种有毒化合物进入肺部与血液。',
        '一氧化碳强力霸占血红蛋白，导致全身细胞陷入严重缺氧慢性窒息。',
        '焦油麻痹气道纤毛摆动，摧毁呼吸道天然自洁与免疫屏障。'
      ],
      ja: [
        '一服で7,000種以上の有害化合物が体内に吸い込まれます。',
        '一酸化炭素がヘモグロビンを奪い、全身の酸素供給を阻害します。',
        'タールが線毛を麻痺させ、気道の自然な浄化機能を破壊します。'
      ],
      ru: [
        'Более 7000 химических соединений попадают в организм с каждой затяжкой.',
        'Угарный газ блокирует перенос кислорода к жизненно важным органам.',
        'Смолы парализуют реснички, лишая легкие природной защиты.'
      ],
      tr: [
        'Her nefeste 7.000\'den fazla kimyasal bileşik solunur.',
        'Karbonmonoksit hemoglobini bağlayarak dokuların oksijenlenmesini engeller.',
        'Katran, akciğerin kendini temizleme mekanizmasını tamamen yok eder.'
      ],
      hi: [
        'प्रत्येक कश में 7,000 से अधिक रासायनिक यौगिक शरीर में प्रवेश करते हैं।',
        'कार्बन मोनोऑक्साइड हीमोग्लोबिन से जुड़कर ऑक्सीजन की आपूर्ति को गंभीर रूप से घटाती है।',
        'तारकोल फेफड़ों की प्राकृतिक सफाई प्रणाली को नष्ट कर देता है।'
      ],
      ur: [
        'ہر کش میں 7000 سے زائد زہریلے کیمیکلز جسم میں داخل ہوتے ہیں۔',
        'کاربن مونو آکسائیڈ خون میں آکسیجن کی فراہمی کو بری طرح متاثر کرتی ہے۔',
        'تارکول پھیپھڑوں کے قدرتی دفاعی نظام کو تباہ کر دیتا ہے۔'
      ]
    }
  },
  {
    id: 'art-nicotine-neurobiology',
    slug: 'the-nicotine-illusion-how-the-brain-is-hijacked',
    title: {
      en: 'The Neurobiology of Nicotine: Breaking the Dopamine Trap',
      ar: 'بيولوجيا النيكوتين العصبية: كيف تفكك فخ الدوبامين والوهم النفسي؟',
      fr: 'La neurobiologie de la nicotine : briser le piège de la dopamine',
      es: 'La neurobiología de la nicotina: Rompiendo la trampa de la dopamina',
      pt: 'A neurobiologia da nicotina: Quebrando a armadilha da dopamina',
      de: 'Die Neurobiologie des Nikotins: Die Dopaminfalle überwinden',
      zh: '尼古丁神经生物学破局：打破多巴胺陷阱与伪放松假象',
      ja: 'ニコチンの神経生物学：ドーパミンの罠と偽りのリラックスを打破する',
      ru: 'Нейробиология никотина: как вырваться из дофаминовой ловушки',
      tr: 'Nikotinin Nörobiyolojisi: Dopamin tuzağını ve yanılsamayı kırmak',
      hi: 'निकोटीन का तंत्रिका विज्ञान: डोपामाइन जाल और तनाव के भ्रम को तोड़ना',
      ur: 'نکوٹین کا اعصابی نظام پر حملہ: ڈوپامائن کے جال اور دھوکے کو کیسے توڑیں؟'
    },
    subtitle: {
      en: 'Understanding why smoking appears to relieve stress when in physiological reality, it is the sole creator of that very anxiety.',
      ar: 'فهم علمي حاسم لسبب شعور المدخن بالهدوء الزائف عند التدخين، بينما في الحقيقة البيولوجية، النيكوتين هو الصانع الحقيقي لذلك التوتر.',
      fr: 'Comprendre pourquoi la cigarette semble apaiser alors qu’elle crée l’anxiété.',
      es: 'Comprende por qué fumar parece calmar el estrés cuando en realidad lo causa.',
      pt: 'Entenda por que fumar parece aliviar o estresse quando na verdade o cria.',
      de: 'Warum Rauchen scheinbar beruhigt, obwohl es die Unruhe erst erzeugt.',
      zh: '科学击碎迷思：为什么抽烟看似能够“缓解压力”，而事实上烟草恰恰是该焦虑状态的唯一始作俑者。',
      ja: 'タバコがストレスを和らげるように見える理由と、それが不安の真の原因である事実。',
      ru: 'Почему сигарета кажется средством от стресса, хотя сама же его и провоцирует.',
      tr: 'Sigaranın stresi yatıştırıyor gibi görünmesinin ardındaki biyolojik gerçek.',
      hi: 'यह समझना कि धूम्रपान तनाव दूर करता हुआ क्यों लगता है, जबकि वास्तव में यह चिंता का जनक है।',
      ur: 'یہ جاننا کہ سگریٹ بظاہر سکون کیوں دیتی ہے جبکہ درحقیقت بے چینی پیدا ہی اسی سے ہوتی ہے۔'
    },
    category: 'Awareness',
    categoryLabel: {
      en: 'Awareness',
      ar: 'التوعية واليقظة',
      fr: 'Sensibilisation',
      es: 'Concienciación',
      pt: 'Conscientização',
      de: 'Aufklärung',
      zh: '认知觉醒',
      ja: '啓発と知識',
      ru: 'Осознанность',
      tr: 'Farkındalık',
      hi: 'जागरूकता',
      ur: 'آگاہی اور شعور'
    },
    readTimeMinutes: 6,
    author: 'Neuroscience Group | BEYOND SMOKING',
    datePublished: '2026-09-03',
    featured: true,
    paragraphs: {
      en: [
        'When nicotine is inhaled, it crosses the blood-brain barrier in less than ten seconds. It binds tightly to nicotinic acetylcholine receptors (nAChRs) in the ventral tegmental area, triggering an unnaturally rapid spike of dopamine in the nucleus accumbens.',
        'This sudden surge artificially signals a "reward," but within 30 to 45 minutes, blood nicotine levels plunge. As receptors become unoccupied, the brain plunges into a state of micro-withdrawal: elevated cortisol, heightened irritability, and restless tension.',
        'When the smoker lights another cigarette, that tension is temporarily alleviated—not because the cigarette relieves genuine life stress, but because it simply quiets the chemical withdrawal that the previous cigarette created.',
        'Within 14 to 21 days of smoke-free living, these down-regulated dopamine receptors reset to baseline sensitivity. Freedom from smoking brings genuine emotional calmness, eliminating the rollercoaster of withdrawal.'
      ],
      ar: [
        'عند استنشاق النيكوتين، يعبر الحاجز الدموي الدماغي في أقل من عشر ثوانٍ فقط. يرتبط بقوة بمستقبلات الأسيتيل كولين النيكوتينية في المنطقة السقيفية البطنية، مفجراً تدفقاً هائلاً وغير طبيعي للدوبامين في مركز المكافأة الدماغي.',
        'هذا التدفق الخاطف يعطي إشارة مزيفة بالرضا، لكن في غضون 30 إلى 45 دقيقة فقط، تنحدر مستويات النيكوتين في الدم سريعاً. وعندما تصبح المستقبلات فارغة، يدخل الدماغ في حالة "انسحاب مصغر": إفراز مفرط لهرمون الكورتيزول، توتر، وعصبية سريعة.',
        'حين يشعل المدخن سيجارة أخرى، يهدأ ذلك التوتر مؤقتاً—ليس لأن السيجارة حلت ضغوط العمل أو الحياة، بل لأنها أطعمت وحش الانسحاب الكيميائي الذي خلقته السيجارة السابقة لها!',
        'في غضون أسبوعين إلى ثلاثة أسابيع من التوقف، تعود مستقبلات الدوبامين إلى توازنها وحساسيتها الطبيعية الأصلية. التحرر من التدخين يمنحك هدوءاً نفسياً حقيقياً ومستقراً بعيداً عن أرجوحة النيكوتين المتعبة.'
      ],
      fr: [
        'En 10 secondes, la nicotine atteint le cerveau et déclenche une libération artificielle de dopamine.',
        'Dès que son niveau chute, le cerveau entre en état de manque : irritabilité, anxiété et stress.',
        'Allumer une cigarette ne supprime pas le stress du quotidien, mais seulement le manque créé par la cigarette précédente.',
        'En 2 à 3 semaines sans tabac, les récepteurs cérébraux retrouvent leur équilibre naturel.'
      ],
      es: [
        'La nicotina llega al cerebro en 10 segundos provocando un falso pico de dopamina.',
        'Al bajar los niveles, aparece el síndrome de abstinencia: irritabilidad, nerviosismo y tensión.',
        'El cigarrillo no calma los problemas reales, solo calma la carencia que él mismo provocó.',
        'En 2-3 semanas, el cerebro se desensibiliza y recupera la tranquilidad genuina.'
      ],
      pt: [
        'A nicotina atinge o cérebro em 10 segundos, provocando uma descarga artificial de dopamina.',
        'Quando ela cai, surge a crise de abstinência: irritação, ansiedade e angústia.',
        'Fumar não alivia o estresse da vida; apenas alivia a abstinência gerada pelo cigarro anterior.',
        'Em 2 a 3 semanas sem fumar, o cérebro restabelece seu equilíbrio neuroquímico.'
      ],
      de: [
        'Nikotin erreicht das Gehirn in 10 Sekunden und erzeugt einen künstlichen Dopamin-Schub.',
        'Fällt der Spiegel, entsteht sofort Entzugsstress: Unruhe, Reizbarkeit und Anspannung.',
        'Die nächste Zigarette lindert keinen Alltagsstress, sondern nur den selbst erzeugten Entzug.',
        'Nach 2–3 Wochen normalisieren sich die Rezeptoren, und echte innere Ruhe kehrt zurück.'
      ],
      zh: [
        '吸入的尼古丁在10秒内跨越血脑屏障，强行结合乙酰胆碱受体，诱发多巴胺的爆发式异常释放。',
        '随着血药浓度在30至45分钟内断崖下跌，神经中枢坠入“微戒断”饥渴：皮质醇狂飙、心烦意乱与坐立不安。',
        '再次点燃香烟，所谓的放松感纯粹是一种假象——它没有解决任何现实压力，仅仅是暂时平息了上一支烟亲手播下的化学戒断毒瘾。',
        '坚持戒烟14至21天，受损的大脑多巴胺受体数量与敏感度全面回归天然平衡，带给你久违的真正沉静。'
      ],
      ja: [
        'ニコチンは10秒未満で脳に達し、人工的なドーパミンの急上昇を引き起こします。',
        '血中濃度が急速に低下すると、脳は微細な離脱症状（不安やイライラ）に襲われます。',
        '次の1本は現実のストレスを解消するのではなく、前のタバコが作り出した禁断症状を一時的に埋めるだけです。',
        '禁煙を2〜3週間続けることで、脳の神経伝達物質は本来の穏やかなバランスを取り戻します。'
      ],
      ru: [
        'Никотин достигает мозга за 10 секунд, вызывая искусственный выброс дофамина.',
        'Через 30–45 минут уровень падает, вызывая раздражительность и тревогу.',
        'Новая сигарета не снимает реальный стресс, а лишь утоляет вызванный ею же голод.',
        'Через 2–3 недели рецепторы очищаются, возвращая естественное спокойствие.'
      ],
      tr: [
        'Nikotin 10 saniye içinde beyne ulaşır ve yapay bir dopamin patlamasına yol açar.',
        'Seviye düştüğünde gerginlik, huzursuzluk ve yoksunluk başlar.',
        'Yeni bir sigara içmek gerçek stresi yok etmez, yalnızca önceki sigaranın yarattığı yoksunluğu dindirir.',
        'Sigarasız 2-3 hafta içinde beyin reseptörleri doğal dengesine tamamen geri döner.'
      ],
      hi: [
        'निकोटीन 10 सेकंड में मस्तिष्क में पहुंचकर कृत्रिम डोपामाइन छोड़ता है।',
        'जैसे ही इसका स्तर गिरता है, मस्तिष्क बेचैनी और तनाव की चपेट में आ जाता है।',
        'सिगरेट जीवन के तनाव को दूर नहीं करती, बल्कि केवल अपनी ही बनाई वापसी की तलब को शांत करती है।',
        '2 से 3 सप्ताह में मस्तिष्क के रिसेप्टर्स प्राकृतिक संतुलन में लौट आते हैं।'
      ],
      ur: [
        'نکوٹین 10 سیکنڈ میں دماغ تک پہنچ کر ڈوپامائن کا مصنوعی اخراج کرتی ہے۔',
        'جیسے ہی اس کا اثر ختم ہوتا ہے، بے چینی اور چڑچڑاپن سر اٹھانے لگتا ہے۔',
        'اگلی سگریٹ کوئی ذہنی سکون نہیں لاتی بلکہ پچھلی سگریٹ کی لگائی ہوئی آگ کو عارضی طور پر بجھاتی ہے۔',
        '2 سے 3 ہفتوں کے اندر دماغ کا کیمیائی نظام دوبارہ قدرتی حالت میں واپس آ جاتا ہے۔'
      ]
    },
    keyTakeaways: {
      en: [
        'Nicotine hijacks natural brain reward pathways in under 10 seconds.',
        'Smoking creates the very withdrawal anxiety that it claims to relieve.',
        'Dopamine receptors fully normalize within 2 to 3 smoke-free weeks.'
      ],
      ar: [
        'النيكوتين يختطف مراكز المكافأة في الدماغ خلال أقل من 10 ثوانٍ.',
        'التدخين يصنع التوتر والقلق الذي يدعي أنه يهدئه.',
        'تستعيد مستقبلات الدوبامين توازنها الفطري الكامل خلال 2 إلى 3 أسابيع من الإقلاع.'
      ],
      fr: [
        'La nicotine pirate le système de récompense cérébral en moins de 10 secondes.',
        'Fumer engendre l’anxiété même qu’il prétend apaiser.',
        'Les récepteurs se réinitialisent en 2 à 3 semaines sans tabac.'
      ],
      es: [
        'La nicotina secuestra los centros de recompensa en menos de 10 segundos.',
        'Fumar genera la misma ansiedad que aparenta aliviar.',
        'El cerebro se reequilibra por completo en solo 2 a 3 semanas.'
      ],
      pt: [
        'A nicotina sequestra as vias de recompensa em menos de 10 segundos.',
        'O cigarro cria a mesma ansiedade que promete acalmar.',
        'O cérebro se normaliza totalmente em 2 a 3 semanas sem fumar.'
      ],
      de: [
        'Nikotin kapert das Belohnungszentrum im Gehirn in unter 10 Sekunden.',
        'Rauchen erzeugt genau die Anspannung, die es scheinbar lindert.',
        'Nach 2 bis 3 rauchfreien Wochen normalisiert sich das Nervensystem.'
      ],
      zh: [
        '尼古丁在10秒内全面绑架劫持大脑天然奖赏回路。',
        '抽烟亲手炮制出它声称能缓解的那份烦躁与心瘾。',
        '坚持戒烟2至3周，神经受体彻底实现生理学复位归元。'
      ],
      ja: [
        'ニコチンは10秒未満で脳の報酬系をハイジャックします。',
        'タバコは和らげると錯覚させる不安そのものを生み出しています。',
        '禁煙2〜3週間でドーパミン受容体は正常なバランスに戻ります。'
      ],
      ru: [
        'Никотин захватывает центр удовольствия за считанные секунды.',
        'Курение само создает то напряжение, от которого якобы избавляет.',
        'Мозг полностью восстанавливает естественный баланс за 2–3 недели.'
      ],
      tr: [
        'Nikotin 10 saniye içinde beynin ödül mekanizmasını ele geçirir.',
        'Sigara, çözdüğünü iddia ettiği stres ve kaygının asıl yaratıcısıdır.',
        '2-3 haftalık dumansız yaşamda dopamin reseptörleri tamamen yenilenir.'
      ],
      hi: [
        'निकोटीन 10 सेकंड से भी कम समय में मस्तिष्क को नियंत्रित कर लेता है।',
        'धूम्रपान उसी चिंता को पैदा करता है जिसे दूर करने का वह दावा करता है।',
        '2 से 3 सप्ताह में डोपामाइन रिसेप्टर्स पूरी तरह से सामान्य हो जाते हैं।'
      ],
      ur: [
        'نکوٹین 10 سیکنڈ سے بھی کم وقت میں دماغ کے نظام کو یرغمال بنا لیتی ہے۔',
        'سگریٹ خود وہ بے چینی پیدا کرتی ہے جسے ختم کرنے کا وہ دعویٰ کرتی ہے۔',
        '2 سے 3 ہفتوں میں دماغ کا نظام مکمل طور پر نارمل ہو جاتا ہے۔'
      ]
    }
  },
  {
    id: 'art-pulmonary-regeneration',
    slug: 'the-anatomy-of-pulmonary-recovery',
    title: {
      en: 'The Anatomy of Lung Healing: From Day 1 to Decade 1',
      ar: 'تشريح تعافي الرئتين: من اليوم الأول وحتى العقد الأول بعد الإقلاع',
      fr: 'L’anatomie de la guérison pulmonaire : du premier jour à 10 ans',
      es: 'La anatomía de la recuperación pulmonar: Del día 1 a los 10 años',
      pt: 'A anatomia da cura pulmonar: Do 1º dia aos 10 anos',
      de: 'Die Anatomie der Lungenheilung: Vom 1. Tag bis zum 10. Jahr',
      zh: '肺部自愈的解剖全景：从破晓第一天到无烟第十年的新生',
      ja: '肺の治癒解剖学：禁煙1日目から10年目までの驚異の再生',
      ru: 'Анатомия исцеления легких: от первого дня до десятилетия свободы',
      tr: 'Akciğer İyileşmesinin Anatomisi: 1. günden 10. yıla kadar',
      hi: 'फेफड़ों के उपचार का शरीर रचना विज्ञान: दिन 1 से 10 वर्ष तक',
      ur: 'پھیپھڑوں کی قدرتی شفا یابی: پہلے دن سے دس سال کے سفر تک'
    },
    subtitle: {
      en: 'What happens inside the human respiratory apparatus once toxic particulates and carbon monoxide are removed forever.',
      ar: 'ماذا يحدث داخل خلايا الجهاز التنفسي حين تتوقف السموم وأول أكسيد الكربون إلى الأبد؟ استعراض زمني مبهر لقدرة الجسد على الشفاء.',
      fr: 'Que se passe-t-il dans vos poumons dès que les toxines cessent d’entrer.',
      es: 'Qué ocurre en tus pulmones en cuanto dejas de introducir toxinas.',
      pt: 'O que acontece nos pulmões quando as toxinas cessam de vez.',
      de: 'Was im Atemsystem geschieht, sobald keine Schadstoffe mehr zugeführt werden.',
      zh: '当焦油微尘与一氧化碳彻底绝迹，人类呼吸器官爆发出的惊人自愈奇迹。',
      ja: '有害物質が絶たれたとき、人間の呼吸器系に起きる劇的な回復過程。',
      ru: 'Что происходит в дыхательной системе после прекращения вдыхания ядовитого дыма.',
      tr: 'Zehirli duman kesildiğinde solunum sisteminde başlayan muazzam yenilenme.',
      hi: 'जहरीले धुएं के रुकने पर फेफड़ों के भीतर होने वाला चमत्कारी सुधार।',
      ur: 'زہریلا دھواں رکتے ہی پھیپھڑوں میں قدرتی صفائی اور بحالی کا حیرت انگیز نظام۔'
    },
    category: 'Health & Wellness',
    categoryLabel: {
      en: 'Health & Wellness',
      ar: 'الصحة والعافية',
      fr: 'Santé & Bien-être',
      es: 'Salud y Bienestar',
      pt: 'Saúde e Bem-estar',
      de: 'Gesundheit & Wellness',
      zh: '健康养生',
      ja: '健康とウェルネス',
      ru: 'Здоровье и благополучие',
      tr: 'Sağlık ve Esenlik',
      hi: 'स्वास्थ्य और कल्याण',
      ur: 'صحت اور تندرستی'
    },
    readTimeMinutes: 7,
    author: 'Pulmonology Council | BEYOND SMOKING',
    datePublished: '2026-09-04',
    featured: false,
    paragraphs: {
      en: [
        'The human lung possesses a resilient cellular capacity for regenerative self-cleansing when toxic exposure ceases. Within 72 hours of quitting, the bronchial smooth muscle relaxes, easing airflow resistance and reducing the sensation of labored breathing.',
        'Between 2 and 12 weeks, systemic blood circulation accelerates and lung function increases by up to 30%. Deep inhalations feel effortless as the alveolar surfactant system stabilizes.',
        'Crucially, between 1 and 9 months, microscopic bronchial cilia undergo massive structural regeneration. These tiny sweepers clear old mucus and tar deposits from deep within the pulmonary architecture, dramatically reducing infectious risk and chronic cough.',
        'At 10 years smoke-free, your risk of dying from lung cancer drops to approximately half that of a continuing smoker, and precancerous cells are replaced by healthy tissue.'
      ],
      ar: [
        'تمتلك الرئة البشرية قدرة تجديدية مذهلة على التنظيف الذاتي فور توقف التعرض لسموم التبغ. في غضون 72 ساعة فقط من الإقلاع، تسترخي العضلات الملساء المحيطة بالشعب الهوائية، مما يقلل مقاومة تدفق الهواء ويزيل الشعور بضيق التنفس.',
        'بين أسبوعين و12 أسبوعاً، تتحسن الدورة الدموية العامة بشكل ملحوظ وترتفع كفاءة وظائف الرئة بنسبة تصل إلى 30%. يصبح التنفس العميق سهلاً وطبيعياً مع استقرار المادة الخافضة للتوتر السطحي في الحويصلات.',
        'الأمر الحاسم يحدث بين شهر و9 أشهر: تشهد الأهداب التنفسية تجدداً بنيوياً واسع النطاق. تبدأ هذه المكانس المجهرية لكنس وطرد رواسب القطران والمخاط العالق من أعماق الرئتين، مما يخفض السعال المزمن ونوبات العدوى إلى أدنى مستوياتها.',
        'وعند بلوغ 10 سنوات من النقاء، ينخفض خطر الوفاة بسرطان الرئة إلى النصف تقريباً مقارنة بمن واصل التدخين، وتستبدل الخلايا المتغيرة بخلايا سليمة ومعافاة.'
      ],
      fr: [
        'En 72 heures, les bronches se détendent et l’air circule mieux.',
        'En 2 à 12 semaines, la capacité pulmonaire augmente de près de 30 %.',
        'Entre 1 et 9 mois, les cils repoussent et nettoient les dépôts accumulés.',
        'À 10 ans, le risque de cancer du poumon est divisé par deux.'
      ],
      es: [
        'En 72 horas los bronquios se relajan facilitando la respiración.',
        'Entre 2 y 12 semanas la función pulmonar aumenta hasta un 30%.',
        'De 1 a 9 meses los cilios se regeneran limpiando el moco y el alquitrán.',
        'A los 10 años el riesgo de cáncer de pulmón se reduce a la mitad.'
      ],
      pt: [
        'Em 72 horas os brônquios relaxam e o ar circula com leveza.',
        'Em 2 a 12 semanas a função pulmonar cresce até 30%.',
        'De 1 a 9 meses os cílios respiratórios se regeneram e limpam resíduos.',
        'Em 10 anos o risco de câncer pulmonar cai pela metade.'
      ],
      de: [
        'Nach 72 Stunden entspannen sich die Bronchien, die Atmung wird spürbar leichter.',
        'In 2 bis 12 Wochen verbessert sich die Lungenfunktion um bis zu 30 %.',
        'Nach 1 bis 9 Monaten regenerieren die Flimmerhärchen und reinigen die Lunge.',
        'Nach 10 Jahren sinkt das Lungenkrebsrisiko auf die Hälfte eines Rauchers.'
      ],
      zh: [
        '戒烟72小时，支气管平滑肌舒张，气道阻力骤降，呼吸顿感通透轻盈。',
        '2至12周内，微循环全面提速，总体肺功能提升最高可达30%。',
        '1至9个月期间，数以亿计的支气管微纤毛大规模新生重塑，深层清扫多年积存的焦油与粘液。',
        '无烟坚持至第10年，死于肺癌的风险断崖式减半，癌前病变细胞被新生健康组织逐步取代。'
      ],
      ja: [
        '72時間で気管支が緩み、空気の流れがスムーズになります。',
        '2〜12週間で血行が促進され、肺機能が最大30％向上します。',
        '1〜9か月で線毛が再生し、蓄積された粘液やタールを体外へ排出します。',
        '10年後には肺がんによる死亡リスクが喫煙者の半分にまで低下します。'
      ],
      ru: [
        'Через 72 часа бронхи расслабляются, дышать становится легче.',
        'Через 2–12 недель объем легких увеличивается до 30%.',
        'Через 1–9 месяцев реснички очищают легкие от многолетней копоти.',
        'Через 10 лет риск рака легких снижается наполовину.'
      ],
      tr: [
        '72 saatte bronşlar gevşer ve nefes almak hissedilir şekilde kolaylaşır.',
        '2-12 haftada dolaşım düzelir ve akciğer kapasitesi %30 artar.',
        '1-9 ayda solunum tüycükleri yenilenerek biriken katranı dışarı atar.',
        '10. yılda akciğer kanserinden ölüm riski yarı yarıya düşer.'
      ],
      hi: [
        '72 घंटों में श्वसन नलिकाएं शिथिल हो जाती हैं और सांस लेना आसान हो जाता है।',
        '2 से 12 सप्ताह में फेफड़ों की कार्यक्षमता 30% तक बढ़ जाती है।',
        '1 से 9 महीनों में सिलिया पुनर्जीवित होकर फेफड़ों से तारकोल को बाहर निकालती हैं।',
        '10 वर्षों में फेफड़ों के कैंसर का खतरा घटकर आधा रह जाता है।'
      ],
      ur: [
        '72 گھنٹوں میں سانس کی نالیاں کھل جاتی ہیں اور سانس لینا آسان ہو جاتا ہے۔',
        '2 سے 12 ہفتوں میں پھیپھڑوں کی کارکردگی 30 فیصد تک بہتر ہوتی ہے۔',
        '1 سے 9 ماہ میں قدرتی جھلی دوبارہ بن کر برسوں کا جما ہوا میل صاف کرتی ہے۔',
        '10 سال بعد پھیپھڑوں کے کینسر کا خطرہ سگریٹ نوشوں کے مقابلے میں نصف رہ جاتا ہے۔'
      ]
    },
    keyTakeaways: {
      en: [
        'Bronchial tubes relax in 72 hours, expanding total oxygen capacity.',
        'Cilia structural regeneration begins cleaning deep pulmonary tar within weeks.',
        'Lung cancer risk plummets by 50% at the 10-year smoke-free milestone.'
      ],
      ar: [
        'تسترخي الشعب الهوائية خلال 72 ساعة متيحة سعة أكسجين أعلى.',
        'تبدأ الأهداب التنفسية بتنظيف رواسب القطران العميقة خلال أسابيع.',
        'ينخفض خطر سرطان الرئة بنسبة 50% عند إتمام 10 سنوات من النقاء.'
      ],
      fr: [
        'Détente des bronches en 72 heures.',
        'Repousse des cils purifiant les poumons.',
        'Risque de cancer diminué de moitié à 10 ans.'
      ],
      es: [
        'Bronquios relajados y más aire en 72 horas.',
        'Regeneración de cilios para expulsar el alquitrán.',
        'Riesgo de cáncer reducido a la mitad a los 10 años.'
      ],
      pt: [
        'Brônquios desobstruídos em 72 horas.',
        'Cílios regenerados limpando o alcatrão acumulado.',
        'Queda de 50% no risco de câncer pulmonar em 10 anos.'
      ],
      de: [
        'Bronchien weiten sich bereits nach 72 Stunden.',
        'Flimmerhärchen reinigen die Atemwege aktiv von Schadstoffen.',
        'Halbierung des Lungenkrebsrisikos nach 10 rauchfreien Jahren.'
      ],
      zh: [
        '戒烟72小时支气管通畅舒张，摄氧总量大幅跃升。',
        '数周内纤毛新生，深层清剿肺底蓄积的多载有毒焦油。',
        '坚持10年无烟，肺癌致死风险剧烈回落50%。'
      ],
      ja: [
        '72時間で気管支が開き、酸素の取り込みが改善。',
        '数週間で線毛が再生し、肺深部のタールを排出。',
        '10年で肺がんリスクが喫煙者の約半分に激減。'
      ],
      ru: [
        'Бронхи расслабляются через 72 часа, увеличивая приток кислорода.',
        'Реснички начинают очищать легкие от смолы уже через несколько недель.',
        'Через 10 лет риск рака легких снижается на 50%.'
      ],
      tr: [
        '72 saatte bronşlar gevşeyerek oksijen kapasitesini artırır.',
        'Haftalar içinde solunum tüycükleri katranı temizlemeye başlar.',
        '10 yılda akciğer kanseri riski yarı yarıya azalır.'
      ],
      hi: [
        '72 घंटों में ब्रोन्कियल नलिकाएं शिथिल होकर ऑक्सीजन क्षमता बढ़ाती हैं।',
        'हफ्तों के भीतर सिलिया फेफड़ों से तारकोल साफ करना शुरू कर देती है।',
        '10 साल में फेफड़ों के कैंसर का खतरा 50% तक कम हो जाता है।'
      ],
      ur: [
        '72 گھنٹوں میں پھیپھڑوں میں آکسیجن جذب کرنے کی صلاحیت بڑھ جاتی ہے۔',
        'چند ہفتوں میں قدرتی بال پھیپھڑوں کا پرانا زہر صاف کرنا شروع کرتے ہیں۔',
        '10 سال بعد پھیپھڑوں کے کینسر کا خطرہ 50 فیصد تک گر جاتا ہے۔'
      ]
    }
  },
  {
    id: 'art-cravings-management',
    slug: 'the-4d-method-for-crushing-acute-cravings',
    title: {
      en: 'The 4-D Strategy: Clinical Protocols to Eliminate Acute Cravings',
      ar: 'استراتيجية الـ 4D الطبية: بروتوكول عملي لسحق نوبات الرغبة الملحة',
      fr: 'La stratégie des 4D : protocoles pour surmonter les envies aiguës',
      es: 'La estrategia 4D: Protocolos para vencer los deseos intensos',
      pt: 'A estratégia 4D: Protocolos para vencer a fissura aguda',
      de: 'Die 4-D-Strategie: Klinisches Protokoll gegen akutes Verlangen',
      zh: '4D急救法则：粉碎急性烟瘾发作的临床实操指南',
      ja: '4D戦略：急な喫煙衝動を鎮める臨床プロトコル',
      ru: 'Стратегия 4D: практический протокол преодоления острой тяги',
      tr: '4D Stratejisi: Ani sigara krizlerini yok eden klinik yöntem',
      hi: '4-D रणनीति: तीव्र तलब को समाप्त करने के व्यावहारिक नियम',
      ur: '4D حکمت عملی: سگریٹ کی شدید طلب کو کچلنے کا آسان طریقہ'
    },
    subtitle: {
      en: 'Delay, Deep Breath, Drink Water, Distract: The scientifically validated behavioral toolkit for instant urge mastery.',
      ar: 'التأخير، التنفس العميق، شرب الماء، والتشتيت الذهني: حقيبة الأدوات السلوكية المعتمدة عالمياً لقهر الرغبة في ثوانٍ.',
      fr: 'Différer, Respirer, Boire de l’eau, Se distraire : les 4 étapes pour dompter l’envie.',
      es: 'Demorar, Respirar hondo, Beber agua, Distraerse: La guía práctica y efectiva.',
      pt: 'Adiar, Respirar fundo, Beber água, Distrair-se: O guia prático anti-fissura.',
      de: 'Verzögern, Tief atmen, Wasser trinken, Ablenken: Die 4 Säulen gegen das Verlangen.',
      zh: '延迟响应、深长呼吸、大口饮水、转移注意：享誉国际的经典行为心理学克瘾武器库。',
      ja: '遅らせる、深呼吸、水を飲む、気をそらす：衝動を乗り越える科学的ツールキット。',
      ru: 'Отложить, дышать глубже, пить воду, отвлечься: проверенная методика борьбы с тягой.',
      tr: 'Ertele, Derin nefes al, Su iç, Dikkatini dağıt: Kriz anında hayat kurtaran 4 kural.',
      hi: 'देरी करें, गहरी सांस लें, पानी पिएं, ध्यान भटकाएं: तलब पर तुरंत काबू पाने का वैज्ञानिक तरीका।',
      ur: 'تاخیر کریں، گہرا سانس لیں، پانی پیئیں، دھیان بٹائیں: شدید طلب پر فوری قابو پانے کا سنہری فارمولا'
    },
    category: 'Quit Smoking',
    categoryLabel: {
      en: 'Quit Smoking',
      ar: 'الإقلاع عن التدخين',
      fr: 'Arrêter de Fumer',
      es: 'Dejar de Fumar',
      pt: 'Parar de Fumar',
      de: 'Mit dem Rauchen aufhören',
      zh: '戒除烟瘾',
      ja: '禁煙への道',
      ru: 'Бросить курить',
      tr: 'Sigarayı Bırakmak',
      hi: 'धूम्रपान छोड़ना',
      ur: 'تمباکو نوشی چھوڑنا'
    },
    readTimeMinutes: 5,
    author: 'Behavioral Medicine Unit | BEYOND SMOKING',
    datePublished: '2026-09-05',
    featured: false,
    paragraphs: {
      en: [
        'An acute craving spike rarely lasts longer than 180 to 300 seconds. Understanding this finite biological window is your greatest psychological asset.',
        '1. Delay: Tell yourself, "I will not smoke right now; I will wait just 5 minutes." Almost invariably, the acute neurochemical crest breaks before the timer expires.',
        '2. Deep Breath: Slow, diaphragmatic breathing immediately engages the parasympathetic nervous system, decreasing your pulse rate and counteracting the surge of adrenaline caused by withdrawal.',
        '3. Drink Water: Slowly sipping a tall glass of cold water creates oral stimulation, occupies hands and mouth, and accelerates physiological excretion of metabolic byproducts.',
        '4. Distract: Shift physical environments immediately. Step into another room, call a supportive friend, do 15 brisk squats, or wash your face with cool water.'
      ],
      ar: [
        'نادراً ما تستمر ذروة الرغبة الملحة في التدخين لأكثر من 180 إلى 300 ثانية (من 3 إلى 5 دقائق). إدراكك لهذه الحقيقة البيولوجية المؤقتة هو أقوى أسلحتك النفسية.',
        '1. التأخير (Delay): قل لنفسك بكل هدوء: "لن أدخن الآن؛ سأنتظر 5 دقائق فقط". وبشكل شبه حتمي، تنكسر موجة الرغبة الكيميائية الحادة قبل أن تنقضي الدقائق الخمس.',
        '2. التنفس العميق (Deep Breath): التنفس الحجابي البطيء يفعّل فوراً الجهاز العصبي اللاودي (الباراسمبثاوي)، مما يخفض ضربات القلب ويبطل مفعول هرمونات التوتر.',
        '3. شرب الماء (Drink Water): شرب كوب كبير من الماء البارد ببطء يوفر تحفيزاً حسياً للفم واليدين، ويطرد فضلات الاستقلاب الخلوي بسرعة عبر الكلى.',
        '4. التشتيت الإيجابي (Distract): غير مكانك فوراً. انتقل لغرفة أخرى، تواصل مع صديق يدعمك، مارس المشي السريع، أو اغسل وجهك بالماء المنعش.'
      ],
      fr: [
        'Une envie aiguë dure entre 3 et 5 minutes maximum.',
        '1. Différer : attendez 5 minutes, le pic d’envie passera.',
        '2. Respirer : le souffle lent calme le système nerveux.',
        '3. Boire de l’eau : hydratez-vous lentement pour occuper la bouche et les mains.',
        '4. Se distraire : changez de pièce ou faites une courte marche.'
      ],
      es: [
        'Un ataque de deseo rara vez dura más de 3 a 5 minutos.',
        '1. Demorar: Espera 5 minutos y la intensidad bajará.',
        '2. Respirar: Inhala hondo para calmar el ritmo cardíaco.',
        '3. Beber agua: Toma sorbos lentos de agua fresca.',
        '4. Distraerse: Cambia de actividad o de habitación de inmediato.'
      ],
      pt: [
        'A fissura dura de 3 a 5 minutos no máximo.',
        '1. Adiar: Espere 5 minutos e a intensidade cairá.',
        '2. Respirar fundo: Ative o sistema nervoso parassimpático.',
        '3. Beber água: Beba um copo de água fresca lentamente.',
        '4. Distrair-se: Mude de ambiente ou faça uma caminhada rápida.'
      ],
      de: [
        'Eine Verlangensattacke dauert selten länger als 3 bis 5 Minuten.',
        '1. Verzögern: Warte 5 Minuten, die Welle flacht ab.',
        '2. Tief atmen: Beruhigt den Herzschlag und senkt Adrenalin.',
        '3. Wasser trinken: Ein Glas kaltes Wasser beschäftigt Hände und Mund.',
        '4. Ablenken: Wechsle den Raum oder bewege dich an der frischen Luft.'
      ],
      zh: [
        '烟瘾的最强烈峰值几乎绝不会持续超过180至300秒（3-5分钟）。',
        '1. 延迟（Delay）：沉着地对自己说：“我现在绝不抽，我只等待5分钟”。峰值必在计时前自行溃败。',
        '2. 深呼吸（Deep Breath）：腹式慢呼吸即刻激活副交感神经，迅速拉低心率并瓦解神经紧绷。',
        '3. 喝冷水（Drink Water）：小口慢饮一杯冰水，瞬间满足手口感知需求并加速代谢排毒。',
        '4. 转移注意（Distract）：立刻变换物理空间，去隔壁房间、给好友打个电话或用冷水洗把脸。'
      ],
      ja: [
        '激しい欲求のピークは3〜5分以上続くことはほとんどありません。',
        '1. 遅らせる：5分間だけ待つと、衝動の波は自然に引いていきます。',
        '2. 深呼吸：ゆっくりと息を吐くことで副交感神経を優位にします。',
        '3. 水を飲む：冷たい水をゆっくり飲み、口元と手元を落ち着かせます。',
        '4. 気をそらす：別の部屋へ移動するか、軽く体を動かしましょう。'
      ],
      ru: [
        'Острый приступ тяги длится не более 3–5 минут.',
        '1. Отложить: подождите 5 минут, и волна спадет.',
        '2. Глубоко дышать: успокаивает пульс и снимает адреналиновый стресс.',
        '3. Пить воду: медленными глотками выпейте стакан прохладной воды.',
        '4. Отвлечься: смените обстановку, умойтесь или прогуляйтесь.'
      ],
      tr: [
        'Şiddetli bir kriz nadiren 3 ila 5 dakikadan uzun sürer.',
        '1. Ertele: 5 dakika bekleyin, dalga kendiliğinden kırılacaktır.',
        '2. Derin nefes al: Nabzı düşürür ve sinir sistemini yatıştırır.',
        '3. Su iç: Bir bardak soğuk suyu yavaş yavaş yudumlayın.',
        '4. Dikkatini dağıt: Hemen odanızı değiştirin veya yüzünüzü soğuk suyla yıkayın.'
      ],
      hi: [
        'तीव्र तलब 3 से 5 मिनट से अधिक नहीं रहती।',
        '1. देरी करें: 5 मिनट रुकें, तलब का असर खुद ही कम हो जाएगा।',
        '2. गहरी सांस लें: यह दिल की धड़कन को शांत करती है।',
        '3. पानी पिएं: धीरे-धीरे एक गिलास ठंडा पानी पिएं।',
        '4. ध्यान भटकाएं: तुरंत अपना कमरा बदलें या मुंह पर ठंडा पानी डालें।'
      ],
      ur: [
        'سگریٹ کی شدید طلب 3 سے 5 منٹ سے زیادہ برقرار نہیں رہتی۔',
        '1. تاخیر کریں: 5 منٹ انتظار کریں، لہر خود بخود مدہم پڑ جائے گی۔',
        '2. گہرا سانس لیں: یہ دل کی دھڑکن اور اعصابی تناؤ کو پرسکون کرتا ہے۔',
        '3. ٹھنڈا پانی پیئیں: آہستہ آہستہ ایک گلاس پانی پینا طلب کا رخ موڑ دیتا ہے۔',
        '4. دھیان بٹائیں: فوری طور پر اپنی جگہ تبدیل کریں یا چہرے پر ٹھنڈا پانی چھڑکیں۔'
      ]
    },
    keyTakeaways: {
      en: [
        'Cravings peak and collapse naturally within 3 to 5 minutes.',
        'The 4-D method offers instant behavioral disruption of habitual urges.',
        'Deep breathing and hydration counteract acute chemical adrenaline surges.'
      ],
      ar: [
        'تبلغ الرغبة ذروتها ثم تنهار ذاتياً خلال 3 إلى 5 دقائق.',
        'طريقة الـ 4D تكسر النمط السلوكي التلقائي فوراً وبفعالية.',
        'التنفس العميق والترطيب بالماء يبطلان تدفق الأدرينالين والتوتر.'
      ],
      fr: [
        'L’envie culmine et s’effondre en 3 à 5 minutes.',
        'La méthode 4D brise le réflexe automatique.',
        'Respiration et eau neutralisent le pic de stress.'
      ],
      es: [
        'El deseo alcanza su pico y decae en 3 a 5 minutos.',
        'El método 4D rompe de inmediato el hábito automático.',
        'Respirar hondo e hidratarse frenan la adrenalina.'
      ],
      pt: [
        'A fissura atinge o pico e passa em 3 a 5 minutos.',
        'O método 4D quebra o hábito mecânico imediatamente.',
        'Respiração profunda e hidratação anulam o pico de adrenalina.'
      ],
      de: [
        'Das Verlangen erreicht seinen Höhepunkt und vergeht in 3–5 Minuten.',
        'Die 4-D-Methode durchbricht die automatische Gewohnheitsschleife.',
        'Tiefes Atmen und Wasser trinken senken akuten Stress sofort.'
      ],
      zh: [
        '急性烟瘾必在3至5分钟内冲顶回落，无一例外。',
        '4D法则提供即时且有力的行为模式阻断。',
        '深度腹式呼吸与清凉补水可瞬间化解肾上腺素压力潮涌。'
      ],
      ja: [
        '喫煙欲求は3〜5分で自然にピークを越えて減衰します。',
        '4Dメソッドは無意識の喫煙行動パターンを遮断します。',
        '深呼吸と水分補給が急激なアドレナリンの上昇を抑えます。'
      ],
      ru: [
        'Приступ тяги угасает сам по себе за 3–5 минут.',
        'Метод 4D мгновенно разрывает привычную поведенческую цепочку.',
        'Глубокое дыхание и вода нейтрализуют адреналиновый всплеск.'
      ],
      tr: [
        'Sigara krizi 3 ila 5 dakika içinde kendiliğinden geçer.',
        '4D yöntemi otomatik alışkanlık döngüsünü hemen kırar.',
        'Derin nefes ve su içmek stres hormonlarını hızla yatıştırır.'
      ],
      hi: [
        'तलब 3 से 5 मिनट के भीतर अपने आप शांत हो जाती है।',
        '4-D तरीका आदत के चक्र को तुरंत तोड़ता है।',
        'गहरी सांस और पानी तनाव के स्तर को तेजी से कम करते हैं।'
      ],
      ur: [
        'طلب 3 سے 5 منٹ میں اپنے عروج پر پہنچ کر خود ختم ہو جاتی ہے۔',
        '4D طریقہ سگریٹ کی پرانی عادت کا سر وہیں کچل دیتا ہے۔',
        'گہرا سانس اور پانی جسمانی بے چینی کو فوری دور کرتے ہیں۔'
      ]
    }
  }
];
