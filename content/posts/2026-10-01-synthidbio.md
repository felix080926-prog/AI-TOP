---
title: "谷歌给 AI 设计的蛋白质，打上了水印"
date: 2026-10-01
draft: false
categories: ["知识与工具"]
tags: ["知识与工具"]
cover:
    image: "covers/2026-10-01.webp"
    hiddenInList: false
---
9 月 30 号，Google DeepMind 放出一篇 Nature 论文，同步开源了一个叫 SynthID Bio 的项目。事情本身不复杂：给 AI 生成的蛋白质序列和 3D 结构，打上一个检测得到、但几乎不影响功能的「水印」。

这个时间点很值得玩味。AlphaFold 之后，AI 设计的蛋白质越来越像真的，甚至已经在实验室里被合成出来、拿去治病。问题跟着就来了：一个蛋白质序列，到底是人设计的，还是 AI 生成的？开放数据库里混进 AI 造的序列，会不会污染后续研究？生物安全上，又能不能溯源一个 AI 设计的分子？

SynthID Bio 想回答的就是这个。

**项目地址：**https://github.com/google-deepmind/synthidbio

它的做法分两条线。第一条是序列水印（SynthID Bio-sequence）：在 ProteinMPNN 这类逆折叠模型逐 token 解码时，悄悄调整氨基酸的选择倾向，把一段可检测的信号「烙」进序列里。第二条是结构水印（SynthID Bio-structure）：微调 AlphaFold 3 扩散网络的一小部分，让预测出的 3D 坐标本身就带上签名——不管谁去跑模型，产出都天然可验。

![SynthID Bio 给 AI 生成的蛋白质打上水印](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/BioSynthID_socialshare.max-1440x810.png)

关键在「功能保留」这四个字。过去的数字水印思路，是把标记当外挂元数据，复制一遍就掉。SynthID Bio 把水印直接嵌进序列和坐标本身，而且实验室验证了它不伤功能：他们用 AlphaProteo 加一版带水印的 ProteinMPNN，在 VEGF-A、新冠病毒刺突蛋白 RBD、PD-L1 三个靶点上做了湿实验，带水印的设计在命中率、结合亲和力、序列多样性上和普通版本打平——这也是史上第一次造出「带水印、且生物学功能正常」的蛋白质 binder。

![水印不改变蛋白的结合亲和力](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Binding_affinity.width-1000.format-webp.webp)

检测靠一个叫 g-value 的指标：没打水印的序列 g 值在 0.5 附近打转，打了水印的会明显抬到 0.89 以上。代码、体外数据、模型权重全部开源，Apache-2.0 协议。

上手门槛不高。序列水印是 ProteinMPNN 的 drop-in 集成，装好环境、加几个 flag 就能出带水印的序列：

```bash
uv venv synthid_bio --python 3.9
source synthid_bio/bin/activate
cd synthidbio_sequence
uv pip install -r requirements.txt
uv pip install -e third_party/synthid-text
```

然后进 third_party/ProteinMPNN 目录，跑生成脚本时带上 `--watermark`、`--ngram_len`、`--watermark_keys` 就行；结构水印则按 AlphaFold 3 官方仓库的流程加载微调权重。

![带水印的 VEGF-A 蛋白结构](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/watermarked_VEGF-A.width-1000.format-webp.webp)

为什么值得盯着看：它把「AI 生成内容的溯源」从文本、图片、视频，一路推进到了生物分子这个最敏感的领域。SynthID 之前管的是 Gemini 生成的文字、Veo 生成的视频，现在管到了蛋白质和 DNA。AI 越能造出以假乱真的东西，可验证的溯源就越不是可选项，而是刚需。

当然它也不是万能锁。Nature 的新闻评论已经点出，这类数字标记理论上能被擦除，水印是「威慑 + 溯源」的一层，不是物理上拆不掉的封印。但对想给开放数据库、论文数据、合成生物公司做一道「AI 来源」标记的人来说，这已经是个实打实的起点。
