# 多语言设置说明

## 实现方案

项目支持中文和英文两个版本，用户可以在本地开发时选择启动哪个版本。

### 目录结构

```
src/
├── zh/              # 中文版本
│   ├── SUMMARY.md
│   ├── introduction.md
│   └── c-language/
└── en/              # 英文版本
    ├── SUMMARY.md
    ├── introduction.md
    └── c-language/
```

### 配置文件

- `book.toml` - 中文版本配置（指向 `src/zh`，输出到 `book/`）
- `book-en.toml` - 英文版本配置（指向 `src/en`，输出到 `book-en/`）

### 本地预览

#### 使用 Start.bat（Windows）

运行 `Start.bat`，选择：
1. **Chinese (中文)** - 在 `http://localhost:3000` 启动中文版本
2. **English** - 在 `http://localhost:3000` 启动英文版本

#### 手动启动

**中文版本**：
```bash
mdbook serve --port 3000
```

**英文版本**：
```bash
mdbook serve --config-file book-en.toml --port 3000
```

### 构建方式

#### 构建中文版本（默认）

```bash
mdbook build
```

构建输出到 `book/` 目录

#### 构建英文版本

```bash
mdbook build --config-file book-en.toml
```

构建输出到 `book-en/` 目录

#### 使用构建脚本（Windows）

```bash
build.bat
```

**Linux/macOS**：
```bash
chmod +x build.sh
./build.sh
```

构建脚本会同时构建两个版本：
- 中文版本输出到 `book/`
- 英文版本输出到 `book-en/`

### 部署方案

#### GitHub Pages 部署

GitHub Actions 工作流（`.github/workflows/deploy.yml`）会自动：
1. 构建中文版本
2. 部署到 GitHub Pages

**默认部署中文版本**：
- 访问地址：`https://emqo.github.io/BinaryEngineerLearning/`

**如需部署英文版本**：
1. 修改 `.github/workflows/deploy.yml`，将构建命令改为：
   ```yaml
   - name: Build English version with mdBook
     run: mdbook build --config-file book-en.toml
   ```
2. 修改上传路径为 `book-en`

#### 部署配置

1. 在 GitHub 仓库设置中启用 GitHub Pages：
   - 进入 Settings → Pages
   - Source: 选择 **GitHub Actions**

2. 推送代码到 `master` 分支，GitHub Actions 会自动构建和部署

### 配置说明

#### book.toml（中文版本）
- `src = "src/zh"` - 源文件目录
- `build-dir = "book"` - 输出目录
- `site-url = "https://emqo.github.io/BinaryEngineerLearning"` - 站点URL

#### book-en.toml（英文版本）
- `src = "src/en"` - 源文件目录
- `build-dir = "book-en"` - 输出目录
- `site-url = "https://emqo.github.io/BinaryEngineerLearning"` - 站点URL

## 维护说明

### 添加新章节

1. 在 `src/zh/SUMMARY.md` 和 `src/en/SUMMARY.md` 中添加章节链接
2. 在对应的语言目录下创建章节文件夹和 `content.md`
3. 确保两个版本的章节结构保持一致

### 更新内容

- 中文内容：编辑 `src/zh/` 目录下的文件
- 英文内容：编辑 `src/en/` 目录下的文件
- 主题文件：`theme/` 目录下的文件会被两个版本共享

### 切换语言版本

**本地开发**：
- 使用 `Start.bat` 选择启动中文或英文版本
- 或手动使用相应的 `mdbook serve` 命令

**在线部署**：
- 默认部署中文版本
- 如需切换为英文版本，需要修改 GitHub Actions 工作流配置
