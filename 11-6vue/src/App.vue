<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// 父子组件传值方法汇总
//1、props和$emit（父子组件通讯）
//2、ref和$refs（父子组件通讯）
//3、$parents和$children（父子组件通讯）
//4、$attrs和$listeners(多层父子组件传值)
//5、provide和inject(多层父子组件传值)
//6、eventBus--$on、$off、$emit、$once(非关系型组件通讯)

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
