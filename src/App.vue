<template>
  <div id="app">
    <loading v-if="isAjax"></loading>
    <div class="main-box" v-else>
      <router-view/>
      <set-drawer></set-drawer>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Loading from './components/Loading.vue'
  import SetDrawer from './components/SetDrawer.vue'
  export default {
    name: 'App',
    computed: {
      ...mapState(['isAjax'])
    },
    components: {
      Loading,
      SetDrawer
    }
  }
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main-box {
      width: 100%;
      height: 100%;

    }

  }
</style>
