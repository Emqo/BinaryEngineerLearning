# 第1章练习题

---

## 题目1：文件权限管理系统 [中等]

<div class="exercise-card">

**项目场景**：在Linux/Unix系统中，文件权限使用位标志来表示。你需要实现一个简单的权限管理系统，模拟 `chmod` 命令的核心功能。

**题目描述**：实现一个文件权限管理系统，支持：
1. 使用位标志表示三种权限：读（READ）、写（WRITE）、执行（EXECUTE）
2. 支持设置、清除、检查权限操作
3. 支持权限组合（如读写、读写执行）
4. 以 `rwx` 格式显示权限（类似 `ls -l` 的输出）

**要求**：
- 使用 `#define` 定义权限标志位（`FLAG_READ = 0x01`, `FLAG_WRITE = 0x02`, `FLAG_EXECUTE = 0x04`）
- 实现权限设置、清除、检查、切换功能
- 实现 `print_permissions()` 函数，以 `rwx` 格式输出（如 `rw-` 表示读写权限）
- 程序演示完整的权限操作流程

**示例输出**：
```
初始权限: --- (0x00)
设置读权限后: r-- (0x01)
设置写权限后: rw- (0x03)
设置执行权限后: rwx (0x07)
清除写权限后: r-x (0x05)
检查权限: 有读权限, 有执行权限, 无写权限
```

**提示**：
- 权限组合：`READ | WRITE` = `rw-`
- 检查权限：`if (perms & FLAG_READ)`
- 清除权限：`perms &= ~FLAG_WRITE`
- `rwx` 格式：遍历三个标志位，有权限显示对应字母，无权限显示 `-`

```c
#include <stdio.h>

// 在这里定义权限标志位

// 在这里实现 print_permissions() 函数

int main() {
    // 在这里编写你的代码
    
    return 0;
}
```

<!-- 参考答案开始 -->
<div class="exercise-answer" data-exercise="1" style="display: none;">

<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

#define FLAG_READ    0x01  // 00000001 (二进制)
#define FLAG_WRITE   0x02  // 00000010 (二进制)
#define FLAG_EXECUTE 0x04  // 00000100 (二进制)

void print_permissions(unsigned char perms) {
    // 检查并打印读权限
    if (perms & FLAG_READ) {
        printf("r");
    } else {
        printf("-");
    }
    
    // 检查并打印写权限
    if (perms & FLAG_WRITE) {
        printf("w");
    } else {
        printf("-");
    }
    
    // 检查并打印执行权限
    if (perms & FLAG_EXECUTE) {
        printf("x");
    } else {
        printf("-");
    }
}

int main() {
    unsigned char perms = 0;  // 初始无权限
    
    printf("初始权限: ");
    print_permissions(perms);
    printf(" (0x%02x)\n", perms);
    
    // 设置读权限
    perms |= FLAG_READ;
    printf("设置读权限后: ");
    print_permissions(perms);
    printf(" (0x%02x)\n", perms);
    
    // 设置写权限
    perms |= FLAG_WRITE;
    printf("设置写权限后: ");
    print_permissions(perms);
    printf(" (0x%02x)\n", perms);
    
    // 设置执行权限
    perms |= FLAG_EXECUTE;
    printf("设置执行权限后: ");
    print_permissions(perms);
    printf(" (0x%02x)\n", perms);
    
    // 清除写权限
    perms &= ~FLAG_WRITE;
    printf("清除写权限后: ");
    print_permissions(perms);
    printf(" (0x%02x)\n", perms);
    
    // 检查权限
    printf("检查权限: ");
    if (perms & FLAG_READ) {
        printf("有读权限, ");
    } else {
        printf("无读权限, ");
    }
    if (perms & FLAG_WRITE) {
        printf("有写权限, ");
    } else {
        printf("无写权限, ");
    }
    if (perms & FLAG_EXECUTE) {
        printf("有执行权限\n");
    } else {
        printf("无执行权限\n");
    }
    
    return 0;
}
```

</div>
<!-- 参考答案结束 -->

</div>

---

## 题目2：内存布局分析工具 [中等]

<div class="exercise-card">

**项目场景**：在逆向工程和调试中，理解程序的内存布局至关重要。你需要实现一个简单的内存分析工具，用于观察变量在栈上的分布情况。

**题目描述**：实现一个内存布局分析工具，能够：
1. 分析函数调用链中各个栈帧的布局
2. 计算变量之间的地址差
3. 显示每个变量的详细信息（类型、值、地址、大小）
4. 识别栈的增长方向

**要求**：
- 创建至少两个函数，形成调用链（`main` → `function_a` → `function_b`）
- 每个函数中声明不同类型的局部变量
- 打印每个变量的：类型、值、地址（十六进制）、大小（字节）
- 计算并显示相邻变量的地址差
- 分析栈的增长方向

**示例输出**：
```
=== 内存布局分析 ===

