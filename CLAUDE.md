# CLAUDE.md — 演算法講義（Algo Notes）

> 給 AI 的專案說明書。新增或修改任何內容前，**先完整讀完這份文件**，並嚴格依照規則操作。
> `AGENTS.md` 只是指向本文件的入口；所有規則以本文件為準。

## 1. 專案目的

- 一個以**競程（Competitive Programming）C++ 演算法**為主題、**像素遊戲風格**的講義網站。
- 讀者：學過基本 C++、準備 APCS / ICPC / LeetCode 的學生。
- 三個部分：
  1. **知識庫（LLM Wiki）**：AI 從原始資料整理出的演算法知識網，頁面互相連結。
  2. **講義（關卡）**：從 wiki 產生的教學頁，「讀完就會寫」。
  3. **線上挑戰（經驗值系統）**：每篇講義至少一題，提交程式全部 AC 就獲得經驗值。
- 部署：GitHub Pages，**純靜態**（HTML + CSS + 原生 JS），不使用建置工具或框架。

## 2. 檔案結構

```
algo-notes/
├── CLAUDE.md / AGENTS.md     # AI 規則（本文件）／入口
├── README.md                 # 給人看的說明
├── index.html                # 首頁：13 章可折疊刷題總目錄（由 lessons.js 產生）
├── wiki.html                 # 知識庫檢視器：wiki.html?p=<slug>
├── raw/                      # ① 原始資料（人提供，AI 唯讀）
├── wiki/                     # ② LLM Wiki（AI 撰寫與維護的 Markdown）
│   ├── index.md              #    目錄：所有頁面 + 一行摘要 + backlog
│   ├── log.md                #    更新紀錄（只新增、不修改）
│   └── <slug>.md             #    各頁面
├── lessons/                  # ③ 講義頁
│   ├── _template.html        #    新講義範本，永遠從這裡複製
│   └── NN-slug.html
├── assets/
│   ├── style.css             # 全站唯一樣式表（像素暗色主題）
│   ├── lessons.js            # 章節 CHAPTERS + 講義清單 LESSONS（唯一資料來源）
│   ├── problems.js           # 練習題資料與測資雜湊
│   ├── main.js               # 側欄、經驗值、吉祥物、目錄、上下篇
│   └── judge.js              # 線上判題（Compiler Explorer）
├── tools/
│   ├── make_tests.py         # 產生測資雜湊
│   ├── solutions/<id>.cpp    # 每題的標準解
│   └── tests/<id>/N.in       # 每題的測資輸入（1.in 為範例）
└── .github/workflows/pages.yml  # 自動部署
```

## 3. 命名規則

| 東西 | 規則 | 例子 |
|---|---|---|
| 講義檔 | `lessons/NN-slug.html`，NN 是兩位數**唯一流水號**（用下一個未使用的號碼），不代表閱讀順序 | `15-dfs.html` |
| 講義 id | 檔名去掉 `.html` | `04-dfs` |
| 練習題 id | 第一題 = 講義 id，第二題起加 `-2`、`-3` | `04-dfs`、`04-dfs-2` |
| wiki 頁 | `wiki/<slug>.md`，英文小寫 kebab-case，**不加編號** | `wiki/dfs.md` |
| raw 檔 | `raw/YYYY-MM-DD-主題.md` | `raw/2026-11-03-dfs-notes.md` |

## 3.5 章節架構（刷題總目錄）

內容依以下 13 章組織，順序固定，定義在 `assets/lessons.js` 的 `CHAPTERS`：

