---
title: "Gems 谢幕，Google 开源了 Gemini 技能库"
date: 2026-10-14
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-10-14.webp"
    hiddenInList: false
---
10 月 13 日，就在昨天，Google 在官方博客确认：Skills 开始向 Gemini App 全量滚动推送，取代过去那套叫 Gems 的自定义助手。对老用户来说，这意味着用了好几年的 Gems 正式进入谢幕倒计时——11 月先被移进设置面板，最迟到 2027 年彻底下线。

这次换血背后是一个更大的信号：Google 把「技能」押在了开放的 Markdown 原生 SKILL.md 标准上。一个 skill 就是一个装着 SKILL.md 文件的目录，里面写清指令和参考资料，任何平台都能读、能改、能搬走。这么做的逻辑不难理解——Anthropic 先公开了 Agent Skills，Vercel 在做 skills.sh 生态，与其各家搞一套私有的提示词格式，不如大家都写同一种文件，让技能真正流动起来。

![Google 官方 Gemini Skills 宣传图](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Skills_thumbnail.width-1300.png)

开发者这一侧，Google 给出的答案是一个 GitHub 仓库：google-gemini/gemini-skills，专门给 Gemini API、SDK 和模型/agent 交互准备的官方技能库。

**项目地址：**https://github.com/google-gemini/gemini-skills

仓库现在收着三个技能。核心是 gemini-api-dev，覆盖用 Gemini API（Interactions API）搭应用的全流程：文本生成、多轮对话、流式输出、function calling、结构化输出、图像生成，还有托管 agent 和 Deep Research，Python 与 TypeScript 两套 SDK 都带了示例。gemini-live-api-dev 管实时双向流式场景，WebSocket 音视频、语音活动检测、会话管理这些。gemini-omni-flash-api 则针对视频生成，围绕 Gemini Omni 1.1 Flash 做视频编辑和首尾帧过渡。

技能到底有没有用，Google 给了硬数据。他们造了 117 个测试 prompt，让模型分别「裸跑」和「带上 skill」去写 Gemini SDK 代码，评判标准是会不会误用旧 SDK。结果是：Gemini 3.1 Pro 从 28.2% 的正确率跳到 96.6%，Gemini 3.0 Pro 从 6.8% 拉到 93.2%。一个几 KB 的 SKILL.md，能把模型写出「符合最新最佳实践」代码的能力从不及格拉到接近满分。

![Gemini API Skills 官方横幅](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_API_Skills_Banner_v2.original.png)

装起来就一条命令。用 Vercel 的 skills CLI：

```
npx skills add google-gemini/gemini-skills --skill gemini-api-dev
```

或者走 Context7：

```
npx ctx7 skills install /google-gemini/gemini-skills gemini-api-dev
```

用 Claude Code 的话，在会话里 `/plugin marketplace add google-gemini/gemini-skills`，再 `/plugin install gemini-skills@gemini-skills`；Cursor 直接 `/add-plugin google-gemini/gemini-skills`；Codex 则是 `codex plugin add gemini-skills@gemini-skills`。装完这些 skill 会被注入 coding agent 的上下文，写 Gemini 相关代码时自动给出最新模型与 SDK 的指引。

这个仓库今天一天涨了 465 颗 Star，总量 4272。要说明的是，它在 README 里自己标了「非 Google 官方支持产品」，这是 Google 开源项目一贯的免责声明。但对正在拿 Gemini 搭东西的人来说，官方团队亲手维护、跟着 SDK 迭代走的技能库，比翻三天文档更省事。Gems 要走了，但「技能」这件事，才刚开始。
