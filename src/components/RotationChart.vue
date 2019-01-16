<template>
  <div class="box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="el in imgData" :key="el.id">
          <img :src="el.src">
          <h3>{{el.title}}</h3>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex"
  import Swiper from "swiper"
  export default {
    name: 'RotationChart',
    data() {
      return {
        imgData: [
          {
            id: 1,
            src: 'https://pic4.zhimg.com/v2-5062df4f93367604302ec4765b9be473.jpg',
            title: '「给员工发年终奖是懒政」，细细一琢磨，没道理啊'
          },
          {
            id: 2,
            src: 'https://pic4.zhimg.com/v2-b35f8885f03b8c7509a6317ab1f8ff23.jpg',
            title: '这部动画片里独特的中国味，就像「左宗棠鸡」'
          },
          {
            id: 3,
            src: 'https://pic2.zhimg.com/v2-0c3b6a94fa17d2f4435b43a9d153dad1.jpg',
            title: '2018 年的出生人口，其实早在 50 年前就埋下了种子'
          },
          {
            id: 4,
            src: 'https://pic3.zhimg.com/v2-d7a096f05cb4754e6c30ef14f6f515d6.jpg',
            title: '不要回答来自宇宙深处的神秘信号？想多了，没人等你回答'
          },
          {
            id: 5,
            src: 'https://pic4.zhimg.com/v2-9a5d9612aff1e04a212801edc2fffa67.jpg',
            title: '一首歌的粤语版歌词经常比国语版更好，是填词人偏心吗？'
          }
        ]
      }
    },
    computed: {
      newsList()
      {
        return this.data.newsList.stories
      }
      ,
      ...
        mapState(['data'])
    }
    ,
    methods: {
      _initSwiper()
      {
        let mySwiper = new Swiper('.swiper-container', {
          loop: true,
          autoplay: true,
          observer: true,
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          autoplay: {
            disableOnInteraction: false,   // 手动滑动后继续自动播放
          },
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      }
    }
    ,
    created()
    {
      this.$nextTick(() => {
        this._initSwiper()
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../node_modules/swiper/dist/css/swiper.css";

  .box {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
    .swiper-pagination {
      width: 95%;
      text-align: right;
      bottom: 50px;
    }
    .swiper-slide {
      width: 100%;
      height: 300px;
      img {
        width: 100%;
        height: 100%;
      }
      h3 {
        width: 70%;
        color: #fff;
        margin: 0;
        font-size: 19px;
        line-height: 32px;
        bottom: 105px;
        right: 5%;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
        &::before {
          content: '';
          width: 112px;
          bottom: -22px;
          right: 0;
          display: block;
          position: absolute;
          border: 2px solid #ffd300;
        }
      }
    }
  }
</style>
