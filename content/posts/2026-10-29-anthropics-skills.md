---
title: "给 AI Agent 装一套官方技能包"
date: 2026-10-29
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-10-29.webp"
    hiddenInList: false
---

AI Agent 几乎人人都在用了，但有个问题一直没解决：怎么让它稳定地按你们团队的方式干活。

常见的做法是把规范、流程、模板一股脑塞进提示词，或者写进项目根目录的说明文件。结果是上下文被撑满，该看的时候不看，不该看的时候全背下来了。

Anthropic 给出的答案是 Agent Skills：把「怎么做一件事」打包成一个文件夹，Agent 按需加载。anthropics/skills 就是这套标准的官方参考实现，目前在 GitHub 上已经有 18.4 万 Star。

**项目地址：**https://github.com/anthropics/skills

## 一个文件夹就是一项技能

Skill 的门槛低到有点意外——一个文件夹，里面一个 SKILL.md，开头是 YAML 元数据，只有 name 和 description 两个必填字段。

![一个 Skill 的结构：SKILL.md 里的 name、description 和具体指令](https://cdn.sanity.io/images/4zrzovbb/website/6f22d8913dbc6228e7f11a41e0b3c124d817b6d2-1650x929.jpg)

description 负责说清「这个技能干什么、什么时候该用」，Agent 启动时只读这两行元数据，真正用到时才把正文加载进来。这就是它比「全塞进系统提示词」更省上下文的地方。

![渐进式披露：Agent 只在需要时才加载技能的详细内容](https://cdn.sanity.io/images/4zrzovbb/website/a3bca2763d7892982a59c28aa4df7993aaae55ae-2292x673.jpg)

仓库里已经有一批可以直接抄作业的例子：docx、pdf、pptx、xlsx 这四个是 Claude 文档能力背后的生产级技能；frontend-design 管 UI 的视觉决策；mcp-builder 教你写出质量过关的 MCP server；还有一个 skill-creator 用来生成新技能。官方说明很直白——这些技能是演示和教学用途，但文档类那几个确实是线上跑着的实现。

## 装起来只要两条命令

用 Claude Code 的话，先把这个仓库注册成插件市场：

```
/plugin marketplace add anthropics/skills
```

再挑要装的那一组：

```
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

装完不用记命令，直接提需求就行，比如「用 PDF 技能把这份文件的表单字段提取出来」。Claude.ai 付费版里这些示例技能已经内置，走 API 的可以看官方的 Skills API Quickstart。

![技能被触发后可以直接执行代码来完成任务](https://cdn.sanity.io/images/4zrzovbb/website/c24b4a2ff77277c430f2c9ef1541101766ae5714-1650x929.jpg)

自己写技能也不需要脚手架：建个文件夹，按仓库里的 template 填一份 SKILL.md 即可，spec 目录下还有完整的标准说明。

## 为什么值得关注

Agent Skills 早就不只是 Claude 的东西。2025 年 12 月公开为标准后，ChatGPT、Cursor、GitHub Copilot、VS Code 等 70 多个平台陆续接入，社区发布的技能累计约 100 万份，安装量接近 2.8 亿次。今年 10 月 22 日，Anthropic 把这项标准连同名字、Logo、GitHub 组织和 agentskills.io 域名一起捐给了 Linux 基金会旗下的 Agentic AI Foundation——和当初 MCP 走的同一条路。

适合两类人：想给团队 Agent 定规矩的，照着 spec 写就行；想找现成技能直接用的，skills/ 目录下十九个例子基本覆盖了文档处理、前端设计、MCP 开发和测试。它不是开箱即用的产品，更像一份写得比较完整的参考答案。

