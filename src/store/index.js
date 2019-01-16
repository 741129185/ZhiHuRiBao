import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: process.env.BASE_URL, // 使用静态地址
    showDrawer: false, // 显示侧边栏
    data: {
      drawerList: [], // 侧边栏数据
      newsList: [], // 今日新闻
    },
    newsDetail: {}, // 对应新闻详情
    newsExtra: {}, // 对应新闻的额外信息 评论数和点赞数等
    longComments: {}, // 对应新闻长评论
    shortComments: {},// 对应新闻短评论
    isAjax: false, // 判断是否在进行网络请求 显示Loading页面
  },
  mutations,
  actions,
});
