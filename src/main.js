import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

// 网络请求
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
