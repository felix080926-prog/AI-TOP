---
title: '一键把任何网站"反编译"成 Next.js 代码，AI 帮你重写整个项目'
date: 2026-06-25
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-06-25.webp"
    hiddenInList: false
---

**大家好，我是雷达君。**

你看中了一个网站的布局和交互，想参考它的设计思路自己写一个。F12 打开开发者工具，面对满屏的 CSS 类名、压缩过的 JS、嵌套了十几层的 div——你想参考的只是一小段样式，却要在一堆乱麻里翻半天。

你需要的不是“扒站”，而是**把别人的设计“翻译”成你能读懂的代码**。

今天雷达君要安利的这个开源项目，就是干这个的。你给它一个网址，它用 AI Agent 自动完成：截图分析 → 设计 Token 提取 → 组件规格拆解 → 多 Agent 并行重构，最后输出一份完整的 Next.js 项目。

它就是——**AI Website Cloner Template**。

## 01 ｜核心逻辑：把“看网页”变成“反编译网页”

传统的“扒站”工具，本质是**下载**——把 HTML、CSS、JS、图片原封不动地拖到你的硬盘上。你拿到的是压缩混淆后的生产代码，几乎不可读、不可改。

AI Website Cloner 做的不是下载，是**反编译**。

它把你的目标网站当成一个“二进制可执行文件”，然后用 AI Agent 把它逆向工程回一份**结构清晰、可维护、可扩展的源代码**。

具体来说，它的工作流程分为五个阶段：

**阶段一：侦察（Reconnaissance）** —— AI Agent 打开目标网站，截图、提取设计 Token、滚动、点击、悬停、切换响应式模式，像人类设计师一样“观察”整个页面。

**阶段二：基础搭建（Foundation）** —— 更新字体、颜色、全局样式，下载所有图片和视频资源。

**阶段三：组件规格拆解（Component Specs）** —— 这是最关键的一步。AI 会把页面拆成一个个独立组件，为每个组件生成一份详细的规格文档（`docs/research/components/`），包含精确的`getComputedStyle()`数值、交互状态、响应式断点和资源路径。

**阶段四：并行构建（Parallel Build）** —— 在 Git Worktree 中同时派出多个 Builder Agent，一个负责 Header、一个负责 Hero、一个负责 Features……各自独立并行开发。

**阶段五：组装与质检（Assembly & QA）** —— 合并所有 Worktree，组装完整页面，与原始网站做视觉 Diff 比对。

**一句话总结：这不是“复制粘贴”，而是“反编译重构”。**

## 02 ｜硬核功能盘点

🔗 **GitHub 地址**：https://github.com/JCodesMore/ai-website-cloner-template

**1. 零样本克隆：一个命令，全自动完成**

你不需要写任何代码，不需要配置任何爬虫规则。只需要在项目根目录启动你的 AI Agent（推荐 Claude Code），然后输入一条命令：

```
/clone-website
```

AI Agent 会自动完成从侦察到组装的全流程。

**2. 多 Agent 并行重构：一个人干不完的活，交给一群 AI**

这是这个项目最硬核的设计。传统的“扒站”工具是单线程的，拿到 HTML 就结束了。AI Website Cloner 在组件规格拆解完成后，会派出**多个 Builder Agent 并行工作**——每个 Agent 负责一个独立的组件或区块，在各自的 Git Worktree 里开发，互不干扰。最后再统一合并、质检。

这种“多 Agent 并行”的模式，让重构速度从“小时级”降到了“分钟级”。

**3. 开箱即用的技术栈：Next.js 16 + shadcn/ui + Tailwind v4**

克隆完成后，你拿到的是一个完整的、可直接运行的 Next.js 项目：

- **Next.js 16** — App Router + React 19 + TypeScript 严格模式
- **shadcn/ui** — Radix 原语 + Tailwind CSS v4
- **Tailwind CSS v4** — oklch 设计 Token
- **Lucide React** — 默认图标库（克隆过程中会被提取的 SVG 替换）

你不需要从零搭建项目结构，模板已经帮你准备好了所有配置。

**4. 11+ AI Agent 全兼容**

项目原生支持 Claude Code、Codex CLI、OpenCode、GitHub Copilot、Cursor、Windsurf、Gemini CLI、Cline、Roo Code、Continue、Amazon Q、Augment Code、Aider 等主流 AI 编程工具。你用什么顺手就用什么。

> **现实摩擦提醒**：项目 README 明确推荐使用**Claude Code + Opus 4.7**以获得最佳效果。用其他模型可能效果会打折扣，尤其是在组件规格拆解和并行构建阶段——小模型很难稳定地生成精确的`getComputedStyle()`数值和交互规格。

**5. 使用场景极其清晰**

项目 README 直接列出了三个核心适用场景：

