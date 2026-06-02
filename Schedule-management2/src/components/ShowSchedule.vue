<script setup>
import { ref, onMounted } from 'vue'

const username = ref(sessionStorage.getItem('loginUser') || 'User')
const schedules = ref([])

const newTask = ref('')

function loadSchedules() {
  const saved = localStorage.getItem('schedules_' + username.value)
  if (saved) {
    schedules.value = JSON.parse(saved)
  }
}

function saveSchedules() {
  localStorage.setItem('schedules_' + username.value, JSON.stringify(schedules.value))
}

onMounted(() => {
  loadSchedules()
})

function addSchedule() {
  if (!newTask.value.trim()) return
  schedules.value.push({
    id: Date.now(),
    title: newTask.value,
    completed: false
  })
  saveSchedules()
  newTask.value = ''
}

function toggleComplete(index) {
  schedules.value[index].completed = !schedules.value[index].completed
  saveSchedules()
}

function deleteSchedule(index) {
  if (confirm('Delete this schedule?')) {
    schedules.value.splice(index, 1)
    saveSchedules()
  }
}
</script>

<template>
  <div class="schedule-page">
    <h2>My Schedule - {{ username }}</h2>

    <div class="add-task">
      <input v-model="newTask" placeholder="Add new task..." />
      <button @click="addSchedule">Add</button>
    </div>

    <div class="task-list">
      <div v-for="(task, index) in schedules" :key="task.id" class="task-item">
        <input type="checkbox" v-model="task.completed" @change="toggleComplete(index)" />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button class="delete-btn" @click="deleteSchedule(index)">Delete</button>
      </div>
    </div>

    <p v-if="schedules.length === 0" class="empty">No tasks yet. Add some above!</p>
  </div>
</template>

<style scoped>
.schedule-page { max-width: 700px; margin: 0 auto; }
.add-task { display: flex; gap: 10px; margin-bottom: 20px; }
.task-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: white;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.completed { text-decoration: line-through; color: #777; }

.delete-btn { margin-left: auto; background: #e74c3c; color: white; border: none; padding: 6px 12px; border-radius: 6px; }
</style>