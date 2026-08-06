import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'

const RevGeocode = () => {
    const [address, setAddress] = useState(null);

    const handleGetLocation = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission Denied", "Location permission is needed!");
            return;
        }

        const { latitude, longitude } = (await Location.getCurrentPositionAsync()).coords;

        const curAddress = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        });

        // console.log(curAddress[0]);
        setAddress(curAddress[0]);
    }

    if (!address) {
        return (

            <View style={styles.container} >
                <Pressable style={styles.button} onPress={handleGetLocation} >
                    <Text style={styles.buttonText}>Get location</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container} >
            <View style={styles.card}>
                <Text style={styles.cardText}>City: {address.city}</Text>
                <Text style={styles.cardText}>District: {address.district}</Text>
                <Text style={styles.cardText}>State: {address.region}</Text>
                <Text style={styles.cardText}>Country: {address.country}</Text>
                <Text style={styles.cardText}>Pin Code: {address.postalCode}</Text>
                <Text style={styles.cardText}>Address: {address.formattedAddress}</Text>
                <Pressable style={styles.button} onPress={handleGetLocation} >
                    <Text style={styles.buttonText}>Reload location</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default RevGeocode

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F6FB",
        padding: 20,
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 22,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },

    cardText: {
        fontSize: 17,
        color: "#1F2937",
        fontWeight: "600",
        backgroundColor: "#EEF2FF",
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 14,
        marginTop: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    loadingText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#4F46E5",
        textAlign: "center",
    },
});