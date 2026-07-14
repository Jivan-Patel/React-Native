import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'

const User = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((data) => data.json())
            .then((data) => setData(data))
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {
                data.length == 0 && (
                    <Text>Loading...</Text>
                )
            }
            
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>Name: {item.name}</Text>
                        <Text>Username: {item.username}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>City: {item.address.city}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
});

export default User