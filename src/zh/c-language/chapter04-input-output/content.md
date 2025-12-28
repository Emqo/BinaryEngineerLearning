# 第4章：输入输出

## 4.1 printf格式化输出详解

`printf` 是C语言中最常用的输出函数，支持丰富的格式化选项：

```c
#include <stdio.h>

int main() {
    int num = 42;
    float f = 3.14159f;
    char ch = 'A';
    char str[] = "Hello";
    
    printf("=== 整数格式化 ===\n");
    printf("十进制: %d\n", num);           // 42
    printf("八进制: %o\n", num);          // 52
    printf("十六进制: %x (小写)\n", num);  // 2a
    printf("十六进制: %X (大写)\n", num);  // 2A
    printf("无符号: %u\n", (unsigned int)num);
    
    printf("\n=== 浮点数格式化 ===\n");
    printf("默认: %f\n", f);              // 3.141590
    printf("科学计数: %e\n", f);          // 3.141590e+00
    printf("科学计数: %E\n", f);          // 3.141590E+00
    printf("自动选择: %g\n", f);          // 自动选择f或e格式
    printf("保留2位小数: %.2f\n", f);     // 3.14
    printf("宽度10，保留3位: %10.3f\n", f); // 前面补空格
    
    printf("\n=== 字符和字符串 ===\n");
    printf("字符: %c\n", ch);             // A
    printf("字符串: %s\n", str);          // Hello
    
    printf("\n=== 宽度和对齐 ===\n");
    printf("右对齐（默认）: [%10d]\n", num);    // [        42]
    printf("左对齐: [%-10d]\n", num);           // [42        ]
    printf("前导零: [%05d]\n", num);            // [00042]
    printf("宽度10，前导零: [%010d]\n", num);   // [0000000042]
    
    printf("\n=== 特殊格式 ===\n");
    printf("百分号: %%\n");               // %
    printf("指针地址: %p\n", &num);       // 内存地址
    
    return 0;
}
```

**常用格式说明符**：

| 说明符 | 类型 | 说明 |
|--------|------|------|
| `%d` | `int` | 十进制整数 |
| `%u` | `unsigned int` | 无符号整数 |
| `%o` | `int` | 八进制 |
| `%x` / `%X` | `int` | 十六进制（小写/大写） |
| `%f` | `float` / `double` | 浮点数 |
| `%e` / `%E` | `float` / `double` | 科学计数法 |
| `%g` / `%G` | `float` / `double` | 自动选择格式 |
| `%c` | `char` | 字符 |
| `%s` | `char*` | 字符串 |
| `%p` | `void*` | 指针地址 |
| `%zu` | `size_t` | `sizeof`返回值 |

## 4.2 scanf输入详解

`scanf` 用于从标准输入读取数据：

```c
#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];
    char ch;
    
    printf("=== scanf输入示例 ===\n");
    
    printf("请输入年龄: ");
    scanf("%d", &age);  // 注意&符号！获取变量地址
    
    printf("请输入身高: ");
    scanf("%f", &height);
    
    printf("请输入姓名: ");
    scanf("%s", name);  // 字符串不需要&（数组名就是地址）
    
    printf("请输入一个字符: ");
    scanf(" %c", &ch);  // 注意前面的空格，用于跳过换行符
    
    printf("\n你的信息:\n");
    printf("姓名: %s\n", name);
    printf("年龄: %d\n", age);
    printf("身高: %.2f\n", height);
    printf("字符: %c\n", ch);
    
    // 一次输入多个值
    printf("\n请输入两个整数（用空格分隔）: ");
    int a, b;
    scanf("%d %d", &a, &b);
    printf("a = %d, b = %d\n", a, b);
    
    return 0;
}
```

**重要提示**：
- `scanf` 使用 `&` 获取变量地址（地址和指针的概念会在后续章节详细学习）
- 字符串（字符数组）不需要 `&`，因为数组名就是地址（数组会在后续章节学习）
- `scanf` 遇到空格、换行符、制表符会停止读取
- 使用 `%s` 读取字符串时，不能包含空格

**scanf返回值**：
```c
#include <stdio.h>

int main() {
    int num;
    printf("请输入一个整数: ");
    int result = scanf("%d", &num);
    
    if (result == 1) {
        printf("成功读取: %d\n", num);
    } else {
        printf("输入错误！\n");
    }
    
    return 0;
}
```

## 4.3 字符输入输出

除了 `printf` 和 `scanf`，还有字符级别的输入输出函数：

```c
#include <stdio.h>

int main() {
    // getchar() 和 putchar()
    printf("请输入一个字符: ");
    int ch = getchar();  // 读取一个字符
    printf("你输入的字符: ");
    putchar(ch);         // 输出一个字符
    putchar('\n');
    
    // 清除输入缓冲区
    while (getchar() != '\n');  // 清除剩余的换行符
    
    return 0;
}
```


---

## 4.4 练习题

### 题目1 [简单]

<div class="exercise-card">

**题目描述**：使用 `printf` 格式化输出，打印不同类型的变量。包括整数、浮点数、字符和字符串。

**要求**：
1. 声明不同类型的变量
2. 使用正确的格式说明符（`%d`, `%f`, `%c`, `%s`）
3. 控制浮点数的小数位数