| CH | 章節 | 代表主題（已完成 / 可擴充） |
|---|---|---|
| 01 | 前序 | 複雜度、C++ 競程模板 / STL 速查 |
| 02 | 陣列 | 二分搜尋、前綴和與差分 / 螺旋矩陣 |
| 03 | 鏈結串列 | 反轉、陣列模擬 / 找環、合併 |
| 04 | 雜湊表 | Two Sum、次數統計 / 四數相加 |
| 05 | 字串 | KMP / 反轉、Z 函數 |
| 06 | 雙指針 | 夾逼、滑動視窗 / 三數之和 |
| 07 | 堆疊與佇列 | 括號、逆波蘭、deque / 優先佇列 |
| 08 | 二元樹 | 走訪、高度 / BST、LCA |
| 09 | 回溯 | 排列、組合 / 子集、N 皇后 |
| 10 | 貪婪 | 區間排程、跳躍 / 加油站 |
| 11 | 動態規劃 | 爬樓梯、0/1 背包 / 完全背包、LIS、LCS |
| 12 | 單調堆疊 | 下一個更大 / 最大矩形、接雨水 |
| 13 | 圖論 | BFS / DFS、並查集、Dijkstra |

- **閱讀順序 = `LESSONS` 陣列順序**：新講義插在所屬章節最後一篇之後，首頁、側欄、上一篇／下一篇都會跟著這個順序。
- 頁面上顯示的 STAGE 編號是閱讀順序，自動計算，與檔名 NN 無關。
- 不新增、刪除或重新排序章節，除非使用者明確要求。

## 4. 視覺風格（像素冰原主題）

- **只有暗色模式**，不提供亮色。
- 風格：8-bit 像素遊戲 × 程式。直角、粗邊框（`--px`）、硬陰影（`--shadow`），**不使用圓角與漸層**。
- 色彩、字型、間距**只能**用 `assets/style.css` `:root` 的變數；不要寫 inline style 或新增色碼。

| 變數 | 用途 |
|---|---|
| `--accent` 冰藍 | 主色、連結、標題符號 |
| `--accent2` 粉紅 | 分類標題、挑戰區框線 |
| `--xp` 綠 | 經驗條、AC、`callout tip` |
| `--gold` 金 | 等級、獎勵、粗體重點 |
| `--warn` / `--err` | 警告、錯誤判定 |

- 字型：`--pixel`（DotGothic16，標題與 UI）、`--arcade`（Press Start 2P，英數標籤如 LV / STAGE）、`--font`（Noto Sans TC，內文）、`--mono`（程式碼）。
- 吉祥物：**海豹寶寶「噗噗」**——白色豎琴海豹幼崽，側躺橫向（頭朝左、臉朝前），大眼睛、粉紅臉頰、圓滾身體；36×16 像素圖定義在 `main.js` 的 `SEAL`。不要改成其他動物或使用外部圖片；可在文案中以噗噗的口吻出現（例如題目情境）。
- 版面：左側玩家欄（固定），中間閱讀區最寬 `760px`，右側自動目錄；900px 以下側欄移到上方，手機不得出現水平捲動。

## 5. 經驗值系統

- 每題通過（所有測資 AC）獲得 `xp`（預設 **10**），同一題只算一次。
- 每 **100 XP 升一級**，等級從 **LV 1** 開始：`level = floor(xp / 100) + 1`。
- 稱號：LV1–2 冰原新手、LV3–4 冰原探險家、LV5–9 浮冰獵人、LV10+ 北極海傳說。
- 進度存在瀏覽器 `localStorage`（key：`algo-notes-progress-v1`），不需要帳號。
- 講義的所有題目都通過 → 側欄 QUESTS 該關卡顯示 ★、首頁卡片顯示 CLEAR。
- 側欄 QUESTS 與首頁一樣依 13 章分組、可折疊，顯示各章通關數；目前講義所在章節自動展開。
- 不要修改經驗值公式或 localStorage key（會讓使用者進度歸零）。

## 6. 線上判題

