---
title: "让 Agent 自己开浏览器，为什么总在登录页翻车？实测 Vercel 的 agent-browser"
date: 2026-08-31
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-08-31.webp"
    hiddenInList: false
---

周三下午，我让 Claude Code 确认后台页面的「本月活跃用户数」。它拉起 Playwright，十分钟截图三次：一次卡在登录页，一次点到广告弹窗，最后一次进去了，读出来的却是「加载中」——数据是接口异步渲染的，它等不来。

我正打算自己上手，刷到 GitHub Trending：vercel-labs/agent-browser 一天涨 797 颗星，总星 41.5K。简介就一句：Browser automation CLI for AI agents，给 AI 用的浏览器自动化 CLI。行，看看它凭什么。

## 两分钟装好，全程没让我碰 Playwright

安装比预期简单。先 npm install -g agent-browser，再跑 agent-browser install，自动从 Chrome for Testing 官方源下载专用 Chrome。全程两分多钟，一半在下载浏览器。

有个点让我意外：没让我装 Playwright，也不要 Node 运行时。CLI 是 Rust 原生二进制，后台常驻纯 Rust daemon，直接走 CDP 驱动 Chrome。brew 和 cargo 也能装，我在 Linux 服务器上用 cargo 装了一份，流程一样。

装完第一件事，就是把下午那个翻车页面丢给它。

## 我拿那个翻车页面重新测了一遍

先按 README 的核心工作流跑。agent-browser open 打开页面，snapshot 抓快照。注意，**它不是截图，而是一棵无障碍树**——每个可交互元素都带引用号 @e1、@e2。想点哪里就 click @e3，填表单就 fill @e4 "test@example.com"。这比「看截图猜坐标」友好太多。

第一个意外在「读」。agent-browser read <url> 直接吐出一份干净的 markdown 文本，广告、导航、脚本全剥掉，还支持 --outline 出大纲、--json 结构化。它还会自动探测站点有没有 **llms.txt**，有就直接读「为 LLM 精修过」的版本。

第二个是网络控制。network route <url> --body <json> 就地 mock 接口：我把登录接口 mock 掉，几秒搭出免登录测试环境，Agent 再不用在登录页耗 token。network requests 按状态码、方法过滤请求，顺手存 HAR 排查问题。

第三个是安全选项。--allowed-domains 把浏览器锁死在白名单域内，README 说连 WebRTC 的 DNS 泄露都堵；--content-boundaries 给页面输出加边界标记，防网页塞的恶意提示词混进 Agent 上下文；--max-output 限输出长度，防巨型页面把 context 撑爆。

还有两个小惊喜。diff url 一条命令对比两个版本的页面差异，改版回归靠它出结果；chat 能用自然语言驱动浏览器，我让它「打开官网找下载按钮，报最新版本号」，它自己走完整条链路。

最后补一刀：原生支持 MCP。agent-browser mcp 一条命令起 MCP server，Claude Code、Cursor 直接挂成工具集，工具参数带类型。我就是这么把它挂进下午那个会话的——同一个页面，这次一次过了，读出了真实用户数。

## 逛 repo 的三个印象

一是血统。Vercel Labs 出品，Apache-2.0，2026 年 1 月才建仓，七个半月做到 41.5K 星、2.7K fork，最近一次 push 就在今天。

二是工程洁癖。React DevTools hook 和 axe-core 引擎直接编进二进制：react tree、react renders 看组件树和渲染记录，a11y 一条命令出审计报告。浏览器 CLI 做到这深度，团队是真把它当基础设施做。

三是生态玩法。插件系统能外挂验证码求解、云浏览器供应商；iOS 模拟器里的真 Safari 也能控制；官方还给 Claude Code、Cursor、Codex 做了 skill，一行接入。

## 我的结论

如果你的 Agent 要碰浏览器，且你在意稳定性和上下文成本，agent-browser 值得装。最打动我的不是功能多，而是**「为 AI 而设计」贯穿每个细节**——refs 快照、llms.txt、输出上限、注入防御，全冲着让 AI 少犯错、少烧 token。

偶尔查个网页，浏览器插件够用，不必折腾。但如果你在搭自动化测试、数据采集、RAG 管道，或者被 Agent 在网页上反复翻车折磨过，建议今天就装。

项目地址：https://github.com/vercel-labs/agent-browser

