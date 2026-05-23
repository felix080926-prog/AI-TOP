---
title: '这位谷歌大佬写了个 AI Agent 的"技能树"——把你的编程助手从实习生变成架构师'
date: 2026-05-07
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
---

**大家好，我是雷达君。**

你有没有这样的经历？

你给 AI 编程 Agent 说"帮我重构这个模块"，它确实动了——但它不认识你们项目的测试框架，不知道你们用 ESLint 的哪个配置，不理解为什么 controller 层不能直接调数据库。

你以为你养了个高级工程师，其实它就是个"读得懂代码的新人"。

**差在哪？差在"工程视野"。**

几个月前，Google Chrome 团队的 Addy Osmani（对，就是那个写《Learning JavaScript Design Patterns》的 Addy）开始思考一个问题：

> 如果我们要让 AI Agent 真的能做好工程，需要给它装什么"技能"？

答案是——一套**工程级的技能库**。


## 01｜核心逻辑

一句话：**给 AI Agent 装上一套可插拔的"职业技能证书"**。

agent-skills 不是一个 IDE 插件，不是一个框架，而是**一整套面向工程场景的 Agent 能力包**。每个 skill 就是一个 markdown 文件，告诉 AI Agent 怎么做某个工程任务：

- "测试该怎么写"是一个 skill
- "代码审查该怎么过"是一个 skill  
- "重构该怎么分步走"也是一个 skill

AI Agent 在读你的代码之前，先读这些 skill 文件。就像你入职后先看公司的开发规范文档——懂了规矩再动手，犯错的概率低十倍。

Addy 把这些 skill 设计得非常务实。他不是在教 AI"怎么写更优雅的代码"，而是在教它"怎么在真实的工程流水线上干活"。


## 02｜硬核功能盘点

> 🔗 **GitHub 地址**：https://github.com/addyosmani/agent-skills

**1. 31 个工程技能，覆盖全流程**

从代码规范到性能分析，从测试策略到安全审查，agent-skills 目前提供了 31 个技能模块。每个都是 Addy 在 Chrome 团队二十多年工程经验的浓缩。

最实用的几个：代码审查指南、React 性能模式、渐进式重构策略、单元测试和集成测试的最佳实践、安全审查 checklist。

**2. 纯 Markdown，零依赖**

每个 skill 就是一个 `.md` 文件，不依赖任何框架或运行时。AI Agent 读 markdown 的能力远比读 structured config 好——Claude、GPT、DeepSeek 全都能用。

你甚至可以自己写 skill：在你的项目仓库里新建一个 `.claude/skills/` 目录，放你自己的工程规范进去，Agent 自动识别。

**3. 兼容所有主流 Agent 框架**

- Claude Code / Claude Desktop：直接用 MCP 配置
- Cline / Roo Code：支持 `.clinerules` 和自定义指令
- GitHub Copilot：通过 copilot-instructions.md
- Cursor：通过 `.cursorrules`
- Windsurf：通过 `.windsurfrules`

你用什么 Agent，就能用这套技能。

**4. "渐进式"设计——不是一口气灌给 Agent**

一个常见误区：给 Agent 的上下文里塞满规则，结果它什么都读了，什么都没记住。

agent-skills 的设计哲学是"按需加载"：Agent 只在需要的时候去读对应的 skill 文件。不是把全部规则塞进 prompt，而是让它知道自己"有这些技能可以用"就行。

这背后是人类学习"目录式知识管理"的思路——你不必记住每本书的内容，但你知道哪本书能解决当前的问题。


## 03｜典型场景和避坑

**适合谁用？**

- **用 Claude Code / Cursor / Copilot 写代码的团队**：让你的 AI Agent 瞬间拥有 Chrome 团队级别的工程规范，代码质量上一个台阶。
- **项目缺乏统一开发规范的团队**：与其写没人看的开发规范文档，不如直接做成技能包喂给 Agent。
- **想自定义 Agent 行为的个人开发者**：自己写 skill 来约束 Agent 的行为，比写 prompt 更系统化。

**不推荐给谁？**

- **只是"复制粘贴"用 AI 的用户**：你需要的不是 agent-skills，你需要的是一份更清晰的 prompt。
- **团队已有成熟、自动化的 CI/CD 规范**：这套技能更多是"指导性"的，不能替代真正的自动化检查。


## 04｜快速上手指南（3 分钟）

**方式一：Claude Code 推荐**

```bash
# Clone 技能仓库
git clone https://github.com/addyosmani/agent-skills.git

# Claude Code 会自动读取 .claude/skills/ 下的技能文件
cd your-project
cp -r ../agent-skills/skills/* .claude/skills/
```

**方式二：使用 MCP 配置**

在 Claude Desktop 或任何支持 MCP 的客户端中，配置：

```json
{
  "mcpServers": {
    "agent-skills": {
      "command": "npx",
      "args": ["-y", "@anthropic/agent-skills-mcp"]
    }
  }
}
```

**方式三：手动引用**

```markdown
<!-- 在你的项目根目录放一个 .claude/rules.md -->
请参考以下技能文件执行任务：
- agent-skills/skills/code-review.md
- agent-skills/skills/testing-basics.md
- agent-skills/skills/refactoring-strategies.md
```


## 05｜总结

agent-skills 最聪明的地方不在于它让 AI 写出了更好的代码，而在于它解决了一个更本质的问题：

**AI 不缺能力，缺的是工程的"上下文"。**

你可以给 Agent 最贵的模型、最大的上下文窗口。但如果它不知道你们的编码规范、不了解你们的架构约定、没见过大型项目的分步重构策略——它就只能是一个"英语很好但不懂你们行业的外包"。

agent-skills 做的就是给 Agent 装上"行业通识"。

就像 Addy 自己说的：这不是写给 AI 看的，是写给**用 AI 的人**看的。你理解了一个 skill 为什么这么写，你就知道了怎么让 AI 做得更好。