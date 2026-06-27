const USERS = [
  { id: "admin", password: "2026", role: "admin", name: "관리자" },
  { id: "10101", password: "1234", role: "student", studentId: "10101" },
  { id: "10102", password: "1234", role: "student", studentId: "10102" },
  { id: "10103", password: "1234", role: "student", studentId: "10103" },
];

const STUDENTS = [
  {
    id: "10101",
    name: "김코딩",
    photo: "assets/10101_김코딩.jpg",
    grades: {
      "정보 수행평가": "A",
      "웹앱 프로젝트": "92점",
      "디지털 윤리 퀴즈": "88점",
      "수업 참여도": "상",
    },
    traits: [
      "문제 해결 과정을 차분히 설명합니다.",
      "새 도구를 시도할 때 기록을 꼼꼼히 남깁니다.",
      "제출 전 확인 습관을 더 연습하면 좋습니다.",
    ],
    teacherMemo: "프론트엔드 구조 이해가 빠르며, 팀원 질문에 답하는 태도가 좋습니다.",
  },
  {
    id: "10102",
    name: "박개발",
    photo: "assets/10102_박개발.jpg",
    grades: {
      "정보 수행평가": "B+",
      "웹앱 프로젝트": "86점",
      "디지털 윤리 퀴즈": "91점",
      "수업 참여도": "중상",
    },
    traits: [
      "협업 중 역할 분담을 잘 지킵니다.",
      "UI 수정 아이디어를 자주 제안합니다.",
      "프로젝트 범위를 작게 나누는 연습이 필요합니다.",
    ],
    teacherMemo: "기능 구현 의욕이 높고, 오류가 날 때 원인을 함께 추적하려는 태도가 좋습니다.",
  },
  {
    id: "10103",
    name: "이교사",
    photo: "assets/10103_이교사.jpg",
    grades: {
      "정보 수행평가": "A-",
      "웹앱 프로젝트": "89점",
      "디지털 윤리 퀴즈": "95점",
      "수업 참여도": "상",
    },
    traits: [
      "학습 내용을 자기 언어로 정리합니다.",
      "개선할 지점을 발견하면 근거를 함께 제시합니다.",
      "코드 주석을 더 구체적으로 쓰면 좋습니다.",
    ],
    teacherMemo: "질문의 초점이 좋고, 개선 방향을 토의하는 데 적극적입니다.",
  },
];

const loginForm = document.querySelector("#loginForm");
const userIdInput = document.querySelector("#userId");
const passwordInput = document.querySelector("#password");
const loginMessage = document.querySelector("#loginMessage");
const logoutButton = document.querySelector("#logoutButton");
const loginView = document.querySelector("#loginView");
const studentView = document.querySelector("#studentView");
const adminView = document.querySelector("#adminView");

let currentUser = null;

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = userIdInput.value.trim();
  const password = passwordInput.value;
  const user = USERS.find((item) => item.id === id && item.password === password);

  if (!user) {
    loginMessage.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  currentUser = user;
  loginMessage.textContent = "";
  loginForm.reset();

  if (user.role === "admin") {
    renderAdminDashboard();
  } else {
    const student = STUDENTS.find((item) => item.id === user.studentId);
    renderStudentPage(student);
  }
});

logoutButton.addEventListener("click", () => {
  currentUser = null;
  showOnly(loginView);
  logoutButton.classList.add("hidden");
  userIdInput.focus();
});

function showOnly(targetView) {
  [loginView, studentView, adminView].forEach((view) => view.classList.add("hidden"));
  targetView.classList.remove("hidden");
}

