import * as React from "react";
import MapView from "react-native-maps";
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
import * as Location from "expo-location";
import { useRef, useMemo, useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("screen");
export default function Map({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [currentPage, setcurrentPage] = useState("lost"); // page
  const [modal, setmodal] = useState(false);
  const [item, setitem] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const markerdata = [
    {
      key: 1,
      title: "Laptop",
      image: require("../assets/laptop.jpg"),
      description: "I lost my laptop in the library",
      date: "12/12/2020",
      location: "Library",
      status: "lost",
      lat: 5.10049,
      lng: -1.28449,
    },
    {
      key: 2,
      title: "Laptop",
      image: require("../assets/laptop.jpg"),
      description: "I lost my laptop in the library",
      date: "12/12/2020",
      location: "Library",
      status: "lost",
      lat: 5.10464,
      lng: -1.282491,
    },
  ];

  const MapStyle = [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          paddingHorizontal: 16,
          paddingTop: 60,
          position: "absolute",
          zIndex: 999,
          top: 0,
          left: 0,
        }}
      >
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
            onPress={() => navigation.navigate("Dashboard")}
            style={{
              padding: 5,
              backgroundColor: "#edf6f9",
              borderRadius: 15,
            }}
          >
            <Feather name="chevron-left" size={30} color="#000" />
          </TouchableOpacity>

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
            marginTop: 15,
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
          {/* Two column list of cards */}
        </View>
      </View>
      <MapView
        style={styles.map}
        customMapStyle={MapStyle}
        initialRegion={{
          latitude: location ? location?.coords?.latitude : 5.10364,
          longitude: location ? location?.coords?.longitude : -1.28249,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {markerdata.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.lat,
              longitude: marker.lng,
            }}
            onPress={() => {
              setitem(marker);
              setmodal(true);
            }}
          >
            <TouchableOpacity>
              <Image
                source={require("../assets/order.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </TouchableOpacity>
          </Marker>
        ))}
      </MapView>

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
                source={item?.image}
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
                    {item?.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Inter_400Regular",
                      color: "gray",
                      marginTop: 3,
                    }}
                  >
                    {item?.description}
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
                      {item?.location}
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
                      {item?.date}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const result = await Share.share({
                        message:
                          "Help me find this lost item?. I lost a " +
                          " " +
                          item?.title +
                          " " +
                          "in the " +
                          " " +
                          item?.location +
                          " " +
                          "on " +
                          " " +
                          item?.date,
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
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});
