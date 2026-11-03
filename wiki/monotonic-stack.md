---
title: 單調堆疊 Monotonic Stack
type: algorithm
tags: [stack, 下一個更大]
related: [stack, complexity]
lesson: 14-monotonic-stack
sources: [raw/references.md]
updated: 2026-11-03
---

# 單調堆疊 Monotonic Stack

**一句話**：堆疊裡維持單調，新元素進來時彈出被它「解決」的元素。

## 何時使用（題目特徵）
- 下一個更大／更小元素
- 每日溫度（還要等幾天）
- 柱狀圖最大矩形、接雨水

## 核心步驟
1. 堆疊存索引（見 [[stack]]）
2. `while (!st.empty() && a[st.top()] < a[i])` → 記錄答案並彈出
3. `push(i)`

## 複雜度
- 每個元素進出一次，O(n)

## 易錯點
- 單調方向搞反
- `<` 與 `<=` 決定嚴格與否
