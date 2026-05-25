---
title: "谁说 RAG 必须要有向量数据库？"
date: 2026-05-08
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-05-08.webp"
    hiddenInList: false
---

去年我在做一个合同审查系统时，被一个问题折磨了整整两周：

"向量数据库 128 维、256 维，到底哪个维度够用？" "chunk_size 设 512 还是 1024？" "为什么同一个文档，不同 chunk 切法，召回率能差 30%？"

我把所有 embedding 模型换了个遍——text-embedding-3-large、bge、e5，没有一个能让我完全放心。每次 QA 问我"这个条款为什么没找到"，我都只能尴尬地说"向量相似度的问题"。

后来我跟几个做 RAG 的朋友聊，大家的回复出奇一致：

**"向量数据库这东西，用起来总是差那么一口气。"**

不是我一个人这么想。

而就在前两天，一个叫 PageIndex 的项目一夜之间冲上 GitHub Trending，斩下 943 个 star。它的核心主张直接颠覆了过去两年的行业共识：

**不要向量数据库，不要 embedding，不要 chunking。**


### 01 ｜核心逻辑

传统 RAG 的流程大家都知道：

文档 → 切成小段（chunking） → 每段转成向量（embedding） → 存进向量数据库 → 来了问题做向量相似度搜索（top-K） → 把最相似的几个 chunk 喂给 LLM

看起来每一步都合理对吧？但仔细想想，问题出在哪？

**你让 LLM 在一堆碎片里找答案，但碎片本身丢了上下文。**

想象一下：你把一本《三体》撕成 500 页散页，然后在每页上写一段摘要。有人问你"叶文洁为什么按下发射按钮"，你去翻这些散页——每页摘要看起来都跟"三体"、"文明"、"发射"沾点边，但你很难从任何一页得到那个完整的因果链。

这就是 chunking 的本质问题。你切得越细，上下文丢得越多；你切得越粗，向量相似度就越模糊。

**PageIndex 的思路完全不同。**

它的灵感来自 AlphaGo 的决策树思想。不是把文档切成碎片，而是把文档组织成**层次化树状索引**：

```
文档
├── 章节 1
│   ├── 段落 1.1
│   │   ├── 句子 1.1.1
│   │   └── 句子 1.1.2
│   └── 段落 1.2
├── 章节 2
│   ├── 段落 2.1
│   └── 段落 2.2
```

当用户提问题的时候，它不做向量相似度搜索，而是让 LLM **像人一样决策**：

"我要先看哪个章节？这个章节的第几段可能包含答案？这段里的哪个具体位置？"

每一步决策都基于**推理**，而不是余弦相似度。就像一个研究员拿到一本书，先翻目录，再定位到具体章节，最后锁定关键段落——而不是把所有散页摊在桌上找最接近的。

这个思路最骚的地方在于：**它绕开了整个 embedding 环节，也就绕开了 embedding 的所有坑。** 你不用再纠结选哪个模型、设多少维度、调什么参数。PageIndex 把你的文档变成一个能让 LLM "导航"的结构化索引，检索本身就是推理。

他们用这个方式在 FinanceBench（金融文档基准测试）上跑出了 **98.7% 的准确率**。作为对比，GPT-4o 在那个测试上只有约 31%，Perplexity 大约 45%。


### 02 ｜硬核功能盘点

🔗 GitHub 地址：https://github.com/VectifyAI/PageIndex

**功能一：向量零依赖的 RAG 框架**

不需要任何向量数据库、不需要 embedding 模型、不需要 chunking 策略。一篇长文档丢进去，自动构建树状索引。这在当前 RAG 生态里几乎是独一份的存在。其他人忙着优化向量检索，它直接把向量扔了——就是敢这么干。

**功能二：Agentic Tree Search**

传统 RAG 的搜索是"一次过"的——向量相似度排个序，取 top-K 就完了。PageIndex 的搜索是**多轮推理**的：LLM 先在树顶决定"应该看哪个分支"，然后深入这个分支，决定"应该看哪一段"，甚至可以递归地精确定位到句子级别。每一步都有推理依据，所以召回质量是可解释的、可追溯的。

**功能三：98.7% FinanceBench 准确率**

