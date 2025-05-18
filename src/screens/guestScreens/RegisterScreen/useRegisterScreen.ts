import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../../types/common";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { registerSchema } from "../../../schemas/registerSchema";
import { AppDispatch } from "../../../storage/store";
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

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (data: UserRegisterForm) => {
    dispatch(registerUser(data));
    Alert.alert("Success", "User Registered", [
      {
        text: "Login",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  return {
    handleSubmit,
    control,
    errors,
    onSubmit,
  };
};
