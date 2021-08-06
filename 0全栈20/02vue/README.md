1、全家桶原理
2、手写vue-router、vuex


一、为什么使用vue.use（）方法？他做了什么

1、vue-router是插件，使用插件必须使用vue.use（）方法
2、this.$router可以访问到router方法；是在vue.proptotype.$router的原型加方法
3、实现并注册两个全局组件
Vue.use(VueRouter)

vue-router原理---url变化为什么内容会跟着变化？


vuex的设计理念
1、集中式的状态管理；保证状态可预测

state：状态、数据
mutations 更改状态函数
actions 异步操作
store 包含以上概念的容器






