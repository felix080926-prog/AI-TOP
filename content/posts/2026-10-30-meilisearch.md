---
title: "给产品加 AI 搜索，一个 API 就够了"
date: 2026-10-30
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-10-30.webp"
    hiddenInList: false
---

AI 应用做得越多越会发现一个尴尬的事：模型能力一直在涨，但检索这一环还是老样子。传统关键词搜索扛不住口语化提问，也接不住拼写错误；换成纯向量库，用户搜订单号、型号这类精确串又经常搜不出来。想两头兼顾，通常得把倒排索引和向量检索自己拼成一套。

Meilisearch 是另一种思路：全文搜索、语义搜索、混合搜索做进同一个引擎，对外只暴露一个 RESTful API。Rust 写的单二进制，MIT 协议开源，目前在 GitHub 上有 5.97 万 Star，今天一天涨了 566 个。

**项目地址：**https://github.com/meilisearch/meilisearch

![官方演示：用混合搜索找附近上映的电影](https://raw.githubusercontent.com/meilisearch/meilisearch/HEAD/assets/demo-light.gif)

## 关键词和语义，一个接口里都有

最值得看的是混合搜索（hybrid search）：一次查询里既走倒排索引又走向量，两边权重可以调。这样既能接住「找部适合周末看的电影」这种模糊表达，也不会漏掉用户明确打出的词。官方给的体验指标是搜索即出结果、响应在 50 毫秒以内，并且带拼写容错——README 里的例子是搜 `wondre woman`，依然能返回 Wonder Woman。

对做 AI 应用的人更实用的是接入方式。Meilisearch 内置了原生 MCP server（挂在 `/mcp` 路由，目前标注为实验性），Claude Desktop、Cursor 这类 MCP 客户端可以直接把它的索引当工具用，让 agent 自己去查数据，不用额外写一层接口。它也能作为 LangChain 的 vector store，还提供对话式搜索：用户用自然语言提问，答案基于索引里真实存在的内容生成。

![官方文档里的搜索预览界面](https://mintcdn.com/meilisearch-6b28dec2/AA65w-9bZrf-CgFA/assets/images/cloud-getting-started/13-search-preview.png)

多语言这块对中文用户友好，官方明确对中文、日文做了优化。分面过滤、排序、同义词、地理搜索、多租户的 tenant token、细粒度 API key 权限都是现成的，不用自己补。最近一次发布是 10 月 26 日的 v1.56.0，改动集中在嵌入服务（embedder）的限流策略和索引稳定性上，方向还是往「能长期跑在生产环境」走。

## 装起来只要几步

自托管最省事的是 Docker 一条命令：

```sh
docker run -it --rm \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:latest
```

不想用容器就装二进制：

```sh
curl -L https://install.meilisearch.com | sh
./meilisearch
```

实例起来之后，加数据和搜索都是普通 HTTP 请求。加文档：

```sh
curl -X POST "http://localhost:7700/indexes/movies/documents" \
  -H 'Content-Type: application/json' \
  --data-binary '[{ "id": 1, "title": "Carol", "genres": ["Romance","Drama"] }]'
```

搜索（故意打错一个字母）：

```sh
curl -X POST "http://localhost:7700/indexes/movies/search" \
  -H 'Content-Type: application/json' \
  --data-binary '{ "q": "wondre woman" }'
```

索引是异步的，刚加完数据马上搜可能返回空，等一下再查就行。官方还提供 JavaScript、Python、PHP、Ruby、Go、Rust、React 的 SDK，接进现有项目基本就是换个客户端的事。

![官方文档里的索引管理界面](https://mintcdn.com/meilisearch-6b28dec2/AA65w-9bZrf-CgFA/assets/images/cloud-getting-started/10-index-list-filled.png)

## 适合谁用

如果产品里已经有一个搜索框，想让它听懂自然语言；或者在给 RAG、agent 搭检索层，不想同时维护 Elasticsearch 和一套独立向量库，Meilisearch 是个可以自托管、也能直接用官方云服务的选择。它不适合的场景也很明确：需要复杂聚合分析和跨索引关联的分析型查询，那还是关系数据库或 Elasticsearch 更合适。项目本身是 MIT 协议，社区版商用免费，分片这类高级能力在企业版里。

