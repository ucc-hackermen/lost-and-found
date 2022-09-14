import { Button, Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Dimensions } from "react-native";

import { UserContext } from "../context";

const CustomDrawer = (props) => {
  const windowWidth = Dimensions.get("window").width;

  const { userContext, setuserContext } = useContext(UserContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.upper}>
          <View>
            <Image
              source={require("../assets/pp.png")}
              style={styles.profilepic}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.text}>Guest</Text>
          {/* <Text style={styles.subtext}>jd@ucc.edu.gh</Text> */}
        </View>
        <View style={styles.navCon}>
          {/* <DrawerItemList {...props} /> */}
          <DrawerItem
            style={styles.drawerItem}
            label="Home"
            labelStyle={{ fontSize: 16 }}
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          {/* <DrawerItem
            style={styles.drawerItem}
            label="About Us"
            labelStyle={{ fontSize: 16 }}
            onPress={() => {
              props.navigation.navigate("About");
            }}
          /> */}
          <DrawerItem
            style={styles.drawerItem}
            label="Log Out"
            labelStyle={{ fontSize: 16 }}
            onPress={() => {
              setuserContext(false);
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilepic: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    margin: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtext: {
    color: "#fff",
  },
  upper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6d560",
    width: "100%",
    paddingBottom: 20,
    marginBottom: 24,
  },
  drawerItem: {
    // width: "100%",
  },
  navCon: {
    width: "100%",
    flex: 1,
  },
});
