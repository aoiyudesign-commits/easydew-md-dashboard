/* =========================================================
   손익 / ROAS 시나리오 시뮬레이터 메뉴 — 데이터 + 로직 전담.
   다른 메뉴(js/price.js, js/review.js)와 데이터를 공유하지 않는다.
   ========================================================= */

/* ---- DATA — 실데이터 (easydew.co.kr 공식몰, 2026.07 조사) ---- */
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

/**
 * DATA ADAPTER — 실 연동 시 이 함수 내부만 카페24 Admin API·엑셀 export 파서로
 * 교체하면 됩니다. 나머지 렌더링·계산 로직은 수정할 필요가 없습니다.
 */
async function loadProducts(){
  // TODO(실연동): return await fetch('/api/cafe24/products').then(r=>r.json());
  return products;
}

/* ---- TAB: ROAS SIMULATOR ---- */
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
