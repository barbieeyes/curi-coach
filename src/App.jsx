import { useState, useRef, useEffect } from "react";

const SECTIONS = [
  {
    id:"q", icon:"🔍", name:"탐구문제", num:"1",
    sub:"식물/생태 관련 탐구 질문을 써봐요",
    placeholder:"예) 토양의 종류가 콩나물의 성장 속도에 미치는 영향은?\n예) 빛의 세기가 식물의 광합성량에 어떤 영향을 줄까?",
    guide:"학생이 식물/생태 탐구 문제를 작성했습니다. 탐구 대상이 명확한지, 탐구 가능한 질문 형태인지, 변인이 암시되어 있는지 확인해주세요.",
    checks:["식물/생태 관련 대상이 명확하다","탐구 가능한 질문 형태다","변인이 암시되어 있다"]
  },
  {
    id:"h", icon:"💡", name:"가설", num:"2",
    sub:'"~하면 ~할 것이다" 형태로 예측해봐요',
    placeholder:"예) 토양의 유기물 함량이 높을수록 콩나물의 키가 더 크게 자랄 것이다.",
    guide:"학생이 가설을 작성했습니다. 독립변인/종속변인이 포함됐는지, 측정 가능한 표현인지, 인과관계가 명확한지 확인해주세요.",
    checks:["독립변인과 종속변인이 포함됐다","측정 가능한 표현을 사용했다","탐구 문제와 연결된다"]
  },
  {
    id:"e", icon:"🧪", name:"실험설계", num:"3",
    sub:"어떻게 실험할지 항목별로 써봐요",
    guide:"학생이 실험 설계를 작성했습니다. 통제변인이 명시됐는지, 절차가 재현 가능한지, 반복 횟수가 있는지 확인해주세요.",
    checks:["통제변인이 1개 이상 명시됐다","실험 절차가 순서대로 있다","반복 횟수가 있다"],
    multiField: true,
    fields: [
      { key:"independent", label:"독립변인", baseDesc:"내가 직접 바꾸는 조건이에요. 원인이 되는 변인이죠.", placeholder:"예) 토양의 종류 (유기물 토양 / 일반 토양 / 모래 토양)" },
      { key:"dependent", label:"종속변인", baseDesc:"독립변인을 바꿨을 때 변하는 결과예요. 직접 측정하는 값이죠.", placeholder:"예) 콩나물의 키 (cm)" },
      { key:"controlled", label:"통제변인", baseDesc:"공정한 비교를 위해 똑같이 맞춰야 하는 조건들이에요.", placeholder:"예) 물의 양, 빛의 세기, 온도, 화분 크기를 모두 동일하게" },
      { key:"procedure", label:"실험 절차", baseDesc:"누가 따라해도 똑같이 할 수 있도록 순서대로 적어요.", placeholder:"예) 1. 화분 3개에 각각 다른 토양 담기\n2. 콩나물 씨앗을 같은 깊이로 심기\n3. 매일 같은 시간에 물 주기\n4. 7일마다 키 측정하기" },
      { key:"repetition", label:"반복 횟수", baseDesc:"우연한 결과가 아님을 확인하려면 여러 번 실험해야 해요.", placeholder:"예) 각 조건마다 화분 5개씩, 총 3주간 측정" }
    ]
  },
  {
    id:"r", icon:"📊", name:"결과", num:"4",
    sub:"실험 결과를 수치로 기록해봐요",
    placeholder:"예) 유기물 토양: 평균 키 14.2cm\n    일반 토양: 평균 키 9.8cm\n\n예상과 다른 결과도 적어봐요!",
    guide:"학생이 실험 결과를 작성했습니다. 수치 데이터가 포함됐는지, 가설과 비교했는지, 이상값을 언급했는지 확인해주세요.",
    checks:["수치 데이터가 포함됐다","가설과 비교했다","이상값이나 예외를 언급했다"]
  },
  {
    id:"c", icon:"🏆", name:"결론", num:"5",
    sub:"가설이 맞았는지 항목별로 정리해봐요",
    guide:"학생이 결론을 작성했습니다. 가설 지지/기각을 명시했는지, 결과에서 논리적으로 도출됐는지, 오차 원인을 분석했는지 확인해주세요.",
    checks:["가설 지지/기각이 명시됐다","결과에서 결론이 논리적으로 도출됐다","오차 원인이나 한계를 언급했다"],
    multiField: true,
    fields: [
      { key:"support", label:"가설 지지/기각 여부", baseDesc:"실험 결과가 처음 예상(가설)과 맞았는지 틀렸는지 밝혀요.", placeholder:"예) 가설이 지지되었다. 유기물 토양에서 키가 가장 크게 자랐다." },
      { key:"finding", label:"결과에서 알 수 있는 것", baseDesc:"수치 데이터가 의미하는 과학적 사실을 설명해요.", placeholder:"예) 유기물 함량이 높을수록 양분이 풍부해서 성장이 촉진된 것으로 보인다." },
      { key:"limitation", label:"오차 원인 / 실험 한계", baseDesc:"완벽하지 않았던 부분, 결과에 영향을 줬을 수 있는 요인을 적어요.", placeholder:"예) 화분 위치에 따라 받는 햇빛 양이 조금씩 달랐을 수 있다." },
      { key:"further", label:"더 탐구하고 싶은 것", baseDesc:"이 실험에서 더 알아보고 싶어진 질문을 적어요.", placeholder:"예) 토양의 종류뿐 아니라 물의 양도 함께 바꿔보면 어떨까?" }
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

  const prompt = `너는 식물/생태 과학 탐구 코치 "큐리(Curi)"야. 마리 퀴리처럼 과학적이고 탐구적이지만 중학생한테 친근하게 말해.

[절대 규칙]
- 정답 직접 말하기 금지 / 점수·등급 언급 금지 / "틀렸다" 금지
- 질문으로만 유도 / 친근한 반말 / 과학 용어는 쉽게
- 피드백은 1~2가지만
${is2nd ? "- 2차: 1차보다 세밀하게, 과학적 표현 정확성 집중" : "- 1차: 방향 잡기, 가장 중요한 1가지만"}

[섹션] ${sec.guide}${context}

[학생 작성]
"${text}"

순수 JSON만 응답:
{"greeting":"2문장","good":"잘한점 1가지","needsRevision":true,"question":"핵심질문 1가지","hint":"힌트","isDeep":false,"deepQuestion":""}`;

  const raw = await callCuri(prompt);
  const match = raw.match(/\{[\s\S]*\}/);
  if(!match) throw new Error("파싱 실패");
  return JSON.parse(match[0]);
}

async function askQna(question, context) {
  const prompt = `너는 식물/생태 과학 탐구 코치 "큐리(Curi)"야. 마리 퀴리처럼 과학적이지만 중학생한테 친근하게 말해.

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

async function getFinalReport(allData) {
  const sections = SECTIONS.map(s => {
    const fbs = allData.fbs[s.id] || [];
    const inputs = allData.inputHistory[s.id] || [];
    return `[${s.name}]
- 시도 횟수: ${fbs.length}회
- 첫 작성: "${inputs[0]?.slice(0,80) || '없음'}"
- 최종 작성: "${inputs[inputs.length-1]?.slice(0,80) || '없음'}"
- 피드백 요약: ${fbs.map(f => f.question || f.good).filter(Boolean).join(' / ')}`;
  }).join("\n\n");

  const prompt = `너는 식물/생태 과학 탐구 코치 "큐리(Curi)"야. 학생의 전체 탐구 과정을 분석해서 종합 총평을 작성해줘.

[학생의 5단계 탐구 과정 데이터]
${sections}

[질문/소통 패턴]
- 챗봇에게 직접 질문한 횟수: ${allData.chatQuestionCount}회
- 총 수정 시도 횟수: ${allData.totalAttempts}회

다음 형식의 순수 JSON으로만 응답해 (중학생 선생님이 읽을 참고용 리포트야. 점수가 아니라 과정 중심 서술):
{
  "overallSummary": "전체적인 탐구 과정에 대한 2-3문장 총평. 따뜻하고 구체적으로",
  "strengths": ["강점 1 (구체적 근거 포함)", "강점 2"],
  "challenges": ["어려움을 겪었던 부분 1 (구체적으로, 어떤 단계 어떤 점)", "어려움 2 (있다면)"],
  "improvements": ["1차에서 2차로 가면서 개선된 점 1 (구체적 변화 서술)", "개선점 2 (있다면)"],
  "curiosityLevel": "상/중/하 중 하나 — 챗봇 질문 빈도와 깊이로 판단",
  "scientificThinkingNote": "과학적 사고 과정에 대한 1-2문장 평가 (변인 통제, 측정 가능성, 논리적 결론 도출 등 관점에서)",
  "suggestionForTeacher": "선생님께 드리는 참고 코멘트 1-2문장 (이 학생을 지도할 때 참고할 점)"
}`;

  const raw = await callCuri(prompt);
  const match = raw.match(/\{[\s\S]*\}/);
  if(!match) throw new Error("리포트 생성 실패");
  return JSON.parse(match[0]);
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
${contextText || "아직 구체적인 맥락 정보가 없음 (일반적인 식물/생태 탐구로 가정)"}

[항목 설명]
${field.baseDesc}

위 맥락에 어울리는 구체적인 예시를 1개 만들어줘. 너무 길지 않게, 학생이 바로 참고해서 쓸 수 있는 수준으로.

순수 텍스트로만 응답해 (JSON 아님, 설명 없이 예시 문장만):`;

  return await callCuri(prompt);
}

export default function App() {
  const [view, setView] = useState("report");
  const [chatOpen, setChatOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [inputs, setInputs] = useState({q:"",h:"",e:{},r:"",c:{}});
  const [fieldExamples, setFieldExamples] = useState({}); // {sectionId-fieldKey: "예시문구"}
  const [loadingExample, setLoadingExample] = useState({}); // {sectionId-fieldKey: true}
  const [openFieldHelp, setOpenFieldHelp] = useState({});
  const [inputHistory, setInputHistory] = useState({q:[],h:[],e:[],r:[],c:[]});
  const [done, setDone] = useState({q:false,h:false,e:false,r:false,c:false});
  const [attempts, setAttempts] = useState({q:0,h:0,e:0,r:0,c:0});
  const [fbs, setFbs] = useState({q:[],h:[],e:[],r:[],c:[]});
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState({});
  const [toast, setToast] = useState("");

  const [chatMsgs, setChatMsgs] = useState([
    {role:"curi", text:"안녕! 나는 큐리야 🧪\n탐구하다가 모르는 거 있으면 뭐든 물어봐.\n식물, 생태, 실험 방법... 다 괜찮아!"}
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatQCount, setChatQCount] = useState(0);
  const chatEndRef = useRef(null);
  const fbRef = useRef(null);
  const textareaRef = useRef(null);

  const [finalReport, setFinalReport] = useState(null);
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  const MIN_FEEDBACK = 3;

  const sec = SECTIONS[idx];
  const doneN = Object.values(done).filter(Boolean).length;
  const pct = Math.round(doneN/5*100);
  const secFbs = fbs[sec.id];
  const secAttempt = attempts[sec.id];
  const canProceed = secAttempt >= MIN_FEEDBACK;
  const allDone = doneN === 5;

  useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[chatMsgs]);

  function toast_(msg){ setToast(msg); setTimeout(()=>setToast(""),2600); }

  function go(i){
    if(i>0 && attempts[SECTIONS[i-1].id] < MIN_FEEDBACK){
      toast_(`이전 단계에서 피드백을 ${MIN_FEEDBACK}번 받아야 이동할 수 있어요`); return;
    }
    setIdx(i); setShowHint({});
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
    if(isInputEmpty(sec, inputs[id])){ toast_("내용을 먼저 작성해주세요"); return; }
    if(loading) return;

    const text = flattenInput(sec, inputs[id]);
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
      setTimeout(()=>fbRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),150);

      if(newAtt < MIN_FEEDBACK){
        toast_(`${MIN_FEEDBACK - newAtt}번 더 피드백을 받으면 다음 단계로 넘어갈 수 있어요`);
      } else if(newAtt === MIN_FEEDBACK){
        toast_("이제 다음 단계로 넘어갈 수 있어요!");
      } else {
        toast_("계속 다듬어도 좋아요. 준비되면 다음 단계로 넘어가세요");
      }
    } catch(e){
      setFbs(p=>({...p,[id]:[...p[id],{
        greeting:`연결에 문제가 생겼어요. (${e.message}) 다시 시도해주세요.`,
        good:"", needsRevision:true, att:newAtt, question:"", hint:"", isDeep:false,
        time:new Date().toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})
      }]}));
      setLoading(false);
    }
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

  async function generateReport(){
    setReportLoading(true);
    setView("finalReport");
    try {
      const totalAttempts = Object.values(attempts).reduce((a,b)=>a+b,0);
      const report = await getFinalReport({ fbs, inputHistory, chatQuestionCount:chatQCount, totalAttempts });
      setFinalReport(report);
    } catch(e){
      setFinalReport({ error: e.message });
    }
    setReportLoading(false);
  }

  const btnText = loading ? null
    : secAttempt === 0 ? "큐리에게 1차 피드백 받기"
    : `${secAttempt + 1}차 피드백 받기`;

  return (
    <div style={{fontFamily:"'Pretendard',-apple-system,system-ui,sans-serif",background:C.bg,minHeight:"100vh",maxWidth:480,margin:"0 auto",color:C.ink,display:"flex",flexDirection:"column",letterSpacing:"-0.01em",position:"relative"}}>

      {/* ── 헤더 ── */}
      <div style={{position:"sticky",top:0,zIndex:99,background:C.surface,borderBottom:`1px solid ${C.line}`,padding:"14px 16px 12px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:34,height:34,borderRadius:11,background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0,boxShadow:`0 2px 8px ${C.primary}35`}}>🧪</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:14,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Songrye Science AI 큐리</div>
            <div style={{fontSize:11,color:C.inkSoft,marginTop:1}}>탐구보고서 작성하기</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:15,fontWeight:800,color:C.primary,lineHeight:1}}>{pct}%</div>
          </div>
        </div>
        <div style={{height:5,background:C.lineSoft,borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.primary},${C.accent})`,borderRadius:99,transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)"}}/>
        </div>
      </div>

      {/* ── 뷰 탭 ── */}
      <div style={{display:"flex",background:C.surface,borderBottom:`1px solid ${C.line}`,padding:"0 10px"}}>
        {[
          ["report","탐구 보고서"],
          ...(allDone ? [["finalReport","종합 리포트"]] : [])
        ].map(([v,label])=>(
          <button key={v} onClick={()=>{ if(v==="finalReport" && !finalReport){ generateReport(); } else { setView(v); } }} style={{
            flex:1,padding:"11px 4px",border:"none",background:"none",
            fontSize:12.5,fontWeight:view===v?700:500,
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
        <div style={{flex:1,overflowY:"auto"}}>

          {/* 섹션 탭 */}
          <div style={{display:"flex",gap:6,overflowX:"auto",padding:"12px 14px",background:C.surface,borderBottom:`1px solid ${C.line}`,scrollbarWidth:"none"}}>
            {SECTIONS.map((s,i)=>{
              const isDone=done[s.id], isAct=i===idx;
              const locked=i>0 && attempts[SECTIONS[i-1].id] < MIN_FEEDBACK && !isDone && i!==idx;
              return (
                <div key={s.id} onClick={()=>go(i)} style={{
                  flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                  padding:"9px 13px",borderRadius:13,
                  border:`1.5px solid ${isDone?C.good:isAct?C.primary:C.line}`,
                  background:isDone?C.goodSoft:isAct?C.primarySoft:C.surface,
                  cursor:locked?"not-allowed":"pointer",opacity:locked?0.4:1,minWidth:66,
                  transition:"all 0.15s"
                }}>
                  <span style={{fontSize:18}}>{s.icon}</span>
                  <span style={{fontSize:10,fontWeight:700,color:isDone?C.good:isAct?C.primary:C.inkSoft}}>{s.name}</span>
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
            <div style={{fontSize:11.5,color:C.inkSoft,fontWeight:600,marginLeft:"auto",whiteSpace:"nowrap"}}>
              {secAttempt}회 피드백
            </div>
          </div>

          <div style={{padding:"14px 14px 110px"}}>

            {/* 큐리 인트로 카드 */}
            <div style={{
              background:`linear-gradient(135deg,${C.primarySoft},${C.accentSoft})`,
              borderRadius:16,padding:15,display:"flex",alignItems:"center",gap:13,margin:"4px 0 16px",
              border:`1px solid ${C.primary}12`
            }}>
              <div style={{width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0,boxShadow:`0 3px 10px ${C.primary}30`}}>🧪</div>
              <div>
                <div style={{fontSize:13.5,fontWeight:800,color:C.primaryDark}}>큐리 (Curi)</div>
                <div style={{fontSize:11.5,color:C.inkSoft,marginTop:3,lineHeight:1.6}}>마리 퀴리처럼 탐구하고, 친구처럼 도와줄게.<br/>1차 → 수정 → 2차 → 다음 단계 순서야</div>
              </div>
            </div>

            {/* 섹션 헤더 */}
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:12,background:C.primarySoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0,fontWeight:700,color:C.primary}}>{sec.num}</div>
              <div>
                <div style={{fontSize:16.5,fontWeight:800,display:"flex",alignItems:"center",gap:6}}>{sec.icon} {sec.name}</div>
                <div style={{fontSize:11.5,color:C.inkSoft,marginTop:2}}>{sec.sub}</div>
              </div>
            </div>

            {/* 입력 카드 — 일반 섹션 (단일 텍스트박스) */}
            {!sec.multiField && (
              <div style={{
                background:C.surface,borderRadius:16,
                border:`1.5px solid ${canProceed?C.good+"50":C.line}`,
                padding:15,marginBottom:13,
                boxShadow:"0 1px 4px rgba(0,0,0,0.03)",
                transition:"border-color 0.2s"
              }}>
                <div style={{fontSize:11.5,fontWeight:700,color:canProceed?C.good:C.inkSoft,marginBottom:9,display:"flex",alignItems:"center",gap:5}}>
                  {secAttempt===0?"처음 작성해봐요":canProceed?`피드백 ${secAttempt}회 완료 — 더 다듬거나 다음으로 넘어가요`:"피드백을 반영해서 수정해봐요"}
                </div>
                <textarea
                  ref={textareaRef}
                  value={inputs[sec.id]}
                  onChange={e=>setInputs(p=>({...p,[sec.id]:e.target.value}))}
                  rows={5}
                  placeholder={sec.placeholder}
                  style={{width:"100%",border:"none",outline:"none",fontFamily:"inherit",fontSize:14,color:C.ink,resize:"none",background:"transparent",lineHeight:1.8}}
                />
              </div>
            )}

            {/* 입력 카드 — 멀티필드 섹션 (항목별 입력 + 접이식 도움말) */}
            {sec.multiField && (
              <div style={{marginBottom:13}}>
                <div style={{fontSize:11.5,fontWeight:700,color:canProceed?C.good:C.inkSoft,marginBottom:10,display:"flex",alignItems:"center",gap:5}}>
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
                        <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{field.label}</div>
                        <button
                          onClick={()=>{
                            const willOpen = !isOpen;
                            setOpenFieldHelp(p=>({...p,[helpKey]:willOpen}));
                            if(willOpen && !example) fetchExample(field);
                          }}
                          style={{
                            marginLeft:"auto",fontSize:10.5,fontWeight:600,
                            color:C.primary,background:C.primarySoft,
                            border:"none",borderRadius:99,padding:"3px 10px",
                            cursor:"pointer",display:"flex",alignItems:"center",gap:3
                          }}>
                          {isOpen ? "닫기" : "뭔가요?"}
                        </button>
                      </div>

                      {isOpen && (
                        <div style={{background:C.primarySoft,borderRadius:11,padding:"11px 13px",marginBottom:10,fontSize:12.5,lineHeight:1.7}}>
                          <div style={{color:C.ink,marginBottom:8}}>{field.baseDesc}</div>
                          <div style={{height:1,background:C.primary+"20",margin:"8px 0"}}/>
                          <div style={{fontSize:11,fontWeight:700,color:C.primaryDark,marginBottom:5}}>이 탐구에 맞는 예시</div>
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
                        style={{width:"100%",border:"none",outline:"none",fontFamily:"inherit",fontSize:13.5,color:C.ink,resize:"none",background:C.bg,borderRadius:9,padding:"9px 11px",lineHeight:1.7}}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* 체크리스트 */}
            <div style={{background:C.surface,border:`1px solid ${C.lineSoft}`,borderRadius:14,padding:14,marginBottom:13}}>
              <div style={{fontSize:11,fontWeight:700,color:C.inkSoft,marginBottom:10,letterSpacing:"0.02em"}}>통과 조건</div>
              {sec.checks.map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:i<sec.checks.length-1?8:0,fontSize:12.5,lineHeight:1.6}}>
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
              fontSize:14.5,fontWeight:700,cursor:loading?"default":"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",gap:9,
              boxShadow:loading?"none":`0 4px 14px ${C.primary}40`,marginBottom:10,
              transition:"all 0.15s"
            }}>
              {loading ? <><Spinner color="white"/> 큐리가 분석하는 중</> : btnText}
            </button>

            {/* 피드백 횟수 안내 */}
            <div style={{textAlign:"center",fontSize:11.5,color:canProceed?C.good:C.inkSoft,marginBottom:10,fontWeight:600}}>
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
              fontSize:14.5,fontWeight:700,
              cursor:canProceed?"pointer":"not-allowed",
              display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              boxShadow:canProceed?`0 4px 16px ${C.good}45`:"none",marginBottom:13,
              transition:"all 0.2s"
            }}>
              {idx<4 ? `다음 단계로 — ${SECTIONS[idx+1].name}` : "탐구보고서 완성하기"}
              <span style={{fontSize:15}}>{canProceed?"→":"🔒"}</span>
            </button>

            {/* 피드백 이력 */}
            {secFbs.length>0 && (
              <div ref={fbRef}>
                {[...secFbs].reverse().map((fb,i)=>{
                  const isLatest=i===0;
                  const is2nd=fb.att>=2;
                  const accentColor = is2nd?C.coral:C.primary;
                  const accentSoft = is2nd?C.coralSoft:C.primarySoft;
                  return (
                    <div key={fb.att} style={{marginBottom:18,opacity:isLatest?1:0.5,transition:"opacity 0.2s"}}>

                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                        <div style={{
                          display:"inline-flex",alignItems:"center",gap:5,
                          background:accentSoft,borderRadius:99,padding:"4px 12px",
                          fontSize:11,fontWeight:700,color:accentColor
                        }}>
                          {fb.att}차 피드백
                        </div>
                        <span style={{fontSize:10.5,color:C.inkFaint}}>{fb.time}</span>
                        {!isLatest&&<span style={{fontSize:10.5,color:C.inkFaint,marginLeft:"auto"}}>이전 기록</span>}
                      </div>

                      {fb.inputSnapshot&&(
                        <div style={{background:C.lineSoft,borderRadius:11,padding:"9px 13px",marginBottom:10,fontSize:12,color:C.inkSoft,borderLeft:`3px solid ${accentColor}`}}>
                          <span style={{fontWeight:700,color:accentColor}}>작성 내용</span> · "{fb.inputSnapshot}"
                        </div>
                      )}

                      <div style={{
                        background:accentSoft,borderRadius:"18px 18px 18px 4px",
                        padding:15,marginBottom:11,border:`1px solid ${accentColor}18`
                      }}>
                        <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10}}>
                          <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${accentColor},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>🧪</div>
                          <span style={{fontSize:13,fontWeight:700,color:accentColor}}>큐리</span>
                        </div>
                        <div style={{fontSize:13.5,lineHeight:1.8,whiteSpace:"pre-wrap",color:C.ink}}>{fb.greeting}</div>
                      </div>

                      {fb.good&&(
                        <div style={{background:C.goodSoft,borderRadius:14,padding:13,marginBottom:10}}>
                          <div style={{fontSize:11.5,fontWeight:700,color:C.good,marginBottom:6}}>잘한 점</div>
                          <div style={{fontSize:13.5,lineHeight:1.7,color:C.ink}}>{fb.good}</div>
                        </div>
                      )}

                      {fb.needsRevision&&fb.question&&(
                        <div style={{background:C.warnSoft,borderRadius:14,padding:13,marginBottom:10}}>
                          <div style={{fontSize:11.5,fontWeight:700,color:C.warn,marginBottom:8}}>{is2nd?"조금만 더 다듬어볼까요":"다시 생각해볼 점"}</div>
                          <div style={{background:C.surface,border:`1.5px dashed ${C.primary}50`,borderRadius:11,padding:"10px 13px",fontSize:13.5,color:C.primaryDark,lineHeight:1.7,fontWeight:600}}>
                            {fb.question}
                          </div>
                          {fb.hint&&isLatest&&<>
                            <button onClick={()=>setShowHint(p=>({...p,[`${sec.id}-${fb.att}`]:!p[`${sec.id}-${fb.att}`]}))} style={{
                              width:"100%",marginTop:8,padding:9,background:C.surface,border:`1px solid ${C.line}`,
                              borderRadius:10,fontSize:12,fontWeight:700,color:C.primary,cursor:"pointer"
                            }}>
                              {showHint[`${sec.id}-${fb.att}`]?"힌트 숨기기":"힌트 보기"}
                            </button>
                            {showHint[`${sec.id}-${fb.att}`]&&(
                              <div style={{background:C.primarySoft,borderRadius:10,padding:"10px 13px",marginTop:6,fontSize:12.5,color:C.inkSoft,lineHeight:1.65}}>
                                {fb.hint}
                              </div>
                            )}
                          </>}
                        </div>
                      )}

                      {!fb.needsRevision&&fb.good&&(
                        <div style={{background:C.goodSoft,borderRadius:14,padding:14,marginBottom:10,textAlign:"center"}}>
                          <div style={{fontSize:14,fontWeight:700,color:C.good}}>이 정도면 충분히 좋아요</div>
                        </div>
                      )}

                      {fb.isDeep&&fb.deepQuestion&&(
                        <div style={{background:"#FFF7EE",border:`1px solid ${C.warn}30`,borderRadius:14,padding:13,marginBottom:10}}>
                          <div style={{fontSize:11.5,fontWeight:700,color:C.warn,marginBottom:8}}>심화 탐구 (선택)</div>
                          <div style={{fontSize:13.5,lineHeight:1.7}}>{fb.deepQuestion}</div>
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
            <span style={{fontSize:20,width:52,textAlign:"center"}}>✕</span>
          ) : (
            <>
              <span style={{
                width:40,height:40,borderRadius:"50%",
                background:"rgba(255,255,255,0.22)",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0
              }}>🧪</span>
              <span style={{fontSize:13.5,fontWeight:700}}>큐리에게 질문해봐</span>
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
              <div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>🧪</div>
              <div style={{fontSize:13,fontWeight:700}}>언제든 큐리에게 질문하세요</div>
            </div>

            {/* 채팅 메시지 */}
            <div style={{flex:1,overflowY:"auto",padding:"14px 12px 0"}}>
              {chatMsgs.map((msg,i)=>{
                const isCuri = msg.role==="curi";
                return (
                  <div key={i} style={{display:"flex",flexDirection:isCuri?"row":"row-reverse",gap:7,marginBottom:12,alignItems:"flex-end"}}>
                    {isCuri&&(
                      <div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>🧪</div>
                    )}
                    <div style={{
                      maxWidth:"80%",
                      background:isCuri?C.bg:`linear-gradient(135deg,${C.primary},${C.primaryDark})`,
                      color:isCuri?C.ink:"white",
                      borderRadius:isCuri?"14px 14px 14px 3px":"14px 14px 3px 14px",
                      padding:"9px 12px",fontSize:12.5,lineHeight:1.65,whiteSpace:"pre-wrap"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              {chatLoading&&(
                <div style={{display:"flex",gap:7,marginBottom:12,alignItems:"flex-end"}}>
                  <div style={{width:24,height:24,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🧪</div>
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
                    borderRadius:99,padding:"6px 11px",fontSize:11,fontWeight:600,
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
                style={{flex:1,border:`1.5px solid ${C.line}`,borderRadius:11,padding:"9px 12px",fontSize:12.5,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.4,maxHeight:80,overflowY:"auto"}}
              />
              <button onClick={sendChat} disabled={chatLoading||!chatInput.trim()} style={{
                width:36,height:36,borderRadius:"50%",
                background:chatInput.trim()?`linear-gradient(135deg,${C.primary},${C.primaryDark})`:C.lineSoft,
                border:"none",color:"white",fontSize:15,
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
          <div style={{fontSize:28, fontWeight:900, color:"white", marginBottom:6, animation:"pop 0.6s 0.1s ease both"}}>
            정말 잘했어!
          </div>
          <div style={{fontSize:17, fontWeight:700, color:"white", opacity:0.95, marginBottom:18, animation:"pop 0.6s 0.2s ease both"}}>
            탐구보고서 5단계를 끝까지 완성했어 👏
          </div>

          <div style={{
            background:"rgba(255,255,255,0.16)", borderRadius:18, padding:"18px 20px",
            maxWidth:340, marginBottom:26, animation:"pop 0.6s 0.3s ease both"
          }}>
            <div style={{fontSize:14, lineHeight:1.8, color:"white"}}>
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
              fontSize:15, fontWeight:800, cursor:"pointer",
              boxShadow:"0 6px 20px rgba(0,0,0,0.2)",
              animation:"pop 0.6s 0.4s ease both"
            }}>
            내 탐구 리포트 확인하기 ✨
          </button>

          <button
            onClick={()=>setShowCelebrate(false)}
            style={{
              marginTop:14, background:"none", border:"none",
              color:"white", opacity:0.8, fontSize:13, cursor:"pointer",
              textDecoration:"underline", animation:"pop 0.6s 0.5s ease both"
            }}>
            보고서 다시 보기
          </button>
        </div>
      )}

      {/* ══════════ 종합 리포트 뷰 ══════════ */}
      {view==="finalReport" && (
        <div style={{flex:1,overflowY:"auto",padding:"20px 16px 60px"}}>

          {reportLoading && (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 20px",gap:14}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>🧪</div>
              <Spinner/>
              <div style={{fontSize:13,color:C.inkSoft,textAlign:"center"}}>큐리가 5단계 전체 과정을<br/>분석하고 있어요</div>
            </div>
          )}

          {finalReport && !reportLoading && !finalReport.error && (
            <>
              <div style={{textAlign:"center",marginBottom:22}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 12px",boxShadow:`0 4px 16px ${C.primary}35`}}>🧪</div>
                <div style={{fontSize:18,fontWeight:800}}>탐구 과정 종합 리포트</div>
                <div style={{fontSize:12,color:C.inkSoft,marginTop:4}}>큐리가 분석한 전체 탐구 여정 · 참고용</div>
              </div>

              {/* 전체 총평 */}
              <div style={{background:`linear-gradient(135deg,${C.primarySoft},${C.accentSoft})`,borderRadius:18,padding:18,marginBottom:16,border:`1px solid ${C.primary}15`}}>
                <div style={{fontSize:12,fontWeight:700,color:C.primaryDark,marginBottom:8}}>전체 총평</div>
                <div style={{fontSize:14,lineHeight:1.8,color:C.ink}}>{finalReport.overallSummary}</div>
              </div>

              {/* 강점 */}
              {finalReport.strengths?.length>0 && (
                <div style={{background:C.goodSoft,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.good,marginBottom:10}}>잘한 점</div>
                  {finalReport.strengths.map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:i<finalReport.strengths.length-1?8:0,fontSize:13,lineHeight:1.7}}>
                      <span style={{color:C.good,fontWeight:700,flexShrink:0}}>·</span>
                      <span style={{color:C.ink}}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 어려웠던 점 */}
              {finalReport.challenges?.length>0 && (
                <div style={{background:C.warnSoft,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.warn,marginBottom:10}}>어려움이 있었던 부분</div>
                  {finalReport.challenges.map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:i<finalReport.challenges.length-1?8:0,fontSize:13,lineHeight:1.7}}>
                      <span style={{color:C.warn,fontWeight:700,flexShrink:0}}>·</span>
                      <span style={{color:C.ink}}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 개선된 점 */}
              {finalReport.improvements?.length>0 && (
                <div style={{background:C.primarySoft,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.primary,marginBottom:10}}>1차 → 2차 개선 과정</div>
                  {finalReport.improvements.map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,marginBottom:i<finalReport.improvements.length-1?8:0,fontSize:13,lineHeight:1.7}}>
                      <span style={{color:C.primary,fontWeight:700,flexShrink:0}}>→</span>
                      <span style={{color:C.ink}}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 호기심 지표 + 과학적 사고 */}
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                <div style={{flex:1,background:C.surface,border:`1px solid ${C.line}`,borderRadius:14,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:10.5,color:C.inkSoft,marginBottom:6}}>탐구 호기심</div>
                  <div style={{fontSize:20,fontWeight:800,color:C.coral}}>{finalReport.curiosityLevel}</div>
                  <div style={{fontSize:10,color:C.inkFaint,marginTop:3}}>큐리에게 {chatQCount}회 질문</div>
                </div>
                <div style={{flex:1,background:C.surface,border:`1px solid ${C.line}`,borderRadius:14,padding:14,textAlign:"center"}}>
                  <div style={{fontSize:10.5,color:C.inkSoft,marginBottom:6}}>총 수정 횟수</div>
                  <div style={{fontSize:20,fontWeight:800,color:C.primary}}>{Object.values(attempts).reduce((a,b)=>a+b,0)}회</div>
                  <div style={{fontSize:10,color:C.inkFaint,marginTop:3}}>5단계 전체</div>
                </div>
              </div>

              {/* 과학적 사고 평가 */}
              {finalReport.scientificThinkingNote && (
                <div style={{background:C.surface,border:`1px solid ${C.line}`,borderRadius:16,padding:16,marginBottom:14}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.ink,marginBottom:8}}>과학적 사고 과정</div>
                  <div style={{fontSize:13,lineHeight:1.75,color:C.inkSoft}}>{finalReport.scientificThinkingNote}</div>
                </div>
              )}

              {/* 선생님께 */}
              {finalReport.suggestionForTeacher && (
                <div style={{background:C.ink,borderRadius:16,padding:16,marginBottom:6}}>
                  <div style={{fontSize:12,fontWeight:700,color:"white",marginBottom:8,opacity:0.9}}>선생님께 드리는 참고 코멘트</div>
                  <div style={{fontSize:13,lineHeight:1.75,color:"white",opacity:0.95}}>{finalReport.suggestionForTeacher}</div>
                </div>
              )}

              <div style={{textAlign:"center",fontSize:10.5,color:C.inkFaint,marginTop:18}}>
                이 리포트는 AI가 작성한 참고 자료입니다.<br/>최종 평가는 선생님이 진행합니다.
              </div>
            </>
          )}

          {finalReport?.error && (
            <div style={{textAlign:"center",padding:"60px 20px"}}>
              <div style={{fontSize:13,color:C.coral,marginBottom:12}}>리포트 생성 중 오류가 발생했어요</div>
              <button onClick={generateReport} style={{padding:"10px 20px",background:C.primary,color:"white",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                다시 시도
              </button>
            </div>
          )}
        </div>
      )}

      {/* 토스트 */}
      {toast&&(
        <div style={{
          position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",
          background:C.ink,color:"white",borderRadius:13,padding:"10px 20px",
          fontSize:13,fontWeight:600,zIndex:999,whiteSpace:"nowrap",maxWidth:"88vw",
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
