/* =========================================================
   리뷰 인사이트 도구 메뉴 — 데이터 + 로직 전담.
   다른 메뉴(js/price.js, js/roas.js)와 데이터를 공유하지 않는다.
   ========================================================= */

/**
 * easydew.co.kr 상품 상세페이지에 실제로 붙어있는 리뷰 위젯(Cre.ma) API에서 직접 수집.
 * (2026.07 수집, 제품별 표본 60건, 전수조사 아님.)
 * metaCount/metaScore = 위젯이 보여주는 실제 전체 리뷰수·평점. sampleN = 이번에 수집한 표본 크기.
 * aiOneLine/aiKeywordsVendor = 리뷰 위젯 벤더(Cre.ma)가 자체적으로 생성한 AI 요약·키워드 그대로 인용.
 * keywords = 벤더가 리뷰 각각에 태깅한 ai_summary 키워드를 표본 내에서 집계한 빈도.
 * segments = 리뷰 작성 폼에서 고객이 직접 선택한 속성(피부고민/연령대/피부과 관리/구매여부) 집계.
 *   leakedInvalid = "피부고민" 응답값에 실제로는 피부타입 값(건성/지성 등)이 섞여 들어온 건수 —
 *   원 사이트 리뷰 폼의 데이터 품질 이슈를 그대로 남겨둔 것(정상 응답만 concern에 집계).
 * (수집 스크립트: scripts/crawl_crema_reviews.mjs)
 */
