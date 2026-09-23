---
title: "微软 Agent 框架：多智能体编排上生产"
date: 2026-09-21
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-09-21.webp"
    hiddenInList: false
---

AI Agent 越来越多，但真正能跑在生产环境里的不多。大多数框架解决的是「能不能跑起来」，到了多智能体协作、可观测性、人工介入这些环节，还是得自己写一堆胶水代码。微软 2025 年 10 月把 Semantic Kernel 和 AutoGen 合并成一个开源项目，今年 4 月推到 1.0 正式版，这个问题才算有了一个官方答案。

这个项目就是 Microsoft Agent Framework（MAF），一个用 Python 和 .NET 双语言构建多智能体系统的开源框架，定位很明确：把 agent 从原型推到生产。

**项目地址：**https://github.com/microsoft/agent-framework

![Microsoft Agent Framework 官方横幅](https://raw.githubusercontent.com/microsoft/agent-framework/HEAD/docs/assets/readme-banner.png)

最实在的一点，是它把多智能体的协作方式抽象成了图（graph）。顺序执行、并发、agent 之间的交接（handoff）、小组协作，这些模式开箱即用，还自带 checkpointing 和「时间旅行」——工作流跑到一半断了，能从断点续跑，而不是从头再来。对要把 agent 流程上线的人，这省掉的正是最痛苦的那部分自研调度器。

另一个差异点，是它把「生产」当成默认选项。内置 OpenTelemetry 可观测性，Human-in-the-loop 人工审批是一等公民，支持用 YAML 声明式定义 agent，还配了 DevUI 调试界面。最近 9 月又新增了 channels 和分布式 skills over MCP——agent 能通过 Telegram、A2A、MCP 这些通道被外部系统调用，相当于把 agent 真正当成了可接入的服务，而不只是一个脚本。

![多智能体到分布式 skills 的架构示意](https://devblogs.microsoft.com/agent-framework/wp-content/uploads/sites/78/2026/09/ski-advisor-multi-agent-to-distributed-skills-architecture.webp)

从 1.0 发布到现在，仓库已经攒了 1.36 万 Star，今天单日还在涨 700 多。热度背后是真实的需求：AutoGen 和 Semantic Kernel 两拨用户都在这一条主线上汇合，微软也明确表态后续投入集中在这一个框架上，两者作为独立项目仍保留，但重心已经转移。

适合什么人用：已经要把 agent 落到生产、需要多智能体编排和治理的团队，尤其是有 .NET 或 Python 技术栈的；如果只是跑个单 agent 玩具验证，杀鸡用牛刀。方向上，微软把「企业级 agent 底座」做成了开源的标准答案，A2A 和 MCP 两条协议都打通，后续生态大概率围绕它生长。

项目地址：https://github.com/microsoft/agent-framework

