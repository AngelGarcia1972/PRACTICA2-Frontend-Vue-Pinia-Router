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
      <div>
        <label>Imagen</label>
        <input type="file" accept="image/*" @change="onImageChange" />
        <div v-if="preview">
          <img :src="preview" alt="Preview" style="max-width: 200px; margin-top: 10px" />
        </div>
      </div>

      <button @click="guardar" :disabled="loading">
        {{ loading ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear') }}
      </button>
      <button v-if="modoEdicion" @click="cancelar">Cancelar</button>
    </div>

    <h2>Lista de Productos</h2>
    <div v-if="loading">Cargando...</div>
    <table v-else>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>
            <img
              v-if="producto.imagen_url"
              :src="producto.imagen_url"
              style="width: 50px; height: 50px; object-fit: cover"
            />
            <span v-else>Sin imagen</span>
          </td>
          <td>{{ producto.nombre }}</td>
          <td>${{ producto.precio }}</td>
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
import { ref, reactive, onMounted } from "vue";
import axios from "../../plugins/axios";

const productos = ref([]);
const modoEdicion = ref(false);
const mensaje = ref("");
const error = ref("");
const loading = ref(false);
const imagen = ref(null);
const preview = ref(null);
const form = reactive({
	id: null,
	nombre: "",
	descripcion: "",
	precio: "",
	stock: "",
});

onMounted(() => cargar());

const cargar = async () => {
	loading.value = true;
	const response = await axios.get("/productos");
	productos.value = response.data.data ?? response.data;
	loading.value = false;
};

const onImageChange = (e) => {
	const file = e.target.files[0];
	if (!file) return;
	imagen.value = file;
	preview.value = URL.createObjectURL(file);
};

const guardar = async () => {
	if (!form.nombre || !form.precio || !form.stock) {
		error.value = "Nombre, precio y stock son obligatorios";
		return;
	}
	try {
		loading.value = true;
		error.value = "";
		const fd = new FormData();
		fd.append("nombre", form.nombre);
		fd.append("descripcion", form.descripcion);
		fd.append("precio", form.precio);
		fd.append("stock", form.stock);
		if (imagen.value) fd.append("imagen", imagen.value);

		if (modoEdicion.value) {
			fd.append("_method", "PUT");
			await axios.post(`/productos/${form.id}`, fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			mensaje.value = "Producto actualizado";
		} else {
			await axios.post("/productos", fd, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			mensaje.value = "Producto creado";
		}
		cancelar();
		cargar();
		setTimeout(() => (mensaje.value = ""), 3000);
	} catch (e) {
		error.value = "Error al guardar el producto";
	} finally {
		loading.value = false;
	}
};

const editar = (producto) => {
	form.id = producto.id;
	form.nombre = producto.nombre;
	form.descripcion = producto.descripcion;
	form.precio = producto.precio;
	form.stock = producto.stock;
	preview.value = producto.imagen_url;
	modoEdicion.value = true;
};

const cancelar = () => {
	form.id = null;
	form.nombre = "";
	form.descripcion = "";
	form.precio = "";
	form.stock = "";
	imagen.value = null;
	preview.value = null;
	modoEdicion.value = false;
};

const eliminar = async (id) => {
	if (confirm("¿Seguro que quieres eliminar este producto?")) {
		await axios.delete(`/productos/${id}`);
		cargar();
	}
};
</script>