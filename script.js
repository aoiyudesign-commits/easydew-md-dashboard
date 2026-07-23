/* =========================================================
   DATA — 실데이터 (easydew.co.kr 및 공개 검색 기준, 2026.07)
   ========================================================= */
const products = [
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

const competitors = [
  {brand:"이지듀", name:"기미 앰플 쿠션 세트", size:14, unit:"g", list:79600, sale:49800, reviews:16874},
  {brand:"이지듀", name:"EGF 기미크림 105ml", size:105, unit:"ml", list:59800, sale:32400, reviews:4308},
  {brand:"이지듀", name:"기미 썬세럼", size:40, unit:"ml", list:98000, sale:39000, reviews:4691},
  {brand:"넘버즈인", name:"5번 글루타치온C 흔적 앰플", size:30, unit:"ml", list:28000, sale:25200, reviews:12400},
  {brand:"구달", name:"청귤 비타C 잡티케어 세럼", size:30, unit:"ml", list:28000, sale:19300, reviews:9800},
  {brand:"AXIS-Y", name:"다크스팟 코렉팅 글로우 세럼", size:50, unit:"ml", list:25000, sale:21500, reviews:15600},
];

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
  }
};

const defaultInsightKey = "기미 앰플 쿠션 세트 (멜라 비 토닝 앰플 쿠션)";

/* =========================================================
   TAB SWITCH
   ========================================================= */
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("view-"+btn.dataset.tab).classList.add("active");
  });
});

/* =========================================================
   TAB 1: ROAS SIMULATOR
   ========================================================= */
const productSelect = document.getElementById("productSelect");
products.forEach((p,i)=>{
  const o=document.createElement("option");
  o.value=i; o.textContent = `${p.name} · 판매가 ${p.sale.toLocaleString()}원`;
  productSelect.appendChild(o);
});

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

function fmt(n){ return Math.round(n).toLocaleString()+"원"; }

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

  document.getElementById("productHint").textContent = `${p.name} · 판매가 ${p.sale.toLocaleString()}원 기준 계산`;

  const r = calcProfit(p.sale, adBudget, cpc, cvr, cogs, fulfill, returnRate);

  const kpis = [
    {lbl:"예상 매출", val:fmt(r.revenue), cls:""},
    {lbl:"ROAS", val:r.roas.toFixed(0)+"%", cls: r.roas>=100?"pos":"neg"},
    {lbl:"영업이익", val:fmt(r.profit), cls:r.profit>=0?"pos":"neg"},
    {lbl:"영업이익률(ROI 대비)", val:r.roi.toFixed(1)+"%", cls:r.roi>=0?"pos":"neg"},
    {lbl:"전환 주문수", val:Math.round(r.orders).toLocaleString()+"건", cls:""},
    {lbl:"클릭수", val:Math.round(r.clicks).toLocaleString()+"회", cls:""},
    {lbl:"물류/CS 총비용", val:fmt(r.fulfillCost), cls:""},
    {lbl:"반품 손실 추정", val:fmt(r.returnLoss), cls:""},
  ];
  document.getElementById("kpiGrid").innerHTML = kpis.map(k=>`
    <div class="kpi"><div class="lbl">${k.lbl}</div><div class="val ${k.cls}">${k.val}</div></div>
  `).join("");

  // Donut: cost breakdown
  const ctx = document.getElementById("roasChart");
  const data = {
    labels:["매출원가","광고비","물류/CS","반품손실","영업이익"],
    datasets:[{
      data:[r.cogs, adBudget, r.fulfillCost, r.returnLoss, Math.max(r.profit,0)],
      backgroundColor:["#c9c0b3","#c0784a","#e2b48c","#b8503f","#2f6b4f"],
      borderWidth:0,
    }]
  };
  if(roasChart) roasChart.destroy();
  roasChart = new Chart(ctx, {
    type:"doughnut",
    data,
    options:{
      plugins:{legend:{position:"bottom", labels:{boxWidth:10,font:{size:11}}}},
      cutout:"62%",
    }
  });

  drawScenarioChart(p, cpc, cvr, cogs, fulfill, returnRate);
}

