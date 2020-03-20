<template>
  <div id="app">
    <ele-header :seller="seller"></ele-header>
    <div class="navs">
      <div class="item">
        <router-link :to="`/Shop/${id}/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/Shop/${id}/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/Shop/${id}/sellers`">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {GETSELLER} from "@/store/mutation_types.js"
  import {mapState,mapActions} from "vuex";
  import header from "components/ele-header/ele-header.vue";
  const OK = 0;
  export default {
    name: 'ele-shop',
    props:{
      id:String
    },
    computed:{
        ...mapState(["seller"])
    },
    methods:{
        ...mapActions([GETSELLER])
    },
    mounted(){
        this[GETSELLER](this.id);
    },
    components:{
        "ele-header":header
    },
    beforeRouteUpdate (to, from, next) {
       this[GETSELLER](to.params.id);
       next()
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  #app
    position relative
    width 100%
    height 100%
    .navs
      one-px(rgba(7,17,27,.1))
      display flex
      height 40px
      .item
        flex 1
        text-align center
        height 40px
        line-height 40px
        a
          display inline-block
          width 100%
          height 100%
          font-size 14px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)
</style>
