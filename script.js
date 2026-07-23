/* =========================================================
   DATA — 실데이터 (easydew.co.kr 및 공개 검색 기준, 2026.07)
   ========================================================= */
let products = [
  {name:"기미 앰플 쿠션 세트 (멜라 비 토닝 앰플 쿠션)", list:79600, sale:49800, reviews:16874, cat:"기미/미백"},
  {name:"기미매트팩트 1+1", list:99600, sale:49800, reviews:8439, cat:"기미/미백"},
  {name:"EGF 손상케어크림 105ml (베리어 리페어 크림)", list:59800, sale:32900, reviews:4901, cat:"손상/보습"},
  {name:"기미 썬세럼 (튜브형)", list:98000, sale:39000, reviews:4691, cat:"기미/미백"},
  {name:"EGF 기미크림 105ml (멜라 글루타치온 크림)", list:59800, sale:32400, reviews:4308, cat:"기미/미백"},
  {name:"DW-EGF 멜라토닝 패치 (기미 집중 패치)", list:30000, sale:14900, reviews:4089, cat:"기미/미백"},
  {name:"기미 글로우밤 팩트", list:49800, sale:36800, reviews:3315, cat:"기미/미백"},
  {name:"UV차단 투명 선패치", list:36000, sale:26000, reviews:2612, cat:"기미/미백"},
  {name:"비타민C 부스팅앰플 25", list:69000, sale:39900, reviews:2169, cat:"미백/톤업"},
  {name:"기미 앰플 쿠션 리필 1개", list:29800, sale:24900, reviews:2140, cat:"기미/미백"},
  {name:"EGF 프레좀 RX 탄력크림 50mL", list:26000, sale:19900, reviews:1533, cat:"탄력/주름"},
  {name:"B3+B5 흔적 세럼 29ml", list:99600, sale:49800, reviews:1280, cat:"트러블/흔적"},
  {name:"EGF 기미앰플 집중 부스터 샷", list:79000, sale:49000, reviews:1236, cat:"기미/미백"},
  {name:"이지듀 MD 크림 85g", list:38000, sale:38000, reviews:358, cat:"손상/보습"},
  {name:"로즈 기미앰플 (한정 특가)", list:297000, sale:100000, reviews:177, cat:"기미/미백"},
  {name:"이지듀 MD 리젠크림 85g (2세대)", list:55000, sale:55000, reviews:13, cat:"손상/보습"},
];

// prevSale: 어제자 판매가(시연용 가정치) — 실연동 시 매일 스크래핑 결과를 여기에 저장/비교
let competitors = [
  {brand:"이지듀", name:"기미 앰플 쿠션 세트", size:14, unit:"g", list:79600, sale:49800, prevSale:49800, reviews:16874},
  {brand:"이지듀", name:"EGF 기미크림 105ml", size:105, unit:"ml", list:59800, sale:32400, prevSale:32400, reviews:4308},
  {brand:"이지듀", name:"기미 썬세럼", size:40, unit:"ml", list:98000, sale:39000, prevSale:39000, reviews:4691},
  {brand:"넘버즈인", name:"5번 글루타치온C 흔적 앰플", size:30, unit:"ml", list:28000, sale:25200, prevSale:28000, reviews:12400},
  {brand:"구달", name:"청귤 비타C 잡티케어 세럼", size:30, unit:"ml", list:28000, sale:19300, prevSale:19300, reviews:9800},
  {brand:"AXIS-Y", name:"다크스팟 코렉팅 글로우 세럼", size:50, unit:"ml", list:25000, sale:21500, prevSale:25000, reviews:15600},
];

/* =========================================================
   DATA ADAPTER — 실 데이터소스 연동 지점
   지금은 위 하드코딩 배열을 그대로 반환하지만, 실제 운영에서는
   아래 두 함수 내부만 카페24 Admin API / 엑셀·CSV export 파서로
   교체하면 됩니다. 나머지 렌더링·계산 로직은 수정할 필요가 없습니다.
   ========================================================= */
async function loadProducts(){
  // TODO(실연동): return await fetch('/api/cafe24/products').then(r=>r.json());
  return products;
}
async function loadCompetitors(){
  // TODO(실연동): return await fetch('/api/competitor-prices').then(r=>r.json()); (일 1회 스크래핑 배치 결과)
  return competitors;
}

/**
 * easydew.co.kr 상품 사용후기 게시판(board_no=4)에서 직접 크롤링한 실제 리뷰 원문 기반.
 * (2026.07 수집, 공개 게시물만 대상. sentiment는 실제 별점 분포, keywords는 원문 언급 빈도 집계.)
 * n=표본 리뷰 수, avg=평균 별점, url=게시판 원문 링크.
 */
