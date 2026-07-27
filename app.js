// Application Logic & Dynamic Renderer aligned with Official Arabic & English PDFs

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = 'ar'; // 'ar', 'en', 'dual'
  let currentTheme = localStorage.getItem('theme') || 'light';

  // Initialize UI Theme
  document.documentElement.setAttribute('data-theme', currentTheme);

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
  body.classList.remove('view-dual');

  if (lang === 'ar') {
    body.setAttribute('dir', 'rtl');
    body.setAttribute('lang', 'ar');
  } else if (lang === 'en') {
    body.setAttribute('dir', 'ltr');
    body.setAttribute('lang', 'en');
  } else if (lang === 'dual') {
    body.classList.add('view-dual');
    body.setAttribute('dir', 'rtl');
    body.setAttribute('lang', 'ar');
  }

  // Update View Button Active States
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Render Page Content
  renderPageContent();
}

// Practice Scenarios Dataset
const PRACTICE_SCENARIOS = {
  ar: [
    { id: 1, title: "تمرين 1: التردد والحشو", heard: "آآ وين كنت؟ أريد البدء بالعمل.", target: "<fill> وين كنت؟ أريد البدء بالعمل." },
    { id: 2, title: "تمرين 2: البداية الخاطئة", heard: "خلينا نلتقي السا- الساعة السادسة تماماً.", target: "خلينا نلتقي السا- الساعة السادسة تماماً." },
    { id: 3, title: "تمرين 3: كتابة الأرقام", heard: "ولدت عام 1995 في مدينة القاهرة.", target: "ولدت عام ألف وتسعمئة وخمسة وتسعين في مدينة القاهرة." },
    { id: 4, title: "تمرين 4: التداخل الشديد", heard: "أصوات متداخلة صاخبة غير مفهومة إطلاقاً.", target: "<crosstalk>" },
    { id: 5, title: "تمرين 5: المقطع الأجنبي", heard: "قال لي bon appétit ثم انصرف.", target: "قال لي <foreign_start> bon appétit <foreign_end> ثم انصرف." }
  ],
  en: [
    { id: 1, title: "Practice 1: Fillers", heard: "uh where was I? let me think.", target: "<fill> where was I? let me think." },
    { id: 2, title: "Practice 2: False Start", heard: "let's meet at fi- at six thirty tonight.", target: "let's meet at fi- at six thirty tonight." },
    { id: 3, title: "Practice 3: Spelled-Out Numbers", heard: "I was born in 1975.", target: "I was born in nineteen seventy five." },
    { id: 4, title: "Practice 4: Severe Crosstalk", heard: "Multiple voices shouting completely unintelligible overlap.", target: "<crosstalk>" },
    { id: 5, title: "Practice 5: Foreign Span", heard: "He said bon appétit and left.", target: "He said <foreign_start> bon appétit <foreign_end> and left." }
  ]
};

// Render Page Content based on selected mode
function renderPageContent() {
  const container = document.getElementById('main-content-container');
  if (!container) return;

  if (currentLang === 'dual') {
    container.innerHTML = `
      <div class="dual-wrapper">
        <div class="dual-pane dual-pane-ar">
          ${renderFullPaneContent('ar')}
        </div>
        <div class="dual-pane dual-pane-en">
          ${renderFullPaneContent('en')}
        </div>
      </div>
    `;
  } else {
    container.innerHTML = renderFullPaneContent(currentLang);
  }

  // Re-attach interactive components
  attachInteractiveHandlers();
}

