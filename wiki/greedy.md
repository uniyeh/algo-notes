---
title: 貪婪 Greedy
type: algorithm
tags: [排序, 區間]
related: [dynamic-programming]
lesson: 12-greedy
sources: [raw/references.md]
updated: 2026-11-03
---

# 貪婪 Greedy

**一句話**：每一步選當下最好的，不回頭；需要能證明正確。

## 何時使用（題目特徵）
- 區間排程、區間覆蓋
- 分配問題（餅乾、跳躍遊戲）
- 能用交換論證說明「換成貪婪選擇不會更差」

## 經典模型
- 最多不重疊區間：按結束時間排序
- 跳躍遊戲：維護最遠可達位置

## 易錯點
- 沒證明就貪：零錢 {1,3,4} 湊 6 會失敗 → 改用 [[dynamic-programming]]
- 排序依據選錯
