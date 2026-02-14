import { authService } from "./authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await authService.register(data);
            
            return { token: res.data.token };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Kayıt işlemi başarısız!"
            );
        }
    }
)

export const fetchMe = createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
        try {
            const res = await authService.me();
            
            return {
                token: res.data.token,
                user: res.data.user,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.errors || "Kullanıcı bilgileri alınamadı!"
            );
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        try {
            const res = await authService.login(data);
            
            return {
                token: res.data.token,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Giriş işlemi başarısız!"
            );
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await authService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Çıkış işlemi başarısız!"
            );
        }
    }
)

export const boostrapAuth = createAsyncThunk(
    "auth/bootstrap",
    async (_, thunkAPI) => {
        try {
            const refreshResponse = await authService.refreshToken();
            const meResponse = await authService.me();
            
            return {
                token: refreshResponse.data.token,
                user: meResponse.data.user,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.message || "Oturum yenilenemedi!"
            );
        }
    }
)