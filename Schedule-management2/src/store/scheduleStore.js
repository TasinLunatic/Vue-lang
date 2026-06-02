import { defineStore } from 'pinia'

export const defineSchedule = defineStore('scheduleList', {
  state: () => ({
    itemList: []
  }),

  actions: {
    addItem(newItem) {
      this.itemList.push(newItem)
    },

    removeItem(index) {
      this.itemList.splice(index, 1)
    },

    clearAll() {
      this.itemList = []
    }
  }
})