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

/**
 * 멀티채널 가격 모니터링 — easydew.co.kr(자사몰), 올리브영 모바일 브랜드관,
 * 쿠팡 대웅제약 이지듀 공식몰을 2026.07 직접 방문 조사한 실제 판매가.
 * 채널마다 판매 중인 용량/구성(정사이즈·미니·리필·기획 등)이 달라 완전한 1:1 SKU가
 * 아닌 경우 note에 정확한 옵션명을 남겨 왜곡 없이 비교하도록 했다.
 * event: 조사 시점에 실제로 표시돼 있던 즉시할인/기간限 프로모션 여부.
 */
const channelPrices = [
  { product:"기미 앰플 쿠션 (13~15g대)", channel:"자사몰", url:"https://www.easydew.co.kr/", list:49800, sale:49800, event:false, note:"기미 앰플 쿠션 세트 14g · 상시가" },
  { product:"기미 앰플 쿠션 (13~15g대)", channel:"올리브영", url:"https://m.oliveyoung.co.kr/m/mtn/brand/A008931", list:39800, sale:38800, event:false, note:"[2025어워즈] 기미 앰플 쿠션 15g" },
  { product:"기미 앰플 쿠션 (13~15g대)", channel:"쿠팡", url:"https://shop.coupang.com/A00870335", list:49800, sale:34900, event:true, note:"앰플 쿠션 퍼프 기획 13g · 29% 즉시할인 진행중" },

  { product:"기미매트팩트", channel:"자사몰", url:"https://www.easydew.co.kr/", list:49800, sale:24900, event:false, note:"기미매트팩트 1+1(2개, 99,600원) · 단품환산가로 비교" },
  { product:"기미매트팩트", channel:"쿠팡", url:"https://shop.coupang.com/A00870335", list:24900, sale:18900, event:true, note:"매트 커버 팩트 미니 10g · 24% 즉시할인 진행중" },
  { product:"기미매트팩트", channel:"올리브영", url:"https://m.oliveyoung.co.kr/m/mtn/brand/A008931", list:null, sale:null, event:false, note:"동일 SKU 미확인" },

  { product:"베리어 리페어 크림 50ml", channel:"자사몰", url:"https://www.easydew.co.kr/", list:25900, sale:22400, event:true, note:"베리어리페어 크림 50ml · 13% 할인 진행중" },
  { product:"베리어 리페어 크림 50ml", channel:"올리브영", url:"https://m.oliveyoung.co.kr/m/mtn/brand/A008931", list:34000, sale:34000, event:false, note:"[10분진정] 베리어 리페어 보습케어 크림 50ml · 정가 판매" },
  { product:"베리어 리페어 크림 50ml", channel:"쿠팡", url:"https://shop.coupang.com/A00870335", list:35900, sale:24400, event:true, note:"베리어 리페어 보습케어 크림 50ml · 32% 즉시할인 진행중" },

  { product:"EGF 기미앰플 집중 부스터 샷", channel:"자사몰", url:"https://www.easydew.co.kr/", list:79000, sale:49000, event:true, note:"EGF 기미앰플 집중 부스터 샷 · 상시 할인가" },
  { product:"EGF 기미앰플 집중 부스터 샷", channel:"쿠팡", url:"https://shop.coupang.com/A00870335", list:49900, sale:23920, event:true, note:"DW-EGF 멜라토닝 원데이 앰플 부스터 샷 15ml · 52% 즉시할인 진행중" },
  { product:"EGF 기미앰플 집중 부스터 샷", channel:"올리브영", url:"https://m.oliveyoung.co.kr/m/mtn/brand/A008931", list:null, sale:null, event:false, note:"동일 SKU 미확인" },

  { product:"EGFx 다운타임 오인트 마스크(4매)", channel:"자사몰", url:"https://www.easydew.co.kr/", list:49900, sale:29900, event:true, note:"[출시 특가] 23g×4EA · 40% 할인 진행중" },
  { product:"EGFx 다운타임 오인트 마스크(4매)", channel:"올리브영", url:"https://m.oliveyoung.co.kr/m/mtn/brand/A008931", list:30000, sale:21900, event:true, note:"27% 할인, [5일특가] 7/20~7/24 기간한정" },
  { product:"EGFx 다운타임 오인트 마스크(4매)", channel:"쿠팡", url:"https://shop.coupang.com/A00870335", list:null, sale:null, event:false, note:"미판매 추정(미확인)" },
];

