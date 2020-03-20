<template>
    <div>
        <div class="cart">
            <div @click="flodFn" class="left" style="color: white">
                <div class="icon">
                    <div class="logo" :class="{active:totalCount >0}">
                        <i class="shop-shopping_cart"></i>
                    </div>
                    <span class="qipao" v-show="totalCount >0">{{totalCount}}</span>
                </div>
                <div class="totalPrice" :class="{active:totalPrice >0}">
                    <span>¥{{totalPrice}}</span>
                </div>
                <div class="deliveryPrice">
                    <span>另需配送费¥{{seller.deliveryPrice}}元</span>
                </div>
            </div>
            <div class="right" :class="{active:totalPrice>=seller.minPrice}">
                <span v-if="rightText">{{rightText}}</span>
            </div>
            <div class="balls">
                <transition v-for="ball in balls"
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @after-enter="afterEnter">
                    <i class="ball" v-show="ball.show"></i>
                </transition>
            </div>
        </div>
        <div class="list" v-show="showList">
            <div class="header">
                <span class="cartText">购物车</span>
                <span class="clear" @click="clear">清空</span>
            </div>
            <div class="content" ref="listContent">
                <ul>
                    <li class="item" v-for="selectedFood in selectedFoods">
                        <span class="left">
                            {{selectedFood.name}}
                        </span>
                        <div class="right">
                            <span class="price">¥{{selectedFood.price * selectedFood.count}}</span>
                            <ele-contorl class="contorl" :food="selectedFood"></ele-contorl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask" v-show="showList" @click="flod=true"></div>
    </div>
</template>

<script>
    import {transform} from "@/util/transform.js"
    import contorl from "components/ele-contorl/ele-contorl.vue"
    import BScroll from "better-scroll";
    export default {
        name: "ele-cart",
        props:{
            selectedFoods:Array,
            seller:Object
        },
        data(){
          return {
              balls:[
                  {show:false,name:1},
                  {show:false,name:2},
                  {show:false,name:3},
                  {show:false,name:4},
                  {show:false,name:5}
              ],
              dropBalls:[], //存放正在降落的小球!!!!!
              flod:true // 代表list是否需要折叠   list的显示和折叠是相反
          }
        },
        computed:{
            totalCount(){
                let totalCount =0 ;
                this.selectedFoods.forEach((selectedFood)=>{
                    totalCount +=  selectedFood.count
                })
                return totalCount;
            },
            totalPrice(){
                let totalPrice =0 ;
                this.selectedFoods.forEach((selectedFood)=>{
                    totalPrice += selectedFood.price * selectedFood.count
                })
                return totalPrice;
            },
            rightText(){
                if(this.totalPrice === 0){
                    return `¥${this.seller.minPrice}起送`
                }else if(this.totalPrice < this.seller.minPrice){
                    return `还差¥${this.seller.minPrice - this.totalPrice}起送`
                }else {
                    return "去结算"
                }
            },
            /*
                list的隐藏与显示 是由两个因素来控制!!!
                    1. 用户是否点击了购物车
                        抽象出来一个数据:flod(折叠!!!)
                    2. 购物车当中是否有数据
                        totalCount

                list的显示与隐藏 与 flod数据应该是相反的
                    flod:true 折叠   showList:false
                    flod:false 未折叠   showList:true

                正常操作:
                    先点+号按钮; 购物车中加入了数据
                    用户想看购物车详情, 点击购物车出现列表

                细节1:
                    有没有可能用户先点击购物车;让flod状态变为了false(未折叠)
                    又点击了+号 导致列表无缘无故的打开

                    怎么解决:
                        在购物车中没有数据的时候 flod状态也不能产生改变

                细节2:
                    正常操作;打开了列表.  所以flod=false;
                    我们通过清空购物车导致totalcount为0;列表关闭!!!
                    可是flod仍然为false 状态不对!!!! 应该为true

                    怎么解决:
                        当totalCount<=0 时;flod一定得是true的
             */
            showList(){
                //代表控制list的显示与隐藏
                //1. 购物车中的数量大于0
                //2. flod要为false
                //满足 1 和 2 list才能显示
                if(this.totalCount <= 0){
                    //哪怕在这写的这段代码没有作用!!! 我也会写!!!
                    //任何情况下,购物车数据都小于等于0了 我将折叠设为true 是永远都不会出问题的!!!
                    this.flod = true;
                    return false
                }

                //让list产生滑屏
                this.$nextTick(()=>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.listContent,{
                            click:true
                        })
                    }else {
                        this.scroll.refresh()
                    }
                })

                return !this.flod
            }
        },
        methods:{
            dropBall(target){
                /*
                * 实现小球动画
                *   1. 每一次点击 从小球数组中挑出一个不在运动的小球
                *          运动中的小球 : show:true
                *          不在运动中的小球: show:false
                *   2. 确定小球的起始位置
                *   3. 进行动画
                *   4. 动画收尾
                * */
                for(let i=0;i<this.balls.length;i++){
                    let ball = this.balls[i];
                    if(!ball.show){
                        //此处 我们改变了show的值 会触发vue的动画逻辑
                        ball.show = true;
                        // 为了待会beforeEnter中可以读到target信息
                        // 函数与函数之间进行数据的传递 大概率下会使用到对象的属性
                        ball.target = target; //真正的dom节点 点击的那个加号按钮
                        this.dropBalls.push(ball)
                        return;
                    }
                };
            },
            // 钩子 hooks   Enter  隐藏--> 显示的会调用下面三个钩子
            //  beforeEnter:动画第一帧
            //  enter:开始动画
            //  afterEnter:动画结束
            //    el: 产生运动的元素
            beforeEnter(el){
                //动画第一帧 :  确定最新要运动的小球起始位置
                //数据类型转换: 4 3 2 1 0
                //在while循环的()中  js是会做自动的数据类型装换的  将任意出现在()中的数据 ---> 布尔值
                //  4 3 2 1 --> true
                //  0 ---> false
                let count = this.balls.length;
                while (count--){
                    let ball = this.balls[count];
                    if(ball.show){
                        //当前这个小球 结束即将要产生运动的小球
                        //确定这个小球的初始位置
                        let viewH = document.documentElement.clientHeight;
                        let targetRect = ball.target.getBoundingClientRect()
                        let X = targetRect.left - 28;
                        let Y = viewH - targetRect.top - 45;

                        transform(el,"translateX",X)
                        transform(el,"translateY",-Y)

                        break; // 确定最新要运动的小球起始位置
                    }
                }
            },
            enter(el){
                //手动 强制让浏览器渲染一遍
                //当我们在通过dom api获取元素的尺寸时;浏览器为了让api返回最精确的值;
                //会强制刷新渲染队列!!!!  浏览器会重新提前渲染!!!
                let hook = el.offsetHeight;
                this.$nextTick(()=>{
                    transform(el,"translateX",0)
                    transform(el,"translateY",0)
                })
            },
            afterEnter(el){
                //循环利用这五个小球时  我们优先挑较早动画完的小球!!!
                //shift() 方法从数组中删除第一个元素，并返回该元素的值
                const ball = this.dropBalls.shift()
                if(ball.show){
                    //数据驱动  最终小球所对应的i标签在下一次vue渲染的时候会隐藏掉
                    ball.show = false;
                    //在vue的界面更新之前 我们通过原生api让这个小球所对应的i标签
                    //快速隐藏掉
                    el.style.display="none";
                }
            },
            clear(){
                this.$emit("clear")
            },
            flodFn(){
                if(this.totalCount <=0){
                    return ;
                }
                this.flod=!this.flod
            }
        },
        mounted(){
            //唤醒一个小球
            this.bus.$on("ballsAmination",(target)=>{
                //实现整个小球动画
                this.dropBall(target)
            })

            //让列表产生滑屏
            //在当前这个钩子中 能确保界面渲染完成吗? 不能!!!
            /*this.$nextTick(()=>{
                debugger
                new BScroll(this.$refs.listContent,{
                    click:true
                })
            })*/
        },
        components:{
            "ele-contorl":contorl
        }
    }
