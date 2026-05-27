<template>
  <div>
    <h1>Dashboard</h1>

    <div v-if="auth.user">
      <p>Bienvenido, <strong>{{ auth.user.name }}</strong></p>
      <p>Email: {{ auth.user.email }}</p>
    </div>

    <button @click="handleLogout">Cerrar Sesión</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from '../plugins/axios'

const auth = useAuthStore()

onMounted(async () => {
  try {
    const response = await axios.get('/me')
    auth.user = response.data
  } catch (e) {
    console.error('Error al cargar usuario')
  }
})

const handleLogout = async () => {
  await auth.logout()
}
</script>