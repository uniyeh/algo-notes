---
title: 廣度優先搜尋 BFS
type: algorithm
tags: [圖, 最短路, 佇列]
related: [queue, graph-representation, complexity]
lesson: 03-bfs
sources: [raw/references.md]
updated: 2026-11-03
---

# 廣度優先搜尋 BFS

**一句話**：用 [[queue]] 一層一層擴散，第一次走到某點的距離就是最短距離。

## 何時使用（題目特徵）
- 無權圖（或網格）最短路、最少步數
- 連通塊計數、洪水填充（flood fill）
- 狀態空間搜尋（如 Word Ladder）

## 核心步驟
1. 起點距離設 0、放進佇列。
2. 取出隊首 u，掃描鄰居 v（圖的存法見 [[graph-representation]]）。
3. v 未拜訪 → `dist[v] = dist[u] + 1`，**入隊時就標記**。

## 複雜度
- O(V + E)；網格 O(nm)。

## 易錯點
- 出隊才標記 → 重複入隊、TLE
- 有權圖不能用 BFS → Dijkstra；0/1 邊權 → 0-1 BFS
- 網格先檢查越界再讀格子

## 相關
- dfs（待寫）：用堆疊／遞迴，適合找連通與回溯，不保證最短
