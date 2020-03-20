<template>
    <div class="contorl">
        <transition name="contorlRemove">
            <i v-show="food.count>0" @click="removeCount"
               class="shop-remove_circle_outline remove"></i>
        </transition>
        <transition name="contorlRemove">
            <span v-show="food.count>0">{{food.count}}</span>
        </transition>
        <i class="shop-add_circle add" @click="addCount"   ></i>
    </div>
</template>

<script>
    export default {
        name: "ele-contorl",
        props:{
            food:{
                type:Object,
                require:true
            }
        },
        methods:{
            addCount(ev){
                this.bus.$emit("addCount",this.food);
                //跟ele-cart组件进行一次交互 唤醒一个小球
                //ev.target: 触发当前click事件的dom元素
                this.bus.$emit("ballsAmination",ev.target)
            },
            removeCount(){
                this.bus.$emit("removeCount",this.food)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .contorl
        i
            display inline-block
            font-size 24px
            vertical-align middle
            color rgba(0,160,220,1)
            &.add
                position relative
                z-index: 1
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-720deg)
        span
            display inline-block
            width 24px
            text-align center
            font-size 10px
            vertical-align middle
            color rgba(147,153,159,1)
</style>