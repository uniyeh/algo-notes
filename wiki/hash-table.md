---
title: 雜湊表 Hash Table
type: data-structure
tags: [unordered_map, 配對]
related: [complexity, two-pointers]
lesson: 06-hash-table
sources: [raw/references.md]
updated: 2026-11-03
---

# 雜湊表 Hash Table

**一句話**：用雜湊函數把 key 映到位置，平均 O(1) 查找。

## 何時使用（題目特徵）
- 「某個值出現過嗎／出現幾次」
- 配對問題：Two Sum、四數相加
- 記錄「值 → 位置」

## C++ 工具
| 容器 | 有序 | 複雜度 |
|---|---|---|
| `unordered_map` / `unordered_set` | 否 | 平均 O(1) |
| `map` / `set` | 是 | O(log n) |

## 易錯點
- 用 `m[x]` 查詢會插入新 key → 用 `find` / `count`
- Two Sum 要先查再放
- 排序後的配對也可以用 [[two-pointers]]
