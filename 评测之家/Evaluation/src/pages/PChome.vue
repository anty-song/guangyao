<template>
  <div class="pc-home content">
    <section class="home-banner">
      <div class="banner-left">
        <router-link to="/">
          <img src="../assets/images/1219.png" alt="">
        </router-link>
      </div>
      <div class="banner-right">
        <router-link to="/">
          <img src="../assets/images/25.png" alt="">
        </router-link>
        <router-link to="/">
          <img src="../assets/images/25.png" alt="">
        </router-link>
        <router-link to="/">
          <img src="../assets/images/25.png" alt="">
        </router-link>
        <router-link to="/">
          <img src="../assets/images/25.png" alt="">
        </router-link>
      </div>
    </section>
    <section class="new home-section">
      <div class="section-head">
        <div class="section-tit">新品首测</div>
        <router-link class="more" to="/">查看更多>></router-link>
      </div>
      <div class="new-ctt">
        <router-link to="/" class="new-item">
          <div class="new-item-left">
            <img src="../assets/images/9.png" alt="">
          </div>
          <div class="new-item-right">
            <div class="item-tit">
              鲜货 | 这次不用你迁就灯，让戴森Lightcycle迁就你试试！
            </div>
            <div class="item-intro">
              如果你现在需要购买一台吸尘器，是选择插哪吸哪的有线吸尘器呢还是充电两小时，吸吸两分钟的无绳吸尘器？相对来说，虽然有线吸尘器使用起来不够灵活，使用的范围也有所局限，至少不会在我们吸着吸着就突然“嗝屁”了！
            </div>
            <div class="item-info">
              <div>
                <span class="by">By / 张晓华</span>
                <span class="time">2018-05-15</span>
              </div>
              <div>
                <span class="scans">10w+</span>
                <span class="likes">100</span>
                <span class="comments">12345</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </section>
    <section class="only home-section">
      <div class="section-head">
        <div class="section-tit">专属频道</div>
        <router-link class="more" to="/">换一换</router-link>
      </div>
      <div class="only-ctt">
        <router-link to="/" class="only-item">
          <div class="item-img">
            <img src="../assets/images/62.png" alt="">
          </div>
          <div class="item-tit">
            潜心打磨，全力之作，王自如是一个有...
          </div>
          <div class="item-info">
            <div>
                <span class="by">By / 张晓华</span>
                <span class="time">2018-05-15</span>
              </div>
              <div>
                <span class="scans">10w+</span>
                <span class="likes">100</span>
                <span class="comments">12345</span>
              </div>
          </div>
        </router-link>
      </div>
    </section>
    <section class="user home-section">
      <div class="section-head">
        <div class="section-tit">人气场主</div>
        <router-link class="more" to="/">查看更多>></router-link>
      </div>
      <div class="user-ctt">
        <router-link to="/" class="user-item">
          <div class="avatar">
            <img src="../assets/images/226.png" alt="">
          </div>
          <div class="user-info">
            <div class="user-head">
              <p class="name">第三方</p>
              <div class="stage">
                <img src="../assets/images/230.png" alt="">
              </div>
            </div>
            <div class="user-about">
              创办国内第一家视频测评机构ZEALER
            </div>
          </div>
        </router-link>
        <router-link to="/" class="user-item">
          <div class="avatar">
            <img src="../assets/images/226.png" alt="">
          </div>
          <div class="user-info">
            <div class="user-head">
              <p class="name">第三方</p>
              <div class="stage">
                <img src="../assets/images/230.png" alt="">
              </div>
            </div>
            <div class="user-about">
              创办国内第一家视频测评机构ZEALER
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'pchome',
  data(){
    return{
      
    }
  },
  computed: {},
  components: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import '../../static/css/home.scss'
</style>