【main函数栈帧】
变量: int main_var
  值: 100
  地址: 0x7fff5fbff6ac
  大小: 4 字节

【function_a栈帧】
变量: int param_a
  值: 200
  地址: 0x7fff5fbff68c
  大小: 4 字节
变量: float local_a
  值: 3.14
  地址: 0x7fff5fbff688
  大小: 4 字节

地址差分析:
  main_var 和 param_a 相差: -32 字节
  栈增长方向: 向下（低地址方向）
```

**提示**：
- 使用 `%p` 打印地址，需要转换为 `(void*)&变量`
- 使用 `sizeof` 获取变量大小
- 地址差计算：`(char*)&var2 - (char*)&var1`
- 注意：地址差可能是负数（栈向下增长）

```c
#include <stdio.h>

// 在这里声明 function_a 和 function_b

int main() {
    // 在这里编写你的代码
    
    return 0;
}
```

<!-- 参考答案开始 -->
<div class="exercise-answer" data-exercise="2" style="display: none;">

<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

void function_b(int param_b1, int param_b2) {
    int local_b = param_b1 + param_b2;
    
    printf("\n【function_b栈帧】\n");
    printf("变量: int param_b1\n");
    printf("  值: %d\n", param_b1);
    printf("  地址: %p\n", (void*)&param_b1);
    printf("  大小: %zu 字节\n", sizeof(param_b1));
    
    printf("变量: int param_b2\n");
    printf("  值: %d\n", param_b2);
    printf("  地址: %p\n", (void*)&param_b2);
    printf("  大小: %zu 字节\n", sizeof(param_b2));
    
    printf("变量: int local_b\n");
    printf("  值: %d\n", local_b);
    printf("  地址: %p\n", (void*)&local_b);
    printf("  大小: %zu 字节\n", sizeof(local_b));
    
    // 计算地址差
    long diff1 = (long)((char*)&param_b2 - (char*)&param_b1);
    long diff2 = (long)((char*)&local_b - (char*)&param_b2);
    printf("\n地址差: param_b2 - param_b1 = %ld 字节\n", diff1);
    printf("地址差: local_b - param_b2 = %ld 字节\n", diff2);
}

void function_a(int param_a) {
    float local_a = 3.14f;
    char ch_a = 'A';
    
    printf("\n【function_a栈帧】\n");
    printf("变量: int param_a\n");
    printf("  值: %d\n", param_a);
    printf("  地址: %p\n", (void*)&param_a);
    printf("  大小: %zu 字节\n", sizeof(param_a));
    
    printf("变量: float local_a\n");
    printf("  值: %.2f\n", local_a);
    printf("  地址: %p\n", (void*)&local_a);
    printf("  大小: %zu 字节\n", sizeof(local_a));
    
    printf("变量: char ch_a\n");
    printf("  值: %c\n", ch_a);
    printf("  地址: %p\n", (void*)&ch_a);
    printf("  大小: %zu 字节\n", sizeof(ch_a));
    
    // 调用 function_b
    function_b(10, 20);
    
    // 计算地址差
    long diff1 = (long)((char*)&local_a - (char*)&param_a);
    long diff2 = (long)((char*)&ch_a - (char*)&local_a);
    printf("\n地址差: local_a - param_a = %ld 字节\n", diff1);
    printf("地址差: ch_a - local_a = %ld 字节\n", diff2);
}

int main() {
    int main_var = 100;
    double main_double = 2.71828;
    
    printf("=== 内存布局分析 ===\n");
    
    printf("\n【main函数栈帧】\n");
    printf("变量: int main_var\n");
    printf("  值: %d\n", main_var);
    printf("  地址: %p\n", (void*)&main_var);
    printf("  大小: %zu 字节\n", sizeof(main_var));
    
    printf("变量: double main_double\n");
    printf("  值: %.5f\n", main_double);
    printf("  地址: %p\n", (void*)&main_double);
    printf("  大小: %zu 字节\n", sizeof(main_double));
    
    // 调用 function_a
    function_a(200);
    
    // 计算地址差
    long diff = (long)((char*)&main_double - (char*)&main_var);
    printf("\n地址差: main_double - main_var = %ld 字节\n", diff);
    
    // 分析栈增长方向
    printf("\n=== 栈增长方向分析 ===\n");
    if (diff > 0) {
        printf("栈向高地址方向增长（向上）\n");
    } else {
        printf("栈向低地址方向增长（向下）\n");
    }
    printf("注意：实际方向取决于系统和编译器\n");
    
    return 0;
}
```

