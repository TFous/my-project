<template>
  <div class="hello">
    <h1>{{ computedMsg }}333333333333</h1>
    <h2>{{dic}}</h2>
    <h2>Essential Links</h2>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class Hello3 extends Vue {
    msg: string = '2123this is a typescript project now11111'

    mounted() {
      this.setMsg('123')
      this.logMsg()
    }

    // computed
    get computedMsg() {
      return 'computed ' + this.msg
    }
    get dic() {
      return this.$store.state.dicBook.dic.VarietyDict[0]
    }
    setMsg(msg: string) {
      this.$store.dispatch('setDic', {demo: msg})
    }
    logMsg() {
      let dic = this.$store.state.dicBook.dic
      console.log(dic)
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
