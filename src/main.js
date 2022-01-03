import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入icon
import './assets/font/iconfont.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.prototype.$axios = axios
// 配置请求的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8082'
axios.defaults.baseURL = '/api'
// axios请求拦截
// request请求拦截器中, 展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers['Content-Type'] = 'application/json'
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

// 导入全局样式表
// import './assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