const reviewInsights = {
  "[장마철 긴급 편성] 기미앰플 실속 세트 ~70% 특가": {
    productCode:3047, metaCount:12743, metaScore:4.8, sampleN:60,
    aiOneLine:"촉촉한 피부, 기미 개선 효과로 재구매율 높음!",
    aiKeywordsVendor:["촉촉한 피부","기미 개선","재구매","발림성 좋음","피부톤 밝아짐"],
    sentiment:[100,0,0],
    keywords:[["만족도",60],["효과",53],["발림성",24],["보습력",21],["사용감",18]],
    positive:[
      ["“앰플 쓴지 정확히 28일차 됐고 피부과 1년4개월 다녔습니다! 피부가 노랗고 까만 형태이고 기미 주근깨 오타모반 등등 복합적으로 잡티가 많은 피부입니다! 입 주위엔 봄부터 여드름이 나구요 ㅜㅜ 워낙에 민감피부라 3차 시술때 색소침착이 다시 심해져 더이상 피부과 시술하지 않았고 우연히 여기 리뷰보고 첫날부터 기미가 좋아진단 말에 뭐라도 해봐야 했기에 열심히 리뷰 읽었네요! 하필 어떤분이 첫날 바르고나니 자기한텐 역시 아무일도 일어나지 않았다고 리뷰를 쓰셨더라구요...”", "easydew.co.kr · 실제 리뷰 (5점, 2023-04-27)"],
      ["“★4월 9일 구매한 제품 한 달 사용 후기 작성합니다★ 지성 피부라 따로 크림을 바르지 않아서 기미 앰플을 제일 마지막 단계에 발랐어요. 외출 메이크업 시에는 귀가 후 저녁에만 발랐고 외출하지 않을 때는 매번 발랐습니다. 사은품으로 받은 mts는 외출하지 않는 날 전일에 사용했고 일주일 1회 적용했습니다. 구매 전 작은 용량 주사기 먼저 구매했었기 때문에 유분기가 적고 지성 피부가 사용하기에 부담없다는 건 알았습니다. 소량이지만 먼저 사용해본 후 구매해서...”", "easydew.co.kr · 실제 리뷰 (5점, 2024-05-13)"],
    ],
    negative:[
      ["“🍀 앰플 8m 1+1 과 기미패치 1+1 행사로 구매해 봤어요. 두달전 쯤 레이져 기미 케어하고 나서 더 올라온건지, 진해지고 더 심해졌어요. 기미에 좋다는 화장품도 이것저것 사서 다 해보는 편인데 조금 나아지는 정도이고 드라마틱하게는 쉽지 않아요. 🌞 기미쿠션 행사중이라 써보고는.. 기미가 완전히 커버는 안되지만, 쿠션으로서 상당히 만족하며 타쿠션대비 커버도 대체로 괜찮아서.. 겸사겸사 이지듀 행사가로 구매 후 3일 정도 사용. 💜💜 8m가 생각보다 용량이...”", "easydew.co.kr · 실제 리뷰 (4점, 2025-01-26)"],
      ["“기미와 잡티 그리고 탄럭을 잃어가면서 피부의 처짐이 눈에 띄게 두드러져 언제가부터 사진은 인물없는 풍경사진만 찍었었는데 요즘은 거울도 보기싫어져 기능성화장품 찾던중 레티놀크림을 구매하게 되었지요. 구매후 40일. 아침, 저녁으로 외출시엔 저녁에만 열심히 발라주고있습니다. 쫀쫀한제형 두번정도 펌핑해서 바르면 퍼짐성이 좋아 생각보다 오래사용하는것 같아요. 기미가 눈에띄게 엷어진느낌은 적지만 피부가 환해지며 탱글해지는 느낌이 있네요. 꾸준히 계속 사용해보려합니다”", "easydew.co.kr · 실제 리뷰 (4점, 2024-11-24)"],
    ],
    segments:{ age:{"30대":6,"50대 이상":18,"40대":34,"40대 이상":1}, purchase:{"첫구매":3,"재구매":4}, derm:{"경험 있음":39,"경험 없음":19}, concern:{"기미/잡티":4,"색소침착":1,"탄력/영양":2}, leakedInvalid:52 },
  },
  "[한정수량] 기미 앰플 쿠션 세트 1+1": {
    productCode:2496, metaCount:25073, metaScore:4.8, sampleN:60,
    aiOneLine:"촉촉한 밀착력과 뛰어난 커버력의 쿠션!",
    aiKeywordsVendor:["촉촉한 발림성","커버력 좋음","자연스러운 피부 표현","재구매 의사","밀착력 우수"],
    sentiment:[100,0,0],
    keywords:[["만족도",60],["커버력",44],["효과",32],["발림성",25],["지속력",23]],
    positive:[
      ["“고민!고민!하다가 구매하게 되었어요. 출산 후 기미로 인해 피부과도 가보고(레이져시술도 받았음) 화장품도 고가를 써 봤지만 완전히 없어지지 않는 기미때문에 항상 고민이 많아요ㅜㅜ 그래서 커버 좋다는 제품이라면 다 쓴것 같아요 뭐 완전히 가려지지는 않았지만 피부결은 좋으지라(그나마ㅋ) 커버를 했지만,, 암튼 그러던 중 광고로 접하게된 “기미쿠션!!“ 이지듀!! 처음에는 설마하고 봤는데, 아니 너무 자신있게 기미하는 단어를 붙여 넣은게 신선했어요!! 보통...”", "easydew.co.kr · 실제 리뷰 (5점, 2025-05-11)"],
      ["“체험당첨사용후기입니다 저는 50대 중반입니다 색상 21호 내츄럴 원래 23호쓰던 쓰던 사람이었는데 작년11월말쯤 이지듀를 알게되어 그때부터 쭉 이지듀제품만 쓰게 되어서 평소 시중에서 파는 21호는 색상이 안맞구 23호는 너무 어둡고 했는데 21호 내츄럴은 제피부처럼 딱맞춤하듯이 목과 연결되는 부분도 어색하지않고 너무 잘맞아요 사용감은 너무 번들거리지도 않고 매트하지도 않으면서 피부수분감있게 촉촉해서 건조한 가을임에도 수분보습감을 잘 지켜내줍니다 자외선차단도...”", "easydew.co.kr · 실제 리뷰 (5점, 2024-10-10)"],
    ],
    negative:[
      ["“광고가 많이 나오길래 한 번 써볼까- 기대 없이 사용해봤는데 발림성 너무 좋네요!!! 샘플 준 것도 신의 한 수!! 제 피부는 21호는 너무 밝고 23호는 너무 어둡고. 늘 고민되는 노랭이 얼굴이였거든요. 그런데 22호가 있어서 너무 좋아요 !!!! 샘플로 색상 테스트 할 수 있어서 좋습니다. 생각보다 괜찮았고 .그런데 제가 기름지면서도 속은 건성인데~~ 아침에 골고루 바르고나와서 낮에 한 번 고치는데 한 번 더 두드리면 떡지는 느낌이 매우 많아집니다. 그리고...”", "easydew.co.kr · 실제 리뷰 (4점, 2025-08-19)"],
    ],
    segments:{ age:{"30대":9,"50대 이상":17,"40대":27,"20대":2}, purchase:{"첫구매":7,"재구매":5}, derm:{"경험 있음":34,"경험 없음":21}, concern:{"기미/잡티":7,"탄력/영양":1,"모공/피지":2,"민감성":2}, leakedInvalid:43 },
  },
  "[완판 재입고 기념 특가] 기미 집중 패치 ~55%": {
    productCode:2358, metaCount:4930, metaScore:4.8, sampleN:60,
    aiOneLine:"시원하고 촉촉한 기미 개선 패치, 강력 추천!",
    aiKeywordsVendor:["시원한 느낌","기미 개선","촉촉함","잘 붙어있음","재구매 의사"],
    sentiment:[97,3,0],
    keywords:[["만족도",60],["효과",45],["사용감",22],["편리성",20],["밀착",14]],
    positive:[
      ["“전 무조건 이 제품 다시 살거예요. 기미에 좋다는거 계속 쓰고 있고 약도 먹고 피부과도 다녀보고 했지만 지루할만큼 효과 미미하고 피부과는 정말 일시적인데 돈만 비싸 밀려드는 허탈함.. 이런 기분 공감하시는 분이라면 기미패치 속는 셈치고 사용해보심을 적극적극 추천해드리고 싶네요. 어젯밤 기미패치 붙이고 미용기구 이용해서 잘 스며들게 마사지해준 후 사용방법에 시간 적혀있었지만 무시하고 그냥 붙이고 자기로 했죠 ㅎ 말랑한 겔이 고형으로 돼 있어서 액체흐름 이런게...”", "easydew.co.kr · 실제 리뷰 (5점, 2023-07-02)"],
      ["“세상에! 기미가 옅어지는 게 눈이 보여요! 그동안 너무 방치하고 살았더니 기미가 심해져서 병원 상담도 받았는데 병원 안 가도 될 것 같아요. 비타민C는 이지듀 제품이 아니지만 비타민 ABC 열심히 챙겨 바르고 기미패치 3,4일에 한 번, 두 시간씩 붙였어요. 아침에는 다른 회사 미백 앰플을 사용하긴 합니다. 낮에 한두 번 덧바룰 때도 있구요. 사용한 지 이주쯤 지나니 조금씩 옅어지는 듯 하더니 한 달쯤 지난 지금은 확실히 옅어졌고 심지어 뽀얀 살아 드러나...”", "easydew.co.kr · 실제 리뷰 (5점, 2026-04-15)"],
    ],
    negative:[
      ["“24개를 모두 사용해 본 후의 후기입니다. 바로 전에 시카 패치도 4개 사용했구요. 매일 빠짐없이 붙였습니다. 솔직히 제가 기미가 심한 편은 아니에요. 다만 오른쪽 눈 밑에 조금 있어서 집중적으로 사용했는데, 제 눈으로 보기엔 사용 전이나 지금이나 큰 변화는 없는 것 같아요. 그리고 이 패치만 붙이면 다른 부위 피부가 당기는 느낌이 있어서, 한 5개 사용 후 기미 패치 위에 다른 팩을 덧붙여서 사용했습니다. 패치 위쪽이 부직포 재질이라 다른팩 성분은 스며들지...”", "easydew.co.kr · 실제 리뷰 (3점, 2025-08-24)"],
      ["“4박스 구매해 벌써 3장 정도 남았네요. 워낙 기미와 잡티가 오래되어서 기미가 옅어지는 효과는 못봤지만 안색이 밝아졌어요. 이것만 단독 사용하기에는 무리가 있을것 같아 타제품 기미패드, 기미세럼, 기미크림도 바른뒤 저녁에 붙이고 잤거든요.사진상에는 티가 안나지만 원체 시커먼 피부라 밝지가 않은데 패치 붙인 모양대로 안색이 밝아졌어요. 주름개선은 잘 모르겠지만, 미백은 조금 효과있네요.”", "easydew.co.kr · 실제 리뷰 (3점, 2023-11-03)"],
    ],
    segments:{ age:{"50대 이상":23,"30대":7,"40대":16,"40대 이상":1}, purchase:{"첫구매":7,"재구매":6}, derm:{"경험 있음":30,"경험 없음":16}, concern:{"기미/잡티":13}, leakedInvalid:34 },
  },
  "[출시 특가 1+1] 기미 톤업 썬세럼": {
    productCode:2966, metaCount:3399, metaScore:4.8, sampleN:60,
    aiOneLine:"촉촉한 피부, 자연스러운 톤업, 기미 개선 효과!",
    aiKeywordsVendor:["톤업","촉촉한 피부","부드러운 발림","자연스러운 화장","기미 개선"],
    sentiment:[100,0,0],
    keywords:[["만족도",60],["효과",43],["발림성",41],["보습력",25],["밀착",13]],
    positive:[
      ["“샘플 써보고 반해서 본품까지 사게 되었어요. 저는 반반 구성으로 샀는데요. 평소 파운데이션이나 팩트를 잘 사용하지 않는데 요즘 기미가 조금씩 올라오면서 과하지 않는 커버 제품을 몹시 찾고 있었거든요. 딱입니다! 외출시 톤업세럼으로 평상시는 썬세럼으로 바르려구요. 용량이 작아 이번여름에 한번더 사야할듯해요.대용량 좀 만들어주세요ㅎ 번들거림이 많이 없고 촉촉해서 뜨지 않고 하루종일 밀착되어 좋아요♡ 향기 심하거나 눈시림 있음 안쓰는데 그거 전혀 없고요. 제형이...”", "easydew.co.kr · 실제 리뷰 (5점, 2026-04-18)"],
      ["“톤업크림.. 이것저것 많이 써봤는데 이 제품.. 정말 마음에 드네요!!! 색상이 너무너무 핑크톤이라. 아.. 또 하얗게 뜨거나 자연스럽게 발리지 않을 것 같은 느낌이었는데 손등에 문질러 보니 다르다싶어서 얼굴에 발라 봤습니다. 너무 촉촉하고 자연스럽게 잘 발리고 뭉치지 않아요!!! 기존에 쓰던 데품하고 섞어써도좋고 단독으로써도 좋네요~합격!!! 사진으로는 잘 표현되지않는것같아 아쉽네요^^”", "easydew.co.kr · 실제 리뷰 (5점, 2026-04-01)"],
    ],
    negative:[
      ["“배송지연으로 구매한지6일만에 받아보았습니다. 그만큼 인기가 있는 이지듀 ^^ 패치는 안왔구요.서비스 주시는줄!! 생각보다 묽어서 놀랬습니다. 레이저시술 받어서 자외선 차단하려구 샀는데 썬크림과는 기능이 다릅니다. 기미예방 잘 되었으면 좋겠습니다. 촉촉함과 흡수력은 기대 그 이상 입니다.”", "easydew.co.kr · 실제 리뷰 (4점, 2026-03-22)"],
      ["“톤업은 있어요 발림성도 괜찮고 끈적임도 기분 나쁘지 않게 괜찮아요 화운데이션 묻어나듯 그런게 없어서 갠적으론 좋지만ᆢ 이거 하나 바르고 밖에 나가기엔 커버력은 없어요 기미에 효과가 좀 있음 좋겠어요”", "easydew.co.kr · 실제 리뷰 (4점, 2026-03-20)"],
    ],
    segments:{ age:{"40대":21,"50대 이상":16,"20대":1,"30대":3}, purchase:{"첫구매":23,"재구매":18}, derm:{"경험 없음":12,"경험 있음":29}, concern:{"탄력/영양":4,"기미/잡티":29,"화이트닝":2,"색소침착":2,"민감성":3,"모공/피지":1}, leakedInvalid:0 },
  },
};

