<template>
  <div style="display: flex">
    <aside style="width: 200px; background: #333; color: white; min-height: 100vh; padding: 20px">
      <h3>Panel Admin</h3>
      <p>{{ auth.user?.name }}</p>
      <nav>
        <ul style="list-style: none; padding: 0">
          <li><router-link to="/admin" style="color: white">Dashboard</router-link></li>
          <li><router-link to="/admin/productos" style="color: white">Productos</router-link></li>
          <li><router-link to="/catalogo" style="color: white">Catálogo</router-link></li>
        </ul>
      </nav>
      <button @click="auth.logout()">Cerrar Sesión</button>
    </aside>

    <main style="flex: 1; padding: 20px">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
</script>