const reviewInsights = {
  "[3000억 페스타] 대용량 기미앰플 40mL": {
    n:66, avg:4.67, url:"https://easydew.co.kr/board/product/list.html?board_no=4",
    sentiment:[91,9,0],
    keywords:[["기미개선 체감",25],["피부톤 개선",13],["촉촉함·보습",8],["가격·재구매 언급",6],["트러블·자극 언급",6]],
    positive:[
      ["“저는 효과를 본터라 솔직한 후기남겨요~ 반신반의하면서 구매했는데 몇번 안썼는데 2회때부터 확실히 좋아진게 보였어요. 눈옆 기미 안에 하얗게 옅어진 부분이 생겼어요.”", "easydew.co.kr 상품후기 · 실제 리뷰 (5점, 2023.03)"],
      ["“바르고 나면 확실히 피부 톤은 진짜 환해지는게 얼굴에서 광이나요! 앰플만 발라도 피부 안쪽까지 채워주는 느낌이라 촉촉하고 탱글탱글해요.”", "easydew.co.kr 상품후기 · 실제 리뷰 (5점, 2023.02)"],
    ],
    negative:[
      ["“사용감은 다소 오일리하고 다음날 피부톤이 좀 맑아지는 것 같아요. 아주 드라마틱한 변화가 나타나지는 않네요. 재구매는 가격대비 반반입니다.”", "easydew.co.kr 상품후기 · 실제 리뷰 (3점, 2023.02)"],
      ["“제품은 좋아요 배송이 너무나 느려요.”", "easydew.co.kr 상품후기 · 실제 리뷰 (3점, 2023.03)"],
    ]
  },
  "[한정수량] 기미 앰플 쿠션 세트 1+1": {
    n:5, avg:4.0, url:"https://easydew.co.kr/board/product/list.html?board_no=4",
    sentiment:[80,0,20],
    keywords:[["케이스·컬러 디자인",5],["밀착감(들뜨지 않음)",1]],
    positive:[
      ["“이지듀 기미 앰플 써보고 믿음가는 제품으로 픽 팩트까지 나오다니....의심없이 바로주문했어요. 21호 페어는 처음써보는데 색상 예쁘네요. 케이스도 초록초록해서 눈에 띄고 깔끔하니 좋아요.”", "easydew.co.kr 상품후기 · 실제 리뷰 (4점, 2024.10)"],
    ],
    negative:[
      ["“엠플이 왜 안오나 했더니 회원가입해야주는거였네요 ㅡㅡ 작게 써놓고 이러기있습니까?”", "easydew.co.kr 상품후기 · 실제 리뷰 (2점, 2024.10)"],
    ]
  },
  "[기미백설크림] DW-EGF크림 화이트토닝 (50mLx2EA)": {
    n:13, avg:4.62, url:"https://easydew.co.kr/board/product/list.html?board_no=4",
    sentiment:[92,8,0],
    keywords:[["피부톤·홍조 개선",7],["촉촉함·수분감",4],["꾸준 사용·재구매",3],["끈적임 없음",2]],
    positive:[
      ["“매일매일 자기 전에 꾸준히 사용하고 잤는데 어느 순간 눈가 아래 주근깨가 연해지는 거같더니 처음이랑 확연히 피부톤이 전체적으로 밝아지고 코 옆에 붉은기가 완전 연해지고... 피부가 애기 피부가 되가고 있습니다.”", "easydew.co.kr 상품후기 · 실제 리뷰 (5점, 2022.10)"],
      ["“촉촉하고 부드러워서 수분크림처럼 바르기 좋아요. 꾸준히 바르니까 피부가 밝아지고 투명해지는게 눈에 보이네요. 잡티도 조금씩 옅어지고 있어서 너무 좋아요.”", "easydew.co.kr 상품후기 · 실제 리뷰 (5점, 2022.11)"],
    ],
    negative:[]
  },
  "EGF 기미 집중 패치": {
    n:5, avg:5.0, url:"https://easydew.co.kr/board/product/list.html?board_no=4",
    sentiment:[100,0,0],
    keywords:[["미백·톤개선 체감",4],["밀착감·편안한 사용감",2],["촉촉함",2],["빠른 효과 체감",2]],
    positive:[
      ["“패치가 완전 쫀득쫀득해서 붙이고 자도 잘 붙어있더라구요. 권장시간이 4-8시간이라 항상 붙이고 자고 있어요. 앰플이랑 쓰니까 진짜 효과가 빨리 나타났어요.”", "easydew.co.kr 상품후기 · 실제 리뷰 (5점, 2022.11)"],
      ["“오랜시간 붙이고있어도 불편감없고, 띄어낼때도 하나도 아프지않아요. 전 효과보고있습니다. 기미색이 옅어졌어요. 확실히 미백에 도움이됩니다.”", "easydew.co.kr 상품후기 · 실제 리뷰 (5점, 2022.09)"],
    ],
    negative:[]
  }
};

const defaultInsightKey = "[3000억 페스타] 대용량 기미앰플 40mL";

/* =========================================================
   VOC 모니터링 피드 — easydew.co.kr 상품후기 게시판(board_no=4) 전체 카테고리에서
   직접 크롤링한 실제 리뷰 36건(2026.07 수집, 2022.10~2025.09 작성분). 특정 4개
   제품에 한정하지 않고 여러 카테고리를 섞어 "신규 리뷰 인박스" 워크플로우를 시연한다.
   실 서비스에서는 스케줄러가 매일 신규 게시물만 수집해 이 배열에 추가하면 된다.
   (수집 스크립트: scripts/crawl_reviews.py)
   ========================================================= */
