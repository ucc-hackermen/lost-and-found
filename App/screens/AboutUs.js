import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text>About Us</Text>
    </View>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
