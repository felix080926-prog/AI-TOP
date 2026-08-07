---
title: "GPT、Claude、DeepSeek 随意切：一个开源网页搞定所有 AI"
date: 2026-08-07
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-08-07.webp"
    hiddenInList: false
---

**大家好，我是雷达君。**

你有没有过这种体验：为了用 Claude，得开一个网页；为了用 GPT，得再开一个；想用 Gemini，又得换一个。想跑个代码，还得再切到另一个工具。你的 AI 工具散落在各个浏览器标签页里，一个助手干一件事，谁都不认识谁。

如果有一个工具，能把所有这些 AI——GPT、Claude、Gemini、DeepSeek、本地 Ollama——**全部塞进一个界面里**，还能让它们共享记忆、调用工具、执行代码、甚至互相协作呢？

今天雷达君要安利的这个开源项目，干的就是这件事。它是一个**增强版 ChatGPT 克隆**，但远不止“克隆”——它把整个 AI 生态里你能想到的能力，全部打包进了一个自托管的 Web 应用里。

它就是——**LibreChat**。

## 01 ｜核心逻辑：不是你换 AI，是 AI 围着你转

LibreChat 的核心理念用一句话就能说清楚：**不要为了用 AI 而切换工具，让所有 AI 为你所用**。

传统的 AI 使用方式是什么？你要用 ChatGPT，打开 ChatGPT 网页；要用 Claude，打开 Claude；要用 Gemini，再开一个。每个工具都有自己的界面、自己的对话历史、自己的配置。你在 A 里跟 AI 聊了一半的话题，到 B 里得从头再解释一遍。

LibreChat 换了一套完全不同的打法：**一个界面，通吃所有 AI**。

你在同一个对话界面里，可以随时切换模型——这一轮用 GPT-4o，下一轮切到 Claude，再下一轮换成本地 Ollama。对话历史、系统提示词、文件上传、工具调用，全部无缝衔接。你不需要重新开窗口，不需要复制粘贴对话记录，不需要适应不同 UI。

**LibreChat 不生产模型，它让所有模型围着你转**。

## 02 ｜硬核功能盘点

> 🔗 **GitHub 地址**：https://github.com/danny-avila/LibreChat

### 1. AI 模型“全家桶”：20+提供商，想用哪个用哪个

LibreChat 支持的 AI 提供商清单长得像一份行业名录：

- **海外巨头**：OpenAI（GPT-4o、GPT-5、o1）、Anthropic（Claude）、Google（Gemini、Vertex AI）、AWS Bedrock、Azure OpenAI
- **国内力量**：DeepSeek、Qwen
- **开源本地**：Ollama、Apple MLX、koboldcpp
- **聚合平台**：OpenRouter、Groq、Cohere、Mistral AI、Perplexity、together.ai
- **自定义端点**：任何兼容 OpenAI API 的服务

你不需要为每个模型单独注册、单独配置。在 LibreChat 里配一次，所有模型随时切换。

### 2. 代码解释器：沙箱里跑代码，安全不炸机

让 AI 直接执行代码？听起来很危险。LibreChat 的代码解释器（Code Interpreter）把所有代码执行都关进了**ClickHouse 的沙箱里**。

支持**Python、Node.js (JS/TS)、Go、C/C++、Java、PHP、Rust、Fortran**等 8 种语言。你上传文件，AI 处理完，你再下载结果——全程在隔离环境里运行，你的主机毫发无伤。

### 3. Agent + MCP + Skills：给 AI 装上“手”和“工具”

LibreChat 的 Agent 系统可能是它最被低估的能力：

- **零代码创建 Agent**：在 UI 里点几下，就能创建专属 AI 助手
- **Agent Marketplace**：社区已经有一堆现成的 Agent 可以直接用
- **Skills**：可复用的`SKILL.md`指令包，手动触发或自动运行
- **Subagents**：主 Agent 可以派子 Agent 去干专门的活，各自有独立的上下文窗口
- **MCP 协议支持**：LibreChat 是官方认证的 MCP 客户端之一，可以连接外部工具和数据源

**你的 AI 不再只是“聊天”，它能真正“干活”了。**

### 4. 网页搜索 + 代码 artifacts + 图像生成

LibreChat 还把 AI 生态里最热门的功能全部内置了：

- **网页搜索**：AI 自动上网搜索，结合 Jina Reranking 优化结果
- **Code Artifacts**：在聊天里直接生成 React 组件、HTML 页面、Mermaid 流程图
- **图像生成**：支持 GPT-Image-1 和 DALL-E-3，文生图、图生图全支持

