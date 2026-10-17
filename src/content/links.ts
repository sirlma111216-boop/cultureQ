// 공식 문서 링크. 2026-10-16에 확인한 명세 기준이며, 바뀐 항목은 공식 자료와 실제 응답을 대조해 기록한다.
export interface DocLink {
  label: string;
  url: string;
}

export const LINKS = {
  dataset: { label: '서울 열린데이터광장 — 서울시 문화행사 정보(OA-15486)', url: 'https://data.seoul.go.kr/dataList/OA-15486/S/1/datasetView.do' },
  seoulGuide: { label: '서울 열린데이터광장 — Open API 이용 안내', url: 'https://data.seoul.go.kr/together/guide/useGuide.do' },
  aiStudio: { label: 'Google AI Studio (Build)', url: 'https://aistudio.google.com/' },
  aiStudioDocs: { label: 'AI Studio Build 모드 공식 안내', url: 'https://ai.google.dev/gemini-api/docs/aistudio-build-mode' },
  github: { label: 'GitHub', url: 'https://github.com/' },
  cfDash: { label: 'Cloudflare 대시보드', url: 'https://dash.cloudflare.com/' },
  cfReact: { label: 'Cloudflare Pages — React 사이트 배포', url: 'https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/' },
  cfFunctions: { label: 'Cloudflare Pages Functions', url: 'https://developers.cloudflare.com/pages/functions/' },
  cfSecrets: { label: 'Pages Functions — Secrets', url: 'https://developers.cloudflare.com/pages/functions/bindings/#secrets' },
  cfCompat: { label: 'Workers 호환성 플래그(compatibility flags)', url: 'https://developers.cloudflare.com/workers/configuration/compatibility-flags/' },
  osmTiles: { label: 'OSM 타일 사용 정책', url: 'https://operations.osmfoundation.org/policies/tiles/' },
  osmCopyright: { label: 'OpenStreetMap 저작권·출처 표기', url: 'https://www.openstreetmap.org/copyright' },
} satisfies Record<string, DocLink>;
