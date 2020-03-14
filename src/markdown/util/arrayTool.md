# array
### 方法合集
#### isArray、deepClone、findIndex、removeItems、unique、uniqueByFiled、getSimpleValuesByField、sort、sortByField、delVoid、deepFlat
### isArray

#### 概念
判断是不是Array类型（会区分object）
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|要判断的数组|[1,2,3]
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Boolean|是返回true,否返回false|true/false
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.isArray([1,2,3])
```
#### 备注
无

---
### deepClone

#### 概念
深拷贝，支持jsonArray，多维数组
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|要克隆的数组|[1,[1,2],{a:1}]
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|返回克隆之后的数组|[1,[1,2],{a:1}]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.deepClone([1,2,3])
```
#### 备注
无

---
### findIndex

#### 概念
获取指定item第一次出现的位置（支持任意类型的item）
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|要排查的数组|[1,"a",{a:1}]
item|*|要查找的item|{a:1}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Number|元素在数组中的位置0开始，如果没找到返回-1|2
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.findIndex([1,"a",{a:1}],{a:1})
```
#### 备注
无

---
### removeItems

#### 概念
删除指定的内容的一项（不影响原数组,支持任意格式的item）
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|原数组|[1,"a",{a:1}]
item|*|要删除的item|{a:1}
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|删除之后的克隆数组|[1,"a"]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.removeItems([1,"a",{a:1}],{a:1})
```
#### 备注
无

---
### unique

#### 概念
数组去重(仅支持普通数组，不替换原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|原数组|[1,"a","a","1"]
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|去重之后的克隆数组|[1,"a"]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.unique([1,"a",{a:1}],{a:1})
```
#### 备注
无

---
### uniqueByFiled

#### 概念
根据对象的指定key判定去重(不替换原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|原数组|[{a:1},{a:2},{a:2,b:1},{a:1,b:2},{c:1}]
field|String|对象key|"a"
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|去重之后的克隆数组|[{a:1},{a:2},{c:1}]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.uniqueByFiled([{a:1},{a:2},{a:2,b:1},{a:1,b:2},{c:1}],"a")
```
#### 备注
无

---
### getSimpleValuesByField

#### 概念
根据对象的指定key生成新数组(不替换原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|原数组|[{a:1},{a:2},{a:2,b:1},{a:1,b:2},{c:1}]
field|String|对象key|"a"
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|生成之后的克隆数组|[1,2,2,1]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.getSimpleValuesByField([{a:1},{a:2},{a:2,b:1},{a:1,b:2},{c:1}],"a")
```
#### 备注
无

---
### sort

#### 概念
数组排序(仅针对一维数字、字符串数组，不替换原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|原数组|[1,3,4,2,6,5]
spec|Boolean|正倒序|true/false默认true（正，从小到大）

#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|排序之后的克隆数组|[1,2,3,4,5,6]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.sort([1,3,4,2,6,5],true)
```
#### 备注
无

---
### sortByField

#### 概念
根据key对jsonArray的排序(不替换原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|原数组|[{a:1},{a:3},{a:2}]
field|String|对象key|"a"
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|排序之后的克隆数组|[{a:3},{a:2},{a:1}]
:-: | :-: | :-: | :-: 
spec|Boolean|正倒序|true/false默认true（正，从小到大）

#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.sortByField([{a:1},{a:3},{a:2}],"a")
```
#### 备注
无

---
### delVoid

#### 概念
去掉数组中的null、undefined(不影响原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|要被过滤的数组|[1,null,2,undefined,3]
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|删除过后的数组|[1,2,3]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.delVoid([1,null,2,undefined,3])
```
#### 备注
暂时无法判断NaN,因为isNaN("a") == true

---
### deepFlat

#### 概念
数组扁平化(多维数组变为一维，不影响原数组)
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
array|Array|要被过滤的数组|[[1,2,[3,[4]]],5,[{a:1}]]]
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
Array|扁平过后的数组|[1,2,3,4,5,{a:1}]
#### 使用方法
```
import { arrayTool } from "mwutil"
arrayTool.deepFlat([1,null,2,undefined,3])
```
#### 备注
数组内部json的key是array的话则无法扁平,例如[[{a:[1,2]}],2] => [{a:[1,2]},2]

---