**一个应用，覆盖了聊天、编程、搜索、绘图全部场景。**

### 5. 多用户 + 安全认证：团队也能用

LibreChat 不是单机玩具。它内置了**安全的多用户认证系统**，支持团队协作。每个用户有自己的对话历史、自己的配置预设、自己的 Agent。你可以把 Agent 分享给特定用户或群组。

## 03 ｜横向对比

在“自托管 AI 聚合平台”这个赛道里，LibreChat 和同类项目的定位有明显差异：

| 维度           | **LibreChat**                   | **Open WebUI**    | **Lobe Chat**     |
| :------------- | :------------------------------ | :---------------- | :---------------- |
| **核心定位**   | 增强版 ChatGPT 克隆 + AI 全家桶 | 本地模型 Web 界面 | 多 Agent 工作空间 |
| **模型支持**   | 20+提供商（含国内模型）         | 主推本地 Ollama   | 70+模型           |
| **代码解释器** | ✅ 8 种语言沙箱执行             | ❌                | ❌                |
| **Agent 系统** | ✅ 零代码创建 + Marketplace     | ❌                | ✅ Agent Builder  |
| **MCP 支持**   | ✅ 官方认证客户端               | ❌                | ✅                |
| **多用户**     | ✅ 安全认证 + 团队协作          | ⚠️ 基础           | ❌                |
| **网页搜索**   | ✅ Jina Reranking               | ✅                | ❌                |
| **Artifacts**  | ✅ React/HTML/Mermaid           | ❌                | ❌                |
| **部署难度**   | 中等（Docker 一键）             | 低                | 中等              |

**简单说：Open WebUI 是“本地模型聊天室”，Lobe Chat 是“多 Agent 工作区”，LibreChat 是“把 ChatGPT、Claude、代码解释器、Agent、搜索、绘图全部塞进一个自托管应用里的全家桶”** 。

## 04 ｜典型场景和避坑

**适合谁用？**

- **同时使用多个 AI 模型（GPT+Claude+DeepSeek）的开发者/团队**：一个界面通吃所有模型，不用来回切换
- **需要 AI 执行代码但担心安全问题的场景**：沙箱隔离执行，安全可控
- **想构建自己的 AI Agent 但不想写代码的产品/运营人员**：零代码创建 Agent，点几下就行
- **对数据主权有要求的个人/团队**：完全自托管，所有数据留在自己服务器上
- **想在一个应用里完成聊天+编程+搜索+绘图的全能型用户**

**不推荐给谁？**

- **只需要一个简单聊天窗口、不需要多模型切换的用户**：直接用 ChatGPT 网页版可能更轻量
- **完全不想自己部署和维护服务器的非技术用户**：LibreChat 虽然提供 Docker 一键部署，但毕竟是自托管系统
- **只想用纯本地模型、不需要任何云端 API 的场景**：Ollama + Open WebUI 可能更轻量

## 05 ｜快速上手指南（3 分钟）

LibreChat 的部署极其简单，官方提供了完整的 Docker Compose 方案。

**第 1 步：克隆仓库**

```bash
git clone https://github.com/danny-avila/LibreChat.git
cd LibreChat
```

**第 2 步：复制环境配置**

```bash
cp .env.example .env
```

编辑`.env`文件，填入你使用的 AI 提供商的 API Key。

**第 3 步：Docker Compose 一键启动**

```bash
docker-compose up -d
```

等待容器启动后，浏览器打开`http://localhost:3080`即可访问。

> 如果网络环境有限制，可以参考官方文档配置国内镜像源。

## 06 ｜总结

LibreChat 解决了一个被很多人习以为常但极其低效的问题：**你的 AI 工具散落在不同网页里，每次切换都是一次“上下文切换”的成本**。

你用 GPT 写文案，用 Claude 写代码，用 Gemini 做分析——三个任务、三个工具、三个窗口。你的思路被切得七零八落。

LibreChat 的答案是：**把所有 AI 塞进一个地方，让它们围着你转**。

20+模型提供商、8 种语言沙箱代码执行、零代码 Agent 创建、MCP 协议支持、网页搜索、Code Artifacts、图像生成、多用户认证——它把你能想到的所有 AI 能力，全部打包进了一个自托管的 Web 应用里。

安装包和完整代码都在 GitHub 上：https://github.com/danny-avila/LibreChat

官方文档：https://librechat.ai/docs


