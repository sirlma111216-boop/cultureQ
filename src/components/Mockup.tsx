// ‘기본판 완성 모습’ — 실제 앱 캡처가 아닌 설명용 화면이다.
export function Mockup() {
  return (
    <figure className="mockup" aria-label="기본판 완성 모습 설명용 화면">
      <div className="mock-label">설명용 화면 · 실제 앱 캡처 아님 · 모든 행사는 연수용 가상 자료</div>
      <div className="mock-app" aria-hidden="true">
        <div className="mock-top">
          <b>우리 반 문화나들이</b>
          <span className="mock-badge">연수용 가상 자료</span>
          <span className="mock-dim">조회 시각 10:42 · 현재 읽은 자료에서 검색</span>
        </div>
        <div className="mock-body">
          <div className="mock-filter">
            <i>날짜 11.03 ~ 11.07</i>
            <i>자치구 전체</i>
            <i>분야 전시</i>
            <i>유무료 무료만</i>
            <i>대상 키워드 ‘청소년’</i>
          </div>
          <div className="mock-list">
            <div className="mock-tabs"><u>목록</u><span>지도</span><span>달력</span></div>
            <div className="mock-item sel"><b>연수용 가상 미술 전시 A</b><span>무료 · 기간 겹침 · 휴관 확인 필요</span></div>
            <div className="mock-item"><b>연수용 가상 음악 공연 B</b><span>유료(요금 원문) · 만 13세 이상</span></div>
            <div className="mock-item"><b>연수용 가상 체험 C</b><span>유무료 미제공 · 위치 미제공</span></div>
          </div>
          <div className="mock-detail">
            <b>연수용 가상 미술 전시 A</b>
            <span>행사 기간 11.02 ~ 11.05</span>
            <span>시간 원문: 확인 필요</span>
            <span>이용대상 원문: 누구나</span>
            <span className="mock-check">□ 교사 확인: 단체 관람</span>
          </div>
        </div>
        <div className="mock-compare">후보 비교함 2/4 · 안내문 초안 인쇄</div>
      </div>
    </figure>
  );
}
