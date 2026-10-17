import { RECOVERY_BASE } from './prompts';

export interface ErrorHelp {
  id: string;
  symptom: string;
  stage: string;
  checks: string[];
  prompt: string;
}

const make = (stage: string, symptom: string, specific: string) =>
  `${RECOVERY_BASE}
발생 단계: ${stage}
증상: ${symptom}
${specific}
실제 오류 문구·화면: (여기에 붙여 넣기 — 인증키가 들어간 URL은 [KEY 가림]으로 바꿈)`;

export const ERRORS: ErrorHelp[] = [
  {
    id: 'e-html',
    stage: '6~7단계',
    symptom: '/api/culture를 열었는데 JSON 대신 앱 화면(HTML)이 나옴',
    checks: [
      'functions 폴더가 저장소 최상위에 있는지(src·dist 아래가 아닌지)',
      '파일 경로가 정확히 functions/api/culture.ts이고 onRequestGet을 내보내는지',
      'Cloudflare 배포 로그에 Functions가 발견되었다고 나오는지',
      '_redirects 등 잘못된 SPA fallback 설정이 /api/* 요청까지 index.html로 보내는지',
      '공개 주소가 아닌 AI Studio 미리보기에서 열고 있지 않은지',
    ],
    prompt: '',
  },
  {
    id: 'e-config',
    stage: '6단계',
    symptom: '응답이 503 CONFIG_REQUIRED',
    checks: [
      'Secret 이름이 정확히 SEOUL_OPEN_API_KEY인지(대소문자·밑줄)',
      'Production/Preview 중 지금 연 주소의 환경에 등록했는지',
      'Secret 저장 후 재배포했는지',
    ],
    prompt: '',
  },
  {
    id: 'e-info100',
    stage: '6~7단계',
    symptom: '인증 오류(INFO-100)',
    checks: [
      '서울 열린데이터광장에서 발급된 키인지(공공데이터포털 키가 아닌지)',
      '키 관리 화면에서 사용 가능 상태인지, 앞뒤 공백 없이 붙여 넣었는지',
      '오류 보고·AI 대화에 원시 키를 넣지 않기',
    ],
    prompt: '',
  },
  {
    id: 'e-310',
    stage: '6~7단계',
    symptom: '서비스명 오류(ERROR-310)',
    checks: [
      '서비스명이 정확히 culturalEventInfo인지(대소문자 포함)',
      '공식 데이터 페이지의 현재 Open API 명세와 같은지',
    ],
    prompt: '',
  },
  {
    id: 'e-five',
    stage: '1·7단계',
    symptom: '첫 5건만 나오고 더 읽히지 않음',
    checks: [
      'sample 키를 쓰고 있지 않은지(sample은 구조 확인용 1~5건 제한)',
      '정식 키가 Secret으로 등록되었는지',
      '요청 인덱스(START/END) 계산이 맞는지, size가 5로 고정되지 않았는지',
    ],
    prompt: '',
  },
  {
    id: 'e-notfound',
    stage: '7~8단계',
    symptom: '첫 페이지에 원하는 행사가 없음',
    checks: [
      '자료가 최신순으로 정렬되었다고 가정하지 않기',
      '읽은 원본 행수와 전체 건수 비교',
      '‘다음 500건’ 또는 ‘추가 자료 읽기’로 범위 넓히기',
    ],
    prompt: '',
  },
  {
    id: 'e-mixed',
    stage: '7단계',
    symptom: 'HTTPS 페이지에서 원천 HTTP 요청이 막힘(Mixed Content)',
    checks: [
      '브라우저 코드(src)가 openapi.seoul.go.kr를 직접 호출하는 부분 제거',
      '화면은 같은 사이트의 /api/culture만 호출하는지',
    ],
    prompt: '',
  },
  {
    id: 'e-cfonly',
    stage: '6~7단계',
    symptom: '로컬에서는 되는데 Cloudflare에서 실패',
    checks: [
      'wrangler.toml의 compatibility_date와 compatibility_flags(allow_custom_ports)가 배포에 반영되었는지',
      '원천 호스트 openapi.seoul.go.kr와 포트 8088이 코드에 정확한지',
      'Cloudflare 함수 로그(실시간 로그)에서 비밀이 빠진 오류 메시지 확인',
      '실제로 성공하기 전에는 ‘해결됨’으로 표시하지 않기',
    ],
    prompt: '',
  },
  {
    id: 'e-mapwhite',
    stage: '9단계',
    symptom: '지도가 흰 화면이거나 조각나 보임',
    checks: [
      'Leaflet CSS(leaflet/dist/leaflet.css)를 불러오는지',
      '지도 컨테이너에 높이(예: 420px)가 있는지',
      '지도 탭이 보인 뒤 invalidateSize()를 호출하는지',
    ],
    prompt: '',
  },
  {
    id: 'e-mapwrong',
    stage: '9단계',
    symptom: '마커가 엉뚱한 곳(바다·다른 대륙)에 표시됨',
    checks: [
      '[Number(LAT), Number(LOT)] 순서인지',
      '문자열을 숫자로 바꾸는지, 빈 값·0·범위 밖을 거르는지',
      '좌표계가 위경도(WGS84)인지',
      '좌표를 자동으로 바꿔 끼우는 코드를 넣지 않기',
    ],
    prompt: '',
  },
  {
    id: 'e-printimg',
    stage: '11단계',
    symptom: '인쇄물에 사진이 없음',
    checks: [
      '출력물은 링크·텍스트 중심이 정상',
      '외부 이미지 로드 성공에 문서 전체를 의존하지 않는지',
    ],
    prompt: '',
  },
  {
    id: 'e-guideonly',
    stage: '전체',
    symptom: '강의안 페이지는 열리는데 내 앱이 만들어지지 않음',
    checks: [
      '이 강의안은 읽는 페이지이고, 앱은 내 AI Studio 프로젝트에서 따로 만든다',
      '프롬프트를 강의안이 아니라 AI Studio Build 입력창에 붙여 넣었는지',
      '프롬프트 01부터 같은 프로젝트에 순서대로 넣었는지',
    ],
    prompt: '',
  },
];

