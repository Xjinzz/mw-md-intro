### 和渲染无关的数据
#### 使用 Object.freeze 进行冻结

vue中data的数据默认便会进行双向数据绑定，若是将大量的和渲染无关的数据直接放置在data中，将会浪费双向数据绑定时所消耗的性能，将这些和渲染无关的数据进行抽离并配合Object.freeze进行处理

dataSource（一些数据源enum之类的），应该抽取到一个单独提取一个外部enum.js或者constants.js文件作为配置文件，无论如何都是固定且不会修改的数据，应该使用Object.freeze进行包裹，既可以提高性能还可以将固定的数据抽离，一些下拉框前端固定的数据也建议此操作

```
const columnList = Object.freeze([
  { title: '姓名', key: 'name', align: 'center' },
  { title: '性别', key: 'gender', align: 'center' }
])
```
> 需要注意的是 Object.freeze() 冻结的是值，这时仍然可以将变量的引用替换掉，还有确保数据不会变才可以使用这个语法，如果要对数据进行修改和交互，就不适合使用冻结了。

#### Modal框的控制

如果一个页面有两个及以上的modal弹窗，若是每一个弹框都设置一个对应的变量来控制其显示，则会导致变量数量比较冗余和命名困难，而且可能页面会同时存在多个弹窗，可以使用一个变量来控制同一页面中的所有Modal弹框的展示  
比如某个页面中存在三个不关联的Modal弹框（就是不会有需要多个并存的）
```
// bad
// 每一个数据控制对应的Modal展示与隐藏
data() {
  return {
    modal1: false,
    modal2: false,
    modal3: false,
  }
}

// good
// 当modalType为对应的值时 展示其对应的弹框
data() {
  return {
    modalType: '' // modalType值为 modal1，modal2，modal3
  }
}
```
#### debounce/throttle
例如远程搜索时需要通过接口动态的获取数据，或者滚动页面监听时候，若是每次都直接响应，是浪费带宽、性能的

```
/**
* @description 节流，一定时间内只执行一次
* @param {Fcuntion}} 要节流的函数
* @param {Number} wait 节流等待时间
* @example 
*      debounce(function(){},100)
*/
debounce(fn, wait = 500) {
  var timeout = null;    
  return function() {        
      if(timeout !== null)   clearTimeout(timeout);        
      timeout = setTimeout(fn, wait);    
  }
},


/**
* @description 防抖，操作间隔多久之后在调用，如果有调用则重置时间
* @param {Fcuntion}} 要防抖的函数
* @param {Number} wait 防抖等待时间
*/
throttle(func, delay = 500) {
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
},
```
#### 路由组件传参
> 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。  

使用props解耦
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
#### Vue生命周期顺序
(父为home，子为list)

加载时父子组件的加载顺序

```
home beforeCreate --> home created --> home beforeMount --> list created --> list beforeMount --> list mounted
```

销毁时父子组件的销毁顺序

```
home beforeDestroy --> list beforeDestroy --> list destroyed --> home destroyed

```

#### hook

通过@hook监听子组件的生命周期

```
<list @hook:mounted="listMounted" />
```

#### 策略模式

策略模式的使用，避免过多的if else判断，也可以替代简单逻辑的switch

```
const formatDemandItemType2 = (value) => {
  const obj = {
    1: 'a',
    2: 'b',
    3: 'c',
  }
  
  return obj[value]
}
```
#### 职责单一
任何时候尽量是的一个函数就做一件事情，而不是将各种逻辑全部耦合在一起，提高单个函数的复用性和可读性


#### dom attr超过三个需要换行书写

```
<template>
  <VueButton
    class="icon-button go-up"
    icon-left="keyboard_arrow_up"
    v-tooltip="$t('org.vue.components.folder-explorer.toolbar.tooltips.parent-folder')"
    @click="openParentFolder"
  />
</template>
```

#### 字符实体
html中展示一些如<，>,&等字符时，使用字符实体代替

#### 文件命名
1. 组件：全部使用大驼峰命名，例：TestModel
2. 业务：vue使用小驼峰命名，例：searchPage
3. 常量：全大写（业务文件中，一般情况下不许可出现常量，统一定义到contant文件）
4. css变量/props使用小驼峰
4. 更多...

#### 重要方法注释统一使用jsdoc方法（具体百度）
#### vue关键api位置
```
- components(必须)
- props（必须）
- data（必须）
- computed（必须）
- created
- mounted
（周期必须按照顺序）
- metods
- filter
- watch
```
#### github提交规范（如果github name不是自己名字的，提交需要携带名字）
FEAT :新功能 
FIX :修复bug  
DOCS : 文档改变
STYLE : 代码格式改变
REFACTOR :某个已有功能重构
PREF :性能优化
TEST :增加测试/测试用例
REVERT: 撤销上一次的 commit 
CHORE: 改变构建流程、或者增加依赖库、工具等
INIT：新建库
BUILD :改变了build工具 如 grunt换成了 npm
#### 严格禁止除了contant外出现写死的常量
#### 严格禁止setInterval,如果需要轮询使用settimeout调用本身，如果需要使用按帧渲染使用requestAnimationFrame,且关闭后必须清空！！

其余后期更新，待更新部分（store\service\enum\define使用规范）