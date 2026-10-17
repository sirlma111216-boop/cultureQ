// 실제 스크린샷 대신 쓰는 설명용 도식들. 외부 서비스 화면을 흉내 내지 않고 흐름만 보여 준다.

function Arrow() {
  return <span className="arrow" aria-hidden="true">→</span>;
}

export function TwoResults() {
  return (
    <div className="two-results">
      <div className="result-card guide">
        <span className="tag">결과물 ① 지금 보는 페이지</span>
        <h4>연수 강의안</h4>
        <p>단계별 설명과 복사할 프롬프트를 담은 <strong>읽는 페이지</strong>입니다. 공공 API를 호출하지 않고 인증키를 받지 않습니다.</p>
        <p className="small">저장소: <code>school-culture-curator-workshop-guide</code></p>
      </div>
      <div className="result-card app">
        <span className="tag">결과물 ② 내가 만드는 것</span>
        <h4>‘우리 반 문화나들이’ 앱</h4>
        <p>내 AI Studio 프로젝트에 프롬프트를 넣어 만들고, GitHub에 저장해 Cloudflare Pages로 공개하는 <strong>내 앱</strong>입니다.</p>
        <p className="small">저장소: <code>school-culture-curator</code></p>
      </div>
    </div>
  );
}

export function ScenarioFlow() {
  const steps = ['자료 읽기', '조건으로 후보 찾기', '지도·달력 확인', '최대 4개 비교', '교사 확인사항 작성', '안내문 초안 인쇄'];
  return (
    <ol className="flow" aria-label="완성 앱의 사용 흐름">
      {steps.map((s, i) => (
        <li key={s}>
          <span className="flow-no">{i + 1}</span>
          {s}
        </li>
      ))}
    </ol>
  );
}

export function ArchDiagram() {
  return (
    <figure className="diagram">
      <figcaption>참가자 앱의 자료 흐름 — 모두 같은 사이트(…pages.dev) 안에서 일어납니다</figcaption>
      <div className="arch">
        <div className="node browser"><strong>화면</strong><span>브라우저 · src</span></div>
        <Arrow />
        <div className="node"><strong>/api/culture</strong><span>같은 사이트 주소</span></div>
        <Arrow />
        <div className="node fn"><strong>functions/api/culture.ts</strong><span>키 보관 · 중계 창구</span></div>
        <Arrow />
        <div className="node ext"><strong>서울시 Open API</strong><span>openapi.seoul.go.kr:8088</span></div>
        <Arrow />
        <div className="node"><strong>정리한 JSON</strong><span>items · total · fetchedAt</span></div>
        <Arrow />
        <div className="node browser"><strong>화면</strong><span>목록 · 지도 · 비교</span></div>
      </div>
      <p className="small">인증키는 Cloudflare Secret <code>SEOUL_OPEN_API_KEY</code>에만 있고, 함수가 <code>context.env</code>에서 읽습니다. 브라우저는 키도, 서울시 주소도 모릅니다.</p>
    </figure>
  );
}

export function DeployFlow({ highlight }: { highlight: 'github' | 'cloudflare' | 'all' }) {
  const on = (k: 'github' | 'cloudflare') => (highlight === 'all' || highlight === k ? ' on' : '');
  return (
    <figure className="diagram">
      <figcaption>코드가 공개 주소가 되기까지</figcaption>
      <div className="arch">
        <div className={`node${highlight === 'all' ? ' on' : ''}`}><strong>AI Studio Build</strong><span>코드 만들기·수정</span></div>
        <Arrow />
        <div className={`node${on('github')}`}><strong>GitHub</strong><span>코드 원본 저장소</span></div>
        <Arrow />
        <div className={`node${on('cloudflare')}`}><strong>Cloudflare Pages</strong><span>빌드(npm run build → dist)</span></div>
        <Arrow />
        <div className={`node${on('cloudflare')}`}><strong>공개 주소</strong><span>https://…pages.dev</span></div>
      </div>
      <p className="small">AI Studio 자체의 배포 기능과는 다른 경로입니다. AI Studio의 Node 서버가 Cloudflare에서 그대로 실행되지 않습니다.</p>
    </figure>
  );
}

