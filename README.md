# BinaryEngineerLearning

> 二进制工程师和系统编程完整学习路径

欢迎！这是一个交互式学习平台，你可以边看边练习，直接在浏览器中运行代码。通过系统化的教程，逐步掌握C语言、Python、汇编、逆向工程和安全技术。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Emqo/BinaryEngineerLearning)](https://github.com/Emqo/BinaryEngineerLearning/stargazers)

## 📁 目录结构

```
BinaryEngineerLearning/
├── src/                           # mdbook 源文件目录
│   ├── c-language/                # C语言学习
│   │   ├── chapter01-c-basics/    # 第1章：C语言入门基础
│   │   │   ├── content.md         # 学习内容（中文）
│   │   │   └── exercises.md       # 练习题（中文）
│   │   └── ...
│   ├── SUMMARY.md                 # 书籍目录
│   └── introduction.md            # 首页
│
├── book.toml                      # mdbook 配置文件
├── README.md                      # 项目说明（本文件，包含所有内容）
├── LICENSE                        # 许可证
└── .github/workflows/            # GitHub Actions 部署配置
```

---

## 🚀 快速开始

### 🌐 在线学习（推荐）
访问我们的在线版本：**https://emqo.github.io/BinaryEngineerLearning/**

- 📖 交互式阅读体验
- 💻 在线代码编辑器
- ✅ 即时运行和反馈
- 🔍 全文搜索功能

### 📚 本地学习

#### 方法1：使用 mdbook（推荐）
```bash
# 安装 mdbook
cargo install mdbook

# 启动本地服务器
mdbook serve

# 浏览器打开 http://localhost:3000
```

#### 方法2：直接阅读 Markdown
进入对应的语言目录，例如：
```bash
cd src/c-language/chapter01-c-basics
# 阅读 content.md 学习内容
# 完成 exercises.md 中的练习题
```

---

## 🛠️ 设置和部署

### 📦 安装 mdbook

#### Windows

**方法1：使用 Cargo（推荐）**
```powershell
# 1. 安装 Rust（如果还没有）
# 访问 https://rustup.rs/ 下载并安装

# 2. 安装 mdbook
cargo install mdbook

# 3. 验证安装
mdbook --version
```

**方法2：使用预编译二进制**
```powershell
# 1. 从 GitHub 下载
# https://github.com/rust-lang/mdBook/releases
# 下载 mdbook-x.x.x-x86_64-pc-windows-msvc.zip

# 2. 解压到任意目录

# 3. 添加到 PATH 环境变量
```

#### Linux/macOS

```bash
# 使用 Cargo 安装
cargo install mdbook

# 或使用包管理器（如果可用）
# Ubuntu/Debian: sudo apt install mdbook
# macOS: brew install mdbook
```

### 🚀 本地运行

```bash
# 1. 克隆仓库（如果还没有）
git clone https://github.com/Emqo/BinaryEngineerLearning.git
cd BinaryEngineerLearning

# 2. 启动本地服务器
mdbook serve

# 3. 浏览器打开 http://localhost:3000
```

### 📚 构建静态网站

```bash
# 构建到 book/ 目录
mdbook build

# 构建的文件在 book/ 目录中
```

### 🌐 GitHub Pages 部署

**方法1：使用 GitHub Actions（推荐，已配置）**

1. 确保 `.github/workflows/deploy.yml` 文件存在（已包含在项目中）
2. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入仓库 Settings → Pages
   - Source: 选择 **GitHub Actions**
3. 推送代码到 master 分支，GitHub Actions 会自动构建和部署
4. 访问地址：`https://emqo.github.io/BinaryEngineerLearning/`

**方法2：手动部署**

```bash
# 1. 构建
mdbook build

# 2. 切换到 gh-pages 分支
git checkout -b gh-pages
git rm -rf .

# 3. 复制构建文件
cp -r book/* .

# 4. 提交
git add .
git commit -m "Deploy book"
git push origin gh-pages
```

### 💻 在线代码运行功能

代码块后添加在线运行链接：

在 Markdown 中这样写：

    ```c
    #include <stdio.h>
    int main() {
        printf("Hello!\n");
        return 0;
    }
    ```

    [在线运行此代码](https://playcode.io/c/?code=你的代码)

**推荐的在线编译器**：
1. **PlayCode.io** - https://playcode.io/c/
2. **Compiler Explorer** - https://godbolt.org/
3. **Replit** - https://replit.com/
4. **OnlineGDB** - https://www.onlinegdb.com/

---

## 💡 学习建议

1. **AI互动学习**：遇到问题随时问AI，获得详细解答
2. **循序渐进**：按小节学习，完成当前小节再继续
3. **多动手**：理论结合实践，每学一个概念就写代码
4. **完成练习**：每章都有练习题，必须完成
5. **做笔记**：记录学习心得和遇到的问题
6. **持续学习**：技术更新快，保持学习热情
7. **项目驱动**：通过实际项目巩固知识
8. **代码审查**：让AI检查你的代码，获得改进建议

---

---

## 📝 贡献

欢迎提交问题和改进建议！

- 🐛 发现问题？[提交Issue](https://github.com/Emqo/BinaryEngineerLearning/issues)
- 💡 有改进建议？[提交Pull Request](https://github.com/Emqo/BinaryEngineerLearning/pulls)
- ⭐ 觉得有用？给个Star支持一下！

---

## 📄 许可证

本仓库内容仅供学习使用。详见 [LICENSE](LICENSE) 文件。

---

## 🤖 AI就是你的百科全书

在这个学习计划中：
- 📚 **AI生成学习材料**：每个概念都有详细讲解，像电子书一样
- 💻 **代码示例**：每个知识点都有完整可运行的代码
- 📝 **练习题**：每章都有配套练习，巩固知识
- ✅ **作业检查**：AI会检查你的代码和理解程度
- 🔄 **随时答疑**：遇到问题随时提问，获得即时解答

记住：**编程是一门实践性很强的技能，多写代码、多问AI、多实践！**

**AI就是未来的数据化百科全书，让我们开始学习吧！** 🚀

---

**开始你的学习之旅吧！** 🎉
