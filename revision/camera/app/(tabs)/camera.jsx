import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { CameraView, useCameraPermissions } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useRef } from 'react'

const CameraScreen = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState("back");
    const [zoom, setZoom] = useState(0);
    const cameraRef = useRef(null)


    if (!permission?.granted) {
        console.log(permission)
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
                style={styles.camera}
                zoom={zoom}
                ref={cameraRef}
            />
            <Button
                style={styles.button}
                title='Flip'
                onPress={() => setFacing(facing == "back" ? "front" : "back")}
            />

            <Slider
                minimumValue={0}
                maximumValue={1}
                value={zoom}
                onValueChange={setZoom}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
    },
    camera: {
        width: '100%',
        height: '70%',
    },
})

export default CameraScreen