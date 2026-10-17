import { STEPS, TOTAL_MINUTES } from '../content/steps';
import { ERRORS } from '../content/errors';
import { LINKS } from '../content/links';
import { DATA_SPEC, API_RULES, DISPLAY_RULES, RECOVERY_COMMON, WRANGLER_TOML, ROUTES_JSON, ALL_PROMPTS, PROMPT_13, PROMPT_DESIGN } from '../content/prompts';
import { CopyCard } from './CopyCard';
import { Mockup } from './Mockup';
import { ArchDiagram, DeployFlow, Glossary, ScenarioFlow, TwoResults } from './Diagrams';

const sumMinutes = (from: number, to: number) =>
  STEPS.filter((s) => s.id >= from && s.id <= to).reduce((a, s) => a + s.minutes, 0);

export function SessionPlan() {
  return (
    <div className="table-wrap" role="region" aria-label="두 차시 운영안" tabIndex={0}>
      <table>
        <caption>초보자용 두 차시 운영안 (단계 시간 합 {TOTAL_MINUTES}분 + 휴식·여유)</caption>
        <thead>
          <tr><th scope="col">구분</th><th scope="col">단계</th><th scope="col">단계 시간</th><th scope="col">끝났을 때 상태</th></tr>
        </thead>
        <tbody>
          <tr><th scope="row">사전 과제</th><td>계정 4개 준비·기관 정책 확인·서울시 인증키 신청</td><td>연수 전</td><td>네 서비스에 로그인 가능, 키 신청 완료</td></tr>
          <tr><th scope="row">1차시</th><td>0~6단계</td><td>{sumMinutes(0, 6)}분 + 휴식 10분</td><td>공개 주소에서 가상 모드 화면과 /api/culture 응답 확인</td></tr>
          <tr><th scope="row">2차시</th><td>7~13단계</td><td>{sumMinutes(7, 13)}분 + 휴식 10분</td><td>실제 자료 조회·검색·지도·비교·출력·재배포 완료</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export function IntroPage() {
  return (
    <article aria-labelledby="intro-title">
      <header className="step-head">
        <p className="eyebrow">시작 안내</p>
        <h2 id="intro-title">창체·동아리 문화활동 큐레이터 만들기</h2>
        <p className="lead">공공 문화행사 자료를 읽고, 조건에 맞는 후보를 비교하고, 학생 안내문 초안까지 만드는 업무용 웹앱을 직접 만들어 공개합니다.</p>
      </header>

      <dl className="facts">
        <div><dt>대상</dt><dd>창체·동아리 담당 교사, 코딩 경험이 없어도 됩니다</dd></div>
        <div><dt>준비물</dt><dd>노트북(크롬·엣지), Google·GitHub·Cloudflare·서울 열린데이터광장 계정, 휴대전화(화면 확인용)</dd></div>
        <div><dt>소요시간</dt><dd>단계 시간 합 {TOTAL_MINUTES}분 · 휴식 포함 약 240~270분 · 두 차시 권장</dd></div>
        <div><dt>비용</dt><dd>각 서비스의 현재 무료 요금제 한도 안에서 진행(무제한·영구 무료를 보장하지 않음)</dd></div>
      </dl>

      <section className="block">
        <h3>기본판 완성 모습</h3>
        <Mockup />
        <ScenarioFlow />
      </section>

      <section className="block">
        <h3>두 가지 결과물을 구분합니다</h3>
        <TwoResults />
      </section>

      <section className="block">
        <h3>제작 도구와 경로</h3>
        <DeployFlow highlight="all" />
        <p>제작은 Google AI Studio Build, 원본 저장은 GitHub, 배포는 Cloudflare Pages, 서버 API 중계는 Cloudflare Pages Functions가 맡습니다. 참가자 앱은 React + Vite + TypeScript와 Leaflet 지도를 씁니다. 기본 과정에는 Gemini 호출, 유료 지도 API, DB, 회원가입, 학교 계정 연동을 넣지 않습니다.</p>
      </section>

      <section className="block">
        <h3>연수 목표</h3>
        <ol>
          <li>공공자료 해석 — 원문 필드의 의미와 비어 있는 값을 읽는다.</li>
          <li>데이터의 한계 확인 — 행사 기간 ≠ 운영일, 대상 원문 ≠ 자동 판정, 일부 조회 ≠ 전체.</li>
          <li>업무 흐름 설계 — 조회 → 비교 → 교사 판단 → 문서 출력.</li>
          <li>AI 코드 검토 — AI가 만든 결과를 경계 사례로 직접 확인한다.</li>
          <li>공개 배포 — GitHub와 Cloudflare Pages로 같은 주소에 다시 배포한다.</li>
        </ol>
      </section>

      <section className="block">
        <h3>운영안</h3>
        <SessionPlan />
        <p className="small">인증키 발급이 늦어지거나 서울시 API에 장애가 있으면 가상 모드로 화면 실습을 이어 가고, 실제 연결 단계는 미완료로 남깁니다.</p>
      </section>

      <section className="block">
        <h3>이 페이지에 저장되는 것</h3>
        <p>6·13단계에서 적는 <strong>내 앱 공개 주소</strong> 하나만 이 브라우저에 저장됩니다. 같은 기기·같은 브라우저에서만 다시 보이며, 저장이 안 되는 환경에서도 읽기·복사·단계 이동은 그대로 됩니다.</p>
      </section>

      <section className="block">
        <h3>용어</h3>
        <Glossary />
      </section>
    </article>
  );
}

export function ErrorsPage() {
  return (
    <article aria-labelledby="errors-title">
      <header className="step-head">
        <p className="eyebrow">도움말</p>
        <h2 id="errors-title">공통 오류 도움말</h2>
        <p className="lead">증상을 찾아 ‘확인할 것’을 순서대로 보고, 그래도 안 되면 복구 프롬프트를 AI Studio에 넣습니다.</p>
      </header>
      <div className="callout warn">
        <strong>오류 로그를 붙이기 전에</strong>
        <p>인증키가 들어간 URL(예: <code>openapi.seoul.go.kr:8088/실제키/…</code>)은 먼저 <code>[KEY 가림]</code>으로 바꿉니다. 키를 AI 대화, 메신저, 화면 공유에 노출하지 않습니다.</p>
      </div>
      <CopyCard item={RECOVERY_COMMON} />
      {ERRORS.map((e) => (
        <section key={e.id} className="block error-item" aria-labelledby={`${e.id}-t`}>
          <h3 id={`${e.id}-t`}>{e.symptom} <span className="pill">{e.stage}</span></h3>
          <p className="small">확인할 것</p>
          <ol>{e.checks.map((c, i) => <li key={i}>{c}</li>)}</ol>
          <CopyCard item={{ id: e.id, title: `복구 프롬프트 — ${e.symptom}`, kind: 'prompt', body: e.prompt }} />
        </section>
      ))}
    </article>
  );
}

export function ReferencePage() {
  return (
    <article aria-labelledby="ref-title">
      <header className="step-head">
        <p className="eyebrow">참고자료</p>
        <h2 id="ref-title">데이터 규칙·설정 파일·프롬프트 모음</h2>
        <p className="lead">각 단계에 들어 있는 내용을 한곳에 모았습니다. 2026-10-16에 확인한 명세 기준이며, 바뀐 항목은 공식 자료와 실제 응답을 대조해 기록합니다.</p>
      </header>
      <section className="block">
        <h3>참가자 앱 구조</h3>
        <ArchDiagram />
      </section>
      <section className="block">
        <h3>데이터 명세와 규칙</h3>
        <CopyCard item={{ id: 'ref-spec', title: '서울시 문화행사 정보 — 데이터 명세와 해석 규칙', kind: 'text', body: DATA_SPEC }} />
        <CopyCard item={{ id: 'ref-api', title: '원천 API 응답 규칙', kind: 'text', body: API_RULES }} />
        <CopyCard item={{ id: 'ref-display', title: '원자료 표시 공통 규칙', kind: 'text', body: DISPLAY_RULES }} />
      </section>
      <section className="block">
        <h3>설정 파일</h3>
        <CopyCard item={WRANGLER_TOML} />
        <CopyCard item={ROUTES_JSON} />
        <p className="small">키는 Cloudflare Secret <code>SEOUL_OPEN_API_KEY</code>로만 관리하고 함수가 <code>context.env.SEOUL_OPEN_API_KEY</code>로 읽습니다. Vite 환경변수(VITE_)에 넣지 않습니다.</p>
      </section>
      <section className="block">
        <h3>프롬프트 전체</h3>
        {[...ALL_PROMPTS, PROMPT_DESIGN, PROMPT_13].map((p) => <CopyCard key={p.id} item={{ ...p, id: `ref-${p.id}` }} />)}
      </section>
      <section className="block">
        <h3>공식 문서</h3>
        <ul className="docs">
          {Object.values(LINKS).map((l) => (
            <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a> <span className="url">{l.url}</span></li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export function InstructorPage() {
  return (
    <article aria-labelledby="inst-title">
      <header className="step-head">
        <p className="eyebrow">강사용</p>
        <h2 id="inst-title">강의안 배포와 연수 전 확인</h2>
      </header>
      <section className="block">
        <h3>이 강의안을 배포하는 방법</h3>
        <ol className="procedure">
          <li>이 강의안 코드를 <code>school-culture-curator-workshop-guide</code>라는 별도 GitHub 저장소에 올립니다. 참가자 앱 저장소와 섞지 않습니다.</li>
          <li>Cloudflare 대시보드 → Workers &amp; Pages → Create application → Pages → Import an existing Git repository에서 이 저장소를 연결합니다.</li>
          <li>Build command <code>npm run build</code>, Build output directory <code>dist</code>, 환경변수 없음으로 배포합니다.</li>
          <li>발급된 강의안 공개 주소를 참가자에게 전달합니다.</li>
        </ol>
        <p>강의안에는 키 입력 폼이나 공공 API 실시간 테스트가 없습니다. 참가자 앱의 functions·Secret 설정은 ‘복사할 실습 내용’으로만 들어 있고, 강의안 자체의 서버 기능으로 설치되지 않습니다.</p>
      </section>
      <section className="block">
        <h3>연수 전 확인</h3>
        <ul>
          <li>별도의 참가자 앱 시험본을 직접 만들어, 실제 키로 /api/culture 응답·500건 페이지 읽기·Cloudflare 통신을 확인합니다. sample 5건과 문서 확인만으로 실제 키의 페이지 처리·호스팅 통신 성공을 단정하지 않습니다.</li>
          <li>AI Studio·GitHub·Cloudflare·서울 열린데이터광장의 메뉴 이름이 이 강의안 설명과 같은지 확인하고, 바뀐 부분은 연수 시작 때 구두로 안내합니다.</li>
          <li>각 서비스의 무료 요금제 한도와 서울시 API 승인 조건을 공식 문서에서 확인합니다.</li>
          <li>참가자의 학교 계정 정책(외부 서비스 가입 허용 여부)을 사전 과제로 확인하게 합니다.</li>
        </ul>
      </section>
      <section className="block">
        <h3>API 장애 시 운영</h3>
        <p>명시적인 가상 모드로 UI 실습(8~11단계)을 진행하고, 실제 연결 단계(6단계 11번, 7단계)는 미완료로 남깁니다. “가상 자료로 대체했으니 API 연결 성공”이라고 설명하지 않습니다.</p>
      </section>
      <section className="block">
        <h3>운영안</h3>
        <SessionPlan />
      </section>
    </article>
  );
}
