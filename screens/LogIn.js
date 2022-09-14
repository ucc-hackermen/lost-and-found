import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const LogIn = () => {
  const login = () => {
    console.log("login");
  };
  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={[
          "#fff",
          "#fff",
          "rgba(255,255,255,0.8)",
          "rgba(255,255,255,0.5)",
          "rgba(255,255,255,0.3)",
          "transparent",
          "rgba(255,255,255,0.5)",
          "#fff",
        ]}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontFamily: "Inter_700Bold",
              lineHeight: 40,
            }}
          >
            {`Lost`}
            <Text style={{ color: "#ff0a54" }}>&</Text>
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: 40,
              fontFamily: "Inter_700Bold",
              lineHeight: 40,
            }}
          >
            {`Found`}
          </Text>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Inter_600SemiBold",
                marginTop: 40,
                marginBottom: 10,
                color: "#000",
              }}
            >
              {`Something's missing?`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                textAlign: "center",
                color: "#5e6472",
              }}
            >
              {`Ask help from people to help \nyou find it`}
            </Text>
          </View>
        </View>
        <LogIn />
      </LinearGradient>
    </ImageBackground>
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
});
