<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/catalogo">Catálogo</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <CartIcon />
    </nav>

    <h1>Catálogo de Productos</h1>

    <input v-model="busqueda" type="text" placeholder="Buscar producto..." />

    <div v-if="loading">Cargando productos...</div>

    <div v-else-if="productosFiltrados.length === 0">
      <p>No se encontraron productos</p>
    </div>

    <div v-else v-for="producto in productosFiltrados" :key="producto.id">
      <img
        :src="producto.imagen_url || 'https://placehold.co/200x150?text=Sin+imagen'"
        :alt="producto.nombre"
        style="width: 200px; height: 150px; object-fit: cover"
        @error="e => e.target.src = 'https://placehold.co/200x150?text=Sin+imagen'"
      />
      <h3>{{ producto.nombre }}</h3>
      <p>{{ producto.descripcion }}</p>
      <p>Precio: ${{ producto.precio }}</p>
      <p>Stock: {{ producto.stock }}</p>
      <router-link :to="`/catalogo/${producto.id}`">Ver detalle</router-link>

      <button @click="carrito.agregar(producto)">
        <template v-if="carrito.cantidadDeProducto(producto.id) > 0">
          En carrito ({{ carrito.cantidadDeProducto(producto.id) }})
        </template>
        <template v-else>
          Agregar al carrito
        </template>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '../plugins/axios'
import { useCarritoStore } from '../stores/carrito'
import CartIcon from '../components/CartIcon.vue'

const productos = ref([])
const busqueda = ref('')
const loading = ref(false)
const carrito = useCarritoStore()

carrito.$subscribe((mutation, state) => {
  localStorage.setItem('carrito', JSON.stringify(state.items))
})

onMounted(async () => {
  loading.value = true
  const response = await axios.get('/productos')
  productos.value = response.data.data ?? response.data
  loading.value = false
})

const productosFiltrados = computed(() =>
  productos.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)
</script>