---
title: 二元樹 Binary Tree
type: data-structure
tags: [遞迴, 走訪]
related: [bfs, backtracking, queue]
lesson: 10-binary-tree
sources: [raw/references.md]
updated: 2026-11-03
---

# 二元樹 Binary Tree

**一句話**：每個節點最多兩個子節點，題目幾乎都用遞迴解。

## 何時使用（題目特徵）
- 走訪：前序、中序、後序、層序
- 求高度、直徑、路徑和、最近公共祖先
- 二元搜尋樹（BST）的中序是遞增序列

## 核心觀念
- 前／中／後序：處理自己的時機不同
- 層序走訪 = 樹上的 [[bfs]]（用 [[queue]]）
- 「後序思維」：先拿左右子樹的答案再合併

## 複雜度
- 走訪 O(n)，遞迴空間 O(h)

## 易錯點
- 空節點終止條件
- 鏈狀樹遞迴過深
