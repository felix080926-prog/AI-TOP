---
title: "1500 个技能包，我全收藏了"
date: 2026-09-03
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-09-03.webp"
    hiddenInList: false
---

上周五，我把一段写了俩小时的测试生成 Prompt 删了。

因为旁边同事甩过来一个 GitHub 链接，里面躺着几十个现成的测试技能，Playwright、pytest、Cypress 全都有，直接拿来用，写得比我自己搓的还细。

这个仓库叫 awesome-agent-skills，干的事一句话就能说清：把全球官方团队和社区发布的 Agent 技能攒成一个清单，供你挑。目前 1497 个，还在每天涨。

**项目地址：**https://github.com/VoltAgent/awesome-agent-skills

![VoltAgent/awesome-agent-skills 项目主页](https://github.com/user-attachments/assets/a890e563-e999-4b1f-8ce1-20399b0574f8)

## 清单里都有啥

Anthropic 官方的文档全家桶在——docx、pptx、xlsx、pdf，让 AI 直接读写 Office 文件的那种。

Stripe 的支付技能、Supabase 的数据库技能、Google Gemini 的官方技能、微软的、OpenAI 的、Vercel 的、Cloudflare 的……六十多个官方团队，整整齐齐排在目录里。

社区部分更野。有人贡献了「用自然语言操作 Git 历史」这种刁钻技能，有人把四十多个测试框架的代码生成技能打包了进来，还有抓网页的、做设计的、写营销文案的。

这仓库最值钱的地方就两个字：挑过。

README 里明说，Hand-picked, not AI-slop generated。不是拿 AI 批量糊出来的技能山，是一个一个筛过、真有人在用的。在「AI 生成垃圾」满天飞的现在，这一点比什么都重要。

![社区贡献的技能，已经有人拿去做出真产品了](https://cdn.voltagent.dev/awesome-repo/everyfeed-social.png)

## 怎么用，三步

打开仓库，目录按团队和用途分好了。

搜「测试」「设计」「文档」，找到想要的技能。点进去看说明，复制到你自己 AI 工具的 skills 目录里（Claude Code 是 .claude/skills，Cursor、Codex 也都有对应位置）。完事。

而且这清单是兼容全家桶的：Claude Code、Codex、Cursor、Gemini CLI、GitHub Copilot、Windsurf、OpenCode 全都认。一份技能，走到哪儿都能用，不用每个工具重新找一遍。

最让我意外的是它还配了个目录网站 officialskills.sh，技能太多翻不过来的时候，去网站上按团队筛，比在仓库里翻快得多。

![配套的 LaunchKit 能直接给你的 AI 一个能跑的起步项目](https://cdn.voltagent.dev/awesome-repo/new-launchkit.png)

当然，它也不是万能的。技能清单只是「说明书」，装上之后效果好不好，还得看你的 AI 工具本身。1497 个技能也不可能挨个验证过，社区部分偶尔会有过期的，用之前扫一眼更新时间，能省不少事。

但说真的，这种「别人踩过的坑，整理好了放你面前」的东西，属于看一眼就回不去的那种。

下回你想让 AI 干点新活，别急着自己写 Prompt。先去这个仓库搜一圈，大概率有人已经干过了。

项目地址：https://github.com/VoltAgent/awesome-agent-skills