const vocFeed = [
  {date:"2025-09-30", star:5, product:"쿠션 샘플(증정)", title:"이지듀 쿠션 샘플을 종류별로 테스트해 볼 수 있어서 좋아요. 21호와 22호 차이가 궁금", url:"https://easydew.co.kr/article/상품-사용후기/4/165166/page/42/"},
  {date:"2025-05-28", star:1, product:"[한정수량] 기미매트팩트 1+1 단독 특가", title:"광고가 많아서 구매해봤는데 .......", url:"https://easydew.co.kr/article/상품-사용후기/4/52642/page/19/"},
  {date:"2025-05-14", star:5, product:"[100억 돌파] 여름 기미 매트 팩트 특가", title:"여름도 다가오고 해서 매트타입으로 구맸어요~ 커버력 좋아요.", url:"https://easydew.co.kr/article/상품-사용후기/4/51973/page/87/"},
  {date:"2025-05-14", star:4, product:"[100억 돌파] 여름 기미 매트 팩트 특가", title:"광고보고 혹시나 했는데 발림성은 괜찮은데 지속력은 오래가지않아요.", url:"https://easydew.co.kr/article/상품-사용후기/4/51971/page/75/"},
  {date:"2025-05-14", star:5, product:"[48시간 타임특가🧧] 기미 앰플 쿠션", title:"엄마가 써보고 좋다고 하셔서 재구매하면서 제것도 구매했는데요 좋네요", url:"https://easydew.co.kr/article/상품-사용후기/4/51968/page/85/"},
  {date:"2025-05-14", star:2, product:"[48시간 타임특가🧧] 기미 앰플 쿠션", title:"불만족", url:"https://easydew.co.kr/article/상품-사용후기/4/51964/page/66/"},
  {date:"2025-05-07", star:5, product:"베리어리페어 크림 50ml", title:"프락셀 레이저 시술을 받고 재생크림을 찾다가 챗gpt한테 추천 받아서 사봤습니다. 리뷰도 좋고 많은 사람들...", url:"https://easydew.co.kr/article/상품-사용후기/4/51405/page/69/"},
  {date:"2024-10-11", star:4, product:"[한정수량] 기미 앰플 쿠션 세트 1+1", title:"이지듀 기미 앰플 써보고 믿음가는 제품으로 픽 팩트까지 나오다니....의심없이 바로주문했어요. 21호 페어...", url:"https://easydew.co.kr/article/상품-사용후기/4/38882/page/4/"},
  {date:"2024-10-09", star:2, product:"[한정수량] 기미 앰플 쿠션 세트 1+1", title:"불만족", url:"https://easydew.co.kr/article/상품-사용후기/4/38793/page/3/"},
  {date:"2023-08-22", star:4, product:"[~50%] SOS 트러블 스팟 15ml", title:"턱쪽에 좁쌀이 좀 있어서 주문했는데 살짝 작아진듯?! 한느낌이 드는데 아예 없어지닌 않았어요 흔적에는 좀...", url:"https://easydew.co.kr/article/상품-사용후기/4/22390/page/86/"},
  {date:"2023-08-12", star:5, product:"EGF 손상케어크림 105ml (크림105ml 유통기한: 2027.01)", title:"이지듀 다른더 쓰다가 이번에 편평사마귀 제거하고 재생에 좋다해서 주문했어요", url:"https://easydew.co.kr/article/상품-사용후기/4/22192/page/57/"},
  {date:"2023-08-08", star:5, product:"DW- EGF 크림 모이스트 플러스 50ml (기존)", title:"피부과에서 시술 후 바르는 재생크림", url:"https://easydew.co.kr/article/상품-사용후기/4/22127/page/81/"},
  {date:"2023-07-19", star:3, product:"[NEW] 스페셜 홈케어 마이크로샷 ~75%", title:"패키지 부터 조금 실망햇습니다. 적은 용량을 사긴 햇지만 용량이 너무 적고 니들도 한번에 샤르륵 녹아 버...", url:"https://easydew.co.kr/article/상품-사용후기/4/21681/page/53/"},
  {date:"2023-06-27", star:5, product:"[NEW] 스페셜 홈케어 마이크로샷 ~75%", title:"효과바로 떠네요 ! 제구매 할거에요", url:"https://easydew.co.kr/article/상품-사용후기/4/21402/page/82/"},
  {date:"2023-06-26", star:3, product:"[~66%] EGF 기미관리 앰플 30ml", title:"첫 느낌은 발림성이 너무 좋아서 실리콘 성분이 들었나보다 였어요 가격은 부담되네요 이게 효과를 느끼려면...", url:"https://easydew.co.kr/article/상품-사용후기/4/21382/page/29/"},
  {date:"2023-06-12", star:4, product:"[~66%] EGF 기미관리 앰플 30ml", title:"앰플과 마스크를 같이 주문했고, 마스크팩은 자주 하지 않았습니다. 앰플은 매일 밤 꼭 발랐어요. 워낙 깊고...", url:"https://easydew.co.kr/article/상품-사용후기/4/21233/page/12/"},
  {date:"2023-03-12", star:5, product:"[3000억 페스타] 대용량 기미앰플 40mL (배송 안내: 7월 14일부터 순차 출고 예정)", title:"1주일 사용했습니다", url:"https://easydew.co.kr/article/상품-사용후기/4/19956/page/77/"},
  {date:"2023-03-08", star:5, product:"[3000억 페스타] 대용량 기미앰플 40mL (배송 안내: 7월 14일부터 순차 출고 예정)", title:"즉각적인 미백효과가 있어요", url:"https://easydew.co.kr/article/상품-사용후기/4/19912/page/3/"},
  {date:"2023-02-24", star:5, product:"도자기결 세트", title:"드디어 깨순이 탈출 ㅠㅠ", url:"https://easydew.co.kr/article/상품-사용후기/4/19793/page/12/"},
  {date:"2023-02-24", star:5, product:"DW-EGF 크림 리미티드 70ml", title:"원래 김우리샵에서 공동구매로사는초록이!!!근데똑떨어졌지모야ㅜㅜ. 나는원래 아무거나못바름 잘못바르면얼...", url:"https://easydew.co.kr/article/상품-사용후기/4/19780/page/6/"},
  {date:"2023-02-17", star:4, product:"[기미백설크림] DW-EGF크림 화이트토닝 (50MLx2EA)", title:"이지듀에서 나온 미백크림인데 당근 좋겠죠 기대되요", url:"https://easydew.co.kr/article/상품-사용후기/4/19720/page/69/"},
  {date:"2023-02-17", star:5, product:"DW- EGF 크림 모이스트 플러스 50ml (기존)", title:"EGF빨간거 초록색 다써봤어요 빨간건 레이져 받고쓰기 좋고 초록색은 데일리로 좋았구요 신상나와서 바로구...", url:"https://easydew.co.kr/article/상품-사용후기/4/19719/page/80/"},
  {date:"2023-01-31", star:4, product:"DW-EGF 크림 리미티드 플러스 15ml", title:"너무좋아요. 용량 큰거좀 만들어주세요. 금방써요. 사용감 좋고 바르면 피부가 보들보들해요. 트러블도 없어...", url:"https://easydew.co.kr/article/상품-사용후기/4/19642/page/72/"},
  {date:"2023-01-31", star:5, product:"리페어컨트롤 에센셜 베리어 미스트 60ML", title:"친구가 너무 좋대서 사봄", url:"https://easydew.co.kr/article/상품-사용후기/4/19641/page/86/"},
  {date:"2023-01-17", star:4, product:"DW-EGF 더블 시너지 앰플 50ml", title:"사용 후 당김 느껴지지 않고 촉촉해요 눈에 띄는 효과는 아직 모르겠고 조금 더 사용해봐야할듯 합니다. 스...", url:"https://easydew.co.kr/article/상품-사용후기/4/19595/page/50/"},
  {date:"2023-01-15", star:5, product:"EGF 프레좀 RX 탄력크림 특가 50mL", title:"바르고 나면 흡수력도 좋고 촉촉해서 만족해요", url:"https://easydew.co.kr/article/상품-사용후기/4/19584/page/38/"},
  {date:"2023-01-11", star:5, product:"DW-EGF 크림 리미티드 70ml", title:"친구 피부 광나는거 보고 따라샀습니다 저에게도 맡길 바랍니다 ㅎㅎ", url:"https://easydew.co.kr/article/상품-사용후기/4/19572/page/59/"},
  {date:"2023-01-05", star:5, product:"[기미백설크림] DW-EGF크림 화이트토닝 (50MLx2EA)", title:"재 구매하여 잘 사용하겠읍니딘", url:"https://easydew.co.kr/article/상품-사용후기/4/19554/page/33/"},
  {date:"2022-12-20", star:4, product:"[블프 한정] DW-EGF 리더마 앰플 (1ml*14ea)", title:"바르면 아주촉촉해요 저녁에 바르고 아침에 일어나도 당기지않아요", url:"https://easydew.co.kr/article/상품-사용후기/4/16805/page/69/"},
  {date:"2022-12-18", star:5, product:"[TOP크림] [깐달걀크림] DW-EFG 크림 프레좀 RX 50ML X2 + 연말결산 이지키트 추가 증정!", title:"번쩍번쩍 광나는 피부", url:"https://easydew.co.kr/article/상품-사용후기/4/16792/page/86/"},
  {date:"2022-11-28", star:5, product:"EGF 기미 집중 패치", title:"보습력 + 맑은 피부톤", url:"https://easydew.co.kr/article/상품-사용후기/4/16688/page/16/"},
  {date:"2022-11-28", star:5, product:"도자기결 세트", title:"5일만에 효과 봤어요!!", url:"https://easydew.co.kr/article/상품-사용후기/4/16682/page/83/"},
  {date:"2022-11-07", star:5, product:"듀얼 클렌징 브러쉬", title:"브러쉬 너무 좋아서 다른 거 못쓰겠어요.. 지갑 열리게 하는 제품,,", url:"https://easydew.co.kr/article/상품-사용후기/4/16551/page/44/"},
  {date:"2022-11-07", star:5, product:"카밍컨트롤 톤업 커버 크림40ML", title:"보기 싫은 피부 완벽히 커버하네요. 역시 이지듀 최고!!", url:"https://easydew.co.kr/article/상품-사용후기/4/16549/page/73/"},
  {date:"2022-11-06", star:5, product:"듀얼 클렌징 브러쉬", title:"듀얼 클렌징 브러쉬 후기", url:"https://easydew.co.kr/article/상품-사용후기/4/16531/page/76/"},
  {date:"2022-10-26", star:5, product:"[빨간통크림] DW-EGF 크림 프레좀 RX (30ml X3ea)(유통기한 2026.11까지)", title:"제가 젤 조아하는 크림이에요 빨간통 크림.... 나만 알고싶은 크림... 정말 깐달걀크림이라는 별명이 딱이에...", url:"https://easydew.co.kr/article/상품-사용후기/4/16421/page/47/"},
];

