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
  FlatList,
  Share,
} from "react-native";
import React from "react";
import { onChange } from "react-native-reanimated";

export default ItemCard = ({ item = {}, index, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "48.5%",
        backgroundColor: "#eee",
        borderRadius: 15,
        flexDirection: "column",
        // alignItems: "center",
        // height: 290,
        marginRight: index == 0 || index % 2 !== 0 ? 10 : 0,
        marginBottom: 10,
      }}
    >
      <Image
        source={{
          uri:
            item?.photo != "string"
              ? item?.photo
              : "https://tgtsafrica.com/wp-content/uploads/2020/11/placeholder-640x427.png",
        }}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          paddingHorizontal: 15,
          marginVertical: 7,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_700Bold",
            color: "#000",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_400Regular",
            color: "gray",
          }}
        >
          {item.description}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              const result = await Share.share({
                message:
                  "Help me find this lost item. I lost a " +
                  " " +
                  item.title +
                  " " +
                  "in the " +
                  " " +
                  item.location +
                  " " +
                  "on " +
                  " ",
                //+ item.date,
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error) {
              alert(error.message);
            }
          }}
          style={{
            width: "100%",
            backgroundColor: "#73d2de",
            borderRadius: 10,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_700Bold",
              color: "#fff",
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //
});
