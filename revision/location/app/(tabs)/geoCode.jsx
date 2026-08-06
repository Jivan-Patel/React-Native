import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location'

const GeoCode = () => {
    const [coords, setCoords] = useState(null);
    const [search, setSearch] = useState("");
    const handleSearch = async () => {
        const location = await Location.geocodeAsync(search);
        console.log(location);
        setCoords(location[0]);
    }

    return (
        <View style={styles.container} >
            <TextInput
                style={styles.input}
                placeholder="Enter location"
                onChangeText={(text) => setSearch(text)}
            />

            <Pressable style={styles.button} onPress={handleSearch} >
                <Text style={styles.buttonText}>Search Coordinates</Text>
            </Pressable>
            {coords && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Coordinates</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Latitude</Text>
                        <Text style={styles.value}>{coords.latitude}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Longitude</Text>
                        <Text style={styles.value}>{coords.longitude}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default GeoCode

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
        justifyContent: "center",
        padding: 20,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#111827",
        marginBottom: 16,
    },

    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 24,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },

    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#6B7280",
    },

    value: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4F46E5",
    },
});