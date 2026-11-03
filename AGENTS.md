# AGENTS.md

本專案的完整 AI 協作規則寫在 [`CLAUDE.md`](./CLAUDE.md)，所有 AI 代理（Codex、Cursor、Copilot、Claude 等）請以該文件為準。

快速摘要：
- 純靜態像素風（僅暗色）網站，吉祥物是像素海豹「噗噗」，部署於 GitHub Pages。
- 知識流：`raw/`（原始資料）→ `wiki/`（LLM Wiki，AI 維護）→ `lessons/`（講義）。
- 新增講義 = 先有 wiki 頁 → 複製 `lessons/_template.html` 填 8 個固定段落 → 在 `assets/lessons.js` 登記 → 用 `tools/make_tests.py` 建練習題。
- 經驗值：每題 AC +10 XP，每 100 XP 升一級，從 LV 1 開始。
- 常用指令：「收錄 raw/xxx」（Ingest）、「新增 05 雙指針講義」、「健檢 wiki」（Lint）。
