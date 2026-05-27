<template>
  <div>
    <h2>Iniciar Sesión</h2>

    <div v-if="error" style="color: red">{{ error }}</div>

    <div>
      <label>Email</label>
      <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" />
    </div>
    <div>
      <label>Contraseña</label>
      <input v-model="form.password" type="password" placeholder="********" />
    </div>

    <button @click="handleLogin">Entrar</button>
    <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const error = ref('')
const form = ref({ email: '', password: '' })

const handleLogin = async () => {
  try {
    error.value = ''
    await auth.login(form.value)
  } catch (e) {
    error.value = 'Credenciales incorrectas'
  }
}
</script>