import { authService } from "./authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const res = await authService.register(data);

            thunkAPI.dispatch(fetchMe());
            
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
                user: res.data.user,
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

// // backend set-cookie ile refresh token gönderiyor, front sadece access token alıyor/ilgileniyor
// export const registerUser = (data) => async (dispatch) => {
//     try {
//         dispatch(authStart());

//         const res = await authService.register(data);

//         dispatch(
//             authSuccess({
//                 token: res.data.token,
//                 user: res.data.user,
//             })
//         )
//     } catch (error) {
//         dispatch(authFail(error?.message || "Kayıt işlemi başarısız!"));   
//     }
// }

// export const fetchMe = () => async (dispatch) => {
//     try {
//         dispatch(authStart());
//         const res = await authService.me();

//         dispatch(
//             authSuccess({
//                 token: res.data.token,
//                 user: res.data.user,
//             })
//         )
//     } catch (error) {
//         dispatch(authFail(error?.errors || "Kullanıcı bilgileri alınamadı!"));   
//     }
// }