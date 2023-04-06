import React, { useState } from "react";
import { Alert, View, Button, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/Colors";

function ImagePicker({ onImageTaken }) {
  const [cameraPermissionsInformation, requestPermissions] =
    useCameraPermissions();

  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermissions();

      return permissionResponse.granted;
    }

    if (cameraPermissionsInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    if (cameraPermissionsInformation.status === PermissionStatus.GRANTED) {
      return true;
    }
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    onImageTaken(image.uri);
  }

  let imagePreview = <Text>No Image was Taken</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton
        icon="camera"
        size={20}
        onPress={takeImageHandler}
        color={Colors.primary500}
      >
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
