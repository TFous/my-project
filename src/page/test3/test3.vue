<template>
  <div class="hello">
    <h1>{{ computedMsg }}222</h1>
    <h2>{{dic}}</h2>
    <h2>Essential Links</h2>
    <div>
      <el-button>test13333333333</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class Hello extends Vue {
    msg: string = '2123this is a typescript project now11111'

    mounted () {
      this.setMsg('123')
      this.logMsg()
    }

    // computed
    get computedMsg () {
      return 'computed ' + this.msg
    }

    get dic () {
      return this.$store.state.dicBook.dic.VarietyDict[0]
    }

    setMsg (msg: string) {
      this.$store.dispatch('setDic', {demo: msg})
    }

    logMsg () {
      let dic = this.$store.state.dicBook.dic
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
