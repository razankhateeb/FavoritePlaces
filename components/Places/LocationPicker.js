import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getAddress } from "../../util/location";
function LocationPicker({ onLocationPick }) {
  const [locationPermissionInformation, requestPermissions] =
    useForegroundPermissions(false);
  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      if (mapPickedLocation) {
        setPickedLocation(mapPickedLocation);
      }
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onLocationPick({ ...pickedLocation, address: address });
      }
    }
    handleLocation();
  }, [pickedLocation, onLocationPick]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermissions();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "you need to grant camera permissions for this app"
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Map Preview Available</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton
          color={Colors.primary500}
          icon="location"
          onPress={getLocationHandler}
        >
          Locate on User
        </OutlinedButton>

        <OutlinedButton
          color={Colors.primary500}
          icon="map"
          onPress={pickOnMapHandler}
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: Colors.primary100,
  },
  actions: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
