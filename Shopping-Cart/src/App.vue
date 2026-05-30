<script setup>
import { ref, computed } from 'vue'
import './assets/App.css'


const cart = ref([
  { id: 1, name: "Cola", price: 3, quantity: 10 },
  { id: 2, name: "Chips", price: 6, quantity: 8 }
])

const deleteItem = (id) => {
  cart.value = cart.value.filter(item => item.id !== id)
}


const compute = () => {
  let total = 0
  cart.value.forEach(item => {
    total += item.price * item.quantity
  })
  return total
}

const totalAmount = computed(() => compute())
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>🛒 My Shopping Cart</h1>
      <p class="subtitle">Total Calculation Practice</p>
    </div>

    <div class="cart-card">
      <div class="cart-header">
        <span>Product</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Subtotal</span>
        <span>Action</span>
      </div>

      <div v-for="item in cart" :key="item.id" class="cart-item">
        <div class="product-name">
          <span class="emoji">{{ item.name === 'Cola' ? '🥤' : '🍟' }}</span>
          {{ item.name }}
        </div>
        <span class="price">¥{{ item.price }}</span>
        <span class="quantity">{{ item.quantity }}</span>
        <span class="subtotal">¥{{ item.price * item.quantity }}</span>
        <button @click="deleteItem(item.id)" class="delete-btn">
          🗑️ Delete
        </button>
      </div>
    </div>

    <div class="total-section">
      <h2>Total Amount: <span class="total-amount">¥{{ totalAmount }}</span></h2>
      <p class="note">The total updates automatically when you delete a product</p>
    </div>
  </div>
</template>