/**
 * easydew.co.kr 상품 상세페이지에 실제로 붙어있는 리뷰 위젯(Cre.ma) API 크롤러.
 *
 * 상품 상세페이지를 열면 위젯이 review9.cre.ma로 자체 API를 호출한다(공식 문서화된
 * 공개 API는 아니고, 위젯이 내부적으로 쓰는 엔드포인트를 그대로 재사용하는 방식).
 * Playwright로 페이지를 열어 secure_device_token/product_code를 확보한 뒤,
 * 같은 브라우저 컨텍스트로 reviews_summary(벤더 AI 요약)와 reviews(개별 리뷰+
 * evaluation_properties/customer_properties/ai_summary) API를 직접 호출한다.
 *
 * 실행: npm i playwright && node crawl_crema_reviews.mjs
 * 결과는 사람이 읽고 요약해 ../script.js의 reviewInsights를 채운다(자동 반영 아님).
 */
import { chromium } from 'playwright';
import fs from 'fs';

const PRODUCTS = [
  { key: "기미앰플40", url: "https://easydew.co.kr/product/detail.html?product_no=2073" },
  { key: "쿠션세트11", url: "https://easydew.co.kr/product/detail.html?product_no=2496" },
  { key: "집중패치", url: "https://easydew.co.kr/product/detail.html?product_no=2079" },
  { key: "톤업썬세럼", url: "https://easydew.co.kr/product/기간-한정-기미-톤업-썬세럼-특가/2966/category/42/display/1/" },
];
const PAGES_PER_PRODUCT = 3;   // per=20 x 3 = 60건 표본
const OUT_FILE = "crema_data.json";

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const results = {};

for (const p of PRODUCTS) {
  let code = null, token = null;
  const onReq = (req) => {
    const url = req.url();
    const m = url.match(/reviews_summary\?.*product_code=(\d+)/) || url.match(/reviews\?.*product_code=(\d+)/);
    if (m) code = m[1];
    const tm = url.match(/secure_device_token=([^&]+)/);
    if (tm) token = tm[1];
  };
  page.on('request', onReq);
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  page.off('request', onReq);

  if (!code) {
    console.log(p.key, '-> 실패: product_code를 찾지 못함 (상품이 단종/변경되었을 수 있음)');
    results[p.key] = { error: 'no product_code found', final_url: page.url() };
    continue;
  }

  const base = 'https://review9.cre.ma/api/easydew.co.kr';
  const common = `secure_device_token=${token}&widget_id=2&widget_style=list_v3&iframe_id=crema-product-reviews-2&locale=ko-KR&app=0&iframe=1&product_code=${code}`;

  const summaryRes = await context.request.get(`${base}/reviews_summary?${common}`, { headers: { Referer: 'https://easydew.co.kr/' } });
  const summary = await summaryRes.json();

  const allReviews = [];
  for (let pg = 1; pg <= PAGES_PER_PRODUCT; pg++) {
    const url = `${base}/reviews?${common}&per=20&page=${pg}&fields=reviews.evaluation_properties,reviews.customer_properties,reviews.ai_summary`;
    const res = await context.request.get(url, { headers: { Referer: 'https://easydew.co.kr/' } });
    const json = await res.json();
    if (!json.reviews || json.reviews.length === 0) break;
    allReviews.push(...json.reviews);
    if (!json.pagy || !json.pagy.next) break;
  }

  results[p.key] = {
    product_code: code,
    product_name: allReviews[0]?.product_name || null,
    meta_reviews_count: allReviews[0]?.product_meta_reviews_count || null,
    meta_score: allReviews[0]?.product_meta_score || null,
    reviews_summary: summary.reviews_summary,
    reviews: allReviews.map(r => ({
      id: r.id, score: r.score, created_at: r.created_at, message: r.filtered_message,
      ai_summary: r.ai_summary,
      evaluation_properties: r.evaluation_properties,
      customer_properties: r.customer_properties,
    })),
  };
  console.log(p.key, `-> product_code=${code}, ${allReviews.length}건 수집`);
}

fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2), 'utf-8');
console.log(`저장 완료: ${OUT_FILE}`);
await browser.close();
