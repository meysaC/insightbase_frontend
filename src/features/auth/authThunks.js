import { authService, setAccessToken, clearAccessToken } from "./authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, {rejectWithValue}) => {
        try {
            const res = await authService.register(data);
            setAccessToken(res.data.token);

            const meRes = await authService.me();
            return { user: meRes.data };
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Kayıt işlemi başarısız!"
            );
        }
    }
)

export const fetchMe = createAsyncThunk(
    "auth/me",
    async (_, {rejectWithValue}) => {
        try {
            const res = await authService.me();
            return { user: res.data };
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.errors || "Kullanıcı bilgileri alınamadı!"
            );
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, {rejectWithValue}) => {
        try {
            const loginRes = await authService.login(data);
            setAccessToken(loginRes.data.token);
            
            const meRes = await authService.me();
            return { user: meRes.data };
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Email veya şifre hatalı!"
            );
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
            clearAccessToken();
            return null; // Redux Toolkit otomatik olarak fulfilled action'ı oluşturur
        } catch (error) {
            // logout hata verse bile access token'ı temizle
            clearAccessToken();
            return rejectWithValue(
                error?.response?.data?.message || "Çıkış işlemi başarısız!"
            );
        }
    }
)

// Oturum açılışında kullanıcı durumunu kontrol etme
export const bootstrapAuth = createAsyncThunk(
    "auth/bootstrap",
    async (_, {rejectWithValue}) => {
        try {
            // 1. refresh token ile yeni acces token al
            const refreshResponse = await authService.refreshToken();
            const newAccessToken = refreshResponse.data.token;
            
            setAccessToken(newAccessToken);

            // 2. kullanıcı bilgilerini çek
            const meResponse = await authService.me();
            return { user: meResponse.data };
        } catch (error) {
            clearAccessToken();
            return rejectWithValue(null);
        }
    }
)