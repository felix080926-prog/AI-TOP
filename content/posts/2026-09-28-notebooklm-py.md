---
title: "这个库把 NotebookLM 全撬开了"
date: 2026-09-28
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-09-28.webp"
    hiddenInList: false
---
Google 的 NotebookLM（今年 7 月已经改名叫 Gemini Notebook）是个很强的工具：把一堆文档、链接、PDF 丢进去，它能自动写摘要、列大纲，甚至直接生成一档播客。但它的网页版有个毛病——几乎所有操作都只能靠鼠标点，写不进脚本，也没法自动化。

对每天都要用的人来说，手动点来点去就是浪费时间；更别说想把它接进 Agent 流程里，网页 UI 从头到尾都没给你留接口。

notebooklm-py 干的就是这件事：用 Python 把 NotebookLM 的能力全部程序化，包括网页版里藏着、压根不开放给普通用户的那些功能。

**项目地址：**https://github.com/teng-lin/notebooklm-py

![notebooklm-py 项目 Logo](https://raw.githubusercontent.com/teng-lin/notebooklm-py/main/notebooklm-py.png)

它不是简单包了一层 API，而是一整套工具链：Python SDK、命令行 CLI、MCP server，外加给 AI Agent 用的 skill。最关键的是，它走的是 Google 没公开的内部接口——官方 UI 里点不到的操作，在代码里能直接调出来。

挑两个比较实在的点说。

**第一，能挂到 Agent 上当技能用。** 装完之后，Claude Code、Codex、OpenClaw 这类编程 Agent 可以直接操控 NotebookLM：建笔记本、导资料、跑查询、下载产物，全程不用开网页。对想把知识库自动化接进流水线的人来说，这是补上了最后一块手动拼图。

**第二，CLI 和 MCP 双通道都通。** 想在脚本里批量建笔记本、加来源、生成报告，一条命令就够；想让别的 MCP 客户端调用，它也能当 server 跑。这套东西在 GitHub 上已经攒了 1.9 万 Star，今天还在涨 700 多，说明确实有一批人被「网页版太慢」卡住过。

![notebooklm-py CLI 命令行演示](https://asciinema.org/a/767284.png)

### 装起来只要几步

官方推荐用 uv 或 pipx 装成命令行工具，带浏览器自动化能力的版本：

```
uv tool install "notebooklm-py[browser]"
notebooklm login
notebooklm auth check --test --json
```

想当普通库用，一句 `pip install notebooklm-py` 就够了。要给 Claude Code 装技能，跑 `notebooklm skill install`，或者 `npx skills add teng-lin/notebooklm-py` 从开放技能生态直接拉。

建个笔记本试试水：

```
notebooklm create "My Research"
notebooklm source add "https://en.wikipedia.org/wiki/Artificial_intelligence"
notebooklm source add "./paper.pdf"
```

最后提醒一句：这个库用的是 Google 未公开的接口，随时可能变动，官方也标了「非官方库，风险自负」。它最适合两类人——想把 NotebookLM 塞进自动化流水线的开发者，和嫌网页操作太慢、想让 Agent 接管知识库的人。如果只是偶尔开网页用一下，那倒不必急着折腾。