- **平台迁移**：把 WordPress、Webflow、Squarespace 的网站迁移到现代化 Next.js 代码库
- **源码丢失**：网站还在线，但源代码丢了、开发者走了、技术栈太老了——把代码“拿回来”
- **学习参考**：拆解生产级网站的布局、动画和响应式行为，看真实的代码是怎么实现的

**6. 明确的“禁止事项”——反而增加了可信度**

这个项目的 README 里有一节叫“Not Intended For”（不适用场景），明确列出了三条红线：

- **不得用于钓鱼或冒充**——不能用来做欺骗性用途
- **不得将他人设计据为己有**——Logo、品牌资产、原创文案属于原所有者
- **不得违反服务条款**——部分网站明确禁止爬取或复制，使用前先确认

> 这节“禁止事项”出现在一个主打“克隆网站”的项目里，反而显得特别坦诚、特别可信。它不是鼓励你侵权，而是给你一把“反编译”的工具，至于怎么用，是你的选择和责任。

## 03 ｜横向对比

AI Website Cloner 和 Crawl4AI 都能“处理网页”，但两者的定位完全不同：

| 维度         | **AI Website Cloner**                     | **Crawl4AI**                 |
| :----------- | :---------------------------------------- | :--------------------------- |
| **核心定位** | 网站反编译 → 生成可运行代码               | 网页内容提取 → 生成 Markdown |
| **输出**     | **完整的 Next.js 项目**（可运行、可修改） | Markdown 文本（供 LLM 阅读） |
| **工作流**   | 多 Agent 并行重构（5 阶段流水线）         | 单次爬取+转换                |
| **技术栈**   | Next.js 16 + shadcn/ui + Tailwind v4      | 无固定输出格式               |
| **最佳场景** | 源码丢失、平台迁移、学习参考              | RAG、LLM 数据分析            |
| **输出形态** | 代码（可部署、可维护）                    | 文本（仅供阅读）             |

**简单说：Crawl4AI 帮你“读懂”网页，AI Website Cloner 帮你“重写”网页。**

## 04 ｜典型场景和避坑

**适合谁用？**

- **网站源码丢失、只剩线上版本的项目负责人**：用 AI Website Cloner 把线上版本反编译回可维护的代码
- **想把 WordPress/Webflow/Squarespace 站点迁移到现代技术栈的团队**：不用从零重写，AI 帮你完成 80%的迁移工作
- **想学习生产级网站实现细节的开发者**：直接“拆解”真实网站的布局和交互，看代码是怎么写的
- **需要在短时间内复刻某个设计风格的快速原型团队**：把目标网站克隆下来作为起点，再在此基础上修改

**不推荐给谁？**

- **只想提取网页文字内容做 RAG 的个人开发者**：用 Crawl4AI 更轻量、更快
- **完全不懂 Next.js 和 React 的技术小白**：克隆出来的项目是完整的 Next.js 代码库，需要有一定的前端基础才能理解和修改
- **用于侵权或欺骗性目的**：项目 README 明确写了“不得用于钓鱼、冒充或违反服务条款”

## 05 ｜快速上手指南（5 分钟）

AI Website Cloner 的使用方式和其他 AI 编程项目完全不同——**它不是让你下载一个软件，而是让你生成一个属于你自己的项目副本**。

**第 1 步：从模板创建你的仓库**

在 GitHub 页面上点击**Use this template**按钮，然后选择**Create a new repository**。给你的新仓库起个名字，选择公开或私有，点击创建。

> ⚠️ **重要**：必须用“Use this template”创建你自己的副本，不要直接 clone 这个模板仓库。

**第 2 步：克隆你的新仓库到本地**

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-NEW-REPOSITORY.git
cd YOUR-NEW-REPOSITORY
```

**第 3 步：安装依赖**

```bash
npm install
```

**第 4 步：启动 AI Agent 并运行克隆命令**

```bash
# 推荐使用Claude Code
claude --chrome

# 然后在AI对话中输入
/clone-website
```

**第 5 步：输入目标 URL，等待完成**

AI Agent 会问你目标网站是什么，输入 URL 后它会自动完成侦察 → 拆解 → 并行构建 → 组装的全流程。

**验证安装成功**：克隆完成后，运行`npm run dev`启动开发服务器，浏览器打开`http://localhost:3000`。如果能看到与目标网站高度一致的页面，说明克隆成功。

## 06 ｜总结

AI Website Cloner 解决的是一个非常真实、非常痛的问题：**代码丢了怎么办？**

外包团队跑了、服务器被锁了、开发者离职了、WordPress 后台密码找不回来了——这些场景在现实世界里每天都在发生。你除了能在浏览器里访问自己的网站之外，什么都做不了。

AI Website Cloner 给你的不是“扒下来的 HTML 文件”，而是一份**完整的、可维护的、可扩展的 Next.js 源代码**。它用 AI Agent 做侦察、拆规格、并行重构，把“反编译”这件事从“不可能”变成了“一条命令”。

这不是在鼓励侵权，而是在给你一把“在合法前提下拿回自己代码”的工具。


