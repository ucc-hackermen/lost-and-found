import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LogIn from "./screens/LogIn";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import CustomDrawer from "./navigation/CustomDrawer";
import { AppLoading } from "./AppLoading";
import StackNav from "./navigation/StackNav";
import AboutUs from "./screens/AboutUs";

import { UserContext } from "./context";

function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });
  const loggedIn = false;
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return loggedIn ? (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={StackNav}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="About Us"
            component={AboutUs}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    ) : (
      <LogIn />
    );
  }
}

export default () => {
  const [userContext, setuserContext] = useState({});
  return (
    <UserContext.Provider value={{ userContext, setuserContext }}>
      <App />
    </UserContext.Provider>
  );
};
