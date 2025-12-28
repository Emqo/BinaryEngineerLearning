# 第5章：内存和地址

## 5.1 内存地址初探


### 内存地址基础

```c
#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int c = 30;
    
    printf("=== 变量值和地址 ===\n");
    printf("变量a的值: %d\n", a);
    printf("变量a的地址: %p\n", (void*)&a);
    printf("变量b的值: %d\n", b);
    printf("变量b的地址: %p\n", (void*)&b);
    printf("变量c的值: %d\n", c);
    printf("变量c的地址: %p\n", (void*)&c);
    
    printf("\n=== 内存布局分析 ===\n");
    printf("变量a的大小: %zu 字节\n", sizeof(a));
    printf("变量b的大小: %zu 字节\n", sizeof(b));
    printf("变量c的大小: %zu 字节\n", sizeof(c));
    
    // 计算地址差（注意：地址差可能不是连续的，取决于编译器）
    printf("\n地址差（字节）:\n");
    printf("&b - &a = %ld\n", (long)((char*)&b - (char*)&a));
    printf("&c - &b = %ld\n", (long)((char*)&c - (char*)&b));
    
    return 0;
}
```

### 不同数据类型的地址

```c
#include <stdio.h>

int main() {
    char ch = 'A';
    int num = 42;
    float f = 3.14f;
    double d = 2.718;
    
    printf("=== 不同数据类型的地址 ===\n");
    printf("char ch:  值=%c, 地址=%p, 大小=%zu字节\n", ch, (void*)&ch, sizeof(ch));
    printf("int num:  值=%d, 地址=%p, 大小=%zu字节\n", num, (void*)&num, sizeof(num));
    printf("float f:  值=%.2f, 地址=%p, 大小=%zu字节\n", f, (void*)&f, sizeof(f));
    printf("double d: 值=%.3f, 地址=%p, 大小=%zu字节\n", d, (void*)&d, sizeof(d));
    
    printf("\n=== 地址的十六进制表示 ===\n");
    printf("地址通常用十六进制表示，例如：0x7fff5fbff6ac\n");
    printf("这是因为内存地址很大，十六进制更简洁\n");
    
    return 0;
}
```

### 地址运算符 `&`

`&` 运算符用于获取变量的地址：

```c
#include <stdio.h>

int main() {
    int x = 100;
    
    printf("=== 地址运算符 ===\n");
    printf("变量x的值: %d\n", x);
    printf("变量x的地址: %p\n", (void*)&x);
    printf("&x的类型: 指向int的指针\n");
    
    // 可以通过地址访问值（需要指针，后续会学习）
    // int *ptr = &x;  // ptr存储x的地址
    // printf("通过地址访问的值: %d\n", *ptr);
    
    return 0;
}
```

**重要概念**：
- **值**：变量存储的实际数据（如 `x = 100`）
- **地址**：变量在内存中的位置（如 `&x = 0x7fff5fbff6ac`）
- **指针**：存储地址的变量（后续章节会详细学习）

### 内存布局示例

```c
#include <stdio.h>

int main() {
    // 观察局部变量的内存布局
    int a = 10;
    int b = 20;
    int c = 30;
    
    printf("=== 局部变量内存布局 ===\n");
    printf("变量  值   地址\n");
    printf("---   ---  --------\n");
    printf("a     %-3d  %p\n", a, (void*)&a);
    printf("b     %-3d  %p\n", b, (void*)&b);
    printf("c     %-3d  %p\n", c, (void*)&c);
    
    printf("\n注意：\n");
    printf("1. 每个变量都有唯一的内存地址\n");
    printf("2. 地址通常用十六进制表示\n");
    printf("3. 局部变量通常存储在栈上（地址较大）\n");
    printf("4. 地址的具体值取决于系统和编译器\n");
    
    return 0;
}
```

**内存区域**：
- **栈（Stack）**：存储局部变量，地址通常较大（如 `0x7fff...`）
- **堆（Heap）**：动态分配的内存，后续会学习
- **数据段（Data Segment）**：存储全局变量和静态变量
- **代码段（Code Segment）**：存储程序代码

## 5.2 字节序（Endianness）


