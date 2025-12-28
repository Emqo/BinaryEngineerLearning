# 第3章：运算符

运算符是用于执行各种操作的符号。C语言提供了丰富的运算符。

## 3.1 算术运算符

```c
#include <stdio.h>

int main() {
    int a = 10, b = 3;
    
    printf("=== 算术运算符 ===\n");
    printf("a = %d, b = %d\n", a, b);
    printf("a + b = %d\n", a + b);   // 加法：13
    printf("a - b = %d\n", a - b);   // 减法：7
    printf("a * b = %d\n", a * b);   // 乘法：30
    printf("a / b = %d\n", a / b);   // 整数除法：3（注意：不是3.33）
    printf("a %% b = %d\n", a % b);  // 取余：1（注意%%转义）
    
    // 浮点除法
    float x = 10.0f, y = 3.0f;
    printf("\n浮点除法:\n");
    printf("x / y = %.2f\n", x / y);  // 3.33
    
    // 自增自减
    int i = 5;
    printf("\n=== 自增自减 ===\n");
    printf("i = %d\n", i);
    printf("i++ = %d, 之后i = %d\n", i++, i);  // 后置：先使用后增加
    i = 5;
    printf("++i = %d, 之后i = %d\n", ++i, i);  // 前置：先增加后使用
    
    return 0;
}
```

**重要提示**：
- 整数除法会截断小数部分（不是四舍五入）
- 取余运算符 `%` 只能用于整数
- 自增自减运算符的前置和后置有区别

## 3.2 关系运算符

关系运算符用于比较两个值，返回0（假）或1（真）：

```c
#include <stdio.h>

int main() {
    int a = 10, b = 20;
    
    printf("=== 关系运算符 ===\n");
    printf("a = %d, b = %d\n", a, b);
    printf("%d == %d: %d\n", a, b, a == b);  // 等于：0（假）
    printf("%d != %d: %d\n", a, b, a != b);  // 不等于：1（真）
    printf("%d < %d: %d\n", a, b, a < b);    // 小于：1（真）
    printf("%d > %d: %d\n", a, b, a > b);    // 大于：0（假）
    printf("%d <= %d: %d\n", a, b, a <= b);  // 小于等于：1（真）
    printf("%d >= %d: %d\n", a, b, a >= b);  // 大于等于：0（假）
    
    return 0;
}
```

## 3.3 逻辑运算符

逻辑运算符用于组合多个条件：

```c
#include <stdio.h>
#include <stdbool.h>

int main() {
    bool x = true, y = false;
    
    printf("=== 逻辑运算符 ===\n");
    printf("x = %d, y = %d\n", x, y);
    printf("x && y: %d (逻辑与，两者都为真才为真)\n", x && y);
    printf("x || y: %d (逻辑或，至少一个为真就为真)\n", x || y);
    printf("!x: %d (逻辑非，取反)\n", !x);
    
    // 短路求值
    printf("\n=== 短路求值 ===\n");
    int a = 0;
    if (a != 0 && 10 / a > 5) {  // 如果a==0，不会执行10/a，避免除零错误
        printf("这不会执行\n");
    }
    printf("短路求值避免了除零错误\n");
    
    return 0;
}
```

**短路求值**：
- `&&`：如果左边为假，右边不执行
- `||`：如果左边为真，右边不执行

## 3.4 赋值运算符

```c
#include <stdio.h>

int main() {
    int a = 10;
    
    printf("=== 赋值运算符 ===\n");
    printf("初始值: a = %d\n", a);
    
    a += 5;   // 等价于 a = a + 5
    printf("a += 5: %d\n", a);
    
    a -= 3;   // 等价于 a = a - 3
    printf("a -= 3: %d\n", a);
    
    a *= 2;   // 等价于 a = a * 2
    printf("a *= 2: %d\n", a);
    
    a /= 4;   // 等价于 a = a / 4
    printf("a /= 4: %d\n", a);
    
    a %= 3;   // 等价于 a = a % 3
    printf("a %%= 3: %d\n", a);
    
    return 0;
}
```

## 3.5 位运算符（重要！）

位运算符对二进制工程师非常重要，它们直接操作数据的二进制位：

