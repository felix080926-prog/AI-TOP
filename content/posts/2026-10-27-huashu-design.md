---
title: "专治 AI 味的设计技能，六个候选挑三版"
date: 2026-10-27
draft: false
categories: ["多模态创作"]
tags: ["多模态创作"]
cover:
    image: "covers/2026-10-27.webp"
    hiddenInList: false
---

AI 出图这件事现在基本没人怀疑了，但 AI 出的**设计**——网页、PPT、App 界面——多数还是那股熟悉的味道：紫蓝渐变打底，圆角卡片排排站，标题用 Inter，图标用 emoji，标题上面再加一行全大写的小标签。看一眼就知道是模型生成的。

问题不全在审美，更在"看不到就选不了"。让人对着"极简、商务、科技感"几个词盲选风格，选出来的东西大概率长得像隔壁项目。

GitHub 上有个项目就是冲着这件事来的：**huashu-design**（花叔 Design）。它是一套装进 AI Agent 里的设计技能包，在 Claude Code、Cursor、Codex 这类支持 skills 的终端 Agent 里说一句话，就能拿到网页、可点击的 App 原型、能编辑的 PPT、动画 MP4 或者印刷级信息图。目前 2.6 万 Star，MIT 协议，商用也免费。

**项目地址：**https://github.com/alchaincyf/huashu-design

## 先看六个，再做三个

3.0 版重做了"出方向"这一步，也是这个项目最值得看的地方。

需求一模糊，它不会直接开做，而是先用三套互补的逻辑各出两个候选，凑成六个：一套去找"如果预算不设上限，这个活儿该交给哪位设计师"；一套去找同媒介的获奖作品，用 `ref_board.py` 把参考站截成参考板，Agent 亲眼看过再动手；一套干脆用 `date +%S` 取秒数，从风格库里随机抽一个，用来打破惯性。

六个候选先画成一页缩略图，挑出最强、彼此最不像的三版做成完整稿让你看，剩下三张当备选一起给你。**摆出来，看着选**，而不是让人在看不见东西的时候先拍板。

![富岳三十六景线上展首屏，由 3.0 生成](https://github.com/alchaincyf/huashu-design/releases/download/v3.0.0/case-hokusai-hero.jpg)

底层是 84 种 HTML 原生风格库：网页 20 种、PPT 20 种、信息图 20 种、App 12 种，另外还有 12 种中文与东亚方向（宋刻本版式、民国书衣、香港街招这些）。每种都配了样张和源码，纯 CSS，不需要生图。

![App 分区的 12 种风格样张](https://raw.githubusercontent.com/alchaincyf/huashu-design/master/assets/style-specimens/sheet-app.jpg)

## 它记得你做过什么样子

单个项目看着都不错，摆在一起却像同一个人做的——这是长期用 AI 做设计最容易掉进去的坑。

3.0 加了两样东西治它。一是**外观账本**：每次交付记一笔"长什么样"（底色、色板、字体、版式骨架），下个项目主动避开。二是**设计体检**（`scripts/design_lint.py`）：只量能核对的事实——图裂了、字号小到读不了、对比度不够、控制台报错，这些是红灯；全大写小标签、"A · B · C"中点连接、标题尾巴那个"→"，这些 2026 年的新一代模板装饰是黄灯。好不好看它不打分，交给人判断。

另一条硬规则是**品牌资产协议**：涉及具体品牌时强制走五步——问、搜官方品牌页、下载资产、从资产里 grep 出所有色值按频率排序、固化成 `brand-spec.md`。核心是"绝不从记忆里猜品牌色"。作者做过 A/B 测试，走这套流程的版本稳定性方差比不走的低 5 倍。

![黑洞科普 PPT 四页，事实先过核查再上页面](https://github.com/alchaincyf/huashu-design/releases/download/v3.0.0/case-blackhole-pages.jpg)

## 装起来就一行命令

```bash
npx skills add alchaincyf/huashu-design
```

装完值得多看一眼安装目录（比如 `~/.claude/skills/huashu-design/`）。这个 skill 不只是 `SKILL.md` 一个文件，`references/`、`assets/`、`scripts/`、`demos/` 四个子目录里有 99 处被引用的配方和素材。如果只有主文件，说明 `skills` CLI 版本太旧，升级后再装一次：

```bash
npm i -g skills@latest
```

实在不行用 git 兜底：

```bash
git clone https://github.com/alchaincyf/huashu-design.git ~/.claude/skills/huashu-design
```

它适合两类人：经常要做原型、deck、信息图但不想打开 Figma 的独立开发者和小团队；已经在终端里用 Agent 干活、希望把"设计"这一环也塞进对话流的人。

边界作者写得很清楚：图层级可编辑的 PPTX 到 Figma 不支持，3D、物理模拟、粒子系统这类 Framer Motion 级别的动画超出范围，完全空白的品牌从零设计质量会掉到 60–65 分。核心链路（设计 → 渲染 → 导出 MP4/PDF/PPTX）完全本地跑，零网络零 key；云端配音和看片评审隔离在 `scripts/cloud/` 里，可选；本机记录只写在 `~/.huashu-design/`，删掉文件夹就全部忘记。"这是一个 80 分的 skill，不是 100 分的产品。"

对愿意让 Agent 在终端里干活的人来说，80 分的 skill 往往比 100 分的产品更顺手。

