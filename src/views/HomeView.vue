<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/catalogo">Catálogo</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>

    <h1>Bienvenido a la Tienda</h1>
    <p>Los mejores productos al mejor precio</p>
    <router-link to="/catalogo">Ver Catálogo</router-link>

    <h2>Últimos Productos</h2>
    <div v-for="producto in ultimos" :key="producto.id">
      <h3>{{ producto.nombre }}</h3>
      <p>{{ producto.precio }}</p>
      <router-link :to="`/catalogo/${producto.id}`">Ver detalle</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../plugins/axios";

const ultimos = ref([]);

onMounted(async () => {
	const response = await axios.get("/productos");
	ultimos.value = response.data.slice(0, 3);
});
</script>