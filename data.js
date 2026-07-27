// Complete Data Store aligned with Official Arabic & English Transcription & Annotation Guidelines PDF Documents

const GUIDELINES_DATA = {
  summary: {
    en: {
      title: "Transcription & Annotation Guidelines",
      subtitle: "Target language: Modern Standard Arabic (MSA). Standardized rules, annotation tags, formatting conventions, and step-by-step workflow for speech audio processing.",
      target_language: "Modern Standard Arabic (MSA)",
      core_principle: "100% Verbatim Transcription",
      core_desc: "Write what is actually said, in the order it is said, without paraphrasing, reordering, correcting grammar, or 'cleaning up' the speech. Never drop or add words, repetitions, or hesitations.",
      layers: ["Formatting Conventions (Section 2)", "Annotation Tags (Section 3)", "Detailed Transcription Rules (Section 4)"]
    },
    ar: {
      title: "ملخص إرشادات النسخ والتعليق الصوتي",
      subtitle: "اللغة المستهدفة: العربية الفصحى الحديثة (MSA). دليل عملي شامل للمشاركين يحدد قواعد الترقيم، كتابة الأرقام، الوسوم المعتمدة، والتفريغ الحرفي.",
      target_language: "العربية الفصحى الحديثة (MSA)",
      core_principle: "التفريغ الحرفي بنسبة 100%",
      core_desc: "انسخ الكلام حرفياً، وبالترتيب نفسه الذي نطق به. لا تعد صياغة الجملة، ولا تصحح قواعد المتحدث، ولا تغير ترتيب الكلمات، ولا تحذف كلمات أو تكرارات أو ترددات.",
      layers: ["الكتابة والتنسيق (القسم 2)", "الوسوم المعتمدة (القسم 3)", "الحالات والقواعد التفصيلية (القسم 4)"]
    }
  },

  core_rules: [
    {
      id: "verbatim",
      icon: "fa-quote-right",
      badge: { en: "Scope & Principle", ar: "القاعدة الأساسية" },
      title: { en: "100% Verbatim Transcription", ar: "انسخ الكلام حرفياً 100%" },
      desc: {
        en: "Write what is actually said, in the exact order it is said. Do not paraphrase, reorder words, fix sentence grammar, or clean up speech.",
        ar: "انسخ الكلام حرفياً وبالترتيب نفسه الذي نطق به. لا تعد صياغة الجملة، ولا تصحح قواعد المتحدث، ولا تحذف كلمات أو تكرارات أو ترددات."
      }
    },
    {
      id: "numerals",
      icon: "fa-font",
      badge: { en: "Formatting Rule", ar: "الأرقام والتواريخ" },
      title: { en: "No Digit Numerals", ar: "كتابة الأرقام بالكلمات" },
      desc: {
        en: "Numbers, dates, and prices are spelled out as words, exactly as pronounced. Compound numbers written as separate words with no hyphens. Numerals are ONLY used if part of an official brand name.",
        ar: "اكتب الأرقام والتواريخ والأسعار بالكلمات كما نطقها المتحدث، لا بالأرقام الرقمية. أرقام الهاتف والرموز السرية تكتب رقماً رقماً كما نطقت. لا تستخدم الأرقام إلا إذا كانت جزءاً رسمياً من علامة تجارية."
      }
    },
    {
      id: "tags",
      icon: "fa-code",
      badge: { en: "Single Angle-Bracket Set", ar: "الوسوم المعتمدة" },
      title: { en: "Standardized Tag Set", ar: "وسوم بأحرف صغيرة بين أقواس زاوية" },
      desc: {
        en: "All annotation uses lower case tags enclosed in single angle brackets <like_this>, placed at the exact point in the transcript where the event occurs.",
        ar: "اكتب الوسم بالحروف الصغيرة وبالقوسين الزاويين تماماً <هكذا>، وضعه في الموضع الذي وقع فيه الحدث تماماً."
      }
    },
    {
      id: "fragments",
      icon: "fa-strikethrough",
      badge: { en: "Hyphens & Truncations", ar: "الشرطة والقطع" },
      title: { en: "Hyphen Truncation Rule", ar: "الشرطة بعد جزء الكلمة فقط" },
      desc: {
        en: "Hyphens are used ONLY to mark a word that is truncated by a false start, self-correction, or interruption. NEVER use hyphens inside compound number words.",
        ar: "تستخدم الشرطة فقط بعد جزء كلمة بدأه المتحدث ثم تركه أو صححه. لا تستخدم الشرطة بين أجزاء الأعداد."
      }
    }
  ],

  workflow_steps: [
    {
      step: 1,
      id: "speaker-state",
      title: { en: "Step 1: Identify Speaker & Audio State", ar: "الخطوة 1: تحديد المتحدث وحالة التسجيل" },
      icon: "fa-headphones-alt",
      items: [
        {
          trigger: { en: "Silent or instrumental-only audio file", ar: "ملف صامت أو يحتوي على موسيقى فقط بدون كلام" },
          action: { en: "Mark with <empty> tag alone. No other transcription text produced.", ar: "ضع الوسم <empty> بمفرده دون تدوين أي نص." },
          example: "<empty>"
        },
        {
          trigger: { en: "Non-native speaker turn", ar: "دور متحدث غير أصلي باللغة الهدف" },
          action: { en: "Place <non-native> at the very start of that speaker's turn. Transcribe speech normally without fixing grammar.", ar: "ضع <non-native> مرة واحدة في بداية دور المتحدث غير الأصلي، وانسخ كلامه كما قاله دون تصحيح قواعده." },
          example: "<non-native> good morning everyone | <non-native> هذا كتاب ممتاز"
        },
        {
          trigger: { en: "Audio clip starts or ends mid-word (cut-off audio)", ar: "بداية أو نهاية التسجيل الصوتي في منتصف كلمة" },
          action: {
            en: "Place <cut-off> at affected boundary. If intelligible from context, write full word; if unintelligible, leave <cut-off> marker alone.",
            ar: "إذا بدأ التسجيل أو انتهى في منتصف كلمة، ضع <cut-off> عند الحد المتأثر. إذا كانت الكلمة مفهومة، اكتبها كاملة؛ وإذا لم تفهم، اكتب الوسم فقط."
          },
          example: "<cut-off> afternoon everyone | <cut-off> مساء الخير جميعا"
        }
      ]
    },
    {
      step: 2,
      id: "non-speech-fillers",
      title: { en: "Step 2: Handle Non-Speech Sounds & Fillers", ar: "الخطوة 2: التعامل مع أصوات التردد والمؤثرات" },
      icon: "fa-comment-slash",
      items: [
        {
          trigger: { en: "Filler / hesitation sounds with no lexical meaning (uh, um, er / آآ، أمم)", ar: "تردد أو صوت لا يحمل معنى لغوياً (مثل: آآ، أمم، uh, um)" },
          action: { en: "Replace hesitation sounds with <fill> tag. Do not write them out as words or silently omit them.", ar: "استبدل التردد الذي لا يحمل معنى بوسم <fill>. لا تكتبه ككلمة ولا تحذفه." },
          example: "heard 'uh where was I' -> <fill> where was I | مسموع: 'آآ وين كنت؟' -> <fill> وين كنت؟"
        },
        {
          trigger: { en: "Speaker non-verbal sounds (cough, sneeze, laugh, throat-clearing)", ar: "سعال أو عطاس أو ضحك أو تنظيف حلق يصدر من المتحدث" },
          action: { en: "Insert <vocal_noise> at the exact position where it occurs.", ar: "ضع <vocal_noise> في الموضع الذي وقع فيه الحدث." },
          example: "i think <vocal_noise> we should leave now | سوف نلتقي <vocal_noise> غداً"
        },
        {
          trigger: { en: "Environmental background sounds (traffic, door slam, applause, lyrics-free music)", ar: "صوت خارجي مثل باب أو سيارة أو تنبيه أو موسيقى بدون كلمات" },
          action: { en: "Insert <non_speech> where the sound starts.", ar: "ضع <non_speech> عند بداية الصوت." },
          example: "and then <non_speech> she walked out | استمعنا إلى التقرير <non_speech> ثم اتخذنا القرار"
        },
        {
          trigger: { en: "Meaningful interjections & emotion (ouch, wow, ah of pain/relief)", ar: "أصوات تحمل معنى أو شعوراً، مثل الألم أو المفاجأة (آه، واو، ouch, wow)" },
          action: { en: "Transcribe as normal words representing the sound. Do NOT tag them.", ar: "إذا كان الصوت يحمل معنى أو شعوراً، اكتبه ككلمة عادية بدون وسم." },
          example: "heard 'ouch that hurt' -> ouch that hurt | آه، هذا مؤلم. | واو، هذا كبير جدا!"
        }
      ]
    },
    {
      step: 3,
      id: "words-errors-repetition",
      title: { en: "Step 3: Stuttering, False Starts & Discourse Markers", ar: "الخطوة 3: التأتأة، البدايات الخاطئة، وأدوات الربط" },
      icon: "fa-sync",
      items: [
        {
          trigger: { en: "Stuttering: broken word immediately completed (e.g. 'bu-but', 'بـ-بس')", ar: "التأتأة: إذا بدأ المتحدث جزءاً من كلمة ثم أكمل الكلمة نفسها فوراً" },
          action: { en: "Transcribe ONLY the complete word ('but', 'بس'). Drop the broken fragment.", ar: "اكتب الكلمة الكاملة فقط. (مسموع: بـ-بس حاولت -> النسخ: بس حاولت)." },
          example: "heard 'bu-but I tried' -> but I tried | مسموع: 'بـ-بس حاولت' -> بس حاولت"
        },
        {
          trigger: { en: "False start / self-correction / interruption: word begun and abandoned/replaced", ar: "البداية الخاطئة أو التصحيح الذاتي: جزء كلمة بدأه المتحدث ثم تركه أو صححه" },
          action: { en: "Keep the truncated fragment and add a trailing hyphen (-) after it.", ar: "احتفظ بالجزء المقطوع وأضف بعده شرطة." },
          example: "let's meet at fi- at six | خلينا نلتقي السا- الساعة السادسة | المبلغ خمسـ- خمسمئة درهم"
        },
        {
          trigger: { en: "Deliberate repetition: whole words or phrases repeated", ar: "التكرار الحقيقي: إذا كرر المتحدث كلمة أو عبارة كاملة" },
          action: { en: "Transcribe every occurrence explicitly in its proper position.", ar: "اكتب جميع مرات التكرار. (مثال: أنا رايح أنا رايح على البيت)." },
          example: "I am going I am going home | أنا رايح أنا رايح على البيت"
        },
        {
          trigger: { en: "Mispronounced words: intended word clear from context", ar: "الكلمات المنطوقة خطأ: النطق خاطئ لكن الكلمة المقصودة واضحة" },
          action: { en: "Write intended correct word ('cufboard' -> 'cupboard'). NEVER alter word order or fix grammar.", ar: "اكتب الكلمة الصحيحة المقصودة. لا تصحح قواعد الجملة، ولا تعد ترتيب الكلمات." },
          example: "heard 'shut the cufboard' -> shut the cupboard"
        },
        {
          trigger: { en: "Casual speech & discourse markers ('no but ...', 'you know', 'لا بس', 'يعني')", ar: "أدوات الربط والكلمات العامية (لا بس، يعني، تعرف، صح، you know)" },
          action: { en: "Retain all spoken particles and conversational tags. Do NOT drop them.", ar: "احتفظ بكل الكلمات التي تحمل معنى أو نبرة. لا تحذفها حتى لو حذفها النسخ الآلي." },
          example: "no but you're crazy you know | لا بس، يعني، تعرف، صح؟"
        }
      ]
    },
    {
      step: 4,
      id: "names-letters-foreign",
      title: { en: "Step 4: Names, Letters & Foreign Languages", ar: "الخطوة 4: الأسماء والحروف واللغات الأجنبية" },
      icon: "fa-globe-americas",
      items: [
        {
          trigger: { en: "Letters spoken one by one / initialisms (spelling a name, 'D A N A', 'F B I')", ar: "الحروف المنطوقة واحداً واحداً والاختصارات الحرفية" },
          action: { en: "Transcribe as capital letters, separated by single spaces (e.g. 'D A N A', 'F B I'). No periods or hyphens.", ar: "تكتب بأحرف كبيرة، وبينها مسافة: D A N A ... F B I. بدون نقاط بينها." },
          example: "spelled D A N A | the F B I | H I V"
        },
        {
          trigger: { en: "Acronyms pronounced as single words (NASA, UNESCO)", ar: "الاختصار المنطوق ككلمة" },
          action: { en: "Transcribe in standard spelled form: capital letters, no periods, no spaces.", ar: "يكتب بصيغته المعروفة: NASA ، UNESCO بدون مسافات أو نقاط." },
          example: "works for NASA | UNESCO"
        },
        {
          trigger: { en: "Foreign expressions & languages", ar: "الكلمات والمقاطع بلغة أجنبية" },
          action: {
            en: "Common international words (okay) need no tag. Enclose foreign speech in <foreign_start> ... <foreign_end>. If understood write text between; if unintelligible write <unintelligible> between.",
            ar: "الكلمات الأجنبية الشائعة والمفهومة (okay) تكتب عادة بلا وسم. أحط المقطع الأجنبي بوسمي <foreign_start> و <foreign_end>."
          },
          example: "<foreign_start> bon appétit <foreign_end> | <foreign_start> <unintelligible> <foreign_end>"
        },
        {
          trigger: { en: "Named entities & spelling (people, places, brands)", ar: "الرموز والأسماء والعلامات التجارية" },
          action: { en: "Correct misheard names to standard spelling. Use project dictionary or check top 5 web search results.", ar: "صحح أسماء الأشخاص والأماكن والعلامات التجارية إلى تهجئتها الرسمية. تحقق من أول خمس نتائج بحث عند الشك." },
          example: "heard 'new york' -> New York | heard 'youtube' -> YouTube"
        }
      ]
    },
    {
      step: 5,
      id: "overlaps-distortion",
      title: { en: "Step 5: Overlapping & Unintelligible Speech", ar: "الخطوة 5: تعدد المتحدثين، التداخل، والكلام غير الواضح" },
      icon: "fa-volume-mute",
      items: [
        {
          trigger: { en: "Unintelligible speech due to noise or slurring", ar: "الكلام غير الواضح (كلمة أو جزء تعذر فهمه)" },
          action: { en: "Replace only the lost part with <unintelligible>. Transcribe surrounding intelligible words normally.", ar: "استبدل الجزء الذي تعذر فهمه فقط بوسم <unintelligible>. انسخ الكلمات المفهومة المحيطة به، ولا تخمن الكلمة." },
          example: "he said <unintelligible> that he would come tomorrow | قال لي <unintelligible> إنه سيتصل غدا"
        },
        {
          trigger: { en: "Multiple speakers: Case A & B (Secondary background voice audible)", ar: "تعدد المتحدثين: متحدث مفهوم والآخر متداخل معه" },
          action: { en: "Make a segment for each speaker. Place <background_speech> immediately before word where overlap starts.", ar: "أنشئ مقطعاً منفصلاً لكل متحدث. ضع <background_speech> عند كل نقطة تداخل." },
          example: "Speaker 1: hello <background_speech> how are you | Speaker 2: <background_speech> <unintelligible>"
        },
        {
          trigger: { en: "Multiple speakers: Case C (Heavy crosstalk making segment unintelligible)", ar: "تداخل شديد يجعل كلام جميع المتحدثين غير مفهوم" },
          action: { en: "Write <crosstalk> ONLY. Do NOT transcribe any words inside a crosstalk segment.", ar: "اكتب <crosstalk> فقط، ولا تكتب أي كلمات أخرى في المقطع." },
          example: "<crosstalk>"
        }
      ]
    }
  ],

  worked_examples_section: {
    en: [
      { heard: "I went to the um store", correct: "i went to the <fill> store", incorrect: ["i went to the um store", "i went to the store"] },
      { heard: "speaker coughs", correct: "i think <vocal_noise> we should leave now" },
      { heard: "a door slams", correct: "and then <non_speech> she walked out" },
      { heard: "a second voice becomes audible", correct: "the train leaves at noon <background_speech>" },
      { heard: "everyone talks over each other, nothing clear", correct: "<crosstalk>", incorrect: ["<crosstalk> the budget"] },
      { heard: "one word lost to noise", correct: "he said <unintelligible> that he would come tomorrow" },
      { heard: "understood foreign phrase", correct: "<foreign_start> bon appétit <foreign_end>" },
      { heard: "not understood foreign phrase", correct: "<foreign_start> <unintelligible> <foreign_end>" },
      { heard: "file is silent or instrumental only", correct: "<empty>" },
      { heard: "start of non-native speaker turn", correct: "<non-native> good morning everyone" },
      { heard: "recording begins mid-word", correct: "<cut-off> afternoon everyone" },
      { heard: "ouch that hurt", correct: "ouch that hurt (meaningful interjection = word)" },
      { heard: "bu-but I tried", correct: "but I tried (stutter: drop fragment)" },
      { heard: "let's meet at fi- at six", correct: "let's meet at fi- at six (false start: keep fragment with hyphen)" },
      { heard: "I am going I am going home", correct: "I am going I am going home (deliberate repetition: keep all)" },
      { heard: "year 1964", correct: "nineteen sixty four (no digits, no hyphen)", incorrect: ["1964", "sixty-four"] },
      { heard: "spelled D A N A", correct: "spelled D A N A", incorrect: ["D.A.N.A.", "D-A-N-A"] },
      { heard: "shut the cufboard", correct: "shut the cupboard (correct mispronunciation)" }
    ],
    ar: [
      { heard: "آآ وين كنت؟", correct: "<fill> وين كنت؟", incorrect: ["آآ وين كنت؟"] },
      { heard: "آه، هذا مؤلم.", correct: "آه، هذا مؤلم. (صوت يحمل معنى = كلمة عادية)" },
      { heard: "واو، هذا كبير جدا!", correct: "واو، هذا كبير جدا! (صيحة انفعال = كلمة عادية)" },
      { heard: "بـ-بس حاولت", correct: "بس حاولت (تأتأة: كتابة الكلمة الكاملة فقط)", incorrect: ["بـ-بس حاولت"] },
      { heard: "خليني التقي السا- الساعة السادسة", correct: "خليني التقي السا- الساعة السادسة (بداية خاطئة: شرطة بعد الجزء المقطوع)" },
      { heard: "المبلغ خمسـ- خمسمئة درهم", correct: "المبلغ خمسـ- خمسمئة درهم" },
      { heard: "أنا رايح أنا رايح على البيت", correct: "أنا رايح أنا رايح على البيت (تكرار حقيقي: كتابة كل التكرارات)" },
      { heard: "عام 1964", correct: "عام ألف وتسعمئة وأربعة وستون", incorrect: ["عام 1964"] },
      { heard: "رمز 1964", correct: "واحد تسعة ستة أربعة" },
      { heard: "D A N A", correct: "D A N A (مسافات بدون نقاط)", incorrect: ["D.A.N.A."] },
      { heard: "مساء الخير جميعا (صوت مقطوع في البداية)", correct: "<cut-off> مساء الخير جميعا" },
      { heard: "ملف صامت أو موسيقى فقط", correct: "<empty>" },
      { heard: "تداخل شديد لا يفهم منه شيء", correct: "<crosstalk>" }
    ]
  },

  annotation_tags: [
    {
      tag: "<fill>",
      type: "Filler / Hesitation",
      title_ar: "وسم الحشو والتردد",
      desc_en: "Filler / hesitation sounds and vocalized pauses with no lexical meaning (uh, um, er, or hesitating 'oh'/'ah'). Placed where filler occurs.",
      desc_ar: "تردد أو صوت لا يحمل معنى لغوياً، مثل: آآ، أمم، uh, um. يحل محل التردد ولا يكتب ككلمة ولا يحذف.",
      notes_en: "Meaningful interjections (ouch, wow, ah of pain/relief) are transcribed as words instead — NOT tagged.",
      notes_ar: "إذا كان الصوت يحمل معنى أو شعوراً (مثل الألم آآخ، المفاجأة واو، الارتياح) يكتب ككلمة عادية بدون وسم.",
      example: "heard 'uh where was I' -> <fill> where was I | مسموع: 'آآ وين كنت؟' -> <fill> وين كنت؟"
    },
    {
      tag: "<vocal_noise>",
      type: "Speaker Vocal Sound",
      title_ar: "وسم الأصوات الحنجرية للمتحدث",
      desc_en: "A non-verbal sound produced by the speaker (cough, sneeze, laugh, throat-clearing). Placed where it occurs.",
      desc_ar: "سعال أو عطاس أو ضحك أو تنظيف حلق يصدر من المتحدث. يوضع في موضع حدوثه.",
      notes_en: "Placed right where the vocal noise occurs.",
      notes_ar: "يوضع في المكان الدقيق لوقوع الصوت الحنجري.",
      example: "i think <vocal_noise> we should leave now | سوف نلتقي <vocal_noise> غداً"
    },
    {
      tag: "<non_speech>",
      type: "Environmental Sound / Music",
      title_ar: "وسم الأصوات والمؤثرات الخارجية",
      desc_en: "A non-verbal environmental sound (background noise, traffic, doors, beeps, applause, or instrumental music without relevant lyrics).",
      desc_ar: "صوت خارجي مثل باب أو سيارة أو تنبيه أو تصفيق أو موسيقى بدون كلمات داخل تسجيل فيه كلام.",
      notes_en: "Placed where the sound starts.",
      notes_ar: "يوضع عند بداية الصوت الخارجي.",
      example: "and then <non_speech> she walked out | استمعنا إلى التقرير <non_speech> ثم اتخذنا القرار"
    },
    {
      tag: "<background_speech>",
      type: "Overlapping Speaker",
      title_ar: "وسم كلام متداخل في الخلفية",
      desc_en: "A secondary or overlapping speaker is audible while main speaker remains intelligible. Placed once where it begins, and again at each later overlap point.",
      desc_ar: "كلام متداخل مع بقاء كلام المتحدث الأساسي مفهوماً. يوضع عند كل نقطة تداخل.",
      notes_en: "Placed immediately before the word at which overlap begins.",
      notes_ar: "يوضع مباشرة قبل الكلمة التي يبدأ عندها التداخل.",
      example: "the train leaves at noon <background_speech> | Speaker 1: hello <background_speech> how are you"
    },
    {
      tag: "<crosstalk>",
      type: "Severe Overlap Segment",
      title_ar: "وسم التداخل التام والأصوات المتداخلة",
      desc_en: "Two or more speakers overlap so heavily that the whole segment is unintelligible. Marks the entire segment (no other transcription inside).",
      desc_ar: "تداخل شديد يجعل كلام جميع المتحدثين غير مفهوم. يكتب الوسم بمفرده فقط ولا تكتب أي كلمات في المقطع.",
      notes_en: "Do NOT transcribe any words inside a crosstalk segment!",
      notes_ar: "يمنع تدوين أي كلمات داخل مقطع التداخل الشديد!",
      example: "<crosstalk>"
    },
    {
      tag: "<unintelligible>",
      type: "Unclear / Lost Speech",
      title_ar: "وسم الكلام غير المفهوم",
      desc_en: "A stretch of target-language speech cannot be made out (noise, distortion, slurring, partial overlap). Placed in position of lost words.",
      desc_ar: "كلمة أو جزء من الكلام باللغة الهدف لا يمكن فهمه بسبب الضوضاء أو التشويش أو غموض النطق. يحل محل الجزء المفقود فقط.",
      notes_en: "Replace only the lost part; intelligible surrounding words are transcribed normally.",
      notes_ar: "استبدل الجزء غير المفهوم فقط واكتب الكلمات المفهومة المحيطة به.",
      example: "he said <unintelligible> that he would come tomorrow | قال لي <unintelligible> إنه سيتصل غدا"
    },
    {
      tag: "<foreign_start> ... <foreign_end>",
      type: "Foreign Language Span",
      title_ar: "وسما المقطع الأجنبي",
      desc_en: "A matched pair placed around speech in a language other than target language. If content is understood, transcribe between tags; if not, place <unintelligible> between.",
      desc_ar: "بداية ونهاية مقطع بلغة غير اللغة المستهدفة. إذا فهم المقطع فاكتبه بين الوسمين، وإذا لم تفهمه فضع <unintelligible> بينهما.",
      notes_en: "Common international words (e.g. 'okay') are transcribed normally with NO tag.",
      notes_ar: "الكلمات الأجنبية الشائعة والمفهومة (مثل okay) تكتب عادة بلا وسم.",
      example: "<foreign_start> bon appétit <foreign_end> | <foreign_start> <unintelligible> <foreign_end>"
    },
    {
      tag: "<empty>",
      type: "Silent / Music Only File",
      title_ar: "وسم خلو الملف من الكلام",
      desc_en: "There is no speech anywhere in the file (e.g. pure silence or instrumental music only). No transcription text is produced.",
      desc_ar: "لا يوجد كلام في الملف (صمت أو موسيقى فقط). لا يتم تدوين أي نص سوى هذا الوسم.",
      notes_en: "Write <empty> alone.",
      notes_ar: "يكتب <empty> بمفرده وتنهى العملية.",
      example: "<empty>"
    },
    {
      tag: "<non-native>",
      type: "Non-Native Speaker Turn",
      title_ar: "وسم المتحدث غير الأصلي",
      desc_en: "Marks the start of a turn spoken by a non-native speaker of the target language. Placed once at start of turn; speech transcribed normally.",
      desc_ar: "بداية دور متحدث غير أصلي باللغة العربية. يوضع مرة واحدة في بداية الدور وانسخ كلامه كما قاله دون تصحيح قواعده.",
      notes_en: "Do NOT tag every word of the turn!",
      notes_ar: "لا تضع الوسم عند كل كلمة، بل مرة واحدة فقط في بداية الدور!",
      example: "<non-native> good morning everyone | <non-native> هذا كتاب ممتاز"
    },
    {
      tag: "<cut-off>",
      type: "Cut-Off Audio Boundary",
      title_ar: "وسم قطع الصوت في البداية أو النهاية",
      desc_en: "The audio begins or ends mid-word (abrupt start or end). Placed at affected boundary.",
      desc_ar: "بداية أو نهاية التسجيل في منتصف كلمة. يوضع عند الحد المتأثر.",
      notes_en: "If cut word is intelligible from context write in full; if cut severely leave only <cut-off>.",
      notes_ar: "إذا كانت الكلمة مفهومة من السياق اكتبها كاملة؛ وإذا لم تفهم اترك الوسم بمفرده.",
      example: "<cut-off> afternoon everyone | <cut-off> مساء الخير جميعا"
    }
  ],

  formatting_conventions: [
    {
      id: "apostrophes",
      title: { en: "Apostrophes", ar: "فاصلة الملكية والانكماش" },
      rule_en: "Used normally in contractions and possessives.",
      rule_ar: "تستخدم بصورة طبيعية في صيغ الملكية والاختصارات باللغات التابعة.",
      dos: [
        { en: "I don't remember the date", ar: "I don't remember the date" }
      ],
      donts: [
        { en: "Avoid dropping apostrophes in contractions", ar: "تجنب إهمال الفاصلة العليا" }
      ]
    },
    {
      id: "hyphens",
      title: { en: "Hyphens & Truncations", ar: "الشرطة والقطع" },
      rule_en: "Used ONLY to mark a word that is truncated by a false start, self-correction, or interruption. NOT used inside compound number words.",
      rule_ar: "تستخدم الشرطة فقط بعد جزء كلمة بدأه المتحدث ثم تركه أو صححه. لا تستخدم الشرطة بين أجزاء الأعداد.",
      dos: [
        { en: "let's do it at fi- at six thirty tonight", ar: "خلينا نلتقي السا- الساعة السادسة" },
        { en: "sixty four (separate words, no hyphen)", ar: "خمسة وعشرون (بدون شرطة)" }
      ],
      donts: [
        { en: "sixty-four (PROHIBITED: hyphen inside compound number)", ar: "خمسة-وعشرون (ممنوع استخدام الشرطة بين الأرقام المركبة)" }
      ]
    },
    {
      id: "punctuation",
      title: { en: "Punctuation", ar: "علامات الترقيم" },
      rule_en: "Periods, commas, sentence-final periods, question marks and exclamation points should be used normally.",
      rule_ar: "استخدم الفاصلة والنقطة وعلامتي الاستفهام والتعجب بصورة طبيعية.",
      dos: [
        { en: "My name is Pat Jones, and I live in the city. Did you understand?", ar: "وصلنا إلى المدينة، ثم تناولنا الغداء. هل فهمت؟" }
      ],
      donts: [
        { en: "Do not omit natural sentence punctuation.", ar: "لا تهمل استخدام النقطة والفاصلة والعلامات الطبيعية." }
      ]
    },
    {
      id: "numbers",
      title: { en: "Numbers, Dates & Prices", ar: "الأرقام والتواريخ والأسعار" },
      rule_en: "Spelled out as words, exactly as pronounced. Compound numbers written as separate words (no hyphen). Phone numbers, PINs, codes written digit by digit as spoken. Numerals ONLY used if part of an official brand name. Roman numerals & ordinals spelled as pronounced.",
      rule_ar: "اكتبها بالكلمات كما نطقها المتحدث، لا بالأرقام الرقمية. أرقام الهاتف والرموز السرية تكتب رقماً رقماً كما نطقت. لا تستخدم الأرقام الرقمية إلا إذا كانت جزءاً رسمياً من اسم علامة تجارية.",
      dos: [
        { en: "I was born in nineteen seventy five", ar: "عام ألف وتسعمئة وأربعة وستون" },
        { en: "PIN -> one nine six four", ar: "رمز: واحد تسعة ستة أربعة" },
        { en: "Henry VIII -> Henry the eighth", ar: "هنري الثامن" },
        { en: "Windows 11 (official brand name)", ar: "Windows 11 (علامة تجارية رسمية)" }
      ],
      donts: [
        { en: "1964 or 1975 (PROHIBITED: raw digit numerals)", ar: "عام 1964 (حظر الأرقام الرقمية)" },
        { en: "sixty-four (PROHIBITED: hyphenated numbers)", ar: "واحد-تسعة-ستة (حظر الشرطات بين الأرقام)" }
      ]
    },
    {
      id: "letters_abbreviations",
      title: { en: "Spoken Letters & Abbreviations", ar: "الحروف المنطوقة والاختصارات" },
      rule_en: "Letters spoken one by one / initialisms: Capital letters separated by single spaces ('D A N A', 'F B I'). Acronyms (pronounced as a word): Standard closed form ('NASA', 'UNESCO'). Symbols (@, &, #) transcribed as words. Other abbreviations: Words spoken in full written in full.",
      rule_ar: "الحروف المنطوقة واحداً واحداً تكتب بأحرف كبيرة وبينها مسافة: D A N A ... F B I. الاختصار المنطوق ككلمة يكتب بصيغته المعروفة: NASA, UNESCO. لا تكتب الرموز @ أو & أو #، بل اكتب الكلمات المنطوقة (آت، و، شباك).",
      dos: [
        { en: "spelled D A N A ... F B I ... NASA", ar: "D A N A ... F B I ... NASA" },
        { en: "Pat dot Jones at Company dot com", ar: "بات دوت جونز أتس كومباني دوت كوم" },
        { en: "Doctor Jones said I weigh one hundred pounds", ar: "الدكتور جونز قال..." }
      ],
      donts: [
        { en: "D.A.N.A. or D-A-N-A (PROHIBITED: periods or hyphens in initialisms)", ar: "D.A.N.A. أو D-A-N-A (حظر النقاط والشرطات)" },
        { en: "Dr. or lbs. (PROHIBITED: abbreviated written forms)", ar: "استخدام الرموز @ أو & أو الاختصارات الكتابية مثل د." }
      ]
    },
    {
      id: "entities",
      title: { en: "Named Entities & Spelling", ar: "الرموز والأسماء والعلامات التجارية" },
      rule_en: "Correct misheard names of people, places, brands, and technical terms to their proper spelling. Use project dictionary or check web search (if first 5 results consistently agree, treat as correct).",
      rule_ar: "صحح أسماء الأشخاص والأماكن والعلامات التجارية إلى تهجئتها الرسمية. استخدم قاموس المشروع أو تحقق من أول خمس نتائج بحث عند الشك.",
      dos: [
        { en: "heard 'new york' -> New York", ar: "جوجل ... مايكروسوفت ... الرياض" },
        { en: "heard 'youtube' -> YouTube", ar: "يوتيوب (YouTube)" }
      ],
      donts: [
        { en: "Keeping an obviously wrong spelling of a known name", ar: "تثبيت الأخطاء السمعية لأسماء الأعلام والماركات المعروفة." }
      ]
    }
  ],

  special_rules: [
    {
      id: "stutter-false-start",
      title: { en: "Stuttering vs. False Starts vs. Repetitions", ar: "التأتأة مقابل البداية الخاطئة مقابل التكرار" },
      stutter_desc_en: "Stutter: a word broken and immediately completed ('bu-but', 'بـ-بس'). Transcribe ONLY the complete word ('but', 'بس'); drop the broken fragment.",
      stutter_desc_ar: "التأتأة: إذا بدأ المتحدث جزءاً من كلمة ثم أكمل الكلمة نفسها فوراً (مثل: 'بـ-بس'). اكتب الكلمة الكاملة فقط ('بس') واطلب إلغاء المقطع المكسور.",
      false_start_desc_en: "False start / self-correction: a word begun and then abandoned or replaced. Keep the truncated fragment with a trailing hyphen ('fi-', 'السا-').",
      false_start_desc_ar: "البداية الخاطئة أو التصحيح الذاتي: جزء كلمة بدأه المتحدث ثم تركه أو صححه. احتفظ بالجزء المقطوع وأضف بعده شرطة ('السا- الساعة السادسة').",
      repetition_desc_en: "Deliberate repetition: when whole words or phrases are clearly repeated ('I am going I am going home'), transcribe every occurrence explicitly.",
      repetition_desc_ar: "التكرار الحقيقي: إذا كرر المتحدث كلمة أو عبارة كاملة ('أنا رايح أنا رايح على البيت')، اكتب جميع مرات التكرار دون دمج."
    },
    {
      id: "mispronunciations",
      title: { en: "Mispronounced Words", ar: "الكلمات المنطوقة خطأ" },
      rule_en: "When a word is mispronounced but intended word is clear from context, write intended word ('shut the cufboard' -> 'shut the cupboard'). NEVER change word order or fix grammar.",
      rule_ar: "إذا كان النطق خاطئاً لكن الكلمة المقصودة واضحة، اكتب الكلمة الصحيحة المقصودة. لا تصحح قواعد الجملة، ولا تعد ترتيب الكلمات أو صياغتها."
    },
    {
      id: "singing-music",
      title: { en: "Musical Content & Singing", ar: "الموسيقى والغناء" },
      rule_en: "Sung lyrics in target language: transcribed as words. Sung lyrics in foreign language: follow foreign rule. Instrumental music inside audio: <non_speech>. Audio with no speech at all: <empty>. PROHIBITED: inventing tags like [sing].",
      rule_ar: "الغناء بالعربية ينسخ ككلام عادي. الغناء بلغة أخرى يتبع قاعدة اللغة الأجنبية. الموسيقى بلا كلمات داخل ملف فيه كلام: <non_speech>. ملف يحتوي صمت أو موسيقى فقط: <empty>. لا تنشئ وسوماً غير معتمدة مثل [sing]."
    },
    {
      id: "discourse-markers",
      title: { en: "Casual Speech & Discourse Markers", ar: "أدوات الربط والكلمات العامية" },
      rule_en: "Spoken-only particles and discourse markers ('no but ...', 'you know', 'aren't you') carry meaning/tone and MUST be transcribed. Do NOT drop them.",
      rule_ar: "احتفظ بكل الكلمات التي تحمل معنى أو نبرة، مثل: لا بس، يعني، تعرف، صح؟ لا تحذفها حتى لو حذفها النسخ الآلي."
    }
  ]
};
