// 강의안 내용 점검: 0~13단계, 프롬프트 01~09, 금지 문구, 키 노출 흔적을 확인한다.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const src = walk('src').map((f) => [f, readFileSync(f, 'utf8')]);
const all = src.map(([, t]) => t).join('\n');
const problems = [];

const steps = readFileSync('src/content/steps.tsx', 'utf8');
for (let i = 0; i <= 13; i++) if (!new RegExp(`\\bid: ${i},`).test(steps)) problems.push(`${i}단계 없음`);
for (let i = 1; i <= 9; i++) if (!all.includes(`프롬프트 0${i}:`)) problems.push(`프롬프트 0${i} 없음`);
for (const bad of ['추후 작성', 'TODO', 'TBD', 'lorem']) if (all.includes(bad)) problems.push(`금지 문구: ${bad}`);
if (/VITE_[A-Z_]*KEY\s*=/.test(all)) problems.push('VITE_ 키 변수 정의 흔적');

if (existsSync('dist')) {
  const dist = walk('dist').filter((f) => /\.(js|html|css)$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('\n');
  // 원천 주소는 안내 문구로만 등장해야 하며 실제 키처럼 보이는 경로가 붙으면 안 된다.
  if (/openapi\.seoul\.go\.kr:8088\/(?!\{KEY\}|실제키)[A-Za-z0-9]{10,}/.test(dist)) problems.push('dist에 키처럼 보이는 원천 URL');
  if (/fetch\(/.test(dist.replace(/\/\*[\s\S]*?\*\//g, '')) && /openapi\.seoul/.test(dist) && /fetch\(["'`]http:\/\/openapi/.test(dist)) problems.push('dist에서 원천 API를 직접 fetch');
}

if (problems.length) {
  console.error('점검 실패:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log('점검 통과: 0~13단계, 프롬프트 01~09, 금지 문구 없음, 키 노출 흔적 없음');
