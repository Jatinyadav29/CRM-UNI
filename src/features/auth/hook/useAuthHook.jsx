import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginUserApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../state/authSlice";
import { toast } from "react-toastify";

export const useAuth = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const registerForm = (data) => {
    console.log("register", data);
  };

  const loginForm = async (data) => {
    try {
      let response = await loginUserApi(data);
      dispatch(addUser(response));
      toast.success("User Login succesful 🙌");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    reset,
    registerForm,
    loginForm,
  };
};
