---
title: "DeepSeek 开源前端，大模型 App 能 1:1 复刻"
date: 2026-11-14
draft: false
categories: ["AI 编程"]
tags: ["AI 编程"]
cover:
    image: "covers/2026-11-14.webp"
    hiddenInList: false
---

11 月 13 日晚上，DeepSeek 正式开放「全家桶应用 API」。联网搜索、深度思考搜索、文件输入、阅读链接、语音交互、OCR、内容安全风控——这些原本只在 DeepSeek App 和网页端里用得上的能力，现在全部打包进了 API。官方给的说法很直接：开发者可以 1:1 复刻出完整的 DeepSeek App。

![DeepSeek 网页端对话界面，标注了思考、搜索、阅读链接与回答正文对应的内容块](https://api-docs.deepseek.com/zh-cn/img/chatbot_response_blocks_cn.webp)

这件事的分量在「省事」。以前要做一个体验接近 DeepSeek 的对话产品，开发者得自己当缝合怪：先接模型 API，再一个个对接搜索、网页抓取、文档解析、语音识别与合成，中间还要处理工具调用和上下文拼接。现在这些环节都挪到了服务端，客户端只要打开对应参数，把返回的内容块展示出来、下一轮原样回传就行。卖的不只是水电，连发电站一起给了。

为了让效果看得见，DeepSeek 顺手把自家 App 的前端也开源了，就是这份 Demo：deepseek-ai/chat-demo。

**项目地址：**https://github.com/deepseek-ai/chat-demo

它是一份纯静态的聊天前端，不需要应用后端，浏览器直接请求配置好的 API 服务，功能基本照着 DeepSeek App 来。多会话、自动标题、重命名删除，支持编辑提问、重新生成、切换消息分支；流式回答、深度思考、智能搜索、链接阅读都带来源引用；附件能上传、粘贴、拖拽，语音输入和回复朗读也在；Markdown、代码高亮、KaTeX 公式、Mermaid 图表一应俱全。界面有中英文和深浅主题，还能把从 DeepSeek 网页端导出的历史对话直接导进来接着聊。

![开源 Demo 的功能演示：联网搜索、深度思考、文件上传与语音输入](https://dingyue.ws.126.net/2026/1114/09f78a09j00togfrt007od200u000f4g02y201hf.jpg)

数据这块交代得也清楚：API Key 和设置存在浏览器 localStorage，会话和附件存在 IndexedDB，按浏览器用户配置和站点源隔离。默认模型是 deepseek-flash，走 Anthropic 兼容的 Messages / Files 接口，语音走 ASR / TTS。

## 装起来只要几步

最省事的玩法是直接打开在线体验地址 https://deepseek-ai.github.io/chat-demo/ ，填上 API Key 就能聊。想放在自己机器上，可以去 Releases 下载压缩包，解压后双击 `index.html`，不用安装也不用构建。要改代码就走源码，准备 Node.js 22.12+ 和 pnpm，然后：

```sh
git clone https://github.com/deepseek-ai/chat-demo.git
cd chat-demo
pnpm install
pnpm dev
```

打开 http://localhost:8090 即可。构建静态产物用 `pnpm build`，输出在 `dist/` 目录，丢到任意静态服务器就能部署。默认连接 `https://api.deepseek.com`，配置里用 `createConfig({ apiOrigin })` 可以改成自己的服务。

## 为什么值得关注

对正在做对话类产品的团队，这份 Demo 的价值不在界面本身，而在于它把 DeepSeek 官方那套交互（思考、搜索、引用、文件、语音）的实现方式完整摊开了，拿来当参考或者直接 fork 成底座都省时间。

有一点要提前算清楚：这些扩展能力除了 Token 费用，还要另付工具调用费。

![DeepSeek 全家桶 API 的工具调用定价](https://dingyue.ws.126.net/2026/1114/096e94b6j00togfrq001jd200mr00t6g00mr00t6.jpg)

按官方公布的价格，文字与图片搜索 5 元/千次，网页抓取 5 元/千次，文字识别 1.5 元/千页，语音识别限时五折后 0.39 元/小时，语音合成 1.5 元/万字符。搜索类功能开得越多，账单越要盯着看。

另外两点提醒：官方明确说这份 Demo 仅供演示；API Key 存在浏览器本地，公共电脑上用完记得清掉。它适合拿来快速验证想法、或者研究官方交互实现的人；想要开箱即用的成品，直接用 DeepSeek App 更省心。

