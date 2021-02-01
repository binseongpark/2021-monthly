import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

//
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import YesNo from '@/views/YesNo.vue'
import NotFound from '@/views/NotFound.vue'

import store from './store'

import './app.scss'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './mixins'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/main',
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/yesno',
    component: YesNo,
    meta: {
      requiresAuth: false
    }
  },
  { path: '/404', component: NotFound },
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.matched.some((route) => route.meta.requiresAuth))
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    console.log(store.state.auth.loggedIn)
    if (store.state.auth.loggedIn) {
      next()
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
