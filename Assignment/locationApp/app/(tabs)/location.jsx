import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationAddressScreen = () => {
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePermission = async () => {
        if (isPermissionGranted) return true;

        setIsLoading(true);
        try {
            const permission = await Location.requestForegroundPermissionsAsync();

            if (!permission?.granted) {
                Alert.alert("Permission Denied", "Location permission is required!");
                return false;
            }

            setIsPermissionGranted(true);
            Alert.alert("Permission Granted", "Location permission granted!");
        } catch (error) {
            Alert.alert("Error", "An error occurred while requesting permission.");
            return false;
        } finally {
            setIsLoading(false);
        }

        return true;
    }

    const handleGetCurrentLocation = async () => {
        setIsLoading(true);
        try {
            const curLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });
            setLocation({ ...curLocation.coords, type: "Current Location" });
        } catch (error) {
            Alert.alert("Error", "An error occurred while fetching current location.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleGetLastLocation = async () => {
        setIsLoading(true);
        try {
            const curLocation = await Location.getLastKnownPositionAsync();

            if (!curLocation?.coords) {
                Alert.alert("No location found", "No Last Known Location Found");
                return;
            }

            setLocation({ ...curLocation.coords, type: "Last Location" });
        } catch (error) {
            Alert.alert("Error", "An error occurred while fetching last known location.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleRevGetGeoLocation = async () => {
        setIsLoading(true);
        try {

            const revGeo = await Location.reverseGeocodeAsync({
                latitude: location.latitude,
                longitude: location.longitude,
            });
            setAddress(revGeo[0]);
        } catch (error) {
            Alert.alert("Error", "An error occurred while fetching address.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (location) {
            handleRevGetGeoLocation();
        }
    }, [location]);

    if (isLoading) {
        return (
            <View style={styles.placeholder}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    if (!isPermissionGranted) {
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={handlePermission} >
                    <Text style={styles.buttonText}>Get Permission</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} >
            <SafeAreaView style={styles.container} >
                {
                    location && (
                        <View style={styles.card}>
                            <Text style={styles.title} >{location.type}</Text>
                            <Text style={styles.text} >Latitude: {location.latitude || "-"}</Text>
                            <Text style={styles.text} >Longitude: {location.longitude || "-"}</Text>
                            <Text style={styles.text} >Accuracy: {location.accuracy || "-"}</Text>
                            <Text style={styles.text} >Altitude: {location.altitude || "-"}</Text>
                            <Text style={styles.text} >Heading: {location.heading || "-"}</Text>
                            <Text style={styles.text} >Speed: {location.speed || "0"}</Text>
                            <Text style={styles.text} >Timestamp: {location.timestamp || "-"}</Text>
                        </View>
                    )
                }
                {
                    address && (
                        <View style={styles.card}>
                            <Text style={styles.title} >Address</Text>
                            <Text style={styles.text} >Name: {address.name || "-"}</Text>
                            <Text style={styles.text} >Street: {address.street || "-"}</Text>
                            <Text style={styles.text} >City: {address.city || "-"}</Text>
                            <Text style={styles.text} >District: {address.district || "-"}</Text>
                            <Text style={styles.text} >State: {address.region || "-"}</Text>
                            <Text style={styles.text} >Country: {address.country || "-"}</Text>
                            <Text style={styles.text} >Postal Code: {address.postalCode || "-"}</Text>
                        </View>
                    )
                }
                <Pressable style={styles.button} onPress={handleGetCurrentLocation} >
                    <Text style={styles.buttonText}>{location ? "Reload" : "Get"} Current Location</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleGetLastLocation} >
                    <Text style={styles.buttonText}>Get Last Known Location</Text>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
    )
}

export default LocationAddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FC",
        padding: 20,
        justifyContent: "center",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1E3A8A",
        marginBottom: 16,
        textAlign: "center",
    },

    text: {
        fontSize: 16,
        color: "#374151",
        marginBottom: 10,
        lineHeight: 24,
    },

    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 15,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.5,
    },

    placeholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
});