---
title: '别再一个一个调教 AI Agent 了——Orca 让你同时指挥一支"代码舰队"'
date: 2026-08-12
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-08-12.webp"
    hiddenInList: false
---

**大家好，我是雷达君。**

如果你用过 AI 编程助手，大概率经历过这种"精神分裂"时刻：Claude Code 擅长写架构但总在细节上翻车，Codex 改 bug 快如闪电但重构代码时像个实习生，OpenCode 处理前端一流却对后端逻辑一脸茫然。你不得不在这几个工具之间反复横跳——复制粘贴上下文、重装依赖、切分支、合并冲突，一套操作下来比手写代码还累。心里清楚"工具没问题，是我的工作流太蠢了"，但一想到要把这些 Agent 串起来，又觉得不如自己敲键盘来得快。

这就是 Orca 要解决的问题。它不是一个 AI Agent，而是一个让所有 AI Agent 同时干活的操作系统——想象一下把 Claude Code、Codex、Cursor、Grok 甚至 Pi 全部塞进同一个工作台，每个 Agent 跑在独立的 git worktree 里互不干扰，你只需要像乐队指挥一样敲一下 baton，它们就各自开工。桌面、手机、VPS 都能挂，等于你随身带着一支私人程序员小队。GitHub 42K Star、单日增长 875，这个数据不是在说"又一个热门玩具诞生了"，而是在说"开发者终于找到一个能管住所有 Agent 的办法了"。

## 01 ｜核心逻辑

Orca 的底层设计可以用一句话概括：**把终端里的每个 AI Agent 当成一个独立的"工作单元"，用操作系统级的隔离来托管它们。** 这听起来简单，但市面上大多数 Agent 编排工具走的都是"插件式"路线——在一个主进程里通过 API 调用不同的 Agent，共享同一个文件系统和上下文。这种模式有两个致命缺陷：一是 Agent 之间互相污染（Claude 改过的文件被 Codex 覆盖），二是上下文爆炸（五个 Agent 的输出全部塞进同一个 prompt，模型直接跑偏）。

Orca 的做法完全不同。它在底层为每一个 Agent 创建独立的 git worktree——想象成给每个 Agent 分配了一间装了隔音墙的独立办公室。Agent A 在 worktree A 里改了 200 行代码，Agent B 在 worktree B 里写了一个全新模块，两个 workspace 完全隔离，不存在文件冲突。任务完成后，你打开 diff 对比界面，谁写的什么一目了然，选中最好的那份合并进主分支——就像代码界的"饥饿游戏"，优胜劣汰，效率拉满。

这种架构还天然支持"并行实验"。同一个 prompt 同时喂给五个 Agent，五分钟之后你拿到五份完全不同的方案，而不是一份折衷的平庸结果。更妙的是，因为每个 worktree 走的是 Agent 自带的环境（Claude Code 用你的 Anthropic 订阅，Codex 用你的 OpenAI Key），不存在额外的 API 费用叠加——你付的永远是原本的订阅费，Orca 只是帮你把账本管好。


![Orca](images/01_Orca.png)

## 02 ｜硬核功能盘点

> 🔗GitHub 地址：https://github.com/stablyai/orca

- **并行 Worktree 编排**：这是 Orca 的灵魂功能。一个指令同时分发给多个 Agent，每个跑在自己的 git worktree 里，互不干扰。对比结果后只合并最好的那份，等于给代码加了"多路冗余"。实测同一个 bug 修复任务分给 Claude Code + Codex + OpenCode 三个 Agent，五分钟拿到三套方案，选最优合并只花了 30 秒。
- **Design Mode（设计模式）**：内嵌 Chromium 浏览器，点击页面任意 UI 元素直接抓取 HTML、CSS 和截图，塞进 Agent 的 prompt 里。这意味着你可以指着网页上的一个按钮说"把它改成圆角蓝色"，Agent 不需要你描述它长什么样——它直接"看到了"。前端开发从"我描述、你猜"变成了"我指、你改"。
- **移动端伴侣（Mobile Companion）**：iOS App Store 和 Android APK 双端可用。Agent 跑着跑着卡住了、跑完了、需要确认了，手机上弹通知，你可以远程发 follow-up 指令。通勤路上看一眼进度，睡觉前丢个新任务——不是"能不能做"的问题，而是"做了以后发现回不去了"。
- **SSH Worktrees**：把 Agent 跑在远程强力服务器上，本地只负责发指令和看结果。auto-reconnect + 端口转发全内置，你的 MacBook Air 瞬间变成一台 128 核的炼丹炉。
- **GitHub & Linear 原生集成**：在 Orca 界面里直接浏览 PR、Issue、项目看板，点一下就从任务创建 worktree，审完代码直接在 in-app diff 界面上批注，批注自动喂回 Agent 让它继续改——整个过程不用切窗口。
- **Orca CLI + 终端分屏**：CLI 命令 `orca worktree create`、`snapshot`、`click`、`fill` 可以脚本化一切工作流。终端基于 WebGL 渲染，无限分屏，滚动缓冲区在重启后依然保留——如果你在多个 Agent 之间跳来跳去，这个终端体验比 iTerm 还流畅。
- **25+ CLI Agent 支持**：不仅限于头部选手。Claude Code、Codex、Cursor、Grok、GitHub Copilot、Devin、Qwen Code、Continue……只要能跑在终端里的 Agent，Orca 就能管。甚至支持 Hermes Agent。社区还在不断加新的。


![Orca desktop app running agents in parallel worktrees, with the Orca mobile companion app in the corner](images/02_Orcadesktopapprunningagentsinp.jpg)

