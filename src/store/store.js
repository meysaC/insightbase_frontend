import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "@/features/documents/documentSlice"
import authReducer from "@/features/auth/authSlice"

export const store = configureStore({
    reducer: {
        documents: documentReducer,
        auth: authReducer,
    }
});

export default store;
