<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/catalogo">Catálogo</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>

    <h1>Catálogo de Productos</h1>

    <input v-model="busqueda" type="text" placeholder="Buscar producto..." />

    <div v-if="productosFiltrados.length === 0">
      <p>No se encontraron productos</p>
    </div>

    <div v-for="producto in productosFiltrados" :key="producto.id">
      <h3>{{ producto.nombre }}</h3>
      <p>{{ producto.descripcion }}</p>
      <p>Precio: ${{ producto.precio }}</p>
      <p>Stock: {{ producto.stock }}</p>
      <router-link :to="`/catalogo/${producto.id}`">Ver detalle</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '../plugins/axios'

const productos = ref([])
const busqueda = ref('')

onMounted(async () => {
  const response = await axios.get('/productos')
  productos.value = response.data
})

const productosFiltrados = computed(() =>
  productos.value.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
)
</script>