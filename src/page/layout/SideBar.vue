<template>
  <div style="position: relative;">
    <div class="layout-logo-left">RBS</div>
    <!--<i-button type="text" @click="MenuClick" class="navicon-icon-button">-->
      <!--<Icon type="navicon" size="32" class="navicon-icon"></Icon>-->
    <!--</i-button>-->
    <el-menu
      :collapse="isCollapse"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#464c5b"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  import $ from 'jquery'
  import menu from './../../config/menu.ts'
  import * as role from '../../api/auth/auth'
  // const DEBOUNCE_TIME = 400
  export default {
    data () {
      return {
        isCollapse: true,
        menu: menu,
        iconSize: 14,
        tId: null
      }
    },
    computed: {},
    updated () {
    },
    mounted: function () {
    },
    methods: {
//      MenuClick () {
//        this.isCollapse = !this.isCollapse
//      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      routerRole (roleKey) {
        if (roleKey === '*' || role.inRole(roleKey)) {
          return true
        }
        return false
      },
      routerChange (name) {
        this.$router.push({name: name})
      },
      menuShow (e) {
        let dom = e.currentTarget
        if ($(dom).parent().hasClass('activeLi')) {
          $(dom).removeClass('activeLi').parent().removeClass('activeLi')
        } else {
          $(dom).parents('.menu-list-item').siblings('li').find('span').removeClass('activeLi')
          $(dom).addClass('activeLi').parent().addClass('activeLi')
          $(dom).parent('.subinactive').siblings().removeClass('activeLi').children('span').removeClass('activeLi')
        }
      },
      endSelect (val, index, endIndex) {
        let _self = $('.inactive').eq(index).children('ul').children('li').eq(val).children('ul').children('li').eq(endIndex).children('.end-list-text')
        _self.addClass('active-end-item-select')
        $('.end-list-text').not(_self).removeClass('active-end-item-select')
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .navicon-icon-button {
    position: absolute;
    left: 224px;
    top: -8px;
    z-index: 9999;
  }

  .activeLi > ul, ul.activeLi {
    display: block !important;
  }

  .activeLi li.activeLi {
    background: #282b36;
  }

  span.activeLi {
    color: #2d8cf0;
  }

  a {
    color: #9ea7b4;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    color: #ffffff;
  }

  .end-left {
    margin-left: 22px;
  }

  .layout-text {
    padding-right: 32px;
  }

  .active-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -7px;
  }

  .active-item-select {
    color: #2d8cf0;
  }

  .active-sub-item-select {
    color: #2d8cf0;
  }

  .active-end-item-select {
    color: #2d8cf0;
  }

  .layout-logo-left {
    color: #ffffff;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 4px;
    line-height: 30px;
  }

  .icon-left {
    margin-right: 8px
  }

  .item-text {
  }

  .menu-list {
    color: #9ea7b4;
    width: 100%;
  }

  .menu-list li {
    cursor: pointer;
  }

  .menu-list-text {
    position: relative;
    font-size: 15px;
    padding: 0 20px;
    display: block;
    width: 100%;
    height: 47px;
    line-height: 47px;
    /*font-weight: 700;*/
  }

  .menu-list-item {
    font-size: 14px;
    color: #9ea7b4;
    position: relative;
  }

  .menu-list-item:hover .item-text {
    color: #2d8cf0;
  }

  .menu-list-item:hover .item-icon {
    color: #2d8cf0;
  }

  .sub-menu-list {
    background: #313540;
  }

  .sub-list-text {
    position: relative;
    padding: 14px 20px;
    display: block;
    width: 100%;
    font-size: 13px;
  }

  .end-list-text {
    position: relative;
    padding: 14px 20px;
    display: block;
    width: 100%;
    font-size: 13px;
  }

  .sub-list-text:hover {
    color: #2d8cf0;
  }

  .sub-item {
  }

  .sub-icon {
    margin-left: 12px;
  }

  .subinactive {
  }

  /*.sub-menu-show{*/
  /*display: no;*/
  /*}*/
  .sub-menu-hiden {
    display: none;
  }

  .menu-item-select {
    color: #ffffff;
  }
</style>