```c
#include <stdio.h>

int main() {
    unsigned int a = 0b10101100;  // 二进制：10101100 (172)
    unsigned int b = 0b11110000;  // 二进制：11110000 (240)
    
    printf("=== 位运算符 ===\n");
    printf("a = 0b10101100 (0x%x, %u)\n", a, a);
    printf("b = 0b11110000 (0x%x, %u)\n", b, b);
    printf("\n");
    
    // 按位与：两个位都是1才为1
    printf("a & b = 0b10100000 (0x%x, %u)\n", a & b, a & b);
    printf("  10101100\n");
    printf("& 11110000\n");
    printf("  --------\n");
    printf("  10100000\n");
    printf("\n");
    
    // 按位或：至少一个位是1就为1
    printf("a | b = 0b11111100 (0x%x, %u)\n", a | b, a | b);
    printf("  10101100\n");
    printf("| 11110000\n");
    printf("  --------\n");
    printf("  11111100\n");
    printf("\n");
    
    // 按位异或：两个位不同才为1
    printf("a ^ b = 0b01011100 (0x%x, %u)\n", a ^ b, a ^ b);
    printf("  10101100\n");
    printf("^ 11110000\n");
    printf("  --------\n");
    printf("  01011100\n");
    printf("\n");
    
    // 按位取反：0变1，1变0
    printf("~a = 0x%x\n", ~a);
    printf("\n");
    
    // 左移：向左移动指定位数，右边补0
    printf("a << 2 = 0b1010110000 (0x%x, %u)\n", a << 2, a << 2);
    printf("相当于 a * 4 = %u\n", a * 4);
    printf("\n");
    
    // 右移：向右移动指定位数，左边补0（无符号）或符号位（有符号）
    printf("a >> 2 = 0b00101011 (0x%x, %u)\n", a >> 2, a >> 2);
    printf("相当于 a / 4 = %u\n", a / 4);
    
    return 0;
}
```

### 3.5.1 位运算应用详解

位运算在实际编程中有很多应用，特别是标志位操作：

```c
#include <stdio.h>

// 定义标志位（使用位掩码）
#define FLAG_A (1 << 0)  // 第0位：00000001 (1)
#define FLAG_B (1 << 1)  // 第1位：00000010 (2)
#define FLAG_C (1 << 2)  // 第2位：00000100 (4)
#define FLAG_D (1 << 3)  // 第3位：00001000 (8)

void print_flags(unsigned char flags) {
    printf("flags = 0b");
    for (int i = 7; i >= 0; i--) {
        printf("%d", (flags >> i) & 1);
    }
    printf(" (0x%02x, %u)\n", flags, flags);
}

int main() {
    unsigned char flags = 0;  // 初始：所有标志都是关闭的
    
    printf("=== 标志位操作 ===\n\n");
    
    // 1. 设置标志位：flags |= FLAG_BIT
    printf("1. 设置标志A和B:\n");
    flags |= FLAG_A;  // 设置第0位
    print_flags(flags);
    flags |= FLAG_B;  // 设置第1位
    print_flags(flags);
    printf("  说明：|= 操作将指定位设置为1\n");
    printf("  原理：任何位与1进行或运算，结果都是1\n\n");
    
    // 2. 检查标志位：if (flags & FLAG_BIT)
    printf("2. 检查标志位:\n");
    if (flags & FLAG_A) {
        printf("  标志A是打开的\n");
    }
    if (flags & FLAG_C) {
        printf("  标志C是打开的\n");
    } else {
        printf("  标志C是关闭的\n");
    }
    printf("  说明：& 操作检查指定位是否为1\n");
    printf("  原理：如果结果不为0，说明该位是1\n\n");
    
    // 3. 清除标志位：flags &= ~FLAG_BIT
    printf("3. 清除标志A:\n");
    flags &= ~FLAG_A;  // 清除第0位
    print_flags(flags);
    printf("  说明：&= ~操作将指定位设置为0\n");
    printf("  原理：~FLAG_A将所有位取反，然后&操作清除指定位\n\n");
    
    // 4. 切换标志位：flags ^= FLAG_BIT
    printf("4. 切换标志C:\n");
    flags ^= FLAG_C;  // 切换第2位（从0变成1）
    print_flags(flags);
    flags ^= FLAG_C;  // 再次切换（从1变成0）
    print_flags(flags);
    printf("  说明：^= 操作切换指定位的状态\n");
    printf("  原理：异或运算：0^1=1, 1^1=0\n\n");
    
    // 实际应用：文件权限
    printf("=== 实际应用：文件权限 ===\n");
    #define READ_PERM   (1 << 0)  // 读权限
    #define WRITE_PERM  (1 << 1)  // 写权限
    #define EXEC_PERM   (1 << 2)  // 执行权限
    
    unsigned char file_perm = READ_PERM | WRITE_PERM;  // 读写权限
    printf("文件权限: ");
    if (file_perm & READ_PERM) printf("r");
    if (file_perm & WRITE_PERM) printf("w");
    if (file_perm & EXEC_PERM) printf("x");
    printf("\n");
    
    return 0;
}
```

