# 代码运行器使用说明

## 功能特性

✅ **支持多语言**：
- C 语言
- C++
- Python 3
- x86-64 Assembly

✅ **核心功能**：
- 一键运行代码
- 代码编辑功能
- 实时显示执行结果
- 错误提示
- 响应式设计（支持移动端）

## 使用方法

### 1. 在 Markdown 中编写代码块

代码块会自动检测语言并添加运行按钮：

````markdown
```c
#include <stdio.h>
int main() {
    printf("Hello, World!\n");
    return 0;
}
```
````

### 2. 支持的代码块格式

- ` ```c ` - C 语言
- ` ```cpp ` 或 ` ```c++ ` - C++
- ` ```python ` 或 ` ```py ` - Python 3
- ` ```assembly ` 或 ` ```asm ` - x86-64 Assembly

### 3. 功能按钮

每个代码块下方会自动出现两个按钮：
- **▶ 运行代码** - 直接运行当前代码
- **✏️ 编辑代码** - 打开编辑器修改代码后运行

## 技术实现

- **API**: Piston API (https://emkc.org/api/v2/piston/execute)
- **前端**: 原生 JavaScript
- **样式**: 自定义 CSS

## 文件说明

- `code-runner.js` - 核心 JavaScript 代码
- `code-runner.css` - 样式文件
- `README.md` - 本说明文件

## 配置

在 `book.toml` 中已配置：

```toml
[output.html]
additional-css = ["theme/code-runner.css"]
additional-js = ["theme/code-runner.js"]
```

## 测试

运行 `mdbook serve` 后，访问任意包含代码块的页面，应该能看到运行按钮。

## 注意事项

1. Piston API 是免费的，但有速率限制
2. 代码执行在远程服务器上进行
3. 不支持文件操作和网络请求（安全限制）
4. Assembly 语言可能需要特殊配置