### 什么是字节序

当一个数据需要多个字节存储时（如 `int` 类型占4个字节），这些字节在内存中的排列顺序就称为字节序。

例如，整数 `0x12345678`（十六进制）需要4个字节存储：
- 高位字节：`0x12`
- 中高字节：`0x34`
- 中低字节：`0x56`
- 低位字节：`0x78`

### 大端序（Big-Endian）

**大端序**（Big-Endian）：高位字节存储在低地址，低位字节存储在高地址。

```
地址：     低地址 → 高地址
          +----+----+----+----+
内存内容： | 12 | 34 | 56 | 78 |
          +----+----+----+----+
          字节0  字节1  字节2  字节3
```

**特点**：
- 高位在前，低位在后
- 符合人类的阅读习惯（从左到右，高到低）
- 网络传输标准（网络字节序通常是大端序）
- 使用大端序的架构：PowerPC、SPARC、某些ARM

### 小端序（Little-Endian）

**小端序**（Little-Endian）：低位字节存储在低地址，高位字节存储在高地址。

```
地址：     低地址 → 高地址
          +----+----+----+----+
内存内容： | 78 | 56 | 34 | 12 |
          +----+----+----+----+
          字节0  字节1  字节2  字节3
```

**特点**：
- 低位在前，高位在后
- 便于地址计算（地址越低位数字越小）
- x86/x64架构使用小端序
- 大多数现代系统使用小端序

### 检测系统的字节序

```c
#include <stdio.h>

// 注意：函数定义和指针会在后续章节学习，这里先了解字节序的概念

void demonstrate_endianness() {
    unsigned int num = 0x12345678;
    unsigned char *bytes = (unsigned char *)&num;
    
    printf("=== 字节序演示 ===\n");
    printf("整数 0x%x 在内存中的存储:\n\n", num);
    
    printf("地址（十六进制）  字节值（十六进制）  字节值（十进制）\n");
    printf("------------------------------------------------------\n");
    for (int i = 0; i < 4; i++) {
        printf("%p           0x%02x              %3u\n", 
               (void*)(bytes + i), bytes[i], bytes[i]);
    }
    
    printf("\n字节顺序: ");
    for (int i = 0; i < 4; i++) {
        printf("0x%02x ", bytes[i]);
    }
    printf("\n\n");
    
    if (is_little_endian()) {
        printf("系统使用: 小端序（Little-Endian）\n");
        printf("低位字节(0x78)在低地址，符合小端序特征\n");
    } else {
        printf("系统使用: 大端序（Big-Endian）\n");
        printf("高位字节(0x12)在低地址，符合大端序特征\n");
    }
}

int main() {
    demonstrate_endianness();
    
    printf("\n=== 字节序的重要性 ===\n");
    printf("1. 网络编程：不同系统之间传输数据需要统一字节序\n");
    printf("2. 文件格式：解析二进制文件格式需要知道字节序\n");
    printf("3. 逆向工程：理解内存中的数据布局\n");
    printf("4. 跨平台开发：不同架构可能有不同的字节序\n");
    
    return 0;
}
```

### 字节序转换

在网络编程中，需要统一使用网络字节序（大端序）：

```c
#include <stdio.h>
#include <stdint.h>

// 手动实现字节序转换（不依赖系统函数）

// 16位字节序转换
uint16_t htons_manual(uint16_t hostshort) {
    return ((hostshort & 0xFF00) >> 8) | ((hostshort & 0x00FF) << 8);
}

// 32位字节序转换
uint32_t htonl_manual(uint32_t hostlong) {
    return ((hostlong & 0xFF000000) >> 24) |
           ((hostlong & 0x00FF0000) >> 8)  |
           ((hostlong & 0x0000FF00) << 8)  |
           ((hostlong & 0x000000FF) << 24);
}

void demonstrate_byte_swap() {
    uint16_t num16 = 0x1234;
    uint32_t num32 = 0x12345678;
    
    printf("=== 字节序转换示例 ===\n\n");
    
    printf("原始16位值: 0x%04x\n", num16);
    printf("转换后:     0x%04x\n", htons_manual(num16));
    printf("\n");
    
    printf("原始32位值: 0x%08x\n", num32);
    printf("转换后:     0x%08x\n", htonl_manual(num32));
    printf("\n");
    
    printf("说明：转换函数交换了字节顺序\n");
}

int main() {
    demonstrate_byte_swap();
    return 0;
}
```

