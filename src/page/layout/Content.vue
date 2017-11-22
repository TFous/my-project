<template>
  <div class="content-wrapper">
    <div class="layout-content" ref="layout">
      <div>
        <!--<transition name="fade" mode="out-in">-->
          <router-view></router-view>
        <!--</transition>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { setO } from '../../router/index.ts'
  export default {
    data () {
      return {
        screenHeight: document.documentElement.clientHeight,
        screenWidth: document.documentElement.clientWidth
      }
    },
    watch: {
      screenHeight (val) {
        if (!this.timer) {
          this.screenHeight = val
          this.timer = true
          let _self = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            _self.timer = false
          }, 400)
        }
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let _self = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            _self.timer = false
          }, 400)
        }
      }
    },
    mounted: function () {
      let _self = this
      window.onresize = () => {
        return (() => {
          _self.screenHeight = document.documentElement.clientHeight
          _self.$refs.layout.style.cssText += 'min-height:' + Number(_self.screenHeight - 135) + 'px !important'
//                _self.$refs.layout.style.cssText += 'width:' + Number(_self.screenWidth - 260) + 'px !important'
        })()
      }
//        _self.$refs.layout.style.cssText += 'width:' + Number(_self.screenWidth - 260) + 'px !important'
      _self.$refs.layout.style.cssText += 'min-height:' + Number(_self.screenHeight - 135) + 'px !important'
      this.slientRenew()
    },
    computed: {
    },
    methods: {
      slientRenew () {
        let _this = this
        let clientId = 'RBS'
        let clientSecret = 'secret'
        var auth = 'Basic ' + btoa(`${clientId}:${clientSecret}`)
        var datarefresh = {
          grant_type: 'refresh_token',
          refresh_token: JSON.parse(localStorage.getItem('STORAGE_IDENTITY')).refresh_token
        }
        var body = ''
        for (let key in datarefresh) {
          if (body.length) {
            body += '&'
          }
          body += key + '='
          body += encodeURIComponent(datarefresh[key])
        }
        var xhr = new XMLHttpRequest()
        xhr.onload = function (e) {
          let responseData = JSON.parse(xhr.response)
          if (xhr.status === 200 && responseData.access_token) {
            let expiresIn = responseData.expires_in
            let accesstoken = responseData.access_token
            // 获取refresh_token并储存用户名
            let refreshtoken = responseData.refresh_token
            _this.getUser(accesstoken, expiresIn, refreshtoken)
          } else {
            console.log(e)
          }
        }
        xhr.open('POST', _this.$baseUrl.identitySiteRoot + '/identity/connect/token')
        xhr.setRequestHeader('Authorization', auth)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(body)
      },
      getUser (accessToken, expiresIn, refreshtoken) {
        let _this = this
        let url = _this.$baseUrl.identitySiteRoot + '/identity/connect/userinfo'
        let xhr = new XMLHttpRequest()
        xhr.onload = function (e) {
          var responseData = JSON.parse(xhr.response)
          let userProfile = {}
          userProfile.profile = responseData
          var timestamp = (new Date()).getTime() / 1000 + expiresIn
          let user = Object.assign({}, userProfile, {access_token: accessToken}, {expires_at: timestamp}, {refresh_token: refreshtoken})
          if (xhr.status === 200) {
            _this.$store.dispatch('updateUser', user)
            let timeFn
            setO()
            clearTimeout(timeFn)
            timeFn = setTimeout(function () {
              _this.slientRenew()
              setO()
            }, (expiresIn - 20) * 1000)
          }
        }
        xhr.open('GET', url)
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
        xhr.send()
      }
    }
  }
</script>
<style>
  .layout-content{
    padding:12px;
    overflow: visible!important;
  }
</style>
