import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api'
import './assets/style/reset.css'
Vue.use(VueCompositionApi)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => {
    store.dispatch('getCollection')
    return h(App)
  }
}).$mount('#app');
