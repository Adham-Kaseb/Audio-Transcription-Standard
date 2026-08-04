// Complete Interactive 70-Question MSA Transcription Exam Application Logic
// Strictly synchronized with MSA_Audio_Transcription_Guidelines.md and EXAM_DATA

let lenis = null;

function initLenis() {
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
}

// Exam State Engine
const EXAM_STATE = {
  currentStep: "landing", // 'landing', 'runner', 'results'
  currentQuestionIndex: 0,
  answers: {}, // questionId -> answer
  flagged: {}, // questionId -> boolean
  timeRemaining: 0,
  timerInterval: null,
  candidateName: "",
  soundEnabled: true,
  showRulesBrief: false,
  showRevisionModal: false,
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lenis
  initLenis();

  // Initialize UI Theme
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Render initial view
  renderApp();
});

// Main App Router / Renderer
function renderApp() {
  const container = document.getElementById("main-content-container");
  if (!container) return;

  if (EXAM_STATE.currentStep === "landing") {
    container.innerHTML = renderExamLandingHTML();
  } else if (EXAM_STATE.currentStep === "runner") {
    container.innerHTML = renderExamRunnerHTML();
    attachRunnerEvents();
    startQuestionTimer();
  } else if (EXAM_STATE.currentStep === "results") {
    container.innerHTML = renderExamResultsHTML();
  }

  // Render Overlay Modals if active
  renderModalsContainer();
}

// --------------------------------------------------------------------------
// LANDING SCREEN RENDERER
// --------------------------------------------------------------------------
function renderExamLandingHTML() {
  return `
    <div class="exam-hero-card animate-pop-in">
      <!-- Background Ambient Glows inside Card -->
      <div class="card-glow-orb orb-top-right"></div>
      <div class="card-glow-orb orb-bottom-left"></div>

      <!-- Top Crest & Pill Badge -->
      <div class="hero-header-top">
        <div class="hero-crest-box">
          <i class="fas fa-shield-halved"></i>
        </div>

        <div class="exam-badge-pill">
          <span class="badge-pulse-dot"></span>
          <span class="badge-ar-text">اختبار التأهيل والاعتماد المعياري</span>
          <span class="badge-en-tag" dir="ltr">MSA Verbatim</span>
        </div>
      </div>

      <!-- Main Headline -->
      <h1 class="exam-title-headline">
        رحلة التحدي والاعتماد المعياري<br>
        <span class="gradient-headline">لتفريغ صوتيات العربية الفصحى الحديثة</span>
      </h1>

      <!-- Subtext Description -->
      <p class="exam-subtext">
        مرحباً بك في الاختبار التأهيلي المعياري الرسمي. يتكون الاختبار من <strong>70 سؤالاً دقيقاً وموقوتاً</strong> تم إعدادها بعناية فائقة لقياس مدى إتقانك التام لقواعد التفريغ الحرفي بنسبة 100% والوسوم المعتمدة وصيغ الأرقام والحالات الصوتية المعقدة.
      </p>

      <!-- Executive Metric Bar -->
      <div class="hero-metrics-bar">
        <div class="metric-chip">
          <i class="fas fa-list-check" style="color: #6366f1;"></i>
          <span><strong>70</strong> سؤالاً شاملاً</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric-chip">
          <i class="fas fa-stopwatch" style="color: #10b981;"></i>
          <span>توقيت زمني مخصص</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric-chip">
          <i class="fas fa-award" style="color: #f59e0b;"></i>
          <span>حد النجاح <strong>85%</strong></span>
        </div>
      </div>

      <!-- Balanced 2x2 Notes Grid -->
      <div class="exam-notes-grid">
        <div class="exam-note-card">
          <div class="exam-note-icon icon-bg-1">
            <i class="fas fa-stopwatch"></i>
          </div>
          <div>
            <div class="exam-note-title">مؤقت زمني مخصص لكل سؤال</div>
            <div class="exam-note-desc">توقيت محدد لكل سؤال (من 25 إلى 60 ثانية) بناءً على نوعه وصعوبته، وينتهي السؤال فور انقضاء الوقت.</div>
          </div>
        </div>

        <div class="exam-note-card">
          <div class="exam-note-icon icon-bg-2">
            <i class="fas fa-layer-group"></i>
          </div>
          <div>
            <div class="exam-note-title">تنوع شامل لأنماط الأسئلة</div>
            <div class="exam-note-desc">اختيار من متعدد، تفريغ نصي تفاعلي، تطبيق وسوم، اكتشاف الأخطاء، وقرارات سيناريو واقعية.</div>
          </div>
        </div>

        <div class="exam-note-card">
          <div class="exam-note-icon icon-bg-3">
            <i class="fas fa-award"></i>
          </div>
          <div>
            <div class="exam-note-title">حد اجتياز التأهيل المعياري (85%)</div>
            <div class="exam-note-desc">يتطلب الاعتماد وإصدار شهادة التأهيل الرسمية الحصول على نسبة 85% فما فوق من مجموع الدرجات.</div>
          </div>
        </div>

        <div class="exam-note-card">
          <div class="exam-note-icon icon-bg-4">
            <i class="fas fa-check-double"></i>
          </div>
          <div>
            <div class="exam-note-title">تفريغ حرفي 100% بدون تنظيف</div>
            <div class="exam-note-desc">يُحظر تعديل أو تنظيف الكلام أو تصحيح النحو أو حذف الترددات الصامتة دون الوسم المناسب.</div>
          </div>
        </div>
      </div>

      <!-- Action Banner -->
      <div class="exam-start-banner">
        <div class="start-banner-text">
          <div class="start-banner-title">هل أنت مستعد لبدء التحدي التنافسي؟</div>
          <div class="start-banner-sub">تأكد من مراجعة كافة القواعد والوسوم بدقة قبل الانطلاق.</div>
        </div>

        <button class="start-btn-primary" onclick="promptRevisionCheck()">
          <span>بدء رحلة الاختبار الآن (70 سؤالاً)</span>
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  `;
}

