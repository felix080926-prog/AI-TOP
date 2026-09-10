---
title: "把大模型装进自己的硬盘"
date: 2026-09-08
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-09-08.webp"
    hiddenInList: false
---

上个月我差点又续了 ChatGPT 会员。20 美金一个月，一年下来两千多，回头一看聊天记录、上传的文档全躺在别人服务器上。后来同事丢给我一个 GitHub 仓库，说"你早就该自己装了"。

这个项目叫 AnythingLLM。它干的事一句话就能说清：**把大模型搬到你自己的电脑上跑，聊天记录、知识库文档全留在你硬盘里。** 你丢进去的 PDF、写过的 prompt、生成的报告，都归你自己，没人拿去训练别人的模型。

> 🔗 **项目地址：https://github.com/Mintplex-Labs/anything-llm**

![AnythingLLM 文档对话界面](https://anythingllm.com/images/home/documentchat-poster.webp)

这项目在 GitHub 上有 6.5 万 star，今天一天又涨了快 800，说明受够了数据裸奔的人不止我一个。

## 一个界面，随便切模型

最戳我的点是它的"不挑食"。

装好之后，OpenAI、Claude、Gemini，还有本地跑的 Ollama、LM Studio，全都能接进来。想换就换，跟换电视频道一样。今天觉得 GPT 好用就用 GPT，明天想省钱切到本地模型，改个设置就行，不用重写任何东西。

也就是说，它不是绑死某一家大模型的壳，而是一个"万能插座"。

![AnythingLLM 模型选择界面](https://anythingllm.com/images/home/step-model.webp)

## 文档丢进去，它真的会"读"

第二个让我意外的，是它的文档能力。

你把一份几十页的合同、一堆会议纪要、甚至一整个网站的页面丢进去，它会自动切成小块存起来。然后你问"上个月那次评审会，客户主要卡在哪几个点"，它不光给你答案，还把原文出处标出来，点一下就能跳回对应段落。

这跟某些张嘴就胡说的 AI 不一样——它是在"引用"，不是"编造"。

我还试过把几百条用户反馈灌进去，让它整理成竞品分析，半分钟出结果。以前这活儿得我对着 Excel 熬一下午。

![AnythingLLM 聊天界面](https://anythingllm.com/images/home/step-chat.webp)

## 上手不折腾

部署也简单。会点终端的话，一条 Docker 命令就起来了。不会也没关系，官网有桌面版，Windows、Mac、Linux 下载即用。

装完它自带一个网页界面，浏览器打开就能聊。想接 Notion、GitHub 仓库、整站爬虫当数据源，点几下配好就行。

要是你有两台电脑，还能多用户一起用，权限分开管，团队内部当个私有 AI 服务器也够用。

总而言之，如果你不想继续给云端算力交订阅费，或者手头有敏感数据想用 AI 又不敢传上去，去 GitHub 搜 AnythingLLM，装一个试试。数据出不出门，自己说了算。

项目地址：https://github.com/Mintplex-Labs/anything-llm

