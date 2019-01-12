<template>
    <div class="publish">
         <div class="title">
            <span class="back">
                <router-link :to="urlData.publish1" class="cubeic-back"></router-link>
            </span>
            <p class="text">品牌发布(2/2)</p>
        </div>
        <span class="remind">请按照“品牌发布”输入提示填写相关信息，我们将对您的资质信息进行数字化保密。</span>
        <div class="main">
            <form action="">
                <section class="info">
                    <div class="info-title">品牌信息</div>
                    <div class="wrap">
                        <span class="name">品牌名称</span>
                        <input  type="text" placeholder="请输入品牌名称">
                        <i class="wrap-error">名称重复</i>
                        <div class="wrap-line"></div>
                    </div>
                </section>
                <section class="reg">
                    <div class="wrap">
                        <div class="reg-info">
                            <div class="text">商标注册证</div>
                            <div class="error">未上传</div>
                        </div>
                        <div class="upload">
                            <Upload></Upload>
                        </div>
                    </div>   
                </section>
                <section class="logo">
                    <div class="wrap">
                        <div class="logo-info">
                            <div class="text">商标注册证</div>
                            <div class="error">未上传</div>
                        </div>
                        <div class="upload">
                            <Upload></Upload>
                        </div>
                    </div>   
                </section>


                <!-- 复制 -------------->
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
                            <router-link :to="urlData.publish2">下一步</router-link>
                        </button>
                    </section>
            </form>
        </div>
    </div>
</template>

<script>
    import Upload from '@/components/upload.vue'
    import $ from 'jquery'
    export default{
        data(){
            return{
                urlData:{
                    publish1:"/publish1",
                    publish2:"/publish2"
                }
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
<style scoped>
    @import '../assets/css/publish2.css';
</style>