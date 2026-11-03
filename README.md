# 演算法講義（Algo Notes）

像素遊戲風格的競程 C++ 講義網站。重點不是單一網頁，而是一套**可重複擴充的規則**：AI 讀完 [`CLAUDE.md`](./CLAUDE.md) 後，就能用同一套方式擴充知識庫、講義與練習題。

- 線上瀏覽：https://uniyeh.github.io/algo-notes/
- 吉祥物：像素海豹「噗噗」

## 特色

- **LLM Wiki 知識庫**：`raw/`（原始資料）→ `wiki/`（AI 整理的互連知識頁）→ `lessons/`（講義）。
- **8 段固定格式講義**：學習目標、核心觀念、範例演示、程式碼、複雜度、常見錯誤、練習題、重點回顧。
- **線上判題 + 經驗值**：在網頁寫 C++ 提交，透過 Compiler Explorer 真的編譯執行；全部 AC 得 10 XP，每 100 XP 升一級。

## 用 AI 擴充

| 想做的事 | 對 AI 說 |
|---|---|
| 研究新演算法並收進知識庫 | 「依照 CLAUDE.md，研究 DFS 並收錄到 wiki」 |
| 從 wiki 產生講義與練習題 | 「依照 CLAUDE.md，新增 04 DFS 講義與練習題」 |
| 檢查知識庫 | 「依照 CLAUDE.md 健檢 wiki」 |

## 本機預覽

```bash
python3 -m http.server 8000
```

## 部署

推到 `main` 分支後，`.github/workflows/pages.yml` 會自動部署到 GitHub Pages（Settings → Pages → Source 選 GitHub Actions）。

判題服務由 [Compiler Explorer](https://godbolt.org) 提供。
