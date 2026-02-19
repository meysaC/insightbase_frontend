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
      .addCase(logoutUser.fulfilled, () => ({
        ...initialState,
      }))
      .addCase(logoutUser.rejected, () => ({
        ...initialState,
      }));          




          // .addCase(loginUser.fulfilled, (state, action) => {
          //       state.user = action.payload.user;
          //   })
          // .addCase(registerUser.fulfilled, (state, action) => {
          //       state.user = action.payload.user;
          //   })
          //  .addCase(fetchMe.fulfilled, (state, action) => {
          //       state.user = action.payload.user;
          //   })
          //   .addCase(bootstrapAuth.fulfilled, (state, action) => {
          //       state.user = action.payload.user;
          //   })
          //  .addCase(logoutUser.fulfilled, () => initialState)


          // .addMatcher(
          //   (a) => a.type.startsWith("auth/") && a.type.endsWith("/pending"),
          //   (state) => {
          //     state.status = "loading";
          //   }
          // )
          // .addMatcher(
          //   (a) => a.type.startsWith("auth/") && a.type.endsWith("/rejected"),
          //   (state, action) => {
          //     state.status = "failed";
          //     state.error = action.payload;
          //   }
          // )
          // .addMatcher(
          //   (a) => a.type.startsWith("auth/") && a.type.endsWith("/fulfilled"),
          //   (state) => {
          //     state.status = "succeeded";
          //   }
          // )

          
          
        //   // register
        //   .addCase("auth/register/pending", (state) => {
        //       state.loading = true;
        //       state.error = null;
        //   })
        //   .addCase("auth/register/fulfilled", (state, action) => {
        //       state.loading = false;
        //       state.token = action.payload.token;
        //     //   state.user = action.payload.user;
        //   })
        //   .addCase("auth/register/rejected", (state, action) => {
        //       state.loading = false;
        //       state.error = action.payload;
        //   })

        //   // login
        //   .addCase("auth/login/pending", (state) => {
        //       state.loading = true;
        //       state.error = null;
        //   })
        //   .addCase("auth/login/fulfilled", (state, action) => {
        //       state.loading = false;
        //       state.token = action.payload.token;
        //     //   state.user = action.payload.user;
        //   })
        //   .addCase("auth/login/rejected", (state, action) => {
        //       state.loading = false;
        //       state.error = action.payload;
        //   })

        //   // fetch me
        //   .addCase("auth/me/pending", (state) => {
        //       state.loading = true;
        //       state.error = null;
        //   })
        //   .addCase("auth/me/fulfilled", (state, action) => {
        //       state.loading = false;
        //       state.user = action.payload.user;
        //   })
        //   .addCase("auth/me/rejected", (state, action) => {
        //       state.loading = false;
        //       state.error = action.payload;
        //   })

        //   // logout
        //   .addCase("auth/logout/pending", (state) => {
        //       state.loading = true;
        //       state.error = null;
        //   })
        //   .addCase("auth/logout/fulfilled", (state) => {
        //       state.loading = false;
        //       state.token = null;
        //       state.user = null;
        //   })
        //   .addCase("auth/logout/rejected", (state, action) => {
        //       state.loading = false;
        //       state.error = action.payload;
        //   });

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

    },
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;