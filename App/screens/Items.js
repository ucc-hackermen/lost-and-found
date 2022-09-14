import { StatusBar } from "expo-status-bar";
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
import { Feather } from "@expo/vector-icons";
import { useRef, useMemo, useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import ItemCard from "../components/ItemCard";
import * as Location from "expo-location";

export default function Items({ navigation }) {
  const [currentPage, setcurrentPage] = useState("lost"); // page
  const [modal, setmodal] = useState(false);
  const [item, setitem] = useState(null);
  const [query, setquery] = useState("");

  const [lostitems, setlostitems] = useState([]);
  const [founditems, setfounditems] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      await fetch("https://ucc-lost-and-found.herokuapp.com/adverts")
        .then((data) => {
          return data.json();
        })
        .then((items) => {
          console.log(items);
          items.data.map((item) => {
            if (item.status == "lost") {
              let temparr = [];
              temparr.push(item);
              setlostitems(temparr);
            } else {
              let temparr = [];
              temparr.push(item);
              setfounditems(temparr);
            }
          });
        });
    };

    handleFetch();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          width: "100%",
          borderRadius: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
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

        <View
          style={{
            backgroundColor: "#eee",
            borderRadius: 15,
            width: 150,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => setcurrentPage("lost")}
            style={{
              padding: 5,
              backgroundColor: currentPage == "lost" ? "#73d2de" : "#eee",
              borderRadius: 15,
              height: 40,
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_700Bold",
                marginTop: -2,
                color: currentPage == "lost" ? "#fff" : "#000",
              }}
            >
              Lost
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setcurrentPage("found")}
            style={{
              padding: 5,
              backgroundColor: currentPage == "found" ? "#73d2de" : "#eee",
              borderRadius: 15,
              height: 40,
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_700Bold",
                marginTop: -2,
                color: currentPage == "found" ? "#fff" : "#000",
              }}
            >
              Found
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 15,
          }}
        >
          <Feather name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
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
          onChangeText={(txt) => {
            setquery(txt);
          }}
        />
        {/* Two column list of cards */}
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 20,
        }}
      >
        <FlatList
          horizontal={false}
          numColumns={2}
          data={
            currentPage == "lost"
              ? lostitems.filter((item) => {
                  return (
                    item.title.toLowerCase().indexOf(query.toLowerCase()) !==
                      -1 ||
                    item.location.toLowerCase().indexOf(query.toLowerCase()) !==
                      -1
                  );
                })
              : founditems.filter((item) => {
                  return (
                    item.title.toLowerCase().indexOf(query.toLowerCase()) !==
                      -1 ||
                    item.location.toLowerCase().indexOf(query.toLowerCase()) !==
                      -1
                  );
                })
          }
          renderItem={({ item, index }) => (
            <ItemCard
              item={item}
              index={index}
              onPress={() => {
                setitem(item);
                setmodal(true);
              }}
            />
          )}
          keyExtractor={(item) => item.key}
        />
      </View>

      {item ? (
        <Modal animationType="slide" transparent={true} visible={modal}>
          <BlurView
            intensity={Platform.OS == "ios" ? 50 : 100}
            tint="dark"
            style={{
              position: "absolute",
              width: "100%",
              height: Dimensions.get("window").height,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingTop: 100,
            }}
          >
            <View
              style={{
                width: "100%",
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 0,
              }}
            >
              <Image
                source={{ uri: item.photo }}
                style={{
                  width: "100%",
                  height: 400,
                  borderRadius: 15,
                  flex: 1,
                }}
              />
              <View
                style={{
                  marginVertical: 7,
                  width: "100%",
                  flex: 1,
                  justifyContent: "flex-end",
                  marginBottom: -5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      fontFamily: "Inter_700Bold",
                      color: "#000",
                      marginTop: 5,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Inter_400Regular",
                      color: "gray",
                      marginTop: 3,
                    }}
                  >
                    {item.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 30,
                      alignItems: "center",
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#73d2de" />
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Inter_400Regular",
                        color: "black",
                        marginLeft: 5,
                      }}
                    >
                      {item.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <Feather name="calendar" size={24} color="#73d2de" />
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: "Inter_400Regular",
                        color: "black",
                        marginLeft: 5,
                      }}
                    >
                      {new Date(item.timestamp).toDateString()}
                    </Text>
                  </View>
                </View>
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
                          " " +
                          new Date(item.timestamp).toDateString(),
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
                    height: 70,
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
              <TouchableOpacity
                onPress={() => setmodal(false)}
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: "#eee",
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 0,
                  position: "absolute",
                  right: 20,
                  top: 20,
                }}
              >
                <Feather name="x" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    flexDirection: "column",
  },
});
