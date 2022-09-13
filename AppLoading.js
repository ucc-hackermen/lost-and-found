import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, ImageBackground, Image } from "react-native";
//https://github.com/Gapur/react-native-image-avatar-picker
export const AppLoading = ({ navigation }) => {
  return (
    <ImageBackground
      //   source={require("../assets/sbg.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      {/* <Image style={styles.image} source={require("../assets/ja.gif")} /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0052fe",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 450,
    height: 450,
    marginTop: -70,
  },
});