function drawScenarioChart(p, cpc, cvr, cogs, fulfill, returnRate){
  const budgets = [];
  const profits = [];
  const roasArr = [];
  for(let b=5000000;b<=40000000;b+=5000000){
    const r = calcProfit(p.sale, b, cpc, cvr, cogs, fulfill, returnRate);
    budgets.push((b/10000).toLocaleString()+"만원");
    profits.push(Math.round(r.profit));
    roasArr.push(Math.round(r.roas));
  }
  const ctx = document.getElementById("scenarioChart");
  if(scenarioChart) scenarioChart.destroy();
  scenarioChart = new Chart(ctx, {
    data:{
      labels:budgets,
      datasets:[
        {type:"bar", label:"영업이익(원)", data:profits, backgroundColor:"#2f6b4f", yAxisID:"y", borderRadius:6},
        {type:"line", label:"ROAS(%)", data:roasArr, borderColor:"#c0784a", backgroundColor:"#c0784a", yAxisID:"y1", tension:.3, pointRadius:3},
      ]
    },
    options:{
      scales:{
        y:{title:{display:true,text:"영업이익(원)",font:{size:11}}, ticks:{font:{size:10}}},
        y1:{position:"right", grid:{drawOnChartArea:false}, title:{display:true,text:"ROAS(%)",font:{size:11}}, ticks:{font:{size:10}}},
        x:{ticks:{font:{size:10}}}
      },
      plugins:{legend:{position:"bottom", labels:{boxWidth:10,font:{size:11}}}}
    }
  });
}

["productSelect","adBudget","cpc","cvr","cogs","fulfill","returnRate"].forEach(id=>{
  document.getElementById(id).addEventListener("input", computeROAS);
  document.getElementById(id).addEventListener("change", computeROAS);
});
computeROAS();

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
  ]
};

function renderReview(){
  const key = reviewProductSelect.value;
  const d = reviewInsights[key];

  const sctx = document.getElementById("sentimentChart");
  if(sentimentChart) sentimentChart.destroy();
  sentimentChart = new Chart(sctx, {
    type:"doughnut",
    data:{labels:["긍정","중립","부정"], datasets:[{data:d.sentiment, backgroundColor:["#2f6b4f","#d8cfc0","#b8503f"], borderWidth:0}]},
    options:{cutout:"60%", plugins:{legend:{position:"bottom", labels:{boxWidth:10,font:{size:11}}}}}
  });

  const kctx = document.getElementById("keywordChart");
  if(keywordChart) keywordChart.destroy();
  keywordChart = new Chart(kctx, {
    type:"bar",
    data:{
      labels:d.keywords.map(k=>k[0]),
      datasets:[{data:d.keywords.map(k=>k[1]), backgroundColor:"#c0784a", borderRadius:6}]
    },
    options:{indexAxis:"y", plugins:{legend:{display:false}}, scales:{x:{ticks:{font:{size:10}}}, y:{ticks:{font:{size:11}}}}}
  });

  document.getElementById("quotesPositive").innerHTML =
    `<div class="hint" style="margin-bottom:8px;font-weight:700;color:#2f6b4f;">👍 긍정 리뷰</div>` +
    d.positive.map(q=>`<div class="quote">${q[0]}<small>${q[1]}</small></div>`).join("");
  document.getElementById("quotesNegative").innerHTML =
    `<div class="hint" style="margin:14px 0 8px;font-weight:700;color:#b8503f;">👎 개선 포인트</div>` +
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
      backgroundColor: c.brand==="이지듀" ? "#2f6b4f" : "#c0784a",
      pointRadius: 8,
    }))
  },
  options:{
    plugins:{legend:{display:true, position:"bottom", labels:{boxWidth:8,font:{size:10}}}},
    scales:{
      x:{title:{display:true,text:"100ml(g) 환산 판매가(원)",font:{size:11}}},
      y:{title:{display:true,text:"누적 리뷰수",font:{size:11}}}
    }
  }
});

const alerts = [
  {type:"down", text:"넘버즈인 5번 글루타치온C 흔적 앰플 — 오늘 25,200원 → 데모 시뮬레이션상 22,700원 (-10%) 감지"},
  {type:"ok", text:"구달 청귤 비타C 잡티케어 세럼 — 최근 7일 가격 변동 없음 (19,300원 유지)"},
  {type:"down", text:"AXIS-Y 다크스팟 코렉팅 글로우 세럼 — 올리브영 14% 할인 프로모션 진행 중 (25,000→21,500원)"},
  {type:"ok", text:"이지듀 기미 앰플 쿠션 — 자사 프로모션 캘린더 기준 정상가 유지, 경쟁사 대비 가격 우위 구간"},
];
document.getElementById("alertList").innerHTML = alerts.map(a=>`
  <div class="alert-card ${a.type==='ok'?'ok':''}">
    <span>${a.text}</span>
    <span class="pill ${a.type==='ok'?'up':'down'}">${a.type==='ok'?'정상':'변동'}</span>
  </div>
`).join("");
