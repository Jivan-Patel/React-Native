import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator } from "react-native";

export default function SearchLocation() {
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState(null);
    const searchRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        const curSearch = search.trim();
        if (!curSearch) {
            Alert.alert("Error", "Please enter a location to search.");
            return;
        }
        setIsLoading(true);
        try {
            const geocode = await Location.geocodeAsync(curSearch);
            if (!geocode || geocode.length === 0) {
                Alert.alert("Error", "Location not found.");
                return;
            }
            setLocation(geocode[0]);
        } catch (error) {
            Alert.alert("Error", "An error occurred while searching for the location.");
            console.error(error);
        } finally {
            setIsLoading(false);
            if (searchRef.current) {
                searchRef.current.blur();
            }
            setSearch('');
        }
    }


    if (isLoading) {
        return (
            <View style={styles.placeholder}>
                <ActivityIndicator size="large" color="#4F46E5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SearchLocation</Text>
            <TextInput
                placeholder="Search for a location..."
                value={search}
                onChangeText={setSearch}
                ref={searchRef}
                style={styles.input}
            />
            <Pressable onPress={handleSearch} style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
            {location && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.04,
                        }}
                        mapType="hybrid"
                    >
                        <Marker coordinate={location} title="Searched Location" />
                    </MapView>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        padding: 20,
        paddingTop: 50,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 20,
        textAlign: "center",
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#111827",
        marginBottom: 15,
    },
    placeholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    placeholderText: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
    },

    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        elevation: 3,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    mapContainer: {
        flex: 1,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#E5E7EB",
        elevation: 4,
    },

    map: {
        flex: 1,
    },
});