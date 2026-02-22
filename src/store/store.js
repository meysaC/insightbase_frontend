import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "@/features/documents/documentSlice"
import authReducer from "@/features/auth/authSlice"
import { bootstrapAuth } from "@/features/auth/authThunks";

export const store = configureStore({
    reducer: {
        documents: documentReducer,
        auth: authReducer,
    }
});

store.dispatch(bootstrapAuth());

export default store;
