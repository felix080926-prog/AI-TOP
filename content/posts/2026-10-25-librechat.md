---
title: "一个界面，切换所有主流大模型"
date: 2026-10-25
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-10-25.webp"
    hiddenInList: false
---

AI 工具用到现在，很多人桌面上常年开着好几个标签页：ChatGPT 一个、Claude 一个、DeepSeek 一个，偶尔还得切到 Gemini 或 Grok 看两眼。账号、额度、对话历史各归各的，想拿两个模型对比同一段提示词的效果，得手动复制粘贴。切换成本一高，人就不爱试新模型，最后慢慢被单一供应商锁死。

这个问题的解法，是一个叫 LibreChat 的开源项目——它把 Anthropic、OpenAI、Google、AWS、Azure、DeepSeek、Ollama 等主流大模型接进同一个界面，想用哪个点一下就能切。

**项目地址：**https://github.com/LibreChat-AI/LibreChat

![LibreChat 对话界面](https://www.librechat.ai/_next/static/media/demo_light.f6e232d4.png)

这项目在 GitHub 上已经攒了 4.6 万 Star，昨天一天又涨了 687。热度背后是实打实的功能——它早就不只是一个「ChatGPT 套壳」。

### 不止聊天，是一整套 Agent 平台

LibreChat 把 Agent 生态塞得很满：原生支持 MCP（Model Context Protocol），模型能直接调用外部工具干活；内置 Code Interpreter，在隔离沙箱里跑 Python、Node、Go 等代码，处理文件、生成图表；还有 Artifacts，边聊边预览 React、HTML、Mermaid 代码。想搭专职助手，用它的无代码 Agent 构建器就行，配好了还能按用户或分组分享。

最近一版 v0.8.8 更是加进了一个叫 Lia 的 Agent，官方的说法是「用 LibreChat 来构建 LibreChat」——让 Agent 能读写文件、跑命令，配合人工审批控制，把「能聊」往前推进到「能干」。

![LibreChat 深色主题界面](https://www.librechat.ai/_next/static/media/demo_dark.102d59a6.png)

### 装起来只要几条命令

自托管是它区别于所有闭源聊天服务的核心。装起来很直接，有 Docker 就行：

```bash
git clone https://github.com/LibreChat-AI/LibreChat.git
cd LibreChat
cp .env.example .env
docker compose up -d
```

第一条命令拉镜像可能要等几分钟，跑完浏览器打开 http://localhost:3080 就是登录页。默认的 .env 开箱即用，之后按需在里面填各家模型的 API key，就能接进对应模型。

### 适合谁

对想自己掌控模型入口、又不想被单一厂商绑死的个人或团队，LibreChat 是开源界目前最成熟的答案之一：把自托管门槛压到「Docker 一条命令」，功能密度又不输商业产品。反过来，如果只是偶尔问两句、完全不想碰部署，那它确实不如直接开个网页来得省事。

