import type { Step } from '../content/steps';
import type { DocLink } from '../content/links';
import { CopyCard } from './CopyCard';
import { Inline } from './Inline';

function ExtLink({ l }: { l: DocLink }) {
  return (
    <a href={l.url} target="_blank" rel="noopener noreferrer">
      {l.label} <span className="sr-only">(새 탭)</span>↗
    </a>
  );
}

export function StepView({ step }: { step: Step }) {
  const h = `step-${step.id}`;
  return (
    <article aria-labelledby={`${h}-title`}>
      <header className="step-head">
        <p className="eyebrow">{step.id}단계 · {step.minutes}분</p>
        <h2 id={`${h}-title`}>{step.title}</h2>
      </header>

      <section className="block goal">
        <h3>목표</h3>
        <p>{step.goal}</p>
      </section>

      <section className="block">
        <h3>작업할 사이트</h3>
        <ul className="sites">
          {step.sites.map((s) => (
            <li key={s.url}>
              <ExtLink l={s} />
              <span className="url">{s.url}</span>
            </li>
          ))}
        </ul>
      </section>

      {step.extra && <section className="block extra">{step.extra}</section>}

      <section className="block">
        <h3>절차 — 한 번에 한 행동씩</h3>
        <ol className="procedure">
          {step.procedure.map((p, i) => (
            <li key={i}><Inline text={p} /></li>
          ))}
        </ol>
      </section>

      {step.copies && step.copies.length > 0 && (
        <section className="block">
          <h3>복사 프롬프트·파일</h3>
          {step.copies.map((c) => <CopyCard key={c.id} item={c} />)}
        </section>
      )}

      {step.after && <section className="block extra">{step.after}</section>}

      <div className="grid-2">
        <section className="block">
          <h3>예상 결과</h3>
          <ul>{step.expected.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>
        </section>
        <section className="block">
          <h3>직접 시험하기</h3>
          <ul>{step.tryIt.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>
        </section>
      </div>

      <section className="block">
        <h3>막혔을 때</h3>
        <dl className="stuck">
          {step.stuck.map((s, i) => (
            <div key={i}>
              <dt>{s.q}</dt>
              <dd><Inline text={s.a} /></dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="block success">
        <h3>이 단계의 성공 기준</h3>
        <p>{step.success}</p>
      </section>

      {step.docs.length > 0 && (
        <section className="block">
          <h3>공식 문서</h3>
          <ul className="docs">{step.docs.map((d) => <li key={d.url}><ExtLink l={d} /></li>)}</ul>
        </section>
      )}
    </article>
  );
}
