import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/LoginA.vue'
import register from '../components/RegisterA.vue'
import admin from '../components/Admin/AdministratorPage.vue'
import home from '../components/HomeE.vue'
import welcome from '../components/Admin/WelCome.vue'
import users from '../components/Admin/UserS.vue'
import goods from '../components/Admin/GoodS.vue'
import business from '../components/Admin/BusinesS.vue'
import HomePage from '../components/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    // 重定向
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: welcome
      },
      {
        path: '/users',
        name: 'users',
        component: users
      },
      {
        path: '/goods',
        name: 'goods',
        component: goods
      },
      {
        path: '/business',
        name: 'business',
        component: business
      }

    ]

  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePage
  }
]

const router = new VueRouter({
  routes
})
/* // 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to   将要访问的路径
  // from 代表从按个路径跳转而来
  // next 是一个函数, 表示放行
  //      next() 放行  next('/login') 强行跳转
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
}) */
export default router
