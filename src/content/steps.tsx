import type { ReactNode } from 'react';
import { LINKS, type DocLink } from './links';
import {
  PROMPT_01, PROMPT_02, PROMPT_03, PROMPT_04, PROMPT_05, PROMPT_06, PROMPT_07, PROMPT_08, PROMPT_09, PROMPT_13,
  PROMPT_DESIGN, WRANGLER_TOML, ROUTES_JSON, type CopyItem,
} from './prompts';
import {
  TwoResults, ScenarioFlow, ArchDiagram, DeployFlow, CasesTable, FileTree, MenuPath, Glossary, ErrorTriage, DesignMdGuide,
} from '../components/Diagrams';
import { CopyCard } from '../components/CopyCard';
import { AppUrlField } from '../components/AppUrlField';

export interface Stuck {
  q: string;
  a: string;
}

export interface Step {
  id: number;
  title: string;
  minutes: number;
  goal: string;
  sites: DocLink[];
  /** 목표 아래에 붙는 설명·도식 */
  extra?: ReactNode;
  /** 한 행동씩. 백틱(`)으로 감싼 부분은 코드로 표시된다. */
  procedure: string[];
  copies?: CopyItem[];
  /** 복사 카드 뒤에 붙는 보충 내용 */
  after?: ReactNode;
  expected: string[];
  tryIt: string[];
  stuck: Stuck[];
  success: string;
  docs: DocLink[];
}

