# 큐리 탐구 코치 — 배포 가이드

## 폴더 구성
```
curi-coach/
├── api/curi.js       ← 서버리스 함수 (API 키를 안전하게 보관하고 Claude API를 대신 호출)
├── src/App.jsx       ← 화면 전체 (멀티필드, 챗봇, 종합 리포트 포함)
├── src/main.jsx      ← React 진입점
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## 배포 순서

### 1. 깃허브에 올리기
이 폴더 전체를 깃허브 새 저장소에 업로드합니다.
(`.env.local`은 `.gitignore`에 의해 자동으로 제외되니 안심하고 올려도 됩니다.)

### 2. 버셀에서 저장소 연결
1. vercel.com 접속 → 로그인
2. "Add New" → "Project"
3. 방금 만든 깃허브 저장소 선택 → Import
4. Framework Preset은 자동으로 "Vite"가 감지됩니다

### 3. 환경변수 등록 (가장 중요한 단계)
배포 설정 화면에서 "Environment Variables"를 찾아 아래처럼 등록합니다.

| Key | Value |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic 콘솔에서 발급받은 본인의 API 키 |

이 값은 절대 코드에 직접 적지 않습니다. 여기에 등록하면 서버에만 안전하게 보관되고, 학생 화면에는 전혀 노출되지 않습니다.

### 4. Deploy 클릭
몇 분 안에 `https://프로젝트이름.vercel.app` 같은 URL이 생성됩니다.
이 URL을 학생들에게 공유하면 바로 사용할 수 있습니다.

## 로컬에서 미리 테스트하고 싶다면
```bash
npm install
cp .env.example .env.local
# .env.local 파일을 열어 실제 API 키 입력
npm run dev
```

`vercel dev` 명령으로 실행하면 서버리스 함수(`/api/curi`)까지 로컬에서 동일하게 테스트할 수 있습니다 (버셀 CLI 설치 필요: `npm i -g vercel`).

## 주의할 점
- 학생 수와 사용 횟수에 따라 Anthropic API 사용 비용이 발생합니다.
- 이 코드는 5단계 탐구 보고서(탐구문제 → 가설 → 실험설계 → 결과 → 결론), 최소 3회 피드백 후 다음 단계 진행, 자유 질문 챗봇, 종합 리포트 기능을 포함합니다.
- 최종 점수는 AI가 아닌 선생님이 부여하는 구조로 설계되어 있습니다.
