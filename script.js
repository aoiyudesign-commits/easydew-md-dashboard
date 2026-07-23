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

const reviewInsights = {
  "기미 앰플 쿠션 세트 (멜라 비 토닝 앰플 쿠션)": {
    sentiment:[78,14,8],
    keywords:[["커버력",92],["백탁없음",71],["기미개선 체감",44],["가격/특가",68],["지속력",39],["향",22]],
    positive:[
      ["“겉도는 느낌 없이 피부에 잘 스며드네요.” — 실제 자사몰 리뷰", "easydew.co.kr 상품후기"],
      ["“컬러도 좋고 들뜨지 않아요, 좋으네요.” — 자사몰 리뷰 (5점)", "easydew.co.kr 상품후기"],
      ["커버력 좋은 쿠션으로 리뷰 커뮤니티에서 다수 추천 언급", "언니의파우치 커뮤니티"],
    ],
    negative:[
      ["“쿠션만 단독으로 2주 사용 시 기미가 눈에 띄게 옅어지는 느낌은 못 느꼈다.”", "커뮤니티 리뷰 요약"],
      ["“커버력은 만족하지만 기미 개선 효과는 생각보다 애매하다.”", "커뮤니티 리뷰 요약"],
    ]
  },
  "EGF 기미크림 105ml (멜라 글루타치온 크림)": {
    sentiment:[74,16,10],
    keywords:[["보습감",81],["기미개선 체감",58],["가격/특가",64],["발림성",47],["향",31],["대용량",26]],
    positive:[
      ["“기미 관리용 크림 여러 개 써봤지만 바르는 순간부터 질감이 좋다.”", "easydew.co.kr 상품후기"],
      ["“아침에 일어나면 얼굴빛이 환하고 뽀샤시한데 이 크림 덕분인 것 같다.”", "easydew.co.kr 상품후기"],
    ],
    negative:[
      ["“기미앰플을 내돈내산으로 써봤는데 기대만큼 효과를 못 느껴 실패한 후기.”", "언니의파우치 커뮤니티"],
    ]
  },
  "기미 썬세럼 (튜브형)": {
    sentiment:[83,11,6],
    keywords:[["백탁없음",88],["산뜻함",76],["기미+자차 동시케어",63],["발림성",55],["향",24],["재구매",41]],
    positive:[
      ["“겉도는 느낌 없이 피부에 잘 스며드네요.”", "이지듀 더마토크 고객 인터뷰"],
      ["“백탁 현상이 없고 발림성도 좋아요.”", "이지듀 더마토크 고객 인터뷰"],
      ["“촉촉합니다. 쿠션 사용 전 발랐더니 화장이 잘 먹는 느낌이에요.”", "이지듀 더마토크 고객 인터뷰"],
    ],
    negative:[
      ["“유기자차 특성상 도포 직후 향이 다소 강하게 느껴진다는 의견 존재.”", "커뮤니티 리뷰 요약"],
    ]
  },
  "기미매트팩트 1+1": {
    sentiment:[80,13,7],
    keywords:[["매트마무리",85],["1+1 가성비",74],["커버력",62],["지속력",45],["백탁없음",33],["휴대성",27]],
    positive:[
      ["“번들거림 없이 하루종일 매트해서 좋아요.” — 자사몰 리뷰 (5점)", "easydew.co.kr 상품후기"],
      ["“1+1이라 하나는 파우치에 두고 쓰기 편해요.”", "easydew.co.kr 상품후기"],
      ["매트 지속력 관련 긍정 언급이 리뷰 커뮤니티에서 다수 발견", "언니의파우치 커뮤니티"],
    ],
    negative:[
      ["“건성 피부에는 각질이 살짝 뜨는 느낌이 있다.”", "커뮤니티 리뷰 요약"],
      ["“매트한 대신 촉촉함은 다른 제품 대비 부족하다는 의견.”", "커뮤니티 리뷰 요약"],
    ]
  },
  "EGF 손상케어크림 105ml (베리어 리페어 크림)": {
    sentiment:[76,15,9],
    keywords:[["장벽개선 체감",70],["보습감",68],["대용량",58],["순한 성분",49],["재구매",38],["향",21]],
    positive:[
      ["“시술 후 예민해진 피부에 발랐는데 진정이 빠르네요.”", "easydew.co.kr 상품후기"],
      ["“105ml라 아깝지 않게 듬뿍 바를 수 있어서 좋아요.”", "easydew.co.kr 상품후기"],
    ],
    negative:[
      ["“보습력은 좋은데 유분감이 다소 있어 지성 피부는 호불호가 갈릴 수 있다.”", "커뮤니티 리뷰 요약"],
    ]
  },
  "DW-EGF 멜라토닝 패치 (기미 집중 패치)": {
    sentiment:[79,14,7],
    keywords:[["부분집중케어",81],["휴대성",66],["가격/특가",55],["밀착력",47],["지속력",36],["체감속도",29]],
    positive:[
      ["“잡티 부위에 붙이고 자면 아침에 톤이 확실히 달라요.”", "easydew.co.kr 상품후기"],
      ["“패치라 특정 부위만 집중 케어할 수 있어서 좋아요.”", "언니의파우치 커뮤니티"],
    ],
    negative:[
      ["“밤새 붙이고 자면 아침에 살짝 밀리는 경우가 있다.”", "커뮤니티 리뷰 요약"],
    ]
  }
};

const defaultInsightKey = "기미 앰플 쿠션 세트 (멜라 비 토닝 앰플 쿠션)";

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