**位运算的优势**：
- **节省内存**：一个整数可以存储32个布尔值（32位系统）
- **高效操作**：位运算比逻辑运算更快
- **底层控制**：直接操作二进制位，适合系统编程

## 3.6 运算符优先级

运算符有优先级，优先级高的先计算：

```c
#include <stdio.h>

int main() {
    int a = 2, b = 3, c = 4;
    
    // 乘法优先级高于加法
    int result1 = a + b * c;      // 2 + 3*4 = 14
    int result2 = (a + b) * c;     // (2+3)*4 = 20
    
    printf("a + b * c = %d\n", result1);
    printf("(a + b) * c = %d\n", result2);
    
    // 使用括号明确优先级
    int result3 = a + (b * c);      // 明确优先级
    
    return 0;
}
```

**常见优先级**（从高到低）：
1. `()` 括号
2. `++` `--` `!` `~` 一元运算符
3. `*` `/` `%` 乘除
4. `+` `-` 加减
5. `<<` `>>` 位移
6. `<` `<=` `>` `>=` 比较
7. `==` `!=` 相等
8. `&` 按位与
9. `^` 按位异或
10. `|` 按位或
11. `&&` 逻辑与
12. `||` 逻辑或
13. `=` 赋值

**建议**：不确定优先级时，使用括号明确表达意图。

---

## 3.7 练习题

### 题目1 [简单]

<div class="exercise-card">

**题目描述**：编写程序，使用算术运算符计算两个数的和、差、积、商和余数。

**要求**：
1. 使用整数类型的两个变量
2. 分别计算并打印加法、减法、乘法、除法、取余的结果
3. 注意整数除法的特点

```c
#include <stdio.h>

int main() {
    int a = 17;
    int b = 5;
    
    // 在这里计算并打印各种运算结果
    
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
    int a = 17;
    int b = 5;
    
    printf("a = %d, b = %d\n", a, b);
    printf("a + b = %d\n", a + b);   // 22
    printf("a - b = %d\n", a - b);   // 12
    printf("a * b = %d\n", a * b);   // 85
    printf("a / b = %d\n", a / b);   // 3 (整数除法)
    printf("a %% b = %d\n", a % b);  // 2 (取余)
    
    return 0;
}
```
</div>

---

### 题目2 [中等]

<div class="exercise-card">

**题目描述**：编写程序，演示前置和后置自增自减运算符的区别。

**要求**：
1. 使用相同的初始值
2. 分别演示前置和后置自增
3. 分别演示前置和后置自减
4. 打印每一步的结果

```c
#include <stdio.h>

int main() {
    int x = 5;
    int y;
    
    // 演示后置自增
    y = x++;
    printf("后置自增: y = x++, x = %d, y = %d\n", x, y);
    
    // 重新赋值
    x = 5;
    
    // 演示前置自增
    // 在这里添加代码
    
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
    int x = 5;
    int y;
    
    // 演示后置自增
    y = x++;
    printf("后置自增: y = x++, x = %d, y = %d\n", x, y);  // x=6, y=5
    
    // 重新赋值
    x = 5;
    
    // 演示前置自增
    y = ++x;
    printf("前置自增: y = ++x, x = %d, y = %d\n", x, y);  // x=6, y=6
    
    // 重新赋值
    x = 5;
    
    // 演示后置自减
    y = x--;
    printf("后置自减: y = x--, x = %d, y = %d\n", x, y);  // x=4, y=5
    
    // 重新赋值
    x = 5;
    
    // 演示前置自减
    y = --x;
    printf("前置自减: y = --x, x = %d, y = %d\n", x, y);  // x=4, y=4
    
    return 0;
}
```
</div>

---

### 题目3 [简单]

<div class="exercise-card">

**题目描述**：使用关系运算符和逻辑运算符编写一个判断程序。判断一个数是否在指定范围内（例如：10到100之间）。

**要求**：
1. 使用关系运算符比较数值
2. 使用逻辑运算符（`&&` 或 `||`）组合条件
3. 打印判断结果

