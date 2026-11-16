---
title: "AI 技能破百万，英伟达开源了质检框架"
date: 2026-11-17
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-11-17.webp"
    hiddenInList: false
---

Agent Skills 铺得太快了。

从 Anthropic 最早给 Claude 做的那套技能包开始，这个格式在 2025 年底被开放成标准，今年 10 月又捐给了 Linux 基金会旗下的 Agentic AI Foundation。技能本身很轻——一个文件夹、一份 SKILL.md 加几个脚本，装进 agent 也就占几百个 token。也正因为轻，谁都能写：现在写技能的既有大厂，也有个人开发者，数量早已破百万。

麻烦也跟着来了。有统计说，这些技能里差不多四分之一带着安全隐患，被抽样分析过的几万个技能，平均质量分只有一半出头。技能越装越多，agent 反而可能越跑越偏——因为没人认真测过，一个技能到底是让 agent 变强了，还是纯粹占着上下文拖后腿。

NVIDIA 这周把这件事摆上了台面。它开源的 SkillEvaluator 在 11 月 13 日发布 0.9.0 版本，随即冲上 GitHub Trending，单日涨了一百多星。

![NVIDIA 官方博客中 Agent Skills 评估的配图](https://developer-blogs.nvidia.com/wp-content/uploads/2026/08/AI-Agent-Skills-1024x576.png)

**把「好不好用」变成可测量的数字**

SkillEvaluator 是 NVIDIA Verified Skills 流程里的一环，思路很直接：给技能建一套三层评估。

第一层是校验：schema、许可证、PII、Unicode 安全，再叠上 NVIDIA 自家的 SkillSpector 安全扫描和脚本 lint。这一层全是确定性检查，不需要 API key，跑完直接给 0 到 100 的质量分和 A–F 等级，低于 70 分算不过。它还能直接当 CI 门禁——退出码非零即失败，一行 `run:` 就够了。

第二层是去重：用 embedding 找出技能内部重复的指引，以及和技能库里其它技能的语义重叠，避免同一个能力换个名字反复发布。

真正有意思的是第三层：把技能放进沙箱，让 Claude Code、Codex 这类真实 agent 在同样的任务上跑两遍——一遍装技能，一遍不装，只留技能这一个变量，再由独立裁判按安全、正确性、可发现性、有效性、效率五个维度打分。两次的差值就是 Skill Lift，也就是「这个技能到底有没有用」的那个数。

**项目地址：**https://github.com/NVIDIA/SkillEvaluator

NVIDIA 自己已经用它评估了 30 多个产品线、300 多个技能，正确性维度的平均提升有 41 分，有效性 39 分。也顺手暴露了反例：有个 Jetson 技能把 token 用量砍掉近 77%，另一个安装类技能反而让 token 涨了 120%。

![SkillEvaluator 的三层评估流水线：校验 → 去重 → 实测 → 报告](https://raw.githubusercontent.com/NVIDIA/SkillEvaluator/main/docs/assets/three-tier-overview.svg)

**装起来就两条命令**

SkillEvaluator 已经发到 PyPI，Python 3.12 以上就能跑最基础的第一层检查，不需要 API key、GPU 或者 Docker：

```
pip install skillevaluator
skillevaluator validate ./my-skill --tiers 1
```

要跑完整三层、包括沙箱里的实测，需要先配好 provider、扫描器和沙箱，再执行：

```
uv run --python 3.13 --extra all skillevaluator validate ./my-skill
```

它本身也是个 Agent Skill，`npx skills add NVIDIA/SkillEvaluator` 之后，可以直接在 Claude Code 或 Codex 里问一句「这个技能到底行不行」。

![SkillEvaluator 生成的技能 benchmark 卡片，含各维度评分与 Skill Lift](https://raw.githubusercontent.com/NVIDIA/SkillEvaluator/main/docs/assets/benchmark-card-after.png)

**为什么值得关注**

Agent Skills 正处在从「谁都能发」到「得有人负责」的转折点上。技能一旦进了生产环境的 agent，它就在真实权限下跑，一个没测过的技能，可能是一次数据泄露，也可能是一轮失控的调用。

SkillEvaluator 的价值不在于它多完美——它自己还标着 Experimental，社区维护、没有 SLA，官方目录里的评测样本量也普遍偏小。但它给了技能作者和平台方一个零成本的起点：先把第一层跑起来，把 CI 门禁接上，再谈技能库怎么治理。

对正在往 agent 里塞技能的人来说，这是目前最现成的一把尺子。

