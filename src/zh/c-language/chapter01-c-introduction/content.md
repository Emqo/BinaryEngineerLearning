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

| 头文件 | 主要功能 | 常用函数/宏 |
|--------|---------|------------|
| `<stdio.h>` | 标准输入输出 | `printf`, `scanf`, `fopen`, `fclose` |
| `<stdlib.h>` | 标准库函数 | `exit`, `rand`, `srand` |
| `<string.h>` | 字符串处理 | `strlen`, `strcpy`, `strcat`, `strcmp` |
| `<math.h>` | 数学函数 | `sqrt`, `pow`, `sin`, `cos` |
| `<limits.h>` | 整数类型限制 | `INT_MAX`, `INT_MIN` |
| `<float.h>` | 浮点数类型限制 | `FLT_MAX`, `FLT_MIN` |
| `<ctype.h>` | 字符分类 | `isalpha`, `isdigit`, `islower`, `isupper` |
| `<time.h>` | 时间处理 | `time`, `ctime` |

**头文件包含方式**：

1. **系统头文件**：使用 `<>`
   ```c
   #include <stdio.h>  // 从系统路径查找
   ```

2. **自定义头文件**：使用 `""`
   ```c
   #include "myheader.h"  // 从当前目录或指定路径查找
   ```

3. **搜索路径**：
   - 系统头文件路径：通常是 `/usr/include`（Linux）、`C:\MinGW\include`（Windows）
   - 可以通过 `-I` 选项添加自定义搜索路径
   ```bash
   gcc -I./include program.c  # 添加 ./include 目录到搜索路径
   ```

#### 2. `int main()`

这是程序的**入口点**（Entry Point）：

- 每个C程序必须有一个且仅有一个 `main` 函数
- `int` 表示函数返回整数类型（退出状态码）
- `()` 表示函数不接受参数（也可以写成 `void`）
- 程序从 `main` 函数的第一行开始执行，按顺序执行到 `return` 或函数结束
- `main` 函数是程序的入口和出口

**main函数的形式**：

```c
int main(void) {  // void 明确表示不接受参数
    printf("Hello\n");
    return 0;
}
```

或者：
```c
int main() {  // 空的参数列表
    return 0;
}
```

**注意**：main函数也可以接受命令行参数（`int main(int argc, char *argv[])`），但这部分内容会在后续章节中讲解。

**main函数的执行流程**：

```
程序启动
    ↓
操作系统加载程序到内存
    ↓
调用 main() 函数
    ↓
执行 main() 函数体中的代码
    ↓
遇到 return 语句或函数结束
    ↓
返回值传递给操作系统
    ↓
程序结束
```

**main函数的返回值详解**：

- `return 0;`：程序正常结束
- `return 1;` 或 `return -1;`：程序异常结束
- 如果不写 `return`，C99标准规定编译器会自动添加 `return 0;`
- 但为了代码清晰，建议明确写出返回值


#### 3. `printf("Hello, World!\n");`

这是**函数调用**：

- `printf` 是格式化输出函数，用于在屏幕上显示信息
- `"Hello, World!\n"` 是字符串字面量（String Literal），用双引号包围
- `\n` 是**转义字符**（Escape Character），表示换行符
- 分号 `;` 表示语句结束，C语言中每条语句必须以分号结尾

**printf函数详解**：

`printf` 函数的完整形式是：
```c
int printf(const char *format, ...);
```

- `format`：格式字符串，可以包含普通文本和格式说明符（如 `%d`、`%f`、`%s`）
- `...`：可变参数列表，对应格式字符串中的格式说明符
- 返回值：成功返回输出的字符数，失败返回负值

**常用格式说明符**：
- `%d` 或 `%i`：整数（int）
- `%f`：浮点数（float/double）
- `%c`：单个字符（char）
- `%s`：字符串（char *）
- `%x` 或 `%X`：十六进制数（小写/大写）
- `%o`：八进制数
- `%p`：指针地址
- `%%`：输出 `%` 字符本身

**printf示例**（目前先了解基本用法，详细用法会在后续章节学习）：
```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    printf("这是第一行\n这是第二行\n");
    return 0;
}
```

**常用转义字符**：

| 转义字符 | 名称 | 作用 |
|---------|------|------|
| `\n` | 换行符 | 移动到下一行开头 |
| `\t` | 制表符 | 水平制表，用于对齐 |
| `\\` | 反斜杠 | 输出反斜杠字符本身 |
| `\"` | 双引号 | 在字符串中输出双引号 |
| `\'` | 单引号 | 在字符中输出单引号 |

