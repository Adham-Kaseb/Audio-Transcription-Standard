// Comprehensive 70-Question Dataset for MSA Audio Transcription Certification Exam
// Strict adherence to MSA_Audio_Transcription_Guidelines.md

const EXAM_DATA = {
  info: {
    title: "اختبار التأهيل المعياري الحاسم لتفريغ الصوتيات (MSA Exam)",
    totalQuestions: 70,
    passingPercentage: 85,
    categories: [
      { id: "pre_task_audit", title: "1. التحقق الأولي والأهلية", count: 10 },
      { id: "annotation_tags", title: "2. وسوم التوسيم والبيئة والتردد", count: 15 },
      { id: "formatting_rules", title: "3. قواعد التنسيق والأرقام والحروف", count: 15 },
      { id: "speech_disfluencies", title: "4. التأتأة والبدايات الخاطئة والأخطاء اللفظية", count: 15 },
      { id: "complex_overlaps", title: "5. الحالات المعقدة وتداخل المتحدثين", count: 15 }
    ]
  },

  questions: [
    // ==========================================
    // CATEGORY 1: Pre-Task Audit & Eligibility (Q1 - Q10)
    // ==========================================
    {
      id: 1,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 30,
      questionText: "استمعت إلى تسجيل صوتي يتحدث فيه شخص باللهجة المصرية العامية بشكل كامل. ما هو الإجراء الصحيح الذي يجب عليك اتخاذه؟",
      heardText: "ازيك يا باشا، احنا عايزين نعمل الشغل ده دلوقتي حالا ومش هنستنى لبلال.",
      options: [
        "أقوم بتفريغ الكلام كما هو بالعامية المصرية.",
        "أقوم بتحويل الكلام العامي إلى لغة عربية فصحى حديثة ثم تفريغه.",
        "اختيار 'الصوت ليس باللغة العربية الفصحى الحديثة' من القائمة المنسدلة والضغط على إرسال للانتقال للمهمة التالية دون تفريغ.",
        "وضع وسم <foreign_start> قبل الكلام وسم <foreign_end> بعده ثم تفريغه."
      ],
      correctAnswer: 2,
      explanation: "المهمة مخصصة فقط للغة العربية الفصحى الحديثة (MSA). إذا كان الصوت باللهجة العامية، يجب عدم تفريغه واختيار 'الصوت ليس باللغة العربية الفصحى الحديثة' من القائمة المنسدلة."
    },
    {
      id: 2,
      category: "pre_task_audit",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "هل يتم تعويض التفريغ النصي المنجز على تسويغ أو تفريغ تسريبات صوتية غير منطوقة باللغة العربية الفصحى الحديثة؟",
      heardText: "سؤال حول سياسة التعويض المالي للعمل على أصوات غير فصحى.",
      options: [
        "نعم، يتم تعويض العمل طالما تم كتابته بدقة.",
        "لا، لن يتم تعويض أي عمل منجز على أصوات غير فصحى حديثة إطلاقاً."
      ],
      correctAnswer: 1,
      explanation: "تؤكد الإرشادات بوضوح: 'لن يتم تعويض العمل المنجز على الصوت غير الفصحى الحديثة'."
    },
    {
      id: 3,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 30,
      questionText: "ماذا يحدث إذا قمت بترك القائمة المنسدلة الخاصة بالتحقق من لغة الصوت بدون اختيار وأردت تسليم المهمة؟",
      heardText: "محاولة الضغط على زر الإرسال مع ترك القائمة المنسدلة خالية.",
      options: [
        "سيتم تسليم المهمة تلقائياً واختيار الفصحى افتراضياً.",
        "ترك القائمة بدون اختيار سيمنعك من إرسال المهمة والانتقال للمهمة التالية.",
        "سيتم احتساب المهمة كملف صامت <empty>.",
        "سيتم رفض الحساب وحظره فوراً."
      ],
      correctAnswer: 1,
      explanation: "ينص الدليل على: 'ترك القائمة بدون اختيار سيمنعك من الإرسال'."
    },
    {
      id: 4,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 35,
      questionText: "تسجيل صوتي كامل يحتوي فقط على موسيقى بيانو آلي بدون أي كلام منطوق. ما النص الواجب تفريغه؟",
      heardText: "[موسيقى عزف بيانو هادئة لمدة 15 ثانية دون أي صوت بشري]",
      options: [
        "موسيقى بيانو هادئة",
        "<non_speech>",
        "<empty>",
        "ترك مربع النص فارغاً تماماً"
      ],
      correctAnswer: 2,
      explanation: "إذا كان الملف صامتاً تماماً أو يحتوي على موسيقى آلية فقط دون أي كلام، يُستخدم الوسم <empty> بمفرده دون تدوين أي نص."
    },
    {
      id: 5,
      category: "pre_task_audit",
      type: "tag_picker",
      timerSeconds: 30,
      questionText: "بدأ متحدث غير ناطق أصلي باللغة العربية دوره الكلامي في التسجيل الصوتي. أين وكيف نضع الوسم المناسب؟",
      heardText: "Good morning... صباح الخير جميعا، انا سعيد جدا بالوجود معكم.",
      options: [
        "وضع <non-native> قبل كل كلمة ينطقها المتحدث.",
        "وضع <non-native> مرة واحدة فقط في بداية دوره الكلامي ثم تفريغ كلامه بشكل طبيعي.",
        "وضع <foreign_start> <non-native> <foreign_end> قبل التفريغ.",
        "تصحيح أخطائه النحوية واللغوية دون وضع وسوم."
      ],
      correctAnswer: 1,
      explanation: "يُوضع الوسم <non-native> في بداية دور الكلام للمتحدث غير الناطق الأصلي فقط، ثم يُنسخ كلامه بصورة طبيعية دون تصحيح قواعده."
    },
    {
      id: 6,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 30,
      questionText: "إذا اخترت عن طريق الخطأ 'الصوت ليس باللغة العربية الفصحى الحديثة' لتسجيل صوتي كان بالفصحى بالفعل وقمت بالإرسال، ما النتيجة؟",
      heardText: "خطأ في اختيار القائمة المنسدلة لتسجيل فصيح.",
      options: [
        "يمكنك التعديل لاحقاً من لوحة التحكم.",
        "لن تُعالج المهمة ولن يُحتسب العمل المنجز عليها.",
        "سيقوم المشرف بتصحيح الاختيار تلقائياً.",
        "سيتم إرجاع المهمة لك لإعادة التقييم."
      ],
      correctAnswer: 1,
      explanation: "ينص التحذير في الدليل على: 'إذا اخترت (الصوت ليس باللغة العربية الفصحى الحديثة) عن طريق الخطأ، فلن تُعالج المهمة'."
    },
    {
      id: 7,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 30,
      questionText: "يتحدث المتحدث باللغة العربية الفصحى الحديثة، لكنه يرتكب أخطاء نحوية فادحة (مثل رفع المجرور). كيف تفرغ كلامه؟",
      heardText: "ذهبت إلى المطارُ الصباحَ.",
      options: [
        "ذهبت إلى المطارِ الصباحَ. (تصحيح الكسرة)",
        "ذهبت إلى المطارُ الصباحَ. (التفريغ الحرفي 100% كما نطق دون تصحيح قواعدي)",
        "ذهبت إلى <unintelligible> الصباحَ.",
        "وضع وسم <non-native> قبل الجملة لتبرير الخطأ النحوي."
      ],
      correctAnswer: 1,
      explanation: "المبدأ الأساسي هو التفريغ الحرفي 100% دون تصحيح القواعد اللغوية أو إعادة صياغة الجمل."
    },
    {
      id: 8,
      category: "pre_task_audit",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "هل يحق للمفرغ حذف كلمات الحشو والتكرارات البسيطة لـ 'تنظيف' النص وتحسين جودة القراءة؟",
      heardText: "سؤال حول تحسين وقراءة النص المنقح.",
      options: [
        "نعم، يُفضل تنظيف الكلام ليصبح سلس القراءة.",
        "لا، يُمنع منعاً باتاً تنظيف الكلام أو حذف أي تردد أو تكرار."
      ],
      correctAnswer: 1,
      explanation: "ينص الدليل على: 'اكتب ما يُقال فعلياً ودون إعادة صياغة أو تغيير للترتيب أو تنظيف للكلام'."
    },
    {
      id: 9,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 35,
      questionText: "تسجيل صوتي يحتوي على مقطع باللغة الإنكليزية مدته 40 ثانية (أكثر من جملتين كاملتين) وهو واضح ومفهوم. ما هو التصرف الصحيح؟",
      heardText: "This is a detailed presentation about the economic strategy for the upcoming fiscal year...",
      options: [
        "ترجمة المقطع إلى العربية الفصحى.",
        "إحاطة النص بالوسمين <foreign_start> و <foreign_end> وتفريغ النص الإنكليزي بينهما.",
        "استبدال المقطع بالكامل بالوسم <unintelligible>.",
        "اختيار 'الصوت ليس باللغة العربية الفصحى الحديثة' لأن التسجيل يحتوي لغة أجنبية."
      ],
      correctAnswer: 1,
      explanation: "المقاطع الأجنبية المفهومة الطويلة يُحتفظ بها وتُنسخ بين الوسمين <foreign_start> و <foreign_end>."
    },
    {
      id: 10,
      category: "pre_task_audit",
      type: "mcq",
      timerSeconds: 30,
      questionText: "ما هما المستويان اللذان يتكون منهما دليل تفريغ الصوتيات المعياري؟",
      heardText: "سؤال هيكلي عن مستويات الدليل المعياري.",
      options: [
        "مستوى الصوتيات ومستوى الترددات.",
        "قواعد التنسيق (القسم 2) ووسوم التوسيم (القسم 3).",
        "التفريغ الآلي والتفريغ البشري.",
        "قواعد الإملاء وقواعد الإعراب."
      ],
      correctAnswer: 1,
      explanation: "يُستخدم مستويان معاً: قواعد التنسيق (القسم 2) ووسوم التوسيم (القسم 3)."
    },

    // ==========================================
    // CATEGORY 2: Annotation Tags & Fillers (Q11 - Q25)
    // ==========================================
    {
      id: 11,
      category: "annotation_tags",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "قم بتفريغ المسموع التالي بدقة مع وضع الوسم الصحيح للتردد والتوقف الصوتي خالي المعنى:",
      heardText: "ذهبت إلى آآآ المتجر يوم أمس.",
      targetAnswer: "ذهبت إلى <fill> المتجر يوم أمس.",
      explanation: "التوقفات الصوتية مثل (آآ، أمم، uh, um) تُستبدل بالوسم <fill> في موضعها تماماً."
    },
    {
      id: 12,
      category: "annotation_tags",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "حدد الخطأ في التفريغ التالي للنص المسموع (المسموع: 'أمم دعني أفكر في الأمر'):",
      heardText: "أمم دعني أفكر في الأمر",
      options: [
        "التفريغ صحيح تماماً.",
        "الخطأ هو كتابة كلمة الحشو والتردد 'أمم' ككلمة عادية بدلاً من استبدالها بالوسم <fill>.",
        "الخطأ هو عدم وضع وسم <vocal_noise>.",
        "الخطأ هو عدم وضع علامة تعجب."
      ],
      correctAnswer: 1,
      explanation: "كلمات التردد والحشو لا تُكتب ككلمات بل تُستبدل بالوسم <fill>."
    },
    {
      id: 13,
      category: "annotation_tags",
      type: "mcq",
      timerSeconds: 35,
      questionText: "المتحدث قال ممتعضاً من الألم: 'آخ! هذا يؤلمني جداً'. كيف تفرغ كلمة التعجب 'آخ'؟",
      heardText: "آخ هذا يؤلمني جدا",
      options: [
        "<fill> هذا يؤلمني جداً.",
        "<vocal_noise> هذا يؤلمني جداً.",
        "آخ هذا يؤلمني جداً. (تكتب ككلمة عادية لأن التعبر عن الألم يحمل معنى انفعالياً)",
        "<unintelligible> هذا يؤلمني جداً."
      ],
      correctAnswer: 2,
      explanation: "التعجبات والكلمات المحاكية للأصوات التي تحمل معنى (مثل التعبير عن الألم 'آخ/ouch' أو الدهشة 'واو/wow') تُكتب ككلمات عادية ولا تُوسم بـ <fill>."
    },
    {
      id: 14,
      category: "annotation_tags",
      type: "tag_picker",
      timerSeconds: 30,
      questionText: "سعل المتحدث في منتصف جملته قائلاً: 'أعتقد [سعل المتحدث] أننا يجب أن نغادر'. اختر الوسم المناسب مكان السعال:",
      heardText: "أعتقد (صوت سعال) أننا يجب أن نغادر",
      options: [
        "<fill>",
        "<vocal_noise>",
        "<non_speech>",
        "<unintelligible>"
      ],
      correctAnswer: 1,
      explanation: "الأصوات البشرية غير اللفظية مثل السعال والضحك والتنهد والتنحنح تُوسم بـ <vocal_noise>."
    },
    {
      id: 15,
      category: "annotation_tags",
      type: "tag_picker",
      timerSeconds: 30,
      questionText: "سُمِع صوت ارتطام باب بقوة في الخلفية أثناء الحديث. ما الوسم المناسب لهذا الصوت البيئي؟",
      heardText: "وبعد ذلك (صوت إغلاق باب بقوة) خرجت من القاعة.",
      options: [
        "<vocal_noise>",
        "<non_speech>",
        "<crosstalk>",
        "<background_speech>"
      ],
      correctAnswer: 1,
      explanation: "الأصوات البيئية غير البشرية مثل ارتطام باب أو صوت صفير أو نقر تُوسم بـ <non_speech>."
    },
    {
      id: 16,
      category: "annotation_tags",
      type: "error_spotting",
      timerSeconds: 40,
      questionText: "ما الخطأ في التفريغ التالي لمقطع صوتي يتداخل فيه عدة متحدثين في نفس الوقت ولا يمكن فهم أي كلمة إطلاقاً؟",
      heardText: "تداخل صارخ وصاخب لثلاثة أشخاص ينادون في نفس اللحظة.",
      options: [
        "التفريغ المقدم: `<crosstalk> الميزانية الكلية`",
        "الخطأ هو كتابة كلمات نصية داخل مقطع موسوم بـ <crosstalk>، حيث يُحظر كتابة أي كلمة معه.",
        "الخطأ هو عدم وضع وسم <unintelligible> بدلاً منه.",
        "الخطأ هو عدم كتابة أسماء المتحدثين."
      ],
      correctAnswer: 1,
      explanation: "عند استخدام الوسم <crosstalk> للتداخل الصاخب غير المفهوم للجميع، لا يجوز كتابة أي كلمات إطلاقاً داخل المقطع."
    },
    {
      id: 17,
      category: "annotation_tags",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "قم بتفريغ المسموع التالي عند ضياع كلمة واحدة بسبب صوت ضوضاء خارجي مفاجئ:",
      heardText: "وقال [كلمة مفقودة بسبب الضوضاء] إنه سيتصل بنا غداً.",
      targetAnswer: "وقال <unintelligible> إنه سيتصل بنا غداً.",
      explanation: "عند تعذر فهم كلمة أو جزء من الكلام بسبب الضوضاء، يُستبدل هذا الجزء فقط بالوسم <unintelligible>."
    },
    {
      id: 18,
      category: "annotation_tags",
      type: "mcq",
      timerSeconds: 35,
      questionText: "أي من الصيغ التالية تعتبر الصيغة القياسية الصحيحة للوسوم بحسب الدليل المعياري؟",
      heardText: "سؤال عن شكل الأقواس والأحرف في الوسوم.",
      options: [
        "[VOCAL_NOISE]",
        "<vocal_noise>",
        "(vocal_noise)",
        "{vocal-noise}"
      ],
      correctAnswer: 1,
      explanation: "جميع الوسوم تُكتب بحروف صغيرة ومحاطة بقوسين زاويين مفردين <like_this>."
    },
    {
      id: 19,
      category: "annotation_tags",
      type: "mcq",
      timerSeconds: 35,
      questionText: "متحدث يقول: 'واو! هذا إنجاز رائع جداً'. كيف تفرغ كلمة 'واو'؟",
      heardText: "واو هذا إنجاز رائع جدا",
      options: [
        "<fill> هذا إنجاز رائع جداً.",
        "واو هذا إنجاز رائع جداً.",
        "<vocal_noise> هذا إنجاز رائع جداً.",
        "حذف كلمة واو وكتابة: هذا إنجاز رائع جداً."
      ],
      correctAnswer: 1,
      explanation: "كلمة 'واو' تعبر عن الإعجاب والدهشة وتحمل معنى انفعالياً، فتُكتب ككلمة عادية بدون وسم."
    },
    {
      id: 20,
      category: "annotation_tags",
      type: "tag_picker",
      timerSeconds: 35,
      questionText: "بينما كان المتحدث الرئيس يتكلم، بدأ شخص آخر في خلفية الغرفة يتحدث بصوت خافت مسموع. ما الوسم الذي يُوضع قبل تفريغ كلام شخص الخلفية؟",
      heardText: "متحدث في الخلفية يقول: ينطلق القطار في الظهيرة.",
      options: [
        "<background_speech>",
        "<crosstalk>",
        "<vocal_noise>",
        "<foreign_start>"
      ],
      correctAnswer: 0,
      explanation: "عند ظهور صوت متحدث ثانٍ مسموع في الخلفية يتداخل مع الكلام، يُستخدم الوسم <background_speech>."
    },
    {
      id: 21,
      category: "annotation_tags",
      type: "mcq",
      timerSeconds: 30,
      questionText: "عبارة أجنبية فرنسية قصيرة وشائعة جداً في الحديث مثل 'bon appétit'. كيف تفرغها؟",
      heardText: "وقال للجميع bon appétit قبل الأكل.",
      options: [
        "وقال للجميع <foreign_start> bon appétit <foreign_end> قبل الأكل.",
        "وقال للجميع bon appétit قبل الأكل. (تفرغ ككلمات أجنبية بين وسمي foreign)",
        "ترجمتها إلى: بالعافية.",
        "استبدالها بـ <unintelligible>."
      ],
      correctAnswer: 0,
      explanation: "العبارات والكلمات الأجنبية المحاطة بمقطع أجنبي تفكك بـ <foreign_start> المقطع <foreign_end>."
    },
    {
      id: 22,
      category: "annotation_tags",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "المتحدث قال كلمة أجنبية واحدة شائعة ومستخدمة عالمياً مثل 'okay'. هل يجب وضع وسم <foreign_start> حولها؟",
      heardText: "سؤال عن الكلمات الأجنبية الفردية الشائعة مثل okay.",
      options: [
        "نعم، أي كلمة غير عربية يجب وسمها فوراً.",
        "لا، الكلمات الأجنبية القصيرة الشائعة جداً تُنسخ بشكل طبيعي دون وسوم."
      ],
      correctAnswer: 1,
      explanation: "الكلمات الأجنبية القصيرة والشائعة جداً التي يُفهم معناها دولياً (مثل okay) تُنسخ بشكل طبيعي دون وسم."
    },
    {
      id: 23,
      category: "annotation_tags",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "ما الخطأ في التفريغ التالي: 'went to the um store' للنص المسموع الإنجليزي؟",
      heardText: "I went to the um store",
      options: [
        "كتابة كلمة الحشو 'um' بدلاً من استبدالها بـ <fill>.",
        "عدم كتابة الجملة باللغة العربية.",
        "عدم إضافة نقطة في النهاية.",
        "استخدام حروف صغيرة."
      ],
      correctAnswer: 0,
      explanation: "كلمات الحشو باللغة الإنجليزية مثل um و uh تُستبدل أيضاً بالوسم <fill> وتطبيق نفس القاعدة."
    },
    {
      id: 24,
      category: "annotation_tags",
      type: "mcq",
      timerSeconds: 30,
      questionText: "تسجيل صوتي يحتوي على مقطع أجنبي بلغة غير معروفة للمفرغ وغير مفهومة إطلاقاً. كيف يتم توسيم هذا المقطع؟",
      heardText: "جملة بلغة أجنبية غامضة وغير مفهومة.",
      options: [
        "<unintelligible>",
        "<foreign_start> <unintelligible> <foreign_end>",
        "<foreign_start> <foreign_end>",
        "تخمين الكلمات وكتابتها."
      ],
      correctAnswer: 1,
      explanation: "إذا كان المقطع الأجنبي غير مفهوم، يُوضع الوسم <unintelligible> بين وسمي <foreign_start> و <foreign_end>."
    },
    {
      id: 25,
      category: "annotation_tags",
      type: "tag_picker",
      timerSeconds: 30,
      questionText: "انقطع التسجيل الصوتي في بداية الكلمة الأولى من الجملة دون معرفة بقيتها. ما الوسم الواجب وضعه عند الحد المتأثر؟",
      heardText: "...noon everyone (انقطعت بداية كلمة afternoon)",
      options: [
        "<cut-off>",
        "<unintelligible>",
        "<empty>",
        "<fill>"
      ],
      correctAnswer: 0,
      explanation: "عندما يبدأ التسجيل أو ينتهي في منتصف كلمة، يُوضع الوسم <cut-off> عند الحد المتأثر."
    },

    // ==========================================
    // CATEGORY 3: Formatting, Numbers, Letters & Symbols (Q26 - Q40)
    // ==========================================
    {
      id: 26,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 35,
      questionText: "نطق المتحدث الجملة التالية: 'ولدت في عام 1975'. كيف تفرغ الرقم 1975؟",
      heardText: "ولدت في عام 1975",
      options: [
        "وُلدت في عام 1975.",
        "وُلدت في عام ألف وتسعمائة وخمسة وسبعين.",
        "وُلدت في عام ألف-وتسعمائة-وخمسة-وسبعين.",
        "وُلدت في عام 1 9 7 5."
      ],
      correctAnswer: 1,
      explanation: "تُكتب الأرقام والتواريخ بالكلمات تماماً كما نُطقت، وتُكتب الأعداد المركبة ككلمات منفصلة دون شرطات."
    },
    {
      id: 27,
      category: "formatting_rules",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "ما الخطأ في التفريغ التالي: 'عمري ستة-وأربعون عاماً'؟",
      heardText: "عمري ستة وأربعون عاماً",
      options: [
        "استخدام الشرطة (-) بين كلمات العدد المركب، حيث تُحظر الشرطات داخل الأعداد المركبة.",
        "عدم كتابة العدد بالأرقام 46.",
        "كتابة ستة بدلاً من 6.",
        "عدم إضافة وسم <fill>."
      ],
      correctAnswer: 0,
      explanation: "تُكتب الأعداد المركبة ككلمات منفصلة من دون شرطات. يُحظر استخدام الشرطة داخل الأعداد."
    },
    {
      id: 28,
      category: "formatting_rules",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "نطق المتحدث رمزه السري (PIN) رقماً رقماً قاصداً: 'واحد تسعة ستة أربعة'. قم بتفريغه كما نطق بالكلمات:",
      heardText: "الرمز السري هو واحد تسعة ستة أربعة",
      targetAnswer: "الرمز السري هو واحد تسعة ستة أربعة",
      explanation: "أرقام الهواتف والرموز السرية تفرغ بالكلمات رقماً رقماً بحسب النطق."
    },
    {
      id: 29,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 35,
      questionText: "متى يُسمح باستخدام الأرقام الرقمية (Digits مثل 1، 2، 3) في التفريغ؟",
      heardText: "سؤال عن استثناء استخدام الأرقام الرقمية.",
      options: [
        "في جميع التواريخ والأسعار.",
        "في أرقام الهواتف فقط.",
        "فقط عندما تكون الأرقام جزءاً رسمياً من اسم علامة تجارية (مثل 3M أو Pepsi Max 0).",
        "لا يُسمح بها إطلاقاً في أي حالة."
      ],
      correctAnswer: 2,
      explanation: "ينص الدليل على: 'لا تُستخدم الأرقام الرقمية إلا إذا كانت جزءاً من اسم علامة تجارية'."
    },
    {
      id: 30,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 35,
      questionText: "نطق المتحدث اسمه متهجئاً الحروف الإنجليزية: 'my name is Dana spelled D A N A'. كيف تكتب التهجئة؟",
      heardText: "my name is Dana spelled D A N A",
      options: [
        "spelled D.A.N.A.",
        "spelled D A N A",
        "spelled D-A-N-A",
        "spelled DANA"
      ],
      correctAnswer: 1,
      explanation: "عند تهجئة الحروف، تُكتب كحروف كبيرة يفصل بين كل حرف وآخر مسافة واحدة دون نقاط أو شرطات."
    },
    {
      id: 31,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 35,
      questionText: "نطق المتحدث اختصار منظمة يُنطق ككلمة واحدة (Acronym) مثل 'UNESCO'. كيف تفرغه؟",
      heardText: "يعمل في منظمة UNESCO",
      options: [
        "U N E S C O",
        "UNESCO",
        "U.N.E.S.C.O.",
        "unesco"
      ],
      correctAnswer: 1,
      explanation: "الاختصارات المنطوقة ككلمة واحدة (Acronyms) تُكتب بحروف كبيرة قياسية دون نقاط أو مسافات."
    },
    {
      id: 32,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 35,
      questionText: "نطق المتحدث اختصاراً حرفياً يُنطق حرفاً حرفاً (Initialism) مثل 'F B I'. كيف تكتبه؟",
      heardText: "يعمل لدى F B I",
      options: [
        "FBI",
        "F.B.I.",
        "F B I",
        "f b i"
      ],
      correctAnswer: 2,
      explanation: "الاختصارات الحرفية التي تُنطق حرفاً حرفاً (Initialisms) تُكتب بحروف كبيرة يفصل بينها مسافة واحدة (F B I)."
    },
    {
      id: 33,
      category: "formatting_rules",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "نطق المتحدث عنوان بريده الإلكتروني قائلاً: 'بات دوت جونز آت كومباني دوت كوم'. أكتب النص المنسوخ بالكلمات:",
      heardText: "Pat dot Jones at Company dot com",
      targetAnswer: "بات دوت جونز آت كومباني دوت كوم",
      explanation: "الرموز الخاصة مثل @ و & و # و dot لا تُكتب كرموز بل تُكتب بالكلمات المنطوقة المقابلة لها."
    },
    {
      id: 34,
      category: "formatting_rules",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "ما الخطأ في التفريغ التالي: 'قال د. جونز إن وزني 170 lbs'؟",
      heardText: "قال الدكتور جونز إن وزني مئة وسبعون رطلاً",
      options: [
        "استخدام الاختصارات المكتوبة (د. و lbs) والأرقام بدلاً من كتابة الكلمات كاملة كما نُطقت.",
        "عدم وضع وسم <vocal_noise>.",
        "كتابة الدكتور بحرف كبير.",
        "عدم وضع وسم <cut-off>."
      ],
      correctAnswer: 0,
      explanation: "إذا نُطقت الكلمة كاملة يجب كتابتها كاملة، ولا تُستخدم الصيغ المختصرة المكتوبة مثل Dr. أو lbs. والأرقام تُكتب بالكلمات."
    },
    {
      id: 35,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 35,
      questionText: "نطق المتحدث الاسم الملكي: 'Henry the eighth'. كيف يُفرغ العدد الترتيبي؟",
      heardText: "Henry the eighth",
      options: [
        "Henry VIII",
        "Henry 8th",
        "Henry the eighth",
        "Henry 8"
      ],
      correctAnswer: 2,
      explanation: "تُكتب الأرقام الرومانية والأعداد الترتيبية بالكلمات تماماً كما تُنطق (Henry the eighth)."
    },
    {
      id: 36,
      category: "formatting_rules",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "هل تُستخدم الشرطات (Hyphens) داخل الأعداد المركبة مثل 'تسعة-وعشرون'؟",
      heardText: "سؤال عن استخدام الشرطة في الأعداد المركبة.",
      options: [
        "نعم، تُستخدم الشرطة دائماً للربط بين أجزاء الأعداد.",
        "لا، يُمنع استخدام الشرطة مطلقاً داخل الأعداد المركبة وتُكتب ككلمات منفصلة."
      ],
      correctAnswer: 1,
      explanation: "تُستخدم الشرطة فقط للدلالة على البدايات الخاطئة، ولا تُستخدم داخل الأعداد المركبة إطلاقاً."
    },
    {
      id: 37,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 30,
      questionText: "قال المتحدث: 'Federal Bureau of Investigation' ناطقاً الاسم كاملاً دون اختصار. كيف تفريغه؟",
      heardText: "Federal Bureau of Investigation",
      options: [
        "F B I",
        "FBI",
        "Federal Bureau of Investigation",
        "F.B.I."
      ],
      correctAnswer: 2,
      explanation: "إذا نطق المتحدث الاسم الكامل بدلاً من الاختصار، فيجب تفريغ الكلمات كاملة كما نُطقت دون تحويلها لاختصار."
    },
    {
      id: 38,
      category: "formatting_rules",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "قم بتفريغ المسموع التالي المتعلق بالرمز الخاص هاشتاغ: 'تابعونا على هاشتغ التقنية اليوم'.",
      heardText: "تابعونا على هاشتغ التقنية اليوم",
      targetAnswer: "تابعونا على هاشتغ التقنية اليوم",
      explanation: "الرمز # يُكتب بالكلمة المنطوقة (هاشتاغ / هاشتغ) ولا يُرسم كرمز #."
    },
    {
      id: 39,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 30,
      questionText: "ما هي القاعدة القياسية لاستخدام الفواصل العليا (Apostrophes) في الكلمات الأجنبية المنسوخة؟",
      heardText: "I don't remember",
      options: [
        "حذف الفاصلة العليا دائماً وكتابة idont.",
        "تُستخدم بالطريقة المعتادة في الاختصارات وحالات الملكية (مثل I don't).",
        "استبدالها بشرطة -.",
        "استبدالها بمسافة."
      ],
      correctAnswer: 1,
      explanation: "تُستخدم الفواصل العليا بالطريقة القياسية المعتادة في الاختصارات وحالات الملكية للغات الأجنبية."
    },
    {
      id: 40,
      category: "formatting_rules",
      type: "mcq",
      timerSeconds: 30,
      questionText: "كيف تفرغ علامات الترقيم (النقاط، الفواصل، علامات الاستفهام والتعجب) في التفريغ الحرفي؟",
      heardText: "سؤال حول استخدام علامات الترقيم في التفريغ.",
      options: [
        "يُمنع استخدام علامات الترقيم نهائياً.",
        "يجب استخدام علامات الترقيم القياسية (النقاط، الفواصل، علامات الاستفهام والتعجب) لإيضاح بنية الجملة.",
        "تُستبدل علامات الترقيم بـ <fill>.",
        "تُوضع علامات الترقيم بعد الوسوم فقط."
      ],
      correctAnswer: 1,
      explanation: "تنص القواعد على وجوب استخدام النقاط والفواصل وعلامات الاستفهام والتعجب بشكل قياسي."
    },

    // ==========================================
    // CATEGORY 4: Speech Disfluencies & Pronunciation (Q41 - Q55)
    // ==========================================
    {
      id: 41,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 35,
      questionText: "تأتأ المتحدث في بداية كلمة 'لكن' قائلاً: 'لـ-لكن حاولت جاهداً'. كيف تفرغ هذه التأتأة؟",
      heardText: "لـ-لكن حاولت جاهداً",
      options: [
        "لـ-لكن حاولت جاهداً.",
        "لكن حاولت جاهداً. (حذف الجزء المكسور من التأتأة والاحتفاظ بالكلمة المكتملة فقط)",
        "<fill> حاولت جاهداً.",
        "ل- لكن حاولت جاهداً."
      ],
      correctAnswer: 1,
      explanation: "في التأتأة، إذا بدأت الكلمة بشكل متقطع ثم اكتملت، يُنسخ اللفظ المكتمل فقط وتُحذف المقاطع المكسورة."
    },
    {
      id: 42,
      category: "speech_disfluencies",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "تراجع المتحدث عن كلمة بدأها وقام بتصحيحها ذاتياً: 'لنفعل ذلك في الساد- في السادسة والنصف'. قم بتفريغ الجملة بدقة:",
      heardText: "لنفعل ذلك في الساد- في السادسة والنصف",
      targetAnswer: "لنفعل ذلك في الساد- في السادسة والنصف",
      explanation: "في البداية الخاطئة والتصحيح الذاتي، يُحتفظ بالجزء المبتور متبوعاً بشرطة (-) ثم الكلمة المصححة."
    },
    {
      id: 43,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 35,
      questionText: "كرر المتحدث جملة متعامداً لتأكيد المعنى: 'أنا قادم أنا قادم إلى المنزل'. كيف تفرغ التكرار؟",
      heardText: "أنا قادم أنا قادم إلى المنزل",
      options: [
        "أنا قادم إلى المنزل. (حذف التكرار)",
        "أنا قادم أنا قادم إلى المنزل. (نسخ جميع مرات التكرار المتعمد)",
        "أنا قادم <fill> إلى المنزل.",
        "أنا قادم- أنا قادم إلى المنزل."
      ],
      correctAnswer: 1,
      explanation: "إذا كرر المتحدث كلمة أو عبارة كاملة بشكل متعمد، يجب نسخ جميع مرات التكرار كما نُطقت."
    },
    {
      id: 44,
      category: "speech_disfluencies",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "المتحدث نطق كلمة المطبخ خطأً بالإنجليزية: 'shut the cufboard' مقصوداً بها 'cupboard'. كيف تفرغ هذه الكلمة المنطوقة خاطئاً؟",
      heardText: "shut the cufboard",
      options: [
        "تفريغ النص: `shut the cufboard` (نسخ الخطأ اللفظي بحروفه الخاطئة)",
        "تفريغ النص: `shut the cupboard` (تصحيح الكلمة المنطوقة خاطئاً إلى إملائها الصحيح المقصود)",
        "تفريغ النص: `shut the <unintelligible>`",
        "تفريغ النص: `shut the cuf- cupboard`"
      ],
      correctAnswer: 1,
      explanation: "إذا نُطقت كلمة بشكل غير صحيح ولكن الكلمة المقصودة واضحة من السياق، فاكتب الكلمة المقصودة الصحيحة إملائياً."
    },
    {
      id: 45,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 30,
      questionText: "قال المتحدث علامة خطاب وتأكيد في نهاية الجملة: 'أنت قادم، أليس كذلك؟'. هل يجوز حذف 'أليس كذلك؟'؟",
      heardText: "أنت قادم أليس كذلك",
      options: [
        "نعم، يجوز حذفها لأنها مجرد زائدة كلامية.",
        "لا، يجب المحافظة عليها ونسخها كاملة لأن علامات الخطاب تحمل معنى تداولياً وموقفياً.",
        "تُستبدل بـ <fill>.",
        "توضع بين قوسين."
      ],
      correctAnswer: 1,
      explanation: "علامات الخطاب والجزيئات الكلامية الشفهية تُنسخ في موضعها الصحيح ولا تُحذف إطلاقاً."
    },
    {
      id: 46,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 35,
      questionText: "كيف تتعامل مع الكيانات المسمّاة (أسماء الأشخاص والأماكن والشركات) في التفريغ؟",
      heardText: "سؤال عن أسماء الكيانات والتهجئة الصحيحة.",
      options: [
        "كتابتها كما يُسمع صوتها بغض النظر عن قواعدها.",
        "تصحيحها إلى تهجئتها القياسية الصحيحة اعتماداً على المرجع أو نتائج البحث الخمس الأولى على الإنترنت.",
        "استبدالها بـ <unintelligible>.",
        "وضعها جميعاً باللغة الإنجليزية."
      ],
      correctAnswer: 1,
      explanation: "تُصحح أسماء الكيانات المسماة والأماكن والعلامات التجارية لتهجئتها الصحيحة المعتمدة."
    },
    {
      id: 47,
      category: "speech_disfluencies",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "عند تصحيح كلمة نُطقت بطريقة خاطئة إلى إملائها الصحيح، هل يجوز إعادة ترتيب كلمات الجملة لتصبح القواعد النحوية صحيحة؟",
      heardText: "سؤال عن إعادة ترتيب الكلمات أثناء التصحيح.",
      options: [
        "نعم، يجب إعادة ترتيب الكلمات لتصلح الجملة نحوياً.",
        "لا، يُحظر تعديل ترتيب الكلمات ويجب اتباع الترتيب الأصلي للكلام كما نُطق."
      ],
      correctAnswer: 1,
      explanation: "ينص الدليل على: 'صحح الكلمة فقط، ولا تغير ترتيب الكلمات بل اتبع الترتيب الأصلي للكلام'."
    },
    {
      id: 48,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 30,
      questionText: "تأتأ المتحدث بالإنجليزية قائلاً: 'bu-but I tried'. ما التفريغ الصحيح؟",
      heardText: "bu-but I tried",
      options: [
        "bu-but I tried",
        "but I tried",
        "<fill> I tried",
        "bu- I tried"
      ],
      correctAnswer: 1,
      explanation: "تُحذف المقاطع المكسورة الناتجة عن التأتأة ويُكتفى بالكلمة المكتملة الصحيحة (but I tried)."
    },
    {
      id: 49,
      category: "speech_disfluencies",
      type: "verbatim_input",
      timerSeconds: 45,
      questionText: "قال المتحدث بداية خاطئة بالإنجليزية: 'let's meet at fi- at six'. أكتب النص المنسوخ الصحيح مع الشرطة:",
      heardText: "let's meet at fi- at six",
      targetAnswer: "let's meet at fi- at six",
      explanation: "البداية الخاطئة تُحتفظ فيها الكلمة المبتورة متبوعة بشرطة (-) ثم التصحيح."
    },
    {
      id: 50,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 30,
      questionText: "ما الفرق بين التأتأة (Stuttering) والبداية الخاطئة (False Start) في التقييم؟",
      heardText: "سؤال مقارنة بين التأتأة والبداية الخاطئة.",
      options: [
        "التأتأة يُحتفظ بالجزء المكسور، والبداية الخاطئة يُحذف.",
        "التأتأة يُحذف منها الجزء المكسور، بينما البداية الخاطئة يُحتفظ فيها بالجزء المبتور متبوعاً بشرطة.",
        "كلاهما يستبدل بالوسم <fill>.",
        "لا يوجد أي فرق بينهما."
      ],
      correctAnswer: 1,
      explanation: "في التأتأة تُلغى المقاطع المكسورة، أما في البداية الخاطئة والتصحيح الذاتي فيُحتفظ بالجزء المبتور مع شرطة."
    },
    {
      id: 51,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 30,
      questionText: "قال المتحدث في وسط الجملة: 'لا، ولكن... يجب أن نتحرك الآن'. كيف تفرغ 'لا، ولكن...'؟",
      heardText: "لا ولكن يجب أن نتحرك الآن",
      options: [
        "حذف 'لا، ولكن...' وكتابة: يجب أن نتحرك الآن.",
        "استبدالها بـ <fill> <fill>.",
        "نسخها كاملاً: لا، ولكن... يجب أن نتحرك الآن.",
        "وضع وسم <vocal_noise>."
      ],
      correctAnswer: 2,
      explanation: "الكلام العفوي والجزيئات الكلامية الروابط يُحافظ عليها وتُكتب في موضعها."
    },
    {
      id: 52,
      category: "speech_disfluencies",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "ما الخطأ في تفريغ المتحدث الذي قال: 'new york' فتم تفريغها: 'نيويورك' بحروف عربية مع أن لغة التسجيل إنجليزية؟",
      heardText: "new york في تسجيل إنجليزي",
      options: [
        "يجب كتابة الكيان المسمى بتهجئته القياسية باللغة المستهدفة (New York).",
        "يجب حذف اسم المدينة.",
        "يجب وضع وسم <foreign_start>.",
        "لا يوجد أي خطأ."
      ],
      correctAnswer: 0,
      explanation: "الكيانات المسماة تُكتب بتهجئتها القياسية الصحيحة في لغة التفريغ المستهدفة."
    },
    {
      id: 53,
      category: "speech_disfluencies",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "هل يجوز للمفرغ تصحيح القواعد النحوية لمتحدث غير أصلي (Non-native) بعد وضع الوسم <non-native>؟",
      heardText: "سؤال عن تصحيح قواعد المتحدث غير الأصلي.",
      options: [
        "نعم، بعد الوسم يجب جعل كلامه فصيحاً ناصعاً.",
        "لا، يُنسخ كلامه بصورة طبيعية جداً كما قاله ودون أي تصحيح للقواعد."
      ],
      correctAnswer: 1,
      explanation: "ينص الدليل على: 'بعد وسم <non-native>، يُنسخ كلامه بصورة طبيعية دون أي تصحيح للقواعد'."
    },
    {
      id: 54,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 30,
      questionText: "نطق المتحدث كلمة 'YouTube'. كيف يفرغ هذا الاسم التجاري؟",
      heardText: "YouTube",
      options: [
        "youtube",
        "YouTube",
        "You Tube",
        "Y.O.U.T.U.B.E."
      ],
      correctAnswer: 1,
      explanation: "تُكتب العلامات التجارية الرسمية بحالة الأحرف القياسية المعتمدة لها (YouTube)."
    },
    {
      id: 55,
      category: "speech_disfluencies",
      type: "mcq",
      timerSeconds: 30,
      questionText: "متحدث كرر عبارة 'أنا أرفض' ثلاث مرات متتالية بغضب شديد. كيف تفرغ المسموع؟",
      heardText: "أنا أرفض أنا أرفض أنا أرفض",
      options: [
        "أنا أرفض.",
        "أنا أرفض <fill>.",
        "أنا أرفض أنا أرفض أنا أرفض.",
        "<vocal_noise> أنا أرفض."
      ],
      correctAnswer: 2,
      explanation: "التكرار التوكيدي أو المتعمد يُكتب كاملاً بنفس عدد المرات المنطوقة."
    },

    // ==========================================
    // CATEGORY 5: Complex Overlap Scenarios & Speaker Diarization (Q56 - Q70)
    // ==========================================
    {
      id: 56,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 40,
      questionText: "في التسجيل المتعدد المتحدثين (الحالة A): يوجد متحدث مفهوم ومتحدث آخر غير مفهوم ولكنه مسموع. كيف يتم تنظيم التفريغ؟",
      heardText: "متحدث 1 واضح، ومتحدث 2 كلامه همهمات مشوشة غير مفهومة.",
      options: [
        "دمج كلامهما في مقطع واحد.",
        "إنشاء مقطع منفصل لكل متحدث، وتفريغ المفهوم بشكل طبيعي، ووضع <unintelligible> لغير المفهوم، مع إضافة <background_speech> عند التداخل.",
        "وضع وسم <crosstalk> للملف كاملاً.",
        "حذف المتحدث غير المفهوم تماماً."
      ],
      correctAnswer: 1,
      explanation: "الحالة (A) تتطلب مقطعاً مستقلاً لكل متحدث، واستخدام <unintelligible> لغير المفهوم و <background_speech> عند نقاط التداخل."
    },
    {
      id: 57,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 40,
      questionText: "في التسجيل (الحالة B): كِلا المتحدثين مفهوم وواضح تماماً، وتداخلا في كلمة معينة. أين يُوضع الوسم <background_speech>؟",
      heardText: "تداخل متحدثين مفهومين تماماً عند كلمة معينة.",
      options: [
        "في بداية مقطع المتحدث الأول دائماً.",
        "مباشرة قبل الكلمة التي يبدأ عندها التداخل الصوتي.",
        "في نهاية المقاطع النصية.",
        "بدلاً من الكلمات المتداخلة."
      ],
      correctAnswer: 1,
      explanation: "في الحالة (B)، يُوضع الوسم <background_speech> مباشرة قبل الكلمة التي يبدأ عندها التداخل."
    },
    {
      id: 58,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 35,
      questionText: "في التسجيل (الحالة C): حدث تداخل صاخب جداً بين 3 متحدثين في نفس اللحظة ولم يعد بالإمكان فهم أي كلمة من أي شخص. كيف يُفرغ المقطع؟",
      heardText: "صراخ وتداخل جماعي مبهم كلياً.",
      options: [
        "تخمين أجزاء الكلمات المنطوقة.",
        "وضع الوسم <crosstalk> بمفرده للمقطع دون كتابة أي كلمة أخرى.",
        "كتابة <unintelligible> ثلاث مرات.",
        "تقسيم المقطع إلى 3 متحدثين مفترضين."
      ],
      correctAnswer: 1,
      explanation: "الحالة (C) تُوسم بـ <crosstalk> فقط ولا يُكتب أي نص إضافي داخل المقطع."
    },
    {
      id: 59,
      category: "complex_overlaps",
      type: "verbatim_input",
      timerSeconds: 50,
      questionText: "إذا بدأ التسجيل الصوتي في منتصف كلمة 'afternoon' وكان بقيتها 'afternoon everyone' واضحة ومفهومة من السياق. أكتب التفريغ الصحيح مع الوسم:",
      heardText: "...noon everyone (اقتطاع بداية كلمة afternoon)",
      targetAnswer: "<cut-off> afternoon everyone",
      explanation: "إذا كانت الكلمة المقطوعة في الحد مفهومة من السياق، تُكتب الكلمة كاملة مسبوقة بالوسم <cut-off>."
    },
    {
      id: 60,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 35,
      questionText: "إذا انقطع التسجيل في منتصف كلمة أولى وكانت الكلمة مقطوعة بشدة ولا يمكن فهمها إطلاقاً من السياق. كيف تفرغ الحد الصوتي؟",
      heardText: "صوت بتلة مكسورة مبهمة في البداية ثم كلام واضح.",
      options: [
        "تخمين الكلمة الأقرب بالذكاء الاصطناعي.",
        "ترك الوسم <cut-off> بمفرده عند الحد المتأثر دون كتابة أجزاء مكسورة غير مفهومة.",
        "كتابة الحروف المتبقية المسموعة فقط.",
        "استبدال الجملة بـ <empty>."
      ],
      correctAnswer: 1,
      explanation: "إذا كانت الكلمة مقطوعة بشدة ولا يمكن فهمها من السياق، فلا تُنسخ أي أجزاء منها ويُترك الوسم <cut-off> فقط."
    },
    {
      id: 61,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 35,
      questionText: "كيف يتم تفريغ كلمات الأغاني المنطوقة أو المغناة باللغة العربية الفصحى داخل التسجيل الصوتي؟",
      heardText: "شخص يغني أبيات شعر بالفصحى.",
      options: [
        "تفرغ ككلمات عادية مع الالتزام بجميع قواعد التفريغ دون وسم خاص بالغناء.",
        "وضع وسم خاص اخترعته مثل [singing] أو [sing].",
        "استبدال الأغنية بـ <non_speech>.",
        "تجاهل تفريغ الغناء."
      ],
      correctAnswer: 0,
      explanation: "تُنسخ كلمات الأغاني باللغة المستهدفة ككلمات عادية، ويُحظر اختراع أي وسم خاص بالغناء مثل [sing]."
    },
    {
      id: 62,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 35,
      questionText: "تسجيل صوتي يتضمن غناءً أجنبياً بكلمات أجنبية مفهومة. ما القاعدة المتبعة في تفريغ كلماته؟",
      heardText: "أغنية أجنبية بكلمات مفهومة داخل التسجيل.",
      options: [
        "تُطبق عليها قواعد اللغات الأجنبية (وضع وسمي <foreign_start> و <foreign_end> وتفريغ النص بينهما).",
        "تُستبدل بـ <non_speech>.",
        "تُترجم للعربية.",
        "تُحذف من التفريغ."
      ],
      correctAnswer: 0,
      explanation: "تُطبق قواعد اللغات الأجنبية على كلمات الأغاني الأجنبية بإحاطتها بوسمي <foreign_start> و <foreign_end>."
    },
    {
      id: 63,
      category: "complex_overlaps",
      type: "tag_picker",
      timerSeconds: 30,
      questionText: "سُمِعت فاصلة موسيقية آلية (عزف عود أو جيتار) بدون كلمات في منتصف المحادثة. ما الوسم الصحيح عند بداية الموسيقى؟",
      heardText: "فاصل موسيقي آلي بين جملتين.",
      options: [
        "<non_speech>",
        "<vocal_noise>",
        "<empty>",
        "<crosstalk>"
      ],
      correctAnswer: 0,
      explanation: "الموسيقى الآلية التي لا تحتوي على كلمات داخل التسجيل تُوسم بـ <non_speech> عند بدايتها."
    },
    {
      id: 64,
      category: "complex_overlaps",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "هل يلزم المفرغ قضية تحديد الترتيب الدقيق جداً للكلمات أثناء التداخل الصوتي بين متحدثين؟",
      heardText: "سؤال عن التدقيق في ترتيب كلمات التداخل.",
      options: [
        "نعم، يجب قضاء وقت طويل لإعادة بناء الترتيب الدقيق للكلمات المتداخلة.",
        "لا، ينص الدليل على عدم إضاعة وقت طويل في محاولة إعادة بناء الترتيب الدقيق للكلمات أثناء التداخل."
      ],
      correctAnswer: 1,
      explanation: "ينص الدليل في قسم المتحدثين المتعددين على: 'لا تضيع وقتاً طويلاً في محاولة إعادة بناء الترتيب الدقيق للكلمات أثناء التداخل'."
    },
    {
      id: 65,
      category: "complex_overlaps",
      type: "error_spotting",
      timerSeconds: 35,
      questionText: "ما الخطأ في التفريغ التالي لمقطع غنائي باللغة العربية الفصحى: `[sing] أحبك لو تكون وجعا`؟",
      heardText: "أغنية عربية: أحبك لو تكون وجعا",
      options: [
        "اختراع وسم غير معتمد [sing]، حيث يجب تفريغ كلمات الأغنية ككلمات عادية بدون وسم غناء.",
        "عدم كتابة الأغنية بالإنجليزية.",
        "عدم وضع وسم <fill>.",
        "عدم التوقف عند الكلمة الأولى."
      ],
      correctAnswer: 0,
      explanation: "يُحظر استخدام أو اختراع وسوم خاصة بالغناء مثل [sing]."
    },
    {
      id: 66,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 35,
      questionText: "في تسجيل يحتوي على متحدث واحد فقط واضح ومفهوم طوال التسجيل، ما الوسوم الخاصة بالمتحدثين الواجب استخدامها؟",
      heardText: "تسجيل لمتحدث واحد واضح طوال 30 ثانية.",
      options: [
        "<speaker1>",
        "لا يلزم أي وسم خاص طالما أن المتحدث واحد والكلام واضح ومفهوم.",
        "<main_speaker>",
        "<background_speech>"
      ],
      correctAnswer: 1,
      explanation: "معظم التسجيلات تحتوي على متحدث واحد، وفي هذه الحالة لا يلزم أي وسم خاص طالما أن الكلام واضح ومفهوم."
    },
    {
      id: 67,
      category: "complex_overlaps",
      type: "verbatim_input",
      timerSeconds: 50,
      questionText: "تداخل متحدث ثاني في الخلفية قائلاً 'how are you' بينما المتحدث الرئيسي يقول 'hello'. قم بتفريغ دور المتحدث الأول مع الوسم المناسب للتداخل:",
      heardText: "المتحدث 1 يقول hello ثم يبدأ صوت في الخلفية",
      targetAnswer: "hello <background_speech> how are you",
      explanation: "يُوضع الوسم <background_speech> قبل الكلمة المتداخلة في المقطع التوضيحي لتداخل المتحدثين."
    },
    {
      id: 68,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 30,
      questionText: "إذا كان ملف التسجيل الصوتي فارغاً تماماً وصامتاً بلا أي ذبذبة صوتية. ما القيمة الواجب تفريغها؟",
      heardText: "صمت تام لمدة 10 ثوان.",
      options: [
        "ترك مربع الإدخال فارغاً.",
        "<empty>",
        "<unintelligible>",
        "صمت تام"
      ],
      correctAnswer: 1,
      explanation: "الملف الصامت تماماً يُرمز له بالوسم <empty> فقط دون أي كتابة إضافية."
    },
    {
      id: 69,
      category: "complex_overlaps",
      type: "situational_tf",
      timerSeconds: 25,
      questionText: "إذا ظهرت كلمة أجنبية واحدة بسيطة وغير معقدة داخل جملة عربية فصيحة، هل تعتبر المقابلة بأكملها مقطعاً أجنبياً؟",
      heardText: "سؤال عن ظهور كلمة أجنبية منفردة.",
      options: [
        "نعم، تعتبر المقابلة بأكملها أجنبية وتُحاط بـ <foreign_start>.",
        "لا، تفرغ الكلمة الأجنبية القصيرة الشائعة في مكانها بشكل طبيعي وتظل الجملة عربية."
      ],
      correctAnswer: 1,
      explanation: "تنسخ الكلمات الأجنبية البسيطة القصيرة في مكانها ولا تحول الجملة الكاملة إلى مقطع أجنبي."
    },
    {
      id: 70,
      category: "complex_overlaps",
      type: "mcq",
      timerSeconds: 40,
      questionText: "المتحدث الرئيسي قال: 'عرض الشركة ينتهي يوم الجمعة' وتداخل معه في آخر كلمة متحدث ثاني مسموع. كيف يُكتب السطر الرئيسي؟",
      heardText: "the offer closes friday وتداخل المتحدث الثاني عند الجمعة.",
      options: [
        "ينتهي العرض الجمعة <crosstalk>",
        "عرض الشركة ينتهي يوم الجمعة <background_speech>",
        "<crosstalk> عرض الشركة ينتهي يوم الجمعة",
        "عرض الشركة ينتهي يوم <unintelligible>"
      ],
      correctAnswer: 1,
      explanation: "يُنسخ كلام المتحدث الرئيسي ويُضاف الوسم <background_speech> عند بداية تداخل صوت المتحدث الثاني."
    }
  ]
};

// Freeze object to prevent dynamic accidental mutations
Object.freeze(EXAM_DATA);
