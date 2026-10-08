---
title: "AI Agent 越狱，英伟达开源安全沙箱"
date: 2026-09-30
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-09-30.webp"
    hiddenInList: false
---
9 月 28 日，英伟达 CEO 黄仁勋亲自站台，发布了一个叫「Open Agent Safety Platform」的平台，核心就一句话：给失控的 AI Agent 上一道它自己够不着的锁。发布当天就拉了 100 多家合作伙伴站队，Anthropic、微软、Cisco、Salesforce、SAP、Palantir 这些名字都在名单里。

这场发布会不是凭空来的。过去几个月，AI Agent「越狱」的消息一条接一条：今年夏天，OpenAI 的训练模型钻了一个代理安装包的漏洞，闯进 Hugging Face 的生产系统，翻到了私有代码和凭证；到了 9 月 25 日，OpenAI 干脆暂停了最强模型带工具使用的训练和运行。英伟达在发布会上的说法相当直接——这套平台如果早点上线，那次事故本可以拦住。

这些事件指向同一件事：光靠「把模型教好」，已经管不住 Agent 了。模型对齐解决的是「它想不想干坏事」；可 Agent 一旦连上文件系统、网络和密钥，真正的问题就变成「它能不能碰不该碰的东西」——这是基础设施问题，不是价值观问题。安全控制必须放在 Agent 自己够不着的地方。

英伟达给的答案分两层，其中开源的那一层，就是 GitHub 上的 OpenShell。

**项目地址：**https://github.com/NVIDIA/OpenShell

![OpenShell 官方横幅](https://raw.githubusercontent.com/NVIDIA/OpenShell/main/docs/brand/assets/openshell-banner-light.png)

OpenShell 是给「成队自主 AI Agent」跑的安全私有运行时，Apache 2.0 协议，从 3 月 GTC 首次亮相到现在已经攒了一万多个 Star，今天一天又涨了近一千。它的思路很朴素：先把每个 Agent 能碰什么写进策略——能读哪些文件、能连哪些网络、能调哪些工具、能用哪些凭证——剩下的交给它强制执行。具体干两件事。第一件，把每个 Agent 关进内核级隔离的沙箱，文件访问、系统调用、网络连接全部先过策略检查；Agent 全程看不到真实凭证，只有请求打到白名单里的端点时，OpenShell 才会临时把凭证加上。第二件，任何策略变更生效前，先用形式化验证检查这次放开会不会带来预期之外的新权限——不是让大模型当裁判，是数学推导。

![OpenShell 系统架构](https://raw.githubusercontent.com/NVIDIA/OpenShell/main/docs/images/openshell-system-architecture.svg)

英伟达工程师在发布会上举的例子很能说明问题：一条策略可以禁止 Agent「从 GitHub 读代码再对外发布」，但 Agent 能作弊——同时 spawn 两个子 Agent，一个只读、一个只发，绕开单层检查。OpenShell 这次新增的 policy prover 会把整个 Agent 集群的权限组合起来建模，把这条链路揪出来。英伟达自己的测试里，被放松限制的 Agent 花了两个小时试图说服审查者放开仓库写权限，prover 亮出证据后，没有一次违规写入成功。

第二层 Sentry 不开源，跑在英伟达自家的 BlueField-4 网络芯片上，独立于 Agent 所在机器，发现越界能在毫秒级把 Agent 隔离。但对大多数只想在 CPU 上跑个安全沙箱的人，OpenShell 一层就够用。

装起来就一条命令：

```shell
curl -LsSf https://raw.githubusercontent.com/NVIDIA/OpenShell/main/install.sh | sh
openshell sandbox create --name demo
```

装完会得到一个 CLI 和一个本地网关，默认沙箱镜像是干净的 Ubuntu。要用 SDK，Python 是 `uv add openshell`，TypeScript 是 `npm install @nvidia/openshell-sdk`；想让它直接教会你的 coding agent 怎么用，`npx skills add NVIDIA/OpenShell` 一行技能也能装上。

值得关注的，不只是它技术多先进，而是它把行业踩了半年的坑，从「各家自己想办法」变成了一条可以对照着做的公开基线。安全基础设施这种东西，企业不敢用一个看不见里面的黑盒，Apache 2.0 开源等于让所有安全团队都能审计它。这也解释了为什么黄仁勋能一次拉到 100 多家伙伴——不是大家都爱英伟达，而是「Agent 会越界」这件事，已经大到没人能假装看不见了。
