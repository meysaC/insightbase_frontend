import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // refresh cookie authentication varsa true
    headers: {
        "Content-Type": "application/json",
    },
});

// Global error handling, response -> token expired yakalama
api.interceptors.response.use(
  (res) => res,
   (err) => {
    const normalizedError = {
        message: err.response?.data?.message || err.message || "Bir hata oluştu!",
        status: err.response?.status,
        data: err.response?.data || null,
    };
    return Promise.reject(normalizedError);
  }
);

export default api;