## 03 ｜典型场景和避坑

**典型场景一：多方案并行实验 → 择优合并**

你在开发一个新功能，不确定哪种技术方案最优。传统做法是逐个尝试，每一个都要切分支、装依赖、跑测试，半天过去了还在验证第三个方案。用 Orca，一个 prompt 同时发给 Claude Code、Codex 和 OpenCode，三个 Agent 并行在各自的 worktree 里实现。15 分钟后打开 diff 面板，三份代码并排比较——Claude 的架构最清晰，Codex 的性能最好，OpenCode 的边缘情况处理最周全。取 Claude 的骨架 + Codex 的优化 + OpenCode 的兜底，人工缝合只花了 20 分钟。原本半天的工作压缩到 35 分钟。

**典型场景二：远程服务器 Agent 舰队 + 手机监控**

你有一台 64 核的远程开发服务器，但白天在开会、通勤、见客户，没时间坐在电脑前。在服务器上通过 Orca SSH Worktree 跑四个 Agent 并行处理 backlog 里的 bug，手机 App 实时监控进度。哪个 Agent 跑偏了，手机上发一句"别用那个库，换成原生实现"，Agent 收到后自动调整方向。到公司打开电脑，四个 bug 已经修好三个，diff 批注完一键合并。这不是科幻，是 Orca Mobile Companion + SSH Worktrees 的日常。

**避坑指南**

- 第一，并行 Agent 不等于无脑堆数量。超过 5 个 Agent 同时跑同一个复杂任务时，review 的工作量会指数级上升。建议 2-3 个 Agent 并行跑核心任务，其余 Agent 用来验证边缘情况或生成测试用例。
- 第二，Design Mode 的截图质量直接影响 Agent 输出。如果截取的元素太小或 CSS 被压缩，Agent 可能"看错"样式。建议在 2x 分辨率下截取关键 UI 区域，并在 prompt 里补充说明期望的交互逻辑。
- 第三，SSH Worktrees 依赖网络稳定性。如果你的远程服务器在海外，延迟超过 200ms 时 Agent 的交互体验会明显下降。建议就近选择云服务商（阿里云/腾讯云/AWS 同区域），或者用 Tailscale 组网减少跳转。


![Orca desktop with the mobile companion app](images/03_Orcadesktopwiththemobilecompan.jpg)

## 04 ｜上手教程

Orca 的安装出奇简单，没有"先装 Node.js 18+、再配 Python 3.11、最后改 8 个环境变量"这种地狱开局。

**macOS 用户：**
```bash
# 方式一：Homebrew（推荐）
brew install --cask stablyai/orca/orca

# 方式二：直接下载 DMG
# https://github.com/stablyai/orca/releases/latest
```

**Windows / Linux 用户：**
```bash
# Windows: 下载 .exe 安装包
# Linux: 下载 AppImage 或通过 AUR
yay -S stably-orca-bin
```

**安装后三步上手：**

1. **打开 Orca，添加你的 Agent** — 在设置里绑定 Claude Code、Codex 或任何你已经在用的 CLI Agent。Orca 不会重新安装它们，只负责接管。
2. **创建一个 Worktree，输入 prompt** — 点击 "New Worktree"，选择 Agent，输入任务描述。比如："在 React 项目中实现一个带搜索和分页的数据表格组件"。
3. **开启并行模式** — 同一个 prompt 点 "Fan out"，选择多个 Agent。它们会同时开工。你可以在 diff 面板里实时看到每个 Agent 的进度。

**移动端配对（可选但推荐）：**
- iOS: App Store 搜索 "Orca IDE"
- Android: 从 GitHub Releases 下载 APK
- 打开后扫描桌面端的配对二维码即可

## 05 ｜总结

Orca 之所以能在短短时间内冲到 42K Star，不是因为它发明了什么新技术，而是因为它设计了一个正确的抽象层。在过去两年里，AI Agent 生态经历了爆炸式增长——每个大厂都在推自己的 CLI Agent，每个 Agent 都有自己的优势和短板。开发者面临的问题不是"没有好工具可用"，而是"好工具太多了，不知道该用哪个，也没办法一起用"。Orca 做的事情就是把这个问题从"你的事"变成了"它的事"：你只需要决定要做什么，它来帮你决定谁来干、怎么干、干完之后如何验收。

当然，这个项目也有它的边界。它不是 LangChain 那样的开发框架，不帮你写 Agent 逻辑；它也不是 Copilot 那样的代码补全工具。它的定位非常精准：**给已经有 Agent 使用习惯的开发者一个统一的指挥中心**。如果你还是"一个 Claude Code 走天下"的阶段，Orca 的价值对你来说可能还没那么直观。但如果你已经开始在多个 Agent 之间切换、已经感受到"上下文碎片化"的痛苦，那么 Orca 就是那把能把你从混乱中捞出来的梯子。

42K 开发者已经用 Star 投了票。它的好坏不需要我多说——下载下来，开两个 Agent 同时跑一个任务，五分钟之后看看 diff 面板，你自己会有答案。

---
📌 **往期推荐**

- [GitHub 87K Star！RAGFlow——给大模型装上"精准记忆"](https://mp.weixin.qq.com/s/xxx)
- [GitHub 85K Star！Open Design——让 AI 直接生成 PPT、视频和网页](https://mp.weixin.qq.com/s/xxx)
- [GitHub 152K Star！Dify——AI 应用从想法到落地，一个工作台全搞定](https://mp.weixin.qq.com/s/xxx)

如果觉得有用，可以点个 **关注** 和 **推荐**，也欢迎 **转发** 给正在被多个 AI Agent 折磨的朋友。

