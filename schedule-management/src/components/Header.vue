<script setup>
import { defineUser } from '../store/userStore.js'
import { defindSchedule } from '../store/scheduleStore.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const sysUser = defineUser()
const schedule = defindSchedule()
const router = useRouter()

onMounted(() => {
  const loginUser = sessionStorage.getItem('loginUser')
  if (loginUser) {
    sysUser.username = loginUser
    sysUser.uid = 1
  }
})

function logout() {
  sysUser.$reset()
  schedule.$reset()
  sessionStorage.removeItem('loginUser')
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="container">
      <h1 class="title">📅 Schedule Manager</h1>
      
      <div class="nav">
        <div v-if="sysUser.username === ''" class="auth-buttons">
          <router-link to="/login">
            <button class="btn btn-primary">Login</button>
          </router-link>
          <router-link to="/regist">
            <button class="btn btn-secondary">Register</button>
          </router-link>
        </div>

        <div v-else class="user-info">
          <span class="welcome">Welcome, <strong>{{ sysUser.username }}</strong></span>
          <router-link to="/showSchedule">
            <button class="btn btn-primary">My Schedule</button>
          </router-link>
          <button class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #2c3e50, #3498db);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.title {
  margin: 0;
  font-size: 1.8rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #2ecc71;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.welcome {
  margin-right: 15px;
  font-size: 1.1rem;
}
</style>