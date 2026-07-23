import { View, Text, StyleSheet, TextInput, Pressable, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    })
})

const NotificationScreen = () => {
    const [title, setTitle] = useState("");
    const [second, setSecond] = useState("");
    const [notification, setNotification] = useState([]);

    const getPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status != "granted") {
            Alert.alert("Permission Denied", "User not give the permission");
        }
    }

    const handleScheduleNotification = async () => {
        if (!title || !second) {
            Alert.alert("Invalid input", "Please add title and seconds");
            return;
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Reminder",
                body: title,
                data: {
                    message: title
                }
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: parseInt(second)
            }
        });

        Alert.alert("Notification Scheduled", `The notificaion is scheduled for ${second} sec`);
        setTitle("");
        setSecond("");
    }

    const loadAllNotifications = async () => {
        const data = await Notifications.getAllScheduledNotificationsAsync();
        setNotification(data);
        console.log(data);
    }

    const handleClearNotification = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setNotification([]);
    }

    useEffect(() => {
        getPermission();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NotificationScreen</Text>
            <TextInput
                placeholder='Enter title'
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder='Enter second'
                value={second}
                onChangeText={setSecond}
                keyboardType='numeric'
                style={styles.input}
            />

            <Pressable style={styles.btn} onPress={handleScheduleNotification}>
                <Text style={styles.btnText}>Schedule Notification</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={handleClearNotification}>
                <Text style={styles.btnText}>Clear Notification</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={loadAllNotifications}>
                <Text style={styles.btnText}>Show Notification</Text>
            </Pressable>

            <FlatList
                data={notification}
                keyExtractor={(item) => item.identifier}
                contentContainerStyle={styles.list}
                style={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        No scheduled notifications
                    </Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>

                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>🔔</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.notificationTitle}>
                                {item.content.title}
                            </Text>

                            <Text style={styles.notificationBody}>
                                {item.content.body}
                            </Text>
                        </View>

                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F6FB",
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 25,
        alignSelf: "center",
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingHorizontal: 18,
        paddingVertical: 14,
        fontSize: 16,
        color: "#1E293B",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    btn: {
        backgroundColor: "#2563EB",
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 10,
        elevation: 4,
        shadowColor: "#2563EB",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    btnText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    notificationItem: {
        backgroundColor: "#FFFFFF",
        marginTop: 15,
        borderRadius: 15,
        padding: 16,
        borderLeftWidth: 5,
        borderLeftColor: "#2563EB",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    notificationTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 6,
    },

    notificationBody: {
        fontSize: 15,
        color: "#64748B",
    },

    notificationItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,

        elevation: 3,
    },

    avatar: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    avatarText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 22,
    },

    list: {
        marginTop: 20,
        paddingBottom: 40,
    },

    emptyText: {
        marginTop: 30,
        textAlign: "center",
        color: "#94A3B8",
        fontSize: 15,
    },

    listContainer: {
        flex: 1,
        marginTop: 20,
    },
});

export default NotificationScreen