---
title: 鏈結串列 Linked List
type: data-structure
tags: [指標, 模擬]
related: [two-pointers]
lesson: 05-linked-list
sources: [raw/references.md]
updated: 2026-11-03
---

# 鏈結串列 Linked List

**一句話**：每個節點記住下一個是誰，改指標就能 O(1) 插入、刪除。

## 何時使用（題目特徵）
- 頻繁在中間插入／刪除，且已經拿到節點
- LeetCode 的 `ListNode` 題：反轉、合併、找環
- 競程模擬「排隊、插隊、離開」

## 核心操作
- 反轉：`prev / cur / nxt` 三個指標
- 陣列模擬雙向串列：`L[x]`、`R[x]`，0 當哨兵
- 找環、找中點：快慢指針，見 [[two-pointers]]

## 複雜度
- 插入／刪除 O(1)，找第 k 個 O(n)

## 易錯點
- 改指標前沒先暫存下一個
- 頭節點特判 → 用 dummy head
