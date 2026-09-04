---
title: "一个接口，白嫖 635 个模型"
date: 2026-09-04
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-09-04.webp"
    hiddenInList: false
---

最近写个小工具，要同时调好几家模型做对比，光申请 API key 就折腾了一下午，每家的 base_url 还不一样，代码里塞满 if else。

后来刷到 freellmapi，我当场愣住。

它做的事特别简单：把 34 家免费 LLM 提供商的 635 个模型端点，全塞进一个 OpenAI 兼容的 /v1 接口里。你代码里的 base_url 改一行，就能随便切到不同模型，不用挨个配 key、写胶水代码。

**项目地址：**https://github.com/tashfeenahmed/freellmapi

![FreeLLMAPI 控制台主界面](https://raw.githubusercontent.com/tashfeenahmed/freellmapi/HEAD/repo-assets/github-hero.png)

上手一条命令搞定。

docker 拉下来或者 pip 装一下，把手里能薅到的免费 key 填进配置，起服务就行。它兼容 OpenAI 调用格式，平时用的 agent、脚本、SDK 基本不用改，换个地址就接上。

![功能一览](https://raw.githubusercontent.com/tashfeenahmed/freellmapi/HEAD/repo-assets/features.png)

最让我觉得"作者是真懂"的，是三个细节。

一是智能路由。哪个 provider 挂了你不用管，它自动切到下一个能用的模型，failover 全自动，重试逻辑都省了。

二是密钥加密存储。免费 key 都是小号薅来的，明文摆在配置文件里真慌，它帮你加密了。

三是额度透明。首页直接告诉你每个月有 74 亿 token 的免费额度，用了多少心里有数。

![每月约 74 亿 token 免费额度](https://raw.githubusercontent.com/tashfeenahmed/freellmapi/HEAD/repo-assets/free-tier.png)

当然它也说得明白：只限个人实验，别拿去商用。这项目 2.4 万 star、单日涨 400 多，说明想低成本折腾模型的人真不少。

想试试就 clone 下来跑起来，改一行 base_url 就能白嫖。

项目地址：https://github.com/tashfeenahmed/freellmapi

