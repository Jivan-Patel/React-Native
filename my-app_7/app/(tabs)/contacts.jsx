import { View, Text, Button, Alert, FlatList, StyleSheet, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Contacts from "expo-contacts"

const ContactScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContact, setFilteredContact] = useState([]);
    const [search, setSearch] = useState("");

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Access Denied", "Please allow contacts permission.");
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [
                Contacts.Fields.PhoneNumbers,
                Contacts.Fields.Image
            ],
        });

        if (data.length > 0) setContacts(data);
    };

    const deleteContact = async (id) => {
        try {
            await Contacts.removeContactAsync(id);

            // Update the UI
            const updatedContacts = contacts.filter((contact) => contact.id !== id);
            setContacts(updatedContacts);
            setFilteredContact(updatedContacts);

            Alert.alert("Success", "Contact deleted successfully.");
        } catch (error) {
            Alert.alert("Error", "Failed to delete contact.");
            console.log(error);
        }
    };

    useEffect(() => {
        const filterCon = contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredContact(filterCon);
    }, [search, contacts])


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Contacts</Text>

            <Button
                title="Get Contacts"
                onPress={getContacts}
            />

            <TextInput
                style={styles.searchInput}
                placeholder="Search Contacts"
                placeholderTextColor="#888"
                onChangeText={setSearch}
                value={search}
            />

            <FlatList
                data={filteredContact}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.imageAvailable ? (
                            <Image
                                source={{ uri: item.image?.uri }}
                                style={styles.image}
                            />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>
                                    {item.name?.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.number}>
                                {item.phoneNumbers?.[0]?.number || "No contact found"}
                            </Text>
                        </View>

                        <Button
                            title="Delete"
                            color="red"
                            onPress={() => deleteContact(item.id)}
                        />

                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        paddingHorizontal: 16,
        paddingTop: 20,
    },

    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 20,
    },

    searchInput: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        paddingHorizontal: 18,
        fontSize: 16,
        color: "#222",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginVertical: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    list: {
        paddingBottom: 20,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },

    placeholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#4F46E5",
        justifyContent: "center",
        alignItems: "center",
    },

    placeholderText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
    },

    info: {
        flex: 1,
        marginLeft: 16,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },

    number: {
        fontSize: 15,
        color: "#6B7280",
        marginTop: 4,
    },
});

export default ContactScreen;