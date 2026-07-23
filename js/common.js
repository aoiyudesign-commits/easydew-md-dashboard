/* =========================================================
   COMMON — 메뉴 3개가 공유하는 레이아웃 로직.
   메뉴별 데이터가 필요해서(products/competitors/reviewInsights),
   반드시 js/roas.js, js/price.js, js/review.js보다 나중에 로드해야 한다.
   ========================================================= */

/* 사이드바 + 모바일 하단 탭바가 .tab-btn을 공유하므로 둘 다 활성 상태를 맞춘다. */
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const tab = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.tab===tab));
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    document.getElementById("view-"+tab).classList.add("active");
  });
});

/* 헤더 상단 identity 지표 — 메뉴 3개의 데이터를 모두 참조하는 유일한 교차 지점. */
document.getElementById("hmSku").textContent = products.length+"개";
document.getElementById("hmBrand").textContent =
  new Set(competitors.filter(c=>c.brand!=="이지듀").map(c=>c.brand)).size+"개 브랜드";
document.getElementById("hmReview").textContent = Object.keys(reviewInsights).length+"개 제품";