// Prompt "Are you revised?" Revision Check Modal
function promptRevisionCheck() {
  EXAM_STATE.showRevisionModal = true;
  renderModalsContainer();
}

function closeRevisionModal() {
  EXAM_STATE.showRevisionModal = false;
  renderModalsContainer();
}

function openRulesBriefing() {
  EXAM_STATE.showRevisionModal = false;
  EXAM_STATE.showRulesBrief = true;
  renderModalsContainer();
}

function closeRulesBriefing() {
  EXAM_STATE.showRulesBrief = false;
  renderModalsContainer();
}

function startExamNow() {
  EXAM_STATE.showRevisionModal = false;
  EXAM_STATE.showRulesBrief = false;
  EXAM_STATE.currentStep = "runner";
  EXAM_STATE.currentQuestionIndex = 0;
  EXAM_STATE.answers = {};
  EXAM_STATE.flagged = {};
  renderApp();
}

// Render Modal Overlays
function renderModalsContainer() {
  let modalContainer = document.getElementById("modal-overlay-root");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-overlay-root";
    document.body.appendChild(modalContainer);
  }

  let html = "";

  // Revision Prompt Modal
  if (EXAM_STATE.showRevisionModal) {
    html += `
      <div class="revision-modal-backdrop" onclick="closeRevisionModal()">
        <div class="revision-modal-card" onclick="event.stopPropagation()">
          <div class="revision-modal-icon">
            <i class="fas fa-question"></i>
          </div>

          <h2 class="revision-modal-title">هل قمت بمراجعة الدليل والقواعد جيداً؟</h2>
          <p class="revision-modal-subtitle">
            الاختبار حاسم وموقوت ويتضمن 70 سؤالاً شاملاً لكل جزئيات التفريغ الحرفي وتطبيق الوسوم والأرقام. هل ترغب في البدء فوراً أم تفضل إعطاء موجز سريع للقواعد؟
          </p>

          <div class="revision-btn-group">
            <button class="btn-yes-start" onclick="startExamNow()">
              <i class="fas fa-bolt"></i>
              <span>نعم، أنا جاهز تماماً لبدء الاختبار الآن</span>
            </button>

            <button class="btn-no-brief" onclick="openRulesBriefing()">
              <i class="fas fa-book-open"></i>
              <span>لا، أريد مراجعة موجز القواعد والوسوم أولاً</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Rules Briefing Cheat-Sheet Modal
  if (EXAM_STATE.showRulesBrief) {
    html += `
      <div class="revision-modal-backdrop" onclick="closeRulesBriefing()">
        <div class="rules-brief-dialog" onclick="event.stopPropagation()">
          <div class="brief-modal-header">
            <div style="font-weight: 900; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;">
              <i class="fas fa-book-bookmark" style="color: #6366f1;"></i>
              <span>موجز الدليل المعياري وقواعد التوسيم (Quick Rules Brief)</span>
            </div>
            <button onclick="closeRulesBriefing()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-muted);">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="brief-modal-body">
            <div class="brief-tab-grid">
              <div class="brief-card-rule">
                <h4><i class="fas fa-quote-right"></i> التفريغ الحرفي 100%</h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary);">انسخ الكلام حرفياً وبالترتيب نفسه. لا تعد صياغة الجملة، ولا تصحح قواعد المتحدث، ولا تحذف كلمات أو تكرارات أو ترددات.</p>
              </div>

              <div class="brief-card-rule">
                <h4><i class="fas fa-code"></i> الوسوم الرسمية</h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary);">&lt;fill&gt; للتردد، &lt;vocal_noise&gt; للسعال والضحك، &lt;non_speech&gt; للأصوات البيئية والموسيقى الآلية، &lt;unintelligible&gt; للغير مفهوم.</p>
              </div>

              <div class="brief-card-rule">
                <h4><i class="fas fa-font"></i> الأرقام والحروف</h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary);">تُكتب الأرقام والتواريخ بالكلمات بدون شرطات في الأعداد المركبة. الأرقام الرقمية تُستخدم فقط في أسماء العلامات التجارية الرسمية.</p>
              </div>

              <div class="brief-card-rule">
                <h4><i class="fas fa-strikethrough"></i> الشرطة والتأتأة</h4>
                <p style="font-size: 0.88rem; color: var(--text-secondary);">التأتأة تُحذف مقاطعها المكسورة. البداية الخاطئة تُحتفظ فيها الكلمة المبتورة متبوعة بشرطة (-) فقط.</p>
              </div>
            </div>

            <!-- Table Summary of Tags -->
            <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.88rem;">
              <thead>
                <tr style="background: var(--bg-tertiary); border-bottom: 2px solid var(--border-color);">
                  <th style="padding: 10px; text-align: right;">الوسم</th>
                  <th style="padding: 10px; text-align: right;">الاستخدام الصحيح</th>
                  <th style="padding: 10px; text-align: right;">مثال صحيح</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px; font-weight: 800; font-family: monospace; color: #4f46e5;">&lt;fill&gt;</td>
                  <td style="padding: 8px;">التوقفات والترددات خالية المعنى (uh, um, آآ)</td>
                  <td style="padding: 8px;">ذهبت إلى &lt;fill&gt; المتجر</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px; font-weight: 800; font-family: monospace; color: #4f46e5;">&lt;vocal_noise&gt;</td>
                  <td style="padding: 8px;">السعال، الضحك، التنهد، التنحنح البشرية</td>
                  <td style="padding: 8px;">أعتقد &lt;vocal_noise&gt; أننا سنغادر</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px; font-weight: 800; font-family: monospace; color: #4f46e5;">&lt;non_speech&gt;</td>
                  <td style="padding: 8px;">الأصوات البيئية (ارتطام باب، موسيقى آلية)</td>
                  <td style="padding: 8px;">خرجت &lt;non_speech&gt; من الغرفة</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 8px; font-weight: 800; font-family: monospace; color: #4f46e5;">&lt;crosstalk&gt;</td>
                  <td style="padding: 8px;">تداخل صاخب غير مفهوم للجميع (بمفرده)</td>
                  <td style="padding: 8px;">&lt;crosstalk&gt;</td>
                </tr>
              </tbody>
            </table>

            <div style="margin-top: 2rem; text-align: center;">
              <button class="btn-yes-start" onclick="startExamNow()" style="width: 100%;">
                <i class="fas fa-play"></i>
                <span>فهمت جميع القواعد والوسوم - ابدأ الاختبار فوراً</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  modalContainer.innerHTML = html;
}

