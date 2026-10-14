---
title: "开源版 Zapier，让 AI 调用 280 个工具"
date: 2026-10-11
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-10-11.webp"
    hiddenInList: false
---
AI Agent 越来越能干，但大多数 agent 的能力边界还停留在"能聊、能写、能搜"——真要让它们去操作 Slack、发邮件、改表格、跑审批，往往还得靠人手动搭一堆桥。另一头，Zapier、Make 这类自动化工具已经存在很多年，能把几百个 SaaS 服务串成流程，可它们大多是闭源的，数据也躺在别人家的服务器上。

这两个问题，其实可以放在一起解决。Activepieces 就是奔着这个来的——一个开源的一体化 AI 自动化平台，官方定位是"开源的 Zapier 替代品"。它用 TypeScript 写了一套类型安全的 pieces 框架，所谓 piece 就是一个个集成模块，Google Sheets、OpenAI、Discord、RSS 等 200 多个服务都被封装成可以拖拽的积木。

![Activepieces](https://github.com/activepieces/activepieces/assets/1812998/76c97441-c285-4480-bc75-30a0c73ed340)

**项目地址：**https://github.com/activepieces/activepieces

真正让它跟普通自动化工具拉开差距的，是它对 AI 的处理方式。Activepieces 的每一个 piece，一旦贡献进仓库，就会自动变成 MCP server，能被 Claude Desktop、Cursor、Windsurf 这类工具里的 LLM 直接调用。官方管这叫"最大的开源 MCP 工具集"，目前已经有 280 多个，而且 60% 是社区贡献的。

这意味着什么？开发者写代码 agent 的时候，不用再为每个外部服务单独写一个 MCP 适配器——只要这个服务在 Activepieces 的 pieces 列表里，它就已经是一个现成的、类型安全的 MCP server。agent 想查表格、发消息、触发流程，直接调就行。

![activepieces](https://raw.githubusercontent.com/activepieces/activepieces/main/docs/resources/templates.gif)

视觉化的流程编辑器也照顾到了非技术用户。不用写代码就能把多个 piece 串成一条 flow，支持循环、分支、自动重试，还带 "ASK AI" 代码块——不懂编程的人也能在流程里塞一步"让 AI 清洗数据"。想自己造集成也不难：pieces 是 npm 包，用 TypeScript 写，本地开发还支持热重载。

![activepieces](https://raw.githubusercontent.com/activepieces/activepieces/main/docs/resources/create-action.png)

装起来也很省事。官方提供一条命令的快速安装：

```
curl -fsSL https://get.activepieces.com | sh
```

跑完按提示走 Docker Compose 的自托管流程即可（PostgreSQL + Redis）。社区版是 MIT 协议，可以完全私有化部署，甚至做成网络隔离（network-gapped）的环境；只想先试一下的话，官方还提供免费云版，注册即用。

客观地说，Activepieces 适合两类人：一是想让自己的 AI agent 真正接上真实工具、又不想为每个服务手写 MCP 的开发者；二是想自托管自动化流程、把数据主权攥在手里的团队。它不是一个"装完就完事"的成品——真要上生产，部署、升级、监控这些还是得自己维护。但从 2.4 万 Star、单日 +700 的增速看，把"自动化"和"AI agent 接工具"这两件事合到一个开源项目里，确实戳中了不少人的需求。
