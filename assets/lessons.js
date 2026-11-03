// 講義清單：全站唯一資料來源。新增講義時，依編號順序在此新增一筆。
// 網站設定：GitHub repo 連結
window.SITE = { repo: "https://github.com/uniyeh/algo-notes" };

// level: 1 = 入門, 2 = 進階, 3 = 挑戰
window.LESSONS = [
  {
    id: "01-binary-search",
    wiki: "binary-search",
    title: "二分搜尋",
    category: "基礎技巧",
    level: 1,
    summary: "在單調性上每次砍半，把 O(n) 變成 O(log n)。",
    tags: ["搜尋", "對答案二分"]
  },
  {
    id: "02-prefix-sum",
    wiki: "prefix-sum",
    title: "前綴和與差分",
    category: "基礎技巧",
    level: 1,
    summary: "預處理一次，區間和查詢 O(1)；差分讓區間加值 O(1)。",
    tags: ["陣列", "區間查詢"]
  },
  {
    id: "03-bfs",
    wiki: "bfs",
    title: "廣度優先搜尋 BFS",
    category: "圖論",
    level: 2,
    summary: "用佇列一層一層擴散，求無權圖最短路。",
    tags: ["圖", "最短路", "佇列"]
  }
];
