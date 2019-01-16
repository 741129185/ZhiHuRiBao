<template>
  <div>
    <mu-appbar style="width: 100%;" color="rgba(0,0,0,.51)">
      <mu-button icon slot="left" @click="showDrawer(true)">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <div class="title">首页</div>
    </mu-appbar>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'TopNav',
    methods: {
      ...mapMutations({
        showDrawer: 'TOGGLE_SETDRAWER'
      })
    }
  }
</script>
<style lang="scss" scoped>
</style>
