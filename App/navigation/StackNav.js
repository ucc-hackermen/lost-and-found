import { View, Text } from "react-native";
import React from "react";
import Home from "../screens/Home";
import Camera_ from "../screens/Camera";
import Create from "../screens/Create";
import Items from "../screens/Items";
import Map from "../screens/Map";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={Home} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Camera" component={Camera_} />
      <Stack.Screen name="Items" component={Items} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default StackNav;
