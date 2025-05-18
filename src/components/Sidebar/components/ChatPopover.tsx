import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/store";
import Entypo from "@expo/vector-icons/Entypo";
import Popover from "react-native-popover-view";
import AntDesign from "@expo/vector-icons/AntDesign";

type ChatPopoverTypes = {
  showPopover: boolean;
  setShowpopover: Dispatch<SetStateAction<boolean>>;
  onEditPress: () => void;
  onDeletePress: () => void;
  isEditing: boolean;
};

const ChatPopover: React.FC<ChatPopoverTypes> = ({
  isEditing,
  onDeletePress,
  onEditPress,
  setShowpopover,
  showPopover,
}) => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const textColor = theme.text.primary;

  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowpopover(false)}
      from={
        <TouchableOpacity
          onPress={() => setShowpopover(true)}
          style={[styles.dots, isEditing ? { display: "none" } : {}]}
        >
          <Entypo name="dots-three-horizontal" size={20} color={textColor} />
        </TouchableOpacity>
      }
      popoverStyle={[
        styles.popoverStyle,
        { backgroundColor: theme.bg.primary },
      ]}
    >
      <View style={styles.popoverContent}>
        <TouchableOpacity style={styles.popoverBtn} onPress={onEditPress}>
          <AntDesign name="edit" size={20} color={textColor} />
          <Text style={[{ color: textColor }, styles.popoverText]}>Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.popoverBtn} onPress={onDeletePress}>
          <AntDesign name="delete" size={20} color="red" />
          <Text style={[{ color: textColor }, styles.popoverText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

export default ChatPopover;

const styles = StyleSheet.create({
  popoverText: {
    fontSize: 18,
  },
  popoverBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
    width: "100%",
  },
  popoverStyle: {
    width: 140,
    borderRadius: 10,
    padding: 20,
  },
  popoverContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dots: {
    position: "absolute",
    right: 5,
    top: 5,
    height: "100%",
  },
});
