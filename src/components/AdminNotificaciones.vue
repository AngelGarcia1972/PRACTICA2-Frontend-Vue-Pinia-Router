<template>
  <div class="notificaciones">
    <TransitionGroup name="toast" tag="div">
      <div v-for="p in pedidosNuevos" :key="p.id" class="toast pedido">
        🛒 Nuevo pedido #{{ p.id }} de {{ p.cliente }} — ${{ p.total }}
      </div>
    </TransitionGroup>

    <div v-for="a in alertasStock" :key="a.producto_id" class="toast stock">
      ⚠️ Stock bajo: {{ a.nombre }} ({{ a.stock_actual }} unidades)
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { createEcho } from "../plugins/echo";

const pedidosNuevos = ref([]);
const alertasStock = ref([]);
let echoInstance = null;

onMounted(() => {
	echoInstance = createEcho();
	echoInstance
		.private("admin-panel")
		.listen("NuevoPedidoRecibido", (e) => {
			pedidosNuevos.value.unshift(e);
			setTimeout(() => pedidosNuevos.value.pop(), 10000);
		})
		.listen("StockBajoAlerta", (e) => {
			alertasStock.value.unshift(e);
		});
});

onUnmounted(() => echoInstance?.leave("admin-panel"));
</script>

<style scoped>
.notificaciones {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.toast {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.pedido { background-color: #198754; }
.stock  { background-color: #dc3545; }
.toast-enter-active, .toast-leave-active { transition: all 0.4s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(100px); }
</style>