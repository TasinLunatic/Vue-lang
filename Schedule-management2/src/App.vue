<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app { min-height: 100vh; background: #f8f9fa; }
.main-content { padding: 30px 20px; max-width: 900px; margin: 0 auto; }
</style>