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
/* import HomePage from '../components/HomePage.vue' */
import homePage from '../components/HomePageL.vue'
import goodsview from '../components/GoodsView.vue'

import PersonA from '../components/PersonA.vue'
import InformationA from '../components/InformationA.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import MyOrder from '../components/MyOrder.vue'
import MyStore from '../components/MyStore.vue'
import purchase from '../components/PurchaseSus.vue'
import bussinessorder from '../components/BusinessOrder.vue'
import applystore from '../components/ApplyStore.vue'
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
    path: '/purchase',
    name: 'purchase',
    component: purchase
  },
  {
    path: '/goodsview',
    name: 'goodsview',
    component: goodsview
  },
  {
    path: '/person',
    component: PersonA,
    children: [
      { path: '/information', component: InformationA },
      { path: '/cart', component: ShoppingCart },
      { path: '/order', component: MyOrder },
      { path: '/store', component: MyStore },
      {
        path: '/bussinessorder',
        name: 'bussinessorder',
        component: bussinessorder
      },
      {
        path: '/applystore',
        name: 'applystore',
        component: applystore
      }
    ]
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
  // huangjingping
  /* {
    path: '/homepage',
    name: 'homepage',
    component: HomePage
  }, */
  // liting
  {
    path: '/homePage',
    name: 'homePage',
    component: homePage
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
