# 第2章：数据类型和变量

## 2.1 数据类型

C语言提供了多种基本数据类型，理解这些类型对二进制工程师至关重要。每种数据类型在内存中占用的空间不同，这直接影响程序的性能和内存使用。

### 整数类型

整数类型用于存储整数值，分为**有符号**（signed）和**无符号**（unsigned）两种：

| 类型 | 大小（字节） | 有符号范围 | 无符号范围 |
|------|-------------|-----------|-----------|
| `char` | 1 | -128 到 127 | 0 到 255 |
| `short` | 2 | -32,768 到 32,767 | 0 到 65,535 |
| `int` | 4 | -2,147,483,648 到 2,147,483,647 | 0 到 4,294,967,295 |
| `long` | 4或8 | 取决于系统 | 取决于系统 |
| `long long` | 8 | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 | 0 到 18,446,744,073,709,551,615 |

**重要提示**：
- `char` 在C语言中实际上是整数类型，可以存储字符的ASCII码
- `long` 的大小取决于系统：32位系统通常是4字节，64位系统通常是8字节
- 使用 `unsigned` 关键字可以声明无符号类型，范围从0开始

### 整数类型示例

```c
#include <stdio.h>
#include <limits.h>

int main() {
    // 有符号整数
    int age = 25;
    short year = 2024;
    long population = 8000000000L;  // L后缀表示long类型
    long long big_number = 9223372036854775807LL;  // LL后缀表示long long
    
    // 无符号整数
    unsigned int count = 100;
    unsigned char byte_value = 255;  // 最大值
    
    // 打印类型大小
    printf("=== 数据类型大小 ===\n");
    printf("char: %zu 字节\n", sizeof(char));
    printf("short: %zu 字节\n", sizeof(short));
    printf("int: %zu 字节\n", sizeof(int));
    printf("long: %zu 字节\n", sizeof(long));
    printf("long long: %zu 字节\n", sizeof(long long));
    
    // 打印取值范围
    printf("\n=== int类型范围 ===\n");
    printf("INT_MAX: %d\n", INT_MAX);
    printf("INT_MIN: %d\n", INT_MIN);
    printf("UINT_MAX: %u\n", UINT_MAX);
    
    // 溢出示例
    printf("\n=== 溢出示例 ===\n");
    unsigned char u = 255;
    printf("u = %u\n", u);
    u = u + 1;  // 溢出，回到0
    printf("u + 1 = %u (溢出)\n", u);
    
    return 0;
}
```

### 浮点类型

浮点类型用于存储小数：

| 类型 | 大小（字节） | 精度 | 范围 |
|------|-------------|------|------|
| `float` | 4 | 约7位有效数字 | ±3.4×10³⁸ |
| `double` | 8 | 约15位有效数字 | ±1.7×10³⁰⁸ |
| `long double` | 10或16 | 更高精度 | 取决于系统 |

**浮点数表示**：
- 使用IEEE 754标准
- 由符号位、指数位、尾数位组成
- 可能存在精度误差（如 0.1 + 0.2 ≠ 0.3）

```c
#include <stdio.h>
#include <float.h>

int main() {
    float pi = 3.14159f;      // f后缀表示float类型
    double e = 2.71828;       // 默认是double类型
    long double ld = 3.141592653589793238L;  // L后缀表示long double
    
    printf("=== 浮点类型 ===\n");
    printf("float大小: %zu 字节\n", sizeof(float));
    printf("double大小: %zu 字节\n", sizeof(double));
    printf("long double大小: %zu 字节\n", sizeof(long double));
    
    printf("\n=== 浮点数范围 ===\n");
    printf("FLT_MAX: %e\n", FLT_MAX);
    printf("FLT_MIN: %e\n", FLT_MIN);
    printf("DBL_MAX: %e\n", DBL_MAX);
    
    // 精度问题示例
    printf("\n=== 精度问题 ===\n");
    float a = 0.1f;
    float b = 0.2f;
    float c = a + b;
    printf("0.1 + 0.2 = %.10f\n", c);  // 可能不是0.3
    
    return 0;
}
```

### 字符类型

`char` 类型用于存储单个字符：

