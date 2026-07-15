import { Platform, View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';

import { AppleMaps, GoogleMaps } from 'expo-maps';


const LocationScreen = () => {
    const [location, setLocation] = useState(null);

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Location access Denied", "Asking for permission")
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        });
        console.log(currentLocation);
        setLocation(currentLocation.coords);
    }


    return (
        <View style={style.container}>
            <Text>loction</Text>
            <Pressable style={style.button} onPress={getCurrentLocation}
            >
                <Text style={style.buttonText}>Get Current Location</Text>
            </Pressable>

            {
                location && (
                    <View>
                        <Text>
                            Latitude: {location.latitude}
                        </Text>
                    </View>
                )
            }

            {
                Platform.OS === "android" && location && (
                    <GoogleMaps.View
                        style={{ flex: 1 }}
                        cameraPosition={{
                            coordinates: {
                                latitude: location.latitude,
                                longitude: location.longitude,
                            },
                            zoom: 15,
                        }}
                    />
                )
            }


        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "blue",
        padding: 15,
        margin: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold"
    }
})

export default LocationScreen;