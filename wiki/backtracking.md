---
title: 回溯 Backtracking
type: algorithm
tags: [排列, 組合, 剪枝]
related: [binary-tree, complexity]
lesson: 11-backtracking
sources: [raw/references.md]
updated: 2026-11-03
---

# 回溯 Backtracking

**一句話**：在決策樹上做 DFS，走到底記錄答案，回來時撤銷選擇。

## 何時使用（題目特徵）
- 列出所有排列、組合、子集
- N 皇后、數獨等約束搜尋
- n 很小（通常 ≤ 10~20）

## 核心模板
1. 終止：路徑長度達標 → 記錄
2. 枚舉選擇 → `push` → 遞迴 → `pop`
3. 剪枝：提早排除不可能的分支

## 複雜度
- 指數級，見 [[complexity]] 的 n ≤ 20 列

## 易錯點
- 忘記撤銷
- 組合沒用 `start` 造成重複
