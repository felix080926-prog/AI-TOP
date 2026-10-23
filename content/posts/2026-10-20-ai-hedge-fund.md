---
title: "把一支 AI 基金经理团队装进终端"
date: 2026-10-20
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-10-20.webp"
    hiddenInList: false
---

AI 落地到金融，市面上吵得最响的往往最虚。真想把「让 AI 做投资决策」研究透的人，缺的从来不是口号，是一套能本地跑起来、把每一步决策摊开看的东西。

virattt/ai-hedge-fund 就是冲这个来的。它把一支对冲基金团队拆成一群分工明确的 AI 角色——有看基本面的、看技术面的、看市场情绪的，有负责估值和风控的，最后汇到一个组合经理手里，形成一轮完整的投资决策。这套东西不追求「一键暴富」，追求的是把决策过程拆得能看懂、能复现。

**项目地址：**https://github.com/virattt/ai-hedge-fund

![ai-hedge-fund 交互式终端界面](https://github.com/user-attachments/assets/e3985623-c226-4c1a-a587-e03fb4eca31e)

项目在 GitHub 上已经攒了 6.4 万 Star，今天一天又涨了 582。它最近做了一次挺大的方向调整：从「一票 AI 各给各的买卖信号」，重构成「基金作为一等实体」——可以直接跑模拟盘，也可以回测，原来那些投资者角色被重新设计成可插拔、可回测的 alpha 模型。

![多智能体分析输出的终端界面](https://github.com/user-attachments/assets/cbae3dcf-b571-490d-b0ad-3f0f035ac0d4)

两个亮点值得一提。一个是模拟盘做得认真：用的全是假钱，但每一轮决策都会追加到一条哈希链式账本里，净值是一条可追溯的轨迹，而不是每次重来。另一个是昨天刚发布的 v2.6.0，加了分钟级的日内模拟盘和一张「记分卡」，能给每个分析师打出命中率、slugging、信息系数三个分，谁在裸泳一眼就能看出来。

装起来只有一条命令：

```bash
pipx install aihf
```

之后直接跑 `aihf` 就行。第一次用到时会问你要两个 key：一个 Financial Datasets 的行情数据 key，一个模型 API key（Anthropic、OpenAI、DeepSeek、Google、xAI、Kimi 都支持），key 会自动存进 `~/.hedge-fund/.env`，不用提前配置。

有一点得说清楚：它明确是教学和研究用途，不会真的下单交易。它适合的是想研究多智能体怎么落到量化决策、又不想只停留在读论文的人——把「钱是怎么被想出来的」每一步拆开看清楚，是这个项目最值钱的地方。

