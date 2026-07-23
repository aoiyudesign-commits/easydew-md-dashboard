/* =========================================================
   자사제품 관리 메뉴 — 데이터 + 로직 전담.
   다른 메뉴(js/price.js, js/review.js, js/roas.js)와 데이터를 공유하지 않는다.
   경쟁사(넘버즈인·구달·AXIS-Y) 비교는 '경쟁사 가격 모니터링' 메뉴 소관이고,
   이 메뉴는 이지듀 자사 제품이 여러 채널에서 어떻게 팔리는지만 다룬다.
   ========================================================= */

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

/* ---- 헤더(자사제품 관리) ---- */
window.HEADERS.own = () => {
  const groups = [...new Set(channelPrices.map(r=>r.product))];
  const channelCount = new Set(channelPrices.map(r=>r.channel)).size;
  const comparable = groups.filter(p=>channelPrices.filter(r=>r.product===p&&r.sale!=null).length>=2);
  const eventCount = channelPrices.filter(r=>r.event).length;
  return {
    badge: "● 김유빈 · 자사제품 관리 · 디엔코스메틱스 지원용",
    title: `자사제품 <span>관리</span>`,
    sub: "이지듀가 실제 판매 중인 채널의 가격을 한곳에서 비교합니다 (재고·발주 관리는 다음 단계)",
    metricsHtml: `
      <div class="hm-cell"><div class="hm-label">모니터링 제품</div><div class="hm-value">${groups.length}개</div><div class="hm-trend up">▲ 기미/미백 핵심 라인업</div></div>
      <div class="hm-cell"><div class="hm-label">판매 채널</div><div class="hm-value">${channelCount}개</div><div class="hm-trend up">▲ 자사몰·올리브영·쿠팡</div></div>
      <div class="hm-cell"><div class="hm-label">채널 간 비교 가능</div><div class="hm-value">${comparable.length}개</div><div class="hm-trend up">▲ 2개 채널 이상 확인</div></div>
      <div class="hm-cell"><div class="hm-label">진행중 이벤트</div><div class="hm-value">${eventCount}건</div><div class="hm-trend ${eventCount>0?'down':'up'}">${eventCount>0?'▼ 채널별 즉시할인':'▲ 정상 판매'}</div></div>
    `,
  };
};
if(document.getElementById("view-own").classList.contains("active")) applyHeaderFor("own");
