<template>
  <div>
    <h1>Gestión de Productos</h1>

    <div>
      <h2>{{ modoEdicion ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
      <div v-if="mensaje" style="color: green">{{ mensaje }}</div>
      <div v-if="error" style="color: red">{{ error }}</div>

      <div>
        <label>Nombre</label>
        <input v-model="form.nombre" type="text" placeholder="Nombre" />
      </div>
      <div>
        <label>Descripción</label>
        <input v-model="form.descripcion" type="text" placeholder="Descripción" />
      </div>
      <div>
        <label>Precio</label>
        <input v-model="form.precio" type="number" placeholder="0.00" />
      </div>
      <div>
        <label>Stock</label>
        <input v-model="form.stock" type="number" placeholder="0" />
      </div>
      <button @click="guardar">{{ modoEdicion ? 'Actualizar' : 'Crear' }}</button>
      <button v-if="modoEdicion" @click="cancelar">Cancelar</button>
    </div>

    <h2>Lista de Productos</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <button @click="editar(producto)">Editar</button>
            <button @click="eliminar(producto.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../../plugins/axios'

const productos = ref([])
const modoEdicion = ref(false)
const mensaje = ref('')
const error = ref('')
const form = ref({ nombre: '', descripcion: '', precio: '', stock: '' })

onMounted(async () => {
  cargar()
})

const cargar = async () => {
  const response = await axios.get('/productos')
  productos.value = response.data
}

const guardar = async () => {
  try {
    if (modoEdicion.value) {
      await axios.put(`/productos/${form.value.id}`, form.value)
      mensaje.value = 'Producto actualizado'
    } else {
      await axios.post('/productos', form.value)
      mensaje.value = 'Producto creado'
    }
    form.value = { nombre: '', descripcion: '', precio: '', stock: '' }
    modoEdicion.value = false
    error.value = ''
    cargar()
    setTimeout(() => mensaje.value = '', 3000)
  } catch (e) {
    error.value = 'Error al guardar el producto'
  }
}

const editar = (producto) => {
  form.value = { ...producto }
  modoEdicion.value = true
}

const cancelar = () => {
  form.value = { nombre: '', descripcion: '', precio: '', stock: '' }
  modoEdicion.value = false
}

const eliminar = async (id) => {
  if (confirm('¿Seguro que quieres eliminar este producto?')) {
    await axios.delete(`/productos/${id}`)
    cargar()
  }
}
</script>