/**
 * 제품명 기반 카테고리 자동 분류. 실 서비스에서는 카페24 상품 카테고리 API 값을
 * 그대로 쓰면 되지만, 여기서는 크롤링한 제품명만으로 분류하는 규칙 기반 로직을 시연한다.
 */
function classifyCategory(product){
  if(/기미/.test(product)) return "기미/미백";
  if(/화이트|미백|톤업|브라이트닝/.test(product)) return "미백/톤업";
  if(/트러블|스팟/.test(product)) return "트러블/흔적";
  if(/탄력|리프팅|링클/.test(product)) return "탄력/주름";
  if(/쿠션|비비|팩트|커버 크림/.test(product)) return "메이크업";
  if(/클렌징|폼|브러쉬/.test(product)) return "클렌징";
  if(/손상|리페어|모이스트|크림|보습|베리어|앰플|세럼|패치|마스크|샷|세트/.test(product)) return "손상/보습";
  return "기타";
}

/** 리뷰 원문 키워드 기반 이슈 자동 태깅. 신규 리뷰가 들어올 때마다 실행하면 된다. */
const ISSUE_RULES = [
  ["광고 관련 불만", /광고/],
  ["지속력 부족", /지속력|오래가지\s*않/],
  ["트러블·자극", /트러블|자극|따갑|좁쌀/],
  ["가격 부담", /가격.{0,4}(비싸|부담)/],
  ["효과 미체감", /효과.{0,6}(없|모르겠|글쎄|의문)|아직.{0,6}모르겠/],
  ["발림성·흡수", /발림성|흡수력/],
  ["보습·촉촉함", /촉촉|보습/],
  ["커버력", /커버력|커버하|커버해/],
  ["구성·패키지", /패키지|사은품|개별포장/],
  ["재구매 의사", /재구매|재구입|또\s*구매/],
];
function classifyIssues(title){
  return ISSUE_RULES.filter(([,re])=>re.test(title)).map(([label])=>label);
}

