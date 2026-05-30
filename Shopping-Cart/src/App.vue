<script setup>
import { ref, computed } from 'vue'

// Shopping Cart Data - Only Cola and Chips
const cart = ref([
  { id: 1, name: "Cola", price: 3, quantity: 10 },
  { id: 2, name: "Chips", price: 6, quantity: 8 }
])

// Delete Product Function
const deleteItem = (id) => {
  cart.value = cart.value.filter(item => item.id !== id)
}

// compute() function - as required in homework
const compute = () => {
  let total = 0
  
  // Using forEach() 
  cart.value.forEach(item => {
    total += item.price * item.quantity
  })
  
  return total
}

// Auto-updating total
const totalAmount = computed(() => compute())
</script>

<template>
  <div class="app">
    <h1>🛒 Shopping Cart</h1>
    
    <div class="cart">
      <div class="cart-header">
        <span>Product</span>
        <span>Price (¥)</span>
        <span>Quantity</span>
        <span>Subtotal (¥)</span>
        <span>Action</span>
      </div>

      <div v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <span>{{ item.price }}</span>
        <span>{{ item.quantity }}</span>
        <span>{{ item.price * item.quantity }}</span>
        <button @click="deleteItem(item.id)" class="delete-btn">Delete</button>
      </div>
    </div>

    <div class="total">
      <h2>Total Amount: <strong>¥{{ totalAmount }}</strong></h2>
    </div>

    <p class="note">Total updates automatically after deleting any product</p>
  </div>
</template>

