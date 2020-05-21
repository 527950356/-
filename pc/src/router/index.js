import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Page1 from '@/components/page1.vue'
import Home from '@/pages/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/register'

    },
    {
      path: '/register',
      name: 'register',
      component:() =>import(/*webpackChunName:"driver-info-manage"*/'@/pages/register/index')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect:'/user-manage',
      children:[
        {
          path: '/user-manage',
          name: 'user-manage',
          component:() =>import(/*webpackChunName:"user-manage"*/'@/pages/user-manage/index')
        },
        {
          path: '/menu-manage',
          name: 'menu-manage',
          component:() =>import(/*webpackChunName:"menu-manage"*/'@/pages/menu-manage/index')
        },
        {
          path: '/comm-manage',
          name: 'comm-manage',
          component:() =>import(/*webpackChunName:"comm-manage"*/'@/pages/comm-manage/index')
        },
        {
          path: '/home-pic-manage',
          name: 'home-pic-manage',
          component:() =>import(/*webpackChunName:"home-pic-manage"*/'@/pages/home-pic-manage/index')
        },
        {
          path: '/comm-classify-manage',
          name: 'comm-classify-manage',
          component:() =>import(/*webpackChunName:"comm-classify-manage"*/'@/pages/comm-classify-manage/index')
        },
        {
          path: '/client-manage',
          name: 'client-manage',
          component:() =>import(/*webpackChunName:"client-manage"*/'@/pages/client-manage/index')
        },
        {
          path: '/order-manage',
          name: 'order-manage',
          component:() =>import(/*webpackChunName:"order-manage"*/'@/pages/order-manage/index')
        },
        {
          path: '/hot-comm-manage',
          name: 'hot-comm-manage',
          component:() =>import(/*webpackChunName:"hot-comm-manage"*/'@/pages/hot-comm-manage/index')
        },
        {
          path: '/shop-info-manage',
          name: 'shop-info-manage',
          component:() =>import(/*webpackChunName:"shop-info-manage"*/'@/pages/shop-info-manage/index')
        },
        {
          path: '/driver-info-manage',
          name: 'driver-info-manage',
          component:() =>import(/*webpackChunName:"driver-info-manage"*/'@/pages/driver-info-manage/index')
        },
        {
          path: '/none',
          name: 'none',
          component:() =>import(/*webpackChunName:"driver-info-manage"*/'@/pages/none/index')
        },
        
      ]

    },

  ]
})
