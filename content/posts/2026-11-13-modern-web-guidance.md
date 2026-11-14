---
title: "Google 发布 1.0，让 AI 写网页不再用老套路"
date: 2026-11-13
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-11-13.webp"
    hiddenInList: false
---

11 月 10 日，Google 在 Chrome for Developers 博客上宣布，Modern Web Guidance 结束预览阶段，正式发布 1.0 稳定版。两天后，对应的开源仓库第一次登上 GitHub Trending，直接排到第 3 位，是当天排名最高的新进项目。截至发稿，这个仓库的 Star 数从 1700 多涨到 3100 多，两天多了将近 1500 颗。

![Chrome 官方博客发布的 Modern Web Guidance 1.0 公告配图](https://developer.chrome.com/static/blog/modern-web-guidance-v1/image/thumbnail.png)

## 一个被反复吐槽的老问题

用 AI 写前端，最让人头疼的不是代码跑不起来，而是跑起来了但处处不对劲：一个原本用 `<dialog>` 就能搞定的弹窗，模型偏要自己搭一套 div 加 JavaScript 的焦点陷阱；一行 CSS 容器查询能解决的事，它写了一堆监听器。原因不难理解——训练数据里堆满了十几年前的老写法，模型记住的"最佳实践"其实早就过期了。

Google 自己的评测把这层窗户纸捅破了：近 1000 次 A/B 跑分里，前沿模型在"现代 Web 检查"上平均只能过 60% 左右，装上引导之后升到 80% 到 90%。在自定义 select 这类任务上差距更夸张，从 44% 直接提到 92%——没装之前，模型会把下拉框拆成一堆 div，丢掉 label、弄坏键盘导航、表单也提交不了。

## 这个项目做的事

Modern Web Guidance 的源仓库是 GoogleChrome/modern-web-guidance-src。它本质上是一套 agent skill：把 Web 平台的最佳实践和浏览器兼容性数据（来自 Baseline）打包成一份份专家审核过的指南，在智能体动手写代码之前送进它的上下文窗口。智能体不再凭参数里的模糊记忆套模板，而是先查指南再落笔。指南内容、评估工具链和治理文档都在这个仓库里，最终打包成 modern-web-guidance 技能包对外发布。

**项目地址：**https://github.com/GoogleChrome/modern-web-guidance-src

![Modern Web Guidance 官方文档封面](https://developer.chrome.com/static/docs/modern-web-guidance/get-started/image/cover.png)

## 1.0 加了什么

最值得说的是新增的现代化工作流。1.0 带了一个 `legacy-scan`：用 AST、DOM、CSS 解析器在本地扫描现有的 HTML、CSS、JavaScript 和 package.json，找出可以安全升级的老写法，然后引导智能体一处一处改。整个过程零 LLM 调用、零 token 成本。官方说规则是拿大约 4.5 万个开源仓库对半切开来验证的——一半用来写规则，一半用来打分，静态匹配精度要到 80%、验证后精度要到 90% 才允许默认开启。宁可少报，也不给一堆假警报。

指南库这次也补到了针对数百个已验证 AI 知识断层的规模，覆盖弹窗与 popover 过渡动画、容器查询、oklch 色彩空间，到 fetchpriority、Speculation Rules、scheduler.yield 这类性能细节，再到键盘焦点与 inert 管理、减少动效偏好这些无障碍项。每份指南都嵌了 Baseline 兼容数据，项目要支持的浏览器版本不够，它给的是轻量降级方案，而不是让你硬上一个重 polyfill。

另一个容易被忽略的变化：它不再只是 Chrome 一家的事。1.0 起 Microsoft Edge、Mozilla Firefox 和 MDN 团队一起参与维护，这也是它值得多看一眼的原因——浏览器厂商在自家工程师的日常工具上达成了共识。

## 装起来只要一条命令

在项目目录里跑：

```
npx modern-web-guidance@latest install
```

装过旧版本的，用 `npx modern-web-guidance@latest update` 升到 1.0。不想用 CLI 也可以，Claude Code、Codex、Cursor、Antigravity、Copilot、WebStorm、Kimi Code、Grok Build 这些智能体的插件市场里都能直接装和更新。

装完先别急着改代码，可以用它的几个命令试水：`search` 按需求查指南（本地语义检索，离线、不需要 API key），`retrieve` 把某份指南拉出来看，`legacy-scan .` 直接扫一遍现有代码库，看有多少地方可以改。

![Modern Web Guidance 支持的编码智能体插件市场](https://developer.chrome.com/static/blog/modern-web-guidance-v1/image/agent-marketplaces_1440.jpg)

## 为什么值得关注

它真正解决的问题不是"让 AI 会写网页"，而是"让 AI 别把 2019 年的写法带进 2026 年的项目"。适合已经用智能体写前端、并且在意性能和无障碍的团队；如果只是偶尔让模型生成几个组件，收益取决于你对生成代码质量的要求有多高。

方向上的意义更明显一些：把平台知识做成可版本化、可评测、可更新的技能包，而不是指望模型参数里的记忆自动跟上标准——这大概是 AI 写代码从"能跑"走向"能交付"绕不开的一步。

