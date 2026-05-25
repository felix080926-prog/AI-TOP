---
title: "从 Linear Algebra 到 Autonomous Swarms：这个 435 课的 GitHub 项目，可能是你转行 AI 工程师的最后一站"
date: 2026-05-22
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-05-22.webp"
    hiddenInList: false
---

昨天一个做后端的朋友找我聊天，说公司突然把整个组拉去搞 AI 了。"上周还在写 CRUD，这周老板就让我搭 RAG 流水线。"他苦笑了一下，"我连 attention 是什么意思都说不清楚。"

这不是个例。这个项目 README 里引了一个数据，挺扎心的：**84% 的学生已经在用 AI 工具，但只有 18% 觉得自己准备好了用它干活。** 剩下那 66% 在干嘛？在用 ChatGPT 写代码，但说不清损失函数在干什么。在调 prompt，但不知道 tokenizer 是怎么切词的。

说白了——在用，但没真懂。

今天这个项目，就是来填这个坑的。

🔗 GitHub 地址：https://github.com/rohitg00/ai-engineering-from-scratch

### 01 ｜ 核心逻辑

这个项目叫 **ai-engineering-from-scratch**，看名字就知道什么路数——从零自己手写。

市面上不缺 AI 教程。但大部分是"散装"的：一篇讲 LoRA 的文章，一个 fine-tuning 的 notebook，一个 agent 的 demo 视频。你跟着做完，能跑起来，但你不知道它为什么能跑。换个场景就抓瞎了。

这个课程的路子正好反过来。**它不先教你用 PyTorch，而是先让你从零写一个 backprop。** 不先调 API，而是从数学推导 attention 机制。20 个阶段，435 节课，4 种语言（Python、TypeScript、Rust、Julia），~320 小时工作量。从线性代数和概率论打底，到多智能体 swarm 收尾。

每个 Lesson 的产出不是笔记，而是一个**可复用的 artifact**：一个 prompt 模版、一个函数、一个 agent、一个 MCP 服务器。学到哪，你就有了一个能直接用的东西。

创始人 Rohit 说了一句话我挺认可：**"You don't just learn AI. You build it. End-to-end. By hand."**

### 02 ｜ 硬核功能盘点

🔗 GitHub 地址：https://github.com/rohitg00/ai-engineering-from-scratch

#### 功能一：从数学到生产的完整课程体系

20 个 Phase，从 Phase 0（环境搭建）一路到 Phase 19（毕业项目）。中间经历了数学基础、ML 原理、深度学习、CV、NLP、语音、Transformer、GenAI、RL、LLM 手写、LLM 工程化、多模态、Agent、自主系统、多 Agent Swarm、基础设施、伦理对齐。

**点评：** 这个路径设计是认真的。不是"挑着讲"，而是**铺了一条路**。你跟着走完，脑子里会有一张完整的知识地图。

#### 功能二：每个 Lesson 都产出可用的 artifact

不是看完就完了。每节课最后会产出一个实际能用的东西——prompt、函数、agent、MCP server。你学完 attention 机制，产出一个注意力可视化工具；学完 agent loop，产出一个能跑的任务代理。

**点评：** 这个设计很聪明。传统教程的 problem 是"学完就忘"，因为没有真实产出。这个模式让你学到的每个知识点都必须"过手"。

#### 功能三：先手写再上框架

每个算法都分两步走：第一步，**从零自己实现**（纯数学、无框架）；第二步，**用生产级库重写**（PyTorch、LangChain 等）。你理解底层之后，再去看框架的 API，脑子里的"黑盒"就变成"白盒"了。

**点评：** 这是最值钱的部分。大多数人卡在使用框架但不懂框架在干什么，这个流程恰好把那个 gap 填平了。

#### 功能四：四语言支持

Python 打主力，TypeScript、Rust、Julia 做补充。不是让你都学，而是对不同场景都有覆盖。

**点评：** Rust 版本值得关注——对高性能推理场景，Rust 正在变成一个越来越重要的选项。

#### 功能五：完全免费 + MIT 协议

开源、免费、MIT 协议。你甚至可以拿课程里的课程设计给你的团队做内部培训。

**点评：** 这个定价……叫"白送"。

### 03 ｜ 典型场景和避坑

#### ✅ 适合谁

**转行的后端/前端开发者**：你懂编程，想系统入门 AI 工程，不满足于只会调 API。从 Phase 0 开始，一路往下推，大概 3-6 个月能走完核心路线。

**已经在做 AI 但基础不牢的在校生**：你跑过模型，调过参，但说不上来背后发生了什么。建议从 Phase 1（数学基础）开始，重点补 Phase 3（深度学习核心）和 Phase 10（手写 LLM）。

**需要在团队内建立 AI 工程能力的技术负责人**：可以把课程作为 team learning 路径，每周组织一次 lesson review。

#### ❌ 不推荐给谁

**就想一键部署个 ChatGPT 套壳的老板**：这个项目不是给你快速出活的。它的目标是让你"真正理解"，不是让你"今天上线"。

**对线性代数和概率论完全零基础的人**：Phase 1 包含了数学打底，但如果你连什么是矩阵乘法都不知道，建议先刷一遍 3Blue1Brown 的线性代数系列再来。

**时间特别紧的项目经理**：~320 小时的工作量摆在那，不是刷几篇小红书笔记就能搞定的。

**真实案例**：
我一个朋友（后端转 MLE），之前也是用 ChatGPT 写代码但说不上来原理。他花了两周从 Phase 0 干到 Phase 3，反馈是"虽然慢，但之前那些怎么都看不懂的论文，现在居然能读下去了。"

### 04 ｜ 上手教程

#### 方式一：从 README 开始

```bash
# 克隆仓库
git clone https://github.com/rohitg00/ai-engineering-from-scratch.git
cd ai-engineering-from-scratch

# 看看目录结构
ls -la phases/
```

然后从 `phases/00-setup-and-tooling/` 开始。每个 Phase 下都有 README 说明前置知识。

#### 方式二：走网页版

项目有配套网站：https://aiengineeringfromscratch.com

网页版做了更好的排版和交互，适合阅读型学习。

#### 方式三：按主题跳转（适合有基础的）

如果你已经熟悉某些领域，可以直接跳到感兴趣的 Phase：

```bash
# 如果你已经懂 ML 基础
cd phases/07-transformers/

# 如果直接想看 Agent
cd phases/14-agent-engineering/
```

**但我建议你还是回头把 Phase 3 和 Phase 7 补了。** curriculum 是累加的，跳过基础层，到上层你会有一种"好像会了又好像不会"的难受感。

### 05 ｜ 总结

AI 行业最不缺的就是"浅尝辄止"的人。调个 API、跑个 demo、发条推，看起来很热闹，但真正到要做决策、要 debug、要落地的时候，缺的就是那层"底层理解"。

这个项目给的不是速成方案，而是一条**踏实的路**。435 节课，320 小时，从数学推导到产品级部署——你每走完一节，就真的多了一个技能，而不是多了一条"已阅"的笔记。

如果你真的想在这个行业做出点什么，而不是一直飘在表面，这条路值得走。