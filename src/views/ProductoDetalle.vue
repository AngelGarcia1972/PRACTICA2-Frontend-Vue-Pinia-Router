<template>
  <div>
    <button @click="router.back()">← Volver al catálogo</button>

    <div v-if="producto">
      <h1>{{ producto.nombre }}</h1>
      <p>{{ producto.descripcion }}</p>
      <p>Precio: ${{ producto.precio }}</p>
      <p>Stock: {{ producto.stock }}</p>
    </div>

    <div v-else>
      <p>Cargando producto...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "../plugins/axios";

const props = defineProps({ id: String });
const router = useRouter();
const producto = ref(null);

onMounted(async () => {
	try {
		const response = await axios.get(`/productos/${props.id}`);
		producto.value = response.data;
	} catch (e) {
		router.push("/404");
	}
});
</script>