function renderVocFeed(){
  const catFilter = document.getElementById("vocCatFilter").value;
  const starFilter = document.getElementById("vocStarFilter").value;

  const rows = vocFeed.map(r=>({
    ...r,
    category: classifyCategory(r.product),
    issues: classifyIssues(r.title),
    low: r.star!=null && r.star<=3,
  })).filter(r=>{
    if(catFilter!=="all" && r.category!==catFilter) return false;
    if(starFilter==="low" && !r.low) return false;
    return true;
  });

  document.getElementById("vocTotal").textContent = rows.length+"건";
  document.getElementById("vocLow").textContent = rows.filter(r=>r.low).length+"건";

  const tagCount = {};
  rows.forEach(r=>r.issues.forEach(t=>{ tagCount[t] = (tagCount[t]||0)+1; }));
  const topTag = Object.entries(tagCount).sort((a,b)=>b[1]-a[1])[0];
  document.getElementById("vocTopIssue").textContent = topTag ? `${topTag[0]} (${topTag[1]}건)` : "해당 없음";

  document.getElementById("vocList").innerHTML = rows.map(r=>`
    <div class="voc-row ${r.low?'low':''}">
      <div class="voc-meta">${r.date}<br><span class="voc-star">${"★".repeat(r.star||0)}${"☆".repeat(5-(r.star||0))}</span></div>
      <div class="voc-body">
        <div class="voc-product">${r.product}</div>
        <div class="voc-title">${r.title}</div>
        <div class="voc-tags">
          <span class="tag cat">${r.category}</span>
          ${r.issues.map(t=>`<span class="tag">${t}</span>`).join("")}
          ${r.low?'<span class="tag warn">CS 대응 필요</span>':''}
        </div>
      </div>
      <a class="voc-link" href="${r.url}" target="_blank" rel="noopener">원문 보기 ↗</a>
    </div>
  `).join("");
}

const vocCatSelect = document.getElementById("vocCatFilter");
const vocCategories = [...new Set(vocFeed.map(r=>classifyCategory(r.product)))].sort();
vocCatSelect.innerHTML = `<option value="all">전체 카테고리</option>` +
  vocCategories.map(c=>`<option value="${c}">${c}</option>`).join("");
vocCatSelect.addEventListener("change", renderVocFeed);
document.getElementById("vocStarFilter").addEventListener("change", renderVocFeed);
renderVocFeed();

/* =========================================================
   TAB SWITCH — sidebar + mobile bottom-nav share .tab-btn,
   so keep both copies of the active tab in sync.
   ========================================================= */
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const tab = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    document.getElementById("view-"+tab).classList.add("active");
  });
});

/* =========================================================
   HEADER IDENTITY METRICS
   ========================================================= */
document.getElementById("hmSku").textContent = products.length+"개";
document.getElementById("hmBrand").textContent =
  new Set(competitors.filter(c=>c.brand!=="이지듀").map(c=>c.brand)).size+"개 브랜드";
document.getElementById("hmReview").textContent = Object.keys(reviewInsights).length+"개 제품";

/* =========================================================
   TAB 1: ROAS SIMULATOR
   ========================================================= */
const productSelect = document.getElementById("productSelect");
async function initProductSelect(){
  products = await loadProducts();
  products.forEach((p,i)=>{
    const o=document.createElement("option");
    o.value=i; o.textContent = `${p.name} · 판매가 ${p.sale.toLocaleString()}원`;
    productSelect.appendChild(o);
  });
}

const presets = {
  conservative:{cpc:600, cvr:1.6, cogs:36, returnRate:6.5},
  current:{cpc:450, cvr:2.4, cogs:32, returnRate:4.5},
  aggressive:{cpc:380, cvr:3.2, cogs:30, returnRate:4.0},
};
document.getElementById("presetBtns").addEventListener("click", (e)=>{
  const btn = e.target.closest("button"); if(!btn) return;
  document.querySelectorAll("#presetBtns button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  const p = presets[btn.dataset.preset];
  document.getElementById("cpc").value = p.cpc;
  document.getElementById("cvr").value = p.cvr;
  document.getElementById("cogs").value = p.cogs;
  document.getElementById("returnRate").value = p.returnRate;
  computeROAS();
});

let roasChart, scenarioChart;
let sparkRevenueChart, sparkRoasChart, sparkProfitChart, sparkOrdersChart;

function fmt(n){ return Math.round(n).toLocaleString()+"원"; }

function sparkline(id, existingChart, data, color){
  if(existingChart) existingChart.destroy();
  return new Chart(document.getElementById(id).getContext('2d'), {
    type:"line",
    data:{ labels:data.map((_,i)=>i), datasets:[{
      data, borderColor:color, borderWidth:1.5, pointRadius:0, tension:0.35, fill:true,
      backgroundColor:color.replace("rgb","rgba").replace(")",",0.08)")
    }]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}, tooltip:{enabled:false}},
      scales:{x:{display:false}, y:{display:false}},
      animation:{duration:400}
    }
  });
}

/**
 * 예산 5백만~4천만원 구간을 스캔해 매출/ROAS/영업이익/주문수 트렌드를 계산.
 * 스파크라인·시나리오 차트가 같은 계산을 공유해 중복 루프를 피한다.
 */
function scenarioSeries(price, cpc, cvr, cogs, fulfill, returnRate){
  const budgets=[], profits=[], roasArr=[], revenueArr=[], ordersArr=[];
  for(let b=5000000;b<=40000000;b+=5000000){
    const r = calcProfit(price, b, cpc, cvr, cogs, fulfill, returnRate);
    budgets.push((b/10000).toLocaleString()+"만원");
    profits.push(Math.round(r.profit));
    roasArr.push(Math.round(r.roas));
    revenueArr.push(Math.round(r.revenue));
    ordersArr.push(Math.round(r.orders));
  }
  return {budgets, profits, roasArr, revenueArr, ordersArr};
}

function calcProfit(price, adBudget, cpc, cvrPct, cogsPct, fulfill, returnPct){
  const clicks = adBudget / cpc;
  const orders = clicks * (cvrPct/100);
  const revenue = orders * price;
  const cogs = revenue * (cogsPct/100);
  const fulfillCost = orders * fulfill;
  const returnLoss = orders * (returnPct/100) * (price*(cogsPct/100) + fulfill*2);
  const profit = revenue - cogs - adBudget - fulfillCost - returnLoss;
  const roas = adBudget>0 ? (revenue/adBudget*100) : 0;
  const roi = adBudget>0 ? (profit/adBudget*100) : 0;
  return {clicks, orders, revenue, cogs, fulfillCost, returnLoss, profit, roas, roi};
}

