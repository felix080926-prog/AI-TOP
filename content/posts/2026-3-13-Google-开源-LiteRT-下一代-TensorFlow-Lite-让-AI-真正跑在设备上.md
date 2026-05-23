---
title: "Google 开源 LiteRT：下一代 TensorFlow Lite，让 AI 真正跑在设备上"
date: 2026-03-13
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
---



#  Google 开源 LiteRT：下一代 TensorFlow Lite，让 AI 真正跑在设备上



如果你在做 AI 应用，大概率会遇到一个问题：

**很多 AI 模型只能跑在云端。**

原因很简单：

模型太大、算力要求太高。

但很多场景其实更需要：

  * 本地推理
  * 低延迟
  * 隐私保护
  * 离线运行



比如：

  * 手机 AI 助手
  * 本地语音识别
  * AR / 视觉应用
  * IoT 设备



最近看了一个 Google 开源项目：

LiteRT

  


项目地址：

https://github.com/google-ai-edge/LiteRT

它的目标其实很明确：

**让 AI 模型更容易在设备端运行。**

* * *

##  一、LiteRT 是什么

一句话介绍：

**LiteRT 是 TensorFlow Lite 的下一代运行时。**

它是 Google AI Edge 体系里的核心组件。

简单理解就是：
    
    
    训练模型（PyTorch / TensorFlow / JAX）  
            ↓  
    模型转换  
            ↓  
    LiteRT  
            ↓  
    手机 / PC / IoT 设备推理  
    

LiteRT 负责的事情是：

**高性能运行 AI 模型。**

重点优化：

  * 推理速度
  * 硬件加速
  * 内存占用



它可以直接利用：

  * CPU
  * GPU
  * NPU



让 AI 模型在设备端运行得更快。

* * *

## 二、为什么这个项目值得关注

我觉得它有三个很重要的点。

* * *

### 1 TensorFlow Lite 的继任者

LiteRT 可以理解为：

**TensorFlow Lite 的升级版本。**

Google 过去很多 AI 应用，其实都依赖 TFLite。

比如：

  * Android AI 功能
  * 摄像头 AI
  * 语音识别



LiteRT 是这一技术路线的延续。

* * *

### 2 专门优化 GenAI

一个很有意思的变化是：

LiteRT 不只是跑传统 ML。

它还支持：

  * LLM
  * 多模态模型
  * GenAI 推理



Google 甚至提供了一个组件：

LiteRT-LM

用于在设备端运行语言模型。

* * *

### 3 专门为 Edge AI 设计

LiteRT 最大的特点是：

**端侧 AI。**

优势包括：

  * 延迟更低
  * 不依赖网络
  * 数据隐私更好



很多 AI 应用其实更适合这种架构。

比如：
    
    
    AI 相机  
    AI 语音助手  
    AR 应用  
    本地 AI 助手  
    

* * *

## 三、可以用来做什么

LiteRT 的应用场景其实非常多。

例如：

### 1 手机 AI 应用

比如：

  * 图像识别
  * 实时翻译
  * AI 摄像头



这些都可以直接在手机端运行。

* * *

### 2 本地 AI 助手

例如：

  * 手机上的 LLM
  * 离线聊天
  * 本地语音助手



很多手机 AI 功能其实就是这种架构。

* * *

### 3 IoT AI 设备

例如：

  * 智能摄像头
  * 工业视觉
  * 机器人



这些设备通常算力有限，非常依赖高效推理引擎。

* * *

## 四、技术栈结构

LiteRT 其实属于 Google AI Edge 技术栈的一部分。

整个体系大致是：
    
    
    模型训练  
    ↓  
    模型转换  
    ↓  
    LiteRT runtime  
    ↓  
    设备端推理  
    

相关组件包括：

  * LiteRT Runtime
  * LiteRT-LM
  * AI Edge Torch Converter



目标其实很清晰：

**让 AI 能真正跑在设备上。**

* * *

##  五、总结

如果你最近在关注：

  * Edge AI
  * 本地 AI
  * 手机 AI 应用
  * IoT AI



我觉得这个项目值得关注。

它代表的是一个越来越明显的趋势：

**AI 不一定要跑在云端。**

越来越多 AI 应用，

其实会直接跑在设备上。

