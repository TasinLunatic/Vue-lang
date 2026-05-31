import { createRouter, createWebHashHistory } from 'vue-router'

// Import components
import Login from '../components/Login.vue'
import Regist from '../components/Regist.vue'
import ShowSchedule from '../components/ShowSchedule.vue'

// Import Pinia instance and user store
import pinia from '../pinia.js'
import { defineUser } from '../store/userStore.js'

const sysUser = defineUser(pinia)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/showSchedule'
    },
    {
      path: '/showSchedule',
      component: ShowSchedule
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/regist',
      component: Regist
    }
  ]
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.path === '/showSchedule') {
    const loginUserFromStorage = sessionStorage.getItem('loginUser')

    if (loginUserFromStorage) {
      // Restore user data into Pinia if it's missing
      if (!sysUser.username) {
        sysUser.username = loginUserFromStorage
        sysUser.uid = 1
      }
      next()   // ✅ Allow access to My Schedule
    } else {
      alert('Please log in first.')
      next('/login')   // Redirect to login page
    }
  } else {
    next()   // Login and Register pages are always accessible
  }
})

export default router