- `judge.js` 把程式碼送到 **Compiler Explorer API**（`godbolt.org`，x86-64 gcc 13.2，`-O2 -std=c++17`）編譯執行。
- 輸出先 `normalize()`（去掉每行行尾空白與結尾空行），再做 SHA-256 與 `problems.js` 的 `hash` 比對。
- 判定：`AC` 正確、`WA` 答案錯、`CE` 編譯錯、`RE` 執行錯、`TLE` 超時、`ERR` 連線失敗。遇到第一個非 AC 就停止。
- 限制：每筆測資都會呼叫一次外部 API，**每題測資 3–6 筆、輸入總量 < 20 KB**，避免拖慢或被限流。
- `normalize()` 在 `judge.js` 與 `tools/make_tests.py` 必須完全一致。

## 7. 新增一篇講義（完整流程）

1. **先有 wiki**：確認 `wiki/<slug>.md` 已存在；沒有就先做 §10 的 Ingest。
2. 複製 `lessons/_template.html` → `lessons/NN-slug.html`，改 `<title>`、`data-lesson`、`data-problem`。
3. 依 §8 填寫 8 個固定段落，內容以 wiki 頁為依據並延伸成教學。
4. 在 `assets/lessons.js` 的 `LESSONS` 中，插在**所屬章節的最後一篇之後**（`category` 必須是 `CHAPTERS` 之一）：
   ```js
   { id: "NN-slug", wiki: "slug", title: "標題", category: "章節名稱", level: 1~3, summary: "30 字內摘要", tags: ["標籤"] }
   ```
5. 依 §9 建立練習題。
6. 更新 wiki：頁面 frontmatter 加 `lesson: NN-slug`、在 `wiki/index.md` 對應章節下列出並標註講義編號、`wiki/log.md` 新增紀錄。
7. 不需要手動改 `index.html`、側欄或其他講義——都由 JS 自動產生。

## 8. 講義內容格式（固定段落與順序）

`<article class="lesson">` 內依序包含以下 `<h2>`，文字固定、不可改名或調換：

| 段落 | 內容要求 |
|---|---|
| `學習目標` | 3–4 點 `<ul>`，動詞開頭 |
| `核心觀念` | 白話解釋；一句關鍵放 `<div class="callout">` |
| `範例演示` | 小輸入逐步追蹤（表格，關鍵格用 `td.hl`） |
| `程式碼` | C++17 完整模板 `<pre><code class="language-cpp">` |
| `複雜度` | `<table class="complexity">` |
| `常見錯誤` | 2–4 點，包在 `<div class="callout warn">` |
| `練習題` | 一句引導 + `<div class="judge" data-problem="id">` + `<h3>延伸練習</h3>` 外部題目清單 `<ul class="problems">` |
| `重點回顧` | 3 點以內 `<div class="callout tip">` |

- 專有名詞第一次出現附英文；不引入 MathJax，數學用純文字或 `<var>`。
- 難度標籤：`badge easy` 簡單、`badge medium` 中等、`badge hard` 困難。

## 9. 新增練習題

1. 撰寫標準解 `tools/solutions/<id>.cpp`。
2. 在 `tools/tests/<id>/` 放 `1.in`（範例，會公開顯示）到 `N.in`，至少涵蓋：範例、邊界（n = 1、無解）、溢位、隨機中型資料。
3. 執行 `python3 tools/make_tests.py <id>`，把印出的 `sample` 與 `tests` 貼進 `assets/problems.js`：
   ```js
   "<id>": {
     title: "題目名稱", xp: 10,
     statement: "題目敘述（可用 <code>、<strong>）",
     input: "輸入格式", output: "輸出格式",
     sample: { ... }, tests: [ ... ]   // 由 make_tests.py 產生，不可手改
   }
   ```
4. 題目情境盡量融入噗噗與冰原世界觀。
5. 自我檢查：用標準解在網頁提交應全部 AC；刻意寫錯應得到 WA。

## 10. LLM Wiki（知識庫）

採三層結構：**raw（原始資料）→ wiki（AI 維護的知識頁）→ lessons（講義）**。人負責提供資料與提問，AI 負責整理、連結、維護。

### 三種操作

