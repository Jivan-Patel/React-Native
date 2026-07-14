import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState, useReducer } from 'react'

const inputText = () => {
    const initialState = {
        name: '',
        email: ''
    }
    function reducer(state, action) {
        switch (action.type) {
            case 'setName':
                return { ...state, name: action.payload };
            case 'setEmail':
                return { ...state, email: action.payload };
            default:
                return state;
        }
    }

    const [text, setText] = useState('');
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <View style={styles.container}>
            <Text>Write Something</Text>
            <TextInput
                placeholder="Enter your name"
                style={styles.input}
                value={state.name}
                onChangeText={(text) => dispatch({ type: 'setName', payload: text })}
            />
            <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={state.email}
                onChangeText={(text) => dispatch({ type: 'setEmail', payload: text })}
            />

            <Text>
                Name: {state.name}
            </Text>
            <Text>
                Email: {state.email}
            </Text>
        </View>
    )
}

export default inputText

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 10,
        width: '80%',
    }
})