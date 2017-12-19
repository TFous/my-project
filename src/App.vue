<template>
  <div class="main" :class="{'layout-hide-text': menushort}" v-if="isLogin">
    <div class="layout-menu-left" ref="menuLeft" id="menuLeft">
      <app-sidebar></app-sidebar>
    </div>
    <div class="layout-header">
      <app-header></app-header>
      <history-menu></history-menu>
    </div>
    <div class="mainCont">
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
  import historyMenu from './components/historyMenu/historyMenu.vue'
  import {mapActions, mapGetters} from 'vuex'
  import {loggedIn} from './api/auth/auth.js'

  import $ from 'jquery'

  @Component({
    name: 'app',
    components: {
      'app-header': Header,
      'app-content': Content,
      'app-footer': Footer,
      'history-menu': historyMenu,
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

    sideBarToggle() {
      let dom = $('#menuLeft')
      let windowHeight = $(document).outerHeight()
      dom.height(windowHeight - 60)
      $('.silde-menu-icon').hover(function () {
        dom.fadeIn()
      })
      dom.hover(function () {
      }, function () {
        dom.fadeOut()
      })
    }

    mounted() {
      this.sideBarToggle()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .main {
    overflow: hidden;
    width: 100%;
    /*display: flex;*/
    background: #f5f7f9;
    position: relative;
  }

  #menuLeft {
    width: 230px;
    position: fixed;
    top: 60px;
    left: 0px;
    z-index: 999;
    box-shadow: rgba(0, 0, 0, .25) 5px 0 5px -5px;
    background: #fff;
    display: none;
    overflow-y: auto;
  }

  .mainCont {
    margin-top: 106px;
  }

  .layout {
    background: #f5f7f9;
    position: relative;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-footer {
    text-align: center;
    color: #9ea7b4;
    font-size: 14px;
    line-height: 46px;
    height: 46px;
    background: #333;
  }


</style>
