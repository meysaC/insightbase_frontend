import api from "./api";
import { store } from "@/store/store";
import { logout, setToken } from "@/features/auth/authSlice";


// app başlamadan önce kurulmalı o yüzden main.jsx de
export const setupAuthInterceptor = () => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // response -> refresh flow
  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      
      if (originalRequest.url.includes("refresh-token"))
        return Promise.reject(err);

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await api.post("/auth/refresh-token")

          store.dispatch(setToken(res.data.token));
          
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;

          return api(originalRequest);
        } catch {
          store.dispatch(logout());
        }
      }

      return Promise.reject(err);
    }
  );
};
