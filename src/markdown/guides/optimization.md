# 前端优化
<!-- 缓存模块优化开始 -->
## 总览
![](../../static/images/1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200))
<img src="../../static/images/1.png" alt="图片替换文本" width="500" height="313" align="bottom" />
## 缓存
### 本地数据存储
 本地存储分为**cookie**(兼容性好)、**localStorage**(存在时间久、存储空间大)、**sessionStorage**（关闭页面即消失)、**indexedDB**(一种类似SQL数据库结构化数据存储机制)，对于一些特殊的、轻量级的业务数据，可以考虑使用本地存储作为缓存
> 参考文献：[indexedDB](https://blog.csdn.net/qq_37674616/article/details/82713840)

### Cache API
Cache API为缓存的 Request / Response  对象对提供存储机制
> 参考文献：[兼容性参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache#Browser_compatibility)、[使用参考](https://developer.mozilla.org/zh-CN/docs/Web/API)

### HTTP缓存
HTTP 有一系列的规范来规定哪些情况下需要缓存请求信息、缓存多久，而哪些情况下不能进行信息的缓存。我们可以通过相关的 HTTP 请求头来实现缓存。HTTP 缓存大致可以分为**强缓存**与**协商缓存**。
#### 强缓存
在强缓存的情况下，浏览器不会向服务器发送请求，而是直接从本地缓存中读取内容，这个“本地”一般就是来源于硬盘。这也就是我们在 Chrome DevTools 上经常看到的「disk cache」。在 Expires 上可以设置一个过期时间，浏览器通过将其与当前本地时间对比，判断资源是否过期，未过期则直接从本地取即可。而 Cache-Control 则可以通过给它设置一个 max-age，来控制过期时间。例如，max-age=300 就是表示在响应成功后 300 秒内，资源请求会走强缓存。
#### 协商缓存
协商缓存是为了解决这样的问题：如果服务器在300秒内更新了资源，需要怎么让客户端知道并更新。

一种协商缓存的方式是：服务器第一次响应时返回**Last-Modified**，而浏览器在后续请求时带上其值作为**If-Modified-Since**，相当于问服务端：XX 时间点之后，这个资源更新了么？服务器根据实际情况回答即可：更新了（状态码 200）或没更新（状态码 304）。

上面是通过时间来判断是否更新，如果更新时间间隔过短，例如 1秒 一下，那么使用更新时间的方式精度就不够了。所以还有一种是通过标识 —— ETag。服务器第一次响应时返回**ETag**，而浏览器在后续请求时带上其值作为**If-None-Match**。一般会用文件的 MD5 作为 ETag。
> 参考文献：[HTTP缓存机制](https://github.com/amandakelake/blog/issues/41)
### 浏览器缓存
当所有缓存都没有命中时候则会进入浏览器缓存，浏览器缓存主要分为
#### Service Worker
Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的
#### Memory Cache
**内存中的缓存**，内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验。
#### Disk Cache
**存储在硬盘中的缓存**，它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据
#### Push Cache
**推送缓存**当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。
> 参考文献：[深入理解浏览器缓存机制](https://www.jianshu.com/p/54cc04190252)
### minifest(离线缓存)
**不建议使用**
> 参考文献：[minifest使用](https://www.jianshu.com/p/ec71ed4ee093)




<!-- 发送请求模块优化开始 -->
## 发送请求
### 避免不必要的重定向
在一些情况下，你可能进行了服务迁移，修改了原有的 url。这时候就可以使用重定向，把访问原网址的用户重定向到新的 url。还有是在一些登录场景下，会使用到重定向技术。

重定向分为 **301** 的永久重定向和 **302** 的临时重定向

但是不要滥用重定向，每次重定向都是有请求耗时的，建议避免过多的重定向

在定义链接地址的href属性的时候，尽量使用最完整的、直接的地址
例如：
错误示范 | 正确示范
:-: | :-: 
baidu.com | www.baidu.com | 
www.a.com/a | www.a.com/a/| 

### DNS预解析
基本我们访问远程服务的时候，不会直接使用服务的出口 IP，而是使用域名。所以请求的一个重要环节就是域名解析。这是一个比较耗时的过程，我们可以通过以下手段进行加速

#### DNS Prefetch
提前解析将要使用的DNS
```html
<link rel="dns-prefetch" href="//m1.lefile.com">
```
#### preconnect
不仅要求浏览器预解析指定域名的DNS，还需要预先链接
```html
<link rel="preconnect" href="//m1.lefile.cn/" crossorigin="anonymous" />

```
#### prefetch
要求浏览器获取整个的指定资源但是不允许浏览器对资源做预处理和执行（告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源）
```html
 <link rel="prefetch" href="//p1.lefile.cn/fes/cms/2018/11/23/4tz6y9vx1ktskvw86pxr56uw8bu7gx527894.png" crossorigin as="image" />
```
#### preload
与prefetch差不多，但它会告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源
```html
 <link rel="preload"" href="https://p1.lefile.cn/fes/cms/2018/11/23/4tz6y9vx1ktskvw86pxr56uw8bu7gx527894.png" crossorigin as="image" />
```
#### prerender
允许浏览器对资源做预处理和执行
```html
<link rel="prerender" href="https://m2.lefile.cn/global/js/jquery-1.11.1.min.js" />
```
上面的方法需要在head里面添加：
```html
<meta http-equiv="x-dns-prefetch-control" content="on">
```
> 参考文献：[前端优化 -- 预加载技术](https://blog.csdn.net/shan1991fei/article/details/80674523)

### 使用CDN
**注：此处cdn不是单独指jquery CDN这样的。而是一项加速手段**

CDN 其实是 Content Delivery Network 的缩写，即“内容分发网络”。

CDN主要功能是在不同的地点缓存内容，通过负载均衡技术，将用户的请求定向到最合适的缓存服务器上去获取内容。
与传统访问方式不同，CDN网络则是在用户和服务器之间增加缓存层，将用户的访问请求引导到最优的缓存节点而不是服务器源站点，从而加速访问速度。
使用场景| 
:-: | :-: 
网站站点/应用加速| 
视音频点播/大文件下载分发加速|
视频直播加速|
移动应用加速|
>参考文献：[CDN是什么？使用CDN有什么优势](https://blog.csdn.net/const_ly/article/details/79788728)、[《CDN 之我见》系列一：原理篇（由来、调度）](https://yq.aliyun.com/articles/577708)

### keep-alive
我们知道HTTP协议采用“请求-应答”模式，当使用普通模式，即非KeepAlive模式时，每个请求/应答客户和服务器都要新建一个连接，完成 之后立即断开连接（HTTP协议为无连接的协议）；当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服 务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接。keep-Alive优点：**更高效**，**性能更高**
> 参考文献：[浅谈HTTP Keep-Alive](http://www.360doc.com/content/18/1127/02/36293290_797464198.shtml)

### 提高浏览器并发
我们可以对某些URL的域名分散处理，比如我们的图片域名，一般用类似img.guoweiwei.com的域名，当一个页面包含20多张图片的时候，那至少有10几个请求会被阻挡，而如果我们分散到不同域名的时候，至少这20个图片请求会并发进行,网站打开速度会明显提升很多。类似的，可以对一些css/js的域名同样处理。


<!-- 服务器端响应优化开始 -->
## 服务器端响应
### 使用流
### 业务接口内部聚合
### 避免代码问题



<!-- 页面解析与处理优化开始 -->
## 页面解析和处理
### 关键渲染路径(CRP)
CRP就是首屏渲染优化，可以从以下方向出发（包含但不仅限于）：
#### 减少网络发送的数据量
1. 采用精简（移除注释，空格）、混淆（额外缩短变量名）的方式
2. gzip压缩，现在绝大部分浏览器都支持gzip压缩
3. 部分资源可考虑采用内联
4. 静态资源采用浏览器缓存，时间要长
5. 删除无用的代码
#### 减少关键资源的数量，移除非关键渲染资源
1. css默认会生成cssom。通过非关键资源拆出来，单独外联引入，增加media，则浏览器只会下载，不会解析（用到的时候解析）。但是此时额外增加了网络请求，需要权衡
2. js执行会等待cssom构建完毕，并且会阻塞dom的构建。动态引入js  
#### 减少阻塞解析的js
1. 异步加载 async
2. defer、脚本放到最底部
> 参考文献：[关键渲染路径](https://www.cnblogs.com/zechau/p/5979683.html)、[以通俗的方式理解关键渲染路径](https://segmentfault.com/a/1190000008984446)
### 避免 404
###  避免大型复杂的布局 
大型复杂的布局伴随着需要布局的元素数量很多、布局的复杂性很高，当更改样式时，浏览器会检查任何更改是否需要计算布局，以及是否需要更新渲染树。对“几何属性”（如宽度、高度、左侧或顶部）的更改都需要布局计算。布局几乎总是作用到整个文档。 如果有大量元素，将需要很长时间来算出所有元素的位置和尺寸。 
### 使用 flexbox 而不是较早的布局模型
flexbox的布局方式在渲染时 要比float、定位等手段布局的时间更短，渲染速度更快
> 参考文献：[前端优化之六：避免大型、复杂的布局和布局抖动](https://www.jianshu.com/p/493b6c3638ff)
### 渲染层合并
合成层好处:
1. 提升动画效果
2. 减少绘制区域
3. 合理管理合成层

合成层的方法：will-change 设置为 opacity、transform、top、left、bottom、right 可以将元素提升为合成层。

对于那些目前还不支持 will-change 属性的浏览器，目前常用的是使用一个 3D transform 属性来强制提升为合成层。





<!-- 页面渲染及运行时优化开始 -->
## 页面渲染及运行时
### 避免强制同步布局
首先是执行JavaScript脚本，然后是样式计算，然后是布局。但是，我们还可以强制浏览器在执行JavaScript脚本之前先执行布局过程，这就是所谓的强制同步布局。
1. 避免代码出现在不合适的位置
2. 批量化操作（批量读取元素样式属性）

还有一些更为严重的情况，例如在循环中不断触发强制同步布局（又叫抖动布局）,对此我们可以如下：
```javascript
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
```
如果是轮询不断的触发 我们可以使用RAF（requestAnimationFrame）API
```javascript
window.requestAnimationFrame(() => {
    var $ele = document.getElementById('main');
    var height = $ele.offsetHeight;
    // ……
});
```

### 长列表优化
#### 使用Virtual List机制
它可以保证在列表元素不断增加，或者列表元素很多的情况下，依然拥有很好的滚动、浏览性能。它的核心思想在于：只渲染可见区域附近的列表元素。
大致思路：
1. 监听页面滚动或者其他导致视口变化的事件
2. 滚动时根据滚动的距离计算需要展示的列表项
3. 将列表项中展示的数据与组件替换成当前需要展示的内容
4. 修改偏移量到对应的位置
#### 实现原生Virual Scroller
virtual-scroller(一个html标签)是未来 Web 平台的一个潜在特性，是layered API 项目的一部分，用于将 JavaScript 对象集映射到 DOM 节点上，并且只渲染当前可见的 DOM 节点，其余部分为“虚拟”的。在 feed 流、图片库等很多场景下非常有用
```html
<script type="module">
    import "std:virtual-scroller";
</script>

<virtual-scroller>
    <div>item 1</div>
    <div>item 2</div>
    <div>item 3</div>
    <div>item 4</div>
    ……
    <div>item 1000</div>
</virtual-scroller>
```
> 参考文献：[Web 长列表的救星？谷歌推出 Virtual Scroller](https://blog.csdn.net/weixin_34357887/article/details/86718440)、[前端虚拟列表的实现](https://blog.csdn.net/Sourcemyx/article/details/83142688)、[如何不择手段提升scroll事件的性能](https://zhuanlan.zhihu.com/p/30078937)
### 避免JS占用时间过长
由于渲染线程和 JavaScript 线程之间互斥，所以 JavaScript 执行占用时间过长会导致无法及时渲染，可以通过如下方法进行优化：
1. 任务分解

错误示范：
```javascript
document.body.innerHTML = '';
for(var i = 0; i < 1e5; i++) {console.log(1+1)}
```
正确示范：
```javascript
document.body.innerHTML = '';

let step = 0;
function subtask() {
    if (step === 1e5) {
        return;
    }
    window.requestAnimationFrame(function () {
        for(var i = 0; i < 1e4; i++) {step++; console.log(1+1)}
        subtask();
    });
}
subtask();
```
我们把 10万次分散为十个 1万次的子任务，虽然同样执行了 10万次计算，但是页面迅速被清空了。
2. 延迟执行
* 懒执行
* 延后执行
3. 并行计算（ Web Worker）
```javascript
// index.js
const worker = new Worker('worker.js');
worker.addEventListener('message', function (e) {
    console.log(`result is ${e.data}`);
}, false);
worker.postMessage('start');

// worker.js
self.addEventListener('message', function (e) {
    if (e.data === 'start') {
        // 一些密集的计算……
        self.postMessage(result);
    }
}, false);
```
> 参考文献：[JS运行机制](https://www.jianshu.com/p/62746fc1fca8)、[优化js脚本设计，防止浏览器假死](https://www.cnblogs.com/dinglinyong/p/7155102.html)、[加快javascript代码运行 —— 避免长时间运行](https://blog.csdn.net/weixin_30695195/article/details/97345789)

### 减少不必要的重定向
当页面发生了重定向，就会延迟整个HTML文档的传输。在HTML文档到达之前，页面中不会呈现任何东西，也没有任何组件会被下载。所以一些不是必要的重定向尽可能的减少
### DOM优化
#### 减少DOM数量
在HTML生成DOM树的时候，DOM数量越少，HTML渲染速度越快
#### 减少DOM操作
每次操作DOM，都会带来repaint和refolw
#### 批量处理DOM操作：
将元素移除DOM Tree，修改完后再放回去，因此只会调用一次repaint或者reflow
#### 批量修改样式
改变classname，或者用css()，原理和批量处理js一样
#### 尽量不要使用tabel布局
tabel中某个元素改变了，整个tabel就会reflow.如果非用不可，可以设置tabel-layout:auto或者tabel-layout：fixed,让tabel一行一行的渲染，限制渲染范围
#### 尽量不要使用css表达式
每计算一次就会触发reflow一次
#### string用数组join连接
在js中使用“+”来拼接字符串效率比较低，因为每次运行都会开辟新的内存并生成新的字符串变量，然后将拼接的字符串赋值给新变量。使用数组的话效率就高一点
#### css选择符优化
因为css是从右向左解析的，根据这个规则，尽量使右边的样式唯一
### 事件代理/事件委托
1. 事件管理的函数变少了
2. 添加和修改元素时候可以不需要因为元素的改动而修改事件绑定
3. JS和DOM节点之间的关联变少了,减少\因循环引用而带来的内存泄漏发生的概率。
4. 页面初始化时候不会因为没有加载dom导致后面即使添加了dom，事件也不生效
> 参考文献：[简述JS中的事件委托和事件代理](https://www.jianshu.com/p/a77d8928c5c9)

### 防抖和节流
#### 防抖
当持续触发事件时，一直到设定事件触发时间的时间段都没有再次操作时候，才会触发事件，应用场景：模糊查询，根据输入内容提示相关完整内容
```javascript
// 防抖
function debounce(fn, wait) {    
    var timeout = null;    
    return function() {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}
// 处理函数
function handle2() {    
    console.log("防抖函数"); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle2, 1000));
```
#### 节流
当持续触发事件时，保证一定时间段内只调用一次事件处理函数。应用场景：节流、防止短时间多次提交操作
```javascript
var throttle = function(func, delay) {            
    var timer = null;            
    return function() {                
        var context = this;               
        var args = arguments;                
        if (!timer) {                    
            timer = setTimeout(function() {                        
                func.apply(context, args);                        
                timer = null;                    
            }, delay);                
        }            
    }        
}
let func = function() {            
    console.log("节流函数");        
}
window.addEventListener('scroll', throttle(func, 1000));
```
_tips：节流和防抖应用较为广泛，以上应用场景仅是作为示例，具体场景根据业务需求确定，主要解决的问题是：事件处理函数调用的频率无限制，会加重浏览器的负担或者后台交互多次触发等问题导致的用户体验非常糟糕。_

### 及时回收内存/垃圾收集(内存泄漏知识点)
常见内存泄漏的情况：
#### DOM/BOM 对象泄漏
##### 从外到内执行appendChild。这时即使调用removeChild也无法释放
```javascript
var parentDiv = document.createElement("div"); 
var childDiv = document.createElement("div"); 
document.body.appendChild(parentDiv); 
parentDiv.appendChild(childDiv);
```
解决办法：从内到外执行appendChild
##### 给DOM对象添加的属性是一个对象的引用
```javascript
var testObject = {}; 
document.getElementById('idname').property = testObject; 
```
解决办法：
```javascript
window.onunload=function(){
    document.getElementById('idname').property = null;         //释放内存
};
```
##### DOM对象与JS对象相互引用
```javascript
function testObject(element) { 
this.elementReference = element;    // 为testObject(js)对象的属性绑定element(DOM)对象
element.property = this;      // 为element(DOM)对象的属性绑定testObject(js)对象
} 
new testObject(document.getElementById('idname'));
```
解决办法：
```javascript
document.getElementById('idname').property = null;
```
#### script 中存在对DOM/BOM 对象的引用导致
#### Javascript 对象泄漏
##### 意外的全局变量   
```javascript
function foo(arg) {
    bar = "aaaaa";
}
 
实际上等价于
function foo(arg) {
    window.bar = "aaaaa";
}
```
解决办法： 为了防止这种错误的发生，可以在你的 JavaScript 文件开头添加 **'use strict';** 语句

##### 定时器setTimeout setInterval

当不需要setInterval或者setTimeout时，定时器没有被**clear**，定时器的回调函数以及内部依赖的变量都不能被回收，造成内存泄漏。比如：vue使用了定时器，需要在**beforeDestroy**中做对应销毁处理。js也是一样的。

##### 如果在mounted/created 钩子中使用了$on，需要在beforeDestroy 中做对应解绑($off)处理
##### 死循环或者大量重写一个属性


#### 通常由闭包导致，比如事件处理回调，导致DOM对象和脚本中对象双向引用，这个时常见的泄漏原因
```javascript
function fn1(){
    var n=1;
    function fn2(){//在加一个fn2当他的子集
        alert(n);
    }
    return fn2(); 
    //return出来后 他就给 window了所以一直存在内存中。因为一直在内存中，在IE里容易造成内存泄漏
}
fn1();
```
解决办法 ：尽量书写的时候，避免这种情况。 
### 性能更好的API
1. 选择器:优先级 id>class>元素>相邻选择器>子选择器>后代选择器>通配符选择器>属性选择器>伪类选择器
2. requestAnimationFrame来替代setTimeout和setInterval
3. 使用IntersectionObserver来实现图片可视区域的懒加载
4. 使用web worker
> 参考文献：[前端干货知识—性能更好的API](http://bbs.tianya.cn/post-414-69724-1.shtml)
### 加快解析以及渲染树构建
包含 但不仅限于：
1. 简化选择器
2. 避免使用耗费性能过多的属性 如：**border-radius**、**box-shadow**、**opacity**、**transform**、**filter**、**position: fixed**等
3. 使用先进的布局方式，如flex

也包括如静态资源优化、cdn分发、页面渲染性能的优化等，在其他模块有描述，这里不再赘述
> 参考文献：[前端阶段性总结（二）：页面渲染机制与性能优化](https://segmentfault.com/a/1190000016458627?utm_source=tag-newest)、[浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#Style_Computation)
### reflow/repaint
repatint:重绘是指css样式的改变，但元素的大小和尺寸不变，而导致节点的重新绘制。任何对元素样式，如background-color、border-color、visibility 等属性的改变。css 和 js 都可能引起重绘。

reflow : 回流（reflow）是指元素的大小、位置发生了改变，而导致了布局的变化，从而导致了布局树的重新构建和渲染。回流 触发的情况：1、**dom元素的位置和尺寸大小的变化**、2.**dom元素的增加和删除**、3.**伪类的激活**、4.**窗口大小的变化**、5.**增加和删除class样式**、6.**动态计算修改css样式**;

下面为触发reflow/repaint的详细style
#### 能触发回流的样式
-|-|-|
:-: | :-: | :-: 
width | top | text-align
height | bottom| overflow-y
padding|left|font-weight
margin|right|overflow
display|position|font-family
border-width|float|line-height
border|clear|vertival-align
min-height|white-space|font-size
#### 能触发重绘的样式
-|-|-|
:-: | :-: | :-: 
color|background|outline-color
border-style|background-image|outline
border-radius|background-position


### 图片懒加载
图片的懒加载对于其他的文件型懒加载也有一些不同之处，我们可以随着浏览器不断的滚动做对应的懒加载，诸如一些图片博客网站、长列表等的，图片的懒加载核心在于尽量只加载用户正在浏览或者即将会浏览到的图片。实现上来说最简单的就是通过监听页面滚动，判断图片是否进入视野，从而真正去加载图片。下面是一个图片懒加载的demo
```javascript
// 加载函数还可以用 Intersection Observer API 这样更简单，但是考虑兼容性最好还是不要用
function loadIfNeeded($img) {
    // 获取元素的位置，判断是否进入试图
    const bounding = $img.getBoundingClientRect();
    if (
        // 去掉隐藏图片 提高性能
        getComputedStyle($img).display !== 'none'
        && bounding.top <= window.innerHeight
        && bounding.bottom >= 0
    ) {
        // 去掉lazyImg Class 防止重复执行
        $img.src = $img.dataset.src;
        $img.classList.remove('lazyImg');
    }
}

// 这里使用了throttl，可以从上面防抖/节流的模块复制
const lazy = throttle(function () {
     // 获取所有lazyimg
    const $imgList = document.querySelectorAll('.lazyImg');
    // 如果没有需要加载的图片时候移除监听，增加性能
    if ($imgList.length === 0) {
        document.removeEventListener('scroll', lazy);
        window.removeEventListener('resize', lazy);
        window.removeEventListener('orientationchange', lazy);
        return;
    }
    // 循环所有需要加载的节点  判断是否需要加载
    $imgList.forEach(loadIfNeeded);
}, 200);
window.onload = function(){
   
    // 监听事件
    document.addEventListener('scroll', lazy);
    window.addEventListener('resize', lazy);
    window.addEventListener('orientationchange', lazy);
}
```
使用方法：img标签src为loading图片（或者基于原图生成的体积小、清晰度低的图片）的地址，当然也可以不要，data-src为图片真实路径，对需要的懒加载的图片增加.lazyImg的class
需要注意的：

* 首屏可以不需要懒加载，对首屏图片也使用懒加载会延迟图片的展示
* 设置合理的占位图，避免图片加载后的页面“抖动”。
* JavaScript 不可用时的 backup。

> 参考文献：[原生js实现图片懒加载（lazyLoad）](https://zhuanlan.zhihu.com/p/55311726)、[js实现图片懒加载原理](https://blog.csdn.net/w1418899532/article/details/90515969)、[IntersectionObserver API 使用教程
](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)




<!-- 页面静态资源优化开始 -->
## 页面静态资源优化
页面静态资源优化从整体上来说都是类似的，只有两个目标：

1. 静态资源最小化
2. 静态资源加载如何更快

基于以上的两个目标，制定出下面几个大方向（包括但不限于）：

1. 减少不必要的请求
2. 减少包体大小
3. 降低应用资源时的消耗
4. 利用缓存

### 减少不必要的请求

核心是希望能够减少请求的数量，因为浏览器对同源请求有并发上限的限制。请求过多可能会导致请求被排队了。同时，TCP/IP 的拥塞控制也使其传输有慢启动（slow start）的特点，连接刚建立时包体传输速率较低，后续会渐渐提速。因此，发送过多的“小”请求可能也不是一个很好的做法。减少不必要的请求主要分为几个方向：

资源|优化方向|
|:-:|:-:|
|不需要使用的内容| 不请求
|可以延迟加载的内容|按需加载|
|可以合并的资源|资源合并|

### 减少包体大小
包体大小对性能也是有直接影响的。显然同样速率下，包体越小，传输耗时越低，整体页面加载与渲染的性能也会更好。减少包体大小主要分为几个方向：

1. 使用适合当前资源的压缩技术压缩代码
2. 减少包不需要的代码，删除页面无用代码
3. 组件公共化
4. Tree Shaking(摇树优化，在保证代码运行的前提下，摇掉无用的代码)
### 降低应用资源时的消耗
有些时候，浏览器去执行或使用资源的也是有消耗的。例如在 JavaScript 执行了一段 CPU 密集的计算，或者进行频繁的 DOM 操作，这些都会让 JavaScript 的执行变成影响性能的一大问题。

### 缓存
缓存的好处不言而喻，能够让资源在最短的时间内加载、解析，缓存在很多时候会是一个解决性能问题的非常有效的手段。

下面就各种资源的优化进行分析
### JS
#### 减少包体大小
主要是通过webpack等工具打包时候进行一系列优化，进而达到减少包体大小目的，常见的做法如：代码压缩（UglifyJS）、gzip、Tree Shaking等做法，
Tree Shaking其本质是通过检测源码中不会被使用到的部分，将其删除，从而减小代码的体积。来一个例子说明：
```javascript
// 模块 A
export function add(a, b) {
    return a + b;
}

export function minus(a, b) {
    return a - b;
}
// 模块 B
import {add} from 'moduleA.js';
console.log(add(1, 2));
```
可以看到模块B引用了A模块，但是只用了其中的add方法，也就是说打包minus并没有什么作用，所以完全可以不用打包minus这个方法，可以通过 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 这个工具，来查看打包代码里面各个模块的占用大小。
> 参考文献：[webpack tree shaking实现方式](https://webpack.docschina.org/guides/tree-shaking/)
#### 减少不必要的请求
这个是一个在文档中提了很多遍的点，无外乎下面几点，不再赘述：
1. 代码拆分（code split）与按需加载
2. 代码合并
#### 加快解析和执行
除了js下载需要耗时外，脚本的解析与执行也是会消耗时间的。一个 JavaScript 文件，即使内部没有所谓的“立即执行函数”，JavaScript 引擎也是需要对其进行解析和编译的。甚至有时候加载同样字节数的js对性能的影响可能会高于图片，因为图片的处理可以放在其他线程中并行执行，所以换一个角度来说，**删除不必要的代码**，对于页面打开速度也是有好处的，对于一些单页应用，在加载完核心的 JavaScript 资源后，可能会**需要执行大量的逻辑**。如果处理不好，可能会出现JavaScript线程长时间执行而阻塞主线程的情况。
####  缓存
缓存已经说过很多，这里扩展一下

如何减少 webpack 编译不当带来的缓存失效的方案：
1. 使用 Hash 来替代自增 ID
2. 将 runtime chunk 单独拆分出来
3. 使用 records
> 参考文献：[浅谈Webpack 持久化缓存实践](https://www.jb51.net/article/136937.htm)

### CSS
#### 关键渲染路径优化
在性能优化上，其实我们会更关注关键渲染路径（CRP 指优先显示与当前用户操作有关的内容通常就是首屏），而不一定是最快加载完整个页面。做法就是将关键CSS的内容通过 \<style\> 标签内联到 \<head\> 中，然后异步加载其他非关键CSS。这样对于关键路径的渲染可以减少一次 RTT (Round-Trip Time)。用户可以更快看到一些页面初始的渲染结果。
#### 优化资源请求
与 JavaScript 类似，我们的 CSS 也是可以按需加载的。
1. 按需加载
2. 合并文件(减少请求数)
3. 请求的优先级排序（根据文件重要性进行请求排序）
在响应式的页面中，可能涉及media，即在可能在400px的页面下只需要max400.css,而不需要max500.css，针对这个问题，link 标签上其实有一个 media 属性来处理媒体查询下的加载优先级。浏览器会优先下载匹配当前环境的样式资源，相对的，其他非匹配的优先级会下降
```html
<link rel="stylesheet" href="a.css" media="all" />
<link rel="stylesheet" href="max500.css" media="(max-width: 500px)" />
<link rel="stylesheet" href="max400.css" media="(max-width: 400px)" />
```
这样拆分后，当页面大于400px时，max500.css 的优先级会降低，注：只是降低并非不加载

4. 慎用 @import
CSS 提供了一个 @import 语法来加载外部的样式文件。这样浏览器只有当下载了 index.css 并解析到其中 @import 时，才会再去请求 other.css。
5. 谨慎对待js脚本文件位置
#### 减少包体大小
老生长谈了，和js差不多
1. 压缩（uglifycss）
2. gzip
3. 选择合适的兼容性polyfill支持，避免过于繁重perfixer。
#### 缓存（webpack MiniCssExtractPlugin）
### Image
#### 优化请求
1. 优化请求
和css、js一样，尽可能的合并文件，针对图片又有所不同，即我们不可能将所有的图片全部可病到一起，这样不但不是优化，而是自取灭亡，那么怎么优化请求呢？我们可以做的是将一些小型icon合并成为雪碧图，雪碧图的核心原理在于设置不同的背景偏移量，来展示大图中对应的图标部分。
2. 减少图片大小
针对一般图片我们减少图片的方式大多数是在文件本身进行一些操作，在制作图片时候尽量**尽可能减少图层**、**选择合适的大小/分辨率**，在保存图片时候尽可能**压缩图片质量**，一般来说80以上是完全没有问题的，甚至在60-80也不会有什么影响，在图片格式上，我们尽量选取如：webp、svg、jpg，有一些需要使用手机或者相机拍出来的图片我们应该**删除图片多余的信息**。webpack中可以使用image-webpack-loader进行压缩
3. 使用base64
严格来说这点应该属于优化请求下面，主要应用于一些比较重要的地方（首屏或者一些icon），因为当浏览器解析时候遇到base64图片就不会在发起请求，而是直接解析 base64 字符串，但是并不建议整个页面全部都使用base64进行处理，因为这种方式图片体积会增大三分之一，并且不利于复用独立的文件缓存。
#### 缓存
图片也是可以缓存的。

### Font
#### 使用font-display实现fout(不是很建议，因为这是一个新属性，可能会有兼容问题)
[支持的浏览器](https://caniuse.com/#search=font-display)

在说这个之前先解释下什么是fout？

FOUT：在字体加载过程中使用默认的系统字体，字体加载完后显示加载的字体，如果超过了FOIT(3s)字体还没加载，则继续使用默认的系统字体。

在@font-face中设置 font-display: swap，他可以让FOIT的默认行为变为FOUT
```css
@font-face {
    font-family: 'Samplefont';
    src: url(/static/samplefont.woff2) format('woff2'),
         url(/static/samplefont.woff) format('woff');
    font-display: swap;
}
```
#### 使用内联字体
和image，base64差不多，我们可以将字体文件转为base64的字符串，设置到@font-face里的src属性上。
#### 使用CSS Font Loading API（同样有兼容性问题，并且很严重，只作为一个未来可能使用的优化）
[支持的浏览器](https://caniuse.com/#feat=font-loading)
> 参考文献：[深入理解CSS @font-face性能优化](https://www.cncnzz.com/ketang/10692.html)、[字体加载策略大全](https://www.w3cplus.com/css/comprehensive-webfonts.html)、[CSS @font-face性能优化](https://www.codercto.com/a/65035.html)
### Video
视频作为一种重要的媒体形态，在网站中使用可以提高网站内容的丰富性，但同时对网络加载来说也是一个负担。所以会出现一些如下针对视频的优化。大部分和image差不多，但也有一些区别
####  使用合适的视频格式
不同的视频编码格式，其数据大小也大都不同。目前在HTML5 Video中常用的格式为MPEG-4。除了MPEG-4之外，还支持一种叫WebM的新的视频格式，不过相对的兼容性较差，不过没关系，我们可以用多个\<source\>。
```html
<video>
    <source src="a.webm" type="video/webm">
    <source src="a.mp4" type="video/mp4">
</video>
```
#### 视频压缩
和图片一样视频也有压缩，视频压缩工具推荐HandBrake、Freemake、Hybrid；
#### 移除不必要的音轨信息
在某些特定场景下，本身就是不需要声音的，所以可以将video标签设置为muted
```html
<video controls muted>
   <source src="a.mp4" type="video/mp4">
   <source src="b.ogg" type="video/ogg">
   Your browser does not support the video tag.
</video> 
```
####  使用“流”
尝试让浏览器使用“流”或者小分片的方式来播放你的视频，例如常用的 HLS (HTTP Live Streaming) 技术。简单来说，使用 HLS 技术，你的视频会包含一个 .m3u8 的索引文件和一系列包含播放内容的 .ts 分片。浏览器通过不断下载一小段的分片来进行视频播放，避免了完整视频下载的流量消耗。

> 参考文献：[前端获取视频流并播放](https://blog.csdn.net/weixin_30030167/article/details/98397442)

>静态资源缓存参考文献：[webpack实现静态资源缓存的那点事](https://www.cnblogs.com/wonyun/p/8146139.html)



<!-- 预加载模块优化开始 -->
## 预加载
### 预加载技术
```html
    <!-- 预先解析指定域名的DNS -->
    <link rel="dns-prefetch" href="https://m1.lefile.cn/" />

    <!-- 不仅要求浏览器预解析指定域名的DNS，还需要预先链接,-->
    
    <link rel="preconnect" href="https://m1.lefile.cn/" crossorigin="anonymous" />

    <!-- 预获取，在Preconnect基础上更进一步，它要求浏览器获取整个的指定资源但是不允许浏览器对资源做预处理和执行--> 
    <!-- prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源 -->
    <link rel="prefetch" href="https://p1.lefile.cn/fes/cms/2018/11/23/4tz6y9vx1ktskvw86pxr56uw8bu7gx527894.png" crossorigin as="image" />
    
    <!-- preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源 -->
    <link rel="preload"" href="https://p1.lefile.cn/fes/cms/2018/11/23/4tz6y9vx1ktskvw86pxr56uw8bu7gx527894.png" crossorigin as="image" />

    <!-- 允许浏览器对资源做预处理和执行 -->
    <link rel="prerender" href="https://m2.lefile.cn/global/js/jquery-1.11.1.min.js" />
```
#### 在webpack中使用预请求
预加载可以配合 code split 来使用，可以在降低初始加载量的情况下，尽量保证按需加载时的体验
```javascript
// prefetch
import(/* webpackPrefetch: true */ './sub1.js');

// preload
import(/* webpackPreload: true */ './sub2.js')
```
> 参考文献：[前端优化——预加载篇](https://blog.csdn.net/u011215669/article/details/80526530)、[在webpack中使用prefetch/preload](https://www.imooc.com/article/253674)、[使用Resource Hint提升页面加载性能与体验
](https://juejin.im/post/5b4b66f0f265da0f9155feb6)

### 视频预加载
#### preload 
video preload参数

|值|作用|
|-|-|
|none|不载入视频（即不预加载）|
|meta|载入元数据（时长、尺寸、文字轨道）|
|auto|加载整个视频|
```html
<video id="video" preload="metadata" src="file.mp4" controls></video>
```
#### preload link 
```html
<link rel="preload" as="video" href="https://cdn.com/small-file.mp4">
<video id="video" controls></video>
<script>
  video.src = 'https://cdn.com/small-file.mp4';
  video.play().then(_ => {
      
  });
</script>
```
#### 自定义buffer
```html
<video id="video" controls></video>

<script>
    const mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen, { once: true });

    function sourceOpen() {
        URL.revokeObjectURL(video.src);
        const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp09.00.10.08"');

        // Fetch beginning of the video by setting the Range HTTP request header.
        fetch('file.webm', { headers: { range: 'bytes=0-567139' } })
            .then(response => response.arrayBuffer())
            .then(data => {
                sourceBuffer.appendBuffer(data);
                sourceBuffer.addEventListener('updateend', updateEnd, { once: true });
            });
    }

    function updateEnd() {
        // Video is now ready to play!
        var bufferedSeconds = video.buffered.end(0) - video.buffered.start(0);
        console.log(bufferedSeconds + ' seconds of video are ready to play!');

        // Fetch the next segment of video when user starts playing the video.
        video.addEventListener('playing', fetchNextSegment, { once: true });
    }

    function fetchNextSegment() {
        fetch('file.webm', { headers: { range: 'bytes=567140-1196488' } })
            .then(response => response.arrayBuffer())
            .then(data => {
                const sourceBuffer = mediaSource.sourceBuffers[0];
                sourceBuffer.appendBuffer(data);
                // TODO: Fetch further segment and append it.
            });
    }
</script>
```
>参考文献： [Fast Playback with Video Preload
](https://developers.google.com/web/fundamentals/media/fast-playback-with-video-preload#video_preload_attribute)、[preload](https://www.w3.org/TR/preload/)






## 其他
### 打包组件成复合文本
把页面内容打包成复合文本就如同带有多附件的Email，它能够使你在一个HTTP请求中取得多个组件 

### 减少iframe
iframe 中的文件需要单独请求，这就意味着如果页面a中有一个jqury，a通过iframe使用了页面b，而b中也使用了jquery 则会请求两次jquery。并且iframes会阻塞页面加载

有人可能希望 iframe 会有自己独立的连接池，但不是这样的。绝大部分浏览器，主页面和其中的 iframe 是共享这些连接的。这意味着 iframe 在加载资源时可能用光了所有的可用连接，从而阻塞了主页面资源的加载。如果 iframe 中的内容比主页面的内容更重要，这当然是很好的。但通常情况下，iframe 里的内容是没有主页面的内容重要的。这时 iframe 中用光了可用的连接就是不值得的了。一种解决办法是，在主页面上重要的元素加载完毕后，再动态设置 iframe 的 SRC。


### 避免空的src
> 参考文献 ： [为什么前端要避免空的src](https://blog.csdn.net/Panda_m/article/details/78456358)

### CSS 放到顶部,JS 放到底部
### favicon.ico要小而且可缓存
### 减少flash

# 其他更多优化ing




> [Yahoo！团队经验：网站性能优化的34条黄金法则](https://www.cnblogs.com/xuepei/p/9144479.html)