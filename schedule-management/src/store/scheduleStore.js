import { defineStore } from 'pinia'

export const defineSchedule = defineStore('scheduleList', {
  state: () => ({
    itemList: []
  }),

  actions: {
    // Add new schedule item
    addItem(newItem) {
      this.itemList.push(newItem)
    },

    // Remove schedule item
    removeItem(index) {
      this.itemList.splice(index, 1)
    },

    // Clear all schedules
    clearAll() {
      this.itemList = []
    }
  }
})