---
title: "DeepSeek 开源自主智能体架构"
date: 2026-11-01
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-11-01.webp"
    hiddenInList: false
---

10 月 31 日晚上，DeepSeek 又开源了一个东西。

这次不是模型，也不是榜单成绩。DeepSeek Harness 团队在 GitHub 上放出了 dsh-superagent-prototype，一份 MIT 许可的研究原型，配套的技术文章标题是《Exploring Super-agent Design: Towards a More Autonomous Agent System》——探索超级智能体的设计。

一夜之间，这个仓库的 Star 从 0 涨到了 2900 多。Hacker News、InfoQ、智东西等多家技术媒体在同一天跟进，讨论的关键词集中在一处：DeepSeek 想让 Agent 从「等指令的对话框」，变成「持续在线的协作者」。

![Super-agent 整体系统架构](https://oss.zhidx.com/cdf059e726b959b74dfe34ce648945dc/6ae68100/uploads/2026/10/6ae5fb2278c3a_6ae5fb2275c2c_6ae5fb2275bfc_640-3.jpeg)

## 它到底想解决什么问题

过去一年，Coding Agent 已经能靠工具解决复杂问题，人的角色从执行上移到了决策和验收。但现有 Agent 基本以单个 Session 为单位：多任务的上限，取决于人还能同时盯几件事；会话之间互相阻塞、上下文串味，设备一离线就停摆。

dsh-superagent 换了一种组织方式。它盯住一个 GitHub 仓库（可选再接一个飞书群），被允许的人在 issue 或评论里 @ 它，它就开一个工作项（Ticket），在自己的 agent session 和独立目录里干活，干完回到原对话里回复——通常是一个 Pull Request。它只在被明确要求、或者团队写好的规则允许时才动手，也只在有人需要行动时说话。README 把这条原则写得很直白：尽可能少占用人的注意力，尽可能多交付价值。

**项目地址：**https://github.com/deepseek-ai/dsh-superagent-prototype

## 五个模块撑起来的架构

DeepSeek 在文章里把支撑这套系统的东西拆成了五块，其中最有辨识度的是双层架构。

Router 层是常驻的全局路由，只负责跨信道的连续性：同一个任务，先在 IM 群聊里定了方案 A，后来又在 PR 评论里改成方案 B，它接得住。具体的活儿交给 Worker Session，每个 Worker 在自己的隔离环境里并发执行，互不阻塞。Router 不介入单个任务内部的拆解，所以它自身的推理负载很轻。

![双层架构：Router 层统一负责路由与对外交互，多个 Worker Session 隔离并发执行任务](https://oss.zhidx.com/e4ede3d55394b931448dd5ac0ba8913e/6ae68100/uploads/2026/10/6ae5fb237b621_6ae5fb23788c9_6ae5fb2378899_640-4.jpeg)

剩下四块分别是：事件驱动——Agent 的输入从「人敲的提示词」换成环境事件（群消息、代码评审评论、CI 结果），并借鉴 Fast Path / Slow Path 把高频判断固化成确定性代码；异步多信道交互——耗时操作丢后台，前台随时接新指令，输出按不同信道的习惯定制；存算分离——把推进 Agent Loop 的计算、会话状态、执行环境三者解耦，让 Agent 摆脱单机生命周期；外部 Watchdog——不只盯进程是否活着，还盯任务有没有跑偏。

![投机执行示例：群里还在讨论解决方案时，Super-agent 已在后台提交了修复 Pull Request](https://oss.zhidx.com/dff5023f7a2ea3755f27ee3586237b94/6ae68100/uploads/2026/10/6ae5fb2663a02_6ae5fb2660a93_6ae5fb2660a62_640-9.jpeg)

## 初步实验的数据

文章给了一组合成负载下的初步结果：Super-agent 的任务完成时间 p50 为 12.4 分钟、p95 为 15.7 分钟，明显好于带 Subagent 工具的单 Session 方案。后者很吃提示词——中性提示下五次运行一次都没委派子任务，全挤在主会话里被新消息打断，p95 拖到 29.5 分钟。

代价是 token：维护多会话让读缓存 token 高于单 Session，等于用更多 token 换更短、更稳的完成时间。

## 怎么装起来

先备好 Node.js 22.19+ 或 24+、pnpm、git 2.32+、Python 3.8+、tmux，以及 GitHub CLI 2.48 以上。然后：

```sh
npm install -g @deepseek-ai/dsh@0.2.1-rc.3
git clone <仓库地址> dsh-superagent && cd dsh-superagent
pnpm install && pnpm build
dsh superagent --from-default-profile web --dump-config > /dev/null
dsh plugin --profile superagent add "link:$PWD"
scripts/dsh-superagent start
```

嫌步骤多的话，README 里给了更省事的路径：直接让 coding agent 读仓库里的 SETUP.md，它会一个问题一个问题地问，把账号、仓库、策略和命令都配好。

## 为什么值得关注

得先说清边界。README 第一行就写明：这是研究原型，不是 DeepSeek 官方产品，代码由 coding agent 参与写成，可能还有 bug；文章里的部分设计是未来方向，这版原型并没有落地。

它有价值的地方，恰好不在「能不能直接用」，而在给出的思路——把计算机系统里沉淀了几十年的调度、缓存、存算分离、看门狗这些工程思想，搬进 Agent 系统。文章最后还列了四个没解决的问题：双层架构怎么扩展、脱离 Session 后的人机协作、上下文边界与 A2A、安全与隐私。

对正在做 Agent 工程化的人来说，这份原型加上配套文章，是一份少见的、把设计取舍写清楚的参考。适合抱着「看架构、抄思路」的心态读，不适合指望装完就得到一个全自动的 AI 同事。

