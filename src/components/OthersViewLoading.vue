<template>
  <div class="main">
    正在加载。。。
  </div>
</template>
<script>
  export default {
    name: 'OthersViewLoading'
  }
</script>
<style lang="scss" scoped>
  .main {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 667px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }
</style>
