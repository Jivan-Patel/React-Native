import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState, useRef } from 'react'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const TrackingScreen = () => {
    const [location, setLocation] = useState(null);
    const subRef = useRef(null);

    const handleStartTracking = async () => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission Denied", "Location permission is required to track your location.");
            return;
        }

        subRef.current = await Location.watchPositionAsync(
            {
                timeInterval: 5000,
                accuracy: Location.Accuracy.BestForNavigation
            },
            (currentLocation) => {
                setLocation(currentLocation.coords);
            }
        )
    }

    const handleStopTracking = () => {
        subRef?.current.remove();
        setLocation(null);
    }

    if (!location) {
        return (
            <View style={styles.container}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
                    ]}
                    onPress={handleStartTracking}
                >
                    <Text style={styles.buttonText}>Start tracking</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardText} >Latitude: {location.latitude}</Text>
                <Text style={styles.cardText} >Longitude: {location.longitude}</Text>
                <Text style={styles.cardText} >Accuracy: {location.accuracy}</Text>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                    />
                </MapView>

                <Pressable
                    style={({ pressed }) => [
                        styles.clearButton,
                        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
                    ]}
                    onPress={handleStopTracking}
                >
                    <Text style={styles.clearButtonText}>Stop Location</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default TrackingScreen

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

    map: {
        width: "100%",
        height: 300,
        borderRadius: 12,
        marginVertical: 10,
    }
});