**标准库函数**（需要包含 `<arpa/inet.h>` 或 `<winsock2.h>`）：
- `htons()`：主机序转网络序（16位）
- `htonl()`：主机序转网络序（32位）
- `ntohs()`：网络序转主机序（16位）
- `ntohl()`：网络序转主机序（32位）

### 字节序的实际应用

```c
#include <stdio.h>
#include <stdint.h>

// 解析网络数据包中的整数（假设是大端序）
uint32_t parse_network_int(const unsigned char *data) {
    return ((uint32_t)data[0] << 24) |
           ((uint32_t)data[1] << 16) |
           ((uint32_t)data[2] << 8)  |
           ((uint32_t)data[3]);
}

void demonstrate_parsing() {
    // 模拟从网络接收的数据（大端序）
    unsigned char network_data[] = {0x12, 0x34, 0x56, 0x78};
    
    printf("=== 解析网络数据 ===\n");
    printf("接收到的字节序列: ");
    for (int i = 0; i < 4; i++) {
        printf("0x%02x ", network_data[i]);
    }
    printf("\n");
    
    uint32_t value = parse_network_int(network_data);
    printf("解析后的整数值: 0x%08x (%u)\n", value, value);
    printf("\n注意：如果系统是小端序，需要转换字节序\n");
}

int main() {
    demonstrate_parsing();
    return 0;
}
```

### 字节序总结

**关键要点**：
1. **小端序**：x86/x64、ARM（大多数）、x86-64
2. **大端序**：PowerPC、SPARC、某些ARM
3. **网络字节序**：统一使用大端序
4. **文件格式**：需要查看格式规范来确定字节序

**对二进制工程师的意义**：
- 在调试器中查看内存时，需要理解字节序
- 解析二进制文件格式时，必须考虑字节序
- 编写跨平台代码时，需要考虑字节序差异
- 网络编程中，必须进行字节序转换

## 5.3 栈和内存布局详解


### 什么是栈

栈是一种**后进先出**（LIFO, Last In First Out）的数据结构，就像一摞盘子，你只能从顶部取放。在计算机中，栈用于：

1. **存储局部变量**：函数内部声明的变量
2. **函数调用**：保存返回地址、参数、局部变量
3. **临时数据**：表达式计算过程中的中间结果

### 栈的特点

```c
#include <stdio.h>

void demonstrate_stack() {
    int local_var = 100;  // 局部变量存储在栈上
    printf("局部变量地址: %p\n", (void*)&local_var);
    printf("局部变量值: %d\n", local_var);
}

int main() {
    printf("=== 栈的特点 ===\n");
    printf("1. 自动管理：变量进入作用域时分配，离开时自动释放\n");
    printf("2. 后进先出：最后创建的变量最先被销毁\n");
    printf("3. 地址递减：栈向低地址方向增长（向下增长）\n");
    printf("4. 速度快：分配和释放都是简单的指针移动\n\n");
    
    demonstrate_stack();
    
    return 0;
}
```

**栈的关键特性**：
- **自动管理**：不需要手动分配和释放内存
- **速度快**：只是移动栈指针，非常高效
- **大小有限**：通常只有几MB（如8MB），容易溢出
- **局部性**：局部变量在函数返回后自动失效

### 栈的内存布局

让我们通过观察变量地址来理解栈的布局：

