<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = reactive({ username: '', password: '' })
const message = ref('')

function login() {
  const savedUser = localStorage.getItem('username')
  const savedPass = localStorage.getItem('userPwd')

  if (!savedUser) {
    alert('No user registered yet. Please register first.')
    return
  }

  if (user.username === savedUser && user.password === savedPass) {
    sessionStorage.setItem('loginUser', user.username)
    alert('Login successful!')
    router.push('/showSchedule')
  } else {
    alert('Wrong username or password!')
  }
}
</script>

<template>
  <div class="form-card">
    <h2>Login</h2>
    <input v-model="user.username" placeholder="Username" />
    <input v-model="user.password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <router-link to="/regist">Don't have account? Register</router-link>
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
button { background: #3498db; color: white; border: none; font-size: 1.1rem; }
</style>