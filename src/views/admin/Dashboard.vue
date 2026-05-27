<template>
  <div>
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de administración</p>

    <div>
      <h3>Total de productos: {{ total }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../../plugins/axios'

const total = ref(0)

onMounted(async () => {
  const response = await axios.get('/productos')
  total.value = response.data.length
})
</script>