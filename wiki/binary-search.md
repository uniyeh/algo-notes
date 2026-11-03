---
title: 二分搜尋 Binary Search
type: algorithm
tags: [搜尋, 對答案二分]
related: [monotonicity, complexity]
lesson: 01-binary-search
sources: [raw/references.md]
updated: 2026-11-03
---

# 二分搜尋 Binary Search

**一句話**：在一個 F F F … T T T 的判定函式上，每次砍半找到第一個 T。

## 何時使用（題目特徵）
- 已排序陣列找位置 → `lower_bound` / `upper_bound`
- 「最小化最大值」「最大化最小值」→ 對答案二分
- 判定「答案 ≥ x 是否可行」很容易，但直接求答案很難

## 核心步驟
1. 確認判定函式 `check(x)` 具有 [[monotonicity]]。
2. 左閉右開 `[lo, hi)`，`mid = lo + (hi - lo) / 2`。
3. `check(mid)` 為真 → `hi = mid`，否則 `lo = mid + 1`。
4. 結束時 `lo` 就是第一個為真的位置。

## 複雜度
- 陣列：O(log n)；對答案二分：O(f(n) · log V)，見 [[complexity]]。

## 易錯點
- `lo = mid` 搭配向下取整 → 無窮迴圈
- `(lo + hi) / 2` 溢位
- check 不單調卻硬二分

## 變形
- 實數二分：固定跑 100 次迴圈取代 `lo < hi`
- 三分搜：單峰函式找極值
