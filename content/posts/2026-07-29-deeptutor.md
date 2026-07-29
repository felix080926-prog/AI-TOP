---
title: '港大开源"终身学习伙伴"：一个 AI 把 Chat、Quiz、Research 全包了'
date: 2026-07-29
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-07-29.webp"
    hiddenInList: false
---

**大家好，我是雷达君。**

你有没有过这种经历：学一个新领域，先打开 ChatGPT 问概念，再切到另一个工具做笔记，想刷题又得换个 App，做研究还得再开一个学术搜索。知识散落在不同工具里，你的学习路径被切得七零八落。

更麻烦的是，没有一个工具记得你之前学过什么、卡在哪里、需要练什么。

如果有一个 AI，它像一位**了解你所有学习进度的私人导师**，能随时切换模式——聊天、出题、研究、可视化、刷题——而且所有上下文无缝衔接呢？

今天雷达君要安利的这个开源项目，就是来填补这个空白的。它由**香港大学数据科学研究所（HKUDS）** 出品——就是那个出过 OpenHarness、LightRAG、AutoAgent 的团队——是一个**Agent 原生的终身学习工作区**。

它就是——**DeepTutor**。

## 01 ｜核心逻辑：从“碎片化学习”到“连贯性学习”

DeepTutor 的核心理念可以用一句话概括：**把学习从“切换工具”变成“切换模式”**。

传统的学习方式是什么？你用 ChatGPT 问问题，用 Notion 记笔记，用 Quizlet 刷题，用 Google Scholar 做研究。每个工具都是孤岛，你的学习进度、知识盲点、历史问答全部散落在不同地方。

DeepTutor 换了一套完全不同的打法：**一个运行时，六种学习模式，所有上下文无缝流转**。

Chat、Quiz、Research、Visualize、Solve、Mastery Path——这六种模式跑在**同一个 Agent 循环**上。你切换的是“学习目标”，而不是“学习工具”。你在 Chat 模式下讨论过的概念，切换到 Quiz 模式时，AI 知道你刚才聊了什么，自动生成针对性题目。切换到 Research 模式时，它知道你正在研究什么方向，自动帮你做深度检索。

**更关键的是，DeepTutor 把“学习”这件事做了工程化拆解**：

- **Knowledge Base（知识库）** ：你上传的文档、笔记、教材，全部变成可检索的知识
- **Book（电子书）** ：支持创建和导入书籍，AI 可以逐章带你学
- **Co-Writer（协同写作）** ：AI 陪你一起写论文、写报告
- **Memory（记忆系统）** ：三层可审计的记忆架构，每一个“AI 记得你”的结论都能追溯到原始证据

**一句话：别人的 AI 工具是“一个功能一个 App”，DeepTutor 是一个“把所有学习功能装进一个 AI 里的工作区”。**

## 02 ｜硬核功能盘点

> 🔗 **GitHub 地址**：https://github.com/HKUDS/DeepTutor

### 1. 六种学习模式，一个 Agent 引擎

DeepTutor 最核心的能力，是它把六种学习模式塞进了**同一个 Agent 运行时**：

- **Chat（聊天）** ：日常问答，随时请教
- **Quiz（测验）** ：自动生成个性化题目，检验学习成果
- **Research（研究）** ：多步骤深度研究，自动生成报告
- **Visualize（可视化）** ：把复杂概念变成图表和思维导图
- **Solve（解题）** ：分步骤解决数学、编程等复杂问题
- **Mastery Path（精通路径）** ：自适应学习路径，从入门到精通

**你不需要为不同学习任务切换不同工具。一个 AI，六种模式，全部搞定。**

### 2. 子 Agent + Partner：你的 AI“学习搭子”

DeepTutor 支持**Subagents 和 Partners**机制。你可以随时召唤一个**实时编码 CLI 子 Agent**（支持 Claude Code、Codex、Gemini、Kimi、opencode、MiMo 等），也可以创建**持久的 IM 伴侣**，让它们用同一个“大脑”帮你处理不同任务。

**你不是在用一个 AI，你是在组建一支 AI 学习小队。**

### 3. 多引擎知识库：RAG、GraphRAG、LightRAG 全都要

DeepTutor 的知识库支持**LlamaIndex、PageIndex、GraphRAG、LightRAG**等多种检索引擎。你可以根据任务类型选择最合适的引擎——简单的文档问答用 LlamaIndex，复杂的关系推理用 GraphRAG，轻量级场景用 LightRAG。

**它甚至支持链接 Obsidian Vault**——你已经在用的笔记工具，直接接入 DeepTutor 的知识体系。

### 4. 可审计的三层记忆系统

这是 DeepTutor 最硬核的设计。它把“AI 记得你”这件事做了**工程化拆解**：

- **L1（Trace，追踪）** ：每一轮对话的原始记录
- **L2（Surface Summary，表层摘要）** ：对 L1 的压缩和提炼
- **L3（Synthesis，综合记忆）** ：跨会话的长期记忆

更重要的是，DeepTutor 提供了一个**Memory Graph（记忆图谱）** ——每一个“AI 记得你”的结论，都可以追溯到原始证据。你不是在“相信 AI 记得你”，你是在“审计 AI 为什么记得你”。