```c
#include <stdio.h>

int main() {
    int num = 50;
    
    // 判断 num 是否在 10 到 100 之间（包含10和100）
    // 在这里编写判断代码
    
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
    int num = 50;
    
    // 判断 num 是否在 10 到 100 之间（包含10和100）
    if (num >= 10 && num <= 100) {
        printf("%d 在 10 到 100 之间\n", num);
    } else {
        printf("%d 不在 10 到 100 之间\n", num);
    }
    
    // 测试其他值
    num = 5;
    if (num >= 10 && num <= 100) {
        printf("%d 在 10 到 100 之间\n", num);
    } else {
        printf("%d 不在 10 到 100 之间\n", num);
    }
    
    return 0;
}
```
</div>

---

### 题目4 [中等]

<div class="exercise-card">

**题目描述**：使用位运算符实现以下功能：
1. 检查一个数的二进制表示中某一位是否为1
2. 设置一个数的二进制表示中某一位为1
3. 清除一个数的二进制表示中某一位（设置为0）

**要求**：
1. 使用 `&`（按位与）、`|`（按位或）、`~`（按位取反）运算符
2. 使用位移运算符 `<<` 或 `>>`
3. 打印每一步的结果

```c
#include <stdio.h>

int main() {
    unsigned int num = 5;  // 二进制: 101
    int bit_pos = 1;       // 要操作的位位置（从0开始）
    
    // 检查第 bit_pos 位是否为1
    // 在这里编写代码
    
    // 设置第 bit_pos 位为1
    // 在这里编写代码
    
    // 清除第 bit_pos 位（设置为0）
    // 在这里编写代码
    
    return 0;
}
```

**提示**：
- 要检查第n位是否为1：`(num >> n) & 1`
- 要设置第n位为1：`num | (1 << n)`
- 要清除第n位：`num & ~(1 << n)`

</div>

<!-- 参考答案 -->
<div class="exercise-answer" style="display: none;">
<h4 class="answer-title">参考答案</h4>

```c
#include <stdio.h>

int main() {
    unsigned int num = 5;  // 二进制: 101
    int bit_pos = 1;       // 要操作的位位置（从0开始）
    
    printf("原始数字: %d (二进制: ", num);
    // 简单打印二进制（这里只是演示，实际可以用更好的方法）
    for (int i = 7; i >= 0; i--) {
        printf("%d", (num >> i) & 1);
    }
    printf(")\n\n");
    
    // 检查第 bit_pos 位是否为1
    if ((num >> bit_pos) & 1) {
        printf("第 %d 位是 1\n", bit_pos);
    } else {
        printf("第 %d 位是 0\n", bit_pos);
    }
    
    // 设置第 bit_pos 位为1
    num = num | (1 << bit_pos);
    printf("设置第 %d 位为1后: %d\n", bit_pos, num);
    
    // 重新赋值
    num = 5;
    
    // 清除第 bit_pos 位（设置为0）
    num = num & ~(1 << bit_pos);
    printf("清除第 %d 位后: %d\n", bit_pos, num);
    
    return 0;
}
```
</div>

---

### 题目5 [困难]

<div class="exercise-card">

**题目描述**：使用赋值运算符的复合形式（`+=`, `-=`, `*=`, `/=` 等）实现一个简单的计算器功能。

**要求**：
1. 初始化一个变量为某个值
2. 使用复合赋值运算符进行多次运算
3. 每一步都打印当前值
4. 演示至少4种不同的复合赋值运算符

```c
#include <stdio.h>

int main() {
    int result = 100;
    
    printf("初始值: %d\n", result);
    
    // 使用复合赋值运算符进行计算
    // 例如：result += 10, result -= 5, result *= 2, result /= 3
    
    printf("最终值: %d\n", result);
    
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
    int result = 100;
    
    printf("初始值: %d\n", result);
    
    // 使用复合赋值运算符进行计算
    result += 10;  // result = result + 10
    printf("执行 result += 10 后: %d\n", result);
    
    result -= 5;   // result = result - 5
    printf("执行 result -= 5 后: %d\n", result);
    
    result *= 2;   // result = result * 2
    printf("执行 result *= 2 后: %d\n", result);
    
    result /= 3;   // result = result / 3
    printf("执行 result /= 3 后: %d\n", result);
    
    result %= 7;   // result = result % 7
    printf("执行 result %%= 7 后: %d\n", result);
    
    printf("最终值: %d\n", result);
    
    return 0;
}
```
</div>