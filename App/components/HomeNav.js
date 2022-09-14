import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import React from "react";
import Search from "./Search";
import { Feather } from "@expo/vector-icons";

export default HomeNav = ({ navigation }) => {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        height: 45,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        // onPress={() => navigation.navigate("About Us")}
        onPress={() => navigation.openDrawer()}
        style={{
          padding: 5,
          backgroundColor: "#edf6f9",
          borderRadius: 15,
          height: 45,
          width: 45,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feather name="menu" size={25} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Items", { type: "lost" })}
        style={{
          width: "85%",
          backgroundColor: "#edf6f9",
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          height: 45,
        }}
      >
        <Feather name="search" size={24} color="#73d2de" />
        <Text
          style={{
            width: "100%",
            marginLeft: 10,
            fontSize: 14,
            fontFamily: "Inter_500Medium",
          }}
        >
          Search for your lost items
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //
});
