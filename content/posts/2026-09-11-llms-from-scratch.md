---
title: "从零手写大模型，把 GPT 拆成零件给你看"
date: 2026-09-11
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-09-11.webp"
    hiddenInList: false
---

大模型用了这么久，真正能把注意力机制一行行讲清楚的人，其实不多。大多数人的处境是：天天跟 ChatGPT 对话，可真被问到「多头注意力到底怎么算的」「KV Cache 为什么能省显存」，还是得临时翻论文。论文难啃，二手教程又太碎，中间缺一条从零开始、能跑通的路。

这个缺口，被一个 GitHub 仓库补上了——rasbt/LLMs-from-scratch。

**项目地址：** https://github.com/rasbt/LLMs-from-scratch

它是 Sebastian Raschka 那本《Build a Large Language Model (From Scratch)》的官方配套代码库。Sebastian Raschka 写过《Python Machine Learning》，在机器学习圈里以「能把复杂东西讲明白」著称。这本书的思路也很直接：不调包、不黑箱，用 PyTorch 从零开始，一步步搭出一个类 GPT 的模型。

![《Build a Large Language Model (From Scratch)》书籍封面](https://sebastianraschka.com/images/LLMs-from-scratch-images/cover.jpg?123)

## 从注意力到 GPT，一行行拆开

仓库按书的章节组织，每一章对应一个 notebook。最硬核的部分在注意力那一章：先写最简化的自注意力，再一步步推到多头因果注意力，每一行都有注释，改一个参数立刻能看到 loss 变化。它不是在教你抄代码，而是逼你搞懂每个矩阵乘法的来路。

![大模型核心组件的 mental model 示意](https://sebastianraschka.com/images/LLMs-from-scratch-images/mental-model.jpg)

## 不止停在 2023 年的 GPT-2

另一个值得说的是它跟得上时代。很多从零教程讲到 GPT-2 就收尾了，这个仓库这两年一直在补新东西：Llama 3.2、Qwen3（密集版和 MoE 版）、Gemma 3 都有对应的「from scratch」实现；注意力变体从 MHA、MQA、GQA 一路讲到 MLA 和滑动窗口注意力；KV Cache、LoRA/DoRA、指令微调、DPO 对齐这些现代大模型绕不开的环节，也单独成文讲透。

热度也能说明问题：仓库已经攒了 10.4 万 Star，光今天一天就涨了 640。一个纯教学向的仓库能到这个量级，说明「想搞懂底层」的需求一直很旺盛。

客观地说，它适合的人很明确：想从调 API 进阶到改模型、或者准备面试想补课的开发者。不适合只想抄个 demo 交差的人——这里没有现成的产品化封装，代码得一行行敲、一行行读。

在人人都在谈「用大模型」的时候，能沉下来搞懂「大模型怎么造」的资源，反而更稀缺。

项目地址：https://github.com/rasbt/LLMs-from-scratch

