---
title: "AI 编程助手接进微信，手机就能改代码"
date: 2026-10-17
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-10-17.webp"
    hiddenInList: false
---
AI 编程助手这两年已经成了很多开发者的标配，Claude Code、Cursor、Codex 这些工具在本地终端里改代码、跑命令、写测试，效率确实高。但它们有个共同的毛病：把人拴在了电脑前。人在外面、在路上、在开会，代码那边出了个 bug、任务跑挂了，只能干等着回家再处理。

cc-connect 要解决的，就是这个「远程指挥」的问题。

**项目地址：**https://github.com/chenhg5/cc-connect

它做的事情很直接：把跑在你本地机器上的 AI 编程助手，桥接到你本来就在用的聊天软件里。飞书、钉钉、Slack、Telegram、Discord、企业微信、LINE，甚至个人微信，一共 13 个平台，大部分都不需要公网 IP。也就是说，你在手机上发一条消息，本地那个 Claude Code 就真的开始干活了——改代码、查问题、跑命令、做自动化任务，结果再以聊天消息的形式回给你。

![cc-connect 架构：本地 Agent 与聊天平台之间的桥接](https://raw.githubusercontent.com/chenhg5/cc-connect/main/docs/images/connector.png)

具体亮点有两个值得一提。

一是支持的 Agent 够全。Claude Code、Codex、Cursor Agent、Kimi CLI、Gemini CLI、Qoder、OpenCode 这些主流的都接好了，还支持 ACP 协议，理论上任何兼容的 Agent 都能挂进来。手上习惯用哪个，基本都能接。

二是「多 Agent 接力」这个设计。在群聊里绑定多个 bot，它们之间可以互相传递消息——比如让 Claude 先给出方案，再让 Gemini 从另一个角度挑毛病，全程就在同一个聊天窗口里完成。这种把多个模型放进一个对话里协作的用法，是单机终端里很难做到的事。

![在飞书里直接指挥本地 AI 编程助手](https://raw.githubusercontent.com/chenhg5/cc-connect/main/docs/images/screenshot/cc-connect-lark.JPG)

其它一些顺手的能力也都有：`/model` 随时切换模型、`/reasoning` 调整推理强度、`/memory` 直接读写 Agent 的记忆文件，甚至能用自然语言设定定时任务——「每天早上 6 点，把 GitHub trending 总结一遍」这种话，它会真的当成 cron 任务跑起来。语音和图片也支持，发条语音或截个图，它自己处理 STT/TTS 和多模态转发。

## 装起来只要几条命令

装它之前，先把想桥接的那个 AI 编程助手装好并登录，比如 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code
claude login
```

然后装 cc-connect 本体：

```bash
npm install -g cc-connect
# 或者 macOS / Linux 用 Homebrew
brew install cc-connect
```

启动：

```bash
cc-connect
```

第一次运行会自动生成 `~/.cc-connect/config.toml`，然后打开 `http://localhost:9820` 的 Web 管理界面，建一个项目、添加平台（飞书 / Telegram / 企业微信……）、填上对应平台的 bot token，保存后热加载生效。接下来给 bot 发消息，它就会转发给本地 Agent 干活。

![在微信里同样能隔空指挥本地 Agent](https://raw.githubusercontent.com/chenhg5/cc-connect/main/docs/images/screenshot/cc-connect-wechat.JPG)

从发布到现在，这个项目已经攒了 1.6 万 Star，今天一天又涨了 300 多。热度背后是真实的需求：越来越多人开始把 AI 编程助手当成日常生产力，而「人在外面也能指挥它干活」这件事，恰好补上了终端模式最别扭的一块。

对个人开发者来说，它把「远程改 bug」变成了一条聊天消息；对习惯用飞书、微信办公的团队来说，等于给本地 AI 助手开了一个随时在线的入口。方向上看，把 AI Agent 从电脑终端解放出来、接进人本来就常用的沟通工具里，这个思路大概率会越来越主流。
