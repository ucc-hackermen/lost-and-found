import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const LogIn = () => {
  const login = () => {
    console.log("login");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={login}>
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
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ggcon: {
    padding: 2,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 8,
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4586f4",
    padding: 8,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
  },
});
