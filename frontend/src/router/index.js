import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing'
import Login from '../views/Login'
import Signup from '../views/Signup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Home" */ '../views/auth/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Logic for "auth" routes

router.beforeEach((to, from, next) => {
  // Check to see if the route requires the user to be authenticated
  if (to.matched.some(route => route.meta.auth)) {
    // If there is no token, redirect to login
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else { next() }
})

export default router
