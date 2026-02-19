import api from "./api";
import { getAccessToken, setAccessToken } from "@/features/auth/authService"; //, setAccessToken

// Concurrent refresh token isteklerini önlemek için (App açılışında refresh token yoksa veya geçersizse sonsuz loading de kalabilir)
let isRefreshing = false; // aynı anda birden fazla refresh token isteğini önlemek için (Race Condition)
let failedQueue = []; 

// Token yenilenirken gelen diğer 401 hataları kuyruğa alınıyor ve token gelince hepsi birlikte işleniyor. (Promise.all gibi düşün)(Queue Sistemi)
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

// token yenleme mantığı 
// app başlamadan önce kurulmalı o yüzden main.jsx de
export const setupAuthInterceptor = () => {
  
  // REQUEST INTERCEPTOR
  // 1. request -> access token ekleme
  // 2. request -> token yoksa veya geçersizse loglama
  // 3. request -> hata varsa loglama
  // 4. request -> her istekte token kontrolü yapma (XSS'e karşı güvenli)
  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  // RESPONSE INTERCEPTOR
  // 1. response -> token expired yakalama, 401, -> token yenileme
  // 2. response -> token yenileme başarılı ise orijinal isteği tekrar gönderme
  // 3. response -> token yenileme başarısız ise logout işlemi yapma
  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalRequest = err.config;
      
      // refresh token endpointinde hata varsa direkt reddet
      if (originalRequest.url.includes("auth/refresh-token"))
      {
        isRefreshing = false;
        processQueue(err, null);
        return Promise.reject(err);
      }

      // 401 ve daha önce token yenileme yapılmadıysa
      if (err.response?.status === 401 && !originalRequest._retry) {

        // eğer zaten refresh işlemi devam ediyorsa kuyruğa ekle
        if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
        }
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // yeni token al (backend set-cookie ile refresh token gönderir)
          const { data } = await api.post("/auth/refresh-token")
          const newAccessToken = data.token;

          // yeni acces token ı kaydet
          setAccessToken(newAccessToken);

          // kuyrukta bekleyen itekleri işle
          processQueue(null, newAccessToken);

          //orijinal isteği yeni token ile tekrar gönder
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);          
       
        } catch (refreshError) {
          // refresh token da geçersizse logout işlemi yap
          processQueue(refreshError, null);

          // logout dispatch işlemi -> circular dependency önlemek için dynamic import
          import("@/store/store").then(({ store }) => {
            import("@/features/auth/authThunks").then(({ logoutUser }) => {
              console.log("🚪 Logging out user...");
              store.dispatch(logoutUser());
            });
          });
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false; // refresh işlemi bitti
        }
      }

      return Promise.reject(err);
    }
  );
};
