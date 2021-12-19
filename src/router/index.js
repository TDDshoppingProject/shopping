import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: homepage
  }
]

const router = new VueRouter({
  routes
})

export default router
