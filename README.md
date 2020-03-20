### day01
        vue-cli4.0
        mock数据
        字体图标
        搭建了基本的项目代码

### day02
        界面的布局(UI 头部&遮罩)

### day03
        flex复习
        css预处理器 继承和混合的区别
        css后置处理器
        界面动态化(头部&遮罩;评星组件)

        补课: goods界面UI布局&数据动态化

### day04
        goods 组件的完成
            左侧列表
            右侧列表
            购物车

### day05
        小球动画 购物车的列表

### layout项目不足的地方
    axios(没有封装)
        结合vue的移动端UI框架(vant)
    vuex(没有使用)
    vue-router (只使用了普通路由)

### layout项目的优势
    完整的移动端实战布局
    基本的vue语法
    基本的组件间数据传递的方案
    基本的vue开发环境


### 字体图标
    优点:不会失帧;可以让我们的网站少发很多http请求
    缺点:制作成本比较高;色调一般比较单一
    真正开发时字体图标的使用方式:
        1. 设计人员设计好矢量图给你 你要学会如何使用
            通过icomoon来使用
        2. 直接去iconfont网站找生成好的字体图标
            unicode
            fontclass
            symbol

### flex总结
    flex-flow: 控制项目的主侧轴 以及主侧轴的方向

    富余空间管理
        justify-content: 控制主轴的富余空间
        align-items
        align-content
        align-slef   :控制侧轴的富余空间

    弹性空间管理
        flex-shrink
        flex-grow
        flex-basis
        flex:1 = flex-basis:0%  flex-shrink:1  flex-grow:1
        最佳实践:
            在开发项目时;切记不要让项目超过容器;尽可能的避免使用flex-shrink

### 溢出显示省略号的必要条件
    包裹容器: 一定得是溢出文本的直接父元素
    包裹容器的宽度一定要定死;不能靠内容撑开
    需要给包裹元素加三条样式
                 overflow hidden
                 text-overflow ellipsis
                 white-space nowrap


