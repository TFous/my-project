<template>
  <div class="hello">
    <h1>{{ computedMsg }}222</h1>
    <h2>{{dic}}</h2>
    <h2>Essential Links</h2>
    <div>
      <el-button>test111111111111</el-button>
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
//    api: any = Vue.prototype.$api

    mounted() {
      this.setMsg('123')
      this.logMsg1()
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

    logMsgAll() {
      Promise
        .all([this.logMsg(), this.logMsg1()])
        .then(function (results) {
          console.log(2222)
          console.log(results)
        })
    }

    logMsg() {
      let url = `http://rbs.cefcfco.com:6789/api/manage/odata/InterestRateTypeDict(2)`
      var myRequest = new Request(url, {
        method: 'GET',
        headers: Vue.prototype.$api.headers,
        mode: 'cors',
        cache: 'default'
      })
      fetch(myRequest).then(function (response) {
        console.log(response)
        return response.text()
      }).then(function (myBlob) {
      })
    }

    logMsg1() {
      let url1 = `http://rbs.cefcfco.com:6789/api/manage/odata/InterestRateTypeDict(1)`
      let url2 = `http://rbs.cefcfco.com:6789/api/manage/odata/InterestRateTypeDict(2)`
      var myRequest1 = Vue.prototype.$api.request(url1)
      var myRequest2 = Vue.prototype.$api.request(url2)
      let myRequests = [myRequest1, myRequest2]
      Promise.all(myRequests.map(myRequest =>
        fetch(myRequest).then(resp => resp.json())
      )).then(texts => {
        console.log(texts)
      })
      fetch(myRequest1).then(function (response) {
        console.log(response)
        return response.text()
      }).then(function (myBlob) {
        console.log(myBlob)
      })
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
