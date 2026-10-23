---
title: "一个接口，白嫖150+家免费AI模型"
date: 2026-10-22
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-10-22.webp"
    hiddenInList: false
---

写代码的时候切模型，是件挺烦人的事。Claude 写逻辑顺手，DeepSeek 抠算法便宜，Kimi 上下文够长，可每换一个都得重新配 key、改 base_url、再讲一遍项目背景。更尴尬的是额度——写到一半跳出来"余额不足"，整个工作流就卡在那儿。

cheaper-inference/OmniRoute 就是冲着这个来的。它是一个免费开源的 AI 网关，把 375 家供应商、1400 多个模型收进同一个 OpenAI 兼容接口里，其中 150 多家带免费额度。只需要在本地起一个服务，把编辑器指过去，剩下的切换、兜底、省 token 这些事它自己干。

**项目地址：**https://github.com/cheaper-inference/OmniRoute

![OmniRoute 控制台主界面](https://raw.githubusercontent.com/cheaper-inference/OmniRoute/HEAD/docs/screenshots/MainOmniRoute.png)

它最实用的一点是"额度感知的自动切换"。每家供应商的免费额度、计费规则都登记在册，一家用完或限流，请求会自动转到下一个还能用的，代码一行不用停。写代码最怕的就是跑着跑着断了，这个设计基本把这件事从眼前拿走了。

另一个是 RTK + Caveman 压缩，官方说能省 15% 到 95% 的 token，长上下文任务省得尤其明显。兼容性也拉满——Claude Code、Cursor、Codex、Cline、Copilot、OpenCode 这些常用工具改个 base_url 就能接，MCP 和 A2A 也都支持。官方文档里还提到，它聚合了大约每月 16.2 亿个免费 token（34 个免费池），新人首月还能更高一些。

![OmniRoute 供应商目录](https://raw.githubusercontent.com/cheaper-inference/OmniRoute/HEAD/docs/screenshots/01-providers.png)

装起来只要几步。先全局装包，再启动：

```
npm install -g omniroute
omniroute
```

服务起来后会给出 dashboard（http://localhost:20128/dashboard）和 API（:20128）。不想用 npm 的话，一条 docker 命令也能跑：

```
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

然后把 Claude Code、Cursor 这类工具指向 http://localhost:20128/v1，就接上了。

![OmniRoute 用量分析](https://raw.githubusercontent.com/cheaper-inference/OmniRoute/HEAD/docs/screenshots/03-analytics.png)

这个项目到现在攒了 7.9 万 Star，今天又涨了 795，由 900 多个贡献者一起维护。它适合经常在多个模型之间切换、又不想被各家账单和额度拖住的开发者，当成本地一层"模型调度器"来用最顺手。方向上也挺清楚：模型越来越多，网关这一层迟早会像路由器一样成为标配。要说明的是，那些免费额度来自各家第三方账户，得自己开通、绑定，能拿多少取决于手里有哪些账号，不是装上就自动有 16 亿 token。

