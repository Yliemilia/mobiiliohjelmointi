import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

    const [inputText, setText] = useState('');

    const speak = () => {
        Speech.speak(inputText);
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} onChangeText={setText} value={inputText} placeholder="Enter text to speak" />
            <Button title="Press to hear text" onPress={speak} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        width: "100%"
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        width: 200
    }
});