---
title: "给 AI 编程助手装个长期记忆"
date: 2026-10-04
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-10-04.webp"
    hiddenInList: false
---
AI 编程助手的问题，不是不够聪明，是太健忘。Claude Code、Codex 这些工具，每次开新会话都像失忆一样从零开始——上周刚定下来的架构决策、三天前踩过的坑、跟同事约定好的接口方案，全都不见了。你只能一遍遍重新解释，或者把关键上下文硬塞进 prompt 里，越塞越臃肿。

obsidian-mind 干的，就是给这些 AI 助手装一个能跨会话、跨机器存活的"大脑"。它不是新模型，也不是花哨的框架，而是一套做好的 Obsidian 笔记库模板——当成 AI 助手的长期记忆层来用：所有关于目标、项目、决策、人员的信息都存在 Markdown 笔记里，由 AI 自己维护索引和链接，一次会话聊完，下次接着用。

**项目地址：**https://github.com/breferrari/obsidian-mind

![Obsidian Mind 的 standup 与 dump 命令演示](https://raw.githubusercontent.com/breferrari/obsidian-mind/HEAD/obsidian-mind-demo.gif)

它的核心思路是"vault-first"——记忆实体都存在 Obsidian 的双链笔记里，而不是塞进某个 AI 工具的私有配置文件。Claude Code 自带的 MEMORY.md 在这里只是一个"索引"，指向 vault 里的具体笔记位置，本身不存内容。好处很明显：记忆跟着笔记走，换台机器、重装工具，只要这个 vault 还在，记忆就还在，而且是可读、可编辑、可进 git 的普通 Markdown。

真正让它用起来顺手的是内置的一批命令。早上敲一句 `/om-standup`，助手会自动读你的北极星目标、活跃项目、待办任务和最近 git 改动，把一天的上下文铺好；开完会敲 `/om-dump`，把会议内容倒给它，它会自动更新对应的人脉笔记、建决策记录、把成果归档到"brag doc"；一天结束说声 wrap up，它会检查有没有漏记的成果、更新索引。

对隐私和成本敏感的人，还有个加分项：它配了可选的本地语义搜索 QMD，用三个小模型在本地跑 embedding 和重排（最大的也才 1.3GB 左右），不用 API key、不联网、没有按次计费，还能在有 GPU 的机器上自动加速。

## 装起来只要几步

先装 ShardMind（一个 Obsidian vault 模板的包管理器），再让它把 vault 装进一个新文件夹：

```bash
npm install -g shardmind
mkdir my-vault && cd my-vault
shardmind install github:breferrari/obsidian-mind
```

不想用 ShardMind 也可以直接 `git clone https://github.com/breferrari/obsidian-mind.git`。装完把文件夹用 Obsidian 打开，在设置里启用 Obsidian CLI（需要 Obsidian 1.12+），然后在目录里跑 `claude`、`codex` 或 `gemini` 就行。前提是机器上有 Node 22+ 和至少一个 AI 编程助手。

从数据看，这个项目上线以来攒了 4862 Star，今天一天就涨了 732——对这类工具型项目来说增速相当猛，说明"给 AI 助手补记忆"确实戳中了不少人的痛点。它最合适的是那些天天跟 Claude Code、Codex 结对写代码、又受够了每次重开会话都要从头解释背景的开发者；如果你本来就在用 Obsidian 记笔记，这套东西几乎是无缝衔接。想一键即用、完全不碰配置的人，可能还是要等它再成熟一点。
