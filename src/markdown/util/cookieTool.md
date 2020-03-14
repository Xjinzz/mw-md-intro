# cookie
### 方法合集
#### del、set、get
### del

#### 概念
删除cookie
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
name|String|cookie的name|"a"
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
#### 使用方法
```
import { cookieTool } from "mwutil"
cookieTool.del("a")
```
#### 备注
无

---
### get

#### 概念
获取cookie值
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
name|String|cookie的name|"a"
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
|String|cookie的值|"xx"

#### 使用方法
```
import { cookieTool } from "mwutil"
cookieTool.get("a")
```
#### 备注
无

---
### set

#### 概念
设置cookie值
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
name|String|cookie的name|"a"
value|String|cookie的值|"xx"
expires|timeStamp|有效期|1584187704731

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 

#### 使用方法
```
import { cookieTool } from "mwutil"
cookieTool.set("a","xxxx",new Date().valueOf())
```
#### 备注
无

---