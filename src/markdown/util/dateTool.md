# date
### 方法合集
#### isDate、getCurrentTimeStamp、date、time、dateTime、getCurrentMonthFirst、getCurrentMonthLast、compare、duration、count、getMouthDay、getMonthWeek
### isDate
#### 概念
判断是不是Date类型
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|*|要判断的值|1584189447343
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|是否是Date类型（支持任何可以被new Date解析的）|true/false
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.isDate("a")
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### getCurrentTimeStamp
#### 概念
获取当前的时间戳
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Date|当前的时间戳|1584189447343
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.getCurrentTimeStamp()
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### date
#### 概念
获取yy-mm-dd,需要传入能被new Date()解析的时间,默认为当前
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|需要转换的时间|1584189447343
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|解析后的字符串|"2020-03-24"
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.date(new Date().valueOf())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### time
#### 概念
获取HH:MM:SS,需要传入能被new Date()解析的时间,默认为当前
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|需要转换的时间|1584189447343
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|解析后的字符串|"20:44:20"
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.time(new Date().valueOf())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### dateTime
#### 概念
获取YYYY-MM-DD HH:MM:SS,需要传入能被new Date()解析的时间,默认为当前
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|需要转换的时间|1584189447343
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|解析后的字符串|"2020-03-14 20:44:20"
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.dateTime(new Date().valueOf())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### getCurrentMonthFirst
#### 概念
获取指定月份第一天，默认为当前
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|时间|1584189447343
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|formate之后的日期|"2020-03-01"
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.getCurrentMonthFirst(new Date().valueOf())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### getCurrentMonthLast
#### 概念
获取指定月份最后一月，默认为当前
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|时间|1584189447343
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|formate之后的日期|"2020-03-31"
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.getCurrentMonthLast(new Date().valueOf())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### compare
#### 概念
比较两个时间的大小（需要传入可以被newDate的时间）
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|时间|1584189447343
val2|Date|时间2|1584190112771
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Boolean|第一个时间是否比第二个大|true/false
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.compare(1584189447343,1584190112771)
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### duration
#### 概念
计算 “时间1” 比 “时间2”，间隔的时长；如 1年前/后，3个月前/后，20天前/后，5分钟前/后，2秒前/后
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|时间|1584189447343
val2|Date|时间2默认为当前时间|1584190112771
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|第一个时间距离第二个时间的间隔|3分钟前
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.duration(1584189447343,1584190112771)
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### count
#### 概念
对一个日期对象，加上某个单位的数量；
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|原始时间，默认为当前|2020-03-14
val2|Date|加多少天（减可以用负数）默认是0|1
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 String|计算过后的日期|2020-03-15
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.count("2020-03-14",1)
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### getMouthDay
#### 概念
获取一个日期所在的月份有多少天
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|时间，默认为当前|Sat Mar 14 2020 20:50:44 GMT+0800
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|天数|31
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.getMouthDay(new Date())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---
### getMonthWeek
#### 概念
获取一个日期所在的月份有多少周
#### 参数列表
\/| 参数类型| 参数意义| 参数示例
:-: | :-: | :-: | :-: 
val|Date|时间，默认为当前|Sat Mar 14 2020 20:50:44 GMT+0800
#### 返回列表
| 返回类型| 返回说明| 返回示例
 :-: | :-: | :-: 
 Number|天数|6
#### 使用方法
```
import { dateTool } from "mwutil"
dateTool.getMonthWeek(new Date())
```
#### 备注
不一定是时间戳，格林尼治时间、标准时间等都可以

---