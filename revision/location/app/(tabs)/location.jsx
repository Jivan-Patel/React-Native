import * as Location from 'expo-location';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetLocation = async () => {
        setIsLoading(true);
        const result = await Location.requestForegroundPermissionsAsync();
        if (!result.granted) {
            setIsLoading(false);
            Alert.alert("successful", "Permission Denied");
            return;
        }
        // console.log(result);

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest
        });
        setLocation(location.coords);
        // console.log(location);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
                    ]}
                    onPress={handleGetLocation}
                >
                    <Text style={styles.buttonText}>{location ? "Reload" : "Get"} Location</Text>
                </Pressable>
            </View>
            {
                location && (
                    <View style={styles.card}>
                        <Text style={styles.cardText} >Latitude: {location.latitude}</Text>
                        <Text style={styles.cardText} >Longitude: {location.longitude}</Text>
                        <Text style={styles.cardText} >Accuracy: {location.accuracy}</Text>
                        <Pressable
                            style={({ pressed }) => [
                                styles.clearButton,
                                pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
                            ]}
                            onPress={() => setLocation(null)}
                        >
                            <Text style={styles.clearButtonText}>Clear Location</Text>
                        </Pressable>
                    </View>
                )
            }
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