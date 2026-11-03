---
title: KMP 字串匹配
type: algorithm
tags: [字串, 前綴函數]
related: [complexity]
lesson: 07-kmp
sources: [raw/references.md]
updated: 2026-11-03
---

# KMP 字串匹配

**一句話**：失配時用前綴函數決定模式能保留多少，文字指標永不後退。

## 何時使用（題目特徵）
- 在長字串中找模式的所有出現位置
- 判斷字串是否由重複子字串組成
- 字串週期問題

## 核心步驟
1. 前綴函數 `f[i]`：`p[0..i]` 最長相同前後綴長度。
2. 失配：`while (j > 0 && t[i] != p[j]) j = f[j-1]`。
3. 匹配完整：記錄位置，`j = f[j-1]` 繼續。

## 複雜度
- O(n + m)，見 [[complexity]]

## 易錯點
- `while` 寫成 `if`
- 找到後沒更新 `j`