**转义字符示例**：
```c
#include <stdio.h>

int main() {
    printf("第一行\n第二行\n");              // 换行
    printf("姓名\t年龄\t职业\n");            // 制表符对齐
    printf("张三\t20\t学生\n");
    printf("路径：C:\\Users\\Desktop\n");    // 输出反斜杠
    printf("他说：\"你好！\"\n");            // 输出双引号
    
    return 0;
}
```

**运行结果**：
```
第一行
第二行
姓名    年龄    职业
张三    20      学生
路径：C:\Users\Desktop
他说："你好！"
```

#### 4. `return 0;`

返回语句：

- `return 0;` 表示程序正常结束并返回退出状态码0
- 在Unix/Linux系统中，返回0表示成功，非0表示错误
- 这是操作系统判断程序执行结果的依据
- `main` 函数的返回值会传递给操作系统

**退出状态码说明**：

在Unix/Linux系统中，程序执行后可以通过 `echo $?` 查看上一个程序的退出状态码：

```bash
./hello
echo $?  # 输出：0（表示程序成功执行）
```

**常见退出状态码**：
- `0`：成功（Success）
- `1`：一般性错误（General Error）
- `2`：误用shell命令（Misuse of shell command）
- `126`：命令无法执行（Command cannot execute）
- `127`：命令未找到（Command not found）
- `128`：无效的退出参数（Invalid exit argument）

**示例**：
```c
#include <stdio.h>

int main() {
    printf("程序执行中...\n");
    
    // 可以根据程序执行情况返回不同的状态码
    // return 0;   // 成功
    // return 1;   // 失败
    // return -1;  // 也是失败（在Unix/Linux中会被转换为255）
    
    return 0;
}
```

**注意**：如果 `main` 函数没有显式写 `return 0;`，C99标准规定编译器会自动添加。但为了代码清晰，建议明确写出。

## 1.3 编译和运行

### 编译过程详解

C语言是**编译型语言**，需要经过编译才能运行。完整的编译过程包括四个阶段：

```
源代码(.c) → 预处理器 → 编译器 → 汇编器 → 链接器 → 可执行文件
```

##### 四个编译阶段详解

1. **预处理（Preprocessing）**
   
   预处理是编译的第一步，预处理器会：
   - 展开所有 `#include` 指令，将被包含的文件内容插入当前位置
   - 展开所有 `#define` 宏定义，进行文本替换
   - 处理条件编译指令（`#ifdef`、`#if`、`#endif` 等）
   - 删除所有注释
   - 处理行号标记（用于调试）
   
   **预处理示例**：
   ```c
   // hello.c
   #include <stdio.h>
   #define MAX 100
   
   int main() {
       printf("MAX = %d\n", MAX);
       return 0;
   }
   ```
   
   预处理后（`hello.i` 文件）会包含 `stdio.h` 的完整内容，`MAX` 会被替换为 `100`：
   ```c
   // ... stdio.h 的内容（可能几千行） ...
   int main() {
       printf("MAX = %d\n", 100);  // MAX 被替换
       return 0;
   }
   ```

2. **编译（Compilation）**
   
   编译器将预处理后的C代码转换为汇编语言：
   - **词法分析**：将源代码分解成词法单元（token），如关键字、标识符、操作符等
   - **语法分析**：检查语法是否正确，构建抽象语法树（AST）
   - **语义分析**：检查类型、作用域、声明等语义信息
   - **代码生成**：生成目标平台的汇编代码
   - **优化**：进行各种优化（如果启用了优化选项）
   
   **编译输出示例**（汇编代码 `hello.s`）：
   ```assembly
   .section    __TEXT,__text,regular,pure_instructions
   .build_version macos, 11, 0
   .globl  _main
   _main:
       pushq   %rbp
       movq    %rsp, %rbp
       leaq    L_.str(%rip), %rdi
       movl    $100, %esi
       callq   _printf
       xorl    %eax, %eax
       popq    %rbp
       retq
   L_.str:
       .asciz  "MAX = %d\n"
   ```