```c
#include <stdio.h>

int main() {
    // 字符字面量
    char ch1 = 'A';           // 字符'A'
    char ch2 = 65;            // ASCII码65也是'A'
    char ch3 = '\n';          // 换行符
    char ch4 = '\x41';        // 十六进制ASCII码，也是'A'
    
    printf("=== 字符类型 ===\n");
    printf("ch1 = %c (ASCII: %d)\n", ch1, ch1);
    printf("ch2 = %c (ASCII: %d)\n", ch2, ch2);
    printf("ch3 = %c (ASCII: %d)\n", ch3, ch3);
    printf("ch4 = %c (ASCII: %d)\n", ch4, ch4);
    
    // 字符运算
    char letter = 'A';
    printf("\n=== 字符运算 ===\n");
    printf("'A' + 1 = %c\n", letter + 1);  // 'B'
    printf("'Z' - 'A' = %d\n", 'Z' - 'A');  // 25
    
    return 0;
}
```

### 布尔类型

C99标准引入了 `_Bool` 类型，也可以使用 `<stdbool.h>` 中的 `bool`：

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    bool is_true = true;
    bool is_false = false;
    
    printf("true = %d\n", is_true);    // 1
    printf("false = %d\n", is_false);  // 0
    
    // 在C语言中，0表示假，非0表示真
    // 注意：if语句会在后续章节学习，这里先了解布尔值的概念
    printf("\n布尔值的应用：\n");
    printf("在C语言中，任何非0值都表示真，0表示假\n");
    
    return 0;
}
```

### sizeof运算符

`sizeof` 是编译时运算符，返回类型或变量占用的字节数：

```c
#include <stdio.h>

int main() {
    int x = 10;
    
    // sizeof可以作用于类型
    printf("sizeof(int) = %zu\n", sizeof(int));
    printf("sizeof(char) = %zu\n", sizeof(char));
    
    // sizeof可以作用于变量
    printf("sizeof(x) = %zu\n", sizeof(x));
    
    // sizeof可以作用于表达式
    printf("sizeof(x + 5) = %zu\n", sizeof(x + 5));
    
    // 注意：sizeof返回size_t类型，使用%zu格式化
    return 0;
}
```

**重要提示**：`sizeof` 运算符对理解内存布局非常重要！在后续学习指针和数组时，你会经常用到它。

## 2.2 变量和常量

### 变量声明和初始化

变量是程序中可以改变的数据存储位置：

```c
#include <stdio.h>

int main() {
    // 方式1：先声明，后初始化
    int count;
    float price;
    char symbol;
    
    count = 10;
    price = 99.99f;
    symbol = '$';
    
    // 方式2：声明时初始化
    int total = 100;
    double rate = 0.05;
    
    // 方式3：同时声明多个变量
    int a = 1, b = 2, c = 3;
    
    // 方式4：部分初始化
    int x, y = 10, z;  // 只有y被初始化
    
    printf("count = %d\n", count);
    printf("price = %.2f\n", price);
    printf("symbol = %c\n", symbol);
    
    // 未初始化的变量包含垃圾值
    int uninitialized;
    printf("uninitialized = %d (垃圾值)\n", uninitialized);
    
    return 0;
}
```

**变量命名规则**：
- 只能包含字母、数字和下划线
- 必须以字母或下划线开头
- 区分大小写（`age` 和 `Age` 是不同的变量）
- 不能使用C语言关键字（如 `int`、`if`、`return` 等）
- 建议使用有意义的名称

**变量作用域**（先了解基本概念，详细内容会在后续章节学习）：
- 局部变量：在函数内部声明的变量，只在函数内有效
- 全局变量：在函数外部声明的变量，整个程序都可以访问（后续会详细学习）

### 常量

常量是程序中不能改变的值，有两种定义方式：

#### 1. 使用 `const` 关键字

```c
#include <stdio.h>

int main() {
    const int MIN_AGE = 18;        // const常量
    const float GRAVITY = 9.8f;
    const char NEWLINE = '\n';
    
    printf("MIN_AGE = %d\n", MIN_AGE);
    printf("GRAVITY = %.1f\n", GRAVITY);
    
    // MIN_AGE = 20;  // 错误！常量不能修改
    
    return 0;
}
```

**特点**：
- 有类型检查
- 占用内存空间
- 更安全，推荐使用

### 字面量

字面量是直接写在代码中的值：

```c
#include <stdio.h>