function renderStudentPage(student) {
  if (!student) {
    loginMessage.textContent = "학생 정보를 찾을 수 없습니다.";
    showOnly(loginView);
    return;
  }

  studentView.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <p class="eyebrow">Student</p>
        <h2>${student.name} 학생 페이지</h2>
        <p>로그인한 학생의 학습 현황을 확인합니다.</p>
      </div>
    </div>

    <div class="student-layout">
      <article class="student-profile">
        <img class="student-photo" src="${student.photo}" alt="${student.name} 학생 사진" />
        <div class="profile-body">
          <h3>${student.name}</h3>
          <p class="student-number">학번 ${student.id}</p>
          <div class="tag-row" aria-label="학습 키워드">
            <span class="tag">정보</span>
            <span class="tag">프로젝트</span>
          </div>
        </div>
      </article>

      <div class="content-stack">
        ${renderGrades(student.grades, false, `gradesTitle-${student.id}`)}
        ${renderTraits(student)}
      </div>
    </div>
  `;

  showOnly(studentView);
  logoutButton.classList.remove("hidden");
}

function renderAdminDashboard() {
  adminView.innerHTML = `
    <div class="view-header">
      <div class="view-title">
        <p class="eyebrow">Admin</p>
        <h2>관리자 대시보드</h2>
        <p>학생 3명의 학습 현황을 한 화면에서 비교합니다.</p>
      </div>
    </div>

    <section class="admin-grid" aria-label="전체 학생 정보">
      ${STUDENTS.map(renderStudentCard).join("")}
    </section>

    <section class="intro-panel" style="margin-top: 40px; padding: 28px; min-height: auto;">
      <div class="section-title">
        <h3 style="font-size: 24px; margin-bottom: 10px; display: inline-block;">AI 학생 상담 전략 도우미</h3>
      </div>
      <div id="aiPanelContent">
        <p style="font-weight: bold; color: var(--ink);">상담 전략을 요청할 학생의 카드에서 '상담 전략 요청' 버튼을 클릭하세요.</p>
      </div>
      <p style="font-size: 14px; font-weight: bold; color: var(--danger); margin-top: 20px; border-top: 2px dashed var(--line); padding-top: 15px;">
        AI 상담 전략은 참고용입니다. 최종 판단과 실제 상담은 교사가 학생의 상황을 종합적으로 고려하여 진행해야 합니다.
      </p>
    </section>
  `;

  showOnly(adminView);
  logoutButton.classList.remove("hidden");
}

function renderStudentCard(student) {
  return `
    <article class="student-card">
      <img class="student-photo" src="${student.photo}" alt="${student.name} 학생 사진" />
      <div class="student-card-body">
        <h3>${student.name}</h3>
        <p class="student-number">학번 ${student.id}</p>
        ${renderGrades(student.grades, true, `gradesTitle-${student.id}`)}
        ${renderTraits(student)}
        <button class="primary-button" style="width: 100%; margin-top: 18px;" onclick="selectStudentForCounseling('${student.id}')">상담 전략 요청</button>
      </div>
    </article>
  `;
}

function renderGrades(grades, compact = false, headingId = "gradesTitle") {
  const rows = Object.entries(grades)
    .map(([label, value]) => `<tr><th scope="row">${label}</th><td>${value}</td></tr>`)
    .join("");

  return `
    <section aria-labelledby="${headingId}">
      <div class="section-title">
        <h3 id="${headingId}">성적 정보</h3>
      </div>
      <table class="grade-table ${compact ? "compact-table" : ""}">
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
}

function renderTraits(student) {
  return `
    <section aria-labelledby="traitsTitle-${student.id}">
      <div class="section-title">
        <h3 id="traitsTitle-${student.id}">학습 특성 및 교사 메모</h3>
      </div>
      <ul class="memo-list">
        ${student.traits.map((trait) => `<li>${trait}</li>`).join("")}
        <li>${student.teacherMemo}</li>
      </ul>
    </section>
  `;
}

showOnly(loginView);

