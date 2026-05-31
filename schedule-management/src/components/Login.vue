<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { defineUser } from "../store/userStore.js";

const router = useRouter();
const sysUser = defineUser();

const loginUser = reactive({
  username: "",
  userPwd: "",
});

const usernameMsg = ref("");
const userPwdMsg = ref("");

function checkUsername() {
  const usernameReg = /^[a-zA-Z0-9]{5,10}$/;
  if (!usernameReg.test(loginUser.username)) {
    usernameMsg.value = "Invalid format (5-10 letters/numbers)";
    return false;
  }
  usernameMsg.value = "OK";
  return true;
}

function checkUserPwd() {
  const userPwdReg = /^[0-9]{6}$/;
  if (!userPwdReg.test(loginUser.userPwd)) {
    userPwdMsg.value = "Invalid format (must be 6 digits)";
    return false;
  }
  userPwdMsg.value = "OK";
  return true;
}

function login() {
  const flag1 = checkUsername();
  const flag2 = checkUserPwd();

  if (!(flag1 && flag2)) {
    alert("Please correct the errors before logging in.");
    return;
  }

  const savedUsername = localStorage.getItem("username");
  const savedUserPwd = localStorage.getItem("userPwd");

  if (!savedUsername || !savedUserPwd) {
    alert("No registered user found. Please register first.");
    return;
  }

  if (loginUser.username !== savedUsername) {
    alert("Username is incorrect.");
    return;
  }

  if (loginUser.userPwd !== savedUserPwd) {
    alert("Password is incorrect.");
    return;
  }

  alert("Login successful!");

  sysUser.uid = 1;
  sysUser.username = loginUser.username;

  sessionStorage.setItem("loginUser", loginUser.username);
  router.push("/showSchedule");
}

function clearForm() {
  loginUser.username = "";
  loginUser.userPwd = "";
  usernameMsg.value = "";
  userPwdMsg.value = "";
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>🔑 Welcome Back</h2>
      <p class="subtitle">Sign in to manage your schedule</p>

      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          v-model="loginUser.username"
          @blur="checkUsername"
          placeholder="Enter username (5-10 characters)"
        />
        <span
          class="msg"
          :class="{
            success: usernameMsg === 'OK',
            error: usernameMsg && usernameMsg !== 'OK',
          }"
        >
          {{ usernameMsg }}
        </span>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="loginUser.userPwd"
          @blur="checkUserPwd"
          placeholder="Enter 6-digit password"
        />
        <span
          class="msg"
          :class="{
            success: userPwdMsg === 'OK',
            error: userPwdMsg && userPwdMsg !== 'OK',
          }"
        >
          {{ userPwdMsg }}
        </span>
      </div>

      <div class="actions">
        <button class="btn btn-primary" @click="login">Login</button>
        <button class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>

      <div class="register-link">
        Don't have an account?
        <router-link to="/regist">Register here</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.login-card {
  background: white;
  padding: 40px 35px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 22px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #34495e;
}

input {
  width: 100%;
  padding: 14px;
  border: 2px solid #dfe4ea;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.msg {
  font-size: 0.9rem;
  margin-top: 5px;
  display: block;
}

.success {
  color: #27ae60;
}
.error {
  color: #e74c3c;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 600;
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
  background: #95a5a6;
  color: white;
}

.register-link {
  text-align: center;
  margin-top: 25px;
  color: #7f8c8d;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
