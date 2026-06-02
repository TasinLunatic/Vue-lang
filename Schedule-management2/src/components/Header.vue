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
    <h1>📅 Simple Schedule</h1>
    
    <div class="nav">
      <div v-if="!username">
        <router-link to="/login"><button class="btn">Login</button></router-link>
        <router-link to="/regist"><button class="btn">Register</button></router-link>
      </div>
      <div v-else>
        Welcome, <strong>{{ username }}</strong>
        <router-link to="/showSchedule"><button class="btn">My Schedule</button></router-link>
        <button class="btn logout" @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: #2c3e50;
  color: white;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav button {
  margin-left: 10px;
  padding: 8px 16px;
}

.logout { background: #e74c3c; color: white; }
</style>