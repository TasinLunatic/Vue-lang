<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineUser } from '../store/userStore.js'

const router = useRouter()
const sysUser = defineUser()

const loginUser = reactive({ username: '', userPwd: '' })
const usernameMsg = ref('')
const userPwdMsg = ref('')

// ... (keep all your functions: checkUsername, checkUserPwd, login, clearForm)
</script>

<template>
  <div class="form-container">
    <div class="card">
      <h2>🔑 Login</h2>
      
      <div class="form-group">
        <label>Username</label>
        <input v-model="loginUser.username" @blur="checkUsername" type="text" placeholder="Enter username" />
        <span class="msg" :class="{ success: usernameMsg === 'OK' }">{{ usernameMsg }}</span>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="loginUser.userPwd" @blur="checkUserPwd" type="password" placeholder="Enter 6-digit password" />
        <span class="msg" :class="{ success: userPwdMsg === 'OK' }">{{ userPwdMsg }}</span>
      </div>

      <div class="actions">
        <button class="btn btn-primary" @click="login">Login</button>
        <button class="btn btn-secondary" @click="clearForm">Clear</button>
        <router-link to="/regist"><button class="btn btn-outline">Register</button></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

.msg {
  font-size: 0.9rem;
}

.success { color: #27ae60; }
.error { color: #e74c3c; }

.actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
}
</style>