### 5. 可扩展的工具和技能生态

DeepTutor 内置了丰富的工具链——图像生成、视频生成、语音生成、MCP 服务器——同时支持**EduHub 社区技能**一键安装。你不需要从零写插件，社区里已经有大量可复用的技能包。

### 6. 四种部署方式，从 PyPI 到 Docker 全覆盖

DeepTutor 提供了四种安装路径：

- **PyPI 安装**：`pip install -U deeptutor`，一行命令搞定
- **源码安装**：适合开发和深度定制
- **Docker 部署**：`docker run --rm --name deeptutor ghcr.io/hkuds/deeptutor:latest`
- **CLI Only**：不需要 Web UI，纯命令行模式

**从个人开发者到企业级部署，全场景覆盖。**

## 03 ｜横向对比

DeepTutor、Odysseus 和 Notion AI 的定位完全不同：

| 维度           | **DeepTutor**                                   | **Odysseus**         | **Notion AI** |
| :------------- | :---------------------------------------------- | :------------------- | :------------ |
| **核心定位**   | **终身个性化学习工作区**                        | 自托管 AI 工作区     | 笔记+AI 辅助  |
| **学习模式**   | Chat/Quiz/Research/Visualize/Solve/Mastery Path | 通用聊天+Agent       | 基础问答      |
| **记忆系统**   | ✅ 三层可审计记忆（L1/L2/L3）+ Memory Graph     | ⚠️ 基础记忆          | ❌            |
| **知识库引擎** | LlamaIndex/PageIndex/GraphRAG/LightRAG 多引擎   | ⚠️ 基础 RAG          | ⚠️ 基础       |
| **子 Agent**   | ✅ 原生支持（Claude Code/Codex/Gemini/Kimi 等） | ✅                   | ❌            |
| **IM 伴侣**    | ✅ 持久的跨平台伴侣                             | ❌                   | ❌            |
| **学术背书**   | ✅ 港大 HKUDS + arXiv 论文                      | ❌                   | ❌            |
| **部署方式**   | PyPI/源码/Docker/CLI 四选一                     | Docker               | 云端          |
| **开源协议**   | ✅ 开源                                         | ✅ 开源              | ❌ 闭源       |
| **典型用户**   | 学习者、研究者、教育者                          | 效率控、自托管爱好者 | 知识工作者    |

**简单说：Notion AI 是“带 AI 的笔记”，Odysseus 是“带 AI 的工作区”，DeepTutor 是“专为学习设计的 AI 生态系统”。**

## 04 ｜典型场景和避坑

**适合谁用？**

- **需要系统化学习新领域的自学者**：从 Chat 到 Quiz 到 Research 到 Mastery Path，一条路径走到底
- **做学术研究的研究生/学者**：Research 模式自动做深度研究，Co-Writer 陪你写论文
- **需要个性化学习路径的教师/教育者**：为学生创建知识库、生成测验、跟踪学习进度
- **想深度定制学习 AI 的开发者**：开源、可扩展、支持多种知识库引擎和子 Agent

**不推荐给谁？**

- **只需要简单问答、不需要学习管理的普通用户**：直接用 ChatGPT 可能更轻量
- **完全不想接触任何技术配置的非技术用户**：虽然 DeepTutor 有 PyPI 一键安装，但毕竟是自托管系统

## 05 ｜快速上手指南（3 分钟）

DeepTutor 的安装极其简单，**一行命令就能跑起来**。

**第 1 步：安装**

```bash
pip install -U deeptutor
```

**第 2 步：初始化**

```bash
mkdir my-deeptutor && cd my-deeptutor
deeptutor init
```

初始化会引导你配置后端端口（默认 8001）、前端端口（默认 3782）、LLM 提供商和 API Key。

**第 3 步：启动**

```bash
deeptutor start
```

浏览器自动打开 `http://127.0.0.1:3782`。

**不想在本地装 Python？** 直接跑 Docker：

```bash
docker run --rm --name deeptutor -p 127.0.0.1:3782:3782 -p 127.0.0.1:8001:8001 ghcr.io/hkuds/deeptutor:latest
```

浏览器打开 `http://127.0.0.1:3782` 即可使用。

> **验证安装成功**：运行`deeptutor --version`，如果能返回版本号，说明安装成功。

## 06|总结

DeepTutor 解决了一个被很多人忽视但至关重要的问题：**学习是连贯的，但工具是碎片化的。**

你学一个领域，要在 ChatGPT、笔记软件、刷题 App、学术搜索之间来回切换。你的学习进度、知识盲点、历史问答散落在不同工具里，没有人帮你串联起来。

DeepTutor 的答案是：**把所有学习工具塞进一个 AI 工作区，让 AI 成为你的“终身学习伙伴”。**

六种学习模式、多引擎知识库、三层可审计记忆、子 Agent 和 IM 伴侣、四种部署方式全覆盖——它把“个性化学习”这件事，从“一个 App 一个功能”变成了“一个 AI 贯穿始终”。

**AI 不应该只是一个“回答问题”的工具，而应该是陪你走完整个学习旅程的“导师”。**

安装包和完整代码都在 GitHub 上：https://github.com/HKUDS/DeepTutor

官方文档：https://deeptutor.info


