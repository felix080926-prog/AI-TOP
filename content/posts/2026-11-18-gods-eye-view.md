---
title: "把实时地球接进 AI 智能体的对话里"
date: 2026-11-18
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-11-18.webp"
    hiddenInList: false
---

开源情报（OSINT）的瓶颈从来不是数据太少，而是入口太散。航班在一个网站，船舶在另一个，卫星轨道、地震、火点又各自一个。想看全一颗星球上正在发生什么，得同时开十几个标签页。

AI 智能体也没能补上这块：它能读文档、能写代码，但对「此刻地球上正在发生什么」基本是盲的。

God's Eye View 把这件事做成了一颗能跑的 3D 地球。十几路公开信号叠在上面——航班、军机、船舶、卫星、地震、火点、公共摄像头、天气、海底光缆，一共 19 个图层，其中 17 个不用申请任何密钥。项目由前 Google 地图团队的产品经理 Bilawal Sidhu 开源，MIT 协议，目前 6.5 万 Star。

**项目地址：**https://github.com/bilawalsidhu/gods-eye-view

![God's Eye View 官方主视觉：把地球上的公开信号叠进一颗写实的 3D 地球](https://raw.githubusercontent.com/bilawalsidhu/gods-eye-view/HEAD/docs/media/site/hero.webp)

## 真正值得注意的是它和 AI 的接口

第一层是 MCP。从 v0.2.0 开始，God's Eye View 自己就是一个 MCP 服务器：在 Claude Desktop、Codex 或 ChatGPT 桌面端里说一句「看看某个地方」，对话里会直接展开一块可交互的实时地球面板，图层、视角、追踪目标全都对上。智能体不再只回一段文字，而是把结论落到地图上，也能把发现写回同一块共享画布。

第二层是语音智能体。它基于 OpenAI Realtime API（也可以切到 Gemini Live），背后挂着 35 个工具、四类职责。回答之前会先读取当前画面上下文——坐标、街道名、已开图层、缩放级别，所以「这是什么城市」这种问题在半空中问也答得上来；「德州上空现在有多少架飞机」「找最近的直升机」也不用手动点图层。说一段边界，它画出来的是真实多边形，而不是一个圈。界面上还有一栏五词左右的 AI 摘要，随视角移动实时改写当前画面在讲什么。

数据本身也带着边界感：每一层都标注来源和新鲜度状态（部分、延迟、模拟、不可用），哪些是实况、哪些是插值或估算，界面上写得很清楚。

![语音智能体：用自然语言提问，答案直接标注在地球上](https://raw.githubusercontent.com/bilawalsidhu/gods-eye-view/HEAD/docs/media/site/voice.webp)

## 装起来只要几步

零门槛的做法是用 Pinokio（8.2 以上版本）一键安装，Windows、macOS、Linux 都支持。

想自己跑，走终端。要求 Node.js 24.14.0 及以上或 26.x（25 已经 EOL）：

```bash
git clone https://github.com/bilawalsidhu/gods-eye-view.git
cd gods-eye-view
npm ci
npm run doctor
npm run dev
```

然后打开 http://localhost:4173，从首次面板里选 Live Contacts、Space Missions 或 Environmental 就能开始。

不想装 Node 也可以直接 Docker：

```bash
docker compose up
```

不配任何密钥就能看到航班、卫星、地震、公共摄像头这些图层；想要 Google 那种写实 3D 城市，加一把免费的 Cesium ion 密钥即可。要让 Claude 或 Codex 调起这张地球，按仓库里的 docs/MCP_SETUP.md 配一次 MCP，大约一分钟。

![驾驶舱视角：跟踪一架航班，镜头锁定地表一路跟随](https://raw.githubusercontent.com/bilawalsidhu/gods-eye-view/HEAD/docs/media/site/cockpit.webp)

## 它适合谁

做开源情报和地理空间可视化的开发者是最直接的受益者：一个免费的全球信号沙盘，同时也是一份「原生 JS + CesiumJS + 模块化数据源」的参考实现，想加自己的图层，开 issue 或直接提 PR 都行。

已经在用 Claude、Codex 或 ChatGPT 桌面端的团队值得认真评估，MCP 接入是一次性配置，换来的空间问答能力目前没有同类替代。

官方自己划的线也很清楚：这是探索和学习用的开源客户端，不是加固过的生产服务，不要拿它做导航、应急响应或任何安全攸关的决策——数据可能延迟、缺失或来自估算。隐私边界同样明确：不做人名搜索、不做人脸识别、不追踪个人，公共摄像头画面有延迟。

