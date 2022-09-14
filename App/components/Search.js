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
import { Feather } from "@expo/vector-icons";

export default Search = ({ onPress = () => {}, loading = false }) => {
  return (
    <View
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
      <TextInput
        placeholder="Search for your lost items"
        style={{
          width: "100%",
          marginLeft: 10,
          fontSize: 14,
          fontFamily: "Inter_500Medium",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //
});
