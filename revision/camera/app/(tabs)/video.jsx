import { View, Text, StyleSheet, Button, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions, useMicrophonePermissions, takePictureAsync } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useRef } from 'react'

const VideoScreen = () => {
    const [camPermission, requestCamPermission] = useCameraPermissions();
    const [micPermission, requestMicPermission] = useMicrophonePermissions();
    const [facing, setFacing] = useState("back");
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [flash, setFlash] = useState("off");

    const handleStartRecording = async () => {
        const result = await cameraRef?.current?.recordAsync();
        console.log(cameraRef.current)
    }

    const handleStopRecording = async () => {

    }


    if (!camPermission?.granted || !micPermission?.granted) {
        return (
            <View style={styles.container}>
                <Button style={styles.button} title="Grant camrea Permission" onPress={requestCamPermission} />
                <View style={{height: 10}} />
                <Button style={styles.button} title="Grant mic Permission" onPress={requestMicPermission} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Pressable style={{flex:1}}>
                <CameraView
                    facing={facing}
                    flash={flash === "tourch" ? undefined : flash}
                    enableTorch={flash === "tourch"}
                    style={styles.camera}
                    zoom={zoom}
                    ref={cameraRef}
                    mirror={true}
                />
            </Pressable>
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
                title='Start video'
                onPress={handleStartRecording}
            />
            <Button
                style={styles.button}
                title='stop video'
                onPress={handleStopRecording}
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
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 30
  },

  camera: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    marginBottom: 15
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

export default VideoScreen