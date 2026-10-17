import { Fragment } from 'react';

/** 백틱(`)으로 감싼 부분만 <code>로 바꾸는 아주 작은 표시기. HTML은 해석하지 않는다. */
export function Inline({ text }: { text: string }) {
  const parts = text.split('`');
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <code key={i}>{p}</code> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}
