import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing'
import Login from '../views/Login'
import Signup from '../views/Signup'
import store from '../store/index'

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
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Settings" */ '../views/auth/Settings.vue')
  },
  {
    path: '/notifications',
    name: 'Notifications',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Notifications" */ '../views/auth/Notifications.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Messages" */ '../views/auth/Messages.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Profile" */ '../views/auth/Profile.vue')
  },
  {
    path: '/help',
    name: 'Help',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Help" */ '../views/auth/Help.vue')
  },
  {
    path: '*',
    name: 'Not Found',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "Notifications" */ '../views/404')
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
      store.state.user = {
        auth: true,
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId')
      }

      next()
    }
  } else { next() }
})

export default router
