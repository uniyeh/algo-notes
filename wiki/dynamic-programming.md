---
title: 動態規劃 Dynamic Programming
type: algorithm
tags: [DP, 背包]
related: [greedy, complexity]
lesson: 13-dp-knapsack
sources: [raw/references.md]
updated: 2026-11-03
---

# 動態規劃 Dynamic Programming

**一句話**：把問題拆成重疊子問題，記住答案避免重算。

## 何時使用（題目特徵）
- 求最大／最小／方法數，且有「最優子結構」
- 貪婪會失敗的選擇題（見 [[greedy]]）
- 背包、最長子序列、路徑計數

## 五步驟
1. 定義狀態 `dp[i]` 的意義
2. 轉移式
3. 初始值
4. 計算順序
5. 答案在哪

## 0/1 背包
- `dp[c] = max(dp[c], dp[c-w] + v)`，容量**倒著**枚舉

## 易錯點
- 一維背包正著枚舉 → 變成完全背包
- 初始值錯
