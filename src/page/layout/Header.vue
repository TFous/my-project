<template>
  <div>
    <div class="silde-menu-icon">
      <i class="el-icon-menu"></i>
      菜单
    </div>
    <img class="hxlogo" src="../../../static/img/logo.png" alt="">
    <!--<div class="webtitle">员工工作平台</div>-->
    <!--<div class="menustyle">-->
      <!--<header-menu></header-menu>-->
    <!--</div>-->
    <div class="person-wrap">
      <person></person>
    </div>
    <div class="bagdge-wrap">
      <div class="badeg-class">
        <el-badge :value="100" :max="10" class="item">
          <i class="el-icon-message"></i>
        </el-badge>
      </div>
      <div class="badeg-class">
        <el-badge :value="100" :max="99" class="item">
          <i class="el-icon-bell"></i>
        </el-badge>
      </div>
    </div>
  </div>
</template>
<script>
  import person from '../../components/person/person.vue'
  import headerMenu from './headerMenu.vue'

  export default {
    data () {
      return {
        message: 1
      }
    },
    computed: {},
    methods: {
      MenuClick () {
        this.$emit('toggleClick')
      }
    },
    components: {
      'person': person,
      'header-menu': headerMenu
    }
//    mounted () {
//      let dom = $(this.$refs.menuLeft)
//      dom.hide()
//      $('.navicon-icon-button').hover(function () {
//        dom.show()
//      })
//    }
  }
</script>
<style lang="scss" type="text/scss">
  .bagdge-wrap {
    display: inline-block;
    float: right;
    .badeg-class {
      font-size: 20px;
      cursor: pointer;
      margin-right: 40px;
      float: right;
      .item{
        color:#fff;
      }
      &:hover {
        color: #333;
      }
    }
    .el-badge__content.is-fixed {
      top: 12px !important;
    }
  }

  .person-wrap {
    float: right;
  }

  .webtitle {
    text-align: center;
    width: 60%;
    font-size: 22px;
    font-weight: 700;
    float: left;
  }

  .silde-menu-icon {
    float: left;
    font-size: 18px;
    padding: 0px 25px;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }

  .hxlogo {
    height: 48px;
    /*margin-left:40px;*/
    margin-top: 8px;
    cursor: pointer;
    float: left;
  }

  .layout-header {
    width: 100%;
    position: fixed;
    top: 0px;
    z-index: 999;
    height: 60px;
    min-width: 700px;
    background: #2196F3;
    line-height: 60px;
    color: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .project-head {
    line-height: 60px;
    font-size: 23px;
    font-weight: bold;
    margin-left: 225px;
  }

  .menustyle {
    width: 70%;
    float: left;
    margin-left: 42px;
  }
</style>
