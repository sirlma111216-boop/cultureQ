import { useEffect, useRef, useState, type ReactNode } from 'react';
import { STEPS, TOTAL_MINUTES } from './content/steps';
import { StepView } from './components/StepView';
import { ErrorsPage, InstructorPage, IntroPage, ReferencePage } from './components/Pages';

interface PageDef {
  id: string;
  nav: string;
  sub?: string;
  group: 'start' | 'step' | 'help';
  render: () => ReactNode;
}

const PAGES: PageDef[] = [
  { id: 'intro', nav: '시작 안내', sub: '대상·준비물·완성 모습', group: 'start', render: () => <IntroPage /> },
  ...STEPS.map<PageDef>((s) => ({
    id: `step-${s.id}`,
    nav: `${s.id}. ${s.title}`,
    sub: `${s.minutes}분`,
    group: 'step',
    render: () => <StepView step={s} />,
  })),
  { id: 'errors', nav: '오류 도움말', sub: '증상별 복구 프롬프트', group: 'help', render: () => <ErrorsPage /> },
  { id: 'reference', nav: '참고자료', sub: '데이터 규칙·설정·프롬프트 모음', group: 'help', render: () => <ReferencePage /> },
  { id: 'instructor', nav: '강사용: 강의안 배포', group: 'help', render: () => <InstructorPage /> },
];

const ids = new Set(PAGES.map((p) => p.id));
const fromHash = () => {
  const h = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''));
  return ids.has(h) ? h : 'intro';
};

export default function App() {
  const [current, setCurrent] = useState(fromHash);
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const onHash = () => setCurrent(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    const heading = document.querySelector<HTMLElement>(`#page-${current} h2`);
    heading?.setAttribute('tabindex', '-1');
    heading?.focus({ preventScroll: true });
  }, [current]);

  const go = (id: string) => {
    setNavOpen(false);
    if (id === current) return;
    window.location.hash = id;
  };

  const idx = PAGES.findIndex((p) => p.id === current);
  const prev = PAGES[idx - 1];
  const next = PAGES[idx + 1];

  const navGroup = (group: PageDef['group'], label: string) => (
    <li className="nav-group">
      <span className="nav-group-label">{label}</span>
      <ul>
        {PAGES.filter((p) => p.group === group).map((p) => (
          <li key={p.id}>
            <a
              href={`#${p.id}`}
              aria-current={p.id === current ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(p.id);
              }}
            >
              <span>{p.nav}</span>
              {p.sub && <small>{p.sub}</small>}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }}>본문으로 건너뛰기</a>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <div>
              <p className="brand-kicker">교사 연수 · 단계별 실습 강의안</p>
              <h1>창체·동아리 문화활동 큐레이터 만들기</h1>
            </div>
          </div>
          <ul className="chips" aria-label="연수 요약">
            <li><b>대상</b> 창체·동아리 담당 교사</li>
            <li><b>준비물</b> 노트북 · 계정 4개</li>
            <li><b>소요</b> {TOTAL_MINUTES}분(0~13단계)</li>
          </ul>
          <div className="top-actions no-print">
            <button type="button" className="btn ghost nav-toggle" aria-expanded={navOpen} aria-controls="toc" onClick={() => setNavOpen((o) => !o)}>
              {navOpen ? '목차 닫기' : '단계 목차'}
            </button>
            <button type="button" className="btn" onClick={() => window.print()}>전체 인쇄</button>
          </div>
        </div>
      </header>

      <div className="layout">
        <nav id="toc" className={`toc no-print${navOpen ? ' open' : ''}`} aria-label="단계 목차">
          <ul>
            {navGroup('start', '시작')}
            {navGroup('step', '실습 단계')}
            {navGroup('help', '도움말')}
          </ul>
        </nav>

        <main id="main" ref={mainRef} tabIndex={-1}>
          <p className="print-only print-note">이 인쇄본에는 모든 단계와 접힌 프롬프트 전문이 포함되어 있습니다.</p>
          {PAGES.map((p) => (
            <section key={p.id} id={`page-${p.id}`} className={`page${p.id === current ? ' is-current' : ''}`}>
              {p.render()}
            </section>
          ))}
          <nav className="pager no-print" aria-label="이전·다음">
            {prev ? (
              <button type="button" className="btn ghost" onClick={() => go(prev.id)}>
                <small>이전</small> {prev.nav}
              </button>
            ) : <span />}
            {next ? (
              <button type="button" className="btn primary" onClick={() => go(next.id)}>
                <small>다음</small> {next.nav}
              </button>
            ) : <span />}
          </nav>
        </main>
      </div>
      <footer className="footer">
        <p>이 강의안은 외부 서비스의 로그인·키 발급·GitHub 저장·배포를 대신 수행하지 않습니다. 각 단계는 참가자가 직접 실행하고 확인합니다. 명세 확인 기준일 2026-10-16.</p>
      </footer>
    </>
  );
}
