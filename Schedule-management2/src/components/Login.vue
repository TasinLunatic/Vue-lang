<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({ 
  username: '', 
  password: '' 
})

const errorMsg = ref('')

function login() {
  const savedUsername = localStorage.getItem('username')
  const savedPassword = localStorage.getItem('userPwd')

  if (!savedUsername) {
    errorMsg.value = 'No registered user found. Please register first.'
    return
  }

  if (user.username === savedUsername && user.password === savedPassword) {
    sessionStorage.setItem('loginUser', user.username)
    alert('Login Successful!')
    router.push('/showSchedule')
  } else {
    errorMsg.value = 'Incorrect username or password'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>🔑 Login to Your Account</h2>
      <p class="subtitle">Manage your daily schedules easily</p>

      <div class="input-group">
        <input 
          v-model="user.username" 
          type="text" 
          placeholder="Username"
        />
      </div>

      <div class="input-group">
        <input 
          v-model="user.password" 
          type="password" 
          placeholder="Password"
        />
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <button class="login-button" @click="login">Login</button>

      <div class="register-link">
        Don't have an account? 
        <router-link to="/regist">Register Here</router-link>
      </div>
    </div>
  </div>
</template>

