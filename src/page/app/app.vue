<template>
  <div>{{msg}}</div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class Apps extends Vue {
    msg: string = '2222222222222222'

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
      console.log(dic)
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .ivu-col-span-6 {
    min-width: 200px;
  }

  .card-body {
    cursor: pointer;
    margin: 8px 0px;
    background: rgb(45, 140, 240);
    overflow: hidden;
    border-radius: 3px;
    padding: 16px 8px;
    min-width: 280px;
    .left {
      width: 30%;
      height: 100%;
      float: left;
      text-align: center;
      vertical-align: middle;
    }
    .right {
      float: left;
      color: #fff;
      overflow: hidden;
      width: 70%;
      min-width: 182px;
      .card-name {
        font-size: 25px;
      }
    }
  }

  /* Icon Pulse Grow */
  @-webkit-keyframes card-body {
    to {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }

  @keyframes card-body {
    to {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }
  }

  .card-body {
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    position: relative;
  }

  .card-body .ivu-icon {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  .card-body:hover .ivu-icon, .card-body:focus .ivu-icon, .card-body:active .ivu-icon {
    -webkit-animation-name: card-body;
    animation-name: card-body;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }

  .card-body:hover {
    .ivu-icon {
      color: #000 !important;
    }
    .card-name {
      color: #000 !important;
    }
    .card-desc {
      color: #000 !important;
    }
  }
</style>
