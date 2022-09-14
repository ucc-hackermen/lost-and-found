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
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRef, useMemo, useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import Input from "../components/Input";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("screen");
export default function Create({ navigation, route }) {
  const { type, uri } = route.params;
  const [modal, setmodal] = useState(false);
  const [currentPage, setcurrentPage] = useState("lost"); // page
  const [item, setitem] = useState(null);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [status, setstatus] = useState(type);
  const [photo, setphoto] = useState(
    "https://tgtsafrica.com/wp-content/uploads/2020/11/placeholder-640x427.png"
  );
  const [user, setuser] = useState("dSUAnuhIbH2XOld4n6vpzg");

  const [loading, setloading] = useState(false);

  const [location2, setLocation2] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation2(location);
      console.log(">>>>> ", location);
    })();
  }, []);

  useEffect(() => {
    setcurrentPage(type);
    setphoto(uri);
  }, []);

  const mytime = Date.now();

  const handleUpload = async () => {
    if (title && location && description) {
      setloading(true);
      const response = await fetch(
        "https://ucc-lost-and-found.herokuapp.com/adverts",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            user: user,
            description: description,
            location: location,
            photo: photo,
            status: status,
            coords: {
              lat: location2?.coords?.latitude,
              lng: location2?.coords?.longitude,
            },
            timestamp: mytime,
          }),
        }
      );

      if (response.status == 422) {
        setloading(false);
        alert("Sorry an error occured, Please try again");
      }
      return response
        .json()
        .then((data) => {
          if (data.data.success) {
            setloading(false);
            console.log(data); // JSON data parsed by `data.json()` call
            alert("Success, Your item has been posted");
            navigation.navigate("Items", { type: type });
          } else {
            setloading(false);
            alert("Sorry an error occured, Please try again");
          }
        })
        .catch((e) => {
          setloading(false);
          alert("Sorry an error occured, Please try again");
          console.log(e);
        });
    } else {
      alert("Please fill all fields");
    }
  };

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
        <Input
          title={"Title"}
          placeholder={"Enter a title"}
          onChange={(txt) => {
            settitle(txt);
          }}
        />
        <Input
          title={"Description"}
          placeholder={"Enter a description"}
          onChange={(txt) => {
            setdescription(txt);
          }}
        />
        <Input
          title={"Location"}
          placeholder={"Enter a location"}
          onChange={(txt) => {
            setlocation(txt);
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={handleUpload}
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
        {loading ? (
          <ActivityIndicator color="white" size={30} />
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Inter_700Bold",
              color: "#fff",
            }}
          >
            Post
          </Text>
        )}
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
