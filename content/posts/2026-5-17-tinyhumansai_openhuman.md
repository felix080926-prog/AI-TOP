---
title: '9101 Star！这个叫 OpenHuman 的项目，让 AI 终于"认识你"了'
date: 2026-05-17
draft: false
categories: ["多模态创作"]
tags: ["多模态创作"]
cover:
    image: "covers/2026-05-17.webp"
    hiddenInList: false
---

做 AI 工具最烦的事情是什么？

不是模型不够强，不是推理不够快——而是每次你跟 AI 聊天，它都像第一次见你一样。

"你好，我是 AI 助手，请问有什么可以帮你的？"

这句话我听了一千遍了。上一个对话我还跟它聊过我的项目架构、邮箱里有几封重要邮件、日历上有个明天截止的 deadline——新开一个会话，它全忘了。你又要从头开始喂上下文。

说白了，现在的 AI 就像一个金鱼记忆的同事：每次见面都得重新自我介绍。

但 Karpathy 去年提出了一个有意思的思路——能不能让 AI 有一个"私人知识库"？他把自己的 Obsidian 笔记喂给 LLM，让模型"知道他"再回答问题。

这个思路启发了 tinyhumansai/openhuman 这个项目。它把 Karpathy 的构想工程化成了一款桌面级产品：一个真正认识你的私人 AI。

而且今天 GitHub 上一天涨了 1271 个 star，9101 人已经上车了。

### 01 ｜核心逻辑

OpenHuman 的核心理念其实特别直白：**让 AI 记住你，而不是每次从零开始。**

大多数 AI 助手本质上就是一个聊天窗口 + 一个通用大模型。它们不知道你的邮箱里有什么邮件、不知道你的 GitHub 仓库结构、不知道你下周的会议安排。

OpenHuman 的解法是做一个"AI 本地操作系统"：

1. **自动收集**：连接你的 Gmail、Notion、GitHub、Slack、日历、Drive……
2. **本地压缩**：所有数据以 ≤3K token 的 Markdown 块切割、评分、存成层级摘要树
3. **持续更新**：每 20 分钟主动刷新一次所有连接的数据
4. **随时检索**：AI 在回答你问题之前，先查本地记忆树，带上你的上下文再回答

说白了，它给你的 AI 装了一个"外置大脑"。这个大脑不是云端的，而是存在你本机的 SQLite 里。你的数据不上传、不外泄，完全本地化。

这个思路和当下主流 AI 产品完全相反——别人都在做大而全的云端 AI，OpenHuman 选择做小而精的私人 AI。这个差异化定位，我觉得非常聪明。

### 02 ｜硬核功能盘点

🔗 GitHub 地址：https://github.com/tinyhumansai/openhuman

#### 功能一：自动记忆——Memory Tree + Obsidian Wiki
每 20 分钟自动从你所有连接的服务抓取数据→压缩成 Markdown→存入本地知识库。最骚的是这些 Markdown 文件可以直接在 Obsidian 里打开编辑，等于你拥有了一个**自动更新的个人 Wiki**。

**为什么好？** 别的 AI 需要你手动"喂"上下文，OpenHuman 是自主学习。你每天在做什么、跟谁沟通、写了什么代码，它全知道。而且因为是本地 SQLite 存储，隐私也有保障。

#### 功能二：桌面吉祥物 + Google Meet 参会
一个桌面端的虚拟角色，会说话、有表情、能跟你打招呼。甚至能加入你的 Google Meet 会议，以真实参会者身份出现。

**为什么好？** 这件事听起来有点"中二"，但仔细一想其实很实用——开会的时候 AI 在旁边旁听，会后直接给你总结要点、分配任务。比那些需要手动录屏再转文字的工具顺手多了。

#### 功能三：118+ 第三方集成（一键 OAuth）
Gmail、GitHub、Notion、Slack、Stripe、Jira、Linear……主流 SaaS 基本全覆盖。每个连接都会暴露出一个"类型化工具"给 AI 调用。

**为什么好？** 你不需要写任何 API 调用代码。点一下 OAuth 授权，AI 就能读你的邮件、查你的工单、看你的项目。这才是"AI 助手"该有的体验。

#### 功能四：TokenJuice 智能压缩
所有工具调用结果、抓取页面、邮件内容、搜索结果，在被送入大模型之前都会经过一层压缩。HTML→Markdown、URL 缩短、非 ASCII 字符清理等。