3. **汇编（Assembly）**
   
   汇编器将汇编代码转换为机器码（二进制目标文件）：
   - 将汇编指令转换为对应的机器指令
   - 分配内存地址
   - 生成符号表（函数名、变量名等）
   - 生成可重定位的目标文件
   
   **目标文件特点**：
   - 包含机器码，但还不是最终的可执行文件
   - 外部符号（如 `printf`）只是引用，地址未确定
   - 可以被链接器处理

4. **链接（Linking）**
   
   链接器将多个目标文件和库文件合并成可执行文件：
   - **符号解析**：找到所有未定义的符号（如 `printf`）
   - **符号重定位**：确定所有符号的最终地址
   - **合并段**：将多个目标文件的代码段、数据段等合并
   - **生成可执行文件**：包含所有必要的代码和数据
   
   **链接过程示例**：
   ```
   hello.o (目标文件)
      ↓
   + libc.a (C标准库)
      ↓
   = hello (可执行文件)
   ```
   
   **为什么需要链接**：
   - 我们的程序使用了标准库函数（如 `printf`）
   - 这些函数的实现在标准库中，不在我们的 `.c` 文件中
   - 链接器将我们的代码和库代码组合在一起

**完整的编译流程图示**：
```
源代码 (hello.c)
    ↓ [预处理]
预处理后的代码 (hello.i)
    ↓ [编译]
汇编代码 (hello.s)
    ↓ [汇编]
目标文件 (hello.o)
    ↓ [链接]
可执行文件 (hello 或 hello.exe)
```

**查看各个阶段的输出**：

```bash
# 1. 只进行预处理，查看预处理后的代码
gcc -E hello.c -o hello.i
# 查看预处理后的代码
cat hello.i  # 或 type hello.i (Windows)

# 2. 进行预处理和编译，查看汇编代码
gcc -S hello.c -o hello.s
# 查看汇编代码
cat hello.s  # 或 type hello.s (Windows)

# 3. 进行预处理、编译和汇编，生成目标文件
gcc -c hello.c -o hello.o
# 查看目标文件信息（Linux/macOS）
file hello.o
objdump -d hello.o  # 反汇编

# 4. 链接目标文件，生成可执行文件
gcc hello.o -o hello
# 或者使用标准库（通常自动链接）
gcc hello.o -o hello -lc

# 或者一步完成所有阶段（最常用）
gcc hello.c -o hello
```

**各阶段文件说明**：

| 文件扩展名 | 文件类型 | 说明 |
|-----------|---------|------|
| `.c` | C源代码 | 人类可读的源代码 |
| `.i` | 预处理后的代码 | 包含所有头文件和宏展开后的代码 |
| `.s` | 汇编代码 | 汇编语言源代码 |
| `.o` / `.obj` | 目标文件 | 机器码，但未链接 |
| `无扩展名` / `.exe` | 可执行文件 | 最终的可执行程序 |

**实际演示示例**：

创建一个简单的程序 `example.c`：
```c
#include <stdio.h>
#define VALUE 42

int main() {
    printf("Value: %d\n", VALUE);
    return 0;
}
```

然后逐步查看每个阶段的输出：
```bash
# 步骤1：预处理
gcc -E example.c -o example.i
# 查看 example.i，会发现：
# - stdio.h 的内容被完整插入
# - VALUE 被替换为 42
# - 注释被删除

# 步骤2：编译
gcc -S example.c -o example.s
# 查看 example.s，会看到汇编代码

# 步骤3：汇编
gcc -c example.c -o example.o
# 生成二进制目标文件

# 步骤4：链接
gcc example.o -o example
# 生成可执行文件

# 运行
./example  # Linux/macOS
example.exe  # Windows
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

**运行结果**：
```
Hello, World!
欢迎学习C语言！
```

### 注释详解

注释（Comments）是代码中的说明文字，不会被执行，用于：
- 解释代码的作用和意图
- 记录算法思路
- 标记待办事项
- 禁用某些代码行

**两种注释方式**：

1. **单行注释**：使用 `//`，从 `//` 开始到行尾都是注释
   ```c
   int x = 10;  // 这是单行注释，定义变量x
   // 这是单独一行的注释
   ```

2. **多行注释**：使用 `/* */`，可以跨多行
   ```c
   /* 
    * 这是多行注释
    * 可以写多行内容
    * 用于详细说明
    */
   ```

**注释使用示例**：
```c
#include <stdio.h>

int main() {
    // 这是单行注释，说明下面代码的作用
    printf("Hello, World!\n");
    
    /*
     * 这是多行注释
     * 可以写多行说明
     * 用于解释复杂的功能
     */
    printf("欢迎学习C语言！\n");
    
    return 0;
}
```

