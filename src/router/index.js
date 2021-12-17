import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/LoginA.vue'
import register from '../components/RegisterA.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  routes
})

export default router
