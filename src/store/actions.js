import * as types from './mutation-types';

export default {
  async getAllData({commit}, axios) {
    commit(types.REFRESH_AJAX, true); // 正在请求数据
    let drawerList = await axios.get('/api/themes');
    drawerList = drawerList.data.data;
    let newsList = await axios.get('/api/news');
    newsList = [newsList.data];
    commit(types.RECEIVE_DATA, {drawerList, newsList});
    commit(types.REFRESH_AJAX, false); // 请求完毕
  },
  loadMoreNews({commit}, {axios, date}) {
    return new Promise((resolve) => {
      axios.get('/api/more', {
        params: {
          date,
        },
      })
        .then(
          (res) => {
            const data = JSON.parse(res.data.data);
            // console.log(res.data.data)
            commit(types.LOADING_NEWS, data);
            resolve();
          },
        );
    });
  },
  getNewsDetail({commit}, {axios, id}) {
    return new Promise((resolve) => {
      axios.get('/api/detail', {
        params: {
          id
        }
      })
        .then(
          (res) => {
            const data = JSON.parse(res.data.data);
            commit(types.GET_NEWS_DETAIL, data);
            resolve();
          }
        )
    })
  },
  getNewsExtra({commit}, {axios, id}) {
    return new Promise((resolve) => {
      axios.get('/api/extra', {
        params: {
          id
        }
      })
        .then(
          (res) => {
            const data = JSON.parse(res.data.data)
            commit(types.GET_NEWS_EXTRA, data);
            resolve();
          }
        )
    })
  },
  getNewsLongComments({commit}, {axios, id}) {
    return new Promise((resolve) => {
      axios.get('/api/comments/long', {
        params: {
          id
        }
      })
        .then(
          (res) => {
            const data = JSON.parse(res.data.data)
            commit(types.GET_NEWS_LONG_COMMENTS, data.comments);
            resolve();
          }
        )
    })
  },
  getNewsShortComments({commit}, {axios, id}) {
    return new Promise((resolve) => {
      axios.get('/api/comments/short', {
        params: {
          id
        }
      })
        .then(
          (res) => {
            const data = JSON.parse(res.data.data)
            commit(types.GET_NEWS_SHORT_COMMENTS, data.comments);
            resolve()
          }
        )
    })
  }

};