**注释注意事项**：
- 注释不能嵌套（多行注释内不能再包含多行注释）
- 单行注释可以嵌套在多行注释内
- 注释要简洁明了，不要过度注释
- 关键算法和复杂逻辑一定要有注释
- 修改代码时要同步更新注释

**错误的注释示例**：
```c
/* 
 * 这是一个错误的注释
 * /* 嵌套的多行注释 - 这是错误的！*/
 */
```
### 常见的编译错误和解决方法

在学习C语言的过程中，会遇到各种编译错误。理解这些错误有助于快速定位和解决问题：

**1. 语法错误（Syntax Error）**

**示例**：缺少分号
```c
int main() {
    printf("Hello\n")  // 错误：缺少分号
    return 0;
}
```

**错误信息**：
```
error: expected ';' before 'return'
```

**解决方法**：在 `printf` 语句末尾添加分号

---

**2. 未声明的标识符（Undefined Identifier）**

**示例**：未包含头文件
```c
int main() {
    printf("Hello\n");  // 错误：printf 未声明
    return 0;
}
```

**错误信息**：
```
warning: implicit declaration of function 'printf'
error: incompatible implicit declaration of built-in function 'printf'
```

**解决方法**：添加 `#include <stdio.h>`

---

**3. 类型不匹配（Type Mismatch）**

**示例**：使用错误的格式说明符
```c
#include <stdio.h>

int main() {
    int x = 10;
    printf("%s\n", x);  // 错误：%s 用于字符串，x 是整数
    return 0;
}
```

**错误信息**：
```
warning: format '%s' expects argument of type 'char *', but argument 2 has type 'int'
```

**解决方法**：使用正确的格式说明符 `%d`

---


**5. 宏定义错误**

**示例**：宏函数参数未加括号
```c
#include <stdio.h>

#define SQUARE(x) x * x  // 错误：参数未加括号

int main() {
    int result = SQUARE(2 + 3);  // 展开为：2 + 3 * 2 + 3 = 11（错误！）
    printf("%d\n", result);
    return 0;
}
```

**解决方法**：
```c
#define SQUARE(x) ((x) * (x))  // 正确：参数和整个表达式都加括号
```

---

**调试技巧**：

1. **仔细阅读错误信息**：编译器会指出错误的位置和类型
2. **从第一个错误开始修复**：后面的错误可能是由第一个错误引起的
3. **使用 `-Wall` 选项**：显示所有警告信息
4. **逐步编译**：使用 `-c` 选项只编译不链接，定位错误阶段
5. **查看预处理结果**：使用 `-E` 选项查看预处理后的代码

```bash
# 显示所有警告
gcc -Wall -Wextra program.c -o program

# 显示更详细的错误信息
gcc -v program.c -o program 2>&1 | less
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
- 在预处理阶段进行文本替换，编译前就已经替换完成
- 没有类型检查，只是简单的文本替换
- 不占用内存空间（编译时替换，不会生成变量）
- 宏定义的作用域从定义处开始到文件结束，或遇到 `#undef` 指令

**宏定义详细说明**：

1. **文本替换机制**：
   ```c
   #define MAX_SIZE 100
   
   int array[MAX_SIZE];  // 预处理后变成：int array[100];
   ```

2. **宏定义可以使用表达式**：
   ```c
   #define SIZE (10 + 20)  // 注意：表达式要用括号
   #define AREA (SIZE * SIZE)  // 可以使用其他宏
   ```

3. **取消宏定义**：
   ```c
   #define MAX_SIZE 100
   // ... 使用 MAX_SIZE ...
   #undef MAX_SIZE  // 取消定义，后续代码不能再使用 MAX_SIZE
   ```

4. **宏定义的作用域**：
   - 只在定义它的文件中有效
   - 如果想在多个文件中使用，可以放在头文件中

**宏定义 vs 变量**：

