<template>
  <div style="position: relative;" class="hx-menu">
    <el-menu
      :router="true"
      default-active="2"
      mode="horizontal"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2196F3"
      text-color="#fff">
      <template v-for="item1 in menu">
        <!--没有子菜单-->
        <template v-if="item1.child.length===0">
          <el-menu-item :index="item1.index">
            <!--<i class="el-icon-menu"></i>-->
            <i :class="item1.icon"></i>
            <span slot="title">{{item1.text}}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu :index="item1.index">
            <template slot="title">
              <i :class="item1.icon"></i>
              <span>{{item1.text}}</span>
            </template>
            <template v-for="item2 in item1.child">
              <!--一级子菜单-->
              <template v-if="item2.child.length===0">
                <el-menu-item :index="item2.index">{{item2.text}}</el-menu-item>
              </template>
              <!--二级子菜单-->
              <template v-else>
                <el-menu-item-group :index="item2.index">
                  <template slot="title">{{item2.text}}</template>
                  <template v-for="item3 in item2.child">
                    <el-menu-item :index="item3.index">
                      <!--<i :class="item3.icon"></i>-->
                      <span>{{item3.text}}</span>
                    </el-menu-item>
                  </template>
                </el-menu-item-group>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
  import $ from 'jquery'
  import menu from './../../config/menu.ts'
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
    computed: {
      setIndex () {
        return Math.random().toString()
      }
    },
    updated () {
    },
    mounted: function () {
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  .hx-menu {
    .el-menu {
      border-right: 0px none;
    }
  }
</style>
