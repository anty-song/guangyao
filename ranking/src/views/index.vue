<template>
    <div class="main">
        <div class="tip">
            <div class="logo">
                <span class="img"><img src="" alt=""></span><span class="text">品牌中网</span>
            </div>
            <Search></Search>
        </div>
        <Brank></Brank>
        <Add></Add>
    </div>
</template>
<script>
    import Search from '@/components/search.vue'
    import Brank from '@/views/brank-list.vue'
    import Add from '@/components/add.vue'
    export default{
        name:'index',
        data(){
            return{
                
            }
        },
        components:{
            Search,
            Brank,
            Add
        }
    }
</script>
<style scoped>
    .main{
        background: url("../assets/img/Home_img_bg.png")no-repeat;
        overflow: hidden;
    }
    .main .tip{
        padding: 73px 30px 50px;
    }
    .main .logo{
        /* margin-top: 73px; */
        margin-bottom: 26px;
        overflow: hidden;
    }
    .main .logo .img{
        display: block;
        float: left;
        width: 48px;
        height: 46px;
        margin-right: 20px;
        background: red;
    }
    .main .logo .text{
        float: left;
        font-size: 44px;
        line-height: 48px;
        font-weight: 500;
    }

</style>