```c
#include <stdio.h>

int main() {
    // 观察局部变量的地址顺序
    int a = 10;
    int b = 20;
    int c = 30;
    
    printf("=== 栈的内存布局 ===\n");
    printf("变量  值   地址（十六进制）\n");
    printf("---   ---  --------------\n");
    printf("a     %-3d  %p\n", a, (void*)&a);
    printf("b     %-3d  %p\n", b, (void*)&b);
    printf("c     %-3d  %p\n", c, (void*)&c);
    
    printf("\n=== 地址分析 ===\n");
    // 计算地址差（注意：地址是递减的）
    long addr_diff1 = (long)((char*)&b - (char*)&a);
    long addr_diff2 = (long)((char*)&c - (char*)&b);
    
    printf("&b - &a = %ld 字节\n", addr_diff1);
    printf("&c - &b = %ld 字节\n", addr_diff2);
    printf("\n注意：栈向低地址方向增长（地址递减）\n");
    printf("后声明的变量地址更小\n");
    
    return 0;
}
```

**栈的增长方向**：
- 在大多数系统中，栈向**低地址方向**增长
- 后声明的变量地址通常更小
- 但这取决于编译器和系统架构

### 栈帧（Stack Frame）

每次函数调用时，系统会在栈上创建一个**栈帧**（Stack Frame），用于存储：

1. **返回地址**：函数执行完后返回到哪里
2. **函数参数**：传递给函数的参数
3. **局部变量**：函数内部声明的变量
4. **保存的寄存器**：调用前保存的寄存器值

```c
#include <stdio.h>

void function_a(int param1, int param2) {
    int local1 = 100;
    int local2 = 200;
    
    printf("=== 函数function_a的栈帧 ===\n");
    printf("参数1地址: %p (值: %d)\n", (void*)&param1, param1);
    printf("参数2地址: %p (值: %d)\n", (void*)&param2, param2);
    printf("局部变量1地址: %p (值: %d)\n", (void*)&local1, local1);
    printf("局部变量2地址: %p (值: %d)\n", (void*)&local2, local2);
    printf("\n注意：参数和局部变量都在栈帧中\n");
}

int main() {
    int main_var = 50;
    printf("=== main函数的栈帧 ===\n");
    printf("main局部变量地址: %p (值: %d)\n", (void*)&main_var, main_var);
    printf("\n");
    
    function_a(10, 20);
    
    return 0;
}
```

**栈帧的生命周期**：
1. 函数调用时：创建新的栈帧
2. 函数执行时：在栈帧中操作局部变量
3. 函数返回时：销毁栈帧，释放所有局部变量

### 函数调用时的栈操作

让我们通过递归函数观察栈的变化：

```c
#include <stdio.h>

void recursive_function(int depth, int max_depth) {
    int local_var = depth * 10;  // 每次调用都有独立的局部变量
    
    printf("深度 %d: 局部变量地址 = %p, 值 = %d\n", 
           depth, (void*)&local_var, local_var);
    
    if (depth < max_depth) {
        recursive_function(depth + 1, max_depth);
    }
    
    printf("深度 %d: 返回前，局部变量值 = %d\n", depth, local_var);
}

int main() {
    printf("=== 递归调用时的栈操作 ===\n");
    printf("每次递归调用都会创建新的栈帧\n");
    printf("每个栈帧中的局部变量是独立的\n\n");
    
    recursive_function(1, 3);
    
    printf("\n=== 栈帧销毁顺序 ===\n");
    printf("函数返回时，栈帧按相反顺序销毁（后进先出）\n");
    
    return 0;
}
```

**观察要点**：
- 每次递归调用，局部变量的地址都不同（新的栈帧）
- 函数返回时，栈帧按相反顺序销毁
- 这就是"后进先出"的体现

### 栈溢出（Stack Overflow）

栈的大小是有限的，如果使用过多栈空间，会导致**栈溢出**：

```c
#include <stdio.h>

void cause_stack_overflow(int depth) {
    char large_array[1024];  // 在栈上分配1KB空间
    printf("深度 %d: 栈上分配了1KB，当前深度 = %d\n", depth, depth);
    
    // 递归调用，每次消耗1KB栈空间
    cause_stack_overflow(depth + 1);
}

int main() {
    printf("=== 栈溢出演示 ===\n");
    printf("警告：这个程序会导致栈溢出！\n");
    printf("栈空间有限（通常8MB），递归太深会溢出\n\n");
    
    // 取消注释下面的代码会导致栈溢出
    // cause_stack_overflow(1);
    
    printf("栈溢出会导致程序崩溃（Segmentation Fault）\n");
    printf("解决方法：\n");
    printf("1. 减少局部变量的大小\n");
    printf("2. 减少递归深度\n");
    printf("3. 使用堆内存（malloc）代替大数组\n");
    
    return 0;
}
```