```c
#include <stdio.h>

int main() {
    int age = 20;
    float height = 175.5f;
    char grade = 'A';
    char name[] = "张三";
    
    // 在这里使用printf格式化输出
    
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
    int age = 20;
    float height = 175.5f;
    char grade = 'A';
    char name[] = "张三";
    
    printf("姓名: %s\n", name);
    printf("年龄: %d 岁\n", age);
    printf("身高: %.1f 厘米\n", height);
    printf("等级: %c\n", grade);
    
    return 0;
}
```
</div>

---

### 题目2 [简单]

<div class="exercise-card">

**题目描述**：使用 `scanf` 从键盘输入数据，包括整数、浮点数和字符，然后打印出来。

**要求**：
1. 使用 `scanf` 读取整数
2. 使用 `scanf` 读取浮点数
3. 使用 `scanf` 读取字符
4. 使用 `printf` 打印读取的值

```c
#include <stdio.h>

int main() {
    int num;
    float value;
    char ch;
    
    printf("请输入一个整数: ");
    // 在这里使用scanf读取整数
    
    printf("请输入一个浮点数: ");
    // 在这里使用scanf读取浮点数
    
    printf("请输入一个字符: ");
    // 在这里使用scanf读取字符
    
    // 在这里打印读取的值
    
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
    int num;
    float value;
    char ch;
    
    printf("请输入一个整数: ");
    scanf("%d", &num);
    
    printf("请输入一个浮点数: ");
    scanf("%f", &value);
    
    printf("请输入一个字符: ");
    scanf(" %c", &ch);  // 注意：%c前面有一个空格，用于跳过换行符
    
    printf("\n你输入的值是：\n");
    printf("整数: %d\n", num);
    printf("浮点数: %.2f\n", value);
    printf("字符: %c\n", ch);
    
    return 0;
}
```
</div>

---

### 题目3 [中等]

<div class="exercise-card">

**题目描述**：编写一个简单的计算器程序，从键盘输入两个数字和一个运算符（+、-、*、/），然后计算并输出结果。

**要求**：
1. 使用 `scanf` 读取两个数字和一个字符
2. 使用 `switch` 或 `if-else` 判断运算符
3. 根据运算符执行相应的计算
4. 处理除零错误

```c
#include <stdio.h>

int main() {
    float a, b, result;
    char operator;
    
    printf("请输入两个数字和运算符（例如: 10 5 +）: ");
    // 在这里读取输入
    
    // 在这里根据运算符进行计算
    
    // 在这里打印结果
    
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
    float a, b, result;
    char operator;
    
    printf("请输入两个数字和运算符（例如: 10 5 +）: ");
    scanf("%f %f %c", &a, &b, &operator);
    
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b != 0) {
                result = a / b;
            } else {
                printf("错误：除数不能为0！\n");
                return 1;
            }
            break;
        default:
            printf("错误：不支持的运算符！\n");
            return 1;
    }
    
    printf("%.2f %c %.2f = %.2f\n", a, operator, b, result);
    
    return 0;
}
```
</div>

---

### 题目4 [中等]

<div class="exercise-card">

**题目描述**：使用 `getchar()` 和 `putchar()` 函数，实现一个简单的字符输入输出程序。读取用户输入的字符，直到遇到换行符，然后回显所有输入的字符。

**要求**：
1. 使用 `getchar()` 读取字符
2. 使用 `putchar()` 输出字符
3. 循环读取直到遇到换行符

```c
#include <stdio.h>

int main() {
    char ch;
    
    printf("请输入一行文字（按回车结束）: ");
    
    // 在这里使用getchar循环读取字符
    
    printf("\n");
    
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
    char ch;
    
    printf("请输入一行文字（按回车结束）: ");
    
    while ((ch = getchar()) != '\n') {
        putchar(ch);
    }
    
    printf("\n");
    
    return 0;
}
```
</div>

---

### 题目5 [困难]

<div class="exercise-card">

**题目描述**：编写一个程序，从键盘输入学生的信息（姓名、年龄、成绩），使用格式化的输入输出，并按照表格形式打印出来。

**要求**：
1. 使用 `scanf` 读取多个字段
2. 使用 `printf` 格式化输出表格
3. 至少输入3个学生的信息
4. 使用制表符或空格对齐表格

```c
#include <stdio.h>

int main() {
    char name[50];
    int age;
    float score;
    
    printf("请输入学生信息（姓名 年龄 成绩），输入3次：\n");
    
    // 打印表头
    printf("%-10s %-5s %-10s\n", "姓名", "年龄", "成绩");
    printf("---------------------\n");
    
    // 循环读取3个学生的信息
    for (int i = 0; i < 3; i++) {
        printf("学生 %d: ", i + 1);
        // 在这里读取并打印学生信息
        
    }
    
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
    char name[50];
    int age;
    float score;
    
    printf("请输入学生信息（姓名 年龄 成绩），输入3次：\n");
    
    // 打印表头
    printf("%-10s %-5s %-10s\n", "姓名", "年龄", "成绩");
    printf("---------------------\n");
    
    // 循环读取3个学生的信息
    for (int i = 0; i < 3; i++) {
        printf("学生 %d: ", i + 1);
        scanf("%s %d %f", name, &age, &score);
        printf("%-10s %-5d %-10.2f\n", name, age, score);
    }
    
    return 0;
}
```
</div>