---
title: "AI 写代码前，先给它建张地图"
date: 2026-09-09
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-09-09.webp"
    hiddenInList: false
---

我最近被一件事烦到了：让 AI 帮忙改个函数，它先在项目里东翻西找，grep 一遍、读十几个文件、来回折腾几十次工具调用，最后才慢吞吞地改那一行。改是改对了，但 token 烧得肉疼。

后来我发现一个东西，专门治这个毛病——CodeGraph。

它的思路特别简单：提前把你的代码库建成一张知识图谱，每个符号、每次调用、每条依赖关系都预先梳理好。等 AI 要干活的时候，不用再一个文件一个文件地翻，直接问一句，它就拿到该看的源码、完整的调用链路，甚至这次改动会波及哪些地方。grep 追不上的动态派发，它也能跟出来。

**项目地址：**https://github.com/colbymchenry/codegraph

![CodeGraph 图谱视图](https://raw.githubusercontent.com/colbymchenry/codegraph/main/assets/codegraph-ui-symbol-view.png?v=1)

左边是调用方，中间是符号源码，右边是它调用了谁——一条链路一眼看清。

## 上手只要两步

不用装 Node，一条命令装好 CLI：

```bash
curl -fsSL https://raw.githubusercontent.com/colbymchenry/codegraph/main/install.sh | sh
```

然后 `codegraph install` 连上你的 AI 工具——Claude Code、Cursor、Codex、Gemini、Copilot、Hermes Agent 全都认。最后进项目目录敲一句 `codegraph init`，图谱就建好了。

![codegraph init 初始化](https://github.com/user-attachments/assets/f168182f-4d9a-44e0-94d7-08d018cc8a3a)

最省心的是，建完就不用再管。代码一改，图谱自动同步，索引永远不过期。而且 100% 本地跑，代码不出机器。

## 最惊喜的部分

官方在 7 个基准仓库上实测：平均省 44% 成本、少 62% token。

![token 成本节省对比](https://github.com/user-attachments/assets/eb74a11a-a3ab-4b01-80a6-19f78352ae8e)

越是那种「AI 要翻二三十个文件才答得上来」的难题，省得越狠，能到 57% 到 78%。道理也简单：普通 AI 是把预算烧在「重新搞懂代码结构」上，而 CodeGraph 直接把结构端到你面前。

说实话，对天天跟 AI 结对编程的人来说，这 7 万多 star 不是白涨的——今天一天又多了 754 个。

如果你也被 AI 瞎翻代码气到过，装一下试试，五分钟的事。

项目地址：https://github.com/colbymchenry/codegraph

