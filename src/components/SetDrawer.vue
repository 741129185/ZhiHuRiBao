<template>
  <mu-drawer :open="open" :docked="false" @close="close(false)">
    <div class="header">
      <div class="header-top">
        <div class="title">
          <mu-avatar :size="35">
            <img src="../assets/img/icon.png">
          </mu-avatar>
          <span class="status">离线模式</span>
        </div>
        <div class="collect">
          <mu-icon value="star" color="#fff"></mu-icon>
          <span class="my-collect">我的收藏</span>
        </div>
      </div>
      <mu-list class="set-list">
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>首页</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </div>
    <mu-list class="set-list">
      <mu-list-item button v-for="el in data.drawerList" :key="el.id">
        <mu-list-item-title>{{el.name}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="play_arrow"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import MuIcon from "muse-ui/src/Icon/Icon";
  export default {
    components: {MuIcon},
    methods: {
      ...mapMutations({
        close: 'TOGGLE_SETDRAWER'
      })
    },
    name: 'SetDrawer',
    computed: {
      ...mapState({
        data: 'data',
        open: 'showDrawer',
      })
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    .header-top {
      width: 100%;
      height: 80px;
      background: rgba(0, 0, 0, .51);
      .title {
        padding-top: 6px;
        position: relative;
        .mu-avatar {
          margin-left: 10px;
        }
        & > span {
          position: absolute;
          left: 56px;
          top: 18px;
          color: #fff;
        }
      }
      .collect {
        height: 24px;
        margin-top: 5px;
        padding: 0 15px;
        position: relative;
        .my-collect {
          color: #fff;
          position: absolute;
          left: 50px;
          top: 2px;
        }
      }
    }
    .home-page {
      width: 100%;
      height: 40px;
    }
  }
</style>
