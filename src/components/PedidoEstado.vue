<template>
  <div v-if="!emailListo" class="estado procesando">
    ⏳ Procesando tu pedido...
  </div>
  <div v-else class="estado listo">
    ✅ ¡Pedido confirmado! Revisa tu correo.
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from '../plugins/axios'

const props = defineProps(['pedidoId'])

const emailListo = ref(false)
let intervalo = null

onMounted(() => {
  intervalo = setInterval(async () => {
    const { data } = await axios.get(`/pedidos/${props.pedidoId}`)
    emailListo.value = !!data.email_enviado_at
    if (emailListo.value) clearInterval(intervalo)
  }, 3000)
})

onUnmounted(() => clearInterval(intervalo))
</script>

<style scoped>
.estado {
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}
.procesando {
  background-color: #fff3cd;
  color: #856404;
}
.listo {
  background-color: #d1e7dd;
  color: #0f5132;
}
</style>