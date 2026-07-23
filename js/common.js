/* =========================================================
   COMMON — 메뉴 3개가 공유하는 레이아웃 로직.
   반드시 다른 메뉴 스크립트(js/price.js, js/review.js, js/roas.js)보다
   먼저 로드해야 한다 — 아래 두 헬퍼를 각 메뉴가 자기 헤더 등록에 사용하기 때문.

   각 메뉴 JS는 자기 데이터가 준비되는 시점에 아래처럼 등록하고,
   자신이 기본 활성 탭이면 즉시 한 번 적용한다:
     window.HEADERS.price = () => ({ badge, title, sub, metricsHtml });
     if (document.getElementById("view-price").classList.contains("active")) applyHeaderFor("price");
   ========================================================= */
window.HEADERS = {};

function setHeader({badge, title, sub, metricsHtml}){
  document.getElementById("headerBadge").textContent = badge;
  document.getElementById("headerTitle").innerHTML = title;
  document.getElementById("headerSub").textContent = sub;
  const metricsEl = document.getElementById("headerMetrics");
  if(metricsHtml){
    metricsEl.style.display = "";
    metricsEl.innerHTML = metricsHtml;
  } else {
    metricsEl.style.display = "none";
    metricsEl.innerHTML = "";
  }
}
function applyHeaderFor(tab){
  const fn = window.HEADERS[tab];
  if(fn) setHeader(fn());
}

/* 사이드바 + 모바일 하단 탭바가 .tab-btn을 공유하므로 둘 다 활성 상태를 맞춘다. */
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const tab = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    document.getElementById("view-"+tab).classList.add("active");
    applyHeaderFor(tab);
  });
});
