<template>
    <cube-upload
      ref="upload"
      v-model="files"
      :action="action"
      @files-added="addedHandler"
      @file-error="errHandler">
      <div class="clear-fix">
        <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
        <cube-upload-btn :multiple="false">
          <div>
            <i><img src="../assets/img/Release_icon_camera.png" alt=""></i>
            <p>对焦营业执照使图文清晰可见</p>
          </div>
        </cube-upload-btn>
      </div>
    </cube-upload>
  </template>
  <script>
    export default {
      name:'upload',
      data() {
        return {
          action: '//jsonplaceholder.typicode.com/photos/',
          files: []
        }
      },
      methods: {
        addedHandler() {
          const file = this.files[0]
          file && this.$refs.upload.removeFile(file)
        },
        errHandler(file) {
          // const msg = file.response.message
          this.$createToast({
            type: 'warn',
            txt: '上传失败',
            time: 1000
          }).show()
        }
      }
    }
  </script>
<style lang="stylus">
  .cube-upload
    width:100%
    height:100%
    .clear-fix
      width:100%
      height:100%
      .cube-upload-file, .cube-upload-btn
        margin: 0
        height: 100%
      .cube-upload-file
        margin: 0
        + .cube-upload-btn
          margin-top: -270px
          opacity: 0
      .cube-upload-file-def
        position relative
        width: 100%
        height: 100%
        background-size:contain
        .cubeic-wrong::before
          margin-top:3px;
          margin-right:3px
          background:transparent
          /* display: none */
        .cube-upload-file-state
          .cube-upload-file-status
            font-size:50px
      .cube-upload-btn
        display: flex
        align-items: center
        justify-content: center
        > div
          text-align: center
        i
          display: inline-flex
          align-items: center
          justify-content: center
          width: 62px
          height: 50px
          margin-bottom: 30px
          font-size: 32px
          line-height: 1
          font-style: normal
          color: #fff

      .cube-upload-file-def
        position relative
        width: 100%
        height: 100%
        background-size:contain
      
</style>
  