**为什么好？** 官方说能省 80% 的 Token 成本和延迟。这是我个人最期待的功能——用 API 的人都懂，Token 消耗才是真正的"隐形烧钱机"。

#### 功能五：模型路由 + 本地 AI
支持自动将不同任务路由到最合适的模型（推理型、快速型、视觉型），一套订阅全搞定。还支持通过 Ollama 接入本地 AI 做离线任务。

**为什么好？** 不用因为不同任务签不同的 API 账号，也不用所有请求都用最贵的模型。省钱、省心。

### 03 ｜典型场景和避坑

#### ✅ 适合谁

**个人开发者 / 独立创业者**
如果你是一个人在做产品，OpenHuman 能帮你自动消化大量信息。它自动读你的邮件、看你的代码、记你的排期——相当于一个免费的"私人助理"。

**小团队的技术负责人**
团队人少、沟通全靠工具的，把 GitHub + Slack + Jira 接进去，AI 可以自动同步项目状态，不用每天开会对进度。

**写 Obsidian 的重度用户**
很多人手动维护 Obsidian 知识库，OpenHuman 能自动帮你填内容。你只需要做剪裁和编辑。

#### ❌ 不推荐给谁

**不想碰终端的完全小白**
虽然安装有一键脚本，但配置 API Key、连接第三方服务这些步骤，还是需要一定技术背景。

**追求"开箱即用"的企业团队**
目前还是 Early Beta 阶段，官方自己都写了"Expect rough edges"。生产环境使用风险较高。

**对数据隐私极其敏感且不愿信任何第三方**
虽然核心数据存在本地，但 AI 推理还是需要调用云端 API（除非你纯用 Ollama 做本地推理）。如果你连 API 调用都不接受，那这个项目目前还不太合适。

### 04 ｜上手教程

最快 3 分钟跑起来：

**方式一：下载桌面版（推荐）**
去官网 https://tinyhumans.ai/openhuman 下载 DMG（Mac）或 EXE（Win）

**方式二：一键脚本安装**

```bash
# macOS / Linux x64
curl -fsSL https://raw.githubusercontent.com/tinyhumansai/openhuman/main/scripts/install.sh | bash
```

```powershell
# Windows
irm https://raw.githubusercontent.com/tinyhumansai/openhuman/main/scripts/install.ps1 | iex
```

**方式三：开发者模式**

```bash
# 前提：Node.js 24+, pnpm 10.10+, Rust 1.93+
git clone https://github.com/tinyhumansai/openhuman.git
cd openhuman
git submodule update --init --recursive
pnpm install
pnpm dev
```

**基本配置：**
1. 启动后先设置 LLM API Key（支持 OpenAI、Anthropic 等）
2. 在 Settings → Integrations 中点 OAuth 连接你的工具（Gmail、GitHub 等）
3. 等 20 分钟让 Auto-fetch 跑完第一轮
4. 在 Obsidian 里打开生成的知识库目录，看看 AI 给你整理了哪些东西

### 05 ｜总结

OpenHuman 给我的感觉，像是 AI 行业终于有人开始认真思考"AI 怎么才能真正了解一个人"这件事。

市面上绝大多数 AI 工具都在卷推理速度、卷多模态、卷参数——这些当然重要。但回到用户视角，最爽的体验其实是："AI 知道我在干什么，不用我说第二遍。"

OpenHuman 从"让 AI 记住你"这个角度出发，把 Karpathy 的个人知识库 idea 打磨成了可落地的桌面产品。虽然还是 Early Beta 阶段，但这个方向我非常看好——**私人 AI 大概率是下一个爆发点**。

项目地址：https://github.com/tinyhumansai/openhuman
你可以自己去拿。

---

📌 往期推荐

GitHub 22K Star！K-Dense-AI/scientific-agent-skills：一键部署科研 Agent 技能包（文章链接待补充）
GitHub 148K Star！langflow-ai/langflow：可视化搭建 AI 工作流的利器（文章链接待补充）
GitHub 102K Star！supabase/supabase：Postgres 开发平台的 AI 进化之路（文章链接待补充）

如果觉得有用，可以点个 **关注** 和 **推荐**，也欢迎 **转发** 给你身边被 AI 记忆问题困扰的朋友们～