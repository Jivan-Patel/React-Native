import { View, Text, StyleSheet, Button, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions, useMicrophonePermissions, takePictureAsync } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useRef } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video'

const VideoScreen = () => {
    const [camPermission, requestCamPermission] = useCameraPermissions();
    const [micPermission, requestMicPermission] = useMicrophonePermissions();
    const [facing, setFacing] = useState("front");
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null);

    const [video, setVideo] = useState(null);
    const [flash, setFlash] = useState("off");

    const player = useVideoPlayer(video);

    const handleStartRecording = async () => {
        const result = await cameraRef?.current?.recordAsync();
        // console.log(result);
        setVideo(result.uri);
    }

    const handleStopRecording = async () => {
        await cameraRef?.current?.stopRecording();
    }

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
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.cameraCon} >
            <Pressable style={{ flex: 1 }}>
                <CameraView
                    facing={facing}
                    flash={flash === "tourch" ? undefined : flash}
                    enableTorch={flash === "tourch"}
                    style={styles.camera}
                    zoom={zoom}
                    ref={cameraRef}
                    mirror={true}
                    mode='video'
                    mute={true}
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
            <View style={styles.controlPanel}>
                <View style={styles.grid}>
                    <Pressable
                        style={styles.gridButton}
                        onPress={() => setFacing(facing === "back" ? "front" : "back")}
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
                                        ? "tourch"
                                        : flash === "tourch"
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
                                    : flash === "tourch"
                                        ? "🤖 Auto"
                                        : "⚡ On"}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.gridButton, styles.startButton]}
                        onPress={handleStartRecording}
                    >
                        <Text style={styles.gridButtonText}>Record</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.gridButton, styles.stopButton]}
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
            </View>

            {
                video && (
                    <View style={styles.videoContainer}>
                        <VideoView
                            player={player}
                            style={styles.video}
                        />
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0D0D0D",
        paddingBottom: 24,
    },

    camera: {
        width: "100%",
        height: 420,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        overflow: "hidden",
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
        overflow: "hidden",
    },

    controlPanel: {
        marginTop: 18,
        paddingHorizontal: 18,
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

        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 4,
        },
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
        marginTop: 22,
        marginBottom: 18,
    },

    videoContainer: {
        marginHorizontal: 18,
        marginTop: 10,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#2A2A2A",

        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 8,
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
        padding: 24,
        backgroundColor: "#0D0D0D",
    },

    permissionButton: {
        width: "100%",
        height: 56,
        backgroundColor: "#2563EB",
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
    },

    permissionButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    cameraCon: {
        minHeight: '100vh'
    }
});

export default VideoScreen