export function CasesTable() {
  const rows: [string, string, string][] = [
    ['C1', '기준일 하루 전 ~ 3일 뒤, 무료 전시, 좌표 있음, 대상 ‘누구나’, 휴관 여부 확인 필요', '기간 겹침 포함, 무료 분류, 지도 표시'],
    ['C2', '기준일 당일 유료 공연, 대상 ‘만 13세 이상’, 시간 ‘19:30’, 좌석별 가격 두 가지', '대상 원문 표시(자동 판정 없음), 요금 원문 그대로'],
    ['C3', '기준일 이틀 전에 끝난 무료 행사', '종료 행사 구분, 날짜 필터에서 빠짐'],
    ['C4', '기준일 7~10일 뒤, 유무료·요금·대상·좌표 미제공', '‘미제공/미확인’ 표시, 지도에서만 제외, ‘무료만’에서 빠짐'],
    ['C5', '기준일 1~8일 뒤 전시, 시간 원문 ‘월요일 휴관’', '기간이 겹쳐도 운영 확정하지 않음, 원문 유지'],
    ['C6', 'C1과 제목이 같지만 장소·시작일이 다른 별도 행사', '같은 제목이어도 합치지 않음(중복 제거가 과하지 않음)'],
  ];
  return (
    <div className="table-wrap" role="region" aria-label="업무별 가상 사례 6개" tabIndex={0}>
      <table>
        <caption>업무별 가상 사례 6개 — 이름은 모두 ‘연수용 가상’으로 시작</caption>
        <thead>
          <tr><th scope="col">사례</th><th scope="col">조건</th><th scope="col">확인할 점</th></tr>
        </thead>
        <tbody>
          {rows.map(([id, cond, check]) => (
            <tr key={id}><th scope="row">{id}</th><td>{cond}</td><td>{check}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FileTree() {
  return (
    <figure className="diagram">
      <figcaption>참가자 앱 프로젝트의 최상위 구조(필요한 부분만)</figcaption>
      <pre className="tree" aria-label="파일 구조">{`school-culture-curator/
├─ package.json
├─ index.html
├─ wrangler.toml            ← Pages 설정
├─ functions/
│  └─ api/
│     └─ culture.ts         ← 서버 중계 함수 (src·dist 밖!)
├─ public/
│  └─ _routes.json          ← /api/* 만 함수로
└─ src/
   ├─ (화면 컴포넌트)
   └─ (data: adapter·필터·날짜 함수)`}</pre>
    </figure>
  );
}

export function MenuPath({ path }: { path: string[] }) {
  return (
    <p className="menu-path">
      <span className="small">메뉴 경로</span>
      {path.map((p, i) => (
        <span key={p}>
          {i > 0 && <span aria-hidden="true"> › </span>}
          <kbd>{p}</kbd>
        </span>
      ))}
    </p>
  );
}

export function Glossary() {
  const terms: [string, string][] = [
    ['API', '다른 기관의 데이터를 약속된 주소로 요청하는 방법'],
    ['서버 함수', '키를 보관하고 대신 자료를 받아오는 중계 창구'],
    ['GitHub', '코드 원본 저장소'],
    ['빌드', '공개할 웹 파일로 묶는 과정'],
    ['Secret', 'Cloudflare에 숨겨 저장하는 값. 코드와 화면에 드러나지 않음'],
    ['배포', '빌드한 파일을 누구나 열 수 있는 주소에 올리는 것'],
  ];
  return (
    <dl className="glossary">
      {terms.map(([t, d]) => (
        <div key={t}>
          <dt>{t}</dt>
          <dd>{d}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ErrorTriage() {
  return (
    <div className="callout warn">
      <strong>오류 판별 순서 (/api/culture 응답 기준)</strong>
      <ol>
        <li><code>CONFIG_REQUIRED</code> → Secret 이름 <code>SEOUL_OPEN_API_KEY</code> → 등록한 환경(Production/Preview) → 재배포 여부</li>
        <li>인증 오류(<code>INFO-100</code>) → 서울 열린데이터광장 키가 맞는지, 사용 가능한 상태인지</li>
        <li>외부 연결 오류(<code>UPSTREAM_ERROR</code>) → 원천 주소 → 서비스명 <code>culturalEventInfo</code> → 포트 8088 → 호환성 날짜·플래그 → 제공기관 상태</li>
        <li>JSON 대신 앱 화면(HTML)이 나옴 → 함수 위치와 배포 로그의 Functions 인식 여부</li>
      </ol>
      <p className="small">어느 경우에도 브라우저가 서울시 주소를 직접 부르게 바꾸거나 키를 공개하는 우회는 하지 않습니다. 자세한 복구 프롬프트는 ‘오류 도움말’에 있습니다.</p>
    </div>
  );
}

export function DesignMdGuide() {
  return (
    <div className="callout design">
      <strong>선택 활동 — getdesign.md로 디자인 스타일 일괄 바꾸기 (약 10분)</strong>
      <p>
        기능을 모두 완성하고 <strong>GitHub에 올리기 전</strong>이 디자인을 바꾸기 좋은 때입니다.
        <a href="https://getdesign.md/" target="_blank" rel="noopener noreferrer"> getdesign.md ↗</a>는 여러 웹사이트의 디자인 규칙(색·글꼴·간격·버튼·카드 모양과 그 이유)을
        <code>DESIGN.md</code>라는 문서 한 장으로 정리해 모아 둔 카탈로그입니다. 이 문서를 AI에게 주면 화면 전체의 스타일을 한 번에 바꿀 수 있습니다.
      </p>
      <ol>
        <li>getdesign.md를 열고 사이트 목록(Website catalog)을 훑어봅니다. 각 카드의 한 줄 설명(예: 색감·분위기)을 보고 마음에 드는 스타일 2~3개를 고릅니다.</li>
        <li>카드를 눌러 상세 페이지에서 미리보기와 규칙을 읽고, 교사·학생이 읽기 편한 밝고 대비가 분명한 스타일을 하나 정합니다.</li>
        <li><kbd>Download DESIGN.md</kbd> 버튼으로 파일을 내려받습니다. (<kbd>SAVE</kbd>는 즐겨찾기 버튼입니다.)</li>
        <li>내려받은 DESIGN.md를 메모장으로 열고 Ctrl+A → Ctrl+C로 전체 복사합니다.</li>
        <li>아래 ‘선택 프롬프트’를 복사해 AI Studio 입력창에 붙이고, 그 맨 아래에 DESIGN.md 전문을 이어 붙여 실행합니다.</li>
        <li>미리보기에서 C1~C6, 필터, 지도, 비교함, 인쇄 미리보기가 그대로 동작하는지 확인한 뒤 GitHub에 올립니다. 마음에 들지 않으면 “디자인 변경 전으로 되돌려 줘”라고 요청합니다.</li>
      </ol>
      <p className="small">
        주의: DESIGN.md는 공개된 사이트를 관찰해 만든 참고 자료이며 해당 기업과 무관합니다. 로고·상표·이미지는 앱에 넣지 말고 색과 배치 원칙만 참고합니다.
        일부 항목은 유료 상품(맞춤 제작 등)이 있으니 무료로 내려받을 수 있는 것만 쓰고, 이용 조건은 사이트의 Terms에서 확인합니다.
        터미널을 쓰는 강사는 프로젝트 루트에서 <code>npx getdesign@latest add 스타일이름</code>으로도 받을 수 있습니다.
      </p>
    </div>
  );
}
