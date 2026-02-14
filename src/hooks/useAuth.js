import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, fetchMe, logoutUser } from "@/features/auth/authThunks"


// ui böylece redux bilmez
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    register: (data) => dispatch(registerUser(data)),
    login: async (data) => {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result) {
        dispatch(fetchMe());
      }
    },
    me: () => dispatch(fetchMe()),
    logout: () => dispatch(logoutUser()),
  }
};
