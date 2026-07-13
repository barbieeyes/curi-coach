import { useState, useRef, useEffect } from "react";

const SECTIONS = [
  {
    id:"q", icon:"🔍", name:"탐구문제", num:"1",
    sub:"궁금한 것을 탐구 질문으로 써봐요",
    placeholder:"여기에 나의 탐구 질문을 써봐",
    howto:"내가 진짜 궁금한 걸 '무엇이 무엇에 어떤 영향을 줄까?' 형태의 질문으로 만들어봐. 바꿀 수 있는 것과 그로 인해 변하는 것이 들어가면 좋아!",
    example:"• 온도가 설탕이 물에 녹는 속도에 미치는 영향은?\n• 종이 두께가 종이비행기의 비행 거리에 어떤 영향을 줄까?\n• 소금 농도가 달걀이 물에 뜨는 정도에 영향을 줄까?",
    guide:"학생이 탐구 문제를 작성했습니다. 탐구 대상이 명확한지, 탐구 가능한 질문 형태인지, 변인이 암시되어 있는지 확인해주세요.",
    checks:["탐구 대상이 명확하다","탐구 가능한 질문 형태다","변인이 암시되어 있다"]
  },
  {
    id:"h", icon:"💡", name:"가설", num:"2",
    sub:'"~하면 ~할 것이다" 형태로 예측해봐요',
    placeholder:"여기에 나의 가설을 써봐",
    howto:"실험하기 전에 결과를 미리 예상해보는 거야. '~가 ~할수록 ~할 것이다' 처럼, 바꾸는 것과 변하는 것을 연결해서 써봐. 왜 그렇게 생각하는지 이유가 있으면 더 좋아!",
    example:"• 물의 온도가 높을수록 설탕이 더 빨리 녹을 것이다.\n• 종이가 두꺼울수록 종이비행기가 더 멀리 날아갈 것이다.",
    guide:"학생이 가설을 작성했습니다. 독립변인/종속변인이 포함됐는지, 측정 가능한 표현인지, 인과관계가 명확한지 확인해주세요.",
    checks:["독립변인과 종속변인이 포함됐다","측정 가능한 표현을 사용했다","탐구 문제와 연결된다"]
  },
  {
    id:"e", icon:"🧪", name:"실험설계", num:"3",
    sub:"어떻게 실험할지 항목별로 써봐요",
    howto:"공정한 실험이 되려면 딱 하나(독립변인)만 바꾸고 나머지는 똑같이(통제변인) 해야 해. 각 항목의 '큐리 힌트 💡'를 눌러보면 뭘 써야 할지 알려줄게!",
    guide:"학생이 실험 설계를 작성했습니다. 통제변인이 명시됐는지, 절차가 재현 가능한지, 반복 횟수가 있는지 확인해주세요.",
    checks:["통제변인이 1개 이상 명시됐다","실험 절차가 순서대로 있다","반복 횟수가 있다"],
    multiField: true,
    fields: [
      { key:"independent", label:"독립변인", subLabel:"내가 바꾸는 것", baseDesc:"내가 직접 바꾸는 조건이야. 원인이 되는 변인이지. 예를 들어 '물의 온도가 녹는 속도에 미치는 영향'을 탐구한다면, 독립변인은 '물의 온도'야 (10℃/40℃/70℃처럼 단계를 정해서!)", placeholder:"실험에서 바꿔볼 조건을 써봐" },
      { key:"dependent", label:"종속변인", subLabel:"측정하는 것", baseDesc:"독립변인을 바꿨을 때 따라서 변하는 결과야. 숫자로 잴 수 있어야 해! 예: 설탕이 완전히 녹는 데 걸린 시간(초), 물체가 이동한 거리(cm)", placeholder:"측정할 값을 써봐 (단위도 함께!)" },
      { key:"controlled", label:"통제변인", subLabel:"똑같이 맞추는 것", baseDesc:"공정한 비교를 위해 모든 실험에서 똑같이 유지해야 하는 조건들이야. 예: 물의 양, 설탕의 양, 젓는 횟수. 이걸 안 맞추면 뭐 때문에 결과가 달라졌는지 알 수 없어!", placeholder:"똑같이 유지할 조건들을 써봐" },
      { key:"procedure", label:"실험 절차", subLabel:"순서대로 적기", baseDesc:"친구가 이 글만 보고도 똑같이 실험할 수 있게 1, 2, 3 순서로 적어봐. '무엇을, 얼마나, 어떻게'가 들어가면 완벽해!", placeholder:"1.\n2.\n3." },
      { key:"repetition", label:"반복 횟수", subLabel:"몇 번 반복?", baseDesc:"한 번만 하면 우연일 수 있어! 같은 조건에서 여러 번(보통 3번 이상) 반복해야 믿을 수 있는 결과가 돼.", placeholder:"각 조건마다 몇 번씩 할지 써봐" }
    ]
  },
  {
    id:"r", icon:"📊", name:"결과", num:"4",
    sub:"실험 결과를 수치로 기록해봐요",
    howto:"측정한 값을 표에 숫자로 적으면 아래에 그래프가 자동으로 그려져. 그다음 그래프를 보고 알 수 있는 걸 '결과 해석' 칸에 써봐. 예상과 달랐던 점도 좋아!",
    example:"[표 입력]\n10℃ → 95초 / 40℃ → 48초 / 70℃ → 22초\n\n[결과 해석]\n물 온도가 높아질수록 녹는 시간이 짧아졌다. 특히 40℃에서 70℃로 갈 때 가장 크게 줄었다.",
    guide:"학생이 실험 결과를 작성했습니다. 수치 데이터가 포함됐는지, 가설과 비교했는지, 이상값을 언급했는지 확인해주세요.",
    checks:["수치 데이터가 포함됐다","가설과 비교했다","이상값이나 예외를 언급했다"]
  },
  {
    id:"c", icon:"🏆", name:"결론", num:"5",
    sub:"가설이 맞았는지 항목별로 정리해봐요",
    howto:"결과를 바탕으로 처음 세운 가설이 맞았는지 판단해봐. 각 항목의 '큐리 힌트 💡'를 누르면 뭘 써야 할지 알려줄게. 솔직하게 한계나 아쉬운 점을 적는 것도 훌륭한 과학이야!",
    guide:"학생이 결론을 작성했습니다. 가설 지지/기각을 명시했는지, 결과에서 논리적으로 도출됐는지, 오차 원인을 분석했는지 확인해주세요.",
    checks:["가설 지지/기각이 명시됐다","결과에서 결론이 논리적으로 도출됐다","오차 원인이나 한계를 언급했다"],
    multiField: true,
    fields: [
      { key:"support", label:"가설 판정", subLabel:"맞았어? 틀렸어?", baseDesc:"실험 결과가 처음 예상(가설)과 맞았으면 '지지', 달랐으면 '기각'이라고 해. 가설이 틀려도 실패가 아니야 — 새로운 걸 알게 된 거니까 그것도 훌륭한 과학이야!", placeholder:"가설이 맞았는지, 그 근거는 뭔지 써봐" },
      { key:"finding", label:"알게 된 것", subLabel:"결과가 말해주는 것", baseDesc:"숫자 결과가 의미하는 과학적 사실을 설명해봐. '왜 그런 결과가 나왔을까?'를 과학 개념으로 연결하면 최고!", placeholder:"실험으로 알게 된 사실을 써봐" },
      { key:"limitation", label:"오차 원인 · 한계", subLabel:"아쉬웠던 점", baseDesc:"완벽한 실험은 없어! 결과에 영향을 줬을 수 있는 요인이나 어려웠던 점을 솔직하게 적어봐. 이걸 찾는 게 진짜 과학자의 자세야.", placeholder:"실험에서 아쉽거나 어려웠던 점을 써봐" },
      { key:"further", label:"다음 탐구", subLabel:"더 궁금해진 것", baseDesc:"이 실험을 하고 나니 더 알아보고 싶어진 게 있어? 좋은 탐구는 항상 새로운 질문을 낳는 법!", placeholder:"더 탐구해보고 싶은 것을 써봐" }
    ]
  }
];

// ── 디자인 토큰 ──
const C = {
  primary:"#6D5BD0", primaryDark:"#5847B8", primarySoft:"#F1EEFC",
  accent:"#2BA89A", accentSoft:"#E7F7F4",
  warn:"#E08A2E", warnSoft:"#FDF3E7",
  good:"#3FA66B", goodSoft:"#EBF8F0",
  coral:"#E0654E", coralSoft:"#FDEEEA",
  ink:"#22243A", inkSoft:"#6B6E8A", inkFaint:"#A8ABC4",
  bg:"#F7F7FB", surface:"#FFFFFF", line:"#E9E9F2", lineSoft:"#F1F1F8"
};

// ▼ 단계별 고유 색 (스티커 느낌)
const SEC_TONE = {
  q:{main:"#7C6FE0",soft:"#F0EDFF"},
  h:{main:"#E8912D",soft:"#FDF3E3"},
  e:{main:"#2BA89A",soft:"#E4F6F3"},
  r:{main:"#4E9AE0",soft:"#EAF3FC"},
  c:{main:"#E0654E",soft:"#FDEEEA"}
};

// ▼ 자동 저장 (새로고침해도 작성 내용 유지)
const SAVE_KEY = "curi-save-v1";
function loadSaved() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
const SAVED = loadSaved();

// ▼ 구글 시트 제출 주소 — Apps Script 배포 후 나온 URL로 교체하세요
const SUBMIT_URL = "https://script.google.com/macros/s/AKfycbx_m6Z4b1p1VG1l1Ekxrehipf1N9aYXHIm-xEvXMVngNhnE56XhNaAebs3W5e6N1PIOKw/exec";

async function callCuri(prompt) {
  const res = await fetch("/api/curi", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ prompt })
  });
  if(!res.ok) {
    const errBody = await res.text().catch(()=>"");
    throw new Error(`HTTP ${res.status} ${errBody.slice(0,100)}`);
  }
  const data = await res.json();
  return data.text;
}

async function getFeedback(sec, text, attempt, prevInputs) {
  const is2nd = attempt >= 2;
  const context = prevInputs.q
    ? `\n[이전 단계]\n탐구문제: "${prevInputs.q}"${prevInputs.h?`\n가설: "${prevInputs.h}"`:""}` : "";

  const checkList = (sec.checks||[]).map((k,i)=>`${i+1}. ${k}`).join("\n");
  const prompt = `너는 과학 탐구 코치 "큐리(Curi)"야. 마리 퀴리처럼 과학적이고 탐구적이지만 중학생한테 친근한 반말로 말해. 너의 피드백은 교사의 연구 자료로도 쓰이니, 격려하는 말투를 유지하되 내용은 과학적으로 깊이 있고 구체적이어야 해.

[절대 규칙]
- 정답을 직접 대신 써주지 마. 질문으로 학생이 스스로 생각하게 유도해.
- "틀렸다"는 표현 금지. 대신 "이렇게 보면 어떨까?"처럼.
- 친근한 반말, 과학 용어는 쉽게 풀어서.
${is2nd ? "- 지금은 2차 이상 피드백이야. 1차보다 더 세밀하게, 과학적 표현의 정확성과 논리적 완결성에 집중해." : "- 지금은 1차 피드백이야. 가장 중요한 핵심을 먼저 짚어줘."}

[섹션 안내] ${sec.guide}${context}

[학생이 작성한 내용]
"${text}"

[이 단계의 체크 항목]
${checkList}

[피드백 작성 지침 — 논문 자료급으로 충실하게]
- greeting: 학생 작성 내용을 실제로 언급하며 구체적으로 격려해 (2-3문장). 두루뭉술한 칭찬 금지, 뭘 잘했는지 콕 집어서.
- good: 이 작성에서 과학적으로 의미 있는 점을 근거와 함께 짚어줘 (변인 설정, 측정 가능성, 논리 전개 등 어떤 과학적 요소가 좋았는지).
- question: (good이 아닐 때) 학생이 다음 단계로 사고를 확장하도록 이끄는 핵심 질문. 관련 과학 개념으로 자연스럽게 연결되게. 막막해하지 않도록 구체적인 방향을 담아.
- hint: 질문만으로 막힐 경우를 위한 힌트. 답은 주지 말되, 생각의 실마리(예시 방향, 고려할 요소)를 제시.
- deepDive: 이 학생이 한 단계 더 깊이 탐구하면 좋을 지점을 1가지 (과학적 사고를 심화하는 발전 질문). 격려하는 톤으로.

[판정 방법]
1. 체크 항목 각각을 충족했으면 true, 아니면 false (checks 배열).
2. 중학생을 격려하는 코치니까, 조금이라도 시도한 항목은 관대하게 true로.
3. verdict: 충족 항목이 하나라도 있으면 "good"(격려하며 통과), 없으면 "revise", 아깝게 하나 빠지면 "think".
4. verdict가 "good"이어도 deepDive에는 항상 발전 질문을 담아 (통과해도 더 깊이 갈 여지를 주기 위해).

순수 JSON만 응답:
{"greeting":"구체적 격려 2-3문장","checks":[${(sec.checks||[]).map(()=>"true").join(",")}],"verdict":"good|think|revise","good":"과학적으로 잘한 점(근거 포함)","question":"사고 확장 핵심 질문(good이면 빈칸)","hint":"생각의 실마리","deepDive":"한 단계 더 깊이 갈 발전 질문"}`;

  const raw = await callCuri(prompt);
  const match = raw.match(/\{[\s\S]*\}/);
  const nChecks = (sec.checks||[]).length;
  const SAFE = {greeting:"좋아, 잘 하고 있어! 큐리가 한 가지만 물어볼게 🧪",checks:Array(nChecks).fill(true),verdict:"good",good:"스스로 끝까지 써낸 점이 멋져!",question:"",hint:"",deepDive:""};
  const finalize = (obj) => {
    const r = { ...SAFE, ...obj };
    // 체크 개수 → 등급 자동 산정
    const passed = Array.isArray(r.checks) ? r.checks.filter(Boolean).length : nChecks;
    r.passedCount = passed;
    r.totalChecks = nChecks;
    r.grade = passed >= nChecks ? "Excellent" : passed >= Math.ceil(nChecks*0.5) ? "Great" : passed>=1 ? "Good" : "Good";
    r.checkItems = (sec.checks||[]).map((label,i)=>({label, ok: Array.isArray(r.checks)? !!r.checks[i] : true}));
    return r;
  };
  if(!match) return finalize({});
  try {
    return finalize(JSON.parse(match[0]));
  } catch(e){
    try { return finalize(JSON.parse(match[0].replace(/,\s*([}\]])/g,"$1"))); }
    catch(e2){ return finalize({}); }
  }
}

async function askQna(question, context) {
  const prompt = `너는 과학 탐구 코치 "큐리(Curi)"야. 마리 퀴리처럼 과학적이지만 중학생한테 친근하게 말해.

학생이 탐구 보고서를 쓰다가 궁금한 걸 물어봤어.
${context ? `[현재 탐구 맥락]\n${context}\n` : ""}

[학생 질문]
"${question}"

규칙:
- 직접 답을 주되, 추가로 생각해볼 질문도 하나 던져줘
- 친근한 반말, 과학 용어는 쉽게 설명
- 3~5문장으로 간결하게
- 이모지 1~2개 활용`;

  return await callCuri(prompt);
}

function safeParse(raw, fallback){
  let match = raw.match(/\{[\s\S]*\}/);
  if(!match){ const o=raw.indexOf("{"); if(o===-1) return fallback; match=[raw.slice(o)]; }
  try { return { ...fallback, ...JSON.parse(match[0].trim()) }; }
  catch(e){
    try { return { ...fallback, ...JSON.parse(match[0].trim().replace(/,\s*([}\]])/g,"$1")) }; }
    catch(e2){ return fallback; }
  }
}

