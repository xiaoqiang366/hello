# 观察者模式理解和实践

最近在看观察者模式，于是乎就结合vue写了个小例子，算是实践一下观察者模式吧 [实例地址](https://aoxiaoqiang.github.io/hello/dist/)。

观察者模式主要包含 **目标对象** 和 **观察者** 两个基类。目标提供维护观察者的一系列方法，观察者提供更新接口。具体观察者和具体目标继承各自的基类，然后具体观察者把自己 **注册** 到具体目标里，在具体目标发生变化时候，**调度观察者的更新方法**。

个人觉得这里需要注意几个点:

1. 观察者需要将自己注册到目标中，这样才能使两者产生依赖关系。这样在目标对象发生变化的时候才能够通知到观察者。
2. 观察者要有处理通知的能力，也就是说观察者需要有一个能够处理消息的方法(Function)。

![观察者模式](https://images2015.cnblogs.com/blog/555379/201603/555379-20160313183429007-1351424959.png)

关于观察者模式还需要注意的一点就是 **观察者模式** 和 **发布/订阅模式** 的区别，[这里](https://github.com/aoxiaoqiang/exercise17)有几个比较直观的对比便于理解。

## 关于项目

项目是通过 vue 和 Element UI组件库通过观察模式的方式比较直观的展示了目标对象和观察者之间的关系。下面是一些简要的说明:

+ Course: 课程(目标对象)
+ StudentList -> Course 课程有一个学生列表的属性用于存储订阅课程的学生。
+ Student: 学生(观察者)
+ 添加课程(`new Course()`), 也就是创建目标对象, 目标对象可以有一个也可以有多个。
+ 添加学生(`new Student`), 创建观察者。
+ 学生订阅课程, 也就是观察者把自己注册到目标对象的过程。
+ 实例中还添加了一个学生取消订阅课程的功能，取消订阅后，学生将不再收到取消的课程通知；如有需要可以重新订阅课程。

```javascript
const c = new Course('《JavaScript高级程序设计》'); // 创建课程(目标)

// 学生 s 处理消息的方法
const msgHandle = function (data) {
  // 处理接收到的 data 数据
  // 这里根据也业务需要进行处理，能拿到通知数据就可以自己玩儿了 -_-!
}
const s = new Student('张小明', msgHandle); // 创建学生(观察者)

// 订阅课程(观察者将自己注入到目标中)
s.subscribe(c);
// 发送通知到该课程的每个订阅者(发送通知),此时s就会收到有关c课程的消息通知。
// 之s所以能够收到消息是因为c.notify会遍历每个订阅者并把消息内容传递给每个订阅者, 让订阅者根据自己的需要处理(msgHandle)收到的消息。
c.notify('课程更新啦~');
```

## 项目运行

运行前确保安装了[node](https://nodejs.org/zh-cn/download/) 和 [Vue](https://cn.vuejs.org/index.html) 提供 [官方的CLI](https://github.com/vuejs/vue-cli), 具体配置参考[官网说明](https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/README.md#%E4%BB%8B%E7%BB%8D)。

```shell
npm install -g @vue/cli
```

相关命令，项目中我用的`yarn`(和`npm`类似)的方式安装模块。如果没有`yarn`使用`npm`也是ok的。

```shell
yarn
yarn serve
yarn build
build:dev
```

```shell
# 安装依赖模块
npm install
# 本地运行
npm run serve
# 编译打包(注意根据需要修改vue.config.js中的配置)
npm run build
npm run build:dev
```