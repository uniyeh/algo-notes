# CLAUDE.md — 演算法講義（Algo Notes）

> 給 AI 的專案說明書。新增或修改任何內容前，**先完整讀完這份文件**，並嚴格依照規則操作。

## 1. 專案目的

- 一個以**競程（Competitive Programming）C++ 演算法**為主題的講義網站。
- 讀者：學過基本 C++、準備 APCS / ICPC / LeetCode 的學生。
- 目標：每一篇講義都能「讀完就會寫」——觀念 → 範例 → 程式碼 → 複雜度 → 常見錯誤 → 練習題。
- 部署：GitHub Pages，**純靜態**（HTML + CSS + 原生 JS），不使用任何建置工具或框架。

## 2. 檔案結構

```
algo-notes/
├── CLAUDE.md            # 本文件（AI 規則）
├── AGENTS.md            # 指向本文件，給其他 AI 代理
├── README.md            # 給人看的說明與部署方式
├── index.html           # 首頁：自動依 lessons.js 產生講義卡片
├── .nojekyll            # 讓 GitHub Pages 不經過 Jekyll
├── assets/
│   ├── style.css        # 全站唯一樣式表
│   ├── lessons.js       # 講義清單（唯一資料來源）
│   └── main.js          # 共用行為：導覽列、目錄、上下篇、複製按鈕
└── lessons/
    ├── _template.html   # 新講義的範本，永遠從這裡複製
    └── NN-slug.html     # 各篇講義
```

## 3. 命名規則

- 講義檔名：`lessons/NN-slug.html`
  - `NN`：兩位數流水號（`01`、`02`…），代表建議閱讀順序，**不可重複、不可跳號**。
  - `slug`：英文小寫 + 連字號（kebab-case），例如 `binary-search`、`prefix-sum`。
- 講義 `id` = 檔名去掉 `.html`，例如 `03-bfs`。
- 圖片（若有）放 `assets/img/<id>/`，檔名小寫 kebab-case。

## 4. 新增一篇講義的流程（必須全部完成）

1. 複製 `lessons/_template.html` → `lessons/NN-slug.html`。
2. 修改 `<title>` 為 `講義標題 | 演算法講義`。
3. 將 `<body data-lesson="...">` 改為新的 `id`。
4. 依「第 5 節」的固定段落填寫內容。
5. 在 `assets/lessons.js` 的 `LESSONS` 陣列**依編號順序**新增一筆：
   ```js
   { id: "NN-slug", title: "標題", category: "分類", level: 1~3, summary: "一句話摘要（30 字內）", tags: ["標籤"] }
   ```
6. **不需要**手動修改 `index.html` 或其他講義——首頁卡片、上一篇／下一篇、導覽列都由 `main.js` 依 `lessons.js` 自動產生。

## 5. 講義內容格式（固定段落與順序）

每篇講義的 `<article class="lesson">` 內，依序包含以下 `<h2>`，標題文字固定、不可改名或調換順序：

| 段落 | 內容要求 |
|---|---|
| `學習目標` | 3–4 點 `<ul>`，以動詞開頭（「理解…」「能寫出…」） |
| `核心觀念` | 用白話解釋；可用 `<div class="callout">` 強調關鍵一句 |
| `範例演示` | 一個小輸入，逐步追蹤演算法過程（表格或步驟清單） |
| `程式碼` | C++17 完整可編譯模板，`<pre><code class="language-cpp">` |
| `複雜度` | 使用 `<table class="complexity">`，列出時間與空間 |
| `常見錯誤` | 2–4 點，用 `<div class="callout warn">` 包住 |
| `練習題` | `<ul class="problems">`，每題附難度標籤與連結 |
| `重點回顧` | 3 點以內的總結 `<div class="callout tip">` |

其他元件：
- 行內程式碼用 `<code>`；數學式用純文字或 `<var>`（如 `O(n log n)`），**不引入 MathJax**。
- 難度標籤：`<span class="badge easy">簡單</span>`、`badge medium`、`badge hard`。
- `level`（lessons.js）：1 = 入門、2 = 進階、3 = 挑戰。

## 6. 程式碼規範

- 語言 **C++17**，開頭固定：
  ```cpp
  #include <bits/stdc++.h>
  using namespace std;
  ```
- 變數命名與競程習慣一致（`n`, `m`, `adj`, `dist`, `lo`, `hi`）。
- 需要大數時使用 `long long`，並在註解說明原因。
- 註解用**繁體中文**，只解釋「為什麼」，不逐行翻譯程式。
- 每段程式碼都必須能直接編譯通過（`g++ -std=c++17 -O2`）。

## 7. 視覺風格

- 色彩、字型、間距**只能**使用 `assets/style.css` 中 `:root` 的 CSS 變數；不要在 HTML 寫 inline style 或新增顏色。
- 主色：靛藍 `--accent`；警告：琥珀 `--warn`；提示：綠 `--tip`。
- 字型：Noto Sans TC（內文）、JetBrains Mono（程式碼）。
- 必須同時支援亮色與暗色模式（已由 CSS 變數處理，新元件也要用變數）。
- 版面：單欄閱讀寬度最多 `760px`，桌面版右側顯示自動目錄；手機寬度不得出現水平捲動。

## 8. 文字風格

- 全站使用**繁體中文（台灣用語）**：「程式」「陣列」「迴圈」「遞迴」，不用「程序」「数组」。
- 演算法專有名詞第一次出現時附英文，如「前綴和（Prefix Sum）」。
- 語氣：像學長姐上課，簡潔、口語但精確；避免冗長的開場白。

## 9. AI 修改規則

- ✅ 新增講義：照第 4 節流程，且只動 `lessons/NN-slug.html` 與 `assets/lessons.js`。
- ✅ 修正錯字或程式錯誤：直接改，不需更動結構。
- ⚠️ 修改 `style.css` / `main.js`：只能「新增」元件，不能改掉既有 class 的外觀或行為，避免影響所有講義。
- ❌ 不要引入框架（React、Vue）、建置工具（npm、Vite）或額外的 CDN 函式庫（highlight.js 除外）。
- ❌ 不要刪除或重新編號既有講義（會破壞外部連結）。
- 完成後自我檢查：
  1. 首頁出現新卡片且連結正確。
  2. 新講義的上一篇／下一篇正確。
  3. 8 個固定段落都在，目錄正常產生。
  4. 程式碼可編譯。

## 10. 本機預覽

```bash
python3 -m http.server 8000
# 開啟 http://localhost:8000
```