**栈溢出的常见原因**：
1. **无限递归**：递归函数没有终止条件
2. **过深的递归**：递归深度超过栈容量
3. **大局部数组**：在栈上分配过大的数组
4. **函数调用链过长**：函数A调用B，B调用C...链太长

### 完整的内存布局

一个C程序的内存通常分为以下几个区域：

```c
#include <stdio.h>

// 全局变量：存储在数据段（Data Segment）
int global_var = 100;
static int static_var = 200;  // 静态变量也在数据段

void demonstrate_memory_layout() {
    // 局部变量：存储在栈（Stack）
    int stack_var = 300;
    
    printf("=== 完整的内存布局 ===\n\n");
    
    printf("【代码段（Code/Text Segment）】\n");
    printf("  存储：程序代码（机器指令）\n");
    printf("  特点：只读，程序执行时不会改变\n");
    printf("  地址示例：0x400000（低地址）\n\n");
    
    printf("【数据段（Data Segment）】\n");
    printf("  存储：全局变量、静态变量\n");
    printf("  特点：程序启动时分配，程序结束时释放\n");
    printf("  全局变量地址: %p\n", (void*)&global_var);
    printf("  静态变量地址: %p\n", (void*)&static_var);
    printf("  地址示例：0x600000（中等地址）\n\n");
    
    printf("【堆（Heap）】\n");
    printf("  存储：动态分配的内存（malloc/free）\n");
    printf("  特点：手动管理，向高地址增长\n");
    printf("  地址示例：0x700000（中等地址）\n\n");
    
    printf("【栈（Stack）】\n");
    printf("  存储：局部变量、函数参数、返回地址\n");
    printf("  特点：自动管理，向低地址增长\n");
    printf("  局部变量地址: %p\n", (void*)&stack_var);
    printf("  地址示例：0x7fff0000（高地址）\n\n");
    
    printf("=== 内存地址范围（典型64位系统）===\n");
    printf("代码段:   0x400000 - 0x500000  (低地址)\n");
    printf("数据段:   0x600000 - 0x700000\n");
    printf("堆:       0x700000 - 向上增长\n");
    printf("栈:       0x7fff0000 - 向下增长 (高地址)\n");
}

int main() {
    demonstrate_memory_layout();
    return 0;
}
```

**内存布局总结**：

```
高地址 (0x7fff...)
    ↓
  ┌─────────────┐
  │    栈       │ ← 向下增长（局部变量、函数调用）
  │   (Stack)   │
  ├─────────────┤
  │             │
  │   (空闲)    │
  │             │
  ├─────────────┤
  │    堆       │ ← 向上增长（动态分配）
  │   (Heap)    │
  ├─────────────┤
  │   数据段    │ （全局变量、静态变量）
  │   (Data)    │
  ├─────────────┤
  │   代码段    │ （程序代码）
  │   (Code)    │
  └─────────────┘
低地址 (0x400000)
```

### 栈 vs 堆

理解栈和堆的区别非常重要：

```c
#include <stdio.h>
#include <stdlib.h>

void compare_stack_and_heap() {
    printf("=== 栈 vs 堆 ===\n\n");
    
    // 栈分配：自动管理
    int stack_var = 100;
    printf("【栈分配】\n");
    printf("  变量: int stack_var = 100;\n");
    printf("  地址: %p\n", (void*)&stack_var);
    printf("  特点：\n");
    printf("    - 自动分配和释放\n");
    printf("    - 速度快（只是移动指针）\n");
    printf("    - 大小有限（通常8MB）\n");
    printf("    - 函数返回后自动失效\n\n");
    
    // 堆分配：手动管理
    int *heap_var = (int*)malloc(sizeof(int));
    *heap_var = 200;
    printf("【堆分配】\n");
    printf("  变量: int *heap_var = malloc(...);\n");
    printf("  地址: %p\n", (void*)heap_var);
    printf("  特点：\n");
    printf("    - 手动分配（malloc）和释放（free）\n");
    printf("    - 速度较慢（需要系统调用）\n");
    printf("    - 大小灵活（受系统内存限制）\n");
    printf("    - 需要手动释放，否则内存泄漏\n\n");
    
    // 必须释放堆内存
    free(heap_var);
    printf("已释放堆内存\n");
}

int main() {
    compare_stack_and_heap();
    return 0;
}
```

