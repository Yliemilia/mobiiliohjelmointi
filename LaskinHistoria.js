import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';

export default function App() {
  const [luku1, setLuku1] = useState('');
  const [luku2, setLuku2] = useState('');
  const [result, setResult] = useState('');
  const [laskut, setLaskut] = useState([]);

  const buttonPressed = (lasku) => {
    let eka = Number(luku1);
    let toka = Number(luku2);
    let laskuRivi=0;

    if (lasku === '+') {
      laskuRivi= eka + toka;
    } else if (lasku === '-') {
      laskuRivi= eka-toka;
    }

    setResult(`Result: ${laskuRivi}`);
    setLaskut([...laskut, {calculation: `${eka}${lasku}${toka}`, sum: laskuRivi}]);
    setLuku1('');
    setLuku2('');
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
        <Text>History</Text>
        <FlatList
          data={laskut}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.results}>
              <Text>{item.calculation}={item.sum}</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inner: {
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
    justifyContent: 'space-between',
    margin: 30,
  },
  resultText: {
    fontSize: 30,
  },
  button: {
    width: 50,
    backgroundColor: 'lightblue',
    borderRadius: 30,
  },
  results: {
    justifyContent: 'center',
    
  }
});