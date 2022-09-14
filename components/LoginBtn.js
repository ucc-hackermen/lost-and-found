import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const LoginBtn = ({ onPress = () => {} }) => {
  const login = () => {
    console.log("login");
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View style={styles.ggcon}>
        <Image
          source={require("../assets/gg.png")}
          style={{
            width: 24,
            height: 24,
          }}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>Login with your institutional email</Text>
    </TouchableOpacity>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  ggcon: {
    padding: 2,
    borderRadius: 5,
    marginRight: 8,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 2,
    padding: 8,
    borderRadius: 15,
    width: "100%",
    height: 60,
  },
  text: {
    color: "#000",
    fontFamily: "Inter_700Bold",
  },
});