function computeROAS(){
  const p = products[productSelect.value];
  const adBudget = +document.getElementById("adBudget").value;
  const cpc = +document.getElementById("cpc").value;
  const cvr = +document.getElementById("cvr").value;
  const cogs = +document.getElementById("cogs").value;
  const fulfill = +document.getElementById("fulfill").value;
  const returnRate = +document.getElementById("returnRate").value;

  document.getElementById("productHint").textContent = `${p.name} · 판매가 ${p.sale.toLocaleString()}원 기준`;

  const r = calcProfit(p.sale, adBudget, cpc, cvr, cogs, fulfill, returnRate);

  // 헤드라인 지표 4종 — metric-card 값/배지/서브 텍스트
  document.getElementById("kpiRevenueValue").textContent = fmt(r.revenue);
  document.getElementById("kpiRevenueBadge").className = "mc-badge " + (r.revenue>=adBudget?"up":"down");
  document.getElementById("kpiRevenueBadge").textContent = r.revenue>=adBudget ? "▲ 손익분기 이상" : "▼ 손익분기 미만";
  document.getElementById("kpiRevenueSub").textContent = `광고비 ${fmt(adBudget)} 투입 기준`;

  document.getElementById("kpiRoasValue").textContent = r.roas.toFixed(0)+"%";
  document.getElementById("kpiRoasBadge").className = "mc-badge " + (r.roas>=100?"up":"down");
  document.getElementById("kpiRoasBadge").textContent = r.roas>=100 ? "▲ 목표 100% 이상" : "▼ 목표 100% 미만";
  document.getElementById("kpiRoasSub").textContent = `손익분기 100% 대비 ${r.roas>=100?"+":""}${(r.roas-100).toFixed(0)}%p`;

  document.getElementById("kpiProfitValue").textContent = fmt(r.profit);
  document.getElementById("kpiProfitBadge").className = "mc-badge " + (r.profit>=0?"up":"down");
  document.getElementById("kpiProfitBadge").textContent = r.profit>=0 ? "▲ 흑자" : "▼ 적자";
  document.getElementById("kpiProfitSub").textContent = `영업이익률 ${r.roi.toFixed(1)}%`;

  document.getElementById("kpiOrdersValue").textContent = Math.round(r.orders).toLocaleString()+"건";
  document.getElementById("kpiOrdersBadge").className = "mc-badge up";
  document.getElementById("kpiOrdersBadge").textContent = `▲ CVR ${cvr}%`;
  document.getElementById("kpiOrdersSub").textContent = `클릭 ${Math.round(r.clicks).toLocaleString()}회 기준`;

  // 보조 지표
  document.getElementById("statFulfill").textContent = fmt(r.fulfillCost);
  document.getElementById("statReturn").textContent = fmt(r.returnLoss);
  document.getElementById("statClicks").textContent = Math.round(r.clicks).toLocaleString()+"회";
  document.getElementById("statRoi").textContent = r.roi.toFixed(1)+"%";

  // Donut: cost breakdown
  const ctx = document.getElementById("roasChart");
  const data = {
    labels:["매출원가","광고비","물류/CS","반품손실","영업이익"],
    datasets:[{
      data:[r.cogs, adBudget, r.fulfillCost, r.returnLoss, Math.max(r.profit,0)],
      backgroundColor:["#a39e98","#FF6000","#ffb27a","#e53935","#1aae39"],
      borderWidth:0,
    }]
  };
  if(roasChart) roasChart.destroy();
  roasChart = new Chart(ctx, {
    type:"doughnut",
    data,
    options:{
      plugins:{legend:{position:"bottom", labels:{boxWidth:10,font:{size:10,family:"Inter"},color:"#615d59"}}},
      cutout:"62%",
    }
  });

  // 예산 스캔 시리즈 — 스파크라인 + 시나리오 차트 + 인사이트가 공유
  const series = scenarioSeries(p.sale, cpc, cvr, cogs, fulfill, returnRate);
  sparkRevenueChart = sparkline("sparkRevenue", sparkRevenueChart, series.revenueArr, "rgb(0,117,222)");
  sparkRoasChart    = sparkline("sparkRoas", sparkRoasChart, series.roasArr, "rgb(255,96,0)");
  sparkProfitChart  = sparkline("sparkProfit", sparkProfitChart, series.profits, "rgb(26,174,57)");
  sparkOrdersChart  = sparkline("sparkOrders", sparkOrdersChart, series.ordersArr, "rgb(0,117,222)");

  renderRoasInsights(p, r, adBudget, cvr, returnRate);
  drawScenarioChart(series);
}

function renderRoasInsights(p, r, adBudget, cvr, returnRate){
  const cvrUp = calcProfit(p.sale, adBudget, +document.getElementById("cpc").value, cvr+1, +document.getElementById("cogs").value, +document.getElementById("fulfill").value, returnRate);
  const revenueDelta = cvrUp.revenue - r.revenue;
  const insights = [
    `현재 설정 기준 ROAS ${r.roas.toFixed(0)}%, 손익분기(100%) 대비 ${r.roas>=100?`+${(r.roas-100).toFixed(0)}%p 여유`:`${(100-r.roas).toFixed(0)}%p 부족`}`,
    `반품률 ${returnRate}% 반영 시 반품 손실 ${fmt(r.returnLoss)} — 매출의 ${(r.returnLoss/r.revenue*100).toFixed(1)}%`,
    `구매전환율 1%p 개선 시(${cvr}%→${(cvr+1).toFixed(1)}%) 매출 약 ${fmt(revenueDelta)} 증가 추정 (현재 조건 기준)`,
  ];
  document.getElementById("roasInsights").innerHTML = insights.map(t=>
    `<div class="amp-insight"><span class="amp-arrow">→</span>${t}</div>`
  ).join("");
}

