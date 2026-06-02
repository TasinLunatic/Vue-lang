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

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  background: white;
  padding: 45px 40px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 8px;
}

.subtitle {
  color: #7f8c8d;
  margin-bottom: 35px;
}

.input-group input {
  width: 100%;
  padding: 16px;
  margin-bottom: 18px;
  border: 2px solid #dfe6e9;
  border-radius: 12px;
  font-size: 1.05rem;
}

.input-group input:focus {
  border-color: #3498db;
  outline: none;
}

.error {
  color: #e74c3c;
  margin: 10px 0;
}

.login-button {
  width: 100%;
  padding: 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.login-button:hover {
  background: #2980b9;
}

.register-link {
  margin-top: 25px;
  color: #7f8c8d;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
}
</style>