export const STEPS: Step[] = [
  {
    id: 0,
    title: '목표와 계정 준비',
    minutes: 10,
    goal: '오늘 만드는 앱이 어떤 업무 문제를 푸는지 이해하고, 실습에 필요한 네 가지 계정에 로그인할 수 있는지 확인합니다.',
    sites: [LINKS.aiStudio, LINKS.github, LINKS.cfDash, LINKS.dataset],
    extra: (
      <>
        <TwoResults />
        <h4>교사의 질문</h4>
        <p className="quote">“다음 달 동아리 활동일에 볼 수 있는 전시·공연을 찾아 세 곳을 비교하고 학생 안내문을 만들 수 있을까?”</p>
        <ScenarioFlow />
        <p>핵심은 행사 목록이 아니라 <strong>행사 기간과 실제 회차의 차이</strong>, <strong>이용대상 조건</strong>, <strong>단체 관람 확인</strong>, <strong>교사의 선택 이유</strong>를 함께 보는 것입니다. 앱은 공연 예약·결제를 하지 않습니다.</p>
        <Glossary />
      </>
    ),
    procedure: [
      '위의 ‘두 결과물’ 설명을 읽고, 이 강의안 페이지와 내가 만들 ‘우리 반 문화나들이’ 앱이 서로 다르다는 것을 확인합니다.',
      'Google AI Studio, GitHub, Cloudflare, 서울 열린데이터광장에 차례로 로그인되는지 확인합니다. 새 탭에서 열고, 로그인이 안 되면 강사에게 알립니다.',
      '완성 시나리오(조회 → 비교 → 교사 판단 → 문서 출력)를 읽고 각 단계에서 교사가 직접 판단하는 지점을 짚어 봅니다.',
      '실습에서는 학생 이름·학번을 쓰지 않습니다. 교사가 만든 활동명과 메모만 사용합니다.',
      '“키 발급은 1단계, 키 입력은 Cloudflare 설정 단계(6단계)”라는 순서를 기억합니다. 그 사이 어디에도 키를 붙여 넣지 않습니다.',
    ],
    expected: [
      '네 서비스 모두 로그인된 화면을 볼 수 있습니다.',
      '강의안(읽는 페이지)과 참가자 앱(내가 만드는 앱)의 차이를 한 문장으로 말할 수 있습니다.',
    ],
    tryIt: [
      '옆 사람에게 “API 키는 어디에 넣나요?”라고 물었을 때 “Cloudflare의 Secret 설정에만 넣는다”고 답할 수 있는지 확인합니다.',
    ],
    stuck: [
      { q: '학교 계정으로 GitHub·Cloudflare 가입이 막혀 있어요.', a: '기관 정책을 먼저 확인합니다. 허용되지 않으면 개인 계정을 쓸지 연수 담당자와 정하고, 개인정보가 들어가지 않게 실습합니다.' },
      { q: '서울 열린데이터광장 회원가입 절차가 길어요.', a: '가입과 키 신청은 사전 과제입니다. 오늘 발급이 늦어져도 2~5단계는 가상 자료로 계속할 수 있습니다.' },
    ],
    success: '오늘 만들 앱의 흐름과 계정 네 개의 역할을 설명할 수 있다.',
    docs: [LINKS.aiStudioDocs, LINKS.seoulGuide],
  },
  {
    id: 1,
    title: '데이터 페이지와 인증키 준비',
    minutes: 15,
    goal: '공식 데이터 페이지에서 서비스명과 출력 항목을 확인하고, 서울 열린데이터광장 Open API 인증키를 신청합니다.',
    sites: [LINKS.dataset, LINKS.seoulGuide],
    extra: (
      <div className="callout warn">
        <strong>인증키 주의</strong>
        <p>이 키는 공공데이터포털(data.go.kr) 키가 아니라 <strong>서울 열린데이터광장</strong>에서 발급받는 Open API 키입니다. 키는 본인의 키 관리 화면에만 두고, 이 강의안·AI 대화창·GitHub·카카오톡 등에 붙여 넣지 않습니다.</p>
      </div>
    ),
    procedure: [
      '공식 데이터 페이지를 열고 제목이 ‘서울시 문화행사 정보’, 데이터 번호가 OA-15486인지, 제공기관이 어디인지 확인합니다.',
      '페이지의 ‘Open API’ 탭을 선택하고 요청 주소, 서비스명 `culturalEventInfo`, 출력 항목(TITLE, CODENAME, GUNAME, STRTDATE, END_DATE, LOT, LAT 등)을 읽습니다.',
      '‘인증키 신청’ 버튼 또는 계정의 인증키 관리 메뉴로 이동합니다. 현재 화면이 요구하는 서비스(사용) 환경·활용 목적을 사실대로 적고 신청합니다. 예: “교사 연수 실습 — 학교 문화활동 후보 검색 앱”.',
      '발급 여부는 본인이 인증키 관리 화면에서 확인합니다. 키는 그 화면에 그대로 두고 복사해 다른 곳에 보관하지 않습니다.',
      'Open API 탭의 sample 예시 주소를 눌러 처음 5건의 구조를 확인합니다. 이 5건이 최신 자료이거나 전체 검색 결과라고 생각하지 않습니다.',
      '응답에서 `RESULT.CODE`(정상 `INFO-000`), `list_total_count`(전체 건수), `row`(행 배열), 날짜 필드(`STRTDATE`, `END_DATE`, `DATE`), 위치 필드(`LOT`=경도, `LAT`=위도)를 찾아봅니다.',
      '발급이 지연되어도 2~5단계는 가상 자료로 계속 진행합니다. 실제 API 연결 확인은 6~7단계에서 합니다.',
    ],
    expected: [
      'sample 응답에서 전체 건수와 5개 행을 볼 수 있습니다.',
      '인증키 관리 화면에 신청 내역(또는 발급된 키)이 보입니다.',
    ],
    tryIt: [
      'sample 응답의 한 행에서 LOT 값과 LAT 값을 읽고, 어느 쪽이 경도(약 126~127)이고 어느 쪽이 위도(약 37)인지 말해 봅니다.',
      'IS_FREE, USE_FEE, USE_TRGT가 비어 있는 행이 있는지 찾아봅니다. 빈 값은 ‘무료’가 아니라 ‘미제공’입니다.',
    ],
    stuck: [
      { q: '인증키 신청 버튼이 안 보여요.', a: '로그인 상태인지 확인하고, 이용 안내 페이지의 ‘인증키 신청’ 경로를 따라갑니다. 메뉴 이름이 바뀌었으면 ‘Open API 인증키’를 기준으로 찾습니다.' },
      { q: 'sample 주소로 6번째 이후가 안 나와요.', a: '정상입니다. sample 키는 구조 확인용으로 첫 1~5건만 줍니다. 전체 조회는 발급받은 키로 서버 함수가 합니다.' },
      { q: '브라우저에 JSON이 한 줄로 길게 보여 읽기 어려워요.', a: '브라우저의 ‘자동 서식(pretty print)’ 옵션을 켜거나, 필드명(예: TITLE)을 Ctrl+F로 찾아 읽습니다.' },
    ],
    success: '데이터의 이름·서비스명·키를 보관할 곳을 설명할 수 있다.',
    docs: [LINKS.dataset, LINKS.seoulGuide],
  },
  {
    id: 2,
    title: '앱의 화면 뼈대',
    minutes: 15,
    goal: 'AI Studio Build에서 새 프로젝트를 만들고 ‘우리 반 문화나들이’의 화면 뼈대를 생성합니다.',
    sites: [LINKS.aiStudio],
    extra: <MenuPath path={['aistudio.google.com', 'Build', '새 앱(프롬프트 입력창)']} />,
    procedure: [
      'AI Studio에 접속해 왼쪽 메뉴에서 Build를 열고 새 앱 입력창을 엽니다.',
      '아래 ‘프롬프트 01’ 카드의 ‘전문 복사’를 누른 뒤 입력창에 붙여 넣고 실행합니다.',
      '미리보기가 생성될 때까지 기다립니다(1~3분). 중간에 다른 프롬프트를 넣지 않습니다.',
      '미리보기 폭을 모바일로 바꾸거나 창을 좁혀 필터·목록·상세 영역이 한 열로 쌓이는지 확인합니다.',
      '이 프로젝트 이름을 기억합니다. 이후 프롬프트 02~09는 모두 같은 프로젝트에 이어서 입력합니다.',
    ],
    copies: [PROMPT_01],
    expected: [
      '상단에 앱 이름·자료 모드·조회시각 자리, 왼쪽 검색 조건, 가운데 목록/지도/달력 탭, 오른쪽 상세, 하단 비교함이 보입니다.',
      '자료가 없다는 빈 상태 문구와 ‘준비 중’ 표시가 보입니다.',
    ],
    tryIt: [
      '지도·달력 탭을 눌러 ‘준비 중’으로 표시되는지 확인합니다.',
      '화면 어디에도 인증키 입력칸이 없는지 확인합니다.',
    ],
    stuck: [
      { q: 'AI가 Gemini 호출이나 로그인 기능을 넣었어요.', a: '“생성형 API·로그인·DB 기능을 제거하고 프롬프트 01의 범위만 유지해 줘”라고 이어서 입력합니다.' },
      { q: '미리보기가 빈 화면이에요.', a: '미리보기의 오류 표시나 콘솔 오류를 확인하고, 오류 문구를 그대로 붙여 “이 오류를 고쳐 줘. 기능은 유지해 줘”라고 요청합니다.' },
    ],
    success: '준비 중인 기능은 준비 중으로 표시되고, 화면만으로 사용 흐름을 이해할 수 있다.',
    docs: [LINKS.aiStudioDocs],
  },
  {
    id: 3,
    title: '가상 자료로 작동 확인',
    minutes: 15,
    goal: '실제 API 없이도 앱을 시험할 수 있도록, 예외 상황을 일부러 담은 가상 자료 6개와 자료 접근 구조(adapter)를 만듭니다.',
    sites: [LINKS.aiStudio],
    extra: <CasesTable />,
    procedure: [
      '아래 ‘프롬프트 02’를 복사해 같은 AI Studio 프로젝트에 입력합니다. 데이터 명세 전문이 카드 안에 이미 들어 있습니다.',
      '생성이 끝나면 시연 기준일을 오늘 날짜로 두고, 위 표의 C1부터 C6까지 한 개씩 열어 ‘확인할 점’을 봅니다.',
      '목록·상세·지도·달력·비교함 탭을 차례로 눌러 ‘연수용 가상 자료’ 배지가 모든 보기에서 유지되는지 확인합니다.',
      '실제 API 모드로 바꾸려 할 때 ‘서버 함수 연결 후 사용 가능’처럼 안내되고, 가상 자료로 몰래 바뀌지 않는지 확인합니다.',
    ],
    copies: [PROMPT_02],
    expected: [
      '가상 행사 6개가 모두 ‘연수용 가상’으로 시작하는 이름으로 보입니다.',
      'C4는 유무료·요금·대상이 ‘미제공/미확인’으로, 지도에서는 제외된 것으로 표시됩니다.',
      'C1과 C6은 제목이 같아도 두 개의 별도 항목으로 남아 있습니다.',
    ],
    tryIt: [
      '시연 기준일을 일주일 뒤로 바꿔 C1·C3의 종료 여부 표시가 바뀌는지 확인합니다.',
      'C5 상세에서 ‘월요일 휴관’ 원문이 그대로 보이는지 확인합니다.',
    ],
    stuck: [
      { q: '가상 자료에 실제 미술관 이름이나 홈페이지 주소가 생겼어요.', a: '“가상 자료의 이름은 모두 ‘연수용 가상’으로 시작하고, 원문 링크와 이미지는 없음으로 표시해 줘. 실제 기관 이름과 가짜 URL을 지워 줘”라고 요청합니다.' },
      { q: 'C1과 C6이 하나로 합쳐졌어요.', a: '“중복 키는 cultcode → 정규화한 원문 URL → 제목+장소+시작일+종료일 순서로 만들고, 같은 제목만으로 합치지 마”라고 요청합니다.' },
    ],
    success: '날짜와 좌표가 없거나 내용이 길어도 목록·상세가 깨지지 않는다.',
    docs: [LINKS.dataset],
  },
  {
    id: 4,
    title: '서버 중계 함수 만들기',
    minutes: 20,
    goal: '인증키를 브라우저에 노출하지 않고 서울시 자료를 받아 오는 중계 창구(Cloudflare Pages Functions)와 배포 설정 파일을 만듭니다.',
    sites: [LINKS.aiStudio],
    extra: (
      <>
        <ArchDiagram />
        <FileTree />
      </>
    ),
    procedure: [
      '아래 ‘프롬프트 03’을 복사해 같은 AI Studio 프로젝트에 입력합니다.',
      'AI Studio의 코드(파일) 보기에서 프로젝트 최상위에 `functions/api/culture.ts`, `wrangler.toml`, `public/_routes.json`이 생겼는지 확인합니다. `functions`가 `src`나 `dist` 안에 있으면 안 됩니다.',
      '`wrangler.toml`과 `public/_routes.json`의 내용을 아래 참고 카드와 비교합니다. 다르면 참고 카드 내용으로 맞춰 달라고 요청합니다.',
      '`functions/api/culture.ts`에서 `context.env.SEOUL_OPEN_API_KEY`로 키를 읽는지, 코드 어디에도 실제 키 문자열이 없는지 확인합니다.',
      'AI Studio 미리보기에서는 계속 가상 모드로 확인합니다. 이 미리보기가 Pages Functions를 실행한다고 가정하지 않습니다.',
    ],
    copies: [PROMPT_03, WRANGLER_TOML, ROUTES_JSON],
    after: (
      <div className="callout">
        <strong>왜 포트 8088과 allow_custom_ports인가요?</strong>
        <p>서울시 공식 요청 형식은 <code>http://openapi.seoul.go.kr:8088/…</code>입니다. Cloudflare 함수가 사용자 지정 포트로 요청하려면 호환성 설정이 필요할 수 있어 <code>allow_custom_ports</code>를 명시합니다. 실제 접근 가능 여부는 6단계 배포 후 확인합니다. <code>compatibility_date</code>를 무심코 과거 날짜로 바꾸거나 <code>ignore_custom_ports</code>를 넣지 않습니다.</p>
        <p>브라우저→Cloudflare 구간은 HTTPS지만, 서울시 원천 주소가 HTTP이므로 Cloudflare→서울시 구간은 암호화되지 않습니다. 그래서 연수용 별도 키를 쓰고, 기관 정책상 HTTPS 원천만 허용된다면 제공기관이 실제로 지원하는 주소를 확인한 뒤 전환합니다.</p>
      </div>
    ),
    expected: [
      '세 파일이 프로젝트 최상위 기준 경로에 있습니다.',
      '코드에 실제 키가 없고, 키는 SEOUL_OPEN_API_KEY라는 이름으로만 등장합니다.',
      '미리보기는 여전히 가상 모드로 작동합니다.',
    ],
    tryIt: [
      'AI Studio 코드 검색에서 `openapi.seoul.go.kr`를 찾아 `functions` 폴더 안에만 있는지 확인합니다(화면 코드 `src`에 있으면 안 됨).',
      '`VITE_`로 시작하는 변수에 키가 들어가 있지 않은지 확인합니다.',
    ],
    stuck: [
      { q: 'AI가 Express 서버나 server.js를 만들었어요.', a: '“Node 서버·Express를 제거하고 Cloudflare Pages Functions(functions/api/culture.ts의 onRequestGet)만 사용해 줘”라고 요청합니다. AI Studio의 Node 서버는 Cloudflare에서 그대로 실행되지 않습니다.' },
      { q: '_routes.json이 dist에 복사되는지 모르겠어요.', a: 'Vite는 public 폴더의 파일을 빌드 시 dist로 그대로 복사합니다. 파일이 public 바로 아래에 있는지만 확인합니다.' },
      { q: '미리보기에서 /api/culture를 열면 HTML이 나와요.', a: '정상입니다. AI Studio 미리보기는 Pages Functions를 실행하지 않습니다. 실제 확인은 6단계 공개 주소에서 합니다.' },
    ],
    success: '키를 코드에 쓰지 않고 API 경로·서버 파일·배포 설정이 준비된다. 이 단계는 실제 API 연결 성공을 뜻하지 않는다.',
    docs: [LINKS.cfFunctions, LINKS.cfCompat],
  },
  {
    id: 5,
    title: 'GitHub에 원본 저장',
    minutes: 15,
    goal: '참가자 앱의 코드 원본을 GitHub의 school-culture-curator 저장소에 올립니다.',
    sites: [LINKS.aiStudio, LINKS.github],
    extra: <DeployFlow highlight="github" />,
    procedure: [
      'AI Studio 프로젝트에서 GitHub 연결 기능을 찾습니다. 현재 공식 안내에서 GitHub 연결·Push/Pull 사용법을 확인합니다(메뉴 위치는 바뀔 수 있습니다).',
      '참가자 앱용 저장소 이름을 `school-culture-curator`로 만들거나 선택합니다. 이 강의안 저장소(`school-culture-curator-workshop-guide`)와 다른 저장소입니다.',
      'GitHub 연결 승인 화면에서 이번 저장소에 필요한 접근만 허용하고, 원본을 Push(올리기)합니다.',
      'GitHub 저장소 첫 화면에서 `package.json`, `index.html`, `src`, `functions`, `public/_routes.json`, `wrangler.toml`, 잠금 파일(`package-lock.json` 등)이 보이는지 확인합니다.',
      '저장소의 파일 검색(키보드 `t`)으로 실제 키나 학생 기록이 들어가지 않았는지 확인합니다.',
      '연동이 없거나 실패하면 대안 경로를 씁니다: AI Studio에서 ZIP 다운로드 → 압축 해제 → GitHub에서 새 저장소 만들기 → Add file › Upload files → 압축을 푼 폴더 안의 파일·폴더를 끌어다 놓기 → Commit changes.',
      '대안 경로에서는 ZIP 파일 하나만 올리지 않습니다. 업로드 후 `functions` 폴더와 `.gitignore` 같은 숨김 설정 파일이 빠지지 않았는지 확인합니다.',
    ],
    expected: [
      '저장소 루트(맨 위 폴더)에서 package.json과 functions 폴더가 바로 보입니다.',
      '최신 커밋 시각이 방금 올린 시각입니다.',
    ],
    tryIt: [
      'GitHub에서 `functions/api/culture.ts`를 열어 SEOUL_OPEN_API_KEY라는 이름만 있고 실제 값은 없는지 봅니다.',
    ],
    stuck: [
      { q: '저장소 안에 폴더가 한 겹 더 있어요(예: my-app/package.json).', a: 'Cloudflare에서 Root directory를 그 폴더로 지정하거나, 파일을 루트로 다시 올립니다. 이후 단계는 package.json이 루트에 있다고 가정합니다.' },
      { q: '.gitignore 같은 점(.)으로 시작하는 파일이 업로드되지 않아요.', a: '파일 탐색기에서 숨김 파일 보기를 켜고 다시 끌어다 놓습니다. 그래도 안 되면 GitHub에서 Add file › Create new file로 같은 이름의 파일을 만들고 내용을 붙여 넣습니다.' },
      { q: 'node_modules나 dist 폴더도 올라갔어요.', a: '두 폴더는 올리지 않습니다. GitHub에서 해당 폴더를 삭제하는 커밋을 만들고 .gitignore에 들어 있는지 확인합니다.' },
    ],
    success: '저장소 루트에서 package.json과 functions 폴더를 볼 수 있다.',
    docs: [LINKS.aiStudioDocs],
  },
  {
    id: 6,
    title: 'Cloudflare Pages 배포와 키 등록',
    minutes: 25,
    goal: 'GitHub 저장소를 Cloudflare Pages에 연결해 공개 주소를 받고, 인증키를 Secret으로 등록해 /api/culture가 실제로 응답하는지 확인합니다.',
    sites: [LINKS.cfDash],
    extra: (
      <>
        <DeployFlow highlight="cloudflare" />
        <MenuPath path={['Workers & Pages', 'Create application', 'Pages', 'Import an existing Git repository']} />
        <p className="small">메뉴 이름이 바뀌었으면 ‘Pages에서 Git 저장소를 연결한다’는 목적을 기준으로 찾습니다. Workers 프로젝트로 만들지 않도록 주의합니다.</p>
      </>
    ),
    procedure: [
      'https://dash.cloudflare.com/ 에 로그인합니다.',
      'Workers & Pages → Create application → Pages → Import an existing Git repository를 선택합니다.',
      'GitHub 연결을 승인하고 `school-culture-curator` 저장소를 선택합니다. 목록에 없으면 GitHub의 Cloudflare 연결 앱 설정에서 저장소 접근 범위에 이 저장소를 추가합니다.',
      'Production branch를 저장소의 실제 기본 브랜치로 지정합니다(예: `main`).',
      'Build command에 `npm run build`, Build output directory에 `dist`를 입력합니다. package.json이 루트에 있으면 Root directory는 기본값으로 둡니다.',
      'Save and Deploy로 첫 배포를 실행합니다. 아직 키가 없어도 기본 화면과 가상 모드는 열려야 합니다.',
      '프로젝트의 Settings → Variables and Secrets에서 `SEOUL_OPEN_API_KEY`를 Secret(암호화) 유형으로 추가합니다. 값은 서울 열린데이터광장 인증키 관리 화면에서 복사해 이 입력란에만 붙입니다.',
      'Production과 Preview 환경을 구분합니다. 기본은 Production에 등록하고, Preview 주소에서 실습할 때만 Preview에도 등록합니다.',
      'Secret 저장 후 Deployments에서 최신 배포를 다시 실행(Retry deployment)하거나 새 커밋으로 재배포합니다. 재배포 전에는 새 Secret이 적용되지 않습니다.',
      '배포 로그에서 빌드 성공, Functions 발견(functions 디렉터리 인식), wrangler.toml 설정 반영을 확인합니다. 설정 파일을 쓰면 대시보드 값과 서로 다르게 두지 않습니다.',
      '발급된 `https://프로젝트명.pages.dev` 주소를 시크릿 창에서 엽니다. 대시보드 주소(dash.cloudflare.com)와 혼동하지 않습니다.',
      '같은 공개 주소 뒤에 `/api/culture?start=1&size=5`를 붙여 엽니다. 이 주소에는 키가 없으므로 공유해도 됩니다. JSON 자료·총건수(total)·조회시각(fetchedAt)이 나오는지 확인합니다.',
      '오류면 아래 ‘오류 판별 순서’를 따릅니다. 실패 상태에서 브라우저가 원천 API를 직접 호출하도록 바꾸거나 키를 공개하는 우회를 하지 않습니다.',
      '공개 주소를 아래 ‘내 앱 공개 주소’ 칸에 기록합니다. 유료 도메인 구입은 필요 없습니다.',
    ],
    after: (
      <>
        <ErrorTriage />
        <AppUrlField />
        <div className="callout">
          <strong>강사용 선택 — 로컬에서 함수 포함 실행</strong>
          <p>로컬 Node 환경이 준비된 경우 <code>npm run build</code> 후 <code>npx wrangler pages dev dist</code>로 함수까지 실행해 볼 수 있습니다. 이때 키는 <code>.dev.vars</code>에 넣으며 이 파일은 로컬 전용으로 GitHub에 올리지 않습니다. 기본 참가자 과정은 터미널 설치를 요구하지 않습니다.</p>
        </div>
      </>
    ),
    expected: [
      '화면과 API가 같은 공개 도메인(…pages.dev)에서 열립니다.',
      '/api/culture?start=1&size=5 응답에 source, total, start, received, nextStart, fetchedAt, items가 있습니다.',
      '브라우저 주소창과 개발자 도구의 요청 주소 어디에도 서울시 인증키가 없습니다.',
    ],
    tryIt: [
      '`/api/culture?start=0&size=5`처럼 잘못된 값을 넣어 400 오류가 나는지 확인합니다.',
      '`/api/culture?start=1&size=999`를 넣어 거절되거나 500 이하로 제한되는지 확인합니다.',
    ],
    stuck: [
      { q: '저장소가 목록에 안 보여요.', a: 'GitHub → Settings → Applications → Cloudflare 연결 앱(Configure)에서 저장소 접근을 ‘Only select repositories’로 두고 school-culture-curator를 추가합니다.' },
      { q: '빌드가 “Missing script: build”로 실패해요.', a: 'package.json이 루트에 없거나 Root directory가 잘못된 것입니다. 5단계 저장소 구조를 다시 확인합니다.' },
      { q: 'compatibility_date 관련 오류가 나요.', a: '배포 로그의 오류 문구를 그대로 확인하고, 함수 로그에 비밀 값이 없는 메시지만 공통 복구 프롬프트에 붙여 원인을 찾습니다. 근거 없이 날짜를 과거로 바꾸지 않습니다.' },
    ],
    success: '화면과 API가 같은 공개 도메인에서 열리고, 브라우저 요청 주소에 원천 인증키가 없다.',
    docs: [LINKS.cfReact, LINKS.cfFunctions, LINKS.cfSecrets, LINKS.cfCompat],
  },
  {
    id: 7,
    title: '실제 자료와 페이지 읽기 연결',
    minutes: 20,
    goal: '앱 화면의 실제 자료 모드를 /api/culture에 연결하고, 500건씩 나누어 읽는 기능과 부분 조회 표시를 만듭니다.',
    sites: [LINKS.aiStudio, LINKS.github, LINKS.cfDash],
    extra: (
      <div className="callout">
        <strong>네 가지 숫자를 구분합니다</strong>
        <ul>
          <li><strong>전체 건수</strong> — API가 알려 준 데이터셋 전체 행 수(total)</li>
          <li><strong>읽은 원본 행수</strong> — 지금까지 실제로 받아 온 행 수</li>
          <li><strong>중복 제외 항목수</strong> — 같은 행사를 하나로 정리한 뒤의 수</li>
          <li><strong>필터 결과수</strong> — 현재 검색 조건에 맞는 수</li>
        </ul>
        <p>덜 읽은 상태에서 0건은 ‘서울 전체에 없음’이 아니라 ‘지금까지 읽은 자료에 없음’입니다.</p>
      </div>
    ),
    procedure: [
      '아래 ‘프롬프트 04’를 복사해 같은 AI Studio 프로젝트에 입력합니다.',
      'AI Studio에서 GitHub로 Push합니다. GitHub에서 최신 커밋 시각을 확인합니다.',
      'Cloudflare의 Deployments에서 새 배포가 그 커밋으로 시작되어 성공했는지 확인합니다.',
      '공개 주소(…pages.dev)를 열고 자료 모드를 ‘실제 자료’로 바꿔 ‘첫 500건 읽기’를 누릅니다.',
      '‘다음 500건’을 눌러 읽은 원본 행수가 늘어나는지 확인합니다.',
      '‘추가 자료 읽기’를 시작한 뒤 중간에 ‘취소’를 눌러 진행이 멈추고 지금까지 읽은 자료가 유지되는지 확인합니다.',
      '오류가 났다면 ‘다시 시도’가 실패한 페이지부터 이어서 읽는지 확인합니다.',
    ],
    copies: [PROMPT_04],
    expected: [
      '실제 행사 이름·날짜·링크가 원자료(문화포털 상세 링크)와 일치합니다.',
      '화면에 ‘현재 읽은 자료에서 검색’과 조회 시각이 보입니다.',
      '전체를 다 읽지 않았으면 그 사실이 계속 표시됩니다.',
    ],
    tryIt: [
      '목록에서 행사 하나를 골라 문화포털 상세 링크를 열고 제목·기간이 같은지 비교합니다.',
      'AI Studio 미리보기에서 실제 모드를 눌러 ‘공개 배포 주소에서 API를 확인하세요’ 안내가 나오는지 확인합니다.',
    ],
    stuck: [
      { q: '실제 모드인데 가상 자료가 보여요.', a: '오류를 가상 자료로 숨기는 코드입니다. “실제 모드 오류를 가상 자료로 대체하지 말고 오류 종류를 그대로 보여 줘”라고 요청합니다.' },
      { q: '첫 500건에 원하는 행사가 없어요.', a: '자료가 최신순으로 정렬되어 있다고 가정하지 않습니다. 읽은 범위와 전체 건수를 확인하고 ‘다음 500건’ 또는 ‘추가 자료 읽기’를 씁니다.' },
    ],
    success: '실제 원자료의 이름·날짜·링크와 화면이 일치하며 부분 조회 사실을 확인할 수 있다.',
    docs: [LINKS.cfFunctions, LINKS.dataset],
  },
  {
    id: 8,
    title: '업무 조건 검색',
    minutes: 20,
    goal: '날짜·자치구·분야·유무료·이용대상 키워드로 후보를 좁히되, ‘미제공’과 ‘무료’, ‘기간 겹침’과 ‘운영 확정’을 구분합니다.',
    sites: [LINKS.aiStudio],
    extra: (
      <div className="callout">
        <strong>날짜 겹침 규칙</strong>
        <p>선택 기간과 행사 기간이 하루라도 겹치면 후보입니다(양끝 포함): <code>행사 시작 ≤ 선택 종료</code> 그리고 <code>행사 종료 ≥ 선택 시작</code>. 겹친다고 그날 운영한다는 뜻은 아닙니다. 휴관·회차는 PRO_TIME 원문으로 확인합니다.</p>
      </div>
    ),
    procedure: [
      '아래 ‘프롬프트 05’를 복사해 같은 AI Studio 프로젝트에 입력합니다.',
      '미리보기의 가상 모드에서 날짜 범위를 C1의 종료일 하루로만 지정해 C1이 포함되는지(경계 포함) 확인합니다.',
      '‘무료만’을 선택해 C4(유무료 미제공)가 빠지는지 확인합니다.',
      '이용대상 키워드에 ‘13’을 넣어 C2가 ‘원문에서 키워드 찾기’로 걸리는지, 앱이 ‘중학생 가능’ 같은 판정을 하지 않는지 확인합니다.',
      'GitHub로 Push하고 Cloudflare 재배포가 끝나면 공개 주소의 실제 자료에도 같은 조건을 적용해 봅니다.',
    ],
    copies: [PROMPT_05],
    expected: [
      '‘무료’와 ‘미제공’, ‘기간 겹침’과 ‘기간 밖’, ‘대상 미확인’이 서로 다르게 표시됩니다.',
      '결과가 0건일 때 ‘필터 때문’인지 ‘아직 덜 읽어서’인지 안내가 다릅니다.',
    ],
    tryIt: [
      '날짜 범위를 C3 종료일 다음 날부터로 지정해 C3이 빠지는지 확인합니다.',
      '‘모두 지우기’로 모든 필터가 초기화되는지 확인합니다.',
    ],
    stuck: [
      { q: '날짜가 하루씩 밀려요.', a: '날짜 문자열을 new Date()로 바꾸며 UTC로 해석된 경우입니다. “날짜는 YYYY-MM-DD 문자열 그대로 서울 기준으로 비교하고 UTC로 변환하지 마”라고 요청합니다.' },
      { q: '자치구 목록에 빈 칸이 있어요.', a: '“알 수 없는 값은 ‘기타/미확인’으로 묶어 표시해 줘”라고 요청합니다.' },
    ],
    success: '무료·미제공, 기간 겹침·기간 밖, 대상 미확인을 서로 구분한다.',
    docs: [LINKS.dataset],
  },
  {
    id: 9,
    title: '지도와 일정 보기',
    minutes: 20,
    goal: '필터 결과를 지도·목록·월간 달력에서 함께 보고, 좌표가 없는 행사도 목록과 비교에서 빠지지 않게 합니다.',
    sites: [LINKS.aiStudio],
    extra: (
      <div className="callout">
        <strong>지도에서 꼭 지킬 것</strong>
        <ul>
          <li>Leaflet 좌표 순서는 <code>[Number(LAT), Number(LOT)]</code> — 위도, 경도 순입니다.</li>
          <li>OpenStreetMap 출처 표시(© OpenStreetMap contributors)를 지우지 않습니다. 대량 미리받기는 하지 않습니다.</li>
          <li>학교 위치는 지도 클릭으로만 정하고, 거리는 직선거리입니다. 이동시간이 아닙니다.</li>
        </ul>
      </div>
    ),
    procedure: [
      '아래 ‘프롬프트 06’을 복사해 같은 AI Studio 프로젝트에 입력합니다.',
      '목록에서 C1을 눌러 지도의 마커가 강조되고 상세 카드가 열리는지 확인합니다.',
      '키보드 Tab 키만으로 목록 항목을 선택할 수 있는지 확인합니다.',
      '지도 탭에서 다른 탭으로 갔다가 돌아왔을 때 지도가 회색·흰 화면으로 깨지지 않는지 확인합니다.',
      '달력 탭에서 C5 기간의 날짜에 ‘기간상 포함 — 운영일·회차 확인 필요’ 안내가 붙는지 확인합니다.',
      'C4(좌표 없음)가 지도에는 없지만 목록에는 남아 있고, 결과 수와 지도 표시 수의 차이가 설명되는지 확인합니다.',
    ],
    copies: [PROMPT_06],
    expected: [
      '서울 지역에 마커가 찍히고 지도 오른쪽 아래에 OpenStreetMap 출처가 보입니다.',
      '달력이 예약 가능 슬롯처럼 보이지 않습니다.',
    ],
    tryIt: [
      '지도를 클릭해 학교 위치를 정하고 반경을 바꿔, ‘직선거리’라는 설명이 보이는지 확인합니다.',
      '같은 장소의 행사가 여럿일 때 모두 열어 볼 수 있는지 확인합니다.',
    ],
    stuck: [
      { q: '지도가 흰 화면이에요.', a: 'Leaflet CSS가 빠졌거나 지도 컨테이너 높이가 0이거나, 탭 전환 뒤 invalidateSize를 호출하지 않은 경우입니다. 오류 도움말의 ‘지도 흰 화면’ 복구 프롬프트를 씁니다.' },
      { q: '마커가 바다나 남극에 찍혀요.', a: '위도·경도 순서가 바뀌었거나 숫자 변환이 안 된 것입니다. 좌표를 자동으로 바꿔 끼우지 말고 원인을 고치도록 요청합니다.' },
      { q: '마커 아이콘이 깨진 그림으로 보여요.', a: '번들러에서 Leaflet 기본 아이콘 경로가 깨진 경우입니다. “Leaflet 마커 아이콘 이미지를 import해 경로를 지정해 줘”라고 요청합니다.' },
    ],
    success: '목록·지도·달력이 같은 필터 결과를 보여 주고, 좌표 없는 행사도 목록에서 선택할 수 있다.',
    docs: [LINKS.osmTiles, LINKS.osmCopyright],
  },
  {
    id: 10,
    title: '후보 비교와 업무 판단',
    minutes: 20,
    goal: '최대 4개 후보를 나란히 비교하고, 원자료와 교사가 직접 확인한 메모를 분리해 기록합니다.',
    sites: [LINKS.aiStudio],
    extra: (
      <div className="callout">
        <strong>앱이 하지 않는 일</strong>
        <p>앱은 ‘학교 승인 완료’나 ‘예약 완료’를 표시하지 않습니다. 상태는 <strong>검토 전 / 기관 확인 필요 / 교사 확인 기록 있음</strong> 세 가지뿐이고, 마지막 상태에는 확인 날짜와 교사 메모가 필요합니다.</p>
      </div>
    ),
    procedure: [
      '아래 ‘프롬프트 07’을 복사해 같은 AI Studio 프로젝트에 입력합니다.',
      '후보 비교함에 서로 성격이 다른 행사 세 개(예: C1 무료 전시, C2 유료 공연, C4 정보 미제공)를 담습니다.',
      '같은 행사를 한 번 더 담아 중복 담기가 막히는지, 다섯 번째를 담을 때 최대 4개 안내가 나오는지 확인합니다.',
      '한 후보에 활동 목적·선택 이유·예정 방문일·예상 인원·단체 관람 확인 결과를 씁니다. 학생 이름·학번은 쓰지 않습니다.',
      '브라우저를 새로고침해 후보와 메모가 남아 있는지 확인합니다.',
      '원자료 정보(API가 준 값)와 교사 메모가 다른 영역·다른 제목으로 구분되는지 확인합니다.',
    ],
    copies: [PROMPT_07],
    expected: [
      '비교표에서 시간 원문·이용대상 원문·요금 원문이 가공 없이 나란히 보입니다.',
      '새로고침 뒤에도 후보와 메모, 저장 시각이 남아 있습니다.',
    ],
    tryIt: [
      '시크릿 창이나 다른 브라우저에서 같은 공개 주소를 열어 후보가 보이지 않는 것을 확인합니다(이 브라우저에만 저장).',
      '‘교사 확인 기록 있음’으로 바꿀 때 확인 날짜와 메모 없이는 바뀌지 않는지 확인합니다.',
    ],
    stuck: [
      { q: '새로고침하면 후보가 사라져요.', a: '사생활 보호(시크릿) 모드이거나 저장 코드가 없는 경우입니다. 일반 창에서 다시 시험하고, 그래도 사라지면 “localStorage 저장·복원과 저장 실패 안내를 추가해 줘”라고 요청합니다.' },
    ],
    success: '세 후보를 비교하고, 원자료와 교사 메모를 구분해 이 브라우저에 남길 수 있다.',
    docs: [],
  },
  {
    id: 11,
    title: '공유용 문서 출력',
    minutes: 15,
    goal: '‘문화활동 후보 비교표’와 ‘학생 안내문 초안’을 인쇄·PDF로 만들고, 후보를 파일로 내보내고 가져옵니다.',
    sites: [LINKS.aiStudio],
    extra: (
      <div className="callout">
        <strong>앱 주소 공유 ≠ 내 후보 공유</strong>
        <p>앱 공개 주소를 동료에게 보내도 내 후보와 메모는 보이지 않습니다(이 브라우저에만 저장). 공유하려면 인쇄물·PDF·내보낸 JSON 파일을 직접 전달합니다.</p>
      </div>
    ),
    procedure: [
      '아래 ‘프롬프트 08’을 복사해 같은 AI Studio 프로젝트에 입력합니다.',
      '10단계에서 담은 후보로 ‘학생 안내문 초안’을 엽니다. 활동명·방문일·집결 장소·준비물·문의 방법을 실제 업무처럼 씁니다. 집결 시각과 비용은 일부러 비워 둡니다.',
      '브라우저 인쇄(Ctrl+P) 미리보기에서 제목에 ‘초안’이, 비운 칸에 ‘교사 입력 필요’가 보이는지 확인합니다.',
      '가상 자료로 만든 안내문이면 출력물 각 페이지에 ‘연수용 가상 자료’가 반복되는지 확인합니다.',
      '‘JSON 내보내기’로 파일을 저장한 뒤, 후보를 비우고 ‘가져오기’로 되살립니다. 덮어쓰기 전 확인 창이 나오는지 봅니다.',
    ],
    copies: [PROMPT_08],
    expected: [
      '출력물에 출처·원문 링크·조회 시각·교사 확인 필요 항목이 들어 있습니다.',
      '원자료 행사 기간과 교사가 정한 실제 방문일이 따로 적혀 있습니다.',
      '출력물에 메뉴·버튼이 보이지 않습니다.',
    ],
    tryIt: [
      '내보낸 JSON 파일을 메모장으로 열어 키·학생 정보·이미지 데이터가 없는지 확인합니다.',
      '아무 텍스트 파일을 가져오기 해서 거절되는지 확인합니다.',
    ],
    stuck: [
      { q: '인쇄에 사진이 안 나와요.', a: '정상입니다. 출력물은 링크·텍스트 중심입니다. 외부 이미지가 없어도 문서가 완성되어야 합니다.' },
      { q: '안내문이 학교 공문처럼 꾸며졌어요.', a: '“직인·결재란·학교 로고를 빼고 제목에 ‘초안’을 표시해 줘”라고 요청합니다.' },
    ],
    success: '비교표와 안내문 초안을 인쇄·PDF로 만들고, 후보 파일을 내보내고 다시 가져올 수 있다.',
    docs: [],
  },
  {
    id: 12,
    title: '완성 점검과 오류 수정',
    minutes: 20,
    goal: 'AI에게 앱 전체를 점검하게 하고, 미리보기(가상)와 공개 주소(실제)에서 각각 경계 사례를 직접 확인합니다.',
    sites: [LINKS.aiStudio, LINKS.github, LINKS.cfDash],
    procedure: [
      '아래 ‘프롬프트 09’를 복사해 같은 AI Studio 프로젝트에 입력합니다. AI의 보고에서 ‘확인함 / 확인하지 못함 / 수정함’을 구분해 읽습니다.',
      'AI Studio 미리보기의 가상 모드에서 C1~C6 경계 사례를 다시 한 번씩 열어 봅니다.',
      '(선택) 기능 점검이 끝났으면 GitHub에 올리기 전에 아래 ‘getdesign.md로 디자인 스타일 일괄 바꾸기’를 따라 디자인을 바꾸고, 미리보기에서 기능이 그대로인지 다시 확인합니다.',
      'GitHub로 Push하고 Cloudflare 재배포가 끝나면, 공개 주소의 실제 모드에서 첫 500건 읽기·필터·비교·출력을 차례로 해 봅니다.',
      '휴대전화로 공개 주소를 열어 한 열 화면과 버튼 크기를 확인합니다.',
      '시크릿 창에서 공개 주소를 열어 저장된 후보 없이 처음 상태로 열리는지 확인합니다.',
      '인쇄 미리보기에서 비교표와 안내문 초안이 깨지지 않는지 확인합니다.',
    ],
    copies: [PROMPT_09],
    after: (
      <>
        <DesignMdGuide />
        <CopyCard item={PROMPT_DESIGN} />
      </>
    ),
    expected: [
      '핵심 경계 사례와 공개 주소의 조회·비교·출력이 작동합니다.',
      'AI가 실행하지 못한 테스트와 외부 계정 검증이 ‘확인하지 못함’으로 따로 적혀 있습니다.',
    ],
    tryIt: [
      '공개 주소에서 개발자 도구(F12) → Network를 열고 요청 주소에 openapi.seoul.go.kr나 키가 없는지 확인합니다.',
      'GitHub 저장소에서 `SEOUL_OPEN_API_KEY`를 검색해 이름만 나오고 값은 없는지 확인합니다.',
    ],
    stuck: [
      { q: 'AI가 “모든 테스트 통과”라고만 해요.', a: '“실제로 실행한 명령과 결과, 실행하지 못한 항목을 나눠서 다시 보고해 줘”라고 요청합니다. Cloudflare·서울시 API 검증은 AI Studio 안에서 할 수 없습니다.' },
      { q: '점검 후 기존 기능이 사라졌어요.', a: '“확인된 오류만 고치고 기존 기능은 되돌려 줘”라고 요청하거나, GitHub 커밋 기록에서 이전 상태를 확인합니다.' },
    ],
    success: '핵심 경계 사례와 공개 URL의 조회·비교·출력이 동작하며 확인하지 못한 항목이 구분된다.',
    docs: [LINKS.cfFunctions],
  },
  {
    id: 13,
    title: '수정 후 같은 주소로 재배포',
    minutes: 10,
    goal: '작은 수정을 해서 코드 수정 → 원본 저장 → 자동 배포 → 실제 공개 화면 확인의 흐름을 한 바퀴 돌려 봅니다.',
    sites: [LINKS.aiStudio, LINKS.github, LINKS.cfDash],
    extra: <DeployFlow highlight="all" />,
    procedure: [
      '아래 ‘13단계 수정 요청’을 복사해 AI Studio에 입력합니다.',
      '미리보기에서 상단 안내 문구가 바뀌었는지 확인합니다.',
      'GitHub로 Push한 뒤 GitHub 저장소에서 최신 커밋 메시지와 시각을 확인합니다.',
      'Cloudflare Deployments에서 새 배포가 완료되었고 그 배포의 커밋이 방금 커밋과 같은지 확인합니다.',
      '같은 공개 주소를 새로 열어(필요하면 Ctrl+F5) 바뀐 문구를 확인합니다.',
      '참가자 앱 주소와 이 강의안 주소를 아래 칸과 메모장에 따로 기록합니다.',
    ],
    copies: [PROMPT_13],
    after: (
      <>
        <div className="callout">
          <strong>두 가지 캐시는 다릅니다</strong>
          <p><strong>정적 파일 캐시</strong>는 브라우저가 화면 파일(HTML·JS·CSS)을 잠시 기억하는 것으로, 새 배포 후 새로고침하면 바뀝니다. <strong>API 자료 캐시</strong>는 서버 함수가 서울시 응답을 약 10분 기억하는 것으로, 화면을 다시 배포해도 자료는 최대 10분 전 조회 결과일 수 있습니다. 화면의 조회 시각(fetchedAt)으로 구분합니다.</p>
        </div>
        <AppUrlField />
      </>
    ),
    expected: [
      '공개 주소는 그대로이고 문구만 바뀌었습니다.',
      'Cloudflare 배포 기록에서 해당 커밋을 찾을 수 있습니다.',
    ],
    tryIt: [
      '휴대전화에서도 같은 주소로 바뀐 문구를 확인합니다.',
    ],
    stuck: [
      { q: 'Push했는데 Cloudflare 배포가 시작되지 않아요.', a: 'Production branch가 Push한 브랜치와 같은지, 자동 배포가 켜져 있는지 확인합니다.' },
      { q: '배포는 끝났는데 문구가 그대로예요.', a: 'Ctrl+F5로 강력 새로고침하거나 시크릿 창에서 엽니다. 그래도 같으면 배포된 커밋이 최신인지 확인합니다.' },
    ],
    success: '코드 수정→원본 저장→자동 배포→실제 공개 화면 확인의 흐름을 설명할 수 있다.',
    docs: [LINKS.cfReact],
  },
];

export const TOTAL_MINUTES = STEPS.reduce((sum, s) => sum + s.minutes, 0);
