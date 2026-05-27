import axios from "axios";
import router from "../router";

axios.defaults.baseURL = "http://localhost:8000/api";

axios.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err.response?.status === 401) {
			router.push("/login");
		}
		return Promise.reject(err);
	},
);

export default axios;
