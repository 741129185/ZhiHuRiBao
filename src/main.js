import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue';
import router from './router/router';
import store from './store/index';
import Muse from './muse-ui.config';


Vue.use(Muse)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// 网络请求所有数据
store.dispatch('getAllData', axios);
