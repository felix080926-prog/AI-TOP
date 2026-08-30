---
title: "AI 写 Go 还在手写 max 函数？JetBrains 这份规范专治 Agent 旧代码"
date: 2026-08-29
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-08-29.webp"
    hiddenInList: false
---

上个礼拜我让 Claude Code 写个工具函数取两个整数最大值，它给了我一段 `if a > b { return a } else { return b }`；让它判断切片里有没有某个字符串，它手写了一个 for 循环。这俩功能，Go 1.21 的内置 `max` 和 `slices.Contains` 早就有了。模型不是不会，是默认写训练数据里出现最多的老写法。

今天刷 GitHub Trending，看到 JetBrains 官方出的 go-modern-guidelines，一天涨 574 颗星，总星 2.6K。简介一句话：Help AI coding agents write modern Go。我当时就想，这说的不就是我吗。

## 两分钟装好，装完才发现它比想象中聪明

装法比我想的简单。我用 Claude Code，两条斜杠命令：

```
/plugin marketplace add JetBrains/go-modern-guidelines
/plugin install modern-go-guidelines@goland-claude-marketplace
```

前后两分钟。前置条件只有一个：本机装了 Go 工具链且在 PATH 里。装完它提示，首次使用时会自动 `go install` 一个小 CLI 到 `~/.cache/go-modern-guidelines`，只读、不改项目文件。

其他 agent 也有份：Codex、Cursor 各有专属命令，其余的一条 `npx skills add JetBrains/go-modern-guidelines`。JetBrains 自家的 Junie 自然在列。

装完我马上拿最近在改的那个 Go 服务试水。

## 实测：同一批需求，写出来的代码换了个年代

我建了个 Go 1.26 的新项目做对照（最低要求 Go 1.25，老环境靠 `GOTOOLCHAIN=auto` 也能跑）。

先让它写"取两个数最大值"。这次它没有直接开写，而是先跑了一遍 skill 自带 CLI 的 `list` 命令。这个命令读 go.mod 判断项目 Go 版本，然后按"最新在前"的顺序列出该版本下所有适用的现代写法，输出是带 ID 的规则列表，像 `atomic_types`、`errors_as_type`。它读完才动手，写出来的是 `max(a, b)`，之前那段 if-else 没了。

接着我挑了三个以前被它写"老"的地方重测。

第一个是 nil 检查链。之前它写三行嵌套判断，这次用 `cmp.Or(a, b, c)` 链式取第一个非空值，三行变一行。

第二个是错误类型匹配。老写法是 `errors.As` 拿完再断言，这次直接 `errors.AsType[T](err)`——Go 1.26 的新 API，属于我的知识盲区，它能写出来纯粹靠这份规范喂的。

第三个最意外：`new(42)`。Go 1.26 允许 new 带初始值直接返回指针，省掉 `x := 42; p := &x`。这个我自己都没用过，是它先教的我。

我还试了 `explain` 子命令，对拿不准的规则传 ID 进去，它给出详细解释和正反例。整体体验不像"塞段 prompt 碰运气"，更像给 Agent 配了个能实时查询的编译器文档。

有个细节我很喜欢：CLI 按 go.mod 版本只推项目用得上的规则，不会给 Go 1.22 项目推荐 Go 1.26 的 API。README 还专门警告，`list` 输出别用 head、grep 截断，会漏规则。

## 逛 repo 的三个印象

一是背景够硬。JetBrains 官方出品，Apache-2.0，思路和 Go 团队自己的 modernize 分析器一脉相承——modernize 给存量代码做现代化，这份规范相当于把它搬到"生成新代码"这一侧。

二是集成面广。Junie、Claude Code、Codex、Cursor 都有专属安装路径，skills.sh 兜底其他 agent。一份规范维护五个平台的插件，是认真当产品做的。

三是迭代挺勤。仓库 2025 年 11 月才建，最近一次 push 在 8 月 19 日，open issue 只有 8 个。九个月 2.6K 星，对文档型仓库来说很能打。

## 我的结论

如果你或你的团队在用 AI 写 Go，且在意代码风格，这个值得装，成本就两分钟。团队场景尤其划算：与其每个人往 AI 里塞不同的风格提示词，不如统一喂这份规范，出来的代码至少是同一代的。

它不解决"AI 会不会写 Go"，它解决的是"AI 写得是不是 2026 年的 Go"。项目如果还钉在 Go 1.20 之前的老版本，收益会打折扣——规则按 go.mod 版本生效，老版本能用的新写法本来就少。

项目地址：https://github.com/JetBrains/go-modern-guidelines