// AI 학생 상담 전략 도우미 관련 코드
window.selectStudentForCounseling = function(studentId) {
  const student = STUDENTS.find(s => s.id === studentId);
  if (!student) return;

  const panelContent = document.getElementById("aiPanelContent");
  
  // 익명화된 데이터 준비
  const studentIndex = STUDENTS.findIndex(s => s.id === studentId);
  const studentAlias = "학생 " + String.fromCharCode(65 + studentIndex); // 학생 A, 학생 B...
  
  const gradeSummary = Object.entries(student.grades).map(([k, v]) => `${k}: ${v}`).join(", ");
  const learningTraits = student.traits.join(" ") + " " + student.teacherMemo;

  panelContent.innerHTML = `
    <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px dashed var(--line);">
      <h4 style="margin: 0 0 5px 0; color: var(--primary);">선택된 학생: ${student.name} (학번: ${student.id})</h4>
      <p style="margin: 0; color: var(--danger); font-size: 14px; font-weight: bold;">
        (주의: 이름과 학번은 화면에만 표시되며, AI에는 '${studentAlias}'로 익명화되어 전송됩니다.)
      </p>
    </div>
    
    <label for="teacherConcern" style="font-weight: 900; display: block; margin-bottom: 8px; color: var(--ink);">교사 고민 입력</label>
    <textarea id="teacherConcern" rows="3" style="width: 100%; padding: 12px; border: 4px inset var(--line); border-radius: 0; margin-bottom: 20px; font: inherit; background: #ffffff;" placeholder="예: 수업 참여는 좋은데 평가 결과가 낮습니다. 어떻게 상담하면 좋을까요?"></textarea>
    
    <div style="background: #ffffff; padding: 15px; border: 3px solid var(--line); border-radius: 4px; margin-bottom: 20px; font-family: monospace; font-size: 14px; color: #333;">
      <h5 style="margin: 0 0 10px 0; color: var(--muted);">[전송 데이터 미리보기]</h5>
      <pre style="margin: 0; white-space: pre-wrap; word-break: break-all;" id="previewData"></pre>
    </div>
    
    <button id="getAiStrategyBtn" class="primary-button" style="margin-bottom: 20px;">AI 상담 전략 받기</button>
    
    <div id="aiResultArea" style="border: 5px solid var(--primary); background: #ffffff; padding: 20px; border-radius: 4px; display: none; white-space: pre-wrap; line-height: 1.6; font-weight: bold; color: var(--ink);"></div>
  `;

  const concernInput = document.getElementById("teacherConcern");
  const previewData = document.getElementById("previewData");
  
  const updatePreview = () => {
    const dataToSend = {
      studentAlias: studentAlias,
      gradeSummary: gradeSummary,
      learningTraits: learningTraits,
      teacherConcern: concernInput.value.trim()
    };
    previewData.textContent = JSON.stringify(dataToSend, null, 2);
  };
  
  concernInput.addEventListener("input", updatePreview);
  updatePreview(); // 초기 렌더링 시 미리보기 업데이트

  document.getElementById("getAiStrategyBtn").addEventListener("click", async () => {
    const concern = concernInput.value.trim();
    const resultArea = document.getElementById("aiResultArea");
    
    if (!concern) {
      alert("상담 고민을 먼저 입력해주세요.");
      return;
    }
    
    resultArea.style.display = "block";
    resultArea.textContent = "AI가 상담 전략을 생성하는 중입니다...";
    resultArea.style.color = "var(--ink)";
    
    try {
      const response = await fetch('/api/gemini-counseling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentAlias,
          gradeSummary,
          learningTraits,
          teacherConcern: concern
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        resultArea.textContent = data.result;
        resultArea.style.color = "var(--ink)";
      } else {
        resultArea.textContent = data.error || "AI 상담 전략을 불러오지 못했습니다. API 키 또는 Vercel 환경 변수를 확인해주세요.";
        resultArea.style.color = "var(--danger)";
      }
    } catch (err) {
      console.error(err);
      resultArea.textContent = "AI 상담 전략을 불러오지 못했습니다. API 키 또는 Vercel 환경 변수를 확인해주세요.";
      resultArea.style.color = "var(--danger)";
    }
  });
};
