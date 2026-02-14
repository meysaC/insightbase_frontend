import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null, // sadece memory 
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
          // register
          .addCase("auth/register/pending", (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase("auth/register/fulfilled", (state, action) => {
              state.loading = false;
              state.token = action.payload.token;
            //   state.user = action.payload.user;
          })
          .addCase("auth/register/rejected", (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })

          // login
          .addCase("auth/login/pending", (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase("auth/login/fulfilled", (state, action) => {
              state.loading = false;
              state.token = action.payload.token;
            //   state.user = action.payload.user;
          })
          .addCase("auth/login/rejected", (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })

          // fetch me
          .addCase("auth/me/pending", (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase("auth/me/fulfilled", (state, action) => {
              state.loading = false;
              state.user = action.payload.user;
          })
          .addCase("auth/me/rejected", (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })

          // logout
          .addCase("auth/logout/pending", (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase("auth/logout/fulfilled", (state) => {
              state.loading = false;
              state.token = null;
              state.user = null;
          })
          .addCase("auth/logout/rejected", (state, action) => {
              state.loading = false;
              state.error = action.payload;
          });

        // bootstrap auth
        //   .addCase("auth/bootstrap/pending", (state) => {
        //       state.loading = true;
        //       state.error = null;
        //   })
        //   .addCase("auth/bootstrap/fulfilled", (state, action) => {
        //       state.loading = false;
        //       state.token = action.payload.token;
        //       state.user = action.payload.user;
        //   })
        //   .addCase("auth/bootstrap/rejected", (state, action) => {
        //       state.loading = false;
        //       state.error = action.payload;
        //   });

    }
})

export const { 
    setToken, 
    logout 
} = authSlice.actions;

export default authSlice.reducer;