---
title: "“鲸鱼兄弟”一夜爆火：DeepSeek专属Agent，性价比拉满"
date: 2026-05-06
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-05-06.webp"
    hiddenInList: false
---

大家好，我是雷达君。

先给你讲个故事。

五一期间，有个美国独立开发者叫 Hunter Bown，在 X 上发了一条中文帖。他自称“鲸鱼兄弟”，说自己是 DeepSeek 的爱好者，做了个终端里的编程 Agent，求各位大佬“扩散一下”。

最骚的操作在最后——他坦白这段话是用 **DeepSeek 翻译成中文的**。

结果呢？那条帖冲到 37 万次浏览，中文技术圈当场围观。项目 Star 数同步暴涨，直接登上 GitHub 热榜。

大家一起在笑什么？不是笑代码有问题。而是笑一个老美，为了把好东西推给国内程序员，用 AI 学中文黑话的样子，笨拙得有点可爱。

后来，Hunter 发帖说这是他人生中最疯狂的两天，用中文对“鲸鱼兄弟们”表示感谢。

回到项目本身。

我们一直在用 Claude Code，也知道它有多牛。但如果——你的主力模型换成 DeepSeek V4 呢？

DeepSeek 也有自己的专属 Coding Agent 了。

**名字简单粗暴，就叫 DeepSeek-TUI。**

今天雷达君要安利的，就是这款五一期间在 GitHub 上冲上热榜的开源项目。它不是简单套壳，而是一整套**终端原生的 DeepSeek 编程智能体方案**。

它就是——**DeepSeek-TUI**。

## 01 ｜核心逻辑

一句话总结：**Claude Code 的形态，DeepSeek 的内核**。把你平时在 Claude Code 里干的那些活——读写文件、跑 shell、管 git、搜网页、调子 Agent——原封不动搬到 DeepSeek 上。

但 DeepSeek-TUI 不只是“换个模型”。

它在设计上做了一件事：**DeepSeek 便宜，那我就把事情做多、做快。**

DeepSeek V4 的 API 定价约是同类 Claude/GPT 模型的 **1/20**，对中文 token 的计量也更友好。DeepSeek-TUI 把“便宜”这个特点玩出了花——多开子 Agent、并行跑任务、长上下文不心疼。这些在 Claude 上要精打细算的操作，在 DeepSeek-TUI 上，随便用。

**一句话：不是“把 Claude 换成 DeepSeek”，而是“DeepSeek 能怎么玩出花儿”。**

## 02 ｜硬核功能盘点

从设计逻辑到功能细节，DeepSeek-TUI 全程围绕 DeepSeek 的特性在打造。

🔗 **GitHub 地址**：https://github.com/Hmbown/DeepSeek-TUI

**1. 百万 Token：整个仓库直接塞进去**

DeepSeek V4 原生支持**100 万 token 上下文窗口**。100 万 token 是什么概念？一个中大型前端项目大约 5-10 万 token。也就是说，你可以直接把整个仓库完整塞进去，不用压缩、不用切片、不用摘要，模型直接看到全貌。

当你让 AI 重构一个跨模块功能时，它能读到项目里每一个角落的代码，不该动的地方绝对不动。这带来的不是“更好一点”，而是质变。

更妙的是，当上下文将近填满时，TUI 会自动压缩内容，且压缩策略专门适配了 DeepSeek 的**前缀缓存机制**——尽量保住前面稳定的部分，让缓存继续命中。

**2. 思维链实时可见：像追剧一样“看”模型怎么思考**

用过 DeepSeek 网页版的都知道，它推理时会输出一段简短的“我分析了巴拉巴拉”。DeepSeek-TUI 把这个能力彻底拉满——**模型的每一步推理过程，实时流式输出到终端里**。它怎么分析问题、走了哪条路、中途改没改主意，全部实时可见。

你不再对着一个黑盒 AI 盲猜，而是能跟着它的思路一起走，像追剧一样“看”模型怎么思考。

**3. RLM：把作业拆给全班同学做**

这是 DeepSeek-TUI 最具杀伤力的功能，没有之一。

RLM 的全称是 **rlm_query**，内置这个工具能并行调度 **1~16 个低成本 Flash 子任务**，用来做批量分析、并行推理、任务拆解。Flash 的输出价格大约是 Pro 的三分之一。主模型指挥一群“小学生”干活，然后把结果汇总回来。

举个例子：你有一百个函数的代码要批量重构。传统做法——单个模型一个个处理和重构。现实是跑一半它就累了，每个函数的处理质量参差不齐。

有了 RLM——把 100 个函数同时分给 10 个 Flash“同学”，大家分头写，写完统一交上来。主模型最后审阅一下整体方案即可。时间从几十分钟缩到几分钟，总成本还更低。

把所有不需要强推理的活儿，全部交给“便宜量又足”的 Flash 去跑，把 Pro 的 Token 省下来干最关键的架构判断。这是真正把“便宜”玩出了花。

**4. 三档操作模式：Plan / Agent / YOLO**

- **Plan 模式**：只读探索，AI 能读取文件、分析代码，但不会做任何修改。适合代码审查和架构分析。
- **Agent 模式**（默认）：交互审批。每次工具调用都会停下来等你确认（Y/N），适合重要任务，不想让 AI 失控。
- **YOLO 模式**：全自动放行，批一次，AI 一直跑到任务完成。适合简单重复任务。