// --------------------------------------------------------------------------
// EXAM RUNNER SCREEN RENDERER
// --------------------------------------------------------------------------
function renderExamRunnerHTML() {
  const q = EXAM_DATA.questions[EXAM_STATE.currentQuestionIndex];
  const qNum = EXAM_STATE.currentQuestionIndex + 1;
  const total = EXAM_DATA.questions.length;
  const isFlagged = EXAM_STATE.flagged[q.id] || false;
  const currentAnswer = EXAM_STATE.answers[q.id] || "";

  return `
    <div class="exam-runner-container animate-pop-in">
      <!-- Runner Header -->
      <div class="exam-runner-header">
        <div class="exam-progress-info">
          <div class="question-counter-badge">
            سؤال ${qNum} من ${total}
          </div>
          <div class="category-tag-pill">
            <i class="fas fa-folder-open"></i>
            ${getCategoryName(q.category)}
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 15px;">
          <!-- Timer Box -->
          <div class="question-timer-box ${EXAM_STATE.timeRemaining <= 10 ? "time-warning" : ""}" id="timer-display-box">
            <i class="fas fa-clock"></i>
            <span id="timer-text">${EXAM_STATE.timeRemaining} ثانية</span>
          </div>

          <!-- Sound Toggle -->
          <button class="btn-flag ${EXAM_STATE.soundEnabled ? "active" : ""}" onclick="toggleSound()" title="تفعيل/إيقاف التأثيرات الصوتية">
            <i class="fas ${EXAM_STATE.soundEnabled ? "fa-volume-up" : "fa-volume-mute"}"></i>
          </button>
        </div>
      </div>

      <!-- 70-Question Navigator Grid Drawer -->
      <div class="question-navigator-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-secondary);">
            <i class="fas fa-th"></i> شبكة التنقل التفاعلية (70 سؤالاً)
          </div>
          <div style="display: flex; gap: 12px; font-size: 0.8rem;">
            <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; background: #4f46e5; border-radius: 50%;"></span> مُجاب</span>
            <span style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; background: #f59e0b; border-radius: 50%;"></span> مميز بملاحظة</span>
          </div>
        </div>

        <div class="grid-70-container">
          ${EXAM_DATA.questions
            .map((item, idx) => {
              const isAns =
                EXAM_STATE.answers[item.id] !== undefined &&
                EXAM_STATE.answers[item.id] !== "";
              const isCurr = idx === EXAM_STATE.currentQuestionIndex;
              const isFlg = EXAM_STATE.flagged[item.id];
              return `
                <div class="grid-num-box ${isAns ? "answered" : ""} ${isCurr ? "current" : ""} ${isFlg ? "flagged" : ""}"
                     onclick="jumpToQuestion(${idx})">
                  ${idx + 1}
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <!-- Main Question Card -->
      <div class="exam-question-card">
        <!-- Audio Simulation / Prompt Description -->
        <div class="audio-prompt-container">
          <div class="audio-icon-orb">
            <i class="fas fa-headphones"></i>
          </div>
          <div>
            <div style="font-size: 0.82rem; font-weight: 800; color: var(--accent-indigo); text-transform: uppercase; margin-bottom: 2px;">المسموع في التسجيل الصوتي (Audio Heard)</div>
            <div class="audio-text-content">"${q.heardText}"</div>
          </div>
        </div>

        <!-- Question Text Title -->
        <h2 class="question-text-title">${q.questionText}</h2>

        <!-- Question Type Renderer -->
        <div class="question-input-area">
          ${renderQuestionInputControls(q, currentAnswer)}
        </div>
      </div>

      <!-- Runner Footer Controls -->
      <div class="exam-runner-footer">
        <button class="nav-btn-prev" onclick="prevQuestion()" ${EXAM_STATE.currentQuestionIndex === 0 ? "disabled style='opacity:0.5; cursor:not-allowed;'" : ""}>
          <i class="fas fa-arrow-right"></i>
          <span>السؤال السابق</span>
        </button>

        <button class="btn-flag ${isFlagged ? "active" : ""}" onclick="toggleFlagCurrentQuestion()">
          <i class="fas fa-bookmark"></i>
          <span>${isFlagged ? "إلغاء التمييز" : "تمييز بملاحظة"}</span>
        </button>

        ${
          qNum < total
            ? `
          <button class="nav-btn-next" onclick="nextQuestion()">
            <span>السؤال التالي</span>
            <i class="fas fa-arrow-left"></i>
          </button>
        `
            : `
          <button class="nav-btn-next" onclick="submitExamConfirmation()" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
            <i class="fas fa-check-circle"></i>
            <span>إنهاء وتكليف الاختبار الآن</span>
          </button>
        `
        }
      </div>
    </div>
  `;
}

// Render Inputs per Question Type
function renderQuestionInputControls(q, currentAnswer) {
  if (
    q.type === "mcq" ||
    q.type === "tag_picker" ||
    q.type === "error_spotting" ||
    q.type === "situational_tf"
  ) {
    return `
      <div class="mcq-options-grid">
        ${q.options
          .map((opt, idx) => {
            const isSelected = currentAnswer === idx;
            return `
              <div class="mcq-option-item ${isSelected ? "selected" : ""}" onclick="selectMCQOption(${q.id}, ${idx})">
                <div class="option-radio-circle"></div>
                <div class="option-label-text">${opt}</div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  } else if (q.type === "verbatim_input") {
    return `
      <div>
        <textarea id="verbatim-textarea-${q.id}" class="verbatim-input-box" placeholder="اكتب النص المنسوخ بدقة مع الوسوم والشرطات في مواضعها..."
                  oninput="saveVerbatimInput(${q.id}, this.value)">${currentAnswer}</textarea>
        
        <!-- Interactive Tag Chips Toolbar -->
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--text-muted); margin-top: 12px; margin-bottom: 6px;">
          شريط أدوات الإدراج السريع للوسوم (إدراج في موضع المؤشر):
        </div>
        <div class="tag-chips-toolbar">
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<fill>')">&lt;fill&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<vocal_noise>')">&lt;vocal_noise&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<non_speech>')">&lt;non_speech&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<background_speech>')">&lt;background_speech&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<crosstalk>')">&lt;crosstalk&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<unintelligible>')">&lt;unintelligible&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<cut-off>')">&lt;cut-off&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<foreign_start>')">&lt;foreign_start&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<foreign_end>')">&lt;foreign_end&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<non-native>')">&lt;non-native&gt;</button>
          <button class="tag-chip-btn" onclick="insertTagToTextArea(${q.id}, '<empty>')">&lt;empty&gt;</button>
        </div>
      </div>
    `;
  }
  return "";
}

// Category Lookup
function getCategoryName(catId) {
  const found = EXAM_DATA.info.categories.find((c) => c.id === catId);
  return found ? found.title : catId;
}

// --------------------------------------------------------------------------
// TIMER & CONTROL LOGIC
// --------------------------------------------------------------------------
function startQuestionTimer() {
  if (EXAM_STATE.timerInterval) {
    clearInterval(EXAM_STATE.timerInterval);
  }

  const q = EXAM_DATA.questions[EXAM_STATE.currentQuestionIndex];
  EXAM_STATE.timeRemaining = q.timerSeconds || 30;

  updateTimerDisplay();

  EXAM_STATE.timerInterval = setInterval(() => {
    EXAM_STATE.timeRemaining--;
    updateTimerDisplay();

    if (EXAM_STATE.timeRemaining <= 0) {
      clearInterval(EXAM_STATE.timerInterval);
      handleQuestionTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const box = document.getElementById("timer-display-box");
  const txt = document.getElementById("timer-text");
  if (txt) {
    txt.textContent = `${EXAM_STATE.timeRemaining} ثانية`;
  }
  if (box) {
    if (EXAM_STATE.timeRemaining <= 10) {
      box.classList.add("time-warning");
    } else {
      box.classList.remove("time-warning");
    }
  }
}

function handleQuestionTimeout() {
  // If time runs out and no answer provided, auto advance to next question
  if (EXAM_STATE.currentQuestionIndex < EXAM_DATA.questions.length - 1) {
    nextQuestion();
  } else {
    evaluateAndFinishExam();
  }
}

function selectMCQOption(qId, optionIdx) {
  EXAM_STATE.answers[qId] = optionIdx;
  renderApp();
}

function saveVerbatimInput(qId, textVal) {
  EXAM_STATE.answers[qId] = textVal;
}

function insertTagToTextArea(qId, tagStr) {
  const textarea = document.getElementById(`verbatim-textarea-${qId}`);
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;

  const newText = text.substring(0, start) + tagStr + text.substring(end);
  textarea.value = newText;
  textarea.focus();
  textarea.setSelectionRange(start + tagStr.length, start + tagStr.length);

  saveVerbatimInput(qId, newText);
}

function toggleFlagCurrentQuestion() {
  const q = EXAM_DATA.questions[EXAM_STATE.currentQuestionIndex];
  EXAM_STATE.flagged[q.id] = !EXAM_STATE.flagged[q.id];
  renderApp();
}

function toggleSound() {
  EXAM_STATE.soundEnabled = !EXAM_STATE.soundEnabled;
  renderApp();
}

function jumpToQuestion(idx) {
  EXAM_STATE.currentQuestionIndex = idx;
  renderApp();
}

function nextQuestion() {
  if (EXAM_STATE.currentQuestionIndex < EXAM_DATA.questions.length - 1) {
    EXAM_STATE.currentQuestionIndex++;
    renderApp();
  }
}

function prevQuestion() {
  if (EXAM_STATE.currentQuestionIndex > 0) {
    EXAM_STATE.currentQuestionIndex--;
    renderApp();
  }
}

function submitExamConfirmation() {
  const unansweredCount = EXAM_DATA.questions.filter(
    (q) =>
      EXAM_STATE.answers[q.id] === undefined || EXAM_STATE.answers[q.id] === "",
  ).length;

  if (unansweredCount > 0) {
    if (
      !confirm(
        `تنبيه: يوجد لديك ${unansweredCount} سؤالاً لم تقم بالإجابة عليها بعد. هل تريد إنهاء وتكليف الاختبار الآن؟`,
      )
    ) {
      return;
    }
  }
  evaluateAndFinishExam();
}

function evaluateAndFinishExam() {
  if (EXAM_STATE.timerInterval) {
    clearInterval(EXAM_STATE.timerInterval);
  }

  // Calculate Scores
  let correctCount = 0;
  const catTotal = {};
  const catCorrect = {};

  EXAM_DATA.questions.forEach((q) => {
    if (!catTotal[q.category]) {
      catTotal[q.category] = 0;
      catCorrect[q.category] = 0;
    }
    catTotal[q.category]++;

    const userAns = EXAM_STATE.answers[q.id];
    let isCorrect = false;

    if (q.type === "verbatim_input") {
      if (typeof userAns === "string" && typeof q.targetAnswer === "string") {
        // Clean white spaces for comparison
        const normUser = userAns.trim().replace(/\s+/g, " ");
        const normTarget = q.targetAnswer.trim().replace(/\s+/g, " ");
        isCorrect = normUser === normTarget;
      }
    } else {
      isCorrect = userAns === q.correctAnswer;
    }

    if (isCorrect) {
      correctCount++;
      catCorrect[q.category]++;
    }
  });

  EXAM_STATE.scorePercentage = Math.round(
    (correctCount / EXAM_DATA.questions.length) * 100,
  );
  EXAM_STATE.passed =
    EXAM_STATE.scorePercentage >= EXAM_DATA.info.passingPercentage;
  EXAM_STATE.correctCount = correctCount;
  EXAM_STATE.categoryBreakdown = {};

  Object.keys(catTotal).forEach((cat) => {
    EXAM_STATE.categoryBreakdown[cat] = Math.round(
      (catCorrect[cat] / catTotal[cat]) * 100,
    );
  });

  EXAM_STATE.currentStep = "results";
  renderApp();
}

// --------------------------------------------------------------------------
// RESULTS & CERTIFICATION SCREEN RENDERER
// --------------------------------------------------------------------------
function renderExamResultsHTML() {
  const pass = EXAM_STATE.passed;
  const score = EXAM_STATE.scorePercentage;
  const correct = EXAM_STATE.correctCount;
  const total = EXAM_DATA.questions.length;

  return `
    <div class="results-dashboard-card animate-pop-in">
      <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
        <div style="width: 110px; height: 110px; border-radius: 50%; background: ${pass ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"}; color: ${pass ? "#16a34a" : "#dc2626"}; display: flex; align-items: center; justify-content: center; font-size: 3.5rem; box-shadow: 0 0 35px ${pass ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"};">
          <i class="fas ${pass ? "fa-check-circle" : "fa-times-circle"}"></i>
        </div>
      </div>

      <h1 style="font-size: 2.2rem; font-weight: 900; color: var(--text-primary); margin-bottom: 0.5rem;">
        ${pass ? "تهانينا! لقد اجتزت اختبار التأهيل المعياري بنجاح 🎉" : "للأسف لم تتجاوز حد التأهيل المطلوب (85%)"}
      </h1>

      <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 700px; margin: 0 auto 2rem;">
        ${pass ? "أظهرت إتقاناً تاماً لقواعد التفريغ الحرفي وتطبيق الوسوم والأرقام بحسب الدليل المعياري للغة العربية الفصحى الحديثة." : "يرجى إعادة مراجعة القواعد والوسوم بدقة ثم إعادة التحدي لتحقيق نسبة الإتقان المطلوبة."}
      </p>

      <!-- Score Gauge Badge -->
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; max-width: 450px; margin: 0 auto 2.5rem; display: flex; align-items: center; justify-content: space-around;">
        <div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 800;">النتيجة النهائية</div>
          <div style="font-size: 2.5rem; font-weight: 900; color: ${pass ? "#16a34a" : "#dc2626"};">${score}%</div>
        </div>
        <div style="width: 1px; height: 50px; background: var(--border-color);"></div>
        <div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 800;">الإجابات الصحيحة</div>
          <div style="font-size: 2.5rem; font-weight: 900; color: var(--accent-indigo);">${correct} / ${total}</div>
        </div>
      </div>

      <!-- FormBold Official Submission Form -->
      <div class="formbold-results-card">
        <div class="formbold-card-header">
          <div class="formbold-icon-circle">
            <i class="fas fa-paper-plane"></i>
          </div>
          <div style="text-align: right;">
            <h3 class="formbold-title">إرسال واعتماد نتيجة الاختبار رسمياً (FormBold Submission)</h3>
            <p class="formbold-subtitle">يرجى ملء الاسم الكامل والبريد الإلكتروني لإرسال نتيجتك وتوثيق شهادة التأهيل بشكل رسمي.</p>
          </div>
        </div>

        <form action="https://formbold.com/s/oyX7W" method="POST" class="formbold-form">
          <div class="formbold-inputs-grid">
            <div class="formbold-field">
              <label class="formbold-label"><i class="fas fa-user"></i> الاسم الكامل (Candidate Name)</label>
              <input type="text" name="name" class="formbold-input" placeholder="أدخل اسمك الكامل هنا..." required value="${EXAM_STATE.candidateName}" oninput="EXAM_STATE.candidateName = this.value">
            </div>

            <div class="formbold-field">
              <label class="formbold-label"><i class="fas fa-envelope"></i> البريد الإلكتروني (Email Address)</label>
              <input type="email" name="email" class="formbold-input" placeholder="example@domain.com" required>
            </div>
          </div>

          <!-- Hidden Preset Subject & Meta Fields -->
          <input type="hidden" name="subject" value="نتيجة اختبار التأهيل المعياري - MSA Audio Transcription Exam Result">
          <input type="hidden" name="score_percentage" value="${score}%">
          <input type="hidden" name="correct_answers" value="${correct}/${total}">
          <input type="hidden" name="qualification_status" value="${pass ? "Passed (مؤهل)" : "Failed (غير مؤهل)"}">

          <!-- Detailed Auto-Generated Message Payload -->
          <div class="formbold-field" style="margin-top: 1.25rem;">
            <label class="formbold-label"><i class="fas fa-file-alt"></i> تقرير النتيجة والتفاصيل الآلية (Auto-Generated Payload)</label>
            <textarea name="message" class="formbold-textarea" readonly>${generateFormBoldPayload(score, pass, correct, total)}</textarea>
          </div>

          <button type="submit" class="formbold-submit-btn">
            <span>إرسال النتيجة واعتماد الشهادة عبر FormBold</span>
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>

      <!-- Certificate Generator Frame (If Passed) -->
      ${
        pass
          ? `
        <div class="certificate-frame">
          <div class="certificate-seal-badge">
            <i class="fas fa-stamp"></i>
          </div>

          <div style="font-size: 0.9rem; letter-spacing: 2px; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 0.5rem;">Official Qualification Certificate</div>
          <h2 class="certificate-header-title">شهادة كفاءة وتأهيل في تفريغ الصوتيات (MSA Verbatim)</h2>
          
          <p style="font-size: 1.1rem; color: #451a03; max-width: 600px; margin: 0 auto 1.5rem; line-height: 1.7;">
            تشهد المنصة المعيارية بأن المتدرب قد أتم بنجاح رحلة الاختبار التنافسي المكون من 70 سؤالاً محققاً نسبة إتقان <strong>${score}%</strong> ومؤهلاً للعمل على مشاريع التفريغ الحرفي وتوسيم الصوتيات.
          </p>

          <div style="max-width: 380px; margin: 0 auto 1.5rem;">
            <input type="text" id="candidate-cert-name" placeholder="أدخل اسمك الكامل لطباعة الشهادة..."
                   style="width: 100%; padding: 12px 16px; border: 2px solid #f59e0b; border-radius: 12px; font-size: 1.1rem; text-align: center; font-weight: 800; color: #78350f;"
                   value="${EXAM_STATE.candidateName}" oninput="EXAM_STATE.candidateName = this.value">
          </div>

          <button onclick="window.print()" style="background: linear-gradient(135deg, #d97706 0%, #b45309 100%); color: white; border: none; padding: 0.9rem 2rem; border-radius: 12px; font-weight: 800; font-size: 1rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 6px 20px rgba(217, 119, 6, 0.3);">
            <i class="fas fa-print"></i>
            <span>طباعة وتصدير الشهادة الرسمية</span>
          </button>
        </div>
      `
          : ""
      }

      <!-- Detailed 70-Question Review -->
      <div style="margin-top: 3rem; text-align: right;">
        <h3 style="font-size: 1.5rem; font-weight: 900; color: var(--text-primary); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-clipboard-check" style="color: var(--accent-indigo);"></i>
          <span>مراجعة شاملة لكافة الإجابات والـ 70 سؤالاً مع الشرح المعياري</span>
        </h3>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${EXAM_DATA.questions
            .map((q, idx) => {
              const userAns = EXAM_STATE.answers[q.id];
              let isCorr = false;
              if (q.type === "verbatim_input") {
                const normUser = (userAns || "").trim().replace(/\s+/g, " ");
                const normTarget = q.targetAnswer.trim().replace(/\s+/g, " ");
                isCorr = normUser === normTarget;
              } else {
                isCorr = userAns === q.correctAnswer;
              }

              return `
              <div style="background: var(--bg-dark-base); border: 1px solid ${isCorr ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}; border-radius: var(--radius-lg); padding: 1.25rem 1.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <div style="font-weight: 900; font-size: 1.05rem; color: var(--text-primary);">
                    سؤال ${idx + 1}: ${q.questionText}
                  </div>
                  <div style="background: ${isCorr ? "#dcfce7" : "#fee2e2"}; color: ${isCorr ? "#15803d" : "#b91c1c"}; padding: 4px 12px; border-radius: 99px; font-weight: 800; font-size: 0.85rem;">
                    ${isCorr ? "إجابة صحيحة" : "إجابة خاطئة"}
                  </div>
                </div>

                <div style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 6px;">
                  <strong>المسموع:</strong> "${q.heardText}"
                </div>

                <div style="font-size: 0.92rem; color: ${isCorr ? "#15803d" : "#b91c1c"}; margin-bottom: 6px;">
                  <strong>إجابتك:</strong> ${formatUserAnswerDisplay(q, userAns)}
                </div>

                ${
                  !isCorr
                    ? `
                  <div style="font-size: 0.92rem; color: #15803d; margin-bottom: 6px;">
                    <strong>الإجابة النموذجية الصحيحة:</strong> ${formatTargetAnswerDisplay(q)}
                  </div>
                `
                    : ""
                }

                <div style="font-size: 0.88rem; color: var(--text-muted); background: var(--bg-card); padding: 10px 14px; border-radius: 8px; margin-top: 8px; border-right: 3px solid var(--accent-indigo);">
                  <strong>الشرح والقاعدة المعيارية:</strong> ${q.explanation}
                </div>
              </div>
            `;
            })
            .join("")}
        </div>

        <div style="margin-top: 2.5rem; text-align: center;">
          <button onclick="restartExam()" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; border: none; padding: 1rem 2.5rem; border-radius: var(--radius-md); font-weight: 900; font-size: 1.1rem; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);">
            <i class="fas fa-redo"></i>
            <span>إعادة محاولة الاختبار من الجديد</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function formatUserAnswerDisplay(q, userAns) {
  if (userAns === undefined || userAns === "")
    return "<i style='color:#94a3b8;'>لم تجب (انتهى الوقت)</i>";
  if (
    q.type === "mcq" ||
    q.type === "tag_picker" ||
    q.type === "error_spotting" ||
    q.type === "situational_tf"
  ) {
    return q.options[userAns] || userAns;
  }
  return userAns;
}

