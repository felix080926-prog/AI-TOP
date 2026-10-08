---
title: "把 AI 流水线搬进 IDE，C++ 内核驱动"
date: 2026-10-05
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-10-05.webp"
    hiddenInList: false
---
做 LLM 应用的人，迟早会卡在同一个地方：模型选好了，提示词也调好了，但要把「一个请求进来 → 经过几个模型 → 查个向量库 → 吐结果」这套流程真正搭起来，得自己写一堆胶水代码——拼 API、接数据库、处理并发，还得惦记 token 花了多少、哪一步慢了。更麻烦的是，这套东西搭完常常只在本地能跑，换个环境又要重新折腾一遍。

RocketRide 就是冲着这个来的。它把自己定义成「开源的 AIDE——AI 开发环境」，核心是一套在 IDE 里可视化搭建、跑在 C++ 内核上的 AI 流水线引擎。你的整个 AI 工作流被拆成一个个节点（模型调用、向量检索、OCR、NER、PII 脱敏……），在 VS Code 的画布上拖拖连连就拼成一条 pipeline，存成一个纯 JSON 的 `.pipe` 文件——可版本管理、可分享、换个机器照样跑。

**项目地址：**https://github.com/rocketride-org/rocketride-server

![RocketRide: Open Source AI Pipeline Tool](https://raw.githubusercontent.com/rocketride-org/rocketride-server/HEAD/docs/public/assets/poster.png)

真正让它跟一票低代码工具拉开差距的，是底下那层 C++ 运行时。多数同类框架用 Python 编排，节点一多、并发一上来，GIL 就成了瓶颈；RocketRide 把执行引擎做成了原生多线程的 C++ 内核，专门应付 AI 和数据工作流的高吞吐需求。同时它又没牺牲灵活性：100+ 个节点覆盖 15+ 家模型供应商、9 个向量数据库，全部可以用 Python 二次扩展，想补一个私有工具进去，也就是写一个 Python 包的事。

另一个让人省心的地方，是它对「智能体」的原生支持。流水线里可以直接挂 agent 节点——让一个 LLM 反复调用其他节点直到任务跑完，也内置了 CrewAI、LangChain 的多 agent 编排。更顺手的是，它会自动识别正在用的编码助手（Claude、Cursor 等），让这些 agent 直接用自然语言帮你搭、改、部署 pipeline。

![Build and run AI pipelines inside your IDE](https://raw.githubusercontent.com/rocketride-org/rocketride-server/HEAD/docs/public/assets/pipeline-example.png)

装起来也不费劲。最省事的路子是直接在 IDE 扩展市场搜 RocketRide 装个插件，选「Local」，服务器就会被拉进 IDE 里，不用注册任何账号。想把流水线接进自己的代码，Python 一行 `pip install rocketride`、TypeScript 一行 `npm install rocketride` 就行。想要彻底自托管，用 Docker 两条命令也能起一个本地引擎：

```bash
docker pull ghcr.io/rocketride-org/rocketride-engine:latest
docker create --name rocketride-engine -p 5565:5565 ghcr.io/rocketride-org/rocketride-engine:latest
```

![Integrate real AI solutions using a simple SDK](https://raw.githubusercontent.com/rocketride-org/rocketride-server/HEAD/docs/public/assets/sdk-example.png)

从数据看，社区已经在用脚投票了：这个项目目前攒了约 1.8 万 Star，光今天一天就涨了 790 多个，在 AI 基础设施这类项目里属于相当能打的增速。它适合谁呢？如果你在搭 LLM 应用、又不想把时间耗在「拼 pipeline 的胶水代码」上，或者团队里有人习惯在 IDE 里干活、想用可视化方式把 AI 流程固化下来，这套东西值得认真看看。它不替你选模型、不替你写提示词，它解决的是更靠下的一层——让「把 AI 能力组装成产品」这件事，从拼积木式的苦活，变成在画布上拖几下就能跑起来。
