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
        onPress={() => navigation.navigate("About Us")}
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
      <Search />
    </View>
  );
};

const styles = StyleSheet.create({
  //
});
