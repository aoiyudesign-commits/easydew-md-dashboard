"""
easydew.co.kr 상품 사용후기 게시판(board_no=4) 크롤러.

1. 목록 페이지(list.html?board_no=4&page=N)를 순회하며 제품명·리뷰 URL·별점·작성일을 수집한다.
2. TARGET_PRODUCTS에 매칭되는 리뷰만 상세페이지(article/.../<id>/)에서 JSON-LD의
   articleBody(리뷰 원문 전체)를 추출한다.
3. 제품별로 <slug>.json 파일로 저장한다. 이 파일의 내용을 사람이 읽고 요약해
   ../script.js의 reviewInsights(감성 분포·키워드 빈도·인용구)를 채운다 — 자동 반영은 아니다.

실행: python3 crawl_reviews.py
공개된 리뷰 게시판만 대상으로 하며 회원 전용 페이지나 개인정보는 수집하지 않는다.
"""
import json
import re
import time
import urllib.parse
import urllib.request

BOARD_URL = "https://easydew.co.kr/board/product/list.html?board_no=4"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
    )
}
OUT_DIR = "reviews"
MAX_LIST_PAGES = 90
REQUEST_DELAY_SEC = 0.35

# 크롤링 목표 제품(리스트 페이지의 제품명에 포함되는 부분 문자열) -> 저장 파일명
TARGET_PRODUCTS = {
    "3000억 페스타": "기미앰플40",
    "기미 앰플 쿠션 세트 1+1": "쿠션세트",
    "기미백설크림": "화이트토닝",
    "EGF 기미 집중 패치": "집중패치",
}

ROW_RE = re.compile(
    r'<tr style="background-color:#FFFFFF; color:#555555;" class="xans-record-">(.*?)</tr>',
    re.S,
)
PRODUCT_RE = re.compile(r"<span>([^<]+)</span></a>")
TITLE_RE = re.compile(r'href="(/article/[^"]+)"[^>]*>([^<]+)</a>')
DATE_RE = re.compile(r'<span class="txtNum">(\d{4}-\d{2}-\d{2}[^<]*)</span>')
STAR_RE = re.compile(r"star(\d)\.png")
BODY_RE = re.compile(r'"articleBody":\s*"((?:[^"\\]|\\.)*)"')


def fetch(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    safe_url = urllib.parse.urlunsplit(
        (parts.scheme, parts.netloc, urllib.parse.quote(parts.path), parts.query, parts.fragment)
    )
    req = urllib.request.Request(safe_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def crawl_list(max_pages: int) -> list[dict]:
    rows_all = []
    for page in range(1, max_pages + 1):
        html = fetch(f"{BOARD_URL}&page={page}")
        rows = ROW_RE.findall(html)
        if not rows:
            break
        for row in rows:
            prod_m = PRODUCT_RE.search(row)
            title_m = TITLE_RE.search(row)
            date_m = DATE_RE.search(row)
            star_m = STAR_RE.search(row)
            if prod_m and title_m:
                rows_all.append(
                    {
                        "product": prod_m.group(1).strip(),
                        "url": "https://easydew.co.kr" + title_m.group(1),
                        "date": date_m.group(1) if date_m else None,
                        "star": int(star_m.group(1)) if star_m else None,
                    }
                )
        time.sleep(REQUEST_DELAY_SEC)
    return rows_all


def fetch_review_body(url: str) -> str | None:
    html = fetch(url)
    m = BODY_RE.search(html)
    if not m:
        return None
    return json.loads('"' + m.group(1) + '"')


def main():
    import os

    os.makedirs(OUT_DIR, exist_ok=True)

    rows_all = crawl_list(MAX_LIST_PAGES)
    print(f"목록에서 {len(rows_all)}건의 리뷰 행 수집 (페이지 최대 {MAX_LIST_PAGES}개)")

    results = {slug: [] for slug in TARGET_PRODUCTS.values()}
    seen = set()
    for row in rows_all:
        for keyword, slug in TARGET_PRODUCTS.items():
            if keyword in row["product"] and row["url"] not in seen:
                seen.add(row["url"])
                body = fetch_review_body(row["url"])
                results[slug].append({**row, "body": body})
                time.sleep(REQUEST_DELAY_SEC)
                break

    for slug, items in results.items():
        path = os.path.join(OUT_DIR, f"{slug}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
        stars = [i["star"] for i in items if i["star"] is not None]
        avg = round(sum(stars) / len(stars), 2) if stars else None
        print(f"{slug}: {len(items)}건 저장 (평균 {avg}★) -> {path}")


if __name__ == "__main__":
    main()