int main() {
    // 整数字面量
    int decimal = 42;           // 十进制
    int octal = 052;            // 八进制（以0开头）
    int hexadecimal = 0x2A;     // 十六进制（以0x开头）
    int binary = 0b101010;      // 二进制（C23标准，部分编译器支持）
    
    // 浮点数字面量
    float f1 = 3.14f;           // float类型（f后缀）
    double d1 = 3.14;           // double类型（默认）
    double d2 = 3.14e2;         // 科学计数法：314.0
    
    // 字符字面量
    char c1 = 'A';              // 单个字符
    char c2 = '\n';             // 转义字符
    
    // 字符串字面量
    // 注意：字符串的详细学习会在后续章节
    char str[] = "Hello";       // 字符串
    
    printf("decimal = %d\n", decimal);
    printf("octal = %o (十进制: %d)\n", octal, octal);
    printf("hexadecimal = %x (十进制: %d)\n", hexadecimal, hexadecimal);
    
    return 0;
}
```

## 2.3 类型转换


C语言中，不同类型的数据可以相互转换：

### 隐式类型转换

编译器自动进行的类型转换：

```c
#include <stdio.h>

int main() {
    printf("=== 隐式类型转换 ===\n");
    
    // 整数提升：char和short自动转换为int
    char ch = 'A';
    int result = ch + 10;  // char自动转换为int
    printf("char 'A' + 10 = %d\n", result);
    
    // 算术转换：不同类型运算时，低精度转换为高精度
    int a = 10;
    float b = 3.5f;
    float result2 = a + b;  // int自动转换为float
    printf("int 10 + float 3.5 = %.1f\n", result2);
    
    // 赋值转换：右边类型转换为左边类型
    int x = 3.14;  // float转换为int，丢失小数部分
    printf("int x = 3.14; x = %d (小数部分丢失)\n", x);
    
    return 0;
}
```

### 显式类型转换（强制转换）

使用 `(类型)` 进行强制转换：

```c
#include <stdio.h>

int main() {
    printf("=== 显式类型转换 ===\n");
    
    int a = 10, b = 3;
    float result = (float)a / b;  // 强制转换为float，进行浮点除法
    printf("(float)%d / %d = %.2f\n", a, b, result);
    
    float pi = 3.14159f;
    int int_pi = (int)pi;  // 强制转换为int，截断小数
    printf("(int)%.5f = %d\n", pi, int_pi);
    
    // 字符和整数转换
    char ch = 'A';
    printf("'A'的ASCII码: %d\n", (int)ch);
    printf("ASCII码65对应的字符: %c\n", (char)65);
    
    return 0;
}
```

**类型转换规则**：
1. 低精度 → 高精度：自动转换（如 `int` → `float`）
2. 高精度 → 低精度：需要强制转换，可能丢失数据
3. 有符号 ↔ 无符号：需要注意符号扩展

---

## 2.4 练习题

### 题目1 [简单]

<div class="exercise-card">

**题目描述**：声明并初始化不同类型的变量，然后使用 `sizeof` 运算符打印它们的大小。

**要求**：
1. 声明 `char`、`int`、`float`、`double` 类型的变量
2. 使用 `sizeof` 打印每种类型的大小
3. 使用 `%zu` 格式化输出（`size_t` 类型）

```c
#include <stdio.h>

int main() {
    // 在这里声明变量
    
    // 在这里打印各种类型的大小
    
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
    char c = 'A';
    int i = 100;
    float f = 3.14f;
    double d = 2.71828;
    
    printf("sizeof(char) = %zu 字节\n", sizeof(char));
    printf("sizeof(int) = %zu 字节\n", sizeof(int));
    printf("sizeof(float) = %zu 字节\n", sizeof(float));
    printf("sizeof(double) = %zu 字节\n", sizeof(double));
    
    return 0;
}
```
</div>

---

### 题目2 [简单]

<div class="exercise-card">

**题目描述**：编写程序，演示有符号和无符号整数的区别。将一个变量分别声明为 `signed int` 和 `unsigned int`，并观察它们能表示的范围。

**要求**：
1. 声明一个 `signed int` 变量，赋值为负数
2. 声明一个 `unsigned int` 变量
3. 打印两个变量的值

```c
#include <stdio.h>