function drawScenarioChart(series){
  const ctx = document.getElementById("scenarioChart");
  if(scenarioChart) scenarioChart.destroy();
  scenarioChart = new Chart(ctx, {
    data:{
      labels:series.budgets,
      datasets:[
        {type:"bar", label:"영업이익(원)", data:series.profits, backgroundColor:"#FF6000", yAxisID:"y", borderRadius:6},
        {type:"line", label:"ROAS(%)", data:series.roasArr, borderColor:"#0075de", backgroundColor:"#0075de", yAxisID:"y1", tension:.3, pointRadius:3},
      ]
    },
    options:{
      scales:{
        y:{title:{display:true,text:"영업이익(원)",font:{size:11,family:"Inter"}}, ticks:{font:{size:10,family:"Inter"},color:"#a39e98"}, grid:{color:"#f6f5f4"}},
        y1:{position:"right", grid:{drawOnChartArea:false}, title:{display:true,text:"ROAS(%)",font:{size:11,family:"Inter"}}, ticks:{font:{size:10,family:"Inter"},color:"#a39e98"}},
        x:{ticks:{font:{size:10,family:"Inter"},color:"#a39e98"}, grid:{display:false}}
      },
      plugins:{legend:{position:"bottom", labels:{boxWidth:10,font:{size:10,family:"Inter"},color:"#615d59"}}}
    }
  });
}

["productSelect","adBudget","cpc","cvr","cogs","fulfill","returnRate"].forEach(id=>{
  document.getElementById(id).addEventListener("input", computeROAS);
  document.getElementById(id).addEventListener("change", computeROAS);
});
initProductSelect().then(computeROAS);

/* =========================================================
   TAB 2: REVIEW INSIGHT
   ========================================================= */
const reviewProductSelect = document.getElementById("reviewProductSelect");
Object.keys(reviewInsights).forEach(name=>{
  const o=document.createElement("option");
  o.value=name; o.textContent=name;
  reviewProductSelect.appendChild(o);
});
reviewProductSelect.value = defaultInsightKey;

let sentimentChart, keywordChart;

/**
 * 아래 문장은 실제 고객 리뷰가 아니라, 위 reviewInsights의 실제 리뷰 원문을 근거로
 * 분석가(AI)가 도출한 마케팅 인사이트/카피 제안이다.
 */
const uspBank = {
  "[3000억 페스타] 대용량 기미앰플 40mL": [
    "실제 구매 후기 66건 중 90%가 4~5점 — 대형 프로모션 노출 이후에도 유지되는 검증된 만족도",
    "'2회차부터 체감', '피부 톤이 환해진다'는 즉각적 반응이 반복 언급 — Before/After 숏폼 소재에 적합",
    "3점대 후기의 공통 코멘트는 '드라마틱한 변화까지는 아님' — 4주 이상 장기 사용 후기로 신뢰 보강 여지",
  ],
  "[한정수량] 기미 앰플 쿠션 세트 1+1": [
    "'초록 케이스·컬러' 언박싱 요소가 반복 언급 — 디자인/패키지 소구 콘텐츠에 활용 가능",
    "표본 5건 중 1건이 '증정 조건 고지 방식'에 대한 불만 — 프로모션 상세페이지 안내 문구 점검 필요",
  ],
  "[기미백설크림] DW-EGF크림 화이트토닝 (50mLx2EA)": [
    "'주근깨·붉은기·홍조 완화'까지 언급하는 심층 후기 다수 — 색소침착 카테고리 대비 차별화된 진정 소구 가능",
    "표본 13건 중 부정적 톤 리뷰 없음, '꾸준 사용·재구매' 언급 3건 — 정기구독형 모델 적합도 높음",
  ],
  "EGF 기미 집중 패치": [
    "'붙이고 자도 안 밀림', '뗄 때 안 아픔' — 사용 편의성이 반복 검증된 근거 자료로 활용 가능",
    "표본 5건 전원 5점 · 부정 리뷰 없음 — 신규 고객 대상 체험용 미니 사이즈 확대 여지",
  ]
};

const copyBank = {
  "[3000억 페스타] 대용량 기미앰플 40mL": [
    ["헤드라인 A","2회차부터 달라졌어요 — 실제 구매자 90%가 4점 이상 준 대용량 기미앰플"],
    ["헤드라인 B","바르는 순간 광나는 피부 톤, 촉촉함까지 잡았습니다"],
    ["개선 소재(3점대 리뷰 대응)","드라마틱한 변화는 사람마다 달라요 — 최소 4주, 사진으로 기록하며 확인해보세요"],
  ],
  "[한정수량] 기미 앰플 쿠션 세트 1+1": [
    ["헤드라인 A","초록 케이스 언박싱의 설렘, 1+1로 두 배"],
    ["헤드라인 B","들뜨지 않는 밀착감, 컬러도 예쁜 기미 쿠션"],
  ],
  "[기미백설크림] DW-EGF크림 화이트토닝 (50mLx2EA)": [
    ["헤드라인 A","주근깨·붉은기까지 — 꾸준히 바르면 달라지는 피부톤"],
    ["헤드라인 B","끈적임 없이 촉촉한 매일 밤 화이트닝 루틴"],
  ],
  "EGF 기미 집중 패치": [
    ["헤드라인 A","붙이고 자도 안 밀리는 기미 집중 패치, 아침이 다릅니다"],
    ["헤드라인 B","뗄 때도 편안하게 — 미백까지 챙기는 부분 집중 케어"],
  ]
};

