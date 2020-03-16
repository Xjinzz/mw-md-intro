# generalTool
### 方法合集
#### debounce\throttle\getType\compareVersion
### debounce
#### 概念
节流函数，一定时间内只执行一次
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
fn|Fcuntion|需要节流的函数|
wait|Number|节流等待时间，默认500|100
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
#### 使用方法
```
import { generalTool } from "mwutil"
generalTool.debounce(function(){},100)
```
#### 备注
无

---
### throttle
#### 概念
 防抖，操作间隔多久之后在调用，如果有调用则重置时间
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
fn|Fcuntion|需要防抖的函数|
wait|Number|防抖等待时间，默认500|100
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
#### 使用方法
```
import { generalTool } from "mwutil"
generalTool.throttle(function(){},100)
```
#### 备注
无

---
### getType
#### 概念
 获取数据的类型
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
*|*|需要判断的数据|{a:1}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
String|可能为Object/String/Number/Array/Function/Date｜Object
#### 使用方法
```
import { generalTool } from "mwutil"
generalTool.getType({a:1})
```
#### 备注
无

---
### compareVersion
#### 概念
 比较两个版本号
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
v1|string|第一个version|1.0.0
v2|string|第二个version|1.0.1
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Boolean|第一个如果比第二个大则返回true/否则返回false|false
#### 使用方法
```
import { generalTool } from "mwutil"
generalTool.compareVersion("1.0.0","1.0.1")
```
#### 备注
无

---