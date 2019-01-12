<template>
        <div class="scroll-list-wrap">
                <cube-scroll
                  ref="scroll"
                  :data="BrankList"
                  :options="options"
                  @pulling-down="onPullingDown"
                  @pulling-up="onPullingUp">

                  <div class="brand-group">
                        <div class="brand-item" v-for="(item,index) in BrankList.brandList">
                            <span class="brand-item-logo"><img src="" alt=""></span>
                            <div class="brand-item-info">
                                <div class="title">
                                    <span class="ranking-icon"></span>
                                    <span class="name">{{item.title}}</span>
                                    <span class="vote">立即投票</span>
                                </div>
                                <div class="brand-item-text">投票数</div>
                                <div class="brand-item-trend">
                                    <span class="number">{{item.vote_count}}</span><span class="trend-icon"><img src="../assets/img/Home_icon_rise.png" ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </cube-scroll>
              </div>
</template>
<script>
    // import BrankList from '@/lib/brank-list.js'
    import "../assets/js/brank-list.js"
    export default{
        name:'brank-list',
        data(){
            return{
                BrankList:[]
            }
        },
        computed:{
            options() {
                return {
                pullDownRefresh: this.pullDownRefreshObj,
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: true
                }
            },
        },
        methods:{
            onPullingDown() {
                // 模拟更新数据
                // console.log("haha")
                setTimeout(() => {
                if (Math.random() > 0.5) {
                    // 如果有新数据
                    this.items.unshift(_foods[1])
                } else {
                    // 如果没有新数据
                    this.$refs.scroll.forceUpdate()
                }
                }, 1000)
            },
            onPullingUp() {
                // 模拟更新数据
                // console.log("hehe")
                setTimeout(() => {
                if (Math.random() > 0.5) {
                    // 如果有新数据
                    let newPage = _foods.slice(0, 5)
                    this.items = this.items.concat(newPage)
                } else {
                    // 如果没有新数据
                    this.$refs.scroll.forceUpdate()
                }
                }, 1000)
            },
        },
        created() {

          this.$axios.post("/interface/1.0/pc/brand.php?catid=57",{
            action:"m_brand_list",
            uid: 'gbPH0Mq3ikwHUJ7kPrDHXQ=='
          })
          .then(res => {
            console.log(res)
            this.BrankList=res.data;
          })
          .catch(error => {
            console.log(error)
          })
        }
    }
</script>
<style scoped>
    .scroll-list-wrap{
        height: 1060px;
        overflow: hidden;
    }
    .brand-group{
        margin-top: -10px;
        padding: 30px 30px 10px;
        background: #F6F6F6;
        border-radius:20px 20px 0px 0px;
    }
    .brand-item{
        display: -webkit-flex;
        justify-content: center; /*子元素水平居中*/
        align-items: center; /*子元素垂直居中*/
        display: -webkit-flex;
        margin-bottom: 24px;
        width: 690px;
        height: 186px;
        background: #FFFFFF;
        border-radius: 14px;
    }
    .brand-item-logo{
        width: 223px;
        height: 138px;
        margin-right: 24px;
        background: red;
    }

    .brand-item-info .title .ranking-icon{
        display: block;
        float: left;
        margin-right: 12px;
        width: 42px;
        height: 47px;
        background: red;
    }
    .brand-item-info .title{
        overflow: hidden;
    }
    .brand-item-info .title .name{
        float: left;
        margin-right: 20px;
        width: 180px;
        font-size: 34px;
        color: #444444;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
    }
    .brand-item-info .brand-item-text{
        margin-top: 21px;
        margin-bottom: 9px;
        font-size: 20px;
        line-height: 20px;
        color: #BABABA;
    }
    .brand-item-info .brand-item-trend{
        overflow: hidden;
    }
    .brand-item-info .brand-item-trend .number{
        float: left;
        font-size: 28px;
        line-height: 28px;
        color: #D1BE69;
        margin-right: 18px;
    }
    .brand-item-info .brand-item-trend .trend-icon{
        display: block;
        float: left;
        width: 18px;
        height: 21px;
    }
    .vote{
        float: left;
        width: 134px;
        height: 52px;
        font-size: 24px;
        line-height: 52px;
        color: #54574A;
        text-align: center;
        border-radius: 10px;
        background: #FFD74D;
    }
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
