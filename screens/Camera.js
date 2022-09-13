import { Camera, CameraType } from "expo-camera";
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
import { useRef, useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
export default function Camera_({ navigation }) {
  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  let snap = useRef(null);

  Camera.requestMicrophonePermissionsAsync();
  Camera.requestCameraPermissionsAsync();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera flashMode={"torch"} ref={snap} style={styles.camera} type={type}>
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: width,
              paddingHorizontal: 16,
              paddingTop: 60,
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
                onPress={() => navigation.goBack()}
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
                  backgroundColor: "#edf6f9",
                  height: 40,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={async () => {
              let image = await snap.current.takePictureAsync();
              if (image) {
                navigation.navigate("Create", {
                  uri: image.uri,
                  type: "found",
                });
              }
            }}
            style={{
              width: 92,
              height: 92,
              backgroundColor: "white",
              borderRadius: 90,
              marginBottom: 60,
            }}
          ></TouchableOpacity>
        </View>
      </Camera>
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
  camera: {
    width: "100%",
    flex: 1,
  },
});
