---
title: 圖的存法 Graph Representation
type: data-structure
tags: [圖]
related: [bfs]
updated: 2026-11-03
---

# 圖的存法 Graph Representation

| 存法 | 空間 | 適合 |
|---|---|---|
| 鄰接串列 `vector<vector<int>> adj` | O(V + E) | 一般稀疏圖（最常用） |
| 鄰接矩陣 `bool g[N][N]` | O(V²) | V ≤ 2000、需要 O(1) 查邊 |
| 網格 `vector<string>` + `dx/dy` | O(nm) | 迷宮、地圖題 |

## 用在哪
- [[bfs]]：鄰接串列與網格兩種寫法
