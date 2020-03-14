# sting
### 方法合集
#### isString、replaceAll、isJSON、trim、replaceAllSpec、checkSpec、unique、getCount、getMaxCount、getMinCount、findIndex
### isString
#### 概念
判断是否是字符串，区分数字、boolean等
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|*|需要校验的变量|"1"
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|是否是string|true/false
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.isString("1")
```
#### 备注
无

---
### replaceAll
#### 概念
替换整段文字中的制定字符，会修改原字符串
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"12345"
findText|*|需要替换的字符串|"23"
replaceText|*|准备替换成的字符串|"33"

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|替换之后的字符串|"13345"
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.replaceAll("12345","23","33")
```
#### 备注
无

---
### isJSON
#### 概念
判断是不是json串
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"{a:1}"

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|判断结果|true/false
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.isJSON("{a:1}")
```
#### 备注
无

---
### trim
#### 概念
去掉空格,会修改原字符串
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|" a b cb d  "
type|Number|模式，1-所有空格  2-前后空格  3-前空格 4-后空格 默认 = 1|1

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|去除之后的|"abcbd"
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.trim(" a b cb d  ",1)
```
#### 备注
无

---
### replaceAllSpec
#### 概念
去掉所有特殊字符,会修改原字符串，支持所有特殊字符
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"@ab!【 d  "

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|去除之后的|"abd"
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.replaceAllSpec("@ab!【 d  ")
```
#### 备注
无

---
### checkSpec
#### 概念
判断是否有特殊字符
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"@ab!【 d  "

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|是true否false|true/false
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.checkSpec("@ab!【 d  ")
```
#### 备注
无

---
### unique
#### 概念
字符串去重,不会修改原字符串
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"abbc"

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|处理之后的字符串|"abc"
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.unique("abbc")
```
#### 备注
无

---
### getCount
#### 概念
获取各字符出现的次数
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"abbc"

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Obejct|统计结果|{a:1,b:2,c:1}
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.getCount("abbc")
```
#### 备注
无

---
### getMaxCount
#### 概念
获取字符出现的次数最多的一个
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"abbc"

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Obejct|统计结果|{key:"b",value:2}
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.getMaxCount("abbc")
```
#### 备注
无

---
### getMinCount
#### 概念
获取字符出现的次数最少的一个
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"abbc"

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Obejct|统计结果|{key:"a",value:1}
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.getMinCount("abbc")
```
#### 备注
无

---
### findIndex
#### 概念
获取第n次出现指定字符的位置,支持多个字符,从0开始
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|String|原字符串|"abcbcbcbb"
key|String|要查找的字符|"bc"
num|Number|第几个|2


#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|返回第几次出现的位置，如果没找到则返回-1|6
#### 使用方法
```
import { stringTool } from "mwutil"
stringTool.findIndex("abcbcbcbb","bc",2)
```
#### 备注
无

---