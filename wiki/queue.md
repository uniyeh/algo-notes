---
title: 佇列 Queue
type: data-structure
tags: [STL]
related: [bfs]
updated: 2026-11-03
---

# 佇列 Queue

**一句話**：先進先出（FIFO），C++ 用 `std::queue`。

## 常用操作
- `q.push(x)`、`q.front()`、`q.pop()`、`q.empty()`，皆 O(1)

## 用在哪
- [[bfs]]：保證按距離由近到遠處理
- 模擬排隊、拓撲排序（Kahn 演算法）
