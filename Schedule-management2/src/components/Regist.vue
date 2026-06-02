<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

function register() {
  if (!user.username || !user.password) {
    alert("Please fill all fields");
    return;
  }

  if (user.password !== user.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("username", user.username);
  localStorage.setItem("userPwd", user.password);

  alert("Registration successful! Please login.");
  router.push("/login");
}
</script>

<template>
  <div class="form-card">
    <h2>Register</h2>

    <div class="form-field">
      <input v-model="user.username" placeholder="Username" />
    </div>
    <div class="form-field">
      <input
        v-model="user.password"
        type="password"
        placeholder="Password (6 digits recommended)"
      />
    </div>
    <div class="form-field">
      <input
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
    </div>

    <button @click="register">Register</button>

    <router-link class="register-link" to="/login"
      >Already have an account? Login</router-link
    >
  </div>
</template>

<style scoped>
.form-card {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-card h2 {
  margin-bottom: 18px;
  font-size: 1.5rem;
}

.form-field {
  width: 100%;
  margin: 10px 0;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  font-size: 1rem;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.12);
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  border-radius: 8px;
  background: #27ae60;
  color: white;
  border: none;
  font-size: 1.05rem;
  cursor: pointer;
  transition:
    transform 0.12s,
    box-shadow 0.12s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.register-link {
  display: block;
  margin-top: 14px;
  color: #555;
  text-decoration: underline;
}
</style>
