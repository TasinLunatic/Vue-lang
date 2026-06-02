<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref(sessionStorage.getItem('loginUser') || 'User')
const schedules = ref([])
const newTask = ref('')
const filter = ref('all')

function loadSchedules() {
  const saved = localStorage.getItem('schedules_' + username.value)
  if (saved) schedules.value = JSON.parse(saved)
}

function saveSchedules() {
  localStorage.setItem('schedules_' + username.value, JSON.stringify(schedules.value))
}

onMounted(() => loadSchedules())

function addSchedule() {
  if (!newTask.value.trim()) return
  schedules.value.push({
    id: Date.now(),
    title: newTask.value.trim(),
    completed: false,
    createdAt: new Date().toLocaleDateString()
  })
  saveSchedules()
  newTask.value = ''
}

function toggleComplete(id) {
  const task = schedules.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    saveSchedules()
  }
}

function deleteSchedule(id) {
  if (confirm('Delete this task?')) {
    schedules.value = schedules.value.filter(t => t.id !== id)
    saveSchedules()
  }
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    sessionStorage.removeItem('loginUser')
    router.push('/login')
  }
}

const filteredSchedules = () => {
  if (filter.value === 'pending') return schedules.value.filter(t => !t.completed)
  if (filter.value === 'completed') return schedules.value.filter(t => t.completed)
  return schedules.value
}
</script>

<template>
  <div class="schedule-page">
    <div class="page-header">
      <h2>📅 My Daily Schedule</h2>
      <div class="header-right">
        <span class="username">👤 {{ username }}</span>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <!-- Add New Task -->
    <div class="add-task-bar">
      <input 
        v-model="newTask" 
        placeholder="What do you need to do today?"
        @keyup.enter="addSchedule"
      />
      <button @click="addSchedule" class="add-btn">Add Task</button>
    </div>

    <!-- Filters -->
    <div class="filter-bar">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All Tasks</button>
      <button :class="{ active: filter === 'pending' }" @click="filter = 'pending'">Pending</button>
      <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
    </div>

    <!-- Task Cards -->
    <div class="task-grid">
      <div v-for="task in filteredSchedules()" :key="task.id" class="task-card">
        <div class="task-content">
          <input 
            type="checkbox" 
            :checked="task.completed"
            @change="toggleComplete(task.id)"
            class="task-checkbox"
          />
          <div class="task-info">
            <p :class="{ completed: task.completed }">{{ task.title }}</p>
            <small class="task-date">{{ task.createdAt }}</small>
          </div>
        </div>
        <button class="delete-btn" @click="deleteSchedule(task.id)">🗑️</button>
      </div>
    </div>

    <p v-if="filteredSchedules().length === 0" class="empty-state">
      No tasks found. Add a new task to get started!
    </p>
  </div>
</template>

<style scoped>
.schedule-page {
  max-width: 850px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.username {
  font-weight: 500;
  color: #34495e;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.add-task-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
}

.add-task-bar input {
  flex: 1;
  padding: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 12px;
  font-size: 1.1rem;
}

.add-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0 28px;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
}

.filter-bar button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 30px;
  background: #ecf0f1;
  cursor: pointer;
  font-weight: 500;
}

.filter-bar button.active {
  background: #3498db;
  color: white;
}

.task-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.task-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  align-items: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.task-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.task-checkbox {
  width: 22px;
  height: 22px;
  margin-right: 16px;
  accent-color: #27ae60;
}

.task-info p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.completed {
  text-decoration: line-through;
  color: #7f8c8d;
}

.task-date {
  color: #95a5a6;
  font-size: 0.9rem;
  margin-top: 4px;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  margin-top: 60px;
  color: #7f8c8d;
  font-size: 1.2rem;
}
</style>