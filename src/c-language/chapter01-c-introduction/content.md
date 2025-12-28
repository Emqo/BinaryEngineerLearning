# 第1章：C语言入门

## 1.1 什么是C语言

C语言是一种通用的、过程式的编程语言，由Dennis Ritchie在1972年开发。它是二进制工程师和系统程序员的基础语言，因为：

- **接近底层**：C语言提供了直接访问内存的能力，可以精确控制内存布局
- **高效性能**：编译后的代码执行效率高，接近汇编语言
- **广泛应用**：操作系统（Linux、Windows内核）、编译器（GCC、Clang）、嵌入式系统都用C编写
- **理解基础**：学习C语言有助于理解计算机底层原理，包括内存管理、指针、二进制操作

### C语言的历史地位

- **1972年**：Dennis Ritchie在贝尔实验室开发C语言
- **1978年**：《C程序设计语言》出版，成为经典教材
- **1989年**：ANSI C标准（C89/C90）发布
- **1999年**：C99标准发布，增加了新特性
- **2011年**：C11标准发布
- **至今**：C语言仍然是系统编程的首选语言

### 为什么学习C语言

对于二进制工程师来说，C语言是必须掌握的：

1. **理解内存布局**：C语言让你直接看到数据在内存中的存储方式
2. **指针操作**：理解指针就是理解内存地址，这对逆向工程至关重要
3. **位操作**：C语言提供了强大的位运算符，用于底层操作
4. **系统调用**：操作系统API通常用C语言接口
5. **性能优化**：理解C语言有助于优化程序性能

## 1.2 第一个C程序

让我们从经典的"Hello, World!"程序开始：

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

### 程序解析

#### 1. `#include <stdio.h>`

这是**预处理指令**（Preprocessor Directive），在编译之前执行：

- `#include` 告诉预处理器包含指定的头文件
- `<stdio.h>` 是标准输入输出库（Standard Input/Output）
- 这个头文件提供了 `printf`、`scanf`、`fopen` 等函数
- 头文件通常包含函数声明、宏定义、类型定义

**其他常用头文件**：
- `<stdlib.h>`：标准库函数（内存分配、随机数等）
- `<string.h>`：字符串处理函数
- `<math.h>`：数学函数
- `<limits.h>`：整数类型限制
- `<float.h>`：浮点数类型限制

#### 2. `int main()`

这是程序的**入口点**（Entry Point）：

- 每个C程序必须有一个 `main` 函数
- `int` 表示函数返回整数类型
- `()` 表示函数不接受参数（也可以写成 `void`）
- 程序从 `main` 函数的第一行开始执行

**main函数的其他形式**：
```c
int main(void) {          // 明确表示无参数
    return 0;
}

int main(int argc, char *argv[]) {  // 接受命令行参数
    return 0;
}
```

#### 3. `printf("Hello, World!\n");`

这是**函数调用**：

- `printf` 是格式化输出函数
- `"Hello, World!\n"` 是字符串字面量
- `\n` 是**转义字符**，表示换行符

**常用转义字符**：
- `\n`：换行（Newline）
- `\t`：制表符（Tab）
- `\\`：反斜杠
- `\"`：双引号
- `\'`：单引号
- `\0`：空字符（字符串结束符）

#### 4. `return 0;`

返回语句：

- `return 0;` 表示程序正常结束
- 在Unix/Linux系统中，返回0表示成功，非0表示错误
- 这是操作系统判断程序执行结果的依据

## 1.3 编译和运行

### 编译过程详解

C语言是**编译型语言**，需要经过编译才能运行。完整的编译过程包括四个阶段：

```
源代码(.c) → 预处理器 → 编译器 → 汇编器 → 链接器 → 可执行文件
```

##### 四个编译阶段

1. **预处理（Preprocessing）**
   - 处理 `#include`、`#define`、`#ifdef` 等预处理指令
   - 进行宏展开和条件编译
   - 输出 `.i` 文件（预处理后的源代码）

2. **编译（Compilation）**
   - 将预处理后的代码编译成汇编代码
   - 进行语法检查、语义分析
   - 输出 `.s` 文件（汇编代码）

3. **汇编（Assembly）**
   - 将汇编代码转换成机器码（目标文件）
   - 输出 `.o` 文件（目标文件，Linux/macOS）或 `.obj` 文件（Windows）

4. **链接（Linking）**
   - 将多个目标文件和库文件链接成可执行文件
   - 解析符号引用
   - 输出可执行文件

**查看各个阶段的输出**：

```bash
# 1. 只进行预处理，查看预处理后的代码
gcc -E hello.c -o hello.i

# 2. 进行预处理和编译，查看汇编代码
gcc -S hello.c -o hello.s

# 3. 进行预处理、编译和汇编，生成目标文件
gcc -c hello.c -o hello.o

# 4. 链接目标文件，生成可执行文件
gcc hello.o -o hello

# 或者一步完成所有阶段
gcc hello.c -o hello
```

