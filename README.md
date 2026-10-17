# 창체·동아리 문화활동 큐레이터 만들기 — 연수 강의안

교사 연수용 단계별 강의안 웹페이지(React + Vite 정적 사이트)입니다.
참가자는 이 페이지를 보며 0~13단계를 따라 자기 AI Studio 프로젝트에서 ‘우리 반 문화나들이’ 앱을 만들고 Cloudflare Pages로 공개합니다.

- 이 강의안은 **공공 API를 호출하지 않고 인증키를 받지 않습니다.** 서버 함수·환경변수가 없습니다.
- 참가자 앱의 `functions`·Secret 설정은 ‘복사할 실습 내용’으로만 들어 있습니다.
- 브라우저 저장(localStorage)은 ‘내 앱 공개 주소’ 하나뿐입니다(키 `ccw-guide:app-url:v1`).

## 실행

```bash
npm install
npm run dev        # 개발 서버
npm run build      # 타입 검사 + dist 생성
npm run preview    # dist 미리보기
npm run check:content  # 0~13단계·프롬프트 01~09·금지 문구·키 노출 흔적 점검
```

## 배포 (강사)

1. 이 폴더를 `school-culture-curator-workshop-guide`라는 **별도** GitHub 저장소에 올립니다(참가자 앱 저장소와 분리).
2. Cloudflare → Workers & Pages → Create application → Pages → Import an existing Git repository.
3. Build command `npm run build`, Build output directory `dist`, 환경변수 없음.
4. 발급된 `https://…pages.dev` 주소를 참가자에게 전달합니다. 수정 후 Push하면 같은 주소로 자동 재배포됩니다.

### 현재 배포 상태

- 공개 주소: https://cultureq.pages.dev (Cloudflare Pages 프로젝트 `cultureq`, Wrangler 직접 업로드 방식)
- 이 프로젝트는 Git 연결이 아니라서 **GitHub에 Push해도 자동 배포되지 않습니다.** 수정 후 아래 명령으로 다시 배포합니다.

```bash
npm run build
npx wrangler pages deploy dist --project-name cultureq --branch main
```

## 구조

```
src/
  content/
    steps.tsx     0~13단계 본문(목표·사이트·절차·예상 결과·시험·막혔을 때·성공 기준)
    prompts.ts    프롬프트 01~09, 선택 디자인 프롬프트, 13단계 요청, wrangler.toml·_routes.json 카드
    errors.ts     공통 오류 12종과 오류별 복구 프롬프트
    links.ts      공식 문서 링크(2026-10-16 확인 기준)
  components/     복사 카드, 단계 화면, 도식, 설명용 완성 화면, 앱 주소 칸
  App.tsx         목차·해시 라우팅(#step-3 등)·이전/다음·전체 인쇄
```

내용 수정은 `src/content/`만 고치면 됩니다. 전체 인쇄는 모든 단계와 접힌 프롬프트 전문을 포함하고 메뉴·버튼을 숨깁니다.

## 연수 전 확인할 것

- 실제 키로 만든 참가자 앱 시험본에서 `/api/culture`·500건 페이지 읽기·Cloudflare→서울시(포트 8088) 통신을 직접 확인합니다.
- 각 서비스의 메뉴 이름과 무료 요금제 한도, 서울시 API 승인 조건을 공식 문서에서 다시 확인합니다.
- API 장애 시 가상 모드로 화면 실습을 진행하고 실제 연결 단계는 미완료로 남깁니다.
