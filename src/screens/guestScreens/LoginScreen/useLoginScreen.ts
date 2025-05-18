import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginSchema } from "../../../schemas/loginSchema";
import { AppDispatch, RootState } from "../../../storage/store";
import { saveAuthUser } from "../../../storage/userSlice";

type UserLoginForm = {
  email: string;
  password: string;
};

export const useLoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserLoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const { users } = useSelector((store: RootState) => store.users);
  const { theme } = useSelector((store: RootState) => store.theme);

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: UserLoginForm) => {
    const userToLogin = users.find(
      (user) => data.email === user.email && data.password === user.password
    );
    if (userToLogin) {
      dispatch(saveAuthUser(userToLogin));
    } else {
      setError("password", {
        message: "Email or password is not correct",
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    theme,
  };
};
