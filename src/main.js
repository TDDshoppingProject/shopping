import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入icon
import './assets/font/iconfont.css'
// import axios from 'axios'

// Vue.prototype.$axios = axios
// 配置请求的根路径
// axios.defaults.baseURL = ''

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
