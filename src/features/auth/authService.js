import api from "@/services/api"

let accessToken = null; // sadece memoryde tutuyoruz (XSS'e karşı güvenli), localStorage veya cookie kullanmıyoruz
export const setAccessToken = (token) => {
  accessToken = token;
};
export const clearAccessToken = () => {
  accessToken = null;
};
export const getAccessToken = () => accessToken;


// HTTP-only service (business logic yok)
export const authService = {
  register: (data) => api.post("auth/register", data),
  login: (data) => api.post("auth/login", data),
  logout: () => api.post("auth/logout"),
  me: () => api.get("auth/me"),
  refreshToken: () => api.post("auth/refresh-token"),
}