| 特性 | 宏定义 (#define) | 变量 (const) |
|------|-----------------|-------------|
| 类型检查 | 无 | 有 |
| 内存占用 | 无（编译时替换） | 有（运行时存在） |
| 作用域 | 文件作用域 | 块作用域 |
| 调试 | 不可调试 | 可以调试 |
| 使用场景 | 常量、配置值 | 需要类型检查的常量 |

**示例对比**：
```c
#include <stdio.h>

#define PI_MACRO 3.14159      // 宏定义
const double PI_CONST = 3.14159;  // 常量（C99支持）

int main() {
    printf("PI_MACRO = %.5f\n", PI_MACRO);
    printf("PI_CONST = %.5f\n", PI_CONST);
    
    // PI_CONST = 3.14;  // 错误！常量不能修改
    // PI_MACRO 在编译前就被替换了，不存在修改的问题
    
    return 0;
}
```

### 1.4.2 宏函数（Macro Functions）

除了简单的常量定义，`#define` 还可以定义宏函数：

```c
#include <stdio.h>

// 简单的宏函数
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

int main() {
    printf("MAX(10, 20) = %d\n", MAX(10, 20));
    printf("MIN(10, 20) = %d\n", MIN(10, 20));
    printf("SQUARE(5) = %d\n", SQUARE(5));
    
    return 0;
}
```

**宏函数注意事项**：

1. **参数必须用括号包围**：
   ```c
   // 错误示例
   #define SQUARE(x) x * x
   int result = SQUARE(2 + 3);  // 展开为：2 + 3 * 2 + 3 = 11（错误！）
   
   // 正确示例
   #define SQUARE(x) ((x) * (x))
   int result = SQUARE(2 + 3);  // 展开为：((2 + 3) * (2 + 3)) = 25（正确！）
   ```

2. **整个表达式也要用括号**：
   ```c
   // 错误示例
   #define ADD(a, b) a + b
   int result = ADD(1, 2) * 3;  // 展开为：1 + 2 * 3 = 7（错误！）
   
   // 正确示例
   #define ADD(a, b) ((a) + (b))
   int result = ADD(1, 2) * 3;  // 展开为：((1) + (2)) * 3 = 9（正确！）
   ```

3. **字符串化操作符 `#`**：将参数转换为字符串字面量
   ```c
   #define STR(x) #x
   printf("%s\n", STR(hello));  // 输出：hello（作为字符串）
   ```

4. **多行宏使用反斜杠续行**：
   ```c
   #define PRINT_SUM(a, b) \
       do { \
           int sum = (a) + (b); \
           printf("Sum: %d\n", sum); \
       } while(0)
   
   // 使用 do { } while(0) 的原因：
   // 1. 确保是一个完整的语句，可以在任何地方使用
   // 2. 需要分号结尾，符合C语言语法
   // 3. 可以安全地用在 if-else 语句中
   ```

5. **宏函数的副作用**（了解即可，初学阶段避免使用）：
   - 如果参数包含有副作用的表达式（如 `++i`），可能被多次求值
   - 建议在初学阶段，宏函数的参数只使用简单变量或常量

**宏函数 vs 普通函数**：

| 特性 | 宏函数 | 普通函数 |
|------|--------|---------|
| 执行时间 | 编译时展开，运行时无开销 | 运行时调用，有函数调用开销 |
| 类型检查 | 无 | 有 |
| 副作用 | 可能有（参数可能被多次求值） | 无（参数只求值一次） |
| 代码大小 | 可能增大（多次展开） | 代码大小固定 |
| 调试 | 困难 | 容易 |
| 适用场景 | 简单、频繁使用的操作 | 复杂逻辑 |

**宏函数完整示例**：
```c
#include <stdio.h>

// 求最大值
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// 求最小值
#define MIN(a, b) ((a) < (b) ? (a) : (b))


int main() {
    int a = 10, b = 20;
    
    printf("MAX(%d, %d) = %d\n", a, b, MAX(a, b));
    printf("MIN(%d, %d) = %d\n", a, b, MIN(a, b));
    printf("SQUARE(%d) = %d\n", a, SQUARE(a));
    
    return 0;
}
```

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

**实际应用示例**：

```c
#include <stdio.h>

// 调试模式：定义DEBUG宏时打印调试信息
#ifdef DEBUG
    #define DEBUG_PRINT(msg) printf("[DEBUG] %s\n", msg)
#else
    #define DEBUG_PRINT(msg)  // 发布版本中为空，不产生代码
#endif

int main() {
    printf("程序开始执行\n");
    
    DEBUG_PRINT("这是调试信息");  // 只在定义了DEBUG时才会打印
    
    printf("程序执行完毕\n");
    return 0;
}
```

**说明**：以上示例展示了条件编译的基本用法。更复杂的应用（如平台检测、格式化输出等）会在后续章节中学习。

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