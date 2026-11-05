---
title: "OpenAI 官方多智能体框架怎么用"
date: 2026-11-04
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-11-04.webp"
    hiddenInList: false
---

AI Agent 从 demo 走进真实业务之后，麻烦的地方就变了。以前是「能不能让模型调个工具」，现在是「五个 Agent 分工协作时，谁负责交接、出错谁来兜底、中间那几步到底跑成了什么样」。这套调度逻辑手写一遍不难，难的是写完之后还要维护，还要能查问题。

OpenAI 把这一层单独抽出来，做成了一个开源库——openai-agents-python。它是 OpenAI 官方维护的 Agent 开发框架，前身是早期实验项目 Swarm，现在已经攒到 3 万多 Star，今天单日还在涨 799 星。

**项目地址：**https://github.com/openai/openai-agents-python

![Agents SDK 运行追踪界面](https://cdn.openai.com/API/docs/images/orchestration.png)

## 四条原语，把多智能体调度讲清楚

这个框架最克制的地方是抽象的数量。核心概念只有四个：Agent（带指令和工具的模型）、Handoff（把任务交给另一个 Agent）、Guardrail（输入输出校验）、Tools（任意 Python 函数都能变成工具）。

好处是编排逻辑直接用 Python 写——循环、条件、异步都是语言自带的，不用再学一套 DSL 或者 YAML。多个 Agent 之间既可以平级交接，也可以用「agent as tool」的方式让一个主管 Agent 调用下属，两种编排模式在文档里都有对照说明。

![Agent 拓扑可视化](https://raw.githubusercontent.com/openai/openai-agents-python/main/docs/assets/images/graph.png)

## 跑起来能看到什么

框架自带 tracing。每次运行的每一步——模型调用、工具执行、handoff、guardrail 结果——都会生成一条可回看的 trace，在 dashboard 里能看到完整的调用链，也能取到本地 span 数据做二次处理。Agent 编排是黑盒，这是这类框架最容易被吐槽的一点，它用可观测性补上了。

对 MCP 的支持也是内置的：远端 MCP server 暴露的工具可以和本地 Python 函数混在同一个 Agent 里用，不需要额外写适配层，同样的 trace 会把 MCP 调用一并记下来。

![MCP 调用追踪](https://raw.githubusercontent.com/openai/openai-agents-python/main/docs/assets/images/mcp-tracing.jpg)

## 装起来只要两条命令

```bash
pip install openai-agents
export OPENAI_API_KEY=sk-...
```

最小可运行版本就是一个 Agent 加一次运行：

```python
from agents import Agent, Runner

agent = Agent(name="Assistant", instructions="You are a helpful assistant")
result = Runner.run_sync(agent, "Write a haiku about recursion in programming.")
print(result.final_output)
```

环境要求 Python 3.10 以上。模型不限于 OpenAI——框架本身是 provider-agnostic 的，走 Responses API 或 Chat Completions，可以接 100 多个模型。

## 什么场景适合用

如果只是偶尔调一次模型接口，直接用 Responses API 就够了，没必要引入框架。但只要工作流里出现多个角色、需要跨轮次记住上下文、或者要给 Agent 加上「动手之前先检查一遍」的护栏，这个框架能省掉不少自己造轮子的时间。

它的定位是抽象刚好够用：原语少、上手快，代价是编排没有画成图，复杂流程的可视化要靠 tracing 而不是流程图。评估的时候把这一点算进去就行。

