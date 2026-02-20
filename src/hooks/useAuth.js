import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, fetchMe, logoutUser } from "@/features/auth/authThunks"
import { clearError } from "@/features/auth/authSlice";


// ui böylece redux bilmez
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  return {
    // State
    user,
    isLoading: status === "loading",
    isAuthenticated: !!user,
    error,

    // Actions
    register: (data) => dispatch(registerUser(data).unwrap()),
    login: (data) => { dispatch(loginUser(data)).unwrap(); },
    me: () => dispatch(fetchMe()),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearError()),
  }
};
