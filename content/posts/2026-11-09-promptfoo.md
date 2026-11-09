---
title: "给大模型做体检，一个开源工具就够了"
date: 2026-11-09
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-11-09.webp"
    hiddenInList: false
---

大模型应用越来越多，但怎么在上线前确认它真的靠谱，一直是个麻烦事。

提示词改了一版，会不会把别的场景搞崩？换个模型，是不是答得更准？有没有办法挡住那些想套出系统提示词的人？这些问题靠人工试几轮，根本测不过来。

promptfoo 就是冲着这件事来的。它把自己定位成「大模型的评估与红队测试工具」：用一个配置文件把测试用例、模型、评判标准全写清楚，然后一条命令跑完所有组合，最后给出一张对比矩阵。

**项目地址：** https://github.com/promptfoo/promptfoo

![promptfoo 的评估矩阵：同一批测试用例在不同模型上的输出对比](https://raw.githubusercontent.com/promptfoo/promptfoo/HEAD/site/static/img/claude-vs-gpt-example@2x.png)

**两件事做得比较实在**

第一件，是把评估变成可以版本管理的文件。测试用例写成 YAML，跟代码一起提交、一起 review；改一句提示词重跑一遍，哪些用例退化了立刻看得见。它支持 OpenAI、Anthropic、Google、Bedrock、Ollama 等一大批模型供应商，同一个测试集横向比不同模型，不用自己写胶水代码。而且评估全程在本地跑，提示词和测试数据不出本机。

![promptfoo 命令行运行评估的过程](https://www.promptfoo.dev/img/docs/self-grading.gif)

第二件，是红队测试。除了正常评估，它还能自动生成攻击探针——提示词注入、越狱、数据泄露、工具滥用这些常见风险，跑完直接输出一份带严重程度分级的漏洞报告。这类测试以前要么靠人工构造用例，要么得买商业服务，现在一个命令行就能先跑一轮。

![promptfoo 生成的红队漏洞报告](https://www.promptfoo.dev/img/redteam-vulnerability-report-hero@2x.png)

**装起来只要两条命令**

```sh
npm install -g promptfoo
promptfoo init --example getting-started
```

也可以用 `brew install promptfoo` 或者 `pip install promptfoo`，不想安装就直接 `npx promptfoo@latest`。初始化之后跑 `promptfoo eval` 看结果，`promptfoo view` 打开本地网页界面。大部分模型需要配一个 API key，比如 `export OPENAI_API_KEY=sk-...`。

**为什么现在值得看一眼**

promptfoo 是 MIT 协议的开源项目，从发布到现在攒了 2.7 万 Star，今天一天就涨了将近 800。它现在已经归属 OpenAI，但项目本身仍然开源、协议不变。另一件事是 OpenAI 自家的 Evals 平台将在 11 月 30 日关停，官方给出的迁移方向就是 promptfoo——一个开源评估工具被写进大厂的迁移文档，本身就说明了它在生态里的位置。

它更适合已经在大模型应用上做迭代的团队：想给提示词和模型选型加一道回归测试，或者想在上线前做一轮安全扫描。如果只是偶尔调调提示词、也没有固定的测试集，直接上手会有点重。

