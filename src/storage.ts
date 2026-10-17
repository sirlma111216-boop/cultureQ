// 이 강의안은 ‘내 앱 공개 주소’ 하나만 이 브라우저에 저장한다.
// 저장이 실패해도 읽기·복사·이동은 그대로 동작해야 한다.
import { useSyncExternalStore } from 'react';

const KEY = 'ccw-guide:app-url:v1';
const listeners = new Set<() => void>();
let memory = read();
let lastError = false;

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? '';
  } catch {
    lastError = true;
    return '';
  }
}

export function saveAppUrl(value: string): boolean {
  memory = value;
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
    lastError = false;
  } catch {
    lastError = true;
  }
  listeners.forEach((l) => l());
  return !lastError;
}

export function storageFailed() {
  return lastError;
}

export function useAppUrl(): string {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => memory,
  );
}

/** https 공개 주소만 받는다. 경로·검색어는 버리고 origin만 남긴다. */
export function normalizeAppUrl(input: string): { ok: true; url: string } | { ok: false; reason: string } {
  const raw = input.trim();
  if (!raw) return { ok: true, url: '' };
  let u: URL;
  try {
    u = new URL(raw.includes('://') ? raw : `https://${raw}`);
  } catch {
    return { ok: false, reason: '주소 형식이 아닙니다. 예: https://school-culture-curator.pages.dev' };
  }
  if (u.protocol !== 'https:') return { ok: false, reason: 'https:// 로 시작하는 공개 주소만 저장합니다.' };
  if (u.hostname === 'dash.cloudflare.com') return { ok: false, reason: '대시보드 주소가 아니라 …pages.dev 공개 주소를 넣어 주세요.' };
  if (u.username || u.password || u.search) return { ok: false, reason: '로그인 정보나 ?검색어가 없는 주소만 저장합니다.' };
  return { ok: true, url: u.origin };
}
