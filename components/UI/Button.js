import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    marginHorizontal: 4,
    backgroundColor: Colors.primary700,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontVariant: "bold",
    color: Colors.white100,
  },
});
