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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRef, useMemo, useState, useEffect } from "react";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("screen");
export default function Create({ navigation, route }) {
  const { type, uri } = route.params;
  const [modal, setmodal] = useState(false);
  const [currentPage, setcurrentPage] = useState("lost"); // page
  const [item, setitem] = useState(null);

  useEffect(() => {
    setcurrentPage(type);
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
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
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
            flexDirection: "row",
          }}
        >
          {currentPage == "lost" ? (
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
          ) : null}
          {currentPage == "found" ? (
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
          ) : null}
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

      <ScrollView>
        {currentPage == "found" ? (
          <Image
            source={{ uri: uri }}
            style={{
              width: "100%",
              height: 250,
              backgroundColor: "#eee",
              borderRadius: 18,
              marginTop: 20,
            }}
          />
        ) : null}
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
            Title
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
            placeholder="Enter a title"
          />
        </View>
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
            Description
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
            placeholder="Enter a title"
          />
        </View>
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
            Location
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
            placeholder="Enter a title"
          />
        </View>
      </ScrollView>
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
                item.date,
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
          width: width,
          backgroundColor: "#73d2de",
          height: 65,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 6,
          marginLeft: -16,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Inter_700Bold",
            color: "#fff",
          }}
        >
          Post
        </Text>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modal}>
        <BlurView
          intensity={Platform.OS == "ios" ? 50 : 100}
          tint="dark"
          style={{
            position: "absolute",
            width: "100%",
            height: Dimensions.get("window").height,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 31,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Create", { type: "found" })}
            style={{
              width: 170,
              height: 45,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                color: "#fff",
                fontSize: 13,
              }}
            >
              Report Found Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Camera", { type: "lost" })}
            style={{
              width: 170,
              height: 45,
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                color: "#fff",
                fontSize: 13,
              }}
            >
              Report Lost Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setmodal(false)}
            style={{
              width: 158,
              height: 45,
              backgroundColor: "#ff0a54",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_700Bold",
                color: "#fff",
                fontSize: 13,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </BlurView>
      </Modal>
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
  },
});