const uspBank = {
  "기미 앰플 쿠션 세트 (멜라 비 토닝 앰플 쿠션)": [
    "커버력과 스킨케어를 동시에 원하는 고객을 위한 '기미 앰플+쿠션' 결합 포맷 — 별도 앰플 없이 원스텝 완성",
    "DW-EGF 순도 99% (대웅제약 특허 성분) — 타 브랜드 대비 신뢰 가능한 제약사 기술력 스토리",
    "리뷰 1.6만 건 누적 — 신규 고객의 구매 결정 장벽을 낮추는 '검증된 베스트셀러' 포지셔닝",
  ],
  "EGF 기미크림 105ml (멜라 글루타치온 크림)": [
    "105ml 대용량 포맷 — 동일 카테고리 경쟁사(30~50ml) 대비 온스당 단가 경쟁력",
    "글루타치온 성분 스토리 — '먹는 미백'으로 익숙한 성분을 '바르는' 포맷으로 재해석",
    "아침 사용 후기 다수 — '기상 후 톤 개선 체감'을 데일리 루틴 메시지로 활용 가능",
  ],
  "기미 썬세럼 (튜브형)": [
    "'유기자차 + 기미케어' 동시 실현 — 자외선 차단제를 바꾸는 것만으로 기미 관리가 되는 차별화 포인트",
    "백탁 없는 산뜻한 제형 — 무기자차 백탁에 지친 2030 고객층 타겟 메시지",
    "기미앰플과 병행 시 개선 효과 4배 (자사 임상 커뮤니케이션) — 크로스셀 번들 설계 근거",
  ],
  "기미매트팩트 1+1": [
    "1+1 번들 자체가 '가성비 재구매 유도' USP — 파우치용+집용 분리 사용 시나리오로 소비 확장",
    "매트 지속력 중심 포지셔닝 — 유분·피지 고민 있는 여름철 성수기 타겟 메시지에 강점",
    "커버력+매트 두 마리 토끼 — 쿠션형 대비 '가볍게 덧바르는' 리터치 시장 공략 가능",
  ],
  "EGF 손상케어크림 105ml (베리어 리페어 크림)": [
    "시술 후/예민 피부 진정 니즈 — 피부과·에스테틱 연계 채널(제휴몰) 확장 근거",
    "105ml 대용량 — 손상케어 카테고리 경쟁사 대비 '아깝지 않게 듬뿍' 사용 경험 강조 가능",
    "EGF+장벽개선 성분 스토리 — 대웅제약 기술력을 '순한 진정' 메시지로 재해석",
  ],
  "DW-EGF 멜라토닝 패치 (기미 집중 패치)": [
    "부분 집중 패치 포맷 — 크림/세럼 루틴에 '추가 구매'로 자연스럽게 얹는 크로스셀 구조",
    "가격 접근성(14,900원) — 이지듀 첫구매·체험 유도용 엔트리 SKU로 활용 가능",
    "'자기 전 붙이고 아침에 확인' 사용 서사 — 짧은 숏폼 광고 소재로 전환 용이",
  ]
};

const copyBank = {
  "기미 앰플 쿠션 세트 (멜라 비 토닝 앰플 쿠션)": [
    ["헤드라인 A","커버는 기본, 기미 케어까지. 1.6만 개 후기가 증명하는 쿠션"],
    ["헤드라인 B","앰플 따로 안 발라도 돼요 — 쿠션 하나로 끝내는 기미 루틴"],
    ["개선 소재(부정 리뷰 대응)","2주보다 4주, 진짜 변화는 그 다음부터 — 기미앰플 부스터 샷 함께 쓰면 확실히 다릅니다"],
  ],
  "EGF 기미크림 105ml (멜라 글루타치온 크림)": [
    ["헤드라인 A","자고 일어나면 다른 얼굴 — 105ml 대용량 글루타치온 크림"],
    ["헤드라인 B","1병으로 3개월, 온스당 가격 비교하면 답 나옵니다"],
  ],
  "기미 썬세럼 (튜브형)": [
    ["헤드라인 A","백탁 없는 유기자차, 기미까지 옅어지는 선세럼"],
    ["헤드라인 B","선크림 하나 바꿨을 뿐인데 기미 케어가 시작됩니다"],
    ["번들 제안","기미앰플 + 선세럼 세트 — 병행 사용 시 개선 체감 4배, 번들 할인으로 객단가 UP"],
  ],
  "기미매트팩트 1+1": [
    ["헤드라인 A","하나는 파우치에, 하나는 집에 — 1+1로 만나는 매트 커버"],
    ["헤드라인 B","번들거림 걱정 끝, 하루종일 매트한 기미팩트"],
  ],
  "EGF 손상케어크림 105ml (베리어 리페어 크림)": [
    ["헤드라인 A","예민해진 피부, 105ml 듬뿍 바르는 진정 리페어 크림"],
    ["헤드라인 B","장벽부터 채우는 EGF 크림 — 아깝지 않은 대용량"],
  ],
  "DW-EGF 멜라토닝 패치 (기미 집중 패치)": [
    ["헤드라인 A","자기 전 붙이고, 아침에 확인하는 기미 집중 패치"],
    ["헤드라인 B","14,900원으로 시작하는 이지듀 기미케어 첫걸음"],
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

  document.getElementById("quotesPositive").innerHTML =
    `<div class="hint" style="margin-bottom:8px;font-weight:700;color:#1aae39;">👍 긍정 리뷰</div>` +
    d.positive.map(q=>`<div class="quote">${q[0]}<small>${q[1]}</small></div>`).join("");
  document.getElementById("quotesNegative").innerHTML =
    `<div class="hint" style="margin:14px 0 8px;font-weight:700;color:#e53935;">👎 개선 포인트</div>` +
    d.negative.map(q=>`<div class="quote neg">${q[0]}<small>${q[1]}</small></div>`).join("");

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
