---
title: "Google 开源 AI 论文智能体，冲上热榜"
date: 2026-11-19
draft: false
categories: ["AI Agent"]
tags: ["AI Agent"]
cover:
    image: "covers/2026-11-19.webp"
    hiddenInList: false
---

这两天 GitHub 上冒出一个挺有意思的项目：一个叫 PaperOrchestra 的多智能体框架，11 月 16 日被一批科技媒体集中报道，随即冲上 GitHub Trending，当日新增 300 多颗星。

![PaperOrchestra 多智能体框架总览](https://raw.githubusercontent.com/google-research/paper-orchestra/main/assets/overview.png)

它出自 Google Cloud AI Research，作者是 Yiwen Song、Yale Song、Tomas Pfister 和 Jinsung Yoon 四个人。论文 4 月就挂上了 arXiv（编号 2604.05018），但代码仓库是这两天真正火起来的，Star 从几百涨到 1600 上下。

热点背后是个更值得琢磨的趋势：AI 写论文这件事，正在从「帮你润色一段话」变成「替你跑完一整条流水线」。

过去一年 AI 写作工具不少，但大多停在单点——扩写、翻译、改语法。真正的痛点在后面：文献要一篇篇翻，实验数据要一张张画图，LaTeX 排版要一点点调，最后成稿还得反复打磨。这些活零碎、耗时，又偏偏决定论文能不能投出去。PaperOrchestra 赌的就是这一段。

**项目地址：**https://github.com/google-research/paper-orchestra

它的做法是把「写论文」拆成五个专门分工，像一个小团队：

- Outline Agent 把杂乱的原始材料（idea 加实验日志）整理成结构化大纲；
- Literature Review Agent 上网检索候选论文，再用 Semantic Scholar API 逐个验证真伪，要求至少 90% 的文献真正引用进正文，并自动生成 BibTeX；
- Section Writing Agent 把正文各节写完，还会从实验日志里抽出数值做成表格；
- Plotting Agent 根据代码生成图表和概念示意图，中间有视觉模型当「审稿人」，不满意就重新生成；
- Content Refinement Agent 最后模拟一轮同行评审，按分数决定改还是回滚。

![PaperOrchestra 生成的 CVPR 论文样例](https://yiwen-song.github.io/paper_orchestra/figures/cvpr_ours_ploton.jpg)

为了证明有效，团队还建了个 PaperWritingBench，从 200 篇顶会论文里反向还原出原始材料当测试集。在人评里，它的文献综述质量赢了基线 50%–68%，整篇质量赢 14%–38%。说白了，它不替你想 idea，而是把「从素材到成稿」这段最磨人的工序自动化。

![PaperOrchestra 人评结果](https://yiwen-song.github.io/paper_orchestra/figures/human_eval_bar.png)

**装起来只要几条命令**

项目是 Apache-2.0 协议，用 Conda 跑，Python 3.11：

```bash
conda create -n paper_orchestra python=3.11
conda activate paper_orchestra
pip install -r requirements.txt
```

然后在根目录建一个 `.env`，填上 `SEMANTIC_SCHOLAR_API_KEY`，再配 `GEMINI_API_KEY`（或 Vertex AI 的 `VERTEX_AI_PROJECT` / `VERTEX_AI_LOCATION`）或者 `OPENAI_API_KEY`。跑起来两条路：

```bash
./paper_writing_cli.sh
# 或直接走 CLI
python paper_writing_cli.py --raw_materials_dir ./materials --latex_template_dir templates/cvpr2025 --use_plotting true
```

`frontend/` 下还有个 Streamlit 交互 demo，适合先上手看看效果。

为什么值得关注？这是大厂研究团队少有的把「论文写作全流程」开源成可复用参考架构的一次，而不是又一个 demo。不过有两点得留意：作者明确声明「这不是 Google 官方支持的产品」，用来复现论文结论的数据集也还没放出来。当架构参考没问题，指望它直接替你出稿投会议，还早。

