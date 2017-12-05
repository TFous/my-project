<template>
  <div class="historyMenu">
    <div class="historyName">
      历史纪录：
    </div>
    <span class="tagWrap">
      <el-tag
        ref="el_tag"
        v-for="tag in tags"
        @close="closeTag(tag.router)"
        :key="tag.name"
        closable
        :type="tag.type">
      <span @click="routerChange(tag.router,tag.name)">{{tag.name}}</span>
    </el-tag>
    </span>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {appHistory} from '../../api/appHistory.ts'
  import $ from 'jquery'

  @Component({
    name: 'app',
    watch: {
      'common.routerChange': {
        handler: function (val, oldVal) {
          this.tags = JSON.parse(localStorage.getItem('historys'))
        },
        deep: true
      }
    }
  })
  export default class Apps extends Vue {
    msg: string = '2222222222222222'
    tags: Array<Object> = JSON.parse(localStorage.getItem('historys')) || []
    mounted() {
      this.setMsg('123')
      this.logMsg()
    }

    // computed
    get computedMsg() {
      return 'computed ' + this.msg
    }

    get common() {
      return this.$store.state.common
    }
    closeTag (router:string) {
      appHistory.closeTag(router)
    }
    setMsg(msg: string) {
      this.$store.dispatch('setDic', {demo: msg})
    }

    routerChange(router: string, name: string) {
      this.$router.push({name: router})
      appHistory.addHistory(router, name)
    }

    logMsg() {
      let dic = this.$store.state.dicBook.dic
      console.log(dic)
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .historyName{
    display: inline-block;
    padding: 0px 15px;
    background: #f5f7f9;
    box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin-right:20px;
    color:#333;
  }
  .historyMenu {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    width: 100%;
    padding: 0px 15px;
    background: #f5f7f9;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  }

  .historyMenu .el-tag {
    margin-right: 12px;
    cursor: pointer;
  }
</style>
