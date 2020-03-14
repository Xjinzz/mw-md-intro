# math
### 方法合集
#### isNumber、random、div、mul、add、sub、toUpperCase
### isNumber
#### 概念
判断是不是number，区分"1"
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|*|需要校验的变量|1
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|是否是数字|true/false
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.isNumber("a")
```
#### 备注
无

---
### random
#### 概念
获取指定范围内的随机数
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
min|Number|起始区|1
max|Number|结束区|10
num|Number|保留小数位数，默认不限制|2

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|随机数|2.44
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.random(1,10,2)
```
#### 备注
无

---
### div
#### 概念
原生浮点除法不准确，获取较为准确的除法
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
arg1|Number|被除数|10
arg2|Number|除数|3

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|结果|3.33333333333333
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.div(10,3)
```
#### 备注
无

---
### mul
#### 概念
原生浮点乘法不准确，获取较为准确的乘法
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
arg1|Number|第一个数|0.1
arg2|Number|第二个数|0.2

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|结果|0.02
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.mul(0.1,0.2)
```
#### 备注
无

---
### add
#### 概念
原生浮点加法不准确，获取较为准确的加法
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
arg1|Number|第一个数|0.1
arg2|Number|第二个数|0.2

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|结果|0.03
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.add(0.1,0.2)
```
#### 备注
无

---
### sub
#### 概念
原生浮点减不准确，获取较为准确的减法
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
arg1|Number|第一个数|1
arg2|Number|第二个数|0.7

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|结果|0.03
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.sub(1,0.7)
```
#### 备注
无

---
### toUpperCase
#### 概念
将数字转换为大写如：1.5=>一点五
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
arg|Number|要转换的数|1.5

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|结果|一点五
#### 使用方法
```
import { mathTool } from "mwutil"
mathTool.toUpperCase(1.5)
```
#### 备注
无

---