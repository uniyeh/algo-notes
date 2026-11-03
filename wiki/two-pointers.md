---
title: 雙指針 Two Pointers
type: algorithm
tags: [滑動視窗, 夾逼]
related: [hash-table, linked-list, monotonicity]
lesson: 08-two-pointers
sources: [raw/references.md]
updated: 2026-11-03
---

# 雙指針 Two Pointers

**一句話**：兩個指針各自只往一個方向走，總移動 O(n)。

## 何時使用（題目特徵）
- 排序陣列找兩數／三數之和 → 左右夾逼
- 「最短／最長的連續子陣列滿足…」→ 滑動視窗
- 原地刪除元素、找環 → 快慢指針（見 [[linked-list]]）

## 核心模板
- 夾逼：和太小 `l++`，太大 `r--`
- 視窗：`r` 擴張，不合法就縮 `l`

## 前提
- 滑動視窗需要 [[monotonicity]]：例如元素皆為正時，視窗越長和越大

## 易錯點
- 有負數時視窗求和不成立 → 改用前綴和
- 未排序就夾逼
