---
title: "Vercel 开源 AI 操作桌面工具"
date: 2026-11-03
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-11-03.webp"
    hiddenInList: false
---

10 月 31 日，Vercel Labs 的 Chris Tate 在 X 上发了一条帖子，介绍一个叫 agent-desktop 的新项目，一句话概括是「agent-browser, for your whole computer」。到 11 月 1 日下午，这条帖子已经有约 64 万次浏览、7700 多个赞。Vercel CEO Guillermo Rauch 也转发了，说每个桌面都该有一个 Agent。

![媒体对 agent-desktop 的报道配图](https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/cu6eiph8qq79gpnll9w3.png)

一个命令行工具的介绍能传这么开，是因为它解决的是 AI Agent 落地时最别扭的那一段：让模型去操作电脑上那些没有 API 的软件。

过去的主流方案是截屏加视觉模型，让模型看图猜按钮坐标。这条路能跑通，但贵、慢，分辨率、主题色、缩放一变就容易失灵。

agent-desktop 换了条路：不截图，直接读操作系统的无障碍树——macOS 走 AX API，Windows 走 UI Automation，Linux 走 AT-SPI。这是屏幕阅读器用了很多年的那套接口，应用自己把按钮、输入框、列表项暴露成结构化节点，它照着读一遍，返回一段 JSON。

**项目地址：**https://github.com/vercel-labs/agent-desktop

![agent-desktop 项目主视觉](https://raw.githubusercontent.com/vercel-labs/agent-desktop/main/assets/banner.png)

## 它到底怎么用

核心是「观察—操作—验证」三步循环，循环留在你自己的 Agent 里，这个工具只负责看和动。

一次 snapshot 会把某个应用的界面读成 JSON，每个能操作的元素带一个 ref，长得像 `@s8f3k2p9:e8`，前半段是快照 id。Agent 对 ref 下指令，再快照一次确认结果。

```
agent-desktop snapshot --app Finder -i      # 读界面，每个元素带 ref
agent-desktop click @s8f3k2p9:e8            # 对 ref 执行操作
agent-desktop snapshot --app Finder -i      # 再读一遍，确认结果
```

ref 是跟快照绑定的，单独写 `@e8` 会被直接拒绝；界面变了之后再用旧 ref，会明确返回 STALE_REF 或 AMBIGUOUS_TARGET，而不是默默点到别的地方。错误里还带一个 disposition 字段，告诉 Agent 这次重试安不安全。这种「会明确失败」的设计，对自动化来说比「猜错也照点」重要得多。

![agent-desktop 官方演示：Agent 在应用里点击并验证结果](https://raw.githubusercontent.com/vercel-labs/agent-desktop/main/assets/Tutorial.gif)

它一共 60 个命令名、56 个可用命令，覆盖观察、点击输入、键鼠、窗口管理、系统通知、剪贴板等场景。默认是 headless 模式，不移动鼠标也不抢焦点；多个 Agent 同时跑时可以各自显示一个光标，那是可选浮层，不替换系统指针。

平台支持 macOS 13+、Windows 10 1809+（或 Server 2019+）、Ubuntu 24.04+，x64 和 ARM64 都有原生二进制，不需要 GPU。

## 装起来就一行

需要 Node 环境：

```
npm install -g agent-desktop
agent-desktop version
```

macOS 上要额外给无障碍权限，工具自带引导命令：

```
agent-desktop permissions --guide
```

它自带给 Agent 读的技能文档，装好后让 Agent 先加载一遍：

```
agent-desktop skills get desktop
```

## 值得关注的点

它的版本节奏很快：10 月 28 日发 1.0.0，10 月 30 日 1.0.2，今天又推了 1.1.0。仓库现在约 1.1 万 Star，光今天一天就涨了 2275 个。

不过有几个边界得先说清楚：它只能看见愿意暴露无障碍树的应用，完全不暴露的界面够不着；Chromium 和 Electron 应用冷启动要等 10 到 25 秒，界面树才可用。官方说的 token 减少 78% 到 96% 是自家模拟任务的数据，还没有第三方基准。README 也提醒，快照、剪贴板和截图都可能包含私人桌面内容，别丢进公开日志。

对手里有一堆没有 API 的老软件、又想让 Agent 接进去的团队来说，这个东西把成本压到了「装一个 npm 包」的量级，值得先拿一两个常用应用试一下。

