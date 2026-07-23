import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from "expo-secure-store"
import { useEffect } from 'react'
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    checkLogin();
  }, []);


const checkLogin = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      router.replace("/login");
      return;
    }
      setIsLoading(false);
  } catch (err) {
    console.log(err);
    router.replace("/login");
  }
};

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("biometric");
    router.replace("/login");
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!isVerified) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>
          Waiting for biometric...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#EF4444",
    width: "100%",
    maxWidth: 300,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#EF4444",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
  },

  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
  },
});

export default HomeScreen