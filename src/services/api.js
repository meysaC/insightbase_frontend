import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, //refresh cookie authentication varsa true
});

// Global error handling, response -> token expired yakalama
// api.interceptors.response.use(
//   (res) => res,
//    (err) => {
//     console.error("API Error:", err.response?.data || err.message);
//     return Promise.reject(err.response?.data || err.message);
//   }
// );

export default api;