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

export default Nav = ({ navigation, onChangeText }) => {
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
        onPress={() => navigation.goBack()}
        style={{
          padding: 5,
          backgroundColor: "#edf6f9",
          borderRadius: 15,
        }}
      >
        <Feather name="chevron-left" size={30} color="#000" />
      </TouchableOpacity>
      <Search onChangeText={onChangeText} />
    </View>
  );
};

const styles = StyleSheet.create({
  //
});
