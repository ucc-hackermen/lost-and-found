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
// import firebase from "firebase";

import { getStorage, ref } from "firebase/storage";

const { width, height } = Dimensions.get("screen");
export default function Camera_({ navigation }) {
  // const storage = getStorage();
  // const spaceRef = ref(storage, "images/" + Math.random() * 100 + "sdsd.jpg");

  const [type, setType] = useState(CameraType.back);
  const [file_, setfile_] = useState(null);
  const [uploading, setuploading] = useState(null);
  const [loadingimg, setloadingimg] = useState(false);
  const [loading, setloading] = useState(false);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  let snap = useRef(null);

  Camera.requestMicrophonePermissionsAsync();
  Camera.requestCameraPermissionsAsync();

  // const handleUpload = async (file) => {
  //   const response = await fetch(file);
  //   const blob = await response.blob();

  //   var uploadTask = firebase
  //     .storage()
  //     .ref()
  //     .child("booksCover/" + Date.now() + ".jpg")
  //     .put(blob);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       setuploading(progress);
  //       setloadingimg(true);
  //       switch (snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.log("Upload is paused");
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.log("Upload is running");
  //           break;
  //       }
  //     },
  //     (error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log("Storage error");
  //       alert(error.message);
  //     },
  //     () => {
  //       uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         setloadingimg(false);
  //         if (downloadURL) {
  //           navigation.navigate("Create", {
  //             uri: downloadURL,
  //             type: "found",
  //           });
  //         }
  //       });
  //     }
  //   );
  // };

  return (
    <View style={styles.container}>
      <Camera
        ratio="16:9"
        flashMode={"torch"}
        ref={snap}
        style={styles.camera}
        type={type}
      >
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
                onPress={() => navigation.navigate("Create", { type: "lost" })}
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

              // setfile_(image.uri)
              // await handleUpload(image.uri);
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
