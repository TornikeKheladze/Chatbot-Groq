import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../types/common";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { registerSchema } from "../../../schemas/registerSchema";
import { AppDispatch, RootState } from "../../../storage/store";
import { registerUser } from "../../../storage/userSlice";

interface UserRegisterForm extends User {
  passwordConfirmation: string;
}

type Navigation = NativeStackNavigationProp<
  GuestStackParamList,
  "Register",
  undefined
>;

export const useRegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterForm>({
    resolver: yupResolver(registerSchema),
  });
  const navigation = useNavigation<Navigation>();
  const { theme } = useSelector((store: RootState) => store.theme);
  const { users } = useSelector((store: RootState) => store.users);

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: UserRegisterForm) => {
    if (users.find((user) => user.email === data.email)) {
      Alert.alert("Error", "Email Already Used", [
        {
          text: "Close",
        },
      ]);
    } else {
      dispatch(registerUser(data));
      Alert.alert("Success", "User Registered", [
        {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
    theme,
  };
};
