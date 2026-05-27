import { defineStore } from "pinia";
import axios from "../plugins/axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
		token: localStorage.getItem("token") || null,
	}),

	getters: {
		isAuthenticated: (state) => !!state.token,
	},

	actions: {
		async login(credentials) {
			const response = await axios.post("/login", credentials);
			this.token = response.data.token;
			this.user = response.data.user;
			localStorage.setItem("token", this.token);
			router.push("/admin");
		},

		async register(data) {
			const response = await axios.post("/register", data);
			this.token = response.data.token;
			this.user = response.data.user;
			localStorage.setItem("token", this.token);
			router.push("/admin");
		},

		async logout() {
			await axios.post("/logout");
			this.token = null;
			this.user = null;
			localStorage.removeItem("token");
			router.push("/login");
		},
	},
});
