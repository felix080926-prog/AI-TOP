---
title: "做 AI Agent 时，最容易被忽视的一层基础设施：OpenViking"
date: 2026-03-14
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
---



#  做 AI Agent 时，最容易被忽视的一层基础设施：OpenViking



如果你最近在做 **AI Agent、RAG 或自动化工作流** ，很可能已经发现一个问题：

**模型不是最大瓶颈，Context 管理才是。**

当一个 Agent 需要处理复杂任务时，它需要同时管理：

  * 对话历史
  * 知识库
  * 工具调用
  * 用户偏好
  * 任务状态



这些信息往往分散在：

  * 向量数据库
  * KV 存储
  * Prompt 模板
  * 配置文件



系统一复杂，**上下文管理很快就会变成一团乱麻。**

最近在 GitHub 上看到一个很有意思的项目：

**OpenViking**

项目地址：https://github.com/volcengine/OpenViking

![图片](./做 AI Agent 时，最容易被忽视的一层基础设施：OpenViking_files/640)

* * *

## 一、这个项目是干什么的

一句话总结：

**OpenViking 是一个专门为 AI Agent 设计的“上下文数据库”。**

它试图解决一个核心问题：

> 如何让 AI Agent 更好地管理自己的记忆、资源和技能。

传统 RAG 系统通常只有：
    
    
    向量数据库 + Embedding  
    

但在复杂 Agent 系统中，这种方式很快会遇到问题：

  * 信息来源太多
  * 检索逻辑难以调试
  * Context 不透明
  * Token 成本高



OpenViking 提出了一种新的思路：

**用“文件系统”来管理 Agent 的上下文。**  ([Jimmy Song][1])

* * *

## 二、核心设计思路

OpenViking 把所有 Context 抽象成一个类似文件系统的结构：
    
    
    viking://  
    ├── memory  
    ├── resources  
    ├── skills  
    └── sessions  
    

开发者可以像操作文件一样管理 Agent 的知识：
    
    
    ls  
    read  
    find  
    

每一条上下文都有一个明确的路径。

相比传统向量数据库的“黑盒检索”，这种方式更 **可控、可观察、可调试** 。 ([Aitoolnet][2])

* * *

## 三、三个很有意思的设计

### 1 分层 Context（L0 / L1 / L2）

OpenViking 会自动把内容拆成三层：
    
    
    L0：摘要（约100 token）  
    L1：概览  
    L2：详细内容  
    

Agent 会先加载 L0，再逐步深入。

好处是：

  * 节省 token
  * 提高检索效率
  * 减少 hallucination



这种设计其实非常适合 **复杂 Agent 工作流** 。 ([Jimmy Song][1])

* * *

### 2 可视化检索路径

很多做 RAG 的人都有一个痛点：

**为什么模型会引用这段内容？**

OpenViking 会保留完整的检索路径：
    
    
    query  
     → directory  
     → document  
     → context  
    

开发者可以直接看到 **上下文是怎么被选出来的** 。

这对调试 Agent 系统非常有帮助。

* * *

### 3 自动记忆管理

OpenViking 还能自动从会话中提取：

  * 长期记忆
  * 用户偏好
  * 关键事件



并自动写入系统。

换句话说：

**Agent 会逐渐“长出记忆”。**  ([Evermx][3])

* * *

## 四、适合用在什么场景

我觉得比较适合这些项目：

**1 AI Agent 平台**

比如：

  * 自动研究 Agent
  * 自动开发 Agent
  * 自动运营 Agent



* * *

**2 RAG 系统**

当知识库越来越复杂时：

  * 单纯向量检索已经不够
  * 需要结构化 Context



* * *

**3 长任务 AI**

例如：

  * AutoGPT
  * Devin 类系统
  * Coding Agent



这些系统对 **记忆管理要求非常高** 。

* * *

## 五、为什么值得关注

现在 AI Agent 领域正在出现一个新的趋势：

**Context Engineering。**

未来 AI 系统的竞争，很可能不只是模型能力，而是：

  * Context 管理
  * 记忆系统
  * Agent 架构



OpenViking 其实就在做一件事情：

**给 AI Agent 做一个真正的“操作系统”。**

如果你在做：

  * Agent
  * RAG
  * AI Automation



这个项目非常值得关注。

