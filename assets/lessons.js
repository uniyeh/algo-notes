// 講義清單：全站唯一資料來源。
// - CHAPTERS 決定章節順序；LESSONS 的陣列順序 = 閱讀順序（上一篇／下一篇）。
// - id 的編號 NN 只是唯一流水號，新講義一律用下一個未使用的號碼，再放到所屬章節的位置。
window.SITE = { repo: "https://github.com/uniyeh/algo-notes" };

window.CHAPTERS = [
  "前序", "陣列", "鏈結串列", "雜湊表", "字串", "雙指針", "堆疊與佇列",
  "二元樹", "回溯", "貪婪", "動態規劃", "單調堆疊", "圖論"
];

// level: 1 = 入門, 2 = 進階, 3 = 挑戰
window.LESSONS = [
  { id: "04-cpp-basics", wiki: "complexity", title: "複雜度與 C++ 競程基礎", category: "前序", level: 1,
    summary: "先看資料範圍反推複雜度，寫出不溢位、不超時的模板。", tags: ["複雜度", "STL"] },
  { id: "01-binary-search", wiki: "binary-search", title: "二分搜尋", category: "陣列", level: 1,
    summary: "在單調性上每次砍半，把 O(n) 變成 O(log n)。", tags: ["搜尋", "對答案二分"] },
  { id: "02-prefix-sum", wiki: "prefix-sum", title: "前綴和與差分", category: "陣列", level: 1,
    summary: "預處理一次，區間和查詢 O(1)；差分讓區間加值 O(1)。", tags: ["陣列", "區間查詢"] },
  { id: "05-linked-list", wiki: "linked-list", title: "鏈結串列", category: "鏈結串列", level: 1,
    summary: "改指標就能 O(1) 插入刪除；競程用陣列模擬。", tags: ["指標", "模擬"] },
  { id: "06-hash-table", wiki: "hash-table", title: "雜湊表", category: "雜湊表", level: 1,
    summary: "平均 O(1) 回答「出現過嗎、幾次」，Two Sum 的關鍵。", tags: ["unordered_map", "配對"] },
  { id: "07-kmp", wiki: "kmp", title: "字串匹配 KMP", category: "字串", level: 3,
    summary: "失配時用前綴函數跳轉，O(n + m) 找出所有出現位置。", tags: ["字串", "前綴函數"] },
  { id: "08-two-pointers", wiki: "two-pointers", title: "雙指針", category: "雙指針", level: 2,
    summary: "左右夾逼與滑動視窗，把 O(n²) 降到 O(n)。", tags: ["滑動視窗", "夾逼"] },
  { id: "09-stack-queue", wiki: "stack", title: "堆疊與佇列", category: "堆疊與佇列", level: 1,
    summary: "LIFO 與 FIFO：括號匹配、運算式、滑動視窗最大值。", tags: ["stack", "deque"] },
  { id: "10-binary-tree", wiki: "binary-tree", title: "二元樹走訪", category: "二元樹", level: 2,
    summary: "前中後序遞迴、層序 BFS，樹題就是定義好遞迴回傳值。", tags: ["遞迴", "走訪"] },
  { id: "11-backtracking", wiki: "backtracking", title: "回溯", category: "回溯", level: 2,
    summary: "在決策樹上 DFS：做選擇、遞迴、撤銷選擇。", tags: ["排列", "組合", "剪枝"] },
  { id: "12-greedy", wiki: "greedy", title: "貪婪", category: "貪婪", level: 2,
    summary: "每步選當下最好的；區間排程按結束時間排序。", tags: ["排序", "區間"] },
  { id: "13-dp-knapsack", wiki: "dynamic-programming", title: "動態規劃與背包", category: "動態規劃", level: 3,
    summary: "定義狀態與轉移，0/1 背包的二維與一維寫法。", tags: ["DP", "背包"] },
  { id: "14-monotonic-stack", wiki: "monotonic-stack", title: "單調堆疊", category: "單調堆疊", level: 2,
    summary: "O(n) 找每個元素的下一個更大／更小。", tags: ["stack", "下一個更大"] },
  { id: "03-bfs", wiki: "bfs", title: "廣度優先搜尋 BFS", category: "圖論", level: 2,
    summary: "用佇列一層一層擴散，求無權圖最短路。", tags: ["圖", "最短路", "佇列"] }
];
