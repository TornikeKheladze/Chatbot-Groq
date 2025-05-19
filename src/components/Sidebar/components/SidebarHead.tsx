import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../storage/store";
import { toggleTheme } from "../../../storage/themeSlice";

type SidebarHeadProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SidebarHead: React.FC<SidebarHeadProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<TextInput>(null);
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const textColor = theme.text.primary;

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleFocus}>
          <AntDesign
            style={{
              position: "absolute",
              right: 5,
              top: 10,
            }}
            name="search1"
            size={20}
            color={textColor}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            borderColor: theme.border.default,
            color: textColor,
            borderWidth: 1,
            flex: 1,
            height: "100%",
            borderRadius: 6,
            paddingLeft: 5,
          }}
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
        />
      </View>
      <TouchableOpacity style={styles.switch} onPress={toggle}>
        <Switch
          value={theme.mode === "dark" ? true : false}
          onValueChange={toggle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SidebarHead;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  searchContainer: {
    flex: 1,
    height: 40,
    marginRight: 10,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
