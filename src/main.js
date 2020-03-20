import Vue from 'vue'
import App from './App.vue'

//vue项目三剑客
import http from "@/http"
import router from "@/router"
import store from "@/store"

//公共样式 mock数据 表单验证
import "@/mock"
import "@/common/stylus/style.styl"
import "@/common/stylus/transition.styl"
import "@/util/validate.js"

//注册vue的全局组件
import HeaderTop from "components/HeaderTop/HeaderTop.vue"
Vue.component("HeaderTop",HeaderTop)

//为组件扩展的属性
Vue.prototype.$http = http;
Vue.prototype.bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
