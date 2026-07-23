/* =========================================================
   경쟁사 가격 모니터링 메뉴 — 데이터 + 로직 전담.
   다른 메뉴(js/roas.js, js/review.js)와 데이터를 공유하지 않는다.
   ========================================================= */

// prevSale: 어제자 판매가(시연용 가정치) — 실연동 시 매일 스크래핑 결과를 여기에 저장/비교
let competitors = [
  {brand:"이지듀", name:"기미 앰플 쿠션 세트", size:14, unit:"g", list:79600, sale:49800, prevSale:49800, reviews:16874},
  {brand:"이지듀", name:"EGF 기미크림 105ml", size:105, unit:"ml", list:59800, sale:32400, prevSale:32400, reviews:4308},
  {brand:"이지듀", name:"기미 썬세럼", size:40, unit:"ml", list:98000, sale:39000, prevSale:39000, reviews:4691},
  {brand:"넘버즈인", name:"5번 글루타치온C 흔적 앰플", size:30, unit:"ml", list:28000, sale:25200, prevSale:28000, reviews:12400},
  {brand:"구달", name:"청귤 비타C 잡티케어 세럼", size:30, unit:"ml", list:28000, sale:19300, prevSale:19300, reviews:9800},
  {brand:"AXIS-Y", name:"다크스팟 코렉팅 글로우 세럼", size:50, unit:"ml", list:25000, sale:21500, prevSale:25000, reviews:15600},
];

/**
 * DATA ADAPTER — 실 연동 시 이 함수 내부만 스크래핑 배치 결과로 교체하면 됩니다.
 */
async function loadCompetitors(){
  // TODO(실연동): return await fetch('/api/competitor-prices').then(r=>r.json()); (일 1회 스크래핑 배치 결과)
  return competitors;
}

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
      responsive:true, maintainAspectRatio:false,
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

/* ---- 헤더(경쟁사 가격 모니터링) ---- */
window.HEADERS.price = () => {
  const brandCount = new Set(competitors.filter(c=>c.brand!=="이지듀").map(c=>c.brand)).size;
  const avgDiscount = Math.round(competitors.reduce((s,c)=>s+(1-c.sale/c.list)*100,0)/competitors.length);
  const overThreshold = checkPriceAlerts(5).filter(a=>a.type!=="ok").length;
  return {
    badge: "● 김유빈 · 경쟁사 가격 모니터링 · 디엔코스메틱스 지원용",
    title: `경쟁사 가격 <span>모니터링</span>`,
    sub: "이지듀 자사몰과 경쟁 3개 브랜드의 실시간 가격 포지셔닝을 비교합니다",
    metricsHtml: `
      <div class="hm-cell"><div class="hm-label">모니터링 SKU</div><div class="hm-value">${competitors.length}개</div><div class="hm-trend up">▲ 기미/미백 카테고리</div></div>
      <div class="hm-cell"><div class="hm-label">비교 브랜드</div><div class="hm-value">${brandCount}개 브랜드</div><div class="hm-trend up">▲ 올리브영·자사몰 공개가</div></div>
      <div class="hm-cell"><div class="hm-label">평균 할인율</div><div class="hm-value">${avgDiscount}%</div><div class="hm-trend up">▲ 정가 대비</div></div>
      <div class="hm-cell"><div class="hm-label">임계치(5%) 초과 알림</div><div class="hm-value">${overThreshold}건</div><div class="hm-trend ${overThreshold>0?'down':'up'}">${overThreshold>0?'▼ 확인 필요':'▲ 정상 범위'}</div></div>
    `,
  };
};
if(document.getElementById("view-price").classList.contains("active")) applyHeaderFor("price");
