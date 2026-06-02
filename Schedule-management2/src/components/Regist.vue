<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

function register() {
  if (!user.username || !user.password) {
    alert('Please fill all fields')
    return
  }

  if (user.password !== user.confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  // Save to localStorage
  localStorage.setItem('username', user.username)
  localStorage.setItem('userPwd', user.password)

  alert('Registration successful! Please login.')
  router.push('/login')
}
</script>

<template>
  <div class="form-card">
    <h2>Register</h2>
    
    <input v-model="user.username" placeholder="Username" />
    <input v-model="user.password" type="password" placeholder="Password (6 digits recommended)" />
    <input v-model="user.confirmPassword" type="password" placeholder="Confirm Password" />
    
    <button @click="register">Register</button>
    
    <router-link to="/login">Already have an account? Login</router-link>
  </div>
</template>

<style scoped>
.form-card {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}

input, button {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
}

button { 
  background: #27ae60; 
  color: white; 
  border: none; 
  font-size: 1.1rem; 
}
</style>