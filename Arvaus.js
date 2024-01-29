import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';

let luku;
let arvaukset;

export default function App() {
  const [input, setInput] = useState('');
  const [text, setText] = useState('');

  const init = () => {
    setText('Guess a number between 1-100')
    arvaukset=0;
    luku= Math.floor(Math.random()*100)+1;
  }

  useEffect(() => {
    init();
  }, [])

  const arvaa = () => {
    const arvaus=Number(input);
    arvaukset++;
    if (arvaus < luku) {
      setText(`Your guess ${arvaus} is too low`);
    } else if (arvaus >luku) {
      setText(`Your guess ${arvaus} is too high`);
    } else {
      Alert.alert(`You guessed the number in ${arvaukset} guesses`);
      init();
    }
    setInput('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput style={styles.input} value={input} keyboardType='numeric' onChangeText={text => setInput(text)}></TextInput>
      <Button title='MAKE A GUESS' onPress={arvaa}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: 100,
    justifyContent: 'center'
  }
});