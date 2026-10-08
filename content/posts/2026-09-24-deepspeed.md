---
title: "单卡塞不下大模型？这个库帮你训起来"
date: 2026-09-24
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-09-24.webp"
    hiddenInList: false
---
大模型本地训练的痛点，说来说去就那么几个：显存不够、速度太慢、配置太复杂。尤其是显存——一个百亿参数的模型，光优化器状态就够把一张 32GB 的卡吃满，参数本身还没算进去。

GitHub 上有个项目从 2019 年就一直在啃这个问题，到今天攒了 4.3 万 Star，单日还在涨 794 颗。它就是微软开源的 DeepSpeed，一个让分布式训练和推理变得简单、高效、省显存的深度学习优化库。

**项目地址：**https://github.com/deepspeedai/DeepSpeed

![DeepSpeed 与 Hugging Face Transformers 集成标识](https://raw.githubusercontent.com/deepspeedai/DeepSpeed/master/docs/assets/images/transformers-light.png)

## 显存为什么不够用

训练大模型最耗显存的，往往不是模型参数本身，而是训练过程中产生的三样东西：优化器状态、梯度、前向激活。以 Adam 优化器为例，每个参数要额外存 8 个字节（动量 + 方差），一个 1.5B 的模型光优化器状态就吃掉 18GB——单张 32GB 的卡根本放不下。

DeepSpeed 的核心叫 ZeRO（Zero Redundancy Optimizer，零冗余优化器）。思路很朴素：数据并行训练时，每张卡其实都存着一模一样的优化器状态和梯度，纯属浪费。ZeRO 把这些冗余状态按卡切片，每张卡只留自己那一份，显存占用立刻降下来。

![1.5B 模型不开 ZeRO，8 张 V100 也直接 OOM](https://www.deepspeed.ai/assets/images/oom_dp8_1.5B_log.png)

ZeRO 分三个阶段：Stage 1 切优化器状态，Stage 2 再切梯度，Stage 3 连参数一起切。官方教程里的实测数据很直观——1.5B 参数的 GPT-2，不开 ZeRO 在 8 张 V100 上直接 OOM 报错；开 ZeRO-1 之后每张卡显存降到 2.25GB，模型顺利训起来。再往上还有 ZeRO-Infinity，能把显存外溢到 CPU 和 NVMe 硬盘，单卡撬动百亿参数不是口号。

![开启 ZeRO-1 后 1.5B 模型在 8 卡上成功训练](https://www.deepspeed.ai/assets/images/zero1_dp8_1.5B_smi.png)

## 装起来只要一条命令

DeepSpeed 是个 Python 库，前提是先装好 PyTorch（推荐 2.0 以上），然后：

```bash
pip install deepspeed
```

装完跑一句 `ds_report` 就能看到机器上有哪些算子/扩展可用。它的 C++/CUDA 扩展默认运行时 JIT 编译，不用预先折腾构建；和 Hugging Face Transformers、Accelerate 都是无缝集成，改几行配置就能把现有训练脚本切过去。

## 它适合谁

DeepSpeed 解决的是「模型大到单卡放不下、多卡又训不动」这个硬骨头，而且不改模型代码——这是 ZeRO 相比模型并行的关键优势。它适合做大规模预训练、微调，以及想压低推理成本、搞量化推理的工程团队。如果只是跑个几百 M 的小模型，收益有限；但一旦模型上了百亿参数、要上多卡，它就成了绕不开的基础设施之一。