const SPECIFIC: Record<string, string> = {
  'e-html': '확인할 것: functions/api/culture.ts의 위치와 onRequestGet 내보내기, public/_routes.json이 dist로 복사되어 /api/*를 함수로 보내는지, _redirects 같은 SPA fallback이 /api/* 요청을 index.html로 돌리지 않는지. 함수 파일을 src나 dist로 옮기지 마.',
  'e-config': '확인할 것: 코드가 context.env.SEOUL_OPEN_API_KEY라는 정확한 이름으로 읽는지, 키 미설정 확인이 캐시 확인보다 먼저 일어나는지. 키를 코드나 VITE_ 변수에 넣는 방식으로 우회하지 마.',
  'e-info100': '확인할 것: INFO-100을 인증 오류로 정확히 분류해 사용자에게 ‘인증키 확인 필요’로 보여 주는지, 응답·로그에 키나 키가 들어간 URL이 남지 않는지. 샘플키로 자동 전환하지 마.',
  'e-310': '확인할 것: 서비스명이 코드에 culturalEventInfo로 고정되어 있는지(대소문자), 요청 형식이 http://openapi.seoul.go.kr:8088/{KEY}/json/culturalEventInfo/{START}/{END}/ 와 같은지. 브라우저가 서비스명을 바꿀 수 있게 하지 마.',
  'e-five': '확인할 것: sample 키를 쓰는 코드가 있는지, START와 END=start+size-1 계산, size 기본값 500과 1~500 제한, nextStart가 원본 조회 위치 기준인지.',
  'e-notfound': '확인할 것: 화면이 전체 건수·읽은 원본 행수·중복 제외 수·필터 결과 수를 구분해 보여 주는지, 덜 읽은 상태의 0건을 ‘서울 전체에 없음’이라고 쓰지 않는지, 정렬을 최신순이라고 가정하지 않는지.',
  'e-mixed': '확인할 것: 프런트엔드 코드에 openapi.seoul.go.kr 직접 요청이 남아 있는지. 브라우저는 같은 사이트의 /api/culture만 호출하도록 고쳐 줘. http를 https로 단순 치환하거나 미확인 프록시를 끼우지 마.',
  'e-cfonly': '확인할 것: wrangler.toml의 compatibility_date="2026-10-16", compatibility_flags=["allow_custom_ports"] 반영 여부, 원천 호스트·포트 8088, 12초 시간 제한, 함수 로그에 비밀이 없는 오류 분류 메시지. 실제 성공 응답을 보기 전에는 해결됐다고 말하지 마.',
  'e-mapwhite': '확인할 것: Leaflet CSS 불러오기, 지도 컨테이너 높이, 탭 전환 뒤 invalidateSize 호출, 컴포넌트 해제 시 map.remove()로 정리.',
  'e-mapwrong': '확인할 것: Leaflet에 [Number(LAT), Number(LOT)] 순서로 넘기는지, 빈 문자열·0·범위 밖 좌표를 거르는지. 좌표를 자동으로 바꿔 끼우는 보정 코드는 넣지 마.',
  'e-printimg': '확인할 것: 인쇄 형식이 텍스트·링크 중심으로 완성되는지, 이미지 로드 실패 때 대체 문구와 원문 링크가 남는지. 이미지 프록시를 만들지 마.',
  'e-guideonly': '상황: 강의안 페이지가 아니라 내 AI Studio 프로젝트에서 앱이 만들어져야 해. 지금 프로젝트의 파일 목록과 현재 화면을 설명하고, 프롬프트 01 단계부터 빠진 부분이 무엇인지 알려 줘.',
};

for (const e of ERRORS) e.prompt = make(e.stage, e.symptom, SPECIFIC[e.id]);