async function getFinalReport(allData, onProgress) {
  const cut = (s, n) => (s || "").replace(/\s+/g, " ").trim().slice(0, n);
  const sectionText = SECTIONS.map(s => {
    const fbs = (allData.fbs[s.id] || []).slice(0, 8);
    const inputs = allData.inputHistory[s.id] || [];
    if (inputs.length === 0 && fbs.length === 0) return `[${s.name}] 작성 기록 없음`;
    const first = cut(inputs[0], 200);
    const last = inputs.length > 1 ? cut(inputs[inputs.length-1], 200) : "";
    const chain = fbs.map((f, i) =>
      `  ${i+1}차: 학생="${cut(inputs[i], 140) || "(비어있음)"}" → 큐리질문="${cut(f.question || f.good, 110) || "(없음)"}"`
    ).join("\n");
    let block = `[${s.name}] 총 ${Math.max(inputs.length, fbs.length)}회 시도`;
    block += `\n  ▶ 첫 작성: "${first || "(없음)"}"`;
    if(last) block += `\n  ▶ 최종 작성: "${last}"`;
    if(chain) block += `\n  [회차별 상세]\n${chain}`;
    return block;
  }).join("\n\n");

  // ── 1차 호출: 단계별 회차 변화 추적 (오류→수정→성장) ──
  onProgress && onProgress("회차별 작성 변화를 추적하고 있어요");
  const p1 = `너는 과학 탐구 코치이자 교육 연구자 "큐리"야. 학생의 회차별 작성 변화를 추적해서, 이 학생이 각 단계에서 어떻게 사고와 표현을 발전시켰는지 분석해. 이건 교사의 연구 자료로 쓰여.

${sectionText}

[분석 지침]
- 각 단계에서 '1차 작성'과 '마지막 작성'을 실제로 비교해. 표현이 어떻게 구체적·정확·논리적으로 변했는지 실제 문구를 근거로 짚어.
- 학생이 짧게 썼더라도, 그 안에서 일어난 미묘한 변화(단어 선택, 논리 추가, 변인 명시 등)를 포착해.
- 변화가 있었던 단계만 골라. 억지로 지어내지 마.

순수 JSON만: {"journeyDetail":[{"stage":"단계명","mistake":"1차 작성에서 부족했던 점(실제 문구 근거)","curiQuestion":"큐리가 던진 핵심 질문","revision":"학생이 실제로 어떻게 고쳤는지(1차→최종 문구 변화를 구체적으로)","growth":"이 변화에서 드러난 과학적 사고·표현의 성장"}]}
* 1~5개 단계. mistake·revision은 반드시 실제 작성 문구에 근거해서.`;
  const r1 = safeParse(await callCuri(p1), { journeyDetail: [] });

  // ── 2차 호출: 종합 총평·의사소통 성장 (짧게) ──
  onProgress && onProgress("과학적 의사소통 능력을 깊이 살펴보고 있어요");
  const chatLog = (allData.chatMsgs || []).filter(m=>m.role==="user"||m.role==="assistant").slice(-16)
    .map(m => `${m.role==="user"?"학생":"큐리"}: ${cut(m.text,120)}`).join("\n") || "(챗봇 대화 없음)";
  const p2 = `너는 과학 탐구 코치 "큐리"야. 학생의 전체 탐구 과정을 보고 교사용 총평을 써. 특히 **과학적 의사소통 능력**과 **AI와의 상호작용**을 가장 중점적으로, 깊이 있게 분석해.

${sectionText}

[학생이 챗봇 큐리와 나눈 대화]
${chatLog}

[소통 지표] 챗봇 질문 ${allData.chatQuestionCount}회 · 총 수정 ${allData.totalAttempts}회

[과학적 의사소통 능력이란]
- 자기 생각을 과학적 용어와 논리로 정확하게 표현하는 능력
- 큐리의 질문·피드백을 이해하고 자기 글에 반영해 수정하는 능력
- 근거를 들어 주장하고, 변인·인과관계를 명확한 언어로 설명하는 능력
- 회차를 거치며 표현이 얼마나 구체적·정확·논리적으로 발전했는지

이 부분을 회차별 작성 내용의 '실제 표현 변화'를 근거로 구체적으로 분석해. 초기엔 어떻게 썼고 최종엔 어떻게 바뀌었는지 실제 표현을 인용하듯 짚어줘.

순수 JSON만: {
"overallSummary":"전체 과정 2-3문장 총평, 따뜻하고 구체적으로",
"strengths":["강점1(근거)","강점2"],
"communicationGrowth":"과학적 의사소통 능력의 전반적 향상을 3-4문장으로. 초기 표현 → 최종 표현의 실제 변화를 근거로 구체적으로",
"commDetail":[{"aspect":"표현의 정확성","evidence":"어느 단계에서 '이런 표현'이 '이런 표현'으로 어떻게 정확해졌는지, 실제 학생 문구를 인용해서"},{"aspect":"피드백 반영력","evidence":"큐리의 어떤 질문을 받고 학생이 자기 글을 실제로 어떻게 고쳤는지, 변화 전후를 짚어서"},{"aspect":"논리적 설명력","evidence":"근거를 들어 설명하거나 인과관계·변인관계를 표현한 부분이 회차를 거치며 어떻게 발전했는지"}],
"commLevel":"이 학생의 과학적 의사소통 능력 수준을 '무럭무럭 자라는 중/한 뼘 성장/큰 도약' 중 하나로 격려하듯",
"aiInteraction":{"amount":"이 학생이 AI와 얼마나 소통했는지 한 줄 (질문·수정 횟수 근거로, 예: '적극적으로 여러 번 도움을 요청함')","naturalness":"AI에게 얼마나 자연스럽게 도움을 요청했는지, 어떤 식으로 질문했는지 1-2문장","difficulty":"주로 어느 단계·어떤 부분에서 어려움을 겪고 도움을 받았는지 1-2문장","improvement":"AI 도움을 받아 실제로 어떻게 개선됐는지 1-2문장","effect":"AI 코칭이 이 학생에게 어떤 교육적 효과가 있었는지 1-2문장"},
"improvements":["회차 거치며 개선된 점1","개선점2"],
"curiosityLevel":"상|중|하",
"scientificThinkingNote":"과학적 사고(변인통제·측정가능성·논리적 결론) 1-2문장",
"suggestionForTeacher":"지도 참고 코멘트 1-2문장. 의사소통 능력을 더 키워주려면 어떤 점을 지도하면 좋을지 포함"}`;
  const SAFE2 = {
    overallSummary: "탐구 과정을 끝까지 잘 완성했어요.",
    strengths: [], communicationGrowth: "", commDetail: [], commLevel: "",
    aiInteraction: null,
    improvements: [], curiosityLevel: "-", scientificThinkingNote: "", suggestionForTeacher: ""
  };
  const r2 = safeParse(await callCuri(p2), SAFE2);

  return { ...r2, journeyDetail: r1.journeyDetail || [] };
}

