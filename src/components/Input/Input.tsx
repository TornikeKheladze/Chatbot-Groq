import { Control, Controller, FieldError } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../storage/store";

type InputProps = {
  fieldName: string;
  error?: FieldError;
  control: Control<any>;
  displayName: string;
  props?: TextInputProps;
};

const Input: React.FC<InputProps> = ({
  fieldName,
  displayName,
  error,
  control,
  props,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  const { theme } = useSelector((store: RootState) => store.theme);

  const isPasswordInput =
    fieldName.includes("password") || fieldName.includes("Password");

  const textColor = theme.text.primary;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{displayName}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              { borderColor: theme.border.default, color: textColor },
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={String(value)}
            secureTextEntry={isPasswordInput ? isHidden : false}
            placeholder={displayName}
            placeholderTextColor={theme.text.tertiary}
            {...props}
          />
        )}
        name={fieldName}
        defaultValue=""
      />
      {isPasswordInput && (
        <TouchableOpacity
          onPress={() => setIsHidden(!isHidden)}
          style={styles.eyeIcon}
        >
          <Feather
            name={isHidden ? "eye-off" : "eye"}
            size={20}
            color={textColor}
          />
        </TouchableOpacity>
      )}

      <Text style={[styles.errorText, { opacity: error ? 1 : 0 }]}>
        {error?.message}
      </Text>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderRadius: 12,
    paddingLeft: 8,
    borderWidth: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 44,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
  },
});
