import { useEffect, useId, useRef, useState } from 'react';
import type { CopyItem } from '../content/prompts';

const KIND_LABEL: Record<CopyItem['kind'], string> = {
  prompt: 'AI Studio에 붙여 넣기',
  file: '파일 내용',
  text: '복사용 문구',
};

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 아래 대체 방식으로 넘어간다
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function CopyCard({ item }: { item: CopyItem }) {
  const lines = item.body.split('\n').length;
  const long = item.body.length > 600 || lines > 10;
  const [expanded, setExpanded] = useState(!long);
  const [wrap, setWrap] = useState(true);
  const [status, setStatus] = useState<'idle' | 'ok' | 'fail'>('idle');
  const [manual, setManual] = useState(false);
  const manualRef = useRef<HTMLTextAreaElement>(null);
  const bodyId = useId();

  useEffect(() => {
    if (manual) {
      manualRef.current?.focus();
      manualRef.current?.select();
    }
  }, [manual]);

  const onCopy = async () => {
    const ok = await copyText(item.body);
    setStatus(ok ? 'ok' : 'fail');
    if (!ok) setManual(true);
  };

  return (
    <figure className={`copy-card kind-${item.kind}`} aria-labelledby={`${bodyId}-title`}>
      <figcaption>
        <span className="copy-kind">{KIND_LABEL[item.kind]}</span>
        <strong id={`${bodyId}-title`}>{item.title}</strong>
        <span className="copy-meta">{item.body.length.toLocaleString()}자 · {lines}줄</span>
      </figcaption>
      {item.note && <p className="copy-note">{item.note}</p>}
      <div className="copy-tools no-print">
        <button type="button" className="btn primary" onClick={onCopy}>전문 복사</button>
        <button type="button" className="btn ghost" aria-pressed={wrap} onClick={() => setWrap((w) => !w)}>
          줄바꿈 {wrap ? '켜짐' : '꺼짐'}
        </button>
        {long && (
          <button type="button" className="btn ghost" aria-expanded={expanded} aria-controls={bodyId} onClick={() => setExpanded((e) => !e)}>
            {expanded ? '접기' : '펼치기'}
          </button>
        )}
        <button type="button" className="btn ghost" aria-expanded={manual} onClick={() => setManual((m) => !m)}>
          수동 복사
        </button>
        <span className={`copy-status ${status}`} role="status" aria-live="polite">
          {status === 'ok' && '복사했습니다. AI Studio 입력창에 붙여 넣으세요(Ctrl+V).'}
          {status === 'fail' && '자동 복사에 실패했습니다. 아래 상자에서 Ctrl+A → Ctrl+C로 복사하세요.'}
        </span>
      </div>
      {manual && (
        <div className="manual no-print">
          <label htmlFor={`${bodyId}-manual`}>수동 복사 상자 — 상자를 누르고 Ctrl+A(전체 선택) → Ctrl+C(복사). 휴대전화는 길게 눌러 ‘모두 선택’ → ‘복사’.</label>
          <textarea
            id={`${bodyId}-manual`}
            ref={manualRef}
            readOnly
            value={item.body}
            rows={Math.min(14, lines + 1)}
            onFocus={(e) => e.currentTarget.select()}
          />
        </div>
      )}
      <pre
        id={bodyId}
        className={`copy-body ${wrap ? 'wrap' : 'nowrap'} ${expanded ? 'expanded' : 'collapsed'}`}
        tabIndex={0}
        aria-label={`${item.title} 전문`}
      >
        {item.body}
      </pre>
      {!expanded && (
        <button type="button" className="fade-more no-print" onClick={() => setExpanded(true)} aria-controls={bodyId}>
          전문 펼쳐 보기 ({lines}줄)
        </button>
      )}
    </figure>
  );
}
