---
title: "去 AI 味的 Agent 技能，5.5 万 Star"
date: 2026-10-09
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-10-09.webp"
    hiddenInList: false
---
AI 生成的东西越来越多，但"一眼 AI"的文字也越来越多：动不动就"划时代的里程碑"，每段都要凑三个并列项，结尾还得甩一句"Let that sink in"。这些痕迹堆在一起，读起来就是一股机器腔。

GitHub 上的 blader/humanizer 专门解决这件事。它是一个纯 Markdown 写的 Agent 技能，本身不是程序，而是一套规则：把 AI 生成的文字改写成像人写的，同时不改变原意、不凭空加料。Claude Code、Codex 这些支持 skill 的 Agent 都能直接挂上它。

**项目地址：**https://github.com/blader/humanizer

它的判断标准来自维基百科的《Signs of AI writing》——就是维基编辑们用来揪 AI 生成文本的那份指南。项目把它整理成 26 条可检测的模式，按"机器腔的明显程度"排好序，再配一套"识别 → 改写 → 审计 → 再改写"的流程。

![Humanizer 在 skills.sh 上的项目主页](https://www.skills.sh/blader/humanizer/opengraph-image?195d45ea74f8736c)

两个地方做得比较扎实。

一是它不改事实。名字、数字、日期、引用，原文没有的一律不编，原文有的必须保留；缺了某个信息就停下来问，而不是自己填一个。这让它和"同义词替换"式的改写工具拉开距离——那些工具常常句子改顺了，意思也改没了。

二是它能学语气。给它 2-3 段自己写的文字当样本，它会照着样本的句子节奏、用词习惯和标点偏好来改，而不是输出一份"标准答案式"的干净文本。官方还做过盲测：16 组对比里，评审 16 次全部更偏好改写后的版本。

装起来只要几步。它是 Markdown 技能，Claude Code 用户走插件市场：

```
/plugin marketplace add blader/humanizer
/plugin install humanizer@humanizer
```

其他 Agent 用 Skills CLI 全局装一条命令：

```
npx skills add blader/humanizer --global
```

装完在支持的 Agent 里直接敲 `/humanizer`，把文字粘进去就行；想让它照着特定语气改，就先贴一段写作样本。

这个项目从今年 1 月发布到现在，攒了 5.5 万 Star。它的走红反映的是同一个趋势：AI 写作已经过了"能不能生成"的阶段，现在的问题是"生成的东西能不能署自己的名发出去"。

![blader/humanizer 的 GitHub Star 数](https://img.shields.io/github/stars/blader/humanizer?style=flat)

有两点要说明：它的规则库主要针对英文，对中文"AI 味"的识别会弱一些；而且它明确说过，绕过 AI 检测器不是它的目标，检测器现在仍能标出它的大部分输出。换句话说，它帮的是"让文字像人写的、读起来舒服"，不是"骗过检测器"。

适合谁用：经常要发文档、写邮件、出方案，又不想让文字透着机器腔的人；或者想让自己 Agent 产出的文字更像人话的人。它是一个把"去 AI 味"这件事系统化、规则化的工具，值得放进写作类 Agent 的默认技能列表。