function Spinner({ color }) {
  return (
    <span style={{display:"inline-flex",gap:3}}>
      {[0,0.15,0.3].map((d,i)=>(
        <span key={i} style={{width:5,height:5,borderRadius:"50%",background:color||C.primary,display:"inline-block",animation:`bounce 1s ${d}s infinite ease-in-out`}}/>
      ))}
    </span>
  );
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) {
      reject(new Error("이미지 파일이 아니에요"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("파일을 읽을 수 없어요"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("이미지를 열 수 없어요"));
      img.onload = () => {
        try {
          const MAX = 900;
          let w = img.width, h = img.height;
          if (w > MAX || h > MAX) {
            if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
            else { w = Math.round(w * MAX / h); h = MAX; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          canvas.getContext("2d").drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.78));
        } catch (err) {
          reject(new Error("이미지 처리 중 문제가 생겼어요"));
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function LineChart({ data }) {
  const pts = data.rows
    .map(r => ({ x: r.x, y: parseFloat(r.y) }))
    .filter(p => p.x && !isNaN(p.y));

  if (pts.length < 2) {
    return (
      <div style={{textAlign:"center",padding:"30px 12px",color:C.inkFaint,fontSize:13.5,lineHeight:1.6}}>
        숫자를 2개 이상 입력하면<br/>그래프가 자동으로 그려져요 📈
      </div>
    );
  }

  const W = 300, H = 180, padL = 38, padR = 14, padT = 16, padB = 34;
  const ys = pts.map(p => p.y);
  let minY = Math.min(...ys), maxY = Math.max(...ys);
  if (minY === maxY) { minY -= 1; maxY += 1; }
  const range = maxY - minY;
  minY -= range * 0.1; maxY += range * 0.1;

  const plotW = W - padL - padR, plotH = H - padT - padB;
  const xPos = i => padL + (pts.length===1 ? plotW/2 : (i/(pts.length-1))*plotW);
  const yPos = v => padT + plotH - ((v-minY)/(maxY-minY))*plotH;

  const linePath = pts.map((p,i)=>`${i===0?"M":"L"}${xPos(i)},${yPos(p.y)}`).join(" ");
  const gridY = [0,0.25,0.5,0.75,1].map(t => minY + t*(maxY-minY));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:"auto",display:"block"}}>
      {gridY.map((gv,i)=>(
        <g key={i}>
          <line x1={padL} y1={yPos(gv)} x2={W-padR} y2={yPos(gv)} stroke={C.lineSoft} strokeWidth="1"/>
          <text x={padL-6} y={yPos(gv)+3} textAnchor="end" fontSize="9" fill={C.inkFaint}>
            {Math.round(gv*10)/10}
          </text>
        </g>
      ))}
      <path d={linePath} fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      {pts.map((p,i)=>(
        <g key={i}>
          <circle cx={xPos(i)} cy={yPos(p.y)} r="4" fill="white" stroke={C.primary} strokeWidth="2.5"/>
          <text x={xPos(i)} y={H-padB+16} textAnchor="middle" fontSize="9" fill={C.inkSoft}>{p.x.length>5?p.x.slice(0,5)+"…":p.x}</text>
          <text x={xPos(i)} y={yPos(p.y)-9} textAnchor="middle" fontSize="9" fontWeight="700" fill={C.primary}>{p.y}</text>
        </g>
      ))}
      <text x={W/2} y={H-4} textAnchor="middle" fontSize="9.5" fill={C.inkSoft} fontWeight="600">{(data.xLabel||"가로축")}{data.xUnit?` (${data.xUnit})`:""}</text>
      <text x={10} y={H/2} textAnchor="middle" fontSize="9.5" fill={C.inkSoft} fontWeight="600" transform={`rotate(-90 10 ${H/2})`}>{(data.yLabel||"세로축")}{data.yUnit?` (${data.yUnit})`:""}</text>
    </svg>
  );
}

function flattenInput(sec, value) {
  if (!sec.multiField) return (value || "").trim();
  return sec.fields
    .filter(f => value?.[f.key]?.trim())
    .map(f => `${f.label}: ${value[f.key].trim()}`)
    .join("\n");
}

function isInputEmpty(sec, value) {
  if (!sec.multiField) return !(value||"").trim();
  return !sec.fields.some(f => value?.[f.key]?.trim());
}

async function getFieldExample(sec, field, contextText) {
  const prompt = `너는 중학생 과학 탐구 코치 큐리야. 학생의 탐구 맥락에 맞는 "${field.label}" 예시를 만들어줘.

[탐구 맥락]
${contextText || "아직 구체적인 맥락 정보가 없음 (일반적인 과학 탐구로 가정)"}

[항목 설명]
${field.baseDesc}

위 맥락에 어울리는 구체적인 예시를 1개 만들어줘. 너무 길지 않게, 학생이 바로 참고해서 쓸 수 있는 수준으로.

순수 텍스트로만 응답해 (JSON 아님, 설명 없이 예시 문장만):`;

  return await callCuri(prompt);
}


function Onboarding({ student, setStudent, onStart }) {
  const [msgs, setMsgs] = useState([]);      // {who:"curi"|"me", text}
  const [phase, setPhase] = useState("intro"); // intro→mode→grade→cls→num→name→members→done
  const [inputVal, setInputVal] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  const floaties = ["🧪","⚗️","🔬","🌡️","🧬","💡","📊","🪐","✨","🔭","⚡","🌟"];

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,typing,phase]);

  // 큐리가 말하는 함수 (타이핑 효과)
  function curiSay(texts, nextPhase){
    setTyping(true);
    let delay = 500;
    texts.forEach((t,i)=>{
      setTimeout(()=>{
        setMsgs(p=>[...p,{who:"curi",text:t}]);
        if(i===texts.length-1){ setTyping(false); if(nextPhase) setPhase(nextPhase); }
      }, delay + i*850);
    });
  }

  // 첫 인사 (중복 실행 방지 가드 포함)
  const greetedRef = useRef(false);
  useEffect(()=>{
    if(greetedRef.current) return;
    greetedRef.current = true;
    curiSay([
      "안녕! 나는 과학 탐구 코치 큐리(Curi)야 🧪",
      "내 이름은 Curiosity, '호기심'에서 왔어! 과학은 호기심에서 시작되거든 ✨",
      "정답을 알려주는 게 아니라, 대화하면서 너의 탐구를 도와줄 거야!",
      "먼저 물어볼게 — 이번 탐구, 혼자 하는 거야? 팀으로 하는 거야?"
    ], "mode");
  },[]);

  function pickMode(m){
    setMsgs(p=>[...p,{who:"me",text:m==="solo"?"혼자 할래!":"팀이야!"}]);
    setStudent(p=>({...p,mode:m}));
    curiSay(m==="solo"
      ? ["좋아, 나랑 둘이 하는 탐구구나! 😎","몇 학년이야?"]
      : ["오~ 팀 탐구! 다같이 하면 더 재밌지 🙌","너희는 몇 학년이야?"],
      "grade");
  }

  function submitText(){
    const v = inputVal.trim();
    if(!v) return;
    setInputVal("");
    setMsgs(p=>[...p,{who:"me",text:v}]);

    if(phase==="grade"){
      setStudent(p=>({...p,grade:v}));
      curiSay([`${v}학년이구나! 몇 반이야?`],"cls");
    } else if(phase==="cls"){
      setStudent(p=>({...p,cls:v}));
      if(student.mode==="solo"){
        curiSay(["번호는 몇 번이야?"],"num");
      } else {
        curiSay(["팀원들 이름을 알려줘! 한 명씩 입력하고 '추가'를 눌러줘 😊"],"members");
      }
    } else if(phase==="num"){
      setStudent(p=>({...p,num:v}));
      curiSay(["마지막! 이름이 뭐야?"],"name");
    } else if(phase==="name"){
      setStudent(p=>({...p,name:v}));
      curiSay([`${v}(이)라고 하는구나! 만나서 반가워 🤗`,"그럼, 우리 같이 멋진 탐구 시작해볼까?"],"done");
    } else if(phase==="members"){
      const newList = [...memberList, v];
      setMemberList(newList);
      setStudent(p=>({...p,members:newList,name:newList.join(", ")}));
      curiSay([`${v} 추가! 또 있어? 없으면 '다 입력했어'를 눌러줘`],"members");
    }
  }

  function finishMembers(){
    if(memberList.length===0) return;
    setMsgs(p=>[...p,{who:"me",text:"다 입력했어!"}]);
    curiSay([`${memberList.join(", ")} — 멋진 팀이네! 🙌`,"그럼, 우리 같이 멋진 탐구 시작해볼까?"],"done");
  }

  const showInput = ["grade","cls","num","name","members"].includes(phase) && !typing;
  const inputPlaceholder =
    phase==="grade" ? "학년 (숫자)" :
    phase==="cls" ? "반 (숫자)" :
    phase==="num" ? "번호 (숫자)" :
    phase==="name" ? "이름" :
    phase==="members" ? "팀원 이름" : "";

  return (
    <div style={{fontFamily:"'Jua','Pretendard',-apple-system,sans-serif",background:"linear-gradient(170deg,#5B4BC4 0%,#6D5BD0 30%,#3E9E96 75%,#2BA89A 100%)",minHeight:"100vh",maxWidth:480,margin:"0 auto",display:"flex",flexDirection:"column",boxSizing:"border-box",position:"relative",overflow:"hidden"}}>

      {/* 구글 폰트 로드 */}
      <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet"/>

      {/* 떠다니는 이모지 */}
      {floaties.map((f,i)=>(
        <div key={i} style={{position:"absolute",left:`${(i*8.3+4)%92}%`,bottom:"-40px",fontSize:16+(i%3)*8,opacity:0.4,animation:`floatUp ${7+(i%5)*2}s ${i*0.9}s linear infinite`,pointerEvents:"none",zIndex:0}}>{f}</div>
      ))}

      {/* 헤더 */}
      <div style={{textAlign:"center",padding:"26px 20px 12px",position:"relative",zIndex:1}}>
        <div style={{position:"relative",display:"inline-block",marginBottom:10}}>
          <div style={{position:"absolute",inset:-12,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.35)",animation:"ringPulse 2.2s ease-out infinite"}}/>
          <div style={{width:68,height:68,borderRadius:"50%",background:"rgba(255,255,255,0.95)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,boxShadow:"0 6px 24px rgba(0,0,0,0.25)",animation:"bobble 3s ease-in-out infinite"}}>🧪</div>
          <div style={{position:"absolute",bottom:0,right:-2,width:18,height:18,borderRadius:"50%",background:"#3FE07F",border:"3px solid white"}}/>
        </div>
        <div style={{color:"white",fontSize:13,fontWeight:400,letterSpacing:"0.08em",opacity:0.85}}>SONGRYE SCIENCE AI</div>
        <div style={{color:"white",fontSize:24,marginTop:2,textShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>큐리와 함께하는 탐구보고서 ✨</div>
      </div>

      {/* 채팅 영역 */}
      <div style={{flex:1,overflowY:"auto",padding:"10px 18px 16px",position:"relative",zIndex:1}}>
        {msgs.map((m,i)=>{
          const isCuri = m.who==="curi";
          return (
            <div key={i} style={{display:"flex",flexDirection:isCuri?"row":"row-reverse",gap:8,marginBottom:10,alignItems:"flex-end",animation:"bubbleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both"}}>
              {isCuri && <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.95)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15.5,flexShrink:0}}>🧪</div>}
              <div style={{
                maxWidth:"76%",
                background: isCuri ? "rgba(255,255,255,0.97)" : "rgba(34,36,58,0.85)",
                color: isCuri ? "#2A2C44" : "white",
                borderRadius: isCuri ? "4px 18px 18px 18px" : "18px 18px 4px 18px",
                padding:"11px 15px",fontSize:16.5,lineHeight:1.6,
                boxShadow:"0 4px 14px rgba(0,0,0,0.15)"
              }}>{m.text}</div>
            </div>
          );
        })}

        {typing && (
          <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:10}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.95)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15.5}}>🧪</div>
            <div style={{background:"rgba(255,255,255,0.97)",borderRadius:"4px 18px 18px 18px",padding:"13px 16px",display:"flex",gap:4}}>
              {[0,0.15,0.3].map((d,i)=>(<span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#6D5BD0",animation:`bounce 1s ${d}s infinite ease-in-out`,display:"inline-block"}}/>))}
            </div>
          </div>
        )}

        {/* 모드 선택 버튼 */}
        {phase==="mode" && !typing && (
          <div style={{display:"flex",gap:10,marginTop:6,animation:"bubbleIn 0.4s both"}}>
            <button onClick={()=>pickMode("solo")} style={{flex:1,padding:"14px 10px",borderRadius:16,border:"none",background:"rgba(255,255,255,0.97)",color:"#6D5BD0",fontSize:16.5,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.15)"}}>
              🙋 혼자 할래!
            </button>
            <button onClick={()=>pickMode("team")} style={{flex:1,padding:"14px 10px",borderRadius:16,border:"none",background:"rgba(255,255,255,0.97)",color:"#2BA89A",fontSize:16.5,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.15)"}}>
              👫 팀이야!
            </button>
          </div>
        )}

        {/* 팀원 다 입력했어 버튼 */}
        {phase==="members" && !typing && memberList.length>0 && (
          <div style={{marginTop:6,animation:"bubbleIn 0.4s both"}}>
            <button onClick={finishMembers} style={{width:"100%",padding:"13px",borderRadius:16,border:"none",background:"rgba(255,255,255,0.97)",color:"#2BA89A",fontSize:16,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,0.15)"}}>
              ✅ 다 입력했어! ({memberList.length}명)
            </button>
          </div>
        )}

        {/* START 버튼 */}
        {phase==="done" && !typing && (
          <div style={{marginTop:10,animation:"bubbleIn 0.5s 0.2s both"}}>
            <button onClick={onStart} style={{width:"100%",padding:17,borderRadius:18,border:"none",background:"linear-gradient(135deg,#6D5BD0,#2BA89A)",backgroundSize:"200% 100%",color:"white",fontSize:18.5,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 8px 28px rgba(0,0,0,0.3)",animation:"shimmer 2.5s linear infinite"}}>
              큐리와 함께 START! 🚀
            </button>
          </div>
        )}

        <div ref={endRef}/>
      </div>

      {/* 입력창 */}
      {showInput && (
        <div style={{padding:"10px 16px 18px",display:"flex",gap:8,position:"relative",zIndex:1}}>
          <input
            value={inputVal}
            onChange={e=>setInputVal(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();submitText();}}}
            placeholder={inputPlaceholder}
            inputMode={["grade","cls","num"].includes(phase)?"numeric":"text"}
            autoFocus
            style={{flex:1,border:"none",borderRadius:99,padding:"13px 18px",fontSize:16.5,fontFamily:"inherit",outline:"none",color:"#2A2C44",boxShadow:"0 4px 16px rgba(0,0,0,0.2)",boxSizing:"border-box"}}
          />
          <button onClick={submitText} disabled={!inputVal.trim()} style={{
            width:48,height:48,borderRadius:"50%",border:"none",
            background:inputVal.trim()?"rgba(255,255,255,0.97)":"rgba(255,255,255,0.4)",
            color:"#6D5BD0",fontSize:21,cursor:inputVal.trim()?"pointer":"default",flexShrink:0,
            boxShadow:"0 4px 14px rgba(0,0,0,0.2)",fontFamily:"inherit"
          }}>
            {phase==="members"?"➕":"↑"}
          </button>
        </div>
      )}

      <style>{`
        *{box-sizing:border-box;}
        input::placeholder{color:#B8BDD4;}
        @keyframes floatUp{0%{transform:translateY(0) rotate(0deg);opacity:0}8%{opacity:0.4}92%{opacity:0.4}100%{transform:translateY(-108vh) rotate(30deg);opacity:0}}
        @keyframes ringPulse{0%{transform:scale(0.85);opacity:0.8}100%{transform:scale(1.25);opacity:0}}
        @keyframes bobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes bubbleIn{0%{transform:translateY(12px) scale(0.94);opacity:0}100%{transform:translateY(0) scale(1);opacity:1}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-4px);opacity:1}}
        @keyframes sheetUp{0%{transform:translateY(100%)}100%{transform:translateY(0)}}
        @keyframes popCard{0%{transform:translateY(10px) scale(0.96);opacity:0}100%{transform:translateY(0) scale(1);opacity:1}}
        @keyframes shimmer{0%{background-position:0% 0}100%{background-position:200% 0}}
        @media (prefers-reduced-motion: reduce){*{animation:none !important;}}
      `}</style>
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(SAVED?.started ?? false);
  const [student, setStudent] = useState(SAVED?.student ?? { mode:"", grade:"", cls:"", num:"", name:"", members:[] });
  const [photos, setPhotos] = useState(SAVED?.photos ?? []); // {id, dataUrl, caption}
  const [simLinks, setSimLinks] = useState(SAVED?.simLinks ?? []); // {id, url, desc}
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDesc, setLinkDesc] = useState("");
  const [tableData, setTableData] = useState(SAVED?.tableData ?? {
    xLabel: "",
    yLabel: "",
    xUnit: "",
    yUnit: "",
    qualitative: "",
    rows: [
      { x: "", y: "" },
      { x: "", y: "" },
      { x: "", y: "" }
    ]
  });
  const [view, setView] = useState("report");
  const [chatOpen, setChatOpen] = useState(false);
  const [idx, setIdx] = useState(SAVED?.idx ?? 0);
  const [inputs, setInputs] = useState(SAVED?.inputs ?? {q:"",h:"",e:{},r:"",c:{}});
  const [fieldExamples, setFieldExamples] = useState({}); // {sectionId-fieldKey: "예시문구"}
  const [loadingExample, setLoadingExample] = useState({}); // {sectionId-fieldKey: true}
  const [openFieldHelp, setOpenFieldHelp] = useState({});
  const [openGuide, setOpenGuide] = useState({});
  const [inputHistory, setInputHistory] = useState(SAVED?.inputHistory ?? {q:[],h:[],e:[],r:[],c:[]});
  const [done, setDone] = useState(SAVED?.done ?? {q:false,h:false,e:false,r:false,c:false});
  const [attempts, setAttempts] = useState(SAVED?.attempts ?? {q:0,h:0,e:0,r:0,c:0});
  const [fbs, setFbs] = useState(SAVED?.fbs ?? {q:[],h:[],e:[],r:[],c:[]});
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState({});
  const [toast, setToast] = useState("");

  const [chatMsgs, setChatMsgs] = useState(SAVED?.chatMsgs ?? [
    {role:"curi", text:"안녕! 나는 큐리야 🧪\n탐구하다가 모르는 거 있으면 뭐든 물어봐.\n어떤 주제든, 실험 방법이든 다 괜찮아!"}
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatQCount, setChatQCount] = useState(SAVED?.chatQCount ?? 0);
  const chatEndRef = useRef(null);
  const fbRef = useRef(null);
  const textareaRef = useRef(null);

  const [finalReport, setFinalReport] = useState(SAVED?.finalReport ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [fbModal, setFbModal] = useState(null);
  const [submitted, setSubmitted] = useState(SAVED?.submitted ?? false);
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const MIN_FEEDBACK = 1;

  const sec = SECTIONS[idx];
  const doneN = Object.values(done).filter(Boolean).length;
  const pct = Math.round(doneN/5*100);
  const secFbs = fbs[sec.id];
  const secAttempt = attempts[sec.id];
  const canProceed = secAttempt >= MIN_FEEDBACK;
  const prevNeed = idx>0 ? Math.max(0, MIN_FEEDBACK - (attempts[SECTIONS[idx-1].id]||0)) : 0;
  const secLocked = prevNeed > 0 && !done[sec.id];
  const allDone = doneN === 5;

  useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[chatMsgs]);

  // 자동 저장: 상태가 바뀌면 0.8초 후 저장 (연속 타이핑은 마지막 것만)
  useEffect(()=>{
    const t = setTimeout(()=>{
      const data = { started, student, idx, inputs, inputHistory, done, attempts, fbs, tableData, photos, simLinks, chatMsgs, chatQCount, finalReport, submitted };
      try {
        window.localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      } catch(e){
        // 용량 초과(사진 큼) 시 사진 빼고라도 저장
        try { window.localStorage.setItem(SAVE_KEY, JSON.stringify({ ...data, photos: [] })); } catch(e2){}
      }
    }, 800);
    return ()=>clearTimeout(t);
  }, [started, student, idx, inputs, inputHistory, done, attempts, fbs, tableData, photos, simLinks, chatMsgs, chatQCount, finalReport, submitted]);

  function resetAll(){
    if(!window.confirm("정말 처음부터 다시 시작할까요? 지금까지 쓴 내용이 모두 지워져요!")) return;
    try { window.localStorage.removeItem(SAVE_KEY); } catch(e){}
    window.location.reload();
  }

  function toast_(msg){ setToast(msg); setTimeout(()=>setToast(""),2600); }

  function go(i){
    setIdx(i); setShowHint({});
    if(i>0 && attempts[SECTIONS[i-1].id] < MIN_FEEDBACK && !done[SECTIONS[i].id]){
      toast_("미리보기 중이에요 — 이전 단계 피드백 3번을 채우면 작성할 수 있어요");
    }
  }

  function proceedNext(){
    setDone(p=>({...p,[sec.id]:true}));
    if(idx<4){
      toast_("다음 단계로 이동합니다");
      setTimeout(()=>go(idx+1),500);
    } else {
      setShowCelebrate(true);
    }
  }

  async function ask(){
    const id = sec.id;
    if(secLocked){ toast_(`${SECTIONS[idx-1].name} 단계 피드백을 먼저 채워야 작성할 수 있어요`); return; }
    // 결과 섹션은 표+해석 기준으로 빈값 체크
    if(id==="r"){
      const hasData = tableData.rows.some(r=>r.x && r.y!=="");
      if(!hasData && !tableData.qualitative.trim() && !inputs.r.trim()){ toast_("관찰 내용이나 측정값, 또는 해석을 작성해주세요"); return; }
    } else {
      if(isInputEmpty(sec, inputs[id])){ toast_("내용을 먼저 작성해주세요"); return; }
    }
    if(loading) return;

    let text = flattenInput(sec, inputs[id]);
    if(id==="e" && photos.length>0){
      const capList = photos.map((p,i)=>`사진${i+1}: ${p.caption.trim()||"(설명 없음)"}`).join(" / ");
      text += `\n[실험 과정 사진 ${photos.length}장] ${capList}`;
    }
    if(id==="e" && simLinks.length>0){
      text += `\n[시뮬레이션 링크 ${simLinks.length}개] ` + simLinks.map(l=>`${l.desc||"링크"}: ${l.url}`).join(" / ");
    }
    if(id==="r"){
      const tableText = tableData.rows
        .filter(r=>r.x && r.y!=="")
        .map(r=>`${r.x}: ${r.y}`)
        .join(", ");
      text = `${tableData.qualitative.trim()?`[관찰 기록] ${tableData.qualitative.trim()}\n`:""}${tableText?`[측정 데이터] ${tableData.xLabel||"가로"} 기준 ${tableData.yLabel||"세로"} — ${tableText}\n`:""}[결과 해석] ${inputs.r.trim()}`;
    }
    const newAtt = attempts[id]+1;
    setAttempts(p=>({...p,[id]:newAtt}));
    setInputHistory(p=>({...p,[id]:[...p[id],text]}));
    setLoading(true);

    try {
      const fb = await getFeedback(sec, text, newAtt, { q: flattenInput(SECTIONS[0], inputs.q), h: flattenInput(SECTIONS[1], inputs.h) });
      fb.att = newAtt;
      fb.inputSnapshot = text.slice(0,60)+(text.length>60?"…":"");
      fb.time = new Date().toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"});
      setFbs(p=>({...p,[id]:[...p[id], fb]}));
      setLoading(false);
      try{ navigator.vibrate && navigator.vibrate(25); }catch(e){}
      setFbModal(fb);
    } catch(e){
      setFbs(p=>({...p,[id]:[...p[id],{
        greeting:`연결에 문제가 생겼어요. (${e.message}) 다시 시도해주세요.`,
        good:"", needsRevision:true, att:newAtt, question:"", hint:"", isDeep:false,
        time:new Date().toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})
      }]}));
      setLoading(false);
    }
  }

  async function addPhoto(e){
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 재선택 가능하게 초기화
    if(!file) return;
    if(photos.length >= 6){ toast_("사진은 최대 6장까지 올릴 수 있어요"); return; }
    try {
      const dataUrl = await compressImage(file);
      setPhotos(p=>[...p, { id: Date.now(), dataUrl, caption:"" }]);
      toast_("사진이 추가됐어요! 간단한 설명을 써주세요");
    } catch(err){
      toast_(err.message || "사진을 올리지 못했어요. 다시 시도해주세요");
    }
  }

  function addSimLink(){
    let u = linkUrl.trim();
    if(!u){ toast_("링크 주소를 입력해주세요"); return; }
    if(!/^https?:\/\//i.test(u)) u = "https://" + u;
    if(simLinks.length >= 5){ toast_("링크는 최대 5개까지예요"); return; }
    setSimLinks(p=>[...p,{ id: Date.now(), url: u, desc: linkDesc.trim() }]);
    setLinkUrl(""); setLinkDesc("");
    toast_("링크가 추가됐어요! 🔗");
  }

  function removeSimLink(id){
    setSimLinks(p=>p.filter(l=>l.id!==id));
  }

  function removePhoto(id){
    setPhotos(p=>p.filter(ph=>ph.id!==id));
  }

  function setPhotoCaption(id, caption){
    setPhotos(p=>p.map(ph=>ph.id===id?{...ph,caption}:ph));
  }

  async function fetchExample(field){
    const key = `${sec.id}-${field.key}`;
    if(loadingExample[key]) return;
    setLoadingExample(p=>({...p,[key]:true}));
    const contextParts = [];
    const qText = flattenInput(SECTIONS[0], inputs.q);
    const hText = flattenInput(SECTIONS[1], inputs.h);
    if(qText) contextParts.push(`탐구문제: ${qText}`);
    if(hText) contextParts.push(`가설: ${hText}`);
    try {
      const example = await getFieldExample(sec, field, contextParts.join("\n"));
      setFieldExamples(p=>({...p,[key]:example.trim()}));
    } catch(e){
      setFieldExamples(p=>({...p,[key]:"예시를 불러오지 못했어요. 다시 눌러주세요."}));
    }
    setLoadingExample(p=>({...p,[key]:false}));
  }


  async function sendChat(){
    const q = chatInput.trim();
    if(!q||chatLoading) return;
    setChatInput("");
    setChatMsgs(p=>[...p,{role:"user",text:q}]);
    setChatQCount(c=>c+1);
    setChatLoading(true);
    const context = inputs.q ? `탐구문제: "${inputs.q}"${inputs.h?`\n가설: "${inputs.h}"`:""}` : "";
    try {
      const ans = await askQna(q, context);
      setChatMsgs(p=>[...p,{role:"curi",text:ans}]);
    } catch(e){
      setChatMsgs(p=>[...p,{role:"curi",text:`오류가 발생했어요. (${e.message}) 다시 시도해주세요.`}]);
    }
    setChatLoading(false);
  }

  const [reportProgress, setReportProgress] = useState("");
  async function generateReport(){
    setFinalReport(null);
    setReportLoading(true);
    setReportProgress("큐리가 전체 과정을 살펴보는 중");
    setView("finalReport");
    try {
      const totalAttempts = Object.values(attempts).reduce((a,b)=>a+b,0);
      const report = await getFinalReport({ fbs, inputHistory, chatQuestionCount:chatQCount, totalAttempts, chatMsgs }, (msg)=>setReportProgress(msg));
      setFinalReport(report);
    } catch(e){
      setFinalReport({ error: e.message });
    }
    setReportLoading(false);
  }


  async function submitToTeacher(){
    if(SUBMIT_URL.indexOf("여기에") !== -1){ toast_("제출 주소가 아직 설정되지 않았어요 (선생님께 문의!)"); return; }
    if(submitting) return;
    setSubmitting(true);
    try {
      const tableText = tableData.rows.filter(r=>r.x && r.y!=="").map(r=>`${r.x}: ${r.y}`).join(", ");
      const payload = {
        grade: student.grade, cls: student.cls, num: student.num,
        name: student.mode==="team" ? student.members.join(", ") : student.name,
        mode: student.mode,
        q: flattenInput(SECTIONS[0], inputs.q),
        h: flattenInput(SECTIONS[1], inputs.h),
        e: flattenInput(SECTIONS[2], inputs.e) + (simLinks.length ? "\n[시뮬레이션] " + simLinks.map(l=>`${l.desc||"링크"}: ${l.url}`).join(" / ") : ""),
        r: `${tableData.qualitative?`[관찰] ${tableData.qualitative} / `:""}${tableText?`[측정 ${tableData.xLabel}→${tableData.yLabel}] ${tableText} / `:""}해석: ${(inputs.r||"").trim()}`,
        c: flattenInput(SECTIONS[4], inputs.c),
        totalAttempts: Object.values(attempts).reduce((a,b)=>a+b,0),
        chatCount: chatQCount,
        photos: photos.map(p=>({ dataUrl: p.dataUrl, caption: p.caption }))
      };
      await fetch(SUBMIT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      // no-cors는 응답을 읽을 수 없지만, Apps Script는 정상 수신함
      setSubmitted(true);
      toast_("선생님께 제출 완료! 🎉");
    } catch(e){
      toast_("제출에 실패했어요. 인터넷 연결을 확인하고 다시 시도해주세요");
    }
    setSubmitting(false);
  }

  function saveCoachingLogPDF(){
    const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>");
    const who = student.mode==="team"
      ? `${esc(student.grade)}학년 ${esc(student.cls)}반 · 팀원: ${esc(student.members.join(", "))}`
      : `${esc(student.grade)}학년 ${esc(student.cls)}반 ${esc(student.num)}번 ${esc(student.name)}`;

    const maxAtt = Math.max(...SECTIONS.map(s=>attempts[s.id]||0));

    const summaryRow = SECTIONS.map(s=>{
      const n = attempts[s.id]||0;
      const isMax = n===maxAtt && n>0;
      return `<td style="border:1px solid #ddd;padding:6px 4px;text-align:center;font-size:12px;${isMax?"background:#FDF3E7;font-weight:800;color:#C07020;":""}">${n}회${isMax?" ★":""}</td>`;
    }).join("");

    const blocks = SECTIONS.map(s=>{
      const f = fbs[s.id]||[];
      const inp = inputHistory[s.id]||[];
      const n = attempts[s.id]||0;
      const isMax = n===maxAtt && n>0;
      const criteria = (s.checks||[]).map(k=>`<li style="font-size:11.5px;line-height:1.6;">${esc(k)}</li>`).join("");
      const log = f.map((fb,i)=>`
        <tr>
          <td style="border:1px solid #e5e5ee;padding:6px 8px;font-size:11px;text-align:center;white-space:nowrap;color:#6D5BD0;font-weight:700;">${i+1}차</td>
          <td style="border:1px solid #e5e5ee;padding:6px 8px;font-size:11.5px;line-height:1.55;color:#333;">${esc((inp[i]||"").replace(/\s+/g," ").slice(0,130))}${(inp[i]||"").length>130?"…":""}</td>
          <td style="border:1px solid #e5e5ee;padding:6px 8px;font-size:11.5px;line-height:1.55;color:#5847B8;">${esc((fb.question||fb.good||"").slice(0,130))}</td>
        </tr>`).join("");
      return `
      <div style="margin-bottom:14px;page-break-inside:avoid;">
        <div style="font-size:14px;font-weight:800;color:#5847B8;margin-bottom:4px;">
          ${s.num}. ${esc(s.name)} — 코칭 ${n}회${isMax?' <span style="background:#FDF3E7;color:#C07020;font-size:11px;border-radius:99px;padding:2px 10px;">★ 가장 오래 머문 단계</span>':""}
        </div>
        <div style="font-size:11px;font-weight:700;color:#888;margin:4px 0 2px;">피드백 기준(통과 조건)</div>
        <ul style="margin:0 0 6px 16px;padding:0;">${criteria}</ul>
        ${log ? `<table style="border-collapse:collapse;width:100%;">
          <tr>
            <th style="border:1px solid #e5e5ee;padding:5px;font-size:10.5px;background:#F4F2FB;">회차</th>
            <th style="border:1px solid #e5e5ee;padding:5px;font-size:10.5px;background:#F4F2FB;">학생 작성 (요약)</th>
            <th style="border:1px solid #e5e5ee;padding:5px;font-size:10.5px;background:#F4F2FB;">큐리의 코칭 질문</th>
          </tr>${log}</table>` : `<div style="font-size:11.5px;color:#aaa;">코칭 기록 없음</div>`}
      </div>`;
    }).join("");

    const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>코칭 기록지 - ${esc(student.name||"팀")}</title>
      <style>@page{margin:14mm;} body{font-family:-apple-system,'Malgun Gothic',sans-serif;color:#222;padding:6px;}</style>
      </head><body>
      <div style="text-align:center;border-bottom:3px solid #6D5BD0;padding-bottom:10px;margin-bottom:12px;">
        <div style="font-size:11px;color:#6D5BD0;font-weight:700;">Songrye Science AI 큐리 · 코칭 기록지 (원본 기록)</div>
        <div style="font-size:19px;font-weight:900;margin-top:3px;">어디서 머뭇거렸고, 어떤 코칭을 받았나</div>
      </div>
      <div style="background:#F7F7FB;border-radius:9px;padding:9px 13px;margin-bottom:10px;font-size:12px;display:flex;justify-content:space-between;">
        <b>${who}</b><span>총 코칭 ${Object.values(attempts).reduce((a,b)=>a+b,0)}회 · 챗봇 질문 ${chatQCount}회</span>
      </div>
      <table style="border-collapse:collapse;width:100%;margin-bottom:14px;">
        <tr>${SECTIONS.map(s=>`<th style="border:1px solid #ddd;padding:5px;font-size:11px;background:#F4F2FB;">${esc(s.name)}</th>`).join("")}</tr>
        <tr>${summaryRow}</tr>
      </table>
      ${blocks}
      ${chatMsgs.filter(m=>m.role==="user"||m.role==="assistant").length>0 ? `
      <div style="margin-top:16px;page-break-inside:avoid;">
        <div style="font-size:14px;font-weight:800;color:#5847B8;margin-bottom:6px;">💬 큐리 챗봇과 나눈 대화 전체</div>
        <div style="border:1px solid #e5e5ee;border-radius:8px;padding:4px;">
        ${chatMsgs.filter(m=>m.role==="user"||m.role==="assistant").map(m=>{
          const isMe = m.role==="user";
          return `<div style="margin:5px;padding:8px 11px;border-radius:8px;font-size:11.5px;line-height:1.55;${isMe?"background:#EEEBFB;margin-left:40px;":"background:#F4F7F6;margin-right:40px;"}"><b style="color:${isMe?"#5847B8":"#2BA89A"};">${isMe?"학생":"큐리"}</b><br/>${esc(m.text)}</div>`;
        }).join("")}
        </div>
      </div>` : ""}
      <div style="margin-top:14px;border-top:1px solid #ddd;padding-top:8px;font-size:10px;color:#999;text-align:center;">
        시도 횟수와 회차별 작성·질문은 앱에 기록된 원본 데이터입니다. ★는 코칭을 가장 많이 받은(머뭇거린) 단계입니다. 최종 평가는 교사가 진행합니다.
      </div>
      <script>window.onload=function(){setTimeout(function(){window.print();},400);};</script>
      </body></html>`;

    const w = window.open("", "_blank");
    if (!w) { toast_("팝업이 차단됐어요. 팝업 허용 후 다시 눌러주세요"); return; }
    w.document.write(html);
    w.document.close();
  }

  function saveTeacherPDF(){
    if(!finalReport) { toast_("먼저 리포트를 생성해주세요"); return; }
    const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>");
    const r = finalReport;
    const who = student.mode==="team"
      ? `${esc(student.grade)}학년 ${esc(student.cls)}반 · 팀원: ${esc(student.members.join(", "))}`
      : `${esc(student.grade)}학년 ${esc(student.cls)}반 ${esc(student.num)}번 ${esc(student.name)}`;
    const totalAtt = Object.values(attempts).reduce((a,b)=>a+b,0);

    const journeyHTML = (r.journeyDetail||[]).map(j=>`
      <div style="border:1px solid #E8E4F5;border-radius:10px;padding:12px;margin-bottom:10px;">
        <div style="display:inline-block;background:#FDF3E7;color:#C07020;font-weight:800;font-size:12px;border-radius:99px;padding:3px 12px;margin-bottom:8px;">${esc(j.stage)}</div>
        ${j.mistake?`<div style="font-size:12.5px;line-height:1.65;margin-bottom:5px;"><b style="color:#E0654E;">① 처음의 오류</b> · ${esc(j.mistake)}</div>`:""}
        ${j.curiQuestion?`<div style="font-size:12.5px;line-height:1.65;margin-bottom:5px;"><b style="color:#6D5BD0;">② 큐리의 질문</b> · ${esc(j.curiQuestion)}</div>`:""}
        ${j.revision?`<div style="font-size:12.5px;line-height:1.65;margin-bottom:5px;"><b style="color:#2BA89A;">③ 학생의 수정</b> · ${esc(j.revision)}</div>`:""}
        ${j.growth?`<div style="font-size:12.5px;line-height:1.65;background:#EBF8F0;border-radius:7px;padding:7px 10px;"><b style="color:#3FA66B;">④ 성장</b> · ${esc(j.growth)}</div>`:""}
      </div>`).join("");

    const listHTML = (arr)=> (arr||[]).map(s=>`<li style="font-size:12.5px;line-height:1.7;">${esc(s)}</li>`).join("");

    const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>큐리 분석 리포트 - ${esc(student.name||"팀")}</title>
      <style>@page{margin:16mm;} body{font-family:-apple-system,'Malgun Gothic',sans-serif;color:#222;padding:8px;}</style>
      </head><body>
      <div style="text-align:center;border-bottom:3px solid #6D5BD0;padding-bottom:12px;margin-bottom:16px;">
        <div style="font-size:12px;color:#6D5BD0;font-weight:700;">Songrye Science AI 큐리 · 교사용 분석 리포트</div>
        <div style="font-size:20px;font-weight:900;margin-top:4px;">탐구 과정 코칭 분석</div>
      </div>
      <div style="background:#F7F7FB;border-radius:10px;padding:10px 14px;margin-bottom:14px;font-size:12.5px;display:flex;justify-content:space-between;">
        <b>${who}</b>
        <span>총 수정 ${totalAtt}회 · 챗봇 질문 ${chatQCount}회 · 호기심 ${esc(r.curiosityLevel)}</span>
      </div>

      <div style="font-size:14px;font-weight:800;color:#5847B8;margin-bottom:6px;">전체 총평</div>
      <div style="font-size:12.5px;line-height:1.7;margin-bottom:14px;">${esc(r.overallSummary)}</div>

      ${(r.strengths||[]).length?`<div style="font-size:14px;font-weight:800;color:#3FA66B;margin-bottom:6px;">잘한 점</div><ul style="margin:0 0 14px 18px;padding:0;">${listHTML(r.strengths)}</ul>`:""}

      ${journeyHTML?`<div style="font-size:14px;font-weight:800;color:#C07020;margin-bottom:8px;">오류 → 질문 → 수정 → 성장의 기록</div>${journeyHTML}`:""}

      ${r.communicationGrowth?`<div style="font-size:14px;font-weight:800;color:#3FA66B;margin:14px 0 6px;">과학적 의사소통 능력의 향상 ${r.commLevel?`<span style="font-size:11px;background:#3FA66B;color:white;border-radius:99px;padding:2px 10px;">${esc(r.commLevel)}</span>`:""}</div><div style="font-size:12.5px;line-height:1.7;background:#EBF8F0;border-radius:10px;padding:11px 14px;margin-bottom:8px;">${esc(r.communicationGrowth)}</div>${(r.commDetail||[]).map(d=>`<div style="font-size:12px;line-height:1.6;margin-bottom:5px;padding-left:10px;border-left:3px solid #3FA66B;"><b>${esc(d.aspect)}</b> · ${esc(d.evidence)}</div>`).join("")}`:""}
      ${r.aiInteraction?`<div style="font-size:14px;font-weight:800;color:#5847B8;margin:14px 0 6px;">AI 코치와의 상호작용</div><div style="background:#F4F2FB;border-radius:10px;padding:11px 14px;margin-bottom:14px;">${[["소통량",r.aiInteraction.amount],["도움 요청 방식",r.aiInteraction.naturalness],["어려움을 겪은 지점",r.aiInteraction.difficulty],["도움받아 개선된 점",r.aiInteraction.improvement],["교육적 효과",r.aiInteraction.effect]].filter(x=>x[1]).map(x=>`<div style="font-size:12px;line-height:1.6;margin-bottom:4px;"><b style="color:#5847B8;">${x[0]}</b> · ${esc(x[1])}</div>`).join("")}</div>`:""}

      ${(r.improvements||[]).length?`<div style="font-size:14px;font-weight:800;color:#6D5BD0;margin-bottom:6px;">회차별 개선</div><ul style="margin:0 0 14px 18px;padding:0;">${listHTML(r.improvements)}</ul>`:""}

      ${r.scientificThinkingNote?`<div style="font-size:14px;font-weight:800;color:#22243A;margin-bottom:6px;">과학적 사고 과정</div><div style="font-size:12.5px;line-height:1.7;margin-bottom:14px;">${esc(r.scientificThinkingNote)}</div>`:""}

      ${r.suggestionForTeacher?`<div style="background:#22243A;color:white;border-radius:10px;padding:12px 14px;margin-bottom:10px;"><div style="font-size:12px;font-weight:800;margin-bottom:5px;opacity:0.85;">지도 참고 코멘트</div><div style="font-size:12.5px;line-height:1.7;">${esc(r.suggestionForTeacher)}</div></div>`:""}

      <div style="margin-top:18px;border-top:1px solid #ddd;padding-top:9px;font-size:10.5px;color:#999;text-align:center;">
        이 리포트는 AI(큐리)가 학생의 회차별 작성 기록을 분석한 참고 자료입니다. 최종 평가는 교사가 진행합니다.
      </div>
      <script>window.onload=function(){setTimeout(function(){window.print();},500);};</script>
      </body></html>`;

    const w = window.open("", "_blank");
    if (!w) { toast_("팝업이 차단됐어요. 팝업 허용 후 다시 눌러주세요"); return; }
    w.document.write(html);
    w.document.close();
  }

  function savePDF(){
    const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>");
    const finalOf = id => {
      const h = inputHistory[id];
      if (h && h.length) return esc(h[h.length-1]);
      const v = inputs[id];
      if (typeof v === "string") return esc(v);
      if (v && typeof v === "object") {
        const sec2 = SECTIONS.find(s=>s.id===id);
        return sec2.fields.filter(f=>v[f.key]?.trim()).map(f=>`<b>${f.label}:</b> ${esc(v[f.key])}`).join("<br/>");
      }
      return "<i>(작성 없음)</i>";
    };

    const tableRows = tableData.rows.filter(r=>r.x && r.y!=="").map(r=>`<tr><td>${esc(r.x)}</td><td>${esc(r.y)}</td></tr>`).join("");
    const xh = esc(tableData.xLabel||"가로축") + (tableData.xUnit?` (${esc(tableData.xUnit)})`:"");
    const yh = esc(tableData.yLabel||"세로축") + (tableData.yUnit?` (${esc(tableData.yUnit)})`:"");
    const resultBlock = `
      ${tableData.qualitative?`<div style="margin-bottom:8px;"><b>관찰 기록:</b> ${esc(tableData.qualitative)}</div>`:""}
      ${tableRows ? `<table style="border-collapse:collapse;margin:8px 0;font-size:13px;">
        <tr><th style="border:1px solid #ccc;padding:5px 12px;background:#f3f1fb;">${xh}</th><th style="border:1px solid #ccc;padding:5px 12px;background:#f3f1fb;">${yh}</th></tr>
        ${tableRows.replace(/<td>/g,'<td style="border:1px solid #ccc;padding:5px 12px;text-align:center;">')}
      </table>` : ""}
      <div><b>결과 해석:</b> ${esc(inputs.r)||"<i>(작성 없음)</i>"}</div>`;

    const photosHTML = photos.length>0 ? `
      <div style="margin-top:10px;">
        <div style="font-size:13px;font-weight:700;color:#5847B8;margin-bottom:6px;">📸 실험 과정 사진</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${photos.map((p,i)=>`
            <div style="width:calc(50% - 4px);box-sizing:border-box;">
              <img src="${p.dataUrl}" style="width:100%;border-radius:8px;display:block;"/>
              <div style="font-size:11px;color:#555;margin-top:3px;line-height:1.5;">${i+1}. ${esc(p.caption)||"(설명 없음)"}</div>
            </div>`).join("")}
        </div>
      </div>` : "";

    const linksHTML = simLinks.length>0 ? `
      <div style="margin-top:8px;">
        <div style="font-size:13px;font-weight:700;color:#5847B8;margin-bottom:4px;">🔗 시뮬레이션 링크</div>
        ${simLinks.map(l=>`<div style="font-size:11.5px;line-height:1.6;word-break:break-all;">· ${esc(l.desc)||"링크"} — <a href="${l.url}">${esc(l.url)}</a></div>`).join("")}
      </div>` : "";

    const sectionsHTML = SECTIONS.map(s=>{
      const body = s.id==="r" ? resultBlock : finalOf(s.id);
      const extra = s.id==="e" ? photosHTML + linksHTML : "";
      return `<div style="margin-bottom:18px;">
        <div style="font-size:15px;font-weight:800;color:#5847B8;margin-bottom:6px;">${s.num}. ${s.name}</div>
        <div style="font-size:13.5px;line-height:1.7;color:#222;">${body}</div>
        ${extra}
      </div>`;
    }).join("");

    const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>탐구보고서 - ${esc(student.name)}</title>
      <style>
        @page{margin:18mm;}
        body{font-family:-apple-system,'Malgun Gothic',sans-serif;color:#222;padding:0;margin:0;background:#f0f0f5;}
        .sheet{background:white;max-width:700px;margin:0 auto;padding:32px 28px;}
        .bar{position:sticky;top:0;background:white;border-bottom:1px solid #eee;padding:12px 16px;display:flex;gap:8px;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
        .bar button{border:none;border-radius:10px;padding:11px 20px;font-size:14px;font-weight:700;cursor:pointer;}
        .print-btn{background:linear-gradient(135deg,#6D5BD0,#2BA89A);color:white;}
        .close-btn{background:#eee;color:#555;}
        @media print{.bar{display:none;} body{background:white;} .sheet{max-width:none;padding:0;}}
      </style>
      </head><body>
      <div class="bar">
        <button class="print-btn" onclick="window.print()">🖨️ 인쇄 / PDF로 저장</button>
        <button class="close-btn" onclick="window.close()">닫기</button>
      </div>
      <div class="sheet">
      <div style="text-align:center;border-bottom:3px solid #6D5BD0;padding-bottom:12px;margin-bottom:18px;">
        <div style="font-size:13px;color:#6D5BD0;font-weight:700;">Songrye Science AI 큐리</div>
        <div style="font-size:22px;font-weight:900;margin-top:4px;">탐구보고서</div>
      </div>
      <div style="background:#f7f7fb;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:13.5px;">
        <b>${esc(student.grade)}학년 ${esc(student.cls)}반${student.mode==="team" ? " · 팀원: " + esc(student.members.join(", ")) : ` ${esc(student.num)}번 · ${esc(student.name)}`}</b>
      </div>
      ${sectionsHTML}
      <div style="margin-top:24px;border-top:1px solid #ddd;padding-top:10px;font-size:11px;color:#999;text-align:center;">
        이 보고서는 학생이 큐리(AI)의 질문형 코칭을 받으며 스스로 작성했습니다. 최종 평가는 교사가 진행합니다.
      </div>
      </div>
      </body></html>`;

    const w = window.open("", "_blank");
    if (!w) { toast_("팝업이 차단됐어요. 팝업 허용 후 다시 눌러주세요"); return; }
    w.document.write(html);
    w.document.close();
  }

  const btnText = loading ? null
    : secAttempt === 0 ? "큐리에게 1차 피드백 받기"
    : `${secAttempt + 1}차 피드백 받기`;

  // ── 시작 화면 (학생 정보 입력) ──
  if (!started) {
    return <Onboarding student={student} setStudent={setStudent} onStart={()=>setStarted(true)} />;
  }

  return (
    <div style={{fontFamily:"'Jua','Pretendard',-apple-system,system-ui,sans-serif",background:"linear-gradient(170deg,#5B4BC4 0%,#6D5BD0 28%,#4E7DC4 55%,#3E9E96 82%,#2BA89A 100%)",backgroundAttachment:"fixed",minHeight:"100vh",maxWidth:480,margin:"0 auto",color:C.ink,display:"flex",flexDirection:"column",letterSpacing:"-0.01em",position:"relative"}}>

      {/* 떠다니는 배경 이모지 */}
      <div style={{position:"fixed",inset:0,maxWidth:480,margin:"0 auto",overflow:"hidden",pointerEvents:"none",zIndex:0}}>
        {["🧪","🔬","⚗️","🌡️","✨","💡","📊","🧬","🔭","⚡","🌟","🪐"].map((f,i)=>(
          <div key={i} style={{position:"absolute",left:`${(i*8.3+4)%92}%`,bottom:"-40px",fontSize:18+(i%3)*8,opacity:0.5,animation:`floatUp ${9+(i%5)*2}s ${i*0.8}s linear infinite`}}>{f}</div>
        ))}
      </div>



      {/* ── 헤더 ── */}
      <div style={{position:"sticky",top:0,zIndex:99,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.3)",padding:"14px 16px 12px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:34,height:34,borderRadius:11,background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18.5,flexShrink:0,boxShadow:`0 2px 8px ${C.primary}35`}}>🧪</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:15.5,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Songrye Science AI 큐리</div>
            <div style={{fontSize:12,color:C.inkSoft,marginTop:1}}>탐구보고서 작성하기</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0,display:"flex",alignItems:"center",gap:10}}>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:16.5,fontWeight:800,color:C.primary,lineHeight:1}}>{pct}%</div>
              <div style={{fontSize:10.5,fontWeight:700,color:C.warn,marginTop:3}}>⚡{Object.values(attempts).reduce((a,b)=>a+b,0)*10 + chatQCount*5}P</div>
            </div>
            <button onClick={resetAll} title="처음부터 다시 시작" style={{border:`1px solid ${C.line}`,background:C.surface,color:C.inkSoft,borderRadius:9,padding:"5px 9px",fontSize:11.5,fontWeight:700,cursor:"pointer"}}>
              처음부터
            </button>
          </div>
        </div>
        <div style={{height:5,background:C.lineSoft,borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.primary},${C.accent})`,borderRadius:99,transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)"}}/>
        </div>
      </div>

      {/* ── 뷰 탭 ── */}
      <div style={{display:"flex",background:"rgba(255,255,255,0.82)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",borderBottom:`1px solid ${C.line}`,padding:"0 10px",position:"relative",zIndex:1}}>
        {[
          ["report","탐구 보고서"],
          ...(allDone ? [["finalReport","종합 리포트"]] : [])
        ].map(([v,label])=>(
          <button key={v} onClick={()=>{ if(v==="finalReport" && !finalReport){ generateReport(); } else { setView(v); } }} style={{
            flex:1,padding:"11px 4px",border:"none",background:"none",
            fontSize:13.5,fontWeight:view===v?700:500,
            color:view===v?C.primary:C.inkSoft,
            borderBottom:view===v?`2.5px solid ${C.primary}`:"2.5px solid transparent",
            cursor:"pointer",transition:"color 0.15s"
          }}>
            {label}{v==="finalReport" && " ✨"}
          </button>
        ))}
      </div>

      {/* ══════════ 탐구보고서 뷰 ══════════ */}
      {view==="report" && (
        <div style={{flex:1,overflowY:"auto",position:"relative",zIndex:1}}>

          {/* 섹션 탭 */}
          <div style={{display:"flex",gap:6,padding:"12px 12px",background:"transparent"}}>
            {SECTIONS.map((s,i)=>{
              const isDone=done[s.id], isAct=i===idx;
              const locked=i>0 && attempts[SECTIONS[i-1].id] < MIN_FEEDBACK && !isDone && i!==idx;
              return (
                <div key={s.id} onClick={()=>go(i)} style={{
                  flex:1,minWidth:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                  padding:"9px 4px",borderRadius:13,
                  border:`2px solid ${isDone?C.good:isAct?SEC_TONE[s.id].main:"transparent"}`,
                  background:isDone?C.goodSoft:isAct?"white":"rgba(255,255,255,0.55)",
                  cursor:"pointer",opacity:locked?0.55:1,
                  transition:"all 0.15s",position:"relative"
                }}>
                  <span style={{fontSize:19}}>{s.icon}</span>
                  <span style={{fontSize:11.5,fontWeight:700,color:isDone?C.good:isAct?SEC_TONE[s.id].main:C.inkSoft,whiteSpace:"nowrap"}}>{s.name}</span>
                  <span style={{fontSize:9,lineHeight:1.2,color:isDone?C.good:locked?C.inkFaint:C.primary,fontWeight:700,whiteSpace:"nowrap"}}>
                    {isDone?"✓완료":locked?"🔒보기":isAct?"작성중":"이동가능"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 피드백 진행 표시 */}
          <div style={{display:"flex",alignItems:"center",gap:10,margin:"12px 14px 0",background:C.surface,border:`1px solid ${C.line}`,borderRadius:14,padding:"14px 16px",boxShadow:"0 1px 3px rgba(0,0,0,0.03)"}}>
            <div style={{display:"flex",gap:5}}>
              {Array.from({length: Math.max(MIN_FEEDBACK, secAttempt)}).map((_,i)=>{
                const filled = i < secAttempt;
                const isMinMark = i === MIN_FEEDBACK - 1;
                return (
                  <div key={i} style={{
                    width:filled?26:22,height:8,borderRadius:99,
                    background:filled?(secAttempt>=MIN_FEEDBACK?C.good:C.primary):C.lineSoft,
                    border:isMinMark&&!filled?`1.5px dashed ${C.inkFaint}`:"none",
                    transition:"all 0.2s"
                  }}/>
                );
              })}
            </div>
            <div style={{fontSize:12.5,color:C.inkSoft,fontWeight:600,marginLeft:"auto",whiteSpace:"nowrap"}}>
              {secAttempt}회 피드백
            </div>
          </div>

          <div style={{background:C.bg,borderRadius:"20px 20px 0 0",padding:"18px 14px 110px",minHeight:"70vh",boxShadow:"0 -4px 20px rgba(0,0,0,0.1)"}}>

            {/* 큐리 인트로 카드 */}
            <div style={{
              background:`linear-gradient(135deg,${C.primarySoft},${C.accentSoft})`,
              borderRadius:16,padding:15,display:"flex",alignItems:"center",gap:13,margin:"4px 0 16px",
              border:`1px solid ${C.primary}12`
            }}>
              <div style={{width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0,boxShadow:`0 3px 10px ${C.primary}30`}}>🧪</div>
              <div>
                <div style={{fontSize:15,fontWeight:800,color:C.primaryDark}}>큐리 (Curi)</div>
                <div style={{fontSize:12.5,color:C.inkSoft,marginTop:3,lineHeight:1.6}}>마리 퀴리처럼 탐구하고, 친구처럼 도와줄게.<br/>피드백을 3번 받으면 다음 단계로 갈 수 있어!</div>
              </div>
            </div>

            {/* 섹션 헤더 */}
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:12}}>
              <div style={{width:38,height:38,borderRadius:14,background:SEC_TONE[sec.id].soft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,fontWeight:700,color:SEC_TONE[sec.id].main}}>{sec.num}</div>
              <div>
                <div style={{fontSize:18,fontWeight:800,display:"flex",alignItems:"center",gap:6}}>{sec.icon} {sec.name}</div>
                <div style={{fontSize:12.5,color:C.inkSoft,marginTop:2}}>{sec.sub}</div>
              </div>
            </div>

            {/* 큐리 힌트 / 예시 보기 버튼 */}
            {(sec.howto || sec.example) && (
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",gap:8}}>
                  {sec.howto && (
                    <button onClick={()=>setOpenGuide(p=>({...p,[`${sec.id}-howto`]:!p[`${sec.id}-howto`]}))}
                      style={{flex:1,padding:"10px 12px",borderRadius:11,border:`1.5px solid ${openGuide[`${sec.id}-howto`]?C.primary:C.line}`,background:openGuide[`${sec.id}-howto`]?C.primarySoft:C.surface,color:C.primary,fontSize:13.5,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                      큐리 힌트 💡
                    </button>
                  )}
                  {sec.example && (
                    <button onClick={()=>setOpenGuide(p=>({...p,[`${sec.id}-ex`]:!p[`${sec.id}-ex`]}))}
                      style={{flex:1,padding:"10px 12px",borderRadius:11,border:`1.5px solid ${openGuide[`${sec.id}-ex`]?C.accent:C.line}`,background:openGuide[`${sec.id}-ex`]?C.accentSoft:C.surface,color:C.accent,fontSize:13.5,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
                      예시 보기 👀
                    </button>
                  )}
                </div>

                {sec.howto && openGuide[`${sec.id}-howto`] && (
                  <div style={{background:C.primarySoft,borderRadius:12,padding:"12px 14px",marginTop:8,fontSize:14.5,lineHeight:1.7,color:C.ink}}>
                    <div style={{fontSize:12,fontWeight:800,color:C.primary,marginBottom:5}}>이렇게 써봐</div>
                    {sec.howto}
                  </div>
                )}
                {sec.example && openGuide[`${sec.id}-ex`] && (
                  <div style={{background:C.accentSoft,borderRadius:12,padding:"12px 14px",marginTop:8,fontSize:14.5,lineHeight:1.7,color:C.ink,whiteSpace:"pre-wrap"}}>
                    <div style={{fontSize:12,fontWeight:800,color:C.accent,marginBottom:5}}>예시</div>
                    {sec.example}
                  </div>
                )}
              </div>
            )}

            {/* 🔒 잠금 배너 (미리보기 모드) */}
            {secLocked && (
              <div style={{background:C.warnSoft,border:`1.5px solid ${C.warn}40`,borderRadius:14,padding:"12px 15px",marginBottom:13,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:22}}>🔒</span>
                <div style={{fontSize:13.5,lineHeight:1.6,color:C.ink}}>
                  <b>지금은 구경만 할 수 있어!</b><br/>
                  <span style={{color:C.inkSoft,fontSize:12.5}}>{SECTIONS[idx-1].name}에서 피드백 {prevNeed}번 더 받으면 여기가 열려 ✨</span>
                </div>
              </div>
            )}

            <div style={{pointerEvents:secLocked?"none":"auto",opacity:secLocked?0.5:1,transition:"opacity 0.2s"}}>


            {/* 입력 카드 — 결과 섹션 (표 입력 + 꺾은선그래프) */}
            {sec.id==="r" && (
              <div style={{marginBottom:13}}>
                <div style={{fontSize:12.5,fontWeight:700,color:canProceed?C.good:C.inkSoft,marginBottom:10}}>
                  {secAttempt===0?"측정값(숫자)이나 관찰한 내용을 기록해봐":canProceed?`피드백 ${secAttempt}회 완료 — 더 다듬거나 다음으로 넘어가요`:"피드백을 반영해서 수정해봐요"}
                </div>

                {/* 📝 정성적 관찰 기록 */}
                <div style={{background:C.surface,border:`1.5px solid ${C.line}`,borderRadius:14,padding:13,marginBottom:12}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:3}}>📝 관찰 기록 <span style={{fontSize:11,fontWeight:600,color:C.accent}}>색·모양·상태 변화 등</span></div>
                  <div style={{fontSize:11.5,color:C.inkSoft,marginBottom:8,lineHeight:1.5}}>숫자로 재기 어려운 변화(색이 변했다, 거품이 생겼다 등)를 글로 적어봐</div>
                  <textarea value={tableData.qualitative} onChange={e=>setTableData(p=>({...p,qualitative:e.target.value}))} rows={3}
                    placeholder="예) 5분 후 용액이 파란색에서 초록색으로 변했고, 작은 거품이 올라왔다."
                    style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:10,padding:"10px 12px",fontSize:13.5,fontFamily:"inherit",outline:"none",color:C.ink,resize:"none",lineHeight:1.6}}/>
                </div>

                <div style={{fontSize:12,fontWeight:700,color:C.inkSoft,marginBottom:8}}>🔢 숫자로 측정했다면 표에 입력해봐 <span style={{fontWeight:600,color:C.inkFaint}}>(선택)</span></div>

                {/* 축 이름 + 단위 */}
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11.5,fontWeight:700,color:C.inkSoft,marginBottom:4}}>가로축 <span style={{color:SEC_TONE.r.main}}>(조작변인)</span></div>
                    <input value={tableData.xLabel} onChange={e=>setTableData(p=>({...p,xLabel:e.target.value}))} placeholder="내가 바꾼 것"
                      style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:9,padding:"7px 10px",fontSize:13.5,fontFamily:"inherit",outline:"none",color:C.ink}}/>
                    <input value={tableData.xUnit} onChange={e=>setTableData(p=>({...p,xUnit:e.target.value}))} placeholder="단위 (예: ℃, g)"
                      style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:9,padding:"6px 10px",fontSize:12.5,fontFamily:"inherit",outline:"none",color:C.inkSoft,marginTop:5}}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11.5,fontWeight:700,color:C.inkSoft,marginBottom:4}}>세로축 <span style={{color:SEC_TONE.r.main}}>(종속변인)</span></div>
                    <input value={tableData.yLabel} onChange={e=>setTableData(p=>({...p,yLabel:e.target.value}))} placeholder="측정한 것"
                      style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:9,padding:"7px 10px",fontSize:13.5,fontFamily:"inherit",outline:"none",color:C.ink}}/>
                    <input value={tableData.yUnit} onChange={e=>setTableData(p=>({...p,yUnit:e.target.value}))} placeholder="단위 (예: 초, cm)"
                      style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:9,padding:"6px 10px",fontSize:12.5,fontFamily:"inherit",outline:"none",color:C.inkSoft,marginTop:5}}/>
                  </div>
                </div>
                {/* 자주 쓰는 단위 빠른 선택 */}
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.inkFaint,minWidth:52}}>가로축 단위:</span>
                    {["℃","초","분","cm","g","mL","개","회","%"].map(u=>(
                      <button key={u} onClick={()=>setTableData(p=>({...p,xUnit:u}))} style={{fontSize:11.5,fontWeight:600,padding:"4px 9px",borderRadius:99,border:`1px solid ${C.line}`,background:tableData.xUnit===u?SEC_TONE.r.soft:C.surface,color:tableData.xUnit===u?SEC_TONE.r.main:C.inkSoft,cursor:"pointer"}}>{u}</button>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                    <span style={{fontSize:11,color:C.inkFaint,minWidth:52}}>세로축 단위:</span>
                    {["℃","초","분","cm","g","mL","개","회","%"].map(u=>(
                      <button key={u} onClick={()=>setTableData(p=>({...p,yUnit:u}))} style={{fontSize:11.5,fontWeight:600,padding:"4px 9px",borderRadius:99,border:`1px solid ${C.line}`,background:tableData.yUnit===u?SEC_TONE.r.soft:C.surface,color:tableData.yUnit===u?SEC_TONE.r.main:C.inkSoft,cursor:"pointer"}}>{u}</button>
                    ))}
                  </div>
                </div>

                {/* 표 */}
                <div style={{background:C.surface,border:`1.5px solid ${C.line}`,borderRadius:14,padding:12,marginBottom:10}}>
                  <div style={{display:"flex",gap:8,marginBottom:8,fontSize:12,fontWeight:700,color:C.inkSoft,padding:"0 4px"}}>
                    <div style={{flex:1}}>{tableData.xLabel||"가로축"}{tableData.xUnit?` (${tableData.xUnit})`:""}</div>
                    <div style={{flex:1}}>{tableData.yLabel||"세로축"}{tableData.yUnit?` (${tableData.yUnit})`:""}</div>
                    <div style={{width:28}}/>
                  </div>
                  {tableData.rows.map((row,ri)=>(
                    <div key={ri} style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
                      <input value={row.x} placeholder=""
                        onChange={e=>{const rows=[...tableData.rows];rows[ri]={...rows[ri],x:e.target.value};setTableData(p=>({...p,rows}));}}
                        style={{flex:1,border:`1.5px solid ${C.line}`,borderRadius:9,padding:"8px 10px",fontSize:14.5,fontFamily:"inherit",outline:"none",color:C.ink}}/>
                      <input value={row.y} placeholder="" inputMode="decimal"
                        onChange={e=>{const rows=[...tableData.rows];rows[ri]={...rows[ri],y:e.target.value};setTableData(p=>({...p,rows}));}}
                        style={{flex:1,border:`1.5px solid ${C.line}`,borderRadius:9,padding:"8px 10px",fontSize:14.5,fontFamily:"inherit",outline:"none",color:C.ink}}/>
                      <button onClick={()=>{ if(tableData.rows.length>1){const rows=tableData.rows.filter((_,i)=>i!==ri);setTableData(p=>({...p,rows}));} }}
                        style={{width:28,height:28,borderRadius:8,border:"none",background:C.lineSoft,color:C.inkSoft,fontSize:16.5,cursor:"pointer",flexShrink:0}}>−</button>
                    </div>
                  ))}
                  <button onClick={()=>setTableData(p=>({...p,rows:[...p.rows,{x:"",y:""}]}))}
                    style={{width:"100%",marginTop:4,padding:9,border:`1.5px dashed ${C.primary}50`,borderRadius:9,background:C.primarySoft,color:C.primary,fontSize:13.5,fontWeight:700,cursor:"pointer"}}>
                    + 행 추가
                  </button>
                </div>

                {/* 그래프 */}
                <div style={{background:C.surface,border:`1.5px solid ${C.line}`,borderRadius:14,padding:"14px 12px 8px",marginBottom:10}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.inkSoft,marginBottom:6,textAlign:"center"}}>📈 자동 생성 그래프</div>
                  <LineChart data={tableData}/>
                </div>

                {/* 결과 해석 (자유 서술) */}
                <div style={{background:C.surface,border:`1.5px solid ${C.line}`,borderRadius:14,padding:13}}>
                  <div style={{fontSize:12.5,fontWeight:700,color:C.inkSoft,marginBottom:8}}>결과 해석 — 그래프에서 무엇을 알 수 있어?</div>
                  <textarea
                    value={inputs.r}
                    onChange={e=>setInputs(p=>({...p,r:e.target.value}))}
                    rows={4}
                    placeholder="예) 시간이 지날수록 값이 점점 커졌다. 가설과 비교하면... / 예상과 다른 점은..."
                    style={{width:"100%",border:"none",outline:"none",fontFamily:"inherit",fontSize:15,color:C.ink,resize:"none",background:"transparent",lineHeight:1.75}}
                  />
                </div>
              </div>
            )}

            {/* 입력 카드 — 일반 섹션 (단일 텍스트박스) */}
            {!sec.multiField && sec.id!=="r" && (
              <div style={{
                background:C.surface,borderRadius:16,
                border:`1.5px solid ${canProceed?C.good+"50":C.line}`,
                padding:15,marginBottom:13,
                boxShadow:"0 1px 4px rgba(0,0,0,0.03)",
                transition:"border-color 0.2s"
              }}>
                <div style={{fontSize:12.5,fontWeight:700,color:canProceed?C.good:C.inkSoft,marginBottom:9,display:"flex",alignItems:"center",gap:5}}>
                  {secAttempt===0?"처음 작성해봐요":canProceed?`피드백 ${secAttempt}회 완료 — 더 다듬거나 다음으로 넘어가요`:"피드백을 반영해서 수정해봐요"}
                </div>
                <textarea
                  ref={textareaRef}
                  value={inputs[sec.id]}
                  onChange={e=>setInputs(p=>({...p,[sec.id]:e.target.value}))}
                  rows={5}
                  placeholder={sec.placeholder}
                  style={{width:"100%",border:"none",outline:"none",fontFamily:"inherit",fontSize:15.5,color:C.ink,resize:"none",background:"transparent",lineHeight:1.8}}
                />
              </div>
            )}

            {/* 입력 카드 — 멀티필드 섹션 (항목별 입력 + 접이식 도움말) */}
            {sec.multiField && (
              <div style={{marginBottom:13}}>
                <div style={{fontSize:12.5,fontWeight:700,color:canProceed?C.good:C.inkSoft,marginBottom:10,display:"flex",alignItems:"center",gap:5}}>
                  {secAttempt===0?"항목별로 채워봐요":canProceed?`피드백 ${secAttempt}회 완료 — 더 다듬거나 다음으로 넘어가요`:"피드백을 반영해서 수정해봐요"}
                </div>
                {sec.fields.map((field, fi)=>{
                  const helpKey = `${sec.id}-${field.key}`;
                  const isOpen = openFieldHelp[helpKey];
                  const example = fieldExamples[helpKey];
                  const exLoading = loadingExample[helpKey];
                  return (
                    <div key={field.key} style={{
                      background:C.surface,borderRadius:15,
                      border:`1.5px solid ${C.line}`,
                      padding:13,marginBottom:fi<sec.fields.length-1?10:0,
                      boxShadow:"0 1px 4px rgba(0,0,0,0.03)"
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
                        <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                          <div style={{fontSize:14.5,fontWeight:700,color:C.ink}}>{field.label}</div>
                          {field.subLabel && <div style={{fontSize:11.5,fontWeight:600,color:C.accent}}>{field.subLabel}</div>}
                        </div>
                        <button
                          onClick={()=>{
                            const willOpen = !isOpen;
                            setOpenFieldHelp(p=>({...p,[helpKey]:willOpen}));
                            if(willOpen && !example) fetchExample(field);
                          }}
                          style={{
                            marginLeft:"auto",fontSize:11.5,fontWeight:600,
                            color:C.primary,background:C.primarySoft,
                            border:"none",borderRadius:99,padding:"3px 10px",
                            cursor:"pointer",display:"flex",alignItems:"center",gap:3
                          }}>
                          {isOpen ? "닫기" : "큐리 힌트 💡"}
                        </button>
                      </div>

                      {isOpen && (
                        <div style={{background:C.primarySoft,borderRadius:11,padding:"11px 13px",marginBottom:10,fontSize:13.5,lineHeight:1.7}}>
                          <div style={{color:C.ink,marginBottom:8}}>{field.baseDesc}</div>
                          <div style={{height:1,background:C.primary+"20",margin:"8px 0"}}/>
                          <div style={{fontSize:12,fontWeight:700,color:C.primaryDark,marginBottom:5}}>이 탐구에 맞는 예시</div>
                          {exLoading ? (
                            <div style={{display:"flex",alignItems:"center",gap:6,color:C.inkSoft}}>
                              <Spinner/> 예시를 만드는 중
                            </div>
                          ) : (
                            <div style={{color:C.primaryDark,fontWeight:500}}>{example}</div>
                          )}
                        </div>
                      )}

                      <textarea
                        value={inputs[sec.id]?.[field.key] || ""}
                        onChange={e=>setInputs(p=>({...p,[sec.id]:{...p[sec.id], [field.key]: e.target.value}}))}
                        rows={field.key==="procedure" ? 4 : 2}
                        placeholder={field.placeholder}
                        style={{width:"100%",border:"none",outline:"none",fontFamily:"inherit",fontSize:15,color:C.ink,resize:"none",background:C.bg,borderRadius:9,padding:"9px 11px",lineHeight:1.7}}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* 📸 실험 과정 사진 (실험설계 단계) */}
            {sec.id==="e" && (
              <div style={{background:C.surface,border:`1.5px solid ${C.line}`,borderRadius:15,padding:13,marginBottom:13}}>
                <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:4}}>
                  <div style={{fontSize:14.5,fontWeight:700,color:C.ink}}>📸 실험 과정 기록</div>
                  <div style={{fontSize:11.5,fontWeight:600,color:C.accent}}>사진 또는 링크 · 선택</div>
                </div>
                <div style={{fontSize:12.5,color:C.inkSoft,lineHeight:1.6,marginBottom:11}}>
                  실험 사진을 찍거나, 시뮬레이션 링크(자바실험실·직접 만든 웹앱)를 붙여봐! ✨
                </div>

                {photos.map((ph,pi)=>(
                  <div key={ph.id} style={{background:C.bg,borderRadius:12,padding:10,marginBottom:10}}>
                    <div style={{position:"relative",marginBottom:8}}>
                      <img src={ph.dataUrl} alt={`실험 사진 ${pi+1}`} style={{width:"100%",borderRadius:9,display:"block"}}/>
                      <button onClick={()=>removePhoto(ph.id)} style={{position:"absolute",top:8,right:8,width:28,height:28,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.55)",color:"white",fontSize:15.5,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                      <div style={{position:"absolute",top:8,left:8,background:"rgba(0,0,0,0.55)",color:"white",fontSize:11.5,fontWeight:700,borderRadius:99,padding:"3px 9px"}}>{pi+1}</div>
                    </div>
                    <input
                      value={ph.caption}
                      onChange={e=>setPhotoCaption(ph.id, e.target.value)}
                      placeholder="이 사진에 대한 간단한 설명을 써봐"
                      style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:9,padding:"9px 11px",fontSize:13.5,fontFamily:"inherit",outline:"none",color:C.ink,background:"white"}}
                    />
                  </div>
                ))}

                {photos.length < 6 && (
                  <label style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,width:"100%",padding:12,border:`1.5px dashed ${C.primary}50`,borderRadius:11,background:C.primarySoft,color:C.primary,fontSize:14.5,fontWeight:700,cursor:"pointer",boxSizing:"border-box"}}>
                    📷 {photos.length===0?"사진 찍기 / 올리기":"사진 추가"}
                    <input type="file" accept="image/*" onChange={addPhoto} style={{display:"none"}}/>
                  </label>
                )}

                {/* 🔗 시뮬레이션 링크 */}
                <div style={{height:1,background:C.lineSoft,margin:"13px 0"}}/>
                <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:8}}>🔗 시뮬레이션 링크 <span style={{fontSize:11,fontWeight:600,color:C.accent}}>최대 5개</span></div>

                {simLinks.map((l,li)=>(
                  <div key={l.id} style={{display:"flex",alignItems:"center",gap:8,background:C.bg,borderRadius:11,padding:"9px 12px",marginBottom:7}}>
                    <span style={{fontSize:15,flexShrink:0}}>🔗</span>
                    <div style={{flex:1,minWidth:0}}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:C.primary,fontWeight:700,textDecoration:"underline",wordBreak:"break-all",display:"block"}}>{l.desc || l.url}</a>
                      {l.desc && <div style={{fontSize:10.5,color:C.inkFaint,wordBreak:"break-all"}}>{l.url}</div>}
                    </div>
                    <button onClick={()=>removeSimLink(l.id)} style={{width:26,height:26,borderRadius:8,border:"none",background:C.lineSoft,color:C.inkSoft,fontSize:14,cursor:"pointer",flexShrink:0}}>✕</button>
                  </div>
                ))}

                {simLinks.length < 5 && (
                  <div>
                    <input value={linkUrl} onChange={e=>setLinkUrl(e.target.value)} placeholder="링크 주소 (예: javalab.org/...)"
                      style={{width:"100%",boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",color:C.ink,marginBottom:7}}/>
                    <div style={{display:"flex",gap:7}}>
                      <input value={linkDesc} onChange={e=>setLinkDesc(e.target.value)} placeholder="간단한 설명 (선택)"
                        style={{flex:1,boxSizing:"border-box",border:`1.5px solid ${C.line}`,borderRadius:10,padding:"9px 12px",fontSize:13,fontFamily:"inherit",outline:"none",color:C.ink}}/>
                      <button onClick={addSimLink} style={{padding:"9px 16px",borderRadius:10,border:"none",background:C.accentSoft,color:C.accent,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>+ 추가</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 체크리스트 */}
            <div style={{background:C.surface,border:`1px solid ${C.lineSoft}`,borderRadius:14,padding:14,marginBottom:13}}>
              <div style={{fontSize:12,fontWeight:700,color:C.inkSoft,marginBottom:10,letterSpacing:"0.02em"}}>통과 조건</div>
              {sec.checks.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:i<sec.checks.length-1?8:0,fontSize:13.5,lineHeight:1.6}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:C.inkFaint,flexShrink:0,marginTop:7}}/>
                  <span style={{color:C.inkSoft}}>{c}</span>
                </div>
              ))}
            </div>

            {/* 피드백 버튼 — 항상 누를 수 있음 */}
            <button onClick={ask} disabled={loading} style={{
              width:"100%",padding:15,
              background:loading?C.inkFaint:`linear-gradient(135deg,${C.primary},${C.primaryDark})`,
              color:"white",border:"none",borderRadius:14,
              fontSize:16,fontWeight:700,cursor:loading?"default":"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",gap:9,
              boxShadow:loading?"none":`0 4px 14px ${C.primary}40`,marginBottom:10,
              transition:"all 0.15s"
            }}>
              {loading ? <><Spinner color="white"/> 큐리가 분석하는 중</> : btnText}
            </button>

            {/* 피드백 횟수 안내 */}
            <div style={{textAlign:"center",fontSize:12.5,color:canProceed?C.good:C.inkSoft,marginBottom:10,fontWeight:600}}>
              {canProceed
                ? `피드백 ${secAttempt}회 완료 — 다음 단계로 넘어갈 수 있어요`
                : `피드백 ${secAttempt}/${MIN_FEEDBACK}회 — ${MIN_FEEDBACK - secAttempt}번 더 받으면 다음 단계가 열려요`}
            </div>

            {/* 다음 단계 버튼 — 항상 보이되, 3회 미달이면 비활성화 */}
            <button onClick={proceedNext} disabled={!canProceed} style={{
              width:"100%",padding:16,
              background:canProceed?`linear-gradient(135deg,${C.good},#2D8A57)`:C.lineSoft,
              color:canProceed?"white":C.inkFaint,
              border:"none",borderRadius:14,
              fontSize:16,fontWeight:700,
              cursor:canProceed?"pointer":"not-allowed",
              display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              boxShadow:canProceed?`0 4px 16px ${C.good}45`:"none",marginBottom:13,
              transition:"all 0.2s"
            }}>
              {idx<4 ? `다음 단계로 — ${SECTIONS[idx+1].name}` : "탐구보고서 완성하기"}
              <span style={{fontSize:16.5}}>{canProceed?"→":"🔒"}</span>
            </button>

            </div>

            {/* 피드백 이력 */}
            {secFbs.length>0 && (
              <div ref={fbRef}>
                {[...secFbs].reverse().map((fb,i)=>{
                  const isLatest=i===0;
                  const is2nd=fb.att>=2;
                  const accentColor = is2nd?C.coral:C.primary;
                  const accentSoft = is2nd?C.coralSoft:C.primarySoft;
                  return (
                    <div key={fb.att} style={{marginBottom:18,opacity:isLatest?1:0.5,transition:"opacity 0.2s",animation:isLatest?"popCard 0.5s cubic-bezier(0.34,1.56,0.64,1)":"none"}}>

                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                        <div style={{
                          display:"inline-flex",alignItems:"center",gap:5,
                          background:accentSoft,borderRadius:99,padding:"4px 12px",
                          fontSize:12,fontWeight:700,color:accentColor
                        }}>
                          {fb.att}차 피드백
                        </div>
                        <span style={{fontSize:11.5,color:C.inkFaint}}>{fb.time}</span>
                        {!isLatest&&<span style={{fontSize:11.5,color:C.inkFaint,marginLeft:"auto"}}>이전 기록</span>}
                      </div>

                      {fb.inputSnapshot&&(
                        <div style={{background:C.lineSoft,borderRadius:11,padding:"9px 13px",marginBottom:10,fontSize:13,color:C.inkSoft,borderLeft:`3px solid ${accentColor}`}}>
                          <span style={{fontWeight:700,color:accentColor}}>작성 내용</span> · "{fb.inputSnapshot}"
                        </div>
                      )}

                      <div style={{
                        background:accentSoft,borderRadius:"18px 18px 18px 4px",
                        padding:15,marginBottom:11,border:`1px solid ${accentColor}18`
                      }}>
                        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                          <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${accentColor},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15.5,flexShrink:0}}>🧪</div>
                          <span style={{fontSize:14.5,fontWeight:700,color:accentColor}}>큐리</span>
                        </div>
                        <div style={{fontSize:15,lineHeight:1.8,whiteSpace:"pre-wrap",color:C.ink}}>{fb.greeting}</div>
                      </div>

                      {fb.good&&(
                        <div style={{background:C.goodSoft,borderRadius:14,padding:13,marginBottom:10}}>
                          <div style={{fontSize:12.5,fontWeight:700,color:C.good,marginBottom:6}}>잘한 점</div>
                          <div style={{fontSize:15,lineHeight:1.7,color:C.ink}}>{fb.good}</div>
                        </div>
                      )}

                      {fb.needsRevision&&fb.question&&(
                        <div style={{background:C.warnSoft,borderRadius:14,padding:13,marginBottom:10}}>
                          <div style={{fontSize:12.5,fontWeight:700,color:C.warn,marginBottom:8}}>{is2nd?"조금만 더 다듬어볼까요":"다시 생각해볼 점"}</div>
                          <div style={{background:C.surface,border:`1.5px dashed ${C.primary}50`,borderRadius:11,padding:"10px 13px",fontSize:15,color:C.primaryDark,lineHeight:1.7,fontWeight:600}}>
                            {fb.question}
                          </div>
                          {fb.hint&&isLatest&&<>
                            <button onClick={()=>setShowHint(p=>({...p,[`${sec.id}-${fb.att}`]:!p[`${sec.id}-${fb.att}`]}))} style={{
                              width:"100%",marginTop:8,padding:9,background:C.surface,border:`1px solid ${C.line}`,
                              borderRadius:10,fontSize:13,fontWeight:700,color:C.primary,cursor:"pointer"
                            }}>
                              {showHint[`${sec.id}-${fb.att}`]?"힌트 숨기기":"힌트 보기"}
                            </button>
                            {showHint[`${sec.id}-${fb.att}`]&&(
                              <div style={{background:C.primarySoft,borderRadius:10,padding:"10px 13px",marginTop:6,fontSize:13.5,color:C.inkSoft,lineHeight:1.65}}>
                                {fb.hint}
                              </div>
                            )}
                          </>}
                        </div>
                      )}

                      {!fb.needsRevision&&fb.good&&(
                        <div style={{background:C.goodSoft,borderRadius:14,padding:14,marginBottom:10,textAlign:"center"}}>
                          <div style={{fontSize:15.5,fontWeight:700,color:C.good}}>이 정도면 충분히 좋아요</div>
                        </div>
                      )}

                      {fb.isDeep&&fb.deepQuestion&&(
                        <div style={{background:"#FFF7EE",border:`1px solid ${C.warn}30`,borderRadius:14,padding:13,marginBottom:10}}>
                          <div style={{fontSize:12.5,fontWeight:700,color:C.warn,marginBottom:8}}>심화 탐구 (선택)</div>
                          <div style={{fontSize:15,lineHeight:1.7}}>{fb.deepQuestion}</div>
                        </div>
                      )}

                      {i<secFbs.length-1&&<div style={{height:1,background:C.lineSoft,margin:"6px 0 18px"}}/>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════ 큐리 플로팅 버튼 + 챗봇 (항상 같은 좌표계 유지) ══════════ */}
      <div style={{position:"fixed",bottom:0,left:0,width:"100%",maxWidth:480,margin:"0 auto",pointerEvents:"none",zIndex:200}}>
        <button
          onClick={()=>setChatOpen(p=>!p)}
          style={{
            position:"absolute", bottom:20, left:20,
            height:52, borderRadius:99,
            padding: chatOpen ? "0" : "0 18px 0 6px",
            width: chatOpen ? 52 : "auto",
            background: chatOpen ? C.ink : `linear-gradient(135deg,${C.primary},${C.accent})`,
            border:"none", color:"white",
            display:"flex", alignItems:"center", gap:8, justifyContent:"center",
            boxShadow: chatOpen ? "0 4px 16px rgba(0,0,0,0.25)" : `0 4px 18px ${C.primary}55`,
            cursor:"pointer", pointerEvents:"auto", transition:"all 0.25s",
            whiteSpace:"nowrap"
          }}
          aria-label="큐리에게 질문하기"
        >
          {chatOpen ? (
            <span style={{fontSize:22,width:52,textAlign:"center"}}>✕</span>
          ) : (
            <>
              <span style={{
                width:40,height:40,borderRadius:"50%",
                background:"rgba(255,255,255,0.22)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0
              }}>🧪</span>
              <span style={{fontSize:15,fontWeight:700}}>큐리에게 질문해봐</span>
            </>
          )}
        </button>

        {chatOpen && (
          <div style={{
            position:"absolute", bottom:84, left:20,
            width:300, maxWidth:"calc(100vw - 40px)",
            height:420, maxHeight:"calc(100vh - 140px)",
            background:C.surface, borderRadius:18,
            border:`1px solid ${C.line}`, boxShadow:"0 10px 40px rgba(0,0,0,0.18)",
            display:"flex", flexDirection:"column", overflow:"hidden",
            pointerEvents:"auto"
          }}>
            {/* 챗봇 헤더 */}
            <div style={{padding:"13px 15px",borderBottom:`1px solid ${C.line}`,display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14.5,flexShrink:0}}>🧪</div>
              <div style={{fontSize:14.5,fontWeight:700}}>언제든 큐리에게 질문하세요</div>
            </div>

            {/* 채팅 메시지 */}
            <div style={{flex:1,overflowY:"auto",padding:"14px 12px 0"}}>
              {chatMsgs.map((msg,i)=>{
                const isCuri = msg.role==="curi";
                return (
                  <div key={i} style={{display:"flex",flexDirection:isCuri?"row":"row-reverse",gap:7,marginBottom:12,alignItems:"flex-end"}}>
                    {isCuri&&(
                      <div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>🧪</div>
                    )}
                    <div style={{
                      maxWidth:"80%",
                      background:isCuri?C.bg:`linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                      color:isCuri?C.ink:"white",
                      borderRadius:isCuri?"14px 14px 14px 3px":"14px 14px 3px 14px",
                      padding:"9px 12px",fontSize:13.5,lineHeight:1.65,whiteSpace:"pre-wrap"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {chatLoading&&(
                <div style={{display:"flex",gap:7,marginBottom:12,alignItems:"flex-end"}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🧪</div>
                  <div style={{background:C.bg,borderRadius:"14px 14px 14px 3px",padding:"10px 14px"}}>
                    <Spinner/>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>

            {/* 추천 질문 (첫 진입 시) */}
            {chatMsgs.length<=1&&(
              <div style={{padding:"8px 12px",display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
                {["통제변인이 뭐야?","가설 형식 알려줘","측정값을 어떻게 기록해?"].map((q,i)=>(
                  <button key={i} onClick={()=>setChatInput(q)} style={{
                    flexShrink:0,background:C.bg,border:`1.5px solid ${C.primary}25`,
                    borderRadius:99,padding:"6px 11px",fontSize:12,fontWeight:600,
                    color:C.primary,cursor:"pointer",whiteSpace:"nowrap"
                  }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* 입력창 */}
            <div style={{padding:"10px 12px 12px",borderTop:`1px solid ${C.line}`,display:"flex",gap:7,alignItems:"flex-end",flexShrink:0}}>
              <textarea
                value={chatInput}
                onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}}}
                rows={1}
                placeholder="궁금한 걸 물어보세요"
                style={{flex:1,border:`1.5px solid ${C.line}`,borderRadius:11,padding:"9px 12px",fontSize:13.5,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.4,maxHeight:80,overflowY:"auto"}}
              />
              <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} style={{
                width:36,height:36,borderRadius:"50%",
                background:chatInput.trim()?`linear-gradient(135deg,${C.primary},${C.primaryDark})`:C.lineSoft,
                border:"none",color:"white",fontSize:16.5,
                cursor:chatInput.trim()?"pointer":"default",flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center"
              }}>
                ↑
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ══════════ 완주 축하 화면 ══════════ */}
      {showCelebrate && (
        <div style={{
          position:"fixed", inset:0, zIndex:300,
          background:`linear-gradient(160deg, ${C.primary}, ${C.accent})`,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          padding:"32px 24px", overflow:"hidden", textAlign:"center"
        }}>
          {/* 콘페티 */}
          {Array.from({length:32}).map((_,i)=>{
            const colors=["#FFD166","#EF476F","#06D6A0","#FFFFFF","#FFB4A2","#B5E48C"];
            const left = (i*37)%100;
            const delay = (i%8)*0.25;
            const size = 7 + (i%4)*3;
            const dur = 2.4 + (i%5)*0.4;
            return (
              <div key={i} style={{
                position:"absolute", top:"-20px", left:`${left}%`,
                width:size, height:size*1.4,
                background:colors[i%colors.length],
                borderRadius:2,
                opacity:0.9,
                animation:`confetti ${dur}s ${delay}s linear infinite`
              }}/>
            );
          })}

          <div style={{fontSize:64, marginBottom:8, animation:"pop 0.6s ease"}}>🎉</div>
          <div style={{fontSize:30, fontWeight:900, color:"white", marginBottom:6, animation:"pop 0.6s 0.1s ease both"}}>
            정말 잘했어!
          </div>
          <div style={{fontSize:18.5, fontWeight:700, color:"white", opacity:0.95, marginBottom:18, animation:"pop 0.6s 0.2s ease both"}}>
            탐구보고서 5단계를 끝까지 완성했어 👏
          </div>

          <div style={{
            background:"rgba(255,255,255,0.16)", borderRadius:18, padding:"18px 20px",
            maxWidth:340, marginBottom:26, animation:"pop 0.6s 0.3s ease both"
          }}>
            <div style={{fontSize:15.5, lineHeight:1.8, color:"white"}}>
              끝까지 포기하지 않고<br/>
              스스로 생각하고 고쳐낸 네가 진짜 과학자야.<br/>
              <span style={{fontWeight:800}}>이건 정말 대단한 일이야! 🌟</span>
            </div>
          </div>

          <button
            onClick={()=>{ setShowCelebrate(false); if(!finalReport){ generateReport(); } else { setView("finalReport"); } }}
            style={{
              background:"white", color:C.primary, border:"none",
              borderRadius:14, padding:"15px 28px",
              fontSize:16.5, fontWeight:800, cursor:"pointer",
              boxShadow:"0 6px 20px rgba(0,0,0,0.2)",
              animation:"pop 0.6s 0.4s ease both"
            }}>
            내 탐구 리포트 확인하기 ✨
          </button>

          <button
            onClick={()=>setShowCelebrate(false)}
            style={{
              marginTop:14, background:"none", border:"none",
              color:"white", opacity:0.8, fontSize:14.5, cursor:"pointer",
              textDecoration:"underline", animation:"pop 0.6s 0.5s ease both"
            }}>
            보고서 다시 보기
          </button>
        </div>
      )}

      {/* ══════════ 종합 리포트 뷰 ══════════ */}
      {view==="finalReport" && (
        <div style={{flex:1,overflowY:"auto",position:"relative",zIndex:1}}>
          <div style={{background:C.bg,borderRadius:"20px 20px 0 0",padding:"22px 16px 60px",minHeight:"85vh",marginTop:8,boxShadow:"0 -4px 20px rgba(0,0,0,0.1)"}}>

          {reportLoading && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"70px 20px",gap:14}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,animation:"bobble 2.5s ease-in-out infinite"}}>🧪</div>
              <Spinner/>
              <div style={{fontSize:14.5,color:C.ink,fontWeight:700,textAlign:"center"}}>{reportProgress || "분석하고 있어요"}</div>
              <div style={{fontSize:12.5,color:C.inkFaint,textAlign:"center",lineHeight:1.6}}>꼼꼼히 살펴보느라 조금 걸릴 수 있어요<br/>잠깐만 기다려줘 (최대 1분) 🔍</div>
            </div>
          )}

          {finalReport && !reportLoading && !finalReport.error && (
            <>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 12px",boxShadow:`0 4px 16px ${C.primary}35`}}>🧪</div>
                <div style={{fontSize:20,fontWeight:800}}>탐구 과정 종합 리포트</div>
                <div style={{fontSize:13,color:C.inkSoft,marginTop:4}}>큐리가 분석한 전체 탐구 여정 · 참고용</div>
              </div>

              {/* 📋 내 탐구보고서 전체 보기 (한 페이지) */}
              <div style={{background:C.surface,border:`2px solid ${C.primary}25`,borderRadius:18,padding:17,marginBottom:18}}>
                <div style={{fontSize:15,fontWeight:800,color:C.primaryDark,marginBottom:4}}>📋 내 탐구보고서</div>
                <div style={{fontSize:12,color:C.inkSoft,marginBottom:14}}>
                  {student.mode==="team"
                    ? `${student.grade}학년 ${student.cls}반 · ${student.members.join(", ")}`
                    : `${student.grade}학년 ${student.cls}반 ${student.num}번 ${student.name}`}
                </div>
                {SECTIONS.map(s=>{
                  let body = null;
                  if(s.multiField){
                    const v = inputs[s.id] || {};
                    const filled = s.fields.filter(f=>v[f.key]?.trim());
                    body = filled.length ? filled.map(f=>(
                      <div key={f.key} style={{fontSize:14,lineHeight:1.7,marginBottom:4}}>
                        <span style={{fontWeight:700,color:SEC_TONE[s.id].main}}>{f.label}</span> · {v[f.key]}
                      </div>
                    )) : <div style={{fontSize:13,color:C.inkFaint}}>(작성 없음)</div>;
                  } else if(s.id==="r"){
                    const rows = tableData.rows.filter(r=>r.x && r.y!=="");
                    body = (
                      <>
                        {rows.length>0 && (
                          <div style={{background:C.bg,borderRadius:10,padding:"9px 12px",marginBottom:8,fontSize:13.5,lineHeight:1.7}}>
                            <span style={{fontWeight:700,color:SEC_TONE.r.main}}>{tableData.xLabel} → {tableData.yLabel}</span><br/>
                            {rows.map(r=>`${r.x}: ${r.y}`).join("  ·  ")}
                          </div>
                        )}
                        {rows.length>=2 && <div style={{marginBottom:8}}><LineChart data={tableData}/></div>}
                        <div style={{fontSize:14,lineHeight:1.7}}>
                          <span style={{fontWeight:700,color:SEC_TONE.r.main}}>해석</span> · {(inputs.r||"").trim() || <span style={{color:C.inkFaint}}>(작성 없음)</span>}
                        </div>
                      </>
                    );
                  } else {
                    body = <div style={{fontSize:14,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{(inputs[s.id]||"").trim() || <span style={{color:C.inkFaint}}>(작성 없음)</span>}</div>;
                  }
                  return (
                    <div key={s.id} style={{marginBottom:14,paddingBottom:14,borderBottom:`1px solid ${C.lineSoft}`}}>
                      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:SEC_TONE[s.id].soft,borderRadius:99,padding:"4px 13px",marginBottom:8}}>
                        <span style={{fontSize:14}}>{s.icon}</span>
                        <span style={{fontSize:12.5,fontWeight:800,color:SEC_TONE[s.id].main}}>{s.num}. {s.name}</span>
                      </div>
                      {body}
                      {s.id==="e" && simLinks.length>0 && (
                        <div style={{marginTop:8}}>
                          {simLinks.map(l=>(
                            <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" style={{display:"block",fontSize:13,color:C.primary,fontWeight:700,textDecoration:"underline",marginBottom:3,wordBreak:"break-all"}}>🔗 {l.desc||l.url}</a>
                          ))}
                        </div>
                      )}
                      {s.id==="e" && photos.length>0 && (
                        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:9}}>
                          {photos.map((ph,pi)=>(
                            <div key={ph.id} style={{width:"calc(33.3% - 4px)"}}>
                              <img src={ph.dataUrl} alt={`사진${pi+1}`} style={{width:"100%",borderRadius:8,display:"block"}}/>
                              {ph.caption && <div style={{fontSize:10.5,color:C.inkSoft,marginTop:2,lineHeight:1.4}}>{pi+1}. {ph.caption}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 전체 총평 */}
              <div style={{background:`linear-gradient(135deg,${C.primarySoft},${C.accentSoft})`,borderRadius:18,padding:18,marginBottom:16,border:`1px solid ${C.primary}15`}}>
                <div style={{fontSize:13,fontWeight:700,color:C.primaryDark,marginBottom:8}}>전체 총평</div>
                <div style={{fontSize:15.5,lineHeight:1.8,color:C.ink}}>{finalReport.overallSummary}</div>
              </div>

              {/* 강점 */}
              {finalReport.strengths?.length>0 && (
                <div style={{background:C.goodSoft,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.good,marginBottom:10}}>잘한 점</div>
                  {finalReport.strengths.map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:i<finalReport.strengths.length-1?8:0,fontSize:14.5,lineHeight:1.7}}>
                      <span style={{color:C.good,fontWeight:700,flexShrink:0}}>·</span>
                      <span style={{color:C.ink}}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 단계별: 오류 → 큐리의 질문 → 수정 → 성장 */}
              {finalReport.journeyDetail?.length>0 && (
                <div style={{background:C.warnSoft,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.warn,marginBottom:12}}>오류 → 질문 → 수정 → 성장의 기록</div>
                  {finalReport.journeyDetail.map((j,i)=>(
                    <div key={i} style={{background:"white",borderRadius:12,padding:12,marginBottom:i<finalReport.journeyDetail.length-1?10:0}}>
                      <div style={{fontSize:12.5,fontWeight:800,color:C.warn,marginBottom:8,display:"inline-block",background:C.warnSoft,padding:"2px 10px",borderRadius:99}}>
                        {j.stage}
                      </div>
                      {j.mistake && <div style={{fontSize:13.5,lineHeight:1.65,color:C.ink,marginBottom:6}}>
                        <span style={{fontWeight:700,color:C.coral}}>① 처음의 오류 · </span>{j.mistake}
                      </div>}
                      {j.curiQuestion && <div style={{fontSize:13.5,lineHeight:1.65,color:C.ink,marginBottom:6}}>
                        <span style={{fontWeight:700,color:C.primary}}>② 큐리의 질문 · </span>{j.curiQuestion}
                      </div>}
                      {j.revision && <div style={{fontSize:13.5,lineHeight:1.65,color:C.ink,marginBottom:6}}>
                        <span style={{fontWeight:700,color:C.accent}}>③ 학생의 수정 · </span>{j.revision}
                      </div>}
                      {j.growth && <div style={{fontSize:13.5,lineHeight:1.65,color:C.ink,background:C.goodSoft,borderRadius:8,padding:"7px 10px"}}>
                        <span style={{fontWeight:700,color:C.good}}>④ 성장 · </span>{j.growth}
                      </div>}
                      {/* 구버전 형식 호환 */}
                      {!j.mistake && j.difficulty && <div style={{fontSize:13.5,lineHeight:1.65,color:C.ink,marginBottom:6}}>
                        <span style={{fontWeight:700,color:C.warn}}>어려움 · </span>{j.difficulty}
                      </div>}
                      {!j.curiQuestion && j.help && <div style={{fontSize:13.5,lineHeight:1.65,color:C.ink}}>
                        <span style={{fontWeight:700,color:C.primary}}>큐리의 도움 · </span>{j.help}
                      </div>}
                    </div>
                  ))}
                </div>
              )}

              {/* 과학적 의사소통 능력 — 핵심 분석 */}
              {finalReport.communicationGrowth && (
                <div style={{background:`linear-gradient(135deg,${C.goodSoft},${C.accentSoft})`,borderRadius:16,padding:17,marginBottom:14,border:`1.5px solid ${C.good}30`}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
                    <div style={{fontSize:13.5,fontWeight:800,color:C.good}}>📈 과학적 의사소통 능력</div>
                    {finalReport.commLevel && <div style={{fontSize:11,fontWeight:700,color:"white",background:C.good,borderRadius:99,padding:"3px 11px"}}>{finalReport.commLevel}</div>}
                  </div>
                  <div style={{fontSize:14,lineHeight:1.8,color:C.ink,marginBottom:finalReport.commDetail?.length?13:0}}>{finalReport.communicationGrowth}</div>

                  {finalReport.commDetail?.length>0 && finalReport.commDetail.map((d,i)=>(
                    <div key={i} style={{background:"white",borderRadius:11,padding:"11px 13px",marginBottom:i<finalReport.commDetail.length-1?8:0}}>
                      <div style={{fontSize:12,fontWeight:800,color:C.good,marginBottom:4}}>{["🎯","🔄","🧩"][i]||"✔"} {d.aspect}</div>
                      <div style={{fontSize:13,lineHeight:1.65,color:C.ink}}>{d.evidence}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 🤖 AI와의 상호작용 분석 */}
              {finalReport.aiInteraction && (
                <div style={{background:C.primarySoft,borderRadius:16,padding:17,marginBottom:14,border:`1.5px solid ${C.primary}25`}}>
                  <div style={{fontSize:13.5,fontWeight:800,color:C.primaryDark,marginBottom:12}}>🤖 AI 코치와의 상호작용</div>
                  {[
                    ["💬","소통량",finalReport.aiInteraction.amount],
                    ["🙋","도움 요청 방식",finalReport.aiInteraction.naturalness],
                    ["🧗","어려움을 겪은 지점",finalReport.aiInteraction.difficulty],
                    ["📈","도움받아 개선된 점",finalReport.aiInteraction.improvement],
                    ["✨","교육적 효과",finalReport.aiInteraction.effect]
                  ].filter(([,,v])=>v).map(([icon,label,val],i,arr)=>(
                    <div key={i} style={{background:"white",borderRadius:11,padding:"11px 13px",marginBottom:i<arr.length-1?8:0}}>
                      <div style={{fontSize:12,fontWeight:800,color:C.primary,marginBottom:4}}>{icon} {label}</div>
                      <div style={{fontSize:13,lineHeight:1.65,color:C.ink}}>{val}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 개선된 점 */}
              {finalReport.improvements?.length>0 && (
                <div style={{background:C.primarySoft,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.primary,marginBottom:10}}>1차 → 2차 개선 과정</div>
                  {finalReport.improvements.map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:i<finalReport.improvements.length-1?8:0,fontSize:14.5,lineHeight:1.7}}>
                      <span style={{color:C.primary,fontWeight:700,flexShrink:0}}>→</span>
                      <span style={{color:C.ink}}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 호기심 지표 + 과학적 사고 */}
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                <div style={{flex:1,background:C.surface,border:`1px solid ${C.line}`,borderRadius:14,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:11.5,color:C.inkSoft,marginBottom:6}}>탐구 호기심</div>
                  <div style={{fontSize:22,fontWeight:800,color:C.coral}}>{finalReport.curiosityLevel}</div>
                  <div style={{fontSize:11,color:C.inkFaint,marginTop:3}}>큐리에게 {chatQCount}회 질문</div>
                </div>
                <div style={{flex:1,background:C.surface,border:`1px solid ${C.line}`,borderRadius:14,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:11.5,color:C.inkSoft,marginBottom:6}}>총 수정 횟수</div>
                  <div style={{fontSize:22,fontWeight:800,color:C.primary}}>{Object.values(attempts).reduce((a,b)=>a+b,0)}회</div>
                  <div style={{fontSize:11,color:C.inkFaint,marginTop:3}}>5단계 전체</div>
                </div>
              </div>

              {/* 과학적 사고 평가 */}
              {finalReport.scientificThinkingNote && (
                <div style={{background:C.surface,border:`1px solid ${C.line}`,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.ink,marginBottom:8}}>과학적 사고 과정</div>
                  <div style={{fontSize:14.5,lineHeight:1.75,color:C.inkSoft}}>{finalReport.scientificThinkingNote}</div>
                </div>
              )}

              {/* 선생님께 */}
              {finalReport.suggestionForTeacher && (
                <div style={{background:C.ink,borderRadius:16,padding:16,marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:"white",marginBottom:8,opacity:0.9}}>선생님께 드리는 참고 코멘트</div>
                  <div style={{fontSize:14.5,lineHeight:1.75,color:"white",opacity:0.95}}>{finalReport.suggestionForTeacher}</div>
                </div>
              )}

              <button onClick={submitToTeacher} disabled={submitting||submitted} style={{
                width:"100%",marginTop:20,padding:16,
                background: submitted ? C.goodSoft : submitting ? C.inkFaint : `linear-gradient(135deg,${C.good},#2D8A57)`,
                color: submitted ? C.good : "white",
                border: submitted ? `1.5px solid ${C.good}50` : "none",
                borderRadius:14, fontSize:16.5, fontWeight:800,
                cursor:(submitting||submitted)?"default":"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                boxShadow: submitted||submitting ? "none" : `0 4px 16px ${C.good}45`
              }}>
                {submitted ? "✅ 제출 완료!" : submitting ? "제출하는 중..." : "📤 선생님께 제출하기"}
              </button>

              <button onClick={savePDF} style={{
                width:"100%",marginTop:10,padding:15,
                background:`linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                color:"white",border:"none",borderRadius:14,
                fontSize:16,fontWeight:800,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                boxShadow:`0 4px 14px ${C.primary}40`
              }}>
                📄 최종 보고서 보기 (인쇄·저장)
              </button>

              <div style={{fontSize:11.5,color:C.inkFaint,textAlign:"center",margin:"14px 0 8px",fontWeight:700}}>─ 선생님용 자료 ─</div>

              <button onClick={saveTeacherPDF} style={{
                width:"100%",padding:15,
                background:C.surface,
                color:C.ink,border:`1.5px solid ${C.line}`,borderRadius:14,
                fontSize:15.5,fontWeight:700,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8
              }}>
                🍎 선생님 제출용 분석 리포트 PDF
              </button>

              <button onClick={saveCoachingLogPDF} style={{
                width:"100%",marginTop:10,padding:15,
                background:C.surface,
                color:C.ink,border:`1.5px solid ${C.line}`,borderRadius:14,
                fontSize:15.5,fontWeight:700,cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8
              }}>
                🗂 코칭 기록지 PDF (머뭇거린 곳 · 받은 코칭)
              </button>

              <div style={{textAlign:"center",fontSize:11.5,color:C.inkFaint,marginTop:18}}>
                이 리포트는 AI가 작성한 참고 자료입니다.<br/>최종 평가는 선생님이 진행합니다.
              </div>
            </>
          )}

          {finalReport?.error && !reportLoading && (
            <div style={{textAlign:"center",padding:"60px 20px"}}>
              <div style={{fontSize:14.5,color:C.coral,marginBottom:12}}>리포트 생성 중 오류가 발생했어요</div>
              <button onClick={generateReport} style={{padding:"10px 20px",background:C.primary,color:"white",border:"none",borderRadius:10,fontSize:14.5,fontWeight:700,cursor:"pointer"}}>
                다시 시도
              </button>
            </div>
          )}
          </div>
        </div>
      )}

      {/* ══ 피드백 판정 팝업 ══ */}
      {fbModal && (() => {
        const V = {
          good:  {icon:"🎉", label:"정말 잘했어!",      color:C.good,  soft:C.goodSoft,  sub:"핵심을 제대로 잡았어! 이대로 넘어가자 👏"},
          think: {icon:"💡", label:"거의 다 왔어!",      color:C.warn,  soft:C.warnSoft,  sub:"하나만 더 챙기면 완벽해져!"},
          revise:{icon:"✏️", label:"같이 다듬어보자!",    color:C.coral, soft:C.coralSoft, sub:"큐리 질문 보면서 조금만 고쳐볼까?"}
        }[fbModal.verdict] || {icon:"🧪",label:"큐리의 피드백",color:C.primary,soft:C.primarySoft,sub:""};
        const gradeColor = {Excellent:"#E0654E",Great:"#E8912D",Good:"#2BA89A"}[fbModal.grade] || C.primary;
        return (
          <div onClick={()=>setFbModal(null)} style={{position:"fixed",inset:0,zIndex:400,background:"rgba(30,25,60,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:0}}>
            <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:"24px 24px 0 0",padding:"24px 22px 30px",width:"100%",maxWidth:480,boxShadow:"0 -8px 40px rgba(0,0,0,0.25)",animation:"sheetUp 0.35s cubic-bezier(0.34,1.4,0.64,1)",maxHeight:"85vh",overflowY:"auto",position:"relative",overflowX:"hidden"}}>
              {fbModal.verdict==="good" && Array.from({length:18}).map((_,i)=>{
                const cols=["#FFD166","#EF476F","#06D6A0","#6D5BD0","#FFB4A2"];
                return <div key={i} style={{position:"absolute",top:-10,left:`${(i*23+7)%100}%`,width:8,height:11,background:cols[i%cols.length],borderRadius:2,animation:`confetti ${1.8+(i%4)*0.3}s ${(i%6)*0.1}s ease-in forwards`,pointerEvents:"none"}}/>;
              })}
              <div style={{width:44,height:5,borderRadius:99,background:C.line,margin:"0 auto 18px"}}/>

              <div style={{textAlign:"center",marginBottom:18}}>
                <div style={{fontSize:52,marginBottom:8}}>{V.icon}</div>
                <div style={{fontSize:22,fontWeight:900,color:V.color}}>{V.label}</div>
                {V.sub && <div style={{fontSize:13.5,color:C.inkSoft,marginTop:5}}>{V.sub}</div>}
                {fbModal.grade && (
                  <div style={{display:"inline-block",marginTop:12,background:gradeColor+"18",color:gradeColor,fontSize:13,fontWeight:800,borderRadius:99,padding:"6px 16px",letterSpacing:"0.03em"}}>
                    완성도 · {fbModal.grade} {fbModal.totalChecks?`(${fbModal.passedCount}/${fbModal.totalChecks})`:""}
                  </div>
                )}
              </div>

              {/* 체크 항목별 충족 여부 — 왜 이 등급인지 */}
              {fbModal.checkItems && fbModal.checkItems.length>0 && (
                <div style={{background:C.bg,borderRadius:14,padding:"13px 15px",marginBottom:12}}>
                  <div style={{fontSize:12,fontWeight:800,color:C.inkSoft,marginBottom:9}}>📋 이 단계 체크포인트</div>
                  {fbModal.checkItems.map((it,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:i<fbModal.checkItems.length-1?7:0}}>
                      <span style={{fontSize:15,flexShrink:0,lineHeight:1.4}}>{it.ok?"✅":"⬜"}</span>
                      <span style={{fontSize:13.5,lineHeight:1.5,color:it.ok?C.ink:C.inkFaint,fontWeight:it.ok?600:400}}>{it.label}</span>
                    </div>
                  ))}
                  {fbModal.passedCount < fbModal.totalChecks && (
                    <div style={{fontSize:12,color:C.accent,marginTop:9,fontWeight:700,lineHeight:1.5}}>
                      💡 남은 항목까지 채우면 Excellent! (지금도 충분히 잘했어)
                    </div>
                  )}
                  {fbModal.passedCount >= fbModal.totalChecks && fbModal.totalChecks>0 && (
                    <div style={{fontSize:12,color:C.good,marginTop:9,fontWeight:700}}>
                      🌟 모든 체크포인트 완성! 완벽해!
                    </div>
                  )}
                </div>
              )}

              <div style={{background:V.soft,borderRadius:16,padding:15,marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${V.color},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🧪</div>
                  <span style={{fontSize:14,fontWeight:800,color:V.color}}>큐리</span>
                </div>
                <div style={{fontSize:15,lineHeight:1.75,color:C.ink,whiteSpace:"pre-wrap"}}>{fbModal.greeting}</div>
              </div>

              {fbModal.good && (
                <div style={{background:C.goodSoft,borderRadius:14,padding:13,marginBottom:12}}>
                  <div style={{fontSize:12.5,fontWeight:800,color:C.good,marginBottom:5}}>👍 잘한 점</div>
                  <div style={{fontSize:14.5,lineHeight:1.65,color:C.ink}}>{fbModal.good}</div>
                </div>
              )}

              {fbModal.verdict !== "good" && fbModal.question && (
                <div style={{background:C.primarySoft,borderRadius:14,padding:13,marginBottom:12}}>
                  <div style={{fontSize:12.5,fontWeight:800,color:C.primary,marginBottom:6}}>💭 큐리의 질문</div>
                  <div style={{fontSize:15,lineHeight:1.7,color:C.primaryDark,fontWeight:600}}>{fbModal.question}</div>
                  {fbModal.hint && (
                    <div style={{fontSize:12.5,lineHeight:1.6,color:C.inkSoft,marginTop:8,paddingTop:8,borderTop:`1px dashed ${C.primary}30`}}>
                      <b style={{color:C.primary}}>💡 실마리 · </b>{fbModal.hint}
                    </div>
                  )}
                </div>
              )}

              {fbModal.deepDive && (
                <div style={{background:C.accentSoft,borderRadius:14,padding:13,marginBottom:12,border:`1px dashed ${C.accent}50`}}>
                  <div style={{fontSize:12.5,fontWeight:800,color:C.accent,marginBottom:6}}>🚀 한 걸음 더</div>
                  <div style={{fontSize:14,lineHeight:1.7,color:C.ink}}>{fbModal.deepDive}</div>
                </div>
              )}

              <button onClick={()=>setFbModal(null)} style={{width:"100%",padding:15,marginTop:4,background:`linear-gradient(135deg,${V.color},${C.accent})`,color:"white",border:"none",borderRadius:14,fontSize:15.5,fontWeight:800,cursor:"pointer"}}>
                {fbModal.verdict==="good" ? "좋아, 다음으로! 🚀" : "고치러 가기 ✏️"}
              </button>
              <div style={{textAlign:"center",fontSize:11.5,color:C.inkFaint,marginTop:10}}>
                피드백은 원하는 만큼 더 받을 수 있어 · 다음 단계로 갈지는 네가 결정!
              </div>
            </div>
          </div>
        );
      })()}

      {/* 토스트 */}
      {toast&&(
        <div style={{
          position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",
          background:C.ink,color:"white",borderRadius:13,padding:"10px 20px",
          fontSize:14.5,fontWeight:600,zIndex:999,whiteSpace:"nowrap",maxWidth:"88vw",
          textAlign:"center",boxShadow:"0 6px 24px rgba(0,0,0,0.25)"
        }}>
          {toast}
        </div>
      )}

      <style>{`
        textarea::placeholder{color:${C.inkFaint};}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{display:none;}
        @keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-4px);opacity:1}}
        @keyframes confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(105vh) rotate(720deg);opacity:0.7}}
        @keyframes pop{0%{transform:scale(0.6);opacity:0}60%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
      `}</style>
    </div>
  );
}
