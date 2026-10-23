---
title: "Cloudflare 把安全审计做成 AI 技能"
date: 2026-10-21
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-10-21.webp"
    hiddenInList: false
---

Cloudflare 下场了。这家做 CDN 和安全起家的大厂，这几天在 GitHub 上丢出一个叫 security-audit-skill 的开源项目——一个给编码 Agent 用的「安全审计技能」。发布没两天就冲上 GitHub Trending 榜首，单日涨了 1700 多 Star，现在总 Star 已经 3.4 万。HN 上有人在讨论，科技媒体也陆续跟进，圈里都在传这件事。

这件事背后，是今年 AI 圈一个越来越明显的趋势：**「Agent Skills」正在成为给 AI 封装能力的新标准。** 以前想让 AI 干点专业活，要么靠 prompt 硬调，要么自己写一堆工具函数。现在更省事的做法，是给 Agent 直接「装一个技能」——一个打包好完整流程、提示词和校验逻辑的目录，装上就能用。Claude 生态把这套 SKILL.md 的路子走通了，skills.sh 这样的技能市场也起来了。而 Cloudflare 这次做的，是把「安全审计」这种最需要严谨、最怕 AI 胡说的专业流程，打包成了一个开源技能。

这个项目就是 cloudflare/security-audit-skill。

**项目地址：**https://github.com/cloudflare/security-audit-skill

它干的事很直接：把一个编码 Agent 变成一个安全审计员。关键是它不允许 Agent「随便扫一遍、列一堆可能存在风险的条目」就交差，而是强制跑一个六阶段流程——侦查（摸清架构、信任边界和输入面）、按覆盖率驱动狩猎（按攻击类别分派独立的 hunter）、候选验证（每条发现交给一个全新的 verifier 去证伪）、结构化输出（把 confirmed / needs_validation / rejected 写成带 schema 的 findings.json）、独立记录复核（再用一批全新 Agent 核对最终结论）、目标中立报告。

最狠的一条设计是「对抗式验证」：**负责核实一条漏洞的 Agent，永远不是当初发现它的那个 Agent。** 两个彼此独立的 Agent 互相拆台，一个负责挑刺、一个负责证伪，误报率被硬生生压下去。而且它只认「真正打破信任边界、有实际影响」的问题——severity 必须等于「可能性 × 影响」，而不是「偏离了检查清单」这种空洞的扣分。

![Cloudflare 官方发布 security-audit-skill 的博客头图](https://blog.cloudflare.com/_emdash/api/media/file/01KW9WMH2DTTTS46DXHQ9KHJE0.png)

装起来也就一条命令，用 Skills CLI：

```bash
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit
```

装好之后，把编码 Agent 指到要审的代码库，说一句「security audit this codebase」，整个流程就会自己跑起来，产出一份 REPORT.md 和结构化的 findings.json。

![security-audit-skill 的多阶段审计流程示意](https://blog.cloudflare.com/_emdash/api/media/file/01KW9WMN251F34ZTSWBSZFKY4D.png)

这个技能真正值得关注的地方，不在它本身，而在它是 Cloudflare 内部那套「漏洞挖掘流水线」的公开起点。按官方博客的说法，他们从一个约 450 行的 skill 起步，六周后就把它扩成能覆盖 128 个仓库的舰队级扫描系统，最终在 145 个仓库里沉淀出 1.3 万多条发现。更值得琢磨的是那条「双模型交叉验证」的思路：**发现漏洞用一套模型，验证漏洞用另一套完全不同的模型**，让两套互不相同的逻辑互相挑错。这背后是个朴素的判断——同一套模型看代码，永远是同一副眼镜，交叉验证才能把盲区补上。

对做 AI 应用的团队来说，这个项目给了一个现成的答案：当 AI 已经能大量写代码的时候，也该有 AI 来系统地审代码了。让 Agent 去审计 Agent 写出来的东西，可能正是下一个阶段安全工具该有的样子。

