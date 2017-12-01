<template>
  <div style="position: relative;" class="hx-menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="(item1, index) in menu">
        <template v-if="item1.child!==null">
          <el-menu-item>
            <!--<i class="el-icon-menu"></i>-->
            <span slot="title">{{item1.text}}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <template v-for="item2 in item1">
            <template v-if="item2.child!==null">
              <el-menu-item>
                <!--<i class="el-icon-menu"></i>-->
                <span slot="title">{{item2.text}}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <template v-for="item3 in item2">
                <template v-if="item3.child!==null">

                </template>
                <template v-else>

                </template>
              </template>
            </template>
          </template>
        </template>
      </template>
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
    computed: {},
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
