import { View, Text, StyleSheet, Button, Image, ScrollView, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions, useMicrophonePermissions, takePictureAsync } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useRef } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'
import * as MediaLibrary from "expo-media-library";

const VideoScreen = () => {
    const [camPermission, requestCamPermission] = useCameraPermissions();
    const [micPermission, requestMicPermission] = useMicrophonePermissions();
    const [facing, setFacing] = useState("front");
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null);

    const [video, setVideo] = useState(null);
    const [flash, setFlash] = useState("off");

    const [isRecording, setIsRecording] = useState(false);

    const player = useVideoPlayer(video);

    const handleStartRecording = async () => {
        setIsRecording(true);
        const result = await cameraRef?.current?.recordAsync();
        // console.log(result);
        setVideo(result.uri);
    }

    const handleStopRecording = async () => {
        await cameraRef?.current?.stopRecording();
        setIsRecording(false);
    }

    const [galleryPermission, requestGalleryPermission] = MediaLibrary.usePermissions();

    const saveVideo = async () => {
        const permission = await MediaLibrary.requestPermissionsAsync();

        if (!permission.granted) {
            alert("Gallery permission is required.");
            return;
        }

        await MediaLibrary.saveToLibraryAsync(video);

        Alert.alert("Video saved successfully!");

    };

    if (!camPermission || !micPermission) {
        return <View />
    }


    if (!camPermission?.granted || !micPermission?.granted) {
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={requestCamPermission}>
                    <Text style={styles.buttonText}>Grant Camera Permission</Text>
                </Pressable>
                <View style={{ height: 10 }} />
                <Pressable style={styles.button} onPress={requestMicPermission}>
                    <Text style={styles.buttonText}>Grant Microphone Permission</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
            <View style={styles.cameraCon}>
                <CameraView
                    ref={cameraRef}
                    facing={facing}
                    flash={flash === "torch" ? undefined : flash}
                    enableTorch={flash === "torch"}
                    style={styles.camera}
                    zoom={zoom}
                    mirror={true}
                    mode="video"
                    mute={true}
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
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={styles.controlPanel}>
                    <View style={styles.grid}>
                        <Pressable
                            style={styles.gridButton}
                            onPress={() =>
                                setFacing(facing === "back" ? "front" : "back")
                            }
                        >
                            <Text style={styles.gridButtonText}>🔄 Flip</Text>
                        </Pressable>

                        <Pressable
                            style={styles.gridButton}
                            onPress={() =>
                                setFlash(
                                    flash === "on"
                                        ? "off"
                                        : flash === "off"
                                            ? "torch"
                                            : flash === "torch"
                                                ? "auto"
                                                : "on"
                                )
                            }
                        >
                            <Text style={styles.gridButtonText}>
                                {flash === "on"
                                    ? "⚡ Off"
                                    : flash === "off"
                                        ? "🔦 Torch"
                                        : flash === "torch"
                                            ? "🤖 Auto"
                                            : "⚡ On"}
                            </Text>
                        </Pressable>

                        <Pressable
                            disabled={isRecording}
                            style={[styles.gridButton, styles.startButton, isRecording && styles.disableBtn]}
                            onPress={handleStartRecording}
                        >
                            <Text style={styles.gridButtonText}>Record</Text>
                        </Pressable>

                        <Pressable
                            disabled={!isRecording}
                            style={[styles.gridButton, styles.stopButton, !isRecording && styles.disableBtn]}
                            onPress={handleStopRecording}
                        >
                            <Text style={styles.gridButtonText}>Stop</Text>
                        </Pressable>
                    </View>

                    <Slider
                        minimumValue={0}
                        maximumValue={1}
                        value={zoom}
                        onValueChange={setZoom}
                        style={styles.slider}
                    />
                </View>

                {video && (
                    <View style={styles.videoContainer}>
                        <VideoView
                            player={player}
                            style={styles.video}
                            allowsFullscreen
                            allowsPictureInPicture
                        />
                        <Pressable style={styles.gridButton} onPress={saveVideo}>
                            <Text style={styles.gridButtonText}>💾 Save Video</Text>
                        </Pressable>

                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#0D0D0D",
        paddingBottom: 24,
    },

    cameraCon: {
        width: "100%",
        alignItems: "center",
    },

    camera: {
        width: "100%",
        height: 420,
        backgroundColor: "#000",
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },

    modeTxt: {
        position: "absolute",
        top: 55,
        alignSelf: "center",
        backgroundColor: "rgba(0,0,0,0.65)",
        color: "#FFF",
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 30,
        fontSize: 14,
        fontWeight: "700",
        zIndex: 10,
    },

    controlPanel: {
        width: "100%",
        paddingHorizontal: 18,
        marginTop: 18,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 14,
    },

    gridButton: {
        width: "48%",
        height: 58,
        backgroundColor: "#1B1B22",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#2C2C34",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },

    gridButtonText: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "700",
    },

    startButton: {
        backgroundColor: "#DC2626",
        borderColor: "#DC2626",
    },

    stopButton: {
        backgroundColor: "#4B5563",
        borderColor: "#4B5563",
    },

    slider: {
        width: "100%",
        marginTop: 20,
        marginBottom: 10,
    },

    videoContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    video: {
        width: "100%",
        height: 260,
        backgroundColor: "#000",
    },

    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0D0D0D",
        padding: 24,
    },

    button: {
        width: "80%",
        height: 56,
        backgroundColor: "#2563EB",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    disableBtn: {
        opacity: 0.5
    }
});

export default VideoScreen