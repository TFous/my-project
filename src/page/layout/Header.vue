<template>
  <div class="layout-header">
    <img class="hxlogo" src="../../../static/img/logo.png" alt="">
    <div class="menustyle">
      <header-menu></header-menu>
    </div>
    <person></person>
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
<style lang="scss" type="text/scss" scoped>
  .hxlogo{
    height:48px;
    margin-left:40px;
    margin-top:8px;
    cursor: pointer;
    float: left;
  }

  .layout-header {
    position: relative;
    min-width:700px;
    background: #2196F3;
  }

  .project-head {
    line-height: 60px;
    font-size: 23px;
    font-weight: bold;
    margin-left: 225px;
  }
  .menustyle{
    width:70%;
    float: left;
    margin-left:42px;
  }
</style>
