<template>
    <div class="list">
        <ul>
            <li v-for="item in supports">
                <ele-icon :size="2" :type="item.type" class="icon"></ele-icon>
                <span class="text">{{item.content}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import icon from "components/ele-icon/ele-icon.vue"
    export default {
        name: "ele-list",
        props:{
            supports:Array
        },
        components:{
            "ele-icon":icon
        }
    }
</script>

<style scoped lang="stylus">
    .list
        font-size 12px
        font-weight 200px
        line-height 12px
        color white
        li
            margin-bottom 12px
            &:last-child
                margin-bottom 0
            .icon
                vertical-align top
                margin-top -2px
                margin-left 12px
                margin-right 6px
            .text
                vertical-align top


</style>