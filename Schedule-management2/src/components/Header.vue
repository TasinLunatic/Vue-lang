<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const username = ref('')

onMounted(() => {
  username.value = sessionStorage.getItem('loginUser') || ''
})

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    sessionStorage.removeItem('loginUser')
    username.value = ''
    router.push('/login')
  }
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <h1 class="logo">📅 Schedule Manager</h1>
      
      <div class="nav">
        <div v-if="!username" class="auth-buttons">
          <router-link to="/login">
            <button class="nav-btn login-btn">Login</button>
          </router-link>
          <router-link to="/regist">
            <button class="nav-btn register-btn">Register</button>
          </router-link>
        </div>
        
        <div v-else class="user-section">
          <span class="welcome-text">Welcome, <strong>{{ username }}</strong></span>
          <router-link to="/showSchedule">
            <button class="nav-btn schedule-btn">My Schedule</button>
          </router-link>
          <button class="nav-btn logout-btn" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 18px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.header-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.9rem;
  font-weight: 700;
}

.nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-btn {
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  background: #3498db;
  color: white;
}

.register-btn {
  background: #2ecc71;
  color: white;
}

.schedule-btn {
  background: #3498db;
  color: white;
}

.logout-btn {
  background: #e74c3c;
  color: white;
}

.welcome-text {
  margin-right: 15px;
  font-size: 1.1rem;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}
</style>