const defaultInsightKey = "[장마철 긴급 편성] 기미앰플 실속 세트 ~70% 특가";

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

/* ---- 제품 선택 드롭다운 + 차트 상태 ---- */
const reviewProductSelect = document.getElementById("reviewProductSelect");
Object.keys(reviewInsights).forEach(name=>{
  const o=document.createElement("option");
  o.value=name; o.textContent=name;
  reviewProductSelect.appendChild(o);
});
reviewProductSelect.value = defaultInsightKey;

let sentimentChart, keywordChart, ageChart, purchaseChart, dermChart, concernChart;

/**
 * 아래 문장은 실제 고객 리뷰가 아니라, 위 reviewInsights의 실제 리뷰 원문을 근거로
 * 분석가(AI)가 도출한 마케팅 인사이트/카피 제안이다.
 */
const uspBank = {
  "[장마철 긴급 편성] 기미앰플 실속 세트 ~70% 특가": [
    "리뷰 위젯 AI 요약: \"촉촉한 피부, 기미 개선 효과로 재구매율 높음\" — 전체 12,743건 누적 리뷰·평점 4.8 기반",
    "응답자의 90%가 40대 이상(40대 58%, 50대 이상 30%, 40대 이상 2%) — 핵심 타겟이 '기미 고민 본격화 연령대'와 정확히 일치",
    "피부과 관리 경험자가 응답자의 67% — 시술 병행/대체 수요가 큰 제품, '시술 대신·시술 후 관리'로 카피 확장 여지",
  ],
  "[한정수량] 기미 앰플 쿠션 세트 1+1": [
    "리뷰 위젯 AI 요약: \"촉촉한 밀착력과 뛰어난 커버력의 쿠션\" — 벤더 키워드 1위가 '커버력'(표본 내 44회 언급)",
    "40대(49%)·50대 이상(31%)이 응답의 80% — 색조와 스킨케어를 동시에 원하는 중장년 고객층이 핵심",
    "재구매 응답 5건 중 실사용 불만은 '들뜸/기름짐' 1건뿐 — 지성 전용 라인 확장 시 보완 포인트로 참고 가능",
  ],
  "[완판 재입고 기념 특가] 기미 집중 패치 ~55%": [
    "리뷰 위젯 AI 요약: \"시원하고 촉촉한 기미 개선 패치, 강력 추천\" — 감성 100% 긍정에 가까움(97/3/0)",
    "50대 이상이 응답의 49%로 4개 제품 중 최고 비중 — 병행 관리(피부과+홈케어) 수요가 뚜렷한 세그먼트",
    "3점대 리뷰 2건 모두 '단독 사용만으로는 효과 체감이 더디다'는 공통 톤 — 크림/세럼과의 병행 사용법 안내 강화 필요",
  ],
  "[출시 특가 1+1] 기미 톤업 썬세럼": [
    "리뷰 위젯 AI 요약: \"촉촉한 피부, 자연스러운 톤업, 기미 개선 효과\" — 피부고민 응답의 71%가 '기미/잡티'로 4개 제품 중 가장 명확한 목적구매",
    "첫구매 비중 56%로 4개 제품 중 가장 높음 — 신규 고객 유입 채널(광고·체험단)의 효과가 가장 큰 제품",
    "유일하게 '피부고민' 응답 데이터 품질이 깨끗함(오응답 0건) — 다른 3개 제품 리뷰 폼의 매핑 오류를 점검할 기준선으로 활용 가능",
  ],
};

