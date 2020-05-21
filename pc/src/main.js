// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import 'default-passive-events'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to,from,next) =>{
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  if(userInfo && userInfo.access_token){
    next()
  }else if(to.path ==='/register'){
    next()
  }
  else{
    next('/register')
  }
  if (to.matched.length ===0) {  //如果未匹配到路由
     next('/none');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    next();    //如果匹配到正确跳转
  }
})