function formatTargetAnswerDisplay(q) {
  if (q.type === "verbatim_input") return q.targetAnswer;
  return q.options[q.correctAnswer];
}

function restartExam() {
  EXAM_STATE.currentStep = "landing";
  EXAM_STATE.currentQuestionIndex = 0;
  EXAM_STATE.answers = {};
  EXAM_STATE.flagged = {};
  renderApp();
}

function attachRunnerEvents() {
  // Key bindings or shortcut hooks if needed
}

function generateFormBoldPayload(score, pass, correct, total) {
  const statusStr = pass ? "ناجح ومؤهل معتمد (Certified)" : "غير مؤهل (Needs Retake)";
  const dateStr = new Date().toLocaleString("ar-EG");

  let payload = `=== تقرير نتيجة اختبار التأهيل المعياري لتفريغ صوتيات MSA ===\n`;
  payload += `حالة التقييم: ${statusStr}\n`;
  payload += `النسبة المئوية: ${score}%\n`;
  payload += `الإجابات الصحيحة: ${correct} من أصل ${total}\n`;
  payload += `تاريخ ووقت الاختبار: ${dateStr}\n\n`;
  payload += `=== تفصيل الأداء بحسب الفئات المعيارية ===\n`;

  if (EXAM_STATE.categoryBreakdown) {
    EXAM_DATA.info.categories.forEach((cat) => {
      const catScore = EXAM_STATE.categoryBreakdown[cat.id] || 0;
      payload += `- ${cat.title}: ${catScore}%\n`;
    });
  }

  return payload;
}
