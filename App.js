import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [luku1, setLuku1] = useState('');
  const [luku2, setLuku2] = useState('');
  const [result, setResult] = useState('');

  const buttonPressed = (lasku) => {
    let eka = parseFloat(luku1);
    let toka = parseFloat(luku2);

    if (lasku === '+') {
      setResult(`Result: ${eka + toka}`);
    } else if (lasku === '-') {
      setResult(`Result: ${eka - toka}`);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.resultText}>{result}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLuku1(text)}
            value={luku1}
            keyboardType="numeric"/>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLuku2(text)}
            value={luku2}
            keyboardType="numeric"/>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
          <Button onPress={() => buttonPressed('+')} title="+" />
          </View>
          <View style={styles.button}>
          <Button onPress={() => buttonPressed('-')} title="-" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 120,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultText: {
    fontSize: 30,
  },
  button: {
    width: 50,
    backgroundColor: 'lightblue',
    borderRadius: 30,
  }
});