**栈和堆的对比**：

| 特性 | 栈（Stack） | 堆（Heap） |
|------|------------|-----------|
| **管理方式** | 自动（编译器） | 手动（程序员） |
| **分配速度** | 快（移动指针） | 慢（系统调用） |
| **大小限制** | 小（通常8MB） | 大（受系统内存限制） |
| **生命周期** | 函数作用域内 | 直到free() |
| **内存碎片** | 无 | 可能有 |
| **使用场景** | 局部变量、函数参数 | 动态数据结构、大数组 |

### 实际应用：观察栈帧

让我们创建一个更复杂的例子来观察栈帧：

```c
#include <stdio.h>

void function_b(int x, int y) {
    int local_b1 = x + y;
    int local_b2 = x * y;
    
    printf("【function_b的栈帧】\n");
    printf("  参数x地址: %p, 值: %d\n", (void*)&x, x);
    printf("  参数y地址: %p, 值: %d\n", (void*)&y, y);
    printf("  局部变量1地址: %p, 值: %d\n", (void*)&local_b1, local_b1);
    printf("  局部变量2地址: %p, 值: %d\n", (void*)&local_b2, local_b2);
    printf("  注意：参数和局部变量在栈帧中相邻存储\n\n");
}

void function_a(int param) {
    int local_a = param * 2;
    
    printf("【function_a的栈帧】\n");
    printf("  参数地址: %p, 值: %d\n", (void*)&param, param);
    printf("  局部变量地址: %p, 值: %d\n", (void*)&local_a, local_a);
    printf("\n");
    
    function_b(10, 20);  // 调用function_b，创建新的栈帧
    
    printf("【function_a返回前】\n");
    printf("  局部变量仍然有效: %d\n", local_a);
}

int main() {
    int main_var = 5;
    
    printf("=== 函数调用链的栈帧 ===\n");
    printf("main → function_a → function_b\n\n");
    
    printf("【main的栈帧】\n");
    printf("  局部变量地址: %p, 值: %d\n", (void*)&main_var, main_var);
    printf("\n");
    
    function_a(100);
    
    printf("【main返回前】\n");
    printf("  所有栈帧都已销毁，main的变量仍然有效\n");
    
    return 0;
}
```

**关键观察**：
- 每个函数调用创建独立的栈帧
- 栈帧按调用顺序创建，按相反顺序销毁
- 函数返回后，其栈帧中的局部变量失效

### 栈在二进制工程中的重要性

对于二进制工程师，理解栈至关重要：

1. **逆向工程**：分析栈布局可以理解函数调用关系
2. **漏洞利用**：栈溢出是常见的安全漏洞
3. **调试**：查看栈帧可以追踪程序执行流程
4. **性能优化**：理解栈有助于优化函数调用

```c
#include <stdio.h>

void demonstrate_stack_for_reverse_engineering() {
    int local1 = 0x41414141;  // "AAAA"的十六进制
    int local2 = 0x42424242;  // "BBBB"的十六进制
    char buffer[16];
    
    printf("=== 栈在逆向工程中的应用 ===\n");
    printf("局部变量在栈上的布局：\n");
    printf("  local1地址: %p, 值: 0x%x\n", (void*)&local1, local1);
    printf("  local2地址: %p, 值: 0x%x\n", (void*)&local2, local2);
    printf("  buffer地址: %p\n", (void*)buffer);
    printf("\n");
    printf("在调试器中，可以：\n");
    printf("1. 查看栈帧内容\n");
    printf("2. 分析函数参数\n");
    printf("3. 追踪局部变量\n");
    printf("4. 理解程序执行流程\n");
}

int main() {
    demonstrate_stack_for_reverse_engineering();
    return 0;
}
```


---

## 5.4 练习题

