<script setup>
import { defineUser } from '../store/userStore.js'
import { defineSchedule } from '../store/scheduleStore.js'
import { onMounted } from 'vue'

const sysUser = defineUser()
const schedule = defineSchedule()

function getCurrentUsername() {
  return sysUser.username || sessionStorage.getItem('loginUser') || 'guest'
}

function getStorageKey() {
  return 'scheduleList_' + getCurrentUsername()
}

function loadSchedule() {
  const storageKey = getStorageKey()
  const savedList = localStorage.getItem(storageKey)

  if (savedList) {
    schedule.itemList = JSON.parse(savedList)
  } else {
    schedule.itemList = [
      { sid: 1, title: 'Learn Vue Router', completed: '0' },
      { sid: 2, title: 'Practice schedule management', completed: '1' }
    ]
    saveSchedule()
  }
}

function saveSchedule() {
  const storageKey = getStorageKey()
  localStorage.setItem(storageKey, JSON.stringify(schedule.itemList))
}

onMounted(() => {
  loadSchedule()
})

function addItem() {
  const newItem = {
    sid: Date.now(),
    title: '',
    completed: '0'
  }
  schedule.itemList.push(newItem)
  saveSchedule()
}

function updateItem(index) {
  const item = schedule.itemList[index]
  if (!item.title.trim()) {
    alert('Schedule content cannot be empty!')
    return
  }
  saveSchedule()
  alert('Schedule updated successfully!')
}

function removeItem(index) {
  if (confirm('Are you sure you want to delete this schedule?')) {
    schedule.itemList.splice(index, 1)
    saveSchedule()
  }
}

function toggleStatus(index) {
  saveSchedule()
}
</script>

<template>
  <div class="schedule-container">
    <div class="schedule-header">
      <h2>📅 My Schedule</h2>
      <p>Welcome back, <strong>{{ sysUser.username || 'User' }}</strong></p>
      <button class="btn-add" @click="addItem">
        + Add New Schedule
      </button>
    </div>

    <div class="schedule-list">
      <div v-for="(item, index) in schedule.itemList" :key="item.sid" class="schedule-card">
        <div class="card-content">
          <input
            v-model="item.title"
            type="text"
            class="task-input"
            placeholder="What do you need to do?"
          />

          <div class="status-group">
            <label class="status-label">
              <input
                type="radio"
                :value="'0'"
                v-model="item.completed"
                @change="toggleStatus(index)"
              />
              <span class="status-text pending">Pending</span>
            </label>
            <label class="status-label">
              <input
                type="radio"
                :value="'1'"
                v-model="item.completed"
                @change="toggleStatus(index)"
              />
              <span class="status-text completed">Completed</span>
            </label>
          </div>
        </div>

        <div class="card-actions">
          <button class="btn-save" @click="updateItem(index)">Save</button>
          <button class="btn-delete" @click="removeItem(index)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="schedule.itemList.length === 0" class="empty-state">
      <p>No schedules yet. Click "Add New Schedule" to get started!</p>
    </div>
  </div>
</template>

<style scoped>
.schedule-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
}

.schedule-header {
  text-align: center;
  margin-bottom: 30px;
}

.schedule-header h2 {
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 8px;
}

.schedule-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.btn-add {
  margin-top: 15px;
  background: #27ae60;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-add:hover {
  background: #219653;
  transform: scale(1.05);
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.schedule-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}

.schedule-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-input {
  width: 100%;
  padding: 14px;
  border: 2px solid #dfe4ea;
  border-radius: 10px;
  font-size: 1.05rem;
}

.task-input:focus {
  border-color: #3498db;
  outline: none;
}

.status-group {
  display: flex;
  gap: 25px;
}

.status-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.status-text {
  font-weight: 500;
}

.pending { color: #f39c12; }
.completed { color: #27ae60; }

.card-actions {
  margin-top: 15px;
  display: flex;
  gap: 12px;
}

.btn-save {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-delete {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #7f8c8d;
  font-size: 1.1rem;
}
</style>