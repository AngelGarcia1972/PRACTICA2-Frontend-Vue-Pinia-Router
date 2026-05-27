<template>
  <div>
    <h2>Registro</h2>

    <div v-if="error" style="color: red">{{ error }}</div>

    <div>
      <label>Nombre</label>
      <input v-model="form.name" type="text" placeholder="Tu nombre" />
    </div>
    <div>
      <label>Email</label>
      <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" />
    </div>
    <div>
      <label>Contraseña</label>
      <input v-model="form.password" type="password" placeholder="********" />
    </div>
    <div>
      <label>Confirmar Contraseña</label>
      <input v-model="form.password_confirmation" type="password" placeholder="********" />
    </div>

    <button @click="handleRegister">Registrarse</button>
    <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const error = ref('')
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleRegister = async () => {
  try {
    error.value = ''
    await auth.register(form.value)
  } catch (e) {
    error.value = 'Error al registrarse, verifica los datos'
  }
}
</script>