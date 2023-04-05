import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function IconButton({ onPress, icon, color, size }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  button: {
    padding: 8,
    justifyContent: "center",
    alignContent: "center",
  },
});