**编译命令详解**：
```bash
# 基本编译
gcc hello.c -o hello

# 详细说明
# gcc: GNU C Compiler（编译器）
# hello.c: 源文件
# -o hello: 指定输出文件名

# 编译并显示所有警告
gcc -Wall hello.c -o hello

# 编译并显示更多警告（包括未使用的变量等）
gcc -Wall -Wextra hello.c -o hello

# 编译并优化（-O0: 无优化, -O1: 基本优化, -O2: 推荐优化, -O3: 激进优化）
gcc -O2 hello.c -o hello

# 调试模式（包含调试信息）
gcc -g hello.c -o hello

# 指定C标准（C99, C11等）
gcc -std=c99 hello.c -o hello

# 显示编译过程详细信息
gcc -v hello.c -o hello
```

**常用编译选项**：

| 选项 | 说明 |
|------|------|
| `-Wall` | 启用所有常见的警告 |
| `-Wextra` | 启用额外的警告 |
| `-Werror` | 将警告视为错误 |
| `-g` | 生成调试信息（用于gdb调试） |
| `-O0/-O1/-O2/-O3` | 优化级别（0=无优化，3=最高优化） |
| `-std=c99/c11` | 指定C标准版本 |
| `-I<dir>` | 添加头文件搜索路径 |
| `-L<dir>` | 添加库文件搜索路径 |
| `-l<lib>` | 链接指定的库 |
| `-D<macro>` | 定义宏 |

**运行程序**：
```bash
./hello        # Linux/macOS
hello.exe      # Windows
```

### 完整的程序示例

```c
#include <stdio.h>

int main() {
    // 这是单行注释
    
    /*
     * 这是多行注释
     * 可以写多行
     */
    
    printf("Hello, World!\n");
    printf("欢迎学习C语言！\n");
    
    return 0;
}
```
## 1.4 预处理指令

### 1.4.1 使用 `#define` 宏定义

```c
#include <stdio.h>

#define MAX_SIZE 100        // 宏定义常量
#define PI 3.14159
#define GREETING "Hello"

int main() {
    printf("MAX_SIZE = %d\n", MAX_SIZE);
    printf("PI = %.5f\n", PI);
    printf("GREETING = %s\n", GREETING);
    
    // MAX_SIZE = 200;  // 错误！不能修改
    
    return 0;
}
```

**特点**：
- 在预处理阶段进行文本替换
- 没有类型检查
- 不占用内存空间（编译时替换）

### 1.4.2 宏函数（Macro Functions）

除了简单的常量定义，`#define` 还可以定义宏函数：

```c
#include <stdio.h>

// 简单的宏函数
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

// 多行宏函数（使用反斜杠续行）
#define PRINT_INT(x) \
    do { \
        printf("变量 %s 的值: %d\n", #x, x); \
    } while(0)

int main() {
    int a = 10, b = 20;
    
    printf("=== 宏函数示例 ===\n");
    printf("MAX(%d, %d) = %d\n", a, b, MAX(a, b));
    printf("MIN(%d, %d) = %d\n", a, b, MIN(a, b));
    printf("SQUARE(%d) = %d\n", a, SQUARE(a));
    
    PRINT_INT(a);
    PRINT_INT(b);
    
    return 0;
}
```

**宏函数注意事项**：
- 参数要用括号包围，避免优先级问题：`((a) + (b))` 而不是 `a + b`
- 使用 `#x` 可以将参数转换为字符串字面量
- 多行宏使用 `\` 续行，用 `do { } while(0)` 包裹确保语句完整性

### 1.4.3 条件编译（Conditional Compilation）

条件编译允许根据条件包含或排除代码：

```c
#include <stdio.h>

// 定义宏来控制编译
#define DEBUG 1
#define VERSION "1.0.0"

int main() {
    printf("=== 条件编译示例 ===\n");
    
    // #ifdef: 如果定义了宏，则编译这段代码
    #ifdef DEBUG
    printf("调试模式已启用\n");
    #endif
    
    // #ifndef: 如果没有定义宏，则编译这段代码
    #ifndef RELEASE
    printf("这不是发布版本\n");
    #endif
    
    // #if: 如果条件为真，则编译这段代码
    #if DEBUG == 1
    printf("DEBUG 值为 1\n");
    #elif DEBUG == 2
    printf("DEBUG 值为 2\n");
    #else
    printf("DEBUG 值未知\n");
    #endif
    
    // #if defined: 检查宏是否定义
    #if defined(VERSION)
    printf("版本: %s\n", VERSION);
    #endif
    
    return 0;
}
```

**常用条件编译指令**：
- `#ifdef MACRO`：如果定义了 MACRO
- `#ifndef MACRO`：如果没有定义 MACRO
- `#if EXPRESSION`：如果表达式为真
- `#elif EXPRESSION`：否则如果表达式为真
- `#else`：否则
- `#endif`：结束条件编译块

**实际应用**：

