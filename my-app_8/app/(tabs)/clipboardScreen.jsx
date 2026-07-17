import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import * as Clipboard from 'expo-clipboard';

const ClipboardScreen = () => {
    const [textToCopy, settTextToCopy] = useState("");

    const CopyToClipboard = async () => {
        if (!textToCopy.trim()) {
            Alert.alert("Type something", "Write something to copy");
            return;
        }
        await Clipboard.setStringAsync(textToCopy);
        Alert.alert("copied", `The ${textToCopy} is successfully copied`)
    }

    const showCopyText = async () => {
        const clipboard = await Clipboard.getStringAsync();

        Alert.alert("Copied Text", clipboard.length > 0 ? clipboard : "No copied text")
    }

    return (
        <View style={style.container}>
            <TextInput
                placeholder="type something to copy"
                style={style.input}
                value={textToCopy}
                onChangeText={settTextToCopy}
            />

            <Pressable
                style={style.button}
                onPress={CopyToClipboard}
            >
                <Text style={style.buttonText}>
                    Copy Text
                </Text>
            </Pressable>

            <Pressable
                style={style.button}
                onPress={showCopyText}
            >
                <Text style={style.buttonText}>
                    See Copied text
                </Text>
            </Pressable>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F5F5F5",
    },

    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        marginBottom: 20,
    },

    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        elevation: 3, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        margin: 7
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default ClipboardScreen