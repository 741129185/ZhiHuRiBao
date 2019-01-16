<template>
  <div class="main">
    <others-view-loading v-show="isAjax"></others-view-loading>
    <div class="top" v-show="showTop" @click="goTop">
      <img src="../assets/img/icon_top.png">
    </div>
    <div class="top-nav">
      <div class="back"><img src="../assets/img/icon_back.png" @click="goBack"></div>
      <div class="more">
        <div class="like"><img src="../assets/img/icon_like.png"><span>{{newsExtra.popularity}}</span></div>
        <div class="com"><img src="../assets/img/icon_com.png" @click="checkCom"><span>{{newsExtra.comments}}</span>
        </div>
        <div class="collect"><img src="../assets/img/icon_collect.png"></div>
        <div class="share"><img src="../assets/img/icon_share.png"></div>
      </div>
    </div>
    <div class="detail-box" ref="main">
      <ul>
        <div class="header">
          <img :src="newsDetail.image" :onerror="errorUserPhoto">
          <div class="img-mask"></div>
          <h2>{{newsDetail.title}}</h2>
        </div>
        <div class="content" v-html="newsDetail.body">
          {{newsDetail.body}}
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState, mapActions} from 'vuex'
  import OthersViewLoading from '../components/OthersViewLoading.vue'
  export default {
    name: 'NewsDetail',
    components: {
      OthersViewLoading
    },
    data() {
      return {
        errorUserPhoto: 'this.src="' + require('../assets/img/load.png') + '"',
        isAjax: false,
        showTop: false
      }
    },
    computed: {
      ...mapState(['newsDetail', 'newsExtra'])
    },
    methods: {
      ...mapActions(['getNewsDetail', 'getNewsExtra']),
      _initDetailPageScroll() {
        if (!this.detailPageScroll) {
          this.detailPageScroll = new BScroll(this.$refs.main, {
            click: true, // 允许点击
            probeType: 3 // 允许监听
          })
          this.detailPageScroll.on('scroll', ({y}) => {
            if (y < -300) {
              this.showTop = true
            } else if (y === 0) {
              this.showTop = false
            }
          })
        } else {
          this.detailPageScroll.refresh()
        }
      },
      goTop() {
        this.detailPageScroll.scrollTo(0, 0, 500)
      },
      goBack() {
        this.$router.push('/')
      },
      checkCom() {
        this.$router.push({
          name: 'CommentsView',
          params: {
            id: this.$route.params.id
          }
        })
      }
    },
    mounted() {
      this.isAjax = true
      this.getNewsDetail({id: this.$route.params.id, axios: this.axios})
      this.getNewsExtra({id: this.$route.params.id, axios: this.axios})
        .then(() => {
          this.isAjax = false
        })
      this._initDetailPageScroll()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../public/css/detailStyle.css";

  .main {
    width: 100%;
    height: 100%;
    .top {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: hsla(0, 0%, 100%, .8);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
      right: 5%;
      bottom: 3%;
      position: fixed;
      z-index: 10;
      img {
        width: 22px;
        height: 22px;
        margin: 9px;
      }
    }
    .top-nav {
      width: 100%;
      height: 56px;
      z-index: 20;
      background: rgba(0, 0, 0, .8);
      display: flex;
      .back {
        padding-left: 20px;
        line-height: 56px;
      }
      .more {
        flex: 1;
        /*display: flex;*/
        & > div {
          float: right;
          line-height: 56px;
          padding: 0 25px;
          position: relative;
          img {
            width: 20px;
            height: 20px;
          }
          span {
            color: #fff;
            position: absolute;
            left: 40px;
            bottom: -5px;
          }
        }
        .like {
          padding-left: 15px;
          padding-right: 35px;
        }
        .share {
          padding: 0 15px;
        }
        .collect {
          padding: 0 15px;
        }
        .com {
          padding-left: 15px;
        }
      }
    }
    .detail-box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        margin: 0;
        padding: 0;
        padding-bottom: 60px;
      }
      .header {
        width: 100%;
        height: 225px;
        position: relative;
        overflow: hidden;
        z-index: 10;
        img {
          top: 50%;
          width: 100%;
          position: relative;
          transform: translateY(-50%);
        }
        .img-mask {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(91, 116, 146, .5);
          position: absolute;
        }
        h2 {
          width: 60%;
          margin: 0;
          padding: 0;
          right: 5%;
          bottom: 36px;
          font-weight: 700;
          text-align: right;
          font-size: 16.5px;
          color: hsla(0, 0%, 100%, .9);
          position: absolute;
          text-shadow: 0 0 5px rgba(0, 0, 0, .5);
        }
      }
      .content {
        margin-top: -220px;
      }
    }
  }
</style>