```c
#include <stdio.h>

// 根据平台选择不同的代码
#ifdef _WIN32
    #define PLATFORM "Windows"
#elif __linux__
    #define PLATFORM "Linux"
#elif __APPLE__
    #define PLATFORM "macOS"
#else
    #define PLATFORM "Unknown"
#endif

// 调试宏
#ifdef DEBUG
    #define DBG_PRINT(fmt, ...) printf("[DEBUG] " fmt "\n", ##__VA_ARGS__)
#else
    #define DBG_PRINT(fmt, ...)  // 发布版本中为空，不产生代码
#endif

int main() {
    printf("当前平台: %s\n", PLATFORM);
    
    int x = 42;
    DBG_PRINT("变量 x = %d", x);  // 只在DEBUG模式下打印
    
    return 0;
}
```

**编译时定义宏**：
```bash
# 在编译时定义宏
gcc -DDEBUG program.c -o program

# 定义带值的宏
gcc -DVERSION="1.0.0" program.c -o program
```

---

## 1.5 练习题

### 题目1 [简单]

<div class="exercise-card">

**题目描述**：编写一个C程序，在屏幕上输出你的姓名和一句话介绍。

**要求**：
1. 使用 `printf` 函数输出
2. 至少输出两行内容
3. 使用换行符 `\n`

```c
#include <stdio.h>

int main() {
    // 在这里编写你的代码
    
    return 0;
}
```

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

int main() {
    printf("我的姓名：张三\n");
    printf("我是一名二进制工程师学习者！\n");
    return 0;
}
```
</div>

---

### 题目2 [简单]

<div class="exercise-card">

**题目描述**：使用宏定义创建一个常量 `PI`（值为3.14159），并在程序中打印它的值。

**要求**：
1. 使用 `#define` 定义宏
2. 使用 `printf` 打印宏的值

```c
#include <stdio.h>

// 在这里定义宏

int main() {
    // 在这里打印PI的值
    
    return 0;
}
```

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

#define PI 3.14159

int main() {
    printf("PI = %.5f\n", PI);
    return 0;
}
```
</div>

---

### 题目3 [中等]

<div class="exercise-card">

**题目描述**：使用条件编译（`#ifdef`）实现一个调试模式。当定义了 `DEBUG` 宏时，打印调试信息；否则不打印。

**要求**：
1. 使用 `#ifdef` 和 `#endif` 实现条件编译
2. 在编译时可以定义 `DEBUG` 宏（使用 `-DDEBUG` 选项）
3. 调试信息包括程序的执行步骤

```c
#include <stdio.h>

// 可以选择性地定义DEBUG宏
// #define DEBUG

int main() {
    printf("程序开始执行\n");
    
    // 在这里添加条件编译代码
    
    int x = 10;
    
    // 在这里添加条件编译代码，打印x的值
    
    printf("程序执行完毕\n");
    return 0;
}
```

**提示**：使用 `gcc -DDEBUG program.c -o program` 编译时可以定义DEBUG宏。

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

// 可以选择性地定义DEBUG宏
// #define DEBUG

int main() {
    printf("程序开始执行\n");
    
    #ifdef DEBUG
    printf("[DEBUG] 进入main函数\n");
    #endif
    
    int x = 10;
    
    #ifdef DEBUG
    printf("[DEBUG] x = %d\n", x);
    #endif
    
    printf("程序执行完毕\n");
    return 0;
}
```
</div>

---

### 题目4 [简单]

<div class="exercise-card">

**题目描述**：编写一个程序，使用多个 `printf` 语句和转义字符输出以下格式：

```
姓名：张三
年龄：20
职业：学生
爱好：编程
```

**要求**：
1. 使用 `\n` 换行
2. 使用 `\t` 制表符对齐
3. 至少使用两种不同的转义字符

```c
#include <stdio.h>

int main() {
    // 在这里编写你的代码
    
    return 0;
}
```

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

int main() {
    printf("姓名：\t张三\n");
    printf("年龄：\t20\n");
    printf("职业：\t学生\n");
    printf("爱好：\t编程\n");
    return 0;
}
```
</div>

---

### 题目5 [中等]

<div class="exercise-card">

**题目描述**：创建一个宏函数 `MAX(a, b)`，返回两个数中的较大值。在程序中测试这个宏函数。

**要求**：
1. 使用 `#define` 定义宏函数
2. 确保参数使用括号包围，避免优先级问题
3. 测试多个不同的数值

```c
#include <stdio.h>

// 在这里定义MAX宏函数

int main() {
    int a = 10, b = 20;
    int c = 5, d = 15;
    
    // 在这里使用MAX宏函数并打印结果
    // 应该输出：MAX(10, 20) = 20
    
    return 0;
}
```

**提示**：注意宏函数的参数要用括号包围，整个表达式也要用括号包围。

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int a = 10, b = 20;
    int c = 5, d = 15;
    
    printf("MAX(%d, %d) = %d\n", a, b, MAX(a, b));
    printf("MAX(%d, %d) = %d\n", c, d, MAX(c, d));
    
    return 0;
}
```
</div>