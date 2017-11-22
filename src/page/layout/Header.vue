<template>
  <div class="layout-header">
    <i-button type="text" @click="MenuClick" class="navicon-icon-button">
      <Icon type="navicon" size="32" class="navicon-icon"></Icon>
    </i-button>
    <span class="logo"></span>
    <span class="project-head">华信物产业务系统（RBS）</span>
    <person></person>
  </div>
</template>
<script>
  import person from '../../components/person/person.vue'
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
      'person': person
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .layout-header {
    position: relative;
    min-width:700px;
  }

  .navicon-icon-button {
    margin-top: -10px;
  }

  .project-head {
    line-height: 60px;
    font-size: 23px;
    font-weight: bold;
    margin-left: 225px;
  }

  .logo {
    margin-left: 40px;
    position: absolute;
    top: 5px;
    display: inline-block;
    height: 50px;
    width: 158px;
    background: url("../../assets/image/logo.png") no-repeat center center;
    background-size: cover;
  }
</style>
