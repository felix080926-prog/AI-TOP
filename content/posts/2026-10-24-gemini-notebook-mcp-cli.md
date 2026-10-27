---
title: "AI 智能体直接调用 Gemini 笔记"
date: 2026-10-24
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-10-24.webp"
    hiddenInList: false
---

Gemini 笔记（就是原来的 Google NotebookLM）这两年口碑不错：把文档、网页、视频丢进去，能生成摘要、问答、播客，甚至做出带引用来源的研究简报。但它一直有个别扭的地方——所有操作都得在网页里点，既写不进脚本，也没法让 AI Agent 替你去跑一遍。

这个项目把这条路打通了：给 Gemini 笔记做了一套命令行工具、一个 MCP 服务器，还有一份给 AI 用的技能包，让笔记内容能真正进自动化流水线。

**项目地址：**https://github.com/jacob-bd/gemini-notebook-mcp-cli

![Gemini Notebook MCP Header](https://raw.githubusercontent.com/jacob-bd/gemini-notebook-mcp-cli/HEAD/docs/media/header.jpg)

能做什么，一句话说清楚：原来只能在网页上完成的「建笔记、加资料、生成播客、查报告、导出音频」，现在都能用命令、或让 AI 客户端直接调。它提供三种接入方式——CLI 敲命令、MCP server 挂给 AI 客户端、agent skills 让智能体自己调用，能接 Claude Code、Codex、Gemini CLI、Cursor、Windsurf、Cline 这些主流工具。

具体到能力，它暴露了 53 个 MCP 工具，从基础的列笔记（`nlm notebook list`）、加资料（`nlm source add`），到进阶的生成播客（`nlm audio create`）、做视频和幻灯片（`nlm studio create`）、查交互式报告（`nlm report get`），再到多步工作流（`nlm pipeline`）和跨笔记查询（`nlm cross query`）。也就是说，它不只是「读写一条笔记」，而是把整个笔记工作流都变成了可编程的接口。

![Claude Cowork 与交互式报告演示](https://img.youtube.com/vi/UXxqTpNNGt0/mqdefault.jpg)

装起来也不复杂，三步就能跑通：先用 `uv tool install notebooklm-mcp-cli` 装上 CLI 和 MCP server，再 `nlm login` 登录 Google 账号，最后 `nlm setup` 走一个交互向导——它会自动检测本机装了哪些 AI 工具，帮你把 MCP 和技能包接好，不用手写配置文件。

![Codex 接入演示](https://img.youtube.com/vi/KrgLCrvU1dw/mqdefault.jpg)

这个项目今天涨了 610 个 Star，总 Star 数 6384，属于 GitHub 上增长很快的那一档。有一点要如实说：它调的是 Gemini 笔记的非官方内部接口，没有正式支持，接口随时可能变，还涉及从浏览器提取 cookie，官方服务条款未必认可。所以它更适合自己折腾、做自动化的人；看重官方支持、稳定性优先的生产环境，可以先观望。

