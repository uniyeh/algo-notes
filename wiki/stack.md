---
title: 堆疊 Stack
type: data-structure
tags: [stack, LIFO]
related: [queue, monotonic-stack]
lesson: 09-stack-queue
sources: [raw/references.md]
updated: 2026-11-03
---

# 堆疊 Stack

**一句話**：後進先出（LIFO），處理「最近的、還沒配對的東西」。

## 何時使用（題目特徵）
- 括號匹配、運算式求值（逆波蘭）
- 撤銷操作、DFS 的迭代寫法
- 下一個更大元素 → [[monotonic-stack]]

## 常用操作
- `push`、`top`、`pop`、`empty`，皆 O(1)
- 兩端都要用 → `deque`；先進先出 → [[queue]]

## 易錯點
- 空堆疊呼叫 `top()`
- 運算元彈出順序