int main() {
    // 在这里声明有符号和无符号整数
    
    // 在这里打印它们的值
    
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
    signed int si = -100;
    unsigned int ui = 100;
    
    printf("有符号整数 si = %d\n", si);
    printf("无符号整数 ui = %u\n", ui);
    
    // 注意：如果给unsigned int赋值为负数，会发生什么？
    unsigned int ui2 = -100;
    printf("unsigned int ui2 = -100 的结果: %u\n", ui2);
    
    return 0;
}
```
</div>

---

### 题目3 [中等]

<div class="exercise-card">

**题目描述**：使用 `const` 关键字定义常量，并尝试修改它（应该会编译错误）。然后使用 `#define` 定义另一个常量，对比两者的区别。

**要求**：
1. 使用 `const` 定义一个常量
2. 尝试修改这个常量（应该会报错，可以注释掉这行）
3. 使用 `#define` 定义另一个常量

```c
#include <stdio.h>

// 使用#define定义常量
#define MAX_SIZE 100

int main() {
    // 使用const定义常量
    const int MIN_AGE = 18;
    
    printf("MAX_SIZE = %d\n", MAX_SIZE);
    printf("MIN_AGE = %d\n", MIN_AGE);
    
    // 尝试修改const常量（取消注释这行会编译错误）
    // MIN_AGE = 20;
    
    return 0;
}
```

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

// 使用#define定义常量
#define MAX_SIZE 100

int main() {
    // 使用const定义常量
    const int MIN_AGE = 18;
    
    printf("MAX_SIZE = %d\n", MAX_SIZE);
    printf("MIN_AGE = %d\n", MIN_AGE);
    
    // 尝试修改const常量（取消注释这行会编译错误）
    // MIN_AGE = 20;  // 错误：不能修改const常量
    
    return 0;
}
```
</div>

---

### 题目4 [中等]

<div class="exercise-card">

**题目描述**：编写程序演示类型转换。包括隐式类型转换和显式类型转换（强制转换）。

**要求**：
1. 演示整数和浮点数之间的隐式转换
2. 使用 `(类型)` 进行显式类型转换
3. 观察转换后的结果

```c
#include <stdio.h>

int main() {
    int a = 10;
    int b = 3;
    float result;
    
    // 隐式类型转换：整数除法
    result = a / b;
    printf("a / b (隐式转换) = %.2f\n", result);
    
    // 显式类型转换：浮点除法
    // 在这里添加显式类型转换代码
    
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
    int b = 3;
    float result;
    
    // 隐式类型转换：整数除法
    result = a / b;
    printf("a / b (隐式转换) = %.2f\n", result);  // 输出 3.00
    
    // 显式类型转换：浮点除法
    result = (float)a / b;
    printf("(float)a / b (显式转换) = %.2f\n", result);  // 输出 3.33
    
    // 另一种显式转换方式
    result = a / (float)b;
    printf("a / (float)b (显式转换) = %.2f\n", result);  // 输出 3.33
    
    return 0;
}
```
</div>

---

### 题目5 [困难]

<div class="exercise-card">

**题目描述**：编写程序，使用 `char` 类型存储字符和整数，演示 `char` 类型实际上是整数类型。

**要求**：
1. 使用 `char` 存储字符，并用 `%c` 和 `%d` 分别打印
2. 使用 `char` 存储整数，并打印其字符表示
3. 进行字符的算术运算

```c
#include <stdio.h>

int main() {
    // 在这里声明char变量
    
    // 打印字符的ASCII码值
    
    // 打印数字对应的字符
    
    // 进行字符算术运算（例如：'A' + 1）
    
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
    char ch1 = 'A';
    char ch2 = 65;  // 'A' 的ASCII码
    char ch3 = '0';
    
    printf("字符 'A' 的ASCII码: %d\n", ch1);
    printf("整数 65 对应的字符: %c\n", ch2);
    printf("字符 '0' 的ASCII码: %d\n", ch3);
    
    // 字符算术运算
    char next = ch1 + 1;
    printf("'A' + 1 = %c (ASCII码: %d)\n", next, next);
    
    // 字符转换为数字
    int digit = ch3 - '0';  // '0' 的ASCII码是48
    printf("字符 '0' 转换为数字: %d\n", digit);
    
    return 0;
}
```
</div>