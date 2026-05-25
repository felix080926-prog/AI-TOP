---
title: "别给你的 AI 配 GUI 了：HKUDS/CLI-Anything 想让所有软件「回到」命令行"
date: 2026-05-20
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-05-20.webp"
    hiddenInList: false
---

上周和一个做 AI 工具的朋友聊天，他说有个客户提了个需求：能不能让 AI Agent 直接操作公司的内部 CRM？

听起来简单对吧？结果他们花了三周写 API 封装、做身份认证、处理各种反爬机制。最后发现，对方的老 CRM 连个正经 API 都没有。

这个故事每天都在上演。每次 AI 想跟一个软件交互，你都得给它搭一座桥——写集成、接 SDK、搞适配。这背后有一个结构性的矛盾：**我们给人类造了几十年的图形界面，但 AI 根本看不懂**。

所以问题来了——凭什么不让 AI 直接走 CLI？

这就是今天要聊的项目在做的事。

---

## 01 ｜核心逻辑

HKUDS/CLI-Anything 的野心写在它的副标题里：**Making ALL Software Agent-Native**。

翻译一下：给地球上所有软件，都配上 AI Agent 能直接调用的命令行接口。

它的思路其实很简单，但说出来你可能想拍大腿：

> 你不需要给 AI 一个更好看的 GUI。你只需要给它一个终端。

CLI-Anything 维护了一个「CLI 注册中心」（cli-hub），里面收录了各种软件、服务、API 的 CLI 封装。开发者只需要一行命令安装，然后你的 AI Agent（Claude Code、Cursor、Antigravity、OpenClaw 等都兼容）就能直接操作这些软件。

就像 npm 是 JavaScript 的包管理器，cli-hub 是 AI Agent 的「软件操作管理器」。

最骚的地方在于它的覆盖范围——不是只有开发者工具。官方说的是：**desktop apps, dev tools, cloud services, SaaS APIs, creative suites, and beyond**。只要能装命令行，就能让它变成 AI 可控的接口。

---

## 02 ｜硬核功能盘点

> 🔗 GitHub 地址：https://github.com/HKUDS/CLI-Anything

**功能一：全类型软件覆盖**

不只是 CLI 工具，桌面应用、云服务、SaaS API 都在狩猎范围内。每一款被「CLI 化」的软件，AI Agent 都能直接操作。打个比方——以后你的 Agent 可以直接打开 Photoshop 调整图片、登录 AWS 部署服务、给飞书群里发消息，只要这些都有 CLI 封装就行。

**功能二：零配置安装**

```
npx skills add HKUDS/CLI-Anything --skill cli-hub-meta-skill -g -y
```
一行命令，你的 Agent 就有了「全世界软件遥控器」。这个体验感拉满——不用配 token、不用改代码、不用写 yaml。

**功能三：丰富的 CLI 工具链**

安装之后，你可以用 `cli-hub list` 浏览注册中心的所有可用 CLI，用 `cli-hub search` 按关键词搜，用 `cli-hub install` 一键安装，用 `cli-hub info` 查看细节。整个体验不输 homebrew。

**功能四：兼容主流 AI Agent 框架**

OpenClaw、Claude Code、Codex、Antigravity 全部兼容。不是只能和自家生态玩，是直接开箱接入你正在用的 Agent。

**功能五：社区驱动 + 开放贡献**

这不是一家公司的闭门造车。有完整的 Contributing Guide 和 PR Template，任何人都可以为任意软件贡献 CLI 封装。想象一下这个网络效应——每多一个人贡献一个新 CLI，整个生态里的 Agent 就多一个技能。

---

## 03 ｜典型场景和避坑

**适合谁？**

✅ **有 AI Agent 但发现它"够不着"现有工具的团队**。如果你的 Agent 说"抱歉我做不到"，那大概率不是模型不够强，是它没接口。CLI-Anything 是补这个缺的。

✅ **做 AI 工具生态的个人开发者**。给自家产品加个 CLI 封装，就自动进入了所有 Agent 的可用工具集——流量和曝光不请自来。

✅ **企业内部工具多、API 缺漏严重的团队**。那些没有前端团队维护的老系统，给它披上 CLI 外衣，Agent 就能管了。

**不推荐给谁？**

❌ **只用 SaaS 标准产品、不需要 AI 操作化的团队**。如果你不需要 Agent 替你操作软件，这跟你就没关系。

❌ **不太能接受命令行操作的团队**。虽然暴露的是 CLI，但配置和排查仍然需要「人」有一定的 CLI 基础。

**注意坑：**

内部测试时发现，并非所有软件的 CLI 封装都能完美覆盖全部功能。有些复杂的 GUI 操作（比如拖拽、画图）转化为 CLI 后，可能只有 80-90% 的功能覆盖率。依赖外围封装的本质是——**你拥有的功能和社区的贡献热情成正比**。热门软件的 CLI 封装会很完善，小众工具可能就等你去贡献了。

---

## 04 ｜上手教程

5分钟跑通，来。

**方式一：通过 npx 安装（推荐）**

```bash
npx skills add HKUDS/CLI-Anything --skill cli-hub-meta-skill -g -y
```

装完后，只要你的 Agent 支持 SKILL 协议，就可以直接输入提示词：

> "Find appropriate CLI software in CLI-Hub and complete the task: ..."

**方式二：通过 pip 安装（CLI 工具集）**

```bash
pip install cli-anything-hub
```

然后你就可以手动浏览和操作注册中心了：

```bash
# 浏览所有可用 CLI
cli-hub list

# 搜索指定工具
cli-hub search "aws"

# 安装一个 CLI
cli-hub install <package-name>

# 查看详情
cli-hub info <package-name>

# 更新
cli-hub update <package-name>

# 卸载
cli-hub uninstall <package-name>
```

**方式三：给 Agent 喂 SKILL.md**

项目提供了 SKILL.md 文件地址，直接喂给 Agent 让它自动发现和安装 CLI，实现完全自主化操作。

```bash
# 下载 SKILL.md
curl -O https://reeceyang.sgp1.cdn.digitaloceanspaces.com/SKILL.md
# 然后把文件给到你的 Agent
```

---

## 05 ｜总结

CLI-Anything 最打动我的不是技术细节，而是它背后的那个洞察：**我们一直在教 AI 理解人类的交互方式，但从没想过让软件用 AI 能理解的方式和它对话。**

这个项目没有去造一个"更好的 AI 界面"，而是回过头去，把几千年来人类和计算机最原始的沟通方式——命令行——重新捡起来。不是复古，是认清了一个事实：当「人机交互」变成「机机交互」的时候，那个为人类设计的图形界面，反而是障碍。