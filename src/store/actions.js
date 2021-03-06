import {GETADDRRSSOBJ,GETCATEGORIES,
    GETSHOPS,GETUSER,RESTUSER,AUTOLOGIN,
    GETSELLER,GETGOODS} from "./mutation_types";
import router from "@/router"
import http from "@/http"
import {Toast} from "vant"
import Swal from 'sweetalert2'
const OK = 0;
const ERROR = 1;
const NOTOKEN = 1;

function loginSuccess(commit,loginWay,getCaptcha,user){
    //将用户的信息保存到仓库中
    //补一补:将token保存到仓库中
    commit(GETUSER,user)

    //如果是通过用户名 密码登录的 登录成功之后 要 更新图片验证码
    if (loginWay==="password")
        getCaptcha()

    //将token持久化
    localStorage.setItem("ele-token",user.token)


    //登录成功之后要跳转到个人中心(编程式路由进行跳转)
    router.replace("/Profile")

};
function loginFail(loginWay,getCaptcha){
    Toast.fail({
        message:"登录失败,请检查参数",
        duration:2000
    })

    //如果是通过用户名 密码登录的 登录失败之后 要 更新图片验证码
    if (loginWay==="password")
        getCaptcha()
};


export default {
    async [GETADDRRSSOBJ](store){
        const body = await http.msite.getPosition();
        if(body.code===OK)
            store.commit(GETADDRRSSOBJ,body.data)
    },

    async [GETCATEGORIES](store,cb) {
        const body = await http.msite.getCategories();
        if (body.code === OK)
            store.commit(GETCATEGORIES,body.data)
    },

    async [GETSHOPS](store){
        const body = await http.msite.getShops();
        if (body.code === OK)
            store.commit(GETSHOPS,body.data)
    },

    async [GETUSER]({commit},{loginWay,phone,code,name,pwd,captcha,getCaptcha}){
        let body = "";
        if(loginWay === "message"){
            //发手机&短信的请求
            body = await http.login.loginBySms({
                phone,
                code
            })
        }else if(loginWay==="password"){
            //发用户名&密码的请求
            body = await http.login.loginByUserAndPwd({
                name,
                pwd,
                captcha
            })
        }

        body.code === OK && loginSuccess(commit,loginWay,getCaptcha,body.data)
        body.code === ERROR && loginFail(loginWay,getCaptcha)
    },

    [RESTUSER]({commit}){
        commit(RESTUSER)
    },

    async [AUTOLOGIN]({commit}){
       try {
           //检验token
           const body = await http.login.autoLogin();
           if(body.code === OK ){
               //正常的自动登录; 应该去覆盖user
               commit(AUTOLOGIN,body.data)
           }else if(body.code === NOTOKEN){
               //没有携带token 先给一个提示 应该跳转到登录页
               //应该把token清除掉
               commit(RESTUSER)
               localStorage.removeItem("ele-token")
               Swal.fire(body.msg)
               // router.replace("/Login");
           }
       }catch (e) {
           //代表token过期 先给一个提示 应该跳转到登录页
           //应该把token清除掉
           commit(RESTUSER)
           localStorage.removeItem("ele-token")
           Swal.fire(e.response.data.message)
           // router.replace("/Login");
       }
    },

    async [GETSELLER]({commit},id){
        // console.log(id,"----")  应该要根据id去请求数据
        const {errno,data:seller} = await http.shop.getSeller()
        if(errno === OK)
            commit(GETSELLER,seller)
    },

    async [GETGOODS]({commit}){
        const {errno,data:goods} = await http.shop.getGoods()
        if(errno === OK)
            commit(GETGOODS,goods)
    }
}