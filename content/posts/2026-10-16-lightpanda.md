---
title: "智能体专属浏览器：内存省 16 倍"
date: 2026-10-16
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-10-16.webp"
    hiddenInList: false
---
AI Agent 越来越多，但真要让它们替人「上网干活」，浏览器一直是个绕不开的瓶颈。常见的做法是跑无头 Chrome：一个页面一个实例，内存蹭蹭往上涨。做数据采集的公司，一天要抓几千万个页面，光维护 Chrome 实例集群就是一笔不小的钱和一堆运维麻烦。

针对这个痛点，Lightpanda 给出了另一种思路：不从 Chromium 改，也不给 WebKit 打补丁，而是用 Zig 语言从零写了一个全新的无头浏览器，专门服务 AI Agent 和自动化场景。

**项目地址：**https://github.com/lightpanda-io/browser

![Lightpanda 1.0 发布公告主图](https://cdn.lightpanda.io/website/assets/images/blog/posts/lightpanda-1.0/lightpanda1.0_large.png)

它最直观的卖点是省资源。官方在 AWS m5.large 实例上抓了 933 个真实网页做基准：抓 100 个页面时，Lightpanda 内存峰值 123MB，无头 Chrome 是 2GB，省了约 16 倍；执行时间 5 秒对 46 秒，快了约 9 倍。省下的不只是一点内存，而是成百上千个实例时账单和运维成本的量级差异。

第二个亮点是它跟 AI Agent 的结合是「原生」的。它自带 agent 模式，一句自然语言就能驱动浏览器去导航、点页面、填表单、抽数据，而且 agent 就运行在浏览器同一个进程里，省掉了中间通信开销。跑完的会话还能导出成 PandaScript（一段带原生浏览器原语的 JavaScript），回放时不需要模型、不烧 token。此外它原生带 MCP server，挂进支持 MCP 的工具就能用；同时兼容 CDP 协议，Puppeteer、Playwright、Selenium 这些老客户改个连接地址就能用。

![Lightpanda 通过 170 万+ Web Platform Tests 子测试](https://cdn.lightpanda.io/website/assets/images/blog/posts/lightpanda-1.0/WPT-2026-09.png)

从 2024 年 11 月 beta 发布到现在，这个项目已经攒了 3.6 万多个 Star。最近它摘掉了 beta 标签、正式发布 1.0：通过了超过 170 万个 Web Platform Tests 子测试，默认开启 CORS，并升级到最新的 V8。官方说它已被 AI Agent、搜索引擎和做数据抽取的公司用在生产环境，有的客户一天要处理 3000 多万个页面。

**装起来只要几步**

```bash
# Homebrew 安装
brew install lightpanda-io/browser/lightpanda

# 或者用 Docker 起一个 CDP 服务
docker run -d --name lightpanda -p 127.0.0.1:9222:9222 lightpanda/browser:nightly

# 抓一个页面转成 Markdown
./lightpanda fetch --dump markdown https://example.com

# 用一句话驱动浏览器
./lightpanda agent --task "top story on news.ycombinator.com?"
```

在 Python 或 Node 项目里集成，也可以 `pip install lightpanda` 或 `npm install @lightpanda/browser`。

对跑爬虫、做数据抽取、或者要给 AI Agent 配一个「能上网」执行环境的人来说，Lightpanda 把「轻量」和「为 Agent 设计」这两件事同时做掉了。它当然不是要替代日常浏览网页的 Chrome，也没做图形渲染——但当 Agent 只需要读懂页面、点击按钮、拿到结构化数据时，一个 123MB 内存、5 秒跑完 100 个页面的浏览器，显然比 2GB 的无头 Chrome 更划算。