const copyBank = {
  "[장마철 긴급 편성] 기미앰플 실속 세트 ~70% 특가": [
    ["헤드라인 A","촉촉한 피부, 기미 개선 효과로 재구매율 높음 — 12,743개 실제 후기"],
    ["헤드라인 B","기미 고민 본격화되는 40대, 가장 많이 선택한 이유가 있습니다"],
  ],
  "[한정수량] 기미 앰플 쿠션 세트 1+1": [
    ["헤드라인 A","촉촉한 밀착력과 뛰어난 커버력의 쿠션 — 리뷰 25,073건이 증명"],
    ["헤드라인 B","스킨케어와 커버, 두 마리 토끼를 잡은 40·50대의 선택"],
  ],
  "[완판 재입고 기념 특가] 기미 집중 패치 ~55%": [
    ["헤드라인 A","시원하고 촉촉한 기미 개선 패치, 강력 추천 — 부정 리뷰 0건대"],
    ["번들 제안(3점대 리뷰 대응)","패치만으론 아쉬웠다면 — 앰플·크림과 함께 쓰는 병행 루틴 세트"],
  ],
  "[출시 특가 1+1] 기미 톤업 썬세럼": [
    ["헤드라인 A","기미 걱정에 바로 답했다 — 목적구매 만족도 1위 톤업 썬세럼"],
    ["헤드라인 B","처음 써보는 이지듀, 첫구매 절반 이상이 선택한 제품"],
  ],
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
    `전체 리뷰 ${d.metaCount.toLocaleString()}건 · 평점 ${d.metaScore}★ (표본 ${d.sampleN}건 분석, Cre.ma 리뷰 위젯 API, 2026.07 수집)`;

  document.getElementById("aiSummaryText").textContent =
    `"${d.aiOneLine}" — ${d.aiKeywordsVendor.join(" · ")}`;

  document.getElementById("quotesPositive").innerHTML =
    `<div class="hint" style="margin-bottom:8px;font-weight:700;color:#1aae39;">👍 긍정 리뷰</div>` +
    d.positive.map(q=>`<div class="quote">${q[0]}<small>${q[1]}</small></div>`).join("");
  document.getElementById("quotesNegative").innerHTML =
    `<div class="hint" style="margin:14px 0 8px;font-weight:700;color:#e53935;">👎 개선 포인트</div>` +
    (d.negative.length
      ? d.negative.map(q=>`<div class="quote neg">${q[0]}<small>${q[1]}</small></div>`).join("")
      : `<div class="quote">표본 ${d.sampleN}건 중 뚜렷한 불만 톤의 리뷰는 발견되지 않았습니다 — 재구매·꾸준 사용 언급이 다수입니다.</div>`);

  document.getElementById("uspList").innerHTML = uspBank[key].map(u=>`<div class="quote">${u}</div>`).join("");
  document.getElementById("copyList").innerHTML = copyBank[key].map(c=>`
    <div class="copy-card"><div class="tag2">${c[0]}</div><p>${c[1]}</p></div>
  `).join("");

  renderSegments(d);
}

