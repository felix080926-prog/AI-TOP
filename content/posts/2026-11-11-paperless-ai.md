---
title: "AI文档工具被曝漏洞，作者重写了4.0"
date: 2026-11-11
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-11-11.webp"
    hiddenInList: false
---

11 月 10 日，开源项目 Paperless-AI 发布 4.0，发布说明标题写得很直白——「一次彻底重写」。同一页上还有一段安全公告：4.0 之前的所有版本，初始化向导免登录就能访问，任何能连上实例的人都能替换掉它的账号和配置，包括 Paperless 的访问令牌和 AI 服务商的密钥。原文措辞是「这正在被利用」。

一个把大模型接进个人文档库的工具，出问题的地方不是模型，而是最外面那扇门。

## 这件事说明了什么

自托管 AI 工具这两年长得很快：本地跑 Ollama，把资料喂进去，让模型自动归类、检索、回答。数据不出门是好处，安全责任也落到自己头上。Paperless-AI 这类工具位置尤其敏感——它同时握着 Paperless 的令牌和模型 API 的 key，一旦被接管，泄露的不是配置，而是一整个文档库。

## Paperless-AI 是干什么的

它给 Paperless-ngx 做 AI 扩展。文档扫进来之后，它读内容，自动填标题、标签、往来人、文档类型、日期和自定义字段；再进一步，可以对着整个档案库用自然语言提问，答案标注引用来源。模型覆盖 OpenAI、Anthropic、Azure 和任意 OpenAI 兼容接口，Ollama 可做到全本地。

**项目地址：**https://github.com/clusterzx/paperless-ai

## 4.0 改了什么

![Paperless-AI 4.0 仪表盘](https://raw.githubusercontent.com/clusterzx/paperless-ai/HEAD/docs/screenshots/dashboard.png)

最直观的是瘦身。3.x 是 Node.js 加一个独立 Python 服务（Torch、ChromaDB、NLTK），镜像几个 GB，空闲内存 1–2 GB。4.0 砍成一个 TypeScript 进程，镜像约 135 MB，空闲内存 80–150 MB，嵌入模型改成按需加载。对常年挂在家用 NAS 上的服务来说，这决定它跑不跑得起来。

检索也换了做法。3.x 只对每篇文档前 100 来个词做一次嵌入；4.0 改成分块段落，用 SQLite FTS5 的关键词检索（BM25）加 int8 内存向量索引做混合搜索，答案流式输出并带 [1] 这样的引用角标，索引增量更新。「一共多少份合同」这类问题，用 Paperless 里的真实数字回答，而不是让模型去数它看到的片段。

![对着整个档案库提问](https://raw.githubusercontent.com/clusterzx/paperless-ai/HEAD/docs/screenshots/ask.png)

另外，改动历史支持真正的撤销（把 Paperless 里的字段还原成原值），有 prompt 调试台，设置改完即时生效不用重启，兼容 Paperless-ngx 2.x 和 3.x。

## 装起来就一个 compose 文件

```yaml
services:
  paperless-ai:
    image: clusterzx/paperless-ai:latest
    ports:
      - "3000:3000"
    volumes:
      - paperless-ai_data:/app/data
volumes:
  paperless-ai_data:
```

`docker compose up -d`，打开 http://你的服务器:3000 跟着初始化向导走。建议在 Paperless-ngx 里单独建一个用户，只给它文档和标签的查看修改权限，用它的 API token 接进去。

从 3.x 升级：保留数据卷、换镜像即可，配置、账号、历史自动迁移。但若 3.x 曾直接暴露在公网，不要迁移旧数据——用空数据卷重跑初始化，并把 Paperless API token 和模型密钥都换掉。

## 为什么值得关注

![改动历史与撤销](https://raw.githubusercontent.com/clusterzx/paperless-ai/HEAD/docs/screenshots/history.png)

Paperless-ngx 官方已内置 AI 能力，仓库一度挂着「暂不维护」。这次 4.0 是作者按新架构从头重写的，发布当天涨了 330 颗星，总数 5992，MIT 许可。

它适合已经跑着 Paperless-ngx、想让模型帮着归类文档、又不愿意把资料交给云服务的人。这次事件留下的那半句提醒也值得记住：自托管 AI 工具的能力边界可以很宽，但把资料交出去之前，先确认那扇门是锁着的。

