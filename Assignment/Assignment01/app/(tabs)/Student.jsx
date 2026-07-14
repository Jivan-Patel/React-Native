import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Student = () => {
    const [students, setStudents] = useState([
        {
            id: "1",
            name: "Jivan Patel",
            age: 19,
            course: "B.E. Computer Engineering",
            isSelected: false,
        },
        {
            id: "2",
            name: "Mayank Sharma",
            age: 18,
            course: "B.Sc. Computer Science",
            isSelected: false,
        },
        {
            id: "3",
            name: "Deepak Verma",
            age: 20,
            course: "BCA",
            isSelected: false,
        },
        {
            id: "4",
            name: "Priya Patel",
            age: 19,
            course: "B.Tech Information Technology",
            isSelected: false,
        },
        {
            id: "5",
            name: "Rahul Singh",
            age: 21,
            course: "B.E. Electronics",
            isSelected: false,
        },
        {
            id: "6",
            name: "Sneha Joshi",
            age: 18,
            course: "BCA",
            isSelected: false,
        },
        {
            id: "7",
            name: "Aman Gupta",
            age: 20,
            course: "B.Sc. Information Technology",
            isSelected: false,
        },
        {
            id: "8",
            name: "Neha Shah",
            age: 19,
            course: "B.E. Computer Engineering",
            isSelected: false,
        },
        {
            id: "9",
            name: "Rohan Mehta",
            age: 22,
            course: "B.Tech Artificial Intelligence",
            isSelected: false,
        },
        {
            id: "10",
            name: "Kavya Desai",
            age: 18,
            course: "B.Sc. Data Science",
            isSelected: false,
        },
    ])
    const updateSelect = (id) => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === id
                    ? { ...student, isSelected: !student.isSelected }
                    : student
            )
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>Name: {item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Course: {item.course}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => updateSelect(item.id)}
                        >
                            <Text style={styles.buttonText}>{item.isSelected ? "unSelect" : "Select"}</Text>
                        </Pressable>
                    </View>
                )}
            />
            <Text>Selected Students</Text>
            <FlatList
                data={students}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    (item.isSelected && <View style={styles.card}>
                        <Text>Name: {item.name}</Text>
                        <Text>Age: {item.age}</Text>
                        <Text>Course: {item.course}</Text>
                    </View>)
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
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Student