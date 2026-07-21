import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { router } from "expo-router";

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (name.trim() == "Jivan" && password.trim() == "123") {
            await SecureStore.setItemAsync("Jivan", "Patel Jivan");
            router.replace("/home");
        }
        else {
            Alert.alert("Invalid Credentials", "Please check the username and password");
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>

            <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Pressable
                onPress={handleLogin}
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
            >
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: "#F5F7FB",
    },

    title: {
        fontSize: 34,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 35,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 16,
        fontSize: 16,
        color: "#111827",
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },

    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    buttonPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 0.5,
    },
});

export default LoginScreen