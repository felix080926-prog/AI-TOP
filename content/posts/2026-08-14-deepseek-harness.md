---
title: "GitHub 史上最快涨星项目！DeepSeek 官方 Agent 框架开源"
date: 2026-08-14
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-08-14.webp"
    hiddenInList: false
---

**大家好，我是雷达君。**

8 月 13 日晚，DeepSeek 干了一件让整个开源社区沸腾的事。

他们发布了一个叫 **DeepSeek Harness（dsh）** 的 Agent 框架，**MIT 协议开源**。然后发生了什么呢？

**1 个半小时，GitHub Star 突破 2.4 万**。截至本文发布，该项目的 Star 数 已突破 4 万！

什么概念？xAI 的 Grok-1 破 2 万星用了**1.2 天**，DeepSeek 自己的 R1 用了**5.7 天**。Harness 直接把纪录从“天”压缩到了“小时”。

评论区炸了。有人说是“Agent 领域的 Linux 时刻”，有人说“DeepSeek 这次不是在追，是在领跑”。

今天雷达君就来拆一拆，这个让开发者连夜排队点 Star 的项目，到底凭什么。

## 01 ｜一个半小时，2.4 万 Star：发生了什么？

先捋一下时间线。

2026 年 5 月，DeepSeek 内部立项 Harness，组建专项核心团队，由**崔添翼**担任负责人。6 月下旬开始内测。8 月初，团队负责人发帖招募内测人员，要求“参与过开源 Agent 项目的建立和维护”。

8 月 13 日晚，Harness 开发者预览版正式面向全球开放。

然后就是那一个半小时。

业内分析认为，Harness 的落地标志着 DeepSeek**从单一的基础模型供给者，全面转型为全链路 AI 工作流解决方案的构建者**。这不是一个“小工具”，这是 DeepSeek 的**战略级产品**。

## 02 ｜核心逻辑：万物皆插件

> 🔗 GitHub 地址：https://github.com/deepseek-ai/deepseek-harness

Harness 最核心的设计原则只有四个字：**一切皆插件**。

这句话的意思是：**模型适配器、工具注册表、会话日志、Agent 循环本身——全都是插件**。每一个组件都可以从配置层面被替换、被重组。

它底层基于一个叫 **Cordis** 的元框架。Cordis 负责插件的加载、卸载和依赖关系管理，Agent 中的具体组件以不同插件形式运行，通过服务与事件进行协作。

**你想换模型？换插件。你想换工具集？换插件。你想换整个 Agent 的决策逻辑？还是换插件。**

你不需要改动 Harness 的源码。所有能力——模型、工具、技能、会话、沙箱、存储、循环、调度、UI——均由插件组合而成，可自由替换、灵活重组。

截止目前，Harness 的插件生态已拥有**超过 300 个插件**。

## 03 ｜四种模式：从“极简”到“创造”

Harness 内置了**四种 Agent 预设模式**，每种模式默认加载不同的插件集合：

- **Minimal（极简）** ：最轻量的 Agent，适合简单任务
- **Standard（标准）** ：日常编码和办公场景的默认选项
- **Code（编程）** ：针对代码生成和调试优化
- **Cordis（创造）** ：完整的插件生态，最大灵活性

你不需要从零搭建 Agent。选一个模式，开箱即用。需要更复杂的能力？往里面加插件就行。

## 04 ｜怎么用？三种姿势任选

Harness 的入门门槛极低。

**姿势一：Web UI（最推荐新手）**

```bash
npx @deepseek-ai/dsh web
```

浏览器自动打开 `http://127.0.0.1:3080`。一个完整的 Agent Web 界面，零配置启动。

**姿势二：从源码运行**

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

适合需要深度定制的开发者。

**姿势三：Python SDK**
Harness 提供了完整的 Python SDK，可以在自己的程序中调用同一套 API。

## 05 ｜和 Claude Code、Cursor 有什么区别？

Harness 和现有工具的核心区别在于**“插件化”的彻底程度**。

Claude Code 和 Cursor 是“给你一个装满功能的瑞士军刀”——功能是预置的，你能换的是“用不用”，不是“换不换”。

Harness 是“给你一把刀柄，刀刃你自己选”——模型适配器是插件、工具注册表是插件、会话日志是插件、Agent 循环本身还是插件。你想换成什么，就换成什么。

**你不是在“用”一个 Agent，你是在“组装”你自己的 Agent。**

> 有媒体将 Harness 定位为 **“对标 Claude Cowork”** 的开源方案。不同的是，Cowork 是闭源的、收费的、锁在 Anthropic 生态里的。Harness 是 MIT 协议的、完全开源的、插件生态开放的。

## 06 ｜现实摩擦

Harness 目前处于**开发者预览阶段**，官方明确标注：“**未来将出现破坏兼容性的变更**”。

这意味着：今天写的插件，明天可能就不兼容了。今天配好的配置，下个版本可能就得重写。

这不是一个“稳定的生产工具”，这是一个“让开发者提前上车”的**预览版**。

另外，Harness 基于 Node.js 生态（pnpm + TypeScript），如果你是完全的 Python-only 开发者，入门会有一个小小的学习曲线。

## 07 ｜总结

DeepSeek Harness 在 1 个半小时内狂揽 2.4 万 GitHub Star，成为 GitHub 史上增速最快的开源项目。

这个速度背后，是开发者对“**一切皆插件**”这个设计理念的集体投票。

模型适配器是插件、工具注册表是插件、会话日志是插件、Agent 循环本身还是插件。你想换什么就换什么，不用动源码。超过 300 个插件已经就位。四种预设模式覆盖从极简到创造的全场景。Web UI、CLI、Python SDK 三种姿势任选。MIT 协议，完全开源。

这不是 DeepSeek 的又一个小工具。这是 DeepSeek 从“模型公司”转向“AI 工作流平台”的战略级产品。

安装包和完整代码都在 GitHub 上：https://github.com/deepseek-ai/deepseek-harness


