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
import { onChange } from "react-native-reanimated";

export default Input = ({ title = "", placeholder = "", onChange }) => {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Inter_700Bold",
          marginBottom: 5,
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          width: "100%",
          height: 60,
          paddingHorizontal: 15,
          borderRadius: 15,
          backgroundColor: "#edf6f9",
          fontSize: 14,
          fontFamily: "Inter_500Medium",
        }}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //
});