### 题目1 [简单]

<div class="exercise-card">

**题目描述**：使用地址运算符 `&` 打印不同变量的内存地址，观察它们的内存布局。

**要求**：
1. 声明不同类型的变量（`int`, `char`, `float`）
2. 使用 `&` 运算符获取每个变量的地址
3. 使用 `%p` 格式说明符打印地址

```c
#include <stdio.h>

int main() {
    int a = 10;
    char b = 'A';
    float c = 3.14f;
    
    // 在这里打印各个变量的地址
    
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
    int a = 10;
    char b = 'A';
    float c = 3.14f;
    
    printf("变量 a 的值: %d, 地址: %p\n", a, (void*)&a);
    printf("变量 b 的值: %c, 地址: %p\n", b, (void*)&b);
    printf("变量 c 的值: %.2f, 地址: %p\n", c, (void*)&c);
    
    // 观察地址的差异，理解内存布局
    printf("\n地址差值（以字节为单位）:\n");
    printf("&a 和 &b 的差值: %ld 字节\n", (char*)&b - (char*)&a);
    printf("&b 和 &c 的差值: %ld 字节\n", (char*)&c - (char*)&b);
    
    return 0;
}
```
</div>

---

### 题目2 [中等]

<div class="exercise-card">

**题目描述**：编写程序检测当前系统是大端序（Big-Endian）还是小端序（Little-Endian）。

**要求**：
1. 使用联合体（union）或指针的方式检测字节序
2. 打印每个字节的值
3. 根据结果判断是大端序还是小端序

```c
#include <stdio.h>

int main() {
    int num = 0x12345678;
    unsigned char *p = (unsigned char *)&num;
    
    printf("数字 0x%X 在内存中的存储（按字节）:\n", num);
    
    // 在这里打印每个字节的值
    // 并判断是大端序还是小端序
    
    return 0;
}
```

**提示**：
- 如果最低有效字节（0x78）存储在低地址，则是小端序
- 如果最高有效字节（0x12）存储在低地址，则是大端序

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

int main() {
    int num = 0x12345678;
    unsigned char *p = (unsigned char *)&num;
    
    printf("数字 0x%X 在内存中的存储（按字节）:\n", num);
    printf("地址从低到高:\n");
    
    for (int i = 0; i < sizeof(int); i++) {
        printf("  地址 %p: 0x%02X\n", (void*)(p + i), p[i]);
    }
    
    // 判断字节序
    if (p[0] == 0x78) {
        printf("\n这是小端序（Little-Endian）系统\n");
        printf("最低有效字节（0x78）存储在最低地址\n");
    } else if (p[0] == 0x12) {
        printf("\n这是大端序（Big-Endian）系统\n");
        printf("最高有效字节（0x12）存储在最低地址\n");
    }
    
    return 0;
}
```
</div>

---

### 题目3 [中等]

<div class="exercise-card">

**题目描述**：编写程序，演示局部变量和全局变量的内存地址位置，理解栈和全局数据区的概念。

**要求**：
1. 声明一个全局变量
2. 在函数中声明局部变量
3. 比较它们的地址，观察地址范围
4. 理解栈从高地址向低地址增长

```c
#include <stdio.h>

// 全局变量
int global_var = 100;

void test_function() {
    // 局部变量
    int local_var = 200;
    
    printf("函数内的局部变量 local_var 地址: %p\n", (void*)&local_var);
}

int main() {
    int main_local = 300;
    
    printf("全局变量 global_var 地址: %p\n", (void*)&global_var);
    printf("main函数中的局部变量 main_local 地址: %p\n", (void*)&main_local);
    
    // 调用函数
    test_function();
    
    return 0;
}
```

**提示**：通常全局变量的地址较小（在全局数据区），局部变量的地址较大（在栈区）。

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

// 全局变量
int global_var = 100;

void test_function() {
    // 局部变量
    int local_var = 200;
    
    printf("函数内的局部变量 local_var 地址: %p\n", (void*)&local_var);
}

int main() {
    int main_local = 300;
    
    printf("全局变量 global_var 地址: %p\n", (void*)&global_var);
    printf("main函数中的局部变量 main_local 地址: %p\n", (void*)&main_local);
    
    // 调用函数
    test_function();
    
    printf("\n观察：\n");
    printf("- 全局变量地址通常较小（在全局数据区）\n");
    printf("- 局部变量地址通常较大（在栈区）\n");
    printf("- 栈从高地址向低地址增长\n");
    
    return 0;
}
```
</div>

