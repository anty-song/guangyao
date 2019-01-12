<template>
    <div class="add">
        <div class="bg"></div>
        <div class="box">
            <div class="item animated">
                <span class="icon">
                    <router-link :to="urlData.publish1">
                        <img src="../assets/img/More_icon_share it.png">
                    </router-link>
                </span>
                <span class="text">发给朋友</span>
            </div>
            <div class="item animated">
                <span class="icon">
                    <router-link :to="urlData.publish1">
                        <img src="../assets/img/More_icon_release.png">
                    </router-link>
                </span>
                <span class="text">品牌发布</span>
            </div>
            <div class="item animated">
                <span class="icon">
                    <router-link :to="urlData.publish1">
                        <img src="../assets/img/More_icon_qq.png">
                    </router-link>
                </span>
                <span class="text">QQ客服</span>
            </div>
            <div class="item animated">
                <span class="icon">
                    <router-link :to="urlData.publish1">
                        <img src="../assets/img/More_icon_phone.png">
                    </router-link>
                </span>
                <span class="text">客服电话</span>
            </div>
        </div>
        <div class="button ">+</div>
    </div>
</template>
<script>
    import "../assets/js/add.js"
    export default{
        data(){
            return{
                urlData:{
                    publish1:"/publish1"
                }
            }
        }
    }
</script>
<style scoped>
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .add .button{
        position: fixed;
        bottom:45px;
        left: 50%;
        margin-left: -44px;
        width: 88px;
        height: 88px;
        font-size: 80px;
        font-weight: 100;
        text-align: center;
        line-height: 88px;
        color: #FFFFFF;
        background: #DCC459;
        /* background: url("../assets/img/Home_btn_more.png")no-repeat center; */
        /* background-size: cover; */
        border-radius: 50%;
        transition: all 1s;
        cursor: pointer;
        z-index: 1;
    }
    .box ,.bg{
        display: none;
    }
    .box{
        position: fixed;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center; /*子元素垂直居中*/
        display: -webkit-flex;
        width: 720px;
        max-width: 750px;
        padding: 0px 15px;
        bottom:267px;
        z-index: 2;
    }
    .box .item .icon{
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
    }
    .bg{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        background: #FFFFFF;
        opacity: 0.9;
        z-index: 1;
    }
    .item .text{
        display: block;
        text-align: center;
        width: 100%;
        font-size: 24px;
        line-height: 40px;
        color: #444444;
    }
    .add.add.active .button{
        transform: rotate(45deg);
        transform-origin:center;
        color: #000000;
        background: transparent;
    }
    .add.active .bg, .add.active .box [data-v-56e6ce41]{
        display: block;
    }
</style>