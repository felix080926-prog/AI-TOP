---
title: "Gemini 4 新模型发布，示例库同步"
date: 2026-11-21
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-11-21.webp"
    hiddenInList: false
---

11 月 18 日，Google DeepMind 上线了 Gemini 4 系列的新成员 Gemini 4 Neon。这是这个系列七周内推出的第四款以化学元素命名的模型——Argon、Carbon、Hydrogen、Neon，顺序既不按原子序数也不按能力强弱，Hacker News 上有网友把元素性质列了一遍想找规律，最后只能吐槽大概是随机抓的。

命名乱归乱，模型的评价倒是相当统一。Reddit 的 r/singularity 和 r/Bard 上，开发者反馈集中在两点：性能接近旗舰级的 Carbon，速度和价格却落在 Flash 那一档；官方说法是默认思考档位下单任务成本比 Carbon 低 32%。Hacker News 的讨论串里，有人直接说它的水平已经摸到 Opus 5.5 那一档。同天发布、同天可用，不用等灰度，这一点也被反复提到。

![Gemini 4 Neon 官方发布配图](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-4-neon__blog-header__sm.width-1300.png)

热点背后是更实际的问题：模型迭代快到开发者跟不上了。Gemini 4 七周出了四款，每款的定位、定价、思考档位都不一样，光看发布博客很难判断手头这段代码到底该调哪个。

GoogleCloudPlatform/generative-ai 就是 Google 官方维护的生成式 AI 示例仓库。Neon 发布当天（11 月 18 日），仓库里就多了一个 intro_gemini_4_neon.ipynb，现在 README 顶部挂的第一条就是它。仓库本身攒了 1.8 万 Star，今天一天又涨了 610。

**项目地址：**https://github.com/GoogleCloudPlatform/generative-ai

![仓库里的 Gemini 模型示例入口](https://storage.googleapis.com/github-repo/GeminiModels.png)

## 新模型发布当天，就有能跑的代码

这个仓库最直接的价值是更新节奏：官方示例和模型上线基本同步，不用等第三方教程。Neon 这个 notebook 覆盖的东西也具体——Long Decode（单轮最多输出 100 万 token，用来撑深度推理而不是凑长度）、Agentic Video Understanding（让模型自己在视频时间轴上找该看的帧，不用先手动切片）、四档思考层级（默认 HIGH），以及流式生成、多轮对话、异步调用这些核心 API。全都是点一下 Open in Colab 就能跑起来的代码，不是文档里的伪代码。

仓库本身是个合集，`gemini/`、`vision/`、`audio/`、`rag-grounding/`、`agents/` 等目录把 Imagen、Veo、语音、RAG、Agent 的样例都收在一起，换模型通常只要改一个 `MODEL_ID` 变量。

![仓库首页的 Gemini Enterprise Agent Platform 介绍视频](https://img.youtube.com/vi/j8qW5poBkEU/maxresdefault.jpg)

## 装起来只要两条命令

最省事的路子是 Colab：notebook 自带 Open in Colab 按钮，不用配环境。想在本地跑：

```bash
git clone https://github.com/GoogleCloudPlatform/generative-ai.git
pip install --upgrade "google-genai[pyopenssl]>=2.30.0"
```

Neon 需要 google-genai 2.30.0 及以上。再准备一个 Google Cloud 项目并开启 Agent Platform API，用 `genai.Client(enterprise=True, project=PROJECT_ID, location="global")` 建好客户端，把 `MODEL_ID` 设成 `gemini-4-neon` 就能调用。

模型换代的节奏只会更快。与其每出一款就去翻发布博客、对比价格表和思考档位，不如盯住官方示例库——它更新的时间点跟模型上线基本同步，代码由官方团队维护，改两个变量就能接进自己的业务。对正在做 AI 应用的团队来说，这是个比啃文档更省时间的入口。