</script>

<style scoped lang="stylus">
    /*不要在fiexd定位内部再去使用fixed或absoult定位*/
    @import "../../common/stylus/mixin.styl"
    .cart
        flex 0 0 0;
        position fixed
        z-index 3
        bottom 0
        left 0
        height 46px
        width 100%
        background #141d27
        display flex
        .left
            flex 1
            height 100%
            display flex
            .icon
                position relative
                bottom 15px
                width 56px
                height 56px
                border-radius 50%
                background #141d27
                margin-left 12px
                margin-right 12px
                display flex
                justify-content center
                align-items center
                .logo
                    display flex
                    justify-content center
                    align-items center
                    width 44px
                    height 44px
                    border-radius 50%
                    background rgba(255,255,255,0.4)
                    &.active
                        background rgba(0,160,220,1)
                        i
                            color white
                    i
                        color rgba(255,255,255,0.4)
                .qipao
                    position absolute
                    right 0
                    top 5px
                    width 24px
                    height 16px
                    line-height 16px
                    border-radius 6px
                    background red
                    font-size 9px
                    font-weight 700
                    text-align center
            .totalPrice
                display flex
                justify-content center
                align-items center
                margin-right 12px
                font-size 16px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                &.active
                    color white
            .deliveryPrice
                display flex
                justify-content center
                align-items center
                font-size 14px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                padding-left 12px
                border-left 2px solid rgba(255,255,255,0.1)
        .right
            flex 0 0 105px
            height 100%
            background rgba(255,255,255,0.4)
            display flex
            justify-content center
            align-items center
            &.active
                background green
                span
                    color white
            span
                color rgba(255,255,255,0.6)
        .balls
            .ball
                position absolute
                left 31px
                top 5px
                width 16px
                height 16px
                border-radius 50%
                background deeppink
                transition .3s transform linear


    .list
        max-height 255px
        position fixed
        z-index 2
        left 0
        bottom 45px
        width 100%
        background #f3f5f1
        padding-bottom 20px
        .header
            one-px(rgba(7,17,27,.1))
            height 40px
            background #f3f5f7
            display flex
            justify-content space-between
            align-items center
            .cartText
                margin-left 18px ;
                color rgba(7,17,27,1);
                font-weight 800
                font-size 14px
            .clear
                margin-right 18px
                color rgba(0,160,220,1);
                font-weight 800
                font-size 14px

        .content
            max-height 195px
            overflow hidden
            .item
                one-px(rgba(7,17,27,.1))
                display flex
                height 48px
                align-items center
                justify-content space-between
                .left
                    padding-left 18px
                .right
                    display flex
                    align-items center
                    padding-right  22px
                    .price
                        margin-right 12px
                        color rgba(240,20,20,1)
                        font-size 10px
                        font-weight 700
    .mask
        position fixed
        z-index 1
        left 0
        right 0
        top 0
        bottom 0
        background rgba(7,17,27,.6)
        backdrop-filter blur(5px)
</style>