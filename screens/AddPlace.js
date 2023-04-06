import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function savePlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("allPlaces");
  }
  return <PlaceForm onSavePlace={savePlaceHandler} />;
}

export default AddPlace;
