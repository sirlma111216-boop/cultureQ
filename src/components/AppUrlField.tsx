import { useId, useState } from 'react';
import { normalizeAppUrl, saveAppUrl, useAppUrl } from '../storage';

// 참가자 앱의 공개 주소를 기록하는 칸. 강의안은 이 주소로 요청을 보내지 않고, 새 탭 링크만 만든다.
export function AppUrlField() {
  const saved = useAppUrl();
  const [draft, setDraft] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const id = useId();
  const value = draft ?? saved;

  const onSave = () => {
    const r = normalizeAppUrl(value);
    if (!r.ok) {
      setMsg(r.reason);
      return;
    }
    const stored = saveAppUrl(r.url);
    setDraft(null);
    setMsg(
      !r.url
        ? '저장된 주소를 지웠습니다.'
        : stored
          ? '이 브라우저에 저장했습니다.'
          : '이 브라우저에 저장하지 못했습니다(사생활 보호 모드 등). 주소를 메모장에 따로 적어 두세요.',
    );
  };

  const onClear = () => {
    if (!saved && !draft) return;
    if (!window.confirm('저장된 내 앱 공개 주소를 지울까요?')) return;
    saveAppUrl('');
    setDraft(null);
    setMsg('저장된 주소를 지웠습니다.');
  };

  return (
    <div className="app-url">
      <label htmlFor={id}>내 앱 공개 주소</label>
      <p className="small" id={`${id}-hint`}>
        Cloudflare가 발급한 <code>https://프로젝트명.pages.dev</code> 주소를 적습니다. 이 브라우저에만 저장되며, 강의안은 이 주소로 아무 요청도 보내지 않습니다.
      </p>
      <div className="row">
        <input
          id={id}
          type="url"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder="https://school-culture-curator.pages.dev"
          aria-describedby={`${id}-hint ${id}-msg`}
          value={value}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSave()}
        />
        <button type="button" className="btn" onClick={onSave}>저장</button>
        <button type="button" className="btn ghost" onClick={onClear}>지우기</button>
      </div>
      <p className="small" id={`${id}-msg`} role="status" aria-live="polite">{msg}</p>
      {saved && (
        <ul className="url-links">
          <li><a href={saved} target="_blank" rel="noopener noreferrer">내 앱 열기 ↗</a></li>
          <li><a href={`${saved}/api/culture?start=1&size=5`} target="_blank" rel="noopener noreferrer">내 앱의 /api/culture?start=1&amp;size=5 열기 ↗</a></li>
        </ul>
      )}
      <p className="print-only">기록한 주소: {saved || '________________________________'}</p>
    </div>
  );
}
