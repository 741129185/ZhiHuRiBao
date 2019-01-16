import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewsDetail from '../views/NewsDetail.vue';
import CommentsView from '../views/CommentsView.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/article/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/comments',
      name: 'CommentsView',
      component: CommentsView
    }
  ],
});
