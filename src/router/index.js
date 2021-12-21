import Vue from 'vue'
import VueRouter from 'vue-router'
import PersonA from '../components/PersonA.vue'
import InformationA from '../components/InformationA.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import MyOrder from '../components/MyOrder.vue'
import MyStore from '../components/MyStore.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/person',
      component: PersonA,
      children: [
        { path: '/information', component: InformationA },
        { path: '/cart', component: ShoppingCart },
        { path: '/order', component: MyOrder },
        { path: '/store', component: MyStore }
      ]
    }
  ]
})
