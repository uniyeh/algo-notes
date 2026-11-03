---
title: 單調性 Monotonicity
type: concept
tags: [觀念]
related: [binary-search]
updated: 2026-11-03
---

# 單調性 Monotonicity

**一句話**：條件一旦成立，往後就一直成立（F…F T…T），這是 [[binary-search]] 能用的前提。

## 怎麼判斷
- 「x 可行 ⇒ 比 x 更寬鬆的也可行」→ 單調
- 例：上限 x 能分完書 ⇒ 上限 x+1 也能分完

## 反例
- 判定函式忽真忽假（如「x 是質數」）→ 不能二分
