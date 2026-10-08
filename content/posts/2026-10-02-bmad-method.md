---
title: "AI Agent 写代码总跑偏？这套敏捷框架管住了"
date: 2026-10-02
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-10-02.webp"
    hiddenInList: false
---
用 AI 写代码的人越来越多，但一个尴尬的事实也摆上了台面：AI 的编码能力很强，可它经常把没说出口的假设直接写进代码里。你以为它读懂了需求，跑起来才发现南辕北辙；你让它改个 bug，它顺手把别的功能也"优化"了一通。AI 写得越快，欠下的理解债越多，最后要么返工，要么硬着头皮把没人真正看懂的代码推上线。

GitHub 上有个项目想正面解决这个问题——BMad Method，它把敏捷开发的方法论搬到了 AI 编程上，让 AI 从"自动补全"升级成"有流程的协作"。项目已经攒了 5.3 万多 Star，今天一天又涨了 739 个。

**项目地址：**https://github.com/bmad-code-org/BMAD-METHOD

BMad 的思路很朴素：把"想清楚再动手"这件事，用一组命名命令固化下来，装进 Claude Code、Cursor 这类 AI 编程工具。这些命令分成两类——一类帮你思考，比如把模糊的想法探索清楚、把方案拿来反驳几轮、把结论白纸黑字写下来；另一类帮你动手，给 `bmad-build` 一句改动要求，它就写代码、自查、再把改了什么摊开给你看。你可以在任何阶段只用其中一类，小改动直接进 build，大项目则多花点规划功夫。

更关键的是它强调"上下文延续"。用 AI 编程最烦的就是每开一个新对话，前因后果都得从头解释一遍，模型像失忆一样重问。BMad 把产品和技术决策沉淀下来一路往下带，不用每次聊天都重新交代。它还内置了产品、架构、UX、开发、测试等十几个专家角色，需要哪种视角就把谁调进来做多角色讨论——但最终拍板的始终是人，不是把判断权整个交给 AI。

![BMad Method 主视觉](https://raw.githubusercontent.com/bmad-code-org/BMAD-METHOD/HEAD/banner-bmad-method.png)

![BMad 的交付循环：模糊想法从 Clarify 开始，清晰的构想从 Plan 开始，小改动从 Build 进入，Learn 再循环回 Plan](https://raw.githubusercontent.com/bmad-code-org/BMAD-METHOD/main/docs/images/bmad-delivery-loop.svg)

装起来只要一条命令。先确认机器上有 Node.js 20.12+、Python 3.10+ 和 uv，然后：

```
npx bmad-method install
```

装完在项目目录里打开 Claude Code 或 Cursor，用 `bmad-build` 描述要改的东西，用 `bmad-help` 问下一步该干嘛。整套方法 MIT 开源，没有付费墙，也没有封闭的社区门槛。

这套东西适合谁？如果你只是偶尔让 AI 补个函数，它显得有点重；但如果你在让 AI 真正参与项目交付——从需求、架构到实现、测试都要 AI 搭把手——那这种把流程显性化的方法，比再多 prompt 技巧都值钱。它不替你做决定，而是逼着你在每个关键节点把决定做清楚。这正是 AI 写代码时最容易丢掉的那部分。
