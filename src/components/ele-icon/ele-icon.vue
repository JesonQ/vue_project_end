<template>
    <i class="icon" :class="[`shop-${size}`,`${typesArr[type]}`]"></i>

    <!--
        class交给vue管理之后 我们可以给class指定的数据类型:
        字符串
        数组
        对象

        <i class="icon shop-1 decrease"></i>
        <i class="icon shop-2 guarantee"></i> ....


        使用css预处理器!!!  预处理的嵌套一定是可以来代表html的嵌套层级的

        <i class="a"></i>
        <i class="b"></i>
        .a
          ....
        .b
          ....


        <i class="a b"></i>
        .a
          ....
          &.b
           ....
   -->

    <!--size:可选值 1 2 3 4  代表不一样尺寸的图标-->
    <!--type: "decrease","discount","guarantee",
            "invoice","special"
            可选值 : 1 2 3 4 5
    -->
</template>

<script>
    export default {
        name: "ele-icon",
        props:{
            size:Number,
            type:Number
        },
        data(){
            return {
                typesArr:["decrease","discount","guarantee","invoice","special"]
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .icon
        vertical-align top
        background-size 100%
        background-repeat no-repeat
        display inline-block
        margin-right 4px
        &.shop-1
            width 12px
            height 12px
            &.decrease
                bg-image(decrease_1)
            &.discount
                bg-image(discount_1)
            &.guarantee
                bg-image(guarantee_1)
            &.invoice
                bg-image(invoice_1)
            &.special
                bg-image(special_1)
        &.shop-2
            width 16px
            height 16px
            &.decrease
                bg-image(decrease_2)
            &.discount
                bg-image(discount_2)
            &.guarantee
                bg-image(guarantee_2)
            &.invoice
                bg-image(invoice_2)
            &.special
                bg-image(special_2)
        &.shop-3
            width 12px
            height 12px
            &.decrease
                bg-image(decrease_3)
            &.discount
                bg-image(discount_3)
            &.guarantee
                bg-image(guarantee_3)
            &.invoice
                bg-image(invoice_3)
            &.special
                bg-image(special_3)
        &.shop-4
            width 16px
            height 16px
            &.decrease
                bg-image(decrease_4)
            &.discount
                bg-image(discount_4)
            &.guarantee
                bg-image(guarantee_4)
            &.invoice
                bg-image(invoice_4)
            &.special
                bg-image(special_4)

</style>