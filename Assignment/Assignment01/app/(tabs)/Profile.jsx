import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [college, setCollege] = useState("");

    return (
        <SafeAreaView style={styles.container}>
        <TextInput
            onChangeText={setName}
            value={name}
            placeholder='Enter your name'
        />
        <TextInput
            onChangeText={setCourse}
            value={course}
            placeholder='Enter your course'
        />
        <TextInput
            onChangeText={setCollege}
            value={college}
            placeholder='Enter your college'
        />

        <Button
            title='Update Profile'
            onPress={() => Alert.alert("Profile Updated")}
        />
        </SafeAreaView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  }
});


export default Profile