import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions, takePictureAsync } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useRef } from 'react'

const CameraScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState("back");
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [flash, setFlash] = useState("off");

    const clickPhoto = async () => {
        const result = await cameraRef?.current?.takePictureAsync();
        if(result) setPhoto(result.uri);
        // console.log(result);
    }


    if (!permission?.granted) {
        return (
            <View style={styles.container}>
                <Button style={styles.button} title="Grant Permission" onPress={requestPermission} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CameraView
                facing={facing}
                flash={flash === "tourch" ? undefined : flash}
                enableTorch={flash === "tourch"}
                style={styles.camera}
                zoom={zoom}
                ref={cameraRef}
                mirror={true}
            />
            <Text style={styles.modeTxt}>
            {flash === "on"
                ? "⚡ Flash On"
                : flash === "off"
                ? "⚡ Flash Off"
                : flash === "auto"
                ? "⚡ Auto"
                : "🔦 Torch"}
            </Text>
            <Button
                style={styles.button}
                title='Flip'
                onPress={() => setFacing(facing == "back" ? "front" : "back")}
            />
            <Button
                style={styles.button}
                title='Click Photo'
                onPress={clickPhoto}
            />

            <Button
                style={styles.button}
                title = {flash === "on" ? "off" : flash === "off" ? "tourch" : flash === "tourch" ? "auto" : "on"}
                onPress={() => setFlash(flash === "on" ? "off" : flash === "off" ? "tourch" : flash === "tourch" ? "auto" : "on")}
            />

            <Slider
                minimumValue={0}
                maximumValue={1}
                value={zoom}
                onValueChange={setZoom}
                style={styles.slider}
            />

            {
                photo && <Image source={{uri: photo}} style={styles.img} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
  },

  button: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 14,
  },

  slider: {
    marginHorizontal: 25,
    marginVertical: 20,
    height: 40,
  },

  img: {
    width: 140,
    height: 140,
    borderRadius: 18,
    position: "absolute",
    top: 50,
    right: 20,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#222",
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 20,
  },

  permissionText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },
    modeTxt: {
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
    backgroundColor: "rgba(30,30,30,0.8)",
    color: "#FFD60A",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
    },
});

export default CameraScreen