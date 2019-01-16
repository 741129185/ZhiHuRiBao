<template>
  <div class="main">
    <div class="top-nav">
      <div class="back"><img src="../assets/img/icon_back.png" @click="goBack"></div>
      <div class="text">{{newsExtra.comments}}条点评</div>
    </div>
    <div class="top" v-show="showTop" @click="goTop">
      <img src="../assets/img/icon_top.png">
    </div>
    <others-view-loading v-if="isAjax"></others-view-loading>
    <div class="comments-box" ref="box">
      <ul>
        <div class="long-comments" ref="longC">
          <span @click="showMore1">{{longComments.length}}条长评</span>
          <img src="../assets/img/icon_more.png" ref="icon1">
          <div class="detail">
            <div class="demo" v-for="(el,index) in longComments" :key="index">
              <div class="avatar"><img :src="el.avatar" :onerror="errorUserPhoto"></div>
              <div class="text">
                <div class="author-info">
                  {{el.author}}
                  <span><img src="../assets/img/icon_likes.png">{{el.likes}}</span>
                </div>
                <div class="com-text">
                  {{el.content}}
                </div>
                <p class="time">{{el.time | transformTime}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="short-comments" ref="shortC">
          <span @click="showMore2">{{shortComments.length}}条短评</span>
          <img src="../assets/img/icon_more.png" ref="icon2">
          <div class="detail">
            <div class="demo" v-for="(el,index) in shortComments" :key="index">
              <div class="avatar"><img :src="el.avatar" :onerror="errorUserPhoto"></div>
              <div class="text">
                <div class="author-info">
                  {{el.author}}
                  <span><img src="../assets/img/icon_likes.png">{{el.likes}}</span>
                </div>
                <div class="com-text">
                  {{el.content}}
                </div>
                <p class="time">{{el.time | transformTime}}</p>
              </div>
            </div>
          </div>
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
    name: 'CommentsView',
    components: {
      OthersViewLoading
    },
    data() {
      return {
        errorUserPhoto: 'this.src="' + require('../assets/img/icon.png') + '"',
        isAjax: false,
        num1: 180,
        status1: false,
        num2: 180,
        status2: false,
        showTop: false
      }
    },
    filters: {
      transformTime(val){
        let date = new Date(val * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
        return M + D + h + m;
      }
    },
    computed: {
      ...
        mapState(['newsExtra', 'longComments', 'shortComments'])
    }
    ,
    methods: {
      ...
        mapActions(['getNewsExtra', 'getNewsLongComments', 'getNewsShortComments']),
      _initCommentsPageScroll()
      {
        if (!this.commentsPageScroll) {
          this.commentsPageScroll = new BScroll(this.$refs.box, {
            click: true, // 允许点击
            probeType: 3 // 允许监听
          })
          this.commentsPageScroll.on('scroll', ({y}) => {
            if (y < -300) {
              this.showTop = true
            } else if (y === 0) {
              this.showTop = false
            }
          })
        } else {
          this.commentsPageScroll.refresh()
        }
      },
      goTop() {
        this.commentsPageScroll.scrollTo(0, 0, 500)
      },
      goBack(){
        this.$router.push({
          name: 'NewsDetail',
          params: {
            id: this.$route.params.id
          }
        })
      },
      showMore1(){
        this.$refs.icon1.style.cssText = `transform:rotate(${this.num1}deg)`
        this.num1 += 180
        if (!this.status1) {
          this.$refs.longC.style.cssText = `height:auto;`
          this.status1 = true
        } else {
          this.$refs.longC.style.cssText = `height:44px;`
          this.status1 = false
        }
      },
      showMore2(){
        this.$refs.icon2.style.cssText = `transform:rotate(${this.num2}deg)`
        this.num2 += 180
        if (!this.status2) {
          this.$refs.shortC.style.cssText = `height:auto;`
          this.status2 = true
        } else {
          this.$refs.shortC.style.cssText = `height:44px;`
          this.status2 = false
        }
      }
    }
    ,
    mounted()
    {
      this.isAjax = true
      this.getNewsExtra({id: this.$route.params.id, axios: this.axios})
      this.getNewsLongComments({id: this.$route.params.id, axios: this.axios})
      this.getNewsShortComments({id: this.$route.params.id, axios: this.axios})
        .then(() => {
          this.isAjax = false
        })
      this._initCommentsPageScroll()
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    .top-nav {
      width: 100%;
      height: 56px;
      background: #a2a2a2;
      display: flex;
      line-height: 56px;
      z-index: 66;
      .back {
        padding-left: 15px;
      }
      .text {
        margin-left: 15px;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
      }
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
    .comments-box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      & > ul {
        padding: 0;
        margin: 0;
        padding-bottom: 60px;
        .long-comments, .short-comments {
          height: 44px;
          overflow: hidden;
          position: relative;
          & > span {
            display: block;
            width: 100%;
            height: 44px;
            padding: 0 15px;
            line-height: 44px;
            font-size: 16px;
            color: #626262;
            border-bottom: 1px solid #c2c2c2;
          }
          & > img {
            position: absolute;
            right: 20px;
            top: 8px;
            transition: all 0.5s;
          }
          .detail {
            padding: 0 15px;
            .demo {
              padding: 20px 0;
              display: flex;
              border-bottom: 1px solid #c2c2c2;
              .avatar {
                margin-right: 10px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
                & > img {
                  width: 100%;
                  height: 100%;
                }
              }
              .text {
                flex: 1px;
                .author-info {
                  height: 30px;
                  margin-bottom: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  line-height: 30px;
                  & > span {
                    float: right;
                    font-size: 12px;
                    color: #626262;
                    line-height: 30px;
                    & > img {
                      width: 20px;
                      height: 20px;
                    }
                  }
                }
                .com-text {
                  width: 100%;
                  box-sizing: border-box;
                  padding: 0 5px;
                }
                .time {
                  margin: 10px 5px !important;
                  font-size: 13px;
                  color: #b1b1b1;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
