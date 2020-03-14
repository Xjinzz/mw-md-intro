# object
### 方法合集
#### isObject、equalsObject、deepClone、getKeyList、deepFreeze、toQueryString、toJsonArray、isEmptyObj
### isObject
#### 概念
判断是否是json，区分array
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|*|需要校验的变量|{a:1}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|是否是object|true/false
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.isObject({a:1})
```
#### 备注
无

---
### equalsObject
#### 概念
比较两个json是否完全一致,支持多维度json
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|第一个json|{a:1,b:{a:2}}
target|Object|第二个json|{a:1,b:{a:2}}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|是否完全一致|true/false
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.equalsObject({a:1},{a:1,b:1})
```
#### 备注
无

---
### deepClone
#### 概念
深拷贝json
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|原json|{a:1,b:{b:1}}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Object|克隆过后的json|{a:1,b:{b:1}}
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.deepClone({a:1,b:1})
```
#### 备注
无

---
### getKeyList
#### 概念
获取指定key的集合
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|原json|{a:1,b:{b:1}}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Object|key集合|["a","b"]
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.getKeyList({a:1,b:1})
```
#### 备注
无

---
### deepFreeze
#### 概念
深冻结,可以冻结多层级
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|原json|{a:1,b:{b:1}}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.deepFreeze({a:1,b:1})
```
#### 备注
无

---
### toQueryString
#### 概念
转query的string a=1&b=1，永不支持多级！
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|原json|{a:1,b:1}
splitTag|String|分隔符,默认为&|&

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|连接的字符串|a=1&b=1
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.toQueryString({a:1,b:1})
```
#### 备注
无

---
### toJsonArray
#### 概念
将对象转化为jsonArray {a:1,b:2} => [{key:a,value:1},{key:b,value:2}]
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|原json|{a:1,b:1}
keyname|String|存储key的值,默认为key|key
valuename|String|存储value的值,默认为value|value

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Array|处理之后的jsonArray|[{key:a,value:1},{key:b,value:2}]
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.toJsonArray({a:1,b:1})
```
#### 备注
无

---
### isEmptyObj
#### 概念
检查一个对象是否为空
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
source|Object|原json|{a:1,b:1}

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|json结果|true/false
#### 使用方法
```
import { objectTool } from "mwutil"
objectTool.isEmptyObj({a:1,b:1})
```
#### 备注
无

---