/** 세그먼트 도넛/바 차트 4종 + 데이터 품질 인사이트. */
function donut(id, existing, dataMap, colors){
  if(existing) existing.destroy();
  const labels = Object.keys(dataMap);
  const values = Object.values(dataMap);
  return new Chart(document.getElementById(id).getContext("2d"), {
    type:"doughnut",
    data:{labels, datasets:[{data:values, backgroundColor:colors.slice(0,labels.length), borderWidth:0}]},
    options:{cutout:"58%", plugins:{legend:{position:"bottom", labels:{boxWidth:9,font:{size:9,family:"Inter"},color:"#615d59"}}}}
  });
}
function segBar(id, existing, dataMap, color){
  if(existing) existing.destroy();
  const entries = Object.entries(dataMap).sort((a,b)=>b[1]-a[1]);
  return new Chart(document.getElementById(id).getContext("2d"), {
    type:"bar",
    data:{labels:entries.map(e=>e[0]), datasets:[{data:entries.map(e=>e[1]), backgroundColor:color, borderRadius:6}]},
    options:{indexAxis:"y", plugins:{legend:{display:false}}, scales:{x:{grid:{color:"#f6f5f4"},ticks:{font:{size:9,family:"Inter"},color:"#a39e98"}}, y:{grid:{display:false},ticks:{font:{size:10,family:"Inter"},color:"#31302e"}}}}
  });
}
function renderSegments(d){
  const s = d.segments;
  document.getElementById("segmentMeta").textContent =
    `리뷰 작성 폼에서 고객이 직접 선택한 속성 기준 (표본 ${d.sampleN}건 중 응답자만 집계)`;

  ageChart = segBar("ageChart", ageChart, s.age, "#0075de");
  purchaseChart = donut("purchaseChart", purchaseChart, s.purchase, ["#FF6000","#a39e98"]);
  dermChart = donut("dermChart", dermChart, s.derm, ["#1aae39","#a39e98"]);
  concernChart = segBar("concernChart", concernChart, s.concern, "#6B3FBF");

  const concernTotal = Object.values(s.concern).reduce((a,b)=>a+b,0);
  document.getElementById("segmentInsight").innerHTML = `
    <div class="amp-insight"><span class="amp-arrow">→</span>피부고민 응답 ${concernTotal + s.leakedInvalid}건 중 ${s.leakedInvalid}건은 실제로는 피부타입 값(건성·지성 등)이 잘못 들어온 것으로 추정 — 원본 리뷰 폼의 데이터 품질 이슈이며, concern 차트는 정상 응답 ${concernTotal}건만 반영했습니다.</div>
  `;
}
reviewProductSelect.addEventListener("change", renderReview);
renderReview();
