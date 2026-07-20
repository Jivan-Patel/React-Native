import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const AsyncStorageScreen = () => {
    const [name, setName] = useState("");
    const [savedData, setSavedData] = useState("");

    const handleSaveData = async () => {
        const checkName = name.trim()
        if (checkName == "") {
            Alert.alert("Warning", "Please provide the username");
            return;
        }
        try {
            await AsyncStorage.setItem("username", checkName);
            setSavedData(checkName);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleGetData = async () => {
        try {
            const value = await AsyncStorage.getItem("username");

            if (value !== null) {
                setSavedData(value.trim());
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleRemoveData = async () => {
        await AsyncStorage.removeItem("username");

        setSavedData("");
        setName("");
    }

    useEffect(() => {
        handleGetData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Async Storage</Text>

                <TextInput
                    placeholder="Type your name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />

                <Text style={styles.savedData}>
                    Saved Data: {savedData || "No data found"}
                </Text>

                <Pressable
                    onPress={handleSaveData}
                    style={[styles.button, { backgroundColor: "#22C55E" }]}
                >
                    <Text style={styles.btnText}> Save Data</Text>
                </Pressable>

                <Pressable
                    onPress={handleGetData}
                    style={[styles.button, { backgroundColor: "#3B82F6" }]}
                >
                    <Text style={styles.btnText}>Get Data</Text>
                </Pressable>

                <Pressable
                    onPress={handleRemoveData}
                    style={[styles.button, { backgroundColor: "#EF4444" }]}
                >
                    <Text style={styles.btnText}> Remove Data</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 22,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1E293B",
        textAlign: "center",
        marginBottom: 25,
    },

    input: {
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 14,
        paddingHorizontal: 18,
        height: 55,
        fontSize: 16,
        marginBottom: 20,
    },

    savedData: {
        backgroundColor: "#EEF2FF",
        borderRadius: 14,
        padding: 16,
        fontSize: 17,
        fontWeight: "600",
        color: "#4338CA",
        textAlign: "center",
        marginBottom: 25,
    },

    button: {
        height: 55,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
    },

    btnText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "bold",
    },
});
export default AsyncStorageScreen