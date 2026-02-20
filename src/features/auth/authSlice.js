import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, fetchMe, logoutUser, bootstrapAuth } from "./authThunks";

const initialState = {
    user: null,
    status: "idle",
    error: null,
    isInitialized: false, // Kullanıcı bilgileri yüklenene kadar false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
        state.status = "idle";
      },
    },
    extraReducers: (builder) => {
        builder
      // ========== LOGIN ==========
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isInitialized = true; // hata olsa bile kullanıcı bilgileri yüklenmiş sayılır
      })

      // ========== REGISTER ==========
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.isInitialized = true; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isInitialized = true;
      })

      // ========== FETCH ME ==========
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
      })

      // ========== BOOTSTRAP (sessiz başlatma) ==========
      .addCase(bootstrapAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.isInitialized = true; // kullanıcı bilgileri yüklenmiş sayılır
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        // sessizce başarısız ol (kullanıcıya hata gösterme)
        state.user = null;
        state.status = "idle";
        state.error = null;
        state.isInitialized = true; // app hazır
      })

      // ========== LOGOUT ==========
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "succeeded";
        state.error = null;
        state.isInitialized = true; // logout olsa bile app hazır kalır
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
        state.status = "failed";
        state.error = null;
        state.isInitialized = true;
      });          
    },
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;