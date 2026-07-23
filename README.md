# EASYDEW MD 그로스 대시보드

디엔코스메틱스 뷰티MD 채용 지원용 AI 기반 업무 프로토타입입니다. 서비스기획자 → MD 직무 전환을 준비하며,
JD의 핵심 업무(직영몰 손익/ROAS 관리, 고객 인사이트 발굴, 광고 소재 테스트, 경쟁사 대응)를
AI 도구로 구현해봤습니다.

## 실행 방법

빌드 과정이나 서버가 필요 없는 순수 HTML/CSS/JS 프로젝트입니다.

- 가장 간단하게는 `index.html`을 브라우저로 더블클릭해서 열면 됩니다.
- VSCode에서 작업할 경우 **Live Server** 확장을 설치한 뒤 `index.html`에서 우클릭 → "Open with Live Server"를 사용하면 저장할 때마다 자동 새로고침됩니다.

## 파일 구조

```
이지듀 프로젝트/
├── index.html   # 페이지 구조 (사이드바 메뉴 3개: 경쟁사 가격 / 리뷰 인사이트 / ROAS 시뮬레이터)
├── style.css    # 전체 스타일 (CSS 변수 기반 디자인 시스템)
├── script.js    # 데이터(products/competitors/reviewInsights) + 메뉴별 로직 + Chart.js 렌더링
├── scripts/
│   └── crawl_reviews.py   # easydew.co.kr 리뷰 게시판 크롤러 (reviewInsights 원본 데이터 수집용)
└── 이지듀_MD_대시보드_설명자료.pdf   # 자소서/포트폴리오 첨부용 1페이지 요약
```

외부 의존성은 CDN에서 불러오는 [Chart.js 4.4.0](https://www.chartjs.org/) 하나뿐입니다 (`index.html` 상단 `<script>` 태그).

## 데이터 출처 및 주의사항

- 이지듀 제품명/가격/리뷰수: easydew.co.kr 공식몰 실데이터 (2026.07 조사)
- 경쟁사(넘버즈인·구달·AXIS-Y) 가격: 올리브영·각 브랜드 공식몰 공개 정보 (2026.07 조사)
- **리뷰 인사이트(리뷰 탭)는 [easydew.co.kr 상품 사용후기 게시판](https://easydew.co.kr/board/product/list.html?board_no=4)을 직접 크롤링한 실제 리뷰 원문**입니다. 감성 분포는 실제 별점 분포, 키워드 빈도는 원문 언급 횟수를 집계한 것이며, 제품별 표본 5~66건 기준(전수조사 아님, 2026.07 수집). 크롤링 스크립트는 `scripts/` 참고 — 목록 페이지를 순회해 제품별 리뷰 URL을 모으고, 각 리뷰 상세페이지의 JSON-LD(`articleBody`)에서 원문을 추출합니다.
- 원가율·물류비·손익분기·일별 가격 변동 로그 등 **비공개 재무/운영 데이터는 업계 평균 가정치**이며, `script.js` 상단 주석과 대시보드 내 "제작 노트"에 명시되어 있습니다. 실제 데이터로 교체하면 바로 운영 가능한 구조입니다.

## 진행 현황

- ✅ 리뷰 인사이트(② 탭): 시연용 예시 문구 → **실제 크롤링 리뷰 원문 4개 제품**으로 교체 (3000억 페스타 대용량 기미앰플 40mL·기미 앰플 쿠션 세트 1+1·기미백설크림 화이트토닝·EGF 기미 집중 패치)
- ✅ 가격 변동 알림(③ 탭): `checkPriceAlerts(thresholdPct)`로 함수화, 화면에서 임계치(%)를 조정하면 실시간 재계산. 실 연동 시 스크래핑 스케줄러(cron)가 `competitors`를 갱신한 뒤 이 함수만 호출하면 됨
- ✅ 데이터 소스 연동 지점: `products`/`competitors`를 `loadProducts()` / `loadCompetitors()` 비동기 함수로 감쌈. 실 연동 시 두 함수 내부만 카페24 Admin API·엑셀 export 파서로 교체하면 나머지 로직은 그대로 재사용 가능

## 다음에 이어서 할 일 (아이디어)

- 리뷰 크롤링 범위를 기미/미백 카테고리 전체 SKU로 확장하고 정기 배치로 자동 갱신
- USP/카피 제안(uspBank/copyBank)을 LLM API로 실시간 생성하도록 확장 (현재는 크롤링 리뷰를 근거로 수동 도출)
- `loadProducts()` / `loadCompetitors()`를 실제 카페24 Admin API·스크래핑 배치 결과와 연결
