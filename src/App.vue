<template>
  <div class="main" :class="{'layout-hide-text': menushort}" v-if="isLogin">
    <div class="layout-menu-left" ref="menuLeft" id="menuLeft">
      <app-sidebar></app-sidebar>
    </div>
    <div class="mainCont">
      <app-header></app-header>
      <app-content></app-content>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import Header from './page/layout/Header.vue'
  import Footer from './page/layout/Footer.vue'
  import SideBar from './page/layout/SideBar.vue'
  import Content from './page/layout/Content.vue'
  import {mapActions, mapGetters} from 'vuex'
  import {loggedIn} from './api/auth/auth.js'

  import $ from 'jquery'

  @Component({
    name: 'app',
    components: {
      'app-header': Header,
      'app-content': Content,
      'app-footer': Footer,
      'app-sidebar': SideBar
    },
    computed: {
      ...mapGetters({
        user: 'user'
      }),
      isLogin: function () {
        return loggedIn()
      }
    }
  })
  export default class App extends Vue {
    msg: string = 'this is a typescript project now'
    menushort: boolean = false

    sideBarToggle () {
      let dom = $('#menuLeft')
      let windowHeight = $(document).outerHeight()
      dom.height(windowHeight - 60)
      $('.hxlogo').hover(function () {
        dom.fadeIn()
      })
      dom.hover(function () {
      }, function () {
        dom.fadeOut()
      })
    }

    mounted () {
      this.sideBarToggle()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .main {
    overflow: hidden;
    width: 100%;
    display: flex;
    background: #f5f7f9;
    position: relative;
  }

  #menuLeft {
    width:230px;
    position: absolute;
    top: 60px;
    left: 0px;
    box-shadow: rgba(0, 0, 0, .25) 5px 0 5px -5px;
    background: #fff;
  }

  .mainCont {
    overflow: hidden;
    flex: 1;
  }

  .layout {
    background: #f5f7f9;
    position: relative;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-footer {
    text-align: center;
    color: #9ea7b4;
    font-size:14px;
    line-height:46px;
    height:46px;
    background: #333;
  }

  /*.layout-menu-left {*/
  /*background: #464c5b;*/
  /*}*/

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .layout-hide-text .ivu-menu-submenu-title-icon {
    display: none;
  }

  .layout-hide-text .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 24px;
  }

  .layout-hide-text .layout-menu-left .layout-logo-left {
    font-size: 14px;
    letter-spacing: 0;
  }

  .menu-one .ivu-menu-submenu-title-icon {
    display: none;
  }

  .ivu-menu-submenu-title a .layout-text {
    color: #9ea7b4;
  }

  .ivu-menu-submenu-title a i.ivu-icon-ios-navigate {
    margin-right: 8px;
    color: #9ea7b4;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  i.ivu-icon-ios-navigate {
    font-size: 14px;
  }
</style>