// Generate Full HTML Pane for a given language ('ar' or 'en')
function renderFullPaneContent(lang) {
  const isAr = lang === 'ar';
  const data = GUIDELINES_DATA;
  const scenarios = PRACTICE_SCENARIOS[lang];

  return `
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="hero-badge">
        <i class="fas fa-certificate"></i> ${isAr ? 'الدليل المعياري الرسمي الشامل للمشاركين' : 'Official Annotation Standard Reference'}
      </div>
      <h1 class="hero-title">${data.summary[lang].title}</h1>
      <p class="hero-subtitle">${data.summary[lang].subtitle}</p>

      <!-- Stat Badges Row -->
      <div class="hero-stats-row">
        <div class="stat-pill"><i class="fas fa-check-circle" style="color: #6366f1;"></i> ${isAr ? 'تفريغ حرفي 100%' : '100% Verbatim'}</div>
        <div class="stat-pill"><i class="fas fa-tags" style="color: #3b82f6;"></i> ${isAr ? '10 وسوم قياسية' : '10 Standard Tags'}</div>
        <div class="stat-pill"><i class="fas fa-tasks" style="color: #8b5cf6;"></i> ${isAr ? 'خطة 5 خطوات' : '5-Step Workflow'}</div>
        <div class="stat-pill"><i class="fas fa-font" style="color: #ff6b4a;"></i> ${isAr ? 'كتابة الأرقام حروفاً' : 'Spelled-Out Numbers'}</div>
      </div>

      <!-- Core Principles Cards -->
      <div class="core-principles-grid">
        ${data.core_rules.map(rule => `
          <div class="principle-card">
            <div class="principle-header">
              <div class="principle-icon"><i class="fas ${rule.icon}"></i></div>
              <span class="principle-badge">${rule.badge[lang]}</span>
            </div>
            <h3 class="principle-title">${rule.title[lang]}</h3>
            <p class="principle-desc">${rule.desc[lang]}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- WORKFLOW WIZARD (5 STEPS) -->
    <section class="workflow-section" id="workflow-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-list-ol"></i> ${isAr ? 'دليل عملي مختصر (خطوات التفريغ الـ 5)' : 'Actionable 5-Step Workflow'}
        </h2>
      </div>

      <div class="steps-wrapper">
        ${data.workflow_steps.map(step => `
          <div class="step-card ${step.step === 1 ? 'open' : ''}" data-step="${step.step}">
            <div class="step-header">
              <div class="step-title-group">
                <div class="step-number">${step.step}</div>
                <span class="step-title-text">${step.title[lang]}</span>
              </div>
              <i class="fas fa-chevron-down step-toggle-icon"></i>
            </div>
            <div class="step-body">
              <div class="step-items-list">
                ${step.items.map(item => `
                  <div class="workflow-item">
                    <div class="workflow-trigger">
                      <i class="fas fa-play-circle" style="color: #6366f1;"></i> ${item.trigger[lang]}
                    </div>
                    <div class="workflow-action">${item.action[lang]}</div>
                    <div class="code-example-box">
                      <span>${item.example}</span>
                      <button class="copy-btn" onclick="copyToClipboard('${item.example.replace(/'/g, "\\'")}')">
                        <i class="far fa-copy"></i>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- WORKED EXAMPLES EXPLORER (SECTION 3.1 FROM PDF) -->
    <section class="worked-examples-section" id="worked-examples-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-check-double"></i> ${isAr ? 'أمثلة عملية تطبيقية (صحيح vs محظور)' : 'Worked Examples (Do vs Don\'t)'}
        </h2>
      </div>

      <div class="worked-grid">
        ${data.worked_examples_section[lang].map(ex => `
          <div class="worked-card">
            <div class="worked-heard-label">
              <i class="fas fa-headphones"></i> ${isAr ? 'المسموع في الصوت:' : 'Heard in Audio:'} "${ex.heard}"
            </div>
            <div class="worked-correct-box">
              <i class="fas fa-check-circle"></i> ${ex.correct}
            </div>
            ${ex.incorrect ? ex.incorrect.map(inc => `
              <div class="worked-incorrect-box">
                <i class="fas fa-times-circle"></i> <s>${inc}</s>
              </div>
            `).join('') : ''}
          </div>
        `).join('')}
      </div>
    </section>

    <!-- TAG MATRIX EXPLORER -->
    <section class="tags-section" id="tags-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-tags"></i> ${isAr ? 'جدول الوسوم المعتمدة (القسم 3)' : 'Approved Annotation Tags (Section 3)'}
        </h2>
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input type="text" class="search-input tag-search-input" placeholder="${isAr ? 'ابحث عن وسم أو حالة...' : 'Search tags or triggers...'}" />
        </div>
      </div>

      <div class="tags-grid">
        ${data.annotation_tags.map(t => `
          <div class="tag-card" data-tag-name="${t.tag}">
            <div>
              <div class="tag-header">
                <span class="tag-badge-code" onclick="copyToClipboard('${t.tag.replace(/'/g, "\\'")}')">
                  ${t.tag} <i class="far fa-copy" style="font-size: 0.8rem; margin-inline-start: 4px;"></i>
                </span>
                <span class="tag-type">${t.type}</span>
              </div>
              <p class="tag-desc">${isAr ? t.desc_ar : t.desc_en}</p>
              ${(isAr ? t.notes_ar : t.notes_en) ? `
                <div class="tag-notes">
                  <i class="fas fa-exclamation-triangle"></i> ${isAr ? t.notes_ar : t.notes_en}
                </div>
              ` : ''}
            </div>
            <div class="code-example-box">
              <span>${t.example}</span>
              <button class="copy-btn" onclick="copyToClipboard('${t.example.replace(/'/g, "\\'")}')">
                <i class="far fa-copy"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- FORMATTING CONVENTIONS -->
    <section class="formatting-section" id="formatting-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-paragraph"></i> ${isAr ? 'قواعد الكتابة والتنسيق (القسم 2)' : 'Formatting Conventions (Section 2)'}
        </h2>
      </div>

      <div class="formatting-grid">
        ${data.formatting_conventions.map(conv => `
          <div class="convention-card">
            <div class="convention-header">
              <h3 class="convention-title">${conv.title[lang]}</h3>
            </div>
            <p class="convention-rule">${isAr ? conv.rule_ar : conv.rule_en}</p>
            <div class="dodont-grid">
              <div class="dodont-box do-box">
                <div class="dodont-label">
                  <i class="fas fa-check-circle"></i> ${isAr ? 'الصياغة الصحيحة (Do)' : 'Correct (Do)'}
                </div>
                ${conv.dos.map(d => `<div>• ${isAr ? d.ar : d.en}</div>`).join('')}
              </div>
              <div class="dodont-box dont-box">
                <div class="dodont-label">
                  <i class="fas fa-times-circle"></i> ${isAr ? 'الصياغة المحظورة (Don\'t)' : 'Prohibited (Don\'t)'}
                </div>
                ${conv.donts.map(d => `<div>• ${isAr ? d.ar : d.en}</div>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- SPECIAL SPEECH RULES & OVERLAP CASES (SECTION 4 BENTO GRID) -->
    <section class="special-section" id="special-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-sparkles"></i> ${isAr ? 'الحالات والتفريعات التفصيلية (القسم 4)' : 'Detailed Rules & Cases (Section 4)'}
        </h2>
        <span class="principle-badge"><i class="fas fa-th-large"></i> ${isAr ? 'شبكة بينتو المعيارية' : 'Bento Grid Layout'}</span>
      </div>

      <div class="special-bento-grid">
        <!-- Bento Card 1: Stuttering, False Starts & Repetitions (Span 7) -->
        <div class="special-card bento-card-lg-1" style="border-top: 4px solid #6366f1;">
          <div class="special-title"><i class="fas fa-cut"></i> ${data.special_rules[0].title[lang]}</div>
          <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.75rem;">
            <div style="background: #f0fdf4; border-radius: var(--radius-md); padding: 1rem; border: 1px solid #bbf7d0;">
              <span class="principle-badge" style="color: #15803d; background: #dcfce7; border-color: #86efac; margin-bottom: 0.4rem; display: inline-block;">
                <i class="fas fa-check"></i> ${isAr ? 'التأتأة (Stuttering)' : 'Stuttering'}
              </span>
              <p style="font-size: 0.95rem; color: var(--text-secondary);">${isAr ? data.special_rules[0].stutter_desc_ar : data.special_rules[0].stutter_desc_en}</p>
            </div>

            <div style="background: #fffbeb; border-radius: var(--radius-md); padding: 1rem; border: 1px solid #fde68a;">
              <span class="principle-badge" style="color: #b45309; background: #fef3c7; border-color: #fde68a; margin-bottom: 0.4rem; display: inline-block;">
                <i class="fas fa-strikethrough"></i> ${isAr ? 'البداية الخاطئة (False Start)' : 'False Start'}
              </span>
              <p style="font-size: 0.95rem; color: var(--text-secondary);">${isAr ? data.special_rules[0].false_start_desc_ar : data.special_rules[0].false_start_desc_en}</p>
            </div>

            <div style="background: #eeecfd; border-radius: var(--radius-md); padding: 1rem; border: 1px solid rgba(99, 102, 241, 0.25);">
              <span class="principle-badge" style="color: #4338ca; background: #e0e7ff; border-color: #c7d2fe; margin-bottom: 0.4rem; display: inline-block;">
                <i class="fas fa-redo"></i> ${isAr ? 'التكرار الحقيقي (Deliberate Repetition)' : 'Deliberate Repetition'}
              </span>
              <p style="font-size: 0.95rem; color: var(--text-secondary);">${isAr ? data.special_rules[0].repetition_desc_ar : data.special_rules[0].repetition_desc_en}</p>
            </div>
          </div>
        </div>

        <!-- Bento Card 2: Multiple Speaker Cases 4.11 (Span 5) -->
        <div class="special-card bento-card-lg-2" style="border-top: 4px solid #3b82f6;">
          <div class="special-title"><i class="fas fa-users"></i> ${isAr ? 'حالات تداخل المتحدثين (Section 4.11)' : 'Multiple Speaker Cases (4.11)'}</div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.75rem;">
            <div style="background: #f8fafc; border-radius: var(--radius-sm); padding: 0.85rem; border: 1px solid var(--border-color);">
              <div style="font-weight: 800; font-size: 0.85rem; color: #2563eb; margin-bottom: 0.3rem;">Case A (متحدث مفهوم والآخر غير مفهوم)</div>
              <div class="code-example-box" style="font-size: 0.82rem; flex-direction: column; align-items: flex-start; gap: 4px;">
                <span>Spk 1: hello &lt;background_speech&gt; how are you</span>
                <span>Spk 2: &lt;background_speech&gt; &lt;unintelligible&gt;</span>
              </div>
            </div>

            <div style="background: #f8fafc; border-radius: var(--radius-sm); padding: 0.85rem; border: 1px solid var(--border-color);">
              <div style="font-weight: 800; font-size: 0.85rem; color: #16a34a; margin-bottom: 0.3rem;">Case B (كلا المتحدثين مفهوم)</div>
              <div class="code-example-box" style="font-size: 0.82rem; flex-direction: column; align-items: flex-start; gap: 4px;">
                <span>Spk 1: hello &lt;background_speech&gt; how are you</span>
                <span>Spk 2: very well &lt;background_speech&gt; thanks</span>
              </div>
            </div>

            <div style="background: #f8fafc; border-radius: var(--radius-sm); padding: 0.85rem; border: 1px solid var(--border-color);">
              <div style="font-weight: 800; font-size: 0.85rem; color: #dc2626; margin-bottom: 0.3rem;">Case C (تداخل شديد)</div>
              <div class="code-example-box" style="font-size: 0.82rem;">
                <span>Segment: &lt;crosstalk&gt;</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bento Card 3: Mispronounced Words (Span 4) -->
        <div class="special-card bento-card-sm-1" style="border-top: 4px solid #8b5cf6;">
          <div class="special-title"><i class="fas fa-spell-check"></i> ${data.special_rules[1].title[lang]}</div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6;">${isAr ? data.special_rules[1].rule_ar : data.special_rules[1].rule_en}</p>
        </div>

        <!-- Bento Card 4: Singing & Music (Span 4) -->
        <div class="special-card bento-card-sm-2" style="border-top: 4px solid #6366f1;">
          <div class="special-title"><i class="fas fa-music"></i> ${data.special_rules[2].title[lang]}</div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6;">${isAr ? data.special_rules[2].rule_ar : data.special_rules[2].rule_en}</p>
        </div>

        <!-- Bento Card 5: Discourse Markers (Span 4) -->
        <div class="special-card bento-card-sm-3" style="border-top: 4px solid #ff6b4a;">
          <div class="special-title"><i class="fas fa-comments"></i> ${data.special_rules[3].title[lang]}</div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6;">${isAr ? data.special_rules[3].rule_ar : data.special_rules[3].rule_en}</p>
        </div>
      </div>
    </section>

    <!-- TRANSCRIBER PLAYGROUND -->
    <section class="playground-section" id="playground-section">
      <div class="playground-header">
        <div>
          <h2 class="section-title" style="margin-bottom: 0.25rem;">
            <i class="fas fa-keyboard"></i> ${isAr ? 'مساحة تدريب المفصّل واختبار القواعد' : 'Interactive Transcriber Practice Console'}
          </h2>
          <div style="font-size: 0.9rem; color: var(--text-secondary);">
            ${isAr ? 'انقر على زر الوسم (+) لإدراجه مباشرة في النص واختبار القواعد تلقائياً' : 'Click any tag button (+ <tag>) to insert it directly into the text for live practice'}
          </div>
        </div>
        <span style="font-size: 0.88rem; color: #4338ca; font-weight: 800; background: #eeecfd; padding: 6px 14px; border-radius: 99px; border: 1px solid rgba(99, 102, 241, 0.25);">
          <i class="fas fa-robot"></i> ${isAr ? 'فحص آلي فوري' : 'Live PDF Rule Checker'}
        </span>
      </div>

      <!-- Practice Scenarios Selector -->
      <div style="margin-bottom: 1.25rem;">
        <div style="font-size: 0.85rem; font-weight: 800; color: #4338ca; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
          <i class="fas fa-dumbbell"></i> ${isAr ? 'اختر تمريناً تطبيقياً للتدريب:' : 'Select a practice exercise scenario:'}
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${scenarios.map(sc => `
            <button class="copy-btn" onclick="loadPracticeScenario('${sc.heard.replace(/'/g, "\\'")}')" style="font-size: 0.82rem; font-weight: 700;">
              <i class="fas fa-play" style="font-size: 0.75rem; color: #6366f1;"></i> ${sc.title}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Quick Tag Buttons with Full Visible Tag Code -->
      <div class="quick-tags-bar">
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<fill>')">
          <i class="fas fa-plus"></i> <code>&lt;fill&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<vocal_noise>')">
          <i class="fas fa-plus"></i> <code>&lt;vocal_noise&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<non_speech>')">
          <i class="fas fa-plus"></i> <code>&lt;non_speech&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<background_speech>')">
          <i class="fas fa-plus"></i> <code>&lt;background_speech&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<crosstalk>')">
          <i class="fas fa-plus"></i> <code>&lt;crosstalk&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<unintelligible>')">
          <i class="fas fa-plus"></i> <code>&lt;unintelligible&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<foreign_start>')">
          <i class="fas fa-plus"></i> <code>&lt;foreign_start&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<foreign_end>')">
          <i class="fas fa-plus"></i> <code>&lt;foreign_end&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<empty>')">
          <i class="fas fa-plus"></i> <code>&lt;empty&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<non-native>')">
          <i class="fas fa-plus"></i> <code>&lt;non-native&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('<cut-off>')">
          <i class="fas fa-plus"></i> <code>&lt;cut-off&gt;</code>
        </button>
        <button class="tag-btn-insert" onclick="insertTagIntoPlayground('السا-')" style="color: #b45309; background: #fffbeb; border-color: #fde68a;">
          <i class="fas fa-plus"></i> <code>السا-</code> (${isAr ? 'شرطة قطع' : 'cut hyphen'})
        </button>
      </div>

      <!-- Heard Prompt Alert Banner -->
      <div id="heard-prompt-banner" style="display: none; background: #eeecfd; border: 1px solid rgba(99, 102, 241, 0.25); border-radius: var(--radius-sm); padding: 12px 18px; margin-bottom: 1rem; color: #312e81; font-size: 0.95rem; font-weight: 700;">
        <i class="fas fa-headphones" style="color: #6366f1;"></i> <span id="heard-prompt-text"></span>
      </div>

      <textarea id="playground-editor" class="playground-textarea" placeholder="${isAr ? 'اكتب أو ألصق نص التفريغ هنا للتأكد من القواعد والأرقام والشرطات والوسوم...' : 'Type or paste transcript here to test compliance with PDF rules...'}" oninput="validatePlaygroundText()"></textarea>

      <div class="playground-status-bar">
        <div class="rules-checklist" id="rules-checklist">
          <span class="check-item pass" id="chk-digits"><i class="fas fa-check-circle"></i> ${isAr ? 'لا توجد أرقام رقمية' : 'No raw digits'}</span>
          <span class="check-item pass" id="chk-num-hyphen"><i class="fas fa-check-circle"></i> ${isAr ? 'لا شرطات بالأرقام' : 'No hyphens in numbers'}</span>
          <span class="check-item pass" id="chk-foreign"><i class="fas fa-check-circle"></i> ${isAr ? 'وسوم الأجنبي متطابقة' : 'Foreign tags balanced'}</span>
          <span class="check-item pass" id="chk-crosstalk"><i class="fas fa-check-circle"></i> ${isAr ? 'التداخل التام بدون كلمات' : 'Crosstalk empty'}</span>
        </div>

        <div style="font-size: 0.9rem; color: var(--text-muted); font-weight: 700;">
          <span id="stat-words" style="color: #4338ca;">0</span> ${isAr ? 'كلمة' : 'words'} | <span id="stat-tags" style="color: #3b82f6;">0</span> ${isAr ? 'وسم' : 'tags'}
        </div>
      </div>
    </section>
  `;
}

// Event Bindings
function bindEvents() {
  // Language View Mode Selector Buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguageMode(btn.dataset.lang);
    });
  });
}

// Attach interactive handlers after HTML render
function attachInteractiveHandlers() {
  // Accordion Step Cards
  document.querySelectorAll('.step-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.step-card');
      card.classList.toggle('open');
    });
  });

  // Tag Search Inputs
  document.querySelectorAll('.tag-search-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const tagCards = input.closest('.tags-section').querySelectorAll('.tag-card');

      tagCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Load Practice Scenario
window.loadPracticeScenario = function(heardText) {
  const banner = document.getElementById('heard-prompt-banner');
  const bannerText = document.getElementById('heard-prompt-text');
  const editor = document.getElementById('playground-editor');

  if (banner && bannerText && editor) {
    banner.style.display = 'block';
    bannerText.textContent = (currentLang === 'ar' ? 'المطلوب تفريغ الصوت التالي: ' : 'Practice Audio Prompt: ') + `"${heardText}"`;
    editor.value = '';
    editor.focus();
    validatePlaygroundText();
  }
};

// Copy to Clipboard Helper with Toast
window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(currentLang === 'ar' ? `تم نسخ "${text}" بنجاح!` : `Copied "${text}" to clipboard!`);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
};

function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #6366f1;"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Transcriber Playground Logic
window.insertTagIntoPlayground = function(tag) {
  const editor = document.getElementById('playground-editor');
  if (!editor) return;

  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const val = editor.value;

  editor.value = val.substring(0, start) + ' ' + tag + ' ' + val.substring(end);
  editor.focus();
  editor.selectionStart = editor.selectionEnd = start + tag.length + 2;

  validatePlaygroundText();
};

window.validatePlaygroundText = function() {
  const editor = document.getElementById('playground-editor');
  if (!editor) return;

  const text = editor.value;

  // 1. Raw Digit Check (0-9 or ٠-٩)
  const hasDigits = /[0-9٠-٩]/.test(text);
  const chkDigits = document.getElementById('chk-digits');
  if (chkDigits) {
    if (hasDigits) {
      chkDigits.className = 'check-item warn';
      chkDigits.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === 'ar' ? 'تنبيه: أرقام رقمية! (اكتبها حروفاً)' : 'Warning: Raw digits found! Spell out'}`;
    } else {
      chkDigits.className = 'check-item pass';
      chkDigits.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === 'ar' ? 'لا توجد أرقام رقمية' : 'No raw digits'}`;
    }
  }

  // 2. Hyphens inside compound numbers check
  const numHyphenRegex = /(sixty|seventy|eighty|ninety|twenty|thirty|forty|fifty|one|two|three|four|five|six|seven|eight|nine|خمسة|تسعة|أربعة|ستة)-(four|five|six|seven|eight|nine|one|two|three|عشرون|ثلاثون)/i;
  const hasNumHyphen = numHyphenRegex.test(text);
  const chkNumHyphen = document.getElementById('chk-num-hyphen');
  if (chkNumHyphen) {
    if (hasNumHyphen) {
      chkNumHyphen.className = 'check-item warn';
      chkNumHyphen.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === 'ar' ? 'تنبيه: شرطة بين أجزاء العدد!' : 'Warning: Hyphen in compound number'}`;
    } else {
      chkNumHyphen.className = 'check-item pass';
      chkNumHyphen.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === 'ar' ? 'لا شرطات بالأرقام' : 'No hyphens in numbers'}`;
    }
  }

  // 3. Foreign Tag Balance Check
  const fStartCount = (text.match(/<foreign_start>/g) || []).length;
  const fEndCount = (text.match(/<foreign_end>/g) || []).length;
  const chkForeign = document.getElementById('chk-foreign');
  if (chkForeign) {
    if (fStartCount !== fEndCount) {
      chkForeign.className = 'check-item warn';
      chkForeign.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === 'ar' ? `وسوم الأجنبي غير متطابقة (${fStartCount}/${fEndCount})` : `Foreign tags unbalanced (${fStartCount}/${fEndCount})`}`;
    } else {
      chkForeign.className = 'check-item pass';
      chkForeign.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === 'ar' ? 'وسوم الأجنبي متطابقة' : 'Foreign tags balanced'}`;
    }
  }

  // 4. Crosstalk Empty Check
  const hasCrosstalkText = /<crosstalk>\s*\w+/i.test(text);
  const chkCrosstalk = document.getElementById('chk-crosstalk');
  if (chkCrosstalk) {
    if (hasCrosstalkText) {
      chkCrosstalk.className = 'check-item warn';
      chkCrosstalk.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${currentLang === 'ar' ? 'تنبيه: كلمات داخل وسم crosstalk!' : 'Warning: Words inside crosstalk!'}`;
    } else {
      chkCrosstalk.className = 'check-item pass';
      chkCrosstalk.innerHTML = `<i class="fas fa-check-circle"></i> ${currentLang === 'ar' ? 'التداخل التام بدون كلمات' : 'Crosstalk empty'}`;
    }
  }

  // Word and Tag Counter Stats
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tags = (text.match(/<[^>]+>/g) || []).length;

  const statWords = document.getElementById('stat-words');
  const statTags = document.getElementById('stat-tags');
  if (statWords) statWords.textContent = words;
  if (statTags) statTags.textContent = tags;
};