const CHANNEL_CLASS = {"자사몰":"mall", "올리브영":"oy", "쿠팡":"cp"};

function renderChannelPriceTable(){
  const tbody = document.querySelector("#channelPriceTable tbody");
  const groups = [...new Set(channelPrices.map(r=>r.product))];

  tbody.innerHTML = channelPrices.map(r=>{
    const isGroupStart = channelPrices.findIndex(x=>x.product===r.product)===channelPrices.indexOf(r);
    // floor로 계산 — 올리브영/쿠팡이 자체 배지에 표시하는 할인율과 동일한 방식(내림)
    const discount = (r.list && r.sale) ? Math.floor((1-r.sale/r.list)*100) : null;
    return `
      <tr>
        <td class="${isGroupStart?'grp-start':''}">${isGroupStart ? r.product : ''}</td>
        <td class="${isGroupStart?'grp-start':''}"><span class="ch-name ${CHANNEL_CLASS[r.channel]}">${r.channel}</span></td>
        <td class="${isGroupStart?'grp-start':''}">${r.list ? r.list.toLocaleString()+'원' : '-'}</td>
        <td class="${isGroupStart?'grp-start':''}"><b>${r.sale ? r.sale.toLocaleString()+'원' : '미확인'}</b></td>
        <td class="${isGroupStart?'grp-start':''}">${discount!=null ? discount+'%' : '-'}</td>
        <td class="${isGroupStart?'grp-start':''}"><span class="evt-badge ${r.event?'on':'off'}">${r.event?'진행중':'-'}</span></td>
        <td class="${isGroupStart?'grp-start':''}" style="font-size:11px;color:var(--ink-faint);">${r.note}</td>
      </tr>`;
  }).join("");

  // 채널별 최저가 제품 수 + 최대 가격차 계산 (실판매가 기준, 미확인 제외)
  const lowestByChannel = {};
  let maxGap = {product:null, gapPct:0, low:null, high:null};
  groups.forEach(p=>{
    const rows = channelPrices.filter(r=>r.product===p && r.sale!=null);
    if(rows.length<2) return;
    const lowest = rows.reduce((a,b)=>a.sale<b.sale?a:b);
    lowestByChannel[lowest.channel] = (lowestByChannel[lowest.channel]||0)+1;
    const highest = rows.reduce((a,b)=>a.sale>b.sale?a:b);
    const gapPct = Math.round((1-lowest.sale/highest.sale)*100);
    if(gapPct>maxGap.gapPct) maxGap = {product:p, gapPct, low:lowest, high:highest};
  });
  const lowestSummary = Object.entries(lowestByChannel).sort((a,b)=>b[1]-a[1])
    .map(([ch,n])=>`${ch} ${n}건`).join(" · ");

  document.getElementById("channelPriceInsight").innerHTML = `
    <div class="amp-insight"><span class="amp-arrow">→</span>비교 가능한 ${groups.filter(p=>channelPrices.filter(r=>r.product===p&&r.sale!=null).length>=2).length}개 제품 중 최저가 채널 분포: ${lowestSummary}</div>
    <div class="amp-insight"><span class="amp-arrow">→</span>채널 간 가격차 최대 제품: <b>${maxGap.product}</b> — ${maxGap.high.channel}(${maxGap.high.sale.toLocaleString()}원) 대비 ${maxGap.low.channel}(${maxGap.low.sale.toLocaleString()}원)이 ${maxGap.gapPct}% 저렴 (MAP 정책 점검 권장)</div>
  `;
}
renderChannelPriceTable();

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