</div>
<!-- 参考答案结束 -->

</div>

---

## 题目3：十六进制数据查看器 [中等]

<div class="exercise-card">

**项目场景**：在二进制分析和调试中，经常需要查看数据的十六进制表示。你需要实现一个类似 `hexdump` 的简单工具，用于以十六进制格式显示数据。

**题目描述**：实现一个十六进制数据查看器，能够：
1. 以十六进制格式显示变量的内存内容
2. 按字节显示，每行显示16个字节
3. 同时显示十六进制和ASCII字符（可打印字符）
4. 支持显示不同数据类型的十六进制表示

**要求**：
- 实现 `hex_dump()` 函数，接受数据指针和长度
- 每行显示：偏移量、16个字节的十六进制、ASCII字符
- 对于不可打印字符（ASCII < 32 或 > 126），显示 `.`
- 演示对整数、浮点数、字符串的十六进制转储

**示例输出**：
```
=== 十六进制数据查看器 ===

整数 0x41424344 的内存转储:
00000000:  44 43 42 41                                      DCBA

字符串 "Hello" 的内存转储:
00000000:  48 65 6c 6c 6f 00                                Hello.

浮点数 3.14 的内存转储:
00000000:  c3 f5 48 40                                      ..H@
```

**提示**：
- 使用 `unsigned char*` 指针逐字节访问内存
- 十六进制格式化：`printf("%02x ", byte)`
- ASCII判断：`if (byte >= 32 && byte <= 126)`
- 注意字节序（大端/小端）：整数在内存中的存储顺序

```c
#include <stdio.h>

// 在这里实现 hex_dump() 函数

int main() {
    // 在这里编写你的代码
    
    return 0;
}
```

<!-- 参考答案开始 -->
<div class="exercise-answer" data-exercise="3" style="display: none;">

<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

void hex_dump(const void *data, size_t size) {
    const unsigned char *bytes = (const unsigned char *)data;
    
    printf("%08x:  ", 0);  // 偏移量
    
    // 打印十六进制
    for (size_t i = 0; i < size && i < 16; i++) {
        printf("%02x ", bytes[i]);
        if (i == 7) {
            printf(" ");  // 中间分隔
        }
    }
    
    // 填充空格（如果不足16字节）
    for (size_t i = size; i < 16; i++) {
        printf("   ");
        if (i == 7) {
            printf(" ");
        }
    }
    
    printf(" ");
    
    // 打印ASCII字符
    for (size_t i = 0; i < size && i < 16; i++) {
        if (bytes[i] >= 32 && bytes[i] <= 126) {
            printf("%c", bytes[i]);
        } else {
            printf(".");
        }
    }
    
    printf("\n");
}

