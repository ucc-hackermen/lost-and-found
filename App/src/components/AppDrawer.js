import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AboutUs from "../screens/AboutUs";
import CustomDrawer from "./CustomDrawer";

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="About"
        component={AboutUs}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
