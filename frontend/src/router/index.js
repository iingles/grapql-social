/* eslint-disable no-inner-declarations */
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
    components: {
      default: () => import(/* webpackChunkName: "Home" */ '../views/auth/Home.vue'),
      SidebarView: () => import(/* webpackChunkName: "News" */ '../components/News.vue')
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      auth: true
    },
    components: {
      default: () => import(/* webpackChunkName: "Settings" */ '../views/auth/Settings.vue'),
      SidebarView: () => import(/* webpackChunkName: "AccountSettings" */ '../components/AccountSettings.vue')
    }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    meta: {
      auth: true
    },
    components: {
      default: () => import(/* webpackChunkName: "Notifications" */ '../views/auth/Notifications.vue'),
      SidebarView: () => import(/* webpackChunkName: "Trending" */ '../components/Trending.vue')
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    meta: {
      auth: true
    },
    components: {
      default: () => import(/* webpackChunkName: "Messages" */ '../views/auth/Messages.vue'),
      SidebarView: () => import(/* webpackChunkName: "MessagePane" */ '../components/MessagePane.vue')
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    meta: {
      auth: true
    },
    components: {
      default: () => import(/* webpackChunkName: "Profile" */ '../views/auth/Profile.vue'),
      SidebarView: () => import(/* webpackChunkName: "Trending" */ '../components/Trending.vue')
    }
  },
  {
    path: '/help',
    name: 'Help',
    meta: {
      auth: true
    },
    components: {
      default: () => import(/* webpackChunkName: "Help" */ '../views/auth/Help.vue'),
      SidebarView: () => import(/* webpackChunkName: "HelpInfo" */ '../components/HelpInfo.vue')
    }
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
      const token = localStorage.getItem('token')
      const now = Date.now()

      function parseJwt (token) {
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))

        return JSON.parse(jsonPayload)
      };

      if (now.toString().slice(0, -3) > parseJwt(token).exp) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('refreshToken')
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      }

      // console.log(parseJwt(token).exp)
      // console.log(now.toString().slice(0, -3))

      store.dispatch('setAuth', {
        auth: true,
        id: localStorage.getItem('userId'),
        token: localStorage.getItem('token')
      })
      next()
    }
  } else { next() }
})

export default router