function renderReview(){
  const key = reviewProductSelect.value;
  const d = reviewInsights[key];

  const sctx = document.getElementById("sentimentChart");
  if(sentimentChart) sentimentChart.destroy();
  sentimentChart = new Chart(sctx, {
    type:"doughnut",
    data:{labels:["긍정","중립","부정"], datasets:[{data:d.sentiment, backgroundColor:["#1aae39","#a39e98","#e53935"], borderWidth:0}]},
    options:{cutout:"60%", plugins:{legend:{position:"bottom", labels:{boxWidth:10,font:{size:10,family:"Inter"},color:"#615d59"}}}}
  });

  const kctx = document.getElementById("keywordChart");
  if(keywordChart) keywordChart.destroy();
  keywordChart = new Chart(kctx, {
    type:"bar",
    data:{
      labels:d.keywords.map(k=>k[0]),
      datasets:[{data:d.keywords.map(k=>k[1]), backgroundColor:"#FF6000", borderRadius:6}]
    },
    options:{indexAxis:"y", plugins:{legend:{display:false}}, scales:{x:{grid:{color:"#f6f5f4"},ticks:{font:{size:10,family:"Inter"},color:"#a39e98"}}, y:{grid:{display:false},ticks:{font:{size:11,family:"Inter"},color:"#31302e"}}}}
  });

  document.getElementById("reviewMeta").textContent =
    `실제 리뷰 ${d.n}건 크롤링 · 평균 ${d.avg.toFixed(2)}★ (easydew.co.kr 상품후기, 2026.07 수집)`;

  document.getElementById("quotesPositive").innerHTML =
    `<div class="hint" style="margin-bottom:8px;font-weight:700;color:#1aae39;">👍 긍정 리뷰</div>` +
    d.positive.map(q=>`<div class="quote">${q[0]}<small>${q[1]}</small></div>`).join("");
  document.getElementById("quotesNegative").innerHTML =
    `<div class="hint" style="margin:14px 0 8px;font-weight:700;color:#e53935;">👎 개선 포인트</div>` +
    (d.negative.length
      ? d.negative.map(q=>`<div class="quote neg">${q[0]}<small>${q[1]}</small></div>`).join("")
      : `<div class="quote">표본 ${d.n}건 중 뚜렷한 불만 톤의 리뷰는 발견되지 않았습니다 — 재구매·꾸준 사용 언급이 다수입니다.</div>`);

  document.getElementById("uspList").innerHTML = uspBank[key].map(u=>`<div class="quote">${u}</div>`).join("");
  document.getElementById("copyList").innerHTML = copyBank[key].map(c=>`
    <div class="copy-card"><div class="tag2">${c[0]}</div><p>${c[1]}</p></div>
  `).join("");
}
reviewProductSelect.addEventListener("change", renderReview);
renderReview();

/* =========================================================
   TAB 3: COMPETITOR PRICE
   ========================================================= */
const priceTbody = document.querySelector("#priceTable tbody");

async function initPriceTab(){
  competitors = await loadCompetitors();

  competitors.forEach(c=>{
    const discount = Math.round((1-c.sale/c.list)*100);
    const per100 = Math.round(c.sale / c.size * 100);
    const isBrand = c.brand === "이지듀";
    priceTbody.innerHTML += `
      <tr>
        <td><span class="pill ${isBrand?'brand':'comp'}">${c.brand}</span></td>
        <td>${c.name}</td>
        <td>${c.size}${c.unit}</td>
        <td>${c.list.toLocaleString()}원</td>
        <td><b>${c.sale.toLocaleString()}원</b></td>
        <td>${discount}%</td>
        <td>${per100.toLocaleString()}원 / 100${c.unit}</td>
        <td>${c.reviews.toLocaleString()}</td>
      </tr>`;
  });

  const posCtx = document.getElementById("positionChart");
  new Chart(posCtx, {
    type:"scatter",
    data:{
      datasets: competitors.map(c=>({
        label: c.brand+" · "+c.name,
        data: [{x: Math.round(c.sale/c.size*100), y: c.reviews}],
        backgroundColor: c.brand==="이지듀" ? "#FF6000" : "#0075de",
        pointRadius: 8,
      }))
    },
    options:{
      plugins:{legend:{display:true, position:"bottom", labels:{boxWidth:8,font:{size:10,family:"Inter"},color:"#615d59"}}},
      scales:{
        x:{title:{display:true,text:"100ml(g) 환산 판매가(원)",font:{size:11}}},
        y:{title:{display:true,text:"누적 리뷰수",font:{size:11}}}
      }
    }
  });
}

/**
 * 스크래핑 스케줄러(cron 등)가 competitors 배열을 최신 가격으로 갱신한 뒤
 * 이 함수를 호출하면 임계치 기준 변동 알림 목록을 재계산합니다.
 * 실서비스에서는 setInterval/cron이 이 함수를 주기 호출하고, 결과를 슬랙/이메일로도 전송하면 됩니다.
 */
function checkPriceAlerts(thresholdPct){
  return competitors.map(c=>{
    const changePct = c.prevSale ? Math.round((c.sale-c.prevSale)/c.prevSale*1000)/10 : 0;
    const isBrand = c.brand === "이지듀";
    const exceeded = changePct !== 0 && Math.abs(changePct) >= thresholdPct;
    let type, text;
    if(!exceeded){
      type = "ok";
      text = `${c.brand} ${c.name} — 전일 대비 가격 변동 없음 (${c.sale.toLocaleString()}원 유지)`;
    } else if(isBrand){
      type = "ok";
      text = `${c.brand} ${c.name} — 자사가 ${changePct>0?"인상":"인하"} ${Math.abs(changePct)}% (${c.prevSale.toLocaleString()}→${c.sale.toLocaleString()}원), 경쟁사 대비 포지션 재확인 필요`;
    } else {
      type = "down";
      text = `${c.brand} ${c.name} — ${changePct<0?"가격 인하":"가격 인상"} ${Math.abs(changePct)}% 감지 (${c.prevSale.toLocaleString()}→${c.sale.toLocaleString()}원), 임계치(${thresholdPct}%) 초과`;
    }
    return {type, text};
  });
}

function renderAlerts(){
  const threshold = +document.getElementById("alertThreshold").value || 0;
  const alerts = checkPriceAlerts(threshold);
  document.getElementById("alertList").innerHTML = alerts.map(a=>`
    <div class="alert-card ${a.type==='ok'?'ok':''}">
      <span>${a.text}</span>
      <span class="pill ${a.type==='ok'?'up':'down'}">${a.type==='ok'?'정상':'변동'}</span>
    </div>
  `).join("");
  const now = new Date();
  document.getElementById("alertLastRun").textContent =
    `마지막 확인: ${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")} (임계치 ${threshold}%)`;
}
document.getElementById("alertThreshold").addEventListener("input", renderAlerts);
initPriceTab().then(renderAlerts);
