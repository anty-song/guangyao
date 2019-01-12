<template>
    <form action="" class="search">
        <span class="icon-search"><img src="../assets/img/Home_icon_search.png"></span>
        <input class="text" placeholder="快速搜索本页面品牌" type="text">
        <span class="icon-scan"><img src="../assets/img/Home_icon_scan it.png" ></span>
    </form>
</template>
<script>
    export default{
        name:'search',
        data(){
            return{

            }
        }
    }
</script>
<style scoped>
    .search{
        display: -webkit-flex;
        justify-content: center; /*子元素水平居中*/
        align-items: center; /*子元素垂直居中*/
        display: -webkit-flex;
        margin: 0 auto;
        width: 690px;
        height: 76px;
        border-radius: 4px;
        background: #FFFFFF;
    }
    .search .icon-search{
        display: block;
        width: 28px;
        height: 28px;
        margin-right: 24px;
    }
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .search .icon-scan{
        display: block;
        width: 36px;
        height: 36px;
    }
    .search .text{
        display: block;
        width: 530px;
        height: 76px;
        font-size: 28px;
        font-weight: 300;
        color: #999999;
        line-height: 76px;
        margin-right: 24px;
    }

</style>