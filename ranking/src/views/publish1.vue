<template>
    <div class="publish">
        <div class="title">
            <span class="back">
                <router-link :to="urlData.index"  class="cubeic-back"></router-link>
            </span>
            <p class="text">品牌发布(1/2)</p>
        </div>
        <span class="remind">请按照“品牌发布”输入提示填写相关信息，我们将对您的资质信息进行数字化保密。</span>
        <div class="main">
            <form action="">
                <section class="classify">
                    <div class="menu">
                        <span class="text">所属分类</span>
                        <input type="text" id="classify" placeholder="电动车">
                    </div>
                    <div class="classify-info">
                        <span class="icon"><img src="../assets/img/Release_icon_illustrate.png" ></span>
                        <span class="hint">输入关键字搜索品牌分类</span>
                    </div>
                </section>
                <section class="aptitude">
                    <div class="title">企业资质</div>
                    <div class="menu">
                        <div class="item item-name">
                            <span class="name">企业名称</span>
                            <input class="item-text" type="text" placeholder="请输入企业名称"  v-model="enterprise_name">
                            <i class="item-error"  >名称重复</i>
                            <div class="item-line"></div>
                        </div>
                        <div class="item item-address">
                            <span class="name">企业地址</span>
                            <input class="item-text" type="text" placeholder="请输入企业地址" v-model="enterprise_addr" >
                            <i class="item-error">名称重复</i>
                            <div class="item-line"></div>
                        </div>
                        <div class="item item-web">
                            <span class="name">企业网站</span>
                            <input class="item-text" type="text" placeholder="请输入企业网站" v-model="enterprise_web" >
                            <i class="item-error">名称重复</i>
                            <div class="item-line"></div>
                        </div>
                        <div class="item item-license">
                            <div class="tip">
                                <span class="name">营业执照</span>
                                <span class="item-error">未上传</span>
                            </div>
                            <div class="upload">
                                <Upload></Upload>
                            </div>
                        </div>
                    </div>
                </section>
                <div class="main-line"></div>
                <section class="phone">
                    <div class="menu">
                        <div class="item tel">
                            <span class="text">手机号</span>
                            <input type="text" id="tel" placeholder="请输入手机号">
                        </div>
                        <div class="item code">
                            <span class="text">验证码</span>
                            <input type="text" id="code" placeholder="请输入验证码">
                            <button class="obtain">获取验证码</button>
                        </div>
                    </div>
                </section>
                <div class="main-line"></div>
                <section class="other">
                    <div class="other-title">
                        <span class="text">其他证明</span>
                        <div class="temp">
                            <span class="temp-icon"><img src="../assets/img/Release_icon_read.png"></span>
                            <span class="temp-text">模板</span>
                        </div>
                    </div>
                    <div class="other-hint">如企业有转让、购买证明，请按照系统提示的模式上传相应的资质证明。</div>
                    <div class="upload">
                        <div class=" upload-front">
                            <Upload></Upload>
                        </div>
                        <div class=" upload-reverse">
                            <Upload></Upload>
                        </div>
                    </div>
                </section>
                <section class="footer">
                    <button class="service">
                        <div class="icon"><img src="" alt=""></div>
                        <div class="text">客服</div>
                    </button>
                    <button class="next">
                            <router-link :to="urlData.publish2" @click.native="verify" >下一步</router-link>
                    </button>
                </section>
            </form>
        </div>
    </div>
</template>
<script>
    import Upload from "@/components/upload.vue"
    import $ from 'jquery'
    export default {
        data(){
            return{
                urlData:{
                    index:"/",
                    publish2:"/publish2"
                },
                next:"",
                scrollWatch:true,
                enterprise_name:"",
                enterprise_addr:"",
                enterprise_web:"",
            }
        },
        methods:{
           verify(){
             this.next=this.urlData.publish2
          }
        },
        components:{
            Upload
        },
        mounted(){
            $(window).scrollTop(0);
            $(window).on('scroll',()=>{
                if(this.scrollWatch){

                }
            })
        },
        destroyed(){
            this.scrollWatch=false;
        }
    }
</script>

<style scoped lang="stylus">
    @import '../assets/css/publish1.css';


</style>
