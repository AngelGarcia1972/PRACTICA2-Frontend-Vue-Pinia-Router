<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/catalogo">Catálogo</router-link>
    </nav>

    <h1>🛒 Mi Carrito</h1>

    <div v-if="carrito.items.length === 0">
      <p>Tu carrito está vacío</p>
      <router-link to="/catalogo">Ver catálogo</router-link>
    </div>

    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carrito.items" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>${{ item.precio }}</td>
            <td>
              <button @click="carrito.cambiarCantidad(item.id, item.cantidad - 1)">-</button>
              {{ item.cantidad }}
              <button @click="carrito.cambiarCantidad(item.id, item.cantidad + 1)">+</button>
            </td>
            <td>${{ (item.precio * item.cantidad).toFixed(2) }}</td>
            <td>
              <button @click="carrito.quitar(item.id)">×</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Total: ${{ carrito.totalPrecio.toFixed(2) }}</h3>

      <button @click="vaciarCarrito">Vaciar carrito</button>
      <button @click="finalizar">Finalizar compra</button>
    </div>
  </div>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()

carrito.$subscribe((mutation, state) => {
  localStorage.setItem('carrito', JSON.stringify(state.items))
})

const vaciarCarrito = () => {
  if (confirm('¿Seguro que quieres vaciar el carrito?')) {
    carrito.vaciar()
    localStorage.removeItem('carrito')
  }
}

const finalizar = () => {
  alert('¡Compra finalizada! Gracias por tu pedido 🎉')
  carrito.vaciar()
  localStorage.removeItem('carrito')
}
</script>