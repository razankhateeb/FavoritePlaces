import React, { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Place } from "../../models/place";

function PlaceForm({ onSavePlace }) {
  const [enteredTitle, setEnteredTitle] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(text) {
    setEnteredTitle(text);
  }
  function takeImageHAndler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onSavePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title </Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={takeImageHAndler} />
      <LocationPicker onLocationPick={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  form: {
    flex: 1,
    padding: 24,
  },
});
