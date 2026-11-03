---
title: 時間複雜度 Complexity
type: concept
tags: [觀念]
related: [binary-search, prefix-sum, bfs]
lesson: 04-cpp-basics
updated: 2026-11-03
---

# 時間複雜度 Complexity

**一句話**：C++ 一秒大約可以跑 10⁸ 次簡單運算，用資料範圍反推可接受的複雜度。

| n 的範圍 | 可接受的複雜度 |
|---|---|
| ≤ 20 | O(2ⁿ) |
| ≤ 500 | O(n³) |
| ≤ 5000 | O(n²) |
| ≤ 2×10⁵ | O(n log n) |
| ≤ 10⁷ | O(n) |

## 例子
- [[prefix-sum]]：查詢 O(1)
- [[binary-search]]：O(log n)
- [[bfs]]：O(V + E)
