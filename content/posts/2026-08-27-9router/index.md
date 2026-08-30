---
title: "AI 编程又限流又烧钱？实测 9Router：54 秒装好，token 立省 40%"
date: 2026-08-27
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-08-27.webp"
    hiddenInList: false
---

周日下午，我在改爬虫项目，Claude Code 突然甩出一行字：quota exhausted。这个月第三次了，20 美元的订阅才用了两周。

气到刷 GitHub，Trending 上一个项目把我钉住了：**9Router，26,327 颗星**，README 第一行写着 "Never stop coding"。它能把 Claude Code、Cursor、Codex 全接到 40 多个模型供应商，额度用完自动切免费模型续上，token 还能压 20%-40%。

免费、路由、省 token，全踩在我痛点上。当场装。

## 54 秒装完，但它先拦了我两次

一条命令：`npm install -g 9router`，54 秒装完。

但没那么顺。npm 11 先拦截了它的 postinstall 脚本——新版安全策略，得加 `--allow-scripts=9router` 重装一次。

更意外的是第一次启动：它自己退了。提示检测到绑定 0.0.0.0 会暴露到局域网，让我改用 `--host 127.0.0.1`。管 AI 流量的工具第一件事是**拒绝裸奔**，这个护栏先加一分。

按提示重启，Next.js 16 服务 0 毫秒就绪。紧接着一个漂亮降级：better-sqlite3 没编译好，它没报错，自动切到 node:sqlite。装到跑起来不到三分钟，还能选 Web 界面、终端界面或托盘常驻。

![9Router 仪表盘](images/01_9RouterDashboard.png)

## 691 个模型，和一套会自己省钱的管线

没急着配供应商，先摸 API。GET /v1/models，返回的数字把我震了：**691 个模型**。Claude、GPT、Gemini、DeepSeek、Qwen、Kimi、MiniMax 全在，tokenrouter 一个前缀就 110 个，连 opencode-go 免费通道里都有 deepseek-v4-pro。

招牌功能 **RTK Token Saver**，省 token 的核心。原理不复杂：git diff、grep、ls 这些工具输出常年吃掉 30%-50% 的 prompt 预算，RTK 在请求发给模型前先做无损压缩。README 给了实测例子：同一段对话，47K token 压到 28K，省 40%，回答一模一样。

细节讲究：十几种过滤器自动探测输出前 1KB 挑最合适的，零配置；压缩失败或压完更大就**静默保留原文**——宁可省不了，绝不弄坏请求。默认开启。

还能叠 buff：Caveman 模式让模型输出变简洁，最多省 65%；Ponytail 模式注入"懒惰高级工程师"人设，只写最小可用代码。

然后是**三级自动回退**。组合可以配：第一层 Claude 订阅，第二层 GLM-4.7（0.6 美元/百万 token），第三层 Kiro 免费 Claude Sonnet。额度耗尽自动切下层，编码零感知。免费层挺厚道：Kiro 每月 50 credits 白嫖 Claude 4.5、GLM-5、MiniMax；OpenCode Free 不用注册；Vertex 新户送 300 美元。

最后是仪表盘"成本"数字——它**不是账单**，显示的是"这些调用走付费 API 要花多少钱"。README 例子：显示 $290，实际支付 $0。省钱计数器，不是收费单。

![社区视频教程：用 9Router 省 LLM 成本](images/02_TitkimchiphLLMvi9Router.jpg)

## 逛 repo 的三个印象

一是成长速度：2026 年 1 月建仓，8 个月 26K star，4,759 fork，1,810 个 open issues，社区是真活跃。

二是文档诚实得罕见：Kiro 2025 年 9 月转成每月 50 credits 封顶、iFlow/Qwen Code/Gemini CLI 免费层 2026 年全停、Vertex 赠金 3 月起不能用于 Gemini API——免费方案的坑全主动写出来。

三是生态已分叉：OmniRoute fork 加了 36+ 供应商和四层回退，README 大方推荐。npm 包 0.5.55 比 GitHub release 还新，发版勤快。

![社区视频教程：9Router + Claude Code 免费配置](images/03_9RouterClaudeCodeFREEUnlimited.jpg)

## 我的结论

如果你在给 Claude Code、Cursor 或 Copilot 付费，但额度用不完或总被限流打断，**9Router 值得现在装**——订阅榨到最后一滴，免费层兜底。零预算党用 RTK + Kiro + OpenCode Free 能做到 0 元编程。

提醒两点：免费供应商政策说变就变，README 自己都在警告，别把关键工作押在免费层；生产环境只用 RTK 压缩和自己的订阅。对接工具要先在仪表盘生成 API Key，别指望裸连。

项目地址：https://github.com/decolua/9router

