// Application Logic & Dynamic Renderer aligned with Official Arabic & English PDFs

let lenis = null;

function initLenis() {
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on("scroll", () => {
      handleScrollNavigation();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = "ar"; // 'ar', 'en', 'dual'
  let currentTheme = localStorage.getItem("theme") || "light";

  // Initialize UI Theme
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Initialize Lenis Smooth Scroll
  initLenis();

  // Initialize Language & View Mode
  setLanguageMode(currentLang);

  // Bind Event Listeners
  bindEvents();
});

// Set Language Mode (AR, EN, DUAL)
function setLanguageMode(lang) {
  currentLang = lang;
  const body = document.body;

  // Clear dual mode class first
  body.classList.remove("view-dual");

  if (lang === "ar") {
    body.setAttribute("dir", "rtl");
    body.setAttribute("lang", "ar");
  } else if (lang === "en") {
    body.setAttribute("dir", "ltr");
    body.setAttribute("lang", "en");
  } else if (lang === "dual") {
    body.classList.add("view-dual");
    body.setAttribute("dir", "rtl");
    body.setAttribute("lang", "ar");
  }

  // Update View Button Active States
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Render Page Content
  renderPageContent();
}

// Practice Scenarios Dataset
const PRACTICE_SCENARIOS = {
  ar: [
    {
      id: 1,
      title: "تمرين 1: التردد والحشو",
      heard: "آآ وين كنت؟ أريد البدء بالعمل.",
      target: "<fill> وين كنت؟ أريد البدء بالعمل.",
    },
    {
      id: 2,
      title: "تمرين 2: البداية الخاطئة",
      heard: "خلينا نلتقي السا- الساعة السادسة تماماً.",
      target: "خلينا نلتقي السا- الساعة السادسة تماماً.",
    },
    {
      id: 3,
      title: "تمرين 3: كتابة الأرقام",
      heard: "ولدت عام 1995 في مدينة القاهرة.",
      target: "ولدت عام ألف وتسعمئة وخمسة وتسعين في مدينة القاهرة.",
    },
    {
      id: 4,
      title: "تمرين 4: التداخل الشديد",
      heard: "أصوات متداخلة صاخبة غير مفهومة إطلاقاً.",
      target: "<crosstalk>",
    },
    {
      id: 5,
      title: "تمرين 5: المقطع الأجنبي",
      heard: "قال لي bon appétit ثم انصرف.",
      target: "قال لي <foreign_start> bon appétit <foreign_end> ثم انصرف.",
    },
  ],
  en: [
    {
      id: 1,
      title: "Practice 1: Fillers",
      heard: "uh where was I? let me think.",
      target: "<fill> where was I? let me think.",
    },
    {
      id: 2,
      title: "Practice 2: False Start",
      heard: "let's meet at fi- at six thirty tonight.",
      target: "let's meet at fi- at six thirty tonight.",
    },
    {
      id: 3,
      title: "Practice 3: Spelled-Out Numbers",
      heard: "I was born in 1975.",
      target: "I was born in nineteen seventy five.",
    },
    {
      id: 4,
      title: "Practice 4: Severe Crosstalk",
      heard: "Multiple voices shouting completely unintelligible overlap.",
      target: "<crosstalk>",
    },
    {
      id: 5,
      title: "Practice 5: Foreign Span",
      heard: "He said bon appétit and left.",
      target: "He said <foreign_start> bon appétit <foreign_end> and left.",
    },
  ],
};

// Render Page Content based on selected mode
function renderPageContent() {
  const container = document.getElementById("main-content-container");
  if (!container) return;

  if (currentLang === "dual") {
    container.innerHTML = `
      <div class="dual-wrapper">
        <div class="dual-pane dual-pane-ar">
          ${renderFullPaneContent("ar")}
        </div>
        <div class="dual-pane dual-pane-en">
          ${renderFullPaneContent("en")}
        </div>
      </div>
    `;
  } else {
    container.innerHTML = renderFullPaneContent(currentLang);
  }

  // Re-attach interactive components
  attachInteractiveHandlers();
}

// Arabic Natural Language Text Normalizer for Intelligent Search
function normalizeArabicText(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[أإآآًٌٍَُِّْـ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[^\w\s\u0600-\u06FF]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Search Q&A Engine & Dynamic Matcher
window.executeQASearch = function (userQuery) {
  const inputEl = document.getElementById("qa-search-input");
  if (inputEl && userQuery !== undefined) {
    inputEl.value = userQuery;
  }
  const query = (
    userQuery !== undefined ? userQuery : inputEl ? inputEl.value : ""
  ).trim();
  const resultsContainer = document.getElementById("qa-results-container");
  if (!resultsContainer) return;

  const db = GUIDELINES_DATA.qa_database || [];

  if (!query) {
    // Show featured top questions when empty
    renderFeaturedQACards(db.slice(0, 4), resultsContainer, false);
    return;
  }

  const normQuery = normalizeArabicText(query);
  const queryTokens = normQuery.split(" ").filter((t) => t.length > 1);

  const scoredResults = db
    .map((item) => {
      let score = 0;
      const normQuestion = normalizeArabicText(item.question);
      const normAnswer = normalizeArabicText(item.answer);
      const normBadge = normalizeArabicText(item.badge);
      const normTag = normalizeArabicText(item.tag);

      // Exact phrase match in question or tag
      if (normQuestion.includes(normQuery)) score += 50;
      if (normAnswer.includes(normQuery)) score += 20;
      if (normTag.includes(normQuery)) score += 40;

      // Keyword matching
      if (item.keywords) {
        item.keywords.forEach((kw) => {
          const normKw = normalizeArabicText(kw);
          if (normQuery.includes(normKw) || normKw.includes(normQuery)) {
            score += 35;
          }
          queryTokens.forEach((token) => {
            if (normKw.includes(token)) score += 15;
          });
        });
      }

      // Token matching
      queryTokens.forEach((token) => {
        if (normQuestion.includes(token)) score += 12;
        if (normAnswer.includes(token)) score += 6;
        if (normBadge.includes(token) || normTag.includes(token)) score += 15;
      });

      return { item, score };
    })
    .filter((res) => res.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scoredResults.length > 0) {
    // Show ONLY the single top best match when user searches a specific question
    const bestMatch = [scoredResults[0].item];
    renderFeaturedQACards(bestMatch, resultsContainer, true, query);
  } else {
    // Render fallback matching message
    renderNoResultsFallback(query, resultsContainer);
  }
};

// Render Featured / Searched Q&A Answer Cards
function renderFeaturedQACards(
  items,
  container,
  isSearchResult = false,
  query = "",
) {
  container.innerHTML = `
    <div class="qa-results-header">
      <div class="qa-results-title">
        <i class="fas ${isSearchResult ? "fa-check-double" : "fa-star"}" style="color: ${isSearchResult ? "#22c55e" : "#6366f1"};"></i>
        <span>${isSearchResult ? `تم تحليل السؤال! الإجابة المباشرة والدقيقة لسؤالك "${query}":` : "أبرز الأسئلة الشائعة والإجابات المباشرة السريعة:"}</span>
      </div>
      <span class="qa-count-badge" style="${isSearchResult ? "background: #dcfce7; color: #15803d; border-color: #86efac;" : ""}">
        ${isSearchResult ? "الإجابة المطابقة 100%" : `${items.length} إجابة معتمدة`}
      </span>
    </div>
    <div class="qa-cards-grid ${isSearchResult ? "single-result-grid" : ""}">
      ${items
        .map(
          (item) => `
        <div class="qa-card ${isSearchResult ? "highlighted-single-card" : ""}" id="${item.id}">
          <div class="qa-card-header">
            <span class="qa-category-pill"><i class="fas fa-tag"></i> ${item.categoryLabel}</span>
            <span class="qa-rule-tag">${item.tag}</span>
          </div>
          <h3 class="qa-question"><i class="fas fa-question-circle" style="color: #6366f1;"></i> ${item.question}</h3>
          
          <div class="qa-answer-box">
            <div class="qa-answer-label"><i class="fas fa-lightbulb" style="color: #f59e0b;"></i> الإجابة المباشرة والقاعدة الرسمية:</div>
            <p class="qa-answer-text">${item.answer}</p>
          </div>

          <div class="qa-examples-split">
            <div class="qa-ex-box qa-ex-do">
              <div class="qa-ex-title"><i class="fas fa-check-circle"></i> الصياغة الصحيحة ✅</div>
              <code>${item.dos}</code>
            </div>
            <div class="qa-ex-box qa-ex-dont">
              <div class="qa-ex-title"><i class="fas fa-times-circle"></i> الصياغة المحظورة ❌</div>
              <code>${item.donts}</code>
            </div>
          </div>

          <div class="qa-card-footer">
            <button class="qa-try-btn" onclick="tryQAScenario(${item.playgroundId || 1}, '${(item.tag || "").replace(/'/g, "\\'")}')">
              <i class="fas fa-keyboard"></i> جرب القاعدة في مساحة التدريب <i class="fas fa-arrow-left"></i>
            </button>
            <button class="copy-btn" onclick="copyToClipboard('${item.question.replace(/'/g, "\\'")}\\n\\nالإجابة: ${item.answer.replace(/'/g, "\\'")}')">
              <i class="far fa-copy"></i> نسخ الإجابة
            </button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

// Fallback message when query yields no direct matches
function renderNoResultsFallback(query, container) {
  container.innerHTML = `
    <div class="qa-no-results">
      <i class="fas fa-search-minus" style="font-size: 2.5rem; color: #a5b4fc; margin-bottom: 0.75rem;"></i>
      <h3 style="color: #1e1b4b; font-size: 1.1rem; margin-bottom: 0.4rem;">لم نجد سؤالاً مطابقاً تماماً لـ "${query}"</h3>
      <p style="color: #64748b; font-size: 0.95rem; max-width: 500px; margin: 0 auto 1.25rem auto;">
        يمكنك تصفح دليل الأسئلة الشائعة أدناه أو تجربة الكلمات المفتاحية مثل: <strong>الأرقام، التردد، الصمت، الأجنبي، التداخل</strong>.
      </p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button class="prompt-chip" onclick="executeQASearch('كيف أكتب الأرقام والتواريخ؟')">🔢 الأرقام والتواريخ</button>
        <button class="prompt-chip" onclick="executeQASearch('متى أستخدم وسم empty؟')">🔇 وسم empty</button>
      </div>
    </div>
  `;
}

// Shortcut to load QA Scenario in Playground
window.tryQAScenario = function (playgroundId, tag) {
  const scenario =
    (PRACTICE_SCENARIOS.ar || []).find((s) => s.id === playgroundId) ||
    PRACTICE_SCENARIOS.ar[0];
  if (scenario) {
    loadPracticeScenario(scenario.heard);
  }
  const el = document.getElementById("playground-section");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

// Render Q&A Search Hero Section
function renderQASearchHero(lang) {
  const isAr = lang === "ar" || lang === "dual";
  return `
    <section class="qa-hero-section" id="qa-search-section">
      <div class="hero-badge">
        <i class="fas fa-bolt" style="color: #f59e0b;"></i> ${isAr ? "مركز الأسئلة والبحث الفوري بالإرشادات المعيارية" : "Instant Arabic Guidelines QA & Search Hub"}
      </div>
      <h1 class="hero-title">اطرح أي سؤال عن إرشادات التفريغ واحصل على إجابة فورية ⚡</h1>
      <p class="hero-subtitle">مُحرّك ذكي يُجيب على استفساراتك فورياً بالأمثلة والقواعد المعيارية لتفريغ وترقيم التسجيلات الصوتية </p>

      <!-- Prominent Search Hero Input Container -->
      <div class="qa-search-hero-box">
        <div class="qa-input-wrapper">
          <i class="fas fa-search qa-search-icon"></i>
          <input 
            type="text" 
            id="qa-search-input" 
            class="qa-search-input" 
            placeholder="اكتب سؤالك هنا (مثال: كيف أكتب التواريخ؟ متى أستخدم وسم empty؟ ما هو وسم التداخل؟)"
            oninput="executeQASearch()"
            onkeydown="if(event.key==='Enter') executeQASearch()"
          />
          <button class="qa-clear-btn" onclick="executeQASearch('')" title="مسح">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Prompt Chips -->
        <div class="prompt-chips-container">
          <div class="chips-label"><i class="fas fa-fire" style="color: #ff6b4a;"></i> أسئلة سريعة شائعة:</div>
          <div class="chips-list">
            <button class="prompt-chip" onclick="executeQASearch('كيف أكتب الأرقام والتواريخ؟')">
              🔢 كتابة الأرقام والتواريخ
            </button>
            <button class="prompt-chip" onclick="executeQASearch('متى أستخدم وسم empty؟')">
              🔇 وسم صامت &lt;empty&gt;
            </button>
            <button class="prompt-chip" onclick="executeQASearch('كيف أتعامل مع التردد والحشو؟')">
              ❓ التردد والحشو &lt;fill&gt;
            </button>
            <button class="prompt-chip" onclick="executeQASearch('انقطاع الصوت في منتصف الكلمة')">
              ✂️ قطع الكلمات &lt;cut-off&gt;
            </button>
            <button class="prompt-chip" onclick="executeQASearch('تداخل المتحدثين crosstalk')">
              🗣️ تداخل المتحدثين &lt;crosstalk&gt;
            </button>
            <button class="prompt-chip" onclick="executeQASearch('ضحك وتصفيق وسعال')">
              💬 الأصوات والمؤثرات البشرية
            </button>
          </div>
        </div>
      </div>

      <!-- Instant Results Dynamic Container -->
      <div id="qa-results-container" class="qa-results-container">
        <!-- Rendered live via JS -->
      </div>
    </section>
  `;
}

// Render Live Text & Rule Checker Section
function renderTextCheckerSection(lang) {
  return `
    <section class="text-checker-section" id="text-checker-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-spell-check" style="color: #6366f1;"></i> فاحص النصوص والقواعد المباشر (Live Rules Checker)
        </h2>
        <span class="principle-badge" style="background: #e0e7ff; color: #4338ca; border-color: #c7d2fe;">
          <i class="fas fa-shield-alt"></i> فحص آلي فوري
        </span>
      </div>

      <div class="checker-card">
        <div class="checker-input-wrapper">
          <label for="checker-textarea" class="checker-label">
            <i class="fas fa-pen"></i> اكتب أو ألصق نص التفريغ هنا لفحصه فوراً وتنبيهك لأي مخالفة للإرشادات:
          </label>
          <textarea id="checker-textarea" class="checker-textarea" placeholder="مثال: في عام 2025 قال المتحدث آآ أهلاً بكم [تصفيق] وسنلتقي الساعة 5..." oninput="runLiveTextAnalysis()"></textarea>
        </div>

        <div id="checker-results-box" class="checker-results-box">
          <div class="checker-empty-state">
            <i class="fas fa-search" style="font-size: 2rem; color: #a5b4fc; margin-bottom: 0.5rem;"></i>
            <div>اكتب أو ألصق نصاً في الصندوق أعلاه ليتم تحليله فوراً وإظهار النتيجة والتصويبات القواعدية.</div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Real-time Text Analysis Logic
window.runLiveTextAnalysis = function () {
  const text = (
    document.getElementById("checker-textarea")?.value || ""
  ).trim();
  const resultsBox = document.getElementById("checker-results-box");
  if (!resultsBox) return;

  if (!text) {
    resultsBox.innerHTML = `
      <div class="checker-empty-state">
        <i class="fas fa-search" style="font-size: 2rem; color: #a5b4fc; margin-bottom: 0.5rem;"></i>
        <div>اكتب أو ألصق نصاً في الصندوق أعلاه ليتم تحليله فوراً وإظهار النتيجة والتصويبات القواعدية.</div>
      </div>
    `;
    return;
  }

  const issues = [];

  // Check 1: Raw Digits
  const digitMatches = text.match(/[0-9٠-٩]+/g);
  if (digitMatches) {
    issues.push({
      type: "error",
      title: "استخدام أرقام رقمية ❌",
      desc: `تم رصد الأرقام (${Array.from(new Set(digitMatches)).join(", ")}). يجب تفقيط جميع الأرقام والتواريخ بالكلمات الحرفية.`,
      suggestion: "مثال: اكتب 'ألفين وخمسة وعشرين' بدلاً من '2025'.",
    });
  }

  // Check 2: Raw Fillers instead of <fill>
  const fillerMatches = text.match(/(آآ|أمم|آه|امم|uh|um)/gi);
  if (fillerMatches) {
    issues.push({
      type: "warning",
      title: "أصوات تردد مكتوبة حروفاً ⚠️",
      desc: `تم رصد أصوات التردد (${Array.from(new Set(fillerMatches)).join(", ")}). يجب استبدالها بالوسم المعتمد <fill>.`,
      suggestion: "مثال: بدلاً من 'آآ أهلاً' اكتب '<fill> أهلاً'.",
    });
  }

  // Check 3: Invalid tag brackets like [ضحك] or (تصفيق)
  const invalidBrackets = text.match(/\[[^\]]+\]|\([^\)]+\)/g);
  if (invalidBrackets) {
    issues.push({
      type: "error",
      title: "استخدام أقواس غير معتمدة ❌",
      desc: `تم رصد أقواس مربعة أو دائرية (${invalidBrackets.slice(0, 3).join(", ")}). يجب استخدام أقواس زاوية مفردة فقط بحروف صغيرة <مثل_هذا>.`,
      suggestion: "استخدم <laughter> أو <applause> أو <empty> فقط.",
    });
  }

  // Check 4: Hyphens between compound numbers
  if (
    /(واحدة|اثنان|ثلاثة|أربعة|خمسة|ستة|سبعة|ثمانية|تسعة)-(عشر|عشرة|عشرون|ثلاثون)/.test(
      text,
    )
  ) {
    issues.push({
      type: "error",
      title: "وجود شرطات بين أجزاء الأعداد ❌",
      desc: "يُحظر تماماً وضع شرطة بين أجزاء الأعداد المركبة.",
      suggestion: "اكتب الأعداد ككلمات منفصلة بمسافات عادية دون شرطات.",
    });
  }

  // Check 5: Tashkeel & Tanween Prohibited
  const tashkeelMatches = text.match(/[\u064B-\u0652\u0670]/g);
  if (tashkeelMatches) {
    const uniqueTashkeel = Array.from(new Set(tashkeelMatches));
    issues.push({
      type: "error",
      title: "استخدام التشكيل أو التنوين ❌",
      desc: `تم رصد التشكيل أو التنوين في النص (${uniqueTashkeel.join(" ، ")}). يُحظر تماماً التشكيل والتنوين في التفريغ المعياري.`,
      suggestion:
        "قم بإزالة الحركات والتشكيل واكتب الكلمات مجردة (مثال: اكتب 'جدا' بدلاً من 'جداً').",
    });
  }

  if (issues.length === 0) {
    resultsBox.innerHTML = `
      <div class="checker-pass-state">
        <i class="fas fa-check-circle" style="font-size: 2.5rem; color: #22c55e; margin-bottom: 0.5rem;"></i>
        <h3 style="color: #15803d; font-weight: 800;">ممتاز! النص متوافق 100% مع الإرشادات الرسمية</h3>
        <p style="color: #166534; font-size: 0.95rem;">لم نجد أي أرقام رقمية، أو أقواس خاطئة، أو أصوات تردد غير معنونة.</p>
      </div>
    `;
  } else {
    resultsBox.innerHTML = `
      <div class="checker-issues-list">
        <div style="font-weight: 800; font-size: 1rem; color: #1e1b4b; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>
          <span>تم رصد ${issues.length} ملاحظات قواعدية يجب تعديلها:</span>
        </div>
        ${issues
          .map(
            (iss) => `
          <div class="checker-issue-card checker-issue-${iss.type}">
            <div class="issue-header">
              <span class="issue-title">${iss.title}</span>
            </div>
            <div class="issue-desc">${iss.desc}</div>
            <div class="issue-suggestion"><i class="fas fa-lightbulb" style="color: #f59e0b;"></i> ${iss.suggestion}</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }
};

// Render FAQ Accordion Explorer Section
function renderFAQExplorer(lang) {
  const db = GUIDELINES_DATA.qa_database || [];
  return `
    <section class="faq-section" id="faq-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-question-circle" style="color: #6366f1;"></i> مكتبة الأسئلة الشائعة والإجابات المعتمدة (FAQ Explorer)
        </h2>
        <span class="principle-badge" style="background: #f0eeff; color: #6366f1;">
          دليل مبوب وشامل
        </span>
      </div>

      <!-- Category Tabs -->
      <div class="faq-tabs">
        <button class="faq-tab active" data-cat="all" onclick="filterFAQCategory('all', this)">
          <i class="fas fa-th-large"></i> جميع الأسئلة
        </button>
        <button class="faq-tab" data-cat="numbers" onclick="filterFAQCategory('numbers', this)">
          <i class="fas fa-font"></i> الأرقام والتواريخ
        </button>
        <button class="faq-tab" data-cat="tags" onclick="filterFAQCategory('tags', this)">
          <i class="fas fa-tags"></i> الوسوم والأقواس
        </button>
        <button class="faq-tab" data-cat="fillers" onclick="filterFAQCategory('fillers', this)">
          <i class="fas fa-comment-slash"></i> التردد والقطع
        </button>
        <button class="faq-tab" data-cat="special" onclick="filterFAQCategory('special', this)">
          <i class="fas fa-layer-group"></i> الحالات الخاصة
        </button>
      </div>

      <div class="faq-accordion-grid" id="faq-accordion-grid">
        ${db
          .map(
            (item) => `
          <div class="faq-item" data-category="${item.category}">
            <div class="faq-item-header" onclick="toggleFAQItem(this)">
              <div class="faq-item-title">
                <span class="faq-badge">${item.categoryLabel}</span>
                <span>${item.question}</span>
              </div>
              <i class="fas fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-item-body">
              <div class="qa-answer-box">
                <div class="qa-answer-label"><i class="fas fa-lightbulb" style="color: #f59e0b;"></i> الإجابة الرسمية:</div>
                <p class="qa-answer-text">${item.answer}</p>
              </div>
              <div class="qa-examples-split">
                <div class="qa-ex-box qa-ex-do">
                  <div class="qa-ex-title">✅ صحيح</div>
                  <code>${item.dos}</code>
                </div>
                <div class="qa-ex-box qa-ex-dont">
                  <div class="qa-ex-title">❌ محظور</div>
                  <code>${item.donts}</code>
                </div>
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </section>
  `;
}

window.filterFAQCategory = function (cat, btnEl) {
  document
    .querySelectorAll(".faq-tab")
    .forEach((t) => t.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  document.querySelectorAll(".faq-item").forEach((item) => {
    if (cat === "all" || item.dataset.category === cat) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

window.toggleFAQItem = function (headerEl) {
  const item = headerEl.closest(".faq-item");
  if (item) {
    item.classList.toggle("open");
  }
};

// Generate Full HTML Pane for a given language ('ar' or 'en')
function renderFullPaneContent(lang) {
  const isAr = lang === "ar";
  const data = GUIDELINES_DATA;
  const scenarios = PRACTICE_SCENARIOS[lang];

  return `
    ${renderQASearchHero(lang)}
    ${renderTextCheckerSection(lang)}
    ${renderFAQExplorer(lang)}

    <!-- WORK RATE CALCULATOR SECTION -->
    <section class="calculator-section" id="calculator-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-calculator" style="color: #22c55e;"></i> ${isAr ? " معدل الإنجاز وسرعة العمل (Work Rate Calculator)" : "Work Rate & Performance Calculator"}
        </h2>
        <span class="principle-badge" style="background: #dcfce7; color: #15803d; border-color: #86efac;">
          <i class="fas fa-chart-line"></i> ${isAr ? "حساب آلي دقيق" : "Instant Rate Calculation"}
        </span>
      </div>

      <div class="calculator-card">
        <p class="calc-intro-text">
          ${isAr ? "أدخل عدد المهام، وأطوال المقاطع الصوتية بالدقائق، والوقت المُنقضي في العمل لحساب معدل استغراقك الزمني لكل دقيقة صوتية بدقة." : "Enter your tasks count, audio minutes, and work duration to calculate your exact work rate ratio."}
        </p>

        <div class="calc-form-grid">
          <!-- Input 1: Tasks Count -->
          <div class="calc-field-group">
            <label for="calc-tasks-count" class="calc-label">
              <i class="fas fa-tasks"></i> ${isAr ? "عدد المهام الكلي:" : "Total Tasks Count:"}
            </label>
            <input type="number" id="calc-tasks-count" class="calc-input" placeholder="${isAr ? "1" : "1"}" min="1" />
          </div>

          <!-- Input 2: Audio Durations in Minutes -->
          <div class="calc-field-group">
            <label for="calc-audio-mins" class="calc-label">
              <i class="fas fa-headphones"></i> ${isAr ? "أطوال المقاطع الصوتية بالدقائق:" : "Audio Durations (Minutes):"}
            </label>
            <input type="text" id="calc-audio-mins" class="calc-input" placeholder="${isAr ? "100" : "100"}" />
            <span class="calc-helper-note">
              <i class="fas fa-info-circle"></i> ${isAr ? "يمكنك كتابة مجموع الدقائق أو عملية جمع مثل: (14 + 16 + 21 + 150)" : "Enter total or math addition e.g. (14 + 16 + 21 + 150)"}
            </span>
          </div>

          <!-- Input 3: Work Duration (Hours & Minutes) -->
          <div class="calc-field-group">
            <label class="calc-label">
              <i class="fas fa-stopwatch"></i> ${isAr ? "الوقت المُستغرق في العمل:" : "Time Spent Working:"}
            </label>
            <div class="calc-time-inputs-row">
              <div class="calc-time-subgroup">
                <input type="number" id="calc-work-hours" class="calc-input" placeholder="ساعات" min="0" />
                <span class="calc-time-unit">${isAr ? "ساعة" : "hrs"}</span>
              </div>
              <div class="calc-time-subgroup">
                <input type="number" id="calc-work-mins" class="calc-input" placeholder="دقائق" min="0" max="59" />
                <span class="calc-time-unit">${isAr ? "دقيقة" : "mins"}</span>
              </div>
            </div>
          </div>
        </div>

        <button class="calc-submit-btn" onclick="calculateWorkRate()">
          <i class="fas fa-calculator"></i> ${isAr ? "احسب معدل الإنجاز وسرعة العمل" : "Calculate Work Rate"}
        </button>

        <!-- Dynamic Results Container -->
        <div id="calc-results-card" class="calc-results-card" style="display: none;">
          <!-- Rendered via calculateWorkRate() -->
        </div>
      </div>
    </section>
  `;
}

// Scroll Handler for Header Hiding & Side Navigator Appearance
function handleScrollNavigation() {
  const navbar = document.querySelector(".navbar");
  const sideNav = document.getElementById("side-nav");
  const footer = document.querySelector(".footer");
  const scrollPos = window.scrollY || document.documentElement.scrollTop;

  // Header auto-hide threshold
  if (scrollPos > 120) {
    if (navbar) navbar.classList.add("nav-hidden");
  } else {
    if (navbar) navbar.classList.remove("nav-hidden");
  }

  // Detect Footer Proximity to hide navigator when near or over footer
  let isNearFooter = false;
  if (footer) {
    const footerRect = footer.getBoundingClientRect();
    if (
      footerRect.top <= window.innerHeight + 20 ||
      window.innerHeight + scrollPos >=
        document.documentElement.scrollHeight - 100
    ) {
      isNearFooter = true;
    }
  }

  // Side navigator active state
  if (sideNav) {
    if (scrollPos > 120 && !isNearFooter) {
      sideNav.classList.add("active");
    } else {
      sideNav.classList.remove("active");
    }
  }

  // Scroll Spy Active Section Highlight
  const sections = [
    "video-section",
    "workflow-section",
    "worked-examples-section",
    "tags-section",
    "formatting-section",
    "special-section",
    "playground-section",
  ];

  let currentActiveSec = "";
  sections.forEach((secId) => {
    const el = document.getElementById(secId);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= 100) {
        currentActiveSec = secId;
      }
    }
  });

  if (currentActiveSec) {
    document.querySelectorAll(".side-nav-item").forEach((item) => {
      const href = item.getAttribute("href");
      if (href && href === "#" + currentActiveSec) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
}

// Event Bindings
function bindEvents() {
  // Language View Mode Selector Buttons
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguageMode(btn.dataset.lang);
    });
  });

  // Window Scroll Event
  window.addEventListener("scroll", handleScrollNavigation, { passive: true });
}

// Attach interactive handlers after HTML render
function attachInteractiveHandlers() {
  // Execute initial search hero render
  if (typeof window.executeQASearch === "function") {
    window.executeQASearch("");
  }

  // Accordion Step Cards
  document.querySelectorAll(".step-header").forEach((header) => {
    header.addEventListener("click", () => {
      const card = header.closest(".step-card");
      card.classList.toggle("open");
    });
  });

  // Tag Search Inputs
  document.querySelectorAll(".tag-search-input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const tagCards = input
        .closest(".tags-section")
        .querySelectorAll(".tag-card");

      tagCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Load Practice Scenario
window.loadPracticeScenario = function (heardText) {
  const banner = document.getElementById("heard-prompt-banner");
  const bannerText = document.getElementById("heard-prompt-text");
  const editor = document.getElementById("playground-editor");

  if (banner && bannerText && editor) {
    banner.style.display = "block";
    bannerText.textContent =
      (currentLang === "ar"
        ? "المطلوب تفريغ الصوت التالي: "
        : "Practice Audio Prompt: ") + `"${heardText}"`;
    editor.value = "";
    editor.focus();
    validatePlaygroundText();
  }
};

// Copy to Clipboard Helper with Toast
window.copyToClipboard = function (text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast(
        currentLang === "ar"
          ? `تم نسخ "${text}" بنجاح!`
          : `Copied "${text}" to clipboard!`,
      );
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

function showToast(msg) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #6366f1;"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Transcriber Playground Logic
window.insertTagIntoPlayground = function (tag) {
  const editor = document.getElementById("playground-editor");
  if (!editor) return;

  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const val = editor.value;

  editor.value = val.substring(0, start) + " " + tag + " " + val.substring(end);
  editor.focus();
  editor.selectionStart = editor.selectionEnd = start + tag.length + 2;

  validatePlaygroundText();
};

window.validatePlaygroundText = function () {
  const editor = document.getElementById("playground-editor");
  if (!editor) return;

  const text = editor.value;

  // 1. Raw Digit Check (0-9 or ٠-٩)
  const hasDigits = /[0-9٠-٩]/.test(text);
  const chkDigits = document.getElementById("chk-digits");
  if (chkDigits) {
    if (hasDigits) {
      chkDigits.className = "check-item warn";
      chkDigits.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === "ar" ? "تنبيه: أرقام رقمية! (اكتبها حروفاً)" : "Warning: Raw digits found! Spell out"}`;
    } else {
      chkDigits.className = "check-item pass";
      chkDigits.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === "ar" ? "لا توجد أرقام رقمية" : "No raw digits"}`;
    }
  }

  // 2. Hyphens inside compound numbers check
  const numHyphenRegex =
    /(sixty|seventy|eighty|ninety|twenty|thirty|forty|fifty|one|two|three|four|five|six|seven|eight|nine|خمسة|تسعة|أربعة|ستة)-(four|five|six|seven|eight|nine|one|two|three|عشرون|ثلاثون)/i;
  const hasNumHyphen = numHyphenRegex.test(text);
  const chkNumHyphen = document.getElementById("chk-num-hyphen");
  if (chkNumHyphen) {
    if (hasNumHyphen) {
      chkNumHyphen.className = "check-item warn";
      chkNumHyphen.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === "ar" ? "تنبيه: شرطة بين أجزاء العدد!" : "Warning: Hyphen in compound number"}`;
    } else {
      chkNumHyphen.className = "check-item pass";
      chkNumHyphen.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === "ar" ? "لا شرطات بالأرقام" : "No hyphens in numbers"}`;
    }
  }

  // 3. Foreign Tag Balance Check
  const fStartCount = (text.match(/<foreign_start>/g) || []).length;
  const fEndCount = (text.match(/<foreign_end>/g) || []).length;
  const chkForeign = document.getElementById("chk-foreign");
  if (chkForeign) {
    if (fStartCount !== fEndCount) {
      chkForeign.className = "check-item warn";
      chkForeign.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === "ar" ? `وسوم الأجنبي غير متطابقة (${fStartCount}/${fEndCount})` : `Foreign tags unbalanced (${fStartCount}/${fEndCount})`}`;
    } else {
      chkForeign.className = "check-item pass";
      chkForeign.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === "ar" ? "وسوم الأجنبي متطابقة" : "Foreign tags balanced"}`;
    }
  }

  // 4. Crosstalk Empty Check
  const hasCrosstalkText = /<crosstalk>\s*\w+/i.test(text);
  const chkCrosstalk = document.getElementById("chk-crosstalk");
  if (chkCrosstalk) {
    if (hasCrosstalkText) {
      chkCrosstalk.className = "check-item warn";
      chkCrosstalk.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === "ar" ? "تنبيه: كلمات داخل وسم crosstalk!" : "Warning: Words inside crosstalk!"}`;
    } else {
      chkCrosstalk.className = "check-item pass";
      chkCrosstalk.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === "ar" ? "التداخل التام بدون كلمات" : "Crosstalk empty"}`;
    }
  }

  // 5. Tashkeel / Tanween Check
  const hasTashkeel = /[\u064B-\u0652\u0670]/.test(text);
  const chkTashkeel = document.getElementById("chk-tashkeel");
  if (chkTashkeel) {
    if (hasTashkeel) {
      chkTashkeel.className = "check-item warn";
      chkTashkeel.innerHTML = `<i class="fas fa-exclamation-circle"></i> تنبيه: يوجد تشكيل أو تنوين!`;
    } else {
      chkTashkeel.className = "check-item pass";
      chkTashkeel.innerHTML = `<i class="fas fa-check-circle"></i> لا يوجد تشكيل أو تنوين`;
    }
  }

  // Word and Tag Counter Stats
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tags = (text.match(/<[^>]+>/g) || []).length;

  const statWords = document.getElementById("stat-words");
  const statTags = document.getElementById("stat-tags");
  if (statWords) statWords.textContent = words;
  if (statTags) statTags.textContent = tags;
};

// Work Rate & Performance Calculator Logic
window.calculateWorkRate = function () {
  const tasksInput = document.getElementById("calc-tasks-count")?.value || 0;
  const audioInput = (
    document.getElementById("calc-audio-mins")?.value || ""
  ).trim();
  const workHours = parseFloat(
    document.getElementById("calc-work-hours")?.value || 0,
  );
  const workMins = parseFloat(
    document.getElementById("calc-work-mins")?.value || 0,
  );
  const resultsCard = document.getElementById("calc-results-card");
  if (!resultsCard) return;

  const tasksCount = parseInt(tasksInput) || 0;

  // Safely parse math additions like "14 + 16 + 21 + 150" or numeric inputs
  let totalAudioMinutes = 0;
  if (audioInput) {
    const parts = audioInput.split(/[+\s,]+/);
    for (const p of parts) {
      const val = parseFloat(p);
      if (!isNaN(val)) {
        totalAudioMinutes += val;
      }
    }
  }

  const totalWorkMinutes = workHours * 60 + workMins;

  if (totalAudioMinutes <= 0 || totalWorkMinutes <= 0) {
    resultsCard.style.display = "block";
    resultsCard.innerHTML = `
      <div class="calc-error-box">
        <i class="fas fa-exclamation-triangle" style="color: #ef4444; font-size: 1.5rem;"></i>
        <div>يرجى إدخال قيم صحيحة لأطوال المقاطع ووقت العمل (يجب أن تكون أعلى من الصفر).</div>
      </div>
    `;
    return;
  }

  // 1. Show 2-second Animated Progress Bar Loader
  resultsCard.style.display = "block";
  resultsCard.innerHTML = `
    <div class="calc-loading-card">
      <div class="calc-loading-header">
        <i class="fas fa-spinner fa-spin" style="color: #22c55e; font-size: 1.25rem;"></i>
        <span>جاري تحليل البيانات وحساب معدل الإنجاز...</span>
      </div>
      <div class="calc-progress-track">
        <div class="calc-progress-bar"></div>
      </div>
    </div>
  `;

  // Start smooth 2s progress bar fill after DOM insert
  requestAnimationFrame(() => {
    const progressBar = resultsCard.querySelector(".calc-progress-bar");
    if (progressBar) {
      progressBar.style.width = "100%";
    }
  });

  const rawRate = totalWorkMinutes / totalAudioMinutes;
  const targetRate = parseFloat(rawRate.toFixed(2));
  const audioHoursStr = (totalAudioMinutes / 60).toFixed(2);
  const avgWorkPerTask =
    tasksCount > 0 ? (totalWorkMinutes / tasksCount).toFixed(1) : 0;
  const avgAudioPerTask =
    tasksCount > 0 ? (totalAudioMinutes / tasksCount).toFixed(1) : 0;

  // 2. Render Animated Results Card after 2 seconds
  setTimeout(() => {
    resultsCard.innerHTML = `
      <div class="calc-success-box animate-pop-in">
        <div class="rate-hero-badge">
          <div class="rate-label">معدل الإنجاز وسرعة العمل (Work Rate):</div>
          <div class="rate-number-display" id="anim-rate-counter">0.00x</div>
          <div class="rate-subtext">تستغرق <strong>${targetRate}</strong> دقيقة عمل لإنجاز دقيقة واحدة من التسجيل الصوتي.</div>
        </div>

        <div class="calc-breakdown-grid">
          <div class="calc-stat-pill">
            <i class="fas fa-tasks" style="color: #6366f1;"></i>
            <div>
              <div class="stat-lbl">إجمالي المهام:</div>
              <div class="stat-val">${tasksCount} مهام</div>
            </div>
          </div>

          <div class="calc-stat-pill">
            <i class="fas fa-headphones" style="color: #3b82f6;"></i>
            <div>
              <div class="stat-lbl">إجمالي دقائق الصوت:</div>
              <div class="stat-val">${totalAudioMinutes} دقيقة (${audioHoursStr} ساعة)</div>
            </div>
          </div>

          <div class="calc-stat-pill">
            <i class="fas fa-stopwatch" style="color: #8b5cf6;"></i>
            <div>
              <div class="stat-lbl">إجمالي وقت العمل:</div>
              <div class="stat-val">${workHours}س و ${workMins}د (${totalWorkMinutes} دقيقة)</div>
            </div>
          </div>

          <div class="calc-stat-pill">
            <i class="fas fa-chart-pie" style="color: #10b981;"></i>
            <div>
              <div class="stat-lbl">متوسط المهمة الواحدة:</div>
              <div class="stat-val">${avgWorkPerTask} د عمل / ${avgAudioPerTask} د صوت</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // 3. Smooth Count-Up Animation from 0.00 to targetRate
    const counterEl = document.getElementById("anim-rate-counter");
    if (counterEl) {
      let startTime = null;
      const duration = 900;
      function stepCount(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentVal = (progress * targetRate).toFixed(2);
        counterEl.textContent = `${currentVal}x`;
        if (progress < 1) {
          requestAnimationFrame(stepCount);
        }
      }
      requestAnimationFrame(stepCount);
    }
  }, 2000);
};

// Touch & Click Mobile Navigation Dropdown Toggle Logic
window.toggleNavDropdown = function (e) {
  if (e) e.stopPropagation();
  const wrapper = document.getElementById("nav-dropdown-wrapper");
  if (wrapper) {
    wrapper.classList.toggle("open");
  }
};

window.closeNavDropdown = function () {
  const wrapper = document.getElementById("nav-dropdown-wrapper");
  if (wrapper) {
    wrapper.classList.remove("open");
  }
};

// Close dropdown when clicking anywhere outside on the document
document.addEventListener("click", function (e) {
  const wrapper = document.getElementById("nav-dropdown-wrapper");
  if (wrapper && !wrapper.contains(e.target)) {
    wrapper.classList.remove("open");
  }
});
