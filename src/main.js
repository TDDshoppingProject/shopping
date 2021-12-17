import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入icon
import './assets/font/iconfont.css'
import axios from 'axios'

Vue.prototype.$axios = axios
// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// 配置
// 在request拦截器中, 展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  console.log(config);
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
