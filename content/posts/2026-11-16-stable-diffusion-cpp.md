---
title: "不用装 Python，一个二进制跑文生图"
date: 2026-11-16
draft: false
categories: ["本地部署 & 省钱"]
tags: ["本地部署 & 省钱"]
cover:
    image: "covers/2026-11-16.webp"
    hiddenInList: false
---

本地跑文生图，卡人的常常不是显卡，而是环境。ComfyUI、stable-diffusion-webui 这类工具功能确实全，但背后压着 PyTorch、CUDA 版本和一大堆 Python 依赖，光装环境就能劝退一批人；显存小一点的机器，连试的念头都容易被劝回去。

有一类项目走的是另一条路：像 llama.cpp 之于大语言模型那样，把扩散模型的推理整个用纯 C/C++ 重写，最后只留一个可执行文件。stable-diffusion.cpp 是这条路线里目前最成熟的一个，GitHub 上 8 千多 Star，单日还在涨 374 星。

**项目地址：**https://github.com/leejet/stable-diffusion.cpp

![stable-diffusion.cpp 项目](https://raw.githubusercontent.com/leejet/stable-diffusion.cpp/master/assets/logo.png)

## 一个二进制，没有 Python

它基于 ggml，和 llama.cpp 是同一套底子，所以运行方式也熟悉：编译出一个二进制，带着模型文件就能跑。后端覆盖得很全——CPU（x86 上支持 AVX / AVX2 / AVX512）、CUDA、Vulkan、Metal、OpenCL、SYCL。也就是说，没有独立显卡可以纯 CPU 出图，AMD 卡走 Vulkan，Mac 走 Metal，选择比想象中多。模型权重直接吃 safetensors、ckpt、gguf 三种格式，不用先转来转去。

![用 sd.cpp 生成的图，画面里的文字也渲染出来了](https://raw.githubusercontent.com/leejet/stable-diffusion.cpp/master/assets/cat_with_sd_cpp_20184.png)

## 新模型 Day-0 就支持

真正让它值得关注的是模型覆盖面和跟进速度。SD 全系、FLUX.1 / 2 / 3、Qwen-Image 系列、Z-Image、Wan 2.1 / 2.2 视频、MiniMax-H3（视频和音频一起生成）、LTX-2.5……README 里列了几十个。更新日志几乎每隔一两周就有一条「Day-0 support」，最近一条是 11 月 11 日加上 MiniMax-H3-Image。

轻量模型这块尤其实用。官方文档写明，Z-Image 在 4GB 显存的显卡上就能跑，甚至更低。

![Z-Image 在 4GB 显存档位（q4_K 量化）的出图效果](https://raw.githubusercontent.com/leejet/stable-diffusion.cpp/master/assets/z_image/q4_K.png)

## 装起来只要几步

最省事的是直接去 releases 页下预编译好的 Windows / Linux / macOS 二进制。想自己编，把仓库递归克隆下来后，三步就够：

```shell
cd stable-diffusion.cpp && mkdir build && cd build
cmake .. && cmake --build . --config Release
```

NVIDIA 显卡把中间的 `cmake ..` 换成 `cmake .. -DSD_CUDA=ON` 就行。接着下一个模型，比如 SD 1.5：

```shell
curl -L -o models/checkpoints/v1-5-pruned-emaonly.safetensors \
  https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.safetensors
```

命令行出图只要一条：

```shell
./bin/sd-cli -m models/checkpoints/v1-5-pruned-emaonly.safetensors -p "a lovely cat"
```

不想碰命令行的，跑 `./bin/sd-server --model-dir models`，浏览器打开 127.0.0.1:1234 就是一个自带的 Web UI。官方还提供 Docker 镜像 `ghcr.io/leejet/stable-diffusion.cpp`，拉下来挂上模型目录就能用。除了文生图，img2img、ControlNet、LoRA、ESRGAN 放大、PhotoMaker 这些也都支持。

## 适合谁

它的定位不是取代 ComfyUI 这类图形工作流工具，而是把「跑起来」的门槛降到最低：显存有限、机器偏老，或者单纯不想维护一套 Python 环境的人，用它最省心；需要在命令行里批量出图、把它当服务挂到别的程序后面，也很顺手。反过来，如果工作流离不开节点编排和庞大的插件生态，ComfyUI 仍然是更合适的选择。

