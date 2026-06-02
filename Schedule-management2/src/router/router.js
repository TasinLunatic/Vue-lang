import { createRouter, createWebHashHistory } from 'vue-router'

// Import Components
import Login from './components/Login.vue'
import Regist from './components/Regist.vue'
import ShowSchedule from './components/ShowSchedule.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/', 
      redirect: '/login'        // Default page is Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/regist',
      component: Regist
    },
    {
      path: '/showSchedule',
      component: ShowSchedule
    }
  ]
})

// Simple Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('loginUser')

  // If trying to access schedule without login → redirect to login
  if (to.path === '/showSchedule' && !isLoggedIn) {
    alert('Please login first!')
    next('/login')
  } 
  else {
    next()   // Allow access
  }
})

export default router