---

### 题目4 [困难]

<div class="exercise-card">

**题目描述**：编写程序，使用指针访问和修改变量的值，演示指针的基本操作。

**要求**：
1. 声明一个变量和一个指向它的指针
2. 使用指针读取变量的值
3. 使用指针修改变量的值
4. 打印指针本身的地址和它指向的地址

```c
#include <stdio.h>

int main() {
    int num = 42;
    
    // 声明一个指向num的指针
    // 在这里声明指针
    
    // 打印变量的值和地址
    printf("变量 num 的值: %d\n", num);
    printf("变量 num 的地址: %p\n", (void*)&num);
    
    // 打印指针的信息
    // 在这里打印指针的地址和指针指向的值
    
    // 通过指针修改变量的值
    // 在这里通过指针修改num的值
    
    // 再次打印变量的值
    printf("通过指针修改后，num 的值: %d\n", num);
    
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
    int num = 42;
    
    // 声明一个指向num的指针
    int *ptr = &num;
    
    // 打印变量的值和地址
    printf("变量 num 的值: %d\n", num);
    printf("变量 num 的地址: %p\n", (void*)&num);
    
    // 打印指针的信息
    printf("\n指针 ptr 的信息:\n");
    printf("指针本身的地址: %p\n", (void*)&ptr);
    printf("指针指向的地址: %p\n", (void*)ptr);
    printf("指针指向的值: %d\n", *ptr);
    
    // 通过指针修改变量的值
    *ptr = 100;
    
    // 再次打印变量的值
    printf("\n通过指针修改后，num 的值: %d\n", num);
    printf("通过指针读取，*ptr 的值: %d\n", *ptr);
    
    return 0;
}
```
</div>

---

### 题目5 [困难]

<div class="exercise-card">

**题目描述**：编写一个函数，实现大端序和小端序之间的转换。将一个整数从当前系统的字节序转换为相反的字节序。

**要求**：
1. 编写一个函数实现字节序转换
2. 使用位运算和字节操作
3. 测试转换的正确性

```c
#include <stdio.h>

// 字节序转换函数
unsigned int swap_endian(unsigned int value) {
    // 在这里实现字节序转换
    // 提示：可以使用位移和按位或运算
    
}

int main() {
    unsigned int num = 0x12345678;
    
    printf("原始值: 0x%08X\n", num);
    
    unsigned int swapped = swap_endian(num);
    printf("转换后: 0x%08X\n", swapped);
    
    // 验证：再次转换应该恢复原值
    unsigned int restored = swap_endian(swapped);
    printf("再次转换: 0x%08X (应该和原始值相同)\n", restored);
    
    return 0;
}
```

**提示**：
- 0x12345678 在小端序系统中存储为：78 56 34 12
- 转换为大端序后应该是：12 34 56 78（即0x78563412）

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

// 字节序转换函数
unsigned int swap_endian(unsigned int value) {
    return ((value & 0x000000FF) << 24) |    // 将最低字节移到最高位
           ((value & 0x0000FF00) << 8) |     // 将第二字节移到第三位
           ((value & 0x00FF0000) >> 8) |     // 将第三字节移到第二位
           ((value & 0xFF000000) >> 24);     // 将最高字节移到最低位
}

int main() {
    unsigned int num = 0x12345678;
    
    printf("原始值: 0x%08X\n", num);
    
    unsigned int swapped = swap_endian(num);
    printf("转换后: 0x%08X\n", swapped);
    
    // 验证：再次转换应该恢复原值
    unsigned int restored = swap_endian(swapped);
    printf("再次转换: 0x%08X (应该和原始值相同)\n", restored);
    
    if (restored == num) {
        printf("\n✓ 转换正确！\n");
    }
    
    return 0;
}
```
</div>