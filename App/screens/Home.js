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
import { useRef, useMemo, useState } from "react";
import { BlurView } from "expo-blur";
import HomeNav from "../components/HomeNav";

const { width, height } = Dimensions.get("screen");
export default function Home({ navigation }) {
  const [modal, setmodal] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeNav navigation={navigation} />
      <Text
        style={{
          fontSize: 15,
          marginTop: 20,
          fontFamily: "Inter_400Regular",
          color: "gray",
        }}
      >
        Hello
      </Text>
      <Text
        style={{ fontSize: 20, fontFamily: "Inter_700Bold", marginTop: -2 }}
      >
        HackerMen
      </Text>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            setmodal(true);
          }}
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#edf6f9",
            borderRadius: 15,
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../assets/plus.png")}
            style={{
              width: 50,
              height: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Inter_600SemiBold",
              color: "#73d2de",
            }}
          >
            Create a report
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter_400Regular",
              color: "#9dd9d2",
            }}
          >
            {`Report a missing or \nfound item`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Items")}
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#f8edeb",
            borderRadius: 15,
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../assets/order.png")}
            style={{
              width: 50,
              height: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Inter_600SemiBold",
              color: "#f95738",
            }}
          >
            Lost & found items
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter_400Regular",
              color: "#ffa69e",
            }}
          >
            {`Go through the list of \nlost and found items`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Map")}
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#edf2fb",
            borderRadius: 15,
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={require("../assets/map.png")}
            style={{
              width: 50,
              height: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Inter_600SemiBold",
              color: "#5e6472",
            }}
          >
            Search on map
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter_400Regular",
              color: "#607196",
            }}
          >
            {`search for lost items \naround you`}
          </Text>
        </TouchableOpacity>
      </ScrollView>

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
            onPress={() => {
              setmodal(false);
              navigation.navigate("Camera", { type: "found" });
            }}
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
            onPress={() => {
              setmodal(false);
              navigation.navigate("Create", { type: "lost" });
            }}
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