**Ingest（收錄）**——當使用者說「收錄 raw/xxx」或「幫我研究 ○○ 演算法」：
1. 讀 `raw/` 的新資料；若是研究新主題，優先查證 `raw/references.md` 列出的來源，並把查到的重點與連結先寫成 `raw/YYYY-MM-DD-主題.md`。
2. 建立或更新相關 wiki 頁（一次收錄通常會動到 3–6 頁：演算法本身 + 用到的概念 / 資料結構）。
3. 補上 `[[雙括號連結]]`，更新 `wiki/index.md`，在 `wiki/log.md` 最上方新增紀錄。

**Query（查詢）**——回答演算法問題時先讀 `wiki/index.md` 找相關頁面，答案引用 wiki 頁；若產生了有價值的新整理，詢問是否存成新 wiki 頁。

**Lint（健檢）**——定期檢查：連到不存在頁面的 `[[連結]]`、沒有被任何頁面連到的孤兒頁、內容互相矛盾、`index.md` 漏列、backlog 中可以開始寫的主題。

### wiki 頁格式

```markdown
---
title: 中文名稱 English Name
type: algorithm | concept | data-structure
tags: [標籤]
related: [其他 slug]
lesson: NN-slug          # 有對應講義才寫
sources: [raw/檔名.md]
updated: YYYY-MM-DD
---

# 中文名稱 English Name

**一句話**：……

## 何時使用（題目特徵）   ← algorithm 必備
## 核心步驟 / 核心公式
## 複雜度
## 易錯點
```

- 頁面要短（約 30–60 行），細節留給講義；用 `[[slug]]` 或 `[[slug|顯示文字]]` 連到其他頁。
- 只整理觀念並註明來源，**不整段複製**外部文章。
- `raw/` 內的檔案 AI 只讀不改；`wiki/log.md` 只新增不修改。

## 11. 程式碼規範

- **C++17**，開頭固定 `#include <bits/stdc++.h>` 與 `using namespace std;`。
- 命名依競程習慣（`n`, `m`, `adj`, `dist`, `lo`, `hi`）；可能溢位時用 `long long` 並註解原因。
- 註解用**繁體中文**，只解釋「為什麼」。
- 所有程式碼必須能以 `g++ -std=c++17 -O2` 編譯。

## 12. 文字風格

- **繁體中文（台灣用語）**：程式、陣列、迴圈、遞迴、佇列。
- 語氣像學長姐上課：簡潔、口語但精確；遊戲感的用詞（關卡、通關、經驗值）只用在 UI 與挑戰區，講義內文保持清楚的教學語氣。

## 13. AI 修改規則

- ✅ 新增講義／題目／wiki 頁：照 §7、§9、§10 流程。
- ✅ 修正錯字或程式錯誤：直接改。
- ⚠️ 修改 `style.css` / `main.js` / `judge.js`：只能新增元件或修 bug，不能改變既有 class 的外觀、經驗值公式或判題邏輯。
- ❌ 不引入框架、建置工具或其他 CDN 函式庫（例外：highlight.js、marked）。
- ❌ 不刪除或重新編號既有講義與題目（會破壞連結與使用者進度）。
- ❌ 不把正確答案以明文放進網頁（範例除外），只存雜湊。

完成後自我檢查：

1. 首頁出現新關卡卡片，側欄 QUESTS 出現新項目。
2. 講義 8 個段落都在，目錄、上下篇正常。
3. 標準解提交全部 AC。
4. wiki 頁存在、雙向連結正確、`index.md` 與 `log.md` 已更新。
5. 手機寬度（390px）沒有水平捲動。

## 14. 本機預覽與部署

```bash
python3 -m http.server 8000   # 開 http://localhost:8000（wiki 需要用 server 開，不能直接雙擊 html）
```

推到 `main` 後由 `.github/workflows/pages.yml` 自動部署到 https://uniyeh.github.io/algo-notes/。
