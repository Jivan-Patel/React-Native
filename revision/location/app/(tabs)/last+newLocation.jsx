import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LocationScreen2() {
    const [location, setLocation] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    const loadPermission = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            return;
        }

        await getPrevLocation();
        await getCurrentLocation();
    };

    const getPrevLocation = async () => {
        const result = await Location.getLastKnownPositionAsync();

        if (result?.coords) {
            setLocation(result?.coords);
        }
    };

    const getCurrentLocation = async () => {
        const result = await Location.getCurrentPositionAsync();

        if (result?.coords) {
            setLocation(result?.coords);
        }
    };

    useEffect(() => {
        loadPermission();
    }, []);


    if (!location) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardText} >Latitude: {location.latitude}</Text>
                <Text style={styles.cardText} >Longitude: {location.longitude}</Text>
                <Text style={styles.cardText} >Accuracy: {location.accuracy}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F6FB",
        padding: 20,
    },

    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 15,
        paddingHorizontal: 35,
        margin: 20,
        borderRadius: 14,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
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
    clearButton: {
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

    clearButtonText: {
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