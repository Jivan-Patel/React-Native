import { View, Text, StyleSheet, Button, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from "expo-media-library";

const Camera = () => {
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(null);

    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

    const takePic = async () => {
        const result = await cameraRef?.current.takePictureAsync();

        if (result) {
            setPhoto(result.uri);
        }
    }

    const savePic = async () => {
        if (!photo) return;

        if (!mediaPermission?.granted) {
            requestMediaPermission();
        }

        try {
            await MediaLibrary.saveToLibraryAsync(photo);
            alert("Image Saved")
        }
        catch(err) {
            console.log(err)
            alert("Something wants wrong");
        }

    }

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        )
    }
    if (!permission.granted) {
        return (
            <Button title="Grant Permission" onPress={requestPermission} />
        )
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
            />

            <Button
                title="Flip Camera"
                onPress={() => setFacing(prev => prev === "back" ? "front" : "back")}
            />

            <Button
                title="Take Photo"
                onPress={takePic}
            />

            {photo && (
                <View>
                    <Image
                        source={{ uri: photo }}
                        style={styles.pic}
                    />
                    <Button
                        title="Save Image"
                        onPress={savePic}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    pic: {
        width: 120,
        height: 120,
        margin: 20,
    }
})

export default Camera;