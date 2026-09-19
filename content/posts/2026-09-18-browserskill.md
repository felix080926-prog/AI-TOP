---
title: "腾讯开源 BrowserSkill，AI 借你浏览器干活"
date: 2026-09-18
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-09-18.webp"
    hiddenInList: false
---

9 月 16 日，腾讯 AI 的官方账号在 X 上发了条消息：开源了 BrowserSkill。消息发出后没多久，这个项目就冲上了 GitHub Trending 榜首，单日涨了 1300 多 Star，现在总 Star 数已经到 4300。一个大厂动作加上这种增速，圈子里这两天都在聊它。

这件事本身不复杂，但它踩中了一个特别真实的痛点。过去一年 AI Agent 越做越强，能写代码、能查资料、能订票，可一到"帮你操作网页"这一步就卡住。原因很直接：你的浏览器里有登录态、有 Cookie、有已经通过验证的会话，而 AI 拿到的往往是一个干净的、什么都没登录的浏览器。于是只能二选一——要么让 AI 重新登一遍账号、重新走一遍验证流程，要么冒着风险把登录态塞给它。前者麻烦，后者危险。

BrowserSkill 换了个思路：不给你一个新的浏览器，而是让 AI 借用你已经登录好的那个浏览器。

![BrowserSkill banner](https://raw.githubusercontent.com/Tencent/BrowserSkill/main/docs/assets/browserskill-readme-banner.png)

它由两部分组成：一个用 Rust 写的命令行工具 `bsk`，加上一个浏览器扩展。AI Agent 通过 shell 调 `bsk`，`bsk` 转给本地守护进程，守护进程再通过本地 WebSocket 连到扩展，扩展在浏览器里开一个独立的 Agent Window 干活。整条链路都在本地完成，数据不出机器。

几个值得说的点。

一是登录态直接复用。你在 Chrome 里登录好的内网系统、SaaS 后台、各种要账号的网站，AI 都能直接操作，不用注册测试账号，不用手动导出 Cookie。官方在测试里用它从京东、BOSS 直聘这类网站上抓商品、翻评论、提取职位信息，原本要几个小时的活，大概 40 分钟就干完了。

二是"借用"机制设计得很克制。AI 不能随便动你的标签页。想碰你正在用的那个标签，必须显式地"借"，用完还得"还"，其余标签一律不碰。你自己的窗口该怎么用怎么用，AI 在单独的 Agent Window 里跑，两边互不打扰。而且这个"借之前要确认"的开关放在浏览器设置里，不是放在某个容易被话术绕过的配置项里，所以 Agent 没法偷偷绕过它。

三是"人在环里"。碰到验证码、登录确认、二次验证这类只有人能过的步骤，AI 会主动停下来，把控制权交还给你，你处理完它再接着跑。这对"半自动化"场景特别友好——把机械的部分交给 AI，把需要判断和验证的部分留给人。

![Chrome Web Store 中的 BrowserSkill 扩展](https://raw.githubusercontent.com/Tencent/BrowserSkill/main/docs/assets/browserskill-chrome-web-store-screenshot-1280x800.png)

还有一个容易被忽略的点：它不绑定任何一家框架。只要 Agent 能调 shell，就能用 `bsk`。Cursor、Claude Code、Codex、OpenClaw、CodeBuddy、WorkBuddy，甚至 Hermes Agent，全都接得上。这意味着它不是某个工具的专属插件，而是一层通用的底座——你今天用 Cursor，明天换 Claude Code，底层这套浏览器能力不用跟着重装。

对大厂来说，开源一个浏览器桥接工具不算惊天动地，但它的方向很值得看。Agent 的下一步，大概率不是继续在"干净的沙盒"里打转，而是安全地接入人已经习惯的、真实的数字环境。登录态、会话、验证码，这些"人味"十足的东西，恰恰是 AI 最缺、也最难绕过的部分。BrowserSkill 用 MIT 协议开源，一条命令就能装，值得正在折腾 Agent 自动化、又被登录态卡住的人去看看。

**项目地址：** https://github.com/Tencent/BrowserSkill

项目地址：https://github.com/Tencent/BrowserSkill

