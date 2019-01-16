import * as types from './mutation-types';

export default {
  [types.TOGGLE_SETDRAWER](state, val) {
    state.showDrawer = val;
  },
  [types.RECEIVE_DATA](state, val) {
    state.data = val;
  },
  [types.REFRESH_AJAX](state, val) {
    state.isAjax = val;
  },
  [types.LOADING_NEWS](state, val) {
    state.data.newsList.push(val)
  },
  [types.GET_NEWS_DETAIL](state, val) {
    state.newsDetail = val
  },
  [types.GET_NEWS_EXTRA](state, val) {
    state.newsExtra = val
  },
  [types.GET_NEWS_LONG_COMMENTS](state, val) {
    state.longComments = val
  },
  [types.GET_NEWS_SHORT_COMMENTS](state, val) {
    state.shortComments = val
  }
};
