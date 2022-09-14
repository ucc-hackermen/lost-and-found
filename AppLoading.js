import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
export const AppLoading = ({ navigation }) => {
  return (
    <View
      //   source={require("../assets/sbg.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
