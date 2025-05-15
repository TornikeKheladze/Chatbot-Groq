import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Switch,
  Button,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage/store";
import { resetTheme, toggleTheme } from "../../storage/themeSlice";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

const { width, height } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.8;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const dispatch = useDispatch<AppDispatch>();

  const translateX = useSharedValue(-SIDEBAR_WIDTH);
  const backdropOpacity = useSharedValue(0);
  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -SIDEBAR_WIDTH, {
      duration: 300,
    });
    backdropOpacity.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    display: backdropOpacity.value === 0 ? "none" : "flex",
  }));
  const toggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          { backgroundColor: theme.bg.primary },
        ]}
      >
        <Button title="theme change " onPress={toggle} />
        <Switch
          value={theme.mode === "dark" ? true : false}
          onValueChange={toggle}
        />
        <Button title="reset" onPress={() => dispatch(resetTheme())} />

        <Text style={{ color: theme.text.primary }}>Sidebar</Text>
        <LogoutBtn />
      </Animated.View>
    </>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 20,
    height,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
    height,
  },
});
