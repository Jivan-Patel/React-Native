import React from 'react';
import { View, Text, Button, Alert, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

const Setting = () => {
  const handlePress = () => {
    console.log('Button 2 pressed!');
    Alert.alert('Button 2 pressed!');
  };


  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>React Native</Text>

      <Button title="Press me"onPress={() => Alert.alert('Button 1 pressed!')} />

      <Button title="Press me" onPress={handlePress} />

      <Pressable
      style={styles.button}
        onPress={() => Alert.alert('Pressable Button pressed!')}
        >
        <Text style={styles.buttonText}>Press me</Text>
      </Pressable>

       <TouchableOpacity
        style={{
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 12,
          backgroundColor: '#2563EB',
        }}
      >
        <Text style={styles.buttonText}>Press me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  }

});

export default Setting;