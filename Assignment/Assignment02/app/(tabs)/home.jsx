import { Platform, View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Location access Denied", "Asking for permission")
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    })
    setLocation(currentLocation.coords);
    setAddress(address[0]);
  }

  return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Current Location</Text>

    {location ? (
      <View style={styles.card}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{location.latitude}</Text>

        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>{location.longitude}</Text>
      </View>
    ) : (
      <Pressable style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </Pressable>
    )}

    {address && (
      <View style={styles.addressCard}>
        <Text style={styles.addressTitle}>Address</Text>

        <Text style={styles.addressText}>
          {address.city}, {address.region}
        </Text>

        <Text style={styles.addressText}>
          {address.country} - {address.postalCode}
        </Text>
      </View>
    )}
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginVertical: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 10,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 3,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },

  addressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  addressTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  addressText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 22,
  },
});

export default Home