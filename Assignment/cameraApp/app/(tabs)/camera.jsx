import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import { useRef, useState } from 'react'
import { CameraView, useCameraPermissions, takePictureAsync, useMicrophonePermissions } from 'expo-camera'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from "@react-native-community/slider";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [micPermission, requestMicPermission] = useMicrophonePermissions();
    const [facing, setFacing] = useState('back');
    const [flash, setFlash] = useState('off');
    const [zoom, setZoom] = useState(0);
    const [photo, setPhoto] = useState(null);
    
    const [mode, setMode] = useState('picture');
    const [video, setVideo] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const cameraRef = useRef(null);

    const handlePermission = async () => {
        const cameraStatus = await requestPermission();
        const micStatus = await requestMicPermission();
    };

    if (!permission) {
        return (
            <SafeAreaView style={styles.continer} >
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        )
    }

    if (!permission.granted || !micPermission?.granted) {
        return (
            <SafeAreaView style={styles.premissionContiner} >
                <Text style={styles.title}>Request Permission</Text>
                <Pressable style={styles.btn} onPress={handlePermission} >
                    <Text style={styles.btnText}>Grant permission</Text>
                </Pressable>
            </SafeAreaView>
        )
    }

    const handleClick = async () => {
        if (mode === 'picture') {
            const result = await cameraRef.current.takePictureAsync();
            if (result?.uri) {
                setPhoto(result.uri);
                Alert.alert('Photo taken', `Photo saved at: ${result.uri}`);
                console.log('Photo taken:', result.uri);
            }
        }
        else {
            if (isRecording) {
                cameraRef.current.stopRecording();
                setIsRecording(false);
                return;
            }
            setIsRecording(true);
            const result = await cameraRef.current.recordAsync();
            if (result?.uri) {
                setVideo(result.uri);
                Alert.alert('Video recorded', `Video saved at: ${result.uri}`);
                console.log('Video recorded:', result.uri);
            }
        }
    }


    return (
        <SafeAreaView style={styles.continer} >
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
                flash={flash}
                zoom={zoom}
                mode={mode}
            />
            <View style={styles.controller} >
                <Pressable style={styles.btn} onPress={() => setFacing(prev => prev === 'back' ? 'front' : 'back')} >
                    <Text style={styles.btnText}>flip</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => setFlash(prev => prev === 'off' ? 'on' : prev == 'on' ? 'auto' : 'off')} >
                    <Text style={styles.btnText}>🔦</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleClick} >
                    <Text style={styles.btnText}>{mode === 'picture' ? '📸' : !isRecording ? '🎥' : '⏹️'}</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => setMode(prev => prev == 'picture' ? 'video' : 'picture')} >
                    <Text style={styles.btnText}>{mode == 'picture' ? 'video' : 'picture'}</Text>
                </Pressable>
            </View>
            <View style={styles.sliderContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1}
                    value={zoom}
                    onValueChange={setZoom}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    premissionContiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    btn: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    controller: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    sliderContainer: {
        position: "absolute",
        left: -30,
        top: 0,
        bottom: 0,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    slider: {
        width: 400,
        height: 40,
        transform: [{ rotate: "-90deg" }],
        opacity: 0,
    },

})