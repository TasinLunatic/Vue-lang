<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'   // ← Your Header
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <RouterView />   <!-- This will show Login, Regist, ShowSchedule, etc. -->
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>