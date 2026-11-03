# 演算法講義（Algo Notes）

以競程 C++ 為主題的講義網站。重點不是單一網頁，而是一套**可重複擴充的規則**：AI 讀完 [`CLAUDE.md`](./CLAUDE.md) 後，就能用同一套格式快速新增講義。

- 線上瀏覽：`https://USERNAME.github.io/algo-notes/`
- 目前講義：二分搜尋、前綴和與差分、BFS

## 專案結構

| 路徑 | 用途 |
|---|---|
| `CLAUDE.md` / `AGENTS.md` | AI 協作規則（目的、風格、結構、格式、命名、修改規則） |
| `index.html` | 首頁，卡片由 `assets/lessons.js` 自動產生 |
| `assets/lessons.js` | 講義清單（唯一資料來源） |
| `assets/main.js` | 導覽列、目錄、上下篇、複製按鈕 |
| `assets/style.css` | 全站樣式（亮/暗色） |
| `lessons/_template.html` | 新講義範本 |

## 用 AI 新增一篇講義

對 Claude Code / Codex 說：

> 依照 CLAUDE.md，新增一篇「04 深度優先搜尋 DFS」講義。

AI 會複製範本、填寫 8 個固定段落，並在 `lessons.js` 登記，首頁與上下篇連結自動更新。

## 本機預覽

```bash
python3 -m http.server 8000
```

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "init: algo notes with CLAUDE.md"
git branch -M main
git remote add origin https://github.com/USERNAME/algo-notes.git
git push -u origin main
```

到 GitHub repo → **Settings → Pages** → Source 選 `Deploy from a branch`，Branch 選 `main` / `(root)` → Save。約 1 分鐘後即可瀏覽。
# algo-notes
