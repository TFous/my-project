<template>
  <div style="position: relative;" class="hx-menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <template v-for="item1 in menu">
        <!--没有子菜单-->
        <template v-if="item1.child.length===0">
          <span @click="routerChange(item1.index,item1.text)">
            <el-menu-item :index="item1.index">
              <i :class="item1.icon"></i>
              <span slot="title">{{item1.text}}</span>
            </el-menu-item>
          </span>
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
                <span @click="routerChange(item2.index,item2.text)">
                  <el-menu-item :index="item2.index">
                      <i :class="item2.icon"></i>
                      <span slot="title">{{item2.text}}</span>
                  </el-menu-item>
                </span>
              </template>
              <!--二级子菜单-->
              <template v-else>
                <el-submenu :index="item2.index">
                  <!--<span @click="routerChange(item2.index,item2.text)">-->
                    <template slot="title">
                      <i :class="item2.icon"></i>
                      <span slot="title">{{item2.text}}</span>
                    </template>
                  <!--</span>-->
                  <template v-for="item3 in item2.child">
                    <span @click="routerChange(item3.index,item3.text)">
                      <el-menu-item :index="item3.index">
                        <i :class="item3.icon"></i>
                        <span slot="title">{{item3.text}}</span>
                      </el-menu-item>
                    </span>
                  </template>
                </el-submenu>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
  //  import $ from 'jquery'
  import menu from './../../config/menu.ts'
  import {appHistory} from '../../api/appHistory.ts'
  // const DEBOUNCE_TIME = 400
  export default {
    data() {
      return {
        isCollapse: true,
        menu: menu,
        iconSize: 14,
        tId: null
      }
    },
    computed: {
      setIndex() {
        return Math.random().toString()
      }
    },
    updated() {
    },
    mounted: function () {
    },
    methods: {
      routerChange(router: string, name: string) {
        this.$router.push({name: router})
        appHistory.addHistory(router, name)
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