这三个模式覆盖了从“谨慎探索”到“全自动执行”的全部场景，用 Shift+Tab 还可以一键切换 reasoning effort 等级。

**5. 会话保存 + 独立 Git 快照**

这是谁说“用 AI 最怕代码被搞乱”的定心丸。

DeepSeek-TUI 会创建一个独立的 side-git 仓库，在每一轮对话前后自动打快照。任何时候输入 `/restore`，就可以按轮次回滚——**完全不影响你原仓库的 `.git`**。

会话也可以随时存档，后续随时恢复。遇到复杂任务做到一半要下班？存档，明天继续。

**6. 实时成本追踪 + 缓存命中显示**

DeepSeek-TUI 内置了**实时成本追踪**功能。每回合和每会话的 token 用量、预估费用、缓存命中率，全部实时显示在 TUI 界面上。

<aside class="highlight">但你要特别留意一个“省钱陷阱”。未命中的 token 价格是命中的 **10 倍**。如果子 Agent 开得太多、每次会话的新内容过多、前缀频繁变动，缓存命中率下降，哪怕单次请求的 token 量不大，总开销也会成倍增加。项目界面上有逐轮费用显示，跑长会话建议多看一眼成本模块，别跑完账单吓一跳。</aside>

**7. 更多亮点**

- **完整工具集**：文件读写、Shell 执行、Git 操作、网页搜索、apply-patch、子 Agent、MCP 服务器——Claude Code 能干的，它全能干。
- **Skills 技能系统**：支持可组合、可安装的指令包，从 GitHub 直接拉，无需后端服务。
- **Rust 编写，单二进制**：不需要 Node.js 或 Python 运行时，性能极致。
- **HTTP/SSE 运行时 API**：支持 Headless Agent 工作流，可集成到现有 CI/CD 流水线。
- **本地化 UI**：内置中文、英文、日文、葡语界面，自动检测系统语言。

## 03 ｜典型场景和避坑

**适合谁用？**

- **DeepSeek V4 的用户**：这是目前体验 DeepSeek V4 实时推理和 1M 上下文最强的方式，没有之一。
- **深度依赖终端开发的程序员**：在 terminal 里干活的嵌入式 AI，Vim/Neovim 用户用了就回不去。
- **批量任务驱动的团队或个人**：并行 16 个 Flash 子任务，批量处理的效率翻倍。
- **预算有限但需要大容量推理的个人开发者**：DeepSeek V4 的价格 + Flash 并行调度的成本优势，性价比极高。

**不推荐给谁？**

- **习惯了 Cursor/Windsurf 图形界面且不想折腾的用户**：DeepSeek-TUI 是纯键盘操作，需要适应终端工作流。
- **需要实时预览代码运行效果（如前端热更新）的场景**：终端里没法可视化，还是得配合编辑器。
- **国内网络环境不稳定的用户**：调用 DeepSeek 官方 API 可能需要代理，虽然有镜像和 TUNA 解决方案，但还是有额外成本。

## 04 ｜快速上手指南（3 分钟）

DeepSeek-TUI 支持多种方式安装，这里选最常用的 npm 方式：

**1. 全局安装（推荐）**

```bash
npm install -g deepseek-tui
# 国内用户使用镜像加速
npm install -g deepseek-tui --registry=https://registry.npmmirror.com
```

**其他安装方式**：

- **Cargo**（无需 Node）：`cargo install deepseek-tui deepseek-tui-cli --locked`
- **Homebrew**（macOS）：`brew tap Hmbown/deepseek-tui && brew install deepseek-tui`
- **直接下载**：从 GitHub Releases 下载对应平台的预编译二进制

**2. 配置 API Key**

```bash
deepseek auth set --provider deepseek
# 输入你的 DeepSeek API Key
```

**3. 验证环境**

```bash
deepseek doctor
```

**4. 启动交互式 TUI**

```bash
# 进入你的项目目录
cd /path/to/your/project
deepseek
```

首次启动会自动检测项目结构，进入交互式 TUI 界面。

**给国内用户的特别照顾**：作者专门写了中文版 README，还支持 TUNA Cargo 镜像。如果 npm 或 GitHub 慢，通过 Cargo + TUNA 镜像安装是最稳妥的选择。

## 05 ｜总结

回头看刚才那个故事。

一个美国开发者，用 DeepSeek 写中文推广自己的作品，反倒让这个项目在中国技术圈率先炸了。有意思的地方在于——他不是因为“技术最强”才火，而是因为“态度对了”。

DeepSeek-TUI 这个项目也是如此。

它不是要把 Claude Code 比下去，而是用自己的方式——“便宜模型多发挥，贵模型省着用”，用最平易近人的方式，让国内开发者第一次感受到顶级的终端 AI 编程体验。

你把整个仓库打包扔进去能跑通，实时看 AI 推理过程能跟住，并行开一堆子 Agent 还不怕账单。这些能力在其他工具里也有，但在 **DeepSeek V4 + 1M 上下文 + RLM 并行 + 超低价格** 的组合下，体验才叫真正顺滑。

如果你还在不同 AI 模型之间反复比较犹豫，或者纠结 Claude Code 的高昂成本，DeepSeek-TUI 就是那个让你彻底放心的选择。被 Claude Code 高昂的 API 账单吓跑过的兄弟，不妨从这个“AI 军团”开始试试。