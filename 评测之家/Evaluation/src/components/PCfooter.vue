<template>
  <div class="pc-footer">
    <footer>
      <div class="container">
        <ul class="nav">
          <li><a href="#">关于我们</a></li>
          <li><a href="#">友情链接</a></li>
          <li><a href="#">帮助中心</a></li>
          <li><a href="#">意见反馈</a></li>
        </ul>
        <p>All rights reserved © 2016 pianke.me /黔ICP备17008875号-1</p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
footer{text-align: center;border-top:3px solid rgba(222,222,222,1);padding:30px 0;
  ul.nav{display: inline-block;
    li{
      a{font-size: 14px;color: #585858;
        &:hover{background: #fff;text-decoration: underline!important;}
      }
    }
  }
  p{
    font-size: 14px;color: #585858;
  }
}
@media (min-width: 1200px){
	.pc-footer .container {width: 1200px;}
}
@media only screen and (min-width: 1025px) and (max-width: 1200px) {
  footer ul.nav li a{font-size: 0.14rem;}
	footer p{font-size: 0.14rem;}
}
@media screen and (max-width:1024px){
  footer ul.nav li a{font-size: 0.14rem;padding: 0.1rem 0.15rem;}
	footer p{font-size: 0.14rem;}
}
@media(max-width: 991px) and (min-width: 768px){
  .pc-footer .container {width: 780px;}
}
@media screen and (max-width: 768px) {
  .pc-footer .container {width: 750px;}
}
@media(max-width: 766px) and (min-width: 468px){
	.pc-footer .container {width: 500px;}
	
}
@media screen and (max-width: 468px) {
  .pc-footer .container{width:400px;}
}
@media screen and (max-width: 375px){
  .pc-footer .container{width:350px}
}
@media screen and (max-width: 320px){
  .pc-footer .container{width:300px}
}
</style>
