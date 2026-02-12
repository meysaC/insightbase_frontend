import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, fetchMe, logoutUser } from "@/features/auth/authThunks"


// ui böylece redux bilmez
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    // user: auth.user,
    // token: auth.token,
    // isAuthenticated: auth.isAuthenticated,
    // loading: auth.loading,
    // error: auth.error,

    register: (data) => dispatch(registerUser(data)),
    login: (data) => dispatch(loginUser(data)),
    me: () => dispatch(fetchMe()),
    logout: () => dispatch(logoutUser()),
  }
};
