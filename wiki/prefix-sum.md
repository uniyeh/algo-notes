---
title: 前綴和與差分 Prefix Sum
type: algorithm
tags: [陣列, 區間查詢]
related: [complexity]
lesson: 02-prefix-sum
sources: [raw/references.md]
updated: 2026-11-03
---

# 前綴和與差分 Prefix Sum

**一句話**：預處理 `pre[i] = a[1..i]` 的和，任意區間和變成兩數相減。

## 何時使用（題目特徵）
- 陣列不變，多次詢問區間和 → 前綴和
- 多次「區間全部加 v」，最後才查詢 → 差分
- 子陣列和等於 k → 前綴和 + 雜湊表

## 核心公式
- 一維：`sum(l, r) = pre[r] - pre[l-1]`，`pre[0] = 0`
- 二維：`S = p[x2][y2] - p[x1-1][y2] - p[x2][y1-1] + p[x1-1][y1-1]`
- 差分：`d[l] += v; d[r+1] -= v`，最後做前綴和還原

## 複雜度
- 預處理 O(n)，查詢 O(1)，見 [[complexity]]。

## 易錯點
- 總和超過 int → 用 `long long`
- 0/1-indexed 混用造成差一
- 差分陣列要開 n + 2
