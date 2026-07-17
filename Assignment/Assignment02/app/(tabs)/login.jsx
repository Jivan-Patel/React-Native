import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from "expo-router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    function handleSubmit() {
        if(email.trim().length > 0 && pass.trim().length > 0) router.push("/home");
        else Alert.alert("Invalid input", "The input field is empty")
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>

            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Enter your email'
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter your password'
                    onChangeText={setPass}
                    value={pass}
                />

                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
        backgroundColor: "#F5F7FA",
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 40,
    },

    input: {
        height: 55,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 18,
    },

    button: {
        height: 55,
        backgroundColor: "#2563EB",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },

    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },

    forgotPasswordText: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "500",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },

    footerText: {
        color: "#6B7280",
        fontSize: 15,
    },

    signUpText: {
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default Login