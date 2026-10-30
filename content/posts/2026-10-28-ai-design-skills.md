---
title: "AI 设计技能库，一天涨了 1400 星"
date: 2026-10-28
draft: false
categories: ["多模态创作"]
tags: ["多模态创作"]
cover:
    image: "covers/2026-10-28.webp"
    hiddenInList: false
---

10 月 27 日，GitHub 全语言日榜第一的位置，被一个只有两份 Markdown 文件的仓库占了。

更反常的是它的时间线：仓库 7 月 29 日创建，首提交只有一份 SKILL.md，之后整整一个季度没有任何动静——没有发版，没有 issue 潮，就那么挂着。10 月 25 日深夜它突然推了一份新技能文件，第二天补了一次署名提交，第三天就冲上了日榜第一：单日涨 1,395 Star，总量来到 9,500 左右，fork 680 多个。同一天，几个设计圈账号和一批技术博客把它写了一遍。

这件事本身说明了一个趋势：决定 AI 产出好坏的，越来越不是模型，而是喂给它的那份规则文件。

最近几个月，Claude Code、Cursor、Codex、Windsurf 这类编码工具都开始读一种叫 SKILL.md 的 Markdown 规则文件。同一个模型，配一份含糊的提示词，产出的页面就是千篇一律的紫色渐变加居中大标题；换一份把字体、间距、圆角全列死的规则文件，产出立刻换了个档次。于是"写规则"这件事，从个人技巧变成了可以开源、可以复用的资产。

这次被顶上榜首的仓库叫 ai-design-skills，出品方是设计工作室 Elaya。

![GitHub 官方仓库卡片：elayadesign/ai-design-skills](https://opengraph.githubassets.com/1/elayadesign/ai-design-skills)

**项目地址：**https://github.com/elayadesign/ai-design-skills

## 它到底写了什么

仓库里目前稳定可用的是 landing-page-design 这一个技能，内容分两半。Part A 管"说什么"：先反问需求方（转化目标是什么、访客落地前已经知道什么、手上有什么素材、品牌语气偏哪边），再决定页面结构和转化文案，顺带把 SEO 和上线前的检查清单列出来。

Part B 才是它出圈的原因——一套不留余地的视觉系统：

- 字体只允许 Geist、Manrope、Geist Mono、Poppins 四个，明确禁用 Inter、Roboto、Arial、Open Sans、Helvetica；全站一个字体，不用斜体，字重不超过 bold
- 间距只有 13 个 token，从 0 到 96px；字号必须落在 Tailwind 的档位上
- 圆角有公式：嵌套圆角等于外层圆角减间距
- 背景一律平涂，不许渐变；图标只许 Phosphor、Solar、Iconamoon，禁用 Material
- 动效只动 transform 和 opacity，并且要尊重系统的减弱动效设置
- 文案不许出现连字符、不许出现孤字，禁用 revolutionize、supercharge 这类空话

它的思路是把主观的"好不好看"，翻译成 AI 能执行的硬约束。规则写死之后，模型就从随机游走变成了轨道行驶。

## 那份新技能文件更狠

10 月 25 日深夜推上去的那份叫 design-to-motion，现在已经拆到作者的独立仓库。它要解决的是另一个问题：把一张静态设计稿，变成像素级还原的循环动画视频。

流程分三段。第一段是还原：从 Figma 拉图层树和参考渲染，按三倍分辨率逐个导出图层，然后用 PSNR 逐容器比对还原度，整体要求 35dB 以上，单容器 30dB 以上——"像不像"第一次变成了一组可以念出来的数字。

第二段是让每个元素演出自己的功能：列表进新条目、折线图游标滑过曲线、输入框删了重打。每张卡片一个故事，三到八秒，卡片之间错开节奏，整个循环 12 秒，入场、正戏、溶解回空态、空拍四段排得明明白白，跑不完就延长循环，不许剪戏。

第三段最硬核：明确禁止实时录屏。改用 Playwright 装一个假时钟，按 17、17、16 毫秒的节奏凑出精确的 1000/60，逐帧截图，再交给 ffmpeg 编码成发 X 用的 MP4 和放官网的 GIF。

![Elaya 作品集里的循环动画展示，800×500 正是 design-to-motion 的默认 GIF 输出尺寸](https://framerusercontent.com/images/6vmUDELRomrTWCThM5dq4GiSE6Y.gif?width=800&height=500)

## 装起来只要三条命令

以 Claude Code 为例，把技能文件夹复制进项目就行：

```bash
mkdir -p .claude/skills
git clone https://github.com/elayadesign/ai-design-skills.git /tmp/ai-design-skills
cp -r /tmp/ai-design-skills/skills/landing-page-design .claude/skills/
```

Cursor 用户直接把规则文件拉到本地：

```bash
mkdir -p .cursor/rules
curl -o .cursor/rules/landing-page-design.md \
  https://raw.githubusercontent.com/elayadesign/ai-design-skills/main/skills/landing-page-design/SKILL.md
```

Codex 放进 AGENTS.md，Windsurf 放进 .windsurfrules，Cline 放进 .clinerules，没有终端的场景把 SKILL.md 上传到 Claude 的 Project 也可以。装完不用记任何命令，用自然语言说要一个落地页就行。

![Elaya 作品集里的循环动画展示](https://framerusercontent.com/images/gx2OnKl9RO4oEWhNRBI0HBzJJ14.gif?width=800&height=500)

## 值不值得跟

真正值得抄走的不是字体白名单，而是那条方法论：把验收标准写进创作流程。像不像等于 PSNR 大于 35dB，顺不顺等于循环首尾帧逐像素相等，漏没漏等于蒙版外像素零变化。判断从人的眼睛移交给断言之后，AI 的产出才第一次变得可检查、可复现。

两个提醒。一是这套规则默认英文 SaaS 场景，中文字体和行高都没覆盖，做中文页面要自己改设计值那一节。二是 design-to-motion 的完整流水线需要 Figma token、Playwright、ffmpeg 三样齐全，网页版 Claude 装上只能看规则、跑不动流程；仓库还是单贡献者、没有 release 和版本策略，真要引进项目，建议锁 commit 再改。

它更适合独立开发者，以及小团队里兼顾设计的那类人——想快速做出一个不像模板的落地页，又不想为设计系统单独搭一套规范。至于能不能替代设计师，从这份文件对像素和断言的执念看，它更像是把设计师的判断固化成了一条可以执行的产线。