这个数字太吓人了。同样的问题，传统向量 RAG 在金融文档上大概 40%-60% 的准确率，PageIndex 直接干到 98.7%。而且金融文档是出了名的"吃上下文"——一个条款往往引用前面几页的定义，chunking 在这种场景下简直灾难。PageIndex 的树状结构天然适合这种引用密集型文档。

**功能四：多部署形态**

PageIndex Framework 是核心库，`pip install` 就能用。PageIndex Chat 是一个可直接部署的文档分析平台，支持 MCP 协议和 API 接入。不管你是想做原型验证还是上生产，都有对应的路径。

**功能五：开源 + Colab Notebook**

全部代码开源在 GitHub。他们还提供了一个 Colab Notebook 跑一个最简单的 demo，5 分钟就能上手体验"无向量 RAG"是什么感受。这种"先让你试试再决定要不要深入研究"的引导方式，值得点赞。


### 03 ｜典型场景和避坑

**适合谁用？**

- **金融、法律等文档密集型行业**：合同审查、财报分析、法规检索——这些场景的文档结构复杂、引用链长，传统的 chunk + 向量方案经常漏掉关键信息。PageIndex 的树状索引天然适合。

- **需要高准确率的 RAG 应用**：如果你的用户不能接受"差不多是对的"的答案（比如医疗、合规审查），PageIndex 的可解释性决策链路会更有说服力。

- **不想被向量数据库锁定的团队**：Pinecone、Weaviate、Milvus——选哪个、贵不贵、迁移成本大不大。用 PageIndex 可以完全跳过这些纠结。

**不推荐给谁？**

- **需要极度实时响应的应用**：PageIndex 的检索过程涉及多轮 LLM 推理，每一步都要调用一次模型，响应延迟会比传统向量检索高。如果你做的是毫秒级 RAG 检索（比如客服实时回复），传统方案仍然占优。

- **简单的单文档问答**：如果你只需要从一个 PDF 里找一两个段落，传统 chunking + embedding 就够用了，没必要上 PageIndex。杀鸡不用牛刀。

- **资源敏感的场景**：PageIndex 的推理过程需要多次调用 LLM，API 请求量远大于传统 RAG。如果你的 LLM 调用有预算限制或速率限制，要算清楚性价比。


### 04 ｜上手教程

方式一（Python 快速上手，5 分钟）：

```python
pip install pageindex
```

```python
from pageindex import PageIndex

# 加载文档，自动构建树状索引
index = PageIndex()
index.load_document("path/to/your/document.pdf")

# 提问，基于推理的检索
answer = index.query("What is the net income in Q3 2025?")
print(answer)
```

方式二（Colab Notebook 体验）：

访问官方提供的 Notebook：https://colab.research.google.com/github/VectifyAI/PageIndex/blob/main/cookbook/pageindex_RAG_simple.ipynb

这个 Notebook 展示了最简流程：文档提交 → 树索引构建 → 推理式树搜索 → 上下文提取 → 答案生成。全程不需要向量库。

方式三（PageIndex Chat，可直接部署）：

```bash
# 克隆仓库
git clone https://github.com/VectifyAI/PageIndex.git
cd PageIndex

# 启动 Chat 平台
pip install -r requirements.txt
python -m pageindex_chat
```

支持 MCP 协议和 REST API，可以集成到现有的 AI 工作流中。


### 05 ｜总结

PageIndex 让我想起了一个老问题：**当所有人都在优化一个错误的方向时，正确的做法是什么？**

RAG 这两年太火了，火到大家默认"RAG = chunking + embedding + 向量数据库"就等于标准答案。但 PageIndex 提出的是：**为什么不让 LLM 自己决定去哪找答案？** 它模仿的不是数据库检索，而是人类读书的方式——先翻目录、再看章节、最后定位关键句。

这个思路不一定适合所有场景（响应速度、成本预算都是权衡点），但它在文档密集型、高精度要求的场景里，效果确实是碾压级别的。98.7% 的 FinanceBench 准确率摆在那，不是吹的。

开源社区的反馈也很诚实：29.7k 星，一天涨了 943 个。说明"你们全错了"的姿态虽然嚣张，但确实戳到痛点了。