import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const users = [
    { id: '1', name: 'Rahul' },
    { id: '2', name: 'Priya' },
    { id: '3', name: 'Aman' },
    { id: '4', name: 'Sneha' },
];

const flatList = () => {
    return (
        <View style={styles.container}>
            <Text>flatList</Text>
            <FlatList
                data={users}
                style={styles.list}
                keyExtractor={(user) => user.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>Name: {item.name}</Text>
                    </View>
                )}
            />

        </View>
    )
}

export default flatList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})