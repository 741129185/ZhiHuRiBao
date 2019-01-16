<template>
  <div class="main">
    <div class="top-nav">
      <top-nav></top-nav>
    </div>
    <div class="top" v-show="showTop" @click="goTop">
      <img src="../assets/img/icon_top.png">
    </div>
    <div class="newsBox" ref="newsBox">
      <ul>
        <rotation-chart></rotation-chart>
        <div v-for="(el,index) in newsShowList" :key="index">
          <div class="newsList">
            <p class="date">{{el.date | formatDate}}</p>
            <div class="news" v-for="(item,i) in el.stories" :key="i" @click="toDetailPage(item.id)">
              <img :src="item.images" :onerror="errorUserPhoto">
              <p>{{item.title}}</p>
            </div>
          </div>
        </div>
        <div class="white" ref="white"></div>
        <div class="load-more" v-if="!loadMore">下拉加载更多</div>
        <div class="load-more" v-else>加载中...</div>
      </ul>
    </div>
  </div>
</template>
<script>
  import RotationChart from '../components/RotationChart.vue'
  import {mapState, mapActions} from 'vuex'
  import BScroll from 'better-scroll'
  import TopNav from '../components/TopNav.vue'
  export default {
    name: 'HomeView',
    components: {
      RotationChart,
      TopNav
    },
    data() {
      return {
        errorUserPhoto: 'this.src="' + require('../assets/img/load.png') + '"',
        loadMore: false,
        showTop: false,
        beforeNum: 0
      }
    },
    filters: {
      formatDate(val) { // 修改日期 格式
        if (!val) {
          return '正在请求'
        }
        let year = val.slice(0, 4)
        let month = val.slice(4, 6)
        let day = val.slice(6, 8)
        return `${year}/${month}/${day}`
      }
    },
    computed: {
      ...mapState(['data']),
      newsShowList() {
        return this.data.newsList
      },
      beforeDate() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        if (month < 10) {
          month = '0' + month
        }
        return `${year}${month}${day}` - this.beforeNum + ''
      }
    },
    methods: {
      ...mapActions(['loadMoreNews']),
      _initHomePageScroll() {
        if (!this.homePageScroll) {
          this.homePageScroll = new BScroll(this.$refs.newsBox, {
            click: true, // 允许点击
            probeType: 3, // 允许监听
            pullUpLoad: {
              threshold: -100 // 当上拉距离超过30px时触发 pullingUp 事件
            }
          })
          this.homePageScroll.on('scroll', ({y}) => {
            if (y < -300) {
              this.showTop = true
            } else if (y === 0) {
              this.showTop = false
            }
          })
        } else {
          this.homePageScroll.refresh()
        }
      },
      goTop() {
        this.homePageScroll.scrollTo(0, 0, 500)
      },
      toDetailPage(id) {
        this.$router.push({
          name: 'NewsDetail',
          params: {
            id
          }
        })
      }
    },
    created() {
      this.$nextTick(() => {
        this._initHomePageScroll();
        this.homePageScroll.on('pullingUp', () => {
          this.homePageScroll.refresh();
          this.loadMore = true;
          setTimeout(() => {
            this.loadMore = false
          }, 1000)
          this.loadMoreNews({date: this.beforeDate, axios: this.axios})
          this.beforeNum++
          this.homePageScroll.finishPullUp()
        })
      })
    },
  };
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    position: relative;
    background: #f9faff;
    .top-nav {
      position: fixed;
      width: 100%;
      z-index: 99;
    }
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
    .newsBox {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        margin: 0;
        padding: 0;
      }
      .newsList {
        width: 90%;
        z-index: 1;
        position: relative;
        margin: 30px 20px;
        margin-bottom: 60px;
        .date {
          top: -35px;
          margin: 0 !important;
          color: #fff;
          padding: 0 38px;
          font-size: 14px;
          line-height: 30px;
          letter-spacing: .1rem;
          border-radius: 10px;
          text-align: center;
          background-color: #ffd300;
          transform: translateY(-50%);
          position: absolute;
        }
        .news {
          cursor: pointer;
          display: flex;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 5px;
          align-items: center;
          background-color: #fff;
          box-shadow: 0 3px 10px 0 rgba(91,115,146,.15);
          img {
            flex: 0 0 75px;
            width: 75px;
            height: 75px;
            margin-right: 15px;
          }
          p {
            color: #5b7492;
            font-size: 14px;
            text-align: justify;
            margin: 0;
          }
        }
      }
    }
    .load-more {
      background: #f9faff;
      width: 100%;
      height: 44px;
      font-size: 18px;
      text-align: center;
      line-height: 44px;
      z-index: 99;
      font-weight: 600;
    }
  }
</style>
