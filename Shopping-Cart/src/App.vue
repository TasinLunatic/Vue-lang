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

<style scoped>
.app {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.cart {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.cart-header {
  background: #f8f8f8;
  padding: 12px 15px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.cart-item {
  padding: 12px 15px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.delete-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #ff3333;
}

.total {
  text-align: right;
  padding: 20px;
  background: #f0f8f0;
  border-radius: 8px;
  font-size: 1.4em;
  border: 2px solid #4caf50;
}

.note {
  text-align: center;
  color: #666;
  margin-top: 15px;
  font-style: italic;
}
</style>