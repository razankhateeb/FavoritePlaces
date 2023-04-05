import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  if (!places || places.length === 0)
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          There are no places yet - start adding some !
        </Text>
      </View>
    );
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
