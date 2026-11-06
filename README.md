# KUDEW

Astro 静态站（中文在根路径，英文在 `/en/`）。Markdown 驱动，无数据库、无后台。

## 运行
```
npm install
npm run dev      # 本地预览
npm run build    # 输出到 dist/
```

## 新增内容
在 `content/zh/projects|writing/` 或 `content/en/projects|writing/` 新增一个 `.md` 文件：
```
---
title: 标题
date: 2026-11-03
summary: 一句话介绍
tags: [a, b]
cover: /images/xx.webp   # 可选
url: https://...         # 可选
draft: false             # true 则不发布
pin: false               # true 则置顶
---
正文
```
没有已发布条目的板块会自动隐藏。`Hello, KUDEW` 是草稿，改写后把 `draft` 改为 `false`。

## site.config.json
- `social.github / x / email`：留空则不显示
- `now.zh / now.en`：首页一行「Now」，留空则不显示

## 部署到 Cloudflare Pages
1. 推送到 GitHub。
2. Cloudflare Pages → 连接仓库；Build command `npm run build`，Output directory `dist`，Node 20+。
3. 绑定域名 kudew.com。

## 功能
滚动互动：首屏大字标随滚动收缩并变细、跑马灯随滚动速度和方向加速或反向、简介逐词高亮、右侧章节索引、顶部阅读进度条、列表滚动入场（原生 scroll-driven animations，不支持时直接显示）。
另有命令面板（Ctrl/Cmd+K 或 `/`）、项目悬停预览（桌面）、页面转场、RSS、Collected、About（`show: true` 才显示）。

## 还没做
Collected 的分类筛选；按文章生成 OG 图（目前使用 `public/og-default.png`）。