int main() {
    printf("=== 十六进制数据查看器 ===\n\n");
    
    // 整数转储
    int num = 0x41424344;  // "DCBA" 的十六进制（注意字节序）
    printf("整数 0x%x 的内存转储:\n", num);
    hex_dump(&num, sizeof(num));
    printf("\n");
    
    // 字符串转储
    char str[] = "Hello";
    printf("字符串 \"%s\" 的内存转储:\n", str);
    hex_dump(str, sizeof(str));  // 包括 '\0'
    printf("\n");
    
    // 浮点数转储
    float f = 3.14f;
    printf("浮点数 %.2f 的内存转储:\n", f);
    hex_dump(&f, sizeof(f));
    printf("\n");
    
    // 混合数据转储
    unsigned char data[] = {0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x57, 0x6f, 
                            0x72, 0x6c, 0x64, 0x21, 0x00};
    printf("混合数据转储:\n");
    hex_dump(data, sizeof(data));
    
    return 0;
}
```

</div>
<!-- 参考答案结束 -->

</div>

---

## 题目4：数据类型大小检测工具 [简单]

<div class="exercise-card">

**项目场景**：在跨平台开发中，不同系统上的数据类型大小可能不同。你需要实现一个工具，用于检测当前系统的数据类型大小，这在编写可移植代码时非常重要。

**题目描述**：实现一个数据类型大小检测工具，能够：
1. 检测所有基本数据类型的大小
2. 检测有符号和无符号类型的范围
3. 以表格形式输出，便于阅读
4. 检测指针类型的大小（32位 vs 64位系统）

**要求**：
- 使用 `sizeof` 检测类型大小
- 使用 `<limits.h>` 和 `<float.h>` 获取类型范围
- 格式化输出为表格
- 检测 `void*` 指针大小（判断系统是32位还是64位）

**示例输出**：
```
=== 数据类型大小检测工具 ===

类型              大小(字节)    有符号范围
-------------------------------------------
char              1            -128 到 127
short             2            -32768 到 32767
int               4            -2147483648 到 2147483647
long              8            -9223372036854775808 到 9223372036854775807
long long         8            -9223372036854775808 到 9223372036854775807
float             4            ±3.402823e+38
double            8            ±1.797693e+308

指针类型大小: 8 字节 (64位系统)
```

**提示**：
- 包含 `<limits.h>` 和 `<float.h>` 头文件
- 使用 `CHAR_MIN`, `INT_MAX` 等宏
- 指针大小：`sizeof(void*)` 可以判断系统位数
- 格式化输出：使用 `printf` 的宽度控制

```c
#include <stdio.h>
#include <limits.h>
#include <float.h>

int main() {
    // 在这里编写你的代码
    
    return 0;
}
```

<!-- 参考答案开始 -->
<div class="exercise-answer" data-exercise="4" style="display: none;">

<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>
#include <limits.h>
#include <float.h>

int main() {
    printf("=== 数据类型大小检测工具 ===\n\n");
    
    printf("%-20s %-15s %-30s\n", "类型", "大小(字节)", "有符号范围");
    printf("------------------------------------------------------------\n");
    
    // char
    printf("%-20s %-15zu %d 到 %d\n", 
           "char", sizeof(char), CHAR_MIN, CHAR_MAX);
    
    // short
    printf("%-20s %-15zu %d 到 %d\n", 
           "short", sizeof(short), SHRT_MIN, SHRT_MAX);
    
    // int
    printf("%-20s %-15zu %d 到 %d\n", 
           "int", sizeof(int), INT_MIN, INT_MAX);
    
    // long
    printf("%-20s %-15zu %ld 到 %ld\n", 
           "long", sizeof(long), LONG_MIN, LONG_MAX);
    
    // long long
    printf("%-20s %-15zu %lld 到 %lld\n", 
           "long long", sizeof(long long), LLONG_MIN, LLONG_MAX);
    
    // float
    printf("%-20s %-15zu %e 到 %e\n", 
           "float", sizeof(float), FLT_MIN, FLT_MAX);
    
    // double
    printf("%-20s %-15zu %e 到 %e\n", 
           "double", sizeof(double), DBL_MIN, DBL_MAX);
    
    printf("\n");
    
    // 指针类型
    size_t ptr_size = sizeof(void*);
    printf("指针类型大小: %zu 字节", ptr_size);
    if (ptr_size == 4) {
        printf(" (32位系统)\n");
    } else if (ptr_size == 8) {
        printf(" (64位系统)\n");
    } else {
        printf("\n");
    }
    
    return 0;
}
```

</div>
<!-- 参考答案结束 -->

</div>

---

## 本节练习要点

完成这些练习后，你应该能够：

1. ✅ **位标志操作**：掌握文件权限等实际场景中的位操作
2. ✅ **内存布局分析**：理解栈帧、函数调用、内存地址的关系
3. ✅ **十六进制转储**：能够查看和分析内存中的原始数据
4. ✅ **跨平台开发**：理解数据类型大小在不同系统上的差异

这些技能在二进制工程、逆向工程、系统编程中都是基础且重要的。
