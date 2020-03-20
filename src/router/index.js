import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import routes from "@/routes";
import store from "@/store";
import {AUTOLOGIN} from "@/store/mutation_types.js"

//vue-router内部的问题 我们在使用编程式导航 由于promise没有被注册回调 vue-router会选择报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

//路由器对象
const router = new VueRouter({
    routes,
    linkActiveClass:"active",
    mode:"history"
})


//路由守卫
router.beforeEach(async (to, from, next) => {
    if(to.path !== "/Login"){
        //只要访问的不是登录的路由组件
        //我们都应该去检验一下token的合法性
        //如果合法自动登录
        //如果不合法 清除token信息 并 给提示
        await store.dispatch(AUTOLOGIN)
        if(store.state.user._id){
            //代表登录状态没有异常  放行
            next()
        }else {
            //代表登录状态有异常  去登录页
            next("/Login")
        }
    }else {
        next()
    }
})
router.beforeResolve((to, from, next)=>{
    next() // 像express中中间件
})
router.afterEach((to, from) => {})



export default router