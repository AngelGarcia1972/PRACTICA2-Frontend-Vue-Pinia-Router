import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
	{ path: "/", component: () => import("../views/HomeView.vue") },
	{ path: "/catalogo", component: () => import("../views/CatalogoView.vue") },
	{
		path: "/catalogo/:id",
		component: () => import("../views/ProductoDetalle.vue"),
		props: true,
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/LoginView.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/RegisterView.vue"),
	},
	{
		path: "/admin",
		component: () => import("../layouts/AdminLayout.vue"),
		meta: { requiresAuth: true },
		children: [
			{ path: "", component: () => import("../views/admin/Dashboard.vue") },
			{
				path: "productos",
				component: () => import("../views/admin/Productos.vue"),
			},
		],
	},
	{ path: "/carrito", component: () => import("../views/CartView.vue") },
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("../views/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to) => {
	const auth = useAuthStore();
	if (to.meta.requiresAuth && !auth.isAuthenticated) {
		return { path: "/login", query: { redirect: to.fullPath } };
	}
});

export default router;
