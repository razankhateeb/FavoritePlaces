import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/Colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
export default function App() {
  const [dbIsInitialized, setDbIsInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => setDbIsInitialized(true))
      .catch((err) => console.log(err));
  }, []);

  if (!dbIsInitialized) return <AppLoading />;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="allPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="ios-add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("addPlaces")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="addPlaces"
            component={AddPlace}
            options={{
              title: "Add New Place",
            }}
          />
          <Stack.Screen component={Map} name="Map" />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
