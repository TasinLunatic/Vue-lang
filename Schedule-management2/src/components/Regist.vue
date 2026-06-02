<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const registUser = reactive({
  username: "",
  userPwd: "",
});

const reUserPwd = ref("");

const usernameMsg = ref("");
const userPwdMsg = ref("");
const reUserPwdMsg = ref("");

function checkUsername() {
  const usernameReg = /^[a-zA-Z0-9]{5,10}$/;
  if (!usernameReg.test(registUser.username)) {
    usernameMsg.value = "Invalid format (5-10 letters/numbers)";
    return false;
  }
  usernameMsg.value = "Available";
  return true;
}

function checkUserPwd() {
  const userPwdReg = /^[0-9]{6}$/;
  if (!userPwdReg.test(registUser.userPwd)) {
    userPwdMsg.value = "Invalid format (must be 6 digits)";
    return false;
  }
  userPwdMsg.value = "OK";
  return true;
}

function checkReUserPwd() {
  const userPwdReg = /^[0-9]{6}$/;

  if (!userPwdReg.test(reUserPwd.value)) {
    reUserPwdMsg.value = "Invalid format (must be 6 digits)";
    return false;
  }

  if (registUser.userPwd !== reUserPwd.value) {
    reUserPwdMsg.value = "Passwords do not match";
    return false;
  }

  reUserPwdMsg.value = "OK";
  return true;
}

function regist() {
  const flag1 = checkUsername();
  const flag2 = checkUserPwd();
  const flag3 = checkReUserPwd();

  if (flag1 && flag2 && flag3) {
    localStorage.setItem("username", registUser.username);
    localStorage.setItem("userPwd", registUser.userPwd);

    alert("Registration successful! Please login now.");
    clearForm();
    router.push("/login");
  } else {
    alert("Please correct the errors before registering.");
  }
}

function clearForm() {
  registUser.username = "";
  registUser.userPwd = "";
  reUserPwd.value = "";

  usernameMsg.value = "";
  userPwdMsg.value = "";
  reUserPwdMsg.value = "";
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <h2>📝 Create Account</h2>
      <p class="subtitle">Join us and start managing your schedule</p>

      <div class="form-group">
        <label>Username</label>
        <input
          type="text"
          v-model="registUser.username"
          @blur="checkUsername"
          placeholder="Enter username (5-10 characters)"
        />
        <span
          class="msg"
          :class="{
            success: usernameMsg === 'Available',
            error: usernameMsg && usernameMsg !== 'Available',
          }"
        >
          {{ usernameMsg }}
        </span>
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          v-model="registUser.userPwd"
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

      <div class="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          v-model="reUserPwd"
          @blur="checkReUserPwd"
          placeholder="Re-enter your password"
        />
        <span
          class="msg"
          :class="{
            success: reUserPwdMsg === 'OK',
            error: reUserPwdMsg && reUserPwdMsg !== 'OK',
          }"
        >
          {{ reUserPwdMsg }}
        </span>
      </div>

      <div class="actions">
        <button class="btn btn-primary" @click="regist">Register</button>
        <button class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>

      <div class="login-link">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.register-card {
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
  background: #27ae60;
  color: white;
}

.btn-primary:hover {
  background: #219653;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.login-link {
  text-align: center;
  margin-top: 25px;
  color: #7f8c8d;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
